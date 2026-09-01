/**
 * SKYLINE — procedural terrain generation, sampling and terraforming.
 *
 * Terrain is *stepped*: every tile has a flat top whose height is an exact
 * multiple of HEIGHT_STEP, and neighbouring tiles of different height are
 * joined by a vertical cliff wall (built by render/terrainMesh.ts).
 *
 * Generation guarantees (see CONTRACTS.md):
 *  - one coherent water feature per shape,
 *  - a large flat, dry, contiguous buildable core (>= 45% of the map),
 *  - hills / mountains pushed to the map edges,
 *  - sand at the shoreline, rock on steep ground, snow on peaks,
 *  - forests laid down in bands via grid.tree (0..3).
 */
import type { Grid } from '../core/grid';
import {
  GRID_W,
  GRID_H,
  TILE_COUNT,
  HEIGHT_STEP,
  TerrainKind,
  idx,
  inBounds,
} from '../core/types';
import {
  makeNoise2D,
  mulberry32,
  clamp,
  clamp01,
  lerp,
  smoothstep,
  hash2,
  type Rng,
} from '../core/rng';

/* ──────────────────────────────── public API ──────────────────────────────── */

export type TerrainShape =
  | 'coastal'
  | 'river'
  | 'lakes'
  | 'plains'
  | 'valley'
  | 'islands';

export interface TerrainOptions {
  seed: number;
  /** 0..1 — how much of the map is water */
  water: number;
  /** 0..1 — hill amplitude */
  hills: number;
  /** 0..1 — forest density */
  trees: number;
  /** 'coastal' | 'river' | 'lakes' | 'plains' | 'valley' | 'islands' */
  shape: TerrainShape;
}

export const TERRAIN_SHAPES: { id: TerrainShape; name: string }[] = [
  { id: 'coastal', name: 'Coastal' },
  { id: 'river', name: 'River Delta' },
  { id: 'lakes', name: 'Lake District' },
  { id: 'plains', name: 'Great Plains' },
  { id: 'valley', name: 'Mountain Valley' },
  { id: 'islands', name: 'Archipelago' },
];

/* ─────────────────────────────── tuning constants ─────────────────────────── */

/** lowest level dry land may occupy (1 step above the sea surface) */
const MIN_LAND_LEVEL = 1;
/** highest peak, in steps (26 * 0.35 = 9.1 world units) */
const MAX_LAND_LEVEL = 26;
/** deepest sea floor, in steps */
const MIN_WATER_LEVEL = -7;
/** largest allowed cliff between two neighbouring tiles, in steps */
const MAX_STEP_DIFF = 3;
/** fraction of the map we try to hand the player as one flat plateau */
const CORE_TARGET = 0.5;
/** hard floor required by the contract */
const FLAT_MIN = 0.45;

/* ──────────────────────────── module scratch buffers ──────────────────────── */
/* Allocated once. Generation and terraforming never run concurrently, so these
   are safe to share; nothing here is touched from a per-frame path. */

const fWater = new Float32Array(TILE_COUNT); // water potential, > 0 => submerged
const fMount = new Float32Array(TILE_COUNT); // mountain weight 0..1
const fRough = new Float32Array(TILE_COUNT); // ridged detail 0..1
const fForest = new Float32Array(TILE_COUNT); // canopy field 0..1
const lvl = new Int16Array(TILE_COUNT); // quantised height, in steps
const tmpLvl = new Int16Array(TILE_COUNT);
const isCore = new Uint8Array(TILE_COUNT);
const compId = new Int32Array(TILE_COUNT);
const shoreDist = new Int16Array(TILE_COUNT);
const bfsQueue = new Int32Array(TILE_COUNT);
const scoreBuf = new Int32Array(TILE_COUNT);
const visited = new Uint8Array(TILE_COUNT);

const NX = [1, -1, 0, 0];
const NY = [0, 0, 1, -1];

/* ───────────────────────────────── helpers ────────────────────────────────── */

const toLevel = (h: number) => Math.round(h / HEIGHT_STEP);
const toHeight = (l: number) => l * HEIGHT_STEP;

function commitLevels(grid: Grid) {
  const h = grid.height;
  const w = grid.water;
  for (let i = 0; i < TILE_COUNT; i++) {
    const l = lvl[i];
    h[i] = toHeight(l);
    w[i] = l < 0 ? 1 : 0;
  }
}

/** bilinear-ish sampled ground height for a world-space point (camera + props) */
export function heightAtWorld(grid: Grid, wx: number, wz: number): number {
  const fx = clamp(wx - 0.5, 0, GRID_W - 1.0001);
  const fy = clamp(wz - 0.5, 0, GRID_H - 1.0001);
  const x0 = fx | 0;
  const y0 = fy | 0;
  const x1 = x0 + 1 < GRID_W ? x0 + 1 : x0;
  const y1 = y0 + 1 < GRID_H ? y0 + 1 : y0;
  const tx0 = fx - x0;
  const ty0 = fy - y0;
  const h = grid.height;
  const a = h[y0 * GRID_W + x0];
  const b = h[y0 * GRID_W + x1];
  const c = h[y1 * GRID_W + x0];
  const d = h[y1 * GRID_W + x1];
  const top = a + (b - a) * tx0;
  const bot = c + (d - c) * tx0;
  return top + (bot - top) * ty0;
}

