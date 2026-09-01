/**
 * SETHCITY 6769 — procedural building renderer (section A3).
 *
 * Every building in the game is generated here from its BuildingDef archetype,
 * level, palette and a deterministic per-tile seed. Geometry is merged into one
 * BufferGeometry per 16x16 chunk (one draw call each) with attributes
 * position / normal / color / aEmissive. Night windows, signage and floodlights
 * glow through a patched Lambert material; spinning turbine rotors, blinking
 * aviation beacons and the airport radar live in small InstancedMesh sets.
 * popIn() overlays a temporary mesh that scales up with an elastic ease while
 * the merged chunk suppresses the building, then folds it back in.
 */
import * as THREE from 'three';
import type { Grid } from '../core/grid';
import {
  CHUNK,
  CHUNKS_X,
  CHUNKS_Y,
  SEA_LEVEL,
  idx,
  tx,
  ty,
  inBounds,
  type BuildingDef,
} from '../core/types';
import { defOf } from '../core/catalog';
import { hash2, mulberry32, clamp, lerp, type Rng } from '../core/rng';

/* ────────────────────────────── colour helpers ───────────────────────────── */

type V3 = readonly [number, number, number];

const colorCache = new Map<number, V3>();
const _c = new THREE.Color();

function rgb(hex: number): V3 {
  let c = colorCache.get(hex);
  if (!c) {
    _c.setHex(hex);
    c = [_c.r, _c.g, _c.b];
    colorCache.set(hex, c);
  }
  return c;
}

/** hex colour scaled by f, as a linear V3 */
function shade(hex: number, f = 1): V3 {
  const c = rgb(hex);
  return [c[0] * f, c[1] * f, c[2] * f];
}

function mix2(hexA: number, hexB: number, t: number): V3 {
  const a = rgb(hexA);
  const b = rgb(hexB);
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/* shared material colours */
const GLASS = 0x223140;
const CONCRETE = 0xb8b2a6;
const PAVE = 0x9b978c;
const ASPHALT = 0x3a3d42;
const ROOF_DARK = 0x4a4440;
const WHITE = 0xf2f0ea;
const METAL = 0x9aa2a8;
const BRICK = 0x9c5a41;
const HEDGE = 0x4c7a3a;
const LAWN = 0x6fa348;
const TRUNK = 0x6b5136;
const FOLIAGE = 0x4d8a3c;
const WATERC = 0x3f9fc9;
const FENCE_W = 0xe8e2d2;
const DOORC = 0x51402f;
const NEON: number[] = [0x35e0e0, 0xff5fa2, 0xffc93c, 0x7dff6a, 0x9a6bff, 0xff8b3d];

/* emissive value encoding (see shader patch):
   (0,1)   band 0 — warm window, lights up late in the dusk ramp
   (1,2)   band 1 — signage / floodlights, colour = vertex colour, mid dusk
   (2,3)   band 2 — retail ground glow, colour = vertex colour, early dusk   */
const E_WIN = 0.85;
const E_WIN_DIM = 0.45;
const E_SIGN = 1.9;
const E_SIGN_SOFT = 1.55;
const E_RETAIL = 2.85;
const E_RETAIL_SOFT = 2.5;

/* ─────────────────────────── animated-part registry ──────────────────────── */

const enum AnimKind {
  Rotor = 0,
  Beacon = 1,
  Radar = 2,
}

interface AnimSpot {
  kind: AnimKind;
  x: number;
  y: number;
  z: number;
  yaw: number;
  speed: number;
  phase: number;
  scale: number;
}

/** builders push into this while a chunk (or pop mesh) is being generated */
let pendingAnims: AnimSpot[] = [];

/* ───────────────────────────── geometry sink ─────────────────────────────── */

/**
 * Growable soup of flat-shaded faces. Builders write in a local frame
 * (x ∈ [0,w], z ∈ [0,h], y up from the building base); the sink rotates the
 * footprint in 90° steps about its centre and translates to world space.
 */
class GeoSink {
  pos = new Float32Array(3 * 8192);
  nor = new Float32Array(3 * 8192);
  col = new Float32Array(3 * 8192);
  emi = new Float32Array(8192);
  ind = new Uint32Array(12288);
  v = 0;
  ic = 0;

  private ox = 0;
  private oy = 0;
  private oz = 0;
  private fw = 1;
  private fh = 1;
  private rot = 0;
  /** false while generating a pop-in overlay (skip world-space anim spots) */
  collect = true;

  reset() {
    this.v = 0;
    this.ic = 0;
  }

  setFrame(wx: number, wy: number, wz: number, w: number, h: number, rot: number) {
    this.ox = wx;
    this.oy = wy;
    this.oz = wz;
    this.fw = w;
    this.fh = h;
    this.rot = rot & 3;
  }

  private ensure(nv: number, ni: number) {
    const needV = (this.v + nv) * 3;
    if (needV > this.pos.length) {
      const cap = Math.max(needV, this.pos.length * 2);
      const p = new Float32Array(cap);
      p.set(this.pos);
      this.pos = p;
      const n = new Float32Array(cap);
      n.set(this.nor);
      this.nor = n;
      const c = new Float32Array(cap);
      c.set(this.col);
      this.col = c;
      const e = new Float32Array(cap / 3);
      e.set(this.emi);
      this.emi = e;
    }
    if (this.ic + ni > this.ind.length) {
      const cap = Math.max(this.ic + ni, this.ind.length * 2);
      const ix = new Uint32Array(cap);
      ix.set(this.ind);
      this.ind = ix;
    }
  }

  /** local → world for anim anchors */
  toWorld(x: number, y: number, z: number): [number, number, number] {
    const cx = this.fw * 0.5;
    const cz = this.fh * 0.5;
    const dx = x - cx;
    const dz = z - cz;
    let rx: number;
    let rz: number;
    switch (this.rot) {
      case 1:
        rx = -dz;
        rz = dx;
        break;
      case 2:
        rx = -dx;
        rz = -dz;
        break;
      case 3:
        rx = dz;
        rz = -dx;
        break;
      default:
        rx = dx;
        rz = dz;
    }
    return [this.ox + cx + rx, this.oy + y, this.oz + cz + rz];
  }

  worldYaw(localYaw: number): number {
    return localYaw + this.rot * (Math.PI / 2);
  }

  private vert(
    x: number,
    y: number,
    z: number,
    nx: number,
    ny: number,
    nz: number,
    c: V3,
    e: number,
  ): number {
    const cx = this.fw * 0.5;
    const cz = this.fh * 0.5;
    const dx = x - cx;
    const dz = z - cz;
    let rx: number;
    let rz: number;
    let rnx: number;
    let rnz: number;
    switch (this.rot) {
      case 1:
        rx = -dz;
        rz = dx;
        rnx = -nz;
        rnz = nx;
        break;
      case 2:
        rx = -dx;
        rz = -dz;
        rnx = -nx;
        rnz = -nz;
        break;
      case 3:
        rx = dz;
        rz = -dx;
        rnx = nz;
        rnz = -nx;
        break;
      default:
        rx = dx;
        rz = dz;
        rnx = nx;
        rnz = nz;
    }
    const p = this.v * 3;
    this.pos[p] = this.ox + cx + rx;
    this.pos[p + 1] = this.oy + y;
    this.pos[p + 2] = this.oz + cz + rz;
    this.nor[p] = rnx;
    this.nor[p + 1] = ny;
    this.nor[p + 2] = rnz;
    this.col[p] = c[0];
    this.col[p + 1] = c[1];
    this.col[p + 2] = c[2];
    this.emi[this.v] = e;
    return this.v++;
  }

  /** quad a→b→c→d, CCW seen from outside; flat per-face normal */
  quad(
    ax: number, ay: number, az: number,
    bx: number, by: number, bz: number,
    cx: number, cy: number, cz: number,
    dx: number, dy: number, dz: number,
    c: V3, e = 0,
  ) {
    const ux = bx - ax;
    const uy = by - ay;
    const uz = bz - az;
    const vx = dx - ax;
    const vy = dy - ay;
    const vz = dz - az;
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz);
    if (len < 1e-9) return;
    nx /= len;
    ny /= len;
    nz /= len;
    this.ensure(4, 6);
    const a = this.vert(ax, ay, az, nx, ny, nz, c, e);
    const b = this.vert(bx, by, bz, nx, ny, nz, c, e);
    const cc = this.vert(cx, cy, cz, nx, ny, nz, c, e);
    const d = this.vert(dx, dy, dz, nx, ny, nz, c, e);
    const i = this.ic;
    this.ind[i] = a;
    this.ind[i + 1] = b;
    this.ind[i + 2] = cc;
    this.ind[i + 3] = a;
    this.ind[i + 4] = cc;
    this.ind[i + 5] = d;
    this.ic += 6;
  }

  tri(
    ax: number, ay: number, az: number,
    bx: number, by: number, bz: number,
    cx: number, cy: number, cz: number,
    c: V3, e = 0,
  ) {
    const ux = bx - ax;
    const uy = by - ay;
    const uz = bz - az;
    const vx = cx - ax;
    const vy = cy - ay;
    const vz = cz - az;
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz);
    if (len < 1e-9) return;
    nx /= len;
    ny /= len;
    nz /= len;
    this.ensure(3, 3);
    const a = this.vert(ax, ay, az, nx, ny, nz, c, e);
    const b = this.vert(bx, by, bz, nx, ny, nz, c, e);
    const cc = this.vert(cx, cy, cz, nx, ny, nz, c, e);
    this.ind[this.ic] = a;
    this.ind[this.ic + 1] = b;
    this.ind[this.ic + 2] = cc;
    this.ic += 3;
  }

  /** axis-aligned box in local space */
  box(
    x0: number, y0: number, z0: number,
    x1: number, y1: number, z1: number,
    side: V3, top: V3, e = 0, bottom = false,
  ) {
    this.quad(x1, y0, z1, x1, y0, z0, x1, y1, z0, x1, y1, z1, side, e); // +X
    this.quad(x0, y0, z0, x0, y0, z1, x0, y1, z1, x0, y1, z0, side, e); // -X
    this.quad(x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y1, z1, side, e); // +Z
    this.quad(x1, y0, z0, x0, y0, z0, x0, y1, z0, x1, y1, z0, side, e); // -Z
    this.quad(x0, y1, z1, x1, y1, z1, x1, y1, z0, x0, y1, z0, top, e); // +Y
    if (bottom)
      this.quad(x0, y0, z0, x1, y0, z0, x1, y0, z1, x0, y0, z1, top, e); // -Y
  }

  /** box rotated about its own centre by ang (radians, about Y) */
  boxR(
    cx: number, cz: number, w: number, d: number,
    y0: number, y1: number, ang: number, side: V3, top: V3, e = 0,
  ) {
    const co = Math.cos(ang);
    const si = Math.sin(ang);
    const hw = w * 0.5;
    const hd = d * 0.5;
    const px: number[] = [];
    const pz: number[] = [];
    const lx = [-hw, hw, hw, -hw];
    const lz = [-hd, -hd, hd, hd];
    for (let k = 0; k < 4; k++) {
      px.push(cx + lx[k] * co - lz[k] * si);
      pz.push(cz + lx[k] * si + lz[k] * co);
    }
    for (let k = 0; k < 4; k++) {
      const j = (k + 1) & 3;
      this.quad(
        px[j], y0, pz[j], px[k], y0, pz[k],
        px[k], y1, pz[k], px[j], y1, pz[j], side, e,
      );
    }
    this.quad(px[3], y1, pz[3], px[2], y1, pz[2], px[1], y1, pz[1], px[0], y1, pz[0], top, e);
  }

  /** horizontal top-facing quad (paths, pads, fields) */
  flat(x0: number, z0: number, x1: number, z1: number, y: number, c: V3, e = 0) {
    this.quad(x0, y, z1, x1, y, z1, x1, y, z0, x0, y, z0, c, e);
  }

  /** filled disc facing up */
  disc(cx: number, cz: number, y: number, r: number, seg: number, c: V3, e = 0) {
    for (let k = 0; k < seg; k++) {
      const a0 = (k / seg) * Math.PI * 2;
      const a1 = ((k + 1) / seg) * Math.PI * 2;
      this.tri(
        cx, y, cz,
        cx + Math.cos(a1) * r, y, cz + Math.sin(a1) * r,
        cx + Math.cos(a0) * r, y, cz + Math.sin(a0) * r,
        c, e,
      );
    }
  }

  /** vertical (possibly tapered) cylinder, flat facets */
  cyl(
    cx: number, cz: number, y0: number, y1: number,
    r0: number, r1: number, seg: number, side: V3,
    capTop: V3 | null = null, e = 0,
  ) {
    for (let k = 0; k < seg; k++) {
      const a0 = (k / seg) * Math.PI * 2;
      const a1 = ((k + 1) / seg) * Math.PI * 2;
      const c0 = Math.cos(a0);
      const s0 = Math.sin(a0);
      const c1 = Math.cos(a1);
      const s1 = Math.sin(a1);
      if (r1 > 1e-4) {
        this.quad(
          cx + c1 * r0, y0, cz + s1 * r0,
          cx + c0 * r0, y0, cz + s0 * r0,
          cx + c0 * r1, y1, cz + s0 * r1,
          cx + c1 * r1, y1, cz + s1 * r1,
          side, e,
        );
      } else {
        this.tri(
          cx + c1 * r0, y0, cz + s1 * r0,
          cx + c0 * r0, y0, cz + s0 * r0,
          cx, y1, cz,
          side, e,
        );
      }
    }
    if (capTop && r1 > 1e-4) {
      for (let k = 0; k < seg; k++) {
        const a0 = (k / seg) * Math.PI * 2;
        const a1 = ((k + 1) / seg) * Math.PI * 2;
        this.tri(
          cx, y1, cz,
          cx + Math.cos(a1) * r1, y1, cz + Math.sin(a1) * r1,
          cx + Math.cos(a0) * r1, y1, cz + Math.sin(a0) * r1,
          capTop, e,
        );
      }
    }
  }

  /** faceted dome (quarter-sphere of rings) */
  dome(
    cx: number, cz: number, y0: number, r: number,
    seg: number, rings: number, c: V3, squash = 1, e = 0,
  ) {
    for (let i = 0; i < rings; i++) {
      const p0 = (i / rings) * Math.PI * 0.5;
      const p1 = ((i + 1) / rings) * Math.PI * 0.5;
      const r0 = r * Math.cos(p0);
      const r1 = r * Math.cos(p1);
      const yA = y0 + r * Math.sin(p0) * squash;
      const yB = y0 + r * Math.sin(p1) * squash;
      for (let k = 0; k < seg; k++) {
        const a0 = (k / seg) * Math.PI * 2;
        const a1 = ((k + 1) / seg) * Math.PI * 2;
        const c0 = Math.cos(a0);
        const s0 = Math.sin(a0);
        const c1 = Math.cos(a1);
        const s1 = Math.sin(a1);
        if (i === rings - 1) {
          this.tri(
            cx + c1 * r0, yA, cz + s1 * r0,
            cx + c0 * r0, yA, cz + s0 * r0,
            cx, yB, cz,
            c, e,
          );
        } else {
          this.quad(
            cx + c1 * r0, yA, cz + s1 * r0,
            cx + c0 * r0, yA, cz + s0 * r0,
            cx + c0 * r1, yB, cz + s0 * r1,
            cx + c1 * r1, yB, cz + s1 * r1,
            c, e,
          );
        }
      }
    }
  }

  /** solid gable-roof prism over a rect footprint */
  gable(
    x0: number, z0: number, x1: number, z1: number,
    y0: number, hRoof: number, alongX: boolean, roofC: V3, endC: V3,
  ) {
    const yt = y0 + hRoof;
    if (alongX) {
      const zm = (z0 + z1) * 0.5;
      this.quad(x1, y0, z0, x0, y0, z0, x0, yt, zm, x1, yt, zm, roofC);
      this.quad(x0, y0, z1, x1, y0, z1, x1, yt, zm, x0, yt, zm, roofC);
      this.tri(x0, y0, z0, x0, y0, z1, x0, yt, zm, endC);
      this.tri(x1, y0, z1, x1, y0, z0, x1, yt, zm, endC);
    } else {
      const xm = (x0 + x1) * 0.5;
      this.quad(x0, y0, z0, x0, y0, z1, xm, yt, z1, xm, yt, z0, roofC);
      this.quad(x1, y0, z1, x1, y0, z0, xm, yt, z0, xm, yt, z1, roofC);
      this.tri(x1, y0, z0, x0, y0, z0, xm, yt, z0, endC);
      this.tri(x0, y0, z1, x1, y0, z1, xm, yt, z1, endC);
    }
  }

  /** hipped roof; inset = how far the ridge pulls in from each end.
   *  inset = min(w,d)/2 makes a pyramid. */
  hip(
    x0: number, z0: number, x1: number, z1: number,
    y0: number, hRoof: number, roofC: V3,
    inset?: number,
  ) {
    const yt = y0 + hRoof;
    const w = x1 - x0;
    const d = z1 - z0;
    if (w >= d) {
      const ins = inset ?? d * 0.5;
      const zm = (z0 + z1) * 0.5;
      const rx0 = x0 + ins;
      const rx1 = x1 - ins;
      this.quad(x1, y0, z0, x0, y0, z0, rx0, yt, zm, rx1, yt, zm, roofC);
      this.quad(x0, y0, z1, x1, y0, z1, rx1, yt, zm, rx0, yt, zm, roofC);
      this.tri(x0, y0, z0, x0, y0, z1, rx0, yt, zm, roofC);
      this.tri(x1, y0, z1, x1, y0, z0, rx1, yt, zm, roofC);
    } else {
      const ins = inset ?? w * 0.5;
      const xm = (x0 + x1) * 0.5;
      const rz0 = z0 + ins;
      const rz1 = z1 - ins;
      this.quad(x0, y0, z0, x0, y0, z1, xm, yt, rz1, xm, yt, rz0, roofC);
      this.quad(x1, y0, z1, x1, y0, z0, xm, yt, rz0, xm, yt, rz1, roofC);
      this.tri(x1, y0, z0, x0, y0, z0, xm, yt, rz0, roofC);
      this.tri(x0, y0, z1, x1, y0, z1, xm, yt, rz1, roofC);
    }
  }

  pyramid(cx: number, cz: number, w: number, d: number, y0: number, h: number, c: V3) {
    this.hip(cx - w * 0.5, cz - d * 0.5, cx + w * 0.5, cz + d * 0.5, y0, h, c, Math.min(w, d) * 0.5);
  }

  /** box beam along an arbitrary segment; hu/hv are half-thicknesses */
  bar(
    ax: number, ay: number, az: number,
    bx: number, by: number, bz: number,
    hu: number, hv: number, c: V3, e = 0,
  ) {
    let ux = bx - ax;
    let uy = by - ay;
    let uz = bz - az;
    const len = Math.hypot(ux, uy, uz);
    if (len < 1e-9) return;
    ux /= len;
    uy /= len;
    uz /= len;
    let hx: number;
    let hy: number;
    let hz: number;
    if (Math.abs(uy) < 0.92) {
      hx = 0;
      hy = 1;
      hz = 0;
    } else {
      hx = 1;
      hy = 0;
      hz = 0;
    }
    // e1 = u × helper (horizontal-ish side axis)
    let e1x = uy * hz - uz * hy;
    let e1y = uz * hx - ux * hz;
    let e1z = ux * hy - uy * hx;
    const l1 = Math.hypot(e1x, e1y, e1z);
    e1x /= l1;
    e1y /= l1;
    e1z /= l1;
    // e2 = u × e1
    const e2x = uy * e1z - uz * e1y;
    const e2y = uz * e1x - ux * e1z;
    const e2z = ux * e1y - uy * e1x;
    const P: number[][] = [];
    const T: number[][] = [];
    const su = [1, -1, -1, 1];
    const sv = [1, 1, -1, -1];
    for (let k = 0; k < 4; k++) {
      const oxk = e1x * hu * su[k] + e2x * hv * sv[k];
      const oyk = e1y * hu * su[k] + e2y * hv * sv[k];
      const ozk = e1z * hu * su[k] + e2z * hv * sv[k];
      P.push([ax + oxk, ay + oyk, az + ozk]);
      T.push([bx + oxk, by + oyk, bz + ozk]);
    }
    for (let k = 0; k < 4; k++) {
      const j = (k + 1) & 3;
      this.quad(
        P[j][0], P[j][1], P[j][2], P[k][0], P[k][1], P[k][2],
        T[k][0], T[k][1], T[k][2], T[j][0], T[j][1], T[j][2],
        c, e,
      );
    }
    // end caps
    this.quad(T[0][0], T[0][1], T[0][2], T[1][0], T[1][1], T[1][2], T[2][0], T[2][1], T[2][2], T[3][0], T[3][1], T[3][2], c, e);
    this.quad(P[3][0], P[3][1], P[3][2], P[2][0], P[2][1], P[2][2], P[1][0], P[1][1], P[1][2], P[0][0], P[0][1], P[0][2], c, e);
  }

  /** flat quad pinned to one wall of a volume, pushed `off` outward.
   *  side: 0 = z- (front), 1 = x+, 2 = z+, 3 = x-  (matches rotation mapping) */
  wallQuad(
    side: number, u0: number, v0: number, u1: number, v1: number,
    at: number, off: number, c: V3, e = 0,
  ) {
    switch (side & 3) {
      case 0: {
        const z = at - off;
        this.quad(u1, v0, z, u0, v0, z, u0, v1, z, u1, v1, z, c, e);
        return;
      }
      case 1: {
        const x = at + off;
        this.quad(x, v0, u1, x, v0, u0, x, v1, u0, x, v1, u1, c, e);
        return;
      }
      case 2: {
        const z = at + off;
        this.quad(u0, v0, z, u1, v0, z, u1, v1, z, u0, v1, z, c, e);
        return;
      }
      default: {
        const x = at - off;
        this.quad(x, v0, u0, x, v0, u1, x, v1, u1, x, v1, u0, c, e);
        return;
      }
    }
  }
}

