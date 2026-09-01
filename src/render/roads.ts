/**
 * SETHCITY 6769 — road / rail / power-line renderer (section A5).
 *
 *  - proper 16-case connection meshing from the 4-neighbour bitmask: straight,
 *    corner, T, cross and dead-end tiles, each with kerbs, pavements, dashed or
 *    double centre markings, crosswalk stripes at intersections and a raised
 *    median on avenues,
 *  - highways on grassed embankments with guard rails,
 *  - rail with ballast bed, sleepers and twin steel rails (level crossings too),
 *  - bridges wherever a road/rail tile sits on water: arched continuous spans,
 *    concrete deck, railings and piers down into the water,
 *  - tunnel portals where a tunnel run meets open road (nothing on the hilltop),
 *  - slim land power poles at four-tile intervals with paired catenary wires;
 *    lattice pylons are reserved for water crossings,
 *  - streetlight pools: emissive patches on the tarmac that fade in at night
 *    via a uNight uniform (no real lights),
 *  - one merged vertex-coloured mesh per 16x16 chunk.
 *
 * Exports beyond the contract (consumed by render/props.ts, same section):
 *   roadSurfaceHeight() — exact drivable surface height at a world point,
 *   lampSpotsForTile()  — deterministic streetlamp positions,
 *   roadConnMask()      — the 4-neighbour road bitmask (N=1 E=2 S=4 W=8),
 *   ROAD_LIFT / PAVE_LIFT constants.
 */
import * as THREE from 'three';
import type { Grid } from '../core/grid';
import {
  GRID_W,
  GRID_H,
  CHUNK,
  CHUNKS_X,
  CHUNKS_Y,
  SEA_LEVEL,
  RoadType,
  idx,
  inBounds,
} from '../core/types';
import { hash2, clamp, lerp } from '../core/rng';

/* ────────────────────────────── constants ─────────────────────────────────── */

export const ROAD_LIFT = 0.02; // road surface above terrain
export const PAVE_LIFT = 0.055; // pavement above road surface
const MARK_LIFT = 0.012; // painted markings above road surface
const EMB = 0.32; // highway embankment height
const DECK_BASE = SEA_LEVEL + 0.55; // bridge deck base height

/** dirs: 0=N(y-1) 1=E(x+1) 2=S(y+1) 3=W(x-1) */
const DX = [0, 1, 0, -1] as const;
const DZ = [-1, 0, 1, 0] as const;

const C = (hex: number) => new THREE.Color(hex);
const C_STREET = C(0x41454c);
const C_AVE = C(0x393d44);
const C_HWY = C(0x34383e);
const C_PAVE = C(0x9b978c);
const C_KERB = C(0xb5b1a5);
const C_WHITE = C(0xe9ebe7);
const C_YELLOW = C(0xd9b13b);
const C_MEDIAN = C(0xaaa79a);
const C_FILL = C(0x8d7f66);
const C_EMB = C(0x7d8a58);
const C_GUARD = C(0xbbc1c6);
const C_DECK = C(0x8f959b);
const C_RAILING = C(0xced3d7);
const C_PIER = C(0x767c83);
const C_BALLAST = C(0x7b7568);
const C_BALLAST_D = C(0x655f54);
const C_SLEEPER = C(0x574739);
const C_RAILS = C(0x9aa2ab);
const C_PYLON = C(0x939ba1);
const C_POLE = C(0x665044);
const C_ARM = C(0x4e4540);
const C_WIRE = C(0x26282c);
const C_STONE = C(0x9b9489);
const C_STONE_D = C(0x7c766c);
const C_DARK = C(0x101216);

/* ──────────────────────────── tile predicates ─────────────────────────────── */

function roadAt(g: Grid, x: number, y: number): boolean {
  return inBounds(x, y) && g.road[idx(x, y)] > 0;
}
function railAt(g: Grid, x: number, y: number): boolean {
  return inBounds(x, y) && g.rail[idx(x, y)] > 0;
}
function wireAt(g: Grid, x: number, y: number): boolean {
  return inBounds(x, y) && g.wire[idx(x, y)] > 0;
}

/** 4-neighbour road connection bitmask: N=1 E=2 S=4 W=8. */
export function roadConnMask(g: Grid, x: number, y: number): number {
  let m = 0;
  for (let d = 0; d < 4; d++) if (roadAt(g, x + DX[d], y + DZ[d])) m |= 1 << d;
  return m;
}

function railConnMask(g: Grid, x: number, y: number): number {
  let m = 0;
  for (let d = 0; d < 4; d++) if (railAt(g, x + DX[d], y + DZ[d])) m |= 1 << d;
  return m;
}

/* ─────────────────────────── bridge span / arch ───────────────────────────── */

interface Span {
  axis: 0 | 1; // 0 = along x (E-W), 1 = along z (N-S)
  neg: number; // water tiles behind us along -axis
  run: number; // total consecutive water tiles in the span
}

function spanInfo(g: Grid, x: number, y: number, rail: boolean): Span {
  const at = rail ? railAt : roadAt;
  const wet = (xx: number, yy: number) =>
    inBounds(xx, yy) && g.water[idx(xx, yy)] === 1 && at(g, xx, yy);
  const ewWet = (wet(x + 1, y) ? 1 : 0) + (wet(x - 1, y) ? 1 : 0);
  const nsWet = (wet(x, y + 1) ? 1 : 0) + (wet(x, y - 1) ? 1 : 0);
  let axis: 0 | 1;
  if (ewWet !== nsWet) axis = ewWet > nsWet ? 0 : 1;
  else {
    const ew = (at(g, x + 1, y) ? 1 : 0) + (at(g, x - 1, y) ? 1 : 0);
    const ns = (at(g, x, y + 1) ? 1 : 0) + (at(g, x, y - 1) ? 1 : 0);
    axis = ns > ew ? 1 : 0;
  }
  const dx = axis === 0 ? 1 : 0;
  const dz = axis === 0 ? 0 : 1;
  let neg = 0;
  while (neg < 64 && wet(x - dx * (neg + 1), y - dz * (neg + 1))) neg++;
  let pos = 0;
  while (pos < 64 && wet(x + dx * (pos + 1), y + dz * (pos + 1))) pos++;
  return { axis, neg, run: neg + pos + 1 };
}

function archAmp(run: number): number {
  return Math.min(0.5, 0.05 + run * 0.055);
}
function archY(run: number, p: number): number {
  return archAmp(run) * Math.sin(clamp(p, 0, 1) * Math.PI);
}

/* ─────────────────────────── tunnel run geometry ──────────────────────────── */

interface Tun {
  axis: 0 | 1;
  neg: number;
  run: number;
  hA: number;
  hB: number;
}

function tunnelInfo(g: Grid, x: number, y: number): Tun {
  const e = roadAt(g, x + 1, y) ? 1 : 0;
  const w = roadAt(g, x - 1, y) ? 1 : 0;
  const n = roadAt(g, x, y - 1) ? 1 : 0;
  const s = roadAt(g, x, y + 1) ? 1 : 0;
  const axis: 0 | 1 = e + w >= n + s ? 0 : 1;
  const dx = axis === 0 ? 1 : 0;
  const dz = axis === 0 ? 0 : 1;
  const inTun = (xx: number, yy: number) =>
    roadAt(g, xx, yy) && g.tunnel[idx(xx, yy)] === 1;
  let neg = 0;
  while (neg < 64 && inTun(x - dx * (neg + 1), y - dz * (neg + 1))) neg++;
  let pos = 0;
  while (pos < 64 && inTun(x + dx * (pos + 1), y + dz * (pos + 1))) pos++;
  const ax = x - dx * (neg + 1);
  const ay = y - dz * (neg + 1);
  const bx = x + dx * (pos + 1);
  const by = y + dz * (pos + 1);
  const own = g.height[idx(x, y)];
  const hA =
    roadAt(g, ax, ay) && !g.tunnel[idx(ax, ay)] ? baseTop(g, ax, ay, false) : own;
  const hB =
    roadAt(g, bx, by) && !g.tunnel[idx(bx, by)] ? baseTop(g, bx, by, false) : own;
  return { axis, neg, run: neg + pos + 1, hA, hB };
}

