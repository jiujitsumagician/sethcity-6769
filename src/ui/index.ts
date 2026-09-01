import type { Actions } from '../sim/actions';
import type { GameState } from '../core/state';
import type { Difficulty } from '../core/types';
import { bus } from '../core/events';
import { HUD } from './hud';
import { Palette } from './palette';
import { Panels } from './panels';
import { Toasts } from './toast';
import { Tutorial } from './tutorial';

export interface UIHost {
  state:GameState;
  actions:Actions;
  focus(x:number,y:number):void;
  setQuality(q:'low'|'medium'|'high'):void;
  save():Promise<void>;
  load(slot:string):Promise<void>;
  newGame(opts:{name:string;mayor?:string;shape:string;water:number;hills:number;trees:number;seed:number;difficulty?:Difficulty;disasters?:boolean}):void;
  sfx(name:string):void;
}

export class UI {
  private readonly hud:HUD;
  private readonly palette:Palette;
  private readonly panels:Panels;
  private readonly toasts:Toasts;
  private readonly tutorial:Tutorial;
  private readonly menu:HTMLElement;
  private readonly offs:(()=>void)[]=[];
  private elapsed=0;

  constructor(private readonly root:HTMLElement,private readonly host:UIHost){
    root.replaceChildren();
    this.toasts=new Toasts(root);
    this.panels=new Panels(host,this.toasts,()=>this.showMenu());root.append(this.panels.element);
    this.hud=new HUD(()=>host.state,{menu:()=>this.showMenu(),panels:()=>this.panels.showPicker(),overlays:a=>this.panels.showOverlays(a)});this.hud.mount(root);
    this.palette=new Palette(()=>host.state,message=>this.toasts.toast(message,'info'));this.hud.drawerMount().append(this.palette.element);
    this.tutorial=new Tutorial(root,()=>host.state);
    this.menu=document.createElement('div');this.menu.className='menu show';this.menu.dataset.ui='';root.append(this.menu);this.renderMenuHome();
    this.offs.push(bus.on('overlay:changed',({overlay})=>this.hud.setOverlay(overlay)),bus.on('paper',()=>this.toasts.toast('A new Llama Ledger is out','info')),bus.on('game:loaded',()=>{this.panels.close();this.palette.update();}));
    void this.probeAutosave();
  }
  update(dt:number):void{this.elapsed+=dt;this.hud.update(dt);this.palette.update();this.panels.update(this.elapsed);}
  hitTest(x:number,y:number):boolean{const el=document.elementFromPoint(x,y);return !!el&&this.root.contains(el)&&!!el.closest('[data-ui]');}
  showTileInspector(i:number|null):void{this.panels.showInspector(i);}
  promptSignText():Promise<string|null>{return new Promise(resolve=>{const back=document.createElement('div');back.className='modal-back';back.dataset.ui='';back.innerHTML='<form class="modal"><h3>Place a city sign</h3><input class="tin" maxlength="24" autocomplete="off" placeholder="Sign text"><div class="acts"><button type="button" class="btn cancel">Cancel</button><button class="btn primary">OK</button></div></form>';this.root.append(back);const input=back.querySelector('input')!;let settled=false;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();done(null);}};const done=(v:string|null)=>{if(settled)return;settled=true;document.removeEventListener('keydown',onKey);back.remove();resolve(v);};document.addEventListener('keydown',onKey);back.querySelector('.cancel')!.addEventListener('click',()=>done(null));back.querySelector('form')!.addEventListener('submit',e=>{e.preventDefault();const v=input.value.trim();done(v||null);});requestAnimationFrame(()=>input.focus());});}
  dispose():void{this.offs.forEach(o=>o());this.hud.dispose();this.palette.dispose();this.panels.dispose();this.toasts.dispose();this.tutorial.dispose();this.menu.remove();}

  private showMenu():void{this.menu.classList.add('show');this.renderMenuHome();}
  private renderMenuHome(hasAuto=this.menu.dataset.auto==='yes'):void{this.menu.innerHTML=`<div class="menu-scroll"><div class="menu-inner"><div class="menu-logo">SETHCITY <span class="boot-num">6769</span></div><div class="menu-tag">Build tomorrow. Govern forever.</div><button class="menu-btn primary new"><span class="ic">＋</span>New City</button>${hasAuto?'<button class="menu-btn continue"><span class="ic">▶</span>Continue</button>':''}<button class="menu-btn load"><span class="ic">▤</span>Load City</button><button class="menu-btn manual"><span class="ic">?</span>Instruction Manual</button><button class="menu-btn settings"><span class="ic">⚙</span>Settings</button><button class="menu-ghost resume">Return to city</button></div></div>`;this.menu.querySelector('.new')!.addEventListener('click',()=>this.renderNewGame());this.menu.querySelector('.continue')?.addEventListener('click',()=>void this.host.load('auto').then(()=>this.menu.classList.remove('show')));this.menu.querySelector('.load')!.addEventListener('click',()=>{this.menu.classList.remove('show');this.panels.open('settings');});this.menu.querySelector('.manual')!.addEventListener('click',()=>{this.menu.classList.remove('show');this.panels.open('manual');});this.menu.querySelector('.settings')!.addEventListener('click',()=>{this.menu.classList.remove('show');this.panels.open('settings');});this.menu.querySelector('.resume')!.addEventListener('click',()=>this.menu.classList.remove('show'));}
  private renderNewGame():void{const seed=(Math.random()*1e9)|0;this.menu.innerHTML=`<div class="menu-scroll"><form class="menu-inner new-form"><button type="button" class="menu-back">‹ Main menu</button><div class="menu-h">Found a new city</div><label class="field"><span>City name</span><input class="tin" name="name" value="SethCity"></label><label class="field"><span>Mayor name</span><input class="tin" name="mayor" value="Mayor Seth"></label><div class="field"><span>Map shape</span><div class="shape-row">${['coastal','river','lakes','plains','valley','islands'].map((s,i)=>`<button type="button" class="shape-chip ${i===0?'on':''}" data-shape="${s}">${title(s)}</button>`).join('')}</div></div><div class="map-thumb-wrap"><canvas class="map-thumb" width="112" height="112"></canvas><div class="grow"><label class="range-row"><span>Water</span><input name="water" type="range" min="0" max="100" value="30"><output>30%</output></label><label class="range-row"><span>Hills</span><input name="hills" type="range" min="0" max="100" value="45"><output>45%</output></label><label class="range-row"><span>Trees</span><input name="trees" type="range" min="0" max="100" value="50"><output>50%</output></label></div></div><label class="field"><span>Seed</span><div class="seed-row"><input class="tin seed" type="number" value="${seed}"><button type="button" class="btn random">Randomize</button></div></label><div class="field"><span>Difficulty</span><div class="seg">${['easy','normal','hard','sandbox'].map((d,i)=>`<button type="button" data-diff="${d}" class="${i===1?'on':''}">${title(d)}${d==='sandbox'?' ∞ funds':''}</button>`).join('')}</div></div><div class="row"><div class="grow"><div class="lbl">Random disasters</div></div><button type="button" class="tgl on disasters"><i></i></button></div><button class="btn primary full">Create SETHCITY 6769</button></form></div>`;
    const form=this.menu.querySelector('form')!;let shape='coastal',difficulty:Difficulty='normal',disasters=true;const draw=()=>this.drawMap(form.querySelector('canvas')!,shape,Number((form.elements.namedItem('water') as HTMLInputElement).value)/100,Number((form.elements.namedItem('hills') as HTMLInputElement).value)/100,Number((form.querySelector('.seed') as HTMLInputElement).value));form.querySelector('.menu-back')!.addEventListener('click',()=>this.renderMenuHome());form.querySelectorAll('.shape-chip').forEach(b=>b.addEventListener('click',()=>{shape=(b as HTMLElement).dataset.shape!;form.querySelectorAll('.shape-chip').forEach(x=>x.classList.toggle('on',x===b));draw();}));form.querySelectorAll('[data-diff]').forEach(b=>b.addEventListener('click',()=>{difficulty=(b as HTMLElement).dataset.diff as Difficulty;form.querySelectorAll('[data-diff]').forEach(x=>x.classList.toggle('on',x===b));}));form.querySelector('.disasters')!.addEventListener('click',e=>{disasters=!disasters;(e.currentTarget as HTMLElement).classList.toggle('on',disasters);});form.querySelector('.random')!.addEventListener('click',()=>{(form.querySelector('.seed') as HTMLInputElement).value=String((Math.random()*1e9)|0);draw();});form.querySelectorAll('input[type=range],.seed').forEach(i=>i.addEventListener('input',()=>{const out=i.parentElement?.querySelector('output');if(out)out.textContent=`${(i as HTMLInputElement).value}%`;draw();}));form.addEventListener('submit',e=>{e.preventDefault();const get=(n:string)=>(form.elements.namedItem(n) as HTMLInputElement);this.host.newGame({name:get('name').value.trim()||'SethCity',mayor:get('mayor').value.trim()||'Mayor Seth',shape,water:Number(get('water').value)/100,hills:Number(get('hills').value)/100,trees:Number(get('trees').value)/100,seed:Number((form.querySelector('.seed') as HTMLInputElement).value)|0,difficulty,disasters});this.menu.classList.remove('show');});draw();}
  private drawMap(canvas:HTMLCanvasElement,shape:string,water:number,hills:number,seed:number):void{const c=canvas.getContext('2d');if(!c)return;const n=28,sz=4;c.fillStyle='#123447';c.fillRect(0,0,112,112);for(let y=0;y<n;y++)for(let x=0;x<n;x++){const h=Math.sin((x+seed%31)*.55)*Math.cos((y+seed%23)*.43)*.25+Math.hypot(x-14,y-14)/20*hills;let wet=h<water-.2;if(shape==='river')wet=Math.abs(x-14-Math.sin(y*.45)*3)<water*4;if(shape==='plains')wet=false;if(shape==='islands')wet=h<water+.05;if(shape==='lakes')wet=Math.sin(x*.5)+Math.cos(y*.65)>2-water*3;if(shape==='coastal')wet=wet||x<water*10;if(shape==='valley')wet=Math.abs(x-14)<water*2;c.fillStyle=wet?'#287aa0':h>.65?'#667469':h>.35?'#4f8e62':'#62a66b';c.fillRect(x*sz,y*sz,sz,sz);}}
  private async probeAutosave():Promise<void>{try{const mod=await import('../save/save');if(await mod.hasAutosave()){this.menu.dataset.auto='yes';if(this.menu.classList.contains('show')&&this.menu.querySelector('.menu-logo'))this.renderMenuHome(true);}}catch{/* Optional save module may still be loading. */}}
}
const title=(s:string)=>s.charAt(0).toUpperCase()+s.slice(1).replaceAll('_',' ');
