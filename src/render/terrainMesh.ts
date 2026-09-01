/**
 * SKYLINE — stepped terrain renderer.
 *
 *  - one merged, vertex-coloured mesh per 16x16 chunk: flat tile tops plus the
 *    vertical cliff walls between tiles of differing height,
 *  - baked corner ambient occlusion and per-tile colour jitter so the ground
 *    never reads as a uniform flat-shaded sheet,
 *  - an overlay slot (128x128 RGBA DataTexture blended over the albedo) and a
 *    build-preview highlight rectangle, both injected into the standard
 *    Lambert shader — no extra geometry, no extra draw calls,
 *  - a single animated water plane over the whole map: two scrolling wave
 *    layers, fresnel rim, depth ramp from turquoise shallows to deep blue,
 *    sun glint and a soft foam line at the shore.
 */
import * as THREE from 'three';
import type { Grid } from '../core/grid';
import {
  GRID_W,
  GRID_H,
  CHUNK,
  CHUNKS_X,
  CHUNKS_Y,
  HEIGHT_STEP,
  SEA_LEVEL,
  TerrainKind,
} from '../core/types';
import { hash2, clamp01, lerp } from '../core/rng';

/* ─────────────────────────────── palette ──────────────────────────────────── */

const C = (hex: number) => new THREE.Color(hex);

const PAL = {
  grass: C(0x74a94b),
  grassAlt: C(0x8dbd5b),
  grassDry: C(0xa9b45f),
  forest: C(0x4d7f3b),
  forestDeep: C(0x3c6b31),
  sand: C(0xe9d9a8),
  sandWet: C(0xcbb684),
  rock: C(0x928c81),
  rockDark: C(0x6f695f),
  snow: C(0xf5f8fb),
  dirt: C(0xab8b64),
  bedShallow: C(0xdcc994),
  bedDeep: C(0x24414c),
  cliff: C(0x857b6e),
  cliffLow: C(0x4e4840),
};

/* worst case per chunk: every tile emits a top quad plus four wall quads */
const MAX_VERTS = CHUNK * CHUNK * (4 + 16);
const MAX_INDICES = CHUNK * CHUNK * (6 + 24);

const sPos = new Float32Array(MAX_VERTS * 3);
const sNor = new Float32Array(MAX_VERTS * 3);
const sCol = new Float32Array(MAX_VERTS * 3);
const sWind = new Float32Array(MAX_VERTS);
const sIdx = new Uint16Array(MAX_INDICES);

const tmpColor = new THREE.Color();
const tmpColorB = new THREE.Color();
const sunDir = new THREE.Vector3(0.45, 0.72, 0.28).normalize();
const scratchV = new THREE.Vector3();

/** deepest sea floor the generator can produce, used to normalise depth */
const MAX_DEPTH = 7 * HEIGHT_STEP;
/** how far the foam reaches out from the shoreline, in tiles */
const FOAM_REACH = 2.6;
/** height the map edge skirts drop to, giving the diorama a clean plinth */
const EDGE_FLOOR = -9 * HEIGHT_STEP;

/** soft baked ambient occlusion for a tile-top corner: neighbours rising above
 *  this tile shade the corner in; an open cliff edge catches a touch more sky */
function ao(h: number, a: number, b: number, d: number): number {
  const riseA = clamp01((a - h) / (HEIGHT_STEP * 2));
  const riseB = clamp01((b - h) / (HEIGHT_STEP * 2));
  const riseD = clamp01((d - h) / (HEIGHT_STEP * 2));
  const occ = riseA + riseB + riseD * (riseA + riseB > 1.2 ? 0.2 : 0.55);
  const open = (a < h - 1e-4 ? 1 : 0) + (b < h - 1e-4 ? 1 : 0);
  return Math.max(0.5, 1 - occ * 0.15) + open * 0.03;
}

/** per-corner brightness jitter, keyed on the shared corner lattice so
 *  adjacent tiles blend into a soft patchwork instead of hard tile banding */