/* ─────────────────────────── shape field construction ─────────────────────── */

interface Blob {
  x: number;
  y: number;
  r: number;
  ax: number;
  ay: number;
  ph: number;
  lobe: number;
}

/** target fraction of the map covered by water, per shape */
function waterTarget(shape: TerrainShape, amt: number): number {
  switch (shape) {
    case 'coastal':
      return lerp(0.16, 0.38, amt);
    case 'river':
      return lerp(0.035, 0.11, amt);
    case 'lakes':
      return lerp(0.07, 0.2, amt);
    case 'plains':
      return lerp(0.012, 0.055, amt);
    case 'valley':
      return lerp(0.05, 0.13, amt);
    default:
      return lerp(0.28, 0.4, amt);
  }
}

function blobField(b: Blob, x: number, y: number, wobble: number): number {
  const dx = (x - b.x) * b.ax;
  const dy = (y - b.y) * b.ay;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d > b.r * 2.4) return -2;
  const th = Math.atan2(dy, dx);
  const r =
    b.r *
    (1 + b.lobe * (0.18 * Math.sin(3 * th + b.ph) + 0.11 * Math.sin(5 * th - b.ph * 1.7)));
  return (r - d) / Math.max(4, r) * 1.15 + wobble;
}

/**
 * Fills fWater (>0 => submerged), fMount (0..1 mountain weight) and
 * fRough (0..1 ridged detail) for one shape.
 */
