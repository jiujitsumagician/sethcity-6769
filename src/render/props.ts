/**
 * SETHCITY 6769 — props + ambient life renderer (section A5).
 *
 * Static, instanced set (rebuilt on edits / season change, throttled):
 *  - trees in four species — conifer, broadleaf, palm on sand, bare in winter —
 *    with seasonal foliage tints and per-instance jitter, placed from grid.tree,
 *  - rocks, bushes, benches on parks/plazas, split-rail fences around farms,
 *  - streetlamps along straight streets (heads glow at night) and traffic
 *    lights at large intersections (phased red/amber/green glow),
 *  - anchored sailing boats on open water (they bob and swing).
 *
 * Living layer (updated every frame):
 *  - instanced cars / buses / trucks driving the road graph tile-to-tile with
 *    smooth bezier turns, keeping right, slowing at intersections, headlights
 *    and taillights glowing at night,
 *  - pedestrians strolling the pavements near occupied buildings,
 *  - vehicle counts scale with population + congestion.
 *
 * Player signs (state.signs) render here as CanvasTexture billboards on posts —
 * this class receives GameState, RoadRenderer does not.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { Grid } from '../core/grid';
import type { GameState } from '../core/state';
import {
  GRID_W,
  GRID_H,
  TILE_COUNT,
  SEA_LEVEL,
  RoadType,
  TerrainKind,
  idx,
  inBounds,
  type CitySign,
} from '../core/types';
import { hash2, clamp, lerp } from '../core/rng';
import { defOf } from '../core/catalog';
import {
  roadSurfaceHeight,
  lampSpotsForTile,
  roadConnMask,
  PAVE_LIFT,
} from './roads';

/* ────────────────────────────── scratch state ─────────────────────────────── */

const M = new THREE.Matrix4();
const V = new THREE.Vector3();
const S = new THREE.Vector3();
const Q = new THREE.Quaternion();
const E = new THREE.Euler();
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const COL = new THREE.Color();
const COL2 = new THREE.Color();

const DX = [0, 1, 0, -1] as const;
const DZ = [-1, 0, 1, 0] as const;

/* ─────────────────────── geometry construction helpers ────────────────────── */

interface PartOpts {
  rx?: number;
  ry?: number;
  rz?: number;
  sx?: number;
  sy?: number;
  sz?: number;
  emissive?: number;
}

