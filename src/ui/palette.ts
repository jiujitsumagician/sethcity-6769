import { CATALOG, PLACEABLE } from '../core/catalog';
import { bus } from '../core/events';
import type { GameState } from '../core/state';
import type { Archetype, Category, ToolId } from '../core/types';

interface Item { tool: ToolId; name: string; cost: number; category: DrawerCategory; desc: string; archetype: Archetype | 'network' | 'zone' | 'terrain'; unlockPop?: number; key?: string; }
type DrawerCategory = Category | 'zones' | 'roads' | 'terrain' | 'bulldoze';

const categories: [DrawerCategory, string][] = [['zones','Zones'],['roads','Roads'],['power','Power'],['water','Water'],['safety','Safety'],['health','Health'],['education','Education'],['leisure','Leisure'],['transport','Transport'],['special','Special'],['terrain','Terrain'],['bulldoze','Bulldoze']];
const tools: Item[] = [
  ['zone_res_low','Residential L','zones',8,'zone'],['zone_res_med','Residential M','zones',16,'zone'],['zone_res_high','Residential H','zones',24,'zone'],
  ['zone_com_low','Commercial L','zones',8,'zone'],['zone_com_med','Commercial M','zones',16,'zone'],['zone_com_high','Commercial H','zones',24,'zone'],
  ['zone_ind_low','Industrial L','zones',8,'zone'],['zone_ind_med','Industrial M','zones',16,'zone'],['zone_ind_high','Industrial H','zones',24,'zone'],
  ['road_street','Street','roads',12,'network'],['road_avenue','Avenue','roads',60,'network'],['road_highway','Highway','roads',220,'network'],['rail','Rail','roads',90,'network'],
  ['wire','Power Line','power',6,'network'],['pipe','Water Pipe','water',10,'network'],['subway','Subway Tunnel','transport',150,'network'],['sign','City Sign','special',50,'network'],
  ['tree','Plant Trees','terrain',12,'terrain'],['water_place','Place Water','terrain',120,'terrain'],['terrain_raise','Raise','terrain',25,'terrain'],['terrain_lower','Lower','terrain',25,'terrain'],['terrain_level','Level','terrain',25,'terrain'],['inspect','Inspect','terrain',0,'terrain'],['bulldoze','Bulldoze','bulldoze',4,'terrain'],
].map(([tool,name,category,cost,archetype]) => ({ tool: tool as ToolId, name: name as string, category: category as DrawerCategory, cost: cost as number, archetype: archetype as Item['archetype'], desc: `${name} tool.` }));

export class Palette {
  readonly element: HTMLElement;
  private active: DrawerCategory | null = null;
  private pressTimer = 0;
  private readonly offs: (() => void)[] = [];

  constructor(private readonly state: () => GameState) {
    this.element = document.createElement('div'); this.element.className='drawer'; this.element.dataset.ui='';
    this.element.innerHTML='<div class="drawer-items"></div><div class="drawer-cats"></div><div class="tool-chip"><span class="ic"></span><span class="tool-name"></span><button class="x" aria-label="Cancel tool">×</button></div>';
    const rail=this.q('.drawer-cats');
    categories.forEach(([id,name]) => { const b=document.createElement('button'); b.className='d-cat'; b.dataset.cat=id; b.innerHTML=`<span class="ic">${glyph(categoryGlyph(id))}</span><span>${name}</span>`; b.onclick=()=>this.chooseCategory(id); rail.append(b); });
    this.q('.tool-chip .x').onclick=()=>this.select('inspect','Inspect');
    this.offs.push(bus.on('budget:updated',()=>this.refreshItems()),bus.on('stats:updated',()=>this.refreshItems()));
  }
  update(): void { this.updateChip(); }
  dispose(): void { clearTimeout(this.pressTimer); this.offs.forEach((off)=>off()); this.element.remove(); }

