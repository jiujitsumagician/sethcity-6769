/**
 * SETHCITY 6769 — A4: weather system.
 * Season-driven weather picking, GPU-animated instanced rain/snow around the
 * camera, drifting cloud shadows via the sun's shadow map, and lightning
 * flashes in storms. Fog density itself is applied by the Renderer, which
 * reads this module's WeatherState every frame.
 */
import * as THREE from 'three';
import { clamp, clamp01, lerp, mulberry32 } from '../core/rng';
import type { GameTime } from '../core/types';

export type WeatherKind = 'clear' | 'cloudy' | 'rain' | 'storm' | 'fog' | 'snow';

export interface WeatherState {
  kind: WeatherKind;
  intensity: number;
  windX: number;
  windZ: number;
}

/* ─────────────────────── season → weather tables ───────────────────── */

const SEASON_TABLE: [WeatherKind, number][][] = [
  /* spring */ [['clear', 0.42], ['cloudy', 0.26], ['rain', 0.2], ['fog', 0.08], ['storm', 0.04]],
  /* summer */ [['clear', 0.55], ['cloudy', 0.18], ['rain', 0.1], ['storm', 0.12], ['fog', 0.05]],
  /* autumn */ [['clear', 0.33], ['cloudy', 0.3], ['rain', 0.22], ['fog', 0.12], ['storm', 0.03]],
  /* winter */ [['clear', 0.3], ['cloudy', 0.28], ['snow', 0.3], ['fog', 0.1], ['storm', 0.02]],
];

const INT_RANGE: Record<WeatherKind, [number, number]> = {
  clear: [0, 0],
  cloudy: [0.35, 0.75],
  rain: [0.4, 0.9],
  storm: [0.7, 1],
  fog: [0.5, 0.95],
  snow: [0.4, 0.9],
};

const WIND_SPEED: Record<WeatherKind, number> = {
  clear: 0.2,
  cloudy: 0.5,
  rain: 0.9,
  storm: 2.2,
  fog: 0.1,
  snow: 0.5,
};

/* ───────────────────── instanced precipitation ─────────────────────── */

type PrecipUniforms = {
  uTime: { value: number };
  uCenter: { value: THREE.Vector3 };
  uBox: { value: THREE.Vector3 };
  uVel: { value: THREE.Vector3 };
  uSize: { value: THREE.Vector2 };
  uAlpha: { value: number };
  uDensity: { value: number };
  uSway: { value: number };
  uColor: { value: THREE.Color };
};

const PRECIP_VERT = /* glsl */ `
  attribute vec3 aSeed;
  attribute float aRand;
  uniform float uTime;
  uniform float uDensity;
  uniform float uSway;
  uniform vec3 uCenter;
  uniform vec3 uBox;
  uniform vec3 uVel;
  uniform vec2 uSize;
  varying vec2 vUv;
  varying float vOn;

  void main() {
    vUv = position.xy + 0.5;
    float speed = 0.7 + aRand * 0.7;
    vec3 p = aSeed * uBox + uVel * (uTime * speed);
    p = mod(p, uBox) - uBox * 0.5;
    p.x += sin(uTime * (0.9 + aRand * 1.3) + aRand * 43.0) * uSway;
    p.z += cos(uTime * (0.7 + aRand * 1.1) + aRand * 17.0) * uSway;
    vec3 world = uCenter + p;
    float on = step(aRand, uDensity);
    vOn = on;
    vec3 camRight = vec3(viewMatrix[0].x, viewMatrix[1].x, viewMatrix[2].x);
    vec3 camUp    = vec3(viewMatrix[0].y, viewMatrix[1].y, viewMatrix[2].y);
    vec3 camFwd   = -vec3(viewMatrix[0].z, viewMatrix[1].z, viewMatrix[2].z);
    vec3 axis = (uSway > 0.01) ? camUp : -normalize(uVel);
    vec3 side = cross(axis, camFwd);
    float sl = length(side);
    side = (sl > 0.001) ? side / sl : camRight;
    vec3 corner = world + axis * (position.y * uSize.y) + side * (position.x * uSize.x);
    corner = mix(world, corner, on);
    gl_Position = projectionMatrix * viewMatrix * vec4(corner, 1.0);
  }
`;

