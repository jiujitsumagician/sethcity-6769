/**
 * SETHCITY 6769 — sim/services.ts
 * Radial service coverage (police, fire, health, education, park, transit)
 * projected by placed buildings, scaled by the matching budget funding
 * multiplier. Subway stations that share a tunnel network with at least one
 * other station project transit coverage at ×1.25.
 *
 * All scratch is preallocated at module scope — zero per-call allocation.
 */
import { GRID_W, GRID_H, TILE_COUNT } from '../core/types';
import type { GameState } from '../core/state';
import type { Grid } from '../core/grid';
import { BY_KEY, defOf } from '../core/catalog';

const SUBWAY_STATION_ID = BY_KEY['t_subway'].id;

const labels = new Uint16Array(TILE_COUNT); // subway tunnel component ids
const queue = new Int32Array(TILE_COUNT);
const compStations = new Uint16Array(TILE_COUNT / 2 + 2); // stations per comp
const touched = new Int32Array(16); // comps one station footprint touches

/** labels 4-connected subway tunnel components; returns component count */
function labelSubway(grid: Grid): number {
  const sub = grid.subway;
  labels.fill(0);
  let comp = 0;
  for (let start = 0; start < TILE_COUNT; start++) {
    if (!sub[start] || labels[start]) continue;
    comp++;
    let head = 0;
    let tail = 0;
    queue[tail++] = start;
    labels[start] = comp;
    while (head < tail) {
      const i = queue[head++];
      const x = i % GRID_W;
      if (x > 0 && sub[i - 1] && !labels[i - 1]) {
        labels[i - 1] = comp;
        queue[tail++] = i - 1;
      }
      if (x < GRID_W - 1 && sub[i + 1] && !labels[i + 1]) {
        labels[i + 1] = comp;
        queue[tail++] = i + 1;
      }
      if (i >= GRID_W && sub[i - GRID_W] && !labels[i - GRID_W]) {
        labels[i - GRID_W] = comp;
        queue[tail++] = i - GRID_W;
      }
      if (i < TILE_COUNT - GRID_W && sub[i + GRID_W] && !labels[i + GRID_W]) {
        labels[i + GRID_W] = comp;
        queue[tail++] = i + GRID_W;
      }
    }
  }
  return comp;
}

function addComp(c: number, n: number): number {
  if (!c || n >= touched.length) return n;
  for (let k = 0; k < n; k++) if (touched[k] === c) return n;
  touched[n] = c;
  return n + 1;
}

/** fills `touched` with the distinct tunnel components a station footprint
 *  overlaps or 4-touches; returns how many were found */
function collectTouched(o: number, w: number, h: number): number {
  let n = 0;
  const ox = o % GRID_W;
  const oy = (o / GRID_W) | 0;
  const ex = Math.min(ox + w, GRID_W);
  const ey = Math.min(oy + h, GRID_H);
  for (let yy = oy; yy < ey; yy++) {
    for (let xx = ox; xx < ex; xx++) {
      const t = yy * GRID_W + xx;
      n = addComp(labels[t], n);
      if (xx > 0) n = addComp(labels[t - 1], n);
      if (xx < GRID_W - 1) n = addComp(labels[t + 1], n);
      if (yy > 0) n = addComp(labels[t - GRID_W], n);
      if (yy < GRID_H - 1) n = addComp(labels[t + GRID_W], n);
    }
  }
  return n;
}

/** saturating radial splat with linear falloff to the radius edge */
function splat(
  cov: Uint8Array,
  cx: number,
  cy: number,
  r: number,
  strength: number,
): void {
  const x0 = Math.max(0, Math.ceil(cx - r));
  const x1 = Math.min(GRID_W - 1, Math.floor(cx + r));
  const y0 = Math.max(0, Math.ceil(cy - r));
  const y1 = Math.min(GRID_H - 1, Math.floor(cy + r));
  const invR = 1 / r;
  for (let y = y0; y <= y1; y++) {
    const dy = y - cy;
    const row = y * GRID_W;
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d >= r) continue;
      const v = cov[row + x] + strength * (1 - d * invR);
      cov[row + x] = v > 255 ? 255 : v;
    }
  }
}

/** fills covPolice/covFire/covHealth/covEducation/covPark/covTransit from
 *  placed buildings, scaled by the matching budget funding multiplier */
export function computeCoverage(state: GameState): void {
  const grid = state.grid;
  const bud = state.budget;
  grid.covPolice.fill(0);
  grid.covFire.fill(0);
  grid.covHealth.fill(0);
  grid.covEducation.fill(0);
  grid.covPark.fill(0);
  grid.covTransit.fill(0);

  const nComp = labelSubway(grid);
  compStations.fill(0, 0, nComp + 1);

  /* count subway stations per tunnel network */
  for (let i = 0; i < TILE_COUNT; i++) {
    if (grid.building[i] !== SUBWAY_STATION_ID || grid.originOffset[i] !== 0) {
      continue;
    }
    const def = defOf(grid.building[i]);
    const n = collectTouched(i, def.w, def.h);
    for (let k = 0; k < n; k++) compStations[touched[k]]++;
  }

  /* splat every service building */
  for (let i = 0; i < TILE_COUNT; i++) {
    const id = grid.building[i];
    if (!id || grid.originOffset[i] !== 0) continue;
    const def = defOf(id);
    const svc = def.service;
    if (!svc) continue;
    let cov: Uint8Array;
    let fund: number;
    switch (svc.kind) {
      case 'police':
        cov = grid.covPolice;
        fund = bud.fundPolice;
        break;
      case 'fire':
        cov = grid.covFire;
        fund = bud.fundFire;
        break;
      case 'health':
        cov = grid.covHealth;
        fund = bud.fundHealth;
        break;
      case 'education':
        cov = grid.covEducation;
        fund = bud.fundEducation;
        break;
      case 'park':
        cov = grid.covPark;
        fund = bud.fundParks;
        break;
      default:
        /* transit rides the roads budget */
        cov = grid.covTransit;
        fund = bud.fundRoads;
        break;
    }
    let strength = svc.strength * fund;
    if (id === SUBWAY_STATION_ID) {
      const n = collectTouched(i, def.w, def.h);
      for (let k = 0; k < n; k++) {
        if (compStations[touched[k]] >= 2) {
          strength *= 1.25;
          break;
        }
      }
    }
    if (strength <= 0) continue;
    const ox = i % GRID_W;
    const oy = (i / GRID_W) | 0;
    splat(
      cov,
      ox + def.w * 0.5 - 0.5,
      oy + def.h * 0.5 - 0.5,
      svc.radius,
      strength,
    );
  }
}