/* ───────────────────────── surface height functions ───────────────────────── */

/** flat reference height of a road/rail tile's own deck (no per-edge blending) */
function baseTop(g: Grid, x: number, y: number, rail: boolean): number {
  const i = idx(x, y);
  if (g.water[i]) {
    const s = spanInfo(g, x, y, rail);
    return DECK_BASE + archY(s.run, (s.neg + 0.5) / s.run);
  }
  const h = g.height[i];
  if (!rail && g.road[i] === RoadType.Highway && !g.tunnel[i]) return h + EMB;
  return h;
}

/** shared-edge height between tile a and a connected neighbour b */
function edgeTop(
  g: Grid,
  xa: number,
  ya: number,
  xb: number,
  yb: number,
  rail: boolean,
): number {
  const ia = idx(xa, ya);
  const ib = idx(xb, yb);
  const tunA = !rail && g.tunnel[ia] === 1;
  const tunB = !rail && g.tunnel[ib] === 1;
  if (tunB && !tunA) return baseTop(g, xa, ya, rail); // ramping into a portal — stay level
  if (tunA && !tunB) return baseTop(g, xb, yb, rail); // portal mouth sits at the open side
  if (tunA && tunB) {
    const ta = tunnelInfo(g, xa, ya);
    return lerp(ta.hA, ta.hB, (ta.neg + (xb + yb > xa + ya ? 1 : 0)) / ta.run);
  }
  if (g.water[ia] && g.water[ib]) {
    const s = spanInfo(g, xa, ya, rail);
    const dx = xb - xa;
    const dz = yb - ya;
    const along = s.axis === 0 ? dx : dz;
    if ((s.axis === 0 && dz === 0) || (s.axis === 1 && dx === 0)) {
      const p = along > 0 ? (s.neg + 1) / s.run : s.neg / s.run;
      return DECK_BASE + archY(s.run, p);
    }
  }
  return Math.max(baseTop(g, xa, ya, rail), baseTop(g, xb, yb, rail));
}

/** scratch for tileSurfParams: [H, eN, eE, eS, eW] */
const surfP = new Float64Array(5);

function tileSurfParams(g: Grid, x: number, y: number, rail: boolean): void {
  const at = rail ? railAt : roadAt;
  const H = baseTop(g, x, y, rail);
  surfP[0] = H;
  for (let d = 0; d < 4; d++) {
    const nx = x + DX[d];
    const ny = y + DZ[d];
    surfP[1 + d] = at(g, nx, ny) ? edgeTop(g, x, y, nx, ny, rail) : H;
  }
}

function surfEval(
  H: number,
  eN: number,
  eE: number,
  eS: number,
  eW: number,
  u: number,
  v: number,
): number {
  const fx = u < 0.5 ? (eW - H) * (1 - 2 * u) : (eE - H) * (2 * u - 1);
  const fy = v < 0.5 ? (eN - H) * (1 - 2 * v) : (eS - H) * (2 * v - 1);
  return H + fx + fy;
}

/**
 * Exact drivable surface height (world Y, lift included) at a world XZ point.
 * Falls back to the tile's terrain height off-network. Used by props vehicles.
 */
export function roadSurfaceHeight(grid: Grid, wx: number, wz: number): number {
  const x = clamp(Math.floor(wx), 0, GRID_W - 1);
  const y = clamp(Math.floor(wz), 0, GRID_H - 1);
  const i = idx(x, y);
  const isRoad = grid.road[i] > 0;
  const isRail = grid.rail[i] > 0;
  if (!isRoad && !isRail) return grid.height[i] + ROAD_LIFT;
  const u = clamp(wx - x, 0, 1);
  const v = clamp(wz - y, 0, 1);
  if (isRoad && grid.tunnel[i]) {
    const t = tunnelInfo(grid, x, y);
    const along = t.axis === 0 ? u : v;
    return lerp(t.hA, t.hB, (t.neg + along) / t.run) + ROAD_LIFT;
  }
  tileSurfParams(grid, x, y, !isRoad);
  return surfEval(surfP[0], surfP[1], surfP[2], surfP[3], surfP[4], u, v) + ROAD_LIFT;
}

/* ───────────────────────────── streetlamp rule ────────────────────────────── */

export interface LampSpot {
  wx: number;
  wz: number;
  wy: number;
  rotY: number;
  /** local coords of the light pool painted on the tarmac */
  poolU: number;
  poolV: number;
}

/** deterministic streetlamp spots for a tile (straight streets/avenues only) */
export function lampSpotsForTile(grid: Grid, x: number, y: number): LampSpot[] {
  const i = idx(x, y);
  const rt = grid.road[i];
  if (!rt || rt === RoadType.Highway) return [];
  if (grid.water[i] || grid.tunnel[i]) return [];
  const mask = roadConnMask(grid, x, y);
  if (mask !== 0b0101 && mask !== 0b1010) return [];
  if (((x + y) & 1) !== 0) return [];
  const ns = mask === 0b0101;
  const side = hash2(x, y, 31) < 0.5 ? -1 : 1;
  const m0 = rt === RoadType.Avenue ? 0.07 : 0.18;
  let u: number, v: number, rotY: number, poolU: number, poolV: number;
  if (ns) {
    u = side < 0 ? m0 * 0.45 : 1 - m0 * 0.45;
    v = 0.5;
    rotY = side < 0 ? 0 : Math.PI;
    poolU = side < 0 ? m0 + 0.15 : 1 - m0 - 0.15;
    poolV = 0.5;
  } else {
    v = side < 0 ? m0 * 0.45 : 1 - m0 * 0.45;
    u = 0.5;
    rotY = side < 0 ? -Math.PI / 2 : Math.PI / 2;
    poolV = side < 0 ? m0 + 0.15 : 1 - m0 - 0.15;
    poolU = 0.5;
  }
  const wx = x + u;
  const wz = y + v;
  const wy = roadSurfaceHeight(grid, wx, wz) + PAVE_LIFT;
  return [{ wx, wz, wy, rotY, poolU, poolV }];
}

/* ───────────────────────── geometry accumulator ───────────────────────────── */

class Acc {
  pos: number[] = [];
  nor: number[] = [];
  col: number[] = [];
  emi: number[] = [];
  ind: number[] = [];
  private vc = 0;

  quad(
    ax: number, ay: number, az: number,
    bx: number, by: number, bz: number,
    cx: number, cy: number, cz: number,
    dx: number, dy: number, dz: number,
    col: THREE.Color, shade: number, emissive = 0,
  ): void {
    const ux = bx - ax, uy = by - ay, uz = bz - az;
    const vx = dx - ax, vy = dy - ay, vz = dz - az;
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const l = Math.hypot(nx, ny, nz) || 1;
    nx /= l; ny /= l; nz /= l;
    const r = col.r * shade, g = col.g * shade, b = col.b * shade;
    const base = this.vc;
    this.pos.push(ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz);
    for (let k = 0; k < 4; k++) {
      this.nor.push(nx, ny, nz);
      this.col.push(r, g, b);
      this.emi.push(emissive);
    }
    this.ind.push(base, base + 1, base + 2, base, base + 2, base + 3);
    this.vc += 4;
  }

