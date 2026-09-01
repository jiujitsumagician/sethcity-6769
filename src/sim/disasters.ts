import { CATALOG, defOf } from '../core/catalog';
import { bus } from '../core/events';
import { hash2, mulberry32 } from '../core/rng';
import type { GameState } from '../core/state';
import { GRID_H, GRID_W, HEIGHT_STEP, idx, inBounds, type ActiveDisaster, type DisasterKind } from '../core/types';

const flooded = new Map<number, number[]>();
type FloodDisaster = ActiveDisaster & { floodedTiles?: number[] };
const randomKinds: DisasterKind[] = ['fire', 'earthquake', 'tornado', 'flood', 'meteor', 'blackout', 'riot', 'volcano', 'monster', 'aircrash', 'meltdown', 'hurricane', 'chemical'];

function news(state: GameState, text: string, kind: 'warn' | 'bad' = 'bad'): void {
  bus.emit('news', { id: state.nextNewsId++, tick: state.time.ticks, text, kind });
}

function destroy(state: GameState, x: number, y: number, networks = true): void {
  if (!inBounds(x, y)) return;
  const g = state.grid;
  const i = idx(x, y);
  const origin = g.originOf(x, y);
  if (origin >= 0) {
    const d = defOf(g.building[origin]);
    const ox = origin % GRID_W, oy = (origin / GRID_W) | 0;
    for (let yy = 0; yy < d.h; yy++) for (let xx = 0; xx < d.w; xx++) {
      const px = ox + xx, py = oy + yy;
      if (!inBounds(px, py)) continue;
      g.clearTile(idx(px, py)); g.markDirty(px, py);
    }
  } else { g.clearTile(i); g.markDirty(x, y); }
  if (networks) g.road[i] = g.rail[i] = g.wire[i] = g.pipe[i] = g.subway[i] = g.tunnel[i] = 0;
  g.tree[i] = 0;
  bus.emit('tile:changed', { i });
}

function ignite(state: GameState, x: number, y: number, life = 18): void {
  if (!inBounds(x, y)) return;
  const i = idx(x, y);
  if (state.grid.building[i] || state.grid.tree[i]) state.grid.onFire[i] = Math.max(state.grid.onFire[i], life);
}

function pickTile(state: GameState, score?: (i: number) => number): [number, number] {
  let best = -1, bestScore = -Infinity;
  const rnd = mulberry32(state.seed ^ state.time.ticks ^ state.nextDisasterId * 7919);
  for (let n = 0; n < 512; n++) {
    const i = (rnd() * GRID_W * GRID_H) | 0;
    const s = score ? score(i) : rnd();
    if (s > bestScore) { best = i; bestScore = s; }
  }
  return [best % GRID_W, (best / GRID_W) | 0];
}

function hasBuilding(state: GameState, test: (key: string) => boolean): number {
  for (let i = 0; i < state.grid.building.length; i++) {
    const id = state.grid.building[i];
    if (id && state.grid.originOffset[i] === 0 && test(CATALOG[id]?.key ?? '')) return i;
  }
  return -1;
}

export function triggerDisaster(state: GameState, kind: DisasterKind, x?: number, y?: number): ActiveDisaster | null {
  let px = x, py = y;
  if (kind === 'aircrash') {
    const airport = hasBuilding(state, (k) => k.includes('airport'));
    if (airport < 0) return null;
    px ??= airport % GRID_W; py ??= (airport / GRID_W) | 0;
  } else if (kind === 'meltdown') {
    const nuclear = hasBuilding(state, (k) => k.includes('nuclear'));
    if (nuclear < 0) return null;
    px ??= nuclear % GRID_W; py ??= (nuclear / GRID_W) | 0;
  } else if (kind === 'riot') {
    [px, py] = px === undefined || py === undefined ? pickTile(state, (i) => state.grid.crime[i] - state.grid.covPolice[i] * 0.7) : [px, py];
  } else if (kind === 'monster') {
    [px, py] = px === undefined || py === undefined ? pickTile(state, (i) => state.grid.population[i] + state.grid.jobs[i]) : [px, py];
  } else if ((kind === 'flood' || kind === 'hurricane') && (px === undefined || py === undefined)) {
    [px, py] = pickTile(state, (i) => {
      if (state.grid.water[i]) return -1;
      const sx = i % GRID_W, sy = (i / GRID_W) | 0;
      let near = 0;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (inBounds(sx + dx, sy + dy)) near += state.grid.water[idx(sx + dx, sy + dy)];
      return near;
    });
  } else if (px === undefined || py === undefined) [px, py] = pickTile(state);
  px = Math.max(0, Math.min(GRID_W - 1, px)); py = Math.max(0, Math.min(GRID_H - 1, py));
  const life: Record<DisasterKind, number> = { fire: 45, earthquake: 12, tornado: 42, flood: 50, meteor: 8, blackout: 36, riot: 32, volcano: 55, monster: 55, aircrash: 24, meltdown: 20, hurricane: 55, chemical: 30 };
  const a: ActiveDisaster = { id: state.nextDisasterId++, kind, x: px, y: py, life: life[kind], radius: kind === 'meltdown' ? 8 : 4, intensity: 1 };
  const rnd = mulberry32(state.seed ^ a.id * 65537);
  a.vx = rnd() * 2 - 1; a.vy = rnd() * 2 - 1;
  state.disasters.push(a);
  if (kind === 'fire') ignite(state, px, py, 28);
  if (kind === 'flood' || kind === 'hurricane') {
    const list: number[] = [];
    (a as FloodDisaster).floodedTiles = list;
    flooded.set(a.id, list);
  }
  const labels: Record<DisasterKind, string> = { fire: 'A major fire has broken out!', earthquake: 'Earthquake rocks SethCity 6769!', tornado: 'A tornado is tearing through the city!', flood: 'Flood waters surge inland!', meteor: 'Meteor impact reported!', blackout: 'City-wide blackout!', riot: 'Rioting erupts in a high-crime district!', volcano: 'A volcano erupts beneath the city!', monster: 'The Giant Llama of 6769 is on a rampage!', aircrash: 'Aircraft down near the airport!', meltdown: 'Nuclear meltdown! The exclusion zone is irradiated.', hurricane: 'A hurricane batters the coast!', chemical: 'Chemical spill poisons the shoreline!' };
  news(state, labels[kind]);
  bus.emit('shake', { intensity: kind === 'earthquake' || kind === 'meteor' ? 1 : 0.55 });
  bus.emit('disaster:start', a);
  return a;
}