/* ─────────────────────────── build context + helpers ─────────────────────── */

interface Ctx {
  def: BuildingDef;
  key: string;
  w: number;
  h: number;
  level: number;
  seedI: number;
  r: Rng;
  ht: number;
  abandoned: boolean;
}

function pal(c: Ctx, i: number, fb: number): number {
  const p = c.def.palette;
  return p && p.length > i ? p[i] : fb;
}

/** deterministic window-lit test */
function lit(c: Ctx, f: number, col: number, side: number, prob: number): boolean {
  return hash2(c.seedI + f * 7, col * 13 + side * 131, 977) < prob;
}

function litProb(c: Ctx): number {
  return 0.42 + c.level * 0.06;
}

/** grid of individual window quads on one wall */
function windows(
  s: GeoSink, c: Ctx, side: number,
  u0: number, u1: number, at: number,
  y0: number, y1: number, floors: number, cols: number,
  prob: number, eLit = E_WIN,
) {
  if (floors < 1 || cols < 1) return;
  const uw = (u1 - u0) / cols;
  const vh = (y1 - y0) / floors;
  const wW = uw * 0.52;
  const wH = vh * 0.55;
  const glass = rgb(GLASS);
  for (let f = 0; f < floors; f++) {
    const cy = y0 + (f + 0.5) * vh;
    for (let k = 0; k < cols; k++) {
      const cu = u0 + (k + 0.5) * uw;
      const on = lit(c, f, k, side, prob);
      s.wallQuad(side, cu - wW / 2, cy - wH / 2, cu + wW / 2, cy + wH / 2, at, 0.016, glass, on ? eLit : 0);
    }
  }
}

/** horizontal window bands split into randomly lit segments (towers) */
function windowBands(
  s: GeoSink, c: Ctx, side: number,
  u0: number, u1: number, at: number,
  y0: number, y1: number, floors: number,
  prob: number, segs = 2, eLit = E_WIN,
) {
  if (floors < 1) return;
  const vh = (y1 - y0) / floors;
  const bH = vh * 0.52;
  const glass = rgb(GLASS);
  const uw = (u1 - u0) / segs;
  for (let f = 0; f < floors; f++) {
    const cy = y0 + (f + 0.5) * vh;
    for (let k = 0; k < segs; k++) {
      const a = u0 + k * uw + uw * 0.08;
      const b = u0 + (k + 1) * uw - uw * 0.08;
      const on = lit(c, f, k, side, prob);
      s.wallQuad(side, a, cy - bH / 2, b, cy + bH / 2, at, 0.016, glass, on ? eLit : 0);
    }
  }
}

/** same bands on all four sides of a centred box mass */
function windowBox(
  s: GeoSink, c: Ctx,
  x0: number, z0: number, x1: number, z1: number,
  y0: number, y1: number, floors: number, prob: number,
  segs = 2, eLit = E_WIN,
) {
  windowBands(s, c, 0, x0 + 0.06, x1 - 0.06, z0, y0, y1, floors, prob, segs, eLit);
  windowBands(s, c, 2, x0 + 0.06, x1 - 0.06, z1, y0, y1, floors, prob, segs, eLit);
  windowBands(s, c, 1, z0 + 0.06, z1 - 0.06, x1, y0, y1, floors, prob, segs, eLit);
  windowBands(s, c, 3, z0 + 0.06, z1 - 0.06, x0, y0, y1, floors, prob, segs, eLit);
}

function door(s: GeoSink, side: number, cu: number, at: number, y0: number, wD = 0.14, hD = 0.24, col = DOORC) {
  s.wallQuad(side, cu - wD / 2, y0, cu + wD / 2, y0 + hD, at, 0.014, rgb(col));
}

function parapet(s: GeoSink, x0: number, z0: number, x1: number, z1: number, y: number, col: V3, t = 0.045, ph = 0.08) {
  s.box(x0, y, z0, x1, y + ph, z0 + t, col, col);
  s.box(x0, y, z1 - t, x1, y + ph, z1, col, col);
  s.box(x0, y, z0 + t, x0 + t, y + ph, z1 - t, col, col);
  s.box(x1 - t, y, z0 + t, x1, y + ph, z1 - t, col, col);
}

function acUnits(s: GeoSink, c: Ctx, x0: number, z0: number, x1: number, z1: number, y: number, n: number) {
  const grey = rgb(METAL);
  const dark = shade(METAL, 0.7);
  for (let k = 0; k < n; k++) {
    const px = lerp(x0, x1 - 0.16, c.r());
    const pz = lerp(z0, z1 - 0.14, c.r());
    s.box(px, y, pz, px + 0.13 + c.r() * 0.08, y + 0.08 + c.r() * 0.07, pz + 0.12, dark, grey);
  }
}

function chimney(s: GeoSink, x: number, z: number, y0: number, h: number, w = 0.09, col = BRICK) {
  const c = rgb(col);
  s.box(x - w / 2, y0, z - w / 2, x + w / 2, y0 + h, z + w / 2, c, shade(col, 0.75));
  s.box(x - w * 0.68, y0 + h, z - w * 0.68, x + w * 0.68, y0 + h + 0.03, z + w * 0.68, shade(col, 0.6), shade(0x2a2a2a, 1));
}

function flagPole(s: GeoSink, c: Ctx, x: number, z: number, y0: number, h: number) {
  s.bar(x, y0, z, x, y0 + h, z, 0.014, 0.014, rgb(0xd8d8d8));
  const fc = rgb([0x3ddbd9, 0xe45a4f, 0xf2c14e][(c.seedI + c.level) % 3]);
  s.quad(x, y0 + h - 0.02, z, x + 0.22, y0 + h - 0.05, z, x + 0.22, y0 + h - 0.13, z, x, y0 + h - 0.16, z, fc);
  s.quad(x, y0 + h - 0.16, z, x + 0.22, y0 + h - 0.13, z, x + 0.22, y0 + h - 0.05, z, x, y0 + h - 0.02, z, fc);
}

function treeBlob(s: GeoSink, x: number, z: number, y0: number, sc: number, seed: number) {
  const t = 0.03 * sc;
  s.bar(x, y0, z, x, y0 + 0.16 * sc, z, t, t, rgb(TRUNK));
  const g = shade(FOLIAGE, 0.85 + hash2(seed, 3, 11) * 0.4);
  const r = (0.11 + hash2(seed, 5, 13) * 0.05) * sc;
  s.dome(x, z, y0 + 0.12 * sc, r, 5, 2, g, 1.5);
}

function hedgeBox(s: GeoSink, x0: number, z0: number, x1: number, z1: number, y0: number, h = 0.1) {
  s.box(x0, y0, z0, x1, y0 + h, z1, shade(HEDGE, 0.85), rgb(HEDGE));
}

function bench(s: GeoSink, x: number, z: number, y0: number, alongX: boolean) {
  const c = shade(TRUNK, 1.2);
  if (alongX) s.box(x - 0.08, y0 + 0.03, z - 0.025, x + 0.08, y0 + 0.05, z + 0.025, c, c);
  else s.box(x - 0.025, y0 + 0.03, z - 0.08, x + 0.025, y0 + 0.05, z + 0.08, c, c);
}

function lampPost(s: GeoSink, x: number, z: number, y0: number, h = 0.34) {
  s.bar(x, y0, z, x, y0 + h, z, 0.012, 0.012, shade(0x44484c, 1));
  const head = rgb(0xfff2c9);
  s.box(x - 0.03, y0 + h, z - 0.03, x + 0.03, y0 + h + 0.045, z + 0.03, head, head, E_SIGN_SOFT);
}

/** fence around a rect; gapSide 0..3 leaves an opening [g0,g1] along that side */
function fence(
  s: GeoSink, x0: number, z0: number, x1: number, z1: number,
  y0: number, h: number, col: V3, gapSide = -1, g0 = 0, g1 = 0,
) {
  const t = 0.018;
  const seg = (side: number, a: number, b: number) => {
    if (b - a < 0.02) return;
    switch (side) {
      case 0: s.box(a, y0, z0 - t, b, y0 + h, z0 + t, col, col); return;
      case 1: s.box(x1 - t, y0, a, x1 + t, y0 + h, b, col, col); return;
      case 2: s.box(a, y0, z1 - t, b, y0 + h, z1 + t, col, col); return;
      default: s.box(x0 - t, y0, a, x0 + t, y0 + h, b, col, col); return;
    }
  };
  for (let side = 0; side < 4; side++) {
    const lo = side === 0 || side === 2 ? x0 : z0;
    const hi = side === 0 || side === 2 ? x1 : z1;
    if (side === gapSide) {
      seg(side, lo, Math.max(lo, g0));
      seg(side, Math.min(hi, g1), hi);
    } else {
      seg(side, lo, hi);
    }
  }
}

function tank(s: GeoSink, x: number, z: number, y0: number, r: number, h: number, col: number, seg = 9) {
  s.cyl(x, z, y0, y0 + h, r, r, seg, rgb(col), shade(col, 0.82));
  s.cyl(x, z, y0 + h, y0 + h + r * 0.3, r, r * 0.35, seg, shade(col, 0.9), shade(col, 0.8));
}

function crates(s: GeoSink, c: Ctx, x: number, z: number, y0: number, n: number) {
  const cols = [0xc25b4a, 0x4a7fc2, 0xc2a44a, 0x5aa06a, 0x8a8f96];
  for (let k = 0; k < n; k++) {
    const px = x + (c.r() - 0.5) * 0.5;
    const pz = z + (c.r() - 0.5) * 0.5;
    const sz = 0.1 + c.r() * 0.06;
    const hex = cols[(c.r() * cols.length) | 0];
    s.box(px, y0, pz, px + sz * 1.7, y0 + sz + (c.r() < 0.4 ? sz : 0), pz + sz, shade(hex, 0.9), rgb(hex));
  }
}

function column(s: GeoSink, x: number, z: number, y0: number, h: number, r: number, col: V3) {
  s.cyl(x, z, y0, y0 + h, r, r, 6, col, null);
}

/** neon colour pick, deterministic */
function neon(c: Ctx, salt = 0): V3 {
  return rgb(NEON[(hash2(c.seedI, 71 + salt, 5) * NEON.length) | 0]);
}

/* ═══════════════════════════ archetype builders ═══════════════════════════ */

type Builder = (s: GeoSink, c: Ctx) => void;

/* ------------------------------- residential ------------------------------ */

function bHouse(s: GeoSink, c: Ctx) {
  const grand = c.w > 1; // mayor's house
  const W = c.w;
  const H = c.h;
  const r = c.r;
  const wallHex = pal(c, 0, 0xd8cbb4);
  const roofHex = pal(c, 1, 0x8b5a3c);
  const trimHex = pal(c, 2, 0x6f4e37);
  const wall = shade(wallHex, 0.94 + r() * 0.12);
  const roof = shade(roofHex, 0.9 + r() * 0.2);
  const storeys = grand ? 2 : c.level >= 3 && r() < 0.55 ? 2 : 1;
  const fH = grand ? 0.42 : 0.34;
  const bodyH = storeys * fH;

  // lawn + garden
  s.flat(0.02, 0.02, W - 0.02, H - 0.02, 0.012, shade(LAWN, 0.9 + r() * 0.2));

  // body footprint, biased toward the front
  const bw = grand ? W * 0.62 : 0.5 + r() * 0.1;
  const bd = grand ? H * 0.5 : 0.42 + r() * 0.08;
  const bx = grand ? (W - bw) / 2 : 0.1 + r() * (W - bw - 0.28);
  const bz = grand ? 0.28 : 0.16 + r() * 0.08;
  s.box(bx, 0, bz, bx + bw, bodyH, bz + bd, wall, wall);

  // L-wing variant
  const hasWing = !grand && r() < 0.4;
  let wingRect: [number, number, number, number] | null = null;
  if (hasWing) {
    const ww = 0.24;
    const wd = bd * 0.7;
    const wx = bx + bw - 0.06;
    if (wx + ww < W - 0.06) {
      s.box(wx, 0, bz + 0.05, wx + ww, fH, bz + 0.05 + wd, wall, wall);
      wingRect = [wx, bz + 0.05, wx + ww, bz + 0.05 + wd];
    }
  }

  // roof
  const hipRoof = grand || r() < 0.45;
  const overhang = 0.035;
  if (hipRoof) {
    s.hip(bx - overhang, bz - overhang, bx + bw + overhang, bz + bd + overhang, bodyH, grand ? 0.34 : 0.22 + r() * 0.08, roof, Math.min(bw, bd) * 0.36);
  } else {
    s.gable(bx - overhang, bz - overhang, bx + bw + overhang, bz + bd + overhang, bodyH, 0.2 + r() * 0.1, r() < 0.5, roof, wall);
  }
  if (wingRect) s.gable(wingRect[0] - 0.02, wingRect[1] - 0.02, wingRect[2] + 0.02, wingRect[3] + 0.02, fH, 0.13, false, roof, wall);
  chimney(s, bx + bw * (0.22 + r() * 0.5), bz + bd * 0.5, bodyH + 0.1, 0.16 + r() * 0.08, grand ? 0.09 : 0.07);

  // windows + door
  const p = litProb(c);
  windows(s, c, 0, bx + 0.05, bx + bw - 0.05, bz, 0.05, bodyH - 0.04, storeys, grand ? 4 : 2, p);
  windows(s, c, 1, bz + 0.04, bz + bd - 0.04, bx + bw, 0.05, bodyH - 0.04, storeys, 2, p * 0.8);
  windows(s, c, 3, bz + 0.04, bz + bd - 0.04, bx, 0.05, bodyH - 0.04, storeys, 2, p * 0.8);
  door(s, 0, bx + bw * (grand ? 0.5 : 0.3), bz, 0, grand ? 0.16 : 0.12, grand ? 0.3 : 0.24);

  // porch
  if (grand || r() < 0.6) {
    const px0 = bx + bw * (grand ? 0.3 : 0.14);
    const px1 = bx + bw * (grand ? 0.7 : 0.5);
    const pd = 0.1;
    s.flat(px0, bz - pd, px1, bz, 0.035, shade(trimHex, 1.1));
    const pc = shade(WHITE, 0.95);
    s.bar(px0 + 0.02, 0.03, bz - pd + 0.02, px0 + 0.02, fH * 0.8, bz - pd + 0.02, 0.013, 0.013, pc);
    s.bar(px1 - 0.02, 0.03, bz - pd + 0.02, px1 - 0.02, fH * 0.8, bz - pd + 0.02, 0.013, 0.013, pc);
    s.quad(px1 + 0.02, fH * 0.8, bz - pd - 0.01, px0 - 0.02, fH * 0.8, bz - pd - 0.01, px0 - 0.02, fH * 0.95, bz + 0.02, px1 + 0.02, fH * 0.95, bz + 0.02, roof);
    if (grand) {
      column(s, px0 + 0.05, bz - pd + 0.05, 0.03, fH * 1.6, 0.03, rgb(WHITE));
      column(s, px1 - 0.05, bz - pd + 0.05, 0.03, fH * 1.6, 0.03, rgb(WHITE));
    }
  }

  // garage + driveway
  const hasGarage = !grand && !hasWing && r() < 0.45;
  const driveX = hasGarage ? bx + bw + 0.02 : bx + bw * 0.72;
  if (hasGarage && driveX + 0.26 < W - 0.02) {
    s.box(driveX, 0, bz + 0.02, driveX + 0.26, 0.26, bz + 0.3, wall, roof);
    s.wallQuad(0, driveX + 0.03, 0.02, driveX + 0.23, 0.2, bz + 0.02, 0.012, shade(WHITE, 0.85));
    s.flat(driveX + 0.02, 0, driveX + 0.24, bz + 0.02, 0.02, rgb(PAVE));
  } else {
    s.flat(driveX - 0.07, 0, driveX + 0.07, bz, 0.02, rgb(PAVE));
  }

  // fence + hedges + tree
  fence(s, 0.06, 0.06, W - 0.06, H - 0.06, 0.012, grand ? 0.09 : 0.07, grand ? shade(0x8a8f96, 1) : rgb(FENCE_W), 0, driveX - 0.09, driveX + 0.11);
  if (r() < 0.75) hedgeBox(s, bx - 0.04, bz + bd + 0.05, bx + bw * 0.5, bz + bd + 0.13, 0.012, 0.07 + r() * 0.05);
  if (r() < 0.85) treeBlob(s, W - 0.18, H - 0.2, 0.012, 0.8 + r() * 0.7, c.seedI + 5);
  if (grand) {
    treeBlob(s, 0.2, H - 0.24, 0.012, 1.1, c.seedI + 9);
    flagPole(s, c, bx + bw + 0.12, bz + 0.1, 0.012, 0.7);
  }
}

function bRowhouse(s: GeoSink, c: Ctx) {
  const r = c.r;
  const n = 2 + ((r() * 2) | 0); // 2-3 slices
  const m = 0.09;
  const depth = 0.62 + r() * 0.1;
  const z0 = 0.14;
  const baseHex = pal(c, 0, 0xd4bfa8);
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, rgb(PAVE));
  const p = litProb(c);
  let x = m;
  const sw = (c.w - m * 2) / n;
  for (let k = 0; k < n; k++) {
    const hVar = c.ht * (0.82 + r() * 0.3) * 0.42;
    const wall = shade(baseHex, 0.8 + r() * 0.35);
    const x1 = x + sw - 0.015;
    s.box(x, 0, z0, x1, hVar, z0 + depth, wall, shade(ROOF_DARK, 0.9));
    // cornice
    s.box(x - 0.012, hVar - 0.035, z0 - 0.02, x1 + 0.012, hVar, z0 + depth + 0.01, shade(baseHex, 0.6), shade(baseHex, 0.62));
    // roof access
    if (r() < 0.5) s.box(x + sw * 0.3, hVar, z0 + depth * 0.4, x + sw * 0.6, hVar + 0.07, z0 + depth * 0.7, shade(ROOF_DARK, 1.2), shade(ROOF_DARK, 1.35));
    const fl = Math.max(2, Math.round(hVar / 0.3));
    windows(s, c, 0, x + 0.04, x1 - sw * 0.34, z0, 0.3, hVar - 0.05, fl - 1, 1, p);
    windows(s, c, 2, x + 0.04, x1 - 0.04, z0 + depth, 0.3, hVar - 0.05, fl - 1, 2, p * 0.7);
    // door + stoop
    const dx = x + sw * 0.76;
    door(s, 0, dx, z0, 0.06, 0.11, 0.2);
    s.box(dx - 0.07, 0, z0 - 0.09, dx + 0.07, 0.03, z0, rgb(PAVE), rgb(PAVE));
    s.box(dx - 0.07, 0.03, z0 - 0.05, dx + 0.07, 0.06, z0, rgb(PAVE), rgb(PAVE));
    x += sw;
  }
  // back yards
  hedgeBox(s, 0.08, z0 + depth + 0.06, c.w - 0.08, z0 + depth + 0.13, 0.012, 0.07);
  if (r() < 0.6) treeBlob(s, c.w * 0.5, c.h - 0.12, 0.012, 0.7, c.seedI + 3);
}