function jit(x: number, y: number): number {
  return 0.955 + 0.09 * hash2(x, y, 23);
}

interface ChunkMesh {
  mesh: THREE.Mesh;
  geo: THREE.BufferGeometry;
  vertCap: number;
  idxCap: number;
}

/* ───────────────────────────── water shader source ────────────────────────── */

const WAVE_GLSL = /* glsl */ `
  // one directional sine wave: returns (height, dH/dx, dH/dz)
  vec3 waveLayer(vec2 p, float t, vec2 dir, float freq, float speed, float amp) {
    float ph = dot(p, dir) * freq + t * speed;
    float s = sin(ph);
    float c = cos(ph);
    return vec3(s * amp, c * amp * freq * dir.x, c * amp * freq * dir.y);
  }
  // layer A: long rolling swell
  vec3 swell(vec2 p, float t) {
    vec3 w = waveLayer(p, t, normalize(vec2(0.87, 0.5)), 0.42, 0.85, 0.060);
    w += waveLayer(p, t, normalize(vec2(-0.45, 0.89)), 0.63, 1.10, 0.038);
    return w;
  }
  // layer B: fine cross ripples
  vec3 ripple(vec2 p, float t) {
    vec3 w = waveLayer(p, t, normalize(vec2(0.31, 0.95)), 1.85, 2.30, 0.013);
    w += waveLayer(p, t, normalize(vec2(-0.92, 0.39)), 2.70, 2.95, 0.009);
    w += waveLayer(p, t, normalize(vec2(0.71, -0.70)), 4.10, 3.60, 0.004);
    return w;
  }
`;

