/**
 * SETHCITY 6769 — A4: data overlays.
 * A 128×128 RGBA DataTexture blended over the terrain by render/terrainMesh.ts.
 * One colour ramp per OverlayId, including the SC2K-style underground view
 * (pipes, subway tunnels, stations and water producers under a slate wash).
 * Alpha 0 wherever a datum does not apply, so the ground shows through.
 */
import * as THREE from 'three';
import {
  GRID_W,
  GRID_H,
  TILE_COUNT,
  Zone,
  tx,
  ty,
  type OverlayId,
} from '../core/types';
import { CATALOG } from '../core/catalog';
import type { Grid } from '../core/grid';
import type { GameState } from '../core/state';

type RGB = readonly [number, number, number];

/* piecewise-linear ramp across n stops, t in 0..1, written into out */
const _rgb: number[] = [0, 0, 0];
function ramp(stops: readonly RGB[], t: number): number[] {
  const n = stops.length - 1;
  const f = Math.min(0.9999, Math.max(0, t)) * n;
  const i = f | 0;
  const ft = f - i;
  const a = stops[i];
  const b = stops[i + 1];
  _rgb[0] = a[0] + (b[0] - a[0]) * ft;
  _rgb[1] = a[1] + (b[1] - a[1]) * ft;
  _rgb[2] = a[2] + (b[2] - a[2]) * ft;
  return _rgb;
}

const POLLUTION: readonly RGB[] = [[110, 205, 110], [168, 168, 72], [136, 92, 44], [70, 42, 20]];
const LANDVALUE: readonly RGB[] = [[64, 104, 228], [80, 200, 124], [255, 206, 64]];
const TRAFFIC: readonly RGB[] = [[70, 200, 84], [255, 190, 54], [232, 48, 36]];
const NOISE: readonly RGB[] = [[190, 120, 255], [120, 40, 200]];
const CRIME: readonly RGB[] = [[255, 120, 90], [190, 10, 40]];
const TRANSIT: readonly RGB[] = [[210, 250, 250], [20, 190, 188]];
const DENSITY: readonly RGB[] = [[255, 242, 178], [255, 158, 54], [205, 32, 64]];
const HEALTH: readonly RGB[] = [[214, 244, 232], [36, 186, 140]];
const EDUCATION: readonly RGB[] = [[226, 222, 252], [110, 84, 226]];
const FIRECOV: readonly RGB[] = [[255, 224, 160], [255, 140, 32]];
const DESIRE: readonly RGB[] = [[224, 64, 52], [240, 222, 96], [74, 204, 96]];

const ZONE_RGBA: Record<number, readonly [number, number, number, number]> = {
  [Zone.ResLow]: [136, 224, 110, 140],
  [Zone.ResMed]: [92, 205, 84, 150],
  [Zone.ResHigh]: [44, 180, 60, 160],
  [Zone.ComLow]: [108, 176, 255, 140],
  [Zone.ComHigh]: [42, 122, 238, 160],
  [Zone.IndAgri]: [216, 200, 96, 140],
  [Zone.IndLight]: [236, 178, 64, 150],
  [Zone.IndHeavy]: [210, 140, 36, 160],
};

/* catalog ids drawn white in the underground view:
 * water producers (waterOut > 0) and subway stations */
let ugFlags: Uint8Array | null = null;
function undergroundFlags(): Uint8Array {
  if (!ugFlags) {
    ugFlags = new Uint8Array(CATALOG.length);
    for (const d of CATALOG) {
      if (d.waterOut > 0 || d.key === 't_subway') ugFlags[d.id] = 1;
    }
  }
  return ugFlags;
}

export class OverlayLayer {
  readonly texture: THREE.DataTexture;
  private data: Uint8Array;
  private overlay: OverlayId = 'none';
  private _strength = 0;

  constructor() {
    this.data = new Uint8Array(TILE_COUNT * 4);
    this.texture = new THREE.DataTexture(
      this.data,
      GRID_W,
      GRID_H,
      THREE.RGBAFormat,
      THREE.UnsignedByteType,
    );
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.generateMipmaps = false;
    this.texture.needsUpdate = true;
  }