function bApartment(s: GeoSink, c: Ctx) {
  const r = c.r;
  const ht = c.ht;
  const m = 0.08;
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, rgb(PAVE));
  const wallHex = pal(c, 0, 0xc0b7ae);
  const wall = shade(wallHex, 0.92 + r() * 0.14);
  const trim = shade(pal(c, 1, 0x7d6b5d), 1);
  const podH = Math.min(0.4, ht * 0.18);
  // podium
  s.box(m, 0, m, c.w - m, podH, c.h - m, wall, shade(wallHex, 0.8));
  // upper mass, stepped
  const ux0 = m + 0.05;
  const uz0 = m + 0.07;
  const ux1 = c.w - m - 0.05;
  const uz1 = c.h - m - 0.05;
  s.box(ux0, podH, uz0, ux1, ht, uz1, wall, shade(ROOF_DARK, 1));
  const fl = clamp(Math.round(ht / 0.42), 3, 14);
  const p = litProb(c);
  windowBox(s, c, ux0, uz0, ux1, uz1, podH + 0.05, ht - 0.1, fl, p, 2);
  // balconies on the front
  const bc = shade(wallHex, 0.7);
  const nb = clamp(fl - 1, 2, 8);
  for (let f = 1; f <= nb; f++) {
    const y = podH + ((ht - podH - 0.15) * f) / (nb + 1);
    if (lit(c, f, 99, 7, 0.75)) {
      const bx0 = ux0 + 0.08;
      const bx1 = ux0 + 0.08 + (ux1 - ux0 - 0.16) * 0.4;
      s.box(bx0, y, uz0 - 0.06, bx1, y + 0.018, uz0 + 0.01, bc, bc);
      s.box(bx0, y + 0.018, uz0 - 0.062, bx1, y + 0.07, uz0 - 0.045, trim, trim);
    }
    if (lit(c, f, 98, 8, 0.75)) {
      const bx0 = ux1 - 0.08 - (ux1 - ux0 - 0.16) * 0.4;
      const bx1 = ux1 - 0.08;
      s.box(bx0, y, uz0 - 0.06, bx1, y + 0.018, uz0 + 0.01, bc, bc);
      s.box(bx0, y + 0.018, uz0 - 0.062, bx1, y + 0.07, uz0 - 0.045, trim, trim);
    }
  }
  // stair core + roof plant
  s.box(ux1 - 0.16, podH, uz1 - 0.02, ux1 - 0.02, ht + 0.1, uz1 + 0.06, shade(wallHex, 0.75), shade(wallHex, 0.7));
  parapet(s, ux0, uz0, ux1, uz1, ht, shade(wallHex, 0.72));
  acUnits(s, c, ux0 + 0.06, uz0 + 0.06, ux1 - 0.2, uz1 - 0.1, ht, 3);
  if (ht > 5) tank(s, ux0 + 0.14, uz0 + 0.14, ht, 0.07, 0.12, 0x7d8288, 7);
  // retail strip on the podium front
  s.wallQuad(0, m + 0.05, 0.05, c.w - m - 0.3, podH - 0.06, m, 0.016, rgb(0xfae7b8), E_RETAIL_SOFT);
  door(s, 0, c.w - m - 0.18, m, 0, 0.13, podH * 0.7);
}

function bTower(s: GeoSink, c: Ctx) {
  const r = c.r;
  const ht = c.ht;
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, rgb(PAVE));
  const bodyHex = pal(c, 0, 0x8fa4bb);
  const trimHex = pal(c, 1, 0x5b6a7d);
  const wall = shade(bodyHex, 0.94 + r() * 0.12);
  const trim = shade(trimHex, 1);
  const podH = clamp(ht * 0.06, 0.35, 0.9);
  const pod = 0.06;
  // podium wider than the shaft
  s.box(pod, 0, pod, c.w - pod, podH, c.h - pod, wall, shade(bodyHex, 0.78));
  s.wallQuad(0, pod + 0.06, 0.08, c.w - pod - 0.06, podH - 0.08, pod, 0.016, rgb(0xffe9c2), E_RETAIL_SOFT);
  parapet(s, pod, pod, c.w - pod, c.h - pod, podH, shade(bodyHex, 0.7), 0.04, 0.05);
  // shaft with a setback
  const sm = 0.19 + r() * 0.04;
  const setY = podH + (ht - podH) * (0.66 + r() * 0.12);
  const sx0 = sm;
  const sz0 = sm;
  const sx1 = c.w - sm;
  const sz1 = c.h - sm;
  s.box(sx0, podH, sz0, sx1, setY, sz1, wall, shade(bodyHex, 0.8));
  const um = sm + 0.08;
  s.box(um, setY, um, c.w - um, ht, c.h - um, wall, shade(ROOF_DARK, 0.95));
  // mullion corner bands
  for (const [mx, mz] of [[sx0, sz0], [sx1, sz0], [sx0, sz1], [sx1, sz1]] as const) {
    s.box(mx - 0.022, podH, mz - 0.022, mx + 0.022, setY + 0.02, mz + 0.022, trim, trim);
  }
  const p = litProb(c);
  const fl1 = clamp(Math.round((setY - podH) / 0.55), 4, 14);
  const fl2 = clamp(Math.round((ht - setY) / 0.55), 2, 8);
  windowBox(s, c, sx0, sz0, sx1, sz1, podH + 0.08, setY - 0.08, fl1, p, 2);
  windowBox(s, c, um, um, c.w - um, c.h - um, setY + 0.08, ht - 0.1, fl2, p, 2);
  // crown
  parapet(s, um, um, c.w - um, c.h - um, ht, trim, 0.04, 0.07);
  const cx = c.w / 2;
  const cz = c.h / 2;
  s.box(cx - 0.1, ht, cz - 0.1, cx + 0.1, ht + 0.14, cz + 0.1, trim, trim);
  s.bar(cx, ht + 0.14, cz, cx, ht + 0.55 + r() * 0.3, cz, 0.016, 0.016, rgb(0xd8d8d8));
  if (s.collect && ht > 18) {
    const [wx, wy, wz] = s.toWorld(cx, ht + 0.6 + r() * 0.25, cz);
    pendingAnims.push({ kind: AnimKind.Beacon, x: wx, y: wy, z: wz, yaw: 0, speed: 1, phase: hash2(c.seedI, 17, 3), scale: 0.2 });
  }
}

function bSkyscraper(s: GeoSink, c: Ctx) {
  const r = c.r;
  const ht = c.ht;
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, rgb(PAVE));
  const glassHex = pal(c, 0, 0x4f7fa8);
  const trimHex = pal(c, 1, 0x2b4a63);
  const deco = r() < 0.4; // art-deco stepped variant vs modern glass
  const tiers = deco ? 3 : 2 + (r() < 0.5 ? 1 : 0);
  const p = litProb(c);
  const cx = c.w / 2;
  const cz = c.h / 2;
  let y = 0;
  let halfW = c.w / 2 - 0.07;
  const topHalf = halfW * Math.pow(deco ? 0.68 : 0.62, tiers - 1);
  const trim = shade(trimHex, 1);
  for (let t = 0; t < tiers; t++) {
    const frac = t === tiers - 1 ? 1 : 0.42 + 0.24 * t + r() * 0.08;
    const yTop = t === tiers - 1 ? ht : ht * frac;
    const wall = shade(glassHex, (deco ? 1.0 : 0.9) + t * 0.06);
    s.box(cx - halfW, y, cz - halfW, cx + halfW, yTop, cz + halfW, wall, shade(trimHex, 0.9));
    const fl = clamp(Math.round((yTop - y) / 0.62), 2, 16);
    windowBox(s, c, cx - halfW, cz - halfW, cx + halfW, cz + halfW, y + 0.08, yTop - 0.08, fl, p, halfW > 0.55 ? 3 : 2);
    for (const [mx, mz] of [[cx - halfW, cz - halfW], [cx + halfW, cz - halfW], [cx - halfW, cz + halfW], [cx + halfW, cz + halfW]] as const) {
      s.box(mx - 0.018, y, mz - 0.018, mx + 0.018, yTop, mz + 0.018, trim, trim);
    }
    parapet(s, cx - halfW, cz - halfW, cx + halfW, cz + halfW, yTop, trim, 0.035, 0.05);
    y = yTop;
    if (t < tiers - 1) halfW *= deco ? 0.68 : 0.62;
  }
  // lobby glazing
  s.wallQuad(0, 0.14, 0.06, c.w - 0.14, 0.5, cz - c.w / 2 + 0.07, 0.03, rgb(0xdff2ff), E_RETAIL_SOFT);
  // crown ring + spire
  const crown = neon(c, 1);
  s.wallQuad(0, cx - topHalf + 0.03, ht - 0.22, cx + topHalf - 0.03, ht - 0.1, cz - topHalf, 0.02, crown, E_SIGN_SOFT);
  s.wallQuad(2, cx - topHalf + 0.03, ht - 0.22, cx + topHalf - 0.03, ht - 0.1, cz + topHalf, 0.02, crown, E_SIGN_SOFT);
  s.wallQuad(1, cz - topHalf + 0.03, ht - 0.22, cz + topHalf - 0.03, ht - 0.1, cx + topHalf, 0.02, crown, E_SIGN_SOFT);
  s.wallQuad(3, cz - topHalf + 0.03, ht - 0.22, cz + topHalf - 0.03, ht - 0.1, cx - topHalf, 0.02, crown, E_SIGN_SOFT);
  const spireH = 0.6 + r() * 0.9;
  s.cyl(cx, cz, ht, ht + spireH, 0.05, 0.005, 5, rgb(0xcfd4d8));
  if (s.collect) {
    const [wx, wy, wz] = s.toWorld(cx, ht + spireH + 0.06, cz);
    pendingAnims.push({ kind: AnimKind.Beacon, x: wx, y: wy, z: wz, yaw: 0, speed: 1, phase: hash2(c.seedI, 19, 3), scale: 0.24 });
  }
}

/* -------------------------------- commercial ------------------------------ */

function bShop(s: GeoSink, c: Ctx) {
  const r = c.r;
  const wallHex = pal(c, 0, 0xe0c9a6);
  const accHex = pal(c, 1, 0xb05a4a);
  const wall = shade(wallHex, 0.92 + r() * 0.14);
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, rgb(PAVE));
  const storeys = c.level >= 3 ? 2 : 1;
  const hB = clamp(c.ht * 0.75, 0.5, 1.5) * (storeys === 2 ? 1 : 0.72);
  const bx0 = 0.07;
  const bz0 = 0.1;
  const bx1 = c.w - 0.07;
  const bz1 = c.h - 0.14;
  s.box(bx0, 0, bz0, bx1, hB, bz1, wall, shade(ROOF_DARK, 1.05));
  parapet(s, bx0, bz0, bx1, bz1, hB, shade(wallHex, 0.68));
  acUnits(s, c, bx0 + 0.05, bz0 + 0.05, bx1 - 0.2, bz1 - 0.16, hB, 2);
  // shopfront glass — glows early
  s.wallQuad(0, bx0 + 0.05, 0.04, bx1 - 0.05, hB * (storeys === 2 ? 0.4 : 0.62), bz0, 0.018, rgb(0xffe6ba), E_RETAIL);
  door(s, 0, (bx0 + bx1) / 2, bz0, 0, 0.12, hB * 0.4, 0x3a3f45);
  // signage band
  const sy0 = hB * (storeys === 2 ? 0.44 : 0.68);
  s.wallQuad(0, bx0 + 0.08, sy0, bx1 - 0.08, sy0 + 0.13, bz0, 0.022, neon(c), E_SIGN);
  // awning
  if (r() < 0.65) {
    const seg = 3;
    const aw = (bx1 - bx0 - 0.1) / seg;
    for (let k = 0; k < seg; k++) {
      const a0 = bx0 + 0.05 + k * aw;
      const col = k % 2 === 0 ? shade(accHex, 1) : rgb(WHITE);
      s.quad(a0 + aw, sy0 - 0.02, bz0 - 0.001, a0, sy0 - 0.02, bz0 - 0.001, a0, sy0 - 0.1, bz0 - 0.12, a0 + aw, sy0 - 0.1, bz0 - 0.12, col);
      s.quad(a0, sy0 - 0.02, bz0 - 0.001, a0 + aw, sy0 - 0.02, bz0 - 0.001, a0 + aw, sy0 - 0.1, bz0 - 0.12, a0, sy0 - 0.1, bz0 - 0.12, shade(0x555555, 1));
    }
  }
  if (storeys === 2) {
    windows(s, c, 0, bx0 + 0.06, bx1 - 0.06, bz0, hB * 0.58, hB - 0.06, 1, 3, litProb(c));
  }
  windows(s, c, 2, bx0 + 0.06, bx1 - 0.06, bz1, hB * 0.2, hB - 0.08, storeys, 2, litProb(c) * 0.6);
  // rear service yard
  s.flat(bx0 + 0.04, bz1 + 0.02, bx1 - 0.04, c.h - 0.03, 0.02, rgb(ASPHALT));
  crates(s, c, c.w * 0.5, c.h - 0.09, 0.02, 2);
}

function bMall(s: GeoSink, c: Ctx) {
  const r = c.r;
  const wallHex = pal(c, 0, 0xc8b89e);
  const wall = shade(wallHex, 0.95 + r() * 0.1);
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, rgb(PAVE));
  const hB = clamp(c.ht * 0.42, 0.7, 2.6);
  const bx0 = 0.06;
  const bz0 = 0.2;
  const bx1 = c.w - 0.06;
  const bz1 = c.h - 0.08;
  s.box(bx0, 0, bz0, bx1, hB, bz1, wall, shade(ROOF_DARK, 1.1));
  parapet(s, bx0, bz0, bx1, bz1, hB, shade(wallHex, 0.7));
  acUnits(s, c, bx0 + 0.08, bz0 + 0.1, bx1 - 0.24, bz1 - 0.2, hB, 4);
  // glass atrium entrance
  const ax0 = c.w * 0.32;
  const ax1 = c.w * 0.68;
  s.box(ax0, 0, bz0 - 0.1, ax1, hB * 1.18, bz0 + 0.1, rgb(GLASS), shade(GLASS, 1.3), E_RETAIL_SOFT);
  s.gable(ax0 - 0.02, bz0 - 0.12, ax1 + 0.02, bz0 + 0.12, hB * 1.18, 0.12, true, shade(METAL, 1), shade(METAL, 0.9));
  // long retail glass band + big sign pylon
  s.wallQuad(0, bx0 + 0.05, 0.05, ax0 - 0.04, hB * 0.5, bz0, 0.018, rgb(0xffe6ba), E_RETAIL);
  s.wallQuad(0, ax1 + 0.04, 0.05, bx1 - 0.05, hB * 0.5, bz0, 0.018, rgb(0xffe6ba), E_RETAIL);
  const px = bx1 - 0.1;
  s.box(px - 0.035, 0, bz0 - 0.16, px + 0.035, hB * 1.6, bz0 - 0.1, shade(0x555a60, 1), shade(0x555a60, 1));
  s.wallQuad(0, px - 0.09, hB * 1.15, px + 0.09, hB * 1.55, bz0 - 0.16, 0.012, neon(c), E_SIGN);
  // parking strips
  s.flat(bx0, 0.02, bx1, bz0 - 0.14, 0.018, rgb(ASPHALT));
  for (let k = 0; k < 5; k++) {
    const lx = lerp(bx0 + 0.08, bx1 - 0.1, k / 4);
    s.flat(lx, 0.03, lx + 0.016, bz0 - 0.16, 0.022, rgb(0xd8d8ce));
  }
}

function bOffice(s: GeoSink, c: Ctx) {
  const r = c.r;
  const ht = c.ht;
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, rgb(PAVE));
  const glassHex = pal(c, 0, 0x86a7bf);
  const bandHex = pal(c, 1, 0x2b4a63);
  const m = 0.11 + r() * 0.03;
  const bx0 = m;
  const bz0 = m;
  const bx1 = c.w - m;
  const bz1 = c.h - m;
  const lobbyH = clamp(ht * 0.12, 0.32, 0.6);
  const fl = clamp(Math.round((ht - lobbyH) / 0.5), 3, 16);
  const flH = (ht - lobbyH) / fl;
  const spandrel = shade(bandHex, 1.05);
  const glassBand = shade(glassHex, 1);
  // lobby
  s.box(bx0 - 0.03, 0, bz0 - 0.03, bx1 + 0.03, lobbyH, bz1 + 0.03, shade(bandHex, 0.85), shade(bandHex, 0.8));
  s.wallQuad(0, bx0 + 0.03, 0.05, bx1 - 0.03, lobbyH - 0.05, bz0 - 0.03, 0.018, rgb(0xd8ecff), E_RETAIL_SOFT);
  // banded shaft
  const p = litProb(c);
  s.box(bx0, lobbyH, bz0, bx1, ht, bz1, glassBand, shade(bandHex, 0.85));
  for (let f = 0; f < fl; f++) {
    const y0 = lobbyH + f * flH;
    s.box(bx0 - 0.014, y0 + flH * 0.72, bz0 - 0.014, bx1 + 0.014, y0 + flH, bz1 + 0.014, spandrel, spandrel);
  }
  windowBox(s, c, bx0, bz0, bx1, bz1, lobbyH + 0.03, ht - 0.05, fl, p, 3, E_WIN);
  parapet(s, bx0, bz0, bx1, bz1, ht, spandrel, 0.04, 0.06);
  acUnits(s, c, bx0 + 0.06, bz0 + 0.06, bx1 - 0.2, bz1 - 0.16, ht, 3);
  if (s.collect && ht > 18) {
    s.bar(c.w / 2, ht, c.h / 2, c.w / 2, ht + 0.32, c.h / 2, 0.014, 0.014, rgb(0xd8d8d8));
    const [wx, wy, wz] = s.toWorld(c.w / 2, ht + 0.35, c.h / 2);
    pendingAnims.push({ kind: AnimKind.Beacon, x: wx, y: wy, z: wz, yaw: 0, speed: 1, phase: hash2(c.seedI, 23, 3), scale: 0.18 });
  }
}

/* -------------------------------- industrial ------------------------------ */

function bFarm(s: GeoSink, c: Ctx) {
  const r = c.r;
  const cropSets: [number, number][] = [
    [0x8a9b52, 0x6f8442],
    [0xc9a86a, 0xb5924f],
    [0x7a8f4a, 0x95a45c],
    [0x9a6bbf, 0x84589f],
  ];
  const crop = cropSets[(r() * cropSets.length) | 0];
  // ploughed field rows
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.01, shade(0x8b6b3d, 0.9));
  const rows = 6 + ((r() * 3) | 0);
  const fz0 = 0.05;
  const fz1 = c.h - 0.05;
  for (let k = 0; k < rows; k++) {
    const rx = 0.06 + ((c.w - 0.12) * k) / rows;
    const wR = ((c.w - 0.12) / rows) * 0.55;
    s.box(rx, 0.01, fz0, rx + wR, 0.035, fz1, shade(crop[k % 2], 1), rgb(crop[k % 2]));
  }
  // barn with gambrel roof
  const barnHex = pal(c, 0, 0xb5432f);
  const bw = 0.34 + c.level * 0.03;
  const bd = 0.24 + c.level * 0.02;
  const bx = 0.1;
  const bz = 0.08;
  const wallH = 0.16 + c.level * 0.02;
  const barn = shade(barnHex, 0.95 + r() * 0.1);
  s.box(bx, 0, bz, bx + bw, wallH, bz + bd, barn, barn);
  {
    // gambrel: knee slopes then shallow top, ridge along X
    const x0 = bx - 0.02;
    const x1 = bx + bw + 0.02;
    const z0 = bz - 0.02;
    const z1 = bz + bd + 0.02;
    const kz0 = z0 + (z1 - z0) * 0.2;
    const kz1 = z1 - (z1 - z0) * 0.2;
    const zm = (z0 + z1) / 2;
    const hR = 0.18 + c.level * 0.02;
    const yk = wallH + hR * 0.6;
    const yt = wallH + hR;
    const roof = shade(0x8f8477, 1);
    s.quad(x1, wallH, z0, x0, wallH, z0, x0, yk, kz0, x1, yk, kz0, roof);
    s.quad(x1, yk, kz0, x0, yk, kz0, x0, yt, zm, x1, yt, zm, roof);
    s.quad(x0, wallH, z1, x1, wallH, z1, x1, yk, kz1, x0, yk, kz1, roof);
    s.quad(x0, yk, kz1, x1, yk, kz1, x1, yt, zm, x0, yt, zm, roof);
    // end caps (fan)
    const Q: [number, number][] = [[z0, wallH], [kz0, yk], [zm, yt], [kz1, yk], [z1, wallH]];
    for (let j = 1; j < Q.length - 1; j++) {
      s.tri(x0, Q[0][1], Q[0][0], x0, Q[j + 1][1], Q[j + 1][0], x0, Q[j][1], Q[j][0], barn);
      s.tri(x1, Q[0][1], Q[0][0], x1, Q[j][1], Q[j][0], x1, Q[j + 1][1], Q[j + 1][0], barn);
    }
    // hay door
    s.wallQuad(3, bz + bd * 0.35, wallH * 0.3, bz + bd * 0.65, wallH + 0.06, bx, 0.014, shade(barnHex, 0.55));
  }
  // silo
  if (c.level >= 2 || r() < 0.5) {
    const sx = bx + bw + 0.12;
    const sz = bz + 0.1;
    s.cyl(sx, sz, 0, 0.34 + c.level * 0.05, 0.07, 0.07, 8, rgb(0xc9cdd1), null);
    s.dome(sx, sz, 0.34 + c.level * 0.05, 0.07, 8, 3, shade(0x9aa2a8, 1));
  }
  // farmhouse
  if (c.level >= 2) {
    const fx = c.w - 0.32;
    const fz = c.h - 0.3;
    const fw2 = 0.22;
    const fd2 = 0.18;
    const wallC = rgb(0xe8e0cc);
    s.box(fx, 0, fz, fx + fw2, 0.16, fz + fd2, wallC, wallC);
    s.gable(fx - 0.015, fz - 0.015, fx + fw2 + 0.015, fz + fd2 + 0.015, 0.16, 0.09, true, shade(0x6f4e37, 1), wallC);
    s.wallQuad(0, fx + 0.04, 0.03, fx + 0.1, 0.1, fz, 0.012, rgb(GLASS), lit(c, 1, 1, 0, 0.8) ? E_WIN : 0);
  }
  fence(s, 0.03, 0.03, c.w - 0.03, c.h - 0.03, 0.01, 0.05, shade(TRUNK, 1.25));
  if (r() < 0.7) treeBlob(s, c.w - 0.14, 0.14, 0.01, 0.9, c.seedI + 7);
}