function buildShapeFields(opts: TerrainOptions, rnd: Rng): void {
  const seed = opts.seed | 0;
  const nWarp = makeNoise2D(seed ^ 0x9e3779b9);
  const nShape = makeNoise2D((seed + 1013904223) | 0);
  const nRidge = makeNoise2D((seed + 1266489917) | 0);
  const nRange = makeNoise2D((seed + 424242) | 0);
  const amt = clamp01(opts.water);
  const shape = opts.shape;

  // orientation: free for coastal/islands, near-axis-aligned for river/valley
  let ang = rnd() * Math.PI * 2;
  if (shape === 'river' || shape === 'valley') {
    ang = (rnd() < 0.5 ? 0 : Math.PI * 0.5) + (rnd() - 0.5) * 0.42;
  }
  const ca = Math.cos(ang);
  const sa = Math.sin(ang);

  const ph1 = rnd() * 6.283;
  const ph2 = rnd() * 6.283;
  const ph3 = rnd() * 6.283;

  // ---- per-shape setup -----------------------------------------------------
  const blobs: Blob[] = [];
  let bankOff = 0;
  let halfW = 3;
  let tribOff = 0;
  let tribHalf = 2;
  let tribSide = 1;
  let valleyHalf = 0.27;

  if (shape === 'lakes') {
    const n = 3 + ((rnd() * 3) | 0);
    for (let k = 0; k < n; k++) {
      const a = (k / n) * 6.283 + rnd() * 1.4;
      const rr = lerp(30, 54, rnd());
      blobs.push({
        x: 64 + Math.cos(a) * rr,
        y: 64 + Math.sin(a) * rr,
        r: lerp(9, 20, rnd()) * lerp(0.8, 1.35, amt),
        ax: lerp(0.75, 1.25, rnd()),
        ay: 1,
        ph: rnd() * 6.283,
        lobe: 1,
      });
    }
  } else if (shape === 'plains') {
    const n = 1 + ((rnd() * 2) | 0);
    for (let k = 0; k < n; k++) {
      const a = rnd() * 6.283;
      const rr = lerp(34, 52, rnd());
      blobs.push({
        x: 64 + Math.cos(a) * rr,
        y: 64 + Math.sin(a) * rr,
        r: lerp(6, 11, rnd()) * lerp(0.8, 1.4, amt),
        ax: lerp(0.8, 1.3, rnd()),
        ay: 1,
        ph: rnd() * 6.283,
        lobe: 0.7,
      });
    }
  } else if (shape === 'islands') {
    blobs.push({
      x: 64 + (rnd() - 0.5) * 8,
      y: 64 + (rnd() - 0.5) * 8,
      r: 56,
      ax: lerp(0.92, 1.08, rnd()),
      ay: 1,
      ph: rnd() * 6.283,
      lobe: 1.25,
    });
    const n = 3 + ((rnd() * 4) | 0);
    for (let k = 0; k < n; k++) {
      const a = (k / n) * 6.283 + rnd() * 1.1;
      blobs.push({
        x: 64 + Math.cos(a) * lerp(58, 74, rnd()),
        y: 64 + Math.sin(a) * lerp(58, 74, rnd()),
        r: lerp(5, 13, rnd()),
        ax: lerp(0.8, 1.25, rnd()),
        ay: 1,
        ph: rnd() * 6.283,
        lobe: 1,
      });
    }
  } else if (shape === 'river') {
    bankOff = (rnd() < 0.5 ? -1 : 1) * lerp(0.14, 0.2, rnd());
    halfW = lerp(2.2, 4.6, amt);
    tribOff = (rnd() - 0.5) * 0.4;
    tribHalf = halfW * 0.55;
    tribSide = bankOff > 0 ? -1 : 1;
  } else if (shape === 'valley') {
    bankOff = (rnd() < 0.5 ? -1 : 1) * 0.15;
    halfW = lerp(1.8, 3.6, amt);
    valleyHalf = 0.27;
  }

  // ---- per-tile evaluation -------------------------------------------------
  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const i = y * GRID_W + x;
      const w1 = nWarp.fbm(x * 0.016, y * 0.016, 3);
      const w2 = nWarp.fbm(x * 0.016 + 71.3, y * 0.016 + 19.7, 3);
      const wx = x + w1 * 15;
      const wy = y + w2 * 15;
      const wnx = wx / GRID_W - 0.5;
      const wny = wy / GRID_H - 0.5;
      const rad = Math.sqrt(wnx * wnx + wny * wny) * 2;
      const s = wnx * ca + wny * sa;
      const p = -wnx * sa + wny * ca;
      const big = nShape.fbm(x * 0.019, y * 0.019, 4);
      const fine = nShape.fbm(x * 0.062, y * 0.062, 3);
      const ridged = 1 - Math.abs(nRidge.fbm(x * 0.026, y * 0.026, 5));
      fRough[i] = clamp01(ridged * ridged * 1.15);

      let wp = -1;
      let mount = 0;

      switch (shape) {
        case 'coastal': {
          wp = s * 3.3 + big * 1.1 + fine * 0.3 + Math.sin(p * 8.4 + ph1) * 0.24;
          mount =
            smoothstep(clamp01(-s * 2.1 - 0.05)) * 0.9 +
            smoothstep(clamp01((rad - 0.86) * 1.7)) * 0.45;
          break;
        }
        case 'river': {
          const mean =
            0.075 * Math.sin(s * 6.4 + ph1) + 0.042 * Math.sin(s * 12.1 + ph2) + big * 0.03;
          const dp = Math.abs(p - bankOff - mean) * GRID_W;
          wp = (halfW - dp) * 0.5 + fine * 0.25;
          const dq = Math.abs(s - tribOff - 0.05 * Math.sin(p * 8.1 + ph3)) * GRID_W;
          const gate = smoothstep(clamp01(((p - bankOff) * tribSide - 0.02) * 7));
          const tw = (tribHalf - dq) * 0.5 + fine * 0.2;
          wp = Math.max(wp, tw * gate + (gate - 1) * 2);
          mount =
            smoothstep(clamp01((rad - 0.74) * 1.55)) * 0.85 +
            smoothstep(clamp01(((bankOff - p) * tribSide * -1 - 0.06) * 4.2)) * 0.55;
          break;
        }
        case 'valley': {
          const mean = 0.05 * Math.sin(s * 5.1 + ph1) + big * 0.025;
          const av = Math.abs(p - mean);
          mount = smoothstep(clamp01((av - valleyHalf) * 5.2)) * (0.85 + fRough[i] * 0.35);
          const dq = Math.abs(p - bankOff * 0.85 - mean) * GRID_W;
          wp = (halfW - dq) * 0.5 + fine * 0.2;
          break;
        }
        case 'lakes':
        case 'plains': {
          let best = -2;
          for (let k = 0; k < blobs.length; k++) {
            const v = blobField(blobs[k], x, y, big * 0.4 + fine * 0.15);
            if (v > best) best = v;
          }
          wp = best;
          mount =
            smoothstep(clamp01((rad - (shape === 'plains' ? 0.92 : 0.8)) * 1.6)) *
            (shape === 'plains' ? 0.5 : 0.9);
          break;
        }
        default: {
          let best = -2;
          for (let k = 0; k < blobs.length; k++) {
            const v = blobField(blobs[k], x, y, big * 0.42 + fine * 0.18);
            if (v > best) best = v;
          }
          wp = -best;
          // highlands sit part-way in from the shore, and only on one flank,
          // so the island keeps a broad flat side to build on
          const band = clamp01(1 - Math.abs(best - 0.5) * 2.8);
          const side = 0.3 + 0.7 * clamp01(s * 2.8 + 0.4);
          mount = band * side * (0.45 + fRough[i] * 0.85);
          break;
        }
      }

      fWater[i] = wp;
      // break the highlands into ranges and passes instead of a border wall
      const range = nRange.fbm(x * 0.0115, y * 0.0115, 3) * 0.5 + 0.5;
      fMount[i] = clamp01(mount) * (0.2 + 0.8 * smoothstep(clamp01((range - 0.33) * 2.8)));
    }
  }
}

/* ─────────────────────────── generation stages ────────────────────────────── */

/** binary-search the fWater threshold that submerges `target` of the map */
function solveWaterCut(target: number): number {
  let lo = -4;
  let hi = 4;
  for (let it = 0; it < 34; it++) {
    const mid = (lo + hi) * 0.5;
    let n = 0;
    for (let i = 0; i < TILE_COUNT; i++) if (fWater[i] > mid) n++;
    if (n / TILE_COUNT > target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) * 0.5;
}

/** turns the shape fields into quantised levels; water tiles get -1 for now */
function buildLevels(hills: number, cut: number, seed: number): void {
  const amp = lerp(3.5, MAX_LAND_LEVEL - MIN_LAND_LEVEL, clamp01(hills));
  const roll = lerp(0.6, 2.6, clamp01(hills));
  const nRoll = makeNoise2D((seed + 8675309) | 0);
  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const i = y * GRID_W + x;
      if (fWater[i] > cut) {
        lvl[i] = -1;
        continue;
      }
      const m = fMount[i];
      const peak = m * m * (0.5 + 0.5 * fRough[i]) * amp;
      const gentle = (nRoll.fbm(x * 0.028, y * 0.028, 3) * 0.5 + 0.5) * roll;
      const l = MIN_LAND_LEVEL + Math.round(peak + gentle);
      lvl[i] = l > MAX_LAND_LEVEL ? MAX_LAND_LEVEL : l;
    }
  }
}

