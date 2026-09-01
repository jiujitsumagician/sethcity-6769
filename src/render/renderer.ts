/**
 * SETHCITY 6769 — A4: master renderer.
 * Golden-hour miniature-diorama look: procedural sky dome (dawn/day/dusk/night,
 * sun disc, moon + stars), fitted directional shadows, UnrealBloom + custom
 * tilt-shift/vignette/colour-grade pass, camera shake, adaptive quality.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { clamp, clamp01, lerp } from '../core/rng';
import type { GameTime } from '../core/types';
import type { WeatherState } from './weather';

export type Quality = 'low' | 'medium' | 'high';

/* ────────────────────────────── helpers ────────────────────────────── */

const sstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function desat(c: THREE.Color, k: number): void {
  const l = c.r * 0.3 + c.g * 0.59 + c.b * 0.11;
  c.r = lerp(c.r, l, k);
  c.g = lerp(c.g, l, k);
  c.b = lerp(c.b, l, k);
}

interface ColorStop {
  t: number;
  c: THREE.Color;
}

function rampC(out: THREE.Color, stops: ColorStop[], t: number): THREE.Color {
  if (t <= stops[0].t) return out.copy(stops[0].c);
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i].t) {
      const a = stops[i - 1];
      const b = stops[i];
      const f = (t - a.t) / (b.t - a.t);
      return out.copy(a.c).lerp(b.c, f);
    }
  }
  return out.copy(stops[stops.length - 1].c);
}

/* key-light colour by sun elevation (sin of solar angle) */
const SUN_STOPS: ColorStop[] = [
  { t: 0.0, c: new THREE.Color(0xff6a26) },
  { t: 0.1, c: new THREE.Color(0xffa74f) },
  { t: 0.28, c: new THREE.Color(0xffe0b2) },
  { t: 0.6, c: new THREE.Color(0xfff4e2) },
];

const DAY_ZEN = new THREE.Color(0x3d7ccb);
const NIGHT_ZEN = new THREE.Color(0x05091a);
const DAY_HOR = new THREE.Color(0xbdd9ea);
const NIGHT_HOR = new THREE.Color(0x121b33);
const WARM_HOR = new THREE.Color(0xff9448);
const DAY_SKY = new THREE.Color(0xcfe2f8);
const NIGHT_SKY = new THREE.Color(0x1a2440);
const DAY_GROUND = new THREE.Color(0x9a8a66);
const NIGHT_GROUND = new THREE.Color(0x0e1220);
const MOON_LIGHT = new THREE.Color(0x8fa8d8);
const FOG_GREY = new THREE.Color(0x8d979e);

/* seasonal ambient tint: spring, summer, autumn, winter */
const SEASON_TINTS = [
  new THREE.Color(0xeefbe9),
  new THREE.Color(0xfff4dd),
  new THREE.Color(0xffead0),
  new THREE.Color(0xe9f2ff),
];

/* module-level scratch (no per-frame allocation) */
const _sunDir = new THREE.Vector3();
const _moonDir = new THREE.Vector3();
const _fwd = new THREE.Vector3();
const _focus = new THREE.Vector3();
const _right = new THREE.Vector3();
const _up = new THREE.Vector3();
const _snap = new THREE.Vector3();
const _shakeOff = new THREE.Vector3();
const _c1 = new THREE.Color();
const _c2 = new THREE.Color();
const _zen = new THREE.Color();
const _hor = new THREE.Color();

/* ─────────────────────────── sky dome shader ───────────────────────── */

