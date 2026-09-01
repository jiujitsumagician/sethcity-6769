import * as THREE from 'three';
import { GRID_H, GRID_W } from '../core/types';
import type { Grid } from '../core/grid';
import { heightAtWorld } from '../sim/terrain';

const MIN_DIST = 12;
const MAX_DIST = 260;
const MIN_POLAR = THREE.MathUtils.degToRad(12);
const MAX_POLAR = THREE.MathUtils.degToRad(78);
const MARGIN = 10;

interface PointerPoint { x: number; y: number; type: string }

export class CameraController {
  readonly target = new THREE.Vector3(64, 0, 64);
  private _enabled = true;
  private _gesturing = false;
  private distance = 90;
  private azimuth = Math.PI * 0.25;
  private polar = THREE.MathUtils.degToRad(48);
  private desiredDistance = 90;
  private desiredAzimuth = this.azimuth;
  private desiredPolar = this.polar;
  private desiredX = 64;
  private desiredZ = 64;
  private panVX = 0;
  private panVZ = 0;
  private rotV = 0;
  private pointers = new Map<number, PointerPoint>();
  private grab: THREE.Vector3 | null = null;
  private lastX = 0;
  private lastY = 0;
  private pairDistance = 0;
  private pairAngle = 0;
  private pairY = 0;
  private centroidX = 0;
  private centroidY = 0;
  private grid: Grid | null = null;
  private raycaster = new THREE.Raycaster();
  private ndc = new THREE.Vector2();
  private plane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
  private scratch = new THREE.Vector3();

  constructor(private camera: THREE.PerspectiveCamera, private dom: HTMLElement) {
    dom.style.touchAction = 'none';
    dom.addEventListener('pointerdown', this.onDown);
    dom.addEventListener('pointermove', this.onMove);
    dom.addEventListener('pointerup', this.onUp);
    dom.addEventListener('pointercancel', this.onUp);
    dom.addEventListener('wheel', this.onWheel, { passive: false });
    dom.addEventListener('contextmenu', this.preventMenu);
  }

  get gesturing(): boolean { return this._gesturing; }
  get enabled(): boolean { return this._enabled; }
  set enabled(value: boolean) {
    this._enabled = value;
    if (!value && this.pointers.size < 2) { this._gesturing = false; this.grab = null; }
  }

  private preventMenu = (e: Event) => e.preventDefault();

  private pointerRay(clientX: number, clientY: number): THREE.Ray {
    const r = this.dom.getBoundingClientRect();
    this.ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(this.ndc, this.camera);
    return this.raycaster.ray;
  }

  private groundAt(clientX: number, clientY: number, h: number): THREE.Vector3 | null {
    this.plane.constant = -h;
    return this.pointerRay(clientX, clientY).intersectPlane(this.plane, this.scratch) ? this.scratch.clone() : null;
  }

  screenToGround(clientX: number, clientY: number): THREE.Vector3 | null {
    let h = this.grid ? heightAtWorld(this.grid, this.target.x, this.target.z) : this.target.y;
    let p: THREE.Vector3 | null = null;
    for (let n = 0; n < 3; n++) {
      p = this.groundAt(clientX, clientY, h);
      if (!p) return null;
      if (this.grid) h = heightAtWorld(this.grid, p.x, p.z);
    }
    if (p) p.y = h;
    return p;
  }

  screenToTile(clientX: number, clientY: number, grid: Grid): { x: number; y: number } | null {
    const old = this.grid;
    this.grid = grid;
    const p = this.screenToGround(clientX, clientY);
    this.grid = old ?? grid;
    if (!p || p.x < 0 || p.z < 0 || p.x >= GRID_W || p.z >= GRID_H) return null;
    return { x: Math.floor(p.x), y: Math.floor(p.z) };
  }