interface Region {
  size: number;
  seedTile: number;
}

/** labels 4-connected dry regions into compId; returns the biggest one */
function largestDryComponent(): Region {
  compId.fill(-1);
  let best: Region = { size: 0, seedTile: -1 };
  let label = 0;
  let bestSumX = 0;
  let bestSumY = 0;
  let bestLabel = -1;
  for (let start = 0; start < TILE_COUNT; start++) {
    if (lvl[start] < 0 || compId[start] >= 0) continue;
    let head = 0;
    let tail = 0;
    bfsQueue[tail++] = start;
    compId[start] = label;
    let n = 0;
    let sx = 0;
    let sy = 0;
    while (head < tail) {
      const i = bfsQueue[head++];
      n++;
      const x = i % GRID_W;
      const y = (i / GRID_W) | 0;
      sx += x;
      sy += y;
      for (let k = 0; k < 4; k++) {
        const nx2 = x + NX[k];
        const ny2 = y + NY[k];
        if (nx2 < 0 || ny2 < 0 || nx2 >= GRID_W || ny2 >= GRID_H) continue;
        const j = ny2 * GRID_W + nx2;
        if (lvl[j] < 0 || compId[j] >= 0) continue;
        compId[j] = label;
        bfsQueue[tail++] = j;
      }
    }
    if (n > best.size) {
      best = { size: n, seedTile: start };
      bestSumX = sx;
      bestSumY = sy;
      bestLabel = label;
    }
    label++;
  }
  if (bestLabel >= 0 && best.size > 0) {
    const cx = bestSumX / best.size;
    const cy = bestSumY / best.size;
    let bd = Infinity;
    for (let i = 0; i < TILE_COUNT; i++) {
      if (compId[i] !== bestLabel) continue;
      const dx = (i % GRID_W) - cx;
      const dy = ((i / GRID_W) | 0) - cy;
      const d = dx * dx + dy * dy;
      if (d < bd) {
        bd = d;
        best.seedTile = i;
      }
    }
    for (let i = 0; i < TILE_COUNT; i++) compId[i] = compId[i] === bestLabel ? 1 : 0;
  } else {
    compId.fill(0);
  }
  return best;
}

/**
 * Best-first growth of the flat buildable core across the mainland. Cheap tiles
 * are near the seed, low, and nudged by noise so the border reads as organic
 * rather than circular.
 */
function growCore(main: Region, target: number, seed: number): number {
  isCore.fill(0);
  visited.fill(0);
  if (main.seedTile < 0) return 0;
  const nEdge = makeNoise2D((seed + 555555) | 0);
  const sx = main.seedTile % GRID_W;
  const sy = (main.seedTile / GRID_W) | 0;
  const buckets: number[][] = [];
  let maxBucket = 0;
  let cursor = 0;

  const push = (i: number) => {
    if (visited[i] || compId[i] !== 1) return;
    visited[i] = 1;
    const x = i % GRID_W;
    const y = (i / GRID_W) | 0;
    const dx = x - sx;
    const dy = y - sy;
    const d = Math.sqrt(dx * dx + dy * dy);
    const wobble = nEdge.fbm(x * 0.045, y * 0.045, 3) * 26;
    let sc = Math.round(d * 4 + wobble + (lvl[i] - MIN_LAND_LEVEL) * 16);
    // Dial's bucket queue: never insert behind the cursor or the tile is lost
    if (sc < cursor) sc = cursor;
    if (sc > 4095) sc = 4095;
    if (sc > maxBucket) maxBucket = sc;
    const b = buckets[sc];
    if (b) b.push(i);
    else buckets[sc] = [i];
  };

  push(main.seedTile);
  let taken = 0;
  for (let sc = 0; sc <= maxBucket && taken < target; sc++) {
    cursor = sc;
    const b = buckets[sc];
    if (!b) continue;
    for (let bi = 0; bi < b.length && taken < target; bi++) {
      const i = b[bi];
      isCore[i] = 1;
      lvl[i] = MIN_LAND_LEVEL;
      taken++;
      const x = i % GRID_W;
      const y = (i / GRID_W) | 0;
      for (let k = 0; k < 4; k++) {
        const nx2 = x + NX[k];
        const ny2 = y + NY[k];
        if (nx2 < 0 || ny2 < 0 || nx2 >= GRID_W || ny2 >= GRID_H) continue;
        push(ny2 * GRID_W + nx2);
      }
    }
  }
  return taken;
}

