/**
 * SETHCITY 6769 — sim/network.ts
 * Road connectivity, power + water propagation, deterministic brown-outs.
 *
 * Power conducts through roads, power-line (wire) tiles and building
 * footprints, flood-filled from producer buildings. Water mains (pipes, plus
 * the mains running under every road) are fed by water-producer footprints;
 * a tile is watered when within 4 tiles Chebyshev of any fed main. When
 * supply < demand the lowest-land-value consumers brown out first,
 * deterministically. Active neighbour deals add to (buy) or reserve (sell)
 * supply before the brown-out calculation.
 *
 * Every pass runs over preallocated typed arrays — zero per-call allocation.
 */
import { GRID_W, GRID_H, TILE_COUNT } from '../core/types';
import type { GameState } from '../core/state';
import type { Grid } from '../core/grid';
import { defOf } from '../core/catalog';

/* ── preallocated scratch (module-owned; grid.scratch* is left alone) ────── */
const queue = new Int32Array(TILE_COUNT);
const conduct = new Uint8Array(TILE_COUNT);
const reach = new Uint8Array(TILE_COUNT);
const dilA = new Uint8Array(TILE_COUNT);
const origins = new Int32Array(TILE_COUNT);
const bPow = new Uint8Array(TILE_COUNT); // per-building powered flag
const bWat = new Uint8Array(TILE_COUNT); // per-building watered flag
const sortBuf = new Uint32Array(TILE_COUNT); // brown-out ordering keys

/** largest road component id per grid, maintained by rebuildRoadNetwork */
const largestComp = new WeakMap<Grid, number>();

/** flood-fills road connectivity into grid.roadNet (component id, 0 = no road) */
export function rebuildRoadNetwork(grid: Grid): void {
  const road = grid.road;
  const net = grid.roadNet;
  net.fill(0);
  let comp = 0;
  let bestComp = 0;
  let bestSize = 0;
  for (let start = 0; start < TILE_COUNT; start++) {
    if (!road[start] || net[start]) continue;
    comp++;
    let head = 0;
    let tail = 0;
    queue[tail++] = start;
    net[start] = comp;
    let size = 0;
    while (head < tail) {
      const i = queue[head++];
      size++;
      const x = i % GRID_W;
      if (x > 0 && road[i - 1] && !net[i - 1]) {
        net[i - 1] = comp;
        queue[tail++] = i - 1;
      }
      if (x < GRID_W - 1 && road[i + 1] && !net[i + 1]) {
        net[i + 1] = comp;
        queue[tail++] = i + 1;
      }
      if (i >= GRID_W && road[i - GRID_W] && !net[i - GRID_W]) {
        net[i - GRID_W] = comp;
        queue[tail++] = i - GRID_W;
      }
      if (i < TILE_COUNT - GRID_W && road[i + GRID_W] && !net[i + GRID_W]) {
        net[i + GRID_W] = comp;
        queue[tail++] = i + GRID_W;
      }
    }
    if (size > bestSize) {
      bestSize = size;
      bestComp = comp;
    }
  }
  largestComp.set(grid, bestComp);
}

/** true when tile (x,y) can reach the largest road component (a road tile of
 *  that component within 3 tiles Chebyshev — the zoning access rule) */
export function isConnected(grid: Grid, x: number, y: number): boolean {
  let best = largestComp.get(grid);
  if (best === undefined) {
    rebuildRoadNetwork(grid);
    best = largestComp.get(grid) ?? 0;
  }
  if (!best) return false;
  const net = grid.roadNet;
  const x0 = x - 3 < 0 ? 0 : x - 3;
  const x1 = x + 3 >= GRID_W ? GRID_W - 1 : x + 3;
  const y0 = y - 3 < 0 ? 0 : y - 3;
  const y1 = y + 3 >= GRID_H ? GRID_H - 1 : y + 3;
  for (let yy = y0; yy <= y1; yy++) {
    const row = yy * GRID_W;
    for (let xx = x0; xx <= x1; xx++) {
      if (net[row + xx] === best) return true;
    }
  }
  return false;
}