  private chooseCategory(id: DrawerCategory): void {
    if (id==='bulldoze') { this.select('bulldoze','Bulldoze'); return; }
    this.active=this.active===id?null:id; this.element.classList.toggle('expanded',!!this.active);
    this.element.querySelectorAll('.d-cat').forEach((e)=>e.classList.toggle('on',(e as HTMLElement).dataset.cat===this.active)); this.refreshItems();
  }
  private allItems(): Item[] {
    const defs: Item[]=PLACEABLE.map(d=>({tool:`build_${d.key}`,name:d.name,cost:d.cost,category:d.category,desc:d.desc??`${d.name}, ${d.w}×${d.h} tiles.`,archetype:d.archetype,unlockPop:d.unlockPop,key:d.key}));
    return [...tools,...defs];
  }
  private builtFor: string | null = null;
  private refreshItems(): void {
    const grid=this.q('.drawer-items'); if(!this.active){ grid.innerHTML=''; this.builtFor=null; return; }
    const s=this.state();
    const items=this.allItems().filter(i=>i.category===this.active);
    /* Rebuild DOM only when the category (or lock set) changes — stats/budget
       events fire every tick and a full rebuild would detach buttons mid-tap. */
    const sig=this.active+'|'+items.map(i=>this.isUnlocked(i,s)?1:0).join('');
    if(this.builtFor!==sig){
      this.builtFor=sig; grid.innerHTML='';
      items.forEach(item=>{
        const b=document.createElement('button'); b.className='d-item'; b.dataset.tool=item.tool;
        b.innerHTML=`<span class="ic">${glyph(item.archetype)}</span><span class="nm"></span><span class="cost">${item.cost?`§${item.cost.toLocaleString()}`:'Free'}</span><span class="d-lock" hidden>${item.unlockPop?.toLocaleString()??'Reward'}</span>`;
        (b.querySelector('.nm') as HTMLElement).textContent=item.name;
        b.onclick=()=>{ if(b.classList.contains('poor')){ bus.emit('money:denied',{reason:'Not enough funds'}); } else if(!b.classList.contains('locked')) this.select(item.tool,item.name); };
        const show=(e:PointerEvent)=>{this.pressTimer=window.setTimeout(()=>this.describe(item,b),520); b.setPointerCapture?.(e.pointerId);};
        b.addEventListener('pointerdown',show); ['pointerup','pointercancel','pointermove'].forEach(k=>b.addEventListener(k,()=>clearTimeout(this.pressTimer)));
        grid.append(b);
      });
    }
    /* light pass: update state classes in place */
    const byTool=new Map(items.map(i=>[i.tool,i] as const));
    grid.querySelectorAll<HTMLButtonElement>('.d-item').forEach(b=>{
      const item=byTool.get(b.dataset.tool as Item['tool']); if(!item)return;
      const locked=!this.isUnlocked(item,s); const poor=s.difficulty!=='sandbox'&&item.cost>s.budget.funds;
      b.classList.toggle('locked',locked); b.classList.toggle('poor',poor); b.classList.toggle('sel',s.tool===item.tool);
      b.disabled=locked; (b.querySelector('.d-lock') as HTMLElement).hidden=!locked;
    });
  }
  private isUnlocked(item: Item,s:GameState): boolean { if(s.difficulty==='sandbox'||!item.unlockPop)return !item.key||!item.key.startsWith('x_')||item.cost>0||s.unlocked.has(item.key); return s.stats.population>=item.unlockPop||!!item.key&&s.unlocked.has(item.key); }
  private describe(item:Item,anchor:HTMLElement):void { this.element.parentElement?.querySelector('.d-desc')?.remove(); const d=document.createElement('div'); d.className='d-desc'; d.innerHTML='<b></b><div class="sub"></div>'; d.querySelector('b')!.textContent=item.name; d.querySelector('.sub')!.textContent=item.desc; const r=anchor.getBoundingClientRect(); d.style.left=`${Math.max(8,Math.min(innerWidth-258,r.left))}px`; d.style.bottom=`${innerHeight-r.top+8}px`; this.element.parentElement?.append(d); setTimeout(()=>d.remove(),2800); }
  private select(tool:ToolId,name:string):void { const s=this.state(); s.tool=tool; bus.emit('tool:changed',{tool}); this.active=null; this.element.classList.remove('expanded'); this.updateChip(name); }
  private updateChip(name?:string):void { const tool=this.state().tool; const chip=this.q('.tool-chip'); chip.classList.toggle('show',tool!=='inspect'); const item=this.allItems().find(i=>i.tool===tool); this.q('.tool-name').textContent=name??item?.name??tool; this.q('.tool-chip .ic').innerHTML=glyph(item?.archetype??'terrain'); }
  private q(sel:string):HTMLElement{return this.element.querySelector(sel) as HTMLElement;}
}

function categoryGlyph(c:DrawerCategory):Item['archetype'] { return c==='roads'?'network':c==='zones'?'zone':c==='terrain'||c==='bulldoze'?'terrain':(CATALOG.find(d=>d.category===c)?.archetype??'landmark'); }
function glyph(kind:Item['archetype']):string { const p:Record<string,string>={zone:'<path d="M3 20V8l9-5 9 5v12M8 20v-7h8v7"/>',network:'<path d="M4 21 10 3h4l6 18M8 14h8M7 18h10"/>',powerplant:'<path d="M4 20V9h6v11M14 20V4h6v16M13 9l-3 4h4l-3 5"/>',watertower:'<path d="M7 4h10l2 5-2 4H7L5 9l2-5ZM9 13 7 21M15 13l2 8M8 18h8"/>',hospital:'<path d="M5 21V5h14v16M9 10h6M12 7v6M8 21v-5h8v5"/>',school:'<path d="m3 9 9-5 9 5-9 5-9-5Zm3 3v5c4 3 8 3 12 0v-5"/>',park:'<path d="M12 3 7 11h3l-4 6h5v4h2v-4h5l-4-6h3l-5-8Z"/>',terrain:'<path d="m3 18 5-7 4 4 3-5 6 8H3Z"/>',landmark:'<path d="M5 21h14M7 21V9h10v12M9 9l3-6 3 6M10 14h4"/>',transit:'<path d="M6 4h12v13H6V4Zm2 4h8M9 17l-2 4M15 17l2 4"/>',airport:'<path d="m3 13 8-2V4l2-1 1 8 7 2v2l-7 1-1 5h-2v-5l-8-1v-2Z"/>',port:'<path d="M4 18h16M6 18V7h9l3 5M8 7V4h7M3 20c3 2 6-2 9 0s6-2 9 0"/>',house:'<path d="m3 11 9-7 9 7M5 10v10h14V10M10 20v-6h4v6"/>',default:'<rect x="5" y="5" width="14" height="15"/><path d="M8 9h2M14 9h2M8 13h2M14 13h2"/>'}; return `<svg viewBox="0 0 24 24" aria-hidden="true">${p[kind]??p.default}</svg>`; }