/** caps cliffs at MAX_STEP_DIFF (and 5 steps against open water) by lowering */
function relaxSlopes(): void {
  for (let pass = 0; pass < 40; pass++) {
    let changed = false;
    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const i = y * GRID_W + x;
        if (isCore[i] || lvl[i] <= MIN_LAND_LEVEL) continue;
        let mn = 32767;
        let wet = false;
        for (let k = 0; k < 4; k++) {
          const nx2 = x + NX[k];
          const ny2 = y + NY[k];
          if (nx2 < 0 || ny2 < 0 || nx2 >= GRID_W || ny2 >= GRID_H) continue;
          const j = ny2 * GRID_W + nx2;
          if (lvl[j] < 0) wet = true;
          else if (lvl[j] < mn) mn = lvl[j];
        }
        let cap = mn === 32767 ? MAX_LAND_LEVEL : mn + MAX_STEP_DIFF;
        if (wet && cap > MIN_LAND_LEVEL + 5) cap = MIN_LAND_LEVEL + 5;
        if (lvl[i] > cap) {
          lvl[i] = cap < MIN_LAND_LEVEL ? MIN_LAND_LEVEL : cap;
          changed = true;
        }
      }
    }
    if (!changed) break;
  }
}

/** removes single-tile pits and pimples outside the core */
function despeckle(): void {
  tmpLvl.set(lvl);
  for (let y = 1; y < GRID_H - 1; y++) {
    for (let x = 1; x < GRID_W - 1; x++) {
      const i = y * GRID_W + x;
      if (isCore[i] || lvl[i] < 0) continue;
      const a = tmpLvl[i - 1];
      const b = tmpLvl[i + 1];
      const c = tmpLvl[i - GRID_W];
      const d = tmpLvl[i + GRID_W];
      if (a < 0 || b < 0 || c < 0 || d < 0) continue;
      if (a === b && c === d && a === c && a !== tmpLvl[i]) lvl[i] = a;
    }
  }
}

/** multi-source BFS: distance to the coastline, on both sides of it */
function computeShoreDist(): void {
  shoreDist.fill(1023);
  let tail = 0;
  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const i = y * GRID_W + x;
      const wet = lvl[i] < 0;
      let edge = false;
      for (let k = 0; k < 4; k++) {
        const nx2 = x + NX[k];
        const ny2 = y + NY[k];
        if (nx2 < 0 || ny2 < 0 || nx2 >= GRID_W || ny2 >= GRID_H) continue;
        if (lvl[ny2 * GRID_W + nx2] < 0 !== wet) {
          edge = true;
          break;
        }
      }
      if (edge) {
        shoreDist[i] = 0;
        bfsQueue[tail++] = i;
      }
    }
  }
  let head = 0;
  while (head < tail) {
    const i = bfsQueue[head++];
    const x = i % GRID_W;
    const y = (i / GRID_W) | 0;
    const wet = lvl[i] < 0;
    const nd = shoreDist[i] + 1;
    for (let k = 0; k < 4; k++) {
      const nx2 = x + NX[k];
      const ny2 = y + NY[k];
      if (nx2 < 0 || ny2 < 0 || nx2 >= GRID_W || ny2 >= GRID_H) continue;
      const j = ny2 * GRID_W + nx2;
      if (lvl[j] < 0 !== wet) continue;
      if (shoreDist[j] <= nd) continue;
      shoreDist[j] = nd;
      bfsQueue[tail++] = j;
    }
  }
}

/** gives the sea floor a quantised depth ramp away from the shore */
function carveWaterDepth(seed: number): void {
  const nBed = makeNoise2D((seed + 24680) | 0);
  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const i = y * GRID_W + x;
      if (lvl[i] >= 0) continue;
      const jitter = nBed.fbm(x * 0.05, y * 0.05, 2) * 0.9;
      let depth = 1 + Math.floor(shoreDist[i] * 0.62 + jitter + 0.5);
      if (depth < 1) depth = 1;
      if (depth > -MIN_WATER_LEVEL) depth = -MIN_WATER_LEVEL;
      lvl[i] = -depth;
    }
  }
}

/**
 * Largest 4-connected run of dry tiles whose dry neighbours all share its
 * height — i.e. land you can build on with no terraforming at all.
 */
function flatFraction(): number {
  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const i = y * GRID_W + x;
      if (lvl[i] < 0) {
        visited[i] = 0;
        continue;
      }
      let flat = 1;
      for (let k = 0; k < 4; k++) {
        const nx2 = x + NX[k];
        const ny2 = y + NY[k];
        if (nx2 < 0 || ny2 < 0 || nx2 >= GRID_W || ny2 >= GRID_H) continue;
        const j = ny2 * GRID_W + nx2;
        if (lvl[j] >= 0 && lvl[j] !== lvl[i]) {
          flat = 0;
          break;
        }
      }
      visited[i] = flat;
    }
  }
  scoreBuf.fill(0);
  let best = 0;
  for (let start = 0; start < TILE_COUNT; start++) {
    if (!visited[start] || scoreBuf[start]) continue;
    let head = 0;
    let tail = 0;
    bfsQueue[tail++] = start;
    scoreBuf[start] = 1;
    let n = 0;
    while (head < tail) {
      const i = bfsQueue[head++];
      n++;
      const x = i % GRID_W;
      const y = (i / GRID_W) | 0;
      for (let k = 0; k < 4; k++) {
        const nx2 = x + NX[k];
        const ny2 = y + NY[k];
        if (nx2 < 0 || ny2 < 0 || nx2 >= GRID_W || ny2 >= GRID_H) continue;
        const j = ny2 * GRID_W + nx2;
        if (!visited[j] || scoreBuf[j]) continue;
        scoreBuf[j] = 1;
        bfsQueue[tail++] = j;
      }
    }
    if (n > best) best = n;
  }
  return best / TILE_COUNT;
}