const PRECIP_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uAlpha;
  uniform float uSway;
  varying vec2 vUv;
  varying float vOn;

  void main() {
    float m;
    if (uSway > 0.01) m = smoothstep(0.5, 0.15, length(vUv - 0.5));
    else m = 1.0 - abs(vUv.x - 0.5) * 1.2;
    float a = uAlpha * m * vOn;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

function makePrecipGeometry(count: number, rnd: () => number): THREE.InstancedBufferGeometry {
  const geo = new THREE.InstancedBufferGeometry();
  const pos = new Float32Array([
    -0.5, -0.5, 0,
    0.5, -0.5, 0,
    0.5, 0.5, 0,
    -0.5, 0.5, 0,
  ]);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setIndex([0, 1, 2, 0, 2, 3]);
  const seeds = new Float32Array(count * 3);
  const rands = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    seeds[i * 3] = rnd();
    seeds[i * 3 + 1] = rnd();
    seeds[i * 3 + 2] = rnd();
    rands[i] = rnd();
  }
  geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 3));
  geo.setAttribute('aRand', new THREE.InstancedBufferAttribute(rands, 1));
  geo.instanceCount = count;
  return geo;
}

/* tileable soft cloud blobs, drawn once into a canvas */
function makeCloudTexture(rnd: () => number): THREE.CanvasTexture {
  const size = 256;
  const cvs = document.createElement('canvas');
  cvs.width = size;
  cvs.height = size;
  const ctx = cvs.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);
  for (let i = 0; i < 26; i++) {
    const x = rnd() * size;
    const y = rnd() * size;
    const r = 16 + rnd() * 40;
    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const cx = x + ox * size;
        const cy = y + oy * size;
        if (cx < -r || cx > size + r || cy < -r || cy > size + r) continue;
        const g = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
        g.addColorStop(0, 'rgba(255,255,255,0.9)');
        g.addColorStop(0.55, 'rgba(255,255,255,0.6)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

const _fwd = new THREE.Vector3();
const _center = new THREE.Vector3();

/* ─────────────────────────────── weather ───────────────────────────── */

export class Weather {
  readonly state: WeatherState = { kind: 'clear', intensity: 0, windX: 0.25, windZ: 0.1 };

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private rnd = mulberry32(0x5e7c17);
  private clock = 0;
  private timer = 25;
  private targetKind: WeatherKind = 'clear';
  private targetIntensity = 0;
  private windTX = 0.25;
  private windTZ = 0.1;

  private rain: THREE.Mesh;
  private rainU: PrecipUniforms;
  private snow: THREE.Mesh;
  private snowU: PrecipUniforms;
  private cloud: THREE.Mesh;
  private cloudTex: THREE.CanvasTexture;
  private cloudDepth: THREE.MeshDepthMaterial;
  private flash: THREE.AmbientLight;
  private flashT = 0;
  private boltTimer = 6;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene;
    this.camera = camera;

    /* rain: thin velocity-aligned streaks */
    this.rainU = {
      uTime: { value: 0 },
      uCenter: { value: new THREE.Vector3(64, 10, 64) },
      uBox: { value: new THREE.Vector3(85, 48, 85) },
      uVel: { value: new THREE.Vector3(2, -34, 1) },
      uSize: { value: new THREE.Vector2(0.035, 0.95) },
      uAlpha: { value: 0.3 },
      uDensity: { value: 1 },
      uSway: { value: 0 },
      uColor: { value: new THREE.Color(0x9db8cc) },
    };
    const rainMat = new THREE.ShaderMaterial({
      uniforms: this.rainU,
      vertexShader: PRECIP_VERT,
      fragmentShader: PRECIP_FRAG,
      transparent: true,
      depthWrite: false,
    });
    this.rain = new THREE.Mesh(makePrecipGeometry(1000, this.rnd), rainMat);
    this.rain.frustumCulled = false;
    this.rain.renderOrder = 60;
    this.rain.visible = false;
    scene.add(this.rain);

    /* snow: drifting camera-facing flakes */
    this.snowU = {
      uTime: { value: 0 },
      uCenter: { value: new THREE.Vector3(64, 10, 64) },
      uBox: { value: new THREE.Vector3(75, 40, 75) },
      uVel: { value: new THREE.Vector3(0.6, -2.4, 0.3) },
      uSize: { value: new THREE.Vector2(0.09, 0.09) },
      uAlpha: { value: 0.8 },
      uDensity: { value: 1 },
      uSway: { value: 0.55 },
      uColor: { value: new THREE.Color(0xffffff) },
    };
    const snowMat = new THREE.ShaderMaterial({
      uniforms: this.snowU,
      vertexShader: PRECIP_VERT,
      fragmentShader: PRECIP_FRAG,
      transparent: true,
      depthWrite: false,
    });
    this.snow = new THREE.Mesh(makePrecipGeometry(800, this.rnd), snowMat);
    this.snow.frustumCulled = false;
    this.snow.renderOrder = 60;
    this.snow.visible = false;
    scene.add(this.snow);

    /* cloud shadows: invisible alpha-tested plane that only casts shadow */
    this.cloudTex = makeCloudTexture(this.rnd);
    const cloudMat = new THREE.MeshBasicMaterial({
      colorWrite: false,
      depthWrite: false,
      transparent: true,
    });
    this.cloud = new THREE.Mesh(new THREE.PlaneGeometry(560, 560), cloudMat);
    this.cloud.rotation.x = -Math.PI / 2;
    this.cloud.position.set(64, 72, 64);
    this.cloud.castShadow = true;
    this.cloudDepth = new THREE.MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking,
      map: this.cloudTex,
      alphaTest: 0.5,
    });
    this.cloud.customDepthMaterial = this.cloudDepth;
    this.cloud.visible = false;
    scene.add(this.cloud);

    /* lightning flash */
    this.flash = new THREE.AmbientLight(0xd8e6ff, 0);
    scene.add(this.flash);
  }

  /** force a weather kind now (UI/disasters); intensity defaults per kind */
  set(kind: WeatherKind, intensity?: number): void {
    const [lo, hi] = INT_RANGE[kind];
    const def = lo + (hi - lo) * 0.6;
    this.targetKind = kind;
    this.targetIntensity = kind === 'clear' ? 0 : clamp01(intensity ?? def);
    this.state.kind = kind;
    this.state.intensity = this.targetIntensity;
    this.pickWind(kind);
    this.timer = 45 + this.rnd() * 60;
  }

  private pickWind(kind: WeatherKind): void {
    const speed = WIND_SPEED[kind] * (0.7 + this.rnd() * 0.6);
    const ang = this.rnd() * Math.PI * 2;
    this.windTX = Math.cos(ang) * speed;
    this.windTZ = Math.sin(ang) * speed;
  }

  private pickTarget(season: 0 | 1 | 2 | 3): void {
    const table = SEASON_TABLE[season];
    let r = this.rnd();
    let kind: WeatherKind = 'clear';
    for (const [k, w] of table) {
      if (r < w) {
        kind = k;
        break;
      }
      r -= w;
    }
    const [lo, hi] = INT_RANGE[kind];
    this.targetKind = kind;
    this.targetIntensity = kind === 'clear' ? 0 : lo + this.rnd() * (hi - lo);
    this.pickWind(kind);
  }

  /** picks new weather over time based on season; animates all effects */
  update(dt: number, time: GameTime): void {
    this.clock += dt;
    const s = this.state;

    /* scheduler */
    this.timer -= dt;
    if (this.timer <= 0) {
      this.pickTarget(time.season);
      this.timer = 30 + this.rnd() * 60;
    }

    /* smooth transitions: fade out, switch kind, fade in */
    if (s.kind !== this.targetKind) {
      s.intensity = Math.max(0, s.intensity - dt * 0.22);
      if (s.intensity <= 0.001) s.kind = this.targetKind;
    } else {
      s.intensity += clamp(this.targetIntensity - s.intensity, -dt * 0.15, dt * 0.12);
    }

    /* wind wanders toward its target */
    const wk = Math.min(1, dt * 0.4);
    s.windX = lerp(s.windX, this.windTX, wk);
    s.windZ = lerp(s.windZ, this.windTZ, wk);

    const allow = (this.scene.userData.quality ?? 'high') !== 'low';
    const k = s.kind;
    const wi = s.intensity;

    /* particle volume follows the camera's view */
    _fwd.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
    _center
      .copy(this.camera.position)
      .addScaledVector(_fwd, clamp(this.camera.position.y * 0.9, 6, 42));

    this.rainU.uTime.value = this.clock;
    this.snowU.uTime.value = this.clock;
    this.rainU.uCenter.value.copy(_center);
    this.snowU.uCenter.value.copy(_center);

    const rainOn = allow && (k === 'rain' || k === 'storm') && wi > 0.02;
    this.rain.visible = rainOn;
    if (rainOn) {
      const stormBoost = k === 'storm' ? 1.35 : 1;
      this.rainU.uDensity.value = clamp01(wi * stormBoost);
      this.rainU.uAlpha.value = 0.22 + wi * 0.2;
      this.rainU.uVel.value.set(
        s.windX * 14 * stormBoost,
        -34 - wi * 10,
        s.windZ * 14 * stormBoost,
      );
    }

    const snowOn = allow && k === 'snow' && wi > 0.02;
    this.snow.visible = snowOn;
    if (snowOn) {
      this.snowU.uDensity.value = clamp01(wi);
      this.snowU.uAlpha.value = 0.6 + wi * 0.3;
      this.snowU.uVel.value.set(s.windX * 3, -2.2 - wi * 1.2, s.windZ * 3);
    }

    /* drifting cloud shadows */
    const cloudy =
      allow && wi > 0.05 && (k === 'cloudy' || k === 'rain' || k === 'storm' || k === 'snow');
    this.cloud.visible = cloudy;
    if (cloudy) {
      this.cloudTex.offset.x += s.windX * dt * 0.004;
      this.cloudTex.offset.y += s.windZ * dt * 0.004;
      this.cloudDepth.alphaTest = k === 'storm' ? 0.3 : k === 'cloudy' ? 0.55 : 0.42;
    }

    /* lightning: double-strobe flashes during storms */
    if (allow && k === 'storm' && wi > 0.25) {
      this.boltTimer -= dt;
      if (this.boltTimer <= 0) {
        this.flashT = 0.26;
        this.boltTimer = 2 + this.rnd() * 9;
      }
    }
    if (this.flashT > 0) {
      this.flashT = Math.max(0, this.flashT - dt);
      const ft = 0.26 - this.flashT;
      let i: number;
      if (ft < 0.06) i = 4.2;
      else if (ft < 0.11) i = 0.6;
      else if (ft < 0.2) i = 2.6;
      else i = 0.4;
      this.flash.intensity = i * wi;
    } else if (this.flash.intensity !== 0) {
      this.flash.intensity = 0;
    }
  }

  dispose(): void {
    this.scene.remove(this.rain, this.snow, this.cloud, this.flash);
    this.rain.geometry.dispose();
    (this.rain.material as THREE.ShaderMaterial).dispose();
    this.snow.geometry.dispose();
    (this.snow.material as THREE.ShaderMaterial).dispose();
    this.cloud.geometry.dispose();
    (this.cloud.material as THREE.MeshBasicMaterial).dispose();
    this.cloudDepth.dispose();
    this.cloudTex.dispose();
    this.flash.dispose();
  }
}