  /** vertical-ish wall between two ground points; faces LEFT of p1→p2 travel */
  wall(
    x1: number, z1: number, x2: number, z2: number,
    yb1: number, yt1: number, yb2: number, yt2: number,
    col: THREE.Color, shade: number,
  ): void {
    this.quad(x1, yb1, z1, x2, yb2, z2, x2, yt2, z2, x1, yt1, z1, col, shade);
  }

  /** solid prism along p0→p1 with square cross-section half-width t (no caps) */
  bar(
    x0: number, y0: number, z0: number,
    x1: number, y1: number, z1: number,
    t: number, col: THREE.Color, shade: number,
  ): void {
    let dx = x1 - x0, dy = y1 - y0, dz = z1 - z0;
    const l = Math.hypot(dx, dy, dz) || 1;
    dx /= l; dy /= l; dz /= l;
    // side = dir x up (fallback +x for near-vertical bars)
    let sx = -dz, sy = 0, sz = dx;
    const sl = Math.hypot(sx, sy, sz);
    if (sl < 1e-4) { sx = 1; sy = 0; sz = 0; }
    else { sx /= sl; sz /= sl; }
    // up2 = side x dir
    const ux = sy * dz - sz * dy;
    const uy = sz * dx - sx * dz;
    const uz = sx * dy - sy * dx;
    const rx = [sx + ux, sx - ux, -sx - ux, -sx + ux];
    const ry = [sy + uy, sy - uy, -sy - uy, -sy + uy];
    const rz = [sz + uz, sz - uz, -sz - uz, -sz + uz];
    for (let k = 0; k < 4; k++) {
      const k2 = (k + 1) & 3;
      this.quad(
        x0 + rx[k] * t, y0 + ry[k] * t, z0 + rz[k] * t,
        x0 + rx[k2] * t, y0 + ry[k2] * t, z0 + rz[k2] * t,
        x1 + rx[k2] * t, y1 + ry[k2] * t, z1 + rz[k2] * t,
        x1 + rx[k] * t, y1 + ry[k] * t, z1 + rz[k] * t,
        col, shade,
      );
    }
  }

  get empty(): boolean {
    return this.ind.length === 0;
  }
}

type Surf = (u: number, v: number) => number;

/** local-frame surface quad helper (a,b,c,d wound for an upward normal) */
function sq(
  acc: Acc, x: number, y: number, surf: Surf,
  u0: number, v0: number, u1: number, v1: number,
  dy: number, col: THREE.Color, shade: number, emissive = 0,
): void {
  acc.quad(
    x + u0, surf(u0, v0) + dy, y + v0,
    x + u0, surf(u0, v1) + dy, y + v1,
    x + u1, surf(u1, v1) + dy, y + v1,
    x + u1, surf(u1, v0) + dy, y + v0,
    col, shade, emissive,
  );
}

/* ────────────────────────────── the renderer ──────────────────────────────── */

export class RoadRenderer {
  private scene: THREE.Scene;
  private grid: Grid;
  private meshes: (THREE.Mesh | null)[];
  private pipeMeshes: (THREE.InstancedMesh | null)[];
  private material: THREE.MeshLambertMaterial;
  private pipeGeometry: THREE.CylinderGeometry;
  private pipeMaterial: THREE.MeshLambertMaterial;
  private markerMatrix = new THREE.Matrix4();
  private uNight = { value: 0 };
  private bridgeQueued = new Set<number>();