/** paints TerrainKind + forest density from the finished height field */
function classify(grid: Grid, opts: TerrainOptions): void {
  const seed = opts.seed | 0;
  const nForest = makeNoise2D((seed + 31337) | 0);
  const nDirt = makeNoise2D((seed + 60613) | 0);
  const treesAmt = clamp01(opts.trees);
  let maxL = MIN_LAND_LEVEL;
  for (let i = 0; i < TILE_COUNT; i++) if (lvl[i] > maxL) maxL = lvl[i];
  const snowLine = Math.max(11, Math.round(maxL * 0.76));
  const rockLine = Math.max(6, Math.round(maxL * 0.52));

  // canopy field first, so the threshold can be solved for a predictable
  // coverage instead of depending on the noise distribution
  let dry = 0;
  let fMax = 0;
  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const i = y * GRID_W + x;
      if (lvl[i] < 0) {
        fForest[i] = -1;
        continue;
      }
      dry++;
      const f =
        (nForest.fbm(x * 0.03, y * 0.03, 4) * 0.5 + 0.5) * 0.78 +
        (nForest.fbm(x * 0.1, y * 0.1, 2) * 0.5 + 0.5) * 0.22;
      fForest[i] = f;
      if (f > fMax) fMax = f;
    }
  }
  const canopy = lerp(0.035, 0.52, treesAmt) * dry;
  let flo = 0;
  let fhi = 1;
  for (let it = 0; it < 24; it++) {
    const mid = (flo + fhi) * 0.5;
    let n = 0;
    for (let i = 0; i < TILE_COUNT; i++) if (fForest[i] > mid) n++;
    if (n > canopy) flo = mid;
    else fhi = mid;
  }
  const forestCut = (flo + fhi) * 0.5;
  const forestSpan = Math.max(0.02, fMax - forestCut);

  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const i = y * GRID_W + x;
      const l = lvl[i];
      if (l < 0) {
        grid.terrain[i] = shoreDist[i] <= 2 ? TerrainKind.Sand : TerrainKind.Dirt;
        grid.tree[i] = 0;
        continue;
      }
      let maxDiff = 0;
      for (let k = 0; k < 4; k++) {
        const nx2 = x + NX[k];
        const ny2 = y + NY[k];
        if (nx2 < 0 || ny2 < 0 || nx2 >= GRID_W || ny2 >= GRID_H) continue;
        const nl = lvl[ny2 * GRID_W + nx2];
        if (nl < 0) continue;
        const d = nl > l ? nl - l : l - nl;
        if (d > maxDiff) maxDiff = d;
      }
      const beachW = hash2(x, y, 7) < 0.4 ? 2 : 1;
      let kind: number;
      if (l >= snowLine) kind = TerrainKind.Snow;
      else if (maxDiff >= 2 || l >= rockLine) kind = TerrainKind.Rock;
      else if (shoreDist[i] <= beachW && l <= MIN_LAND_LEVEL + 2) kind = TerrainKind.Sand;
      else if (maxDiff >= 1 && nDirt.fbm(x * 0.085, y * 0.085, 2) > 0.34)
        kind = TerrainKind.Dirt;
      else kind = TerrainKind.Grass;

      let dens = ((fForest[i] - forestCut) / forestSpan) * 3.6 + 0.45;
      if (fForest[i] <= forestCut) dens = 0;
      if (dens > 0) {
        dens *= clamp01((snowLine - l) / 5);
        if (kind === TerrainKind.Sand) dens *= 0.3;
        else if (kind === TerrainKind.Rock) dens *= 0.35;
        else if (kind === TerrainKind.Snow) dens = 0;
        if (maxDiff >= 2) dens *= 0.5;
      }
      const t = dens <= 0.2 ? 0 : dens > 3 ? 3 : Math.round(dens);
      grid.tree[i] = t;
      if (t > 0 && (kind === TerrainKind.Grass || kind === TerrainKind.Dirt))
        kind = TerrainKind.Forest;
      grid.terrain[i] = kind;
    }
  }
}

/** wipes everything the player (or a previous map) put on the grid */
function resetGrid(grid: Grid): void {
  grid.zone.fill(0);
  grid.road.fill(0);
  grid.rail.fill(0);
  grid.wire.fill(0);
  grid.pipe.fill(0);
  grid.subway.fill(0);
  grid.tunnel.fill(0);
  grid.building.fill(0);
  grid.originOffset.fill(0);
  grid.level.fill(0);
  grid.variant.fill(0);
  grid.rotation.fill(0);
  grid.age.fill(0);
  grid.condition.fill(0);
  grid.powered.fill(0);
  grid.watered.fill(0);
  grid.roadNet.fill(0);
  grid.population.fill(0);
  grid.jobs.fill(0);
  grid.landValue.fill(0);
  grid.pollution.fill(0);
  grid.noise.fill(0);
  grid.crime.fill(0);
  grid.fireRisk.fill(0);
  grid.traffic.fill(0);
  grid.desirability.fill(0);
  grid.covPolice.fill(0);
  grid.covFire.fill(0);
  grid.covHealth.fill(0);
  grid.covEducation.fill(0);
  grid.covPark.fill(0);
  grid.covTransit.fill(0);
  grid.onFire.fill(0);
}