function bWorkshop(s: GeoSink, c: Ctx) {
  const r = c.r;
  const wallHex = pal(c, 0, 0xb8b0a4);
  const wall = shade(wallHex, 0.92 + r() * 0.14);
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, rgb(ASPHALT));
  const hB = clamp(c.ht * 0.24, 0.42, 0.9);
  const bx0 = 0.08;
  const bz0 = 0.12;
  const bx1 = c.w - 0.24;
  const bz1 = c.h - 0.1;
  s.box(bx0, 0, bz0, bx1, hB, bz1, wall, shade(wallHex, 0.75));
  // monitor roof with clerestory
  const mx0 = bx0 + (bx1 - bx0) * 0.25;
  const mx1 = bx1 - (bx1 - bx0) * 0.25;
  s.box(mx0, hB, bz0 + 0.08, mx1, hB + 0.1, bz1 - 0.08, rgb(GLASS), shade(wallHex, 0.7), E_WIN_DIM);
  s.gable(mx0 - 0.02, bz0 + 0.06, mx1 + 0.02, bz1 - 0.06, hB + 0.1, 0.07, true, shade(ROOF_DARK, 1.1), shade(wallHex, 0.7));
  // roller door + workshop window
  s.wallQuad(0, bx0 + 0.06, 0, bx0 + 0.34, hB * 0.66, bz0, 0.014, shade(0x8e939a, 1));
  s.wallQuad(0, bx0 + 0.4, hB * 0.25, bx1 - 0.06, hB * 0.6, bz0, 0.014, rgb(GLASS), lit(c, 0, 2, 0, 0.6) ? E_WIN : 0);
  // yard
  crates(s, c, bx1 + 0.14, c.h * 0.4, 0.012, 3);
  fence(s, 0.04, 0.04, c.w - 0.04, c.h - 0.04, 0.012, 0.08, shade(0x777d84, 1), 0, bx0 + 0.02, bx0 + 0.38);
  chimney(s, bx1 - 0.1, bz1 - 0.14, hB, 0.16, 0.05, 0x6a6f75);
}

function bFactory(s: GeoSink, c: Ctx) {
  const r = c.r;
  const wallHex = pal(c, 0, 0xa8a49a);
  const wall = shade(wallHex, 0.9 + r() * 0.16);
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, rgb(ASPHALT));
  const hB = clamp(c.ht * 0.28, 0.5, 1.6);
  const bx0 = 0.07;
  const bz0 = 0.1;
  const bx1 = c.w - 0.07;
  const bz1 = c.h - 0.3;
  s.box(bx0, 0, bz0, bx1, hB, bz1, wall, shade(wallHex, 0.7));
  // sawtooth roof
  const teeth = 3 + ((r() * 2) | 0);
  const tD = (bz1 - bz0) / teeth;
  const th = 0.14;
  const roof = shade(wallHex, 0.68);
  const glassC = rgb(GLASS);
  for (let k = 0; k < teeth; k++) {
    const zA = bz0 + k * tD;
    const zB = zA + tD;
    s.wallQuad(0, bx0 + 0.01, hB, bx1 - 0.01, hB + th, zA, -0.001, glassC, E_WIN_DIM);
    s.quad(bx1, hB + th, zA, bx0, hB + th, zA, bx0, hB, zB, bx1, hB, zB, roof);
    s.tri(bx0, hB, zA, bx0, hB, zB, bx0, hB + th, zA, wall);
    s.tri(bx1, hB, zB, bx1, hB, zA, bx1, hB + th, zA, wall);
  }
  // chimneys with collar (smoke anchors at their tips)
  const nCh = c.level >= 2 ? 2 : 1;
  for (let k = 0; k < nCh; k++) {
    const chx = bx0 + 0.16 + k * 0.3;
    s.cyl(chx, bz1 - 0.12, hB, hB + 0.5 + c.level * 0.12, 0.05, 0.04, 7, shade(0x8a8078, 1), shade(0x5a544e, 1));
    s.cyl(chx, bz1 - 0.12, hB + 0.42 + c.level * 0.12, hB + 0.5 + c.level * 0.12, 0.048, 0.048, 7, shade(0xb0453a, 1), null);
  }
  // tank + pipes
  tank(s, bx1 - 0.14, bz0 + 0.14, 0, 0.09, 0.3, 0x9aa2a8);
  s.bar(bx1 - 0.14, 0.28, bz0 + 0.14, bx1 - 0.02, hB * 0.5, bz0 + 0.3, 0.02, 0.02, rgb(METAL));
  // loading bay
  const ly = 0.14;
  s.box(bx0 + 0.05, 0, bz1, bx0 + 0.55, ly, bz1 + 0.12, shade(CONCRETE, 0.85), rgb(CONCRETE));
  s.box(bx0 + 0.05, ly + 0.14, bz1, bx0 + 0.55, ly + 0.18, bz1 + 0.14, shade(0x555a60, 1), shade(0x555a60, 1));
  s.wallQuad(2, bx0 + 0.1, 0.02, bx0 + 0.28, ly + 0.12, bz1, 0.013, shade(0x777d84, 1));
  s.wallQuad(2, bx0 + 0.32, 0.02, bx0 + 0.5, ly + 0.12, bz1, 0.013, shade(0x777d84, 1));
  crates(s, c, c.w - 0.24, c.h - 0.16, 0.012, 3);
}

function bRefinery(s: GeoSink, c: Ctx) {
  const r = c.r;
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, shade(ASPHALT, 1.1));
  const steel = pal(c, 0, 0xb0b6b8);
  // big storage tanks
  const nT = 2 + ((r() * 2) | 0);
  for (let k = 0; k < nT; k++) {
    const txp = 0.2 + (k % 2) * 0.34;
    const tzp = c.h - 0.24 - ((k / 2) | 0) * 0.3;
    tank(s, txp, tzp, 0, 0.12 + r() * 0.03, 0.2 + r() * 0.1, steel, 10);
  }
  // distillation columns with platform rings
  const colH = clamp(c.ht * 0.75, 1.2, 2.2);
  for (let k = 0; k < 2; k++) {
    const cxp = c.w - 0.2 - k * 0.22;
    const czp = 0.2 + k * 0.12;
    s.cyl(cxp, czp, 0, colH - k * 0.3, 0.055, 0.05, 8, shade(steel, 1.05), shade(steel, 0.85));
    for (let pRing = 1; pRing <= 2; pRing++) {
      const py = ((colH - k * 0.3) * pRing) / 3;
      s.cyl(cxp, czp, py, py + 0.02, 0.075, 0.075, 8, shade(0x6a7075, 1), shade(0x6a7075, 1));
    }
  }
  // flare stack with a warm glowing tip
  const fx = c.w * 0.5;
  const fz = 0.12;
  s.cyl(fx, fz, 0, colH * 1.15, 0.028, 0.024, 6, shade(steel, 0.9), null);
  s.box(fx - 0.035, colH * 1.15, fz - 0.035, fx + 0.035, colH * 1.15 + 0.07, fz + 0.035, rgb(0xffa63d), rgb(0xffc95e), E_SIGN_SOFT);
  // safety-striped chimney
  const sx = 0.16;
  const sz = 0.16;
  s.cyl(sx, sz, 0, colH, 0.05, 0.042, 7, rgb(WHITE), null);
  s.cyl(sx, sz, colH * 0.55, colH * 0.65, 0.052, 0.05, 7, shade(0xb0453a, 1), null);
  s.cyl(sx, sz, colH * 0.85, colH * 0.95, 0.05, 0.046, 7, shade(0xb0453a, 1), null);
  // pipe racks
  const py = 0.12;
  s.bar(0.14, py, c.h - 0.3, c.w - 0.2, py, 0.28, 0.018, 0.018, rgb(METAL));
  s.bar(0.14, py + 0.05, c.h - 0.3, c.w - 0.2, py + 0.05, 0.28, 0.018, 0.018, shade(0xc9a44a, 1));
  for (let k = 0; k < 3; k++) {
    const t = 0.2 + k * 0.3;
    const bxp = lerp(0.14, c.w - 0.2, t);
    const bzp = lerp(c.h - 0.3, 0.28, t);
    s.bar(bxp, 0, bzp, bxp, py + 0.05, bzp, 0.015, 0.015, shade(0x6a7075, 1));
  }
  // process hall
  const wall = shade(steel, 0.9);
  s.box(0.08, 0, 0.34, 0.5, 0.34, c.h - 0.5, wall, shade(steel, 0.72));
  windows(s, c, 0, 0.12, 0.46, 0.34, 0.1, 0.28, 1, 2, 0.6, E_WIN_DIM);
  fence(s, 0.04, 0.04, c.w - 0.04, c.h - 0.04, 0.012, 0.08, shade(0x777d84, 1));
}

function bWarehouse(s: GeoSink, c: Ctx) {
  const r = c.r;
  const wallHex = pal(c, 0, 0x9fa3a6);
  const wall = shade(wallHex, 0.92 + r() * 0.12);
  s.flat(0.02, 0.02, c.w - 0.02, c.h - 0.02, 0.012, rgb(ASPHALT));
  const hB = clamp(c.ht * 0.16, 0.4, 0.85);
  const military = c.key === 'x_military';
  const bx0 = 0.07;
  const bz0 = 0.1;
  const bx1 = c.w - 0.07;
  const bz1 = military ? c.h * 0.5 : c.h - 0.34;
  const bodyC = military ? shade(0x6b7a52, 1) : wall;
  s.box(bx0, 0, bz0, bx1, hB, bz1, bodyC, shade(military ? 0x5a6845 : wallHex, 0.72));
  // low arched (hipped) roof
  s.hip(bx0 - 0.02, bz0 - 0.02, bx1 + 0.02, bz1 + 0.02, hB, 0.1, military ? shade(0x515e40, 1) : shade(wallHex, 0.66), 0.14);
  // roller doors along the front
  const nD = clamp(Math.round((bx1 - bx0) / 0.4), 2, 6);
  for (let k = 0; k < nD; k++) {
    const dx = bx0 + 0.1 + k * ((bx1 - bx0 - 0.2) / nD);
    s.wallQuad(0, dx, 0.02, dx + (bx1 - bx0 - 0.2) / nD - 0.08, hB * 0.7, bz0, 0.014, shade(0x84898f, 1));
  }
  // gutter band
  s.box(bx0 - 0.012, hB - 0.05, bz0 - 0.012, bx1 + 0.012, hB - 0.02, bz1 + 0.012, shade(wallHex, 0.6), shade(wallHex, 0.6));
  // yard
  crates(s, c, c.w * 0.3, bz1 + 0.24, 0.012, military ? 2 : 4);
  crates(s, c, c.w * 0.7, bz1 + 0.2, 0.012, 3);
  fence(s, 0.04, 0.04, c.w - 0.04, c.h - 0.04, 0.012, 0.09, shade(0x777d84, 1), 0, bx0 + 0.05, bx1 - 0.05);
  if (military) {
    // guard tower + helipad + radar
    const gx = c.w - 0.4;
    const gz = c.h - 0.42;
    for (const [lx, lz] of [[-0.08, -0.08], [0.08, -0.08], [-0.08, 0.08], [0.08, 0.08]] as const) {
      s.bar(gx + lx, 0, gz + lz, gx + lx * 0.7, 0.5, gz + lz * 0.7, 0.02, 0.02, shade(0x5a6845, 1));
    }
    s.box(gx - 0.11, 0.5, gz - 0.11, gx + 0.11, 0.66, gz + 0.11, shade(0x6b7a52, 1), shade(0x515e40, 1));
    s.wallQuad(0, gx - 0.08, 0.54, gx + 0.08, 0.62, gz - 0.11, 0.012, rgb(GLASS), E_WIN_DIM);
    s.pyramid(gx, gz, 0.26, 0.26, 0.66, 0.08, shade(0x515e40, 1));
    const hx = 0.5;
    const hz = c.h - 0.55;
    s.disc(hx, hz, 0.018, 0.34, 12, shade(0x4a4e53, 1));
    s.box(hx - 0.16, 0.02, hz - 0.03, hx + 0.16, 0.028, hz + 0.03, rgb(0xd8d8ce), rgb(0xd8d8ce));
    s.box(hx - 0.16, 0.02, hz - 0.14, hx - 0.1, 0.028, hz + 0.14, rgb(0xd8d8ce), rgb(0xd8d8ce));
    s.box(hx + 0.1, 0.02, hz - 0.14, hx + 0.16, 0.028, hz + 0.14, rgb(0xd8d8ce), rgb(0xd8d8ce));
    if (s.collect) {
      const [wx, wy, wz] = s.toWorld(gx, 0.8, gz);
      pendingAnims.push({ kind: AnimKind.Radar, x: wx, y: wy, z: wz, yaw: 0, speed: 1.4, phase: hash2(c.seedI, 31, 3), scale: 0.5 });
    }
    flagPole(s, c, 0.24, 0.24, 0.012, 0.8);
  }
}

/* ---------------------------------- power --------------------------------- */

function bPowerplant(s: GeoSink, c: Ctx) {
  const r = c.r;
  const W = c.w;
  const H = c.h;
  s.flat(0.03, 0.03, W - 0.03, H - 0.03, 0.014, shade(CONCRETE, 0.8));
  fence(s, 0.05, 0.05, W - 0.05, H - 0.05, 0.014, 0.1, shade(0x777d84, 1), 0, W * 0.35, W * 0.65);
  const key = c.key;
  if (key === 'p_hydro') {
    // dam wall across the water side (front)
    const wallC = shade(CONCRETE, 0.95);
    s.quad(W - 0.06, 0.02, 0.05, 0.06, 0.02, 0.05, 0.18, c.ht * 0.55, 0.55, W - 0.18, c.ht * 0.55, 0.55, wallC);
    s.box(0.06, 0, 0.05, W - 0.06, 0.1, 0.2, wallC, wallC);
    s.box(0.14, 0, 0.5, W - 0.14, c.ht * 0.55, 0.72, wallC, shade(CONCRETE, 0.8));
    // spill gates
    for (let k = 0; k < 3; k++) {
      const gx = 0.22 + k * ((W - 0.44) / 2.2);
      s.wallQuad(0, gx, 0.06, gx + 0.16, c.ht * 0.4, 0.5, 0.014, shade(0x4f6b7d, 1), E_WIN_DIM);
    }
    // intake towers
    s.cyl(0.3, 0.4, 0, c.ht * 0.72, 0.09, 0.08, 7, wallC, shade(CONCRETE, 0.85));
    s.cyl(W - 0.3, 0.4, 0, c.ht * 0.72, 0.09, 0.08, 7, wallC, shade(CONCRETE, 0.85));
    // powerhouse
    s.box(0.3, 0, 0.8, W - 0.3, 0.5, H - 0.2, shade(0x9aa8b0, 1), shade(0x77848c, 1));
    windows(s, c, 2, 0.4, W - 0.4, H - 0.2, 0.14, 0.42, 1, 4, 0.8, E_WIN);
    return;
  }
  if (key === 'p_nuclear') {
    // twin hyperboloid cooling towers
    for (const txp of [W * 0.3, W * 0.7]) {
      const tz = H * 0.62;
      const hT = c.ht * 0.9;
      s.cyl(txp, tz, 0, hT * 0.68, 0.62, 0.4, 11, rgb(0xdfe3e6), null);
      s.cyl(txp, tz, hT * 0.68, hT, 0.4, 0.46, 11, rgb(0xd4d9dc), null);
      s.cyl(txp, tz, hT, hT + 0.001, 0.46, 0.3, 11, shade(0x30363b, 1), null);
      if (s.collect) {
        const [wx, wy, wz] = s.toWorld(txp + 0.46, hT + 0.06, tz);
        pendingAnims.push({ kind: AnimKind.Beacon, x: wx, y: wy, z: wz, yaw: 0, speed: 1, phase: hash2(c.seedI, 41 + txp * 10, 3), scale: 0.22 });
      }
    }
    // containment dome + turbine hall
    s.cyl(W * 0.5, H * 0.22, 0, 0.5, 0.34, 0.34, 10, rgb(0xe8ebee), null);
    s.dome(W * 0.5, H * 0.22, 0.5, 0.34, 10, 4, rgb(0xdfe3e6));
    s.box(0.14, 0, 0.05, W - 0.14, 0.42, 0.34, shade(0xb8c0c6, 1), shade(0x8f979d, 1));
    windows(s, c, 0, 0.24, W - 0.24, 0.05, 0.12, 0.34, 1, 6, 0.8, E_WIN);
    return;
  }
  if (key === 'p_fusion') {
    // torus hall: glowing ring dome + coil pylons
    const cx = W * 0.5;
    const cz = H * 0.52;
    s.cyl(cx, cz, 0, 0.5, 1.05, 1.05, 14, shade(0xc9d2d8, 1), shade(0xaab4bb, 1));
    s.dome(cx, cz, 0.5, 1.05, 14, 5, shade(0xd8e0e5, 1), 0.75);
    // glowing equator ring
    s.cyl(cx, cz, 0.42, 0.54, 1.07, 1.07, 14, rgb(0x3ddbd9), null, E_SIGN_SOFT);
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      const px = cx + Math.cos(a) * 1.2;
      const pz = cz + Math.sin(a) * 1.2;
      s.box(px - 0.06, 0, pz - 0.06, px + 0.06, 0.7 + (k % 2) * 0.15, pz + 0.06, shade(0x77848c, 1), rgb(0x3ddbd9), k % 2 === 0 ? E_WIN_DIM : 0);
    }
    s.box(0.2, 0, H - 0.6, W - 0.2, 0.46, H - 0.1, shade(0xb8c0c6, 1), shade(0x8f979d, 1));
    windows(s, c, 0, 0.3, W - 0.3, H - 0.6, 0.12, 0.4, 1, 6, 0.85, E_WIN);
    if (s.collect) {
      const [wx, wy, wz] = s.toWorld(cx, 0.5 + 1.05 * 0.78, cz);
      pendingAnims.push({ kind: AnimKind.Beacon, x: wx, y: wy, z: wz, yaw: 0, speed: 1, phase: hash2(c.seedI, 43, 3), scale: 0.24 });
    }
    return;
  }
  if (key === 'p_microwave') {
    // huge upward dish + receiver mast
    const cx = W * 0.5;
    const cz = H * 0.48;
    s.cyl(cx, cz, 0, 0.3, 0.5, 0.5, 12, shade(CONCRETE, 0.9), shade(CONCRETE, 0.8));
    s.cyl(cx, cz, 0.3, 1.15, 0.28, 1.25, 14, shade(0xd4d9dc, 1), null);       // outer shell
    s.cyl(cx, cz, 1.16, 0.36, 1.22, 0.24, 14, shade(0xf0f3f5, 1), null);      // inner (flipped by winding)
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2 + 0.5;
      s.bar(cx + Math.cos(a) * 1.05, 1.05, cz + Math.sin(a) * 1.05, cx, c.ht * 0.16 + 1.5, cz, 0.022, 0.022, rgb(METAL));
    }
    s.box(cx - 0.07, c.ht * 0.16 + 1.44, cz - 0.07, cx + 0.07, c.ht * 0.16 + 1.62, cz + 0.07, rgb(0xff8b3d), rgb(0xffc95e), E_SIGN);
    s.box(0.16, 0, H - 0.52, W * 0.55, 0.4, H - 0.08, shade(0xb8c0c6, 1), shade(0x8f979d, 1));
    windows(s, c, 0, 0.24, W * 0.5, H - 0.52, 0.1, 0.34, 1, 4, 0.8, E_WIN);
    return;
  }
  // coal / gas / oil — turbine hall + stacks + fuel storage
  const dirty = key === 'p_coal';
  const oil = key === 'p_oil';
  const hallHex = pal(c, 0, dirty ? 0x8d857c : 0xb0b6b8);
  const hall = shade(hallHex, 0.95);
  const hallH = c.ht * 0.32;
  s.box(0.14, 0, H * 0.42, W - 0.14, hallH, H - 0.14, hall, shade(hallHex, 0.72));
  s.gable(0.12, H * 0.42 - 0.02, W - 0.12, H - 0.12, hallH, 0.16, true, shade(hallHex, 0.66), hall);
  windows(s, c, 0, 0.3, W - 0.3, H * 0.42, hallH * 0.35, hallH * 0.85, 1, 6, 0.8, E_WIN);
  const nSt = dirty ? 2 : 1;
  for (let k = 0; k < nSt; k++) {
    const sx = W * 0.3 + k * W * 0.24;
    const sz = H * 0.28;
    s.cyl(sx, sz, 0, c.ht, 0.11, 0.08, 8, shade(0x9d968d, 1), shade(0x4a4540, 1));
    s.cyl(sx, sz, c.ht * 0.82, c.ht * 0.9, 0.095, 0.088, 8, shade(0xb0453a, 1), null);
    if (s.collect && k === 0) {
      const [wx, wy, wz] = s.toWorld(sx, c.ht + 0.08, sz);
      pendingAnims.push({ kind: AnimKind.Beacon, x: wx, y: wy, z: wz, yaw: 0, speed: 1, phase: hash2(c.seedI, 47, 3), scale: 0.2 });
    }
  }
  if (dirty) {
    // coal pile + conveyor
    s.pyramid(W * 0.72, H * 0.2, 0.7, 0.5, 0.014, 0.3, shade(0x2c2e30, 1));
    s.bar(W * 0.72, 0.26, H * 0.2, W * 0.5, hallH * 0.8, H * 0.45, 0.05, 0.02, shade(0x6a7075, 1));
  } else if (oil) {
    tank(s, W * 0.68, H * 0.18, 0, 0.22, 0.28, 0x9aa2a8, 11);
    tank(s, W * 0.86 - 0.12, H * 0.3, 0, 0.15, 0.22, 0x9aa2a8, 10);
  } else {
    tank(s, W * 0.74, H * 0.2, 0, 0.18, 0.24, 0xc9cdd1, 10);
    s.bar(W * 0.74, 0.1, H * 0.2, W * 0.5, 0.1, H * 0.45, 0.02, 0.02, shade(0xc9a44a, 1));
  }
}

