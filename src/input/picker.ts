import { idx, type ToolId } from '../core/types';
import type { GameState } from '../core/state';
import type { Actions } from '../sim/actions';
import type { CameraController } from './camera-controls';

export interface PickerHost {
  state: GameState;
  actions: Actions;
  controls: CameraController;
  overUI(x: number, y: number): boolean;
  onHighlight(r: { x0: number; y0: number; x1: number; y1: number; valid: boolean } | null): void;
  onSelect(i: number | null): void;
  sfx(name: string): void;
  toast(msg: string, kind?: 'info' | 'warn' | 'bad'): void;
  money(amount: number, clientX: number, clientY: number): void;
  promptSign(): Promise<string | null>;
}

const dragTool = (t: ToolId) => t === 'bulldoze' || t === 'tree' || t.startsWith('zone_') || t.startsWith('road_') || t === 'rail' || t === 'wire' || t === 'pipe' || t === 'subway';

export class Picker {
  private pointer: number | null = null;
  private x0 = 0; private y0 = 0; private x1 = 0; private y1 = 0;
  private clientX = 0; private clientY = 0;
  private downX = 0; private downY = 0;
  private moved = false;
  private longPressed = false;
  private timer = 0;
  private tool: ToolId = 'inspect';

  constructor(private dom: HTMLElement, private host: PickerHost) {
    dom.addEventListener('pointerdown', this.onDown);
    dom.addEventListener('pointermove', this.onMove);
    dom.addEventListener('pointerup', this.onUp);
    dom.addEventListener('pointercancel', this.onCancel);
  }

  private onDown = (e: PointerEvent) => {
    if (this.pointer !== null || e.button !== 0 || this.host.overUI(e.clientX, e.clientY)) return;
    const tile = this.host.controls.screenToTile(e.clientX, e.clientY, this.host.state.grid);
    if (!tile) return;
    this.pointer = e.pointerId; this.tool = this.host.state.tool;
    this.x0 = this.x1 = tile.x; this.y0 = this.y1 = tile.y;
    this.downX = this.clientX = e.clientX; this.downY = this.clientY = e.clientY;
    this.moved = this.longPressed = false;
    if (this.tool !== 'inspect') this.host.controls.enabled = false;
    if (this.tool === 'inspect') this.timer = window.setTimeout(() => {
      if (this.pointer === e.pointerId && !this.moved && !this.host.controls.gesturing) {
        this.longPressed = true; this.selectTile(this.x0, this.y0); this.host.onHighlight(null); this.host.sfx('click');
      }
    }, 500);
  };

  private onMove = (e: PointerEvent) => {
    if (e.pointerId !== this.pointer) return;
    this.clientX = e.clientX; this.clientY = e.clientY;
    if (this.host.controls.gesturing) { this.abort(); return; }
    if (Math.hypot(e.clientX - this.downX, e.clientY - this.downY) > 7) { this.moved = true; clearTimeout(this.timer); }
    const tile = this.host.controls.screenToTile(e.clientX, e.clientY, this.host.state.grid);
    if (!tile) return;
    this.x1 = tile.x; this.y1 = tile.y;
    if (dragTool(this.tool)) this.preview();
  };

  private preview(): void {
    const r = this.host.actions.applyTool(this.tool, this.x0, this.y0, this.x1, this.y1, true);
    this.host.onHighlight({ x0: this.x0, y0: this.y0, x1: this.x1, y1: this.y1, valid: r.ok });
  }

  private selectTile(x: number, y: number): void {
    const g = this.host.state.grid;
    const i = idx(x, y);
    const occupied = !!(g.building[i] || g.road[i] || g.rail[i] || g.wire[i] || g.pipe[i] || g.subway[i] || g.zone[i] || g.tree[i] || g.water[i]);
    this.host.onSelect(occupied ? i : null);
  }

  private onUp = (e: PointerEvent) => {
    if (e.pointerId !== this.pointer) return;
    clearTimeout(this.timer);
    if (this.host.controls.gesturing || this.longPressed) { this.abort(); return; }
    const tool = this.tool;
    const x0 = this.x0, y0 = this.y0, x1 = dragTool(tool) ? this.x1 : this.x0, y1 = dragTool(tool) ? this.y1 : this.y0;
    this.pointer = null; this.host.controls.enabled = true; this.host.onHighlight(null);
    if (tool === 'inspect') { if (!this.moved) this.selectTile(x0, y0); return; }
    if (tool === 'sign') { void this.placeSign(x0, y0, e.clientX, e.clientY); return; }
    this.apply(tool, x0, y0, x1, y1, e.clientX, e.clientY);
  };

  private async placeSign(x: number, y: number, cx: number, cy: number): Promise<void> {
    const text = await this.host.promptSign();
    if (text === null) return;
    this.host.actions.pendingSignText = text;
    this.apply('sign', x, y, x, y, cx, cy);
  }

  private apply(tool: ToolId, x0: number, y0: number, x1: number, y1: number, cx: number, cy: number): void {
    const r = this.host.actions.applyTool(tool, x0, y0, x1, y1, false);
    if (r.ok) { if (r.cost) this.host.money(-r.cost, cx, cy); this.host.sfx(tool === 'bulldoze' ? 'bulldoze' : 'place'); }
    else { this.host.sfx('error'); this.host.toast(r.reason ?? 'Cannot place here', 'warn'); }
  }

  private abort(): void { clearTimeout(this.timer); this.pointer = null; this.host.controls.enabled = true; this.host.onHighlight(null); }
  private onCancel = (e: PointerEvent) => { if (e.pointerId === this.pointer) this.abort(); };
  update(): void { if (this.pointer !== null && this.host.controls.gesturing) this.abort(); }
  dispose(): void { this.abort(); this.dom.removeEventListener('pointerdown', this.onDown); this.dom.removeEventListener('pointermove', this.onMove); this.dom.removeEventListener('pointerup', this.onUp); this.dom.removeEventListener('pointercancel', this.onCancel); }
}