/** Builds a complete, playable map into `grid`. Deterministic for a given seed. */
export function generateTerrain(grid: Grid, opts: TerrainOptions): void {
  const seed = opts.seed | 0;
  let waterAim = waterTarget(opts.shape, clamp01(opts.water));
  let hills = clamp01(opts.hills);
  let coreAim = CORE_TARGET;

  for (let attempt = 0; attempt < 5; attempt++) {
    buildShapeFields(opts, mulberry32((seed + attempt * 7919) | 0));
    buildLevels(hills, solveWaterCut(waterAim), seed);
    const main = largestDryComponent();
    const target = Math.min(
      Math.round(coreAim * TILE_COUNT),
      Math.round(main.size * 0.94),
    );
    growCore(main, target, seed);
    relaxSlopes();
    despeckle();
    relaxSlopes();
    if (flatFraction() >= FLAT_MIN + 0.015) break;
    // Widen the plateau first — only start eating into the water feature and
    // the mountains once that is not enough.
    coreAim = Math.min(0.68, coreAim + 0.06);
    if (attempt >= 1) hills *= 0.8;
    if (attempt >= 2) waterAim *= 0.7;
  }

  computeShoreDist();
  carveWaterDepth(seed);
  resetGrid(grid);
  commitLevels(grid);
  classify(grid, opts);
  grid.markAllDirty();
}

/* ────────────────────────────── terraforming ──────────────────────────────── */

/** tiles the current edit pins in place (its neighbours yield around them) */
const pinned = new Uint8Array(TILE_COUNT);

const levelOf = (grid: Grid, i: number) => Math.round(grid.height[i] / HEIGHT_STEP);

/** loads levels for a box (plus a one-tile skirt) into the scratch buffers */
function loadBox(grid: Grid, x0: number, y0: number, x1: number, y1: number): void {
  const ax0 = x0 > 0 ? x0 - 1 : 0;
  const ay0 = y0 > 0 ? y0 - 1 : 0;
  const ax1 = x1 < GRID_W - 1 ? x1 + 1 : GRID_W - 1;
  const ay1 = y1 < GRID_H - 1 ? y1 + 1 : GRID_H - 1;
  for (let y = ay0; y <= ay1; y++) {
    for (let x = ax0; x <= ax1; x++) {
      const i = y * GRID_W + x;
      const l = levelOf(grid, i);
      lvl[i] = l;
      tmpLvl[i] = l;
      pinned[i] = 0;
    }
  }
}

/**
 * Relaxes dry, unpinned tiles inside the box until no neighbouring pair of dry
 * tiles differs by more than MAX_STEP_DIFF. Water tiles are left alone so sea
 * cliffs survive.
 */
function settleBox(x0: number, y0: number, x1: number, y1: number): void {
  for (let pass = 0; pass < 32; pass++) {
    let changed = false;
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const i = y * GRID_W + x;
        if (pinned[i] || lvl[i] < 0) continue;
        let mn = 32767;
        let mx = -32768;
        for (let k = 0; k < 4; k++) {
          const nx2 = x + NX[k];
          const ny2 = y + NY[k];
          if (nx2 < 0 || ny2 < 0 || nx2 >= GRID_W || ny2 >= GRID_H) continue;
          const nl = lvl[ny2 * GRID_W + nx2];
          if (nl < 0) continue;
          if (nl < mn) mn = nl;
          if (nl > mx) mx = nl;
        }
        if (mn === 32767) continue;
        let l = lvl[i];
        if (l < mx - MAX_STEP_DIFF) l = mx - MAX_STEP_DIFF;
        if (l > mn + MAX_STEP_DIFF) l = mn + MAX_STEP_DIFF;
        if (l > MAX_LAND_LEVEL) l = MAX_LAND_LEVEL;
        if (l < MIN_LAND_LEVEL) l = MIN_LAND_LEVEL;
        if (l !== lvl[i]) {
          lvl[i] = l;
          changed = true;
        }
      }
    }
    if (!changed) break;
  }
}

/** repaints terrain kinds after an edit; keeps existing tree density */
function retagRegion(grid: Grid, x0: number, y0: number, x1: number, y1: number): void {
  let maxL = MIN_LAND_LEVEL;
  for (let i = 0; i < TILE_COUNT; i++) {
    const l = Math.round(grid.height[i] / HEIGHT_STEP);
    if (l > maxL) maxL = l;
  }
  const snowLine = Math.max(11, Math.round(maxL * 0.76));
  const rockLine = Math.max(6, Math.round(maxL * 0.52));
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const i = y * GRID_W + x;
      if (grid.water[i]) {
        grid.terrain[i] = TerrainKind.Sand;
        grid.tree[i] = 0;
        continue;
      }
      const l = levelOf(grid, i);
      let maxDiff = 0;
      let nearWater = false;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx2 = x + dx;
          const ny2 = y + dy;
          if (nx2 < 0 || ny2 < 0 || nx2 >= GRID_W || ny2 >= GRID_H) continue;
          const j = ny2 * GRID_W + nx2;
          if (grid.water[j]) {
            if (dx * dx + dy * dy <= 2) nearWater = true;
            continue;
          }
          if (dx * dx + dy * dy > 1) continue;
          const d = Math.abs(levelOf(grid, j) - l);
          if (d > maxDiff) maxDiff = d;
        }
      }
      let kind: number;
      if (l >= snowLine) kind = TerrainKind.Snow;
      else if (maxDiff >= 2 || l >= rockLine) kind = TerrainKind.Rock;
      else if (nearWater && l <= MIN_LAND_LEVEL + 2) kind = TerrainKind.Sand;
      else kind = TerrainKind.Grass;
      if (
        grid.tree[i] > 0 &&
        (kind === TerrainKind.Grass || kind === TerrainKind.Dirt)
      )
        kind = TerrainKind.Forest;
      grid.terrain[i] = kind;
    }
  }
}