  /** 0 when overlay is 'none' */
  get strength(): number {
    return this._strength;
  }

  set(overlay: OverlayId): void {
    this.overlay = overlay;
    this._strength = overlay === 'none' ? 0 : overlay === 'underground' ? 1 : 0.85;
    if (overlay === 'none') {
      this.data.fill(0);
      this.texture.needsUpdate = true;
    }
  }

  /** recompute pixels from the current grid; call ~4×/second while active */
  refresh(state: GameState): void {
    if (this.overlay === 'none') return;
    const g = state.grid;
    switch (this.overlay) {
      case 'zones': this.pxZones(g); break;
      case 'power': this.pxUtility(g, g.powered, g.wire, false); break;
      case 'water': this.pxUtility(g, g.watered, g.pipe, true); break;
      case 'pollution': this.pxPollution(g); break;
      case 'noise': this.pxField(g.noise, NOISE, 215, null); break;
      case 'crime': this.pxField(g.crime, CRIME, 220, null); break;
      case 'landvalue': this.pxLand(g, g.landValue, LANDVALUE, 135); break;
      case 'traffic': this.pxTraffic(g); break;
      case 'transit': this.pxField(g.covTransit, TRANSIT, 200, null); break;
      case 'density': this.pxDensity(g); break;
      case 'health': this.pxField(g.covHealth, HEALTH, 185, null); break;
      case 'education': this.pxField(g.covEducation, EDUCATION, 185, null); break;
      case 'fire': this.pxFire(g); break;
      case 'desirability': this.pxLand(g, g.desirability, DESIRE, 140); break;
      case 'underground': this.pxUnderground(g); break;
    }
    this.texture.needsUpdate = true;
  }

  dispose(): void {
    this.texture.dispose();
  }

  /* ─────────────────────────── per-overlay fills ─────────────────────── */

  private pxZones(g: Grid): void {
    const d = this.data;
    for (let i = 0; i < TILE_COUNT; i++) {
      const o = i * 4;
      const c = ZONE_RGBA[g.zone[i]];
      if (c) {
        d[o] = c[0];
        d[o + 1] = c[1];
        d[o + 2] = c[2];
        d[o + 3] = c[3];
      } else {
        d[o + 3] = 0;
      }
    }
  }

  /** power/water view: supplied translucent yellow/blue, starved red */
  private pxUtility(g: Grid, supplied: Uint8Array, carrier: Uint8Array, blue: boolean): void {
    const d = this.data;
    for (let i = 0; i < TILE_COUNT; i++) {
      const o = i * 4;
      const relevant = g.building[i] !== 0 || g.zone[i] !== 0;
      if (relevant) {
        if (supplied[i]) {
          if (blue) {
            d[o] = 84; d[o + 1] = 172; d[o + 2] = 255;
          } else {
            d[o] = 255; d[o + 1] = 232; d[o + 2] = 96;
          }
          d[o + 3] = 95;
        } else {
          d[o] = 255; d[o + 1] = 58; d[o + 2] = 42;
          d[o + 3] = 175;
        }
      } else if (carrier[i]) {
        if (supplied[i]) {
          if (blue) {
            d[o] = 120; d[o + 1] = 205; d[o + 2] = 255;
          } else {
            d[o] = 255; d[o + 1] = 240; d[o + 2] = 150;
          }
          d[o + 3] = 150;
        } else {
          d[o] = 255; d[o + 1] = 96; d[o + 2] = 64;
          d[o + 3] = 170;
        }
      } else {
        d[o + 3] = 0;
      }
    }
  }

  private pxPollution(g: Grid): void {
    const d = this.data;
    for (let i = 0; i < TILE_COUNT; i++) {
      const o = i * 4;
      const v = g.pollution[i];
      if (g.water[i] && v === 0) {
        d[o + 3] = 0;
        continue;
      }
      const t = v / 255;
      const c = ramp(POLLUTION, t);
      d[o] = c[0];
      d[o + 1] = c[1];
      d[o + 2] = c[2];
      d[o + 3] = (36 + t * 185) | 0;
    }
  }