function updateFire(state: GameState): void {
  const g = state.grid;
  for (let i = 0; i < g.onFire.length; i++) {
    if (!g.onFire[i]) continue;
    const x = i % GRID_W, y = (i / GRID_W) | 0;
    g.onFire[i]--;
    if (g.onFire[i] === 0) { destroy(state, x, y, false); continue; }
    if ((g.onFire[i] & 3) !== 0) continue;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nx = x + dx, ny = y + dy;
      if (!inBounds(nx, ny)) continue;
      const j = idx(nx, ny);
      const chance = Math.max(0.01, (g.fireRisk[j] + 45 - g.covFire[j] * 0.8) / 650);
      if (!g.onFire[j] && hash2(nx, ny, state.time.ticks) < chance) ignite(state, nx, ny);
    }
  }
}

function tickDisaster(state: GameState, a: ActiveDisaster): void {
  const g = state.grid;
  const rnd = mulberry32(state.seed ^ a.id * 8191 ^ a.life * 131);
  if (a.kind === 'blackout') { g.powered.fill(0); (state as GameState & { blackoutTicks?: number }).blackoutTicks = a.life; return; }
  if (a.kind === 'earthquake') {
    for (let n = 0; n < 18; n++) { const x = Math.round(a.x + (rnd() - 0.5) * 18), y = Math.round(a.y + (rnd() - 0.5) * 5); if (rnd() > g.condition[idx(Math.max(0, Math.min(127, x)), Math.max(0, Math.min(127, y)))] / 300) destroy(state, x, y); if (rnd() < 0.12) ignite(state, x, y); }
  } else if (a.kind === 'tornado' || a.kind === 'monster') {
    if (a.kind === 'monster') {
      const target = pickTile(state, (i) => g.population[i] + g.jobs[i]);
      a.vx = (target[0] - a.x) * 0.03; a.vy = (target[1] - a.y) * 0.03;
    } else { a.vx = (a.vx ?? 0) * 0.82 + (rnd() - 0.5) * 0.55; a.vy = (a.vy ?? 0) * 0.82 + (rnd() - 0.5) * 0.55; }
    a.x = Math.max(1, Math.min(126, a.x + (a.vx ?? 0))); a.y = Math.max(1, Math.min(126, a.y + (a.vy ?? 0)));
    const radius = a.kind === 'monster' ? 2 : 1;
    for (let dy = -radius; dy <= radius; dy++) for (let dx = -radius; dx <= radius; dx++) if (rnd() < 0.72) destroy(state, Math.round(a.x) + dx, Math.round(a.y) + dy);
  } else if (a.kind === 'flood' || a.kind === 'hurricane') {
    // This bookkeeping is intentionally transient and therefore absent after
    // loading a save made mid-disaster. Recreate it before the first tick.
    let list = (a as FloodDisaster).floodedTiles ?? flooded.get(a.id);
    if (!list) list = [];
    (a as FloodDisaster).floodedTiles = list;
    flooded.set(a.id, list);
    for (let n = 0; n < (a.kind === 'hurricane' ? 10 : 18); n++) {
      const x = Math.round(a.x + (rnd() - 0.5) * 24), y = Math.round(a.y + (rnd() - 0.5) * 24);
      if (!inBounds(x, y)) continue; const i = idx(x, y);
      let shore = false; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (inBounds(x + dx, y + dy) && g.water[idx(x + dx, y + dy)]) shore = true;
      if (shore && !g.water[i]) { list.push(i); g.water[i] = 1; g.markDirty(x, y); if (rnd() < 0.45) destroy(state, x, y, false); }
      if (a.kind === 'hurricane' && rnd() < 0.25) { const j = idx(Math.max(0, Math.min(127, x)), Math.max(0, Math.min(127, y))); if (g.building[j]) g.condition[j] = Math.max(0, g.condition[j] - 45); }
    }
  } else if (a.kind === 'meteor' && a.life === 7) {
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) if (dx * dx + dy * dy <= 16) { const x = Math.round(a.x) + dx, y = Math.round(a.y) + dy; destroy(state, x, y); if (inBounds(x, y)) { g.height[idx(x, y)] -= HEIGHT_STEP * Math.max(1, 4 - Math.hypot(dx, dy)); g.terrainDirty = true; } }
  } else if (a.kind === 'volcano') {
    for (let n = 0; n < 7; n++) { const dx = Math.round((rnd() - 0.5) * 12), dy = Math.round((rnd() - 0.5) * 12), x = Math.round(a.x) + dx, y = Math.round(a.y) + dy; if (inBounds(x, y)) { const i = idx(x, y); g.height[i] += HEIGHT_STEP * Math.max(0, 4 - Math.hypot(dx, dy) * 0.5); g.water[i] = 0; g.terrainDirty = true; ignite(state, x, y, 24); } }
  } else if (a.kind === 'riot') {
    for (let n = 0; n < 4; n++) { const x = Math.round(a.x + (rnd() - 0.5) * 8), y = Math.round(a.y + (rnd() - 0.5) * 8); if (rnd() < 0.3) destroy(state, x, y, false); else ignite(state, x, y); }
  } else if (a.kind === 'aircrash') {
    const t = 24 - a.life; const x = Math.round(a.x + (a.vx ?? 1) * t), y = Math.round(a.y + (a.vy ?? 0.4) * t); destroy(state, x, y); ignite(state, x, y, 26);
  } else if (a.kind === 'meltdown') {
    for (let dy = -8; dy <= 8; dy++) for (let dx = -8; dx <= 8; dx++) if (dx * dx + dy * dy <= 64 && inBounds(Math.round(a.x) + dx, Math.round(a.y) + dy)) g.pollution[idx(Math.round(a.x) + dx, Math.round(a.y) + dy)] = 255;
  } else if (a.kind === 'chemical') {
    for (let n = 0; n < 20; n++) { const x = Math.round(a.x + (rnd() - 0.5) * 12), y = Math.round(a.y + (rnd() - 0.5) * 12); if (inBounds(x, y)) g.pollution[idx(x, y)] = 255; }
  }
}