  constructor(scene: THREE.Scene, grid: Grid) {
    this.scene = scene;
    this.grid = grid;
    this.meshes = new Array<THREE.Mesh | null>(CHUNKS_X * CHUNKS_Y).fill(null);
    this.pipeMeshes = new Array<THREE.InstancedMesh | null>(CHUNKS_X * CHUNKS_Y).fill(null);
    this.material = new THREE.MeshLambertMaterial({ vertexColors: true });
    const uNight = this.uNight;
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.uNight = uNight;
      shader.vertexShader =
        'attribute float aEmissive;\nvarying float vEmissive;\n' +
        shader.vertexShader.replace(
          '#include <color_vertex>',
          '#include <color_vertex>\n\tvEmissive = aEmissive;',
        );
      shader.fragmentShader =
        'varying float vEmissive;\nuniform float uNight;\n' +
        shader.fragmentShader.replace(
          '#include <emissivemap_fragment>',
          '#include <emissivemap_fragment>\n\ttotalEmissiveRadiance += vec3(1.0, 0.72, 0.38) * vEmissive * uNight;',
        );
    };
    this.material.customProgramCacheKey = () => 'sethcity-roads';
    this.pipeGeometry = new THREE.CylinderGeometry(0.105, 0.105, 0.025, 10);
    this.pipeMaterial = new THREE.MeshLambertMaterial({ color: 0x4c9fd1 });
  }

  rebuildAll(): void {
    for (let cy = 0; cy < CHUNKS_Y; cy++)
      for (let cx = 0; cx < CHUNKS_X; cx++) this.buildChunk(cx, cy);
  }

  rebuildChunk(cx: number, cy: number): void {
    this.buildChunk(cx, cy);
    const ci = cy * CHUNKS_X + cx;
    if (this.bridgeQueued.delete(ci)) return;
    // a bridge span's arch depends on tiles that may live in neighbouring
    // chunks — when this chunk holds any bridge tile, refresh its neighbours
    // so deck heights stay continuous across chunk borders.
    if (this.chunkHasBridge(cx, cy)) {
      const enqueue = (n: number) => {
        if (n === ci || this.grid.dirtyChunks.has(n)) return;
        this.bridgeQueued.add(n);
        this.grid.dirtyChunks.add(n);
      };
      if (cx > 0) enqueue(cy * CHUNKS_X + cx - 1);
      if (cx < CHUNKS_X - 1) enqueue(cy * CHUNKS_X + cx + 1);
      if (cy > 0) enqueue((cy - 1) * CHUNKS_X + cx);
      if (cy < CHUNKS_Y - 1) enqueue((cy + 1) * CHUNKS_X + cx);
    }
  }

  update(dt: number, elapsed: number, nightFactor: number): void {
    this.uNight.value = nightFactor;
  }

  dispose(): void {
    for (let i = 0; i < this.meshes.length; i++) this.removeMesh(i);
    for (let i = 0; i < this.pipeMeshes.length; i++) this.removePipeMesh(i);
    this.bridgeQueued.clear();
    this.material.dispose();
    this.pipeGeometry.dispose();
    this.pipeMaterial.dispose();
  }

  /* ────────────────────────── chunk building ──────────────────────────────── */

  private chunkHasBridge(cx: number, cy: number): boolean {
    const g = this.grid;
    const x0 = cx * CHUNK, y0 = cy * CHUNK;
    for (let y = y0; y < y0 + CHUNK; y++)
      for (let x = x0; x < x0 + CHUNK; x++) {
        const i = idx(x, y);
        if (g.water[i] && (g.road[i] || g.rail[i])) return true;
      }
    return false;
  }

  private removeMesh(ci: number): void {
    const m = this.meshes[ci];
    if (!m) return;
    this.scene.remove(m);
    m.geometry.dispose();
    this.meshes[ci] = null;
  }

  private removePipeMesh(ci: number): void {
    const mesh = this.pipeMeshes[ci];
    if (!mesh) return;
    this.scene.remove(mesh);
    this.pipeMeshes[ci] = null;
  }

  private buildPipeMarkers(cx: number, cy: number): void {
    const ci = cy * CHUNKS_X + cx;
    this.removePipeMesh(ci);
    const mesh = new THREE.InstancedMesh(this.pipeGeometry, this.pipeMaterial, CHUNK * CHUNK);
    let count = 0;
    const x0 = cx * CHUNK, y0 = cy * CHUNK;
    for (let y = y0; y < y0 + CHUNK; y++) for (let x = x0; x < x0 + CHUNK; x++) {
      const i = idx(x, y);
      if (!this.grid.pipe[i] || this.grid.water[i]) continue;
      // Offset alternating covers to read as a dashed utility trace without
      // competing with roads or zoning paint.
      const ox = (x + y) & 1 ? 0.32 : 0.68;
      this.markerMatrix.makeTranslation(x + ox, this.grid.height[i] + 0.045, y + 0.5);
      mesh.setMatrixAt(count++, this.markerMatrix);
    }
    if (!count) return;
    mesh.count = count;
    mesh.instanceMatrix.needsUpdate = true;
    mesh.name = `pipe-access-${cx}-${cy}`;
    mesh.receiveShadow = false;
    mesh.castShadow = false;
    this.scene.add(mesh);
    this.pipeMeshes[ci] = mesh;
  }

  private buildChunk(cx: number, cy: number): void {
    const ci = cy * CHUNKS_X + cx;
    this.removeMesh(ci);
    this.buildPipeMarkers(cx, cy);
    const g = this.grid;
    const acc = new Acc();
    const x0 = cx * CHUNK, y0 = cy * CHUNK;
    for (let y = y0; y < y0 + CHUNK; y++)
      for (let x = x0; x < x0 + CHUNK; x++) {
        const i = idx(x, y);
        if (g.road[i]) this.roadTile(acc, x, y);
        else if (g.rail[i]) this.railTile(acc, x, y);
        if (g.wire[i]) this.wireTile(acc, x, y);
      }
    if (acc.empty) return;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(acc.pos, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(acc.nor, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(acc.col, 3));
    geo.setAttribute('aEmissive', new THREE.Float32BufferAttribute(acc.emi, 1));
    geo.setIndex(
      acc.pos.length / 3 > 65535
        ? new THREE.Uint32BufferAttribute(acc.ind, 1)
        : new THREE.Uint16BufferAttribute(acc.ind, 1),
    );
    geo.computeBoundingSphere();
    const mesh = new THREE.Mesh(geo, this.material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.matrixAutoUpdate = false;
    this.scene.add(mesh);
    this.meshes[ci] = mesh;
  }

  /* ─────────────────────────── road tile cases ────────────────────────────── */

  private makeSurf(x: number, y: number, rail: boolean): Surf {
    tileSurfParams(this.grid, x, y, rail);
    const H = surfP[0], eN = surfP[1], eE = surfP[2], eS = surfP[3], eW = surfP[4];
    return (u, v) => surfEval(H, eN, eE, eS, eW, u, v);
  }

  private roadTile(acc: Acc, x: number, y: number): void {
    const g = this.grid;
    const i = idx(x, y);
    if (g.tunnel[i]) {
      this.portals(acc, x, y);
      return;
    }
    const rt = g.road[i];
    const mask = roadConnMask(g, x, y);
    const surf = this.makeSurf(x, y, false);
    const shade = 0.93 + hash2(x, y, 11) * 0.11;
    if (g.water[i]) this.bridge(acc, x, y, surf, mask, false, rt, shade);
    else if (rt === RoadType.Highway) this.highway(acc, x, y, surf, mask, shade);
    else this.streetAvenue(acc, x, y, surf, mask, rt, shade);
    // level crossing: rails laid straight over the road surface
    if (g.rail[i]) {
      const rm = railConnMask(g, x, y);
      for (let d = 0; d < 4; d++)
        if (rm & (1 << d)) this.railPair(acc, x, y, surf, d, ROAD_LIFT + 0.012, 0, 0.52);
    }
  }

  private streetAvenue(
    acc: Acc, x: number, y: number, surf: Surf,
    mask: number, rt: number, shade: number,
  ): void {
    const g = this.grid;
    const ave = rt === RoadType.Avenue;
    const m0 = ave ? 0.07 : 0.18;
    const m1 = 1 - m0;
    const asph = ave ? C_AVE : C_STREET;
    let nConn = 0;
    for (let d = 0; d < 4; d++) if (mask & (1 << d)) nConn++;

    // roadway: central square + one arm per connection
    sq(acc, x, y, surf, m0, m0, m1, m1, ROAD_LIFT, asph, shade);
    if (mask & 1) sq(acc, x, y, surf, m0, 0, m1, m0, ROAD_LIFT, asph, shade);
    if (mask & 2) sq(acc, x, y, surf, m1, m0, 1, m1, ROAD_LIFT, asph, shade);
    if (mask & 4) sq(acc, x, y, surf, m0, m1, m1, 1, ROAD_LIFT, asph, shade);
    if (mask & 8) sq(acc, x, y, surf, 0, m0, m0, m1, ROAD_LIFT, asph, shade);

    // pavements: corners always, edge strips on unconnected sides
    const pl = ROAD_LIFT + PAVE_LIFT;
    const pshade = 0.94 + hash2(x, y, 13) * 0.1;
    sq(acc, x, y, surf, 0, 0, m0, m0, pl, C_PAVE, pshade);
    sq(acc, x, y, surf, m1, 0, 1, m0, pl, C_PAVE, pshade);
    sq(acc, x, y, surf, m1, m1, 1, 1, pl, C_PAVE, pshade);
    sq(acc, x, y, surf, 0, m1, m0, 1, pl, C_PAVE, pshade);
    if (!(mask & 1)) sq(acc, x, y, surf, m0, 0, m1, m0, pl, C_PAVE, pshade);
    if (!(mask & 2)) sq(acc, x, y, surf, m1, m0, 1, m1, pl, C_PAVE, pshade);
    if (!(mask & 4)) sq(acc, x, y, surf, m0, m1, m1, 1, pl, C_PAVE, pshade);
    if (!(mask & 8)) sq(acc, x, y, surf, 0, m0, m0, m1, pl, C_PAVE, pshade);

    // kerb walls at every roadway/pavement boundary (face the roadway)
    const kerb = (
      ua: number, va: number, ub: number, vb: number,
    ) => {
      acc.wall(
        x + ua, y + va, x + ub, y + vb,
        surf(ua, va) + ROAD_LIFT, surf(ua, va) + pl,
        surf(ub, vb) + ROAD_LIFT, surf(ub, vb) + pl,
        C_KERB, shade,
      );
    };
    if (mask & 1) { kerb(m0, m0, m0, 0); kerb(m1, 0, m1, m0); }
    else kerb(m0, m0, m1, m0);
    if (mask & 2) { kerb(m1, m0, 1, m0); kerb(1, m1, m1, m1); }
    else kerb(m1, m0, m1, m1);
    if (mask & 4) { kerb(m0, 1, m0, m1); kerb(m1, m1, m1, 1); }
    else kerb(m1, m1, m0, m1);
    if (mask & 8) { kerb(0, m0, m0, m0); kerb(m0, m1, 0, m1); }
    else kerb(m0, m1, m0, m0);

    // embankment fill walls where the roadway ramps above its own terrain
    this.rampFills(acc, x, y, surf, mask, m0, m1, C_FILL, shade);

    // markings
    if (nConn >= 3) {
      this.crosswalks(acc, x, y, surf, mask, m0, m1);
    } else if (!ave) {
      // dashed centre line, per connected arm from edge towards the centre
      for (let d = 0; d < 4; d++) {
        if (!(mask & (1 << d))) continue;
        for (let k = 0; k < 3; k++) {
          const t0 = 0.05 + k * 0.17;
          const t1 = t0 + 0.09;
          if (d === 0) sq(acc, x, y, surf, 0.487, t0, 0.513, t1, MARK_LIFT, C_YELLOW, 1);
          else if (d === 2) sq(acc, x, y, surf, 0.487, 1 - t1, 0.513, 1 - t0, MARK_LIFT, C_YELLOW, 1);
          else if (d === 3) sq(acc, x, y, surf, t0, 0.487, t1, 0.513, MARK_LIFT, C_YELLOW, 1);
          else sq(acc, x, y, surf, 1 - t1, 0.487, 1 - t0, 0.513, MARK_LIFT, C_YELLOW, 1);
        }
      }
    }
    if (ave && nConn <= 2) {
      // white edge lines
      for (let d = 0; d < 4; d++) {
        if (!(mask & (1 << d))) continue;
        const a0 = m0 + 0.028, a1 = m0 + 0.05;
        const b0 = m1 - 0.05, b1 = m1 - 0.028;
        if (d === 0 || d === 2) {
          const v0 = d === 0 ? 0 : 0.55, v1 = d === 0 ? 0.45 : 1;
          sq(acc, x, y, surf, a0, v0, a1, v1, MARK_LIFT, C_WHITE, 0.9);
          sq(acc, x, y, surf, b0, v0, b1, v1, MARK_LIFT, C_WHITE, 0.9);
        } else {
          const u0 = d === 3 ? 0 : 0.55, u1 = d === 3 ? 0.45 : 1;
          sq(acc, x, y, surf, u0, a0, u1, a1, MARK_LIFT, C_WHITE, 0.9);
          sq(acc, x, y, surf, u0, b0, u1, b1, MARK_LIFT, C_WHITE, 0.9);
        }
      }
      // raised median: centre block plus one strip per connected arm
      const mh = ROAD_LIFT + 0.07;
      const medBlock = (u0: number, v0: number, u1: number, v1: number) => {
        sq(acc, x, y, surf, u0, v0, u1, v1, mh, C_MEDIAN, shade);
        acc.wall(x + u0, y + v0, x + u0, y + v1, surf(u0, v0) + ROAD_LIFT, surf(u0, v0) + mh, surf(u0, v1) + ROAD_LIFT, surf(u0, v1) + mh, C_MEDIAN, shade * 0.85);
        acc.wall(x + u1, y + v1, x + u1, y + v0, surf(u1, v1) + ROAD_LIFT, surf(u1, v1) + mh, surf(u1, v0) + ROAD_LIFT, surf(u1, v0) + mh, C_MEDIAN, shade * 0.85);
        acc.wall(x + u1, y + v0, x + u0, y + v0, surf(u1, v0) + ROAD_LIFT, surf(u1, v0) + mh, surf(u0, v0) + ROAD_LIFT, surf(u0, v0) + mh, C_MEDIAN, shade * 0.85);
        acc.wall(x + u0, y + v1, x + u1, y + v1, surf(u0, v1) + ROAD_LIFT, surf(u0, v1) + mh, surf(u1, v1) + ROAD_LIFT, surf(u1, v1) + mh, C_MEDIAN, shade * 0.85);
      };
      medBlock(0.45, 0.45, 0.55, 0.55);
      if (mask & 1) medBlock(0.45, 0, 0.55, 0.45);
      if (mask & 2) medBlock(0.55, 0.45, 1, 0.55);
      if (mask & 4) medBlock(0.45, 0.55, 0.55, 1);
      if (mask & 8) medBlock(0, 0.45, 0.45, 0.55);
    }

    // streetlight pools (glow at night via aEmissive)
    for (const s of lampSpotsForTile(g, x, y)) {
      sq(
        acc, x, y, surf,
        s.poolU - 0.14, s.poolV - 0.14, s.poolU + 0.14, s.poolV + 0.14,
        MARK_LIFT * 0.6, asph, shade, 0.85,
      );
    }
  }

  private crosswalks(
    acc: Acc, x: number, y: number, surf: Surf,
    mask: number, m0: number, m1: number,
  ): void {
    const w = 0.05, gap = 0.048;
    for (let d = 0; d < 4; d++) {
      if (!(mask & (1 << d))) continue;
      const lo = m0 + 0.03, hi = m1 - 0.03;
      for (let a = lo; a + w <= hi + 1e-4; a += w + gap) {
        if (d === 0) sq(acc, x, y, surf, a, 0.045, a + w, 0.145, MARK_LIFT, C_WHITE, 0.95);
        else if (d === 2) sq(acc, x, y, surf, a, 0.855, a + w, 0.955, MARK_LIFT, C_WHITE, 0.95);
        else if (d === 3) sq(acc, x, y, surf, 0.045, a, 0.145, a + w, MARK_LIFT, C_WHITE, 0.95);
        else sq(acc, x, y, surf, 0.855, a, 0.955, a + w, MARK_LIFT, C_WHITE, 0.95);
      }
    }
  }

  /** side fill-walls under arms that ramp above the tile's own flat terrain */
  private rampFills(
    acc: Acc, x: number, y: number, surf: Surf,
    mask: number, m0: number, m1: number, col: THREE.Color, shade: number,
  ): void {
    const g = this.grid;
    const hTer = g.height[idx(x, y)];
    const bot = hTer - 0.04;
    const need = (u: number, v: number) => surf(u, v) - hTer > 0.05;
    // N arm flanks
    if (mask & 1 && (need(m0, 0) || need(m1, 0))) {
      acc.wall(x + m0, y, x + m0, y + m0, bot, surf(m0, 0) + ROAD_LIFT, bot, surf(m0, m0) + ROAD_LIFT, col, shade);
      acc.wall(x + m1, y + m0, x + m1, y, bot, surf(m1, m0) + ROAD_LIFT, bot, surf(m1, 0) + ROAD_LIFT, col, shade);
    }
    if (mask & 4 && (need(m0, 1) || need(m1, 1))) {
      acc.wall(x + m0, y + m1, x + m0, y + 1, bot, surf(m0, m1) + ROAD_LIFT, bot, surf(m0, 1) + ROAD_LIFT, col, shade);
      acc.wall(x + m1, y + 1, x + m1, y + m1, bot, surf(m1, 1) + ROAD_LIFT, bot, surf(m1, m1) + ROAD_LIFT, col, shade);
    }
    if (mask & 2 && (need(1, m0) || need(1, m1))) {
      acc.wall(x + 1, y + m0, x + m1, y + m0, bot, surf(1, m0) + ROAD_LIFT, bot, surf(m1, m0) + ROAD_LIFT, col, shade);
      acc.wall(x + m1, y + m1, x + 1, y + m1, bot, surf(m1, m1) + ROAD_LIFT, bot, surf(1, m1) + ROAD_LIFT, col, shade);
    }
    if (mask & 8 && (need(0, m0) || need(0, m1))) {
      acc.wall(x + m0, y + m0, x, y + m0, bot, surf(m0, m0) + ROAD_LIFT, bot, surf(0, m0) + ROAD_LIFT, col, shade);
      acc.wall(x, y + m1, x + m0, y + m1, bot, surf(0, m1) + ROAD_LIFT, bot, surf(m0, m1) + ROAD_LIFT, col, shade);
    }
  }

  /* ─────────────────────────────── highway ────────────────────────────────── */

  private highway(
    acc: Acc, x: number, y: number, surf: Surf, mask: number, shade: number,
  ): void {
    const g = this.grid;
    const d0 = 0.08, d1 = 0.92;
    const hTer = g.height[idx(x, y)];

    // deck
    sq(acc, x, y, surf, d0, d0, d1, d1, ROAD_LIFT, C_HWY, shade);
    if (mask & 1) sq(acc, x, y, surf, d0, 0, d1, d0, ROAD_LIFT, C_HWY, shade);
    if (mask & 2) sq(acc, x, y, surf, d1, d0, 1, d1, ROAD_LIFT, C_HWY, shade);
    if (mask & 4) sq(acc, x, y, surf, d0, d1, d1, 1, ROAD_LIFT, C_HWY, shade);
    if (mask & 8) sq(acc, x, y, surf, 0, d0, d0, d1, ROAD_LIFT, C_HWY, shade);

    // embankment slopes on unconnected sides (from deck edge down to terrain)
    const emb = (
      ua: number, va: number, ub: number, vb: number, // deck-edge line (top)
      oa: number, ob: number, ovA: number, ovB: number, // outer line at terrain
    ) => {
      acc.quad(
        x + oa, hTer + 0.01, y + ovA,
        x + ob, hTer + 0.01, y + ovB,
        x + ub, surf(ub, vb) + ROAD_LIFT * 0.5, y + vb,
        x + ua, surf(ua, va) + ROAD_LIFT * 0.5, y + va,
        C_EMB, shade,
      );
    };
    if (!(mask & 1)) emb(d1, d0, d0, d0, 1, 0, 0, 0);
    if (!(mask & 4)) emb(d0, d1, d1, d1, 0, 1, 1, 1);
    if (!(mask & 2)) emb(d1, d1, d1, d0, 1, 1, 1, 0);
    if (!(mask & 8)) emb(d0, d0, d0, d1, 0, 0, 0, 1);

    // guard rails along deck edges bordering unconnected sides
    const guard = (
      ua: number, va: number, ub: number, vb: number,
    ) => {
      const y0a = surf(ua, va) + ROAD_LIFT + 0.05;
      const y0b = surf(ub, vb) + ROAD_LIFT + 0.05;
      acc.bar(x + ua, y0a + 0.06, y + va, x + ub, y0b + 0.06, y + vb, 0.022, C_GUARD, shade);
    };
    const uLo = mask & 8 ? 0 : d0;
    const uHi = mask & 2 ? 1 : d1;
    const vLo = mask & 1 ? 0 : d0;
    const vHi = mask & 4 ? 1 : d1;
    if (!(mask & 1)) guard(uLo, d0, uHi, d0);
    if (!(mask & 4)) guard(uLo, d1, uHi, d1);
    if (!(mask & 8)) guard(d0, vLo, d0, vHi);
    if (!(mask & 2)) guard(d1, vLo, d1, vHi);

    // lane dashes offset either side of the centre line, along connected arms
    for (let d = 0; d < 4; d++) {
      if (!(mask & (1 << d))) continue;
      for (const off of [-0.17, 0.17]) {
        for (let k = 0; k < 3; k++) {
          const t0 = 0.06 + k * 0.17;
          const t1 = t0 + 0.08;
          const c0 = 0.5 + off - 0.012, c1 = 0.5 + off + 0.012;
          if (d === 0) sq(acc, x, y, surf, c0, t0, c1, t1, MARK_LIFT, C_WHITE, 0.9);
          else if (d === 2) sq(acc, x, y, surf, c0, 1 - t1, c1, 1 - t0, MARK_LIFT, C_WHITE, 0.9);
          else if (d === 3) sq(acc, x, y, surf, t0, c0, t1, c1, MARK_LIFT, C_WHITE, 0.9);
          else sq(acc, x, y, surf, 1 - t1, c0, 1 - t0, c1, MARK_LIFT, C_WHITE, 0.9);
        }
      }
    }
  }

  /* ─────────────────────────────── bridges ────────────────────────────────── */

  private bridge(
    acc: Acc, x: number, y: number, surf: Surf,
    mask: number, rail: boolean, rt: number, shade: number,
  ): void {
    const g = this.grid;
    const i = idx(x, y);
    const d0 = rail ? 0.2 : 0.14;
    const d1 = 1 - d0;
    const top = rail ? C_DECK : rt === RoadType.Highway ? C_HWY : C_AVE;

    // deck surface
    sq(acc, x, y, surf, d0, d0, d1, d1, ROAD_LIFT, top, shade);
    if (mask & 1) sq(acc, x, y, surf, d0, 0, d1, d0, ROAD_LIFT, top, shade);
    if (mask & 2) sq(acc, x, y, surf, d1, d0, 1, d1, ROAD_LIFT, top, shade);
    if (mask & 4) sq(acc, x, y, surf, d0, d1, d1, 1, ROAD_LIFT, top, shade);
    if (mask & 8) sq(acc, x, y, surf, 0, d0, d0, d1, ROAD_LIFT, top, shade);

    // deck slab sides + railings along sides not continuing onto neighbours
    const uLo = mask & 8 ? 0 : d0;
    const uHi = mask & 2 ? 1 : d1;
    const vLo = mask & 1 ? 0 : d0;
    const vHi = mask & 4 ? 1 : d1;
    const sideRail = (
      ua: number, va: number, ub: number, vb: number,
    ) => {
      const ya = surf(ua, va) + ROAD_LIFT;
      const yb = surf(ub, vb) + ROAD_LIFT;
      // slab side (faces left of a→b)
      acc.wall(x + ua, y + va, x + ub, y + vb, ya - 0.16, ya - 0.01, yb - 0.16, yb - 0.01, C_DECK, shade);
      // parapet railing
      acc.bar(x + ua, ya + 0.09, y + va, x + ub, yb + 0.09, y + vb, 0.02, C_RAILING, shade);
      acc.bar(x + ua, ya + 0.045, y + va, x + ub, yb + 0.045, y + vb, 0.012, C_RAILING, shade * 0.9);
    };
    if (!(mask & 1)) sideRail(uHi, d0, uLo, d0);
    if (!(mask & 4)) sideRail(uLo, d1, uHi, d1);
    if (!(mask & 8)) sideRail(d0, vLo, d0, vHi);
    if (!(mask & 2)) sideRail(d1, vHi, d1, vLo);

    // markings / rails on deck
    if (!rail) {
      for (let d = 0; d < 4; d++) {
        if (!(mask & (1 << d))) continue;
        for (let k = 0; k < 3; k++) {
          const t0 = 0.06 + k * 0.17;
          const t1 = t0 + 0.08;
          if (d === 0) sq(acc, x, y, surf, 0.488, t0, 0.512, t1, MARK_LIFT, C_WHITE, 0.9);
          else if (d === 2) sq(acc, x, y, surf, 0.488, 1 - t1, 0.512, 1 - t0, MARK_LIFT, C_WHITE, 0.9);
          else if (d === 3) sq(acc, x, y, surf, t0, 0.488, t1, 0.512, MARK_LIFT, C_WHITE, 0.9);
          else sq(acc, x, y, surf, 1 - t1, 0.488, 1 - t0, 0.512, MARK_LIFT, C_WHITE, 0.9);
        }
      }
    } else {
      for (let d = 0; d < 4; d++)
        if (mask & (1 << d)) this.railPair(acc, x, y, surf, d, ROAD_LIFT + 0.01, 0, 0.52);
    }

    // piers on alternate tiles of the span, straight down into the water
    const s = spanInfo(g, x, y, rail);
    if (s.neg % 2 === 0) {
      const deckY = surf(0.5, 0.5) + ROAD_LIFT;
      const floor = Math.min(g.height[i], SEA_LEVEL - 0.2) - 0.1;
      const tx = s.axis === 0 ? 0 : 0.27; // transverse offset
      const tz = s.axis === 0 ? 0.27 : 0;
      acc.bar(x + 0.5 - tx, floor, y + 0.5 - tz, x + 0.5 - tx, deckY - 0.1, y + 0.5 - tz, 0.07, C_PIER, shade);
      acc.bar(x + 0.5 + tx, floor, y + 0.5 + tz, x + 0.5 + tx, deckY - 0.1, y + 0.5 + tz, 0.07, C_PIER, shade);
      acc.bar(x + 0.5 - tx * 1.2, deckY - 0.14, y + 0.5 - tz * 1.2, x + 0.5 + tx * 1.2, deckY - 0.14, y + 0.5 + tz * 1.2, 0.045, C_PIER, shade * 0.95);
    }
  }

  /* ──────────────────────────────── rail ──────────────────────────────────── */

  /** two steel rails along arm direction d, from tile edge to just past centre */
  private railPair(
    acc: Acc, x: number, y: number, surf: Surf,
    d: number, lift: number, from: number, to: number,
  ): void {
    const railTopH = 0.052;
    const w = 0.016;
    for (const off of [-0.14, 0.14]) {
      const c0 = 0.5 + off - w, c1 = 0.5 + off + w;
      let u0: number, v0: number, u1: number, v1: number;
      if (d === 0) { u0 = c0; u1 = c1; v0 = from; v1 = to; }
      else if (d === 2) { u0 = c0; u1 = c1; v0 = 1 - to; v1 = 1 - from; }
      else if (d === 3) { u0 = from; u1 = to; v0 = c0; v1 = c1; }
      else { u0 = 1 - to; u1 = 1 - from; v0 = c0; v1 = c1; }
      sq(acc, x, y, surf, u0, v0, u1, v1, lift + railTopH, C_RAILS, 1);
      // rail web sides
      acc.wall(x + u0, y + v0, x + u0, y + v1, surf(u0, v0) + lift, surf(u0, v0) + lift + railTopH, surf(u0, v1) + lift, surf(u0, v1) + lift + railTopH, C_RAILS, 0.7);
      acc.wall(x + u1, y + v1, x + u1, y + v0, surf(u1, v1) + lift, surf(u1, v1) + lift + railTopH, surf(u1, v0) + lift, surf(u1, v0) + lift + railTopH, C_RAILS, 0.7);
    }
  }

  private railTile(acc: Acc, x: number, y: number): void {
    const g = this.grid;
    const i = idx(x, y);
    const mask = railConnMask(g, x, y);
    const surf = this.makeSurf(x, y, true);
    const shade = 0.93 + hash2(x, y, 17) * 0.11;
    if (g.water[i]) {
      this.bridge(acc, x, y, surf, mask, true, 0, shade);
      return;
    }
    const m0 = 0.22, m1 = 0.78;
    const bl = ROAD_LIFT + 0.045; // ballast top

    // ballast bed: centre + arms, with small side walls
    sq(acc, x, y, surf, m0, m0, m1, m1, bl, C_BALLAST, shade);
    if (mask & 1) sq(acc, x, y, surf, m0, 0, m1, m0, bl, C_BALLAST, shade);
    if (mask & 2) sq(acc, x, y, surf, m1, m0, 1, m1, bl, C_BALLAST, shade);
    if (mask & 4) sq(acc, x, y, surf, m0, m1, m1, 1, bl, C_BALLAST, shade);
    if (mask & 8) sq(acc, x, y, surf, 0, m0, m0, m1, bl, C_BALLAST, shade);
    const bev = (ua: number, va: number, ub: number, vb: number) => {
      acc.wall(
        x + ua, y + va, x + ub, y + vb,
        surf(ua, va) + 0.004, surf(ua, va) + bl,
        surf(ub, vb) + 0.004, surf(ub, vb) + bl,
        C_BALLAST_D, shade,
      );
    };
    // bevel walls face outward (away from the track)
    if (mask & 1) { bev(m0, 0, m0, m0); bev(m1, m0, m1, 0); }
    else bev(m1, m0, m0, m0);
    if (mask & 2) { bev(1, m0, m1, m0); bev(m1, m1, 1, m1); }
    else bev(m1, m1, m1, m0);
    if (mask & 4) { bev(m0, m1, m0, 1); bev(m1, 1, m1, m1); }
    else bev(m0, m1, m1, m1);
    if (mask & 8) { bev(m0, m0, 0, m0); bev(0, m1, m0, m1); }
    else bev(m0, m0, m0, m1);

    this.rampFills(acc, x, y, surf, mask, m0, m1, C_FILL, shade);

    // sleepers + rails per arm; buffer stop on dead ends
    let nConn = 0;
    for (let d = 0; d < 4; d++) if (mask & (1 << d)) nConn++;
    for (let d = 0; d < 4; d++) {
      if (!(mask & (1 << d))) continue;
      for (let t = 0.07; t < 0.5; t += 0.16) {
        const s0 = t - 0.032, s1 = t + 0.032;
        if (d === 0) sq(acc, x, y, surf, 0.28, s0, 0.72, s1, bl + 0.008, C_SLEEPER, shade);
        else if (d === 2) sq(acc, x, y, surf, 0.28, 1 - s1, 0.72, 1 - s0, bl + 0.008, C_SLEEPER, shade);
        else if (d === 3) sq(acc, x, y, surf, s0, 0.28, s1, 0.72, bl + 0.008, C_SLEEPER, shade);
        else sq(acc, x, y, surf, 1 - s1, 0.28, 1 - s0, 0.72, bl + 0.008, C_SLEEPER, shade);
      }
      this.railPair(acc, x, y, surf, d, bl, 0, 0.53);
    }
    if (nConn === 1) {
      // buffer stop opposite the single connection
      const d = mask & 1 ? 2 : mask & 2 ? 3 : mask & 4 ? 0 : 1;
      const cy0 = surf(0.5, 0.5) + bl;
      const px = x + 0.5 + DX[d] * 0.18;
      const pz = y + 0.5 + DZ[d] * 0.18;
      const ox = DX[d] === 0 ? 0.18 : 0;
      const oz = DZ[d] === 0 ? 0.18 : 0;
      acc.bar(px - ox, cy0 + 0.1, pz - oz, px + ox, cy0 + 0.1, pz + oz, 0.035, C_SLEEPER, 1);
    }
  }

  /* ─────────────────────────── tunnel portals ─────────────────────────────── */

  private portals(acc: Acc, x: number, y: number): void {
    const g = this.grid;
    for (let d = 0; d < 4; d++) {
      const nx = x + DX[d];
      const ny = y + DZ[d];
      if (!roadAt(g, nx, ny) || g.tunnel[idx(nx, ny)] || g.water[idx(nx, ny)]) continue;
      const base = baseTop(g, nx, ny, false) + ROAD_LIFT;
      const shade = 0.95 + hash2(x, y, 23 + d) * 0.08;
      const inset = 0.04;
      // facade plane sits just inside the tunnel tile, facing the open road
      let fx0: number, fz0: number, fx1: number, fz1: number; // facade line p1→p2 (normal faces left of travel)
      if (d === 0) { fx0 = x + 1; fz0 = y + inset; fx1 = x; fz1 = y + inset; }
      else if (d === 2) { fx0 = x; fz0 = y + 1 - inset; fx1 = x + 1; fz1 = y + 1 - inset; }
      else if (d === 1) { fx0 = x + 1 - inset; fz0 = y; fx1 = x + 1 - inset; fz1 = y + 1; }
      else { fx0 = x + inset; fz0 = y + 1; fx1 = x + inset; fz1 = y; }
      const lx = fx1 - fx0, lz = fz1 - fz0; // unit along-facade
      const seg = (
        t0: number, t1: number, yb: number, yt: number, col: THREE.Color, s: number,
      ) => {
        acc.wall(
          fx0 + lx * t0, fz0 + lz * t0, fx0 + lx * t1, fz0 + lz * t1,
          yb, yt, yb, yt, col, s,
        );
      };
      // two pillars + lintel leave a dark opening
      seg(0, 0.22, base - 0.05, base + 0.95, C_STONE, shade);
      seg(0.78, 1, base - 0.05, base + 0.95, C_STONE, shade);
      seg(0.22, 0.78, base + 0.68, base + 0.95, C_STONE, shade);
      // recessed dark mouth
      const bx = -DX[d] * 0.1, bz = -DZ[d] * 0.1; // push into the hill
      acc.wall(
        fx0 + lx * 0.22 + bx, fz0 + lz * 0.22 + bz,
        fx0 + lx * 0.78 + bx, fz0 + lz * 0.78 + bz,
        base - 0.02, base + 0.68, base - 0.02, base + 0.68, C_DARK, 1,
      );
      // parapet cap along the top
      acc.bar(fx0, base + 0.98, fz0, fx1, base + 0.98, fz1, 0.045, C_STONE_D, shade);
      // short paved stub through the mouth
      const mid = 0.5;
      const cxw = fx0 + lx * mid + bx * 0.5;
      const czw = fz0 + lz * mid + bz * 0.5;
      acc.quad(
        cxw - lx * 0.28 - bx, base + 0.002, czw - lz * 0.28 - bz,
        cxw - lx * 0.28 + bx, base + 0.002, czw - lz * 0.28 + bz,
        cxw + lx * 0.28 + bx, base + 0.002, czw + lz * 0.28 + bz,
        cxw + lx * 0.28 - bx, base + 0.002, czw + lz * 0.28 - bz,
        C_STREET, shade,
      );
      // wing walls angling back into the hillside
      const hillH = g.height[idx(x, y)];
      const wing = (t: number, sgn: number) => {
        const wx0 = fx0 + lx * t;
        const wz0 = fz0 + lz * t;
        const wx1 = wx0 - bx * 3 + lx * 0.06 * sgn;
        const wz1 = wz0 - bz * 3 + lz * 0.06 * sgn;
        acc.wall(wx0, wz0, wx1, wz1, base - 0.05, base + 0.85, base - 0.05, Math.max(base + 0.35, hillH * 0.4 + base * 0.6), C_STONE_D, shade * 0.95);
        acc.wall(wx1, wz1, wx0, wz0, base - 0.05, Math.max(base + 0.35, hillH * 0.4 + base * 0.6), base - 0.05, base + 0.85, C_STONE_D, shade * 0.95);
      };
      wing(0.02, 1);
      wing(0.98, -1);
    }
  }

  /* ─────────────────────── power pylons + catenary ──────────────────────────  */

  private pylonAttach(x: number, y: number): { base: number; top: number; arm: number } {
    const g = this.grid;
    const i = idx(x, y);
    const overWater = g.water[i] === 1;
    const base = overWater ? SEA_LEVEL - 0.45 : g.height[i];
    const h = overWater ? 3.35 : 2.45;
    return { base, top: base + h, arm: base + h * 0.84 };
  }

  private wireTile(acc: Acc, x: number, y: number): void {
    const g = this.grid;
    if (!this.isPylonTile(x, y)) return;
    const a = this.pylonAttach(x, y);
    const cx = x + 0.5;
    const cz = y + 0.5;
    const shade = 0.92 + hash2(x, y, 41) * 0.12;
    const connE = wireAt(g, x + 1, y);
    const connW = wireAt(g, x - 1, y);
    const connN = wireAt(g, x, y - 1);
    const connS = wireAt(g, x, y + 1);
    const hasEW = connE || connW;
    const hasNS = connN || connS;

    if (g.water[idx(x, y)]) {
      // Water crossings retain a recognisable tall steel lattice support.
      const legT = 0.021;
      for (const sx of [-1, 1]) for (const sz of [-1, 1])
        acc.bar(cx + sx * 0.17, a.base, cz + sz * 0.17, cx + sx * 0.05, a.arm, cz + sz * 0.05, legT, C_PYLON, shade);
      const midY = a.base + (a.arm - a.base) * 0.45;
      for (const [px, pz, qx, qz] of [[-1, -1, 1, 1], [1, -1, -1, 1]] as const)
        acc.bar(cx + px * 0.15, a.base + 0.12, cz + pz * 0.15, cx + qx * 0.09, midY, cz + qz * 0.09, 0.012, C_PYLON, shade);
    } else {
      // Telephone-pole scale on land: one slim mast, no skyline clutter.
      acc.bar(cx, a.base, cz, cx, a.top, cz, 0.035, C_POLE, shade);
    }
    if (hasEW || !hasNS) acc.bar(cx, a.arm, cz - 0.28, cx, a.arm, cz + 0.28, 0.022, g.water[idx(x, y)] ? C_PYLON : C_ARM, shade);
    if (hasNS) acc.bar(cx - 0.28, a.arm, cz, cx + 0.28, a.arm, cz, 0.022, g.water[idx(x, y)] ? C_PYLON : C_ARM, shade);

    // Spans are owned by their west/north pylon and may cross chunk boundaries.
    // Search four tiles: periodic poles plus structural endpoints ensure
    // that every straight run is covered without a per-tile picket fence.
    if (connE) {
      for (let d = 1; d <= 4 && wireAt(g, x + d, y); d++)
        if (this.isPylonTile(x + d, y)) { this.span(acc, x, y, x + d, y, 0); break; }
    }
    if (connS) {
      for (let d = 1; d <= 4 && wireAt(g, x, y + d); d++)
        if (this.isPylonTile(x, y + d)) { this.span(acc, x, y, x, y + d, 1); break; }
    }
  }

  private isPylonTile(x: number, y: number): boolean {
    const g = this.grid;
    if (!wireAt(g, x, y)) return false;
    const e = wireAt(g, x + 1, y), w = wireAt(g, x - 1, y);
    const n = wireAt(g, x, y - 1), s = wireAt(g, x, y + 1);
    const degree = Number(e) + Number(w) + Number(n) + Number(s);
    // endpoints, corners and junctions always carry a tower
    if (degree !== 2 || !((e && w) || (n && s))) return true;
    const wet = g.water[idx(x, y)] === 1;
    for (const [nx, ny, connected] of [[x + 1, y, e], [x - 1, y, w], [x, y - 1, n], [x, y + 1, s]] as const)
      if (connected && (g.water[idx(nx, ny)] === 1) !== wet) return true;
    // Global cadence guarantees no straight span exceeds four tiles; structural
    // endpoints/corners above close arbitrary-length runs cleanly.
    return e && w ? x % 4 === 0 : y % 4 === 0;
  }

  private span(
    acc: Acc, xa: number, ya: number, xb: number, yb: number, axis: 0 | 1,
  ): void {
    const A = this.pylonAttach(xa, ya);
    const B = this.pylonAttach(xb, yb);
    const ax = xa + 0.5, az = ya + 0.5;
    const bx = xb + 0.5, bz = yb + 0.5;
    const offX = axis === 0 ? 0 : 0.3;
    const offZ = axis === 0 ? 0.3 : 0;
    const SEGS = 6;
    const spanLength = Math.abs(xb - xa) + Math.abs(yb - ya);
    const sag = 0.16 + spanLength * 0.11;
    for (const s of [-1, 1]) {
      let px = ax + offX * s;
      let pz = az + offZ * s;
      let py = A.arm + 0.03;
      for (let k = 1; k <= SEGS; k++) {
        const t = k / SEGS;
        const qx = lerp(ax + offX * s, bx + offX * s, t);
        const qz = lerp(az + offZ * s, bz + offZ * s, t);
        const qy = lerp(A.arm + 0.03, B.arm + 0.03, t) - sag * 4 * t * (1 - t);
        const w = 0.011;
        // vertical ribbon, both faces
        acc.quad(px, py - w, pz, qx, qy - w, qz, qx, qy + w, qz, px, py + w, pz, C_WIRE, 1);
        acc.quad(qx, qy - w, qz, px, py - w, pz, px, py + w, pz, qx, qy + w, qz, C_WIRE, 1);
        px = qx; pz = qz; py = qy;
      }
    }
  }
}