function bWindturbine(s: GeoSink, c: Ctx) {
  const r = c.r;
  const hubH = c.ht * 0.82;
  const cx = c.w / 2;
  const cz = c.h / 2;
  s.disc(cx, cz, 0.016, 0.22, 8, shade(CONCRETE, 0.9));
  s.cyl(cx, cz, 0, hubH, 0.075, 0.038, 8, rgb(0xeef1f3), null);
  // nacelle
  const yaw = r() * Math.PI * 2;
  const nx = cx - Math.sin(yaw) * 0.02;
  const nz = cz - Math.cos(yaw) * 0.02;
  s.boxR(nx, nz, 0.14, 0.3, hubH - 0.07, hubH + 0.07, yaw, rgb(0xe2e6e9), shade(0xb0453a, 1));
  door(s, 0, cx, cz - 0.075, 0, 0.09, 0.16, 0x51606b);
  if (s.collect) {
    // rotor hub sits on the front of the nacelle
    const fx = cx + Math.sin(yaw) * 0.17;
    const fz = cz + Math.cos(yaw) * 0.17;
    const [wx, wy, wz] = s.toWorld(fx, hubH, fz);
    pendingAnims.push({
      kind: AnimKind.Rotor,
      x: wx, y: wy, z: wz,
      yaw: s.worldYaw(Math.atan2(Math.sin(yaw), Math.cos(yaw))),
      speed: (0.9 + r() * 1.3) * (r() < 0.5 ? 1 : -1),
      phase: r() * Math.PI * 2,
      scale: c.ht * 0.34,
    });
  }
}

function bSolarfarm(s: GeoSink, c: Ctx) {
  const r = c.r;
  s.flat(0.03, 0.03, c.w - 0.03, c.h - 0.03, 0.012, shade(0xb9a37a, 0.9));
  const rows = 4;
  const cols = 3;
  const panel = shade(0x1d3a5f, 1.1);
  for (let j = 0; j < rows; j++) {
    const pz = 0.3 + j * ((c.h - 0.7) / (rows - 1));
    for (let k = 0; k < cols; k++) {
      const px = 0.4 + k * ((c.w - 0.8) / (cols - 1));
      // rack posts
      s.bar(px - 0.28, 0, pz, px - 0.28, 0.09, pz, 0.014, 0.014, rgb(METAL));
      s.bar(px + 0.28, 0, pz, px + 0.28, 0.09, pz, 0.014, 0.014, rgb(METAL));
      // tilted panel (south-facing)
      s.bar(px - 0.34, 0.2, pz - 0.14, px + 0.34, 0.09, pz + 0.14, 0.02, 0.34, panel);
    }
  }
  // inverter hut
  s.box(c.w - 0.4, 0, c.h - 0.32, c.w - 0.12, 0.2, c.h - 0.1, shade(CONCRETE, 0.95), shade(CONCRETE, 0.8));
  fence(s, 0.05, 0.05, c.w - 0.05, c.h - 0.05, 0.012, 0.08, shade(0x777d84, 1));
}

/* ---------------------------------- water --------------------------------- */

function bWatertower(s: GeoSink, c: Ctx) {
  const r = c.r;
  const cx = c.w / 2;
  const cz = c.h / 2;
  if (c.key === 'w_pump') {
    s.flat(0.04, 0.04, c.w - 0.04, c.h - 0.04, 0.014, shade(CONCRETE, 0.85));
    // pump house
    const wall = shade(pal(c, 0, 0x8fb3c9), 1);
    s.box(0.3, 0, 0.5, c.w - 0.3, 0.45, c.h - 0.24, wall, shade(0x5b7a8c, 1));
    s.gable(0.28, 0.48, c.w - 0.28, c.h - 0.22, 0.45, 0.14, true, shade(0x51606b, 1), wall);
    windows(s, c, 0, 0.4, c.w - 0.4, 0.5, 0.14, 0.38, 1, 2, 0.7, E_WIN);
    // intake pipe running out the front (toward the water)
    s.bar(cx, 0.12, 0.5, cx, 0.08, -0.12, 0.05, 0.05, rgb(METAL));
    s.cyl(cx, 0.16, 0, 0.24, 0.1, 0.1, 8, shade(METAL, 0.9), shade(METAL, 0.8));
    // small pressure tank
    tank(s, c.w - 0.34, c.h - 0.5, 0, 0.11, 0.2, 0x9fc3d4, 9);
    return;
  }
  // classic elevated tank on legs
  s.disc(cx, cz, 0.016, 0.34, 9, shade(CONCRETE, 0.9));
  // Keep the catalog height as an overall silhouette budget.  A previous
  // proportional split could turn bad/legacy height data into giant stilts.
  const totalH = clamp(c.ht, 6, 9);
  const legH = clamp(totalH * 0.48, 3, 4.25);
  const tankH = clamp(totalH * 0.34, 2.1, 2.8);
  const tankR = Math.min(c.w, c.h) * 0.31;
  const legC = shade(0x7d8288, 1);
  for (const [lx, lz] of [[-0.26, -0.26], [0.26, -0.26], [-0.26, 0.26], [0.26, 0.26]] as const) {
    s.bar(cx + lx, 0, cz + lz, cx + lx * 0.45, legH, cz + lz * 0.45, 0.028, 0.028, legC);
  }
  // cross-bracing
  s.bar(cx - 0.26, 0.05, cz - 0.26, cx + 0.12, legH * 0.55, cz - 0.12, 0.014, 0.014, legC);
  s.bar(cx + 0.26, 0.05, cz - 0.26, cx - 0.12, legH * 0.55, cz - 0.12, 0.014, 0.014, legC);
  // riser + catwalk + tank + cap
  s.cyl(cx, cz, 0, legH, 0.05, 0.05, 7, shade(0x6a7075, 1), null);
  s.cyl(cx, cz, legH - 0.04, legH, tankR + 0.04, tankR + 0.04, 12, shade(0x6a7075, 1), null);
  const tankHex = pal(c, 0, 0xc9cdd1);
  s.cyl(cx, cz, legH, legH + tankH * 0.22, tankR * 0.72, tankR, 12, shade(tankHex, 0.92), null);
  s.cyl(cx, cz, legH + tankH * 0.22, legH + tankH * 0.78, tankR, tankR, 12, shade(tankHex, 1), null);
  s.cyl(cx, cz, legH + tankH * 0.78, legH + tankH, tankR, tankR * 0.62, 12, shade(tankHex, 0.94), null);
  s.cyl(cx, cz, legH + tankH, legH + tankH + 0.18, tankR * 0.62, 0.02, 12, shade(tankHex, 0.88), null);
  if (s.collect && c.ht > 7) {
    const [wx, wy, wz] = s.toWorld(cx, legH + tankH + 0.34, cz);
    pendingAnims.push({ kind: AnimKind.Beacon, x: wx, y: wy, z: wz, yaw: 0, speed: 1, phase: hash2(c.seedI, 53, 3), scale: 0.16 });
  }
}

/* ------------------------------ civic + services -------------------------- */

function bCivic(s: GeoSink, c: Ctx) {
  const key = c.key;
  if (key === 'w_treat') return bTreatment(s, c);
  if (key === 'w_desal') return bDesal(s, c);
  if (key === 's_prison') return bPrison(s, c);
  const r = c.r;
  const W = c.w;
  const H = c.h;
  const police = key.startsWith('s_police');
  const fire = key.startsWith('s_fire');
  const library = key === 'e_library';
  const wallHex = police ? 0xc4cdd4 : fire ? 0xc75548 : pal(c, 0, 0xd8d2c4);
  const wall = shade(wallHex, 0.96 + r() * 0.08);
  const trim = shade(wallHex, 0.72);
  s.flat(0.02, 0.02, W - 0.02, H - 0.02, 0.012, rgb(PAVE));
  const hB = clamp(c.ht * 0.45, 0.6, 3.2);
  const bx0 = 0.12;
  const bz0 = 0.22;
  const bx1 = W - 0.12;
  const bz1 = H - 0.14;
  s.box(bx0, 0, bz0, bx1, hB, bz1, wall, shade(wallHex, 0.8));
  parapet(s, bx0, bz0, bx1, bz1, hB, trim);
  const p = 0.75;
  const fl = clamp(Math.round(hB / 0.5), 1, 5);
  windows(s, c, 0, bx0 + 0.08, bx1 - 0.08, bz0, 0.28, hB - 0.08, fl, clamp(W * 2, 2, 6) | 0, p);
  windows(s, c, 1, bz0 + 0.08, bz1 - 0.08, bx1, 0.28, hB - 0.08, fl, clamp(H * 2, 2, 5) | 0, p * 0.8);
  windows(s, c, 3, bz0 + 0.08, bz1 - 0.08, bx0, 0.28, hB - 0.08, fl, clamp(H * 2, 2, 5) | 0, p * 0.8);
  // entrance steps + portico
  const ex0 = W * 0.5 - 0.24;
  const ex1 = W * 0.5 + 0.24;
  s.box(ex0, 0, bz0 - 0.14, ex1, 0.04, bz0, rgb(PAVE), rgb(PAVE));
  s.box(ex0 + 0.03, 0.04, bz0 - 0.08, ex1 - 0.03, 0.08, bz0, rgb(PAVE), rgb(PAVE));
  if (library || (!police && !fire)) {
    const nCol = library ? 4 : 2;
    for (let k = 0; k < nCol; k++) {
      const px = lerp(ex0 + 0.06, ex1 - 0.06, k / (nCol - 1));
      column(s, px, bz0 - 0.09, 0.08, hB * 0.62, 0.028, rgb(WHITE));
    }
    s.gable(ex0 - 0.02, bz0 - 0.13, ex1 + 0.02, bz0 + 0.05, hB * 0.7, 0.12, true, trim, rgb(WHITE));
  }
  door(s, 0, W * 0.5, bz0, 0.08, 0.18, 0.3, 0x4a4034);
  if (police) {
    // blue band + badge + light bar
    s.wallQuad(0, bx0 + 0.05, hB * 0.42, bx1 - 0.05, hB * 0.56, bz0, 0.02, rgb(0x2d5f9e), E_SIGN_SOFT);
    s.disc(W * 0.5, bz0 - 0.001, hB + 0.0, 0.001, 4, trim); // noop-scale guard
    s.box(W * 0.5 - 0.09, hB, W === H ? bz0 + 0.1 : bz0 + 0.1, W * 0.5 + 0.09, hB + 0.05, bz0 + 0.2, rgb(0x2d5f9e), rgb(0x4f8fd4), E_SIGN_SOFT);
    flagPole(s, c, bx1 - 0.1, bz0 - 0.1, 0.012, 0.6);
  }
  if (fire) {
    // big red engine doors + hose tower + bell
    for (let k = 0; k < 2; k++) {
      const dx = bx0 + 0.14 + k * ((bx1 - bx0 - 0.28) / 1.4);
      s.wallQuad(0, dx, 0.02, dx + (bx1 - bx0) * 0.26, hB * 0.6, bz0, 0.018, shade(0xd4d9dc, 1));
    }
    s.box(bx1 - 0.24, 0, bz1 - 0.24, bx1 - 0.04, hB * 1.9, bz1 - 0.04, wall, shade(0x8f3d33, 1));
    s.wallQuad(0, bx1 - 0.2, hB * 1.5, bx1 - 0.08, hB * 1.7, bz1 - 0.24, 0.014, rgb(0xffc93c), E_SIGN_SOFT);
  }
  if (library) {
    s.wallQuad(0, ex0 + 0.05, hB * 0.72, ex1 - 0.05, hB * 0.84, bz0, 0.024, shade(0xc9a44a, 1.1), E_SIGN_SOFT);
  }
  if (key === 's_police_hq' || key === 's_fire_hq') {
    s.bar(W * 0.5, hB, H * 0.6, W * 0.5, hB + 0.7, H * 0.6, 0.016, 0.016, rgb(0xd8d8d8));
    if (s.collect) {
      const [wx, wy, wz] = s.toWorld(W * 0.5, hB + 0.74, H * 0.6);
      pendingAnims.push({ kind: AnimKind.Beacon, x: wx, y: wy, z: wz, yaw: 0, speed: 1, phase: hash2(c.seedI, 61, 3), scale: 0.16 });
    }
  }
}

function bTreatment(s: GeoSink, c: Ctx) {
  const r = c.r;
  s.flat(0.03, 0.03, c.w - 0.03, c.h - 0.03, 0.014, shade(CONCRETE, 0.85));
  // circular clarifier basins
  for (const [bx, bz] of [[c.w * 0.3, c.h * 0.62], [c.w * 0.7, c.h * 0.62]] as const) {
    s.cyl(bx, bz, 0, 0.12, 0.5, 0.5, 12, shade(CONCRETE, 0.95), null);
    s.disc(bx, bz, 0.1, 0.46, 12, shade(0x3f7f8f, 1.1));
    s.bar(bx - 0.46, 0.14, bz, bx + 0.46, 0.14, bz, 0.02, 0.014, rgb(METAL));
  }
  // process hall + pipes
  const wall = shade(pal(c, 0, 0xb8c0c6), 1);
  s.box(0.14, 0, 0.1, c.w - 0.14, 0.4, c.h * 0.36, wall, shade(0x8f979d, 1));
  windows(s, c, 0, 0.24, c.w - 0.24, 0.1, 0.12, 0.34, 1, 5, 0.75, E_WIN);
  s.bar(c.w * 0.3, 0.1, c.h * 0.4, c.w * 0.3, 0.1, c.h * 0.6, 0.03, 0.03, rgb(METAL));
  s.bar(c.w * 0.7, 0.1, c.h * 0.4, c.w * 0.7, 0.1, c.h * 0.6, 0.03, 0.03, rgb(METAL));
  tank(s, c.w - 0.3, c.h - 0.26, 0, 0.13, 0.24, 0x9fc3d4, 9);
  fence(s, 0.05, 0.05, c.w - 0.05, c.h - 0.05, 0.014, 0.08, shade(0x777d84, 1));
}

function bDesal(s: GeoSink, c: Ctx) {
  const r = c.r;
  s.flat(0.03, 0.03, c.w - 0.03, c.h - 0.03, 0.014, shade(CONCRETE, 0.85));
  // intake channel toward the water (front)
  s.box(c.w * 0.4, 0, 0, c.w * 0.6, 0.06, 0.5, shade(CONCRETE, 0.8), shade(0x3f7f8f, 1.15));
  s.bar(c.w * 0.5, 0.1, 0.05, c.w * 0.5, 0.1, 0.6, 0.06, 0.06, rgb(METAL));
  // long membrane halls
  const wall = shade(pal(c, 0, 0xcfd6da), 1);
  for (let k = 0; k < 2; k++) {
    const z0 = 0.6 + k * 0.9;
    s.box(0.2, 0, z0, c.w - 0.6, 0.44, z0 + 0.7, wall, shade(0x9aa4ab, 1));
    s.gable(0.18, z0 - 0.02, c.w - 0.58, z0 + 0.72, 0.44, 0.12, true, shade(0x77848c, 1), wall);
    windows(s, c, 0, 0.3, c.w - 0.7, z0, 0.14, 0.38, 1, 6, 0.7, E_WIN);
  }
  // product tanks
  tank(s, c.w - 0.34, c.h * 0.4, 0, 0.16, 0.3, 0x9fc3d4, 10);
  tank(s, c.w - 0.34, c.h * 0.7, 0, 0.16, 0.3, 0x9fc3d4, 10);
  fence(s, 0.05, 0.05, c.w - 0.05, c.h - 0.05, 0.014, 0.08, shade(0x777d84, 1), 0, c.w * 0.38, c.w * 0.62);
}

