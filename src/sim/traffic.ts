/**
 * SETHCITY 6769 — sim/traffic.ts
 * Commuter flow without A*: a multi-source BFS "job accessibility" field is
 * grown from road tiles beside commercial + industrial buildings, then each
 * populated tile pushes its commuters down the gradient toward the nearest
 * jobs, accumulating load per road tile. Load is capped against road
 * capacity (street 1×, avenue 2.6×, highway 6×) and transit coverage
 * removes car trips at the source.
 *
 * BFS queue and load buffers are preallocated — zero per-call allocation.
 */
import { GRID_W, GRID_H, TILE_COUNT, RoadType } from '../core/types';
import type { GameState } from '../core/state';
import { defOf } from '../core/catalog';

const dist = new Int32Array(TILE_COUNT); // hops to nearest jobs, -1 = none
const queue = new Int32Array(TILE_COUNT);
const load = new Float32Array(TILE_COUNT);

const CAP_STREET = 120; // comfortable commuters per street tile
const CAP_AVENUE = CAP_STREET * 2.6;
const CAP_HIGHWAY = CAP_STREET * 6;

/** nearest road tile with job access within 3 tiles Chebyshev; -1 = none */
function findAccess(i: number): number {
  const x = i % GRID_W;
  const y = (i / GRID_W) | 0;
  for (let r = 1; r <= 3; r++) {
    const x0 = x - r < 0 ? 0 : x - r;
    const x1 = x + r >= GRID_W ? GRID_W - 1 : x + r;
    const y0 = y - r < 0 ? 0 : y - r;
    const y1 = y + r >= GRID_H ? GRID_H - 1 : y + r;
    for (let yy = y0; yy <= y1; yy++) {
      const row = yy * GRID_W;
      const edgeRow = yy === y - r || yy === y + r;
      for (let xx = x0; xx <= x1; xx++) {
        if (!edgeRow && xx !== x - r && xx !== x + r) continue;
        if (dist[row + xx] >= 0) return row + xx;
      }
    }
  }
  return -1;
}

/** commuter flow: residents seek jobs along the road graph;
 *  fills grid.traffic and stats.traffic */
export function computeTraffic(state: GameState): void {
  const grid = state.grid;
  const road = grid.road;
  dist.fill(-1);
  load.fill(0);

  /* seeds: road tiles 4-adjacent to commercial/industrial job tiles
     (every footprint tile carries the building id, so the whole perimeter
     of a large employer seeds the field) */
  let tail = 0;
  for (let i = 0; i < TILE_COUNT; i++) {
    const id = grid.building[i];
    if (!id) continue;
    const def = defOf(id);
    if (def.jobs <= 0) continue;
    if (def.category !== 'commercial' && def.category !== 'industrial') {
      continue;
    }
    const x = i % GRID_W;
    if (x > 0 && road[i - 1] && dist[i - 1] < 0) {
      dist[i - 1] = 0;
      queue[tail++] = i - 1;
    }
    if (x < GRID_W - 1 && road[i + 1] && dist[i + 1] < 0) {
      dist[i + 1] = 0;
      queue[tail++] = i + 1;
    }
    if (i >= GRID_W && road[i - GRID_W] && dist[i - GRID_W] < 0) {
      dist[i - GRID_W] = 0;
      queue[tail++] = i - GRID_W;
    }
    if (i < TILE_COUNT - GRID_W && road[i + GRID_W] && dist[i + GRID_W] < 0) {
      dist[i + GRID_W] = 0;
      queue[tail++] = i + GRID_W;
    }
  }

  /* multi-source BFS over the road graph */
  let head = 0;
  while (head < tail) {
    const i = queue[head++];
    const d = dist[i] + 1;
    const x = i % GRID_W;
    if (x > 0 && road[i - 1] && dist[i - 1] < 0) {
      dist[i - 1] = d;
      queue[tail++] = i - 1;
    }
    if (x < GRID_W - 1 && road[i + 1] && dist[i + 1] < 0) {
      dist[i + 1] = d;
      queue[tail++] = i + 1;
    }
    if (i >= GRID_W && road[i - GRID_W] && dist[i - GRID_W] < 0) {
      dist[i - GRID_W] = d;
      queue[tail++] = i - GRID_W;
    }
    if (i < TILE_COUNT - GRID_W && road[i + GRID_W] && dist[i + GRID_W] < 0) {
      dist[i + GRID_W] = d;
      queue[tail++] = i + GRID_W;
    }
  }

  /* push residents down the gradient toward jobs */
  if (tail > 0) {
    for (let i = 0; i < TILE_COUNT; i++) {
      const pop = grid.population[i];
      if (!pop) continue;
      const access = findAccess(i);
      if (access < 0) continue;
      let trips = pop * 0.42;
      trips *= 1 - 0.5 * (grid.covTransit[i] / 255); // transit removes cars
      let cur = access;
      load[cur] += trips;
      let guard = 256;
      while (dist[cur] > 0 && guard-- > 0) {
        const x = cur % GRID_W;
        const dc = dist[cur];
        let next = -1;
        if (x > 0 && dist[cur - 1] >= 0 && dist[cur - 1] < dc) {
          next = cur - 1;
        } else if (x < GRID_W - 1 && dist[cur + 1] >= 0 && dist[cur + 1] < dc) {
          next = cur + 1;
        } else if (cur >= GRID_W && dist[cur - GRID_W] >= 0 && dist[cur - GRID_W] < dc) {
          next = cur - GRID_W;
        } else if (
          cur < TILE_COUNT - GRID_W &&
          dist[cur + GRID_W] >= 0 &&
          dist[cur + GRID_W] < dc
        ) {
          next = cur + GRID_W;
        }
        if (next < 0) break;
        cur = next;
        load[cur] += trips;
      }
    }
  }

  /* congestion per road tile (temporally smoothed) + felt congestion stat */
  let sumLoad = 0;
  let sumCong = 0;
  const traffic = grid.traffic;
  for (let i = 0; i < TILE_COUNT; i++) {
    const r = road[i];
    if (!r) {
      traffic[i] = 0;
      continue;
    }
    const cap =
      r === RoadType.Highway
        ? CAP_HIGHWAY
        : r === RoadType.Avenue
          ? CAP_AVENUE
          : CAP_STREET;
    const c = load[i] / cap;
    let v = c * 150;
    if (v > 255) v = 255;
    traffic[i] = (traffic[i] + v) * 0.5;
    const l = load[i];
    if (l > 0) {
      sumLoad += l;
      sumCong += (c > 1 ? 1 : c) * l;
    }
  }
  state.stats.traffic = sumLoad > 0 ? sumCong / sumLoad : 0;
}
