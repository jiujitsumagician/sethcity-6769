import { bus } from '../core/events';
import { defOf } from '../core/catalog';
import type { GameState } from '../core/state';

const steps=[
  ['Build a road','Open Roads and place a street.'],
  ['Zone homes','Choose a residential zone and paint beside the road.'],
  ['Power up','Place any power plant.'],
  ['Make the connection','Connect power with roads or power lines.'],
  ['Create jobs','Zone a commercial area near your homes.'],
  ['Watch the city grow','Wait for the first building to rise.'],
  ['Let time flow','Unpause or increase the simulation speed.'],
] as const;

export class Tutorial {
  private readonly card:HTMLElement;
  private readonly offs:(()=>void)[]=[];
  private step=0;
  private finished=false;
  constructor(root:HTMLElement,private readonly state:()=>GameState){
    this.card=document.createElement('aside');this.card.className='coach-card';this.card.dataset.ui='';this.card.innerHTML='<div class="step-no"></div><h4></h4><p></p><div class="coach-foot"><div class="coach-dots"></div><button class="coach-skip">Skip tutorial</button></div>';root.append(this.card);
    this.card.querySelector('button')!.onclick=()=>this.finish();
    if(localStorage.getItem('sethcity:tutorial')==='done'){this.card.hidden=true;this.step=steps.length;this.finished=true;return;}
    this.render();
    this.offs.push(bus.on('tool:changed',({tool})=>{if(this.step===0&&tool.startsWith('road_'))this.next();else if(this.step===1&&tool.startsWith('zone_res'))this.next();else if(this.step===2&&tool.startsWith('build_p_'))this.next();else if(this.step===3&&(tool==='wire'||tool.startsWith('road_')))this.next();else if(this.step===4&&tool.startsWith('zone_com'))this.next();this.reconcile();}),bus.on('tile:changed',()=>this.reconcile()),bus.on('speed:changed',({speed})=>{if(this.step===6&&speed>0)this.finish();}));
    this.reconcile();
  }
  dispose():void{this.offs.forEach(o=>o());this.card.remove();}
  private next():void{if(this.finished)return;this.step++;this.state().tutorialStep=this.step;if(this.step>=steps.length)this.finish();else this.render();}
  private reconcile():void{if(this.finished)return;const s=this.state(),g=s.grid;let changed=true;while(changed&&!this.finished){changed=false;if(this.step===0&&g.road.some(v=>v>0)){this.next();changed=true;}else if(this.step===1&&g.zone.some(v=>v>=1&&v<=3)){this.next();changed=true;}else if(this.step===2&&g.building.some(id=>id>0&&defOf(id).category==='power')){this.next();changed=true;}else if(this.step===3&&(g.wire.some(v=>v>0)||g.powered.some(v=>v>0))){this.next();changed=true;}else if(this.step===4&&g.zone.some(v=>v===4||v===5)){this.next();changed=true;}else if(this.step===5&&g.building.some(id=>id>0&&defOf(id).grown)){this.next();changed=true;}else if(this.step===6&&s.speed>0)this.finish();}}
  private render():void{if(this.finished)return;const s=steps[this.step];this.card.hidden=false;(this.card.querySelector('.step-no') as HTMLElement).textContent=`Tutorial ${this.step+1} / ${steps.length}`;(this.card.querySelector('h4') as HTMLElement).textContent=s[0];(this.card.querySelector('p') as HTMLElement).textContent=s[1];this.card.style.bottom=this.step<5?'calc(var(--sab) + 132px)':'calc(var(--sab) + 88px)';const dots=this.card.querySelector('.coach-dots')!;dots.innerHTML=steps.map((_,i)=>`<i class="${i<this.step?'done':i===this.step?'on':''}"></i>`).join('');}
  private finish():void{if(this.finished)return;this.finished=true;localStorage.setItem('sethcity:tutorial','done');this.state().tutorialStep=steps.length;this.card.hidden=true;}
}