function bPrison(s: GeoSink, c: Ctx) {
  const r = c.r;
  const W = c.w;
  const H = c.h;
  s.flat(0.03, 0.03, W - 0.03, H - 0.03, 0.014, shade(CONCRETE, 0.72));
  // perimeter wall + watchtowers
  const wallC = shade(0xa8a8a0, 0.95);
  const t = 0.05;
  const wh = 0.3;
  s.box(0.1, 0, 0.1, W - 0.1, wh, 0.1 + t, wallC, wallC);
  s.box(0.1, 0, H - 0.1 - t, W - 0.1, wh, H - 0.1, wallC, wallC);
  s.box(0.1, 0, 0.1, 0.1 + t, wh, H - 0.1, wallC, wallC);
  s.box(W - 0.1 - t, 0, 0.1, W - 0.1, wh, H - 0.1, wallC, wallC);
  for (const [txp, tzp] of [[0.16, 0.16], [W - 0.16, 0.16], [0.16, H - 0.16], [W - 0.16, H - 0.16]] as const) {
    s.bar(txp, 0, tzp, txp, 0.55, tzp, 0.03, 0.03, wallC);
    s.box(txp - 0.09, 0.55, tzp - 0.09, txp + 0.09, 0.7, tzp + 0.09, shade(0x8a8a82, 1), shade(0x6f6f68, 1));
    s.wallQuad(0, txp - 0.06, 0.58, txp + 0.06, 0.67, tzp - 0.09, 0.012, rgb(0xfff2c9), E_SIGN_SOFT);
    s.pyramid(txp, tzp, 0.22, 0.22, 0.7, 0.06, shade(0x6f6f68, 1));
  }
  // cell blocks in a T
  const cell = shade(pal(c, 0, 0x9d9186), 1);
  s.box(0.3, 0, H * 0.4, W - 0.3, 0.6, H * 0.62, cell, shade(0x6f6a62, 1));
  s.box(W * 0.42, 0, H * 0.62, W * 0.58, 0.6, H - 0.24, cell, shade(0x6f6a62, 1));
  windows(s, c, 0, 0.4, W - 0.4, H * 0.4, 0.16, 0.52, 2, 8, 0.35, E_WIN_DIM);
  // entrance gate
  door(s, 0, W * 0.5, 0.1, 0, 0.22, 0.26, 0x3a3f45);
  // exercise yard markings
  s.flat(0.3, 0.16, W * 0.6, H * 0.36, 0.018, shade(0x7f8a6f, 1));
}

function bHospital(s: GeoSink, c: Ctx) {
  const r = c.r;
  const W = c.w;
  const H = c.h;
  s.flat(0.02, 0.02, W - 0.02, H - 0.02, 0.012, rgb(PAVE));
  const wallHex = pal(c, 0, 0xe4e8ea);
  const wall = shade(wallHex, 0.97);
  const ht = clamp(c.ht * 0.55, 0.9, 8);
  // main block + two wings
  const bx0 = W * 0.24;
  const bx1 = W * 0.76;
  const bz0 = 0.2;
  const bz1 = H - 0.24;
  s.box(bx0, 0, bz0, bx1, ht, bz1, wall, shade(wallHex, 0.8));
  const wingH = ht * 0.55;
  s.box(0.1, 0, bz0 + 0.1, bx0, wingH, bz1 - 0.1, wall, shade(wallHex, 0.8));
  s.box(bx1, 0, bz0 + 0.1, W - 0.1, wingH, bz1 - 0.1, wall, shade(wallHex, 0.8));
  const p = 0.85; // hospitals stay lit
  const fl = clamp(Math.round(ht / 0.5), 2, 10);
  windowBox(s, c, bx0, bz0, bx1, bz1, 0.3, ht - 0.08, fl, p, 2);
  const wfl = clamp(Math.round(wingH / 0.5), 1, 5);
  windows(s, c, 0, 0.16, bx0 - 0.05, bz0 + 0.1, 0.2, wingH - 0.06, wfl, 3, p);
  windows(s, c, 0, bx1 + 0.05, W - 0.16, bz0 + 0.1, 0.2, wingH - 0.06, wfl, 3, p);
  // red cross on the facade
  const cxF = W * 0.5;
  const cy = ht * 0.82;
  const red = rgb(0xe0483c);
  s.wallQuad(0, cxF - 0.045, cy - 0.13, cxF + 0.045, cy + 0.13, bz0, 0.024, red, E_SIGN);
  s.wallQuad(0, cxF - 0.13, cy - 0.045, cxF + 0.13, cy + 0.045, bz0, 0.024, red, E_SIGN);
  // ambulance canopy
  s.box(cxF - 0.3, 0.3, bz0 - 0.18, cxF + 0.3, 0.34, bz0, shade(wallHex, 0.85), shade(wallHex, 0.8));
  s.bar(cxF - 0.28, 0, bz0 - 0.16, cxF - 0.28, 0.3, bz0 - 0.16, 0.016, 0.016, rgb(METAL));
  s.bar(cxF + 0.28, 0, bz0 - 0.16, cxF + 0.28, 0.3, bz0 - 0.16, 0.016, 0.016, rgb(METAL));
  door(s, 0, cxF, bz0, 0, 0.2, 0.28, 0x51606b);
  // roof helipad
  if (W >= 3) {
    const hx = (bx0 + bx1) / 2;
    const hz = (bz0 + bz1) / 2;
    s.disc(hx, hz, ht + 0.012, 0.34, 12, shade(0x4a4e53, 1));
    s.box(hx - 0.14, ht + 0.014, hz - 0.026, hx + 0.14, ht + 0.02, hz + 0.026, rgb(0xd8d8ce), rgb(0xd8d8ce));
    s.box(hx - 0.14, ht + 0.014, hz - 0.12, hx - 0.09, ht + 0.02, hz + 0.12, rgb(0xd8d8ce), rgb(0xd8d8ce));
    s.box(hx + 0.09, ht + 0.014, hz - 0.12, hx + 0.14, ht + 0.02, hz + 0.12, rgb(0xd8d8ce), rgb(0xd8d8ce));
  } else {
    acUnits(s, c, bx0 + 0.05, bz0 + 0.05, bx1 - 0.2, bz1 - 0.16, ht, 2);
  }
  parapet(s, bx0, bz0, bx1, bz1, ht, shade(wallHex, 0.75));
}

function bSchool(s: GeoSink, c: Ctx) {
  const r = c.r;
  const W = c.w;
  const H = c.h;
  s.flat(0.02, 0.02, W - 0.02, H - 0.02, 0.012, shade(LAWN, 0.95));
  const wallHex = pal(c, 0, 0xc98d5a);
  const wall = shade(0xc98d5a, 0.95 + r() * 0.08);
  const hB = clamp(c.ht * 0.4, 0.6, 2.4);
  // main block
  const bx0 = 0.12;
  const bx1 = W - 0.9;
  const bz0 = 0.2;
  const bz1 = H - 0.5;
  s.box(bx0, 0, bz0, bx1, hB, bz1, wall, shade(0x8f5f3a, 0.9));
  parapet(s, bx0, bz0, bx1, bz1, hB, shade(0x8f5f3a, 0.8));
  windows(s, c, 0, bx0 + 0.08, bx1 - 0.08, bz0, 0.2, hB - 0.08, 2, 5, 0.55);
  windows(s, c, 2, bx0 + 0.08, bx1 - 0.08, bz1, 0.2, hB - 0.08, 2, 4, 0.4);
  // entrance porch with clock
  const ex = (bx0 + bx1) / 2;
  s.box(ex - 0.16, 0, bz0 - 0.1, ex + 0.16, hB * 0.55, bz0, wall, shade(0x8f5f3a, 0.85));
  s.gable(ex - 0.18, bz0 - 0.12, ex + 0.18, bz0 + 0.02, hB * 0.55, 0.1, true, shade(0x6f4a2d, 1), wall);
  door(s, 0, ex, bz0 - 0.1, 0, 0.14, 0.24, 0x4a4034);
  s.disc(ex, bz0 - 0.1 - 0.012 + 0.0, hB * 0.45, 0.0001, 3, rgb(WHITE)); // guard
  s.wallQuad(0, ex - 0.05, hB * 0.36, ex + 0.05, hB * 0.46, bz0 - 0.1, 0.014, rgb(WHITE), E_WIN_DIM);
  // gym hall
  s.box(bx1 + 0.05, 0, bz0 + 0.1, W - 0.14, hB * 0.85, bz1, shade(0xb8b0a4, 1), shade(0x8a8378, 1));
  s.gable(bx1 + 0.03, bz0 + 0.08, W - 0.12, bz1 + 0.02, hB * 0.85, 0.12, false, shade(0x6f6a62, 1), shade(0xb8b0a4, 1));
  // playground
  s.flat(bx0 + 0.05, bz1 + 0.08, W * 0.6, H - 0.08, 0.016, shade(0xd8a05f, 0.9));
  s.bar(W * 0.2, 0.02, H - 0.2, W * 0.34, 0.14, H - 0.32, 0.02, 0.02, rgb(0xe0483c));
  s.bar(W * 0.34, 0.14, H - 0.32, W * 0.4, 0.02, H - 0.26, 0.05, 0.012, shade(0xffc93c, 1));
  flagPole(s, c, W * 0.7, H - 0.24, 0.014, 0.7);
  fence(s, 0.05, 0.05, W - 0.05, H - 0.05, 0.012, 0.06, rgb(FENCE_W), 0, ex - 0.2, ex + 0.2);
}

function bUniversity(s: GeoSink, c: Ctx) {
  const r = c.r;
  const W = c.w;
  const H = c.h;
  s.flat(0.02, 0.02, W - 0.02, H - 0.02, 0.012, shade(LAWN, 1));
  const brickHex = pal(c, 0, 0xa5624a);
  const wall = shade(brickHex, 0.95 + r() * 0.08);
  const stone = shade(0xd8d2c4, 1);
  const hB = clamp(c.ht * 0.28, 0.7, 2.6);
  // wings around a quad
  const m = 0.14;
  const wt = 0.5;
  s.box(m, 0, m, W - m, hB, m + wt, wall, shade(brickHex, 0.75)); // north
  s.box(m, 0, H - m - wt, W - m, hB, H - m, wall, shade(brickHex, 0.75)); // south
  s.box(m, 0, m + wt, m + wt, hB, H - m - wt, wall, shade(brickHex, 0.75)); // west
  s.box(W - m - wt, 0, m + wt, W - m, hB, H - m - wt, wall, shade(brickHex, 0.75)); // east
  const p = 0.6;
  windows(s, c, 0, m + 0.1, W - m - 0.1, m, 0.16, hB - 0.08, 2, 7, p);
  windows(s, c, 2, m + 0.1, W - m - 0.1, H - m, 0.16, hB - 0.08, 2, 7, p * 0.8);
  windows(s, c, 1, m + wt + 0.06, H - m - wt - 0.06, W - m, 0.16, hB - 0.08, 2, 5, p * 0.8);
  windows(s, c, 3, m + wt + 0.06, H - m - wt - 0.06, m, 0.16, hB - 0.08, 2, 5, p * 0.8);
  // courtyard: paths + hedges + trees
  const q0 = m + wt + 0.06;
  const q1x = W - m - wt - 0.06;
  const q1z = H - m - wt - 0.06;
  s.flat(q0, (H - 0.16) / 2 - 0.06, q1x, (H - 0.16) / 2 + 0.06, 0.02, rgb(PAVE));
  s.flat((W - 0.16) / 2 - 0.06, q0, (W - 0.16) / 2 + 0.06, q1z, 0.021, rgb(PAVE));
  hedgeBox(s, q0 + 0.08, q0 + 0.08, q0 + 0.4, q0 + 0.4, 0.012);
  hedgeBox(s, q1x - 0.4, q1z - 0.4, q1x - 0.08, q1z - 0.08, 0.012);
  treeBlob(s, q0 + 0.5, q1z - 0.3, 0.012, 1.1, c.seedI + 11);
  treeBlob(s, q1x - 0.5, q0 + 0.3, 0.012, 1.0, c.seedI + 13);
  // gatehouse clock tower on the front wing
  const cxT = W / 2;
  s.box(cxT - 0.24, 0, m - 0.05, cxT + 0.24, hB * 1.9, m + wt + 0.05, wall, stone);
  s.pyramid(cxT, m + wt * 0.5, 0.54, wt + 0.14, hB * 1.9, 0.3, shade(0x51606b, 1));
  s.disc(cxT, m - 0.05 - 0.014, hB * 1.55, 0.0001, 3, rgb(WHITE)); // guard
  s.wallQuad(0, cxT - 0.07, hB * 1.45, cxT + 0.07, hB * 1.62, m - 0.05, 0.016, rgb(0xfaf4e0), E_SIGN_SOFT);
  // arch entrance
  door(s, 0, cxT, m - 0.05, 0, 0.2, hB * 0.6, 0x3f3a33);
  // stone trim
  s.box(m - 0.012, hB - 0.05, m - 0.012, W - m + 0.012, hB, m + wt + 0.012, stone, stone);
  flagPole(s, c, cxT + 0.4, m - 0.12, 0.012, 0.8);
}

/* --------------------------------- leisure -------------------------------- */

function bStadium(s: GeoSink, c: Ctx) {
  const r = c.r;
  const W = c.w;
  const H = c.h;
  s.flat(0.02, 0.02, W - 0.02, H - 0.02, 0.012, rgb(PAVE));
  const cx = W / 2;
  const cz = H / 2;
  const ht = clamp(c.ht * 0.16, 1.4, 2.6);
  const Rx = W * 0.46;
  const Rz = H * 0.4;
  const seg = 18;
  const wallHex = pal(c, 0, 0xd8d2c4);
  const wall = shade(wallHex, 0.95);
  const seats = shade(0x3e6fae, 1);
  const roof = shade(0xeef1f3, 1);
  const pt = (k: number, rx: number, rz: number): [number, number] => {
    const a = (k / seg) * Math.PI * 2;
    return [cx + Math.cos(a) * rx, cz + Math.sin(a) * rz];
  };
  for (let k = 0; k < seg; k++) {
    const j = (k + 1) % seg;
    const [ox0, oz0] = pt(k, Rx, Rz);
    const [ox1, oz1] = pt(j, Rx, Rz);
    const [ix0, iz0] = pt(k, Rx * 0.55, Rz * 0.5);
    const [ix1, iz1] = pt(j, Rx * 0.55, Rz * 0.5);
    // outer wall
    s.quad(ox1, 0, oz1, ox0, 0, oz0, ox0, ht, oz0, ox1, ht, oz1, wall, 0);
    // seating bowl sloping to the field
    s.quad(ox0, ht, oz0, ox1, ht, oz1, ix1, ht * 0.25, iz1, ix0, ht * 0.25, iz0, seats);
    // inner bowl wall
    s.quad(ix0, ht * 0.25, iz0, ix1, ht * 0.25, iz1, ix1, 0.05, iz1, ix0, 0.05, iz0, shade(wallHex, 0.8));
    // roof ring
    const [rx0, rz0] = pt(k, Rx * 1.04, Rz * 1.05);
    const [rx1, rz1] = pt(j, Rx * 1.04, Rz * 1.05);
    const [mx0, mz0] = pt(k, Rx * 0.72, Rz * 0.68);
    const [mx1, mz1] = pt(j, Rx * 0.72, Rz * 0.68);
    s.quad(rx0, ht + 0.06, rz0, rx1, ht + 0.06, rz1, mx1, ht + 0.18, mz1, mx0, ht + 0.18, mz0, roof);
    s.quad(rx1, ht + 0.02, rz1, rx0, ht + 0.02, rz0, mx0, ht + 0.14, mz0, mx1, ht + 0.14, mz1, shade(wallHex, 0.7));
  }
  // field + markings
  s.disc(cx, cz, 0.06, Rx * 0.52, 16, shade(0x4e8f3d, 1.1));
  s.flat(cx - Rx * 0.3, cz - 0.012, cx + Rx * 0.3, cz + 0.012, 0.075, rgb(0xe8f0e4));
  s.flat(cx - 0.012, cz - Rz * 0.28, cx + 0.012, cz + Rz * 0.28, 0.075, rgb(0xe8f0e4));
  // floodlight masts
  for (const [fx, fz] of [[0.2, 0.2], [W - 0.2, 0.2], [0.2, H - 0.2], [W - 0.2, H - 0.2]] as const) {
    s.bar(fx, 0, fz, fx, ht * 1.9, fz, 0.026, 0.026, shade(0x777d84, 1));
    const dirx = cx - fx;
    const dirz = cz - fz;
    const dl = Math.hypot(dirx, dirz);
    const hx = fx + (dirx / dl) * 0.12;
    const hz = fz + (dirz / dl) * 0.12;
    s.bar(fx, ht * 1.9, fz, hx, ht * 1.98, hz, 0.09, 0.05, rgb(0xf5f8fa), E_SIGN);
  }
  // entrance gates
  for (const sideA of [0, 2] as const) {
    const at = sideA === 0 ? cz - Rz : cz + Rz;
    s.wallQuad(sideA, cx - 0.3, 0.02, cx + 0.3, ht * 0.5, at, -0.05, shade(0x51606b, 1));
  }
}

function bPark(s: GeoSink, c: Ctx) {
  const r = c.r;
  const W = c.w;
  const H = c.h;
  const key = c.key;
  s.flat(0.015, 0.015, W - 0.015, H - 0.015, 0.012, shade(LAWN, 0.95 + r() * 0.15));
  if (key === 'l_sports') {
    // pitch + goals + bleacher + low floodlights
    s.flat(0.3, 0.3, W - 0.3, H - 0.3, 0.02, shade(0x4e8f3d, 1.15));
    fence(s, 0.26, 0.26, W - 0.26, H - 0.26, 0.02, 0.001, rgb(0xe8f0e4)); // white boundary line
    s.flat(W / 2 - 0.012, 0.3, W / 2 + 0.012, H - 0.3, 0.026, rgb(0xe8f0e4));
    for (const gz of [0.34, H - 0.34]) {
      s.bar(W / 2 - 0.12, 0.02, gz, W / 2 - 0.12, 0.12, gz, 0.012, 0.012, rgb(WHITE));
      s.bar(W / 2 + 0.12, 0.02, gz, W / 2 + 0.12, 0.12, gz, 0.012, 0.012, rgb(WHITE));
      s.bar(W / 2 - 0.12, 0.12, gz, W / 2 + 0.12, 0.12, gz, 0.012, 0.012, rgb(WHITE));
    }
    // bleacher
    for (let step = 0; step < 3; step++) {
      s.box(0.06, step * 0.05, 0.5 + step * 0.07, 0.2, step * 0.05 + 0.05, H - 0.5, shade(0x9aa2a8, 1 - step * 0.05), rgb(METAL));
    }
    for (const [lx, lz] of [[0.14, 0.14], [W - 0.14, 0.14], [0.14, H - 0.14], [W - 0.14, H - 0.14]] as const) {
      s.bar(lx, 0, lz, lx, 0.7, lz, 0.02, 0.02, shade(0x777d84, 1));
      s.box(lx - 0.05, 0.7, lz - 0.03, lx + 0.05, 0.76, lz + 0.03, rgb(0xf5f8fa), rgb(0xf5f8fa), E_SIGN_SOFT);
    }
    return;
  }
  if (key === 'l_zoo') {
    // pens + pond + entrance arch + tiny llamas (of course)
    fence(s, 0.06, 0.06, W - 0.06, H - 0.06, 0.012, 0.09, shade(TRUNK, 1.2), 0, W * 0.4, W * 0.6);
    s.bar(W * 0.4, 0, 0.06, W * 0.4, 0.34, 0.06, 0.02, 0.02, shade(0xc9a44a, 1));
    s.bar(W * 0.6, 0, 0.06, W * 0.6, 0.34, 0.06, 0.02, 0.02, shade(0xc9a44a, 1));
    s.bar(W * 0.4, 0.34, 0.06, W * 0.6, 0.34, 0.06, 0.02, 0.05, shade(0xc9a44a, 1));
    fence(s, 0.2, 0.5, W * 0.48, H * 0.5, 0.012, 0.06, rgb(FENCE_W));
    fence(s, W * 0.55, 0.44, W - 0.2, H * 0.42, 0.012, 0.06, rgb(FENCE_W));
    s.disc(W * 0.68, H * 0.72, 0.02, 0.34, 10, shade(WATERC, 1));
    // llamas: box body + neck + head
    for (let k = 0; k < 3; k++) {
      const lx = 0.3 + r() * (W * 0.35);
      const lz = 0.6 + r() * (H * 0.3);
      const lc = shade([0xe8dcc4, 0xb98d5e, 0xf2ede0][k % 3], 1);
      s.box(lx, 0.06, lz, lx + 0.11, 0.13, lz + 0.05, lc, lc);
      s.bar(lx + 0.01, 0.06, lz + 0.025, lx + 0.01, 0.02, lz + 0.025, 0.012, 0.012, lc);
      s.bar(lx + 0.1, 0.06, lz + 0.025, lx + 0.1, 0.02, lz + 0.025, 0.012, 0.012, lc);
      s.bar(lx + 0.1, 0.13, lz + 0.025, lx + 0.12, 0.2, lz + 0.025, 0.016, 0.016, lc);
      s.box(lx + 0.1, 0.2, lz + 0.005, lx + 0.15, 0.235, lz + 0.045, lc, lc);
    }
    for (let k = 0; k < 4; k++) treeBlob(s, 0.24 + r() * (W - 0.5), 0.2 + r() * (H - 0.5), 0.012, 0.8 + r() * 0.6, c.seedI + k * 3);
    s.flat(W * 0.42, 0.08, W * 0.58, H * 0.55, 0.018, rgb(PAVE));
    return;
  }
  // generic parks: paths, pond, hedges, benches, trees; gazebo on big parks
  const big = W >= 2;
  s.flat(W * 0.5 - 0.07, 0.03, W * 0.5 + 0.07, H - 0.03, 0.018, shade(0xcabd9d, 1));
  s.flat(0.03, H * 0.5 - 0.07, W - 0.03, H * 0.5 + 0.07, 0.019, shade(0xcabd9d, 1));
  if (big || r() < 0.4) {
    s.disc(W * 0.7, H * 0.3, 0.02, Math.min(W, H) * 0.16, 10, shade(WATERC, 1.05));
    s.cyl(W * 0.7, H * 0.3, 0.006, 0.03, Math.min(W, H) * 0.175, Math.min(W, H) * 0.175, 10, shade(PAVE, 0.9), null);
  }
  hedgeBox(s, 0.08, 0.08, W * 0.34, 0.15, 0.012);
  hedgeBox(s, W - 0.34, H - 0.15, W - 0.08, H - 0.08, 0.012);
  bench(s, W * 0.4, H * 0.5 + 0.12, 0.012, true);
  bench(s, W * 0.6, H * 0.5 - 0.12, 0.012, true);
  const nT = big ? 7 : 2 + ((r() * 2) | 0);
  for (let k = 0; k < nT; k++) {
    const txp = 0.14 + r() * (W - 0.3);
    const tzp = 0.14 + r() * (H - 0.3);
    if (Math.abs(txp - W * 0.5) < 0.12 || Math.abs(tzp - H * 0.5) < 0.12) continue;
    treeBlob(s, txp, tzp, 0.012, 0.75 + r() * 0.75, c.seedI + k * 7);
  }
  if (big) {
    // gazebo
    const gx = W * 0.3;
    const gz = H * 0.72;
    s.disc(gx, gz, 0.03, 0.2, 8, shade(PAVE, 1.05));
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2;
      column(s, gx + Math.cos(a) * 0.16, gz + Math.sin(a) * 0.16, 0.03, 0.22, 0.014, rgb(WHITE));
    }
    s.cyl(gx, gz, 0.25, 0.38, 0.24, 0.02, 8, shade(0x8f3d33, 1), null);
    lampPost(s, W * 0.5 + 0.1, H * 0.3, 0.012);
    lampPost(s, W * 0.5 - 0.1, H * 0.7, 0.012);
  }
}