  /** generic sequential ramp; alpha scales with the value, 0 at 0 */
  private pxField(src: Uint8Array, stops: readonly RGB[], aMax: number, water: Uint8Array | null): void {
    const d = this.data;
    for (let i = 0; i < TILE_COUNT; i++) {
      const o = i * 4;
      const v = src[i];
      if (v === 0 || (water && water[i])) {
        d[o + 3] = 0;
        continue;
      }
      const t = v / 255;
      const c = ramp(stops, t);
      d[o] = c[0];
      d[o + 1] = c[1];
      d[o + 2] = c[2];
      d[o + 3] = (t * aMax) | 0;
    }
  }

  /** land-wide ramp with constant alpha (land value, desirability) */
  private pxLand(g: Grid, src: Uint8Array, stops: readonly RGB[], alpha: number): void {
    const d = this.data;
    for (let i = 0; i < TILE_COUNT; i++) {
      const o = i * 4;
      if (g.water[i]) {
        d[o + 3] = 0;
        continue;
      }
      const c = ramp(stops, src[i] / 255);
      d[o] = c[0];
      d[o + 1] = c[1];
      d[o + 2] = c[2];
      d[o + 3] = alpha;
    }
  }

  private pxTraffic(g: Grid): void {
    const d = this.data;
    for (let i = 0; i < TILE_COUNT; i++) {
      const o = i * 4;
      if (!g.road[i]) {
        d[o + 3] = 0;
        continue;
      }
      const c = ramp(TRAFFIC, g.traffic[i] / 255);
      d[o] = c[0];
      d[o + 1] = c[1];
      d[o + 2] = c[2];
      d[o + 3] = 205;
    }
  }

  private pxDensity(g: Grid): void {
    const d = this.data;
    for (let i = 0; i < TILE_COUNT; i++) {
      const o = i * 4;
      const v = g.population[i] + g.jobs[i];
      if (v === 0) {
        d[o + 3] = 0;
        continue;
      }
      const t = Math.min(1, v / 380);
      const c = ramp(DENSITY, t);
      d[o] = c[0];
      d[o + 1] = c[1];
      d[o + 2] = c[2];
      d[o + 3] = (60 + t * 170) | 0;
    }
  }

  /** fire protection coverage, with tiles currently ablaze in bright red */
  private pxFire(g: Grid): void {
    const d = this.data;
    for (let i = 0; i < TILE_COUNT; i++) {
      const o = i * 4;
      if (g.onFire[i]) {
        d[o] = 255; d[o + 1] = 46; d[o + 2] = 10;
        d[o + 3] = 245;
        continue;
      }
      const v = g.covFire[i];
      if (v === 0) {
        d[o + 3] = 0;
        continue;
      }
      const t = v / 255;
      const c = ramp(FIRECOV, t);
      d[o] = c[0];
      d[o + 1] = c[1];
      d[o + 2] = c[2];
      d[o + 3] = (t * 175) | 0;
    }
  }

  /** SC2K underground: slate wash, pipes blue, subway orange, stations white */
  private pxUnderground(g: Grid): void {
    const d = this.data;
    const flags = undergroundFlags();
    for (let i = 0; i < TILE_COUNT; i++) {
      const o = i * 4;
      const id = g.building[i];
      const hasPipe = g.pipe[i] !== 0;
      const hasSub = g.subway[i] !== 0;
      if (id !== 0 && flags[id]) {
        d[o] = 245; d[o + 1] = 248; d[o + 2] = 255;
        d[o + 3] = 255;
      } else if (hasPipe && hasSub) {
        /* both on one tile: checkerboard the two colours */
        if (((tx(i) + ty(i)) & 1) === 0) {
          d[o] = 64; d[o + 1] = 172; d[o + 2] = 255;
        } else {
          d[o] = 255; d[o + 1] = 152; d[o + 2] = 44;
        }
        d[o + 3] = 235;
      } else if (hasPipe) {
        d[o] = 64; d[o + 1] = 172; d[o + 2] = 255;
        d[o + 3] = 235;
      } else if (hasSub) {
        d[o] = 255; d[o + 1] = 152; d[o + 2] = 44;
        d[o + 3] = 235;
      } else {
        d[o] = 36; d[o + 1] = 42; d[o + 2] = 54;
        d[o + 3] = 191;
      }
    }
  }
}