/** writes the scratch levels back into the grid; returns tiles changed */
function commitBox(grid: Grid, x0: number, y0: number, x1: number, y1: number): number {
  let changed = 0;
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const i = y * GRID_W + x;
      if (lvl[i] === tmpLvl[i]) continue;
      grid.height[i] = toHeight(lvl[i]);
      grid.water[i] = lvl[i] < 0 ? 1 : 0;
      grid.tree[i] = 0;
      grid.markDirty(x, y);
      changed++;
    }
  }
  return changed;
}

/**
 * Raise / lower / level a disc of tiles by one HEIGHT_STEP (or to `levelTo`,
 * a world-space height, for 'level'), smoothing the surrounding land so no
 * cliff exceeds MAX_STEP_DIFF. Returns the number of tiles changed.
 */
export function terraform(
  grid: Grid,
  x: number,
  y: number,
  radius: number,
  mode: 'raise' | 'lower' | 'level',
  levelTo?: number,
): number {
  if (!inBounds(x, y)) return 0;
  const r = radius > 0 ? Math.round(radius) : 0;
  const pad = r + 10;
  const bx0 = Math.max(0, x - pad);
  const by0 = Math.max(0, y - pad);
  const bx1 = Math.min(GRID_W - 1, x + pad);
  const by1 = Math.min(GRID_H - 1, y + pad);
  loadBox(grid, bx0, by0, bx1, by1);

  const rr = (r + 0.35) * (r + 0.35);
  let target = lvl[idx(x, y)];
  if (mode === 'level' && levelTo !== undefined) target = toLevel(levelTo);

  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      if (dx * dx + dy * dy > rr) continue;
      const px = x + dx;
      const py = y + dy;
      if (!inBounds(px, py)) continue;
      const i = py * GRID_W + px;
      let nl = mode === 'raise' ? lvl[i] + 1 : mode === 'lower' ? lvl[i] - 1 : target;
      if (nl > MAX_LAND_LEVEL) nl = MAX_LAND_LEVEL;
      if (nl < MIN_WATER_LEVEL) nl = MIN_WATER_LEVEL;
      lvl[i] = nl;
      pinned[i] = 1;
    }
  }

  settleBox(bx0, by0, bx1, by1);
  const n = commitBox(grid, bx0, by0, bx1, by1);
  if (n > 0) {
    retagRegion(
      grid,
      Math.max(0, bx0 - 2),
      Math.max(0, by0 - 2),
      Math.min(GRID_W - 1, bx1 + 2),
      Math.min(GRID_H - 1, by1 + 2),
    );
  }
  return n;
}

/**
 * Flattens a building footprint to its (rounded) average height, smoothing the
 * surrounding land. Returns false when the site cannot be levelled — off map,
 * partly submerged, or too wildly uneven.
 */
export function flattenFor(
  grid: Grid,
  x: number,
  y: number,
  w: number,
  h: number,
): boolean {
  if (w <= 0 || h <= 0) return false;
  if (!inBounds(x, y) || !inBounds(x + w - 1, y + h - 1)) return false;

  let sum = 0;
  let mn = 32767;
  let mx = -32768;
  for (let j = 0; j < h; j++) {
    for (let k = 0; k < w; k++) {
      const i = (y + j) * GRID_W + (x + k);
      if (grid.water[i]) return false;
      const l = levelOf(grid, i);
      sum += l;
      if (l < mn) mn = l;
      if (l > mx) mx = l;
    }
  }
  if (mx - mn > 8) return false;
  if (mx === mn) return true;

  let target = Math.round(sum / (w * h));
  if (target < MIN_LAND_LEVEL) target = MIN_LAND_LEVEL;
  if (target > MAX_LAND_LEVEL) target = MAX_LAND_LEVEL;

  const pad = 12;
  const bx0 = Math.max(0, x - pad);
  const by0 = Math.max(0, y - pad);
  const bx1 = Math.min(GRID_W - 1, x + w - 1 + pad);
  const by1 = Math.min(GRID_H - 1, y + h - 1 + pad);
  loadBox(grid, bx0, by0, bx1, by1);
  for (let j = 0; j < h; j++) {
    for (let k = 0; k < w; k++) {
      const i = (y + j) * GRID_W + (x + k);
      lvl[i] = target;
      pinned[i] = 1;
    }
  }
  settleBox(bx0, by0, bx1, by1);
  const n = commitBox(grid, bx0, by0, bx1, by1);
  if (n > 0) {
    retagRegion(
      grid,
      Math.max(0, bx0 - 2),
      Math.max(0, by0 - 2),
      Math.min(GRID_W - 1, bx1 + 2),
      Math.min(GRID_H - 1, by1 + 2),
    );
  }
  return true;
}