function bPlaza(s: GeoSink, c: Ctx) {
  const r = c.r;
  const W = c.w;
  const H = c.h;
  // checkerboard pavers
  const n = 4;
  for (let j = 0; j < n; j++)
    for (let k = 0; k < n; k++) {
      const c1 = (j + k) % 2 === 0 ? shade(0xcfc9ba, 1) : shade(0xb1aa99, 1);
      s.flat((W * k) / n + 0.01, (H * j) / n + 0.01, (W * (k + 1)) / n - 0.01, (H * (j + 1)) / n - 0.01, 0.014, c1);
    }
  // central fountain
  const cx = W / 2;
  const cz = H / 2;
  s.cyl(cx, cz, 0, 0.08, 0.3, 0.3, 10, shade(0xd8d2c4, 0.95), null);
  s.disc(cx, cz, 0.07, 0.27, 10, shade(WATERC, 1.15), E_WIN_DIM);
  s.cyl(cx, cz, 0.07, 0.24, 0.05, 0.035, 7, shade(0xd8d2c4, 0.9), shade(0xd8d2c4, 0.85));
  s.cyl(cx, cz, 0.24, 0.3, 0.11, 0.09, 7, shade(0xd8d2c4, 0.95), shade(WATERC, 1.2), E_WIN_DIM);
  s.cyl(cx, cz, 0.3, 0.44, 0.02, 0.012, 5, rgb(0xbfe8f5), null, E_WIN);
  // corner planters + lamps + benches
  for (const [px, pz] of [[0.18, 0.18], [W - 0.18, 0.18], [0.18, H - 0.18], [W - 0.18, H - 0.18]] as const) {
    s.box(px - 0.09, 0.014, pz - 0.09, px + 0.09, 0.07, pz + 0.09, shade(0x8a8378, 1), shade(HEDGE, 0.9));
    hedgeBox(s, px - 0.07, pz - 0.07, px + 0.07, pz + 0.07, 0.07, 0.05);
    lampPost(s, px + (px < W / 2 ? 0.16 : -0.16), pz, 0.014);
  }
  bench(s, cx - 0.4, cz, 0.014, false);
  bench(s, cx + 0.4, cz, 0.014, false);
}

/* ---------------------------- transport + heroes ------------------------- */

function crane(s: GeoSink, x: number, z: number, y: number, h: number, reach: number, col: V3) {
  s.bar(x, y, z, x, y + h, z, 0.045, 0.045, col);
  s.bar(x, y + h, z, x + reach, y + h, z, 0.035, 0.035, col);
  s.bar(x, y + h, z, x - reach * 0.3, y + h * 0.86, z, 0.025, 0.025, col);
  s.bar(x + reach * 0.78, y + h, z, x + reach * 0.78, y + h * 0.52, z, 0.012, 0.012, shade(0x34383c, 1));
}

function bPort(s: GeoSink, c: Ctx) {
  const W = c.w;
  const H = c.h;
  s.flat(0.02, 0.02, W - 0.02, H - 0.02, 0.014, shade(CONCRETE, 0.78));
  s.box(0, 0, 0, W, 0.12, 0.22, shade(CONCRETE, 0.75), shade(CONCRETE, 0.9));
  for (let x = 0.18; x < W; x += 0.55) s.bar(x, -0.35, 0.08, x, 0.02, 0.08, 0.035, 0.035, shade(0x555a60, 1));
  if (c.key === 'l_marina') {
    for (let k = 0; k < 4; k++) {
      const x = 0.35 + k * ((W - 0.7) / 3);
      s.box(x - 0.035, 0.03, 0, x + 0.035, 0.07, H * 0.58, shade(TRUNK, 1.1), shade(TRUNK, 1.2));
      s.box(x - 0.13, 0.025, 0.35 + (k & 1) * 0.3, x + 0.13, 0.07, 0.48 + (k & 1) * 0.3, rgb(WHITE), shade(0x4a7fc2, 1));
      s.bar(x, 0.07, 0.41 + (k & 1) * 0.3, x, 0.3, 0.41 + (k & 1) * 0.3, 0.012, 0.012, rgb(WHITE));
    }
    s.box(0.12, 0, H - 0.55, W - 0.12, 0.34, H - 0.12, shade(0xd8cbb4, 1), shade(ROOF_DARK, 1));
    s.wallQuad(0, 0.22, 0.08, W - 0.22, 0.28, H - 0.55, 0.016, rgb(0xffe6ba), E_RETAIL);
    return;
  }
  s.box(0.16, 0, H - 0.8, W * 0.48, 0.55, H - 0.14, shade(0x9fa3a6, 1), shade(0x676c70, 1));
  s.gable(0.13, H - 0.83, W * 0.48 + 0.03, H - 0.11, 0.55, 0.14, true, shade(0x676c70, 1), shade(0x9fa3a6, 1));
  for (let k = 0; k < 3; k++) crane(s, 0.55 + k * ((W - 1.1) / 2), 0.45, 0.02, 1.35, 0.65, shade(0xe1a62b, 1));
  crates(s, c, W * 0.68, H * 0.55, 0.014, 12);
  lampPost(s, W - 0.2, H - 0.2, 0.014, 0.7);
}

function bAirport(s: GeoSink, c: Ctx) {
  const W = c.w;
  const H = c.h;
  s.flat(0.02, 0.02, W - 0.02, H - 0.02, 0.012, shade(ASPHALT, 1.05));
  const rz = H * 0.7;
  s.flat(0.12, rz - 0.34, W - 0.12, rz + 0.34, 0.022, shade(0x282c31, 1));
  for (let x = 0.35; x < W - 0.3; x += 0.45) s.flat(x, rz - 0.025, x + 0.2, rz + 0.025, 0.027, rgb(WHITE), E_SIGN_SOFT);
  const terminalZ = 0.18;
  s.box(0.25, 0, terminalZ, W - 1.1, 0.55, H * 0.38, shade(0xb8c0c6, 1), shade(0x77848c, 1));
  s.wallQuad(2, 0.32, 0.08, W - 1.17, 0.45, H * 0.38, 0.018, rgb(0x8dc8e8), E_RETAIL_SOFT);
  s.box(0.5, 0.55, terminalZ + 0.12, W - 1.4, 0.78, H * 0.38 - 0.12, rgb(GLASS), shade(0x77848c, 1));
  for (let k = 0; k < 4; k++) {
    const x = 0.55 + k * ((W - 1.8) / 3);
    s.box(x, 0.12, H * 0.38, x + 0.14, 0.24, H * 0.52, shade(0x9aa2a8, 1), shade(0x9aa2a8, 1));
  }
  // control tower
  const cx = W - 0.55;
  s.cyl(cx, H * 0.22, 0, 1.25, 0.16, 0.11, 8, shade(CONCRETE, 0.9), null);
  s.cyl(cx, H * 0.22, 1.25, 1.52, 0.25, 0.25, 8, rgb(GLASS), shade(0x77848c, 1), E_WIN_DIM);
  s.cyl(cx, H * 0.22, 1.52, 1.6, 0.27, 0.2, 8, shade(0x555a60, 1), shade(0x555a60, 1));
  // parked low-poly aircraft
  for (let k = 0; k < 2; k++) {
    const px = W * (0.32 + k * 0.3);
    const pz = H * 0.5;
    s.boxR(px, pz, 0.55, 0.12, 0.07, 0.14, Math.PI / 2, rgb(WHITE), rgb(WHITE));
    s.bar(px - 0.02, 0.1, pz - 0.42, px + 0.02, 0.1, pz + 0.42, 0.035, 0.035, shade(0x4a7fc2, 1));
    s.bar(px - 0.2, 0.1, pz, px + 0.34, 0.1, pz, 0.025, 0.025, rgb(WHITE));
  }
  if (s.collect) {
    const [wx, wy, wz] = s.toWorld(cx, 1.73, H * 0.22);
    pendingAnims.push({ kind: AnimKind.Radar, x: wx, y: wy, z: wz, yaw: 0, speed: 1.1, phase: hash2(c.seedI, 67, 3), scale: 0.65 });
    pendingAnims.push({ kind: AnimKind.Beacon, x: wx, y: wy + 0.12, z: wz, yaw: 0, speed: 1, phase: hash2(c.seedI, 68, 3), scale: 0.2 });
  }
}

function bTransit(s: GeoSink, c: Ctx) {
  const W = c.w;
  const H = c.h;
  s.flat(0.02, 0.02, W - 0.02, H - 0.02, 0.012, rgb(PAVE));
  if (c.key === 't_subway') {
    s.box(W * 0.25, 0, H * 0.28, W * 0.75, 0.3, H * 0.72, rgb(GLASS), shade(0x51606b, 1), E_RETAIL_SOFT);
    s.gable(W * 0.22, H * 0.25, W * 0.78, H * 0.75, 0.3, 0.12, true, shade(0x3ddbd9, 1), shade(0x51606b, 1));
    s.box(W * 0.42, 0.02, H * 0.08, W * 0.58, 0.08, H * 0.3, shade(0x555a60, 1), shade(0x555a60, 1));
    lampPost(s, 0.2, H - 0.2, 0.012);
    return;
  }
  if (c.key === 't_bus') {
    s.box(0.12, 0, 0.15, W - 0.12, 0.42, H * 0.48, shade(0xb8c0c6, 1), shade(0x77848c, 1));
    s.wallQuad(0, 0.22, 0.08, W - 0.22, 0.35, 0.15, 0.016, rgb(0xffe6ba), E_RETAIL);
    for (let k = 0; k < 3; k++) s.box(0.18 + k * 0.5, 0.03, H * 0.62, 0.55 + k * 0.5, 0.18, H * 0.78, shade(0x3ddbd9, 0.8), shade(0x3ddbd9, 1));
    return;
  }
  // rail station: long platforms, glazed concourse and canopy
  for (let k = 0; k < 3; k++) {
    const z = 0.35 + k * ((H - 0.7) / 2);
    s.box(0.1, 0.02, z - 0.11, W - 0.1, 0.08, z + 0.11, shade(CONCRETE, 0.9), shade(CONCRETE, 1));
    for (let x = 0.25; x < W - 0.2; x += 0.45) s.bar(x, 0.08, z, x, 0.42, z, 0.018, 0.018, rgb(METAL));
    s.quad(W - 0.08, 0.42, z + 0.18, 0.08, 0.42, z + 0.18, 0.14, 0.52, z - 0.18, W - 0.14, 0.52, z - 0.18, shade(0xdfe3e6, 1));
  }
  s.box(W * 0.32, 0.08, 0.12, W * 0.68, 0.9, H - 0.12, rgb(GLASS), shade(0x51606b, 1), E_WIN_DIM);
  s.gable(W * 0.29, 0.09, W * 0.71, H - 0.09, 0.9, 0.22, false, shade(0x51606b, 1), shade(0xb8c0c6, 1));
}

function heroWindows(s: GeoSink, c: Ctx, x0: number, z0: number, x1: number, z1: number, y0: number, y1: number) {
  windowBox(s, c, x0, z0, x1, z1, y0, y1, clamp(Math.round((y1 - y0) / 0.75), 2, 28), 0.58, 3);
}

function bLandmark(s: GeoSink, c: Ctx) {
  const W = c.w;
  const H = c.h;
  const cx = W / 2;
  const cz = H / 2;
  const key = c.key;
  s.flat(0.03, 0.03, W - 0.03, H - 0.03, 0.014, key === 'arco_forest' ? shade(LAWN, 0.95) : rgb(PAVE));
  if (key === 'x_tower') {
    s.cyl(cx, cz, 0, 2.2, 0.8, 0.52, 10, shade(0xc7d2da, 1), null);
    s.cyl(cx, cz, 2.2, c.ht * 0.78, 0.52, 0.34, 10, shade(0x6f95b3, 1), null);
    for (let y = 3; y < c.ht * 0.76; y += 1.5) s.cyl(cx, cz, y, y + 0.18, 0.54 - y * 0.002, 0.54 - y * 0.002, 10, rgb(0xffd98a), null, lit(c, y | 0, 0, 0, 0.58) ? E_WIN : 0);
    s.cyl(cx, cz, c.ht * 0.78, c.ht * 0.9, 0.34, 0.12, 8, shade(0xcfd4d8, 1), null);
    s.cyl(cx, cz, c.ht * 0.9, c.ht + 6, 0.1, 0.008, 7, rgb(0xe8ebee), null);
    if (s.collect) {
      const [x, y, z] = s.toWorld(cx, c.ht + 6.1, cz);
      pendingAnims.push({ kind: AnimKind.Beacon, x, y, z, yaw: 0, speed: 1, phase: 0, scale: 0.35 });
    }
    return;
  }
  if (key === 'x_llama') {
    const gold = shade(0xd8aa37, 1.15);
    s.cyl(cx, cz, 0, 1.8, 1.05, 1.05, 14, shade(0xe8dfc8, 1), shade(0xd8cba8, 1));
    s.dome(cx, cz, 1.8, 1.08, 14, 5, gold, 1.15);
    s.cyl(cx - 0.42, cz, 2.65, 3.65, 0.18, 0.035, 6, gold, null);
    s.cyl(cx + 0.42, cz, 2.65, 3.65, 0.18, 0.035, 6, gold, null);
    s.wallQuad(0, cx - 0.7, 0.25, cx + 0.7, 1.2, cz - 1.05, 0.025, rgb(0x3ddbd9), E_SIGN);
    return;
  }
  if (key === 'x_cityhall') {
    s.box(0.25, 0, 0.55, W - 0.25, 2.3, H - 0.28, shade(0xd9d0bd, 1), shade(0xa99c83, 1));
    for (let k = 0; k < 6; k++) column(s, 0.55 + k * ((W - 1.1) / 5), 0.38, 0, 1.65, 0.065, rgb(WHITE));
    s.gable(0.35, 0.25, W - 0.35, 0.68, 1.65, 0.48, true, shade(0xb8ad96, 1), rgb(WHITE));
    s.cyl(cx, H * 0.6, 2.3, 3.2, 0.65, 0.65, 12, shade(0xd9d0bd, 1), null);
    s.dome(cx, H * 0.6, 3.2, 0.72, 12, 5, shade(0x68a49a, 1));
    flagPole(s, c, cx, H * 0.6, 3.85, 1.2);
    return;
  }
  if (key === 'x_statue') {
    s.box(0.18, 0, 0.18, 0.82, 0.7, 0.82, shade(0xb8ad96, 1), shade(0xd5c9ae, 1));
    s.box(0.3, 0.7, 0.3, 0.7, 1.05, 0.7, shade(0x66756d, 1), shade(0x77887e, 1));
    s.bar(0.5, 1.05, 0.5, 0.48, 2.55, 0.5, 0.11, 0.11, shade(0x66756d, 1));
    s.cyl(0.48, 0.5, 2.5, 2.85, 0.16, 0.14, 7, shade(0x66756d, 1), shade(0x77887e, 1));
    s.bar(0.48, 2.2, 0.5, 0.18, 1.55, 0.45, 0.07, 0.07, shade(0x66756d, 1));
    s.bar(0.48, 2.2, 0.5, 0.82, 2.65, 0.45, 0.07, 0.07, shade(0x66756d, 1));
    return;
  }
  if (key === 'x_observatory') {
    s.box(0.3, 0, 0.3, W - 0.3, 1.3, H - 0.3, shade(0xd8d2c4, 1), shade(0xa8a196, 1));
    s.cyl(cx, cz, 1.3, 2.0, 1.05, 1.05, 14, shade(0xd9dde0, 1), null);
    s.dome(cx, cz, 2, 1.08, 14, 6, shade(0xc8cdd1, 1));
    s.box(cx - 0.1, 1.95, cz - 1.09, cx + 0.1, 3.0, cz - 0.98, shade(0x30363b, 1), shade(0x30363b, 1));
    return;
  }
  if (key === 'x_casino') {
    s.box(0.25, 0, 0.2, W - 0.25, 2.0, H - 0.25, shade(0xd6c7ad, 1), shade(0x5a4d62, 1));
    s.box(0.55, 2, 0.5, W - 0.55, c.ht, H - 0.55, shade(0x735e86, 1), shade(0x3d3448, 1));
    heroWindows(s, c, 0.55, 0.5, W - 0.55, H - 0.55, 2.2, c.ht - 0.4);
    for (let y = 1; y < c.ht; y += 2.2) s.wallQuad(0, 0.35, y, W - 0.35, y + 0.24, 0.2, 0.03, neon(c, y | 0), E_SIGN);
    s.cyl(cx, 0.1, 0.4, 2.2, 0.18, 0.18, 10, neon(c, 8), rgb(0xffc93c), E_SIGN);
    return;
  }
  if (key === 'arco_plymouth') {
    for (let k = 0; k < 8; k++) {
      const y0 = (c.ht * k) / 8;
      const y1 = (c.ht * (k + 1)) / 8;
      const m = 0.18 + k * 0.17;
      s.box(m, y0, m, W - m, y1, H - m, shade(0x77a9c4, 0.92 + k * 0.035), shade(0x274b63, 1));
      heroWindows(s, c, m, m, W - m, H - m, y0 + 0.25, y1 - 0.18);
    }
    s.pyramid(cx, cz, 1.3, 1.3, c.ht, 4, shade(0xbfdbe7, 1));
    return;
  }
  if (key === 'arco_forest') {
    for (let k = 0; k < 9; k++) {
      const y0 = (c.ht * k) / 9;
      const m = 0.15 + k * 0.18;
      s.box(m, y0, m, W - m, y0 + c.ht / 9, H - m, shade(0x8aa58e, 1), shade(LAWN, 1.1));
      heroWindows(s, c, m, m, W - m, H - m, y0 + 0.2, y0 + c.ht / 9 - 0.15);
      if ((k & 1) === 0) for (let q = 0; q < 4; q++) treeBlob(s, m + 0.25 + q * ((W - 2 * m - 0.5) / 3), m + 0.12, y0 + c.ht / 9, 1.2, c.seedI + k * 9 + q);
    }
    return;
  }
  if (key === 'arco_darco') {
    const dark = shade(0x252735, 1);
    for (let k = 0; k < 7; k++) {
      const y0 = k * c.ht / 7;
      const rr = 1.55 - k * 0.13;
      s.cyl(cx, cz, y0, y0 + c.ht / 7 + 0.3, rr, rr * 0.88, 9, dark, null);
      s.cyl(cx, cz, y0 + c.ht / 14, y0 + c.ht / 14 + 0.2, rr + 0.05, rr + 0.05, 9, neon(c, k), null, E_WIN_DIM);
      for (let q = 0; q < 3; q++) {
        const a = q * Math.PI * 2 / 3 + k * 0.7;
        s.bar(cx + Math.cos(a) * rr * 0.75, y0 + 0.2, cz + Math.sin(a) * rr * 0.75, cx + Math.cos(a) * (rr + 0.7), y0 + c.ht / 7, cz + Math.sin(a) * (rr + 0.7), 0.08, 0.08, dark);
      }
    }
    s.cyl(cx, cz, c.ht, c.ht + 5, 0.25, 0.01, 7, dark, null);
    return;
  }
  if (key === 'arco_launch') {
    // launch gantry, service decks, and a bright central rocket
    for (const [x, z] of [[0.45, 0.45], [W - 0.45, 0.45], [0.45, H - 0.45], [W - 0.45, H - 0.45]] as const)
      s.bar(x, 0, z, x, c.ht * 0.9, z, 0.13, 0.13, shade(0x59636b, 1));
    for (let y = 4; y < c.ht * 0.88; y += 5) {
      s.bar(0.45, y, 0.45, W - 0.45, y, 0.45, 0.09, 0.09, shade(0x77848c, 1));
      s.bar(0.45, y, H - 0.45, W - 0.45, y, H - 0.45, 0.09, 0.09, shade(0x77848c, 1));
    }
    s.cyl(cx, cz, 0.4, c.ht * 0.78, 0.58, 0.45, 12, rgb(WHITE), null);
    s.cyl(cx, cz, c.ht * 0.78, c.ht, 0.45, 0.01, 12, shade(0xe8e8e8, 1), null);
    for (let q = 0; q < 4; q++) {
      const a = q * Math.PI / 2;
      s.bar(cx + Math.cos(a) * 0.42, 1.2, cz + Math.sin(a) * 0.42, cx + Math.cos(a) * 0.95, 0.25, cz + Math.sin(a) * 0.95, 0.14, 0.08, shade(0xd94c42, 1));
    }
    if (s.collect) {
      const [x, y, z] = s.toWorld(cx, c.ht + 0.2, cz);
      pendingAnims.push({ kind: AnimKind.Beacon, x, y, z, yaw: 0, speed: 1, phase: 0.2, scale: 0.3 });
    }
    return;
  }
  // Museum and future landmark keys get a dignified, faceted cultural hall.
  s.box(0.25, 0, 0.45, W - 0.25, c.ht * 0.45, H - 0.25, shade(0xd8d2c4, 1), shade(0x9d9482, 1));
  for (let k = 0; k < 6; k++) column(s, 0.5 + k * ((W - 1) / 5), 0.28, 0, c.ht * 0.34, 0.055, rgb(WHITE));
  s.pyramid(cx, H * 0.58, W * 0.72, H * 0.6, c.ht * 0.45, c.ht * 0.18, shade(0x78a5b7, 1));
  s.wallQuad(0, W * 0.3, c.ht * 0.2, W * 0.7, c.ht * 0.32, 0.45, 0.02, shade(0xc9a44a, 1), E_SIGN_SOFT);
}

