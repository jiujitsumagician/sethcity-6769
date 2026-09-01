import { GRID_W, TILE_COUNT, Zone } from '../core/types';
import type { GameState } from '../core/state';
import { GROWTH_TABLE, defOf } from '../core/catalog';
import type { BuildingDef } from '../core/types';
import { hash2 } from '../core/rng';
import { isConnected } from './network';
import { bus } from '../core/events';

function demandFor(state: GameState, z: number): number {
  return z <= Zone.ResHigh ? state.demand.r : z <= Zone.ComHigh ? state.demand.c : state.demand.i;
}
function pick(zone: number, level: number, salt: number, state: GameState, o: number, requireClear: boolean): BuildingDef | undefined {
  const list = GROWTH_TABLE[zone]; if (!list) return undefined;
  let count = 0;
  const x = o % GRID_W, y = (o / GRID_W) | 0, g = state.grid;
  for (let k = 0; k < list.length; k++) { const d = list[k]; if (d.level !== level || g.landValue[o] < (d.minLandValue ?? 0)) continue; if (requireClear && !g.isClear(x, y, d.w, d.h)) continue; count++; }
  if (!count) return undefined;
  let target = (hash2(x, y, salt) * count) | 0;
  for (let k = 0; k < list.length; k++) { const d = list[k]; if (d.level !== level || g.landValue[o] < (d.minLandValue ?? 0)) continue; if (requireClear && !g.isClear(x, y, d.w, d.h)) continue; if (target-- === 0) return d; }
  return undefined;
}
function stamp(state: GameState, o: number, d: BuildingDef, condition: number, age: number): void {
  const g = state.grid, ox = o % GRID_W, oy = (o / GRID_W) | 0;
  const fill = Math.min(1, age / (10 + (hash2(ox, oy, 19) * 20 | 0)));
  const tiles = d.w * d.h;
  const totalPop = Math.round(d.residents * fill), totalJobs = Math.round(d.jobs * fill);
  for (let y = 0; y < d.h; y++) for (let x = 0; x < d.w; x++) { const i = (oy + y) * GRID_W + ox + x, n = y * d.w + x; g.building[i] = d.id; g.originOffset[i] = x | y << 4; g.level[i] = d.level ?? 1; g.variant[i] = (hash2(ox, oy, d.id) * 255) | 0; g.condition[i] = condition; g.age[i] = age; g.population[i] = Math.floor((totalPop + tiles - 1 - n) / tiles); g.jobs[i] = Math.floor((totalJobs + tiles - 1 - n) / tiles); }
}
function replace(state: GameState, o: number, d: BuildingDef): void { stamp(state, o, d, 180, 0); state.grid.markDirty(o % GRID_W, (o / GRID_W) | 0); bus.emit('tile:changed', { i: o }); }

export function growAndDecay(state: GameState): void {
  const g = state.grid;
  for (let i = 0; i < TILE_COUNT; i++) {
    const id = g.building[i];
    if (id && !g.originOffset[i]) {
      const d = defOf(id);
      if (!d.grown) {
        /* Player-placed residential rewards and arcologies fill over time,
           matching zoned housing instead of adding thousands instantly. */
        if (d.residents > 0) {
          const fillTicks = 10 + (hash2(i % GRID_W, (i / GRID_W) | 0, 19) * 20 | 0);
          /* Old saves may contain fully populated, age-zero placed housing. */
          const age = g.age[i] === 0 && g.population[i] > 0 ? fillTicks : Math.min(65535, g.age[i] + 1);
          stamp(state, i, d, g.condition[i], age);
        }
        continue;
      }
      const x = i % GRID_W, y = (i / GRID_W) | 0, good = isConnected(g, x, y) && !!g.powered[i] && !!g.watered[i] && demandFor(state, d.zone ?? 0) > -0.05 && g.landValue[i] >= (d.minLandValue ?? 0);
      let age = Math.min(65535, g.age[i] + 1), condition = g.condition[i];
      const wasAlive = condition > 0;
      if (good) condition = Math.min(255, condition + 3); else condition = Math.max(0, condition - 5);
      stamp(state, i, d, condition, age);
      /* abandonment (and recovery) changes the building's look — rebuild its chunk */
      if (wasAlive !== condition > 0) { g.markDirty(x, y); bus.emit('tile:changed', { i }); }
      if (good && condition > 235 && age > 150 && hash2(x, y, state.time.ticks) < 0.025) { const next = pick(d.zone ?? 0, (d.level ?? 1) + 1, age, state, i, false); if (next) replace(state, i, next); }
      else if (!good && condition === 0 && age > 90 && (d.level ?? 1) > 1) { const prev = pick(d.zone ?? 0, (d.level ?? 1) - 1, age, state, i, false); if (prev) replace(state, i, prev); }
      else if (good && condition === 0 && age > 4) { const rebuilt = pick(d.zone ?? 0, 1, age, state, i, false); replace(state, i, rebuilt ?? d); }
      continue;
    }
    if (id || !g.zone[i] || g.water[i] || g.road[i] || g.rail[i]) continue;
    const x = i % GRID_W, y = (i / GRID_W) | 0, zone = g.zone[i];
    if (!isConnected(g, x, y) || !g.powered[i] || !g.watered[i] || demandFor(state, zone) <= 0) continue;
    const chance = 0.0008 + demandFor(state, zone) * 0.0017;
    if (hash2(x, y, state.time.ticks + state.seed) < chance) { const d = pick(zone, 1, state.seed, state, i, true); if (d) replace(state, i, d); }
  }
}
