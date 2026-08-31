/**
 * SKYLINE — tile storage. Structure-of-arrays over the whole map.
 * All sim + render modules read/write through this. FROZEN CONTRACT.
 */
import {
  GRID_W,
  GRID_H,
  TILE_COUNT,
  CHUNK,
  CHUNKS_X,
  CHUNKS_Y,
  idx,
  inBounds,
  Zone,
  RoadType,
  TerrainKind,
} from './types';

export class Grid {
  readonly w = GRID_W;
  readonly h = GRID_H;

  /* terrain */
  height = new Float32Array(TILE_COUNT);
  water = new Uint8Array(TILE_COUNT); // 1 = water tile
  terrain = new Uint8Array(TILE_COUNT); // TerrainKind
  tree = new Uint8Array(TILE_COUNT); // 0..3 tree density

  /* player-authored */
  zone = new Uint8Array(TILE_COUNT); // Zone
  road = new Uint8Array(TILE_COUNT); // RoadType
  rail = new Uint8Array(TILE_COUNT); // 0/1
  wire = new Uint8Array(TILE_COUNT); // 0/1 overhead power line (pylon)
  pipe = new Uint8Array(TILE_COUNT); // 0/1 underground water main
  subway = new Uint8Array(TILE_COUNT); // 0/1 underground metro tunnel
  tunnel = new Uint8Array(TILE_COUNT); // 0/1 road passes through the hill here

  /* structures — `building` holds the catalog id; for multi-tile footprints
     every covered tile stores the id, and `originOffset` stores the packed
     (dx,dy) back to the origin tile (dx | dy<<4). Origin has 0. */
  building = new Uint16Array(TILE_COUNT);
  originOffset = new Uint8Array(TILE_COUNT);
  level = new Uint8Array(TILE_COUNT); // 1..5 development level
  variant = new Uint8Array(TILE_COUNT); // visual seed
  rotation = new Uint8Array(TILE_COUNT); // 0..3
  age = new Uint16Array(TILE_COUNT); // ticks since built
  condition = new Uint8Array(TILE_COUNT); // 0..255 (abandonment at 0)

  /* networks */
  powered = new Uint8Array(TILE_COUNT);
  watered = new Uint8Array(TILE_COUNT);
  roadNet = new Uint16Array(TILE_COUNT); // connected-component id, 0 = none

  /* simulation fields (all 0..255) */
  population = new Uint16Array(TILE_COUNT);
  jobs = new Uint16Array(TILE_COUNT);
  landValue = new Uint8Array(TILE_COUNT);
  pollution = new Uint8Array(TILE_COUNT);
  noise = new Uint8Array(TILE_COUNT);
  crime = new Uint8Array(TILE_COUNT);
  fireRisk = new Uint8Array(TILE_COUNT);
  traffic = new Uint8Array(TILE_COUNT);
  desirability = new Uint8Array(TILE_COUNT);

  /* service coverage fields (0..255) */
  covPolice = new Uint8Array(TILE_COUNT);
  covFire = new Uint8Array(TILE_COUNT);
  covHealth = new Uint8Array(TILE_COUNT);
  covEducation = new Uint8Array(TILE_COUNT);
  covPark = new Uint8Array(TILE_COUNT);
  covTransit = new Uint8Array(TILE_COUNT);

  /* transient */
  onFire = new Uint8Array(TILE_COUNT);
  scratchA = new Uint8Array(TILE_COUNT);
  scratchB = new Uint8Array(TILE_COUNT);

  /** chunks needing a render rebuild */
  dirtyChunks = new Set<number>();
  /** whole-terrain rebuild requested */
  terrainDirty = true;