export function updateDisasters(state: GameState): void {
  updateFire(state);
  for (let n = state.disasters.length - 1; n >= 0; n--) {
    const a = state.disasters[n]; tickDisaster(state, a); a.life--;
    if (a.life > 0) continue;
    const water = (a as FloodDisaster).floodedTiles ?? flooded.get(a.id);
    if (water) { for (const i of water) { state.grid.water[i] = 0; state.grid.markDirty(i % GRID_W, (i / GRID_W) | 0); } flooded.delete(a.id); state.grid.terrainDirty = true; }
    state.disasters.splice(n, 1); bus.emit('disaster:end', { id: a.id });
  }
  maybeRandomDisaster(state);
}

export function maybeRandomDisaster(state: GameState): void {
  if (!state.disastersEnabled || state.disasters.length || state.time.ticks < 24) return;
  const scale = state.difficulty === 'hard' ? 1.7 : state.difficulty === 'easy' ? 0.65 : state.difficulty === 'sandbox' ? 0.4 : 1;
  if (hash2(state.seed, state.time.ticks, 6769) >= scale / (365 * 3.2)) return;
  let kind = randomKinds[(hash2(state.time.ticks, state.seed, 77) * randomKinds.length) | 0];
  if (kind === 'chemical') {
    const p = pickTile(state, (i) => {
      if (!state.grid.building[i] || CATALOG[state.grid.building[i]]?.category !== 'industrial') return -1;
      const x = i % GRID_W, y = (i / GRID_W) | 0; let water = 0;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (inBounds(x + dx, y + dy)) water += state.grid.water[idx(x + dx, y + dy)];
      return water;
    });
    if (!state.grid.building[idx(p[0], p[1])]) kind = 'fire'; else { triggerDisaster(state, kind, p[0], p[1]); return; }
  }
  triggerDisaster(state, kind);
}