const WATER_VERT = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  ${WAVE_GLSL}
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vec3 w = swell(wp.xz, uTime);
    wp.y += w.x;
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const WATER_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uNight;
  uniform sampler2D uInfo;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uSkyColor;
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  uniform vec3 uFoam;
  varying vec3 vWorld;
  ${WAVE_GLSL}

  void main() {
    vec2 p = vWorld.xz;
    vec4 info = texture2D(uInfo, p / 128.0);
    float depth = info.r;                       // 0 at the shore .. 1 in the deep
    float shore = info.g;                       // 1 at the waterline .. 0 offshore
    float land = info.b;                        // 1 over dry land

    float mask = 1.0 - smoothstep(0.34, 0.86, land);
    float calm = 0.35 + 0.65 * smoothstep(0.0, 0.35, depth);

    vec3 w = swell(p, uTime) + ripple(p, uTime);
    vec3 n = normalize(vec3(-w.y * 6.5 * calm, 1.0, -w.z * 6.5 * calm));

    vec3 V = normalize(cameraPosition - vWorld);
    float fres = 0.025 + 0.975 * pow(1.0 - clamp(dot(n, V), 0.0, 1.0), 5.0);

    // depth ramp: turquoise shallows into deep blue
    vec3 base = mix(uShallow, uDeep, smoothstep(0.02, 0.62, depth));
    base = mix(base, uShallow * 1.12, (1.0 - smoothstep(0.0, 0.16, depth)) * 0.55);

    // sky reflection at grazing angles
    vec3 col = mix(base, uSkyColor, fres * 0.7);

    // sun specular + wide glitter band
    vec3 H = normalize(uSunDir + V);
    float nh = clamp(dot(n, H), 0.0, 1.0);
    float spec = pow(nh, 280.0) * 2.4;
    float glint = pow(nh, 26.0) * 0.16;
    col += uSunColor * (spec + glint) * (1.0 - uNight * 0.72);

    // shoreline foam, wobbled so the line never looks like a contour
    float wob = 0.17 * sin(p.x * 2.3 + p.y * 1.7 + uTime * 1.35)
              + 0.11 * sin(p.x * 0.85 - p.y * 3.1 - uTime * 0.95);
    float surge = 0.62 + 0.38 * sin(uTime * 0.8 + (p.x + p.y) * 0.055);
    float foam = smoothstep(0.42, 0.92, (shore + wob) * surge);
    float lace = smoothstep(0.86, 1.0, shore) * (0.5 + 0.5 * sin(uTime * 2.1 + p.x * 3.3));
    foam = clamp(foam + lace * 0.35, 0.0, 1.0);
    col = mix(col, uFoam, foam * 0.88);

    // night: drink the light, keep a cold moon sheen
    col = mix(col, col * vec3(0.22, 0.28, 0.42) + vec3(0.01, 0.02, 0.05), uNight * 0.85);

    float alpha = mix(0.58, 0.95, smoothstep(0.0, 0.4, depth));
    alpha = mix(alpha, 1.0, max(foam * 0.9, fres * 0.55));
    gl_FragColor = vec4(col, alpha * mask);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/* ────────────────────────────── the renderer ──────────────────────────────── */

export class TerrainRenderer {
  private scene: THREE.Scene;
  private grid: Grid;
  private group = new THREE.Group();
  private chunks: (ChunkMesh | null)[] = new Array(CHUNKS_X * CHUNKS_Y).fill(null);
  private groundMat: THREE.MeshLambertMaterial;
  private waterMesh: THREE.Mesh;
  private waterMat: THREE.ShaderMaterial;
  private infoTex: THREE.DataTexture;
  private infoData: Uint8Array;
  private blankTex: THREE.DataTexture;
  private shoreDist = new Int16Array(GRID_W * GRID_H);
  private bfs = new Int32Array(GRID_W * GRID_H);
  private sun: THREE.DirectionalLight | null = null;
  private sunSearched = false;
  private sunRetry = 0;
  private disposed = false;
  /** water depth/shore texture needs a rebuild before the next frame */
  private infoDirty = true;

  /** uniforms shared by every compiled instance of the ground material */
  private gu = {
    uOverlay: { value: null as THREE.Texture | null },
    uOverlayStrength: { value: 0 },
    uHighlight: { value: new THREE.Vector4(0, 0, 0, 0) },
    uHighlightColor: { value: new THREE.Color(0x3ce07f) },
    uHighlightOn: { value: 0 },
    uTime: { value: 0 },
  };

  constructor(scene: THREE.Scene, grid: Grid) {
    this.scene = scene;
    this.grid = grid;

    this.blankTex = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1);
    this.blankTex.needsUpdate = true;
    this.gu.uOverlay.value = this.blankTex;

    this.groundMat = this.makeGroundMaterial();

    this.infoData = new Uint8Array(GRID_W * GRID_H * 4);
    this.infoTex = new THREE.DataTexture(
      this.infoData,
      GRID_W,
      GRID_H,
      THREE.RGBAFormat,
    );
    this.infoTex.minFilter = THREE.LinearFilter;
    this.infoTex.magFilter = THREE.LinearFilter;
    this.infoTex.wrapS = THREE.ClampToEdgeWrapping;
    this.infoTex.wrapT = THREE.ClampToEdgeWrapping;
    this.infoTex.generateMipmaps = false;
    this.infoTex.needsUpdate = true;

    this.waterMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uNight: { value: 0 },
        uInfo: { value: this.infoTex },
        uSunDir: { value: sunDir.clone() },
        uSunColor: { value: new THREE.Color(0xfff0cf) },
        uSkyColor: { value: new THREE.Color(0x9fd0f0) },
        uDeep: { value: new THREE.Color(0x0b2f5e) },
        uShallow: { value: new THREE.Color(0x2fc5b6) },
        uFoam: { value: new THREE.Color(0xf2fbff) },
      },
      vertexShader: WATER_VERT,
      fragmentShader: WATER_FRAG,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
    });

    const wgeo = new THREE.PlaneGeometry(GRID_W, GRID_H, 64, 64);
    wgeo.rotateX(-Math.PI / 2);
    this.waterMesh = new THREE.Mesh(wgeo, this.waterMat);
    this.waterMesh.position.set(GRID_W / 2, SEA_LEVEL + 0.02, GRID_H / 2);
    this.waterMesh.renderOrder = 2;
    this.waterMesh.frustumCulled = false;
    this.waterMesh.matrixAutoUpdate = false;
    this.waterMesh.updateMatrix();
    this.waterMesh.updateMatrixWorld(true);

    this.group.add(this.waterMesh);
    this.scene.add(this.group);
  }

  /* ───────────────────────────── materials ──────────────────────────────── */

  private makeGroundMaterial(): THREE.MeshLambertMaterial {
    const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
    const gu = this.gu;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uOverlay = gu.uOverlay;
      shader.uniforms.uOverlayStrength = gu.uOverlayStrength;
      shader.uniforms.uHighlight = gu.uHighlight;
      shader.uniforms.uHighlightColor = gu.uHighlightColor;
      shader.uniforms.uHighlightOn = gu.uHighlightOn;
      shader.uniforms.uTime = gu.uTime;

      shader.vertexShader =
        'attribute float aWind;\nvarying float vWind;\nvarying vec3 vWorldPos;\n' +
        shader.vertexShader.replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
           vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
           vWind = aWind;`,
        );

      shader.fragmentShader =
        `uniform sampler2D uOverlay;
         uniform float uOverlayStrength;
         uniform vec4 uHighlight;
         uniform vec3 uHighlightColor;
         uniform float uHighlightOn;
         uniform float uTime;
         varying float vWind;
         varying vec3 vWorldPos;\n` +
        shader.fragmentShader.replace(
          '#include <color_fragment>',
          `#include <color_fragment>
           {
             // breeze rippling across grass and canopy
             float gust = sin(vWorldPos.x * 0.55 + vWorldPos.z * 0.37 + uTime * 1.35)
                        * sin(vWorldPos.z * 0.21 - uTime * 0.7);
             diffuseColor.rgb *= 1.0 + vWind * gust * 0.05;

             if (uOverlayStrength > 0.001) {
               vec4 ov = texture2D(uOverlay, vWorldPos.xz / 128.0);
               diffuseColor.rgb = mix(diffuseColor.rgb, ov.rgb, ov.a * uOverlayStrength);
             }

             if (uHighlightOn > 0.5) {
               vec2 hp = vWorldPos.xz;
               vec2 ins = step(uHighlight.xy, hp) * step(hp, uHighlight.zw);
               if (ins.x * ins.y > 0.5) {
                 vec2 dE = min(hp - uHighlight.xy, uHighlight.zw - hp);
                 float edge = 1.0 - smoothstep(0.0, 0.3, min(dE.x, dE.y));
                 float pulse = 0.74 + 0.26 * sin(uTime * 5.0);
                 diffuseColor.rgb = mix(
                   diffuseColor.rgb, uHighlightColor, (0.34 + 0.46 * edge) * pulse);
               }
             }
           }`,
        );
    };
    return mat;
  }

  /* ───────────────────────────── colouring ─────────────────────────────── */

  private hAt(x: number, y: number): number {
    if (x < 0 || y < 0 || x >= GRID_W || y >= GRID_H) return EDGE_FLOOR;
    return this.grid.height[y * GRID_W + x];
  }

  /** base albedo for a tile top, before AO and corner jitter */
  private tileColour(tx: number, ty: number, i: number, out: THREE.Color): void {
    const g = this.grid;
    const r1 = hash2(tx, ty, 3);
    const r2 = hash2(tx, ty, 9);
    if (g.water[i]) {
      out.copy(PAL.bedShallow).lerp(PAL.bedDeep, clamp01(-g.height[i] / MAX_DEPTH));
      out.multiplyScalar(0.92 + 0.16 * r1);
      return;
    }
    switch (g.terrain[i] as TerrainKind) {
      case TerrainKind.Forest:
        out.copy(PAL.forest).lerp(PAL.forestDeep, r1);
        break;
      case TerrainKind.Sand:
        out.copy(PAL.sand).lerp(PAL.sandWet, r1 * 0.55);
        break;
      case TerrainKind.Rock:
        out.copy(PAL.rock).lerp(PAL.rockDark, r1);
        break;
      case TerrainKind.Snow:
        out.copy(PAL.snow).lerp(PAL.rock, r1 * 0.16);
        break;
      case TerrainKind.Dirt:
        out.copy(PAL.dirt).lerp(PAL.sandWet, r1 * 0.45);
        break;
      default:
        out.copy(PAL.grass).lerp(PAL.grassAlt, r1);
        if (r2 > 0.8) out.lerp(PAL.grassDry, (r2 - 0.8) * 2.0);
        break;
    }
    // damp sand where the land meets the water
    if (
      (tx > 0 && g.water[i - 1]) ||
      (tx < GRID_W - 1 && g.water[i + 1]) ||
      (ty > 0 && g.water[i - GRID_W]) ||
      (ty < GRID_H - 1 && g.water[i + GRID_W])
    ) {
      out.lerp(PAL.sandWet, 0.4);
    }
    // altitude tint + per-tile brightness jitter
    const l = g.height[i] / HEIGHT_STEP;
    out.multiplyScalar(lerp(0.95, 1.08, clamp01(l / 20)) * (0.94 + 0.12 * hash2(tx, ty, 17)));
  }

  /* ──────────────────────────── mesh building ──────────────────────────── */

  /** full rebuild of ground + cliffs + shoreline; call when terrainDirty */
  build(): void {
    this.refreshWaterInfo();
    for (let cy = 0; cy < CHUNKS_Y; cy++)
      for (let cx = 0; cx < CHUNKS_X; cx++) this.buildChunk(cx, cy, false);
  }

  /** rebuild one 16x16 chunk (after terraform) */
  buildChunk(cx: number, cy: number, refreshInfo = true): void {
    if (cx < 0 || cy < 0 || cx >= CHUNKS_X || cy >= CHUNKS_Y) return;
    // several chunks are usually rebuilt in one frame after a terraform —
    // defer the water-info BFS to the next update() so it runs once, not N times
    if (refreshInfo) this.infoDirty = true;

    const g = this.grid;
    let v = 0;
    let n = 0;
    let minY = Infinity;
    let maxY = -Infinity;
    const bx = cx * CHUNK;
    const by = cy * CHUNK;

    const put = (
      x: number,
      y: number,
      z: number,
      nx: number,
      ny: number,
      nz: number,
      col: THREE.Color,
      shade: number,
      wind: number,
    ) => {
      const p3 = v * 3;
      sPos[p3] = x;
      sPos[p3 + 1] = y;
      sPos[p3 + 2] = z;
      sNor[p3] = nx;
      sNor[p3 + 1] = ny;
      sNor[p3 + 2] = nz;
      sCol[p3] = col.r * shade;
      sCol[p3 + 1] = col.g * shade;
      sCol[p3 + 2] = col.b * shade;
      sWind[v] = wind;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      v++;
    };
    const quad = (a: number) => {
      sIdx[n++] = a;
      sIdx[n++] = a + 1;
      sIdx[n++] = a + 2;
      sIdx[n++] = a;
      sIdx[n++] = a + 2;
      sIdx[n++] = a + 3;
    };

    for (let ty = by; ty < by + CHUNK; ty++) {
      for (let tx = bx; tx < bx + CHUNK; tx++) {
        const i = ty * GRID_W + tx;
        const h = g.height[i];
        const x0 = tx;
        const x1 = tx + 1;
        const z0 = ty;
        const z1 = ty + 1;

        const hE = this.hAt(tx + 1, ty);
        const hW = this.hAt(tx - 1, ty);
        const hN = this.hAt(tx, ty - 1);
        const hS = this.hAt(tx, ty + 1);
        const hNE = this.hAt(tx + 1, ty - 1);
        const hNW = this.hAt(tx - 1, ty - 1);
        const hSE = this.hAt(tx + 1, ty + 1);
        const hSW = this.hAt(tx - 1, ty + 1);

        this.tileColour(tx, ty, i, tmpColor);
        const kind = g.terrain[i] as TerrainKind;
        const wind =
          !g.water[i] && (kind === TerrainKind.Grass || kind === TerrainKind.Forest) ? 1 : 0;

        /* top face — corners SW, SE, NE, NW */
        const base = v;
        put(x0, h, z1, 0, 1, 0, tmpColor, ao(h, hW, hS, hSW) * jit(tx, ty + 1), wind);
        put(x1, h, z1, 0, 1, 0, tmpColor, ao(h, hE, hS, hSE) * jit(tx + 1, ty + 1), wind);
        put(x1, h, z0, 0, 1, 0, tmpColor, ao(h, hE, hN, hNE) * jit(tx + 1, ty), wind);
        put(x0, h, z0, 0, 1, 0, tmpColor, ao(h, hW, hN, hNW) * jit(tx, ty), wind);
        quad(base);

        /* cliff walls down to any lower neighbour */
        const jitter = 0.9 + 0.2 * hash2(tx, ty, 41);
        tmpColorB.copy(PAL.cliff).lerp(tmpColor, 0.22).multiplyScalar(jitter);
        const topShade = 1;
        const botShade = 0.56;

        if (hE < h - 1e-4) {
          const a = v;
          put(x1, h, z0, 1, 0, 0, tmpColorB, topShade, 0);
          put(x1, h, z1, 1, 0, 0, tmpColorB, topShade, 0);
          put(x1, hE, z1, 1, 0, 0, tmpColorB, botShade, 0);
          put(x1, hE, z0, 1, 0, 0, tmpColorB, botShade, 0);
          quad(a);
        }
        if (hW < h - 1e-4) {
          const a = v;
          put(x0, h, z1, -1, 0, 0, tmpColorB, topShade, 0);
          put(x0, h, z0, -1, 0, 0, tmpColorB, topShade, 0);
          put(x0, hW, z0, -1, 0, 0, tmpColorB, botShade, 0);
          put(x0, hW, z1, -1, 0, 0, tmpColorB, botShade, 0);
          quad(a);
        }
        if (hS < h - 1e-4) {
          const a = v;
          put(x1, h, z1, 0, 0, 1, tmpColorB, topShade, 0);
          put(x0, h, z1, 0, 0, 1, tmpColorB, topShade, 0);
          put(x0, hS, z1, 0, 0, 1, tmpColorB, botShade, 0);
          put(x1, hS, z1, 0, 0, 1, tmpColorB, botShade, 0);
          quad(a);
        }
        if (hN < h - 1e-4) {
          const a = v;
          put(x0, h, z0, 0, 0, -1, tmpColorB, topShade, 0);
          put(x1, h, z0, 0, 0, -1, tmpColorB, topShade, 0);
          put(x1, hN, z0, 0, 0, -1, tmpColorB, botShade, 0);
          put(x0, hN, z0, 0, 0, -1, tmpColorB, botShade, 0);
          quad(a);
        }
      }
    }

    this.upload(cy * CHUNKS_X + cx, v, n, bx, by, minY, maxY);
  }

  /** copies the scratch buffers into a chunk's GPU attributes */
  private upload(
    ci: number,
    v: number,
    n: number,
    bx: number,
    by: number,
    minY: number,
    maxY: number,
  ): void {
    let c = this.chunks[ci];
    if (!c || c.vertCap < v || c.idxCap < n) {
      if (c) {
        this.group.remove(c.mesh);
        c.geo.dispose();
      }
      const vcap = Math.max(1024, Math.ceil(v * 1.35));
      const icap = Math.max(1536, Math.ceil(n * 1.35));
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vcap * 3), 3));
      geo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(vcap * 3), 3));
      geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(vcap * 3), 3));
      geo.setAttribute('aWind', new THREE.BufferAttribute(new Float32Array(vcap), 1));
      geo.setIndex(new THREE.BufferAttribute(new Uint16Array(icap), 1));
      const mesh = new THREE.Mesh(geo, this.groundMat);
      mesh.receiveShadow = true;
      mesh.castShadow = false;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      this.group.add(mesh);
      c = { mesh, geo, vertCap: vcap, idxCap: icap };
      this.chunks[ci] = c;
    }

    const pos = c.geo.getAttribute('position') as THREE.BufferAttribute;
    const nor = c.geo.getAttribute('normal') as THREE.BufferAttribute;
    const col = c.geo.getAttribute('color') as THREE.BufferAttribute;
    const wnd = c.geo.getAttribute('aWind') as THREE.BufferAttribute;
    const idx = c.geo.getIndex() as THREE.BufferAttribute;
    (pos.array as Float32Array).set(sPos.subarray(0, v * 3));
    (nor.array as Float32Array).set(sNor.subarray(0, v * 3));
    (col.array as Float32Array).set(sCol.subarray(0, v * 3));
    (wnd.array as Float32Array).set(sWind.subarray(0, v));
    (idx.array as Uint16Array).set(sIdx.subarray(0, n));
    pos.needsUpdate = true;
    nor.needsUpdate = true;
    col.needsUpdate = true;
    wnd.needsUpdate = true;
    idx.needsUpdate = true;
    c.geo.setDrawRange(0, n);

    if (!Number.isFinite(minY)) {
      minY = 0;
      maxY = 0;
    }
    const half = CHUNK * 0.5;
    if (!c.geo.boundingSphere) c.geo.boundingSphere = new THREE.Sphere();
    c.geo.boundingSphere.center.set(bx + half, (minY + maxY) * 0.5, by + half);
    c.geo.boundingSphere.radius =
      Math.sqrt(half * half * 2 + ((maxY - minY) * 0.5) ** 2) + 0.05;
    if (!c.geo.boundingBox) c.geo.boundingBox = new THREE.Box3();
    c.geo.boundingBox.min.set(bx, minY, by);
    c.geo.boundingBox.max.set(bx + CHUNK, maxY, by + CHUNK);
  }

  /* ─────────────────────── water depth / foam texture ──────────────────── */

  private refreshWaterInfo(): void {
    const g = this.grid;
    const d = this.shoreDist;
    const q = this.bfs;
    const data = this.infoData;
    d.fill(1023);
    let tail = 0;
    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const i = y * GRID_W + x;
        if (!g.water[i]) continue;
        if (
          (x > 0 && !g.water[i - 1]) ||
          (x < GRID_W - 1 && !g.water[i + 1]) ||
          (y > 0 && !g.water[i - GRID_W]) ||
          (y < GRID_H - 1 && !g.water[i + GRID_W])
        ) {
          d[i] = 0;
          q[tail++] = i;
        }
      }
    }
    let head = 0;
    while (head < tail) {
      const i = q[head++];
      const x = i % GRID_W;
      const y = (i / GRID_W) | 0;
      const nd = d[i] + 1;
      if (nd > FOAM_REACH + 1) continue;
      if (x > 0 && g.water[i - 1] && d[i - 1] > nd) {
        d[i - 1] = nd;
        q[tail++] = i - 1;
      }
      if (x < GRID_W - 1 && g.water[i + 1] && d[i + 1] > nd) {
        d[i + 1] = nd;
        q[tail++] = i + 1;
      }
      if (y > 0 && g.water[i - GRID_W] && d[i - GRID_W] > nd) {
        d[i - GRID_W] = nd;
        q[tail++] = i - GRID_W;
      }
      if (y < GRID_H - 1 && g.water[i + GRID_W] && d[i + GRID_W] > nd) {
        d[i + GRID_W] = nd;
        q[tail++] = i + GRID_W;
      }
    }

    let waterTiles = 0;
    for (let i = 0; i < GRID_W * GRID_H; i++) {
      const o = i * 4;
      if (g.water[i]) {
        waterTiles++;
        data[o] = (clamp01(-g.height[i] / MAX_DEPTH) * 255) | 0;
        data[o + 1] = (clamp01(1 - d[i] / FOAM_REACH) * 255) | 0;
        data[o + 2] = 0;
      } else {
        data[o] = 0;
        data[o + 1] = 255;
        data[o + 2] = 255;
      }
      data[o + 3] = 255;
    }
    this.waterMesh.visible = waterTiles > 0;
    this.infoTex.needsUpdate = true;
    this.infoDirty = false;
  }

  /* ──────────────────────────── per-frame update ───────────────────────── */

  /** per-frame: water animation, wind on grass, highlight pulse */
  update(dt: number, elapsed: number, nightFactor: number): void {
    if (this.disposed) return;
    if (this.infoDirty) this.refreshWaterInfo();

    this.gu.uTime.value = elapsed;

    const wu = this.waterMat.uniforms;
    wu.uTime.value = elapsed;
    wu.uNight.value = clamp01(nightFactor);

    /* track the scene's key light so glints follow the time of day */
    if (!this.sun) {
      this.sunRetry -= dt;
      if (!this.sunSearched || this.sunRetry <= 0) {
        this.sunSearched = true;
        this.sunRetry = 1.5;
        this.scene.traverse((o) => {
          if (!this.sun && (o as THREE.DirectionalLight).isDirectionalLight) {
            this.sun = o as THREE.DirectionalLight;
          }
        });
      }
    }
    if (this.sun) {
      scratchV.copy(this.sun.position).sub(this.sun.target.position);
      if (scratchV.lengthSq() > 1e-6) {
        scratchV.normalize();
        // keep the last above-horizon direction so glints never come from below
        if (scratchV.y > 0.04) (wu.uSunDir.value as THREE.Vector3).copy(scratchV);
      }
      tmpColor.copy(this.sun.color);
      tmpColorB.setHex(0xbfd3ff); // cold moon sheen
      (wu.uSunColor.value as THREE.Color)
        .copy(tmpColor)
        .lerp(tmpColorB, clamp01(nightFactor));
    }
  }

  /* ─────────────────────── overlay + highlight + teardown ──────────────── */

  /** overlay data texture from render/overlays.ts, blended over the ground */
  setOverlayTexture(tex: THREE.Texture | null, strength: number): void {
    this.gu.uOverlay.value = tex ?? this.blankTex;
    this.gu.uOverlayStrength.value = tex ? clamp01(strength) : 0;
  }

  /** highlight a rectangular region (build preview). null clears. */
  setHighlight(
    r: { x0: number; y0: number; x1: number; y1: number; valid: boolean } | null,
  ): void {
    if (!r) {
      this.gu.uHighlightOn.value = 0;
      return;
    }
    const x0 = Math.min(r.x0, r.x1);
    const x1 = Math.max(r.x0, r.x1) + 1; // rect is inclusive tile coords
    const y0 = Math.min(r.y0, r.y1);
    const y1 = Math.max(r.y0, r.y1) + 1;
    (this.gu.uHighlight.value as THREE.Vector4).set(x0, y0, x1, y1);
    (this.gu.uHighlightColor.value as THREE.Color).setHex(
      r.valid ? 0x3ce07f : 0xf04a52,
    );
    this.gu.uHighlightOn.value = 1;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.scene.remove(this.group);
    for (let i = 0; i < this.chunks.length; i++) {
      const c = this.chunks[i];
      if (c) {
        this.group.remove(c.mesh);
        c.geo.dispose();
        this.chunks[i] = null;
      }
    }
    this.group.remove(this.waterMesh);
    (this.waterMesh.geometry as THREE.BufferGeometry).dispose();
    this.waterMat.dispose();
    this.groundMat.dispose();
    this.infoTex.dispose();
    this.blankTex.dispose();
    this.gu.uOverlay.value = null;
  }
}
