/**
 * SETHCITY 6769 — sim/fields.ts
 * Per-tile ambient fields, recomputed every sim tick: pollution + noise
 * diffusion, crime, land value, fire risk, desirability.
 *
 * Diffusion is done with separable 3-tap box blurs over preallocated
 * Float32 scratch (no per-tile radius loops), and every combine step is a
 * straight typed-array sweep — the whole pass stays well under the 4 ms
 * budget for a 128×128 map. Zero per-call allocation.
 *
 * Ordinance effects that belong to these fields are applied here:
 * recycling (−15% pollution), clean_air (−35% industrial pollution),
 * smoke_detectors (−25% fire risk), neighborhood_watch (−20% crime),
 * legalise_gambling (+crime).
 *
 * Tiles whose pollution is pushed ≥ 200 from outside (meltdown irradiation
 * stamps 255 straight into grid.pollution) decay extremely slowly here, so
 * radiation lingers for years while ordinary smog tracks its sources.
 */
import { GRID_W, GRID_H, TILE_COUNT, RoadType } from '../core/types';
import type { GameState } from '../core/state';
import { defOf } from '../core/catalog';

/* ── preallocated scratch ────────────────────────────────────────────────── */
const fA = new Float32Array(TILE_COUNT);
const fTmp = new Float32Array(TILE_COUNT);
const beauty = new Float32Array(TILE_COUNT);
const waterProx = new Float32Array(TILE_COUNT);
const pollutionF = new Float32Array(TILE_COUNT); // float-precision pollution
const lvRaw = new Float32Array(TILE_COUNT);

/** separable 3-tap box blur, `passes` times, in place (clamped edges) */
function blur(field: Float32Array, passes: number): void {
  for (let p = 0; p < passes; p++) {
    for (let y = 0; y < GRID_H; y++) {
      const row = y * GRID_W;
      let prev = field[row];
      for (let x = 0; x < GRID_W; x++) {
        const c = field[row + x];
        const nxt = x < GRID_W - 1 ? field[row + x + 1] : c;
        fTmp[row + x] = (prev + c + nxt) / 3;
        prev = c;
      }
    }
    for (let x = 0; x < GRID_W; x++) {
      let prev = fTmp[x];
      for (let y = 0; y < GRID_H; y++) {
        const i = y * GRID_W + x;
        const c = fTmp[i];
        const nxt = y < GRID_H - 1 ? fTmp[i + GRID_W] : c;
        field[i] = (prev + c + nxt) / 3;
        prev = c;
      }
    }
  }
}

/** radial splat with linear falloff into the float beauty accumulator */
function splatBeauty(
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
      beauty[row + x] += strength * (1 - d * invR);
    }
  }
}