/** writes the per-building flag onto every footprint tile of every building */
function stampFootprints(
  grid: Grid,
  nB: number,
  flags: Uint8Array,
  out: Uint8Array,
): void {
  const building = grid.building;
  for (let b = 0; b < nB; b++) {
    const o = origins[b];
    const def = defOf(building[o]);
    const v = flags[b];
    const ox = o % GRID_W;
    const oy = (o / GRID_W) | 0;
    const ex = Math.min(ox + def.w, GRID_W);
    const ey = Math.min(oy + def.h, GRID_H);
    for (let yy = oy; yy < ey; yy++) {
      for (let xx = ox; xx < ex; xx++) out[yy * GRID_W + xx] = v;
    }
  }
}

/** sets grid.powered / grid.watered and fills stats power/water supply+demand */
export function propagateUtilities(state: GameState): void {
  const grid = state.grid;
  const building = grid.building;
  const stats = state.stats;

  /* collect building origins */
  let nB = 0;
  for (let i = 0; i < TILE_COUNT; i++) {
    if (building[i] && grid.originOffset[i] === 0) origins[nB++] = i;
  }

  /* active neighbour deals */
  let buyP = 0;
  let sellP = 0;
  let buyW = 0;
  let sellW = 0;
  const deals = state.deals;
  for (let d = 0; d < deals.length; d++) {
    const deal = deals[d];
    if (!deal.active) continue;
    if (deal.kind === 'buy_power') buyP += deal.amount;
    else if (deal.kind === 'sell_power') sellP += deal.amount;
    else if (deal.kind === 'buy_water') buyW += deal.amount;
    else if (deal.kind === 'sell_water') sellW += deal.amount;
  }

  /* ─────────────────────────────── POWER ─────────────────────────────── */
  for (let i = 0; i < TILE_COUNT; i++) {
    conduct[i] =
      grid.road[i] || grid.wire[i] || grid.tunnel[i] || building[i] ? 1 : 0;
  }
  reach.fill(0);
  let head = 0;
  let tail = 0;
  let demandP = 0;
  let rawSupplyP = 0;
  for (let b = 0; b < nB; b++) {
    const o = origins[b];
    const def = defOf(building[o]);
    demandP += def.power;
    if (def.powerOut > 0) {
      rawSupplyP += def.powerOut;
      const ox = o % GRID_W;
      const oy = (o / GRID_W) | 0;
      const ex = Math.min(ox + def.w, GRID_W);
      const ey = Math.min(oy + def.h, GRID_H);
      for (let yy = oy; yy < ey; yy++) {
        for (let xx = ox; xx < ex; xx++) {
          const t = yy * GRID_W + xx;
          if (!reach[t]) {
            reach[t] = 1;
            queue[tail++] = t;
          }
        }
      }
    }
  }
  while (head < tail) {
    const i = queue[head++];
    const x = i % GRID_W;
    if (x > 0 && conduct[i - 1] && !reach[i - 1]) {
      reach[i - 1] = 1;
      queue[tail++] = i - 1;
    }
    if (x < GRID_W - 1 && conduct[i + 1] && !reach[i + 1]) {
      reach[i + 1] = 1;
      queue[tail++] = i + 1;
    }
    if (i >= GRID_W && conduct[i - GRID_W] && !reach[i - GRID_W]) {
      reach[i - GRID_W] = 1;
      queue[tail++] = i - GRID_W;
    }
    if (i < TILE_COUNT - GRID_W && conduct[i + GRID_W] && !reach[i + GRID_W]) {
      reach[i + GRID_W] = 1;
      queue[tail++] = i + GRID_W;
    }
  }

  const supplyP = Math.max(0, rawSupplyP + buyP - sellP);

  /* per-building powered state + demand actually on the network */
  let connDemandP = 0;
  for (let b = 0; b < nB; b++) {
    const o = origins[b];
    const def = defOf(building[o]);
    let p = def.powerOut > 0 ? 1 : 0;
    if (!p) {
      const ox = o % GRID_W;
      const oy = (o / GRID_W) | 0;
      const ex = Math.min(ox + def.w, GRID_W);
      const ey = Math.min(oy + def.h, GRID_H);
      scan: for (let yy = oy; yy < ey; yy++) {
        for (let xx = ox; xx < ex; xx++) {
          if (reach[yy * GRID_W + xx]) {
            p = 1;
            break scan;
          }
        }
      }
    }
    bPow[b] = p;
    if (p) connDemandP += def.power;
  }

  /* deterministic brown-out: lowest land value first, then lowest index */
  if (connDemandP > supplyP) {
    let n = 0;
    for (let b = 0; b < nB; b++) {
      if (!bPow[b]) continue;
      const def = defOf(building[origins[b]]);
      if (def.power <= 0 || def.powerOut > 0) continue;
      sortBuf[n++] = (grid.landValue[origins[b]] << 14) | b;
    }
    sortBuf.subarray(0, n).sort();
    let excess = connDemandP - supplyP;
    for (let k = 0; k < n && excess > 0; k++) {
      const b = sortBuf[k] & 0x3fff;
      bPow[b] = 0;
      excess -= defOf(building[origins[b]]).power;
    }
  }

  /* stamp grid.powered: live conductors, a one-tile halo (so an empty zoned
     lot beside a live road reads powered — matches the 4-neighbour touching
     rule for 1×1 growth), then per-building truth (brown-outs visible) */
  const powered = grid.powered;
  for (let i = 0; i < TILE_COUNT; i++) powered[i] = reach[i];
  for (let i = 0; i < TILE_COUNT; i++) {
    if (powered[i]) continue;
    const x = i % GRID_W;
    if (
      (x > 0 && reach[i - 1]) ||
      (x < GRID_W - 1 && reach[i + 1]) ||
      (i >= GRID_W && reach[i - GRID_W]) ||
      (i < TILE_COUNT - GRID_W && reach[i + GRID_W])
    ) {
      powered[i] = 1;
    }
  }
  stampFootprints(grid, nB, bPow, powered);

  /* ─────────────────────────────── WATER ─────────────────────────────── */
  for (let i = 0; i < TILE_COUNT; i++) {
    conduct[i] = grid.pipe[i] || grid.road[i] || grid.tunnel[i] ? 1 : 0;
  }
  reach.fill(0);
  head = 0;
  tail = 0;
  let demandW = 0;
  let rawSupplyW = 0;
  for (let b = 0; b < nB; b++) {
    const o = origins[b];
    const def = defOf(building[o]);
    demandW += def.water;
    if (def.waterOut > 0 && bPow[b]) {
      /* pumps need power; a dead pump feeds nothing and adds no supply */
      rawSupplyW += def.waterOut;
      const ox = o % GRID_W;
      const oy = (o / GRID_W) | 0;
      const ex = Math.min(ox + def.w, GRID_W);
      const ey = Math.min(oy + def.h, GRID_H);
      for (let yy = oy; yy < ey; yy++) {
        for (let xx = ox; xx < ex; xx++) {
          const t = yy * GRID_W + xx;
          if (conduct[t] && !reach[t]) {
            reach[t] = 1;
            queue[tail++] = t;
          }
          if (xx > 0 && conduct[t - 1] && !reach[t - 1]) {
            reach[t - 1] = 1;
            queue[tail++] = t - 1;
          }
          if (xx < GRID_W - 1 && conduct[t + 1] && !reach[t + 1]) {
            reach[t + 1] = 1;
            queue[tail++] = t + 1;
          }
          if (yy > 0 && conduct[t - GRID_W] && !reach[t - GRID_W]) {
            reach[t - GRID_W] = 1;
            queue[tail++] = t - GRID_W;
          }
          if (yy < GRID_H - 1 && conduct[t + GRID_W] && !reach[t + GRID_W]) {
            reach[t + GRID_W] = 1;
            queue[tail++] = t + GRID_W;
          }
        }
      }
    }
  }
  while (head < tail) {
    const i = queue[head++];
    const x = i % GRID_W;
    if (x > 0 && conduct[i - 1] && !reach[i - 1]) {
      reach[i - 1] = 1;
      queue[tail++] = i - 1;
    }
    if (x < GRID_W - 1 && conduct[i + 1] && !reach[i + 1]) {
      reach[i + 1] = 1;
      queue[tail++] = i + 1;
    }
    if (i >= GRID_W && conduct[i - GRID_W] && !reach[i - GRID_W]) {
      reach[i - GRID_W] = 1;
      queue[tail++] = i - GRID_W;
    }
    if (i < TILE_COUNT - GRID_W && conduct[i + GRID_W] && !reach[i + GRID_W]) {
      reach[i + GRID_W] = 1;
      queue[tail++] = i + GRID_W;
    }
  }

  /* Chebyshev-4 watering via separable dilation (reach → dilA → watered) */
  for (let y = 0; y < GRID_H; y++) {
    const row = y * GRID_W;
    for (let x = 0; x < GRID_W; x++) {
      let v = 0;
      const lo = x - 4 < 0 ? 0 : x - 4;
      const hi = x + 4 >= GRID_W ? GRID_W - 1 : x + 4;
      for (let k = lo; k <= hi; k++) {
        if (reach[row + k]) {
          v = 1;
          break;
        }
      }
      dilA[row + x] = v;
    }
  }
  const watered = grid.watered;
  for (let y = 0; y < GRID_H; y++) {
    const row = y * GRID_W;
    const lo = y - 4 < 0 ? 0 : y - 4;
    const hi = y + 4 >= GRID_H ? GRID_H - 1 : y + 4;
    for (let x = 0; x < GRID_W; x++) {
      let v = 0;
      for (let k = lo; k <= hi; k++) {
        if (dilA[k * GRID_W + x]) {
          v = 1;
          break;
        }
      }
      watered[row + x] = v;
    }
  }

  const supplyW = Math.max(0, rawSupplyW + buyW - sellW);

  /* per-building watered state + demand actually on the network */
  let connDemandW = 0;
  for (let b = 0; b < nB; b++) {
    const o = origins[b];
    const def = defOf(building[o]);
    let wv = def.waterOut > 0 ? 1 : 0;
    if (!wv) {
      const ox = o % GRID_W;
      const oy = (o / GRID_W) | 0;
      const ex = Math.min(ox + def.w, GRID_W);
      const ey = Math.min(oy + def.h, GRID_H);
      scan: for (let yy = oy; yy < ey; yy++) {
        for (let xx = ox; xx < ex; xx++) {
          if (watered[yy * GRID_W + xx]) {
            wv = 1;
            break scan;
          }
        }
      }
    }
    bWat[b] = wv;
    if (wv) connDemandW += def.water;
  }

  /* deterministic water shortage: lowest land value first */
  if (connDemandW > supplyW) {
    let n = 0;
    for (let b = 0; b < nB; b++) {
      if (!bWat[b]) continue;
      const def = defOf(building[origins[b]]);
      if (def.water <= 0 || def.waterOut > 0) continue;
      sortBuf[n++] = (grid.landValue[origins[b]] << 14) | b;
    }
    sortBuf.subarray(0, n).sort();
    let excess = connDemandW - supplyW;
    for (let k = 0; k < n && excess > 0; k++) {
      const b = sortBuf[k] & 0x3fff;
      bWat[b] = 0;
      excess -= defOf(building[origins[b]]).water;
    }
  }
  stampFootprints(grid, nB, bWat, watered);

  stats.powerDemand = demandP;
  stats.powerSupply = supplyP;
  stats.waterDemand = demandW;
  stats.waterSupply = supplyW;
}
