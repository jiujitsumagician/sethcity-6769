import { GRID_W, HEIGHT_STEP, SEA_LEVEL, Zone, RoadType, idx, inBounds, type ToolId } from '../core/types';
import type { GameState } from '../core/state';
import { BY_KEY, defOf } from '../core/catalog';
import type { BuildingDef } from '../core/types';
import { bus } from '../core/events';
import { flattenFor, terraform } from './terrain';
import { unlockedKeys } from './economy';

export interface ToolResult { ok: boolean; cost: number; reason?: string; tiles: number; }
const BASE: Record<string, number> = { road_street: 12, road_avenue: 60, road_highway: 220, rail: 90, wire: 6, pipe: 10, subway: 150, sign: 50, tree: 12, water_place: 120, terrain_raise: 20, terrain_lower: 20, terrain_level: 25, bulldoze: 4 };
const ZONES: Record<string, Zone> = { res_low: Zone.ResLow, res_med: Zone.ResMed, res_high: Zone.ResHigh, com_low: Zone.ComLow, com_high: Zone.ComHigh, ind_agri: Zone.IndAgri, ind_light: Zone.IndLight, ind_heavy: Zone.IndHeavy };
const ZONE_COST: Record<number, number> = { [Zone.ResLow]: 8, [Zone.ResMed]: 16, [Zone.ResHigh]: 24, [Zone.ComLow]: 8, [Zone.ComHigh]: 24, [Zone.IndAgri]: 8, [Zone.IndLight]: 16, [Zone.IndHeavy]: 24 };