/** pollution + noise diffusion, crime, land value, fire risk, desirability */
export function computeFields(state: GameState): void {
  const grid = state.grid;
  const summer = state.time.season === 1;
  const winter = state.time.season === 3;

  /* ordinance modifiers */
  let recycling = false;
  let smoke = false;
  let watch = false;
  let cleanAir = false;
  let gambling = false;
  const ords = state.ordinances;
  for (let k = 0; k < ords.length; k++) {
    const o = ords[k];
    if (!o.active) continue;
    if (o.key === 'recycling') recycling = true;
    else if (o.key === 'smoke_detectors') smoke = true;
    else if (o.key === 'neighborhood_watch') watch = true;
    else if (o.key === 'clean_air') cleanAir = true;
    else if (o.key === 'legalise_gambling') gambling = true;
  }

  /* ── water proximity (feeds land value: shorefront is prime) ── */
  for (let i = 0; i < TILE_COUNT; i++) {
    waterProx[i] = grid.water[i] ? 220 : 0;
  }
  blur(waterProx, 3);

  /* ── beauty splats from building defs + trees ── */
  beauty.fill(0);
  for (let i = 0; i < TILE_COUNT; i++) {
    if (grid.tree[i]) beauty[i] += grid.tree[i] * 5;
    const id = grid.building[i];
    if (!id || grid.originOffset[i] !== 0) continue;
    const def = defOf(id);
    const b = def.beauty;
    if (!b) continue;
    splatBeauty(
      (i % GRID_W) + def.w * 0.5 - 0.5,
      ((i / GRID_W) | 0) + def.h * 0.5 - 0.5,
      b.radius,
      b.strength,
    );
  }

  /* ── pollution ── */
  for (let i = 0; i < TILE_COUNT; i++) {
    let p = 0;
    const id = grid.building[i];
    if (id) {
      const def = defOf(id);
      p = def.pollution;
      if (cleanAir && def.category === 'industrial') p *= 0.65;
    }
    if (recycling) p *= 0.85;
    p += grid.traffic[i] * 0.25;
    if (grid.onFire[i]) p += 160;
    fA[i] = p;
  }
  blur(fA, 3);
  const pol = grid.pollution;
  for (let i = 0; i < TILE_COUNT; i++) {
    let f = pollutionF[i];
    /* ingest external stamps (disasters write straight to grid.pollution) */
    if (pol[i] > f) f = pol[i];
    const target = fA[i];
    if (f > 200) {
      f = Math.max(target, f * 0.999); // radioactive: lingers for years
    } else if (target > f) {
      f = (f + target) * 0.5; // rises quickly toward new sources
    } else {
      f = f * 0.82 + target * 0.18; // fades once sources are gone
    }
    if (f > 340) f = 340;
    pollutionF[i] = f;
    pol[i] = f > 255 ? 255 : f;
  }

  /* ── noise ── */
  for (let i = 0; i < TILE_COUNT; i++) {
    let n = 0;
    const id = grid.building[i];
    if (id) n = defOf(id).noise;
    const r = grid.road[i];
    if (r === RoadType.Street) n += 16 + grid.traffic[i] * 0.4;
    else if (r === RoadType.Avenue) n += 30 + grid.traffic[i] * 0.45;
    else if (r === RoadType.Highway) n += 74 + grid.traffic[i] * 0.5;
    if (grid.rail[i]) n += 40;
    fA[i] = n;
  }
  blur(fA, 2);
  const noise = grid.noise;
  for (let i = 0; i < TILE_COUNT; i++) {
    noise[i] = fA[i] > 255 ? 255 : fA[i];
  }

  /* ── crime (uses last tick's land value — stable feedback) ── */
  const unempBoost = 1 + state.stats.unemployment * 1.5;
  for (let i = 0; i < TILE_COUNT; i++) {
    let c = 0;
    const id = grid.building[i];
    if (id) {
      const def = defOf(id);
      c = grid.population[i] * 0.3 + grid.jobs[i] * 0.12;
      const lv = grid.landValue[i];
      if (lv < 90) c += (90 - lv) * 0.5;
      if (def.grown && grid.condition[i] === 0 && grid.age[i] > 4) c += 60;
      if (def.key === 'x_casino') c += 90;
      c *= unempBoost;
      if (gambling) c *= 1.3;
    }
    fA[i] = c;
  }
  blur(fA, 2);
  const crime = grid.crime;
  const watchMul = watch ? 0.8 : 1;
  for (let i = 0; i < TILE_COUNT; i++) {
    let c =
      (fA[i] - grid.covPolice[i] * 0.85 - grid.covEducation[i] * 0.1) *
      watchMul;
    if (c < 0) c = 0;
    c = (crime[i] + c) * 0.5;
    crime[i] = c > 255 ? 255 : c;
  }

  /* ── fire risk ── */
  const smokeMul = smoke ? 0.75 : 1;
  for (let i = 0; i < TILE_COUNT; i++) {
    let fr = 0;
    const id = grid.building[i];
    if (id) {
      fr = 26 + defOf(id).pollution * 0.22;
      if (grid.condition[i] < 60 && grid.age[i] > 4) fr += 26;
      const lv = grid.landValue[i];
      if (lv < 80) fr += (80 - lv) * 0.25;
    } else if (grid.tree[i]) {
      fr = 8 + grid.tree[i] * 7 + (summer ? 12 : 0) - (winter ? 6 : 0);
    }
    fA[i] = fr;
  }
  blur(fA, 1);
  const fire = grid.fireRisk;
  for (let i = 0; i < TILE_COUNT; i++) {
    let fr = (fA[i] - grid.covFire[i] * 0.9) * smokeMul;
    if (grid.onFire[i]) fr = 255;
    if (fr < 0) fr = 0;
    fire[i] = fr > 255 ? 255 : fr;
  }

  /* ── land value ── */
  for (let i = 0; i < TILE_COUNT; i++) {
    if (grid.water[i]) {
      lvRaw[i] = 0;
      continue;
    }
    let lv =
      70 +
      waterProx[i] * 0.35 +
      beauty[i] +
      grid.covPark[i] * 0.28 +
      grid.covPolice[i] * 0.06 +
      grid.covEducation[i] * 0.08 +
      grid.covHealth[i] * 0.05 +
      grid.covTransit[i] * 0.05 -
      pol[i] * 0.5 -
      noise[i] * 0.2 -
      crime[i] * 0.4 -
      grid.traffic[i] * 0.1;
    const h = grid.height[i];
    if (h > 1.0) lv += Math.min(22, h * 5); // hillside prestige
    const id = grid.building[i];
    if (id) {
      const def = defOf(id);
      if (def.grown && grid.condition[i] === 0 && grid.age[i] > 4) lv -= 70;
    }
    lvRaw[i] = lv;
  }
  blur(lvRaw, 2);
  const land = grid.landValue;
  for (let i = 0; i < TILE_COUNT; i++) {
    let lv = lvRaw[i];
    if (grid.water[i] || lv < 0) lv = 0;
    lv = (land[i] + lv) * 0.5;
    land[i] = lv > 255 ? 255 : lv;
  }

  /* ── desirability ── */
  const des = grid.desirability;
  for (let i = 0; i < TILE_COUNT; i++) {
    if (grid.water[i]) {
      des[i] = 0;
      continue;
    }
    let d =
      land[i] * 0.55 +
      grid.covPark[i] * 0.12 +
      grid.covTransit[i] * 0.08 +
      (grid.powered[i] ? 18 : 0) +
      (grid.watered[i] ? 18 : 0) -
      crime[i] * 0.3 -
      pol[i] * 0.32 -
      noise[i] * 0.1 -
      grid.traffic[i] * 0.08;
    if (d < 0) d = 0;
    des[i] = d > 255 ? 255 : d;
  }
}