  private initPair(): void {
    const a = [...this.pointers.values()][0];
    const b = [...this.pointers.values()][1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    this.pairDistance = Math.max(1, Math.hypot(dx, dy));
    this.pairAngle = Math.atan2(dy, dx);
    this.pairY = (a.y + b.y) * 0.5;
    this.centroidX = (a.x + b.x) * 0.5;
    this.centroidY = this.pairY;
    this._gesturing = true;
    this.grab = null;
  }

  private onDown = (e: PointerEvent) => {
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, type: e.pointerType });
    this.dom.setPointerCapture(e.pointerId);
    if (this.pointers.size >= 2) { this.initPair(); return; }
    if (!this.enabled) return;
    this._gesturing = true;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    if (e.pointerType !== 'mouse' || e.button === 0) this.grab = this.screenToGround(e.clientX, e.clientY);
  };

  private onMove = (e: PointerEvent) => {
    const p = this.pointers.get(e.pointerId);
    if (!p) return;
    p.x = e.clientX; p.y = e.clientY;
    if (this.pointers.size >= 2) {
      const a = [...this.pointers.values()][0];
      const b = [...this.pointers.values()][1];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.max(1, Math.hypot(dx, dy));
      const angle = Math.atan2(dy, dx);
      const cy = (a.y + b.y) * 0.5;
      const cx = (a.x + b.x) * 0.5;
      const before = this.screenToGround(this.centroidX, this.centroidY);
      this.desiredDistance = THREE.MathUtils.clamp(this.desiredDistance * this.pairDistance / d, MIN_DIST, MAX_DIST);
      let da = angle - this.pairAngle;
      if (da > Math.PI) da -= Math.PI * 2;
      if (da < -Math.PI) da += Math.PI * 2;
      this.desiredAzimuth -= da;
      this.rotV = -da * 30;
      this.desiredPolar = THREE.MathUtils.clamp(this.desiredPolar + (cy - this.pairY) * 0.004, MIN_POLAR, MAX_POLAR);
      this.recomputeCamera();
      const after = this.screenToGround(cx, cy);
      if (before && after) { this.desiredX += before.x - after.x; this.desiredZ += before.z - after.z; }
      this.pairDistance = d; this.pairAngle = angle; this.pairY = cy; this.centroidX = cx; this.centroidY = cy;
      return;
    }
    if (!this.enabled) return;
    const dx = e.clientX - this.lastX, dy = e.clientY - this.lastY;
    if (e.pointerType === 'mouse' && (e.buttons & 2)) {
      const da = -dx * 0.006;
      this.desiredAzimuth += da;
      this.desiredPolar = THREE.MathUtils.clamp(this.desiredPolar + dy * 0.005, MIN_POLAR, MAX_POLAR);
      this.rotV = da * 30;
    } else if (this.grab) {
      const now = this.groundAt(e.clientX, e.clientY, this.grab.y);
      if (now) {
        const px = this.grab.x - now.x, pz = this.grab.z - now.z;
        this.desiredX += px; this.desiredZ += pz;
        this.panVX = px * 30; this.panVZ = pz * 30;
      }
    }
    this.lastX = e.clientX; this.lastY = e.clientY;
  };

  private onUp = (e: PointerEvent) => {
    this.pointers.delete(e.pointerId);
    if (this.dom.hasPointerCapture(e.pointerId)) this.dom.releasePointerCapture(e.pointerId);
    if (this.pointers.size >= 2) this.initPair();
    else if (this.pointers.size === 1) {
      const p = [...this.pointers.values()][0]; this.lastX = p.x; this.lastY = p.y; this._gesturing = false; this.grab = this.enabled ? this.screenToGround(p.x,p.y) : null;
    } else { this._gesturing = false; this.grab = null; }
  };

  private onWheel = (e: WheelEvent) => {
    if (!this.enabled) return;
    e.preventDefault();
    const before = this.screenToGround(e.clientX, e.clientY);
    this.zoomBy(Math.exp(e.deltaY * 0.0012));
    this.distance = this.desiredDistance;
    this.recomputeCamera();
    const after = this.screenToGround(e.clientX, e.clientY);
    if (before && after) {
      const dx=before.x-after.x,dz=before.z-after.z;
      if(Number.isFinite(dx)&&Number.isFinite(dz)){this.desiredX=THREE.MathUtils.clamp(this.desiredX+dx,-MARGIN,GRID_W+MARGIN);this.desiredZ=THREE.MathUtils.clamp(this.desiredZ+dz,-MARGIN,GRID_H+MARGIN);}
    }
  };

  zoomBy(factor: number): void { this.desiredDistance = THREE.MathUtils.clamp(this.desiredDistance * factor, MIN_DIST, MAX_DIST); }
  rotateBy(radians: number): void { this.desiredAzimuth += radians; this.rotV += radians * 3; }

  focusOn(x: number, z: number, distance?: number): void {
    this.desiredX = THREE.MathUtils.clamp(x, -MARGIN, GRID_W + MARGIN);
    this.desiredZ = THREE.MathUtils.clamp(z, -MARGIN, GRID_H + MARGIN);
    if (distance !== undefined) this.desiredDistance = THREE.MathUtils.clamp(distance, MIN_DIST, MAX_DIST);
  }

  private recomputeCamera(): void {
    const horizontal = Math.sin(this.polar) * this.distance;
    this.camera.position.set(
      this.target.x + Math.sin(this.azimuth) * horizontal,
      this.target.y + Math.cos(this.polar) * this.distance,
      this.target.z + Math.cos(this.azimuth) * horizontal,
    );
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();
  }

  update(dt: number, grid: Grid): void {
    this.grid = grid;
    const step = Math.min(dt, 0.05);
    if (!this._gesturing) {
      this.desiredX += this.panVX * step; this.desiredZ += this.panVZ * step;
      this.desiredAzimuth += this.rotV * step;
      const damp = Math.exp(-7 * step); this.panVX *= damp; this.panVZ *= damp; this.rotV *= Math.exp(-8 * step);
    }
    this.desiredX = THREE.MathUtils.clamp(this.desiredX, -MARGIN, GRID_W + MARGIN);
    this.desiredZ = THREE.MathUtils.clamp(this.desiredZ, -MARGIN, GRID_H + MARGIN);
    const ease = 1 - Math.exp(-14 * step);
    this.target.x += (this.desiredX - this.target.x) * ease;
    this.target.z += (this.desiredZ - this.target.z) * ease;
    this.distance += (this.desiredDistance - this.distance) * ease;
    this.azimuth += (this.desiredAzimuth - this.azimuth) * ease;
    this.polar += (this.desiredPolar - this.polar) * ease;
    const terrainY = heightAtWorld(grid, this.target.x, this.target.z);
    this.target.y += (terrainY - this.target.y) * (1 - Math.exp(-9 * step));
    this.recomputeCamera();
  }

  getPose() { return { tx: this.desiredX, tz: this.desiredZ, dist: this.desiredDistance, az: this.desiredAzimuth, pol: this.desiredPolar }; }
  setPose(p: { tx: number; tz: number; dist: number; az: number; pol: number }): void {
    this.desiredX = this.target.x = THREE.MathUtils.clamp(p.tx, -MARGIN, GRID_W + MARGIN);
    this.desiredZ = this.target.z = THREE.MathUtils.clamp(p.tz, -MARGIN, GRID_H + MARGIN);
    this.desiredDistance = this.distance = THREE.MathUtils.clamp(p.dist, MIN_DIST, MAX_DIST);
    this.desiredAzimuth = this.azimuth = p.az;
    this.desiredPolar = this.polar = THREE.MathUtils.clamp(p.pol, MIN_POLAR, MAX_POLAR);
  }

  dispose(): void {
    this.dom.removeEventListener('pointerdown', this.onDown);
    this.dom.removeEventListener('pointermove', this.onMove);
    this.dom.removeEventListener('pointerup', this.onUp);
    this.dom.removeEventListener('pointercancel', this.onUp);
    this.dom.removeEventListener('wheel', this.onWheel);
    this.dom.removeEventListener('contextmenu', this.preventMenu);
  }
}