const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAG = /* glsl */ `
  uniform vec3 uSunDir;
  uniform vec3 uMoonDir;
  uniform vec3 uZenith;
  uniform vec3 uHorizon;
  uniform vec3 uSunTint;
  uniform float uNight;
  uniform float uGolden;
  uniform float uDim;
  uniform float uTime;
  varying vec3 vDir;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    float t = pow(1.0 - clamp(h, 0.0, 1.0), 1.6);
    vec3 col = mix(uZenith, uHorizon, t);
    if (h < 0.0) col = mix(uHorizon, uHorizon * 0.4, clamp(-h * 4.0, 0.0, 1.0));

    /* sun disc + glow + golden horizon band */
    float sd = dot(d, uSunDir);
    float glow = pow(max(sd, 0.0), 22.0);
    float disc = smoothstep(0.99955, 0.99985, sd);
    col += uSunTint * glow * (0.30 + uGolden * 0.55);
    col += uSunTint * disc * 5.0 * (1.0 - uNight);
    float band = pow(max(sd, 0.0), 5.0) * pow(1.0 - abs(h), 3.0);
    col += uSunTint * band * uGolden * 0.7;

    /* moon */
    float md = dot(d, uMoonDir);
    float mdisc = smoothstep(0.99962, 0.99986, md);
    float mglow = pow(max(md, 0.0), 90.0);
    col += vec3(0.85, 0.90, 1.0) * (mdisc * 1.8 + mglow * 0.14) * uNight;

    /* stars fade in at night, hidden by overcast */
    float starVis = uNight * (1.0 - uDim);
    if (starVis > 0.01 && h > 0.0) {
      vec2 sph = vec2(atan(d.z, d.x) * 9.549, asin(clamp(h, 0.0, 1.0)) * 12.732);
      vec2 grid = sph * 6.0;
      vec2 cell = floor(grid);
      vec2 f = fract(grid);
      float rnd = hash21(cell);
      if (rnd > 0.80) {
        vec2 sp = vec2(hash21(cell + 7.13), hash21(cell + 3.71)) * 0.6 + 0.2;
        float sdist = length(f - sp);
        float star = smoothstep(0.10, 0.02, sdist);
        float tw = 0.65 + 0.35 * sin(uTime * (1.5 + rnd * 5.0) + rnd * 40.0);
        col += vec3(0.85, 0.92, 1.0) * star * tw * starVis * (0.35 + rnd * 0.9);
      }
    }

    /* weather dim + desaturate */
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, vec3(lum), uDim * 0.5);
    col *= 1.0 - uDim * 0.35;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ─────────────── tilt-shift + vignette + colour-grade pass ─────────── */

const GradeShader = {
  name: 'TiltShiftGradeShader',
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uMaxBlur: { value: 2.6 },
    uFocusY: { value: 0.44 },
    uBand: { value: 0.13 },
    uVignette: { value: 0.42 },
    uSat: { value: 1.12 },
    uTint: { value: new THREE.Vector3(1.05, 1.0, 0.93) },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uMaxBlur;
    uniform float uFocusY;
    uniform float uBand;
    uniform float uVignette;
    uniform float uSat;
    uniform vec3 uTint;
    varying vec2 vUv;

    void main() {
      float d = abs(vUv.y - uFocusY);
      float blur = smoothstep(uBand, uBand * 3.2, d) * uMaxBlur;
      vec3 col = texture2D(tDiffuse, vUv).rgb;
      if (blur > 0.05) {
        vec2 px = vec2(blur) / uResolution;
        vec3 acc = col * 1.2;
        acc += texture2D(tDiffuse, vUv + vec2( 0.45,  0.0 ) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2(-0.45,  0.0 ) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2( 0.0 ,  0.45) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2( 0.0 , -0.45) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2( 1.0 ,  0.0 ) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2(-1.0 ,  0.0 ) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2( 0.0 ,  1.0 ) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2( 0.0 , -1.0 ) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2( 0.71,  0.71) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2(-0.71,  0.71) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2( 0.71, -0.71) * px).rgb;
        acc += texture2D(tDiffuse, vUv + vec2(-0.71, -0.71) * px).rgb;
        col = acc / 13.2;
      }
      /* grade: vibrance + warm/cool tint (pre-tonemap, linear space) */
      float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(lum), col, uSat);
      col *= uTint;
      /* vignette */
      vec2 q = vUv - 0.5;
      q.x *= uResolution.x / uResolution.y;
      float vig = 1.0 - uVignette * smoothstep(0.45, 1.25, length(q) * 1.4);
      col *= vig;
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

/* ────────────────────────────── renderer ───────────────────────────── */

export class Renderer {
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly gl: THREE.WebGLRenderer;

  private _quality: Quality;
  private _fps = 60;
  private _night = 0;
  private elapsed = 0;
  private fpsAcc = 0;
  private fpsFrames = 0;
  private shakeT = 0;
  private shakeAmp = 0;

  private canvas: HTMLCanvasElement;
  private sun: THREE.DirectionalLight;
  private hemi: THREE.HemisphereLight;
  private sky: THREE.Mesh;
  private fogExp: THREE.FogExp2;
  private bodyDir = new THREE.Vector3(0.4, 0.8, 0.3);

  private composer: EffectComposer | null = null;
  private bloom: UnrealBloomPass | null = null;
  private grade: ShaderPass | null = null;
  private output: OutputPass | null = null;

  private skyU = {
    uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    uMoonDir: { value: new THREE.Vector3(0, -1, 0) },
    uZenith: { value: new THREE.Color(0x3d7ccb) },
    uHorizon: { value: new THREE.Color(0xbdd9ea) },
    uSunTint: { value: new THREE.Color(0xfff4e2) },
    uNight: { value: 0 },
    uGolden: { value: 0 },
    uDim: { value: 0 },
    uTime: { value: 0 },
  };

  get nightFactor(): number {
    return this._night;
  }

  get fps(): number {
    return this._fps;
  }

  get quality(): Quality {
    return this._quality;
  }

  set quality(q: Quality) {
    this.setQuality(q);
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
    this._quality = cores >= 6 && mem >= 6 ? 'high' : 'medium';

    this.gl = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    this.gl.toneMapping = THREE.ACESFilmicToneMapping;
    this.gl.toneMappingExposure = 1.12;
    this.gl.outputColorSpace = THREE.SRGBColorSpace;
    this.gl.shadowMap.enabled = true;
    this.gl.shadowMap.type = THREE.PCFSoftShadowMap;

    this.camera = new THREE.PerspectiveCamera(50, 1, 0.5, 2400);
    this.camera.position.set(104, 58, 116);
    this.camera.lookAt(64, 0, 64);

    this.fogExp = new THREE.FogExp2(0xbcd4e2, 0.0018);
    this.scene.fog = this.fogExp;

    this.hemi = new THREE.HemisphereLight(0xcfe2f8, 0x9a8a66, 0.55);
    this.scene.add(this.hemi);

    this.sun = new THREE.DirectionalLight(0xfff4e2, 3);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0003;
    this.sun.shadow.normalBias = 0.5;
    this.sun.shadow.camera.near = 10;
    this.sun.shadow.camera.far = 520;
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    const skyMat = new THREE.ShaderMaterial({
      uniforms: this.skyU,
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(1000, 32, 16), skyMat);
    this.sky.frustumCulled = false;
    this.sky.renderOrder = -100;
    this.scene.add(this.sky);

    this.applyQuality();
    this.resize();
  }

  setQuality(q: Quality): void {
    if (q === this._quality) return;
    this._quality = q;
    this.applyQuality();
  }

  private pixelRatio(): number {
    const dpr = window.devicePixelRatio || 1;
    if (this._quality === 'high') return Math.min(dpr, 2);
    if (this._quality === 'medium') return Math.min(dpr, 1.5);
    return 1;
  }

  private applyQuality(): void {
    const q = this._quality;
    /* other render modules (weather) read this to gate effects */
    this.scene.userData.quality = q;
    const shadows = q !== 'low';
    this.gl.shadowMap.enabled = shadows;
    this.sun.castShadow = shadows;
    const size = q === 'high' ? 2048 : 1024;
    if (this.sun.shadow.mapSize.x !== size) {
      this.sun.shadow.mapSize.set(size, size);
      if (this.sun.shadow.map) {
        this.sun.shadow.map.dispose();
        this.sun.shadow.map = null;
      }
    }
    this.gl.shadowMap.needsUpdate = true;
    this.buildPost();
    this.resize();
  }

  private disposePost(): void {
    if (this.bloom) this.bloom.dispose();
    if (this.grade) this.grade.dispose();
    if (this.output) this.output.dispose();
    if (this.composer) this.composer.dispose();
    this.composer = null;
    this.bloom = null;
    this.grade = null;
    this.output = null;
  }

  private buildPost(): void {
    this.disposePost();
    if (this._quality === 'low') return;
    const rt = new THREE.WebGLRenderTarget(2, 2, {
      type: THREE.HalfFloatType,
      samples: this._quality === 'high' ? 4 : 0,
    });
    this.composer = new EffectComposer(this.gl, rt);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.35,
      0.55,
      0.85,
    );
    this.composer.addPass(this.bloom);
    this.grade = new ShaderPass(GradeShader);
    this.composer.addPass(this.grade);
    this.output = new OutputPass();
    this.composer.addPass(this.output);
  }

  resize(): void {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    const pr = this.pixelRatio();
    this.gl.setPixelRatio(pr);
    this.gl.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.composer) {
      this.composer.setPixelRatio(pr);
      this.composer.setSize(w, h);
    }
    if (this.grade) {
      (this.grade.uniforms.uResolution.value as THREE.Vector2).set(w * pr, h * pr);
      this.grade.uniforms.uMaxBlur.value = 2.6 * pr;
    }
  }

  /** advance sun/moon/sky/fog/grade for the current game time + weather */
  updateSky(time: GameTime, weather: WeatherState): void {
    const theta = (time.timeOfDay - 0.25) * Math.PI * 2;
    const cosT = Math.cos(theta);
    const elev = Math.sin(theta);
    _sunDir.set(cosT, elev, 0.38).normalize();
    _moonDir.set(-cosT, -elev, 0.3).normalize();

    const dayness = sstep(-0.04, 0.14, elev);
    this._night = 1 - dayness;

    /* weather dim/desaturation factor */
    const wi = clamp01(weather.intensity);
    let dim = 0;
    switch (weather.kind) {
      case 'cloudy': dim = 0.3 * wi; break;
      case 'rain': dim = 0.5 * wi; break;
      case 'storm': dim = 0.68 * wi; break;
      case 'snow': dim = 0.42 * wi; break;
      case 'fog': dim = 0.55 * wi; break;
      default: dim = 0;
    }

    /* golden hour peaks just after sunrise / before sunset */
    const golden = clamp01(1 - Math.abs(elev - 0.08) / 0.22) * dayness * (1 - dim * 0.8);

    /* key light: sun by day, moon by night, both fading out at the horizon */
    const seasonC = SEASON_TINTS[time.season];
    if (elev > 0) {
      rampC(_c1, SUN_STOPS, elev);
      desat(_c1, dim * 0.5);
      this.sun.color.copy(_c1);
      this.sun.intensity = sstep(0, 0.1, elev) * (1.25 + 1.9 * clamp01(elev)) * (1 - dim * 0.75);
      this.bodyDir.copy(_sunDir);
    } else {
      this.sun.color.copy(MOON_LIGHT);
      /* "gameplay night": bright moonlight so the city stays fully playable */
      this.sun.intensity = sstep(0, 0.12, -elev) * 0.62 * (1 - dim * 0.6);
      this.bodyDir.copy(_moonDir);
    }

    /* hemisphere bounce with seasonal tint */
    _c2.copy(DAY_SKY).multiply(seasonC);
    this.hemi.color.copy(NIGHT_SKY).lerp(_c2, dayness);
    this.hemi.groundColor.copy(NIGHT_GROUND).lerp(DAY_GROUND, dayness);
    this.hemi.intensity = (0.5 + 0.28 * dayness) * (1 - dim * 0.35);

    /* sky dome colours */
    _c2.copy(DAY_ZEN).multiply(seasonC);
    _zen.copy(NIGHT_ZEN).lerp(_c2, dayness);
    _c2.copy(DAY_HOR).multiply(seasonC);
    _hor.copy(NIGHT_HOR).lerp(_c2, dayness);
    _hor.lerp(WARM_HOR, golden * 0.7);

    const u = this.skyU;
    u.uSunDir.value.copy(_sunDir);
    u.uMoonDir.value.copy(_moonDir);
    u.uZenith.value.copy(_zen);
    u.uHorizon.value.copy(_hor);
    rampC(u.uSunTint.value, SUN_STOPS, Math.max(elev, 0));
    u.uNight.value = this._night;
    u.uGolden.value = golden;
    u.uDim.value = dim;

    /* exponential fog tracks the horizon colour; weather thickens it */
    this.fogExp.color.copy(_hor).lerp(FOG_GREY, dim * 0.5);
    this.fogExp.density =
      0.0016 +
      dim * 0.0038 +
      (weather.kind === 'fog' ? 0.016 * wi : 0) +
      this._night * 0.0006;

    /* exposure, bloom and grade react to night + golden hour */
    this.gl.toneMappingExposure = 1.14 - 0.22 * this._night;
    if (this.bloom) {
      this.bloom.threshold = lerp(0.85, 0.55, this._night);
      this.bloom.strength = lerp(0.32, 0.7, this._night) + golden * 0.08;
    }
    if (this.grade) {
      (this.grade.uniforms.uTint.value as THREE.Vector3).set(
        lerp(1.05 + golden * 0.06, 0.92, this._night),
        lerp(1.0, 0.97, this._night),
        lerp(0.93 - golden * 0.04, 1.1, this._night),
      );
      this.grade.uniforms.uSat.value = 1.14 - dim * 0.28 - this._night * 0.08;
    }
  }

  /** fit the shadow ortho camera around what the player is looking at */
  private fitShadow(): void {
    if (!this.sun.castShadow) return;
    const cam = this.camera;
    _fwd.set(0, 0, -1).applyQuaternion(cam.quaternion);
    let dist = 60;
    if (_fwd.y < -0.05) dist = clamp(-cam.position.y / _fwd.y, 6, 320);
    _focus.copy(cam.position).addScaledVector(_fwd, dist);
    _focus.x = clamp(_focus.x, -24, 152);
    _focus.z = clamp(_focus.z, -24, 152);
    _focus.y = 0;

    /* quantise the extent so texel snapping stays effective while zooming */
    const ext = clamp(Math.ceil((dist * 1.05) / 12) * 12, 24, 168);
    const sc = this.sun.shadow.camera;
    if (Math.abs(sc.right - ext) > 0.5) {
      sc.left = -ext;
      sc.right = ext;
      sc.top = ext;
      sc.bottom = -ext;
      sc.updateProjectionMatrix();
    }

    /* snap the focus to shadow-map texels to stop crawling edges */
    const dir = this.bodyDir;
    _right.set(0, 1, 0).cross(dir);
    if (_right.lengthSq() < 1e-4) _right.set(1, 0, 0);
    _right.normalize();
    _up.copy(dir).cross(_right).normalize();
    const texel = (ext * 2) / this.sun.shadow.mapSize.x;
    const px = Math.round(_focus.dot(_right) / texel) * texel;
    const py = Math.round(_focus.dot(_up) / texel) * texel;
    const pd = _focus.dot(dir);
    _snap.copy(_right).multiplyScalar(px).addScaledVector(_up, py).addScaledVector(dir, pd);

    this.sun.target.position.copy(_snap);
    this.sun.position.copy(_snap).addScaledVector(dir, 240);
    this.sun.target.updateMatrixWorld();
  }

  render(dt: number): void {
    this.elapsed += dt;
    this.fpsFrames++;
    this.fpsAcc += dt;
    if (this.fpsAcc >= 1) {
      this._fps = this.fpsFrames / this.fpsAcc;
      this.fpsFrames = 0;
      this.fpsAcc = 0;
    }

    this.camera.updateMatrixWorld();
    this.sky.position.copy(this.camera.position);
    this.skyU.uTime.value = this.elapsed;
    this.fitShadow();

    let shaken = false;
    if (this.shakeT > 0) {
      this.shakeT = Math.max(0, this.shakeT - dt);
      const k = this.shakeT / 0.6;
      const a = this.shakeAmp * k * k * 0.55;
      _shakeOff.set(
        Math.sin(this.elapsed * 61.7) * a,
        Math.sin(this.elapsed * 47.3 + 1.7) * a * 0.6,
        Math.cos(this.elapsed * 53.9 + 0.6) * a,
      );
      this.camera.position.add(_shakeOff);
      this.camera.updateMatrixWorld();
      shaken = true;
      if (this.shakeT === 0) this.shakeAmp = 0;
    }

    if (this.composer) this.composer.render(dt);
    else this.gl.render(this.scene, this.camera);

    if (shaken) {
      this.camera.position.sub(_shakeOff);
      this.camera.updateMatrixWorld();
    }
  }

  /** disaster/demolition camera shake; decays over ~0.6 s */
  shake(intensity: number): void {
    this.shakeAmp = Math.max(this.shakeAmp, clamp(intensity, 0, 4));
    this.shakeT = 0.6;
  }

  dispose(): void {
    this.disposePost();
    this.scene.remove(this.sun, this.sun.target, this.hemi, this.sky);
    (this.sky.material as THREE.ShaderMaterial).dispose();
    this.sky.geometry.dispose();
    if (this.sun.shadow.map) this.sun.shadow.map.dispose();
    this.sun.dispose();
    this.hemi.dispose();
    this.gl.dispose();
  }
}
