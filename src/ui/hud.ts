import { bus } from '../core/events';
import type { GameState } from '../core/state';
import type { OverlayId, SpeedId } from '../core/types';

const svg = (path: string) => `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
const coin = svg('<circle cx="12" cy="12" r="8"/><path d="M14.5 8.5c-1-1-4-.8-4 .8 0 2.5 4.5 1 4.5 3.7 0 1.8-3.5 2.3-5.5.5M12 6v12"/>');
const people = svg('<circle cx="9" cy="8" r="3"/><path d="M3 19c.5-4 2.5-6 6-6s5.5 2 6 6M16 7.5a2.5 2.5 0 0 1 0 5M16 14c3 .2 4.5 2 5 5"/>');

export interface HUDCallbacks { menu(): void; panels(): void; overlays(anchor: HTMLElement): void; }

export class HUD {
  readonly element: HTMLElement;
  private fundsShown: number;
  private targetFunds: number;
  private tickerOffset = 0;
  private readonly offs: (() => void)[] = [];

  constructor(private readonly state: () => GameState, callbacks: HUDCallbacks) {
    this.fundsShown = this.targetFunds = state().budget.funds;
    this.element = document.createElement('div');
    this.element.innerHTML = `<div class="hud-top" data-ui>
      <div class="pill hud-funds">${coin}<span class="num funds-v"></span></div>
      <div class="pill hud-date"><span class="season"></span><span class="date-txt"></span></div>
      <div class="pill hud-pop">${people}<span class="num pop-v"></span></div>
      <div class="pill hud-face"><span class="face-v"></span></div><div class="hud-spacer"></div>
      <div class="speed-group" aria-label="Game speed"></div>
      <button class="icon-btn overlay-btn" aria-label="Map overlays">${svg('<path d="m4 8 8-4 8 4-8 4-8-4Z"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4"/>')}</button>
      <button class="icon-btn panels-btn" aria-label="City panels">${svg('<path d="M5 6h14M5 12h14M5 18h14"/>')}<span class="dot" hidden></span></button>
      <button class="icon-btn menu-btn-top" aria-label="Menu">${svg('<circle cx="12" cy="12" r="9"/><path d="M8 9h8M8 12h8M8 15h8"/>')}</button>
    </div><div class="rci" data-ui aria-label="Residential, commercial and industrial demand"></div>
    <div class="bottom-stack"><div class="ticker" data-ui><button class="ticker-line"><span class="ic">◈</span><span class="ticker-view"><span class="ticker-track"></span></span></button><div class="ticker-list"></div></div><div class="drawer-mount"></div></div>`;
    const speed = this.q('.speed-group');
    ['⏸', '▶', '▶▶', '▶▶▶'].forEach((s, i) => { const b = document.createElement('button'); b.textContent = s; b.ariaLabel = `Speed ${i}`; b.onclick = () => { state().speed = i as SpeedId; bus.emit('speed:changed', { speed: i as SpeedId }); this.refresh(); }; speed.append(b); });
    this.q('.overlay-btn').addEventListener('click', (e) => callbacks.overlays(e.currentTarget as HTMLElement));
    this.q('.panels-btn').addEventListener('click', callbacks.panels);
    this.q('.menu-btn-top').addEventListener('click', callbacks.menu);
    this.q('.ticker-line').addEventListener('click', () => this.q('.ticker').classList.toggle('open'));
    this.offs.push(bus.on('budget:updated', (b) => { this.targetFunds = b.funds; }), bus.on('stats:updated', () => this.refresh()), bus.on('time:updated', () => this.refresh()), bus.on('news', (n) => this.addNews(n.text, n.kind)), bus.on('paper', () => { (this.q('.panels-btn .dot') as HTMLElement).hidden = false; }));
    state().news.slice(-8).forEach((n) => this.addNews(n.text, n.kind));
    this.refresh();
  }

  mount(root: HTMLElement): void { root.append(this.element); }
  drawerMount(): HTMLElement { return this.q('.drawer-mount'); }
  update(dt: number): void {
    this.targetFunds = this.state().budget.funds;
    this.fundsShown += (this.targetFunds - this.fundsShown) * Math.min(1, dt * 7);
    const funds = this.q('.hud-funds'); funds.classList.toggle('neg', this.targetFunds < 0);
    this.q('.funds-v').textContent = `§${Math.round(this.fundsShown).toLocaleString()}`;
    this.tickerOffset += dt;
  }
  setOverlay(id: OverlayId): void { this.q('.overlay-btn').classList.toggle('on', id !== 'none'); }
  clearPaperBadge(): void { (this.q('.panels-btn .dot') as HTMLElement).hidden = true; }
  dispose(): void { this.offs.forEach((off) => off()); }

  private refresh(): void {
    const s = this.state(); const t = s.time;
    this.targetFunds = s.budget.funds;
    this.q('.pop-v').textContent = s.stats.population.toLocaleString();
    this.q('.date-txt').textContent = `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][t.month]} ${t.day}, ${t.year}`;
    const season = this.q('.season'); season.className = `season s${t.season}`; season.textContent = ['✿','☀','◇','❄'][t.season];
    const a = s.stats.approval; this.q('.face-v').textContent = a > .7 ? '◉‿◉' : a > .45 ? '◉—◉' : a > .25 ? '◉︵◉' : '×︵×';
    Array.from(this.q('.speed-group').children).forEach((b, i) => b.classList.toggle('on', i === s.speed));
    const rci = this.q('.rci'); rci.innerHTML = '';
    ([['r','R'],['c','C'],['i','I']] as const).forEach(([k,l]) => { const v=s.demand[k]; const col=document.createElement('div'); col.className=`rci-col rci-${k}`; const size=Math.abs(v)*50; col.innerHTML=`<div class="rci-bar"><i class="rci-fill" style="height:${size}%;${v>=0?'bottom':'top'}:50%"></i></div><span class="rci-lbl">${l}</span>`; rci.append(col); });
  }
  private addNews(text: string, kind: string): void {
    const track=this.q('.ticker-track'); const span=document.createElement('span'); span.className=`t-${kind}`; span.textContent=text; track.prepend(span); if(track.children.length>12) track.lastElementChild?.remove();
    const row=document.createElement('div'); row.className=`ticker-item k-${kind}`; row.innerHTML='<span class="when">Now</span><span></span>'; row.lastElementChild!.textContent=text; this.q('.ticker-list').prepend(row); if(this.q('.ticker-list').children.length>12) this.q('.ticker-list').lastElementChild?.remove();
  }
  private q(sel: string): HTMLElement { return this.element.querySelector(sel) as HTMLElement; }
}