export class Actions {
  pendingSignText: string | null = null;
  constructor(private state: GameState) {}
  private scale(n: number): number { return Math.ceil(n * (this.state.difficulty === 'easy' ? 0.8 : this.state.difficulty === 'hard' ? 1.25 : 1)); }
  spend(amount: number): boolean { if (this.state.difficulty === 'sandbox') return true; if (this.state.budget.funds < amount) return false; this.state.budget.funds -= amount; return true; }
  private waterSiteIsClear(d: BuildingDef, x: number, y: number): boolean {
    const g = this.state.grid;
    for (let yy = 0; yy < d.h; yy++) for (let xx = 0; xx < d.w; xx++) {
      const i = idx(x + xx, y + yy);
      if (g.building[i] || g.road[i] || g.rail[i]) return false;
      if (g.water[i] && g.height[i] < SEA_LEVEL - 2 * HEIGHT_STEP - 0.001) return false;
    }
    return true;
  }
  private footprintTouchesWater(d: BuildingDef, x: number, y: number): boolean {
    const g = this.state.grid;
    for (let yy = 0; yy < d.h; yy++) for (let xx = 0; xx < d.w; xx++) {
      if (g.water[idx(x + xx, y + yy)]) return true;
    }
    return g.touchesWater(x, y, d.w, d.h);
  }
  canPlace(key: string, x: number, y: number): ToolResult {
    const d = BY_KEY[key]; if (!d) return { ok: false, cost: 0, reason: 'Unknown building', tiles: 0 };
    const cost = this.scale(d.cost); if (!inBounds(x, y) || !inBounds(x + d.w - 1, y + d.h - 1)) return { ok: false, cost, reason: 'Outside city limits', tiles: 0 };
    if (!unlockedKeys(this.state).has(key)) return { ok: false, cost, reason: 'Not unlocked', tiles: 0 };
    if (d.needsWater ? !this.waterSiteIsClear(d, x, y) : !this.state.grid.isClear(x, y, d.w, d.h)) return { ok: false, cost, reason: 'Site is occupied or the water is too deep', tiles: 0 };
    if (d.needsWater && !this.footprintTouchesWater(d, x, y)) return { ok: false, cost, reason: 'Must touch water', tiles: 0 };
    if (d.needsFlat && !this.state.grid.isFlat(x, y, d.w, d.h)) {
      let min = Infinity, max = -Infinity;
      for (let yy = 0; yy < d.h; yy++) for (let xx = 0; xx < d.w; xx++) { const h = this.state.grid.height[idx(x + xx, y + yy)]; min = Math.min(min, h); max = Math.max(max, h); }
      if (max - min > HEIGHT_STEP * 4) return { ok: false, cost, reason: 'Terrain cannot be flattened', tiles: 0 };
    }
    if (this.state.difficulty !== 'sandbox' && this.state.budget.funds < cost) return { ok: false, cost, reason: 'Insufficient funds', tiles: 0 };
    return { ok: true, cost, tiles: d.w * d.h };
  }
  private stamp(d: BuildingDef, x: number, y: number): void { const g = this.state.grid, variant = ((x * 37 + y * 71 + this.state.seed) & 255), rotation = d.w === d.h ? ((x + y + this.state.seed) & 3) : 0; for (let yy = 0; yy < d.h; yy++) for (let xx = 0; xx < d.w; xx++) { const i = idx(x + xx, y + yy); if (d.needsWater) { g.height[i] = SEA_LEVEL; g.tree[i] = 0; g.terrainDirty = true; } g.building[i] = d.id; g.originOffset[i] = xx | yy << 4; g.level[i] = d.level ?? 1; g.variant[i] = variant; g.rotation[i] = rotation; g.condition[i] = 255; g.age[i] = 0; g.population[i] = 0; g.jobs[i] = d.residents > 0 ? 0 : Math.round(d.jobs / (d.w * d.h)); g.markDirty(x + xx, y + yy); } bus.emit('tile:changed', { i: idx(x, y) }); }
  place(key: string, x: number, y: number): ToolResult { const r = this.canPlace(key, x, y); if (!r.ok) return r; const d = BY_KEY[key]; if (d.needsFlat && !this.state.grid.isFlat(x, y, d.w, d.h) && !flattenFor(this.state.grid, x, y, d.w, d.h)) return { ...r, ok: false, reason: 'Terrain cannot be flattened' }; if (!this.spend(r.cost)) return { ...r, ok: false, reason: 'Insufficient funds' }; this.stamp(d, x, y); bus.emit('money:spent', { amount: r.cost, x, y, label: d.name }); return r; }
  bulldozeTile(x: number, y: number): number { const g = this.state.grid; if (!inBounds(x, y)) return 0; const o = g.originOf(x, y); let changed = 0; if (o >= 0) { const d = defOf(g.building[o]); const ox = o % GRID_W, oy = (o / GRID_W) | 0; const w = d.w, h = d.h; for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) { g.clearTile(idx(ox + xx, oy + yy)); g.markDirty(ox + xx, oy + yy); changed++; } bus.emit('tile:changed', { i: o }); return changed; } const i = idx(x, y); if (g.road[i] || g.rail[i] || g.wire[i] || g.pipe[i] || g.subway[i] || g.zone[i] || g.tree[i]) { g.road[i] = g.rail[i] = g.wire[i] = g.pipe[i] = g.subway[i] = g.tunnel[i] = g.zone[i] = g.tree[i] = 0; g.markDirty(x, y); bus.emit('tile:changed', { i }); return 1; } return 0; }
  applyTool(tool: ToolId, x0: number, y0: number, x1: number, y1: number, preview: boolean): ToolResult {
    if (tool === 'inspect') return { ok: true, cost: 0, tiles: 0 };
    if (tool.startsWith('build_')) return preview ? this.canPlace(tool.slice(6), x0, y0) : this.place(tool.slice(6), x0, y0);
    if (tool.startsWith('zone_') && !(tool.slice(5) in ZONES)) return { ok: false, cost: 0, reason: 'Unknown zone', tiles: 0 };
    const minX = Math.max(0, Math.min(x0, x1)), maxX = Math.min(127, Math.max(x0, x1)), minY = Math.max(0, Math.min(y0, y1)), maxY = Math.min(127, Math.max(y0, y1));
    const points: [number, number][] = []; const line = tool.startsWith('road_') || tool === 'rail' || tool === 'wire' || tool === 'pipe' || tool === 'subway';
    if (line) { const horiz = Math.abs(x1 - x0) >= Math.abs(y1 - y0); if (horiz) { const step = x1 >= x0 ? 1 : -1; for (let x = x0; x !== x1 + step; x += step) if (inBounds(x, y0)) points.push([x, y0]); const sy = y1 >= y0 ? 1 : -1; for (let y = y0 + sy; y !== y1 + sy; y += sy) if (inBounds(x1, y)) points.push([x1, y]); } else { const sy = y1 >= y0 ? 1 : -1; for (let y = y0; y !== y1 + sy; y += sy) if (inBounds(x0, y)) points.push([x0, y]); const sx = x1 >= x0 ? 1 : -1; for (let x = x0 + sx; x !== x1 + sx; x += sx) if (inBounds(x, y1)) points.push([x, y1]); } } else for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) points.push([x, y]);
    if (!points.length) return { ok: false, cost: 0, reason: 'Outside city limits', tiles: 0 };
    const g = this.state.grid;
    for (const [x, y] of points) {
      const i = idx(x, y);
      if ((tool.startsWith('road_') || tool === 'rail' || tool === 'water_place') && g.building[i])
        return { ok: false, cost: 0, reason: 'Building in the way', tiles: 0 };
      if (tool === 'water_place' && (g.road[i] || g.rail[i]))
        return { ok: false, cost: 0, reason: 'Transport route in the way', tiles: 0 };
      if (tool.startsWith('terrain_') && (g.building[i] || g.road[i] || g.rail[i]))
        return { ok: false, cost: 0, reason: 'Clear the site before reshaping terrain', tiles: 0 };
    }
    /* zone/tree rects paint around obstacles (SC2K-style) instead of refusing */
    if (tool.startsWith('zone_') || tool === 'tree') {
      const paintable = points.filter(([x, y]) => {
        const i = idx(x, y);
        return !g.building[i] && !g.road[i] && !g.rail[i] && !g.water[i];
      });
      if (!paintable.length)
        return { ok: false, cost: 0, reason: 'Nothing to paint here', tiles: 0 };
      points.length = 0;
      for (const p of paintable) points.push(p);
    }
    let raw = 0, valid = 0;
    const first = points[0], last = points[points.length - 1];
    const endpoint = (g.height[idx(first[0], first[1])] + g.height[idx(last[0], last[1])]) * 0.5;
    const dozed = new Set<number>();
    for (const [x, y] of points) {
      const i = idx(x, y);
      let p = tool.startsWith('zone_') ? (ZONE_COST[ZONES[tool.slice(5)]] ?? 0) : BASE[tool] ?? 0;
      if (tool === 'bulldoze') {
        // charge only for tiles that hold something; a multi-tile building
        // costs one fee no matter how many of its tiles the drag covers
        const o = g.originOf(x, y);
        if (o >= 0) { if (dozed.has(o)) p = 0; else dozed.add(o); }
        else if (!g.road[i] && !g.rail[i] && !g.wire[i] && !g.pipe[i] && !g.zone[i] && !g.tree[i]) p = 0;
      }
      if ((tool.startsWith('road_') || tool === 'rail') && this.state.grid.water[i]) p *= 5; if (tool.startsWith('road_') && this.state.grid.height[i] >= endpoint + 2 * HEIGHT_STEP) p = 12 * 8; raw += p; valid++;
    }
    const cost = this.scale(raw); if (this.state.difficulty !== 'sandbox' && this.state.budget.funds < cost) return { ok: false, cost, reason: 'Insufficient funds', tiles: valid }; if (preview) return { ok: true, cost, tiles: valid }; if (!this.spend(cost)) return { ok: false, cost, reason: 'Insufficient funds', tiles: valid };
    for (const [x, y] of points) { const i = idx(x, y); if (tool === 'bulldoze') this.bulldozeTile(x, y); else if (tool.startsWith('zone_')) g.zone[i] = ZONES[tool.slice(5)] ?? Zone.None; else if (tool === 'road_street') { g.zone[i] = 0; g.tree[i] = 0; g.road[i] = RoadType.Street; g.tunnel[i] = !g.water[i] && g.height[i] >= endpoint + 2 * HEIGHT_STEP ? 1 : 0; } else if (tool === 'road_avenue') { g.zone[i] = 0; g.tree[i] = 0; g.road[i] = RoadType.Avenue; g.tunnel[i] = !g.water[i] && g.height[i] >= endpoint + 2 * HEIGHT_STEP ? 1 : 0; } else if (tool === 'road_highway') { g.zone[i] = 0; g.tree[i] = 0; g.road[i] = RoadType.Highway; g.tunnel[i] = !g.water[i] && g.height[i] >= endpoint + 2 * HEIGHT_STEP ? 1 : 0; } else if (tool === 'rail') { g.zone[i] = 0; g.tree[i] = 0; g.rail[i] = 1; } else if (tool === 'wire') g.wire[i] = 1; else if (tool === 'pipe') g.pipe[i] = 1; else if (tool === 'subway') g.subway[i] = 1; else if (tool === 'tree') g.tree[i] = Math.min(3, g.tree[i] + 1); else if (tool === 'water_place') { g.zone[i] = 0; g.tree[i] = 0; g.water[i] = 1; g.height[i] = SEA_LEVEL - HEIGHT_STEP; g.terrainDirty = true; } else if (tool.startsWith('terrain_')) { terraform(g, x, y, 0, tool.slice(8) as 'raise' | 'lower' | 'level', tool === 'terrain_level' ? g.height[idx(first[0], first[1])] : undefined); g.terrainDirty = true; } else if (tool === 'sign' && this.pendingSignText) { this.state.signs.push({ x, y, text: this.pendingSignText.slice(0, 24) }); this.pendingSignText = null; } g.markDirty(x, y); bus.emit('tile:changed', { i }); }
    return { ok: true, cost, tiles: valid };
  }
}