  markDirty(x: number, y: number) {
    if (!inBounds(x, y)) return;
    const cx = (x / CHUNK) | 0;
    const cy = (y / CHUNK) | 0;
    this.dirtyChunks.add(cy * CHUNKS_X + cx);
    // neighbouring chunks may render overhang (tall buildings, road caps)
    if (x % CHUNK === 0 && cx > 0) this.dirtyChunks.add(cy * CHUNKS_X + cx - 1);
    if (x % CHUNK === CHUNK - 1 && cx < CHUNKS_X - 1)
      this.dirtyChunks.add(cy * CHUNKS_X + cx + 1);
    if (y % CHUNK === 0 && cy > 0) this.dirtyChunks.add((cy - 1) * CHUNKS_X + cx);
    if (y % CHUNK === CHUNK - 1 && cy < CHUNKS_Y - 1)
      this.dirtyChunks.add((cy + 1) * CHUNKS_X + cx);
  }

  markAllDirty() {
    for (let i = 0; i < CHUNKS_X * CHUNKS_Y; i++) this.dirtyChunks.add(i);
    this.terrainDirty = true;
  }

  /** origin tile index of whatever occupies (x,y); -1 when empty */
  originOf(x: number, y: number): number {
    if (!inBounds(x, y)) return -1;
    const i = idx(x, y);
    if (!this.building[i]) return -1;
    const off = this.originOffset[i];
    const dx = off & 0x0f;
    const dy = (off >> 4) & 0x0f;
    return idx(x - dx, y - dy);
  }

  isFlat(x: number, y: number, w: number, h: number): boolean {
    if (!inBounds(x, y) || !inBounds(x + w - 1, y + h - 1)) return false;
    const base = this.height[idx(x, y)];
    for (let j = 0; j < h; j++)
      for (let k = 0; k < w; k++) {
        const i = idx(x + k, y + j);
        if (this.water[i]) return false;
        if (Math.abs(this.height[i] - base) > 0.001) return false;
      }
    return true;
  }

  /** true when every tile of the footprint is free of buildings */
  isClear(x: number, y: number, w: number, h: number): boolean {
    if (!inBounds(x, y) || !inBounds(x + w - 1, y + h - 1)) return false;
    for (let j = 0; j < h; j++)
      for (let k = 0; k < w; k++) {
        const i = idx(x + k, y + j);
        if (this.building[i] || this.road[i] || this.rail[i] || this.water[i])
          return false;
      }
    return true;
  }

  /** does the footprint touch a road on any edge tile? */
  touchesRoad(x: number, y: number, w: number, h: number): boolean {
    for (let k = -1; k <= w; k++) {
      if (inBounds(x + k, y - 1) && this.road[idx(x + k, y - 1)]) return true;
      if (inBounds(x + k, y + h) && this.road[idx(x + k, y + h)]) return true;
    }
    for (let j = -1; j <= h; j++) {
      if (inBounds(x - 1, y + j) && this.road[idx(x - 1, y + j)]) return true;
      if (inBounds(x + w, y + j) && this.road[idx(x + w, y + j)]) return true;
    }
    return false;
  }

  /** true when the footprint sits next to (or on the shore of) water */
  touchesWater(x: number, y: number, w: number, h: number): boolean {
    for (let k = -1; k <= w; k++) {
      if (inBounds(x + k, y - 1) && this.water[idx(x + k, y - 1)]) return true;
      if (inBounds(x + k, y + h) && this.water[idx(x + k, y + h)]) return true;
    }
    for (let j = -1; j <= h; j++) {
      if (inBounds(x - 1, y + j) && this.water[idx(x - 1, y + j)]) return true;
      if (inBounds(x + w, y + j) && this.water[idx(x + w, y + j)]) return true;
    }
    return false;
  }

  clearTile(i: number) {
    this.building[i] = 0;
    this.originOffset[i] = 0;
    this.level[i] = 0;
    this.age[i] = 0;
    this.condition[i] = 0;
    this.population[i] = 0;
    this.jobs[i] = 0;
    this.onFire[i] = 0;
  }
}

/** 4-neighbour offsets */
export const N4: readonly [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/** 8-neighbour offsets */
export const N8: readonly [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export { Zone, RoadType, TerrainKind };