/** transform + vertex-colour a base geometry, ready for merging */
function part(
  geo: THREE.BufferGeometry,
  hex: number,
  px = 0,
  py = 0,
  pz = 0,
  o: PartOpts = {},
): THREE.BufferGeometry {
  const g = geo.index ? geo.toNonIndexed() : geo;
  if (g !== geo) geo.dispose();
  E.set(o.rx ?? 0, o.ry ?? 0, o.rz ?? 0);
  M.compose(
    V.set(px, py, pz),
    Q.setFromEuler(E),
    S.set(o.sx ?? 1, o.sy ?? 1, o.sz ?? 1),
  );
  g.applyMatrix4(M);
  const n = g.attributes.position.count;
  const col = new Float32Array(n * 3);
  COL.setHex(hex);
  for (let i = 0; i < n; i++) {
    col[i * 3] = COL.r;
    col[i * 3 + 1] = COL.g;
    col[i * 3 + 2] = COL.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const emi = new Float32Array(n).fill(o.emissive ?? 0);
  g.setAttribute('aEmissive', new THREE.BufferAttribute(emi, 1));
  if (g.getAttribute('uv')) g.deleteAttribute('uv');
  return g;
}

function fuse(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const g = mergeGeometries(parts, false);
  for (const p of parts) p.dispose();
  g.computeVertexNormals();
  return g;
}

const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
const ico = (r: number) => new THREE.IcosahedronGeometry(r, 0);
const cone = (r: number, h: number, seg: number) => new THREE.ConeGeometry(r, h, seg);

/* ───────────────────────────── prop geometries ────────────────────────────── */

function geoConifer(): THREE.BufferGeometry {
  return fuse([
    part(box(0.07, 0.3, 0.07), 0x6d5138, 0, 0.14, 0),
    part(cone(0.3, 0.62, 6), 0xffffff, 0, 0.56, 0),
    part(cone(0.2, 0.46, 6), 0xffffff, 0, 0.94, 0),
  ]);
}

function geoBroadleaf(): THREE.BufferGeometry {
  return fuse([
    part(box(0.08, 0.32, 0.08), 0x6d5138, 0, 0.15, 0),
    part(ico(0.3), 0xffffff, 0, 0.52, 0, { sy: 0.92 }),
    part(ico(0.17), 0xffffff, 0.15, 0.4, 0.09),
  ]);
}

function geoPalm(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [
    part(box(0.07, 0.42, 0.07), 0x8a6f4d, 0.02, 0.2, 0, { rz: -0.08 }),
    part(box(0.06, 0.4, 0.06), 0x8a6f4d, 0.07, 0.55, 0, { rz: -0.14 }),
  ];
  for (let k = 0; k < 6; k++) {
    const frond = new THREE.PlaneGeometry(0.44, 0.13);
    frond.translate(0.24, 0, 0);
    parts.push(
      part(frond, 0x5da24c, 0.1, 0.76, 0, { rz: -0.5, ry: (k * Math.PI) / 3 }),
    );
  }
  return fuse(parts);
}

function geoBare(): THREE.BufferGeometry {
  return fuse([
    part(box(0.07, 0.44, 0.07), 0xffffff, 0, 0.21, 0),
    part(box(0.035, 0.3, 0.035), 0xffffff, 0.08, 0.46, 0.02, { rz: -0.7 }),
    part(box(0.035, 0.26, 0.035), 0xffffff, -0.07, 0.42, -0.02, { rz: 0.65 }),
    part(box(0.03, 0.22, 0.03), 0xffffff, 0.02, 0.5, 0.07, { rx: 0.6 }),
  ]);
}

function geoRock(): THREE.BufferGeometry {
  return fuse([part(ico(0.17), 0xffffff, 0, 0.05, 0, { sy: 0.62 })]);
}

function geoBush(): THREE.BufferGeometry {
  return fuse([
    part(ico(0.14), 0xffffff, 0, 0.09, 0, { sy: 0.72 }),
    part(ico(0.09), 0xffffff, 0.1, 0.07, 0.05, { sy: 0.7 }),
  ]);
}

function geoLamp(): THREE.BufferGeometry {
  return fuse([
    part(box(0.035, 0.62, 0.035), 0x3a3f45, 0, 0.31, 0),
    part(box(0.16, 0.028, 0.028), 0x3a3f45, 0.08, 0.62, 0),
    part(box(0.09, 0.035, 0.055), 0xfff2cc, 0.14, 0.6, 0, { emissive: 1 }),
  ]);
}

function geoTrafficLight(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [
    part(box(0.04, 0.55, 0.04), 0x2f3338, 0, 0.275, 0),
    part(box(0.07, 0.22, 0.08), 0x24272b, 0.015, 0.66, 0),
  ];
  const dots: [number, number, number][] = [
    [0xff3524, 1, 0.735],
    [0xffb424, 2, 0.66],
    [0x2fe06a, 3, 0.585],
  ];
  for (const [hex, em, dy] of dots) {
    parts.push(
      part(new THREE.PlaneGeometry(0.045, 0.045), hex, 0.052, dy, 0, {
        ry: Math.PI / 2,
        emissive: em,
      }),
    );
  }
  return fuse(parts);
}

function geoBench(): THREE.BufferGeometry {
  return fuse([
    part(box(0.32, 0.03, 0.11), 0x9a7549, 0, 0.13, 0),
    part(box(0.32, 0.11, 0.025), 0x9a7549, 0, 0.21, -0.05),
    part(box(0.03, 0.13, 0.1), 0x4a4640, -0.13, 0.065, 0),
    part(box(0.03, 0.13, 0.1), 0x4a4640, 0.13, 0.065, 0),
  ]);
}

function geoFence(): THREE.BufferGeometry {
  return fuse([
    part(box(0.04, 0.3, 0.04), 0xa08a68, -0.45, 0.15, 0),
    part(box(0.04, 0.3, 0.04), 0xa08a68, 0, 0.15, 0),
    part(box(0.04, 0.3, 0.04), 0xa08a68, 0.45, 0.15, 0),
    part(box(0.96, 0.03, 0.025), 0xa08a68, 0, 0.12, 0),
    part(box(0.96, 0.03, 0.025), 0xa08a68, 0, 0.24, 0),
  ]);
}

function geoBoat(): THREE.BufferGeometry {
  return fuse([
    part(box(0.5, 0.09, 0.2), 0xffffff, 0, 0.05, 0),
    part(box(0.14, 0.08, 0.13), 0xffffff, 0.3, 0.05, 0, { ry: Math.PI / 4 }),
    part(box(0.14, 0.09, 0.13), 0xe8e2d2, -0.08, 0.14, 0),
    part(box(0.018, 0.44, 0.018), 0x8a6f4d, 0.04, 0.32, 0),
    part(new THREE.PlaneGeometry(0.26, 0.32), 0xf5f1e6, 0.19, 0.36, 0),
  ]);
}

function geoCar(): THREE.BufferGeometry {
  return fuse([
    part(box(0.34, 0.1, 0.17), 0xffffff, 0, 0.09, 0),
    part(box(0.17, 0.08, 0.15), 0x232a34, -0.02, 0.18, 0),
    part(box(0.02, 0.03, 0.04), 0xfff0c8, 0.17, 0.1, 0.055, { emissive: 1 }),
    part(box(0.02, 0.03, 0.04), 0xfff0c8, 0.17, 0.1, -0.055, { emissive: 1 }),
    part(box(0.02, 0.026, 0.036), 0xe03a2c, -0.17, 0.1, 0.055, { emissive: 1 }),
    part(box(0.02, 0.026, 0.036), 0xe03a2c, -0.17, 0.1, -0.055, { emissive: 1 }),
  ]);
}

function geoBus(): THREE.BufferGeometry {
  return fuse([
    part(box(0.6, 0.19, 0.19), 0xffffff, 0, 0.15, 0),
    part(box(0.55, 0.06, 0.195), 0x27313d, 0, 0.21, 0),
    part(box(0.02, 0.035, 0.05), 0xfff0c8, 0.3, 0.11, 0.06, { emissive: 1 }),
    part(box(0.02, 0.035, 0.05), 0xfff0c8, 0.3, 0.11, -0.06, { emissive: 1 }),
    part(box(0.02, 0.03, 0.045), 0xe03a2c, -0.3, 0.11, 0.06, { emissive: 1 }),
    part(box(0.02, 0.03, 0.045), 0xe03a2c, -0.3, 0.11, -0.06, { emissive: 1 }),
  ]);
}

function geoTruck(): THREE.BufferGeometry {
  return fuse([
    part(box(0.14, 0.15, 0.17), 0xffffff, 0.19, 0.12, 0),
    part(box(0.34, 0.2, 0.18), 0xe9ebe7, -0.08, 0.16, 0),
    part(box(0.02, 0.035, 0.045), 0xfff0c8, 0.26, 0.1, 0.055, { emissive: 1 }),
    part(box(0.02, 0.035, 0.045), 0xfff0c8, 0.26, 0.1, -0.055, { emissive: 1 }),
    part(box(0.02, 0.03, 0.04), 0xe03a2c, -0.25, 0.1, 0.055, { emissive: 1 }),
    part(box(0.02, 0.03, 0.04), 0xe03a2c, -0.25, 0.1, -0.055, { emissive: 1 }),
  ]);
}

function geoPed(): THREE.BufferGeometry {
  return fuse([
    part(new THREE.CapsuleGeometry(0.032, 0.08, 2, 6), 0xffffff, 0, 0.1, 0),
    part(new THREE.SphereGeometry(0.026, 6, 5), 0xe8c39a, 0, 0.19, 0),
  ]);
}

/* ────────────────────────────── living layer ──────────────────────────────── */

interface Mover {
  cur: number;
  prev: number;
  nxt: number;
  ex: number;
  ez: number;
  cx: number;
  cz: number;
  xx: number;
  xz: number;
  t: number;
  sp: number;
  lane: number;
}

function newMover(): Mover {
  return { cur: -1, prev: -1, nxt: -1, ex: 0, ez: 0, cx: 0, cz: 0, xx: 0, xz: 0, t: 0, sp: 1, lane: 0.16 };
}

interface BoatAnchor {
  x: number;
  z: number;
  phase: number;
  r: number;
}

/* seasonal palettes (spring, summer, autumn, winter) */
const CONIF_TINT = [0x477f3a, 0x3b7538, 0x4c6e3b, 0x8aa691];
const LEAF_TINT = [0x6cb04b, 0x4f923f, 0xc27b2f, 0x6cb04b];
const BUSH_TINT = [0x5d9a44, 0x4c8a3c, 0xa87f36, 0x7d7f74];
const BARE_TINT = 0x6f5b49;
const CAR_COLS = [0xd23b34, 0xe8e8ea, 0x2e63c0, 0x2b2d33, 0xc8c9cf, 0xdba63a, 0x4d9c56, 0x8892a0];
const BUS_COLS = [0x3aa7a0, 0xe08a3a, 0xd9c13f];
const TRUCK_COLS = [0xb04a3c, 0x3d6fa8, 0x557a4e, 0x8a8f96];
const PED_COLS = [0xd94f43, 0x3f7fc2, 0xe3b53a, 0x58a05c, 0x9a6bc2, 0xe0e2e6, 0x35393f];
const BOAT_COLS = [0xd8dde2, 0xc75b4a, 0x4a7fc7, 0xe0b13f];

const TREE_CAP = 6200;

/* ────────────────────────────── the renderer ──────────────────────────────── */

export class PropRenderer {
  private scene: THREE.Scene;
  private grid: Grid;
  private state: GameState;

  private matGlow: THREE.MeshLambertMaterial;
  private matTL: THREE.MeshLambertMaterial;
  private uNight = { value: 0 };
  private uPhase = { value: 3 };

  private conifer: THREE.InstancedMesh;
  private leaf: THREE.InstancedMesh;
  private palm: THREE.InstancedMesh;
  private bare: THREE.InstancedMesh;
  private rock: THREE.InstancedMesh;
  private bush: THREE.InstancedMesh;
  private lamp: THREE.InstancedMesh;
  private tlight: THREE.InstancedMesh;
  private bench: THREE.InstancedMesh;
  private fence: THREE.InstancedMesh;
  private boat: THREE.InstancedMesh;
  private car: THREE.InstancedMesh;
  private bus: THREE.InstancedMesh;
  private truck: THREE.InstancedMesh;
  private ped: THREE.InstancedMesh;

  private cars: Mover[] = [];
  private buses: Mover[] = [];
  private trucks: Mover[] = [];
  private peds: Mover[] = [];
  private nCars = 0;
  private nBuses = 0;
  private nTrucks = 0;
  private nPeds = 0;

  private roadList: number[] = [];
  private walkList: number[] = [];
  private boatAnchors: BoatAnchor[] = [];
  private boatCandidates: number[] = [];

  private staticDirty = true;
  private staticTimer = 0;
  private lastSeason = -1;
  private signKey = '';
  private signRoot: THREE.Group;
  private signPostGeo: THREE.BufferGeometry;

  constructor(scene: THREE.Scene, grid: Grid, state: GameState) {
    this.scene = scene;
    this.grid = grid;
    this.state = state;

    this.matGlow = this.makeGlowMaterial(false);
    this.matTL = this.makeGlowMaterial(true);

    this.conifer = this.pool(geoConifer(), 3600, this.matGlow, true);
    this.leaf = this.pool(geoBroadleaf(), 3200, this.matGlow, true);
    this.palm = this.pool(geoPalm(), 700, this.matGlow, true);
    this.bare = this.pool(geoBare(), 3200, this.matGlow, true);
    this.rock = this.pool(geoRock(), 1200, this.matGlow, true);
    this.bush = this.pool(geoBush(), 1600, this.matGlow, false);
    this.lamp = this.pool(geoLamp(), 1400, this.matGlow, true);
    this.tlight = this.pool(geoTrafficLight(), 240, this.matTL, false);
    this.bench = this.pool(geoBench(), 500, this.matGlow, false);
    this.fence = this.pool(geoFence(), 1600, this.matGlow, false);
    this.boat = this.pool(geoBoat(), 16, this.matGlow, true, true);
    this.car = this.pool(geoCar(), 220, this.matGlow, true, true);
    this.bus = this.pool(geoBus(), 24, this.matGlow, true, true);
    this.truck = this.pool(geoTruck(), 20, this.matGlow, true, true);
    this.ped = this.pool(geoPed(), 90, this.matGlow, false, true);

    this.signRoot = new THREE.Group();
    this.scene.add(this.signRoot);
    this.signPostGeo = fuse([
      part(box(0.05, 0.62, 0.05), 0x6b5a45, -0.4, 0.31, 0),
      part(box(0.05, 0.62, 0.05), 0x6b5a45, 0.4, 0.31, 0),
    ]);
  }

  /* ───────────────────────────── public API ──────────────────────────────── */

  rebuildAll(): void {
    this.rebuildStatics();
    this.rebuildGraph();
    this.staticDirty = false;
    this.staticTimer = 0.25;
  }

  rebuildChunk(cx: number, cy: number): void {
    // instanced pools are global — collapse per-chunk requests into one
    // throttled full rebuild on the next update.
    this.staticDirty = true;
  }

  update(dt: number, elapsed: number, nightFactor: number, state: GameState): void {
    this.state = state;
    if (state.time.season !== this.lastSeason) {
      this.lastSeason = state.time.season;
      this.staticDirty = true;
    }
    this.staticTimer -= dt;
    if (this.staticDirty && this.staticTimer <= 0) {
      this.rebuildStatics();
      this.rebuildGraph();
      this.staticDirty = false;
      this.staticTimer = 0.25;
    }

    this.uNight.value = nightFactor;
    const cyc = elapsed % 10;
    this.uPhase.value = cyc < 4.5 ? 3 : cyc < 5.5 ? 2 : 1;

    this.syncSigns();
    this.updateVehicles(dt, state);
    this.updateBoats(elapsed);
  }

  dispose(): void {
    const meshes = [
      this.conifer, this.leaf, this.palm, this.bare, this.rock, this.bush,
      this.lamp, this.tlight, this.bench, this.fence, this.boat, this.car,
      this.bus, this.truck, this.ped,
    ];
    for (const m of meshes) {
      this.scene.remove(m);
      m.geometry.dispose();
      m.dispose();
    }
    this.clearSigns();
    this.scene.remove(this.signRoot);
    this.signPostGeo.dispose();
    this.matGlow.dispose();
    this.matTL.dispose();
  }

  /* ───────────────────────── materials + pools ───────────────────────────── */

  private makeGlowMaterial(trafficLight: boolean): THREE.MeshLambertMaterial {
    const mat = new THREE.MeshLambertMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
    });
    const uNight = this.uNight;
    const uPhase = this.uPhase;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uNight = uNight;
      if (trafficLight) shader.uniforms.uPhase = uPhase;
      shader.vertexShader =
        'attribute float aEmissive;\nvarying float vEmissive;\n' +
        shader.vertexShader.replace(
          '#include <color_vertex>',
          '#include <color_vertex>\n\tvEmissive = aEmissive;',
        );
      const glow = trafficLight
        ? 'totalEmissiveRadiance += vColor.rgb * ((abs(vEmissive - uPhase) < 0.5) ? 1.2 : 0.06) * step(0.5, vEmissive) * (0.35 + 0.65 * uNight);'
        : 'totalEmissiveRadiance += vColor.rgb * vEmissive * uNight * 1.7;';
      shader.fragmentShader =
        'varying float vEmissive;\nuniform float uNight;\n' +
        (trafficLight ? 'uniform float uPhase;\n' : '') +
        shader.fragmentShader.replace(
          '#include <emissivemap_fragment>',
          '#include <emissivemap_fragment>\n\t' + glow,
        );
    };
    mat.customProgramCacheKey = () =>
      trafficLight ? 'sethcity-props-tl' : 'sethcity-props';
    return mat;
  }

  private pool(
    geo: THREE.BufferGeometry,
    cap: number,
    mat: THREE.Material,
    shadow: boolean,
    dynamic = false,
  ): THREE.InstancedMesh {
    const m = new THREE.InstancedMesh(geo, mat, cap);
    m.count = 0;
    m.castShadow = shadow;
    m.receiveShadow = true;
    m.frustumCulled = false;
    if (dynamic) m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.scene.add(m);
    return m;
  }

  private put(
    mesh: THREE.InstancedMesh,
    n: number,
    x: number,
    y: number,
    z: number,
    rotY: number,
    s: number,
    color: THREE.Color | null,
    sy = -1,
  ): number {
    if (n >= mesh.instanceMatrix.count) return n;
    M.compose(
      V.set(x, y, z),
      Q.setFromAxisAngle(Y_AXIS, rotY),
      S.set(s, sy < 0 ? s : sy, s),
    );
    mesh.setMatrixAt(n, M);
    if (color) mesh.setColorAt(n, color);
    return n + 1;
  }

  /* ──────────────────────────── static rebuild ───────────────────────────── */

  private rebuildStatics(): void {
    const g = this.grid;
    const season = this.state.time.season;
    const winter = season === 3;
    let nCon = 0, nLeaf = 0, nPalm = 0, nBare = 0, nRock = 0, nBush = 0;
    let nLamp = 0, nTL = 0, nBench = 0, nFence = 0;

    // thinning ratio so dense forests stay inside the instance budget
    let want = 0;
    for (let i = 0; i < TILE_COUNT; i++) {
      if (g.tree[i] && !g.building[i] && !g.road[i] && !g.rail[i] && !g.water[i])
        want += g.tree[i];
    }
    const keep = want > 0 ? Math.min(1, TREE_CAP / want) : 1;

    const boatCand = this.boatCandidates;
    boatCand.length = 0;

    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const i = idx(x, y);
        const h = g.height[i];
        const bId = g.building[i];
        const empty = !bId && !g.road[i] && !g.rail[i] && !g.water[i];

        /* trees */
        if (g.tree[i] && empty) {
          const ter = g.terrain[i];
          for (let k = 0; k < g.tree[i]; k++) {
            if (hash2(x, y, 77 + k) > keep) continue;
            const jx = 0.15 + 0.7 * hash2(x, y, 90 + k);
            const jz = 0.15 + 0.7 * hash2(x, y, 110 + k);
            const rot = hash2(x, y, 130 + k) * Math.PI * 2;
            const sc = 0.75 + 0.55 * hash2(x, y, 150 + k);
            const jit = 0.86 + 0.28 * hash2(x, y, 170 + k);
            if (ter === TerrainKind.Sand) {
              COL.setHex(0xffffff).multiplyScalar(jit);
              nPalm = this.put(this.palm, nPalm, x + jx, h, y + jz, rot, sc, COL);
            } else if (ter === TerrainKind.Rock || ter === TerrainKind.Snow) {
              COL.setHex(CONIF_TINT[season]).multiplyScalar(jit);
              nCon = this.put(this.conifer, nCon, x + jx, h, y + jz, rot, sc * 0.9, COL);
            } else {
              const conif = hash2(x, y, 190 + k) < (ter === TerrainKind.Forest ? 0.6 : 0.45);
              if (conif) {
                COL.setHex(CONIF_TINT[season]).multiplyScalar(jit);
                nCon = this.put(this.conifer, nCon, x + jx, h, y + jz, rot, sc, COL);
              } else if (winter) {
                COL.setHex(BARE_TINT).multiplyScalar(jit);
                nBare = this.put(this.bare, nBare, x + jx, h, y + jz, rot, sc, COL);
              } else {
                COL.setHex(LEAF_TINT[season]).multiplyScalar(jit);
                if (season === 2)
                  COL.lerp(COL2.setHex(0xd8a437), hash2(x, y, 210 + k) * 0.55);
                nLeaf = this.put(this.leaf, nLeaf, x + jx, h, y + jz, rot, sc, COL);
              }
            }
          }
        }

        /* rocks + bushes */
        if (empty && !g.tree[i]) {
          const ter = g.terrain[i];
          const r1 = hash2(x, y, 230);
          if ((ter === TerrainKind.Rock && r1 < 0.2) || (ter !== TerrainKind.Rock && r1 < 0.012)) {
            COL.setHex(0x8a857c).multiplyScalar(0.8 + 0.4 * hash2(x, y, 231));
            nRock = this.put(
              this.rock, nRock,
              x + 0.2 + 0.6 * hash2(x, y, 232), h, y + 0.2 + 0.6 * hash2(x, y, 233),
              hash2(x, y, 234) * Math.PI * 2, 0.55 + 0.9 * hash2(x, y, 235), COL,
            );
          }
          const r2 = hash2(x, y, 240);
          if ((ter === TerrainKind.Grass || ter === TerrainKind.Forest) && r2 < 0.05) {
            COL.setHex(BUSH_TINT[season]).multiplyScalar(0.85 + 0.3 * hash2(x, y, 241));
            nBush = this.put(
              this.bush, nBush,
              x + 0.2 + 0.6 * hash2(x, y, 242), h, y + 0.2 + 0.6 * hash2(x, y, 243),
              hash2(x, y, 244) * Math.PI * 2, 0.7 + 0.7 * hash2(x, y, 245), COL,
            );
          }
        }

        /* streetlamps + traffic lights */
        if (g.road[i]) {
          for (const s of lampSpotsForTile(g, x, y))
            nLamp = this.put(this.lamp, nLamp, s.wx, s.wy, s.wz, s.rotY, 1, null);
          if (!g.water[i] && !g.tunnel[i]) {
            const mask = roadConnMask(g, x, y);
            let nc = 0;
            for (let d = 0; d < 4; d++) if (mask & (1 << d)) nc++;
            const rt = g.road[i];
            if (nc >= 3 && (rt === RoadType.Avenue || nc === 4)) {
              const wy1 = roadSurfaceHeight(g, x + 0.12, y + 0.12) + PAVE_LIFT;
              nTL = this.put(this.tlight, nTL, x + 0.12, wy1, y + 0.12, -Math.PI / 4, 1, null);
              if (nc === 4) {
                const wy2 = roadSurfaceHeight(g, x + 0.88, y + 0.88) + PAVE_LIFT;
                nTL = this.put(this.tlight, nTL, x + 0.88, wy2, y + 0.88, Math.PI * 0.75, 1, null);
              }
            }
          }
        }

        /* benches on parks + plazas */
        if (bId) {
          const def = defOf(bId);
          if ((def.archetype === 'park' || def.archetype === 'plaza') && hash2(x, y, 250) < 0.55) {
            COL.setHex(0xffffff);
            nBench = this.put(
              this.bench, nBench,
              x + 0.25 + 0.5 * hash2(x, y, 251), h, y + 0.25 + 0.5 * hash2(x, y, 252),
              hash2(x, y, 253) * Math.PI * 2, 1, null,
            );
          }
          /* split-rail fences around farms */
          if (def.archetype === 'farm') {
            for (let d = 0; d < 4; d++) {
              const nx = x + DX[d];
              const ny = y + DZ[d];
              const same = inBounds(nx, ny) && g.building[idx(nx, ny)] === bId;
              if (same || (inBounds(nx, ny) && g.road[idx(nx, ny)])) continue;
              const along = d === 0 || d === 2 ? 0 : Math.PI / 2;
              const fx = x + 0.5 + DX[d] * 0.46;
              const fz = y + 0.5 + DZ[d] * 0.46;
              nFence = this.put(this.fence, nFence, fx, h, fz, along, 1, null);
            }
          }
        }

        /* boat anchor candidates: deep open water on a sparse lattice */
        if (
          g.water[i] && h < SEA_LEVEL - 0.45 &&
          x % 4 === 1 && y % 4 === 2 && x > 2 && y > 2 && x < GRID_W - 3 && y < GRID_H - 3
        ) {
          let open = true;
          for (let dy2 = -2; dy2 <= 2 && open; dy2++)
            for (let dx2 = -2; dx2 <= 2; dx2++)
              if (!g.water[idx(x + dx2, y + dy2)]) { open = false; break; }
          if (open) boatCand.push(i);
        }
      }
    }

    this.finishPool(this.conifer, nCon);
    this.finishPool(this.leaf, nLeaf);
    this.finishPool(this.palm, nPalm);
    this.finishPool(this.bare, nBare);
    this.finishPool(this.rock, nRock);
    this.finishPool(this.bush, nBush);
    this.finishPool(this.lamp, nLamp);
    this.finishPool(this.tlight, nTL);
    this.finishPool(this.bench, nBench);
    this.finishPool(this.fence, nFence);

    /* pick spaced boat anchors */
    this.boatAnchors.length = 0;
    for (const i of boatCand) {
      if (this.boatAnchors.length >= 14) break;
      const bx = (i % GRID_W) + 0.5;
      const bz = ((i / GRID_W) | 0) + 0.5;
      let ok = true;
      for (const a of this.boatAnchors)
        if (Math.max(Math.abs(a.x - bx), Math.abs(a.z - bz)) < 8) { ok = false; break; }
      if (!ok) continue;
      this.boatAnchors.push({
        x: bx, z: bz,
        phase: hash2(i, 7, 3) * Math.PI * 2,
        r: 0.5 + hash2(i, 11, 5) * 0.5,
      });
    }
    for (let k = 0; k < this.boatAnchors.length; k++) {
      COL.setHex(BOAT_COLS[k % BOAT_COLS.length]);
      this.boat.setColorAt(k, COL);
    }
    this.boat.count = this.boatAnchors.length;
    if (this.boat.instanceColor) this.boat.instanceColor.needsUpdate = true;
  }

  private finishPool(mesh: THREE.InstancedMesh, n: number): void {
    mesh.count = n;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }

  /* ─────────────────────────── the road graph ────────────────────────────── */

  private rebuildGraph(): void {
    const g = this.grid;
    this.roadList.length = 0;
    this.walkList.length = 0;
    for (let i = 0; i < TILE_COUNT; i++) {
      if (!g.road[i]) continue;
      this.roadList.push(i);
      const rt = g.road[i];
      if ((rt === RoadType.Street || rt === RoadType.Avenue) && !g.water[i] && !g.tunnel[i]) {
        const x = i % GRID_W;
        const y = (i / GRID_W) | 0;
        let busy = false;
        for (let d = 0; d < 4 && !busy; d++) {
          const nx = x + DX[d];
          const ny = y + DZ[d];
          if (!inBounds(nx, ny)) continue;
          const ni = idx(nx, ny);
          busy = g.population[ni] + g.jobs[ni] > 20;
        }
        if (busy) this.walkList.push(i);
      }
    }
    // movers standing on vanished roads respawn on their next step
    for (const arr of [this.cars, this.buses, this.trucks, this.peds])
      for (const m of arr)
        if (m.cur >= 0 && !g.road[m.cur]) m.cur = -1;
  }

  /* ──────────────────────────── vehicle logic ────────────────────────────── */

  private laneFor(tile: number, walker: boolean): number {
    if (walker) return 0.42;
    const rt = this.grid.road[tile];
    return rt === RoadType.Avenue ? 0.27 : rt === RoadType.Highway ? 0.22 : 0.155;
  }

  private speedFor(tile: number, walker: boolean, kindMul: number): number {
    if (walker) return 0.3;
    const g = this.grid;
    const rt = g.road[tile];
    let sp = (rt === RoadType.Highway ? 3.2 : rt === RoadType.Avenue ? 2.1 : 1.4) * kindMul;
    const x = tile % GRID_W;
    const y = (tile / GRID_W) | 0;
    const mask = roadConnMask(g, x, y);
    let nc = 0;
    for (let d = 0; d < 4; d++) if (mask & (1 << d)) nc++;
    if (nc >= 3) sp *= 0.55;
    return sp;
  }

  private walkOk(tile: number): boolean {
    const rt = this.grid.road[tile];
    return rt === RoadType.Street || rt === RoadType.Avenue;
  }

  private pickNext(cur: number, prev: number, walker: boolean): number {
    const g = this.grid;
    const x = cur % GRID_W;
    const y = (cur / GRID_W) | 0;
    let count = 0;
    let c0 = -1, c1 = -1, c2 = -1;
    const px = prev >= 0 ? prev % GRID_W : -99;
    const py = prev >= 0 ? (prev / GRID_W) | 0 : -99;
    const sdx = x - px, sdy = y - py; // straight-ahead direction
    let straight = -1;
    for (let d = 0; d < 4; d++) {
      const nx = x + DX[d];
      const ny = y + DZ[d];
      if (!inBounds(nx, ny)) continue;
      const ni = idx(nx, ny);
      if (!g.road[ni]) continue;
      if (walker && !this.walkOk(ni)) continue;
      if (ni === prev) continue;
      if (DX[d] === sdx && DZ[d] === sdy) straight = ni;
      if (count === 0) c0 = ni;
      else if (count === 1) c1 = ni;
      else c2 = ni;
      count++;
    }
    if (count === 0) return prev >= 0 && g.road[prev] ? prev : -1;
    // prefer straight ahead ~65% of the time
    if (straight >= 0 && Math.random() < 0.65) return straight;
    const r = (Math.random() * count) | 0;
    return r === 0 ? c0 : r === 1 ? c1 : c2;
  }

  /** entry point carried over; computes exit + control for crossing m.cur → m.nxt */
  private setSegment(m: Mover, walker: boolean, kindMul: number): void {
    const cx0 = (m.cur % GRID_W) + 0.5;
    const cz0 = ((m.cur / GRID_W) | 0) + 0.5;
    const nx = (m.nxt % GRID_W) + 0.5;
    const nz = ((m.nxt / GRID_W) | 0) + 0.5;
    const dox = Math.sign(nx - cx0);
    const doz = Math.sign(nz - cz0);
    m.lane = this.laneFor(m.cur, walker);
    // exit: shared-edge midpoint, offset to the right of the outgoing direction
    m.xx = cx0 + dox * 0.5 + -doz * m.lane;
    m.xz = cz0 + doz * 0.5 + dox * m.lane;
    // control point: lane-line intersection for turns, midpoint for straights
    const dix = Math.sign(cx0 - ((m.prev >= 0 ? m.prev % GRID_W : m.cur % GRID_W) + 0.5));
    const diz = Math.sign(cz0 - ((m.prev >= 0 ? (m.prev / GRID_W) | 0 : (m.cur / GRID_W) | 0) + 0.5));
    if (dix !== 0 && doz !== 0) {
      m.cx = m.xx;
      m.cz = m.ez;
    } else if (diz !== 0 && dox !== 0) {
      m.cx = m.ex;
      m.cz = m.xz;
    } else {
      m.cx = (m.ex + m.xx) * 0.5;
      m.cz = (m.ez + m.xz) * 0.5;
    }
    m.sp = this.speedFor(m.cur, walker, kindMul);
  }

  private spawn(m: Mover, list: number[], walker: boolean, kindMul: number): boolean {
    if (list.length === 0) return false;
    const cur = list[(Math.random() * list.length) | 0];
    const nxt = this.pickNext(cur, -1, walker);
    if (nxt < 0) return false;
    m.cur = cur;
    m.prev = -1;
    m.nxt = nxt;
    m.t = Math.random() * 0.5;
    const cx0 = (cur % GRID_W) + 0.5;
    const cz0 = ((cur / GRID_W) | 0) + 0.5;
    const dox = Math.sign(((nxt % GRID_W) + 0.5) - cx0);
    const doz = Math.sign((((nxt / GRID_W) | 0) + 0.5) - cz0);
    const lane = this.laneFor(cur, walker);
    m.ex = cx0 - dox * 0.5 + -doz * lane;
    m.ez = cz0 - doz * 0.5 + dox * lane;
    this.setSegment(m, walker, kindMul);
    return true;
  }

  private advance(m: Mover, walker: boolean, kindMul: number): boolean {
    m.prev = m.cur;
    m.cur = m.nxt;
    if (m.cur < 0 || !this.grid.road[m.cur]) return false;
    const nxt = this.pickNext(m.cur, m.prev, walker);
    if (nxt < 0) return false;
    m.nxt = nxt;
    m.ex = m.xx;
    m.ez = m.xz;
    this.setSegment(m, walker, kindMul);
    return true;
  }

  private stepPool(
    movers: Mover[], active: number, target: number,
    list: number[], walker: boolean, kindMul: number,
    mesh: THREE.InstancedMesh, cols: number[], dt: number, lift: number,
  ): number {
    // grow / shrink towards target
    let spawned = 0;
    while (active < target && spawned < 3) {
      if (movers.length <= active) movers.push(newMover());
      if (!this.spawn(movers[active], list, walker, kindMul)) break;
      COL.setHex(cols[(Math.random() * cols.length) | 0]);
      COL.multiplyScalar(0.85 + Math.random() * 0.3);
      mesh.setColorAt(active, COL);
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      active++;
      spawned++;
    }
    if (active > target) active = target;

    const g = this.grid;
    for (let k = 0; k < active; k++) {
      const m = movers[k];
      if (m.cur < 0 || !g.road[m.cur] || m.nxt < 0 || !g.road[m.nxt]) {
        if (!this.spawn(m, list, walker, kindMul)) {
          m.cur = -1;
          M.makeScale(0, 0, 0);
          mesh.setMatrixAt(k, M);
          continue;
        }
      }
      m.t += dt * m.sp;
      let guard = 0;
      while (m.t >= 1 && guard++ < 3) {
        m.t -= 1;
        if (!this.advance(m, walker, kindMul)) {
          if (!this.spawn(m, list, walker, kindMul)) { m.cur = -1; break; }
        }
      }
      if (m.cur < 0) {
        M.makeScale(0, 0, 0);
        mesh.setMatrixAt(k, M);
        continue;
      }
      const t = m.t;
      const omt = 1 - t;
      const px = omt * omt * m.ex + 2 * t * omt * m.cx + t * t * m.xx;
      const pz = omt * omt * m.ez + 2 * t * omt * m.cz + t * t * m.xz;
      let hx = 2 * omt * (m.cx - m.ex) + 2 * t * (m.xx - m.cx);
      let hz = 2 * omt * (m.cz - m.ez) + 2 * t * (m.xz - m.cz);
      if (Math.abs(hx) + Math.abs(hz) < 1e-5) { hx = 1; hz = 0; }
      const rotY = Math.atan2(-hz, hx);
      const py = roadSurfaceHeight(g, px, pz) + lift;
      M.compose(V.set(px, py, pz), Q.setFromAxisAngle(Y_AXIS, rotY), S.set(1, 1, 1));
      mesh.setMatrixAt(k, M);
    }
    mesh.count = active;
    mesh.instanceMatrix.needsUpdate = true;
    return active;
  }

  private updateVehicles(dt: number, state: GameState): void {
    const pop = state.stats.population;
    const congestion = state.stats.traffic;
    const roads = this.roadList;
    const noRoads = roads.length === 0;

    const tCars = noRoads ? 0 : Math.min(220, Math.round(4 + pop * 0.012 + congestion * 90), roads.length * 2);
    const tBuses = noRoads ? 0 : Math.min(24, Math.floor(pop / 900));
    const tTrucks = noRoads ? 0 : Math.min(20, 2 + Math.floor(state.stats.indBuildings * 0.4));
    const tPeds = this.walkList.length === 0 ? 0 : Math.min(90, Math.floor(pop / 120));

    this.nCars = this.stepPool(this.cars, this.nCars, tCars, roads, false, 1, this.car, CAR_COLS, dt, 0.015);
    this.nBuses = this.stepPool(this.buses, this.nBuses, tBuses, roads, false, 0.8, this.bus, BUS_COLS, dt, 0.015);
    this.nTrucks = this.stepPool(this.trucks, this.nTrucks, tTrucks, roads, false, 0.85, this.truck, TRUCK_COLS, dt, 0.015);
    this.nPeds = this.stepPool(this.peds, this.nPeds, tPeds, this.walkList, true, 1, this.ped, PED_COLS, dt, PAVE_LIFT);
  }

  private updateBoats(elapsed: number): void {
    const n = this.boatAnchors.length;
    for (let k = 0; k < n; k++) {
      const a = this.boatAnchors[k];
      const w = elapsed * 0.07 + a.phase;
      const px = a.x + Math.cos(w) * a.r;
      const pz = a.z + Math.sin(w) * a.r;
      const py = SEA_LEVEL + 0.045 + Math.sin(elapsed * 1.25 + a.phase * 3) * 0.02;
      const rotY = Math.atan2(-Math.cos(w), -Math.sin(w));
      E.set(Math.sin(elapsed * 0.9 + a.phase) * 0.05, rotY, Math.sin(elapsed * 1.1 + a.phase) * 0.06);
      M.compose(V.set(px, py, pz), Q.setFromEuler(E), S.set(1, 1, 1));
      this.boat.setMatrixAt(k, M);
    }
    if (n > 0) this.boat.instanceMatrix.needsUpdate = true;
  }

  /* ─────────────────────────────── signs ─────────────────────────────────── */

  private clearSigns(): void {
    for (const child of [...this.signRoot.children]) {
      this.signRoot.remove(child);
      child.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh) {
          if (mesh.geometry !== this.signPostGeo) mesh.geometry.dispose();
          const mat = mesh.material as THREE.Material;
          if (mat !== this.matGlow) {
            const basic = mat as THREE.MeshBasicMaterial;
            if (basic.map) basic.map.dispose();
            mat.dispose();
          }
        }
      });
    }
  }

  private syncSigns(): void {
    const signs = this.state.signs;
    let key = String(signs.length);
    for (const s of signs) key += '|' + s.x + ',' + s.y + ',' + s.text;
    if (key === this.signKey) return;
    this.signKey = key;
    this.clearSigns();
    for (const s of signs) this.buildSign(s);
  }

  private buildSign(s: CitySign): void {
    if (!inBounds(s.x, s.y)) return;
    const g = this.grid;
    const i = idx(s.x, s.y);
    const h = Math.max(g.height[i], SEA_LEVEL);

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 96;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#12452a';
      ctx.fillRect(0, 0, 256, 96);
      ctx.strokeStyle = '#e9ebe7';
      ctx.lineWidth = 5;
      ctx.strokeRect(6, 6, 244, 84);
      ctx.fillStyle = '#f4f6f2';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let size = 40;
      const text = s.text || '·';
      do {
        ctx.font = `bold ${size}px system-ui, sans-serif`;
        size -= 2;
      } while (size > 12 && ctx.measureText(text).width > 232);
      ctx.fillText(text, 128, 50);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;

    const group = new THREE.Group();
    const board = new THREE.Mesh(
      new THREE.PlaneGeometry(0.95, 0.36),
      new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }),
    );
    board.position.y = 0.66;
    group.add(board);
    const posts = new THREE.Mesh(this.signPostGeo, this.matGlow);
    group.add(posts);

    let rotY = hash2(s.x, s.y, 61) * Math.PI * 2;
    for (let d = 0; d < 4; d++) {
      const nx = s.x + DX[d];
      const ny = s.y + DZ[d];
      if (inBounds(nx, ny) && g.road[idx(nx, ny)]) {
        rotY = d === 0 ? Math.PI : d === 2 ? 0 : d === 1 ? Math.PI / 2 : -Math.PI / 2;
        break;
      }
    }
    group.rotation.y = rotY;
    group.position.set(s.x + 0.5, h, s.y + 0.5);
    this.signRoot.add(group);
  }
}