function bRubble(s: GeoSink, c: Ctx) {
  s.flat(0.04, 0.04, c.w - 0.04, c.h - 0.04, 0.012, shade(0x6f685f, 0.8));
  for (let k = 0; k < 9; k++) {
    const x = 0.08 + c.r() * (c.w - 0.25);
    const z = 0.08 + c.r() * (c.h - 0.25);
    const q = 0.06 + c.r() * 0.16;
    s.boxR(x, z, q * 1.7, q, 0.01, q * (0.5 + c.r()), c.r() * Math.PI, shade(0x77706a, 0.7 + c.r() * 0.35), shade(0x91877d, 1));
  }
}

const BUILDERS: Record<BuildingDef['archetype'], Builder> = {
  house: bHouse,
  rowhouse: bRowhouse,
  apartment: bApartment,
  tower: bTower,
  shop: bShop,
  office: bOffice,
  skyscraper: bSkyscraper,
  mall: bMall,
  farm: bFarm,
  workshop: bWorkshop,
  factory: bFactory,
  refinery: bRefinery,
  warehouse: bWarehouse,
  powerplant: bPowerplant,
  windturbine: bWindturbine,
  solarfarm: bSolarfarm,
  watertower: bWatertower,
  civic: bCivic,
  hospital: bHospital,
  school: bSchool,
  university: bUniversity,
  stadium: bStadium,
  park: bPark,
  plaza: bPlaza,
  landmark: bLandmark,
  port: bPort,
  airport: bAirport,
  transit: bTransit,
  rubble: bRubble,
};

function buildingBaseY(grid: Grid, i: number): number {
  const def = defOf(grid.building[i]);
  const x = tx(i), y = ty(i);
  for (let yy = 0; yy < def.h; yy++) for (let xx = 0; xx < def.w; xx++)
    if (grid.water[idx(x + xx, y + yy)]) return SEA_LEVEL;
  return grid.height[i];
}

function buildOne(s: GeoSink, grid: Grid, i: number, collect = true) {
  const id = grid.building[i];
  if (!id) return;
  const def = defOf(id);
  const x = tx(i);
  const z = ty(i);
  const abandoned = !!(def.grown && grid.condition[i] === 0 && grid.age[i] > 4);
  const seedI = ((x * 73856093) ^ (z * 19349663) ^ (grid.variant[i] * 83492791) ^ (id * 2654435761)) >>> 0;
  const variation = def.grown ? 0.88 + hash2(x, z, grid.variant[i] + 41) * 0.24 : 1;
  const c: Ctx = {
    def,
    key: def.key,
    w: def.w,
    h: def.h,
    level: grid.level[i] || def.level || 1,
    seedI,
    r: mulberry32(seedI),
    ht: Math.max(0.2, (def.height ?? 2.5) * variation),
    abandoned,
  };
  // A quarter-turn around the centre of a rectangular footprint moves geometry
  // outside the tiles stamped by the simulation.  Preserve rotation only when
  // it cannot change the occupied bounds.
  const renderRotation = def.w === def.h ? grid.rotation[i] : 0;
  s.setFrame(x, buildingBaseY(grid, i), z, def.w, def.h, renderRotation);
  s.collect = collect;
  const v0 = s.v;
  const anim0 = pendingAnims.length;
  if (grid.onFire[i]) {
    s.box(0.08, 0, 0.08, def.w - 0.08, Math.min(c.ht, 3), def.h - 0.08, shade(0x8f4930, 1), shade(0x3a302d, 1));
  } else {
    BUILDERS[def.archetype](s, c);
  }
  if (collect && !grid.onFire[i] && c.ht > 20) {
    let hasBeacon = false;
    for (let k = anim0; k < pendingAnims.length; k++) hasBeacon ||= pendingAnims[k].kind === AnimKind.Beacon;
    if (!hasBeacon) {
      const [wx, wy, wz] = s.toWorld(def.w * 0.5, c.ht + 0.12, def.h * 0.5);
      pendingAnims.push({ kind: AnimKind.Beacon, x: wx, y: wy, z: wz, yaw: 0, speed: 1, phase: hash2(c.seedI, 83, 3), scale: 0.22 });
    }
  }
  if (abandoned || grid.onFire[i]) {
    const fire = !!grid.onFire[i];
    for (let v = v0; v < s.v; v++) {
      const p = v * 3;
      if (fire) {
        s.col[p] = s.col[p] * 0.35 + 0.55;
        s.col[p + 1] *= 0.22;
        s.col[p + 2] *= 0.08;
      } else {
        const grey = (s.col[p] + s.col[p + 1] + s.col[p + 2]) / 3;
        s.col[p] = lerp(s.col[p], grey, 0.55) * 0.48;
        s.col[p + 1] = lerp(s.col[p + 1], grey, 0.55) * 0.48;
        s.col[p + 2] = lerp(s.col[p + 2], grey, 0.55) * 0.48;
      }
      s.emi[v] = 0;
    }
  }
}

function geometryFrom(s: GeoSink): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(s.pos.slice(0, s.v * 3), 3));
  g.setAttribute('normal', new THREE.BufferAttribute(s.nor.slice(0, s.v * 3), 3));
  g.setAttribute('color', new THREE.BufferAttribute(s.col.slice(0, s.v * 3), 3));
  g.setAttribute('aEmissive', new THREE.BufferAttribute(s.emi.slice(0, s.v), 1));
  g.setIndex(new THREE.BufferAttribute(s.ind.slice(0, s.ic), 1));
  g.computeBoundingSphere();
  return g;
}

interface PopState {
  i: number;
  t: number;
  mesh: THREE.Mesh;
  baseY: number;
}

/* ------------------------------- renderer -------------------------------- */

export class BuildingRenderer {
  private readonly scene: THREE.Scene;
  private readonly grid: Grid;
  private readonly sink = new GeoSink();
  private readonly chunks: Array<THREE.Mesh | null> = new Array(CHUNKS_X * CHUNKS_Y).fill(null);
  private readonly chunkAnims: AnimSpot[][] = Array.from({ length: CHUNKS_X * CHUNKS_Y }, () => []);
  private readonly suppressed = new Set<number>();
  private readonly pops: PopState[] = [];
  private readonly material: THREE.MeshLambertMaterial;
  private readonly nightUniform = { value: 0 };
  private readonly animMaterial: THREE.MeshStandardMaterial;
  private rotorMesh: THREE.InstancedMesh | null = null;
  private beaconMesh: THREE.InstancedMesh | null = null;
  private radarMesh: THREE.InstancedMesh | null = null;
  private rotorSpots: AnimSpot[] = [];
  private beaconSpots: AnimSpot[] = [];
  private radarSpots: AnimSpot[] = [];
  private readonly matrix = new THREE.Matrix4();
  private readonly position = new THREE.Vector3();
  private readonly quaternion = new THREE.Quaternion();
  private readonly scale = new THREE.Vector3();
  private readonly qYaw = new THREE.Quaternion();
  private readonly qSpin = new THREE.Quaternion();
  private disposed = false;

  constructor(scene: THREE.Scene, grid: Grid) {
    this.scene = scene;
    this.grid = grid;
    this.material = new THREE.MeshLambertMaterial({ vertexColors: true });
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.uNight = this.nightUniform;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nattribute float aEmissive;\nvarying float vBuildingEmissive;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvBuildingEmissive = aEmissive;');
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nuniform float uNight;\nvarying float vBuildingEmissive;')
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
          float eBand = floor(vBuildingEmissive);
          float eStrength = fract(vBuildingEmissive);
          float eGate = smoothstep(eBand < 0.5 ? 0.42 : (eBand < 1.5 ? 0.22 : 0.08), 0.82, uNight);
          vec3 eColour = eBand < 0.5 ? vec3(1.0, 0.694, 0.254) : vColor;
          totalEmissiveRadiance += eColour * eStrength * eGate * 1.8;`,
        );
    };
    this.material.customProgramCacheKey = () => 'sethcity-building-emissive-v1';
    this.animMaterial = new THREE.MeshStandardMaterial({ color: 0xe7eaec, roughness: 0.55, metalness: 0.3 });
    this.rebuildAll();
  }

  rebuildAll(): void {
    if (this.disposed) return;
    for (let cy = 0; cy < CHUNKS_Y; cy++) for (let cx = 0; cx < CHUNKS_X; cx++) this.rebuildChunkInternal(cx, cy, false);
    this.rebuildAnimatedMeshes();
  }

  rebuildChunk(cx: number, cy: number): void {
    this.rebuildChunkInternal(cx, cy, true);
  }

  private rebuildChunkInternal(cx: number, cy: number, refreshAnims: boolean): void {
    if (this.disposed || cx < 0 || cy < 0 || cx >= CHUNKS_X || cy >= CHUNKS_Y) return;
    const ci = cy * CHUNKS_X + cx;
    const old = this.chunks[ci];
    if (old) {
      this.scene.remove(old);
      old.geometry.dispose();
      this.chunks[ci] = null;
    }
    this.sink.reset();
    pendingAnims = [];
    const x0 = cx * CHUNK;
    const y0 = cy * CHUNK;
    for (let y = y0; y < y0 + CHUNK; y++) for (let x = x0; x < x0 + CHUNK; x++) {
      const i = idx(x, y);
      if (!this.grid.building[i] || this.grid.originOffset[i] !== 0 || this.suppressed.has(i)) continue;
      buildOne(this.sink, this.grid, i);
    }
    this.chunkAnims[ci] = pendingAnims;
    if (this.sink.v) {
      const mesh = new THREE.Mesh(geometryFrom(this.sink), this.material);
      mesh.name = `buildings-${cx}-${cy}`;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = true;
      this.scene.add(mesh);
      this.chunks[ci] = mesh;
    }
    if (refreshAnims) this.rebuildAnimatedMeshes();
  }

  update(dt: number, elapsed: number, nightFactor: number): void {
    if (this.disposed) return;
    this.nightUniform.value = clamp(nightFactor, 0, 1);
    this.updateRotors(elapsed);
    this.updateRadars(elapsed);
    this.updateBeacons(elapsed, nightFactor);
    for (let p = this.pops.length - 1; p >= 0; p--) {
      const pop = this.pops[p];
      pop.t += dt / 0.5;
      const t = Math.min(1, pop.t);
      const elastic = t === 1 ? 1 : Math.pow(2, -9 * t) * Math.sin((t * 9 - 0.7) * Math.PI) + 1;
      pop.mesh.scale.set(elastic, Math.max(0.02, elastic), elastic);
      pop.mesh.position.y = pop.baseY;
      if (t >= 1) {
        this.scene.remove(pop.mesh);
        pop.mesh.geometry.dispose();
        this.suppressed.delete(pop.i);
        this.pops.splice(p, 1);
        this.rebuildChunkInternal((tx(pop.i) / CHUNK) | 0, (ty(pop.i) / CHUNK) | 0, true);
      }
    }
  }

  popIn(i: number): void {
    if (this.disposed || !this.grid.building[i]) return;
    const origin = this.grid.originOffset[i] === 0 ? i : this.grid.originOf(tx(i), ty(i));
    if (origin < 0 || this.suppressed.has(origin)) return;
    this.suppressed.add(origin);
    this.rebuildChunkInternal((tx(origin) / CHUNK) | 0, (ty(origin) / CHUNK) | 0, true);
    this.sink.reset();
    pendingAnims = [];
    buildOne(this.sink, this.grid, origin, false);
    if (!this.sink.v) {
      this.suppressed.delete(origin);
      this.rebuildChunkInternal((tx(origin) / CHUNK) | 0, (ty(origin) / CHUNK) | 0, true);
      return;
    }
    const mesh = new THREE.Mesh(geometryFrom(this.sink), this.material);
    const def = defOf(this.grid.building[origin]);
    const cx = tx(origin) + def.w * 0.5;
    const cz = ty(origin) + def.h * 0.5;
    // Geometry is already in world space; scale around the footprint centre.
    const baseY = buildingBaseY(this.grid, origin);
    mesh.geometry.translate(-cx, -baseY, -cz);
    mesh.position.set(cx, baseY, cz);
    mesh.scale.setScalar(0.02);
    mesh.castShadow = true;
    this.scene.add(mesh);
    this.pops.push({ i: origin, t: 0, mesh, baseY });
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    for (const mesh of this.chunks) if (mesh) {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
    }
    for (const pop of this.pops) {
      this.scene.remove(pop.mesh);
      pop.mesh.geometry.dispose();
    }
    this.removeAnimatedMeshes();
    this.material.dispose();
    this.animMaterial.dispose();
    this.pops.length = 0;
    this.suppressed.clear();
  }

  private removeAnimatedMeshes() {
    for (const mesh of [this.rotorMesh, this.beaconMesh, this.radarMesh]) if (mesh) {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      if (mesh.material !== this.animMaterial) (mesh.material as THREE.Material).dispose();
    }
    this.rotorMesh = null;
    this.beaconMesh = null;
    this.radarMesh = null;
  }

  private rebuildAnimatedMeshes() {
    this.removeAnimatedMeshes();
    this.rotorSpots = [];
    this.beaconSpots = [];
    this.radarSpots = [];
    for (const list of this.chunkAnims) for (const spot of list) {
      if (spot.kind === AnimKind.Rotor) this.rotorSpots.push(spot);
      else if (spot.kind === AnimKind.Beacon) this.beaconSpots.push(spot);
      else this.radarSpots.push(spot);
    }
    if (this.rotorSpots.length) {
      const g = new THREE.BoxGeometry(0.075, 1, 0.035);
      g.translate(0, 0.48, 0);
      this.rotorMesh = new THREE.InstancedMesh(g, this.animMaterial, this.rotorSpots.length * 3);
      this.rotorMesh.name = 'building-wind-rotors';
      this.rotorMesh.frustumCulled = false;
      this.scene.add(this.rotorMesh);
    }
    if (this.beaconSpots.length) {
      const g = new THREE.OctahedronGeometry(0.07, 0);
      const m = new THREE.MeshStandardMaterial({ color: 0xff2018, emissive: 0xff1008, emissiveIntensity: 0 });
      this.beaconMesh = new THREE.InstancedMesh(g, m, this.beaconSpots.length);
      this.beaconMesh.name = 'building-aviation-beacons';
      this.beaconMesh.frustumCulled = false;
      this.scene.add(this.beaconMesh);
    }
    if (this.radarSpots.length) {
      const g = new THREE.BoxGeometry(0.75, 0.06, 0.16);
      this.radarMesh = new THREE.InstancedMesh(g, this.animMaterial, this.radarSpots.length);
      this.radarMesh.name = 'building-radars';
      this.radarMesh.frustumCulled = false;
      this.scene.add(this.radarMesh);
    }
  }

  private updateRotors(elapsed: number) {
    if (!this.rotorMesh) return;
    let n = 0;
    for (const a of this.rotorSpots) for (let blade = 0; blade < 3; blade++) {
      this.position.set(a.x, a.y, a.z);
      this.qYaw.setFromAxisAngle(this.position.set(0, 1, 0), a.yaw);
      this.qSpin.setFromAxisAngle(this.position.set(0, 0, 1), elapsed * a.speed + a.phase + blade * Math.PI * 2 / 3);
      this.quaternion.copy(this.qYaw).multiply(this.qSpin);
      this.position.set(a.x, a.y, a.z);
      this.scale.set(a.scale, a.scale, a.scale);
      this.matrix.compose(this.position, this.quaternion, this.scale);
      this.rotorMesh.setMatrixAt(n++, this.matrix);
    }
    this.rotorMesh.instanceMatrix.needsUpdate = true;
  }

  private updateRadars(elapsed: number) {
    if (!this.radarMesh) return;
    for (let k = 0; k < this.radarSpots.length; k++) {
      const a = this.radarSpots[k];
      this.position.set(a.x, a.y, a.z);
      this.quaternion.setFromAxisAngle(this.scale.set(0, 1, 0), elapsed * a.speed + a.phase);
      this.scale.setScalar(a.scale);
      this.matrix.compose(this.position, this.quaternion, this.scale);
      this.radarMesh.setMatrixAt(k, this.matrix);
    }
    this.radarMesh.instanceMatrix.needsUpdate = true;
  }

  private updateBeacons(elapsed: number, night: number) {
    if (!this.beaconMesh) return;
    for (let k = 0; k < this.beaconSpots.length; k++) {
      const a = this.beaconSpots[k];
      const pulse = Math.max(0.08, Math.pow(Math.max(0, Math.sin(elapsed * 3.4 + a.phase * Math.PI * 2)), 12));
      this.position.set(a.x, a.y, a.z);
      this.quaternion.identity();
      this.scale.setScalar(a.scale * (0.6 + pulse * 0.7));
      this.matrix.compose(this.position, this.quaternion, this.scale);
      this.beaconMesh.setMatrixAt(k, this.matrix);
    }
    this.beaconMesh.instanceMatrix.needsUpdate = true;
    const mat = this.beaconMesh.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = clamp(night, 0, 1) * (0.5 + Math.pow(Math.max(0, Math.sin(elapsed * 3.4)), 10) * 3.5);
  }
}
