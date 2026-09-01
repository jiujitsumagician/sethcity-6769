var f0=Object.defineProperty;var p0=(i,t,e)=>t in i?f0(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var L=(i,t,e)=>p0(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class m0{constructor(){L(this,"map",new Map)}on(t,e){let n=this.map.get(t);return n||this.map.set(t,n=new Set),n.add(e),()=>n.delete(e)}off(t,e){this.map.get(t)?.delete(e)}emit(t,e){const n=this.map.get(t);if(n)for(const s of n)s(e)}}const Lt=new m0,C=128,at=128,qt=16,Se=C/qt,Un=at/qt,j=C*at,Qe=.35,Yn=0,lt=(i,t)=>t*C+i,Ji=i=>i%C,Qi=i=>i/C|0,Ht=(i,t)=>i>=0&&t>=0&&i<C&&t<at;var Kt=(i=>(i[i.None=0]="None",i[i.ResLow=1]="ResLow",i[i.ResMed=2]="ResMed",i[i.ResHigh=3]="ResHigh",i[i.ComLow=4]="ComLow",i[i.ComHigh=5]="ComHigh",i[i.IndAgri=6]="IndAgri",i[i.IndLight=7]="IndLight",i[i.IndHeavy=8]="IndHeavy",i))(Kt||{}),ke=(i=>(i[i.None=0]="None",i[i.Street=1]="Street",i[i.Avenue=2]="Avenue",i[i.Highway=3]="Highway",i))(ke||{}),se=(i=>(i[i.Grass=0]="Grass",i[i.Sand=1]="Sand",i[i.Rock=2]="Rock",i[i.Snow=3]="Snow",i[i.Dirt=4]="Dirt",i[i.Forest=5]="Forest",i))(se||{});const g0={easy:1e5,normal:5e4,hard:2e4,sandbox:999999999};class qd{constructor(){L(this,"w",C);L(this,"h",at);L(this,"height",new Float32Array(j));L(this,"water",new Uint8Array(j));L(this,"terrain",new Uint8Array(j));L(this,"tree",new Uint8Array(j));L(this,"zone",new Uint8Array(j));L(this,"road",new Uint8Array(j));L(this,"rail",new Uint8Array(j));L(this,"wire",new Uint8Array(j));L(this,"pipe",new Uint8Array(j));L(this,"subway",new Uint8Array(j));L(this,"tunnel",new Uint8Array(j));L(this,"building",new Uint16Array(j));L(this,"originOffset",new Uint8Array(j));L(this,"level",new Uint8Array(j));L(this,"variant",new Uint8Array(j));L(this,"rotation",new Uint8Array(j));L(this,"age",new Uint16Array(j));L(this,"condition",new Uint8Array(j));L(this,"powered",new Uint8Array(j));L(this,"watered",new Uint8Array(j));L(this,"roadNet",new Uint16Array(j));L(this,"population",new Uint16Array(j));L(this,"jobs",new Uint16Array(j));L(this,"landValue",new Uint8Array(j));L(this,"pollution",new Uint8Array(j));L(this,"noise",new Uint8Array(j));L(this,"crime",new Uint8Array(j));L(this,"fireRisk",new Uint8Array(j));L(this,"traffic",new Uint8Array(j));L(this,"desirability",new Uint8Array(j));L(this,"covPolice",new Uint8Array(j));L(this,"covFire",new Uint8Array(j));L(this,"covHealth",new Uint8Array(j));L(this,"covEducation",new Uint8Array(j));L(this,"covPark",new Uint8Array(j));L(this,"covTransit",new Uint8Array(j));L(this,"onFire",new Uint8Array(j));L(this,"scratchA",new Uint8Array(j));L(this,"scratchB",new Uint8Array(j));L(this,"dirtyChunks",new Set);L(this,"terrainDirty",!0)}markDirty(t,e){if(!Ht(t,e))return;const n=t/qt|0,s=e/qt|0;this.dirtyChunks.add(s*Se+n),t%qt===0&&n>0&&this.dirtyChunks.add(s*Se+n-1),t%qt===qt-1&&n<Se-1&&this.dirtyChunks.add(s*Se+n+1),e%qt===0&&s>0&&this.dirtyChunks.add((s-1)*Se+n),e%qt===qt-1&&s<Un-1&&this.dirtyChunks.add((s+1)*Se+n)}markAllDirty(){for(let t=0;t<Se*Un;t++)this.dirtyChunks.add(t);this.terrainDirty=!0}originOf(t,e){if(!Ht(t,e))return-1;const n=lt(t,e);if(!this.building[n])return-1;const s=this.originOffset[n],r=s&15,o=s>>4&15;return lt(t-r,e-o)}isFlat(t,e,n,s){if(!Ht(t,e)||!Ht(t+n-1,e+s-1))return!1;const r=this.height[lt(t,e)];for(let o=0;o<s;o++)for(let a=0;a<n;a++){const l=lt(t+a,e+o);if(this.water[l]||Math.abs(this.height[l]-r)>.001)return!1}return!0}isClear(t,e,n,s){if(!Ht(t,e)||!Ht(t+n-1,e+s-1))return!1;for(let r=0;r<s;r++)for(let o=0;o<n;o++){const a=lt(t+o,e+r);if(this.building[a]||this.road[a]||this.rail[a]||this.water[a])return!1}return!0}touchesRoad(t,e,n,s){for(let r=-1;r<=n;r++)if(Ht(t+r,e-1)&&this.road[lt(t+r,e-1)]||Ht(t+r,e+s)&&this.road[lt(t+r,e+s)])return!0;for(let r=-1;r<=s;r++)if(Ht(t-1,e+r)&&this.road[lt(t-1,e+r)]||Ht(t+n,e+r)&&this.road[lt(t+n,e+r)])return!0;return!1}touchesWater(t,e,n,s){for(let r=-1;r<=n;r++)if(Ht(t+r,e-1)&&this.water[lt(t+r,e-1)]||Ht(t+r,e+s)&&this.water[lt(t+r,e+s)])return!0;for(let r=-1;r<=s;r++)if(Ht(t-1,e+r)&&this.water[lt(t-1,e+r)]||Ht(t+n,e+r)&&this.water[lt(t+n,e+r)])return!0;return!1}clearTile(t){this.building[t]=0,this.originOffset[t]=0,this.level[t]=0,this.age[t]=0,this.condition[t]=0,this.population[t]=0,this.jobs[t]=0,this.onFire[t]=0}}function v0(){return{population:0,jobs:0,unemployment:0,homeless:0,happiness:.5,health:.5,educationLevel:.3,safety:.5,traffic:0,pollution:0,powerDemand:0,powerSupply:0,waterDemand:0,waterSupply:0,approval:.5,landValueAvg:0,resBuildings:0,comBuildings:0,indBuildings:0}}function _0(){return{incomeRes:0,incomeCom:0,incomeInd:0,incomeOther:0,costRoads:0,costPolice:0,costFire:0,costHealth:0,costEducation:0,costParks:0,costPower:0,costWater:0,costLoans:0,net:0}}function x0(){return{funds:5e4,taxRes:.09,taxCom:.09,taxInd:.09,fundRoads:1,fundPolice:1,fundFire:1,fundHealth:1,fundEducation:1,fundParks:1,loans:[],ledger:_0()}}const y0=[{key:"recycling",name:"Recycling Program",desc:"−15% pollution citywide.",costPerCapita:.02,active:!1},{key:"smoke_detectors",name:"Smoke Detector Ordinance",desc:"−25% fire risk.",costPerCapita:.015,active:!1},{key:"neighborhood_watch",name:"Neighbourhood Watch",desc:"−20% crime.",costPerCapita:.012,active:!1},{key:"free_clinics",name:"Free Health Clinics",desc:"+15% health coverage.",costPerCapita:.03,active:!1},{key:"pro_reading",name:"Pro-Reading Campaign",desc:"+15% education.",costPerCapita:.02,active:!1},{key:"transit_subsidy",name:"Transit Subsidy",desc:"−20% traffic.",costPerCapita:.035,active:!1,unlockPop:5e3},{key:"legalise_gambling",name:"Legalised Gambling",desc:"+income, +crime.",costPerCapita:-.05,active:!1,unlockPop:1e4},{key:"tourism",name:"Tourism Board",desc:"+commercial demand.",costPerCapita:.025,active:!1,unlockPop:15e3},{key:"clean_air",name:"Clean Air Act",desc:"−35% industrial pollution, −industrial demand.",costPerCapita:.04,active:!1,unlockPop:25e3},{key:"homeless_shelters",name:"Homeless Shelters",desc:"+approval, −homeless.",costPerCapita:.03,active:!1,unlockPop:2e4}],M0=[{key:"hamlet",name:"Hamlet",desc:"Your first neighbours arrive.",pop:100,reached:!1,reward:0},{key:"village",name:"Village",desc:"Schools and clinics unlocked.",pop:500,reached:!1,reward:2e3},{key:"town",name:"Town",desc:"Medium density unlocked. The city gifts you a Mayor’s House.",pop:2e3,reached:!1,reward:5e3,rewardKey:"x_mayor"},{key:"city",name:"City",desc:"Avenues, colleges and stadiums unlocked.",pop:1e4,reached:!1,reward:15e3},{key:"capital",name:"Capital",desc:"High density and universities unlocked. The Llama Dome arrives.",pop:3e4,reached:!1,reward:4e4,rewardKey:"x_llama"},{key:"boomtown",name:"Boomtown",desc:"The Army offers a base — jobs and order, noise and worry.",pop:45e3,reached:!1,reward:6e4,rewardKey:"x_military"},{key:"metropolis",name:"Metropolis",desc:"Skyscrapers, airports and fusion unlocked.",pop:8e4,reached:!1,reward:1e5},{key:"arcology",name:"Arcology Age",desc:"Self-contained arcologies may now rise.",pop:12e4,reached:!1,reward:15e4,rewardKey:"arco_plymouth"},{key:"megalopolis",name:"Megalopolis",desc:"You built a legend. The Launch Arco awaits.",pop:2e5,reached:!1,reward:25e4,rewardKey:"arco_launch"}],zr=["Dickville","Port Willard","Flowtown","Sharkton"];function w0(){return[{key:"buy_power_1",neighbor:zr[0],kind:"buy_power",amount:200,pricePerUnit:2.2,active:!1},{key:"sell_power_1",neighbor:zr[1],kind:"sell_power",amount:200,pricePerUnit:1.1,active:!1},{key:"buy_water_1",neighbor:zr[2],kind:"buy_water",amount:300,pricePerUnit:1.6,active:!1},{key:"sell_water_1",neighbor:zr[3],kind:"sell_water",amount:300,pricePerUnit:.8,active:!1},{key:"garbage_1",neighbor:zr[0],kind:"take_garbage",amount:1,pricePerUnit:900,active:!1}]}function nh(i=Math.random()*1e9|0,t="normal"){const e=x0();return e.funds=g0[t],{seed:i,cityName:"SethCity",mayorName:"Mayor Seth",difficulty:t,grid:new qd,time:{ticks:0,day:1,month:0,year:6769,timeOfDay:.32,season:0},speed:2,budget:e,stats:v0(),demand:{r:.8,c:.2,i:.4},ordinances:y0.map(n=>({...n})),milestones:M0.map(n=>({...n})),disasters:[],vehicles:[],news:[],papers:[],signs:[],deals:w0(),history:{population:[],funds:[],approval:[],pollution:[],traffic:[],unemployment:[]},tool:"inspect",overlay:"none",unlocked:new Set,nextDisasterId:1,nextNewsId:1,tutorialStep:0,disastersEnabled:!0}}function as(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function wt(i,t,e=0){let n=Math.imul(i|0,374761393)+Math.imul(t|0,668265263)+Math.imul(e|0,2654435761)|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function Nt(i,t,e){return i+(t-i)*e}function Vt(i,t,e){return i<t?t:i>e?e:i}function re(i){return i<0?0:i>1?1:i}function ai(i){return i*i*(3-2*i)}function Ai(i){const t=new Uint8Array(512),e=as(i),n=new Uint8Array(256);for(let a=0;a<256;a++)n[a]=a;for(let a=255;a>0;a--){const l=e()*(a+1)|0,c=n[a];n[a]=n[l],n[l]=c}for(let a=0;a<512;a++)t[a]=n[a&255];const s=(a,l,c)=>{switch(a&3){case 0:return l+c;case 1:return-l+c;case 2:return l-c;default:return-l-c}},r=(a,l)=>{const c=Math.floor(a)&255,h=Math.floor(l)&255,u=a-Math.floor(a),d=l-Math.floor(l),f=ai(u),g=ai(d),v=t[t[c]+h],m=t[t[c]+h+1],p=t[t[c+1]+h],M=t[t[c+1]+h+1],_=Nt(s(v,u,d),s(p,u-1,d),f),x=Nt(s(m,u,d-1),s(M,u-1,d-1),f);return Nt(_,x,g)};return{noise:r,fbm:(a,l,c=5,h=2,u=.5)=>{let d=1,f=1,g=0,v=0;for(let m=0;m<c;m++)g+=d*r(a*f,l*f),v+=d,d*=u,f*=h;return g/v}}}const ln=1,hi=26,Pa=-7,so=3,b0=.5,S0=.45,ih=new Float32Array(j),Yd=new Float32Array(j),_a=new Float32Array(j),Hr=new Float32Array(j),Yt=new Int16Array(j),Ki=new Int16Array(j),La=new Uint8Array(j),oi=new Int32Array(j),ts=new Int16Array(j),Pi=new Int32Array(j),Gr=new Int32Array(j),Ss=new Uint8Array(j),Fi=[1,-1,0,0],Oi=[0,0,1,-1],E0=i=>Math.round(i/Qe),$d=i=>i*Qe;function T0(i){const t=i.height,e=i.water;for(let n=0;n<j;n++){const s=Yt[n];t[n]=$d(s),e[n]=s<0?1:0}}function Qa(i,t,e){const n=Vt(t-.5,0,C-1.0001),s=Vt(e-.5,0,at-1.0001),r=n|0,o=s|0,a=r+1<C?r+1:r,l=o+1<at?o+1:o,c=n-r,h=s-o,u=i.height,d=u[o*C+r],f=u[o*C+a],g=u[l*C+r],v=u[l*C+a],m=d+(f-d)*c,p=g+(v-g)*c;return m+(p-m)*h}function A0(i,t){switch(i){case"coastal":return Nt(.16,.38,t);case"river":return Nt(.035,.11,t);case"lakes":return Nt(.07,.2,t);case"plains":return Nt(.012,.055,t);case"valley":return Nt(.05,.13,t);default:return Nt(.28,.4,t)}}function Xh(i,t,e,n){const s=(t-i.x)*i.ax,r=(e-i.y)*i.ay,o=Math.sqrt(s*s+r*r);if(o>i.r*2.4)return-2;const a=Math.atan2(r,s),l=i.r*(1+i.lobe*(.18*Math.sin(3*a+i.ph)+.11*Math.sin(5*a-i.ph*1.7)));return(l-o)/Math.max(4,l)*1.15+n}function C0(i,t){const e=i.seed|0,n=Ai(e^2654435769),s=Ai(e+1013904223|0),r=Ai(e+1266489917|0),o=Ai(e+424242|0),a=re(i.water),l=i.shape;let c=t()*Math.PI*2;(l==="river"||l==="valley")&&(c=(t()<.5?0:Math.PI*.5)+(t()-.5)*.42);const h=Math.cos(c),u=Math.sin(c),d=t()*6.283,f=t()*6.283,g=t()*6.283,v=[];let m=0,p=3,M=0,_=2,x=1,T=.27;if(l==="lakes"){const y=3+(t()*3|0);for(let w=0;w<y;w++){const E=w/y*6.283+t()*1.4,b=Nt(30,54,t());v.push({x:64+Math.cos(E)*b,y:64+Math.sin(E)*b,r:Nt(9,20,t())*Nt(.8,1.35,a),ax:Nt(.75,1.25,t()),ay:1,ph:t()*6.283,lobe:1})}}else if(l==="plains"){const y=1+(t()*2|0);for(let w=0;w<y;w++){const E=t()*6.283,b=Nt(34,52,t());v.push({x:64+Math.cos(E)*b,y:64+Math.sin(E)*b,r:Nt(6,11,t())*Nt(.8,1.4,a),ax:Nt(.8,1.3,t()),ay:1,ph:t()*6.283,lobe:.7})}}else if(l==="islands"){v.push({x:64+(t()-.5)*8,y:64+(t()-.5)*8,r:56,ax:Nt(.92,1.08,t()),ay:1,ph:t()*6.283,lobe:1.25});const y=3+(t()*4|0);for(let w=0;w<y;w++){const E=w/y*6.283+t()*1.1;v.push({x:64+Math.cos(E)*Nt(58,74,t()),y:64+Math.sin(E)*Nt(58,74,t()),r:Nt(5,13,t()),ax:Nt(.8,1.25,t()),ay:1,ph:t()*6.283,lobe:1})}}else l==="river"?(m=(t()<.5?-1:1)*Nt(.14,.2,t()),p=Nt(2.2,4.6,a),M=(t()-.5)*.4,_=p*.55,x=m>0?-1:1):l==="valley"&&(m=(t()<.5?-1:1)*.15,p=Nt(1.8,3.6,a),T=.27);for(let y=0;y<at;y++)for(let w=0;w<C;w++){const E=y*C+w,b=n.fbm(w*.016,y*.016,3),S=n.fbm(w*.016+71.3,y*.016+19.7,3),I=w+b*15,O=y+S*15,U=I/C-.5,z=O/at-.5,W=Math.sqrt(U*U+z*z)*2,$=U*h+z*u,et=-U*u+z*h,Y=s.fbm(w*.019,y*.019,4),rt=s.fbm(w*.062,y*.062,3),xt=1-Math.abs(r.fbm(w*.026,y*.026,5));_a[E]=re(xt*xt*1.15);let Tt=-1,$t=0;switch(l){case"coastal":{Tt=$*3.3+Y*1.1+rt*.3+Math.sin(et*8.4+d)*.24,$t=ai(re(-$*2.1-.05))*.9+ai(re((W-.86)*1.7))*.45;break}case"river":{const Z=.075*Math.sin($*6.4+d)+.042*Math.sin($*12.1+f)+Y*.03,it=Math.abs(et-m-Z)*C;Tt=(p-it)*.5+rt*.25;const yt=Math.abs($-M-.05*Math.sin(et*8.1+g))*C,ht=ai(re(((et-m)*x-.02)*7)),Ft=(_-yt)*.5+rt*.2;Tt=Math.max(Tt,Ft*ht+(ht-1)*2),$t=ai(re((W-.74)*1.55))*.85+ai(re(((m-et)*x*-1-.06)*4.2))*.55;break}case"valley":{const Z=.05*Math.sin($*5.1+d)+Y*.025,it=Math.abs(et-Z);$t=ai(re((it-T)*5.2))*(.85+_a[E]*.35);const yt=Math.abs(et-m*.85-Z)*C;Tt=(p-yt)*.5+rt*.2;break}case"lakes":case"plains":{let Z=-2;for(let it=0;it<v.length;it++){const yt=Xh(v[it],w,y,Y*.4+rt*.15);yt>Z&&(Z=yt)}Tt=Z,$t=ai(re((W-(l==="plains"?.92:.8))*1.6))*(l==="plains"?.5:.9);break}default:{let Z=-2;for(let ht=0;ht<v.length;ht++){const Ft=Xh(v[ht],w,y,Y*.42+rt*.18);Ft>Z&&(Z=Ft)}Tt=-Z;const it=re(1-Math.abs(Z-.5)*2.8),yt=.3+.7*re($*2.8+.4);$t=it*yt*(.45+_a[E]*.85);break}}ih[E]=Tt;const ye=o.fbm(w*.0115,y*.0115,3)*.5+.5;Yd[E]=re($t)*(.2+.8*ai(re((ye-.33)*2.8)))}}function R0(i){let t=-4,e=4;for(let n=0;n<34;n++){const s=(t+e)*.5;let r=0;for(let o=0;o<j;o++)ih[o]>s&&r++;r/j>i?t=s:e=s}return(t+e)*.5}function P0(i,t,e){const n=Nt(3.5,hi-ln,re(i)),s=Nt(.6,2.6,re(i)),r=Ai(e+8675309|0);for(let o=0;o<at;o++)for(let a=0;a<C;a++){const l=o*C+a;if(ih[l]>t){Yt[l]=-1;continue}const c=Yd[l],h=c*c*(.5+.5*_a[l])*n,u=(r.fbm(a*.028,o*.028,3)*.5+.5)*s,d=ln+Math.round(h+u);Yt[l]=d>hi?hi:d}}function L0(){oi.fill(-1);let i={size:0,seedTile:-1},t=0,e=0,n=0,s=-1;for(let r=0;r<j;r++){if(Yt[r]<0||oi[r]>=0)continue;let o=0,a=0;Pi[a++]=r,oi[r]=t;let l=0,c=0,h=0;for(;o<a;){const u=Pi[o++];l++;const d=u%C,f=u/C|0;c+=d,h+=f;for(let g=0;g<4;g++){const v=d+Fi[g],m=f+Oi[g];if(v<0||m<0||v>=C||m>=at)continue;const p=m*C+v;Yt[p]<0||oi[p]>=0||(oi[p]=t,Pi[a++]=p)}}l>i.size&&(i={size:l,seedTile:r},e=c,n=h,s=t),t++}if(s>=0&&i.size>0){const r=e/i.size,o=n/i.size;let a=1/0;for(let l=0;l<j;l++){if(oi[l]!==s)continue;const c=l%C-r,h=(l/C|0)-o,u=c*c+h*h;u<a&&(a=u,i.seedTile=l)}for(let l=0;l<j;l++)oi[l]=oi[l]===s?1:0}else oi.fill(0);return i}function I0(i,t,e){if(La.fill(0),Ss.fill(0),i.seedTile<0)return 0;const n=Ai(e+555555|0),s=i.seedTile%C,r=i.seedTile/C|0,o=[];let a=0,l=0;const c=u=>{if(Ss[u]||oi[u]!==1)return;Ss[u]=1;const d=u%C,f=u/C|0,g=d-s,v=f-r,m=Math.sqrt(g*g+v*v),p=n.fbm(d*.045,f*.045,3)*26;let M=Math.round(m*4+p+(Yt[u]-ln)*16);M<l&&(M=l),M>4095&&(M=4095),M>a&&(a=M);const _=o[M];_?_.push(u):o[M]=[u]};c(i.seedTile);let h=0;for(let u=0;u<=a&&h<t;u++){l=u;const d=o[u];if(d)for(let f=0;f<d.length&&h<t;f++){const g=d[f];La[g]=1,Yt[g]=ln,h++;const v=g%C,m=g/C|0;for(let p=0;p<4;p++){const M=v+Fi[p],_=m+Oi[p];M<0||_<0||M>=C||_>=at||c(_*C+M)}}}return h}function qh(){for(let i=0;i<40;i++){let t=!1;for(let e=0;e<at;e++)for(let n=0;n<C;n++){const s=e*C+n;if(La[s]||Yt[s]<=ln)continue;let r=32767,o=!1;for(let l=0;l<4;l++){const c=n+Fi[l],h=e+Oi[l];if(c<0||h<0||c>=C||h>=at)continue;const u=h*C+c;Yt[u]<0?o=!0:Yt[u]<r&&(r=Yt[u])}let a=r===32767?hi:r+so;o&&a>ln+5&&(a=ln+5),Yt[s]>a&&(Yt[s]=a<ln?ln:a,t=!0)}if(!t)break}}function D0(){Ki.set(Yt);for(let i=1;i<at-1;i++)for(let t=1;t<C-1;t++){const e=i*C+t;if(La[e]||Yt[e]<0)continue;const n=Ki[e-1],s=Ki[e+1],r=Ki[e-C],o=Ki[e+C];n<0||s<0||r<0||o<0||n===s&&r===o&&n===r&&n!==Ki[e]&&(Yt[e]=n)}}function U0(){ts.fill(1023);let i=0;for(let e=0;e<at;e++)for(let n=0;n<C;n++){const s=e*C+n,r=Yt[s]<0;let o=!1;for(let a=0;a<4;a++){const l=n+Fi[a],c=e+Oi[a];if(!(l<0||c<0||l>=C||c>=at)&&Yt[c*C+l]<0!==r){o=!0;break}}o&&(ts[s]=0,Pi[i++]=s)}let t=0;for(;t<i;){const e=Pi[t++],n=e%C,s=e/C|0,r=Yt[e]<0,o=ts[e]+1;for(let a=0;a<4;a++){const l=n+Fi[a],c=s+Oi[a];if(l<0||c<0||l>=C||c>=at)continue;const h=c*C+l;Yt[h]<0===r&&(ts[h]<=o||(ts[h]=o,Pi[i++]=h))}}}function N0(i){const t=Ai(i+24680|0);for(let e=0;e<at;e++)for(let n=0;n<C;n++){const s=e*C+n;if(Yt[s]>=0)continue;const r=t.fbm(n*.05,e*.05,2)*.9;let o=1+Math.floor(ts[s]*.62+r+.5);o<1&&(o=1),o>-Pa&&(o=-Pa),Yt[s]=-o}}function F0(){for(let t=0;t<at;t++)for(let e=0;e<C;e++){const n=t*C+e;if(Yt[n]<0){Ss[n]=0;continue}let s=1;for(let r=0;r<4;r++){const o=e+Fi[r],a=t+Oi[r];if(o<0||a<0||o>=C||a>=at)continue;const l=a*C+o;if(Yt[l]>=0&&Yt[l]!==Yt[n]){s=0;break}}Ss[n]=s}Gr.fill(0);let i=0;for(let t=0;t<j;t++){if(!Ss[t]||Gr[t])continue;let e=0,n=0;Pi[n++]=t,Gr[t]=1;let s=0;for(;e<n;){const r=Pi[e++];s++;const o=r%C,a=r/C|0;for(let l=0;l<4;l++){const c=o+Fi[l],h=a+Oi[l];if(c<0||h<0||c>=C||h>=at)continue;const u=h*C+c;!Ss[u]||Gr[u]||(Gr[u]=1,Pi[n++]=u)}}s>i&&(i=s)}return i/j}function O0(i,t){const e=t.seed|0,n=Ai(e+31337|0),s=Ai(e+60613|0),r=re(t.trees);let o=ln;for(let m=0;m<j;m++)Yt[m]>o&&(o=Yt[m]);const a=Math.max(11,Math.round(o*.76)),l=Math.max(6,Math.round(o*.52));let c=0,h=0;for(let m=0;m<at;m++)for(let p=0;p<C;p++){const M=m*C+p;if(Yt[M]<0){Hr[M]=-1;continue}c++;const _=(n.fbm(p*.03,m*.03,4)*.5+.5)*.78+(n.fbm(p*.1,m*.1,2)*.5+.5)*.22;Hr[M]=_,_>h&&(h=_)}const u=Nt(.035,.52,r)*c;let d=0,f=1;for(let m=0;m<24;m++){const p=(d+f)*.5;let M=0;for(let _=0;_<j;_++)Hr[_]>p&&M++;M>u?d=p:f=p}const g=(d+f)*.5,v=Math.max(.02,h-g);for(let m=0;m<at;m++)for(let p=0;p<C;p++){const M=m*C+p,_=Yt[M];if(_<0){i.terrain[M]=ts[M]<=2?se.Sand:se.Dirt,i.tree[M]=0;continue}let x=0;for(let b=0;b<4;b++){const S=p+Fi[b],I=m+Oi[b];if(S<0||I<0||S>=C||I>=at)continue;const O=Yt[I*C+S];if(O<0)continue;const U=O>_?O-_:_-O;U>x&&(x=U)}const T=wt(p,m,7)<.4?2:1;let y;_>=a?y=se.Snow:x>=2||_>=l?y=se.Rock:ts[M]<=T&&_<=ln+2?y=se.Sand:x>=1&&s.fbm(p*.085,m*.085,2)>.34?y=se.Dirt:y=se.Grass;let w=(Hr[M]-g)/v*3.6+.45;Hr[M]<=g&&(w=0),w>0&&(w*=re((a-_)/5),y===se.Sand?w*=.3:y===se.Rock?w*=.35:y===se.Snow&&(w=0),x>=2&&(w*=.5));const E=w<=.2?0:w>3?3:Math.round(w);i.tree[M]=E,E>0&&(y===se.Grass||y===se.Dirt)&&(y=se.Forest),i.terrain[M]=y}}function k0(i){i.zone.fill(0),i.road.fill(0),i.rail.fill(0),i.wire.fill(0),i.pipe.fill(0),i.subway.fill(0),i.tunnel.fill(0),i.building.fill(0),i.originOffset.fill(0),i.level.fill(0),i.variant.fill(0),i.rotation.fill(0),i.age.fill(0),i.condition.fill(0),i.powered.fill(0),i.watered.fill(0),i.roadNet.fill(0),i.population.fill(0),i.jobs.fill(0),i.landValue.fill(0),i.pollution.fill(0),i.noise.fill(0),i.crime.fill(0),i.fireRisk.fill(0),i.traffic.fill(0),i.desirability.fill(0),i.covPolice.fill(0),i.covFire.fill(0),i.covHealth.fill(0),i.covEducation.fill(0),i.covPark.fill(0),i.covTransit.fill(0),i.onFire.fill(0)}function jd(i,t){const e=t.seed|0;let n=A0(t.shape,re(t.water)),s=re(t.hills),r=b0;for(let o=0;o<5;o++){C0(t,as(e+o*7919|0)),P0(s,R0(n),e);const a=L0(),l=Math.min(Math.round(r*j),Math.round(a.size*.94));if(I0(a,l,e),qh(),D0(),qh(),F0()>=S0+.015)break;r=Math.min(.68,r+.06),o>=1&&(s*=.8),o>=2&&(n*=.7)}U0(),N0(e),k0(i),T0(i),O0(i,t),i.markAllDirty()}const Va=new Uint8Array(j),Ia=(i,t)=>Math.round(i.height[t]/Qe);function Kd(i,t,e,n,s){const r=t>0?t-1:0,o=e>0?e-1:0,a=n<C-1?n+1:C-1,l=s<at-1?s+1:at-1;for(let c=o;c<=l;c++)for(let h=r;h<=a;h++){const u=c*C+h,d=Ia(i,u);Yt[u]=d,Ki[u]=d,Va[u]=0}}function Zd(i,t,e,n){for(let s=0;s<32;s++){let r=!1;for(let o=t;o<=n;o++)for(let a=i;a<=e;a++){const l=o*C+a;if(Va[l]||Yt[l]<0)continue;let c=32767,h=-32768;for(let d=0;d<4;d++){const f=a+Fi[d],g=o+Oi[d];if(f<0||g<0||f>=C||g>=at)continue;const v=Yt[g*C+f];v<0||(v<c&&(c=v),v>h&&(h=v))}if(c===32767)continue;let u=Yt[l];u<h-so&&(u=h-so),u>c+so&&(u=c+so),u>hi&&(u=hi),u<ln&&(u=ln),u!==Yt[l]&&(Yt[l]=u,r=!0)}if(!r)break}}function Jd(i,t,e,n,s){let r=ln;for(let l=0;l<j;l++){const c=Math.round(i.height[l]/Qe);c>r&&(r=c)}const o=Math.max(11,Math.round(r*.76)),a=Math.max(6,Math.round(r*.52));for(let l=e;l<=s;l++)for(let c=t;c<=n;c++){const h=l*C+c;if(i.water[h]){i.terrain[h]=se.Sand,i.tree[h]=0;continue}const u=Ia(i,h);let d=0,f=!1;for(let v=-2;v<=2;v++)for(let m=-2;m<=2;m++){const p=c+m,M=l+v;if(p<0||M<0||p>=C||M>=at)continue;const _=M*C+p;if(i.water[_]){m*m+v*v<=2&&(f=!0);continue}if(m*m+v*v>1)continue;const x=Math.abs(Ia(i,_)-u);x>d&&(d=x)}let g;u>=o?g=se.Snow:d>=2||u>=a?g=se.Rock:f&&u<=ln+2?g=se.Sand:g=se.Grass,i.tree[h]>0&&(g===se.Grass||g===se.Dirt)&&(g=se.Forest),i.terrain[h]=g}}function Qd(i,t,e,n,s){let r=0;for(let o=e;o<=s;o++)for(let a=t;a<=n;a++){const l=o*C+a;Yt[l]!==Ki[l]&&(i.height[l]=$d(Yt[l]),i.water[l]=Yt[l]<0?1:0,i.tree[l]=0,i.markDirty(a,o),r++)}return r}function B0(i,t,e,n,s,r){if(!Ht(t,e))return 0;const o=0,a=o+10,l=Math.max(0,t-a),c=Math.max(0,e-a),h=Math.min(C-1,t+a),u=Math.min(at-1,e+a);Kd(i,l,c,h,u);const d=(o+.35)*(o+.35);let f=Yt[lt(t,e)];s==="level"&&r!==void 0&&(f=E0(r));for(let v=-o;v<=o;v++)for(let m=-o;m<=o;m++){if(m*m+v*v>d)continue;const p=t+m,M=e+v;if(!Ht(p,M))continue;const _=M*C+p;let x=s==="raise"?Yt[_]+1:s==="lower"?Yt[_]-1:f;x>hi&&(x=hi),x<Pa&&(x=Pa),Yt[_]=x,Va[_]=1}Zd(l,c,h,u);const g=Qd(i,l,c,h,u);return g>0&&Jd(i,Math.max(0,l-2),Math.max(0,c-2),Math.min(C-1,h+2),Math.min(at-1,u+2)),g}function z0(i,t,e,n,s){if(n<=0||s<=0||!Ht(t,e)||!Ht(t+n-1,e+s-1))return!1;let r=0,o=32767,a=-32768;for(let v=0;v<s;v++)for(let m=0;m<n;m++){const p=(e+v)*C+(t+m);if(i.water[p])return!1;const M=Ia(i,p);r+=M,M<o&&(o=M),M>a&&(a=M)}if(a-o>8)return!1;if(a===o)return!0;let l=Math.round(r/(n*s));l<ln&&(l=ln),l>hi&&(l=hi);const c=12,h=Math.max(0,t-c),u=Math.max(0,e-c),d=Math.min(C-1,t+n-1+c),f=Math.min(at-1,e+s-1+c);Kd(i,h,u,d,f);for(let v=0;v<s;v++)for(let m=0;m<n;m++){const p=(e+v)*C+(t+m);Yt[p]=l,Va[p]=1}return Zd(h,u,d,f),Qd(i,h,u,d,f)>0&&Jd(i,Math.max(0,h-2),Math.max(0,u-2),Math.min(C-1,d+2),Math.min(at-1,f+2)),!0}const ss=[];function _t(i){const t={id:ss.length,w:1,h:1,cost:0,upkeep:0,grown:!1,residents:0,jobs:0,power:0,powerOut:0,water:0,waterOut:0,pollution:0,noise:0,...i};return ss.push(t),t}_t({key:"empty",name:"—",category:"special",archetype:"rubble"});const H0=[["rl1","Cabin",4,0,12,10322792,1.6],["rl2","Family Home",9,20,30,14207924,2.1],["rl3","Suburban House",14,45,60,15261900,2.6],["rl4","Big House",20,90,105,15788760,3.2],["rl5","Estate",28,150,160,16446692,3.8]];H0.forEach(([i,t,e,n,s,r,o],a)=>_t({key:i,name:t,category:"residential",archetype:(a<2,"house"),grown:!0,zone:Kt.ResLow,level:a+1,residents:e,power:.6+a*.35,water:.5+a*.3,pollution:4,noise:6,minLandValue:n,height:o,palette:[r,9132604,7294519],upkeep:0}));const G0=[["rm1","Duplex",22,30,1322e4,3.4],["rm2","Row Houses",40,55,13942696,4.2],["rm3","Low Apartments",70,80,12629934,6],["rm4","Apartment Block",115,110,12169899,8.5],["rm5","Condominium",170,150,14276047,11]];G0.forEach(([i,t,e,n,s,r],o)=>_t({key:i,name:t,category:"residential",archetype:o<2?"rowhouse":"apartment",grown:!0,zone:Kt.ResMed,level:o+1,residents:e,power:2.2+o*1.4,water:2+o*1.2,pollution:6,noise:14,minLandValue:n,height:r,palette:[s,8219485,4868690]}));const V0=[["rh1","Apartment Tower",240,90,10465476,16],["rh2","High-Rise",380,120,9413819,24],["rh3","Residential Tower",560,150,8362164,33],["rh4","Luxury Tower",780,185,10993110,44],["rh5","Sky Residence",1100,215,12769002,60]];V0.forEach(([i,t,e,n,s,r],o)=>_t({key:i,name:t,category:"residential",archetype:o<1?"apartment":o<4?"tower":"skyscraper",grown:!0,zone:Kt.ResHigh,level:o+1,residents:e,power:8+o*6,water:7+o*5,pollution:8,noise:22,minLandValue:n,height:r,palette:[s,5991037,3028802]}));const W0=[["cl1","Corner Store",6,0,14731686,2.6],["cl2","Shopfront",14,30,15258800,3.4],["cl3","Strip Mall",28,60,14469550,4.2],["cl4","Retail Block",48,95,13680548,6.5],["cl5","Department Store",80,135,13154462,9]];W0.forEach(([i,t,e,n,s,r],o)=>_t({key:i,name:t,category:"commercial",archetype:o<3?"shop":"mall",grown:!0,zone:Kt.ComLow,level:o+1,jobs:e,power:1.6+o*1.5,water:1+o*.9,pollution:8,noise:24,minLandValue:n,height:r,palette:[s,11557450,4152182]}));const X0=[["ch1","Small Office",45,70,10139337,12],["ch2","Office Block",110,105,8824767,20],["ch3","Office Tower",220,140,7312819,32],["ch4","Corporate Tower",400,175,6064301,48],["ch5","Skyscraper",700,210,5210024,72]];X0.forEach(([i,t,e,n,s,r],o)=>_t({key:i,name:t,category:"commercial",archetype:o<2?"office":"skyscraper",grown:!0,zone:Kt.ComHigh,level:o+1,jobs:e,power:7+o*7,water:4+o*4,pollution:10,noise:30,minLandValue:n,height:r,palette:[s,2837091,1715002]}));_t({key:"ia1",name:"Smallholding",category:"industrial",archetype:"farm",grown:!0,zone:Kt.IndAgri,level:1,jobs:8,power:.8,water:3,pollution:10,noise:8,height:1.8,palette:[13215850,8032074,9136957]});_t({key:"ia2",name:"Farm",category:"industrial",archetype:"farm",grown:!0,zone:Kt.IndAgri,level:2,jobs:16,power:1.4,water:6,pollution:16,noise:10,height:2.4,palette:[11879215,9083730,9136957]});_t({key:"ia3",name:"Agri Estate",category:"industrial",archetype:"farm",grown:!0,zone:Kt.IndAgri,level:3,jobs:26,power:2.2,water:10,pollution:24,noise:12,height:3,palette:[10500650,9806940,8018996]});_t({key:"il1",name:"Workshop",category:"industrial",archetype:"workshop",grown:!0,zone:Kt.IndLight,level:1,jobs:20,power:2.5,water:1.5,pollution:30,noise:40,height:3.2,palette:[12103844,8156007,5920850]});_t({key:"il2",name:"Light Factory",category:"industrial",archetype:"factory",grown:!0,zone:Kt.IndLight,level:2,jobs:45,power:5,water:3,pollution:45,noise:55,height:4.5,palette:[11052186,7301728,5065542]});_t({key:"il3",name:"Industrial Park",category:"industrial",archetype:"warehouse",grown:!0,zone:Kt.IndLight,level:3,jobs:80,power:9,water:5,pollution:52,noise:62,height:5.2,palette:[10462118,6777968,4540491]});_t({key:"il4",name:"Technology Plant",category:"industrial",archetype:"factory",grown:!0,zone:Kt.IndLight,level:4,jobs:130,power:16,water:8,pollution:34,noise:48,height:6.5,palette:[13686490,9412781,4872032]});_t({key:"ih1",name:"Factory",category:"industrial",archetype:"factory",grown:!0,zone:Kt.IndHeavy,level:1,jobs:55,power:8,water:6,pollution:90,noise:80,height:5,palette:[10326406,7037272,4143669]});_t({key:"ih2",name:"Heavy Factory",category:"industrial",archetype:"factory",grown:!0,zone:Kt.IndHeavy,level:2,jobs:95,power:15,water:11,pollution:130,noise:95,height:6.5,palette:[9339768,6248014,3814703]});_t({key:"ih3",name:"Refinery",category:"industrial",archetype:"refinery",grown:!0,zone:Kt.IndHeavy,level:3,jobs:150,power:26,water:20,pollution:185,noise:110,height:8,palette:[11581112,8028291,5001298]});_t({key:"ih4",name:"Steelworks",category:"industrial",archetype:"refinery",grown:!0,zone:Kt.IndHeavy,level:4,jobs:220,power:40,water:30,pollution:230,noise:130,height:9.5,palette:[9071450,6113855,3551275]});_t({key:"p_wind",name:"Wind Turbine",category:"power",archetype:"windturbine",w:1,h:1,cost:4500,upkeep:40,powerOut:12,pollution:0,noise:20,height:5.5,desc:"Clean but modest output. Better on hills."});_t({key:"p_solar",name:"Solar Farm",category:"power",archetype:"solarfarm",w:3,h:3,cost:22e3,upkeep:180,powerOut:95,pollution:0,noise:0,height:1,needsFlat:!0,unlockPop:500,desc:"Silent, clean, needs a lot of flat land."});_t({key:"p_coal",name:"Coal Plant",category:"power",archetype:"powerplant",w:4,h:4,cost:16e3,upkeep:420,powerOut:320,pollution:250,noise:120,height:9,needsFlat:!0,desc:"Cheap power. Filthy."});_t({key:"p_gas",name:"Gas Plant",category:"power",archetype:"powerplant",w:4,h:4,cost:3e4,upkeep:560,powerOut:480,pollution:120,noise:90,height:8,needsFlat:!0,unlockPop:2e3,desc:"Cleaner than coal, pricier."});_t({key:"p_hydro",name:"Hydro Dam",category:"power",archetype:"powerplant",w:2,h:2,cost:2e4,upkeep:240,powerOut:220,pollution:0,noise:30,needsWater:!0,height:6,unlockPop:1e3,desc:"Clean shoreline power."});_t({key:"p_oil",name:"Oil Plant",category:"power",archetype:"powerplant",w:4,h:4,cost:22e3,upkeep:500,powerOut:400,pollution:190,noise:100,height:9,needsFlat:!0,unlockPop:1e3,desc:"More power than coal, almost as dirty."});_t({key:"p_nuclear",name:"Nuclear Plant",category:"power",archetype:"powerplant",w:4,h:4,cost:12e4,upkeep:1900,powerOut:1800,pollution:30,noise:60,height:12,needsFlat:!0,unlockPop:3e4,desc:"Enormous output. Meltdown risk if underfunded."});_t({key:"p_microwave",name:"Microwave Receiver",category:"power",archetype:"powerplant",w:4,h:4,cost:2e5,upkeep:2800,powerOut:3200,pollution:0,noise:30,height:13,needsFlat:!0,unlockPop:45e3,desc:"Beamed from orbit. Mostly hits the dish."});_t({key:"p_fusion",name:"Fusion Reactor",category:"power",archetype:"powerplant",w:5,h:5,cost:42e4,upkeep:5200,powerOut:6500,pollution:0,noise:40,height:16,needsFlat:!0,unlockPop:8e4,desc:"The future, today."});_t({key:"w_pump",name:"Water Pump",category:"water",archetype:"watertower",w:2,h:2,cost:3e3,upkeep:60,waterOut:90,power:2,needsWater:!0,height:3.5,desc:"Must be built beside fresh water."});_t({key:"w_tower",name:"Water Tower",category:"water",archetype:"watertower",w:2,h:2,cost:6e3,upkeep:90,waterOut:160,power:3,height:9,desc:"Works anywhere. Costlier per unit."});_t({key:"w_treat",name:"Treatment Plant",category:"water",archetype:"civic",w:3,h:3,cost:24e3,upkeep:300,waterOut:520,power:12,pollution:40,height:4,needsFlat:!0,unlockPop:5e3,desc:"Big supply, mild pollution."});_t({key:"w_desal",name:"Desalination Plant",category:"water",archetype:"civic",w:4,h:4,cost:9e4,upkeep:900,waterOut:1600,power:45,needsWater:!0,height:6,unlockPop:3e4,desc:"Coastal. Vast supply, thirsty for power."});_t({key:"s_police",name:"Police Station",category:"safety",archetype:"civic",w:2,h:2,cost:5e3,upkeep:220,power:2,water:1.5,jobs:20,service:{kind:"police",radius:16,strength:200},height:4,desc:"Cuts crime nearby."});_t({key:"s_police_hq",name:"Police Headquarters",category:"safety",archetype:"civic",w:3,h:3,cost:22e3,upkeep:700,power:6,water:4,jobs:70,service:{kind:"police",radius:30,strength:255},height:8,unlockPop:1e4,desc:"City-wide deterrence."});_t({key:"s_fire",name:"Fire Station",category:"safety",archetype:"civic",w:2,h:2,cost:5500,upkeep:240,power:2,water:3,jobs:22,service:{kind:"fire",radius:16,strength:200},height:4,desc:"Fights fires in range."});_t({key:"s_fire_hq",name:"Fire Headquarters",category:"safety",archetype:"civic",w:3,h:3,cost:24e3,upkeep:760,power:6,water:8,jobs:75,service:{kind:"fire",radius:30,strength:255},height:8,unlockPop:1e4});_t({key:"s_prison",name:"Prison",category:"safety",archetype:"civic",w:4,h:4,cost:3e4,upkeep:1100,power:10,water:12,jobs:90,pollution:20,noise:60,service:{kind:"police",radius:44,strength:140},height:6,unlockPop:8e3,desc:"Boosts police effect citywide, sours the neighbourhood."});_t({key:"h_clinic",name:"Clinic",category:"health",archetype:"hospital",w:2,h:2,cost:6e3,upkeep:260,power:3,water:4,jobs:25,service:{kind:"health",radius:15,strength:180},height:4.5,unlockPop:300});_t({key:"h_hospital",name:"Hospital",category:"health",archetype:"hospital",w:3,h:3,cost:26e3,upkeep:900,power:12,water:14,jobs:120,service:{kind:"health",radius:28,strength:240},height:10,unlockPop:3e3});_t({key:"h_medcenter",name:"Medical Centre",category:"health",archetype:"hospital",w:4,h:4,cost:85e3,upkeep:2400,power:30,water:34,jobs:320,service:{kind:"health",radius:44,strength:255},beauty:{radius:12,strength:30},height:16,unlockPop:25e3});_t({key:"e_school",name:"Elementary School",category:"education",archetype:"school",w:3,h:2,cost:7e3,upkeep:300,power:3,water:4,jobs:30,service:{kind:"education",radius:16,strength:190,tier:1},height:4,unlockPop:300});_t({key:"e_high",name:"High School",category:"education",archetype:"school",w:3,h:3,cost:18e3,upkeep:640,power:7,water:8,jobs:70,service:{kind:"education",radius:22,strength:220,tier:1},height:5.5,unlockPop:2e3});_t({key:"e_library",name:"Library",category:"education",archetype:"civic",w:2,h:2,cost:6500,upkeep:200,power:2,water:1.5,jobs:14,service:{kind:"education",radius:18,strength:120,tier:1},beauty:{radius:8,strength:25},height:5,unlockPop:800});_t({key:"e_college",name:"Community College",category:"education",archetype:"university",w:4,h:4,cost:45e3,upkeep:1500,power:16,water:18,jobs:190,service:{kind:"education",radius:34,strength:240,tier:2},beauty:{radius:14,strength:30},height:8,unlockPop:1e4});_t({key:"e_university",name:"University",category:"education",archetype:"university",w:5,h:5,cost:13e4,upkeep:3600,power:38,water:42,jobs:480,service:{kind:"education",radius:48,strength:255,tier:3},beauty:{radius:20,strength:45},height:11,unlockPop:3e4});_t({key:"e_museum",name:"Museum",category:"education",archetype:"landmark",w:3,h:3,cost:38e3,upkeep:900,power:8,water:6,jobs:60,service:{kind:"education",radius:20,strength:140,tier:2},beauty:{radius:22,strength:70},height:9,unlockPop:15e3});_t({key:"l_park",name:"Small Park",category:"leisure",archetype:"park",w:1,h:1,cost:200,upkeep:6,water:.4,service:{kind:"park",radius:8,strength:110},beauty:{radius:8,strength:40},height:.3});_t({key:"l_fountain",name:"Fountain Square",category:"leisure",archetype:"plaza",w:2,h:2,cost:1800,upkeep:30,water:2,service:{kind:"park",radius:12,strength:150},beauty:{radius:14,strength:70},height:.8,unlockPop:500});_t({key:"l_bigpark",name:"City Park",category:"leisure",archetype:"park",w:3,h:3,cost:6500,upkeep:120,water:5,service:{kind:"park",radius:20,strength:200},beauty:{radius:22,strength:90},height:.5,unlockPop:1500});_t({key:"l_sports",name:"Sports Field",category:"leisure",archetype:"park",w:3,h:3,cost:9e3,upkeep:180,power:3,water:8,jobs:12,service:{kind:"park",radius:18,strength:190},beauty:{radius:12,strength:50},height:1.2,unlockPop:3e3});_t({key:"l_marina",name:"Marina",category:"leisure",archetype:"port",w:3,h:3,cost:26e3,upkeep:420,power:5,water:3,jobs:45,needsWater:!0,service:{kind:"park",radius:18,strength:160},beauty:{radius:24,strength:110},height:2.5,unlockPop:8e3});_t({key:"l_stadium",name:"Stadium",category:"leisure",archetype:"stadium",w:5,h:5,cost:11e4,upkeep:2400,power:40,water:30,jobs:300,service:{kind:"park",radius:30,strength:210},beauty:{radius:30,strength:120},height:14,unlockPop:1e4});_t({key:"l_zoo",name:"Zoo",category:"leisure",archetype:"park",w:4,h:4,cost:62e3,upkeep:1400,power:14,water:26,jobs:160,service:{kind:"park",radius:26,strength:220},beauty:{radius:26,strength:110},height:3,unlockPop:15e3});_t({key:"t_bus",name:"Bus Depot",category:"transport",archetype:"transit",w:2,h:2,cost:8e3,upkeep:320,power:4,water:2,jobs:40,service:{kind:"transit",radius:22,strength:190},height:3.5,unlockPop:2e3,desc:"Cuts traffic in range."});_t({key:"t_train",name:"Train Station",category:"transport",archetype:"transit",w:3,h:3,cost:34e3,upkeep:900,power:12,water:6,jobs:110,service:{kind:"transit",radius:36,strength:240},beauty:{radius:10,strength:30},height:7,unlockPop:1e4,desc:"Best built on a rail line."});_t({key:"t_subway",name:"Subway Station",category:"transport",archetype:"transit",w:2,h:2,cost:15e3,upkeep:480,power:8,water:2,jobs:35,service:{kind:"transit",radius:26,strength:230},height:1.2,unlockPop:5e3,desc:"Connects the surface to subway tunnels below."});_t({key:"t_port",name:"Seaport",category:"transport",archetype:"port",w:4,h:4,cost:7e4,upkeep:1600,power:26,water:12,jobs:420,pollution:90,noise:110,needsWater:!0,height:6,unlockPop:15e3,desc:"Huge industrial demand boost."});_t({key:"t_airport",name:"Airport",category:"transport",archetype:"airport",w:7,h:5,cost:26e4,upkeep:5200,power:90,water:60,jobs:900,pollution:120,noise:200,needsFlat:!0,height:6,unlockPop:8e4,desc:"Massive commercial demand boost."});_t({key:"x_cityhall",name:"City Hall",category:"special",archetype:"landmark",w:3,h:3,cost:2e4,upkeep:500,power:6,water:5,jobs:80,beauty:{radius:26,strength:90},height:12,desc:"Boosts land value and approval."});_t({key:"x_statue",name:"Statue",category:"special",archetype:"landmark",w:1,h:1,cost:3500,upkeep:20,beauty:{radius:14,strength:80},height:5,unlockPop:1e3});_t({key:"x_observatory",name:"Observatory",category:"special",archetype:"landmark",w:3,h:3,cost:55e3,upkeep:1100,power:10,water:4,jobs:60,beauty:{radius:28,strength:120},service:{kind:"education",radius:24,strength:130,tier:2},height:13,unlockPop:25e3});_t({key:"x_tower",name:"Skyline Tower",category:"special",archetype:"landmark",w:3,h:3,cost:3e5,upkeep:4e3,power:40,water:20,jobs:240,beauty:{radius:60,strength:200},height:95,unlockPop:8e4,desc:"The monument that names your city."});_t({key:"x_casino",name:"Casino Resort",category:"special",archetype:"landmark",w:4,h:4,cost:15e4,upkeep:2600,power:45,water:30,jobs:600,beauty:{radius:20,strength:60},height:30,unlockPop:4e4,desc:"Money and crime, in equal measure."});_t({key:"x_mayor",name:"Mayor's House",category:"special",archetype:"house",w:2,h:2,cost:0,upkeep:0,residents:4,power:1,water:1,beauty:{radius:16,strength:60},height:4.5,desc:"A grateful city builds its mayor a home."});_t({key:"x_llama",name:"Llama Dome",category:"special",archetype:"landmark",w:3,h:3,cost:0,upkeep:120,power:6,water:4,jobs:30,beauty:{radius:30,strength:130},service:{kind:"park",radius:24,strength:220},height:10,desc:"The llamas demanded it. Attendance is mandatory fun."});_t({key:"x_military",name:"Military Base",category:"special",archetype:"warehouse",w:5,h:5,cost:0,upkeep:0,jobs:350,power:20,water:15,pollution:60,noise:160,service:{kind:"police",radius:36,strength:120},height:5,desc:"Jobs and order. Also artillery practice at 6am."});_t({key:"arco_plymouth",name:"Plymouth Arco",category:"special",archetype:"landmark",w:4,h:4,cost:1e5,upkeep:3e3,residents:8e3,jobs:2e3,power:120,water:110,pollution:40,noise:40,height:40,unlockPop:12e4,desc:"A city in a bottle — 8,000 souls."});_t({key:"arco_forest",name:"Forest Arco",category:"special",archetype:"landmark",w:4,h:4,cost:15e4,upkeep:3800,residents:12e3,jobs:3e3,power:90,water:140,pollution:0,noise:20,beauty:{radius:20,strength:80},height:46,unlockPop:12e4,desc:"Green terraces to the sky."});_t({key:"arco_darco",name:"Darco Arco",category:"special",archetype:"landmark",w:4,h:4,cost:22e4,upkeep:4600,residents:2e4,jobs:4500,power:160,water:180,pollution:80,noise:60,height:52,unlockPop:15e4,desc:"The dark hive. Rent is cheap."});_t({key:"arco_launch",name:"Launch Arco",category:"special",archetype:"landmark",w:5,h:5,cost:4e5,upkeep:6500,residents:3e4,jobs:8e3,power:300,water:260,pollution:30,noise:80,height:65,unlockPop:2e5,desc:"Destination: elsewhere. Countdown pending."});const Ps=ss,nc=Object.fromEntries(ss.map(i=>[i.key,i])),q0=(()=>{var t;const i={};for(const e of ss)!e.grown||e.zone===void 0||(i[t=e.zone]||(i[t]=[])).push(e);for(const e in i)i[e].sort((n,s)=>(n.level??0)-(s.level??0));return i})(),Y0=ss.filter(i=>!i.grown&&i.id!==0);function pe(i){return ss[i]??ss[0]}const xe=new Int32Array(j),ze=new Uint8Array(j),zt=new Uint8Array(j),Co=new Uint8Array(j),Gn=new Int32Array(j),Vr=new Uint8Array(j),Ro=new Uint8Array(j),ks=new Uint32Array(j),ic=new WeakMap;function sc(i){const t=i.road,e=i.roadNet;e.fill(0);let n=0,s=0,r=0;for(let o=0;o<j;o++){if(!t[o]||e[o])continue;n++;let a=0,l=0;xe[l++]=o,e[o]=n;let c=0;for(;a<l;){const h=xe[a++];c++;const u=h%C;u>0&&t[h-1]&&!e[h-1]&&(e[h-1]=n,xe[l++]=h-1),u<C-1&&t[h+1]&&!e[h+1]&&(e[h+1]=n,xe[l++]=h+1),h>=C&&t[h-C]&&!e[h-C]&&(e[h-C]=n,xe[l++]=h-C),h<j-C&&t[h+C]&&!e[h+C]&&(e[h+C]=n,xe[l++]=h+C)}c>r&&(r=c,s=n)}ic.set(i,s)}function Yh(i,t,e){let n=ic.get(i);if(n===void 0&&(sc(i),n=ic.get(i)??0),!n)return!1;const s=i.roadNet,r=t-3<0?0:t-3,o=t+3>=C?C-1:t+3,a=e-3<0?0:e-3,l=e+3>=at?at-1:e+3;for(let c=a;c<=l;c++){const h=c*C;for(let u=r;u<=o;u++)if(s[h+u]===n)return!0}return!1}function $h(i,t,e,n){const s=i.building;for(let r=0;r<t;r++){const o=Gn[r],a=pe(s[o]),l=e[r],c=o%C,h=o/C|0,u=Math.min(c+a.w,C),d=Math.min(h+a.h,at);for(let f=h;f<d;f++)for(let g=c;g<u;g++)n[f*C+g]=l}}function jh(i){const t=i.grid,e=t.building,n=i.stats;let s=0;for(let y=0;y<j;y++)e[y]&&t.originOffset[y]===0&&(Gn[s++]=y);let r=0,o=0,a=0,l=0;const c=i.deals;for(let y=0;y<c.length;y++){const w=c[y];w.active&&(w.kind==="buy_power"?r+=w.amount:w.kind==="sell_power"?o+=w.amount:w.kind==="buy_water"?a+=w.amount:w.kind==="sell_water"&&(l+=w.amount))}for(let y=0;y<j;y++)ze[y]=t.road[y]||t.wire[y]||t.tunnel[y]||e[y]?1:0;zt.fill(0);let h=0,u=0,d=0,f=0;for(let y=0;y<s;y++){const w=Gn[y],E=pe(e[w]);if(d+=E.power,E.powerOut>0){f+=E.powerOut;const b=w%C,S=w/C|0,I=Math.min(b+E.w,C),O=Math.min(S+E.h,at);for(let U=S;U<O;U++)for(let z=b;z<I;z++){const W=U*C+z;zt[W]||(zt[W]=1,xe[u++]=W)}}}if(r>0){for(let y=0;y<C;y++){const w=y,E=(at-1)*C+y;ze[w]&&!zt[w]&&(zt[w]=1,xe[u++]=w),ze[E]&&!zt[E]&&(zt[E]=1,xe[u++]=E)}for(let y=1;y<at-1;y++){const w=y*C,E=w+C-1;ze[w]&&!zt[w]&&(zt[w]=1,xe[u++]=w),ze[E]&&!zt[E]&&(zt[E]=1,xe[u++]=E)}}for(;h<u;){const y=xe[h++],w=y%C;w>0&&ze[y-1]&&!zt[y-1]&&(zt[y-1]=1,xe[u++]=y-1),w<C-1&&ze[y+1]&&!zt[y+1]&&(zt[y+1]=1,xe[u++]=y+1),y>=C&&ze[y-C]&&!zt[y-C]&&(zt[y-C]=1,xe[u++]=y-C),y<j-C&&ze[y+C]&&!zt[y+C]&&(zt[y+C]=1,xe[u++]=y+C)}const g=Math.max(0,f+r-o);let v=0;for(let y=0;y<s;y++){const w=Gn[y],E=pe(e[w]);let b=E.powerOut>0?1:0;if(!b){const S=w%C,I=w/C|0,O=Math.min(S+E.w,C),U=Math.min(I+E.h,at);t:for(let z=I;z<U;z++)for(let W=S;W<O;W++)if(zt[z*C+W]){b=1;break t}}Vr[y]=b,b&&(v+=E.power)}if(v>g){let y=0;for(let E=0;E<s;E++){if(!Vr[E])continue;const b=pe(e[Gn[E]]);b.power<=0||b.powerOut>0||(ks[y++]=t.landValue[Gn[E]]<<14|E)}ks.subarray(0,y).sort();let w=v-g;for(let E=0;E<y&&w>0;E++){const b=ks[E]&16383;Vr[b]=0,w-=pe(e[Gn[b]]).power}}const m=t.powered;for(let y=0;y<at;y++){const w=y*C;for(let E=0;E<C;E++){let b=0;const S=E-3<0?0:E-3,I=E+3>=C?C-1:E+3;for(let O=S;O<=I;O++)if(zt[w+O]){b=1;break}Co[w+E]=b}}for(let y=0;y<at;y++)for(let w=0;w<C;w++){let E=0;const b=y-3<0?0:y-3,S=y+3>=at?at-1:y+3;for(let I=b;I<=S;I++)if(Co[I*C+w]){E=1;break}m[y*C+w]=E}$h(t,s,Vr,m);for(let y=0;y<j;y++)ze[y]=t.pipe[y]||t.road[y]||t.tunnel[y]?1:0;zt.fill(0),h=0,u=0;let p=0,M=0;for(let y=0;y<s;y++){const w=Gn[y],E=pe(e[w]);if(p+=E.water,E.waterOut>0&&Vr[y]){M+=E.waterOut;const b=w%C,S=w/C|0,I=Math.min(b+E.w,C),O=Math.min(S+E.h,at);for(let U=S;U<O;U++)for(let z=b;z<I;z++){const W=U*C+z;ze[W]&&!zt[W]&&(zt[W]=1,xe[u++]=W),z>0&&ze[W-1]&&!zt[W-1]&&(zt[W-1]=1,xe[u++]=W-1),z<C-1&&ze[W+1]&&!zt[W+1]&&(zt[W+1]=1,xe[u++]=W+1),U>0&&ze[W-C]&&!zt[W-C]&&(zt[W-C]=1,xe[u++]=W-C),U<at-1&&ze[W+C]&&!zt[W+C]&&(zt[W+C]=1,xe[u++]=W+C)}}}if(a>0){for(let y=0;y<C;y++){const w=y,E=(at-1)*C+y;ze[w]&&!zt[w]&&(zt[w]=1,xe[u++]=w),ze[E]&&!zt[E]&&(zt[E]=1,xe[u++]=E)}for(let y=1;y<at-1;y++){const w=y*C,E=w+C-1;ze[w]&&!zt[w]&&(zt[w]=1,xe[u++]=w),ze[E]&&!zt[E]&&(zt[E]=1,xe[u++]=E)}}for(;h<u;){const y=xe[h++],w=y%C;w>0&&ze[y-1]&&!zt[y-1]&&(zt[y-1]=1,xe[u++]=y-1),w<C-1&&ze[y+1]&&!zt[y+1]&&(zt[y+1]=1,xe[u++]=y+1),y>=C&&ze[y-C]&&!zt[y-C]&&(zt[y-C]=1,xe[u++]=y-C),y<j-C&&ze[y+C]&&!zt[y+C]&&(zt[y+C]=1,xe[u++]=y+C)}for(let y=0;y<at;y++){const w=y*C;for(let E=0;E<C;E++){let b=0;const S=E-4<0?0:E-4,I=E+4>=C?C-1:E+4;for(let O=S;O<=I;O++)if(zt[w+O]){b=1;break}Co[w+E]=b}}const _=t.watered;for(let y=0;y<at;y++){const w=y*C,E=y-4<0?0:y-4,b=y+4>=at?at-1:y+4;for(let S=0;S<C;S++){let I=0;for(let O=E;O<=b;O++)if(Co[O*C+S]){I=1;break}_[w+S]=I}}const x=Math.max(0,M+a-l);let T=0;for(let y=0;y<s;y++){const w=Gn[y],E=pe(e[w]);let b=E.waterOut>0?1:0;if(!b){const S=w%C,I=w/C|0,O=Math.min(S+E.w,C),U=Math.min(I+E.h,at);t:for(let z=I;z<U;z++)for(let W=S;W<O;W++)if(_[z*C+W]){b=1;break t}}Ro[y]=b,b&&(T+=E.water)}if(T>x){let y=0;for(let E=0;E<s;E++){if(!Ro[E])continue;const b=pe(e[Gn[E]]);b.water<=0||b.waterOut>0||(ks[y++]=t.landValue[Gn[E]]<<14|E)}ks.subarray(0,y).sort();let w=T-x;for(let E=0;E<y&&w>0;E++){const b=ks[E]&16383;Ro[b]=0,w-=pe(e[Gn[b]]).water}}$h(t,s,Ro,_),n.powerDemand=d,n.powerSupply=g,n.waterDemand=p,n.waterSupply=x}const Kh=nc.t_subway.id,gn=new Uint16Array(j),Bs=new Int32Array(j),tl=new Uint16Array(j/2+2),ao=new Int32Array(16);function $0(i){const t=i.subway;gn.fill(0);let e=0;for(let n=0;n<j;n++){if(!t[n]||gn[n])continue;e++;let s=0,r=0;for(Bs[r++]=n,gn[n]=e;s<r;){const o=Bs[s++],a=o%C;a>0&&t[o-1]&&!gn[o-1]&&(gn[o-1]=e,Bs[r++]=o-1),a<C-1&&t[o+1]&&!gn[o+1]&&(gn[o+1]=e,Bs[r++]=o+1),o>=C&&t[o-C]&&!gn[o-C]&&(gn[o-C]=e,Bs[r++]=o-C),o<j-C&&t[o+C]&&!gn[o+C]&&(gn[o+C]=e,Bs[r++]=o+C)}}return e}function Wr(i,t){if(!i||t>=ao.length)return t;for(let e=0;e<t;e++)if(ao[e]===i)return t;return ao[t]=i,t+1}function Zh(i,t,e){let n=0;const s=i%C,r=i/C|0,o=Math.min(s+t,C),a=Math.min(r+e,at);for(let l=r;l<a;l++)for(let c=s;c<o;c++){const h=l*C+c;n=Wr(gn[h],n),c>0&&(n=Wr(gn[h-1],n)),c<C-1&&(n=Wr(gn[h+1],n)),l>0&&(n=Wr(gn[h-C],n)),l<at-1&&(n=Wr(gn[h+C],n))}return n}function j0(i,t,e,n,s){const r=Math.max(0,Math.ceil(t-n)),o=Math.min(C-1,Math.floor(t+n)),a=Math.max(0,Math.ceil(e-n)),l=Math.min(at-1,Math.floor(e+n)),c=1/n;for(let h=a;h<=l;h++){const u=h-e,d=h*C;for(let f=r;f<=o;f++){const g=f-t,v=Math.sqrt(g*g+u*u);if(v>=n)continue;const m=i[d+f]+s*(1-v*c);i[d+f]=m>255?255:m}}}function Jh(i){const t=i.grid,e=i.budget;t.covPolice.fill(0),t.covFire.fill(0),t.covHealth.fill(0),t.covEducation.fill(0),t.covPark.fill(0),t.covTransit.fill(0);const n=$0(t);tl.fill(0,0,n+1);for(let s=0;s<j;s++){if(t.building[s]!==Kh||t.originOffset[s]!==0)continue;const r=pe(t.building[s]),o=Zh(s,r.w,r.h);for(let a=0;a<o;a++)tl[ao[a]]++}for(let s=0;s<j;s++){const r=t.building[s];if(!r||t.originOffset[s]!==0)continue;const o=pe(r),a=o.service;if(!a)continue;let l,c;switch(a.kind){case"police":l=t.covPolice,c=e.fundPolice;break;case"fire":l=t.covFire,c=e.fundFire;break;case"health":l=t.covHealth,c=e.fundHealth;break;case"education":l=t.covEducation,c=e.fundEducation;break;case"park":l=t.covPark,c=e.fundParks;break;default:l=t.covTransit,c=e.fundRoads;break}let h=a.strength*c;if(r===Kh){const f=Zh(s,o.w,o.h);for(let g=0;g<f;g++)if(tl[ao[g]]>=2){h*=1.25;break}}if(h<=0)continue;const u=s%C,d=s/C|0;j0(l,u+o.w*.5-.5,d+o.h*.5-.5,a.radius,h)}}const Ln=new Float32Array(j),Po=new Float32Array(j),xa=new Float32Array(j),el=new Float32Array(j),Qh=new Float32Array(j),Lo=new Float32Array(j);function zs(i,t){for(let e=0;e<t;e++){for(let n=0;n<at;n++){const s=n*C;let r=i[s];for(let o=0;o<C;o++){const a=i[s+o],l=o<C-1?i[s+o+1]:a;Po[s+o]=(r+a+l)/3,r=a}}for(let n=0;n<C;n++){let s=Po[n];for(let r=0;r<at;r++){const o=r*C+n,a=Po[o],l=r<at-1?Po[o+C]:a;i[o]=(s+a+l)/3,s=a}}}}function K0(i,t,e,n){const s=Math.max(0,Math.ceil(i-e)),r=Math.min(C-1,Math.floor(i+e)),o=Math.max(0,Math.ceil(t-e)),a=Math.min(at-1,Math.floor(t+e)),l=1/e;for(let c=o;c<=a;c++){const h=c-t,u=c*C;for(let d=s;d<=r;d++){const f=d-i,g=Math.sqrt(f*f+h*h);g>=e||(xa[u+d]+=n*(1-g*l))}}}function tu(i){const t=i.grid,e=i.time.season===1,n=i.time.season===3;let s=!1,r=!1,o=!1,a=!1,l=!1;const c=i.ordinances;for(let _=0;_<c.length;_++){const x=c[_];x.active&&(x.key==="recycling"?s=!0:x.key==="smoke_detectors"?r=!0:x.key==="neighborhood_watch"?o=!0:x.key==="clean_air"?a=!0:x.key==="legalise_gambling"&&(l=!0))}for(let _=0;_<j;_++)el[_]=t.water[_]?220:0;zs(el,3),xa.fill(0);for(let _=0;_<j;_++){t.tree[_]&&(xa[_]+=t.tree[_]*5);const x=t.building[_];if(!x||t.originOffset[_]!==0)continue;const T=pe(x),y=T.beauty;y&&K0(_%C+T.w*.5-.5,(_/C|0)+T.h*.5-.5,y.radius,y.strength)}for(let _=0;_<j;_++){let x=0;const T=t.building[_];if(T){const y=pe(T);x=y.pollution,a&&y.category==="industrial"&&(x*=.65)}s&&(x*=.85),x+=t.traffic[_]*.25,t.onFire[_]&&(x+=160),Ln[_]=x}zs(Ln,3);const h=t.pollution;for(let _=0;_<j;_++){let x=Qh[_];h[_]>x&&(x=h[_]);const T=Ln[_];x>200?x=Math.max(T,x*.999):T>x?x=(x+T)*.5:x=x*.82+T*.18,x>340&&(x=340),Qh[_]=x,h[_]=x>255?255:x}for(let _=0;_<j;_++){let x=0;const T=t.building[_];T&&(x=pe(T).noise);const y=t.road[_];y===ke.Street?x+=16+t.traffic[_]*.4:y===ke.Avenue?x+=30+t.traffic[_]*.45:y===ke.Highway&&(x+=74+t.traffic[_]*.5),t.rail[_]&&(x+=40),Ln[_]=x}zs(Ln,2);const u=t.noise;for(let _=0;_<j;_++)u[_]=Ln[_]>255?255:Ln[_];const d=1+i.stats.unemployment*1.5;for(let _=0;_<j;_++){let x=0;const T=t.building[_];if(T){const y=pe(T);x=t.population[_]*.3+t.jobs[_]*.12;const w=t.landValue[_];w<90&&(x+=(90-w)*.5),y.grown&&t.condition[_]===0&&t.age[_]>4&&(x+=60),y.key==="x_casino"&&(x+=90),x*=d,l&&(x*=1.3)}Ln[_]=x}zs(Ln,2);const f=t.crime,g=o?.8:1;for(let _=0;_<j;_++){let x=(Ln[_]-t.covPolice[_]*.85-t.covEducation[_]*.1)*g;x<0&&(x=0),x=(f[_]+x)*.5,f[_]=x>255?255:x}const v=r?.75:1;for(let _=0;_<j;_++){let x=0;const T=t.building[_];if(T){x=26+pe(T).pollution*.22,t.condition[_]<60&&t.age[_]>4&&(x+=26);const y=t.landValue[_];y<80&&(x+=(80-y)*.25)}else t.tree[_]&&(x=8+t.tree[_]*7+(e?12:0)-(n?6:0));Ln[_]=x}zs(Ln,1);const m=t.fireRisk;for(let _=0;_<j;_++){let x=(Ln[_]-t.covFire[_]*.9)*v;t.onFire[_]&&(x=255),x<0&&(x=0),m[_]=x>255?255:x}for(let _=0;_<j;_++){if(t.water[_]){Lo[_]=0;continue}let x=70+el[_]*.35+xa[_]+t.covPark[_]*.28+t.covPolice[_]*.06+t.covEducation[_]*.08+t.covHealth[_]*.05+t.covTransit[_]*.05-h[_]*.5-u[_]*.2-f[_]*.4-t.traffic[_]*.1;const T=t.height[_];T>1&&(x+=Math.min(22,T*5));const y=t.building[_];y&&pe(y).grown&&t.condition[_]===0&&t.age[_]>4&&(x-=70),Lo[_]=x}zs(Lo,2);const p=t.landValue;for(let _=0;_<j;_++){let x=Lo[_];(t.water[_]||x<0)&&(x=0),x=(p[_]+x)*.5,p[_]=x>255?255:x}const M=t.desirability;for(let _=0;_<j;_++){if(t.water[_]){M[_]=0;continue}let x=p[_]*.55+t.covPark[_]*.12+t.covTransit[_]*.08+(t.powered[_]?18:0)+(t.watered[_]?18:0)-f[_]*.3-h[_]*.32-u[_]*.1-t.traffic[_]*.08;x<0&&(x=0),M[_]=x>255?255:x}}const we=new Int32Array(j),xi=new Int32Array(j),Xr=new Float32Array(j),sh=120,Z0=sh*2.6,J0=sh*6;function Q0(i){const t=i%C,e=i/C|0;for(let n=1;n<=3;n++){const s=t-n<0?0:t-n,r=t+n>=C?C-1:t+n,o=e-n<0?0:e-n,a=e+n>=at?at-1:e+n;for(let l=o;l<=a;l++){const c=l*C,h=l===e-n||l===e+n;for(let u=s;u<=r;u++)if(!(!h&&u!==t-n&&u!==t+n)&&we[c+u]>=0)return c+u}}return-1}function eu(i){const t=i.grid,e=t.road;we.fill(-1),Xr.fill(0);let n=0;for(let l=0;l<j;l++){const c=t.building[l];if(!c)continue;const h=pe(c);if(h.jobs<=0||h.category!=="commercial"&&h.category!=="industrial")continue;const u=l%C;u>0&&e[l-1]&&we[l-1]<0&&(we[l-1]=0,xi[n++]=l-1),u<C-1&&e[l+1]&&we[l+1]<0&&(we[l+1]=0,xi[n++]=l+1),l>=C&&e[l-C]&&we[l-C]<0&&(we[l-C]=0,xi[n++]=l-C),l<j-C&&e[l+C]&&we[l+C]<0&&(we[l+C]=0,xi[n++]=l+C)}let s=0;for(;s<n;){const l=xi[s++],c=we[l]+1,h=l%C;h>0&&e[l-1]&&we[l-1]<0&&(we[l-1]=c,xi[n++]=l-1),h<C-1&&e[l+1]&&we[l+1]<0&&(we[l+1]=c,xi[n++]=l+1),l>=C&&e[l-C]&&we[l-C]<0&&(we[l-C]=c,xi[n++]=l-C),l<j-C&&e[l+C]&&we[l+C]<0&&(we[l+C]=c,xi[n++]=l+C)}if(n>0)for(let l=0;l<j;l++){const c=t.population[l];if(!c)continue;const h=Q0(l);if(h<0)continue;let u=c*.42;u*=1-.5*(t.covTransit[l]/255);let d=h;Xr[d]+=u;let f=256;for(;we[d]>0&&f-- >0;){const g=d%C,v=we[d];let m=-1;if(g>0&&we[d-1]>=0&&we[d-1]<v?m=d-1:g<C-1&&we[d+1]>=0&&we[d+1]<v?m=d+1:d>=C&&we[d-C]>=0&&we[d-C]<v?m=d-C:d<j-C&&we[d+C]>=0&&we[d+C]<v&&(m=d+C),m<0)break;d=m,Xr[d]+=u}}let r=0,o=0;const a=t.traffic;for(let l=0;l<j;l++){const c=e[l];if(!c){a[l]=0;continue}const h=c===ke.Highway?J0:c===ke.Avenue?Z0:sh,u=Xr[l]/h;let d=u*150;d>255&&(d=255),a[l]=(a[l]+d)*.5;const f=Xr[l];f>0&&(r+=f,o+=(u>1?1:u)*f)}i.stats.traffic=r>0?o/r:0}const Hs=i=>Math.max(0,Math.min(1,i)),nu=i=>i.difficulty==="easy"?.8:i.difficulty==="hard"?1.25:1,tp=i=>i.difficulty==="easy"?1.25:i.difficulty==="hard"?.8:1;function rc(i){const{stats:t,budget:e}=i,n=Math.min(1,t.population/2500),s=t.population?t.jobs/t.population:.55,r=t.jobs?t.population/Math.max(1,t.jobs*1.8):0;let o=.62+(s-.48)*.9*n-e.taxRes*3.8-t.pollution*.22,a=.28+t.population/Math.max(1200,t.comBuildings*1700+1200)-r*.18*n-e.taxCom*3.5,l=.42+r*.25-Math.max(0,t.unemployment-.15)*.55*n-e.taxInd*3.2,c=!1,h=!1;for(let u=0;u<j;u++){if(!i.grid.building[u]||i.grid.originOffset[u])continue;const d=pe(i.grid.building[u]).key;d==="t_port"?c=!0:d==="t_airport"&&(h=!0)}c&&(l+=.22),h&&(a+=.28);for(const u of i.ordinances)u.active&&(u.key==="tourism"?a+=.2:u.key==="clean_air"?l-=.16:u.key==="legalise_gambling"&&(a+=.08));t.population>0&&(a=Math.max(a,.08)),i.demand.r=Math.max(-1,Math.min(1,o)),i.demand.c=Math.max(-1,Math.min(1,a)),i.demand.i=Math.max(-1,Math.min(1,l))}function oc(i){const t=i.grid,e=i.stats;let n=0,s=0,r=0,o=0,a=0,l=0,c=0,h=0,u=0,d=0,f=0;for(let g=0;g<j;g++)if(n+=t.population[g],s+=t.jobs[g],t.water[g]||(r+=t.landValue[g],o+=t.pollution[g],a+=t.covHealth[g],l+=t.covEducation[g],c+=255-t.crime[g],h++),t.building[g]&&!t.originOffset[g]){const v=pe(t.building[g]).category;v==="residential"?u++:v==="commercial"?d++:v==="industrial"&&f++}e.population=n,e.jobs=s,e.unemployment=n?Hs((n*.48-s)/(n*.48)):0,e.homeless=Math.max(0,Math.round(n*Math.max(0,e.unemployment-.3)*.08)),e.landValueAvg=h?r/h:0,e.pollution=h?o/h/255:0,e.health=h?Hs(.35+a/h/380):.5,e.educationLevel=h?Hs(.2+l/h/330):.3,e.safety=h?Hs(c/h/255):.5,e.happiness=Hs(.62+e.landValueAvg/700+e.health*.12+e.safety*.12-e.unemployment*.35-e.traffic*.2-e.pollution*.3),e.approval=Hs(e.happiness*.72+e.safety*.12+e.health*.08+e.educationLevel*.08),e.resBuildings=u,e.comBuildings=d,e.indBuildings=f}function tf(i){const t=i.budget,e=t.ledger;for(const a of Object.keys(e))e[a]=0;const n=tp(i);e.incomeRes=i.stats.population*t.taxRes*1.7*n;let s=0,r=0;for(let a=0;a<j;a++)if(i.grid.building[a]&&!i.grid.originOffset[a]){const l=pe(i.grid.building[a]);l.category==="commercial"?s+=l.jobs:l.category==="industrial"&&(r+=l.jobs);const c=l.upkeep*nu(i);l.category==="power"?e.costPower+=c:l.category==="water"?e.costWater+=c:l.category==="safety"?(e.costPolice+=c*t.fundPolice,e.costFire+=c*t.fundFire):l.category==="health"?e.costHealth+=c*t.fundHealth:l.category==="education"?e.costEducation+=c*t.fundEducation:l.category==="leisure"?e.costParks+=c*t.fundParks:e.costRoads+=c*.15*t.fundRoads}e.incomeCom=s*t.taxCom*4.2*n,e.incomeInd=r*t.taxInd*3.7*n;let o=0;for(let a=0;a<j;a++)(i.grid.road[a]||i.grid.rail[a]||i.grid.subway[a])&&o++;e.costRoads+=o*.18*t.fundRoads*nu(i);for(const a of i.ordinances)a.active&&(e.incomeOther-=a.costPerCapita*i.stats.population);for(const a of i.deals)if(a.active){const l=a.amount*a.pricePerUnit;a.kind.startsWith("sell_")||a.kind==="take_garbage"?e.incomeOther+=l:e.incomeOther-=l}for(let a=t.loans.length-1;a>=0;a--){const l=t.loans[a],c=Math.min(l.remaining,l.monthly);l.remaining-=c,l.monthsLeft--,e.costLoans+=c,(l.monthsLeft<=0||l.remaining<=.01)&&t.loans.splice(a,1)}e.net=e.incomeRes+e.incomeCom+e.incomeInd+e.incomeOther-e.costRoads-e.costPolice-e.costFire-e.costHealth-e.costEducation-e.costParks-e.costPower-e.costWater-e.costLoans,i.difficulty!=="sandbox"&&(t.funds+=e.net),Lt.emit("budget:updated",t)}function ep(i,t,e){if(i.budget.loans.length>=3||t<5e3||t>1e5||e<60||e>240)return!1;const n=.06+t/1e5*.025+(240-e)/240*.015,s=t*(n/12)/(1-Math.pow(1+n/12,-e));return i.budget.loans.push({principal:t,remaining:s*e,monthly:s,monthsLeft:e,rate:n}),i.budget.funds+=t,Lt.emit("budget:updated",i.budget),!0}function ef(i){for(const t of i.milestones)if(!t.reached&&i.stats.population>=t.pop){t.reached=!0,i.budget.funds+=t.reward,t.rewardKey&&i.unlocked.add(t.rewardKey);const e={id:i.nextNewsId++,tick:i.time.ticks,text:`${t.name} reached! ${t.desc}`,kind:"good"};i.news.unshift(e),i.news.length>100&&(i.news.length=100),Lt.emit("milestone",t),Lt.emit("news",e)}}function nf(i){const t=new Set(i.unlocked);for(const e of Ps)(i.difficulty==="sandbox"||!e.grown&&!e.unlockPop||(e.unlockPop??1/0)<=i.stats.population)&&t.add(e.key);for(const e of i.milestones)e.reached&&e.rewardKey&&t.add(e.rewardKey);return t}const np=Object.freeze(Object.defineProperty({__proto__:null,checkMilestones:ef,computeDemand:rc,monthlyBudget:tf,recomputeStats:oc,takeLoan:ep,unlockedKeys:nf},Symbol.toStringTag,{value:"Module"}));function nl(i,t){return t<=Kt.ResHigh?i.demand.r:t<=Kt.ComHigh?i.demand.c:i.demand.i}function Io(i,t,e,n,s,r){const o=q0[i];if(!o)return;let a=0;const l=s%C,c=s/C|0,h=n.grid;for(let d=0;d<o.length;d++){const f=o[d];f.level!==t||h.landValue[s]<(f.minLandValue??0)||r&&!h.isClear(l,c,f.w,f.h)||a++}if(!a)return;let u=wt(l,c,e)*a|0;for(let d=0;d<o.length;d++){const f=o[d];if(!(f.level!==t||h.landValue[s]<(f.minLandValue??0))&&!(r&&!h.isClear(l,c,f.w,f.h))&&u--===0)return f}}function ac(i,t,e,n,s){const r=i.grid,o=t%C,a=t/C|0,l=Math.min(1,s/(10+(wt(o,a,19)*20|0))),c=e.w*e.h,h=Math.round(e.residents*l),u=Math.round(e.jobs*l);for(let d=0;d<e.h;d++)for(let f=0;f<e.w;f++){const g=(a+d)*C+o+f,v=d*e.w+f;r.building[g]=e.id,r.originOffset[g]=f|d<<4,r.level[g]=e.level??1,r.variant[g]=wt(o,a,e.id)*255|0,r.condition[g]=n,r.age[g]=s,r.population[g]=Math.floor((h+c-1-v)/c),r.jobs[g]=Math.floor((u+c-1-v)/c)}}function Do(i,t,e){ac(i,t,e,180,0),i.grid.markDirty(t%C,t/C|0),Lt.emit("tile:changed",{i:t})}function ip(i){const t=i.grid;for(let e=0;e<j;e++){const n=t.building[e];if(n&&!t.originOffset[e]){const l=pe(n);if(!l.grown){if(l.residents>0){const v=10+(wt(e%C,e/C|0,19)*20|0),m=t.age[e]===0&&t.population[e]>0?v:Math.min(65535,t.age[e]+1);ac(i,e,l,t.condition[e],m)}continue}const c=e%C,h=e/C|0,u=Yh(t,c,h)&&!!t.powered[e]&&!!t.watered[e]&&nl(i,l.zone??0)>-.05&&t.landValue[e]>=(l.minLandValue??0);let d=Math.min(65535,t.age[e]+1),f=t.condition[e];const g=f>0;if(u?f=Math.min(255,f+3):f=Math.max(0,f-5),ac(i,e,l,f,d),g!==f>0&&(t.markDirty(c,h),Lt.emit("tile:changed",{i:e})),u&&f>235&&d>150&&wt(c,h,i.time.ticks)<.025){const v=Io(l.zone??0,(l.level??1)+1,d,i,e,!1);v&&Do(i,e,v)}else if(!u&&f===0&&d>90&&(l.level??1)>1){const v=Io(l.zone??0,(l.level??1)-1,d,i,e,!1);v&&Do(i,e,v)}else if(u&&f===0&&d>4){const v=Io(l.zone??0,1,d,i,e,!1);Do(i,e,v??l)}continue}if(n||!t.zone[e]||t.water[e]||t.road[e]||t.rail[e])continue;const s=e%C,r=e/C|0,o=t.zone[e];if(!Yh(t,s,r)||!t.powered[e]||!t.watered[e]||nl(i,o)<=0)continue;const a=8e-4+nl(i,o)*.0017;if(wt(s,r,i.time.ticks+i.seed)<a){const l=Io(o,1,i.seed,i,e,!0);l&&Do(i,e,l)}}}const sp={boom:["CRANES OUTNUMBER EXCUSES","CENSUS CLERKS REQUEST LARGER ABACUS","CITY GROWS; HORIZON RETREATS","NEW NEIGHBOURS ARRIVE WITH BOXES","BOOM TIMES RATTLE THE WINDOWS","POPULATION CHART POINTS IMPOLITELY UP","BUILDERS DISCOVER ANOTHER STOREY","WELCOME MATS SELL OUT CITYWIDE"],bust:["CENSUS FINDS SUSPICIOUSLY ROOMY CITY","MOVING VANS ENJOY RECORD QUARTER","CITY SHRINKS, PARKING IMPROVES","EMPTY FLATS DEVELOP ECHO","POPULATION TAKES SCENIC ROUTE DOWN","LAST RESIDENT OUT, PLEASE DIM STREETLIGHTS","GROWTH COMMITTEE MISPLACES GROWTH","CENSUS CLERK COUNTS EVERYONE TWICE, STILL WORRIES"],disaster:["CITY DUSTS ITSELF OFF, AGAIN","SIRENS STOP; QUESTIONS BEGIN","DISASTER LEAVES MAYOR WITH VERY LARGE CLIPBOARD","RUBBLE DECLARED TEMPORARY LANDMARK","CITIZENS SURVIVE ANOTHER RUDE AFTERNOON","AFTERMATH: BROOM SALES SOAR","EMERGENCY CREWS WIN ARGUMENT WITH CHAOS","CITY STANDING, SOME ASSEMBLY REQUIRED"],milestone:["CITY CROSSES LINE DRAWN BY STATISTICIANS","MILESTONE REACHED; CAKE COMMITTEE FORMED","CIVIC STATUS UPGRADED WITHOUT REBOOT","POPULATION EARNS SHINIER ROAD SIGN","CITY LEVELS UP, TAXPAYERS REMAIN ANALOGUE","HISTORY MADE BEFORE LUNCH","NEW MILESTONE, SAME OLD POTHOLE","LLAMAS SALUTE CIVIC ACHIEVEMENT"],first:["A CITY FIRST, PROBABLY NOT ITS LAST","RIBBON CUT; SCISSORS ACCOUNTED FOR","FIRST OF ITS KIND OPENS DOORS","NEW INSTITUTION BAFFLES OLD PIGEONS","CITY TRIES SOMETHING ON PURPOSE","INAUGURAL FACILITY SURVIVES INAUGURATION","PROGRESS ARRIVES IN A HARD HAT","MAYOR UNVEILS THING CITIZENS ASKED FOR"],quiet:["NOTHING EXPLODES; LEDGER INVESTIGATES","QUIET MONTH ALARMS NEWSROOM","CITY HUMS AT LEGALLY ACCEPTABLE VOLUME","PIGEONS DOMINATE COUNCIL AGENDA","NORMALITY BREAKS OUT CITYWIDE","MAYOR COMPLETES MONTH WITHOUT DUCKING","CALM CONDITIONS, LOUD CLASSIFIEDS","ALL ROUTINE, WHICH IS SUSPICIOUS"],crime:["CRIME WAVE STEALS FRONT PAGE","LOCKSMITHS REPORT UNCOMFORTABLE BOOM","CITY ASKS WHO STOLE THE SAFETY BUDGET","HIGH CRIME, LOW ALIBI SUPPLY","CONSTABLES SEEK MORE CONSTABLES","NEIGHBOURHOOD WATCH NEEDS BINOCULARS","THIEVES TAKE EVERYTHING BUT ADVICE","SAFETY FIGURES HIDE UNDER DESK"],pollution:["AIR ACQUIRES TEXTURE","SKY FILES FORMAL COMPLAINT","SMOG NOW VISIBLE FROM NEXT CENTURY","CITIZENS CHEW BEFORE BREATHING","POLLUTION METER RUNS OUT OF POLITE COLOURS","FACTORY CLOUD APPLIES FOR POSTCODE","CLEAN AIR REMAINS ATTRACTIVE THEORY","LLAMAS DEMAND SMALLER CHIMNEYS"],traffic:["COMMUTE NOW MEASURED IN SEASONS","TRAFFIC JAM APPLIES FOR PERMANENT ADDRESS","HORNS REPLACE MUNICIPAL BIRDLIFE","RUSH HOUR DECLARED FULL-TIME JOB","DRIVERS AGE VISIBLY AT CROSSROADS","CITY MOVES AT SPEED OF COUNCIL MEETING","GRIDLOCK ACHIEVES PERFECT GRID","SHORTCUT DISCOVERED; IMMEDIATELY CLOGGED"],tax:["TAX DIAL MOVES; WALLETS NOTICE","CITY HALL ADJUSTS PRICE OF CIVILISATION","TAXPAYERS READ FINE PRINT ALOUD","NEW RATES ARRIVE WITHOUT PARADE","TREASURY TURNS THREE IMPORTANT KNOBS","COUNCIL VOTES TO FEED THE LEDGER","TAX POLICY ENTERS ITS EXPERIMENTAL PHASE","MAYOR EXPLAINS PERCENTAGES; CROWD DISPERSES"]},rp=["Llama seeks arcology penthouse; elevator must accept hay.","For sale: one monorail map, only slightly imaginary.","Wanted: traffic engineer fluent in horns and regret.","Lost: municipal budget. Answers to “balanced.”","Year-6769 calendar, mint condition; all previous appointments missed.","Arcology window washer seeks very, very long ladder.","Quiet home beside fusion plant; night-light included.","Llama grooming, zoning appeals, and light demolition—one office.","Used hovercar. Still mostly hovers. No refunds after 6770.","Pothole naming rights available; family packages offered.","Mayor impersonator available for difficult ribbon cuttings.","Seeking roommate: must tolerate sirens, llamas, and 9% residential tax.","Fresh beachfront plot; tide currently reviewing contract.","Power line untangler—reasonable rates, spectacular hair.","Subway musician needs audience; trains optional.","Genuine antique from 2026. Historians baffled, offers welcome.","Smog photographer seeks days with subject matter.","Llama Ledger carrier needed; jetpack not supplied.","Bridge for sale. Water underneath sold separately.","Tiny park bench, panoramic view of six factories.","Arcology committee seeks committee to reduce committees.","Rent a crane for weddings, birthdays, or medium-density zoning.","Found: one civic milestone behind the sofa.","Wanted: disaster-free weekend, any year considered."];function lc(i){const t=i.history.population;return t.length>1?t[t.length-2]:t.length?t[0]:i.stats.population}function op(i,t,e){return i.disasters.length||t.some(n=>n.kind==="bad")?"disaster":t.some(n=>/reached|milestone/i.test(n.text))?"milestone":i.stats.safety<.35?"crime":i.stats.pollution>.48?"pollution":i.stats.traffic>.55?"traffic":Math.max(i.budget.taxRes,i.budget.taxCom,i.budget.taxInd)>=.12||Math.min(i.budget.taxRes,i.budget.taxCom,i.budget.taxInd)<=.06?"tax":e>Math.max(25,lc(i)*.015)?"boom":e<-Math.max(10,lc(i)*.01)?"bust":i.stats.resBuildings+i.stats.comBuildings+i.stats.indBuildings<=3&&i.stats.population>0?"first":"quiet"}function iu(i,t,e){const n=e()*i.length|0;for(let s=0;s<i.length;s++){const r=i[(n+s)%i.length];if(!t.has(r))return r}return i[n]}function su(i){return`§${Math.round(i).toLocaleString()}`}function ap(i){const t=as(i.seed+i.time.year*12+i.time.month|0),e=i.news.filter(u=>u.tick>i.time.ticks-31),n=i.stats.population-lc(i),s=i.papers.slice(0,6),r=iu(sp[op(i,e,n)],new Set(s.map(u=>u.headline)),t),o=e.slice(0,2).map(u=>u.text).join(" / ")||"no sirens, ribbon cuttings, or escaped planning meetings",a=i.disasters.map(u=>u.kind).join(", ")||"none active",l=[{title:i.disasters.length?"After the Sirens":"The Month in One Nervous Glance",body:`${i.cityName} reports ${i.stats.population.toLocaleString()} residents, a monthly change of ${n>=0?"+":""}${n.toLocaleString()}. Recent dispatches include ${o}; active disasters: ${a}. The Ledger congratulates everyone who did not make either list.`},{title:"Mayor, Money, and Other Weather Systems",body:`Mayor ${i.mayorName} faces an approval rating of ${Math.round(i.stats.approval*100)}%, while city funds stand at ${su(i.budget.funds)}. The last ledger balance was ${su(i.budget.ledger.net)}, with residential, commercial, and industrial taxes at ${Math.round(i.budget.taxRes*100)}%, ${Math.round(i.budget.taxCom*100)}%, and ${Math.round(i.budget.taxInd*100)}%. Numbers remain cheaper than promises.`},{title:"Streets, Stacks, and Taps",body:`Traffic is ${Math.round(i.stats.traffic*100)}%, pollution ${Math.round(i.stats.pollution*100)}%, and safety ${Math.round(i.stats.safety*100)}%. Water supply is ${i.stats.waterSupply.toLocaleString()} against demand of ${i.stats.waterDemand.toLocaleString()}, while power supply is ${i.stats.powerSupply.toLocaleString()} against ${i.stats.powerDemand.toLocaleString()} demand. If these figures improve, the Ledger will reluctantly print that too.`}],c=iu(rp,new Set(s.map(u=>u.classified)),t),h={year:i.time.year,month:i.time.month,masthead:"The Llama Ledger",headline:r,articles:l,classified:c};return i.papers.unshift(h),i.papers.length>24&&(i.papers.length=24),Lt.emit("paper",h),h}const mo=new Map,ru=["fire","earthquake","tornado","flood","meteor","blackout","riot","volcano","monster","aircrash","meltdown","hurricane","chemical"];function lp(i,t,e="bad"){Lt.emit("news",{id:i.nextNewsId++,tick:i.time.ticks,text:t,kind:e})}function xs(i,t,e,n=!0){if(!Ht(t,e))return;const s=i.grid,r=lt(t,e),o=s.originOf(t,e);if(o>=0){const a=pe(s.building[o]),l=o%C,c=o/C|0;for(let h=0;h<a.h;h++)for(let u=0;u<a.w;u++){const d=l+u,f=c+h;Ht(d,f)&&(s.clearTile(lt(d,f)),s.markDirty(d,f))}}else s.clearTile(r),s.markDirty(t,e);n&&(s.road[r]=s.rail[r]=s.wire[r]=s.pipe[r]=s.subway[r]=s.tunnel[r]=0),s.tree[r]=0,Lt.emit("tile:changed",{i:r})}function ur(i,t,e,n=18){if(!Ht(t,e))return;const s=lt(t,e);(i.grid.building[s]||i.grid.tree[s])&&(i.grid.onFire[s]=Math.max(i.grid.onFire[s],n))}function dr(i,t){let e=-1,n=-1/0;const s=as(i.seed^i.time.ticks^i.nextDisasterId*7919);for(let r=0;r<512;r++){const o=s()*C*at|0,a=t?t(o):s();a>n&&(e=o,n=a)}return[e%C,e/C|0]}function ou(i,t){for(let e=0;e<i.grid.building.length;e++){const n=i.grid.building[e];if(n&&i.grid.originOffset[e]===0&&t(Ps[n]?.key??""))return e}return-1}function cc(i,t,e,n){let s=e,r=n;if(t==="aircrash"){const h=ou(i,u=>u.includes("airport"));if(h<0)return null;s??(s=h%C),r??(r=h/C|0)}else if(t==="meltdown"){const h=ou(i,u=>u.includes("nuclear"));if(h<0)return null;s??(s=h%C),r??(r=h/C|0)}else t==="riot"?[s,r]=s===void 0||r===void 0?dr(i,h=>i.grid.crime[h]-i.grid.covPolice[h]*.7):[s,r]:t==="monster"?[s,r]=s===void 0||r===void 0?dr(i,h=>i.grid.population[h]+i.grid.jobs[h]):[s,r]:(t==="flood"||t==="hurricane")&&(s===void 0||r===void 0)?[s,r]=dr(i,h=>{if(i.grid.water[h])return-1;const u=h%C,d=h/C|0;let f=0;for(let g=-2;g<=2;g++)for(let v=-2;v<=2;v++)Ht(u+v,d+g)&&(f+=i.grid.water[lt(u+v,d+g)]);return f}):(s===void 0||r===void 0)&&([s,r]=dr(i));s=Math.max(0,Math.min(C-1,s)),r=Math.max(0,Math.min(at-1,r));const o={fire:45,earthquake:12,tornado:42,flood:50,meteor:8,blackout:36,riot:32,volcano:55,monster:55,aircrash:24,meltdown:20,hurricane:55,chemical:30},a={id:i.nextDisasterId++,kind:t,x:s,y:r,life:o[t],radius:t==="meltdown"?8:4,intensity:1},l=as(i.seed^a.id*65537);if(a.vx=l()*2-1,a.vy=l()*2-1,i.disasters.push(a),t==="fire"&&ur(i,s,r,28),t==="flood"||t==="hurricane"){const h=[];a.floodedTiles=h,mo.set(a.id,h)}return lp(i,{fire:"A major fire has broken out!",earthquake:"Earthquake rocks SethCity 6769!",tornado:"A tornado is tearing through the city!",flood:"Flood waters surge inland!",meteor:"Meteor impact reported!",blackout:"City-wide blackout!",riot:"Rioting erupts in a high-crime district!",volcano:"A volcano erupts beneath the city!",monster:"The Giant Llama of 6769 is on a rampage!",aircrash:"Aircraft down near the airport!",meltdown:"Nuclear meltdown! The exclusion zone is irradiated.",hurricane:"A hurricane batters the coast!",chemical:"Chemical spill poisons the shoreline!"}[t]),Lt.emit("shake",{intensity:t==="earthquake"||t==="meteor"?1:.55}),Lt.emit("disaster:start",a),a}function cp(i){const t=i.grid;for(let e=0;e<t.onFire.length;e++){if(!t.onFire[e])continue;const n=e%C,s=e/C|0;if(t.onFire[e]--,t.onFire[e]===0){xs(i,n,s,!1);continue}if((t.onFire[e]&3)===0)for(const[r,o]of[[1,0],[-1,0],[0,1],[0,-1]]){const a=n+r,l=s+o;if(!Ht(a,l))continue;const c=lt(a,l),h=Math.max(.01,(t.fireRisk[c]+45-t.covFire[c]*.8)/650);!t.onFire[c]&&wt(a,l,i.time.ticks)<h&&ur(i,a,l)}}}function hp(i,t){const e=i.grid,n=as(i.seed^t.id*8191^t.life*131);if(t.kind==="blackout"){e.powered.fill(0),i.blackoutTicks=t.life;return}if(t.kind==="earthquake")for(let s=0;s<18;s++){const r=Math.round(t.x+(n()-.5)*18),o=Math.round(t.y+(n()-.5)*5);n()>e.condition[lt(Math.max(0,Math.min(127,r)),Math.max(0,Math.min(127,o)))]/300&&xs(i,r,o),n()<.12&&ur(i,r,o)}else if(t.kind==="tornado"||t.kind==="monster"){if(t.kind==="monster"){const r=dr(i,o=>e.population[o]+e.jobs[o]);t.vx=(r[0]-t.x)*.03,t.vy=(r[1]-t.y)*.03}else t.vx=(t.vx??0)*.82+(n()-.5)*.55,t.vy=(t.vy??0)*.82+(n()-.5)*.55;t.x=Math.max(1,Math.min(126,t.x+(t.vx??0))),t.y=Math.max(1,Math.min(126,t.y+(t.vy??0)));const s=t.kind==="monster"?2:1;for(let r=-s;r<=s;r++)for(let o=-s;o<=s;o++)n()<.72&&xs(i,Math.round(t.x)+o,Math.round(t.y)+r)}else if(t.kind==="flood"||t.kind==="hurricane"){let s=t.floodedTiles??mo.get(t.id);s||(s=[]),t.floodedTiles=s,mo.set(t.id,s);for(let r=0;r<(t.kind==="hurricane"?10:18);r++){const o=Math.round(t.x+(n()-.5)*24),a=Math.round(t.y+(n()-.5)*24);if(!Ht(o,a))continue;const l=lt(o,a);let c=!1;for(let h=-1;h<=1;h++)for(let u=-1;u<=1;u++)Ht(o+u,a+h)&&e.water[lt(o+u,a+h)]&&(c=!0);if(c&&!e.water[l]&&(s.push(l),e.water[l]=1,e.markDirty(o,a),n()<.45&&xs(i,o,a,!1)),t.kind==="hurricane"&&n()<.25){const h=lt(Math.max(0,Math.min(127,o)),Math.max(0,Math.min(127,a)));e.building[h]&&(e.condition[h]=Math.max(0,e.condition[h]-45))}}}else if(t.kind==="meteor"&&t.life===7){for(let s=-4;s<=4;s++)for(let r=-4;r<=4;r++)if(r*r+s*s<=16){const o=Math.round(t.x)+r,a=Math.round(t.y)+s;xs(i,o,a),Ht(o,a)&&(e.height[lt(o,a)]-=Qe*Math.max(1,4-Math.hypot(r,s)),e.terrainDirty=!0)}}else if(t.kind==="volcano")for(let s=0;s<7;s++){const r=Math.round((n()-.5)*12),o=Math.round((n()-.5)*12),a=Math.round(t.x)+r,l=Math.round(t.y)+o;if(Ht(a,l)){const c=lt(a,l);e.height[c]+=Qe*Math.max(0,4-Math.hypot(r,o)*.5),e.water[c]=0,e.terrainDirty=!0,ur(i,a,l,24)}}else if(t.kind==="riot")for(let s=0;s<4;s++){const r=Math.round(t.x+(n()-.5)*8),o=Math.round(t.y+(n()-.5)*8);n()<.3?xs(i,r,o,!1):ur(i,r,o)}else if(t.kind==="aircrash"){const s=24-t.life,r=Math.round(t.x+(t.vx??1)*s),o=Math.round(t.y+(t.vy??.4)*s);xs(i,r,o),ur(i,r,o,26)}else if(t.kind==="meltdown")for(let s=-8;s<=8;s++)for(let r=-8;r<=8;r++)r*r+s*s<=64&&Ht(Math.round(t.x)+r,Math.round(t.y)+s)&&(e.pollution[lt(Math.round(t.x)+r,Math.round(t.y)+s)]=255);else if(t.kind==="chemical")for(let s=0;s<20;s++){const r=Math.round(t.x+(n()-.5)*12),o=Math.round(t.y+(n()-.5)*12);Ht(r,o)&&(e.pollution[lt(r,o)]=255)}}function sf(i){cp(i);for(let t=i.disasters.length-1;t>=0;t--){const e=i.disasters[t];if(hp(i,e),e.life--,e.life>0)continue;const n=e.floodedTiles??mo.get(e.id);if(n){for(const s of n)i.grid.water[s]=0,i.grid.markDirty(s%C,s/C|0);mo.delete(e.id),i.grid.terrainDirty=!0}i.disasters.splice(t,1),Lt.emit("disaster:end",{id:e.id})}rf(i)}function rf(i){if(!i.disastersEnabled||i.disasters.length||i.time.ticks<24)return;const t=i.difficulty==="hard"?1.7:i.difficulty==="easy"?.65:i.difficulty==="sandbox"?.4:1;if(wt(i.seed,i.time.ticks,6769)>=t/(365*3.2))return;let e=ru[wt(i.time.ticks,i.seed,77)*ru.length|0];if(e==="chemical"){const n=dr(i,s=>{if(!i.grid.building[s]||Ps[i.grid.building[s]]?.category!=="industrial")return-1;const r=s%C,o=s/C|0;let a=0;for(let l=-2;l<=2;l++)for(let c=-2;c<=2;c++)Ht(r+c,o+l)&&(a+=i.grid.water[lt(r+c,o+l)]);return a});if(!i.grid.building[lt(n[0],n[1])])e="fire";else{cc(i,e,n[0],n[1]);return}}cc(i,e)}const up=Object.freeze(Object.defineProperty({__proto__:null,maybeRandomDisaster:rf,triggerDisaster:cc,updateDisasters:sf},Symbol.toStringTag,{value:"Module"})),dp=[0,.25,.75,4];class fp{constructor(t){L(this,"accumulator",0);L(this,"phase",0);this.state=t}update(t){const e=dp[this.state.speed];if(this.state.time.timeOfDay=(this.state.time.timeOfDay+t/90)%1,!!e)for(this.accumulator+=Math.min(t,.25)*e;this.accumulator>=1;)this.accumulator--,this.tick()}tick(){const t=this.state;if(rc(t),this.phase===0?(sc(t.grid),jh(t)):this.phase===1?Jh(t):this.phase===2?tu(t):eu(t),this.phase=this.phase+1&3,sf(t),ip(t),oc(t),ef(t),t.time.ticks++,t.time.day++,t.time.day>30){t.time.day=1,t.time.month++,t.time.month>11&&(t.time.month=0,t.time.year++),t.time.season=t.time.month/3|0,tf(t),ap(t);const e=t.history;e.population.push(t.stats.population),e.funds.push(t.budget.funds),e.approval.push(t.stats.approval),e.pollution.push(t.stats.pollution),e.traffic.push(t.stats.traffic),e.unemployment.push(t.stats.unemployment);for(const n of[e.population,e.funds,e.approval,e.pollution,e.traffic,e.unemployment])n.length>240&&n.splice(0,n.length-240)}Lt.emit("stats:updated",t.stats),Lt.emit("time:updated",t.time)}recomputeAll(){const t=this.state;sc(t.grid),jh(t),Jh(t),tu(t),eu(t),oc(t),rc(t),Lt.emit("stats:updated",t.stats),Lt.emit("budget:updated",t.budget),Lt.emit("time:updated",t.time)}}const pp={road_street:12,road_avenue:60,road_highway:220,rail:90,wire:6,pipe:10,subway:150,sign:50,tree:12,water_place:120,terrain_raise:20,terrain_lower:20,terrain_level:25,bulldoze:4},il={res_low:Kt.ResLow,res_med:Kt.ResMed,res_high:Kt.ResHigh,com_low:Kt.ComLow,com_high:Kt.ComHigh,ind_agri:Kt.IndAgri,ind_light:Kt.IndLight,ind_heavy:Kt.IndHeavy},mp={[Kt.ResLow]:8,[Kt.ResMed]:16,[Kt.ResHigh]:24,[Kt.ComLow]:8,[Kt.ComHigh]:24,[Kt.IndAgri]:8,[Kt.IndLight]:16,[Kt.IndHeavy]:24};class gp{constructor(t){L(this,"pendingSignText",null);this.state=t}scale(t){return Math.ceil(t*(this.state.difficulty==="easy"?.8:this.state.difficulty==="hard"?1.25:1))}spend(t){return this.state.difficulty==="sandbox"?!0:this.state.budget.funds<t?!1:(this.state.budget.funds-=t,!0)}waterSiteIsClear(t,e,n){const s=this.state.grid;for(let r=0;r<t.h;r++)for(let o=0;o<t.w;o++){const a=lt(e+o,n+r);if(s.building[a]||s.road[a]||s.rail[a]||s.water[a]&&s.height[a]<Yn-2*Qe-.001)return!1}return!0}footprintTouchesWater(t,e,n){const s=this.state.grid;for(let r=0;r<t.h;r++)for(let o=0;o<t.w;o++)if(s.water[lt(e+o,n+r)])return!0;return s.touchesWater(e,n,t.w,t.h)}canPlace(t,e,n){const s=nc[t];if(!s)return{ok:!1,cost:0,reason:"Unknown building",tiles:0};const r=this.scale(s.cost);if(!Ht(e,n)||!Ht(e+s.w-1,n+s.h-1))return{ok:!1,cost:r,reason:"Outside city limits",tiles:0};if(!nf(this.state).has(t))return{ok:!1,cost:r,reason:"Not unlocked",tiles:0};if(s.needsWater?!this.waterSiteIsClear(s,e,n):!this.state.grid.isClear(e,n,s.w,s.h))return{ok:!1,cost:r,reason:"Site is occupied or the water is too deep",tiles:0};if(s.needsWater&&!this.footprintTouchesWater(s,e,n))return{ok:!1,cost:r,reason:"Must touch water",tiles:0};if(s.needsFlat&&!this.state.grid.isFlat(e,n,s.w,s.h)){let o=1/0,a=-1/0;for(let l=0;l<s.h;l++)for(let c=0;c<s.w;c++){const h=this.state.grid.height[lt(e+c,n+l)];o=Math.min(o,h),a=Math.max(a,h)}if(a-o>Qe*4)return{ok:!1,cost:r,reason:"Terrain cannot be flattened",tiles:0}}return this.state.difficulty!=="sandbox"&&this.state.budget.funds<r?{ok:!1,cost:r,reason:"Insufficient funds",tiles:0}:{ok:!0,cost:r,tiles:s.w*s.h}}stamp(t,e,n){const s=this.state.grid,r=e*37+n*71+this.state.seed&255,o=t.w===t.h?e+n+this.state.seed&3:0;for(let a=0;a<t.h;a++)for(let l=0;l<t.w;l++){const c=lt(e+l,n+a);t.needsWater&&(s.height[c]=Yn,s.tree[c]=0,s.terrainDirty=!0),s.building[c]=t.id,s.originOffset[c]=l|a<<4,s.level[c]=t.level??1,s.variant[c]=r,s.rotation[c]=o,s.condition[c]=255,s.age[c]=0,s.population[c]=0,s.jobs[c]=t.residents>0?0:Math.round(t.jobs/(t.w*t.h)),s.markDirty(e+l,n+a)}Lt.emit("tile:changed",{i:lt(e,n)})}place(t,e,n){const s=this.canPlace(t,e,n);if(!s.ok)return s;const r=nc[t];return r.needsFlat&&!this.state.grid.isFlat(e,n,r.w,r.h)&&!z0(this.state.grid,e,n,r.w,r.h)?{...s,ok:!1,reason:"Terrain cannot be flattened"}:this.spend(s.cost)?(this.stamp(r,e,n),Lt.emit("money:spent",{amount:s.cost,x:e,y:n,label:r.name}),s):{...s,ok:!1,reason:"Insufficient funds"}}bulldozeTile(t,e){const n=this.state.grid;if(!Ht(t,e))return 0;const s=n.originOf(t,e);let r=0;if(s>=0){const a=pe(n.building[s]),l=s%C,c=s/C|0,h=a.w,u=a.h;for(let d=0;d<u;d++)for(let f=0;f<h;f++)n.clearTile(lt(l+f,c+d)),n.markDirty(l+f,c+d),r++;return Lt.emit("tile:changed",{i:s}),r}const o=lt(t,e);return n.road[o]||n.rail[o]||n.wire[o]||n.pipe[o]||n.subway[o]||n.zone[o]||n.tree[o]?(n.road[o]=n.rail[o]=n.wire[o]=n.pipe[o]=n.subway[o]=n.tunnel[o]=n.zone[o]=n.tree[o]=0,n.markDirty(t,e),Lt.emit("tile:changed",{i:o}),1):0}applyTool(t,e,n,s,r,o){if(t==="inspect")return{ok:!0,cost:0,tiles:0};if(t.startsWith("build_"))return o?this.canPlace(t.slice(6),e,n):this.place(t.slice(6),e,n);if(t.startsWith("zone_")&&!(t.slice(5)in il))return{ok:!1,cost:0,reason:"Unknown zone",tiles:0};const a=Math.max(0,Math.min(e,s)),l=Math.min(127,Math.max(e,s)),c=Math.max(0,Math.min(n,r)),h=Math.min(127,Math.max(n,r)),u=[];if(t.startsWith("road_")||t==="rail"||t==="wire"||t==="pipe"||t==="subway")if(Math.abs(s-e)>=Math.abs(r-n)){const y=s>=e?1:-1;for(let E=e;E!==s+y;E+=y)Ht(E,n)&&u.push([E,n]);const w=r>=n?1:-1;for(let E=n+w;E!==r+w;E+=w)Ht(s,E)&&u.push([s,E])}else{const y=r>=n?1:-1;for(let E=n;E!==r+y;E+=y)Ht(e,E)&&u.push([e,E]);const w=s>=e?1:-1;for(let E=e+w;E!==s+w;E+=w)Ht(E,r)&&u.push([E,r])}else for(let T=c;T<=h;T++)for(let y=a;y<=l;y++)u.push([y,T]);if(!u.length)return{ok:!1,cost:0,reason:"Outside city limits",tiles:0};const f=this.state.grid;for(const[T,y]of u){const w=lt(T,y);if((t.startsWith("road_")||t==="rail"||t==="water_place")&&f.building[w])return{ok:!1,cost:0,reason:"Building in the way",tiles:0};if(t==="water_place"&&(f.road[w]||f.rail[w]))return{ok:!1,cost:0,reason:"Transport route in the way",tiles:0};if(t.startsWith("terrain_")&&(f.building[w]||f.road[w]||f.rail[w]))return{ok:!1,cost:0,reason:"Clear the site before reshaping terrain",tiles:0}}if(t.startsWith("zone_")||t==="tree"){const T=u.filter(([y,w])=>{const E=lt(y,w);return!f.building[E]&&!f.road[E]&&!f.rail[E]&&!f.water[E]});if(!T.length)return{ok:!1,cost:0,reason:"Nothing to paint here",tiles:0};u.length=0;for(const y of T)u.push(y)}let g=0,v=0;const m=u[0],p=u[u.length-1],M=(f.height[lt(m[0],m[1])]+f.height[lt(p[0],p[1])])*.5,_=new Set;for(const[T,y]of u){const w=lt(T,y);let E=t.startsWith("zone_")?mp[il[t.slice(5)]]??0:pp[t]??0;if(t==="bulldoze"){const b=f.originOf(T,y);b>=0?_.has(b)?E=0:_.add(b):!f.road[w]&&!f.rail[w]&&!f.wire[w]&&!f.pipe[w]&&!f.zone[w]&&!f.tree[w]&&(E=0)}(t.startsWith("road_")||t==="rail")&&this.state.grid.water[w]&&(E*=5),t.startsWith("road_")&&this.state.grid.height[w]>=M+2*Qe&&(E=96),g+=E,v++}const x=this.scale(g);if(this.state.difficulty!=="sandbox"&&this.state.budget.funds<x)return{ok:!1,cost:x,reason:"Insufficient funds",tiles:v};if(o)return{ok:!0,cost:x,tiles:v};if(!this.spend(x))return{ok:!1,cost:x,reason:"Insufficient funds",tiles:v};for(const[T,y]of u){const w=lt(T,y);t==="bulldoze"?this.bulldozeTile(T,y):t.startsWith("zone_")?f.zone[w]=il[t.slice(5)]??Kt.None:t==="road_street"?(f.zone[w]=0,f.tree[w]=0,f.road[w]=ke.Street,f.tunnel[w]=!f.water[w]&&f.height[w]>=M+2*Qe?1:0):t==="road_avenue"?(f.zone[w]=0,f.tree[w]=0,f.road[w]=ke.Avenue,f.tunnel[w]=!f.water[w]&&f.height[w]>=M+2*Qe?1:0):t==="road_highway"?(f.zone[w]=0,f.tree[w]=0,f.road[w]=ke.Highway,f.tunnel[w]=!f.water[w]&&f.height[w]>=M+2*Qe?1:0):t==="rail"?(f.zone[w]=0,f.tree[w]=0,f.rail[w]=1):t==="wire"?f.wire[w]=1:t==="pipe"?f.pipe[w]=1:t==="subway"?f.subway[w]=1:t==="tree"?f.tree[w]=Math.min(3,f.tree[w]+1):t==="water_place"?(f.zone[w]=0,f.tree[w]=0,f.water[w]=1,f.height[w]=Yn-Qe,f.terrainDirty=!0):t.startsWith("terrain_")?(B0(f,T,y,0,t.slice(8),t==="terrain_level"?f.height[lt(m[0],m[1])]:void 0),f.terrainDirty=!0):t==="sign"&&this.pendingSignText&&(this.state.signs.push({x:T,y,text:this.pendingSignText.slice(0,24)}),this.pendingSignText=null),f.markDirty(T,y),Lt.emit("tile:changed",{i:w})}return{ok:!0,cost:x,tiles:v}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rh="171",vp=0,au=1,_p=2,of=1,af=2,Ti=3,ki=0,En=1,ii=2,Li=0,pr=1,hc=2,lu=3,cu=4,xp=5,Ms=100,yp=101,Mp=102,wp=103,bp=104,Sp=200,Ep=201,Tp=202,Ap=203,uc=204,dc=205,Cp=206,Rp=207,Pp=208,Lp=209,Ip=210,Dp=211,Up=212,Np=213,Fp=214,fc=0,pc=1,mc=2,xr=3,gc=4,vc=5,_c=6,xc=7,oh=0,Op=1,kp=2,is=0,lf=1,cf=2,hf=3,ah=4,Bp=5,uf=6,df=7,ff=300,yr=301,Mr=302,yc=303,Mc=304,Wa=306,go=1e3,Ci=1001,wc=1002,Tn=1003,zp=1004,Uo=1005,qn=1006,sl=1007,Es=1008,fi=1009,pf=1010,mf=1011,vo=1012,lh=1013,Ls=1014,ci=1015,ui=1016,ch=1017,hh=1018,wr=1020,gf=35902,vf=1021,_f=1022,Nn=1023,xf=1024,yf=1025,mr=1026,br=1027,uh=1028,dh=1029,Mf=1030,fh=1031,ph=1033,ya=33776,Ma=33777,wa=33778,ba=33779,bc=35840,Sc=35841,Ec=35842,Tc=35843,Ac=36196,Cc=37492,Rc=37496,Pc=37808,Lc=37809,Ic=37810,Dc=37811,Uc=37812,Nc=37813,Fc=37814,Oc=37815,kc=37816,Bc=37817,zc=37818,Hc=37819,Gc=37820,Vc=37821,Sa=36492,Wc=36494,Xc=36495,wf=36283,qc=36284,Yc=36285,$c=36286,Hp=3200,bf=3201,mh=0,Gp=1,es="",Cn="srgb",Sr="srgb-linear",Da="linear",be="srgb",Gs=7680,hu=519,Vp=512,Wp=513,Xp=514,Sf=515,qp=516,Yp=517,$p=518,jp=519,uu=35044,Kp=35048,du="300 es",Ri=2e3,Ua=2001;class Lr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fu=1234567;const lo=Math.PI/180,_o=180/Math.PI;function Ir(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(dn[i&255]+dn[i>>8&255]+dn[i>>16&255]+dn[i>>24&255]+"-"+dn[t&255]+dn[t>>8&255]+"-"+dn[t>>16&15|64]+dn[t>>24&255]+"-"+dn[e&63|128]+dn[e>>8&255]+"-"+dn[e>>16&255]+dn[e>>24&255]+dn[n&255]+dn[n>>8&255]+dn[n>>16&255]+dn[n>>24&255]).toLowerCase()}function ne(i,t,e){return Math.max(t,Math.min(e,i))}function gh(i,t){return(i%t+t)%t}function Zp(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Jp(i,t,e){return i!==t?(e-i)/(t-i):0}function co(i,t,e){return(1-e)*i+e*t}function Qp(i,t,e,n){return co(i,t,1-Math.exp(-e*n))}function tm(i,t=1){return t-Math.abs(gh(i,t*2)-t)}function em(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function nm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function im(i,t){return i+Math.floor(Math.random()*(t-i+1))}function sm(i,t){return i+Math.random()*(t-i)}function rm(i){return i*(.5-Math.random())}function om(i){i!==void 0&&(fu=i);let t=fu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function am(i){return i*lo}function lm(i){return i*_o}function cm(i){return(i&i-1)===0&&i!==0}function hm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function um(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function dm(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function cr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function bn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const rn={DEG2RAD:lo,RAD2DEG:_o,generateUUID:Ir,clamp:ne,euclideanModulo:gh,mapLinear:Zp,inverseLerp:Jp,lerp:co,damp:Qp,pingpong:tm,smoothstep:em,smootherstep:nm,randInt:im,randFloat:sm,randFloatSpread:rm,seededRandom:om,degToRad:am,radToDeg:lm,isPowerOfTwo:cm,ceilPowerOfTwo:hm,floorPowerOfTwo:um,setQuaternionFromProperEuler:dm,normalize:bn,denormalize:cr};class ut{constructor(t=0,e=0){ut.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qt{constructor(t,e,n,s,r,o,a,l,c){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],M=s[1],_=s[4],x=s[7],T=s[2],y=s[5],w=s[8];return r[0]=o*v+a*M+l*T,r[3]=o*m+a*_+l*y,r[6]=o*p+a*x+l*w,r[1]=c*v+h*M+u*T,r[4]=c*m+h*_+u*y,r[7]=c*p+h*x+u*w,r[2]=d*v+f*M+g*T,r[5]=d*m+f*_+g*y,r[8]=d*p+f*x+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=d*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(rl.makeScale(t,e)),this}rotate(t){return this.premultiply(rl.makeRotation(-t)),this}translate(t,e){return this.premultiply(rl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const rl=new Qt;function Ef(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Na(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fm(){const i=Na("canvas");return i.style.display="block",i}const pu={};function hr(i){i in pu||(pu[i]=!0,console.warn(i))}function pm(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function mm(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function gm(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const mu=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gu=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vm(){const i={enabled:!0,workingColorSpace:Sr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===be&&(s.r=Ii(s.r),s.g=Ii(s.g),s.b=Ii(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===be&&(s.r=gr(s.r),s.g=gr(s.g),s.b=gr(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===es?Da:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Sr]:{primaries:t,whitePoint:n,transfer:Da,toXYZ:mu,fromXYZ:gu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Cn},outputColorSpaceConfig:{drawingBufferColorSpace:Cn}},[Cn]:{primaries:t,whitePoint:n,transfer:be,toXYZ:mu,fromXYZ:gu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Cn}}}),i}const de=vm();function Ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Vs;class _m{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vs===void 0&&(Vs=Na("canvas")),Vs.width=t.width,Vs.height=t.height;const n=Vs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Vs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Na("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ii(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ii(e[n]/255)*255):e[n]=Ii(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let xm=0;class Tf{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xm++}),this.uuid=Ir(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ol(s[o].image)):r.push(ol(s[o]))}else r=ol(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ol(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_m.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ym=0;class xn extends Lr{constructor(t=xn.DEFAULT_IMAGE,e=xn.DEFAULT_MAPPING,n=Ci,s=Ci,r=qn,o=Es,a=Nn,l=fi,c=xn.DEFAULT_ANISOTROPY,h=es){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ym++}),this.uuid=Ir(),this.name="",this.source=new Tf(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ff)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case go:t.x=t.x-Math.floor(t.x);break;case Ci:t.x=t.x<0?0:1;break;case wc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case go:t.y=t.y-Math.floor(t.y);break;case Ci:t.y=t.y<0?0:1;break;case wc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=ff;xn.DEFAULT_ANISOTROPY=1;class He{constructor(t=0,e=0,n=0,s=1){He.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,x=(f+1)/2,T=(p+1)/2,y=(h+d)/4,w=(u+v)/4,E=(g+m)/4;return _>x&&_>T?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=y/n,r=w/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=y/s,r=E/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=w/r,s=E/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-v)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Mm extends Lr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new He(0,0,t,e),this.scissorTest=!1,this.viewport=new He(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new xn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Tf(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $n extends Mm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Af extends xn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class wm extends xn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Di{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*v,M=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const T=Math.sqrt(_),y=Math.atan2(T,p*M);m=Math.sin(m*y)/T,a=Math.sin(a*y)/T}const x=a*M;if(l=l*m+d*x,c=c*m+f*x,h=h*m+g*x,u=u*m+v*x,m===1-a){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(vu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(vu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return al.copy(this).projectOnVector(t),this.sub(al)}reflect(t){return this.sub(al.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const al=new N,vu=new Di;class ls{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Jn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Jn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Jn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Jn):Jn.fromBufferAttribute(r,o),Jn.applyMatrix4(t.matrixWorld),this.expandByPoint(Jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),No.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),No.copy(n.boundingBox)),No.applyMatrix4(t.matrixWorld),this.union(No)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Jn),Jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qr),Fo.subVectors(this.max,qr),Ws.subVectors(t.a,qr),Xs.subVectors(t.b,qr),qs.subVectors(t.c,qr),zi.subVectors(Xs,Ws),Hi.subVectors(qs,Xs),us.subVectors(Ws,qs);let e=[0,-zi.z,zi.y,0,-Hi.z,Hi.y,0,-us.z,us.y,zi.z,0,-zi.x,Hi.z,0,-Hi.x,us.z,0,-us.x,-zi.y,zi.x,0,-Hi.y,Hi.x,0,-us.y,us.x,0];return!ll(e,Ws,Xs,qs,Fo)||(e=[1,0,0,0,1,0,0,0,1],!ll(e,Ws,Xs,qs,Fo))?!1:(Oo.crossVectors(zi,Hi),e=[Oo.x,Oo.y,Oo.z],ll(e,Ws,Xs,qs,Fo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const yi=[new N,new N,new N,new N,new N,new N,new N,new N],Jn=new N,No=new ls,Ws=new N,Xs=new N,qs=new N,zi=new N,Hi=new N,us=new N,qr=new N,Fo=new N,Oo=new N,ds=new N;function ll(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ds.fromArray(i,r);const a=s.x*Math.abs(ds.x)+s.y*Math.abs(ds.y)+s.z*Math.abs(ds.z),l=t.dot(ds),c=e.dot(ds),h=n.dot(ds);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const bm=new ls,Yr=new N,cl=new N;class Dr{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):bm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Yr.subVectors(t,this.center);const e=Yr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Yr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(cl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Yr.copy(t.center).add(cl)),this.expandByPoint(Yr.copy(t.center).sub(cl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mi=new N,hl=new N,ko=new N,Gi=new N,ul=new N,Bo=new N,dl=new N;class Cf{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Mi.copy(this.origin).addScaledVector(this.direction,e),Mi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){hl.copy(t).add(e).multiplyScalar(.5),ko.copy(e).sub(t).normalize(),Gi.copy(this.origin).sub(hl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(ko),a=Gi.dot(this.direction),l=-Gi.dot(ko),c=Gi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(hl).addScaledVector(ko,d),f}intersectSphere(t,e){Mi.subVectors(t.center,this.origin);const n=Mi.dot(this.direction),s=Mi.dot(Mi)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Mi)!==null}intersectTriangle(t,e,n,s,r){ul.subVectors(e,t),Bo.subVectors(n,t),dl.crossVectors(ul,Bo);let o=this.direction.dot(dl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Gi.subVectors(this.origin,t);const l=a*this.direction.dot(Bo.crossVectors(Gi,Bo));if(l<0)return null;const c=a*this.direction.dot(ul.cross(Gi));if(c<0||l+c>o)return null;const h=-a*Gi.dot(dl);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class me{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,g,v,m){me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,v,m)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new me().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ys.setFromMatrixColumn(t,0).length(),r=1/Ys.setFromMatrixColumn(t,1).length(),o=1/Ys.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-v*c,e[9]=-a*l,e[2]=v-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d+v*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d-v*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sm,t,Em)}lookAt(t,e,n){const s=this.elements;return In.subVectors(t,e),In.lengthSq()===0&&(In.z=1),In.normalize(),Vi.crossVectors(n,In),Vi.lengthSq()===0&&(Math.abs(n.z)===1?In.x+=1e-4:In.z+=1e-4,In.normalize(),Vi.crossVectors(n,In)),Vi.normalize(),zo.crossVectors(In,Vi),s[0]=Vi.x,s[4]=zo.x,s[8]=In.x,s[1]=Vi.y,s[5]=zo.y,s[9]=In.y,s[2]=Vi.z,s[6]=zo.z,s[10]=In.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],M=n[3],_=n[7],x=n[11],T=n[15],y=s[0],w=s[4],E=s[8],b=s[12],S=s[1],I=s[5],O=s[9],U=s[13],z=s[2],W=s[6],$=s[10],et=s[14],Y=s[3],rt=s[7],xt=s[11],Tt=s[15];return r[0]=o*y+a*S+l*z+c*Y,r[4]=o*w+a*I+l*W+c*rt,r[8]=o*E+a*O+l*$+c*xt,r[12]=o*b+a*U+l*et+c*Tt,r[1]=h*y+u*S+d*z+f*Y,r[5]=h*w+u*I+d*W+f*rt,r[9]=h*E+u*O+d*$+f*xt,r[13]=h*b+u*U+d*et+f*Tt,r[2]=g*y+v*S+m*z+p*Y,r[6]=g*w+v*I+m*W+p*rt,r[10]=g*E+v*O+m*$+p*xt,r[14]=g*b+v*U+m*et+p*Tt,r[3]=M*y+_*S+x*z+T*Y,r[7]=M*w+_*I+x*W+T*rt,r[11]=M*E+_*O+x*$+T*xt,r[15]=M*b+_*U+x*et+T*Tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+v*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+m*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],M=u*m*c-v*d*c+v*l*f-a*m*f-u*l*p+a*d*p,_=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,x=h*v*c-g*u*c+g*a*f-o*v*f-h*a*p+o*u*p,T=g*u*l-h*v*l-g*a*d+o*v*d+h*a*m-o*u*m,y=e*M+n*_+s*x+r*T;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/y;return t[0]=M*w,t[1]=(v*d*r-u*m*r-v*s*f+n*m*f+u*s*p-n*d*p)*w,t[2]=(a*m*r-v*l*r+v*s*c-n*m*c-a*s*p+n*l*p)*w,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*w,t[4]=_*w,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*w,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*w,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*w,t[8]=x*w,t[9]=(g*u*r-h*v*r-g*n*f+e*v*f+h*n*p-e*u*p)*w,t[10]=(o*v*r-g*a*r+g*n*c-e*v*c-o*n*p+e*a*p)*w,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*w,t[12]=T*w,t[13]=(h*v*s-g*u*s+g*n*d-e*v*d-h*n*m+e*u*m)*w,t[14]=(g*a*s-o*v*s-g*n*l+e*v*l+o*n*m-e*a*m)*w,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*w,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,M=l*c,_=l*h,x=l*u,T=n.x,y=n.y,w=n.z;return s[0]=(1-(v+p))*T,s[1]=(f+x)*T,s[2]=(g-_)*T,s[3]=0,s[4]=(f-x)*y,s[5]=(1-(d+p))*y,s[6]=(m+M)*y,s[7]=0,s[8]=(g+_)*w,s[9]=(m-M)*w,s[10]=(1-(d+v))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ys.set(s[0],s[1],s[2]).length();const o=Ys.set(s[4],s[5],s[6]).length(),a=Ys.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Qn.copy(this);const c=1/r,h=1/o,u=1/a;return Qn.elements[0]*=c,Qn.elements[1]*=c,Qn.elements[2]*=c,Qn.elements[4]*=h,Qn.elements[5]*=h,Qn.elements[6]*=h,Qn.elements[8]*=u,Qn.elements[9]*=u,Qn.elements[10]*=u,e.setFromRotationMatrix(Qn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Ri){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===Ri)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ua)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Ri){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*c,f=(n+s)*h;let g,v;if(a===Ri)g=(o+r)*u,v=-2*u;else if(a===Ua)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ys=new N,Qn=new me,Sm=new N(0,0,0),Em=new N(1,1,1),Vi=new N,zo=new N,In=new N,_u=new me,xu=new Di;class jn{constructor(t=0,e=0,n=0,s=jn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ne(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return _u.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_u,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return xu.setFromEuler(this),this.setFromQuaternion(xu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}jn.DEFAULT_ORDER="XYZ";class vh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Tm=0;const yu=new N,$s=new Di,wi=new me,Ho=new N,$r=new N,Am=new N,Cm=new Di,Mu=new N(1,0,0),wu=new N(0,1,0),bu=new N(0,0,1),Su={type:"added"},Rm={type:"removed"},js={type:"childadded",child:null},fl={type:"childremoved",child:null};class cn extends Lr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Ir(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=cn.DEFAULT_UP.clone();const t=new N,e=new jn,n=new Di,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new Qt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $s.setFromAxisAngle(t,e),this.quaternion.multiply($s),this}rotateOnWorldAxis(t,e){return $s.setFromAxisAngle(t,e),this.quaternion.premultiply($s),this}rotateX(t){return this.rotateOnAxis(Mu,t)}rotateY(t){return this.rotateOnAxis(wu,t)}rotateZ(t){return this.rotateOnAxis(bu,t)}translateOnAxis(t,e){return yu.copy(t).applyQuaternion(this.quaternion),this.position.add(yu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Mu,t)}translateY(t){return this.translateOnAxis(wu,t)}translateZ(t){return this.translateOnAxis(bu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ho.copy(t):Ho.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),$r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt($r,Ho,this.up):wi.lookAt(Ho,$r,this.up),this.quaternion.setFromRotationMatrix(wi),s&&(wi.extractRotation(s.matrixWorld),$s.setFromRotationMatrix(wi),this.quaternion.premultiply($s.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Su),js.child=t,this.dispatchEvent(js),js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rm),fl.child=t,this.dispatchEvent(fl),fl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wi.multiply(t.parent.matrixWorld)),t.applyMatrix4(wi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Su),js.child=t,this.dispatchEvent(js),js.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,t,Am),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,Cm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}cn.DEFAULT_UP=new N(0,1,0);cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ti=new N,bi=new N,pl=new N,Si=new N,Ks=new N,Zs=new N,Eu=new N,ml=new N,gl=new N,vl=new N,_l=new He,xl=new He,yl=new He;class si{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ti.subVectors(t,e),s.cross(ti);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ti.subVectors(s,e),bi.subVectors(n,e),pl.subVectors(t,e);const o=ti.dot(ti),a=ti.dot(bi),l=ti.dot(pl),c=bi.dot(bi),h=bi.dot(pl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Si.x),l.addScaledVector(o,Si.y),l.addScaledVector(a,Si.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return _l.setScalar(0),xl.setScalar(0),yl.setScalar(0),_l.fromBufferAttribute(t,e),xl.fromBufferAttribute(t,n),yl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(_l,r.x),o.addScaledVector(xl,r.y),o.addScaledVector(yl,r.z),o}static isFrontFacing(t,e,n,s){return ti.subVectors(n,e),bi.subVectors(t,e),ti.cross(bi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ti.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),ti.cross(bi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return si.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return si.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return si.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return si.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return si.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Ks.subVectors(s,n),Zs.subVectors(r,n),ml.subVectors(t,n);const l=Ks.dot(ml),c=Zs.dot(ml);if(l<=0&&c<=0)return e.copy(n);gl.subVectors(t,s);const h=Ks.dot(gl),u=Zs.dot(gl);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ks,o);vl.subVectors(t,r);const f=Ks.dot(vl),g=Zs.dot(vl);if(g>=0&&f<=g)return e.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Zs,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Eu.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(Eu,a);const p=1/(m+v+d);return o=v*p,a=d*p,e.copy(n).addScaledVector(Ks,o).addScaledVector(Zs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Rf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},Go={h:0,s:0,l:0};function Ml(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ct{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Cn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=de.workingColorSpace){if(t=gh(t,1),e=ne(e,0,1),n=ne(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ml(o,r,t+1/3),this.g=Ml(o,r,t),this.b=Ml(o,r,t-1/3)}return de.toWorkingColorSpace(this,s),this}setStyle(t,e=Cn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Cn){const n=Rf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ii(t.r),this.g=Ii(t.g),this.b=Ii(t.b),this}copyLinearToSRGB(t){return this.r=gr(t.r),this.g=gr(t.g),this.b=gr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Cn){return de.fromWorkingColorSpace(fn.copy(this),t),Math.round(ne(fn.r*255,0,255))*65536+Math.round(ne(fn.g*255,0,255))*256+Math.round(ne(fn.b*255,0,255))}getHexString(t=Cn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.fromWorkingColorSpace(fn.copy(this),e);const n=fn.r,s=fn.g,r=fn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.fromWorkingColorSpace(fn.copy(this),e),t.r=fn.r,t.g=fn.g,t.b=fn.b,t}getStyle(t=Cn){de.fromWorkingColorSpace(fn.copy(this),t);const e=fn.r,n=fn.g,s=fn.b;return t!==Cn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Wi),this.setHSL(Wi.h+t,Wi.s+e,Wi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Wi),t.getHSL(Go);const n=co(Wi.h,Go.h,e),s=co(Wi.s,Go.s,e),r=co(Wi.l,Go.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const fn=new ct;ct.NAMES=Rf;let Pm=0;class Ur extends Lr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=Ir(),this.name="",this.type="Material",this.blending=pr,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uc,this.blendDst=dc,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gs,this.stencilZFail=Gs,this.stencilZPass=Gs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pr&&(n.blending=this.blending),this.side!==ki&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==uc&&(n.blendSrc=this.blendSrc),this.blendDst!==dc&&(n.blendDst=this.blendDst),this.blendEquation!==Ms&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Nr extends Ur{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=oh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ke=new N,Vo=new ut;class De{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=uu,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Vo.fromBufferAttribute(this,e),Vo.applyMatrix3(t),this.setXY(e,Vo.x,Vo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.applyMatrix3(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.applyMatrix4(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.applyNormalMatrix(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ke.fromBufferAttribute(this,e),Ke.transformDirection(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=cr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=bn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=cr(e,this.array)),e}setX(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=cr(e,this.array)),e}setY(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=cr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=cr(e,this.array)),e}setW(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=bn(e,this.array),n=bn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=bn(e,this.array),n=bn(n,this.array),s=bn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=bn(e,this.array),n=bn(n,this.array),s=bn(s,this.array),r=bn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==uu&&(t.usage=this.usage),t}}class _h extends De{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xh extends De{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ue extends De{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Lm=0;const Hn=new me,wl=new cn,Js=new N,Dn=new ls,jr=new ls,sn=new N;class hn extends Lr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lm++}),this.uuid=Ir(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ef(t)?xh:_h)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Hn.makeRotationFromQuaternion(t),this.applyMatrix4(Hn),this}rotateX(t){return Hn.makeRotationX(t),this.applyMatrix4(Hn),this}rotateY(t){return Hn.makeRotationY(t),this.applyMatrix4(Hn),this}rotateZ(t){return Hn.makeRotationZ(t),this.applyMatrix4(Hn),this}translate(t,e,n){return Hn.makeTranslation(t,e,n),this.applyMatrix4(Hn),this}scale(t,e,n){return Hn.makeScale(t,e,n),this.applyMatrix4(Hn),this}lookAt(t){return wl.lookAt(t),wl.updateMatrix(),this.applyMatrix4(wl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ue(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ls);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Dn.setFromBufferAttribute(r),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Dr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(Dn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];jr.setFromBufferAttribute(a),this.morphTargetsRelative?(sn.addVectors(Dn.min,jr.min),Dn.expandByPoint(sn),sn.addVectors(Dn.max,jr.max),Dn.expandByPoint(sn)):(Dn.expandByPoint(jr.min),Dn.expandByPoint(jr.max))}Dn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)sn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(sn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)sn.fromBufferAttribute(a,c),l&&(Js.fromBufferAttribute(t,c),sn.add(Js)),s=Math.max(s,n.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new De(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<n.count;E++)a[E]=new N,l[E]=new N;const c=new N,h=new N,u=new N,d=new ut,f=new ut,g=new ut,v=new N,m=new N;function p(E,b,S){c.fromBufferAttribute(n,E),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,E),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),a[E].add(v),a[b].add(v),a[S].add(v),l[E].add(m),l[b].add(m),l[S].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let E=0,b=M.length;E<b;++E){const S=M[E],I=S.start,O=S.count;for(let U=I,z=I+O;U<z;U+=3)p(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const _=new N,x=new N,T=new N,y=new N;function w(E){T.fromBufferAttribute(s,E),y.copy(T);const b=a[E];_.copy(b),_.sub(T.multiplyScalar(T.dot(b))).normalize(),x.crossVectors(y,b);const I=x.dot(l[E])<0?-1:1;o.setXYZW(E,_.x,_.y,_.z,I)}for(let E=0,b=M.length;E<b;++E){const S=M[E],I=S.start,O=S.count;for(let U=I,z=I+O;U<z;U+=3)w(t.getX(U+0)),w(t.getX(U+1)),w(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new De(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new N,r=new N,o=new N,a=new N,l=new N,c=new N,h=new N,u=new N;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)sn.fromBufferAttribute(t,e),sn.normalize(),t.setXYZ(e,sn.x,sn.y,sn.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new De(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new hn,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tu=new me,fs=new Cf,Wo=new Dr,Au=new N,Xo=new N,qo=new N,Yo=new N,bl=new N,$o=new N,Cu=new N,jo=new N;class Ge extends cn{constructor(t=new hn,e=new Nr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){$o.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(bl.fromBufferAttribute(u,t),o?$o.addScaledVector(bl,h):$o.addScaledVector(bl.sub(e),h))}e.add($o)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wo.copy(n.boundingSphere),Wo.applyMatrix4(r),fs.copy(t.ray).recast(t.near),!(Wo.containsPoint(fs.origin)===!1&&(fs.intersectSphere(Wo,Au)===null||fs.origin.distanceToSquared(Au)>(t.far-t.near)**2))&&(Tu.copy(r).invert(),fs.copy(t.ray).applyMatrix4(Tu),!(n.boundingBox!==null&&fs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,fs)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,T=_;x<T;x+=3){const y=a.getX(x),w=a.getX(x+1),E=a.getX(x+2);s=Ko(this,p,t,n,c,h,u,y,w,E),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=a.getX(m),_=a.getX(m+1),x=a.getX(m+2);s=Ko(this,o,t,n,c,h,u,M,_,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),_=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,T=_;x<T;x+=3){const y=x,w=x+1,E=x+2;s=Ko(this,p,t,n,c,h,u,y,w,E),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=m,_=m+1,x=m+2;s=Ko(this,o,t,n,c,h,u,M,_,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Im(i,t,e,n,s,r,o,a){let l;if(t.side===En?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===ki,a),l===null)return null;jo.copy(a),jo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(jo);return c<e.near||c>e.far?null:{distance:c,point:jo.clone(),object:i}}function Ko(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Xo),i.getVertexPosition(l,qo),i.getVertexPosition(c,Yo);const h=Im(i,t,e,n,Xo,qo,Yo,Cu);if(h){const u=new N;si.getBarycoord(Cu,Xo,qo,Yo,u),s&&(h.uv=si.getInterpolatedAttribute(s,a,l,c,u,new ut)),r&&(h.uv1=si.getInterpolatedAttribute(r,a,l,c,u,new ut)),o&&(h.normal=si.getInterpolatedAttribute(o,a,l,c,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new N,materialIndex:0};si.getNormal(Xo,qo,Yo,d.normal),h.face=d,h.barycoord=u}return h}class rs extends hn{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ue(c,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(u,2));function g(v,m,p,M,_,x,T,y,w,E,b){const S=x/w,I=T/E,O=x/2,U=T/2,z=y/2,W=w+1,$=E+1;let et=0,Y=0;const rt=new N;for(let xt=0;xt<$;xt++){const Tt=xt*I-U;for(let $t=0;$t<W;$t++){const ye=$t*S-O;rt[v]=ye*M,rt[m]=Tt*_,rt[p]=z,c.push(rt.x,rt.y,rt.z),rt[v]=0,rt[m]=0,rt[p]=y>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push($t/w),u.push(1-xt/E),et+=1}}for(let xt=0;xt<E;xt++)for(let Tt=0;Tt<w;Tt++){const $t=d+Tt+W*xt,ye=d+Tt+W*(xt+1),Z=d+(Tt+1)+W*(xt+1),it=d+(Tt+1)+W*xt;l.push($t,ye,it),l.push(ye,Z,it),Y+=6}a.addGroup(f,Y,b),f+=Y,d+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Er(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Sn(i){const t={};for(let e=0;e<i.length;e++){const n=Er(i[e]);for(const s in n)t[s]=n[s]}return t}function Dm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Pf(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}const xo={clone:Er,merge:Sn};var Um=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class tn extends Ur{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Um,this.fragmentShader=Nm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Er(t.uniforms),this.uniformsGroups=Dm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Lf extends cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Ri}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new N,Ru=new ut,Pu=new ut;class Wn extends Lf{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=_o*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(lo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _o*2*Math.atan(Math.tan(lo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Xi.x,Xi.y).multiplyScalar(-t/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-t/Xi.z)}getViewSize(t,e){return this.getViewBounds(t,Ru,Pu),e.subVectors(Pu,Ru)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(lo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Qs=-90,tr=1;class Fm extends cn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wn(Qs,tr,t,e);s.layers=this.layers,this.add(s);const r=new Wn(Qs,tr,t,e);r.layers=this.layers,this.add(r);const o=new Wn(Qs,tr,t,e);o.layers=this.layers,this.add(o);const a=new Wn(Qs,tr,t,e);a.layers=this.layers,this.add(a);const l=new Wn(Qs,tr,t,e);l.layers=this.layers,this.add(l);const c=new Wn(Qs,tr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Ri)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ua)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class If extends xn{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:yr,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Om extends $n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new If(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:qn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new rs(5,5,5),r=new tn({name:"CubemapFromEquirect",uniforms:Er(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:En,blending:Li});r.uniforms.tEquirect.value=e;const o=new Ge(s,r),a=e.minFilter;return e.minFilter===Es&&(e.minFilter=qn),new Fm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class yh{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ct(t),this.density=e}clone(){return new yh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class km extends cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new jn,this.environmentIntensity=1,this.environmentRotation=new jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Fa extends xn{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Tn,h=Tn,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oa extends De{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const er=new me,Lu=new me,Zo=[],Iu=new ls,Bm=new me,Kr=new Ge,Zr=new Dr;class vr extends Ge{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Oa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Bm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ls),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,er),Iu.copy(t.boundingBox).applyMatrix4(er),this.boundingBox.union(Iu)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Dr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,er),Zr.copy(t.boundingSphere).applyMatrix4(er),this.boundingSphere.union(Zr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Kr.geometry=this.geometry,Kr.material=this.material,Kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zr.copy(this.boundingSphere),Zr.applyMatrix4(n),t.ray.intersectsSphere(Zr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,er),Lu.multiplyMatrices(n,er),Kr.matrixWorld=Lu,Kr.raycast(t,Zo);for(let o=0,a=Zo.length;o<a;o++){const l=Zo[o];l.instanceId=r,l.object=this,e.push(l)}Zo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Oa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Fa(new Float32Array(s*this.count),s,this.count,uh,ci));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const Sl=new N,zm=new N,Hm=new Qt;class Zi{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Sl.subVectors(n,e).cross(zm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Sl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Hm.getNormalMatrix(t),s=this.coplanarPoint(Sl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ps=new Dr,Jo=new N;class Mh{constructor(t=new Zi,e=new Zi,n=new Zi,s=new Zi,r=new Zi,o=new Zi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ri){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],M=s[13],_=s[14],x=s[15];if(n[0].setComponents(l-r,d-c,m-f,x-p).normalize(),n[1].setComponents(l+r,d+c,m+f,x+p).normalize(),n[2].setComponents(l+o,d+h,m+g,x+M).normalize(),n[3].setComponents(l-o,d-h,m-g,x-M).normalize(),n[4].setComponents(l-a,d-u,m-v,x-_).normalize(),e===Ri)n[5].setComponents(l+a,d+u,m+v,x+_).normalize();else if(e===Ua)n[5].setComponents(a,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ps.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ps.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ps)}intersectsSprite(t){return ps.center.set(0,0,0),ps.radius=.7071067811865476,ps.applyMatrix4(t.matrixWorld),this.intersectsSphere(ps)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Jo.x=s.normal.x>0?t.max.x:t.min.x,Jo.y=s.normal.y>0?t.max.y:t.min.y,Jo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Jo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ts extends cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Df extends xn{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Uf extends xn{constructor(t,e,n,s,r,o,a,l,c,h=mr){if(h!==mr&&h!==br)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===mr&&(n=Ls),n===void 0&&h===br&&(n=wr),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Tn,this.minFilter=l!==void 0?l:Tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class gi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new ut:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new N,s=[],r=[],o=[],a=new N,l=new me;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new N)}r[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ne(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ne(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class wh extends gi{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ut){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Gm extends wh{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function bh(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Qo=new N,El=new bh,Tl=new bh,Al=new bh;class Vm extends gi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new N){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Qo.subVectors(s[0],s[1]).add(s[0]),c=Qo);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Qo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Qo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),El.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),Tl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),Al.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(El.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Tl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Al.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(El.calc(l),Tl.calc(l),Al.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Du(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Wm(i,t){const e=1-i;return e*e*t}function Xm(i,t){return 2*(1-i)*i*t}function qm(i,t){return i*i*t}function ho(i,t,e,n){return Wm(i,t)+Xm(i,e)+qm(i,n)}function Ym(i,t){const e=1-i;return e*e*e*t}function $m(i,t){const e=1-i;return 3*e*e*i*t}function jm(i,t){return 3*(1-i)*i*i*t}function Km(i,t){return i*i*i*t}function uo(i,t,e,n,s){return Ym(i,t)+$m(i,e)+jm(i,n)+Km(i,s)}class Nf extends gi{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(uo(t,s.x,r.x,o.x,a.x),uo(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zm extends gi{constructor(t=new N,e=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new N){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(uo(t,s.x,r.x,o.x,a.x),uo(t,s.y,r.y,o.y,a.y),uo(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ff extends gi{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jm extends gi{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Of extends gi{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ho(t,s.x,r.x,o.x),ho(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qm extends gi{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ho(t,s.x,r.x,o.x),ho(t,s.y,r.y,o.y),ho(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class kf extends gi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Du(a,l.x,c.x,h.x,u.x),Du(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ut().fromArray(s))}return this}}var Uu=Object.freeze({__proto__:null,ArcCurve:Gm,CatmullRomCurve3:Vm,CubicBezierCurve:Nf,CubicBezierCurve3:Zm,EllipseCurve:wh,LineCurve:Ff,LineCurve3:Jm,QuadraticBezierCurve:Of,QuadraticBezierCurve3:Qm,SplineCurve:kf});class tg extends gi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Uu[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Uu[s.type]().fromJSON(s))}return this}}class eg extends tg{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ff(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Of(this.currentPoint.clone(),new ut(t,e),new ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Nf(this.currentPoint.clone(),new ut(t,e),new ut(n,s),new ut(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new kf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){const c=new wh(t,e,n,s,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Sh extends hn{constructor(t=[new ut(0,-.5),new ut(.5,0),new ut(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ne(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,u=new N,d=new ut,f=new N,g=new N,v=new N;let m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(g)}for(let M=0;M<=e;M++){const _=n+M*h*s,x=Math.sin(_),T=Math.cos(_);for(let y=0;y<=t.length-1;y++){u.x=t[y].x*x,u.y=t[y].y,u.z=t[y].x*T,o.push(u.x,u.y,u.z),d.x=M/e,d.y=y/(t.length-1),a.push(d.x,d.y);const w=l[3*y+0]*x,E=l[3*y+1],b=l[3*y+0]*T;c.push(w,E,b)}}for(let M=0;M<e;M++)for(let _=0;_<t.length-1;_++){const x=_+M*t.length,T=x,y=x+t.length,w=x+t.length+1,E=x+1;r.push(T,y,E),r.push(w,E,y)}this.setIndex(r),this.setAttribute("position",new Ue(o,3)),this.setAttribute("uv",new Ue(a,2)),this.setAttribute("normal",new Ue(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sh(t.points,t.segments,t.phiStart,t.phiLength)}}class Eh extends Sh{constructor(t=1,e=1,n=4,s=8){const r=new eg;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new Eh(t.radius,t.length,t.capSegments,t.radialSegments)}}class Xa extends hn{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;M(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ue(u,3)),this.setAttribute("normal",new Ue(d,3)),this.setAttribute("uv",new Ue(f,2));function M(){const x=new N,T=new N;let y=0;const w=(e-t)/n;for(let E=0;E<=r;E++){const b=[],S=E/r,I=S*(e-t)+t;for(let O=0;O<=s;O++){const U=O/s,z=U*l+a,W=Math.sin(z),$=Math.cos(z);T.x=I*W,T.y=-S*n+m,T.z=I*$,u.push(T.x,T.y,T.z),x.set(W,w,$).normalize(),d.push(x.x,x.y,x.z),f.push(U,1-S),b.push(g++)}v.push(b)}for(let E=0;E<s;E++)for(let b=0;b<r;b++){const S=v[b][E],I=v[b+1][E],O=v[b+1][E+1],U=v[b][E+1];(t>0||b!==0)&&(h.push(S,I,U),y+=3),(e>0||b!==r-1)&&(h.push(I,O,U),y+=3)}c.addGroup(p,y,0),p+=y}function _(x){const T=g,y=new ut,w=new N;let E=0;const b=x===!0?t:e,S=x===!0?1:-1;for(let O=1;O<=s;O++)u.push(0,m*S,0),d.push(0,S,0),f.push(.5,.5),g++;const I=g;for(let O=0;O<=s;O++){const z=O/s*l+a,W=Math.cos(z),$=Math.sin(z);w.x=b*$,w.y=m*S,w.z=b*W,u.push(w.x,w.y,w.z),d.push(0,S,0),y.x=W*.5+.5,y.y=$*.5*S+.5,f.push(y.x,y.y),g++}for(let O=0;O<s;O++){const U=T+O,z=I+O;x===!0?h.push(z,z+1,U):h.push(z+1,z,U),E+=3}c.addGroup(p,E,x===!0?1:2),p+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xa(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Th extends Xa{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Th(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class qa extends hn{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Ue(r,3)),this.setAttribute("normal",new Ue(r.slice(),3)),this.setAttribute("uv",new Ue(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const _=new N,x=new N,T=new N;for(let y=0;y<e.length;y+=3)f(e[y+0],_),f(e[y+1],x),f(e[y+2],T),l(_,x,T,M)}function l(M,_,x,T){const y=T+1,w=[];for(let E=0;E<=y;E++){w[E]=[];const b=M.clone().lerp(x,E/y),S=_.clone().lerp(x,E/y),I=y-E;for(let O=0;O<=I;O++)O===0&&E===y?w[E][O]=b:w[E][O]=b.clone().lerp(S,O/I)}for(let E=0;E<y;E++)for(let b=0;b<2*(y-E)-1;b++){const S=Math.floor(b/2);b%2===0?(d(w[E][S+1]),d(w[E+1][S]),d(w[E][S])):(d(w[E][S+1]),d(w[E+1][S+1]),d(w[E+1][S]))}}function c(M){const _=new N;for(let x=0;x<r.length;x+=3)_.x=r[x+0],_.y=r[x+1],_.z=r[x+2],_.normalize().multiplyScalar(M),r[x+0]=_.x,r[x+1]=_.y,r[x+2]=_.z}function h(){const M=new N;for(let _=0;_<r.length;_+=3){M.x=r[_+0],M.y=r[_+1],M.z=r[_+2];const x=m(M)/2/Math.PI+.5,T=p(M)/Math.PI+.5;o.push(x,1-T)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){const _=o[M+0],x=o[M+2],T=o[M+4],y=Math.max(_,x,T),w=Math.min(_,x,T);y>.9&&w<.1&&(_<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),T<.2&&(o[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,_){const x=M*3;_.x=t[x+0],_.y=t[x+1],_.z=t[x+2]}function g(){const M=new N,_=new N,x=new N,T=new N,y=new ut,w=new ut,E=new ut;for(let b=0,S=0;b<r.length;b+=9,S+=6){M.set(r[b+0],r[b+1],r[b+2]),_.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),y.set(o[S+0],o[S+1]),w.set(o[S+2],o[S+3]),E.set(o[S+4],o[S+5]),T.copy(M).add(_).add(x).divideScalar(3);const I=m(T);v(y,S+0,M,I),v(w,S+2,_,I),v(E,S+4,x,I)}}function v(M,_,x,T){T<0&&M.x===1&&(o[_]=M.x-1),x.x===0&&x.z===0&&(o[_]=T/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qa(t.vertices,t.indices,t.radius,t.details)}}class Ah extends qa{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ah(t.radius,t.detail)}}class Ch extends qa{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ch(t.radius,t.detail)}}class ri extends hn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const M=p*d-o;for(let _=0;_<c;_++){const x=_*u-r;g.push(x,-M,0),v.push(0,0,1),m.push(_/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const _=M+c*p,x=M+c*(p+1),T=M+1+c*(p+1),y=M+1+c*p;f.push(_,x,y),f.push(x,T,y)}this.setIndex(f),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(v,3)),this.setAttribute("uv",new Ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ri(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ya extends hn{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new N,d=new N,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const M=[],_=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let T=0;T<=e;T++){const y=T/e;u.x=-t*Math.cos(s+y*r)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(s+y*r)*Math.sin(o+_*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(y+x,1-_),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const _=h[p][M+1],x=h[p][M],T=h[p+1][M],y=h[p+1][M+1];(p!==0||o>0)&&f.push(_,x,y),(p!==n-1||l<Math.PI)&&f.push(x,T,y)}this.setIndex(f),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(v,3)),this.setAttribute("uv",new Ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ya(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ng extends tn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Nu extends Ur{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mh,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yo extends Ur{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mh,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=oh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Bf extends Ur{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ig extends Ur{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Rh extends cn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class sg extends Rh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ct(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Cl=new me,Fu=new N,Ou=new N;class rg{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mh,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new He(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Fu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Fu),Ou.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ou),e.updateMatrixWorld(),Cl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Cl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ph extends Lf{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class og extends rg{constructor(){super(new Ph(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ag extends Rh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.target=new cn,this.shadow=new og}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class lg extends Rh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class cg extends hn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class hg extends Wn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ug{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ku(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=ku();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function ku(){return performance.now()}const Bu=new me;class dg{constructor(t,e,n=0,s=1/0){this.ray=new Cf(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new vh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Bu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bu),this}intersectObject(t,e=!0,n=[]){return jc(t,this,n,e),n.sort(zu),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)jc(t[s],this,n,e);return n.sort(zu),n}}function zu(i,t){return i.distance-t.distance}function jc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)jc(r[o],t,e,!0)}}function Hu(i,t,e,n){const s=fg(n);switch(e){case vf:return i*t;case xf:return i*t;case yf:return i*t*2;case uh:return i*t/s.components*s.byteLength;case dh:return i*t/s.components*s.byteLength;case Mf:return i*t*2/s.components*s.byteLength;case fh:return i*t*2/s.components*s.byteLength;case _f:return i*t*3/s.components*s.byteLength;case Nn:return i*t*4/s.components*s.byteLength;case ph:return i*t*4/s.components*s.byteLength;case ya:case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wa:case ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sc:case Tc:return Math.max(i,16)*Math.max(t,8)/4;case bc:case Ec:return Math.max(i,8)*Math.max(t,8)/2;case Ac:case Cc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Rc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Pc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Lc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ic:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Dc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Uc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Nc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Fc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Oc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case kc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Bc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case zc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Hc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Gc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Vc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Sa:case Wc:case Xc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case wf:case qc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Yc:case $c:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function fg(i){switch(i){case fi:case pf:return{byteLength:1,components:1};case vo:case mf:case ui:return{byteLength:2,components:1};case ch:case hh:return{byteLength:2,components:4};case Ls:case lh:case ci:return{byteLength:4,components:1};case gf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rh);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function zf(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function pg(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var mg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_g=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Sg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Eg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ag=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Cg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Rg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Pg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Lg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ug=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ng=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Og=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,kg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Bg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,zg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Hg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xg="gl_FragColor = linearToOutputTexel( gl_FragColor );",qg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$g=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,jg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Kg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Jg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,t1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,e1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,n1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,i1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,s1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,r1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,o1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,a1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,l1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,c1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,h1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,u1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,d1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,f1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,p1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,m1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,g1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,v1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,M1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,w1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,b1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,S1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,T1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,A1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,C1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,R1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,P1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,L1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,D1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,U1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,F1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,O1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,k1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,B1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,z1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,H1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,G1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,V1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,W1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,X1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,q1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Y1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,j1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,K1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Z1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,J1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Q1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ev=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,nv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,iv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ov=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,av=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,lv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,cv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,fv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Mv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Sv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ev=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Av=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Rv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Iv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Dv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Nv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Fv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ov=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Vv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ee={alphahash_fragment:mg,alphahash_pars_fragment:gg,alphamap_fragment:vg,alphamap_pars_fragment:_g,alphatest_fragment:xg,alphatest_pars_fragment:yg,aomap_fragment:Mg,aomap_pars_fragment:wg,batching_pars_vertex:bg,batching_vertex:Sg,begin_vertex:Eg,beginnormal_vertex:Tg,bsdfs:Ag,iridescence_fragment:Cg,bumpmap_pars_fragment:Rg,clipping_planes_fragment:Pg,clipping_planes_pars_fragment:Lg,clipping_planes_pars_vertex:Ig,clipping_planes_vertex:Dg,color_fragment:Ug,color_pars_fragment:Ng,color_pars_vertex:Fg,color_vertex:Og,common:kg,cube_uv_reflection_fragment:Bg,defaultnormal_vertex:zg,displacementmap_pars_vertex:Hg,displacementmap_vertex:Gg,emissivemap_fragment:Vg,emissivemap_pars_fragment:Wg,colorspace_fragment:Xg,colorspace_pars_fragment:qg,envmap_fragment:Yg,envmap_common_pars_fragment:$g,envmap_pars_fragment:jg,envmap_pars_vertex:Kg,envmap_physical_pars_fragment:a1,envmap_vertex:Zg,fog_vertex:Jg,fog_pars_vertex:Qg,fog_fragment:t1,fog_pars_fragment:e1,gradientmap_pars_fragment:n1,lightmap_pars_fragment:i1,lights_lambert_fragment:s1,lights_lambert_pars_fragment:r1,lights_pars_begin:o1,lights_toon_fragment:l1,lights_toon_pars_fragment:c1,lights_phong_fragment:h1,lights_phong_pars_fragment:u1,lights_physical_fragment:d1,lights_physical_pars_fragment:f1,lights_fragment_begin:p1,lights_fragment_maps:m1,lights_fragment_end:g1,logdepthbuf_fragment:v1,logdepthbuf_pars_fragment:_1,logdepthbuf_pars_vertex:x1,logdepthbuf_vertex:y1,map_fragment:M1,map_pars_fragment:w1,map_particle_fragment:b1,map_particle_pars_fragment:S1,metalnessmap_fragment:E1,metalnessmap_pars_fragment:T1,morphinstance_vertex:A1,morphcolor_vertex:C1,morphnormal_vertex:R1,morphtarget_pars_vertex:P1,morphtarget_vertex:L1,normal_fragment_begin:I1,normal_fragment_maps:D1,normal_pars_fragment:U1,normal_pars_vertex:N1,normal_vertex:F1,normalmap_pars_fragment:O1,clearcoat_normal_fragment_begin:k1,clearcoat_normal_fragment_maps:B1,clearcoat_pars_fragment:z1,iridescence_pars_fragment:H1,opaque_fragment:G1,packing:V1,premultiplied_alpha_fragment:W1,project_vertex:X1,dithering_fragment:q1,dithering_pars_fragment:Y1,roughnessmap_fragment:$1,roughnessmap_pars_fragment:j1,shadowmap_pars_fragment:K1,shadowmap_pars_vertex:Z1,shadowmap_vertex:J1,shadowmask_pars_fragment:Q1,skinbase_vertex:tv,skinning_pars_vertex:ev,skinning_vertex:nv,skinnormal_vertex:iv,specularmap_fragment:sv,specularmap_pars_fragment:rv,tonemapping_fragment:ov,tonemapping_pars_fragment:av,transmission_fragment:lv,transmission_pars_fragment:cv,uv_pars_fragment:hv,uv_pars_vertex:uv,uv_vertex:dv,worldpos_vertex:fv,background_vert:pv,background_frag:mv,backgroundCube_vert:gv,backgroundCube_frag:vv,cube_vert:_v,cube_frag:xv,depth_vert:yv,depth_frag:Mv,distanceRGBA_vert:wv,distanceRGBA_frag:bv,equirect_vert:Sv,equirect_frag:Ev,linedashed_vert:Tv,linedashed_frag:Av,meshbasic_vert:Cv,meshbasic_frag:Rv,meshlambert_vert:Pv,meshlambert_frag:Lv,meshmatcap_vert:Iv,meshmatcap_frag:Dv,meshnormal_vert:Uv,meshnormal_frag:Nv,meshphong_vert:Fv,meshphong_frag:Ov,meshphysical_vert:kv,meshphysical_frag:Bv,meshtoon_vert:zv,meshtoon_frag:Hv,points_vert:Gv,points_frag:Vv,shadow_vert:Wv,shadow_frag:Xv,sprite_vert:qv,sprite_frag:Yv},dt={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},li={basic:{uniforms:Sn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Sn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new ct(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Sn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Sn([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Sn([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new ct(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Sn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Sn([dt.points,dt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Sn([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Sn([dt.common,dt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Sn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Sn([dt.sprite,dt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:Sn([dt.common,dt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:Sn([dt.lights,dt.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};li.physical={uniforms:Sn([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const ta={r:0,b:0,g:0},ms=new jn,$v=new me;function jv(i,t,e,n,s,r,o){const a=new ct(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?e:t).get(x)),x}function v(_){let x=!1;const T=g(_);T===null?p(a,l):T&&T.isColor&&(p(T,1),x=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,x){const T=g(x);T&&(T.isCubeTexture||T.mapping===Wa)?(h===void 0&&(h=new Ge(new rs(1,1,1),new tn({name:"BackgroundCubeMaterial",uniforms:Er(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(y,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ms.copy(x.backgroundRotation),ms.x*=-1,ms.y*=-1,ms.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($v.makeRotationFromEuler(ms)),h.material.toneMapped=de.getTransfer(T.colorSpace)!==be,(u!==T||d!==T.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Ge(new ri(2,2),new tn({name:"BackgroundMaterial",uniforms:Er(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=de.getTransfer(T.colorSpace)!==be,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function p(_,x){_.getRGB(ta,Pf(i)),n.buffers.color.setClear(ta.r,ta.g,ta.b,x,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(_,x=1){a.set(_),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(a,l)},render:v,addToRenderList:m,dispose:M}}function Kv(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(S,I,O,U,z){let W=!1;const $=u(U,O,I);r!==$&&(r=$,c(r.object)),W=f(S,U,O,z),W&&g(S,U,O,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,x(S,I,O,U),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,I,O){const U=O.wireframe===!0;let z=n[S.id];z===void 0&&(z={},n[S.id]=z);let W=z[I.id];W===void 0&&(W={},z[I.id]=W);let $=W[U];return $===void 0&&($=d(l()),W[U]=$),$}function d(S){const I=[],O=[],U=[];for(let z=0;z<e;z++)I[z]=0,O[z]=0,U[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:U,object:S,attributes:{},index:null}}function f(S,I,O,U){const z=r.attributes,W=I.attributes;let $=0;const et=O.getAttributes();for(const Y in et)if(et[Y].location>=0){const xt=z[Y];let Tt=W[Y];if(Tt===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(Tt=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(Tt=S.instanceColor)),xt===void 0||xt.attribute!==Tt||Tt&&xt.data!==Tt.data)return!0;$++}return r.attributesNum!==$||r.index!==U}function g(S,I,O,U){const z={},W=I.attributes;let $=0;const et=O.getAttributes();for(const Y in et)if(et[Y].location>=0){let xt=W[Y];xt===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(xt=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(xt=S.instanceColor));const Tt={};Tt.attribute=xt,xt&&xt.data&&(Tt.data=xt.data),z[Y]=Tt,$++}r.attributes=z,r.attributesNum=$,r.index=U}function v(){const S=r.newAttributes;for(let I=0,O=S.length;I<O;I++)S[I]=0}function m(S){p(S,0)}function p(S,I){const O=r.newAttributes,U=r.enabledAttributes,z=r.attributeDivisors;O[S]=1,U[S]===0&&(i.enableVertexAttribArray(S),U[S]=1),z[S]!==I&&(i.vertexAttribDivisor(S,I),z[S]=I)}function M(){const S=r.newAttributes,I=r.enabledAttributes;for(let O=0,U=I.length;O<U;O++)I[O]!==S[O]&&(i.disableVertexAttribArray(O),I[O]=0)}function _(S,I,O,U,z,W,$){$===!0?i.vertexAttribIPointer(S,I,O,z,W):i.vertexAttribPointer(S,I,O,U,z,W)}function x(S,I,O,U){v();const z=U.attributes,W=O.getAttributes(),$=I.defaultAttributeValues;for(const et in W){const Y=W[et];if(Y.location>=0){let rt=z[et];if(rt===void 0&&(et==="instanceMatrix"&&S.instanceMatrix&&(rt=S.instanceMatrix),et==="instanceColor"&&S.instanceColor&&(rt=S.instanceColor)),rt!==void 0){const xt=rt.normalized,Tt=rt.itemSize,$t=t.get(rt);if($t===void 0)continue;const ye=$t.buffer,Z=$t.type,it=$t.bytesPerElement,yt=Z===i.INT||Z===i.UNSIGNED_INT||rt.gpuType===lh;if(rt.isInterleavedBufferAttribute){const ht=rt.data,Ft=ht.stride,Zt=rt.offset;if(ht.isInstancedInterleavedBuffer){for(let ie=0;ie<Y.locationSize;ie++)p(Y.location+ie,ht.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let ie=0;ie<Y.locationSize;ie++)m(Y.location+ie);i.bindBuffer(i.ARRAY_BUFFER,ye);for(let ie=0;ie<Y.locationSize;ie++)_(Y.location+ie,Tt/Y.locationSize,Z,xt,Ft*it,(Zt+Tt/Y.locationSize*ie)*it,yt)}else{if(rt.isInstancedBufferAttribute){for(let ht=0;ht<Y.locationSize;ht++)p(Y.location+ht,rt.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let ht=0;ht<Y.locationSize;ht++)m(Y.location+ht);i.bindBuffer(i.ARRAY_BUFFER,ye);for(let ht=0;ht<Y.locationSize;ht++)_(Y.location+ht,Tt/Y.locationSize,Z,xt,Tt*it,Tt/Y.locationSize*ht*it,yt)}}else if($!==void 0){const xt=$[et];if(xt!==void 0)switch(xt.length){case 2:i.vertexAttrib2fv(Y.location,xt);break;case 3:i.vertexAttrib3fv(Y.location,xt);break;case 4:i.vertexAttrib4fv(Y.location,xt);break;default:i.vertexAttrib1fv(Y.location,xt)}}}}M()}function T(){E();for(const S in n){const I=n[S];for(const O in I){const U=I[O];for(const z in U)h(U[z].object),delete U[z];delete I[O]}delete n[S]}}function y(S){if(n[S.id]===void 0)return;const I=n[S.id];for(const O in I){const U=I[O];for(const z in U)h(U[z].object),delete U[z];delete I[O]}delete n[S.id]}function w(S){for(const I in n){const O=n[I];if(O[S.id]===void 0)continue;const U=O[S.id];for(const z in U)h(U[z].object),delete U[z];delete O[S.id]}}function E(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:b,dispose:T,releaseStatesOfGeometry:y,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function Zv(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Jv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Nn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const E=w===ui&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==fi&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ci&&!E)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,y=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:T,maxSamples:y}}function Qv(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Zi,a=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:n,_=M*4;let x=p.clippingState||null;l.value=x,x=h(g,d,_,f);for(let T=0;T!==_;++T)x[T]=e[T];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,x=f;_!==v;++_,x+=4)o.copy(u[_]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function t_(i){let t=new WeakMap;function e(o,a){return a===yc?o.mapping=yr:a===Mc&&(o.mapping=Mr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===yc||a===Mc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Om(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const fr=4,Gu=[.125,.215,.35,.446,.526,.582],ws=20,Rl=new Ph,Vu=new ct;let Pl=null,Ll=0,Il=0,Dl=!1;const ys=(1+Math.sqrt(5))/2,nr=1/ys,Wu=[new N(-ys,nr,0),new N(ys,nr,0),new N(-nr,0,ys),new N(nr,0,ys),new N(0,ys,-nr),new N(0,ys,nr),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Xu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Pl=this._renderer.getRenderTarget(),Ll=this._renderer.getActiveCubeFace(),Il=this._renderer.getActiveMipmapLevel(),Dl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$u(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Pl,Ll,Il),this._renderer.xr.enabled=Dl,t.scissorTest=!1,ea(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===yr||t.mapping===Mr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Pl=this._renderer.getRenderTarget(),Ll=this._renderer.getActiveCubeFace(),Il=this._renderer.getActiveMipmapLevel(),Dl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:qn,minFilter:qn,generateMipmaps:!1,type:ui,format:Nn,colorSpace:Sr,depthBuffer:!1},s=qu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=e_(r)),this._blurMaterial=n_(r,t,e)}return s}_compileMaterial(t){const e=new Ge(this._lodPlanes[0],t);this._renderer.compile(e,Rl)}_sceneToCubeUV(t,e,n,s){const a=new Wn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Vu),h.toneMapping=is,h.autoClear=!1;const f=new Nr({name:"PMREM.Background",side:En,depthWrite:!1,depthTest:!1}),g=new Ge(new rs,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(Vu),v=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;ea(s,M*_,p>2?_:0,_,_),h.setRenderTarget(s),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===yr||t.mapping===Mr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$u()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ge(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;ea(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Rl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Wu[(s-r-1)%Wu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ge(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ws-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):ws;m>ws&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ws}`);const p=[];let M=0;for(let w=0;w<ws;++w){const E=w/v,b=Math.exp(-E*E/2);p.push(b),w===0?M+=b:w<m&&(M+=2*b)}for(let w=0;w<p.length;w++)p[w]=p[w]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-n;const x=this._sizeLods[s],T=3*x*(s>_-fr?s-_+fr:0),y=4*(this._cubeSize-x);ea(e,T,y,3*x,2*x),l.setRenderTarget(e),l.render(u,Rl)}}function e_(i){const t=[],e=[],n=[];let s=i;const r=i-fr+1+Gu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-fr?l=Gu[o-i+fr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,M=new Float32Array(v*g*f),_=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let y=0;y<f;y++){const w=y%3*2/3-1,E=y>2?0:-1,b=[w,E,0,w+2/3,E,0,w+2/3,E+1,0,w,E,0,w+2/3,E+1,0,w,E+1,0];M.set(b,v*g*y),_.set(d,m*g*y);const S=[y,y,y,y,y,y];x.set(S,p*g*y)}const T=new hn;T.setAttribute("position",new De(M,v)),T.setAttribute("uv",new De(_,m)),T.setAttribute("faceIndex",new De(x,p)),t.push(T),s>fr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function qu(i,t,e){const n=new $n(i,t,e);return n.texture.mapping=Wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ea(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function n_(i,t,e){const n=new Float32Array(ws),s=new N(0,1,0);return new tn({name:"SphericalGaussianBlur",defines:{n:ws,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Lh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Yu(){return new tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function $u(){return new tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Lh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function i_(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===yc||l===Mc,h=l===yr||l===Mr;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Xu(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Xu(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function s_(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&hr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function r_(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const M=f.array;v=f.version;for(let _=0,x=M.length;_<x;_+=3){const T=M[_+0],y=M[_+1],w=M[_+2];d.push(T,y,y,w,w,T)}}else if(g!==void 0){const M=g.array;v=g.version;for(let _=0,x=M.length/3-1;_<x;_+=3){const T=_+0,y=_+1,w=_+2;d.push(T,y,y,w,w,T)}}else return;const m=new(Ef(d)?xh:_h)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function o_(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*v[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function a_(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function l_(i,t,e){const n=new WeakMap,s=new He;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let _=0;f===!0&&(_=1),g===!0&&(_=2),v===!0&&(_=3);let x=a.attributes.position.count*_,T=1;x>t.maxTextureSize&&(T=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const y=new Float32Array(x*T*4*u),w=new Af(y,x,T,u);w.type=ci,w.needsUpdate=!0;const E=_*4;for(let S=0;S<u;S++){const I=m[S],O=p[S],U=M[S],z=x*T*4*S;for(let W=0;W<I.count;W++){const $=W*E;f===!0&&(s.fromBufferAttribute(I,W),y[z+$+0]=s.x,y[z+$+1]=s.y,y[z+$+2]=s.z,y[z+$+3]=0),g===!0&&(s.fromBufferAttribute(O,W),y[z+$+4]=s.x,y[z+$+5]=s.y,y[z+$+6]=s.z,y[z+$+7]=0),v===!0&&(s.fromBufferAttribute(U,W),y[z+$+8]=s.x,y[z+$+9]=s.y,y[z+$+10]=s.z,y[z+$+11]=U.itemSize===4?s.w:1)}}d={count:u,texture:w,size:new ut(x,T)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function c_(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Hf=new xn,ju=new Uf(1,1),Gf=new Af,Vf=new wm,Wf=new If,Ku=[],Zu=[],Ju=new Float32Array(16),Qu=new Float32Array(9),td=new Float32Array(4);function Fr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Ku[s];if(r===void 0&&(r=new Float32Array(s),Ku[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function en(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function nn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function $a(i,t){let e=Zu[t];e===void 0&&(e=new Int32Array(t),Zu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function h_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function u_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;i.uniform2fv(this.addr,t),nn(e,t)}}function d_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(en(e,t))return;i.uniform3fv(this.addr,t),nn(e,t)}}function f_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;i.uniform4fv(this.addr,t),nn(e,t)}}function p_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(en(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),nn(e,t)}else{if(en(e,n))return;td.set(n),i.uniformMatrix2fv(this.addr,!1,td),nn(e,n)}}function m_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(en(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),nn(e,t)}else{if(en(e,n))return;Qu.set(n),i.uniformMatrix3fv(this.addr,!1,Qu),nn(e,n)}}function g_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(en(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),nn(e,t)}else{if(en(e,n))return;Ju.set(n),i.uniformMatrix4fv(this.addr,!1,Ju),nn(e,n)}}function v_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function __(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;i.uniform2iv(this.addr,t),nn(e,t)}}function x_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(en(e,t))return;i.uniform3iv(this.addr,t),nn(e,t)}}function y_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;i.uniform4iv(this.addr,t),nn(e,t)}}function M_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function w_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;i.uniform2uiv(this.addr,t),nn(e,t)}}function b_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(en(e,t))return;i.uniform3uiv(this.addr,t),nn(e,t)}}function S_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;i.uniform4uiv(this.addr,t),nn(e,t)}}function E_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ju.compareFunction=Sf,r=ju):r=Hf,e.setTexture2D(t||r,s)}function T_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Vf,s)}function A_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Wf,s)}function C_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Gf,s)}function R_(i){switch(i){case 5126:return h_;case 35664:return u_;case 35665:return d_;case 35666:return f_;case 35674:return p_;case 35675:return m_;case 35676:return g_;case 5124:case 35670:return v_;case 35667:case 35671:return __;case 35668:case 35672:return x_;case 35669:case 35673:return y_;case 5125:return M_;case 36294:return w_;case 36295:return b_;case 36296:return S_;case 35678:case 36198:case 36298:case 36306:case 35682:return E_;case 35679:case 36299:case 36307:return T_;case 35680:case 36300:case 36308:case 36293:return A_;case 36289:case 36303:case 36311:case 36292:return C_}}function P_(i,t){i.uniform1fv(this.addr,t)}function L_(i,t){const e=Fr(t,this.size,2);i.uniform2fv(this.addr,e)}function I_(i,t){const e=Fr(t,this.size,3);i.uniform3fv(this.addr,e)}function D_(i,t){const e=Fr(t,this.size,4);i.uniform4fv(this.addr,e)}function U_(i,t){const e=Fr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function N_(i,t){const e=Fr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function F_(i,t){const e=Fr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function O_(i,t){i.uniform1iv(this.addr,t)}function k_(i,t){i.uniform2iv(this.addr,t)}function B_(i,t){i.uniform3iv(this.addr,t)}function z_(i,t){i.uniform4iv(this.addr,t)}function H_(i,t){i.uniform1uiv(this.addr,t)}function G_(i,t){i.uniform2uiv(this.addr,t)}function V_(i,t){i.uniform3uiv(this.addr,t)}function W_(i,t){i.uniform4uiv(this.addr,t)}function X_(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);en(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Hf,r[o])}function q_(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);en(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Vf,r[o])}function Y_(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);en(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Wf,r[o])}function $_(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);en(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Gf,r[o])}function j_(i){switch(i){case 5126:return P_;case 35664:return L_;case 35665:return I_;case 35666:return D_;case 35674:return U_;case 35675:return N_;case 35676:return F_;case 5124:case 35670:return O_;case 35667:case 35671:return k_;case 35668:case 35672:return B_;case 35669:case 35673:return z_;case 5125:return H_;case 36294:return G_;case 36295:return V_;case 36296:return W_;case 35678:case 36198:case 36298:case 36306:case 35682:return X_;case 35679:case 36299:case 36307:return q_;case 35680:case 36300:case 36308:case 36293:return Y_;case 36289:case 36303:case 36311:case 36292:return $_}}class K_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=R_(e.type)}}class Z_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=j_(e.type)}}class J_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ul=/(\w+)(\])?(\[|\.)?/g;function ed(i,t){i.seq.push(t),i.map[t.id]=t}function Q_(i,t,e){const n=i.name,s=n.length;for(Ul.lastIndex=0;;){const r=Ul.exec(n),o=Ul.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){ed(e,c===void 0?new K_(a,i,t):new Z_(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new J_(a),ed(e,u)),e=u}}}class Ea{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Q_(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function nd(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const t2=37297;let e2=0;function n2(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const id=new Qt;function i2(i){de._getMatrix(id,de.workingColorSpace,i);const t=`mat3( ${id.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(i)){case Da:return[t,"LinearTransferOETF"];case be:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function sd(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+n2(i.getShaderSource(t),o)}else return s}function s2(i,t){const e=i2(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function r2(i,t){let e;switch(t){case lf:e="Linear";break;case cf:e="Reinhard";break;case hf:e="Cineon";break;case ah:e="ACESFilmic";break;case uf:e="AgX";break;case df:e="Neutral";break;case Bp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const na=new N;function o2(){de.getLuminanceCoefficients(na);const i=na.x.toFixed(4),t=na.y.toFixed(4),e=na.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function a2(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ro).join(`
`)}function l2(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function c2(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ro(i){return i!==""}function rd(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function od(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const h2=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kc(i){return i.replace(h2,d2)}const u2=new Map;function d2(i,t){let e=ee[t];if(e===void 0){const n=u2.get(t);if(n!==void 0)e=ee[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Kc(e)}const f2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ad(i){return i.replace(f2,p2)}function p2(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ld(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function m2(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===of?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===af?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ti&&(t="SHADOWMAP_TYPE_VSM"),t}function g2(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case yr:case Mr:t="ENVMAP_TYPE_CUBE";break;case Wa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function v2(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Mr:t="ENVMAP_MODE_REFRACTION";break}return t}function _2(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case oh:t="ENVMAP_BLENDING_MULTIPLY";break;case Op:t="ENVMAP_BLENDING_MIX";break;case kp:t="ENVMAP_BLENDING_ADD";break}return t}function x2(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function y2(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=m2(e),c=g2(e),h=v2(e),u=_2(e),d=x2(e),f=a2(e),g=l2(r),v=s.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ro).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ro).join(`
`),p.length>0&&(p+=`
`)):(m=[ld(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ro).join(`
`),p=[ld(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==is?"#define TONE_MAPPING":"",e.toneMapping!==is?ee.tonemapping_pars_fragment:"",e.toneMapping!==is?r2("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,s2("linearToOutputTexel",e.outputColorSpace),o2(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ro).join(`
`)),o=Kc(o),o=rd(o,e),o=od(o,e),a=Kc(a),a=rd(a,e),a=od(a,e),o=ad(o),a=ad(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===du?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===du?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=M+m+o,x=M+p+a,T=nd(s,s.VERTEX_SHADER,_),y=nd(s,s.FRAGMENT_SHADER,x);s.attachShader(v,T),s.attachShader(v,y),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(I){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(v).trim(),U=s.getShaderInfoLog(T).trim(),z=s.getShaderInfoLog(y).trim();let W=!0,$=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,y);else{const et=sd(s,T,"vertex"),Y=sd(s,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+et+`
`+Y)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(U===""||z==="")&&($=!1);$&&(I.diagnostics={runnable:W,programLog:O,vertexShader:{log:U,prefix:m},fragmentShader:{log:z,prefix:p}})}s.deleteShader(T),s.deleteShader(y),E=new Ea(s,v),b=c2(s,v)}let E;this.getUniforms=function(){return E===void 0&&w(this),E};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,t2)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=e2++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=y,this}let M2=0;class w2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new b2(t),e.set(t,n)),n}}class b2{constructor(t){this.id=M2++,this.code=t,this.usedTimes=0}}function S2(i,t,e,n,s,r,o){const a=new vh,l=new w2,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,S,I,O,U){const z=O.fog,W=U.geometry,$=b.isMeshStandardMaterial?O.environment:null,et=(b.isMeshStandardMaterial?e:t).get(b.envMap||$),Y=et&&et.mapping===Wa?et.image.height:null,rt=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const xt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Tt=xt!==void 0?xt.length:0;let $t=0;W.morphAttributes.position!==void 0&&($t=1),W.morphAttributes.normal!==void 0&&($t=2),W.morphAttributes.color!==void 0&&($t=3);let ye,Z,it,yt;if(rt){const Me=li[rt];ye=Me.vertexShader,Z=Me.fragmentShader}else ye=b.vertexShader,Z=b.fragmentShader,l.update(b),it=l.getVertexShaderID(b),yt=l.getFragmentShaderID(b);const ht=i.getRenderTarget(),Ft=i.state.buffers.depth.getReversed(),Zt=U.isInstancedMesh===!0,ie=U.isBatchedMesh===!0,Be=!!b.map,ce=!!b.matcap,Xe=!!et,F=!!b.aoMap,kn=!!b.lightMap,oe=!!b.bumpMap,ae=!!b.normalMap,Dt=!!b.displacementMap,Pe=!!b.emissiveMap,Ut=!!b.metalnessMap,D=!!b.roughnessMap,R=b.anisotropy>0,V=b.clearcoat>0,Q=b.dispersion>0,nt=b.iridescence>0,J=b.sheen>0,Pt=b.transmission>0,mt=R&&!!b.anisotropyMap,bt=V&&!!b.clearcoatMap,he=V&&!!b.clearcoatNormalMap,ot=V&&!!b.clearcoatRoughnessMap,St=nt&&!!b.iridescenceMap,Bt=nt&&!!b.iridescenceThicknessMap,Wt=J&&!!b.sheenColorMap,Et=J&&!!b.sheenRoughnessMap,le=!!b.specularMap,te=!!b.specularColorMap,Ce=!!b.specularIntensityMap,k=Pt&&!!b.transmissionMap,ft=Pt&&!!b.thicknessMap,K=!!b.gradientMap,tt=!!b.alphaMap,vt=b.alphaTest>0,gt=!!b.alphaHash,Jt=!!b.extensions;let Ve=is;b.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(Ve=i.toneMapping);const un={shaderID:rt,shaderType:b.type,shaderName:b.name,vertexShader:ye,fragmentShader:Z,defines:b.defines,customVertexShaderID:it,customFragmentShaderID:yt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:ie,batchingColor:ie&&U._colorsTexture!==null,instancing:Zt,instancingColor:Zt&&U.instanceColor!==null,instancingMorph:Zt&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ht===null?i.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Sr,alphaToCoverage:!!b.alphaToCoverage,map:Be,matcap:ce,envMap:Xe,envMapMode:Xe&&et.mapping,envMapCubeUVHeight:Y,aoMap:F,lightMap:kn,bumpMap:oe,normalMap:ae,displacementMap:d&&Dt,emissiveMap:Pe,normalMapObjectSpace:ae&&b.normalMapType===Gp,normalMapTangentSpace:ae&&b.normalMapType===mh,metalnessMap:Ut,roughnessMap:D,anisotropy:R,anisotropyMap:mt,clearcoat:V,clearcoatMap:bt,clearcoatNormalMap:he,clearcoatRoughnessMap:ot,dispersion:Q,iridescence:nt,iridescenceMap:St,iridescenceThicknessMap:Bt,sheen:J,sheenColorMap:Wt,sheenRoughnessMap:Et,specularMap:le,specularColorMap:te,specularIntensityMap:Ce,transmission:Pt,transmissionMap:k,thicknessMap:ft,gradientMap:K,opaque:b.transparent===!1&&b.blending===pr&&b.alphaToCoverage===!1,alphaMap:tt,alphaTest:vt,alphaHash:gt,combine:b.combine,mapUv:Be&&v(b.map.channel),aoMapUv:F&&v(b.aoMap.channel),lightMapUv:kn&&v(b.lightMap.channel),bumpMapUv:oe&&v(b.bumpMap.channel),normalMapUv:ae&&v(b.normalMap.channel),displacementMapUv:Dt&&v(b.displacementMap.channel),emissiveMapUv:Pe&&v(b.emissiveMap.channel),metalnessMapUv:Ut&&v(b.metalnessMap.channel),roughnessMapUv:D&&v(b.roughnessMap.channel),anisotropyMapUv:mt&&v(b.anisotropyMap.channel),clearcoatMapUv:bt&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:he&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:Wt&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:Et&&v(b.sheenRoughnessMap.channel),specularMapUv:le&&v(b.specularMap.channel),specularColorMapUv:te&&v(b.specularColorMap.channel),specularIntensityMapUv:Ce&&v(b.specularIntensityMap.channel),transmissionMapUv:k&&v(b.transmissionMap.channel),thicknessMapUv:ft&&v(b.thicknessMap.channel),alphaMapUv:tt&&v(b.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ae||R),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!W.attributes.uv&&(Be||tt),fog:!!z,useFog:b.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ft,skinning:U.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:$t,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ve,decodeVideoTexture:Be&&b.map.isVideoTexture===!0&&de.getTransfer(b.map.colorSpace)===be,decodeVideoTextureEmissive:Pe&&b.emissiveMap.isVideoTexture===!0&&de.getTransfer(b.emissiveMap.colorSpace)===be,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ii,flipSided:b.side===En,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Jt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Jt&&b.extensions.multiDraw===!0||ie)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return un.vertexUv1s=c.has(1),un.vertexUv2s=c.has(2),un.vertexUv3s=c.has(3),c.clear(),un}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)S.push(I),S.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(M(S,b),_(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function M(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function _(b,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){const S=g[b.type];let I;if(S){const O=li[S];I=xo.clone(O.uniforms)}else I=b.uniforms;return I}function T(b,S){let I;for(let O=0,U=h.length;O<U;O++){const z=h[O];if(z.cacheKey===S){I=z,++I.usedTimes;break}}return I===void 0&&(I=new y2(i,S,b,r),h.push(I)),I}function y(b){if(--b.usedTimes===0){const S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function w(b){l.remove(b)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:T,releaseProgram:y,releaseShaderCache:w,programs:h,dispose:E}}function E2(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function T2(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function cd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function hd(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,v,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||T2),n.length>1&&n.sort(d||cd),s.length>1&&s.sort(d||cd)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function A2(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new hd,i.set(n,[o])):s>=r.length?(o=new hd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function C2(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new ct};break;case"SpotLight":e={position:new N,direction:new N,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":e={color:new ct,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function R2(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let P2=0;function L2(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function I2(i){const t=new C2,e=R2(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);const s=new N,r=new me,o=new me;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,M=0,_=0,x=0,T=0,y=0,w=0;c.sort(L2);for(let b=0,S=c.length;b<S;b++){const I=c[b],O=I.color,U=I.intensity,z=I.distance,W=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=O.r*U,u+=O.g*U,d+=O.b*U;else if(I.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(I.sh.coefficients[$],U);w++}else if(I.isDirectionalLight){const $=t.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const et=I.shadow,Y=e.get(I);Y.shadowIntensity=et.intensity,Y.shadowBias=et.bias,Y.shadowNormalBias=et.normalBias,Y.shadowRadius=et.radius,Y.shadowMapSize=et.mapSize,n.directionalShadow[f]=Y,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=I.shadow.matrix,M++}n.directional[f]=$,f++}else if(I.isSpotLight){const $=t.get(I);$.position.setFromMatrixPosition(I.matrixWorld),$.color.copy(O).multiplyScalar(U),$.distance=z,$.coneCos=Math.cos(I.angle),$.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),$.decay=I.decay,n.spot[v]=$;const et=I.shadow;if(I.map&&(n.spotLightMap[T]=I.map,T++,et.updateMatrices(I),I.castShadow&&y++),n.spotLightMatrix[v]=et.matrix,I.castShadow){const Y=e.get(I);Y.shadowIntensity=et.intensity,Y.shadowBias=et.bias,Y.shadowNormalBias=et.normalBias,Y.shadowRadius=et.radius,Y.shadowMapSize=et.mapSize,n.spotShadow[v]=Y,n.spotShadowMap[v]=W,x++}v++}else if(I.isRectAreaLight){const $=t.get(I);$.color.copy(O).multiplyScalar(U),$.halfWidth.set(I.width*.5,0,0),$.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=$,m++}else if(I.isPointLight){const $=t.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),$.distance=I.distance,$.decay=I.decay,I.castShadow){const et=I.shadow,Y=e.get(I);Y.shadowIntensity=et.intensity,Y.shadowBias=et.bias,Y.shadowNormalBias=et.normalBias,Y.shadowRadius=et.radius,Y.shadowMapSize=et.mapSize,Y.shadowCameraNear=et.camera.near,Y.shadowCameraFar=et.camera.far,n.pointShadow[g]=Y,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=I.shadow.matrix,_++}n.point[g]=$,g++}else if(I.isHemisphereLight){const $=t.get(I);$.skyColor.copy(I.color).multiplyScalar(U),$.groundColor.copy(I.groundColor).multiplyScalar(U),n.hemi[p]=$,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const E=n.hash;(E.directionalLength!==f||E.pointLength!==g||E.spotLength!==v||E.rectAreaLength!==m||E.hemiLength!==p||E.numDirectionalShadows!==M||E.numPointShadows!==_||E.numSpotShadows!==x||E.numSpotMaps!==T||E.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=x+T-y,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=w,E.directionalLength=f,E.pointLength=g,E.spotLength=v,E.rectAreaLength=m,E.hemiLength=p,E.numDirectionalShadows=M,E.numPointShadows=_,E.numSpotShadows=x,E.numSpotMaps=T,E.numLightProbes=w,n.version=P2++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const _=c[p];if(_.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(_.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(_.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function ud(i){const t=new I2(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function D2(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new ud(i),t.set(s,[a])):r>=o.length?(a=new ud(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const U2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function F2(i,t,e){let n=new Mh;const s=new ut,r=new ut,o=new He,a=new Bf({depthPacking:bf}),l=new ig,c={},h=e.maxTextureSize,u={[ki]:En,[En]:ki,[ii]:ii},d=new tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:U2,fragmentShader:N2}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new hn;g.setAttribute("position",new De(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ge(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=of;let p=this.type;this.render=function(y,w,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const b=i.getRenderTarget(),S=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Li),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const U=p!==Ti&&this.type===Ti,z=p===Ti&&this.type!==Ti;for(let W=0,$=y.length;W<$;W++){const et=y[W],Y=et.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const rt=Y.getFrameExtents();if(s.multiply(rt),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/rt.x),s.x=r.x*rt.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/rt.y),s.y=r.y*rt.y,Y.mapSize.y=r.y)),Y.map===null||U===!0||z===!0){const Tt=this.type!==Ti?{minFilter:Tn,magFilter:Tn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new $n(s.x,s.y,Tt),Y.map.texture.name=et.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const xt=Y.getViewportCount();for(let Tt=0;Tt<xt;Tt++){const $t=Y.getViewport(Tt);o.set(r.x*$t.x,r.y*$t.y,r.x*$t.z,r.y*$t.w),O.viewport(o),Y.updateMatrices(et,Tt),n=Y.getFrustum(),x(w,E,Y.camera,et,this.type)}Y.isPointLightShadow!==!0&&this.type===Ti&&M(Y,E),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,S,I)};function M(y,w){const E=t.update(v);d.defines.VSM_SAMPLES!==y.blurSamples&&(d.defines.VSM_SAMPLES=y.blurSamples,f.defines.VSM_SAMPLES=y.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new $n(s.x,s.y)),d.uniforms.shadow_pass.value=y.map.texture,d.uniforms.resolution.value=y.mapSize,d.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(w,null,E,d,v,null),f.uniforms.shadow_pass.value=y.mapPass.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(w,null,E,f,v,null)}function _(y,w,E,b){let S=null;const I=E.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(I!==void 0)S=I;else if(S=E.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const O=S.uuid,U=w.uuid;let z=c[O];z===void 0&&(z={},c[O]=z);let W=z[U];W===void 0&&(W=S.clone(),z[U]=W,w.addEventListener("dispose",T)),S=W}if(S.visible=w.visible,S.wireframe=w.wireframe,b===Ti?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:u[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,E.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const O=i.properties.get(S);O.light=E}return S}function x(y,w,E,b,S){if(y.visible===!1)return;if(y.layers.test(w.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&S===Ti)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,y.matrixWorld);const U=t.update(y),z=y.material;if(Array.isArray(z)){const W=U.groups;for(let $=0,et=W.length;$<et;$++){const Y=W[$],rt=z[Y.materialIndex];if(rt&&rt.visible){const xt=_(y,rt,b,S);y.onBeforeShadow(i,y,w,E,U,xt,Y),i.renderBufferDirect(E,null,U,xt,y,Y),y.onAfterShadow(i,y,w,E,U,xt,Y)}}}else if(z.visible){const W=_(y,z,b,S);y.onBeforeShadow(i,y,w,E,U,W,null),i.renderBufferDirect(E,null,U,W,y,null),y.onAfterShadow(i,y,w,E,U,W,null)}}const O=y.children;for(let U=0,z=O.length;U<z;U++)x(O[U],w,E,b,S)}function T(y){y.target.removeEventListener("dispose",T);for(const E in c){const b=c[E],S=y.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const O2={[fc]:pc,[mc]:_c,[gc]:xc,[xr]:vc,[pc]:fc,[_c]:mc,[xc]:gc,[vc]:xr};function k2(i,t){function e(){let k=!1;const ft=new He;let K=null;const tt=new He(0,0,0,0);return{setMask:function(vt){K!==vt&&!k&&(i.colorMask(vt,vt,vt,vt),K=vt)},setLocked:function(vt){k=vt},setClear:function(vt,gt,Jt,Ve,un){un===!0&&(vt*=Ve,gt*=Ve,Jt*=Ve),ft.set(vt,gt,Jt,Ve),tt.equals(ft)===!1&&(i.clearColor(vt,gt,Jt,Ve),tt.copy(ft))},reset:function(){k=!1,K=null,tt.set(-1,0,0,0)}}}function n(){let k=!1,ft=!1,K=null,tt=null,vt=null;return{setReversed:function(gt){if(ft!==gt){const Jt=t.get("EXT_clip_control");ft?Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.ZERO_TO_ONE_EXT):Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.NEGATIVE_ONE_TO_ONE_EXT);const Ve=vt;vt=null,this.setClear(Ve)}ft=gt},getReversed:function(){return ft},setTest:function(gt){gt?ht(i.DEPTH_TEST):Ft(i.DEPTH_TEST)},setMask:function(gt){K!==gt&&!k&&(i.depthMask(gt),K=gt)},setFunc:function(gt){if(ft&&(gt=O2[gt]),tt!==gt){switch(gt){case fc:i.depthFunc(i.NEVER);break;case pc:i.depthFunc(i.ALWAYS);break;case mc:i.depthFunc(i.LESS);break;case xr:i.depthFunc(i.LEQUAL);break;case gc:i.depthFunc(i.EQUAL);break;case vc:i.depthFunc(i.GEQUAL);break;case _c:i.depthFunc(i.GREATER);break;case xc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=gt}},setLocked:function(gt){k=gt},setClear:function(gt){vt!==gt&&(ft&&(gt=1-gt),i.clearDepth(gt),vt=gt)},reset:function(){k=!1,K=null,tt=null,vt=null,ft=!1}}}function s(){let k=!1,ft=null,K=null,tt=null,vt=null,gt=null,Jt=null,Ve=null,un=null;return{setTest:function(Me){k||(Me?ht(i.STENCIL_TEST):Ft(i.STENCIL_TEST))},setMask:function(Me){ft!==Me&&!k&&(i.stencilMask(Me),ft=Me)},setFunc:function(Me,Kn,_i){(K!==Me||tt!==Kn||vt!==_i)&&(i.stencilFunc(Me,Kn,_i),K=Me,tt=Kn,vt=_i)},setOp:function(Me,Kn,_i){(gt!==Me||Jt!==Kn||Ve!==_i)&&(i.stencilOp(Me,Kn,_i),gt=Me,Jt=Kn,Ve=_i)},setLocked:function(Me){k=Me},setClear:function(Me){un!==Me&&(i.clearStencil(Me),un=Me)},reset:function(){k=!1,ft=null,K=null,tt=null,vt=null,gt=null,Jt=null,Ve=null,un=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,M=null,_=null,x=null,T=null,y=null,w=new ct(0,0,0),E=0,b=!1,S=null,I=null,O=null,U=null,z=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,et=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(Y)[1]),$=et>=1):Y.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),$=et>=2);let rt=null,xt={};const Tt=i.getParameter(i.SCISSOR_BOX),$t=i.getParameter(i.VIEWPORT),ye=new He().fromArray(Tt),Z=new He().fromArray($t);function it(k,ft,K,tt){const vt=new Uint8Array(4),gt=i.createTexture();i.bindTexture(k,gt),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Jt=0;Jt<K;Jt++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ft+Jt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return gt}const yt={};yt[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),yt[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),yt[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),yt[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(i.DEPTH_TEST),o.setFunc(xr),oe(!1),ae(au),ht(i.CULL_FACE),F(Li);function ht(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function Ft(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function Zt(k,ft){return u[k]!==ft?(i.bindFramebuffer(k,ft),u[k]=ft,k===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ft),k===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function ie(k,ft){let K=f,tt=!1;if(k){K=d.get(ft),K===void 0&&(K=[],d.set(ft,K));const vt=k.textures;if(K.length!==vt.length||K[0]!==i.COLOR_ATTACHMENT0){for(let gt=0,Jt=vt.length;gt<Jt;gt++)K[gt]=i.COLOR_ATTACHMENT0+gt;K.length=vt.length,tt=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,tt=!0);tt&&i.drawBuffers(K)}function Be(k){return g!==k?(i.useProgram(k),g=k,!0):!1}const ce={[Ms]:i.FUNC_ADD,[yp]:i.FUNC_SUBTRACT,[Mp]:i.FUNC_REVERSE_SUBTRACT};ce[wp]=i.MIN,ce[bp]=i.MAX;const Xe={[Sp]:i.ZERO,[Ep]:i.ONE,[Tp]:i.SRC_COLOR,[uc]:i.SRC_ALPHA,[Ip]:i.SRC_ALPHA_SATURATE,[Pp]:i.DST_COLOR,[Cp]:i.DST_ALPHA,[Ap]:i.ONE_MINUS_SRC_COLOR,[dc]:i.ONE_MINUS_SRC_ALPHA,[Lp]:i.ONE_MINUS_DST_COLOR,[Rp]:i.ONE_MINUS_DST_ALPHA,[Dp]:i.CONSTANT_COLOR,[Up]:i.ONE_MINUS_CONSTANT_COLOR,[Np]:i.CONSTANT_ALPHA,[Fp]:i.ONE_MINUS_CONSTANT_ALPHA};function F(k,ft,K,tt,vt,gt,Jt,Ve,un,Me){if(k===Li){v===!0&&(Ft(i.BLEND),v=!1);return}if(v===!1&&(ht(i.BLEND),v=!0),k!==xp){if(k!==m||Me!==b){if((p!==Ms||x!==Ms)&&(i.blendEquation(i.FUNC_ADD),p=Ms,x=Ms),Me)switch(k){case pr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hc:i.blendFunc(i.ONE,i.ONE);break;case lu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case pr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case lu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}M=null,_=null,T=null,y=null,w.set(0,0,0),E=0,m=k,b=Me}return}vt=vt||ft,gt=gt||K,Jt=Jt||tt,(ft!==p||vt!==x)&&(i.blendEquationSeparate(ce[ft],ce[vt]),p=ft,x=vt),(K!==M||tt!==_||gt!==T||Jt!==y)&&(i.blendFuncSeparate(Xe[K],Xe[tt],Xe[gt],Xe[Jt]),M=K,_=tt,T=gt,y=Jt),(Ve.equals(w)===!1||un!==E)&&(i.blendColor(Ve.r,Ve.g,Ve.b,un),w.copy(Ve),E=un),m=k,b=!1}function kn(k,ft){k.side===ii?Ft(i.CULL_FACE):ht(i.CULL_FACE);let K=k.side===En;ft&&(K=!K),oe(K),k.blending===pr&&k.transparent===!1?F(Li):F(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);const tt=k.stencilWrite;a.setTest(tt),tt&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Pe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ht(i.SAMPLE_ALPHA_TO_COVERAGE):Ft(i.SAMPLE_ALPHA_TO_COVERAGE)}function oe(k){S!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),S=k)}function ae(k){k!==vp?(ht(i.CULL_FACE),k!==I&&(k===au?i.cullFace(i.BACK):k===_p?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ft(i.CULL_FACE),I=k}function Dt(k){k!==O&&($&&i.lineWidth(k),O=k)}function Pe(k,ft,K){k?(ht(i.POLYGON_OFFSET_FILL),(U!==ft||z!==K)&&(i.polygonOffset(ft,K),U=ft,z=K)):Ft(i.POLYGON_OFFSET_FILL)}function Ut(k){k?ht(i.SCISSOR_TEST):Ft(i.SCISSOR_TEST)}function D(k){k===void 0&&(k=i.TEXTURE0+W-1),rt!==k&&(i.activeTexture(k),rt=k)}function R(k,ft,K){K===void 0&&(rt===null?K=i.TEXTURE0+W-1:K=rt);let tt=xt[K];tt===void 0&&(tt={type:void 0,texture:void 0},xt[K]=tt),(tt.type!==k||tt.texture!==ft)&&(rt!==K&&(i.activeTexture(K),rt=K),i.bindTexture(k,ft||yt[k]),tt.type=k,tt.texture=ft)}function V(){const k=xt[rt];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function Q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function nt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Pt(){try{i.texSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function mt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function bt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function he(){try{i.texStorage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ot(){try{i.texStorage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function St(){try{i.texImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(){try{i.texImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Wt(k){ye.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),ye.copy(k))}function Et(k){Z.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),Z.copy(k))}function le(k,ft){let K=c.get(ft);K===void 0&&(K=new WeakMap,c.set(ft,K));let tt=K.get(k);tt===void 0&&(tt=i.getUniformBlockIndex(ft,k.name),K.set(k,tt))}function te(k,ft){const tt=c.get(ft).get(k);l.get(ft)!==tt&&(i.uniformBlockBinding(ft,tt,k.__bindingPointIndex),l.set(ft,tt))}function Ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},rt=null,xt={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,M=null,_=null,x=null,T=null,y=null,w=new ct(0,0,0),E=0,b=!1,S=null,I=null,O=null,U=null,z=null,ye.set(0,0,i.canvas.width,i.canvas.height),Z.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ht,disable:Ft,bindFramebuffer:Zt,drawBuffers:ie,useProgram:Be,setBlending:F,setMaterial:kn,setFlipSided:oe,setCullFace:ae,setLineWidth:Dt,setPolygonOffset:Pe,setScissorTest:Ut,activeTexture:D,bindTexture:R,unbindTexture:V,compressedTexImage2D:Q,compressedTexImage3D:nt,texImage2D:St,texImage3D:Bt,updateUBOMapping:le,uniformBlockBinding:te,texStorage2D:he,texStorage3D:ot,texSubImage2D:J,texSubImage3D:Pt,compressedTexSubImage2D:mt,compressedTexSubImage3D:bt,scissor:Wt,viewport:Et,reset:Ce}}function B2(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,R){return f?new OffscreenCanvas(D,R):Na("canvas")}function v(D,R,V){let Q=1;const nt=Ut(D);if((nt.width>V||nt.height>V)&&(Q=V/Math.max(nt.width,nt.height)),Q<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const J=Math.floor(Q*nt.width),Pt=Math.floor(Q*nt.height);u===void 0&&(u=g(J,Pt));const mt=R?g(J,Pt):u;return mt.width=J,mt.height=Pt,mt.getContext("2d").drawImage(D,0,0,J,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+J+"x"+Pt+")."),mt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){i.generateMipmap(D)}function M(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(D,R,V,Q,nt=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let J=R;if(R===i.RED&&(V===i.FLOAT&&(J=i.R32F),V===i.HALF_FLOAT&&(J=i.R16F),V===i.UNSIGNED_BYTE&&(J=i.R8)),R===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.R8UI),V===i.UNSIGNED_SHORT&&(J=i.R16UI),V===i.UNSIGNED_INT&&(J=i.R32UI),V===i.BYTE&&(J=i.R8I),V===i.SHORT&&(J=i.R16I),V===i.INT&&(J=i.R32I)),R===i.RG&&(V===i.FLOAT&&(J=i.RG32F),V===i.HALF_FLOAT&&(J=i.RG16F),V===i.UNSIGNED_BYTE&&(J=i.RG8)),R===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.RG8UI),V===i.UNSIGNED_SHORT&&(J=i.RG16UI),V===i.UNSIGNED_INT&&(J=i.RG32UI),V===i.BYTE&&(J=i.RG8I),V===i.SHORT&&(J=i.RG16I),V===i.INT&&(J=i.RG32I)),R===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.RGB8UI),V===i.UNSIGNED_SHORT&&(J=i.RGB16UI),V===i.UNSIGNED_INT&&(J=i.RGB32UI),V===i.BYTE&&(J=i.RGB8I),V===i.SHORT&&(J=i.RGB16I),V===i.INT&&(J=i.RGB32I)),R===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),V===i.UNSIGNED_INT&&(J=i.RGBA32UI),V===i.BYTE&&(J=i.RGBA8I),V===i.SHORT&&(J=i.RGBA16I),V===i.INT&&(J=i.RGBA32I)),R===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),R===i.RGBA){const Pt=nt?Da:de.getTransfer(Q);V===i.FLOAT&&(J=i.RGBA32F),V===i.HALF_FLOAT&&(J=i.RGBA16F),V===i.UNSIGNED_BYTE&&(J=Pt===be?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function x(D,R){let V;return D?R===null||R===Ls||R===wr?V=i.DEPTH24_STENCIL8:R===ci?V=i.DEPTH32F_STENCIL8:R===vo&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Ls||R===wr?V=i.DEPTH_COMPONENT24:R===ci?V=i.DEPTH_COMPONENT32F:R===vo&&(V=i.DEPTH_COMPONENT16),V}function T(D,R){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==Tn&&D.minFilter!==qn?Math.log2(Math.max(R.width,R.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?R.mipmaps.length:1}function y(D){const R=D.target;R.removeEventListener("dispose",y),E(R),R.isVideoTexture&&h.delete(R)}function w(D){const R=D.target;R.removeEventListener("dispose",w),S(R)}function E(D){const R=n.get(D);if(R.__webglInit===void 0)return;const V=D.source,Q=d.get(V);if(Q){const nt=Q[R.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&b(D),Object.keys(Q).length===0&&d.delete(V)}n.remove(D)}function b(D){const R=n.get(D);i.deleteTexture(R.__webglTexture);const V=D.source,Q=d.get(V);delete Q[R.__cacheKey],o.memory.textures--}function S(D){const R=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(R.__webglFramebuffer[Q]))for(let nt=0;nt<R.__webglFramebuffer[Q].length;nt++)i.deleteFramebuffer(R.__webglFramebuffer[Q][nt]);else i.deleteFramebuffer(R.__webglFramebuffer[Q]);R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer[Q])}else{if(Array.isArray(R.__webglFramebuffer))for(let Q=0;Q<R.__webglFramebuffer.length;Q++)i.deleteFramebuffer(R.__webglFramebuffer[Q]);else i.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&i.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let Q=0;Q<R.__webglColorRenderbuffer.length;Q++)R.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(R.__webglColorRenderbuffer[Q]);R.__webglDepthRenderbuffer&&i.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const V=D.textures;for(let Q=0,nt=V.length;Q<nt;Q++){const J=n.get(V[Q]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(V[Q])}n.remove(D)}let I=0;function O(){I=0}function U(){const D=I;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),I+=1,D}function z(D){const R=[];return R.push(D.wrapS),R.push(D.wrapT),R.push(D.wrapR||0),R.push(D.magFilter),R.push(D.minFilter),R.push(D.anisotropy),R.push(D.internalFormat),R.push(D.format),R.push(D.type),R.push(D.generateMipmaps),R.push(D.premultiplyAlpha),R.push(D.flipY),R.push(D.unpackAlignment),R.push(D.colorSpace),R.join()}function W(D,R){const V=n.get(D);if(D.isVideoTexture&&Dt(D),D.isRenderTargetTexture===!1&&D.version>0&&V.__version!==D.version){const Q=D.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(V,D,R);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+R)}function $(D,R){const V=n.get(D);if(D.version>0&&V.__version!==D.version){Z(V,D,R);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+R)}function et(D,R){const V=n.get(D);if(D.version>0&&V.__version!==D.version){Z(V,D,R);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+R)}function Y(D,R){const V=n.get(D);if(D.version>0&&V.__version!==D.version){it(V,D,R);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+R)}const rt={[go]:i.REPEAT,[Ci]:i.CLAMP_TO_EDGE,[wc]:i.MIRRORED_REPEAT},xt={[Tn]:i.NEAREST,[zp]:i.NEAREST_MIPMAP_NEAREST,[Uo]:i.NEAREST_MIPMAP_LINEAR,[qn]:i.LINEAR,[sl]:i.LINEAR_MIPMAP_NEAREST,[Es]:i.LINEAR_MIPMAP_LINEAR},Tt={[Vp]:i.NEVER,[jp]:i.ALWAYS,[Wp]:i.LESS,[Sf]:i.LEQUAL,[Xp]:i.EQUAL,[$p]:i.GEQUAL,[qp]:i.GREATER,[Yp]:i.NOTEQUAL};function $t(D,R){if(R.type===ci&&t.has("OES_texture_float_linear")===!1&&(R.magFilter===qn||R.magFilter===sl||R.magFilter===Uo||R.magFilter===Es||R.minFilter===qn||R.minFilter===sl||R.minFilter===Uo||R.minFilter===Es)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,rt[R.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,rt[R.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,rt[R.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,xt[R.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,xt[R.minFilter]),R.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,Tt[R.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===Tn||R.minFilter!==Uo&&R.minFilter!==Es||R.type===ci&&t.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function ye(D,R){let V=!1;D.__webglInit===void 0&&(D.__webglInit=!0,R.addEventListener("dispose",y));const Q=R.source;let nt=d.get(Q);nt===void 0&&(nt={},d.set(Q,nt));const J=z(R);if(J!==D.__cacheKey){nt[J]===void 0&&(nt[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),nt[J].usedTimes++;const Pt=nt[D.__cacheKey];Pt!==void 0&&(nt[D.__cacheKey].usedTimes--,Pt.usedTimes===0&&b(R)),D.__cacheKey=J,D.__webglTexture=nt[J].texture}return V}function Z(D,R,V){let Q=i.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),R.isData3DTexture&&(Q=i.TEXTURE_3D);const nt=ye(D,R),J=R.source;e.bindTexture(Q,D.__webglTexture,i.TEXTURE0+V);const Pt=n.get(J);if(J.version!==Pt.__version||nt===!0){e.activeTexture(i.TEXTURE0+V);const mt=de.getPrimaries(de.workingColorSpace),bt=R.colorSpace===es?null:de.getPrimaries(R.colorSpace),he=R.colorSpace===es||mt===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);let ot=v(R.image,!1,s.maxTextureSize);ot=Pe(R,ot);const St=r.convert(R.format,R.colorSpace),Bt=r.convert(R.type);let Wt=_(R.internalFormat,St,Bt,R.colorSpace,R.isVideoTexture);$t(Q,R);let Et;const le=R.mipmaps,te=R.isVideoTexture!==!0,Ce=Pt.__version===void 0||nt===!0,k=J.dataReady,ft=T(R,ot);if(R.isDepthTexture)Wt=x(R.format===br,R.type),Ce&&(te?e.texStorage2D(i.TEXTURE_2D,1,Wt,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,Wt,ot.width,ot.height,0,St,Bt,null));else if(R.isDataTexture)if(le.length>0){te&&Ce&&e.texStorage2D(i.TEXTURE_2D,ft,Wt,le[0].width,le[0].height);for(let K=0,tt=le.length;K<tt;K++)Et=le[K],te?k&&e.texSubImage2D(i.TEXTURE_2D,K,0,0,Et.width,Et.height,St,Bt,Et.data):e.texImage2D(i.TEXTURE_2D,K,Wt,Et.width,Et.height,0,St,Bt,Et.data);R.generateMipmaps=!1}else te?(Ce&&e.texStorage2D(i.TEXTURE_2D,ft,Wt,ot.width,ot.height),k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ot.width,ot.height,St,Bt,ot.data)):e.texImage2D(i.TEXTURE_2D,0,Wt,ot.width,ot.height,0,St,Bt,ot.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){te&&Ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Wt,le[0].width,le[0].height,ot.depth);for(let K=0,tt=le.length;K<tt;K++)if(Et=le[K],R.format!==Nn)if(St!==null)if(te){if(k)if(R.layerUpdates.size>0){const vt=Hu(Et.width,Et.height,R.format,R.type);for(const gt of R.layerUpdates){const Jt=Et.data.subarray(gt*vt/Et.data.BYTES_PER_ELEMENT,(gt+1)*vt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,gt,Et.width,Et.height,1,St,Jt)}R.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Et.width,Et.height,ot.depth,St,Et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Wt,Et.width,Et.height,ot.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else te?k&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Et.width,Et.height,ot.depth,St,Bt,Et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,K,Wt,Et.width,Et.height,ot.depth,0,St,Bt,Et.data)}else{te&&Ce&&e.texStorage2D(i.TEXTURE_2D,ft,Wt,le[0].width,le[0].height);for(let K=0,tt=le.length;K<tt;K++)Et=le[K],R.format!==Nn?St!==null?te?k&&e.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,Et.width,Et.height,St,Et.data):e.compressedTexImage2D(i.TEXTURE_2D,K,Wt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?k&&e.texSubImage2D(i.TEXTURE_2D,K,0,0,Et.width,Et.height,St,Bt,Et.data):e.texImage2D(i.TEXTURE_2D,K,Wt,Et.width,Et.height,0,St,Bt,Et.data)}else if(R.isDataArrayTexture)if(te){if(Ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Wt,ot.width,ot.height,ot.depth),k)if(R.layerUpdates.size>0){const K=Hu(ot.width,ot.height,R.format,R.type);for(const tt of R.layerUpdates){const vt=ot.data.subarray(tt*K/ot.data.BYTES_PER_ELEMENT,(tt+1)*K/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,ot.width,ot.height,1,St,Bt,vt)}R.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,St,Bt,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Wt,ot.width,ot.height,ot.depth,0,St,Bt,ot.data);else if(R.isData3DTexture)te?(Ce&&e.texStorage3D(i.TEXTURE_3D,ft,Wt,ot.width,ot.height,ot.depth),k&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,St,Bt,ot.data)):e.texImage3D(i.TEXTURE_3D,0,Wt,ot.width,ot.height,ot.depth,0,St,Bt,ot.data);else if(R.isFramebufferTexture){if(Ce)if(te)e.texStorage2D(i.TEXTURE_2D,ft,Wt,ot.width,ot.height);else{let K=ot.width,tt=ot.height;for(let vt=0;vt<ft;vt++)e.texImage2D(i.TEXTURE_2D,vt,Wt,K,tt,0,St,Bt,null),K>>=1,tt>>=1}}else if(le.length>0){if(te&&Ce){const K=Ut(le[0]);e.texStorage2D(i.TEXTURE_2D,ft,Wt,K.width,K.height)}for(let K=0,tt=le.length;K<tt;K++)Et=le[K],te?k&&e.texSubImage2D(i.TEXTURE_2D,K,0,0,St,Bt,Et):e.texImage2D(i.TEXTURE_2D,K,Wt,St,Bt,Et);R.generateMipmaps=!1}else if(te){if(Ce){const K=Ut(ot);e.texStorage2D(i.TEXTURE_2D,ft,Wt,K.width,K.height)}k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,Bt,ot)}else e.texImage2D(i.TEXTURE_2D,0,Wt,St,Bt,ot);m(R)&&p(Q),Pt.__version=J.version,R.onUpdate&&R.onUpdate(R)}D.__version=R.version}function it(D,R,V){if(R.image.length!==6)return;const Q=ye(D,R),nt=R.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+V);const J=n.get(nt);if(nt.version!==J.__version||Q===!0){e.activeTexture(i.TEXTURE0+V);const Pt=de.getPrimaries(de.workingColorSpace),mt=R.colorSpace===es?null:de.getPrimaries(R.colorSpace),bt=R.colorSpace===es||Pt===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const he=R.isCompressedTexture||R.image[0].isCompressedTexture,ot=R.image[0]&&R.image[0].isDataTexture,St=[];for(let tt=0;tt<6;tt++)!he&&!ot?St[tt]=v(R.image[tt],!0,s.maxCubemapSize):St[tt]=ot?R.image[tt].image:R.image[tt],St[tt]=Pe(R,St[tt]);const Bt=St[0],Wt=r.convert(R.format,R.colorSpace),Et=r.convert(R.type),le=_(R.internalFormat,Wt,Et,R.colorSpace),te=R.isVideoTexture!==!0,Ce=J.__version===void 0||Q===!0,k=nt.dataReady;let ft=T(R,Bt);$t(i.TEXTURE_CUBE_MAP,R);let K;if(he){te&&Ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,le,Bt.width,Bt.height);for(let tt=0;tt<6;tt++){K=St[tt].mipmaps;for(let vt=0;vt<K.length;vt++){const gt=K[vt];R.format!==Nn?Wt!==null?te?k&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,0,0,gt.width,gt.height,Wt,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,le,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):te?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,0,0,gt.width,gt.height,Wt,Et,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,le,gt.width,gt.height,0,Wt,Et,gt.data)}}}else{if(K=R.mipmaps,te&&Ce){K.length>0&&ft++;const tt=Ut(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,le,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ot){te?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,St[tt].width,St[tt].height,Wt,Et,St[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,le,St[tt].width,St[tt].height,0,Wt,Et,St[tt].data);for(let vt=0;vt<K.length;vt++){const Jt=K[vt].image[tt].image;te?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,0,0,Jt.width,Jt.height,Wt,Et,Jt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,le,Jt.width,Jt.height,0,Wt,Et,Jt.data)}}else{te?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Wt,Et,St[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,le,Wt,Et,St[tt]);for(let vt=0;vt<K.length;vt++){const gt=K[vt];te?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,0,0,Wt,Et,gt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,le,Wt,Et,gt.image[tt])}}}m(R)&&p(i.TEXTURE_CUBE_MAP),J.__version=nt.version,R.onUpdate&&R.onUpdate(R)}D.__version=R.version}function yt(D,R,V,Q,nt,J){const Pt=r.convert(V.format,V.colorSpace),mt=r.convert(V.type),bt=_(V.internalFormat,Pt,mt,V.colorSpace),he=n.get(R),ot=n.get(V);if(ot.__renderTarget=R,!he.__hasExternalTextures){const St=Math.max(1,R.width>>J),Bt=Math.max(1,R.height>>J);nt===i.TEXTURE_3D||nt===i.TEXTURE_2D_ARRAY?e.texImage3D(nt,J,bt,St,Bt,R.depth,0,Pt,mt,null):e.texImage2D(nt,J,bt,St,Bt,0,Pt,mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),ae(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,nt,ot.__webglTexture,0,oe(R)):(nt===i.TEXTURE_2D||nt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,nt,ot.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ht(D,R,V){if(i.bindRenderbuffer(i.RENDERBUFFER,D),R.depthBuffer){const Q=R.depthTexture,nt=Q&&Q.isDepthTexture?Q.type:null,J=x(R.stencilBuffer,nt),Pt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=oe(R);ae(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt,J,R.width,R.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt,J,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,J,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pt,i.RENDERBUFFER,D)}else{const Q=R.textures;for(let nt=0;nt<Q.length;nt++){const J=Q[nt],Pt=r.convert(J.format,J.colorSpace),mt=r.convert(J.type),bt=_(J.internalFormat,Pt,mt,J.colorSpace),he=oe(R);V&&ae(R)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,he,bt,R.width,R.height):ae(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he,bt,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,bt,R.width,R.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ft(D,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(R.depthTexture);Q.__renderTarget=R,(!Q.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),W(R.depthTexture,0);const nt=Q.__webglTexture,J=oe(R);if(R.depthTexture.format===mr)ae(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0);else if(R.depthTexture.format===br)ae(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function Zt(D){const R=n.get(D),V=D.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==D.depthTexture){const Q=D.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),Q){const nt=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,Q.removeEventListener("dispose",nt)};Q.addEventListener("dispose",nt),R.__depthDisposeCallback=nt}R.__boundDepthTexture=Q}if(D.depthTexture&&!R.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Ft(R.__webglFramebuffer,D)}else if(V){R.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[Q]),R.__webglDepthbuffer[Q]===void 0)R.__webglDepthbuffer[Q]=i.createRenderbuffer(),ht(R.__webglDepthbuffer[Q],D,!1);else{const nt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=R.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,J)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=i.createRenderbuffer(),ht(R.__webglDepthbuffer,D,!1);else{const Q=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=R.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,nt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ie(D,R,V){const Q=n.get(D);R!==void 0&&yt(Q.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Zt(D)}function Be(D){const R=D.texture,V=n.get(D),Q=n.get(R);D.addEventListener("dispose",w);const nt=D.textures,J=D.isWebGLCubeRenderTarget===!0,Pt=nt.length>1;if(Pt||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=R.version,o.memory.textures++),J){V.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(R.mipmaps&&R.mipmaps.length>0){V.__webglFramebuffer[mt]=[];for(let bt=0;bt<R.mipmaps.length;bt++)V.__webglFramebuffer[mt][bt]=i.createFramebuffer()}else V.__webglFramebuffer[mt]=i.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){V.__webglFramebuffer=[];for(let mt=0;mt<R.mipmaps.length;mt++)V.__webglFramebuffer[mt]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Pt)for(let mt=0,bt=nt.length;mt<bt;mt++){const he=n.get(nt[mt]);he.__webglTexture===void 0&&(he.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&ae(D)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let mt=0;mt<nt.length;mt++){const bt=nt[mt];V.__webglColorRenderbuffer[mt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[mt]);const he=r.convert(bt.format,bt.colorSpace),ot=r.convert(bt.type),St=_(bt.internalFormat,he,ot,bt.colorSpace,D.isXRRenderTarget===!0),Bt=oe(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt,St,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,V.__webglColorRenderbuffer[mt])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ht(V.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),$t(i.TEXTURE_CUBE_MAP,R);for(let mt=0;mt<6;mt++)if(R.mipmaps&&R.mipmaps.length>0)for(let bt=0;bt<R.mipmaps.length;bt++)yt(V.__webglFramebuffer[mt][bt],D,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,bt);else yt(V.__webglFramebuffer[mt],D,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(R)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let mt=0,bt=nt.length;mt<bt;mt++){const he=nt[mt],ot=n.get(he);e.bindTexture(i.TEXTURE_2D,ot.__webglTexture),$t(i.TEXTURE_2D,he),yt(V.__webglFramebuffer,D,he,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,0),m(he)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let mt=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(mt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,Q.__webglTexture),$t(mt,R),R.mipmaps&&R.mipmaps.length>0)for(let bt=0;bt<R.mipmaps.length;bt++)yt(V.__webglFramebuffer[bt],D,R,i.COLOR_ATTACHMENT0,mt,bt);else yt(V.__webglFramebuffer,D,R,i.COLOR_ATTACHMENT0,mt,0);m(R)&&p(mt),e.unbindTexture()}D.depthBuffer&&Zt(D)}function ce(D){const R=D.textures;for(let V=0,Q=R.length;V<Q;V++){const nt=R[V];if(m(nt)){const J=M(D),Pt=n.get(nt).__webglTexture;e.bindTexture(J,Pt),p(J),e.unbindTexture()}}}const Xe=[],F=[];function kn(D){if(D.samples>0){if(ae(D)===!1){const R=D.textures,V=D.width,Q=D.height;let nt=i.COLOR_BUFFER_BIT;const J=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pt=n.get(D),mt=R.length>1;if(mt)for(let bt=0;bt<R.length;bt++)e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let bt=0;bt<R.length;bt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(nt|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(nt|=i.STENCIL_BUFFER_BIT)),mt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[bt]);const he=n.get(R[bt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,he,0)}i.blitFramebuffer(0,0,V,Q,0,0,V,Q,nt,i.NEAREST),l===!0&&(Xe.length=0,F.length=0,Xe.push(i.COLOR_ATTACHMENT0+bt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Xe.push(J),F.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Xe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),mt)for(let bt=0;bt<R.length;bt++){e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[bt]);const he=n.get(R[bt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,he,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const R=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[R])}}}function oe(D){return Math.min(s.maxSamples,D.samples)}function ae(D){const R=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Dt(D){const R=o.render.frame;h.get(D)!==R&&(h.set(D,R),D.update())}function Pe(D,R){const V=D.colorSpace,Q=D.format,nt=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||V!==Sr&&V!==es&&(de.getTransfer(V)===be?(Q!==Nn||nt!==fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),R}function Ut(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=O,this.setTexture2D=W,this.setTexture2DArray=$,this.setTexture3D=et,this.setTextureCube=Y,this.rebindTextures=ie,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=kn,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=ae}function z2(i,t){function e(n,s=es){let r;const o=de.getTransfer(s);if(n===fi)return i.UNSIGNED_BYTE;if(n===ch)return i.UNSIGNED_SHORT_4_4_4_4;if(n===hh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pf)return i.BYTE;if(n===mf)return i.SHORT;if(n===vo)return i.UNSIGNED_SHORT;if(n===lh)return i.INT;if(n===Ls)return i.UNSIGNED_INT;if(n===ci)return i.FLOAT;if(n===ui)return i.HALF_FLOAT;if(n===vf)return i.ALPHA;if(n===_f)return i.RGB;if(n===Nn)return i.RGBA;if(n===xf)return i.LUMINANCE;if(n===yf)return i.LUMINANCE_ALPHA;if(n===mr)return i.DEPTH_COMPONENT;if(n===br)return i.DEPTH_STENCIL;if(n===uh)return i.RED;if(n===dh)return i.RED_INTEGER;if(n===Mf)return i.RG;if(n===fh)return i.RG_INTEGER;if(n===ph)return i.RGBA_INTEGER;if(n===ya||n===Ma||n===wa||n===ba)if(o===be)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ya)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ya)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===bc||n===Sc||n===Ec||n===Tc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===bc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ec)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Tc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ac||n===Cc||n===Rc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ac||n===Cc)return o===be?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Rc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Pc||n===Lc||n===Ic||n===Dc||n===Uc||n===Nc||n===Fc||n===Oc||n===kc||n===Bc||n===zc||n===Hc||n===Gc||n===Vc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Pc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ic)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Dc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Uc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Nc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Fc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===kc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Bc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===zc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Hc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Gc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vc)return o===be?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sa||n===Wc||n===Xc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Sa)return o===be?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wf||n===qc||n===Yc||n===$c)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$c)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===wr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const H2={type:"move"};class Nl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ts,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ts,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ts,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(H2)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ts;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const G2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class W2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new xn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new tn({vertexShader:G2,fragmentShader:V2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ge(new ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class X2 extends Lr{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=new W2,m=e.getContextAttributes();let p=null,M=null;const _=[],x=[],T=new ut;let y=null;const w=new Wn;w.viewport=new He;const E=new Wn;E.viewport=new He;const b=[w,E],S=new hg;let I=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let it=_[Z];return it===void 0&&(it=new Nl,_[Z]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Z){let it=_[Z];return it===void 0&&(it=new Nl,_[Z]=it),it.getGripSpace()},this.getHand=function(Z){let it=_[Z];return it===void 0&&(it=new Nl,_[Z]=it),it.getHandSpace()};function U(Z){const it=x.indexOf(Z.inputSource);if(it===-1)return;const yt=_[it];yt!==void 0&&(yt.update(Z.inputSource,Z.frame,c||o),yt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function z(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",W);for(let Z=0;Z<_.length;Z++){const it=x[Z];it!==null&&(x[Z]=null,_[Z].disconnect(it))}I=null,O=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,M=null,ye.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",z),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0){const it={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new $n(f.framebufferWidth,f.framebufferHeight,{format:Nn,type:fi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let it=null,yt=null,ht=null;m.depth&&(ht=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=m.stencil?br:mr,yt=m.stencil?wr:Ls);const Ft={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Ft),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new $n(d.textureWidth,d.textureHeight,{format:Nn,type:fi,depthTexture:new Uf(d.textureWidth,d.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ye.setContext(s),ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function W(Z){for(let it=0;it<Z.removed.length;it++){const yt=Z.removed[it],ht=x.indexOf(yt);ht>=0&&(x[ht]=null,_[ht].disconnect(yt))}for(let it=0;it<Z.added.length;it++){const yt=Z.added[it];let ht=x.indexOf(yt);if(ht===-1){for(let Zt=0;Zt<_.length;Zt++)if(Zt>=x.length){x.push(yt),ht=Zt;break}else if(x[Zt]===null){x[Zt]=yt,ht=Zt;break}if(ht===-1)break}const Ft=_[ht];Ft&&Ft.connect(yt)}}const $=new N,et=new N;function Y(Z,it,yt){$.setFromMatrixPosition(it.matrixWorld),et.setFromMatrixPosition(yt.matrixWorld);const ht=$.distanceTo(et),Ft=it.projectionMatrix.elements,Zt=yt.projectionMatrix.elements,ie=Ft[14]/(Ft[10]-1),Be=Ft[14]/(Ft[10]+1),ce=(Ft[9]+1)/Ft[5],Xe=(Ft[9]-1)/Ft[5],F=(Ft[8]-1)/Ft[0],kn=(Zt[8]+1)/Zt[0],oe=ie*F,ae=ie*kn,Dt=ht/(-F+kn),Pe=Dt*-F;if(it.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Pe),Z.translateZ(Dt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ft[10]===-1)Z.projectionMatrix.copy(it.projectionMatrix),Z.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const Ut=ie+Dt,D=Be+Dt,R=oe-Pe,V=ae+(ht-Pe),Q=ce*Be/D*Ut,nt=Xe*Be/D*Ut;Z.projectionMatrix.makePerspective(R,V,Q,nt,Ut,D),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function rt(Z,it){it===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(it.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let it=Z.near,yt=Z.far;v.texture!==null&&(v.depthNear>0&&(it=v.depthNear),v.depthFar>0&&(yt=v.depthFar)),S.near=E.near=w.near=it,S.far=E.far=w.far=yt,(I!==S.near||O!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),I=S.near,O=S.far),w.layers.mask=Z.layers.mask|2,E.layers.mask=Z.layers.mask|4,S.layers.mask=w.layers.mask|E.layers.mask;const ht=Z.parent,Ft=S.cameras;rt(S,ht);for(let Zt=0;Zt<Ft.length;Zt++)rt(Ft[Zt],ht);Ft.length===2?Y(S,w,E):S.projectionMatrix.copy(w.projectionMatrix),xt(Z,S,ht)};function xt(Z,it,yt){yt===null?Z.matrix.copy(it.matrixWorld):(Z.matrix.copy(yt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(it.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(it.projectionMatrix),Z.projectionMatrixInverse.copy(it.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=_o*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let Tt=null;function $t(Z,it){if(h=it.getViewerPose(c||o),g=it,h!==null){const yt=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let ht=!1;yt.length!==S.cameras.length&&(S.cameras.length=0,ht=!0);for(let Zt=0;Zt<yt.length;Zt++){const ie=yt[Zt];let Be=null;if(f!==null)Be=f.getViewport(ie);else{const Xe=u.getViewSubImage(d,ie);Be=Xe.viewport,Zt===0&&(t.setRenderTargetTextures(M,Xe.colorTexture,d.ignoreDepthValues?void 0:Xe.depthStencilTexture),t.setRenderTarget(M))}let ce=b[Zt];ce===void 0&&(ce=new Wn,ce.layers.enable(Zt),ce.viewport=new He,b[Zt]=ce),ce.matrix.fromArray(ie.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(ie.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(Be.x,Be.y,Be.width,Be.height),Zt===0&&(S.matrix.copy(ce.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ht===!0&&S.cameras.push(ce)}const Ft=s.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")){const Zt=u.getDepthInformation(yt[0]);Zt&&Zt.isValid&&Zt.texture&&v.init(t,Zt,s.renderState)}}for(let yt=0;yt<_.length;yt++){const ht=x[yt],Ft=_[yt];ht!==null&&Ft!==void 0&&Ft.update(ht,it,c||o)}Tt&&Tt(Z,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const ye=new zf;ye.setAnimationLoop($t),this.setAnimationLoop=function(Z){Tt=Z},this.dispose=function(){}}}const gs=new jn,q2=new me;function Y2(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Pf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,_,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===En&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===En&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),_=M.envMap,x=M.envMapRotation;_&&(m.envMap.value=_,gs.copy(x),gs.x*=-1,gs.y*=-1,gs.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),m.envMapRotation.value.setFromMatrix4(q2.makeRotationFromEuler(gs)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===En&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $2(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,_){const x=_.program;n.uniformBlockBinding(M,x)}function c(M,_){let x=s[M.id];x===void 0&&(g(M),x=h(M),s[M.id]=x,M.addEventListener("dispose",m));const T=_.program;n.updateUBOMapping(M,T);const y=t.render.frame;r[M.id]!==y&&(d(M),r[M.id]=y)}function h(M){const _=u();M.__bindingPointIndex=_;const x=i.createBuffer(),T=M.__size,y=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,T,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,x),x}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const _=s[M.id],x=M.uniforms,T=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let y=0,w=x.length;y<w;y++){const E=Array.isArray(x[y])?x[y]:[x[y]];for(let b=0,S=E.length;b<S;b++){const I=E[b];if(f(I,y,b,T)===!0){const O=I.__offset,U=Array.isArray(I.value)?I.value:[I.value];let z=0;for(let W=0;W<U.length;W++){const $=U[W],et=v($);typeof $=="number"||typeof $=="boolean"?(I.__data[0]=$,i.bufferSubData(i.UNIFORM_BUFFER,O+z,I.__data)):$.isMatrix3?(I.__data[0]=$.elements[0],I.__data[1]=$.elements[1],I.__data[2]=$.elements[2],I.__data[3]=0,I.__data[4]=$.elements[3],I.__data[5]=$.elements[4],I.__data[6]=$.elements[5],I.__data[7]=0,I.__data[8]=$.elements[6],I.__data[9]=$.elements[7],I.__data[10]=$.elements[8],I.__data[11]=0):($.toArray(I.__data,z),z+=et.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,_,x,T){const y=M.value,w=_+"_"+x;if(T[w]===void 0)return typeof y=="number"||typeof y=="boolean"?T[w]=y:T[w]=y.clone(),!0;{const E=T[w];if(typeof y=="number"||typeof y=="boolean"){if(E!==y)return T[w]=y,!0}else if(E.equals(y)===!1)return E.copy(y),!0}return!1}function g(M){const _=M.uniforms;let x=0;const T=16;for(let w=0,E=_.length;w<E;w++){const b=Array.isArray(_[w])?_[w]:[_[w]];for(let S=0,I=b.length;S<I;S++){const O=b[S],U=Array.isArray(O.value)?O.value:[O.value];for(let z=0,W=U.length;z<W;z++){const $=U[z],et=v($),Y=x%T,rt=Y%et.boundary,xt=Y+rt;x+=rt,xt!==0&&T-xt<et.storage&&(x+=T-xt),O.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=et.storage}}}const y=x%T;return y>0&&(x+=T-y),M.__size=x,M.__cache={},this}function v(M){const _={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=48,_.storage=48):M.isMatrix4?(_.boundary=64,_.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),_}function m(M){const _=M.target;_.removeEventListener("dispose",m);const x=o.indexOf(_.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class j2{constructor(t={}){const{canvas:e=fm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const M=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Cn,this.toneMapping=is,this.toneMappingExposure=1;const x=this;let T=!1,y=0,w=0,E=null,b=-1,S=null;const I=new He,O=new He;let U=null;const z=new ct(0);let W=0,$=e.width,et=e.height,Y=1,rt=null,xt=null;const Tt=new He(0,0,$,et),$t=new He(0,0,$,et);let ye=!1;const Z=new Mh;let it=!1,yt=!1;const ht=new me,Ft=new me,Zt=new N,ie=new He,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ce=!1;function Xe(){return E===null?Y:1}let F=n;function kn(P,B){return e.getContext(P,B)}try{const P={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${rh}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),F===null){const B="webgl2";if(F=kn(B,P),F===null)throw kn(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let oe,ae,Dt,Pe,Ut,D,R,V,Q,nt,J,Pt,mt,bt,he,ot,St,Bt,Wt,Et,le,te,Ce,k;function ft(){oe=new s_(F),oe.init(),te=new z2(F,oe),ae=new Jv(F,oe,t,te),Dt=new k2(F,oe),ae.reverseDepthBuffer&&d&&Dt.buffers.depth.setReversed(!0),Pe=new a_(F),Ut=new E2,D=new B2(F,oe,Dt,Ut,ae,te,Pe),R=new t_(x),V=new i_(x),Q=new pg(F),Ce=new Kv(F,Q),nt=new r_(F,Q,Pe,Ce),J=new c_(F,nt,Q,Pe),Wt=new l_(F,ae,D),ot=new Qv(Ut),Pt=new S2(x,R,V,oe,ae,Ce,ot),mt=new Y2(x,Ut),bt=new A2,he=new D2(oe),Bt=new jv(x,R,V,Dt,J,f,l),St=new F2(x,J,ae),k=new $2(F,Pe,ae,Dt),Et=new Zv(F,oe,Pe),le=new o_(F,oe,Pe),Pe.programs=Pt.programs,x.capabilities=ae,x.extensions=oe,x.properties=Ut,x.renderLists=bt,x.shadowMap=St,x.state=Dt,x.info=Pe}ft();const K=new X2(x,F);this.xr=K,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const P=oe.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=oe.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(P){P!==void 0&&(Y=P,this.setSize($,et,!1))},this.getSize=function(P){return P.set($,et)},this.setSize=function(P,B,X=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=P,et=B,e.width=Math.floor(P*Y),e.height=Math.floor(B*Y),X===!0&&(e.style.width=P+"px",e.style.height=B+"px"),this.setViewport(0,0,P,B)},this.getDrawingBufferSize=function(P){return P.set($*Y,et*Y).floor()},this.setDrawingBufferSize=function(P,B,X){$=P,et=B,Y=X,e.width=Math.floor(P*X),e.height=Math.floor(B*X),this.setViewport(0,0,P,B)},this.getCurrentViewport=function(P){return P.copy(I)},this.getViewport=function(P){return P.copy(Tt)},this.setViewport=function(P,B,X,q){P.isVector4?Tt.set(P.x,P.y,P.z,P.w):Tt.set(P,B,X,q),Dt.viewport(I.copy(Tt).multiplyScalar(Y).round())},this.getScissor=function(P){return P.copy($t)},this.setScissor=function(P,B,X,q){P.isVector4?$t.set(P.x,P.y,P.z,P.w):$t.set(P,B,X,q),Dt.scissor(O.copy($t).multiplyScalar(Y).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(P){Dt.setScissorTest(ye=P)},this.setOpaqueSort=function(P){rt=P},this.setTransparentSort=function(P){xt=P},this.getClearColor=function(P){return P.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor.apply(Bt,arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha.apply(Bt,arguments)},this.clear=function(P=!0,B=!0,X=!0){let q=0;if(P){let H=!1;if(E!==null){const st=E.texture.format;H=st===ph||st===fh||st===dh}if(H){const st=E.texture.type,pt=st===fi||st===Ls||st===vo||st===wr||st===ch||st===hh,Mt=Bt.getClearColor(),At=Bt.getClearAlpha(),Xt=Mt.r,jt=Mt.g,Ot=Mt.b;pt?(g[0]=Xt,g[1]=jt,g[2]=Ot,g[3]=At,F.clearBufferuiv(F.COLOR,0,g)):(v[0]=Xt,v[1]=jt,v[2]=Ot,v[3]=At,F.clearBufferiv(F.COLOR,0,v))}else q|=F.COLOR_BUFFER_BIT}B&&(q|=F.DEPTH_BUFFER_BIT),X&&(q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Bt.dispose(),bt.dispose(),he.dispose(),Ut.dispose(),R.dispose(),V.dispose(),J.dispose(),Ce.dispose(),k.dispose(),Pt.dispose(),K.dispose(),K.removeEventListener("sessionstart",kh),K.removeEventListener("sessionend",Bh),cs.stop()};function tt(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const P=Pe.autoReset,B=St.enabled,X=St.autoUpdate,q=St.needsUpdate,H=St.type;ft(),Pe.autoReset=P,St.enabled=B,St.autoUpdate=X,St.needsUpdate=q,St.type=H}function gt(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Jt(P){const B=P.target;B.removeEventListener("dispose",Jt),Ve(B)}function Ve(P){un(P),Ut.remove(P)}function un(P){const B=Ut.get(P).programs;B!==void 0&&(B.forEach(function(X){Pt.releaseProgram(X)}),P.isShaderMaterial&&Pt.releaseShaderCache(P))}this.renderBufferDirect=function(P,B,X,q,H,st){B===null&&(B=Be);const pt=H.isMesh&&H.matrixWorld.determinant()<0,Mt=l0(P,B,X,q,H);Dt.setMaterial(q,pt);let At=X.index,Xt=1;if(q.wireframe===!0){if(At=nt.getWireframeAttribute(X),At===void 0)return;Xt=2}const jt=X.drawRange,Ot=X.attributes.position;let ue=jt.start*Xt,ve=(jt.start+jt.count)*Xt;st!==null&&(ue=Math.max(ue,st.start*Xt),ve=Math.min(ve,(st.start+st.count)*Xt)),At!==null?(ue=Math.max(ue,0),ve=Math.min(ve,At.count)):Ot!=null&&(ue=Math.max(ue,0),ve=Math.min(ve,Ot.count));const je=ve-ue;if(je<0||je===1/0)return;Ce.setup(H,q,Mt,X,At);let We,fe=Et;if(At!==null&&(We=Q.get(At),fe=le,fe.setIndex(We)),H.isMesh)q.wireframe===!0?(Dt.setLineWidth(q.wireframeLinewidth*Xe()),fe.setMode(F.LINES)):fe.setMode(F.TRIANGLES);else if(H.isLine){let kt=q.linewidth;kt===void 0&&(kt=1),Dt.setLineWidth(kt*Xe()),H.isLineSegments?fe.setMode(F.LINES):H.isLineLoop?fe.setMode(F.LINE_LOOP):fe.setMode(F.LINE_STRIP)}else H.isPoints?fe.setMode(F.POINTS):H.isSprite&&fe.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)fe.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(oe.get("WEBGL_multi_draw"))fe.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const kt=H._multiDrawStarts,on=H._multiDrawCounts,_e=H._multiDrawCount,Zn=At?Q.get(At).bytesPerElement:1,Os=Ut.get(q).currentProgram.getUniforms();for(let Pn=0;Pn<_e;Pn++)Os.setValue(F,"_gl_DrawID",Pn),fe.render(kt[Pn]/Zn,on[Pn])}else if(H.isInstancedMesh)fe.renderInstances(ue,je,H.count);else if(X.isInstancedBufferGeometry){const kt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,on=Math.min(X.instanceCount,kt);fe.renderInstances(ue,je,on)}else fe.render(ue,je)};function Me(P,B,X){P.transparent===!0&&P.side===ii&&P.forceSinglePass===!1?(P.side=En,P.needsUpdate=!0,Ao(P,B,X),P.side=ki,P.needsUpdate=!0,Ao(P,B,X),P.side=ii):Ao(P,B,X)}this.compile=function(P,B,X=null){X===null&&(X=P),p=he.get(X),p.init(B),_.push(p),X.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),P!==X&&P.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const q=new Set;return P.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const st=H.material;if(st)if(Array.isArray(st))for(let pt=0;pt<st.length;pt++){const Mt=st[pt];Me(Mt,X,H),q.add(Mt)}else Me(st,X,H),q.add(st)}),_.pop(),p=null,q},this.compileAsync=function(P,B,X=null){const q=this.compile(P,B,X);return new Promise(H=>{function st(){if(q.forEach(function(pt){Ut.get(pt).currentProgram.isReady()&&q.delete(pt)}),q.size===0){H(P);return}setTimeout(st,10)}oe.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let Kn=null;function _i(P){Kn&&Kn(P)}function kh(){cs.stop()}function Bh(){cs.start()}const cs=new zf;cs.setAnimationLoop(_i),typeof self<"u"&&cs.setContext(self),this.setAnimationLoop=function(P){Kn=P,K.setAnimationLoop(P),P===null?cs.stop():cs.start()},K.addEventListener("sessionstart",kh),K.addEventListener("sessionend",Bh),this.render=function(P,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(B),B=K.getCamera()),P.isScene===!0&&P.onBeforeRender(x,P,B,E),p=he.get(P,_.length),p.init(B),_.push(p),Ft.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Z.setFromProjectionMatrix(Ft),yt=this.localClippingEnabled,it=ot.init(this.clippingPlanes,yt),m=bt.get(P,M.length),m.init(),M.push(m),K.enabled===!0&&K.isPresenting===!0){const st=x.xr.getDepthSensingMesh();st!==null&&Za(st,B,-1/0,x.sortObjects)}Za(P,B,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(rt,xt),ce=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,ce&&Bt.addToRenderList(m,P),this.info.render.frame++,it===!0&&ot.beginShadows();const X=p.state.shadowsArray;St.render(X,P,B),it===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,H=m.transmissive;if(p.setupLights(),B.isArrayCamera){const st=B.cameras;if(H.length>0)for(let pt=0,Mt=st.length;pt<Mt;pt++){const At=st[pt];Hh(q,H,P,At)}ce&&Bt.render(P);for(let pt=0,Mt=st.length;pt<Mt;pt++){const At=st[pt];zh(m,P,At,At.viewport)}}else H.length>0&&Hh(q,H,P,B),ce&&Bt.render(P),zh(m,P,B);E!==null&&(D.updateMultisampleRenderTarget(E),D.updateRenderTargetMipmap(E)),P.isScene===!0&&P.onAfterRender(x,P,B),Ce.resetDefaultState(),b=-1,S=null,_.pop(),_.length>0?(p=_[_.length-1],it===!0&&ot.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Za(P,B,X,q){if(P.visible===!1)return;if(P.layers.test(B.layers)){if(P.isGroup)X=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(B);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||Z.intersectsSprite(P)){q&&ie.setFromMatrixPosition(P.matrixWorld).applyMatrix4(Ft);const pt=J.update(P),Mt=P.material;Mt.visible&&m.push(P,pt,Mt,X,ie.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||Z.intersectsObject(P))){const pt=J.update(P),Mt=P.material;if(q&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),ie.copy(P.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),ie.copy(pt.boundingSphere.center)),ie.applyMatrix4(P.matrixWorld).applyMatrix4(Ft)),Array.isArray(Mt)){const At=pt.groups;for(let Xt=0,jt=At.length;Xt<jt;Xt++){const Ot=At[Xt],ue=Mt[Ot.materialIndex];ue&&ue.visible&&m.push(P,pt,ue,X,ie.z,Ot)}}else Mt.visible&&m.push(P,pt,Mt,X,ie.z,null)}}const st=P.children;for(let pt=0,Mt=st.length;pt<Mt;pt++)Za(st[pt],B,X,q)}function zh(P,B,X,q){const H=P.opaque,st=P.transmissive,pt=P.transparent;p.setupLightsView(X),it===!0&&ot.setGlobalState(x.clippingPlanes,X),q&&Dt.viewport(I.copy(q)),H.length>0&&To(H,B,X),st.length>0&&To(st,B,X),pt.length>0&&To(pt,B,X),Dt.buffers.depth.setTest(!0),Dt.buffers.depth.setMask(!0),Dt.buffers.color.setMask(!0),Dt.setPolygonOffset(!1)}function Hh(P,B,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new $n(1,1,{generateMipmaps:!0,type:oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float")?ui:fi,minFilter:Es,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));const st=p.state.transmissionRenderTarget[q.id],pt=q.viewport||I;st.setSize(pt.z,pt.w);const Mt=x.getRenderTarget();x.setRenderTarget(st),x.getClearColor(z),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),ce&&Bt.render(X);const At=x.toneMapping;x.toneMapping=is;const Xt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),it===!0&&ot.setGlobalState(x.clippingPlanes,q),To(P,X,q),D.updateMultisampleRenderTarget(st),D.updateRenderTargetMipmap(st),oe.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let Ot=0,ue=B.length;Ot<ue;Ot++){const ve=B[Ot],je=ve.object,We=ve.geometry,fe=ve.material,kt=ve.group;if(fe.side===ii&&je.layers.test(q.layers)){const on=fe.side;fe.side=En,fe.needsUpdate=!0,Gh(je,X,q,We,fe,kt),fe.side=on,fe.needsUpdate=!0,jt=!0}}jt===!0&&(D.updateMultisampleRenderTarget(st),D.updateRenderTargetMipmap(st))}x.setRenderTarget(Mt),x.setClearColor(z,W),Xt!==void 0&&(q.viewport=Xt),x.toneMapping=At}function To(P,B,X){const q=B.isScene===!0?B.overrideMaterial:null;for(let H=0,st=P.length;H<st;H++){const pt=P[H],Mt=pt.object,At=pt.geometry,Xt=q===null?pt.material:q,jt=pt.group;Mt.layers.test(X.layers)&&Gh(Mt,B,X,At,Xt,jt)}}function Gh(P,B,X,q,H,st){P.onBeforeRender(x,B,X,q,H,st),P.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),H.onBeforeRender(x,B,X,q,P,st),H.transparent===!0&&H.side===ii&&H.forceSinglePass===!1?(H.side=En,H.needsUpdate=!0,x.renderBufferDirect(X,B,q,H,P,st),H.side=ki,H.needsUpdate=!0,x.renderBufferDirect(X,B,q,H,P,st),H.side=ii):x.renderBufferDirect(X,B,q,H,P,st),P.onAfterRender(x,B,X,q,H,st)}function Ao(P,B,X){B.isScene!==!0&&(B=Be);const q=Ut.get(P),H=p.state.lights,st=p.state.shadowsArray,pt=H.state.version,Mt=Pt.getParameters(P,H.state,st,B,X),At=Pt.getProgramCacheKey(Mt);let Xt=q.programs;q.environment=P.isMeshStandardMaterial?B.environment:null,q.fog=B.fog,q.envMap=(P.isMeshStandardMaterial?V:R).get(P.envMap||q.environment),q.envMapRotation=q.environment!==null&&P.envMap===null?B.environmentRotation:P.envMapRotation,Xt===void 0&&(P.addEventListener("dispose",Jt),Xt=new Map,q.programs=Xt);let jt=Xt.get(At);if(jt!==void 0){if(q.currentProgram===jt&&q.lightsStateVersion===pt)return Wh(P,Mt),jt}else Mt.uniforms=Pt.getUniforms(P),P.onBeforeCompile(Mt,x),jt=Pt.acquireProgram(Mt,At),Xt.set(At,jt),q.uniforms=Mt.uniforms;const Ot=q.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Ot.clippingPlanes=ot.uniform),Wh(P,Mt),q.needsLights=h0(P),q.lightsStateVersion=pt,q.needsLights&&(Ot.ambientLightColor.value=H.state.ambient,Ot.lightProbe.value=H.state.probe,Ot.directionalLights.value=H.state.directional,Ot.directionalLightShadows.value=H.state.directionalShadow,Ot.spotLights.value=H.state.spot,Ot.spotLightShadows.value=H.state.spotShadow,Ot.rectAreaLights.value=H.state.rectArea,Ot.ltc_1.value=H.state.rectAreaLTC1,Ot.ltc_2.value=H.state.rectAreaLTC2,Ot.pointLights.value=H.state.point,Ot.pointLightShadows.value=H.state.pointShadow,Ot.hemisphereLights.value=H.state.hemi,Ot.directionalShadowMap.value=H.state.directionalShadowMap,Ot.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ot.spotShadowMap.value=H.state.spotShadowMap,Ot.spotLightMatrix.value=H.state.spotLightMatrix,Ot.spotLightMap.value=H.state.spotLightMap,Ot.pointShadowMap.value=H.state.pointShadowMap,Ot.pointShadowMatrix.value=H.state.pointShadowMatrix),q.currentProgram=jt,q.uniformsList=null,jt}function Vh(P){if(P.uniformsList===null){const B=P.currentProgram.getUniforms();P.uniformsList=Ea.seqWithValue(B.seq,P.uniforms)}return P.uniformsList}function Wh(P,B){const X=Ut.get(P);X.outputColorSpace=B.outputColorSpace,X.batching=B.batching,X.batchingColor=B.batchingColor,X.instancing=B.instancing,X.instancingColor=B.instancingColor,X.instancingMorph=B.instancingMorph,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function l0(P,B,X,q,H){B.isScene!==!0&&(B=Be),D.resetTextureUnits();const st=B.fog,pt=q.isMeshStandardMaterial?B.environment:null,Mt=E===null?x.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Sr,At=(q.isMeshStandardMaterial?V:R).get(q.envMap||pt),Xt=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,jt=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ot=!!X.morphAttributes.position,ue=!!X.morphAttributes.normal,ve=!!X.morphAttributes.color;let je=is;q.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(je=x.toneMapping);const We=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,fe=We!==void 0?We.length:0,kt=Ut.get(q),on=p.state.lights;if(it===!0&&(yt===!0||P!==S)){const Mn=P===S&&q.id===b;ot.setState(q,P,Mn)}let _e=!1;q.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==on.state.version||kt.outputColorSpace!==Mt||H.isBatchedMesh&&kt.batching===!1||!H.isBatchedMesh&&kt.batching===!0||H.isBatchedMesh&&kt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&kt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&kt.instancing===!1||!H.isInstancedMesh&&kt.instancing===!0||H.isSkinnedMesh&&kt.skinning===!1||!H.isSkinnedMesh&&kt.skinning===!0||H.isInstancedMesh&&kt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&kt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&kt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&kt.instancingMorph===!1&&H.morphTexture!==null||kt.envMap!==At||q.fog===!0&&kt.fog!==st||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==ot.numPlanes||kt.numIntersection!==ot.numIntersection)||kt.vertexAlphas!==Xt||kt.vertexTangents!==jt||kt.morphTargets!==Ot||kt.morphNormals!==ue||kt.morphColors!==ve||kt.toneMapping!==je||kt.morphTargetsCount!==fe)&&(_e=!0):(_e=!0,kt.__version=q.version);let Zn=kt.currentProgram;_e===!0&&(Zn=Ao(q,B,H));let Os=!1,Pn=!1,Br=!1;const Oe=Zn.getUniforms(),Bn=kt.uniforms;if(Dt.useProgram(Zn.program)&&(Os=!0,Pn=!0,Br=!0),q.id!==b&&(b=q.id,Pn=!0),Os||S!==P){Dt.buffers.depth.getReversed()?(ht.copy(P.projectionMatrix),mm(ht),gm(ht),Oe.setValue(F,"projectionMatrix",ht)):Oe.setValue(F,"projectionMatrix",P.projectionMatrix),Oe.setValue(F,"viewMatrix",P.matrixWorldInverse);const An=Oe.map.cameraPosition;An!==void 0&&An.setValue(F,Zt.setFromMatrixPosition(P.matrixWorld)),ae.logarithmicDepthBuffer&&Oe.setValue(F,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Oe.setValue(F,"isOrthographic",P.isOrthographicCamera===!0),S!==P&&(S=P,Pn=!0,Br=!0)}if(H.isSkinnedMesh){Oe.setOptional(F,H,"bindMatrix"),Oe.setOptional(F,H,"bindMatrixInverse");const Mn=H.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),Oe.setValue(F,"boneTexture",Mn.boneTexture,D))}H.isBatchedMesh&&(Oe.setOptional(F,H,"batchingTexture"),Oe.setValue(F,"batchingTexture",H._matricesTexture,D),Oe.setOptional(F,H,"batchingIdTexture"),Oe.setValue(F,"batchingIdTexture",H._indirectTexture,D),Oe.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&Oe.setValue(F,"batchingColorTexture",H._colorsTexture,D));const zn=X.morphAttributes;if((zn.position!==void 0||zn.normal!==void 0||zn.color!==void 0)&&Wt.update(H,X,Zn),(Pn||kt.receiveShadow!==H.receiveShadow)&&(kt.receiveShadow=H.receiveShadow,Oe.setValue(F,"receiveShadow",H.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Bn.envMap.value=At,Bn.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&B.environment!==null&&(Bn.envMapIntensity.value=B.environmentIntensity),Pn&&(Oe.setValue(F,"toneMappingExposure",x.toneMappingExposure),kt.needsLights&&c0(Bn,Br),st&&q.fog===!0&&mt.refreshFogUniforms(Bn,st),mt.refreshMaterialUniforms(Bn,q,Y,et,p.state.transmissionRenderTarget[P.id]),Ea.upload(F,Vh(kt),Bn,D)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Ea.upload(F,Vh(kt),Bn,D),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Oe.setValue(F,"center",H.center),Oe.setValue(F,"modelViewMatrix",H.modelViewMatrix),Oe.setValue(F,"normalMatrix",H.normalMatrix),Oe.setValue(F,"modelMatrix",H.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const Mn=q.uniformsGroups;for(let An=0,Ja=Mn.length;An<Ja;An++){const hs=Mn[An];k.update(hs,Zn),k.bind(hs,Zn)}}return Zn}function c0(P,B){P.ambientLightColor.needsUpdate=B,P.lightProbe.needsUpdate=B,P.directionalLights.needsUpdate=B,P.directionalLightShadows.needsUpdate=B,P.pointLights.needsUpdate=B,P.pointLightShadows.needsUpdate=B,P.spotLights.needsUpdate=B,P.spotLightShadows.needsUpdate=B,P.rectAreaLights.needsUpdate=B,P.hemisphereLights.needsUpdate=B}function h0(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(P,B,X){Ut.get(P.texture).__webglTexture=B,Ut.get(P.depthTexture).__webglTexture=X;const q=Ut.get(P);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,B){const X=Ut.get(P);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(P,B=0,X=0){E=P,y=B,w=X;let q=!0,H=null,st=!1,pt=!1;if(P){const At=Ut.get(P);if(At.__useDefaultFramebuffer!==void 0)Dt.bindFramebuffer(F.FRAMEBUFFER,null),q=!1;else if(At.__webglFramebuffer===void 0)D.setupRenderTarget(P);else if(At.__hasExternalTextures)D.rebindTextures(P,Ut.get(P.texture).__webglTexture,Ut.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const Ot=P.depthTexture;if(At.__boundDepthTexture!==Ot){if(Ot!==null&&Ut.has(Ot)&&(P.width!==Ot.image.width||P.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(P)}}const Xt=P.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(pt=!0);const jt=Ut.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(jt[B])?H=jt[B][X]:H=jt[B],st=!0):P.samples>0&&D.useMultisampledRTT(P)===!1?H=Ut.get(P).__webglMultisampledFramebuffer:Array.isArray(jt)?H=jt[X]:H=jt,I.copy(P.viewport),O.copy(P.scissor),U=P.scissorTest}else I.copy(Tt).multiplyScalar(Y).floor(),O.copy($t).multiplyScalar(Y).floor(),U=ye;if(Dt.bindFramebuffer(F.FRAMEBUFFER,H)&&q&&Dt.drawBuffers(P,H),Dt.viewport(I),Dt.scissor(O),Dt.setScissorTest(U),st){const At=Ut.get(P.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,At.__webglTexture,X)}else if(pt){const At=Ut.get(P.texture),Xt=B||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.__webglTexture,X||0,Xt)}b=-1},this.readRenderTargetPixels=function(P,B,X,q,H,st,pt){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=Ut.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&pt!==void 0&&(Mt=Mt[pt]),Mt){Dt.bindFramebuffer(F.FRAMEBUFFER,Mt);try{const At=P.texture,Xt=At.format,jt=At.type;if(!ae.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ae.textureTypeReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=P.width-q&&X>=0&&X<=P.height-H&&F.readPixels(B,X,q,H,te.convert(Xt),te.convert(jt),st)}finally{const At=E!==null?Ut.get(E).__webglFramebuffer:null;Dt.bindFramebuffer(F.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(P,B,X,q,H,st,pt){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=Ut.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&pt!==void 0&&(Mt=Mt[pt]),Mt){const At=P.texture,Xt=At.format,jt=At.type;if(!ae.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ae.textureTypeReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=P.width-q&&X>=0&&X<=P.height-H){Dt.bindFramebuffer(F.FRAMEBUFFER,Mt);const Ot=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ot),F.bufferData(F.PIXEL_PACK_BUFFER,st.byteLength,F.STREAM_READ),F.readPixels(B,X,q,H,te.convert(Xt),te.convert(jt),0);const ue=E!==null?Ut.get(E).__webglFramebuffer:null;Dt.bindFramebuffer(F.FRAMEBUFFER,ue);const ve=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await pm(F,ve,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ot),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,st),F.deleteBuffer(Ot),F.deleteSync(ve),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,B=null,X=0){P.isTexture!==!0&&(hr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,P=arguments[1]);const q=Math.pow(2,-X),H=Math.floor(P.image.width*q),st=Math.floor(P.image.height*q),pt=B!==null?B.x:0,Mt=B!==null?B.y:0;D.setTexture2D(P,0),F.copyTexSubImage2D(F.TEXTURE_2D,X,0,0,pt,Mt,H,st),Dt.unbindTexture()};const u0=F.createFramebuffer(),d0=F.createFramebuffer();this.copyTextureToTexture=function(P,B,X=null,q=null,H=0,st=null){P.isTexture!==!0&&(hr("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,P=arguments[1],B=arguments[2],st=arguments[3]||0,X=null),st===null&&(H!==0?(hr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),st=H,H=0):st=0);let pt,Mt,At,Xt,jt,Ot,ue,ve,je;const We=P.isCompressedTexture?P.mipmaps[st]:P.image;if(X!==null)pt=X.max.x-X.min.x,Mt=X.max.y-X.min.y,At=X.isBox3?X.max.z-X.min.z:1,Xt=X.min.x,jt=X.min.y,Ot=X.isBox3?X.min.z:0;else{const zn=Math.pow(2,-H);pt=Math.floor(We.width*zn),Mt=Math.floor(We.height*zn),P.isDataArrayTexture?At=We.depth:P.isData3DTexture?At=Math.floor(We.depth*zn):At=1,Xt=0,jt=0,Ot=0}q!==null?(ue=q.x,ve=q.y,je=q.z):(ue=0,ve=0,je=0);const fe=te.convert(B.format),kt=te.convert(B.type);let on;B.isData3DTexture?(D.setTexture3D(B,0),on=F.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(D.setTexture2DArray(B,0),on=F.TEXTURE_2D_ARRAY):(D.setTexture2D(B,0),on=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);const _e=F.getParameter(F.UNPACK_ROW_LENGTH),Zn=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Os=F.getParameter(F.UNPACK_SKIP_PIXELS),Pn=F.getParameter(F.UNPACK_SKIP_ROWS),Br=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,We.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,We.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Xt),F.pixelStorei(F.UNPACK_SKIP_ROWS,jt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ot);const Oe=P.isDataArrayTexture||P.isData3DTexture,Bn=B.isDataArrayTexture||B.isData3DTexture;if(P.isDepthTexture){const zn=Ut.get(P),Mn=Ut.get(B),An=Ut.get(zn.__renderTarget),Ja=Ut.get(Mn.__renderTarget);Dt.bindFramebuffer(F.READ_FRAMEBUFFER,An.__webglFramebuffer),Dt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ja.__webglFramebuffer);for(let hs=0;hs<At;hs++)Oe&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ut.get(P).__webglTexture,H,Ot+hs),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ut.get(B).__webglTexture,st,je+hs)),F.blitFramebuffer(Xt,jt,pt,Mt,ue,ve,pt,Mt,F.DEPTH_BUFFER_BIT,F.NEAREST);Dt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Dt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||P.isRenderTargetTexture||Ut.has(P)){const zn=Ut.get(P),Mn=Ut.get(B);Dt.bindFramebuffer(F.READ_FRAMEBUFFER,u0),Dt.bindFramebuffer(F.DRAW_FRAMEBUFFER,d0);for(let An=0;An<At;An++)Oe?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,zn.__webglTexture,H,Ot+An):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,zn.__webglTexture,H),Bn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Mn.__webglTexture,st,je+An):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Mn.__webglTexture,st),H!==0?F.blitFramebuffer(Xt,jt,pt,Mt,ue,ve,pt,Mt,F.COLOR_BUFFER_BIT,F.NEAREST):Bn?F.copyTexSubImage3D(on,st,ue,ve,je+An,Xt,jt,pt,Mt):F.copyTexSubImage2D(on,st,ue,ve,Xt,jt,pt,Mt);Dt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Dt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Bn?P.isDataTexture||P.isData3DTexture?F.texSubImage3D(on,st,ue,ve,je,pt,Mt,At,fe,kt,We.data):B.isCompressedArrayTexture?F.compressedTexSubImage3D(on,st,ue,ve,je,pt,Mt,At,fe,We.data):F.texSubImage3D(on,st,ue,ve,je,pt,Mt,At,fe,kt,We):P.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,st,ue,ve,pt,Mt,fe,kt,We.data):P.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,st,ue,ve,We.width,We.height,fe,We.data):F.texSubImage2D(F.TEXTURE_2D,st,ue,ve,pt,Mt,fe,kt,We);F.pixelStorei(F.UNPACK_ROW_LENGTH,_e),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Zn),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Os),F.pixelStorei(F.UNPACK_SKIP_ROWS,Pn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Br),st===0&&B.generateMipmaps&&F.generateMipmap(on),Dt.unbindTexture()},this.copyTextureToTexture3D=function(P,B,X=null,q=null,H=0){return P.isTexture!==!0&&(hr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,P=arguments[2],B=arguments[3],H=arguments[4]||0),hr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(P,B,X,q,H)},this.initRenderTarget=function(P){Ut.get(P).__webglFramebuffer===void 0&&D.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?D.setTextureCube(P,0):P.isData3DTexture?D.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?D.setTexture2DArray(P,0):D.setTexture2D(P,0),Dt.unbindTexture()},this.resetState=function(){y=0,w=0,E=null,Dt.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}}const Xf={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Or{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const K2=new Ph(-1,1,1,-1,0,1);class Z2 extends hn{constructor(){super(),this.setAttribute("position",new Ue([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ue([0,2,0,0,2,0],2))}}const J2=new Z2;class Ih{constructor(t){this._mesh=new Ge(J2,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,K2)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class qf extends Or{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof tn?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=xo.clone(t.uniforms),this.material=new tn({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Ih(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class dd extends Or{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Q2 extends Or{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class tx{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new ut);this._width=n.width,this._height=n.height,e=new $n(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ui}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new qf(Xf),this.copyPass.material.blending=Li,this.clock=new ug}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}dd!==void 0&&(o instanceof dd?n=!0:o instanceof Q2&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ut);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ex extends Or{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ct}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const nx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ct(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Tr extends Or{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new ut(t.x,t.y):new ut(256,256),this.clearColor=new ct(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new $n(r,o,{type:ui}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new $n(r,o,{type:ui});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new $n(r,o,{type:ui});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=nx;this.highPassUniforms=xo.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new tn({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ut(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Xf;this.copyUniforms=xo.clone(h.uniforms),this.blendMaterial=new tn({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:hc,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ct,this.oldClearAlpha=1,this.basic=new Nr,this.fsQuad=new Ih(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ut(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Tr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Tr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new tn({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ut(.5,.5)},direction:{value:new ut(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new tn({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Tr.BlurDirectionX=new ut(1,0);Tr.BlurDirectionY=new ut(0,1);const ix={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class sx extends Or{constructor(){super();const t=ix;this.uniforms=xo.clone(t.uniforms),this.material=new ng({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Ih(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},de.getTransfer(this._outputColorSpace)===be&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===lf?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===cf?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===hf?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ah?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===uf?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===df&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Fl=(i,t,e)=>{const n=re((e-i)/(t-i));return n*n*(3-2*n)};function rx(i,t){const e=i.r*.3+i.g*.59+i.b*.11;i.r=Nt(i.r,e,t),i.g=Nt(i.g,e,t),i.b=Nt(i.b,e,t)}function fd(i,t,e){if(e<=t[0].t)return i.copy(t[0].c);for(let n=1;n<t.length;n++)if(e<=t[n].t){const s=t[n-1],r=t[n],o=(e-s.t)/(r.t-s.t);return i.copy(s.c).lerp(r.c,o)}return i.copy(t[t.length-1].c)}const pd=[{t:0,c:new ct(16738854)},{t:.1,c:new ct(16754511)},{t:.28,c:new ct(16769202)},{t:.6,c:new ct(16774370)}],ox=new ct(4029643),ax=new ct(330010),lx=new ct(12442090),cx=new ct(1186611),hx=new ct(16749640),ux=new ct(13624056),dx=new ct(1713216),fx=new ct(10127974),px=new ct(922144),mx=new ct(9414872),gx=new ct(9279390),vx=[new ct(15662057),new ct(16774365),new ct(16771792),new ct(15332095)],Ol=new N,kl=new N,ia=new N,Ei=new N,vs=new N,Bl=new N,zl=new N,Hl=new N,Gl=new ct,ir=new ct,md=new ct,sa=new ct,_x=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,xx=`
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
`,yx={name:"TiltShiftGradeShader",uniforms:{tDiffuse:{value:null},uResolution:{value:new ut(1,1)},uMaxBlur:{value:0},uFocusY:{value:.44},uBand:{value:.13},uVignette:{value:.42},uSat:{value:1.12},uTint:{value:new N(1.05,1,.93)}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
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
  `};class Mx{constructor(t){L(this,"scene",new km);L(this,"camera");L(this,"gl");L(this,"_quality");L(this,"_fps",60);L(this,"_night",0);L(this,"elapsed",0);L(this,"fpsAcc",0);L(this,"fpsFrames",0);L(this,"shakeT",0);L(this,"shakeAmp",0);L(this,"canvas");L(this,"sun");L(this,"hemi");L(this,"sky");L(this,"fogExp");L(this,"bodyDir",new N(.4,.8,.3));L(this,"composer",null);L(this,"bloom",null);L(this,"grade",null);L(this,"output",null);L(this,"skyU",{uSunDir:{value:new N(0,1,0)},uMoonDir:{value:new N(0,-1,0)},uZenith:{value:new ct(4029643)},uHorizon:{value:new ct(12442090)},uSunTint:{value:new ct(16774370)},uNight:{value:0},uGolden:{value:0},uDim:{value:0},uTime:{value:0}});this.canvas=t;const e=navigator.hardwareConcurrency??4,n=navigator.deviceMemory??8;this._quality=e>=6&&n>=6?"high":"medium",this.gl=new j2({canvas:t,antialias:!1,alpha:!1,stencil:!1,powerPreference:"high-performance"}),this.gl.toneMapping=ah,this.gl.toneMappingExposure=1.12,this.gl.outputColorSpace=Cn,this.gl.shadowMap.enabled=!0,this.gl.shadowMap.type=af,this.camera=new Wn(50,1,.5,2400),this.camera.position.set(104,58,116),this.camera.lookAt(64,0,64),this.fogExp=new yh(12375266,.0018),this.scene.fog=this.fogExp,this.hemi=new sg(13624056,10127974,.55),this.scene.add(this.hemi),this.sun=new ag(16774370,3),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-3e-4,this.sun.shadow.normalBias=.5,this.sun.shadow.camera.near=10,this.sun.shadow.camera.far=520,this.scene.add(this.sun),this.scene.add(this.sun.target);const s=new tn({uniforms:this.skyU,vertexShader:_x,fragmentShader:xx,side:En,depthWrite:!1,fog:!1});this.sky=new Ge(new Ya(1e3,32,16),s),this.sky.frustumCulled=!1,this.sky.renderOrder=-100,this.scene.add(this.sky),this.applyQuality(),this.resize()}get nightFactor(){return this._night}get fps(){return this._fps}get quality(){return this._quality}set quality(t){this.setQuality(t)}setQuality(t){t!==this._quality&&(this._quality=t,this.applyQuality())}pixelRatio(){const t=window.devicePixelRatio||1;return this._quality==="high"?Math.min(t,2):this._quality==="medium"?Math.min(t,1.5):1}applyQuality(){const t=this._quality;this.scene.userData.quality=t;const e=t!=="low";this.gl.shadowMap.enabled=e,this.sun.castShadow=e;const n=t==="high"?2048:1024;this.sun.shadow.mapSize.x!==n&&(this.sun.shadow.mapSize.set(n,n),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null)),this.gl.shadowMap.needsUpdate=!0,this.buildPost(),this.resize()}disposePost(){this.bloom&&this.bloom.dispose(),this.grade&&this.grade.dispose(),this.output&&this.output.dispose(),this.composer&&this.composer.dispose(),this.composer=null,this.bloom=null,this.grade=null,this.output=null}buildPost(){if(this.disposePost(),this._quality==="low")return;const t=new $n(2,2,{type:ui,samples:this._quality==="high"?4:0});this.composer=new tx(this.gl,t),this.composer.addPass(new ex(this.scene,this.camera)),this.bloom=new Tr(new ut(window.innerWidth,window.innerHeight),.35,.55,.85),this.composer.addPass(this.bloom),this.grade=new qf(yx),this.composer.addPass(this.grade),this.output=new sx,this.composer.addPass(this.output)}resize(){const t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight,n=this.pixelRatio();this.gl.setPixelRatio(n),this.gl.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.composer&&(this.composer.setPixelRatio(n),this.composer.setSize(t,e)),this.grade&&(this.grade.uniforms.uResolution.value.set(t*n,e*n),this.grade.uniforms.uMaxBlur.value=0)}updateSky(t,e){const n=(t.timeOfDay-.25)*Math.PI*2,s=Math.cos(n),r=Math.sin(n);Ol.set(s,r,.38).normalize(),kl.set(-s,-r,.3).normalize();const o=Fl(-.04,.14,r);this._night=1-o;const a=re(e.intensity);let l=0;switch(e.kind){case"cloudy":l=.3*a;break;case"rain":l=.5*a;break;case"storm":l=.68*a;break;case"snow":l=.42*a;break;case"fog":l=.55*a;break;default:l=0}const c=re(1-Math.abs(r-.08)/.22)*o*(1-l*.8),h=vx[t.season];r>0?(fd(Gl,pd,r),rx(Gl,l*.5),this.sun.color.copy(Gl),this.sun.intensity=Fl(0,.1,r)*(1.25+1.9*re(r))*(1-l*.75),this.bodyDir.copy(Ol)):(this.sun.color.copy(mx),this.sun.intensity=Fl(0,.12,-r)*.62*(1-l*.6),this.bodyDir.copy(kl)),ir.copy(ux).multiply(h),this.hemi.color.copy(dx).lerp(ir,o),this.hemi.groundColor.copy(px).lerp(fx,o),this.hemi.intensity=(.5+.28*o)*(1-l*.35),ir.copy(ox).multiply(h),md.copy(ax).lerp(ir,o),ir.copy(lx).multiply(h),sa.copy(cx).lerp(ir,o),sa.lerp(hx,c*.7);const u=this.skyU;u.uSunDir.value.copy(Ol),u.uMoonDir.value.copy(kl),u.uZenith.value.copy(md),u.uHorizon.value.copy(sa),fd(u.uSunTint.value,pd,Math.max(r,0)),u.uNight.value=this._night,u.uGolden.value=c,u.uDim.value=l,this.fogExp.color.copy(sa).lerp(gx,l*.5),this.fogExp.density=.0016+l*.0038+(e.kind==="fog"?.016*a:0)+this._night*6e-4,this.gl.toneMappingExposure=1.14-.22*this._night,this.bloom&&(this.bloom.threshold=Nt(.85,.55,this._night),this.bloom.strength=Nt(.32,.7,this._night)+c*.08),this.grade&&(this.grade.uniforms.uTint.value.set(Nt(1.05+c*.06,.92,this._night),Nt(1,.97,this._night),Nt(.93-c*.04,1.1,this._night)),this.grade.uniforms.uSat.value=1.14-l*.28-this._night*.08)}fitShadow(){if(!this.sun.castShadow)return;const t=this.camera;ia.set(0,0,-1).applyQuaternion(t.quaternion);let e=60;ia.y<-.05&&(e=Vt(-t.position.y/ia.y,6,320)),Ei.copy(t.position).addScaledVector(ia,e),Ei.x=Vt(Ei.x,-24,152),Ei.z=Vt(Ei.z,-24,152),Ei.y=0;const n=Vt(Math.ceil(e*1.05/12)*12,24,168),s=this.sun.shadow.camera;Math.abs(s.right-n)>.5&&(s.left=-n,s.right=n,s.top=n,s.bottom=-n,s.updateProjectionMatrix());const r=this.bodyDir;vs.set(0,1,0).cross(r),vs.lengthSq()<1e-4&&vs.set(1,0,0),vs.normalize(),Bl.copy(r).cross(vs).normalize();const o=n*2/this.sun.shadow.mapSize.x,a=Math.round(Ei.dot(vs)/o)*o,l=Math.round(Ei.dot(Bl)/o)*o,c=Ei.dot(r);zl.copy(vs).multiplyScalar(a).addScaledVector(Bl,l).addScaledVector(r,c),this.sun.target.position.copy(zl),this.sun.position.copy(zl).addScaledVector(r,240),this.sun.target.updateMatrixWorld()}render(t){this.elapsed+=t,this.fpsFrames++,this.fpsAcc+=t,this.fpsAcc>=1&&(this._fps=this.fpsFrames/this.fpsAcc,this.fpsFrames=0,this.fpsAcc=0),this.camera.updateMatrixWorld(),this.sky.position.copy(this.camera.position),this.skyU.uTime.value=this.elapsed,this.fitShadow();let e=!1;if(this.shakeT>0){this.shakeT=Math.max(0,this.shakeT-t);const n=this.shakeT/.6,s=this.shakeAmp*n*n*.55;Hl.set(Math.sin(this.elapsed*61.7)*s,Math.sin(this.elapsed*47.3+1.7)*s*.6,Math.cos(this.elapsed*53.9+.6)*s),this.camera.position.add(Hl),this.camera.updateMatrixWorld(),e=!0,this.shakeT===0&&(this.shakeAmp=0)}this.composer?this.composer.render(t):this.gl.render(this.scene,this.camera),e&&(this.camera.position.sub(Hl),this.camera.updateMatrixWorld())}shake(t){this.shakeAmp=Math.max(this.shakeAmp,Vt(t,0,4)),this.shakeT=.6}dispose(){this.disposePost(),this.scene.remove(this.sun,this.sun.target,this.hemi,this.sky),this.sky.material.dispose(),this.sky.geometry.dispose(),this.sun.shadow.map&&this.sun.shadow.map.dispose(),this.sun.dispose(),this.hemi.dispose(),this.gl.dispose()}}const wn=i=>new ct(i),an={grass:wn(7645515),grassAlt:wn(9289051),grassDry:wn(11121759),forest:wn(5078843),forestDeep:wn(3959601),sand:wn(15325608),sandWet:wn(13350532),rock:wn(9604225),rockDark:wn(7301471),snow:wn(16120059),dirt:wn(11242340),bedShallow:wn(14469524),bedDeep:wn(2376012),cliff:wn(8747886),cliffLow:wn(5130304)},ja=qt*qt*20,wx=qt*qt*30,ra=new Float32Array(ja*3),oa=new Float32Array(ja*3),aa=new Float32Array(ja*3),gd=new Float32Array(ja),_s=new Uint16Array(wx),qi=new ct,qe=new ct,bx=new N(.45,.72,.28).normalize(),Jr=new N,vd=7*Qe,_d=2.6,Sx=-9*Qe;function la(i,t,e,n){const s=re((t-i)/(Qe*2)),r=re((e-i)/(Qe*2)),o=re((n-i)/(Qe*2)),a=s+r+o*(s+r>1.2?.2:.55),l=(t<i-1e-4?1:0)+(e<i-1e-4?1:0);return Math.max(.5,1-a*.15)+l*.03}function ca(i,t){return .955+.09*wt(i,t,23)}const Yf=`
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
`,Ex=`
  uniform float uTime;
  varying vec3 vWorld;
  ${Yf}
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vec3 w = swell(wp.xz, uTime);
    wp.y += w.x;
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,Tx=`
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
  ${Yf}

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
`;class Ax{constructor(t,e){L(this,"scene");L(this,"grid");L(this,"group",new Ts);L(this,"chunks",new Array(Se*Un).fill(null));L(this,"groundMat");L(this,"waterMesh");L(this,"waterMat");L(this,"infoTex");L(this,"infoData");L(this,"blankTex");L(this,"shoreDist",new Int16Array(C*at));L(this,"bfs",new Int32Array(C*at));L(this,"sun",null);L(this,"sunSearched",!1);L(this,"sunRetry",0);L(this,"disposed",!1);L(this,"highlightTiles");L(this,"highlightMat");L(this,"highlightMatrix",new me);L(this,"infoDirty",!0);L(this,"gu",{uOverlay:{value:null},uOverlayStrength:{value:0},uHighlight:{value:new He(0,0,0,0)},uHighlightColor:{value:new ct(3989631)},uHighlightOn:{value:0},uTime:{value:0}});this.scene=t,this.grid=e,this.blankTex=new Fa(new Uint8Array([0,0,0,0]),1,1),this.blankTex.needsUpdate=!0,this.gu.uOverlay.value=this.blankTex,this.groundMat=this.makeGroundMaterial();const n=new ri(.82,.82);n.rotateX(-Math.PI/2),this.highlightMat=new Nr({color:3989631,transparent:!0,opacity:.34,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),this.highlightTiles=new vr(n,this.highlightMat,256),this.highlightTiles.count=0,this.highlightTiles.renderOrder=4,this.highlightTiles.frustumCulled=!1,this.highlightTiles.name="build-path-preview",this.infoData=new Uint8Array(C*at*4),this.infoTex=new Fa(this.infoData,C,at,Nn),this.infoTex.minFilter=qn,this.infoTex.magFilter=qn,this.infoTex.wrapS=Ci,this.infoTex.wrapT=Ci,this.infoTex.generateMipmaps=!1,this.infoTex.needsUpdate=!0,this.waterMat=new tn({uniforms:{uTime:{value:0},uNight:{value:0},uInfo:{value:this.infoTex},uSunDir:{value:bx.clone()},uSunColor:{value:new ct(16773327)},uSkyColor:{value:new ct(10473712)},uDeep:{value:new ct(733022)},uShallow:{value:new ct(3130806)},uFoam:{value:new ct(15924223)}},vertexShader:Ex,fragmentShader:Tx,transparent:!0,depthWrite:!1,side:ki});const s=new ri(C,at,64,64);s.rotateX(-Math.PI/2),this.waterMesh=new Ge(s,this.waterMat),this.waterMesh.position.set(C/2,Yn+.02,at/2),this.waterMesh.renderOrder=2,this.waterMesh.frustumCulled=!1,this.waterMesh.matrixAutoUpdate=!1,this.waterMesh.updateMatrix(),this.waterMesh.updateMatrixWorld(!0),this.group.add(this.waterMesh),this.group.add(this.highlightTiles),this.scene.add(this.group)}makeGroundMaterial(){const t=new yo({vertexColors:!0}),e=this.gu;return t.onBeforeCompile=n=>{n.uniforms.uOverlay=e.uOverlay,n.uniforms.uOverlayStrength=e.uOverlayStrength,n.uniforms.uHighlight=e.uHighlight,n.uniforms.uHighlightColor=e.uHighlightColor,n.uniforms.uHighlightOn=e.uHighlightOn,n.uniforms.uTime=e.uTime,n.vertexShader=`attribute float aWind;
varying float vWind;
varying vec3 vWorldPos;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
           vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
           vWind = aWind;`),n.fragmentShader=`uniform sampler2D uOverlay;
         uniform float uOverlayStrength;
         uniform vec4 uHighlight;
         uniform vec3 uHighlightColor;
         uniform float uHighlightOn;
         uniform float uTime;
         varying float vWind;
         varying vec3 vWorldPos;
`+n.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
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
           }`)},t}hAt(t,e){return t<0||e<0||t>=C||e>=at?Sx:this.grid.height[e*C+t]}tileColour(t,e,n,s){const r=this.grid,o=wt(t,e,3),a=wt(t,e,9);if(r.water[n]){s.copy(an.bedShallow).lerp(an.bedDeep,re(-r.height[n]/vd)),s.multiplyScalar(.92+.16*o);return}switch(r.terrain[n]){case se.Forest:s.copy(an.forest).lerp(an.forestDeep,o);break;case se.Sand:s.copy(an.sand).lerp(an.sandWet,o*.55);break;case se.Rock:s.copy(an.rock).lerp(an.rockDark,o);break;case se.Snow:s.copy(an.snow).lerp(an.rock,o*.16);break;case se.Dirt:s.copy(an.dirt).lerp(an.sandWet,o*.45);break;default:s.copy(an.grass).lerp(an.grassAlt,o),a>.8&&s.lerp(an.grassDry,(a-.8)*2);break}(t>0&&r.water[n-1]||t<C-1&&r.water[n+1]||e>0&&r.water[n-C]||e<at-1&&r.water[n+C])&&s.lerp(an.sandWet,.4);const l=r.height[n]/Qe;if(s.multiplyScalar(Nt(.95,1.08,re(l/20))*(.94+.12*wt(t,e,17))),r.zone[n]&&!r.building[n]){const c=r.zone[n];qe.setHex(c<=3?4438106:c<=6?4426705:13999925),s.lerp(qe,.22)}}build(){this.refreshWaterInfo();for(let t=0;t<Un;t++)for(let e=0;e<Se;e++)this.buildChunk(e,t,!1)}buildChunk(t,e,n=!0){if(t<0||e<0||t>=Se||e>=Un)return;n&&(this.infoDirty=!0);const s=this.grid;let r=0,o=0,a=1/0,l=-1/0;const c=t*qt,h=e*qt,u=(f,g,v,m,p,M,_,x,T)=>{const y=r*3;ra[y]=f,ra[y+1]=g,ra[y+2]=v,oa[y]=m,oa[y+1]=p,oa[y+2]=M,aa[y]=_.r*x,aa[y+1]=_.g*x,aa[y+2]=_.b*x,gd[r]=T,g<a&&(a=g),g>l&&(l=g),r++},d=f=>{_s[o++]=f,_s[o++]=f+1,_s[o++]=f+2,_s[o++]=f,_s[o++]=f+2,_s[o++]=f+3};for(let f=h;f<h+qt;f++)for(let g=c;g<c+qt;g++){const v=f*C+g,m=s.height[v],p=g,M=g+1,_=f,x=f+1,T=this.hAt(g+1,f),y=this.hAt(g-1,f),w=this.hAt(g,f-1),E=this.hAt(g,f+1),b=this.hAt(g+1,f-1),S=this.hAt(g-1,f-1),I=this.hAt(g+1,f+1),O=this.hAt(g-1,f+1);this.tileColour(g,f,v,qi);const U=s.terrain[v],z=!s.water[v]&&(U===se.Grass||U===se.Forest)?1:0,W=r;u(p,m,x,0,1,0,qi,la(m,y,E,O)*ca(g,f+1),z),u(M,m,x,0,1,0,qi,la(m,T,E,I)*ca(g+1,f+1),z),u(M,m,_,0,1,0,qi,la(m,T,w,b)*ca(g+1,f),z),u(p,m,_,0,1,0,qi,la(m,y,w,S)*ca(g,f),z),d(W);const $=.9+.2*wt(g,f,41);qe.copy(an.cliff).lerp(qi,.22).multiplyScalar($);const et=1,Y=.56;if(T<m-1e-4){const rt=r;u(M,m,_,1,0,0,qe,et,0),u(M,m,x,1,0,0,qe,et,0),u(M,T,x,1,0,0,qe,Y,0),u(M,T,_,1,0,0,qe,Y,0),d(rt)}if(y<m-1e-4){const rt=r;u(p,m,x,-1,0,0,qe,et,0),u(p,m,_,-1,0,0,qe,et,0),u(p,y,_,-1,0,0,qe,Y,0),u(p,y,x,-1,0,0,qe,Y,0),d(rt)}if(E<m-1e-4){const rt=r;u(M,m,x,0,0,1,qe,et,0),u(p,m,x,0,0,1,qe,et,0),u(p,E,x,0,0,1,qe,Y,0),u(M,E,x,0,0,1,qe,Y,0),d(rt)}if(w<m-1e-4){const rt=r;u(p,m,_,0,0,-1,qe,et,0),u(M,m,_,0,0,-1,qe,et,0),u(M,w,_,0,0,-1,qe,Y,0),u(p,w,_,0,0,-1,qe,Y,0),d(rt)}}this.upload(e*Se+t,r,o,c,h,a,l)}upload(t,e,n,s,r,o,a){let l=this.chunks[t];if(!l||l.vertCap<e||l.idxCap<n){l&&(this.group.remove(l.mesh),l.geo.dispose());const v=Math.max(1024,Math.ceil(e*1.35)),m=Math.max(1536,Math.ceil(n*1.35)),p=new hn;p.setAttribute("position",new De(new Float32Array(v*3),3)),p.setAttribute("normal",new De(new Float32Array(v*3),3)),p.setAttribute("color",new De(new Float32Array(v*3),3)),p.setAttribute("aWind",new De(new Float32Array(v),1)),p.setIndex(new De(new Uint16Array(m),1));const M=new Ge(p,this.groundMat);M.receiveShadow=!0,M.castShadow=!1,M.matrixAutoUpdate=!1,M.updateMatrix(),this.group.add(M),l={mesh:M,geo:p,vertCap:v,idxCap:m},this.chunks[t]=l}const c=l.geo.getAttribute("position"),h=l.geo.getAttribute("normal"),u=l.geo.getAttribute("color"),d=l.geo.getAttribute("aWind"),f=l.geo.getIndex();c.array.set(ra.subarray(0,e*3)),h.array.set(oa.subarray(0,e*3)),u.array.set(aa.subarray(0,e*3)),d.array.set(gd.subarray(0,e)),f.array.set(_s.subarray(0,n)),c.needsUpdate=!0,h.needsUpdate=!0,u.needsUpdate=!0,d.needsUpdate=!0,f.needsUpdate=!0,l.geo.setDrawRange(0,n),Number.isFinite(o)||(o=0,a=0);const g=qt*.5;l.geo.boundingSphere||(l.geo.boundingSphere=new Dr),l.geo.boundingSphere.center.set(s+g,(o+a)*.5,r+g),l.geo.boundingSphere.radius=Math.sqrt(g*g*2+((a-o)*.5)**2)+.05,l.geo.boundingBox||(l.geo.boundingBox=new ls),l.geo.boundingBox.min.set(s,o,r),l.geo.boundingBox.max.set(s+qt,a,r+qt)}refreshWaterInfo(){const t=this.grid,e=this.shoreDist,n=this.bfs,s=this.infoData;e.fill(1023);let r=0;for(let l=0;l<at;l++)for(let c=0;c<C;c++){const h=l*C+c;t.water[h]&&(c>0&&!t.water[h-1]||c<C-1&&!t.water[h+1]||l>0&&!t.water[h-C]||l<at-1&&!t.water[h+C])&&(e[h]=0,n[r++]=h)}let o=0;for(;o<r;){const l=n[o++],c=l%C,h=l/C|0,u=e[l]+1;u>_d+1||(c>0&&t.water[l-1]&&e[l-1]>u&&(e[l-1]=u,n[r++]=l-1),c<C-1&&t.water[l+1]&&e[l+1]>u&&(e[l+1]=u,n[r++]=l+1),h>0&&t.water[l-C]&&e[l-C]>u&&(e[l-C]=u,n[r++]=l-C),h<at-1&&t.water[l+C]&&e[l+C]>u&&(e[l+C]=u,n[r++]=l+C))}let a=0;for(let l=0;l<C*at;l++){const c=l*4;t.water[l]?(a++,s[c]=re(-t.height[l]/vd)*255|0,s[c+1]=re(1-e[l]/_d)*255|0,s[c+2]=0):(s[c]=0,s[c+1]=255,s[c+2]=255),s[c+3]=255}this.waterMesh.visible=a>0,this.infoTex.needsUpdate=!0,this.infoDirty=!1}update(t,e,n){if(this.disposed)return;this.infoDirty&&this.refreshWaterInfo(),this.gu.uTime.value=e,this.highlightTiles.count&&(this.highlightMat.opacity=.29+.08*(.5+.5*Math.sin(e*4.2)));const s=this.waterMat.uniforms;s.uTime.value=e,s.uNight.value=re(n),this.sun||(this.sunRetry-=t,(!this.sunSearched||this.sunRetry<=0)&&(this.sunSearched=!0,this.sunRetry=1.5,this.scene.traverse(r=>{!this.sun&&r.isDirectionalLight&&(this.sun=r)}))),this.sun&&(Jr.copy(this.sun.position).sub(this.sun.target.position),Jr.lengthSq()>1e-6&&(Jr.normalize(),Jr.y>.04&&s.uSunDir.value.copy(Jr)),qi.copy(this.sun.color),qe.setHex(12571647),s.uSunColor.value.copy(qi).lerp(qe,re(n)))}setOverlayTexture(t,e){this.gu.uOverlay.value=t??this.blankTex,this.gu.uOverlayStrength.value=t?re(e):0}setHighlight(t){if(!t){this.gu.uHighlightOn.value=0;return}const e=Math.min(t.x0,t.x1),n=Math.max(t.x0,t.x1)+1,s=Math.min(t.y0,t.y1),r=Math.max(t.y0,t.y1)+1;this.gu.uHighlight.value.set(e,s,n,r),this.gu.uHighlightColor.value.setHex(t.valid?3989631:15747666),this.gu.uHighlightOn.value=1}setHighlightTiles(t,e){const n=Math.min(t?.length??0,256);for(let s=0;s<n;s++){const r=t[s],o=r.y*C+r.x,a=this.grid.water[o]?Yn+.08:this.grid.height[o]+.025;this.highlightMatrix.makeTranslation(r.x+.5,a,r.y+.5),this.highlightTiles.setMatrixAt(s,this.highlightMatrix)}this.highlightTiles.count=n,this.highlightTiles.instanceMatrix.needsUpdate=n>0,this.highlightMat.color.setHex(e?3989631:15747666),this.highlightTiles.visible=n>0}dispose(){if(!this.disposed){this.disposed=!0,this.scene.remove(this.group);for(let t=0;t<this.chunks.length;t++){const e=this.chunks[t];e&&(this.group.remove(e.mesh),e.geo.dispose(),this.chunks[t]=null)}this.group.remove(this.waterMesh),this.group.remove(this.highlightTiles),this.highlightTiles.geometry.dispose(),this.highlightMat.dispose(),this.waterMesh.geometry.dispose(),this.waterMat.dispose(),this.groundMat.dispose(),this.infoTex.dispose(),this.blankTex.dispose(),this.gu.uOverlay.value=null}}}const Rt=.02,fo=.055,Ye=.012,Cx=.32,$f=Yn+.55,As=[0,1,0,-1],Cs=[-1,0,1,0],Fe=i=>new ct(i),xd=Fe(4277580),yd=Fe(3751236),sr=Fe(3422270),Yi=Fe(10196876),Rx=Fe(11907493),pn=Fe(15330279),ha=Fe(14266683),Qr=Fe(11184026),Md=Fe(9273190),Px=Fe(8227416),Lx=Fe(12304838),wd=Fe(9409947),bd=Fe(13554647),Vl=Fe(7765123),to=Fe(8090984),Ix=Fe(6643540),eo=Fe(5719865),Wl=Fe(10134187),ua=Fe(9673633),Dx=Fe(6705220),Sd=Fe(5129536),Ed=Fe(2500652),Xl=Fe(10196105),ql=Fe(8156780),Ux=Fe(1053206);function ni(i,t,e){return Ht(t,e)&&i.road[lt(t,e)]>0}function Dh(i,t,e){return Ht(t,e)&&i.rail[lt(t,e)]>0}function ei(i,t,e){return Ht(t,e)&&i.wire[lt(t,e)]>0}function ka(i,t,e){let n=0;for(let s=0;s<4;s++)ni(i,t+As[s],e+Cs[s])&&(n|=1<<s);return n}function Td(i,t,e){let n=0;for(let s=0;s<4;s++)Dh(i,t+As[s],e+Cs[s])&&(n|=1<<s);return n}function Uh(i,t,e,n){const s=n?Dh:ni,r=(f,g)=>Ht(f,g)&&i.water[lt(f,g)]===1&&s(i,f,g),o=(r(t+1,e)?1:0)+(r(t-1,e)?1:0),a=(r(t,e+1)?1:0)+(r(t,e-1)?1:0);let l;if(o!==a)l=o>a?0:1;else{const f=(s(i,t+1,e)?1:0)+(s(i,t-1,e)?1:0);l=(s(i,t,e+1)?1:0)+(s(i,t,e-1)?1:0)>f?1:0}const c=l===0?1:0,h=l===0?0:1;let u=0;for(;u<64&&r(t-c*(u+1),e-h*(u+1));)u++;let d=0;for(;d<64&&r(t+c*(d+1),e+h*(d+1));)d++;return{axis:l,neg:u,run:u+d+1}}function Nx(i){return Math.min(.5,.05+i*.055)}function jf(i,t){return Nx(i)*Math.sin(Vt(t,0,1)*Math.PI)}function Kf(i,t,e){const n=ni(i,t+1,e)?1:0,s=ni(i,t-1,e)?1:0,r=ni(i,t,e-1)?1:0,o=ni(i,t,e+1)?1:0,a=n+s>=r+o?0:1,l=a===0?1:0,c=a===0?0:1,h=(x,T)=>ni(i,x,T)&&i.tunnel[lt(x,T)]===1;let u=0;for(;u<64&&h(t-l*(u+1),e-c*(u+1));)u++;let d=0;for(;d<64&&h(t+l*(d+1),e+c*(d+1));)d++;const f=t-l*(u+1),g=e-c*(u+1),v=t+l*(d+1),m=e+c*(d+1),p=i.height[lt(t,e)],M=ni(i,f,g)&&!i.tunnel[lt(f,g)]?ns(i,f,g,!1):p,_=ni(i,v,m)&&!i.tunnel[lt(v,m)]?ns(i,v,m,!1):p;return{axis:a,neg:u,run:u+d+1,hA:M,hB:_}}function ns(i,t,e,n){const s=lt(t,e);if(i.water[s]){const o=Uh(i,t,e,n);return $f+jf(o.run,(o.neg+.5)/o.run)}const r=i.height[s];return!n&&i.road[s]===ke.Highway&&!i.tunnel[s]?r+Cx:r}function Fx(i,t,e,n,s,r){const o=lt(t,e),a=lt(n,s),l=!r&&i.tunnel[o]===1,c=!r&&i.tunnel[a]===1;if(c&&!l)return ns(i,t,e,r);if(l&&!c)return ns(i,n,s,r);if(l&&c){const h=Kf(i,t,e);return Nt(h.hA,h.hB,(h.neg+(n+s>t+e?1:0))/h.run)}if(i.water[o]&&i.water[a]){const h=Uh(i,t,e,r),u=n-t,d=s-e,f=h.axis===0?u:d;if(h.axis===0&&d===0||h.axis===1&&u===0){const g=f>0?(h.neg+1)/h.run:h.neg/h.run;return $f+jf(h.run,g)}}return Math.max(ns(i,t,e,r),ns(i,n,s,r))}const Xn=new Float64Array(5);function Zf(i,t,e,n){const s=n?Dh:ni,r=ns(i,t,e,n);Xn[0]=r;for(let o=0;o<4;o++){const a=t+As[o],l=e+Cs[o];Xn[1+o]=s(i,a,l)?Fx(i,t,e,a,l,n):r}}function Jf(i,t,e,n,s,r,o){const a=r<.5?(s-i)*(1-2*r):(e-i)*(2*r-1),l=o<.5?(t-i)*(1-2*o):(n-i)*(2*o-1);return i+a+l}function Ta(i,t,e){const n=Vt(Math.floor(t),0,C-1),s=Vt(Math.floor(e),0,at-1),r=lt(n,s),o=i.road[r]>0,a=i.rail[r]>0;if(!o&&!a)return i.height[r]+Rt;const l=Vt(t-n,0,1),c=Vt(e-s,0,1);if(o&&i.tunnel[r]){const h=Kf(i,n,s),u=h.axis===0?l:c;return Nt(h.hA,h.hB,(h.neg+u)/h.run)+Rt}return Zf(i,n,s,!o),Jf(Xn[0],Xn[1],Xn[2],Xn[3],Xn[4],l,c)+Rt}function Qf(i,t,e){const n=lt(t,e),s=i.road[n];if(!s||s===ke.Highway)return[];if(i.water[n]||i.tunnel[n])return[];const r=ka(i,t,e);if(r!==5&&r!==10)return[];if((t+e&1)!==0)return[];const o=r===5,a=wt(t,e,31)<.5?-1:1,l=s===ke.Avenue?.07:.18;let c,h,u,d,f;o?(c=a<0?l*.45:1-l*.45,h=.5,u=a<0?0:Math.PI,d=a<0?l+.15:1-l-.15,f=.5):(h=a<0?l*.45:1-l*.45,c=.5,u=a<0?-Math.PI/2:Math.PI/2,f=a<0?l+.15:1-l-.15,d=.5);const g=t+c,v=e+h,m=Ta(i,g,v)+fo;return[{wx:g,wz:v,wy:m,rotY:u,poolU:d,poolV:f}]}class Ox{constructor(){L(this,"pos",[]);L(this,"nor",[]);L(this,"col",[]);L(this,"emi",[]);L(this,"ind",[]);L(this,"vc",0)}quad(t,e,n,s,r,o,a,l,c,h,u,d,f,g,v=0){const m=s-t,p=r-e,M=o-n,_=h-t,x=u-e,T=d-n;let y=p*T-M*x,w=M*_-m*T,E=m*x-p*_;const b=Math.hypot(y,w,E)||1;y/=b,w/=b,E/=b;const S=f.r*g,I=f.g*g,O=f.b*g,U=this.vc;this.pos.push(t,e,n,s,r,o,a,l,c,h,u,d);for(let z=0;z<4;z++)this.nor.push(y,w,E),this.col.push(S,I,O),this.emi.push(v);this.ind.push(U,U+1,U+2,U,U+2,U+3),this.vc+=4}wall(t,e,n,s,r,o,a,l,c,h){this.quad(t,r,e,n,a,s,n,l,s,t,o,e,c,h)}bar(t,e,n,s,r,o,a,l,c){let h=s-t,u=r-e,d=o-n;const f=Math.hypot(h,u,d)||1;h/=f,u/=f,d/=f;let g=-d,v=0,m=h;const p=Math.hypot(g,v,m);p<1e-4?(g=1,v=0,m=0):(g/=p,m/=p);const M=v*d-m*u,_=m*h-g*d,x=g*u-v*h,T=[g+M,g-M,-g-M,-g+M],y=[v+_,v-_,-v-_,-v+_],w=[m+x,m-x,-m-x,-m+x];for(let E=0;E<4;E++){const b=E+1&3;this.quad(t+T[E]*a,e+y[E]*a,n+w[E]*a,t+T[b]*a,e+y[b]*a,n+w[b]*a,s+T[b]*a,r+y[b]*a,o+w[b]*a,s+T[E]*a,r+y[E]*a,o+w[E]*a,l,c)}}get empty(){return this.ind.length===0}}function It(i,t,e,n,s,r,o,a,l,c,h,u=0){i.quad(t+s,n(s,r)+l,e+r,t+s,n(s,a)+l,e+a,t+o,n(o,a)+l,e+a,t+o,n(o,r)+l,e+r,c,h,u)}class kx{constructor(t,e){L(this,"scene");L(this,"grid");L(this,"meshes");L(this,"pipeMeshes");L(this,"material");L(this,"pipeGeometry");L(this,"pipeMaterial");L(this,"markerMatrix",new me);L(this,"uNight",{value:0});L(this,"bridgeQueued",new Set);this.scene=t,this.grid=e,this.meshes=new Array(Se*Un).fill(null),this.pipeMeshes=new Array(Se*Un).fill(null),this.material=new yo({vertexColors:!0});const n=this.uNight;this.material.onBeforeCompile=s=>{s.uniforms.uNight=n,s.vertexShader=`attribute float aEmissive;
varying float vEmissive;
`+s.vertexShader.replace("#include <color_vertex>",`#include <color_vertex>
	vEmissive = aEmissive;`),s.fragmentShader=`varying float vEmissive;
uniform float uNight;
`+s.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
	totalEmissiveRadiance += vec3(1.0, 0.72, 0.38) * vEmissive * uNight;`)},this.material.customProgramCacheKey=()=>"sethcity-roads",this.pipeGeometry=new Xa(.105,.105,.025,10),this.pipeMaterial=new yo({color:5021649})}rebuildAll(){for(let t=0;t<Un;t++)for(let e=0;e<Se;e++)this.buildChunk(e,t)}rebuildChunk(t,e){this.buildChunk(t,e);const n=e*Se+t;if(!this.bridgeQueued.delete(n)&&this.chunkHasBridge(t,e)){const s=r=>{r===n||this.grid.dirtyChunks.has(r)||(this.bridgeQueued.add(r),this.grid.dirtyChunks.add(r))};t>0&&s(e*Se+t-1),t<Se-1&&s(e*Se+t+1),e>0&&s((e-1)*Se+t),e<Un-1&&s((e+1)*Se+t)}}update(t,e,n){this.uNight.value=n}dispose(){for(let t=0;t<this.meshes.length;t++)this.removeMesh(t);for(let t=0;t<this.pipeMeshes.length;t++)this.removePipeMesh(t);this.bridgeQueued.clear(),this.material.dispose(),this.pipeGeometry.dispose(),this.pipeMaterial.dispose()}chunkHasBridge(t,e){const n=this.grid,s=t*qt,r=e*qt;for(let o=r;o<r+qt;o++)for(let a=s;a<s+qt;a++){const l=lt(a,o);if(n.water[l]&&(n.road[l]||n.rail[l]))return!0}return!1}removeMesh(t){const e=this.meshes[t];e&&(this.scene.remove(e),e.geometry.dispose(),this.meshes[t]=null)}removePipeMesh(t){const e=this.pipeMeshes[t];e&&(this.scene.remove(e),this.pipeMeshes[t]=null)}buildPipeMarkers(t,e){const n=e*Se+t;this.removePipeMesh(n);const s=new vr(this.pipeGeometry,this.pipeMaterial,qt*qt);let r=0;const o=t*qt,a=e*qt;for(let l=a;l<a+qt;l++)for(let c=o;c<o+qt;c++){const h=lt(c,l);if(!this.grid.pipe[h]||this.grid.water[h])continue;const u=c+l&1?.32:.68;this.markerMatrix.makeTranslation(c+u,this.grid.height[h]+.045,l+.5),s.setMatrixAt(r++,this.markerMatrix)}r&&(s.count=r,s.instanceMatrix.needsUpdate=!0,s.name=`pipe-access-${t}-${e}`,s.receiveShadow=!1,s.castShadow=!1,this.scene.add(s),this.pipeMeshes[n]=s)}buildChunk(t,e){const n=e*Se+t;this.removeMesh(n),this.buildPipeMarkers(t,e);const s=this.grid,r=new Ox,o=t*qt,a=e*qt;for(let h=a;h<a+qt;h++)for(let u=o;u<o+qt;u++){const d=lt(u,h);s.road[d]?this.roadTile(r,u,h):s.rail[d]&&this.railTile(r,u,h),s.wire[d]&&this.wireTile(r,u,h)}if(r.empty)return;const l=new hn;l.setAttribute("position",new Ue(r.pos,3)),l.setAttribute("normal",new Ue(r.nor,3)),l.setAttribute("color",new Ue(r.col,3)),l.setAttribute("aEmissive",new Ue(r.emi,1)),l.setIndex(r.pos.length/3>65535?new xh(r.ind,1):new _h(r.ind,1)),l.computeBoundingSphere();const c=new Ge(l,this.material);c.castShadow=!0,c.receiveShadow=!0,c.matrixAutoUpdate=!1,this.scene.add(c),this.meshes[n]=c}makeSurf(t,e,n){Zf(this.grid,t,e,n);const s=Xn[0],r=Xn[1],o=Xn[2],a=Xn[3],l=Xn[4];return(c,h)=>Jf(s,r,o,a,l,c,h)}roadTile(t,e,n){const s=this.grid,r=lt(e,n);if(s.tunnel[r]){this.portals(t,e,n);return}const o=s.road[r],a=ka(s,e,n),l=this.makeSurf(e,n,!1),c=.93+wt(e,n,11)*.11;if(s.water[r]?this.bridge(t,e,n,l,a,!1,o,c):o===ke.Highway?this.highway(t,e,n,l,a,c):this.streetAvenue(t,e,n,l,a,o,c),s.rail[r]){const h=Td(s,e,n);for(let u=0;u<4;u++)h&1<<u&&this.railPair(t,e,n,l,u,Rt+.012,0,.52)}}streetAvenue(t,e,n,s,r,o,a){const l=this.grid,c=o===ke.Avenue,h=c?.07:.18,u=1-h,d=c?yd:xd;let f=0;for(let p=0;p<4;p++)r&1<<p&&f++;It(t,e,n,s,h,h,u,u,Rt,d,a),r&1&&It(t,e,n,s,h,0,u,h,Rt,d,a),r&2&&It(t,e,n,s,u,h,1,u,Rt,d,a),r&4&&It(t,e,n,s,h,u,u,1,Rt,d,a),r&8&&It(t,e,n,s,0,h,h,u,Rt,d,a);const g=Rt+fo,v=.94+wt(e,n,13)*.1;It(t,e,n,s,0,0,h,h,g,Yi,v),It(t,e,n,s,u,0,1,h,g,Yi,v),It(t,e,n,s,u,u,1,1,g,Yi,v),It(t,e,n,s,0,u,h,1,g,Yi,v),r&1||It(t,e,n,s,h,0,u,h,g,Yi,v),r&2||It(t,e,n,s,u,h,1,u,g,Yi,v),r&4||It(t,e,n,s,h,u,u,1,g,Yi,v),r&8||It(t,e,n,s,0,h,h,u,g,Yi,v);const m=(p,M,_,x)=>{t.wall(e+p,n+M,e+_,n+x,s(p,M)+Rt,s(p,M)+g,s(_,x)+Rt,s(_,x)+g,Rx,a)};if(r&1?(m(h,h,h,0),m(u,0,u,h)):m(h,h,u,h),r&2?(m(u,h,1,h),m(1,u,u,u)):m(u,h,u,u),r&4?(m(h,1,h,u),m(u,u,u,1)):m(u,u,h,u),r&8?(m(0,h,h,h),m(h,u,0,u)):m(h,u,h,h),this.rampFills(t,e,n,s,r,h,u,Md,a),f>=3)this.crosswalks(t,e,n,s,r,h,u);else if(!c){for(let p=0;p<4;p++)if(r&1<<p)for(let M=0;M<3;M++){const _=.05+M*.17,x=_+.09;p===0?It(t,e,n,s,.487,_,.513,x,Ye,ha,1):p===2?It(t,e,n,s,.487,1-x,.513,1-_,Ye,ha,1):p===3?It(t,e,n,s,_,.487,x,.513,Ye,ha,1):It(t,e,n,s,1-x,.487,1-_,.513,Ye,ha,1)}}if(c&&f<=2){for(let _=0;_<4;_++){if(!(r&1<<_))continue;const x=h+.028,T=h+.05,y=u-.05,w=u-.028;if(_===0||_===2){const E=_===0?0:.55,b=_===0?.45:1;It(t,e,n,s,x,E,T,b,Ye,pn,.9),It(t,e,n,s,y,E,w,b,Ye,pn,.9)}else{const E=_===3?0:.55,b=_===3?.45:1;It(t,e,n,s,E,x,b,T,Ye,pn,.9),It(t,e,n,s,E,y,b,w,Ye,pn,.9)}}const p=Rt+.07,M=(_,x,T,y)=>{It(t,e,n,s,_,x,T,y,p,Qr,a),t.wall(e+_,n+x,e+_,n+y,s(_,x)+Rt,s(_,x)+p,s(_,y)+Rt,s(_,y)+p,Qr,a*.85),t.wall(e+T,n+y,e+T,n+x,s(T,y)+Rt,s(T,y)+p,s(T,x)+Rt,s(T,x)+p,Qr,a*.85),t.wall(e+T,n+x,e+_,n+x,s(T,x)+Rt,s(T,x)+p,s(_,x)+Rt,s(_,x)+p,Qr,a*.85),t.wall(e+_,n+y,e+T,n+y,s(_,y)+Rt,s(_,y)+p,s(T,y)+Rt,s(T,y)+p,Qr,a*.85)};M(.45,.45,.55,.55),r&1&&M(.45,0,.55,.45),r&2&&M(.55,.45,1,.55),r&4&&M(.45,.55,.55,1),r&8&&M(0,.45,.45,.55)}for(const p of Qf(l,e,n))It(t,e,n,s,p.poolU-.14,p.poolV-.14,p.poolU+.14,p.poolV+.14,Ye*.6,d,a,.85)}crosswalks(t,e,n,s,r,o,a){for(let h=0;h<4;h++){if(!(r&1<<h))continue;const u=o+.03,d=a-.03;for(let f=u;f+.05<=d+1e-4;f+=.05+.048)h===0?It(t,e,n,s,f,.045,f+.05,.145,Ye,pn,.95):h===2?It(t,e,n,s,f,.855,f+.05,.955,Ye,pn,.95):h===3?It(t,e,n,s,.045,f,.145,f+.05,Ye,pn,.95):It(t,e,n,s,.855,f,.955,f+.05,Ye,pn,.95)}}rampFills(t,e,n,s,r,o,a,l,c){const u=this.grid.height[lt(e,n)],d=u-.04,f=(g,v)=>s(g,v)-u>.05;r&1&&(f(o,0)||f(a,0))&&(t.wall(e+o,n,e+o,n+o,d,s(o,0)+Rt,d,s(o,o)+Rt,l,c),t.wall(e+a,n+o,e+a,n,d,s(a,o)+Rt,d,s(a,0)+Rt,l,c)),r&4&&(f(o,1)||f(a,1))&&(t.wall(e+o,n+a,e+o,n+1,d,s(o,a)+Rt,d,s(o,1)+Rt,l,c),t.wall(e+a,n+1,e+a,n+a,d,s(a,1)+Rt,d,s(a,a)+Rt,l,c)),r&2&&(f(1,o)||f(1,a))&&(t.wall(e+1,n+o,e+a,n+o,d,s(1,o)+Rt,d,s(a,o)+Rt,l,c),t.wall(e+a,n+a,e+1,n+a,d,s(a,a)+Rt,d,s(1,a)+Rt,l,c)),r&8&&(f(0,o)||f(0,a))&&(t.wall(e+o,n+o,e,n+o,d,s(o,o)+Rt,d,s(0,o)+Rt,l,c),t.wall(e,n+a,e+o,n+a,d,s(0,a)+Rt,d,s(o,a)+Rt,l,c))}highway(t,e,n,s,r,o){const a=this.grid,l=.08,c=.92,h=a.height[lt(e,n)];It(t,e,n,s,l,l,c,c,Rt,sr,o),r&1&&It(t,e,n,s,l,0,c,l,Rt,sr,o),r&2&&It(t,e,n,s,c,l,1,c,Rt,sr,o),r&4&&It(t,e,n,s,l,c,c,1,Rt,sr,o),r&8&&It(t,e,n,s,0,l,l,c,Rt,sr,o);const u=(p,M,_,x,T,y,w,E)=>{t.quad(e+T,h+.01,n+w,e+y,h+.01,n+E,e+_,s(_,x)+Rt*.5,n+x,e+p,s(p,M)+Rt*.5,n+M,Px,o)};r&1||u(c,l,l,l,1,0,0,0),r&4||u(l,c,c,c,0,1,1,1),r&2||u(c,c,c,l,1,1,1,0),r&8||u(l,l,l,c,0,0,0,1);const d=(p,M,_,x)=>{const T=s(p,M)+Rt+.05,y=s(_,x)+Rt+.05;t.bar(e+p,T+.06,n+M,e+_,y+.06,n+x,.022,Lx,o)},f=r&8?0:l,g=r&2?1:c,v=r&1?0:l,m=r&4?1:c;r&1||d(f,l,g,l),r&4||d(f,c,g,c),r&8||d(l,v,l,m),r&2||d(c,v,c,m);for(let p=0;p<4;p++)if(r&1<<p)for(const M of[-.17,.17])for(let _=0;_<3;_++){const x=.06+_*.17,T=x+.08,y=.5+M-.012,w=.5+M+.012;p===0?It(t,e,n,s,y,x,w,T,Ye,pn,.9):p===2?It(t,e,n,s,y,1-T,w,1-x,Ye,pn,.9):p===3?It(t,e,n,s,x,y,T,w,Ye,pn,.9):It(t,e,n,s,1-T,y,1-x,w,Ye,pn,.9)}}bridge(t,e,n,s,r,o,a,l){const c=this.grid,h=lt(e,n),u=o?.2:.14,d=1-u,f=o?wd:a===ke.Highway?sr:yd;It(t,e,n,s,u,u,d,d,Rt,f,l),r&1&&It(t,e,n,s,u,0,d,u,Rt,f,l),r&2&&It(t,e,n,s,d,u,1,d,Rt,f,l),r&4&&It(t,e,n,s,u,d,d,1,Rt,f,l),r&8&&It(t,e,n,s,0,u,u,d,Rt,f,l);const g=r&8?0:u,v=r&2?1:d,m=r&1?0:u,p=r&4?1:d,M=(x,T,y,w)=>{const E=s(x,T)+Rt,b=s(y,w)+Rt;t.wall(e+x,n+T,e+y,n+w,E-.16,E-.01,b-.16,b-.01,wd,l),t.bar(e+x,E+.09,n+T,e+y,b+.09,n+w,.02,bd,l),t.bar(e+x,E+.045,n+T,e+y,b+.045,n+w,.012,bd,l*.9)};if(r&1||M(v,u,g,u),r&4||M(g,d,v,d),r&8||M(u,m,u,p),r&2||M(d,p,d,m),o)for(let x=0;x<4;x++)r&1<<x&&this.railPair(t,e,n,s,x,Rt+.01,0,.52);else for(let x=0;x<4;x++)if(r&1<<x)for(let T=0;T<3;T++){const y=.06+T*.17,w=y+.08;x===0?It(t,e,n,s,.488,y,.512,w,Ye,pn,.9):x===2?It(t,e,n,s,.488,1-w,.512,1-y,Ye,pn,.9):x===3?It(t,e,n,s,y,.488,w,.512,Ye,pn,.9):It(t,e,n,s,1-w,.488,1-y,.512,Ye,pn,.9)}const _=Uh(c,e,n,o);if(_.neg%2===0){const x=s(.5,.5)+Rt,T=Math.min(c.height[h],Yn-.2)-.1,y=_.axis===0?0:.27,w=_.axis===0?.27:0;t.bar(e+.5-y,T,n+.5-w,e+.5-y,x-.1,n+.5-w,.07,Vl,l),t.bar(e+.5+y,T,n+.5+w,e+.5+y,x-.1,n+.5+w,.07,Vl,l),t.bar(e+.5-y*1.2,x-.14,n+.5-w*1.2,e+.5+y*1.2,x-.14,n+.5+w*1.2,.045,Vl,l*.95)}}railPair(t,e,n,s,r,o,a,l){for(const u of[-.14,.14]){const d=.5+u-.016,f=.5+u+.016;let g,v,m,p;r===0?(g=d,m=f,v=a,p=l):r===2?(g=d,m=f,v=1-l,p=1-a):r===3?(g=a,m=l,v=d,p=f):(g=1-l,m=1-a,v=d,p=f),It(t,e,n,s,g,v,m,p,o+.052,Wl,1),t.wall(e+g,n+v,e+g,n+p,s(g,v)+o,s(g,v)+o+.052,s(g,p)+o,s(g,p)+o+.052,Wl,.7),t.wall(e+m,n+p,e+m,n+v,s(m,p)+o,s(m,p)+o+.052,s(m,v)+o,s(m,v)+o+.052,Wl,.7)}}railTile(t,e,n){const s=this.grid,r=lt(e,n),o=Td(s,e,n),a=this.makeSurf(e,n,!0),l=.93+wt(e,n,17)*.11;if(s.water[r]){this.bridge(t,e,n,a,o,!0,0,l);return}const c=.22,h=.78,u=Rt+.045;It(t,e,n,a,c,c,h,h,u,to,l),o&1&&It(t,e,n,a,c,0,h,c,u,to,l),o&2&&It(t,e,n,a,h,c,1,h,u,to,l),o&4&&It(t,e,n,a,c,h,h,1,u,to,l),o&8&&It(t,e,n,a,0,c,c,h,u,to,l);const d=(g,v,m,p)=>{t.wall(e+g,n+v,e+m,n+p,a(g,v)+.004,a(g,v)+u,a(m,p)+.004,a(m,p)+u,Ix,l)};o&1?(d(c,0,c,c),d(h,c,h,0)):d(h,c,c,c),o&2?(d(1,c,h,c),d(h,h,1,h)):d(h,h,h,c),o&4?(d(c,h,c,1),d(h,1,h,h)):d(c,h,h,h),o&8?(d(c,c,0,c),d(0,h,c,h)):d(c,c,c,h),this.rampFills(t,e,n,a,o,c,h,Md,l);let f=0;for(let g=0;g<4;g++)o&1<<g&&f++;for(let g=0;g<4;g++)if(o&1<<g){for(let v=.07;v<.5;v+=.16){const m=v-.032,p=v+.032;g===0?It(t,e,n,a,.28,m,.72,p,u+.008,eo,l):g===2?It(t,e,n,a,.28,1-p,.72,1-m,u+.008,eo,l):g===3?It(t,e,n,a,m,.28,p,.72,u+.008,eo,l):It(t,e,n,a,1-p,.28,1-m,.72,u+.008,eo,l)}this.railPair(t,e,n,a,g,u,0,.53)}if(f===1){const g=o&1?2:o&2?3:o&4?0:1,v=a(.5,.5)+u,m=e+.5+As[g]*.18,p=n+.5+Cs[g]*.18,M=As[g]===0?.18:0,_=Cs[g]===0?.18:0;t.bar(m-M,v+.1,p-_,m+M,v+.1,p+_,.035,eo,1)}}portals(t,e,n){const s=this.grid;for(let r=0;r<4;r++){const o=e+As[r],a=n+Cs[r];if(!ni(s,o,a)||s.tunnel[lt(o,a)]||s.water[lt(o,a)])continue;const l=ns(s,o,a,!1)+Rt,c=.95+wt(e,n,23+r)*.08,h=.04;let u,d,f,g;r===0?(u=e+1,d=n+h,f=e,g=n+h):r===2?(u=e,d=n+1-h,f=e+1,g=n+1-h):r===1?(u=e+1-h,d=n,f=e+1-h,g=n+1):(u=e+h,d=n+1,f=e+h,g=n);const v=f-u,m=g-d,p=(b,S,I,O,U,z)=>{t.wall(u+v*b,d+m*b,u+v*S,d+m*S,I,O,I,O,U,z)};p(0,.22,l-.05,l+.95,Xl,c),p(.78,1,l-.05,l+.95,Xl,c),p(.22,.78,l+.68,l+.95,Xl,c);const M=-As[r]*.1,_=-Cs[r]*.1;t.wall(u+v*.22+M,d+m*.22+_,u+v*.78+M,d+m*.78+_,l-.02,l+.68,l-.02,l+.68,Ux,1),t.bar(u,l+.98,d,f,l+.98,g,.045,ql,c);const x=.5,T=u+v*x+M*.5,y=d+m*x+_*.5;t.quad(T-v*.28-M,l+.002,y-m*.28-_,T-v*.28+M,l+.002,y-m*.28+_,T+v*.28+M,l+.002,y+m*.28+_,T+v*.28-M,l+.002,y+m*.28-_,xd,c);const w=s.height[lt(e,n)],E=(b,S)=>{const I=u+v*b,O=d+m*b,U=I-M*3+v*.06*S,z=O-_*3+m*.06*S;t.wall(I,O,U,z,l-.05,l+.85,l-.05,Math.max(l+.35,w*.4+l*.6),ql,c*.95),t.wall(U,z,I,O,l-.05,Math.max(l+.35,w*.4+l*.6),l-.05,l+.85,ql,c*.95)};E(.02,1),E(.98,-1)}}pylonAttach(t,e){const n=this.grid,s=lt(t,e),r=n.water[s]===1,o=r?Yn-.45:n.height[s],a=r?3.35:2.45;return{base:o,top:o+a,arm:o+a*.84}}wireTile(t,e,n){const s=this.grid;if(!this.isPylonTile(e,n))return;const r=this.pylonAttach(e,n),o=e+.5,a=n+.5,l=.92+wt(e,n,41)*.12,c=ei(s,e+1,n),h=ei(s,e-1,n),u=ei(s,e,n-1),d=ei(s,e,n+1),f=c||h,g=u||d;if(s.water[lt(e,n)]){for(const p of[-1,1])for(const M of[-1,1])t.bar(o+p*.17,r.base,a+M*.17,o+p*.05,r.arm,a+M*.05,.021,ua,l);const m=r.base+(r.arm-r.base)*.45;for(const[p,M,_,x]of[[-1,-1,1,1],[1,-1,-1,1]])t.bar(o+p*.15,r.base+.12,a+M*.15,o+_*.09,m,a+x*.09,.012,ua,l)}else t.bar(o,r.base,a,o,r.top,a,.035,Dx,l);if((f||!g)&&t.bar(o,r.arm,a-.28,o,r.arm,a+.28,.022,s.water[lt(e,n)]?ua:Sd,l),g&&t.bar(o-.28,r.arm,a,o+.28,r.arm,a,.022,s.water[lt(e,n)]?ua:Sd,l),c){for(let v=1;v<=4&&ei(s,e+v,n);v++)if(this.isPylonTile(e+v,n)){this.span(t,e,n,e+v,n,0);break}}if(d){for(let v=1;v<=4&&ei(s,e,n+v);v++)if(this.isPylonTile(e,n+v)){this.span(t,e,n,e,n+v,1);break}}}isPylonTile(t,e){const n=this.grid;if(!ei(n,t,e))return!1;const s=ei(n,t+1,e),r=ei(n,t-1,e),o=ei(n,t,e-1),a=ei(n,t,e+1);if(Number(s)+Number(r)+Number(o)+Number(a)!==2||!(s&&r||o&&a))return!0;const c=n.water[lt(t,e)]===1;for(const[h,u,d]of[[t+1,e,s],[t-1,e,r],[t,e-1,o],[t,e+1,a]])if(d&&n.water[lt(h,u)]===1!==c)return!0;return s&&r?t%4===0:e%4===0}span(t,e,n,s,r,o){const a=this.pylonAttach(e,n),l=this.pylonAttach(s,r),c=e+.5,h=n+.5,u=s+.5,d=r+.5,f=o===0?0:.3,g=o===0?.3:0,v=6,p=.16+(Math.abs(s-e)+Math.abs(r-n))*.11;for(const M of[-1,1]){let _=c+f*M,x=h+g*M,T=a.arm+.03;for(let y=1;y<=v;y++){const w=y/v,E=Nt(c+f*M,u+f*M,w),b=Nt(h+g*M,d+g*M,w),S=Nt(a.arm+.03,l.arm+.03,w)-p*4*w*(1-w),I=.011;t.quad(_,T-I,x,E,S-I,b,E,S+I,b,_,T+I,x,Ed,1),t.quad(E,S-I,b,_,T-I,x,_,T+I,x,E,S+I,b,Ed,1),_=E,x=b,T=S}}}}const Ad=new Map,da=new ct;function G(i){let t=Ad.get(i);return t||(da.setHex(i),t=[da.r,da.g,da.b],Ad.set(i,t)),t}function A(i,t=1){const e=G(i);return[e[0]*t,e[1]*t,e[2]*t]}const Fn=2240832,Ie=12104358,Ae=10196876,Ns=3816770,Ui=4867136,Ne=15921386,Ze=10134184,Bx=10246721,Zc=5012026,Ar=7316296,Cr=7033142,zx=5081660,Ba=4169673,za=15262418,Hx=5324847,Cd=[3530976,16736162,16763196,8257386,10120191,16747325],vn=.85,On=.45,Ni=1.9,_n=1.55,Mo=2.85,Fs=2.5;let $e=[];class Gx{constructor(){L(this,"pos",new Float32Array(3*8192));L(this,"nor",new Float32Array(3*8192));L(this,"col",new Float32Array(3*8192));L(this,"emi",new Float32Array(8192));L(this,"ind",new Uint32Array(12288));L(this,"v",0);L(this,"ic",0);L(this,"ox",0);L(this,"oy",0);L(this,"oz",0);L(this,"fw",1);L(this,"fh",1);L(this,"rot",0);L(this,"collect",!0)}reset(){this.v=0,this.ic=0}setFrame(t,e,n,s,r,o){this.ox=t,this.oy=e,this.oz=n,this.fw=s,this.fh=r,this.rot=o&3}ensure(t,e){const n=(this.v+t)*3;if(n>this.pos.length){const s=Math.max(n,this.pos.length*2),r=new Float32Array(s);r.set(this.pos),this.pos=r;const o=new Float32Array(s);o.set(this.nor),this.nor=o;const a=new Float32Array(s);a.set(this.col),this.col=a;const l=new Float32Array(s/3);l.set(this.emi),this.emi=l}if(this.ic+e>this.ind.length){const s=Math.max(this.ic+e,this.ind.length*2),r=new Uint32Array(s);r.set(this.ind),this.ind=r}}toWorld(t,e,n){const s=this.fw*.5,r=this.fh*.5,o=t-s,a=n-r;let l,c;switch(this.rot){case 1:l=-a,c=o;break;case 2:l=-o,c=-a;break;case 3:l=a,c=-o;break;default:l=o,c=a}return[this.ox+s+l,this.oy+e,this.oz+r+c]}worldYaw(t){return t+this.rot*(Math.PI/2)}vert(t,e,n,s,r,o,a,l){const c=this.fw*.5,h=this.fh*.5,u=t-c,d=n-h;let f,g,v,m;switch(this.rot){case 1:f=-d,g=u,v=-o,m=s;break;case 2:f=-u,g=-d,v=-s,m=-o;break;case 3:f=d,g=-u,v=o,m=-s;break;default:f=u,g=d,v=s,m=o}const p=this.v*3;return this.pos[p]=this.ox+c+f,this.pos[p+1]=this.oy+e,this.pos[p+2]=this.oz+h+g,this.nor[p]=v,this.nor[p+1]=r,this.nor[p+2]=m,this.col[p]=a[0],this.col[p+1]=a[1],this.col[p+2]=a[2],this.emi[this.v]=l,this.v++}quad(t,e,n,s,r,o,a,l,c,h,u,d,f,g=0){const v=s-t,m=r-e,p=o-n,M=h-t,_=u-e,x=d-n;let T=m*x-p*_,y=p*M-v*x,w=v*_-m*M;const E=Math.hypot(T,y,w);if(E<1e-9)return;T/=E,y/=E,w/=E,this.ensure(4,6);const b=this.vert(t,e,n,T,y,w,f,g),S=this.vert(s,r,o,T,y,w,f,g),I=this.vert(a,l,c,T,y,w,f,g),O=this.vert(h,u,d,T,y,w,f,g),U=this.ic;this.ind[U]=b,this.ind[U+1]=S,this.ind[U+2]=I,this.ind[U+3]=b,this.ind[U+4]=I,this.ind[U+5]=O,this.ic+=6}tri(t,e,n,s,r,o,a,l,c,h,u=0){const d=s-t,f=r-e,g=o-n,v=a-t,m=l-e,p=c-n;let M=f*p-g*m,_=g*v-d*p,x=d*m-f*v;const T=Math.hypot(M,_,x);if(T<1e-9)return;M/=T,_/=T,x/=T,this.ensure(3,3);const y=this.vert(t,e,n,M,_,x,h,u),w=this.vert(s,r,o,M,_,x,h,u),E=this.vert(a,l,c,M,_,x,h,u);this.ind[this.ic]=y,this.ind[this.ic+1]=w,this.ind[this.ic+2]=E,this.ic+=3}box(t,e,n,s,r,o,a,l,c=0,h=!1){this.quad(s,e,o,s,e,n,s,r,n,s,r,o,a,c),this.quad(t,e,n,t,e,o,t,r,o,t,r,n,a,c),this.quad(t,e,o,s,e,o,s,r,o,t,r,o,a,c),this.quad(s,e,n,t,e,n,t,r,n,s,r,n,a,c),this.quad(t,r,o,s,r,o,s,r,n,t,r,n,l,c),h&&this.quad(t,e,n,s,e,n,s,e,o,t,e,o,l,c)}boxR(t,e,n,s,r,o,a,l,c,h=0){const u=Math.cos(a),d=Math.sin(a),f=n*.5,g=s*.5,v=[],m=[],p=[-f,f,f,-f],M=[-g,-g,g,g];for(let _=0;_<4;_++)v.push(t+p[_]*u-M[_]*d),m.push(e+p[_]*d+M[_]*u);for(let _=0;_<4;_++){const x=_+1&3;this.quad(v[x],r,m[x],v[_],r,m[_],v[_],o,m[_],v[x],o,m[x],l,h)}this.quad(v[3],o,m[3],v[2],o,m[2],v[1],o,m[1],v[0],o,m[0],c,h)}flat(t,e,n,s,r,o,a=0){this.quad(t,r,s,n,r,s,n,r,e,t,r,e,o,a)}disc(t,e,n,s,r,o,a=0){for(let l=0;l<r;l++){const c=l/r*Math.PI*2,h=(l+1)/r*Math.PI*2;this.tri(t,n,e,t+Math.cos(h)*s,n,e+Math.sin(h)*s,t+Math.cos(c)*s,n,e+Math.sin(c)*s,o,a)}}cyl(t,e,n,s,r,o,a,l,c=null,h=0){for(let u=0;u<a;u++){const d=u/a*Math.PI*2,f=(u+1)/a*Math.PI*2,g=Math.cos(d),v=Math.sin(d),m=Math.cos(f),p=Math.sin(f);o>1e-4?this.quad(t+m*r,n,e+p*r,t+g*r,n,e+v*r,t+g*o,s,e+v*o,t+m*o,s,e+p*o,l,h):this.tri(t+m*r,n,e+p*r,t+g*r,n,e+v*r,t,s,e,l,h)}if(c&&o>1e-4)for(let u=0;u<a;u++){const d=u/a*Math.PI*2,f=(u+1)/a*Math.PI*2;this.tri(t,s,e,t+Math.cos(f)*o,s,e+Math.sin(f)*o,t+Math.cos(d)*o,s,e+Math.sin(d)*o,c,h)}}dome(t,e,n,s,r,o,a,l=1,c=0){for(let h=0;h<o;h++){const u=h/o*Math.PI*.5,d=(h+1)/o*Math.PI*.5,f=s*Math.cos(u),g=s*Math.cos(d),v=n+s*Math.sin(u)*l,m=n+s*Math.sin(d)*l;for(let p=0;p<r;p++){const M=p/r*Math.PI*2,_=(p+1)/r*Math.PI*2,x=Math.cos(M),T=Math.sin(M),y=Math.cos(_),w=Math.sin(_);h===o-1?this.tri(t+y*f,v,e+w*f,t+x*f,v,e+T*f,t,m,e,a,c):this.quad(t+y*f,v,e+w*f,t+x*f,v,e+T*f,t+x*g,m,e+T*g,t+y*g,m,e+w*g,a,c)}}}gable(t,e,n,s,r,o,a,l,c){const h=r+o;if(a){const u=(e+s)*.5;this.quad(n,r,e,t,r,e,t,h,u,n,h,u,l),this.quad(t,r,s,n,r,s,n,h,u,t,h,u,l),this.tri(t,r,e,t,r,s,t,h,u,c),this.tri(n,r,s,n,r,e,n,h,u,c)}else{const u=(t+n)*.5;this.quad(t,r,e,t,r,s,u,h,s,u,h,e,l),this.quad(n,r,s,n,r,e,u,h,e,u,h,s,l),this.tri(n,r,e,t,r,e,u,h,e,c),this.tri(t,r,s,n,r,s,u,h,s,c)}}hip(t,e,n,s,r,o,a,l){const c=r+o,h=n-t,u=s-e;if(h>=u){const d=l??u*.5,f=(e+s)*.5,g=t+d,v=n-d;this.quad(n,r,e,t,r,e,g,c,f,v,c,f,a),this.quad(t,r,s,n,r,s,v,c,f,g,c,f,a),this.tri(t,r,e,t,r,s,g,c,f,a),this.tri(n,r,s,n,r,e,v,c,f,a)}else{const d=l??h*.5,f=(t+n)*.5,g=e+d,v=s-d;this.quad(t,r,e,t,r,s,f,c,v,f,c,g,a),this.quad(n,r,s,n,r,e,f,c,g,f,c,v,a),this.tri(n,r,e,t,r,e,f,c,g,a),this.tri(t,r,s,n,r,s,f,c,v,a)}}pyramid(t,e,n,s,r,o,a){this.hip(t-n*.5,e-s*.5,t+n*.5,e+s*.5,r,o,a,Math.min(n,s)*.5)}bar(t,e,n,s,r,o,a,l,c,h=0){let u=s-t,d=r-e,f=o-n;const g=Math.hypot(u,d,f);if(g<1e-9)return;u/=g,d/=g,f/=g;let v,m,p;Math.abs(d)<.92?(v=0,m=1,p=0):(v=1,m=0,p=0);let M=d*p-f*m,_=f*v-u*p,x=u*m-d*v;const T=Math.hypot(M,_,x);M/=T,_/=T,x/=T;const y=d*x-f*_,w=f*M-u*x,E=u*_-d*M,b=[],S=[],I=[1,-1,-1,1],O=[1,1,-1,-1];for(let U=0;U<4;U++){const z=M*a*I[U]+y*l*O[U],W=_*a*I[U]+w*l*O[U],$=x*a*I[U]+E*l*O[U];b.push([t+z,e+W,n+$]),S.push([s+z,r+W,o+$])}for(let U=0;U<4;U++){const z=U+1&3;this.quad(b[z][0],b[z][1],b[z][2],b[U][0],b[U][1],b[U][2],S[U][0],S[U][1],S[U][2],S[z][0],S[z][1],S[z][2],c,h)}this.quad(S[0][0],S[0][1],S[0][2],S[1][0],S[1][1],S[1][2],S[2][0],S[2][1],S[2][2],S[3][0],S[3][1],S[3][2],c,h),this.quad(b[3][0],b[3][1],b[3][2],b[2][0],b[2][1],b[2][2],b[1][0],b[1][1],b[1][2],b[0][0],b[0][1],b[0][2],c,h)}wallQuad(t,e,n,s,r,o,a,l,c=0){switch(t&3){case 0:{const h=o-a;this.quad(s,n,h,e,n,h,e,r,h,s,r,h,l,c);return}case 1:{const h=o+a;this.quad(h,n,s,h,n,e,h,r,e,h,r,s,l,c);return}case 2:{const h=o+a;this.quad(e,n,h,s,n,h,s,r,h,e,r,h,l,c);return}default:{const h=o-a;this.quad(h,n,e,h,n,s,h,r,s,h,r,e,l,c);return}}}}function ge(i,t,e){const n=i.def.palette;return n&&n.length>t?n[t]:e}function Is(i,t,e,n,s){return wt(i.seedI+t*7,e*13+n*131,977)<s}function os(i){return .42+i.level*.06}function Ee(i,t,e,n,s,r,o,a,l,c,h,u=vn){if(l<1||c<1)return;const d=(s-n)/c,f=(a-o)/l,g=d*.52,v=f*.55,m=G(Fn);for(let p=0;p<l;p++){const M=o+(p+.5)*f;for(let _=0;_<c;_++){const x=n+(_+.5)*d,T=Is(t,p,_,e,h);i.wallQuad(e,x-g/2,M-v/2,x+g/2,M+v/2,r,.016,m,T?u:0)}}}function fa(i,t,e,n,s,r,o,a,l,c,h=2,u=vn){if(l<1)return;const d=(a-o)/l,f=d*.52,g=G(Fn),v=(s-n)/h;for(let m=0;m<l;m++){const p=o+(m+.5)*d;for(let M=0;M<h;M++){const _=n+M*v+v*.08,x=n+(M+1)*v-v*.08,T=Is(t,m,M,e,c);i.wallQuad(e,_,p-f/2,x,p+f/2,r,.016,g,T?u:0)}}}function Ds(i,t,e,n,s,r,o,a,l,c,h=2,u=vn){fa(i,t,0,e+.06,s-.06,n,o,a,l,c,h,u),fa(i,t,2,e+.06,s-.06,r,o,a,l,c,h,u),fa(i,t,1,n+.06,r-.06,s,o,a,l,c,h,u),fa(i,t,3,n+.06,r-.06,e,o,a,l,c,h,u)}function vi(i,t,e,n,s,r=.14,o=.24,a=Hx){i.wallQuad(t,e-r/2,s,e+r/2,s+o,n,.014,G(a))}function pi(i,t,e,n,s,r,o,a=.045,l=.08){i.box(t,r,e,n,r+l,e+a,o,o),i.box(t,r,s-a,n,r+l,s,o,o),i.box(t,r,e+a,t+a,r+l,s-a,o,o),i.box(n-a,r,e+a,n,r+l,s-a,o,o)}function Eo(i,t,e,n,s,r,o,a){const l=G(Ze),c=A(Ze,.7);for(let h=0;h<a;h++){const u=Nt(e,s-.16,t.r()),d=Nt(n,r-.14,t.r());i.box(u,o,d,u+.13+t.r()*.08,o+.08+t.r()*.07,d+.12,c,l)}}function t0(i,t,e,n,s,r=.09,o=Bx){const a=G(o);i.box(t-r/2,n,e-r/2,t+r/2,n+s,e+r/2,a,A(o,.75)),i.box(t-r*.68,n+s,e-r*.68,t+r*.68,n+s+.03,e+r*.68,A(o,.6),A(2763306,1))}function kr(i,t,e,n,s,r){i.bar(e,s,n,e,s+r,n,.014,.014,G(14211288));const o=G([4053977,14965327,15909198][(t.seedI+t.level)%3]);i.quad(e,s+r-.02,n,e+.22,s+r-.05,n,e+.22,s+r-.13,n,e,s+r-.16,n,o),i.quad(e,s+r-.16,n,e+.22,s+r-.13,n,e+.22,s+r-.05,n,e,s+r-.02,n,o)}function Bi(i,t,e,n,s,r){const o=.03*s;i.bar(t,n,e,t,n+.16*s,e,o,o,G(Cr));const a=A(zx,.85+wt(r,3,11)*.4),l=(.11+wt(r,5,13)*.05)*s;i.dome(t,e,n+.12*s,l,5,2,a,1.5)}function Us(i,t,e,n,s,r,o=.1){i.box(t,r,e,n,r+o,s,A(Zc,.85),G(Zc))}function Ha(i,t,e,n,s){const r=A(Cr,1.2);s?i.box(t-.08,n+.03,e-.025,t+.08,n+.05,e+.025,r,r):i.box(t-.025,n+.03,e-.08,t+.025,n+.05,e+.08,r,r)}function wo(i,t,e,n,s=.34){i.bar(t,n,e,t,n+s,e,.012,.012,A(4474956,1));const r=G(16773833);i.box(t-.03,n+s,e-.03,t+.03,n+s+.045,e+.03,r,r,_n)}function Rn(i,t,e,n,s,r,o,a,l=-1,c=0,h=0){const d=(f,g,v)=>{if(!(v-g<.02))switch(f){case 0:i.box(g,r,e-.018,v,r+o,e+.018,a,a);return;case 1:i.box(n-.018,r,g,n+.018,r+o,v,a,a);return;case 2:i.box(g,r,s-.018,v,r+o,s+.018,a,a);return;default:i.box(t-.018,r,g,t+.018,r+o,v,a,a);return}};for(let f=0;f<4;f++){const g=f===0||f===2?t:e,v=f===0||f===2?n:s;f===l?(d(f,g,Math.max(g,c)),d(f,Math.min(v,h),v)):d(f,g,v)}}function di(i,t,e,n,s,r,o,a=9){i.cyl(t,e,n,n+r,s,s,a,G(o),A(o,.82)),i.cyl(t,e,n+r,n+r+s*.3,s,s*.35,a,A(o,.9),A(o,.8))}function Rr(i,t,e,n,s,r){const o=[12737354,4882370,12756042,5939306,9080726];for(let a=0;a<r;a++){const l=e+(t.r()-.5)*.5,c=n+(t.r()-.5)*.5,h=.1+t.r()*.06,u=o[t.r()*o.length|0];i.box(l,s,c,l+h*1.7,s+h+(t.r()<.4?h:0),c+h,A(u,.9),G(u))}}function Pr(i,t,e,n,s,r,o){i.cyl(t,e,n,n+s,r,r,6,o,null)}function _r(i,t=0){return G(Cd[wt(i.seedI,71+t,5)*Cd.length|0])}function Vx(i,t){const e=t.w>1,n=t.w,s=t.h,r=t.r,o=ge(t,0,14207924),a=ge(t,1,9132604),l=ge(t,2,7294519),c=A(o,.94+r()*.12),h=A(a,.9+r()*.2),u=e||t.level>=3&&r()<.55?2:1,d=e?.42:.34,f=u*d;i.flat(.02,.02,n-.02,s-.02,.012,A(Ar,.9+r()*.2));const g=e?n*.62:.5+r()*.1,v=e?s*.5:.42+r()*.08,m=e?(n-g)/2:.1+r()*(n-g-.28),p=e?.28:.16+r()*.08;i.box(m,0,p,m+g,f,p+v,c,c);const M=!e&&r()<.4;let _=null;if(M){const S=v*.7,I=m+g-.06;I+.24<n-.06&&(i.box(I,0,p+.05,I+.24,d,p+.05+S,c,c),_=[I,p+.05,I+.24,p+.05+S])}const x=e||r()<.45,T=.035;x?i.hip(m-T,p-T,m+g+T,p+v+T,f,e?.34:.22+r()*.08,h,Math.min(g,v)*.36):i.gable(m-T,p-T,m+g+T,p+v+T,f,.2+r()*.1,r()<.5,h,c),_&&i.gable(_[0]-.02,_[1]-.02,_[2]+.02,_[3]+.02,d,.13,!1,h,c),t0(i,m+g*(.22+r()*.5),p+v*.5,f+.1,.16+r()*.08,e?.09:.07);const y=os(t);if(Ee(i,t,0,m+.05,m+g-.05,p,.05,f-.04,u,e?4:2,y),Ee(i,t,1,p+.04,p+v-.04,m+g,.05,f-.04,u,2,y*.8),Ee(i,t,3,p+.04,p+v-.04,m,.05,f-.04,u,2,y*.8),vi(i,0,m+g*(e?.5:.3),p,0,e?.16:.12,e?.3:.24),e||r()<.6){const b=m+g*(e?.3:.14),S=m+g*(e?.7:.5),I=.1;i.flat(b,p-I,S,p,.035,A(l,1.1));const O=A(Ne,.95);i.bar(b+.02,.03,p-I+.02,b+.02,d*.8,p-I+.02,.013,.013,O),i.bar(S-.02,.03,p-I+.02,S-.02,d*.8,p-I+.02,.013,.013,O),i.quad(S+.02,d*.8,p-I-.01,b-.02,d*.8,p-I-.01,b-.02,d*.95,p+.02,S+.02,d*.95,p+.02,h),e&&(Pr(i,b+.05,p-I+.05,.03,d*1.6,.03,G(Ne)),Pr(i,S-.05,p-I+.05,.03,d*1.6,.03,G(Ne)))}const w=!e&&!M&&r()<.45,E=w?m+g+.02:m+g*.72;w&&E+.26<n-.02?(i.box(E,0,p+.02,E+.26,.26,p+.3,c,h),i.wallQuad(0,E+.03,.02,E+.23,.2,p+.02,.012,A(Ne,.85)),i.flat(E+.02,0,E+.24,p+.02,.02,G(Ae))):i.flat(E-.07,0,E+.07,p,.02,G(Ae)),Rn(i,.06,.06,n-.06,s-.06,.012,e?.09:.07,e?A(9080726,1):G(za),0,E-.09,E+.11),r()<.75&&Us(i,m-.04,p+v+.05,m+g*.5,p+v+.13,.012,.07+r()*.05),r()<.85&&Bi(i,n-.18,s-.2,.012,.8+r()*.7,t.seedI+5),e&&(Bi(i,.2,s-.24,.012,1.1,t.seedI+9),kr(i,t,m+g+.12,p+.1,.012,.7))}function Wx(i,t){const e=t.r,n=2+(e()*2|0),s=.09,r=.62+e()*.1,o=.14,a=ge(t,0,13942696);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ae));const l=os(t);let c=s;const h=(t.w-s*2)/n;for(let u=0;u<n;u++){const d=t.ht*(.82+e()*.3)*.42,f=A(a,.8+e()*.35),g=c+h-.015;i.box(c,0,o,g,d,o+r,f,A(Ui,.9)),i.box(c-.012,d-.035,o-.02,g+.012,d,o+r+.01,A(a,.6),A(a,.62)),e()<.5&&i.box(c+h*.3,d,o+r*.4,c+h*.6,d+.07,o+r*.7,A(Ui,1.2),A(Ui,1.35));const v=Math.max(2,Math.round(d/.3));Ee(i,t,0,c+.04,g-h*.34,o,.3,d-.05,v-1,1,l),Ee(i,t,2,c+.04,g-.04,o+r,.3,d-.05,v-1,2,l*.7);const m=c+h*.76;vi(i,0,m,o,.06,.11,.2),i.box(m-.07,0,o-.09,m+.07,.03,o,G(Ae),G(Ae)),i.box(m-.07,.03,o-.05,m+.07,.06,o,G(Ae),G(Ae)),c+=h}Us(i,.08,o+r+.06,t.w-.08,o+r+.13,.012,.07),e()<.6&&Bi(i,t.w*.5,t.h-.12,.012,.7,t.seedI+3)}function Xx(i,t){const e=t.r,n=t.ht,s=.08;i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ae));const r=ge(t,0,12629934),o=A(r,.92+e()*.14),a=A(ge(t,1,8219485),1),l=Math.min(.4,n*.18);i.box(s,0,s,t.w-s,l,t.h-s,o,A(r,.8));const c=s+.05,h=s+.07,u=t.w-s-.05,d=t.h-s-.05;i.box(c,l,h,u,n,d,o,A(Ui,1));const f=Vt(Math.round(n/.42),3,14),g=os(t);Ds(i,t,c,h,u,d,l+.05,n-.1,f,g,2);const v=A(r,.7),m=Vt(f-1,2,8);for(let p=1;p<=m;p++){const M=l+(n-l-.15)*p/(m+1);if(Is(t,p,99,7,.75)){const _=c+.08,x=c+.08+(u-c-.16)*.4;i.box(_,M,h-.06,x,M+.018,h+.01,v,v),i.box(_,M+.018,h-.062,x,M+.07,h-.045,a,a)}if(Is(t,p,98,8,.75)){const _=u-.08-(u-c-.16)*.4,x=u-.08;i.box(_,M,h-.06,x,M+.018,h+.01,v,v),i.box(_,M+.018,h-.062,x,M+.07,h-.045,a,a)}}i.box(u-.16,l,d-.02,u-.02,n+.1,d+.06,A(r,.75),A(r,.7)),pi(i,c,h,u,d,n,A(r,.72)),Eo(i,t,c+.06,h+.06,u-.2,d-.1,n,3),n>5&&di(i,c+.14,h+.14,n,.07,.12,8225416,7),i.wallQuad(0,s+.05,.05,t.w-s-.3,l-.06,s,.016,G(16443320),Fs),vi(i,0,t.w-s-.18,s,0,.13,l*.7)}function qx(i,t){const e=t.r,n=t.ht;i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ae));const s=ge(t,0,9413819),r=ge(t,1,5991037),o=A(s,.94+e()*.12),a=A(r,1),l=Vt(n*.06,.35,.9),c=.06;i.box(c,0,c,t.w-c,l,t.h-c,o,A(s,.78)),i.wallQuad(0,c+.06,.08,t.w-c-.06,l-.08,c,.016,G(16771522),Fs),pi(i,c,c,t.w-c,t.h-c,l,A(s,.7),.04,.05);const h=.19+e()*.04,u=l+(n-l)*(.66+e()*.12),d=h,f=h,g=t.w-h,v=t.h-h;i.box(d,l,f,g,u,v,o,A(s,.8));const m=h+.08;i.box(m,u,m,t.w-m,n,t.h-m,o,A(Ui,.95));for(const[y,w]of[[d,f],[g,f],[d,v],[g,v]])i.box(y-.022,l,w-.022,y+.022,u+.02,w+.022,a,a);const p=os(t),M=Vt(Math.round((u-l)/.55),4,14),_=Vt(Math.round((n-u)/.55),2,8);Ds(i,t,d,f,g,v,l+.08,u-.08,M,p,2),Ds(i,t,m,m,t.w-m,t.h-m,u+.08,n-.1,_,p,2),pi(i,m,m,t.w-m,t.h-m,n,a,.04,.07);const x=t.w/2,T=t.h/2;if(i.box(x-.1,n,T-.1,x+.1,n+.14,T+.1,a,a),i.bar(x,n+.14,T,x,n+.55+e()*.3,T,.016,.016,G(14211288)),i.collect&&n>18){const[y,w,E]=i.toWorld(x,n+.6+e()*.25,T);$e.push({kind:1,x:y,y:w,z:E,yaw:0,speed:1,phase:wt(t.seedI,17,3),scale:.2})}}function Yx(i,t){const e=t.r,n=t.ht;i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ae));const s=ge(t,0,5210024),r=ge(t,1,2837091),o=e()<.4,a=o?3:2+(e()<.5?1:0),l=os(t),c=t.w/2,h=t.h/2;let u=0,d=t.w/2-.07;const f=d*Math.pow(o?.68:.62,a-1),g=A(r,1);for(let p=0;p<a;p++){const M=p===a-1?1:.42+.24*p+e()*.08,_=p===a-1?n:n*M,x=A(s,(o?1:.9)+p*.06);i.box(c-d,u,h-d,c+d,_,h+d,x,A(r,.9));const T=Vt(Math.round((_-u)/.62),2,16);Ds(i,t,c-d,h-d,c+d,h+d,u+.08,_-.08,T,l,d>.55?3:2);for(const[y,w]of[[c-d,h-d],[c+d,h-d],[c-d,h+d],[c+d,h+d]])i.box(y-.018,u,w-.018,y+.018,_,w+.018,g,g);pi(i,c-d,h-d,c+d,h+d,_,g,.035,.05),u=_,p<a-1&&(d*=o?.68:.62)}i.wallQuad(0,.14,.06,t.w-.14,.5,h-t.w/2+.07,.03,G(14676735),Fs);const v=_r(t,1);i.wallQuad(0,c-f+.03,n-.22,c+f-.03,n-.1,h-f,.02,v,_n),i.wallQuad(2,c-f+.03,n-.22,c+f-.03,n-.1,h+f,.02,v,_n),i.wallQuad(1,h-f+.03,n-.22,h+f-.03,n-.1,c+f,.02,v,_n),i.wallQuad(3,h-f+.03,n-.22,h+f-.03,n-.1,c-f,.02,v,_n);const m=.6+e()*.9;if(i.cyl(c,h,n,n+m,.05,.005,5,G(13620440)),i.collect){const[p,M,_]=i.toWorld(c,n+m+.06,h);$e.push({kind:1,x:p,y:M,z:_,yaw:0,speed:1,phase:wt(t.seedI,19,3),scale:.24})}}function $x(i,t){const e=t.r,n=ge(t,0,14731686),s=ge(t,1,11557450),r=A(n,.92+e()*.14);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ae));const o=t.level>=3?2:1,a=Vt(t.ht*.75,.5,1.5)*(o===2?1:.72),l=.07,c=.1,h=t.w-.07,u=t.h-.14;i.box(l,0,c,h,a,u,r,A(Ui,1.05)),pi(i,l,c,h,u,a,A(n,.68)),Eo(i,t,l+.05,c+.05,h-.2,u-.16,a,2),i.wallQuad(0,l+.05,.04,h-.05,a*(o===2?.4:.62),c,.018,G(16770746),Mo),vi(i,0,(l+h)/2,c,0,.12,a*.4,3817285);const d=a*(o===2?.44:.68);if(i.wallQuad(0,l+.08,d,h-.08,d+.13,c,.022,_r(t),Ni),e()<.65){const g=(h-l-.1)/3;for(let v=0;v<3;v++){const m=l+.05+v*g,p=v%2===0?A(s,1):G(Ne);i.quad(m+g,d-.02,c-.001,m,d-.02,c-.001,m,d-.1,c-.12,m+g,d-.1,c-.12,p),i.quad(m,d-.02,c-.001,m+g,d-.02,c-.001,m+g,d-.1,c-.12,m,d-.1,c-.12,A(5592405,1))}}o===2&&Ee(i,t,0,l+.06,h-.06,c,a*.58,a-.06,1,3,os(t)),Ee(i,t,2,l+.06,h-.06,u,a*.2,a-.08,o,2,os(t)*.6),i.flat(l+.04,u+.02,h-.04,t.h-.03,.02,G(Ns)),Rr(i,t,t.w*.5,t.h-.09,.02,2)}function jx(i,t){const e=t.r,n=ge(t,0,13154462),s=A(n,.95+e()*.1);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ae));const r=Vt(t.ht*.42,.7,2.6),o=.06,a=.2,l=t.w-.06,c=t.h-.08;i.box(o,0,a,l,r,c,s,A(Ui,1.1)),pi(i,o,a,l,c,r,A(n,.7)),Eo(i,t,o+.08,a+.1,l-.24,c-.2,r,4);const h=t.w*.32,u=t.w*.68;i.box(h,0,a-.1,u,r*1.18,a+.1,G(Fn),A(Fn,1.3),Fs),i.gable(h-.02,a-.12,u+.02,a+.12,r*1.18,.12,!0,A(Ze,1),A(Ze,.9)),i.wallQuad(0,o+.05,.05,h-.04,r*.5,a,.018,G(16770746),Mo),i.wallQuad(0,u+.04,.05,l-.05,r*.5,a,.018,G(16770746),Mo);const d=l-.1;i.box(d-.035,0,a-.16,d+.035,r*1.6,a-.1,A(5593696,1),A(5593696,1)),i.wallQuad(0,d-.09,r*1.15,d+.09,r*1.55,a-.16,.012,_r(t),Ni),i.flat(o,.02,l,a-.14,.018,G(Ns));for(let f=0;f<5;f++){const g=Nt(o+.08,l-.1,f/4);i.flat(g,.03,g+.016,a-.16,.022,G(14211278))}}function Kx(i,t){const e=t.r,n=t.ht;i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ae));const s=ge(t,0,8824767),r=ge(t,1,2837091),o=.11+e()*.03,a=o,l=o,c=t.w-o,h=t.h-o,u=Vt(n*.12,.32,.6),d=Vt(Math.round((n-u)/.5),3,16),f=(n-u)/d,g=A(r,1.05),v=A(s,1);i.box(a-.03,0,l-.03,c+.03,u,h+.03,A(r,.85),A(r,.8)),i.wallQuad(0,a+.03,.05,c-.03,u-.05,l-.03,.018,G(14216447),Fs);const m=os(t);i.box(a,u,l,c,n,h,v,A(r,.85));for(let p=0;p<d;p++){const M=u+p*f;i.box(a-.014,M+f*.72,l-.014,c+.014,M+f,h+.014,g,g)}if(Ds(i,t,a,l,c,h,u+.03,n-.05,d,m,3,vn),pi(i,a,l,c,h,n,g,.04,.06),Eo(i,t,a+.06,l+.06,c-.2,h-.16,n,3),i.collect&&n>18){i.bar(t.w/2,n,t.h/2,t.w/2,n+.32,t.h/2,.014,.014,G(14211288));const[p,M,_]=i.toWorld(t.w/2,n+.35,t.h/2);$e.push({kind:1,x:p,y:M,z:_,yaw:0,speed:1,phase:wt(t.seedI,23,3),scale:.18})}}function Zx(i,t){const e=t.r,n=[[9083730,7308354],[13215850,11899471],[8032074,9806940],[10120127,8673439]],s=n[e()*n.length|0];i.flat(.02,.02,t.w-.02,t.h-.02,.01,A(9136957,.9));const r=6+(e()*3|0),o=.05,a=t.h-.05;for(let v=0;v<r;v++){const m=.06+(t.w-.12)*v/r,p=(t.w-.12)/r*.55;i.box(m,.01,o,m+p,.035,a,A(s[v%2],1),G(s[v%2]))}const l=ge(t,0,11879215),c=.34+t.level*.03,h=.24+t.level*.02,u=.1,d=.08,f=.16+t.level*.02,g=A(l,.95+e()*.1);i.box(u,0,d,u+c,f,d+h,g,g);{const v=u-.02,m=u+c+.02,p=d-.02,M=d+h+.02,_=p+(M-p)*.2,x=M-(M-p)*.2,T=(p+M)/2,y=.18+t.level*.02,w=f+y*.6,E=f+y,b=A(9405559,1);i.quad(m,f,p,v,f,p,v,w,_,m,w,_,b),i.quad(m,w,_,v,w,_,v,E,T,m,E,T,b),i.quad(v,f,M,m,f,M,m,w,x,v,w,x,b),i.quad(v,w,x,m,w,x,m,E,T,v,E,T,b);const S=[[p,f],[_,w],[T,E],[x,w],[M,f]];for(let I=1;I<S.length-1;I++)i.tri(v,S[0][1],S[0][0],v,S[I+1][1],S[I+1][0],v,S[I][1],S[I][0],g),i.tri(m,S[0][1],S[0][0],m,S[I][1],S[I][0],m,S[I+1][1],S[I+1][0],g);i.wallQuad(3,d+h*.35,f*.3,d+h*.65,f+.06,u,.014,A(l,.55))}if(t.level>=2||e()<.5){const v=u+c+.12,m=d+.1;i.cyl(v,m,0,.34+t.level*.05,.07,.07,8,G(13225425),null),i.dome(v,m,.34+t.level*.05,.07,8,3,A(10134184,1))}if(t.level>=2){const v=t.w-.32,m=t.h-.3,p=.22,M=.18,_=G(15261900);i.box(v,0,m,v+p,.16,m+M,_,_),i.gable(v-.015,m-.015,v+p+.015,m+M+.015,.16,.09,!0,A(7294519,1),_),i.wallQuad(0,v+.04,.03,v+.1,.1,m,.012,G(Fn),Is(t,1,1,0,.8)?vn:0)}Rn(i,.03,.03,t.w-.03,t.h-.03,.01,.05,A(Cr,1.25)),e()<.7&&Bi(i,t.w-.14,.14,.01,.9,t.seedI+7)}function Jx(i,t){const e=t.r,n=ge(t,0,12103844),s=A(n,.92+e()*.14);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ns));const r=Vt(t.ht*.24,.42,.9),o=.08,a=.12,l=t.w-.24,c=t.h-.1;i.box(o,0,a,l,r,c,s,A(n,.75));const h=o+(l-o)*.25,u=l-(l-o)*.25;i.box(h,r,a+.08,u,r+.1,c-.08,G(Fn),A(n,.7),On),i.gable(h-.02,a+.06,u+.02,c-.06,r+.1,.07,!0,A(Ui,1.1),A(n,.7)),i.wallQuad(0,o+.06,0,o+.34,r*.66,a,.014,A(9343898,1)),i.wallQuad(0,o+.4,r*.25,l-.06,r*.6,a,.014,G(Fn),Is(t,0,2,0,.6)?vn:0),Rr(i,t,l+.14,t.h*.4,.012,3),Rn(i,.04,.04,t.w-.04,t.h-.04,.012,.08,A(7830916,1),0,o+.02,o+.38),t0(i,l-.1,c-.14,r,.16,.05,6975349)}function Qx(i,t){const e=t.r,n=ge(t,0,11052186),s=A(n,.9+e()*.16);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ns));const r=Vt(t.ht*.28,.5,1.6),o=.07,a=.1,l=t.w-.07,c=t.h-.3;i.box(o,0,a,l,r,c,s,A(n,.7));const h=3+(e()*2|0),u=(c-a)/h,d=.14,f=A(n,.68),g=G(Fn);for(let p=0;p<h;p++){const M=a+p*u,_=M+u;i.wallQuad(0,o+.01,r,l-.01,r+d,M,-.001,g,On),i.quad(l,r+d,M,o,r+d,M,o,r,_,l,r,_,f),i.tri(o,r,M,o,r,_,o,r+d,M,s),i.tri(l,r,_,l,r,M,l,r+d,M,s)}const v=t.level>=2?2:1;for(let p=0;p<v;p++){const M=o+.16+p*.3;i.cyl(M,c-.12,r,r+.5+t.level*.12,.05,.04,7,A(9076856,1),A(5919822,1)),i.cyl(M,c-.12,r+.42+t.level*.12,r+.5+t.level*.12,.048,.048,7,A(11552058,1),null)}di(i,l-.14,a+.14,0,.09,.3,10134184),i.bar(l-.14,.28,a+.14,l-.02,r*.5,a+.3,.02,.02,G(Ze));const m=.14;i.box(o+.05,0,c,o+.55,m,c+.12,A(Ie,.85),G(Ie)),i.box(o+.05,m+.14,c,o+.55,m+.18,c+.14,A(5593696,1),A(5593696,1)),i.wallQuad(2,o+.1,.02,o+.28,m+.12,c,.013,A(7830916,1)),i.wallQuad(2,o+.32,.02,o+.5,m+.12,c,.013,A(7830916,1)),Rr(i,t,t.w-.24,t.h-.16,.012,3)}function ty(i,t){const e=t.r;i.flat(.02,.02,t.w-.02,t.h-.02,.012,A(Ns,1.1));const n=ge(t,0,11581112),s=2+(e()*2|0);for(let d=0;d<s;d++){const f=.2+d%2*.34,g=t.h-.24-(d/2|0)*.3;di(i,f,g,0,.12+e()*.03,.2+e()*.1,n,10)}const r=Vt(t.ht*.75,1.2,2.2);for(let d=0;d<2;d++){const f=t.w-.2-d*.22,g=.2+d*.12;i.cyl(f,g,0,r-d*.3,.055,.05,8,A(n,1.05),A(n,.85));for(let v=1;v<=2;v++){const m=(r-d*.3)*v/3;i.cyl(f,g,m,m+.02,.075,.075,8,A(6975605,1),A(6975605,1))}}const o=t.w*.5,a=.12;i.cyl(o,a,0,r*1.15,.028,.024,6,A(n,.9),null),i.box(o-.035,r*1.15,a-.035,o+.035,r*1.15+.07,a+.035,G(16754237),G(16763230),_n);const l=.16,c=.16;i.cyl(l,c,0,r,.05,.042,7,G(Ne),null),i.cyl(l,c,r*.55,r*.65,.052,.05,7,A(11552058,1),null),i.cyl(l,c,r*.85,r*.95,.05,.046,7,A(11552058,1),null);const h=.12;i.bar(.14,h,t.h-.3,t.w-.2,h,.28,.018,.018,G(Ze)),i.bar(.14,h+.05,t.h-.3,t.w-.2,h+.05,.28,.018,.018,A(13214794,1));for(let d=0;d<3;d++){const f=.2+d*.3,g=Nt(.14,t.w-.2,f),v=Nt(t.h-.3,.28,f);i.bar(g,0,v,g,h+.05,v,.015,.015,A(6975605,1))}const u=A(n,.9);i.box(.08,0,.34,.5,.34,t.h-.5,u,A(n,.72)),Ee(i,t,0,.12,.46,.34,.1,.28,1,2,.6,On),Rn(i,.04,.04,t.w-.04,t.h-.04,.012,.08,A(7830916,1))}function ey(i,t){const e=t.r,n=ge(t,0,10462118),s=A(n,.92+e()*.12);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ns));const r=Vt(t.ht*.16,.4,.85),o=t.key==="x_military",a=.07,l=.1,c=t.w-.07,h=o?t.h*.5:t.h-.34,u=o?A(7043666,1):s;i.box(a,0,l,c,r,h,u,A(o?5924933:n,.72)),i.hip(a-.02,l-.02,c+.02,h+.02,r,.1,o?A(5332544,1):A(n,.66),.14);const d=Vt(Math.round((c-a)/.4),2,6);for(let f=0;f<d;f++){const g=a+.1+f*((c-a-.2)/d);i.wallQuad(0,g,.02,g+(c-a-.2)/d-.08,r*.7,l,.014,A(8685967,1))}if(i.box(a-.012,r-.05,l-.012,c+.012,r-.02,h+.012,A(n,.6),A(n,.6)),Rr(i,t,t.w*.3,h+.24,.012,o?2:4),Rr(i,t,t.w*.7,h+.2,.012,3),Rn(i,.04,.04,t.w-.04,t.h-.04,.012,.09,A(7830916,1),0,a+.05,c-.05),o){const f=t.w-.4,g=t.h-.42;for(const[p,M]of[[-.08,-.08],[.08,-.08],[-.08,.08],[.08,.08]])i.bar(f+p,0,g+M,f+p*.7,.5,g+M*.7,.02,.02,A(5924933,1));i.box(f-.11,.5,g-.11,f+.11,.66,g+.11,A(7043666,1),A(5332544,1)),i.wallQuad(0,f-.08,.54,f+.08,.62,g-.11,.012,G(Fn),On),i.pyramid(f,g,.26,.26,.66,.08,A(5332544,1));const v=.5,m=t.h-.55;if(i.disc(v,m,.018,.34,12,A(4869715,1)),i.box(v-.16,.02,m-.03,v+.16,.028,m+.03,G(14211278),G(14211278)),i.box(v-.16,.02,m-.14,v-.1,.028,m+.14,G(14211278),G(14211278)),i.box(v+.1,.02,m-.14,v+.16,.028,m+.14,G(14211278),G(14211278)),i.collect){const[p,M,_]=i.toWorld(f,.8,g);$e.push({kind:2,x:p,y:M,z:_,yaw:0,speed:1.4,phase:wt(t.seedI,31,3),scale:.5})}kr(i,t,.24,.24,.012,.8)}}function ny(i,t){t.r;const e=t.w,n=t.h;i.flat(.03,.03,e-.03,n-.03,.014,A(Ie,.8)),Rn(i,.05,.05,e-.05,n-.05,.014,.1,A(7830916,1),0,e*.35,e*.65);const s=t.key;if(s==="p_hydro"){const u=A(Ie,.95);i.quad(e-.06,.02,.05,.06,.02,.05,.18,t.ht*.55,.55,e-.18,t.ht*.55,.55,u),i.box(.06,0,.05,e-.06,.1,.2,u,u),i.box(.14,0,.5,e-.14,t.ht*.55,.72,u,A(Ie,.8));for(let d=0;d<3;d++){const f=.22+d*((e-.44)/2.2);i.wallQuad(0,f,.06,f+.16,t.ht*.4,.5,.014,A(5204861,1),On)}i.cyl(.3,.4,0,t.ht*.72,.09,.08,7,u,A(Ie,.85)),i.cyl(e-.3,.4,0,t.ht*.72,.09,.08,7,u,A(Ie,.85)),i.box(.3,0,.8,e-.3,.5,n-.2,A(10135728,1),A(7832716,1)),Ee(i,t,2,.4,e-.4,n-.2,.14,.42,1,4,.8,vn);return}if(s==="p_nuclear"){for(const u of[e*.3,e*.7]){const d=n*.62,f=t.ht*.9;if(i.cyl(u,d,0,f*.68,.62,.4,11,G(14672870),null),i.cyl(u,d,f*.68,f,.4,.46,11,G(13949404),null),i.cyl(u,d,f,f+.001,.46,.3,11,A(3159611,1),null),i.collect){const[g,v,m]=i.toWorld(u+.46,f+.06,d);$e.push({kind:1,x:g,y:v,z:m,yaw:0,speed:1,phase:wt(t.seedI,41+u*10,3),scale:.22})}}i.cyl(e*.5,n*.22,0,.5,.34,.34,10,G(15264750),null),i.dome(e*.5,n*.22,.5,.34,10,4,G(14672870)),i.box(.14,0,.05,e-.14,.42,.34,A(12107974,1),A(9410461,1)),Ee(i,t,0,.24,e-.24,.05,.12,.34,1,6,.8,vn);return}if(s==="p_fusion"){const u=e*.5,d=n*.52;i.cyl(u,d,0,.5,1.05,1.05,14,A(13226712,1),A(11187387,1)),i.dome(u,d,.5,1.05,14,5,A(14213349,1),.75),i.cyl(u,d,.42,.54,1.07,1.07,14,G(4053977),null,_n);for(let f=0;f<8;f++){const g=f/8*Math.PI*2,v=u+Math.cos(g)*1.2,m=d+Math.sin(g)*1.2;i.box(v-.06,0,m-.06,v+.06,.7+f%2*.15,m+.06,A(7832716,1),G(4053977),f%2===0?On:0)}if(i.box(.2,0,n-.6,e-.2,.46,n-.1,A(12107974,1),A(9410461,1)),Ee(i,t,0,.3,e-.3,n-.6,.12,.4,1,6,.85,vn),i.collect){const[f,g,v]=i.toWorld(u,1.319,d);$e.push({kind:1,x:f,y:g,z:v,yaw:0,speed:1,phase:wt(t.seedI,43,3),scale:.24})}return}if(s==="p_microwave"){const u=e*.5,d=n*.48;i.cyl(u,d,0,.3,.5,.5,12,A(Ie,.9),A(Ie,.8)),i.cyl(u,d,.3,1.15,.28,1.25,14,A(13949404,1),null),i.cyl(u,d,1.16,.36,1.22,.24,14,A(15791093,1),null);for(let f=0;f<3;f++){const g=f/3*Math.PI*2+.5;i.bar(u+Math.cos(g)*1.05,1.05,d+Math.sin(g)*1.05,u,t.ht*.16+1.5,d,.022,.022,G(Ze))}i.box(u-.07,t.ht*.16+1.44,d-.07,u+.07,t.ht*.16+1.62,d+.07,G(16747325),G(16763230),Ni),i.box(.16,0,n-.52,e*.55,.4,n-.08,A(12107974,1),A(9410461,1)),Ee(i,t,0,.24,e*.5,n-.52,.1,.34,1,4,.8,vn);return}const r=s==="p_coal",o=s==="p_oil",a=ge(t,0,r?9274748:11581112),l=A(a,.95),c=t.ht*.32;i.box(.14,0,n*.42,e-.14,c,n-.14,l,A(a,.72)),i.gable(.12,n*.42-.02,e-.12,n-.12,c,.16,!0,A(a,.66),l),Ee(i,t,0,.3,e-.3,n*.42,c*.35,c*.85,1,6,.8,vn);const h=r?2:1;for(let u=0;u<h;u++){const d=e*.3+u*e*.24,f=n*.28;if(i.cyl(d,f,0,t.ht,.11,.08,8,A(10327693,1),A(4867392,1)),i.cyl(d,f,t.ht*.82,t.ht*.9,.095,.088,8,A(11552058,1),null),i.collect&&u===0){const[g,v,m]=i.toWorld(d,t.ht+.08,f);$e.push({kind:1,x:g,y:v,z:m,yaw:0,speed:1,phase:wt(t.seedI,47,3),scale:.2})}}r?(i.pyramid(e*.72,n*.2,.7,.5,.014,.3,A(2895408,1)),i.bar(e*.72,.26,n*.2,e*.5,c*.8,n*.45,.05,.02,A(6975605,1))):o?(di(i,e*.68,n*.18,0,.22,.28,10134184,11),di(i,e*.86-.12,n*.3,0,.15,.22,10134184,10)):(di(i,e*.74,n*.2,0,.18,.24,13225425,10),i.bar(e*.74,.1,n*.2,e*.5,.1,n*.45,.02,.02,A(13214794,1)))}function iy(i,t){const e=t.r,n=t.ht*.82,s=t.w/2,r=t.h/2;i.disc(s,r,.016,.22,8,A(Ie,.9)),i.cyl(s,r,0,n,.075,.038,8,G(15659507),null);const o=e()*Math.PI*2,a=s-Math.sin(o)*.02,l=r-Math.cos(o)*.02;if(i.boxR(a,l,.14,.3,n-.07,n+.07,o,G(14870249),A(11552058,1)),vi(i,0,s,r-.075,0,.09,.16,5333099),i.collect){const c=s+Math.sin(o)*.17,h=r+Math.cos(o)*.17,[u,d,f]=i.toWorld(c,n,h);$e.push({kind:0,x:u,y:d,z:f,yaw:i.worldYaw(Math.atan2(Math.sin(o),Math.cos(o))),speed:(.9+e()*1.3)*(e()<.5?1:-1),phase:e()*Math.PI*2,scale:t.ht*.34})}}function sy(i,t){t.r,i.flat(.03,.03,t.w-.03,t.h-.03,.012,A(12166010,.9));const e=4,n=3,s=A(1915487,1.1);for(let r=0;r<e;r++){const o=.3+r*((t.h-.7)/(e-1));for(let a=0;a<n;a++){const l=.4+a*((t.w-.8)/(n-1));i.bar(l-.28,0,o,l-.28,.09,o,.014,.014,G(Ze)),i.bar(l+.28,0,o,l+.28,.09,o,.014,.014,G(Ze)),i.bar(l-.34,.2,o-.14,l+.34,.09,o+.14,.02,.34,s)}}i.box(t.w-.4,0,t.h-.32,t.w-.12,.2,t.h-.1,A(Ie,.95),A(Ie,.8)),Rn(i,.05,.05,t.w-.05,t.h-.05,.012,.08,A(7830916,1))}function ry(i,t){t.r;const e=t.w/2,n=t.h/2;if(t.key==="w_pump"){i.flat(.04,.04,t.w-.04,t.h-.04,.014,A(Ie,.85));const h=A(ge(t,0,9417673),1);i.box(.3,0,.5,t.w-.3,.45,t.h-.24,h,A(5995148,1)),i.gable(.28,.48,t.w-.28,t.h-.22,.45,.14,!0,A(5333099,1),h),Ee(i,t,0,.4,t.w-.4,.5,.14,.38,1,2,.7,vn),i.bar(e,.12,.5,e,.08,-.12,.05,.05,G(Ze)),i.cyl(e,.16,0,.24,.1,.1,8,A(Ze,.9),A(Ze,.8)),di(i,t.w-.34,t.h-.5,0,.11,.2,10470356,9);return}i.disc(e,n,.016,.34,9,A(Ie,.9));const s=Vt(t.ht,6,9),r=Vt(s*.48,3,4.25),o=Vt(s*.34,2.1,2.8),a=Math.min(t.w,t.h)*.31,l=A(8225416,1);for(const[h,u]of[[-.26,-.26],[.26,-.26],[-.26,.26],[.26,.26]])i.bar(e+h,0,n+u,e+h*.45,r,n+u*.45,.028,.028,l);i.bar(e-.26,.05,n-.26,e+.12,r*.55,n-.12,.014,.014,l),i.bar(e+.26,.05,n-.26,e-.12,r*.55,n-.12,.014,.014,l),i.cyl(e,n,0,r,.05,.05,7,A(6975605,1),null),i.cyl(e,n,r-.04,r,a+.04,a+.04,12,A(6975605,1),null);const c=ge(t,0,13225425);if(i.cyl(e,n,r,r+o*.22,a*.72,a,12,A(c,.92),null),i.cyl(e,n,r+o*.22,r+o*.78,a,a,12,A(c,1),null),i.cyl(e,n,r+o*.78,r+o,a,a*.62,12,A(c,.94),null),i.cyl(e,n,r+o,r+o+.18,a*.62,.02,12,A(c,.88),null),i.collect&&t.ht>7){const[h,u,d]=i.toWorld(e,r+o+.34,n);$e.push({kind:1,x:h,y:u,z:d,yaw:0,speed:1,phase:wt(t.seedI,53,3),scale:.16})}}function oy(i,t){const e=t.key;if(e==="w_treat")return ay(i,t);if(e==="w_desal")return ly(i,t);if(e==="s_prison")return cy(i,t);const n=t.r,s=t.w,r=t.h,o=e.startsWith("s_police"),a=e.startsWith("s_fire"),l=e==="e_library",c=o?12897748:a?13063496:ge(t,0,14209732),h=A(c,.96+n()*.08),u=A(c,.72);i.flat(.02,.02,s-.02,r-.02,.012,G(Ae));const d=Vt(t.ht*.45,.6,3.2),f=.12,g=.22,v=s-.12,m=r-.14;i.box(f,0,g,v,d,m,h,A(c,.8)),pi(i,f,g,v,m,d,u);const p=.75,M=Vt(Math.round(d/.5),1,5);Ee(i,t,0,f+.08,v-.08,g,.28,d-.08,M,Vt(s*2,2,6)|0,p),Ee(i,t,1,g+.08,m-.08,v,.28,d-.08,M,Vt(r*2,2,5)|0,p*.8),Ee(i,t,3,g+.08,m-.08,f,.28,d-.08,M,Vt(r*2,2,5)|0,p*.8);const _=s*.5-.24,x=s*.5+.24;if(i.box(_,0,g-.14,x,.04,g,G(Ae),G(Ae)),i.box(_+.03,.04,g-.08,x-.03,.08,g,G(Ae),G(Ae)),l||!o&&!a){const T=l?4:2;for(let y=0;y<T;y++){const w=Nt(_+.06,x-.06,y/(T-1));Pr(i,w,g-.09,.08,d*.62,.028,G(Ne))}i.gable(_-.02,g-.13,x+.02,g+.05,d*.7,.12,!0,u,G(Ne))}if(vi(i,0,s*.5,g,.08,.18,.3,4866100),o&&(i.wallQuad(0,f+.05,d*.42,v-.05,d*.56,g,.02,G(2973598),_n),i.disc(s*.5,g-.001,d+0,.001,4,u),i.box(s*.5-.09,d,g+.1,s*.5+.09,d+.05,g+.2,G(2973598),G(5214164),_n),kr(i,t,v-.1,g-.1,.012,.6)),a){for(let T=0;T<2;T++){const y=f+.14+T*((v-f-.28)/1.4);i.wallQuad(0,y,.02,y+(v-f)*.26,d*.6,g,.018,A(13949404,1))}i.box(v-.24,0,m-.24,v-.04,d*1.9,m-.04,h,A(9387315,1)),i.wallQuad(0,v-.2,d*1.5,v-.08,d*1.7,m-.24,.014,G(16763196),_n)}if(l&&i.wallQuad(0,_+.05,d*.72,x-.05,d*.84,g,.024,A(13214794,1.1),_n),(e==="s_police_hq"||e==="s_fire_hq")&&(i.bar(s*.5,d,r*.6,s*.5,d+.7,r*.6,.016,.016,G(14211288)),i.collect)){const[T,y,w]=i.toWorld(s*.5,d+.74,r*.6);$e.push({kind:1,x:T,y,z:w,yaw:0,speed:1,phase:wt(t.seedI,61,3),scale:.16})}}function ay(i,t){t.r,i.flat(.03,.03,t.w-.03,t.h-.03,.014,A(Ie,.85));for(const[n,s]of[[t.w*.3,t.h*.62],[t.w*.7,t.h*.62]])i.cyl(n,s,0,.12,.5,.5,12,A(Ie,.95),null),i.disc(n,s,.1,.46,12,A(4161423,1.1)),i.bar(n-.46,.14,s,n+.46,.14,s,.02,.014,G(Ze));const e=A(ge(t,0,12107974),1);i.box(.14,0,.1,t.w-.14,.4,t.h*.36,e,A(9410461,1)),Ee(i,t,0,.24,t.w-.24,.1,.12,.34,1,5,.75,vn),i.bar(t.w*.3,.1,t.h*.4,t.w*.3,.1,t.h*.6,.03,.03,G(Ze)),i.bar(t.w*.7,.1,t.h*.4,t.w*.7,.1,t.h*.6,.03,.03,G(Ze)),di(i,t.w-.3,t.h-.26,0,.13,.24,10470356,9),Rn(i,.05,.05,t.w-.05,t.h-.05,.014,.08,A(7830916,1))}function ly(i,t){t.r,i.flat(.03,.03,t.w-.03,t.h-.03,.014,A(Ie,.85)),i.box(t.w*.4,0,0,t.w*.6,.06,.5,A(Ie,.8),A(4161423,1.15)),i.bar(t.w*.5,.1,.05,t.w*.5,.1,.6,.06,.06,G(Ze));const e=A(ge(t,0,13620954),1);for(let n=0;n<2;n++){const s=.6+n*.9;i.box(.2,0,s,t.w-.6,.44,s+.7,e,A(10134699,1)),i.gable(.18,s-.02,t.w-.58,s+.72,.44,.12,!0,A(7832716,1),e),Ee(i,t,0,.3,t.w-.7,s,.14,.38,1,6,.7,vn)}di(i,t.w-.34,t.h*.4,0,.16,.3,10470356,10),di(i,t.w-.34,t.h*.7,0,.16,.3,10470356,10),Rn(i,.05,.05,t.w-.05,t.h-.05,.014,.08,A(7830916,1),0,t.w*.38,t.w*.62)}function cy(i,t){t.r;const e=t.w,n=t.h;i.flat(.03,.03,e-.03,n-.03,.014,A(Ie,.72));const s=A(11053216,.95),r=.05,o=.3;i.box(.1,0,.1,e-.1,o,.1+r,s,s),i.box(.1,0,n-.1-r,e-.1,o,n-.1,s,s),i.box(.1,0,.1,.1+r,o,n-.1,s,s),i.box(e-.1-r,0,.1,e-.1,o,n-.1,s,s);for(const[l,c]of[[.16,.16],[e-.16,.16],[.16,n-.16],[e-.16,n-.16]])i.bar(l,0,c,l,.55,c,.03,.03,s),i.box(l-.09,.55,c-.09,l+.09,.7,c+.09,A(9079426,1),A(7303016,1)),i.wallQuad(0,l-.06,.58,l+.06,.67,c-.09,.012,G(16773833),_n),i.pyramid(l,c,.22,.22,.7,.06,A(7303016,1));const a=A(ge(t,0,10326406),1);i.box(.3,0,n*.4,e-.3,.6,n*.62,a,A(7301730,1)),i.box(e*.42,0,n*.62,e*.58,.6,n-.24,a,A(7301730,1)),Ee(i,t,0,.4,e-.4,n*.4,.16,.52,2,8,.35,On),vi(i,0,e*.5,.1,0,.22,.26,3817285),i.flat(.3,.16,e*.6,n*.36,.018,A(8358511,1))}function hy(i,t){t.r;const e=t.w,n=t.h;i.flat(.02,.02,e-.02,n-.02,.012,G(Ae));const s=ge(t,0,15001834),r=A(s,.97),o=Vt(t.ht*.55,.9,8),a=e*.24,l=e*.76,c=.2,h=n-.24;i.box(a,0,c,l,o,h,r,A(s,.8));const u=o*.55;i.box(.1,0,c+.1,a,u,h-.1,r,A(s,.8)),i.box(l,0,c+.1,e-.1,u,h-.1,r,A(s,.8));const d=.85,f=Vt(Math.round(o/.5),2,10);Ds(i,t,a,c,l,h,.3,o-.08,f,d,2);const g=Vt(Math.round(u/.5),1,5);Ee(i,t,0,.16,a-.05,c+.1,.2,u-.06,g,3,d),Ee(i,t,0,l+.05,e-.16,c+.1,.2,u-.06,g,3,d);const v=e*.5,m=o*.82,p=G(14698556);if(i.wallQuad(0,v-.045,m-.13,v+.045,m+.13,c,.024,p,Ni),i.wallQuad(0,v-.13,m-.045,v+.13,m+.045,c,.024,p,Ni),i.box(v-.3,.3,c-.18,v+.3,.34,c,A(s,.85),A(s,.8)),i.bar(v-.28,0,c-.16,v-.28,.3,c-.16,.016,.016,G(Ze)),i.bar(v+.28,0,c-.16,v+.28,.3,c-.16,.016,.016,G(Ze)),vi(i,0,v,c,0,.2,.28,5333099),e>=3){const M=(a+l)/2,_=(c+h)/2;i.disc(M,_,o+.012,.34,12,A(4869715,1)),i.box(M-.14,o+.014,_-.026,M+.14,o+.02,_+.026,G(14211278),G(14211278)),i.box(M-.14,o+.014,_-.12,M-.09,o+.02,_+.12,G(14211278),G(14211278)),i.box(M+.09,o+.014,_-.12,M+.14,o+.02,_+.12,G(14211278),G(14211278))}else Eo(i,t,a+.05,c+.05,l-.2,h-.16,o,2);pi(i,a,c,l,h,o,A(s,.75))}function uy(i,t){const e=t.r,n=t.w,s=t.h;i.flat(.02,.02,n-.02,s-.02,.012,A(Ar,.95)),ge(t,0,13208922);const r=A(13208922,.95+e()*.08),o=Vt(t.ht*.4,.6,2.4),a=.12,l=n-.9,c=.2,h=s-.5;i.box(a,0,c,l,o,h,r,A(9396026,.9)),pi(i,a,c,l,h,o,A(9396026,.8)),Ee(i,t,0,a+.08,l-.08,c,.2,o-.08,2,5,.55),Ee(i,t,2,a+.08,l-.08,h,.2,o-.08,2,4,.4);const u=(a+l)/2;i.box(u-.16,0,c-.1,u+.16,o*.55,c,r,A(9396026,.85)),i.gable(u-.18,c-.12,u+.18,c+.02,o*.55,.1,!0,A(7293485,1),r),vi(i,0,u,c-.1,0,.14,.24,4866100),i.disc(u,c-.1-.012+0,o*.45,1e-4,3,G(Ne)),i.wallQuad(0,u-.05,o*.36,u+.05,o*.46,c-.1,.014,G(Ne),On),i.box(l+.05,0,c+.1,n-.14,o*.85,h,A(12103844,1),A(9077624,1)),i.gable(l+.03,c+.08,n-.12,h+.02,o*.85,.12,!1,A(7301730,1),A(12103844,1)),i.flat(a+.05,h+.08,n*.6,s-.08,.016,A(14196831,.9)),i.bar(n*.2,.02,s-.2,n*.34,.14,s-.32,.02,.02,G(14698556)),i.bar(n*.34,.14,s-.32,n*.4,.02,s-.26,.05,.012,A(16763196,1)),kr(i,t,n*.7,s-.24,.014,.7),Rn(i,.05,.05,n-.05,s-.05,.012,.06,G(za),0,u-.2,u+.2)}function dy(i,t){const e=t.r,n=t.w,s=t.h;i.flat(.02,.02,n-.02,s-.02,.012,A(Ar,1));const r=ge(t,0,10838602),o=A(r,.95+e()*.08),a=A(14209732,1),l=Vt(t.ht*.28,.7,2.6),c=.14,h=.5;i.box(c,0,c,n-c,l,c+h,o,A(r,.75)),i.box(c,0,s-c-h,n-c,l,s-c,o,A(r,.75)),i.box(c,0,c+h,c+h,l,s-c-h,o,A(r,.75)),i.box(n-c-h,0,c+h,n-c,l,s-c-h,o,A(r,.75));const u=.6;Ee(i,t,0,c+.1,n-c-.1,c,.16,l-.08,2,7,u),Ee(i,t,2,c+.1,n-c-.1,s-c,.16,l-.08,2,7,u*.8),Ee(i,t,1,c+h+.06,s-c-h-.06,n-c,.16,l-.08,2,5,u*.8),Ee(i,t,3,c+h+.06,s-c-h-.06,c,.16,l-.08,2,5,u*.8);const d=c+h+.06,f=n-c-h-.06,g=s-c-h-.06;i.flat(d,(s-.16)/2-.06,f,(s-.16)/2+.06,.02,G(Ae)),i.flat((n-.16)/2-.06,d,(n-.16)/2+.06,g,.021,G(Ae)),Us(i,d+.08,d+.08,d+.4,d+.4,.012),Us(i,f-.4,g-.4,f-.08,g-.08,.012),Bi(i,d+.5,g-.3,.012,1.1,t.seedI+11),Bi(i,f-.5,d+.3,.012,1,t.seedI+13);const v=n/2;i.box(v-.24,0,c-.05,v+.24,l*1.9,c+h+.05,o,a),i.pyramid(v,c+h*.5,.54,h+.14,l*1.9,.3,A(5333099,1)),i.disc(v,c-.05-.014,l*1.55,1e-4,3,G(Ne)),i.wallQuad(0,v-.07,l*1.45,v+.07,l*1.62,c-.05,.016,G(16446688),_n),vi(i,0,v,c-.05,0,.2,l*.6,4143667),i.box(c-.012,l-.05,c-.012,n-c+.012,l,c+h+.012,a,a),kr(i,t,v+.4,c-.12,.012,.8)}function fy(i,t){t.r;const e=t.w,n=t.h;i.flat(.02,.02,e-.02,n-.02,.012,G(Ae));const s=e/2,r=n/2,o=Vt(t.ht*.16,1.4,2.6),a=e*.46,l=n*.4,c=18,h=ge(t,0,14209732),u=A(h,.95),d=A(4091822,1),f=A(15659507,1),g=(v,m,p)=>{const M=v/c*Math.PI*2;return[s+Math.cos(M)*m,r+Math.sin(M)*p]};for(let v=0;v<c;v++){const m=(v+1)%c,[p,M]=g(v,a,l),[_,x]=g(m,a,l),[T,y]=g(v,a*.55,l*.5),[w,E]=g(m,a*.55,l*.5);i.quad(_,0,x,p,0,M,p,o,M,_,o,x,u,0),i.quad(p,o,M,_,o,x,w,o*.25,E,T,o*.25,y,d),i.quad(T,o*.25,y,w,o*.25,E,w,.05,E,T,.05,y,A(h,.8));const[b,S]=g(v,a*1.04,l*1.05),[I,O]=g(m,a*1.04,l*1.05),[U,z]=g(v,a*.72,l*.68),[W,$]=g(m,a*.72,l*.68);i.quad(b,o+.06,S,I,o+.06,O,W,o+.18,$,U,o+.18,z,f),i.quad(I,o+.02,O,b,o+.02,S,U,o+.14,z,W,o+.14,$,A(h,.7))}i.disc(s,r,.06,a*.52,16,A(5148477,1.1)),i.flat(s-a*.3,r-.012,s+a*.3,r+.012,.075,G(15266020)),i.flat(s-.012,r-l*.28,s+.012,r+l*.28,.075,G(15266020));for(const[v,m]of[[.2,.2],[e-.2,.2],[.2,n-.2],[e-.2,n-.2]]){i.bar(v,0,m,v,o*1.9,m,.026,.026,A(7830916,1));const p=s-v,M=r-m,_=Math.hypot(p,M),x=v+p/_*.12,T=m+M/_*.12;i.bar(v,o*1.9,m,x,o*1.98,T,.09,.05,G(16120058),Ni)}for(const v of[0,2]){const m=v===0?r-l:r+l;i.wallQuad(v,s-.3,.02,s+.3,o*.5,m,-.05,A(5333099,1))}}function py(i,t){const e=t.r,n=t.w,s=t.h,r=t.key;if(i.flat(.015,.015,n-.015,s-.015,.012,A(Ar,.95+e()*.15)),r==="l_sports"){i.flat(.3,.3,n-.3,s-.3,.02,A(5148477,1.15)),Rn(i,.26,.26,n-.26,s-.26,.02,.001,G(15266020)),i.flat(n/2-.012,.3,n/2+.012,s-.3,.026,G(15266020));for(const l of[.34,s-.34])i.bar(n/2-.12,.02,l,n/2-.12,.12,l,.012,.012,G(Ne)),i.bar(n/2+.12,.02,l,n/2+.12,.12,l,.012,.012,G(Ne)),i.bar(n/2-.12,.12,l,n/2+.12,.12,l,.012,.012,G(Ne));for(let l=0;l<3;l++)i.box(.06,l*.05,.5+l*.07,.2,l*.05+.05,s-.5,A(10134184,1-l*.05),G(Ze));for(const[l,c]of[[.14,.14],[n-.14,.14],[.14,s-.14],[n-.14,s-.14]])i.bar(l,0,c,l,.7,c,.02,.02,A(7830916,1)),i.box(l-.05,.7,c-.03,l+.05,.76,c+.03,G(16120058),G(16120058),_n);return}if(r==="l_zoo"){Rn(i,.06,.06,n-.06,s-.06,.012,.09,A(Cr,1.2),0,n*.4,n*.6),i.bar(n*.4,0,.06,n*.4,.34,.06,.02,.02,A(13214794,1)),i.bar(n*.6,0,.06,n*.6,.34,.06,.02,.02,A(13214794,1)),i.bar(n*.4,.34,.06,n*.6,.34,.06,.02,.05,A(13214794,1)),Rn(i,.2,.5,n*.48,s*.5,.012,.06,G(za)),Rn(i,n*.55,.44,n-.2,s*.42,.012,.06,G(za)),i.disc(n*.68,s*.72,.02,.34,10,A(Ba,1));for(let l=0;l<3;l++){const c=.3+e()*(n*.35),h=.6+e()*(s*.3),u=A([15260868,12160350,15920608][l%3],1);i.box(c,.06,h,c+.11,.13,h+.05,u,u),i.bar(c+.01,.06,h+.025,c+.01,.02,h+.025,.012,.012,u),i.bar(c+.1,.06,h+.025,c+.1,.02,h+.025,.012,.012,u),i.bar(c+.1,.13,h+.025,c+.12,.2,h+.025,.016,.016,u),i.box(c+.1,.2,h+.005,c+.15,.235,h+.045,u,u)}for(let l=0;l<4;l++)Bi(i,.24+e()*(n-.5),.2+e()*(s-.5),.012,.8+e()*.6,t.seedI+l*3);i.flat(n*.42,.08,n*.58,s*.55,.018,G(Ae));return}const o=n>=2;i.flat(n*.5-.07,.03,n*.5+.07,s-.03,.018,A(13286813,1)),i.flat(.03,s*.5-.07,n-.03,s*.5+.07,.019,A(13286813,1)),(o||e()<.4)&&(i.disc(n*.7,s*.3,.02,Math.min(n,s)*.16,10,A(Ba,1.05)),i.cyl(n*.7,s*.3,.006,.03,Math.min(n,s)*.175,Math.min(n,s)*.175,10,A(Ae,.9),null)),Us(i,.08,.08,n*.34,.15,.012),Us(i,n-.34,s-.15,n-.08,s-.08,.012),Ha(i,n*.4,s*.5+.12,.012,!0),Ha(i,n*.6,s*.5-.12,.012,!0);const a=o?7:2+(e()*2|0);for(let l=0;l<a;l++){const c=.14+e()*(n-.3),h=.14+e()*(s-.3);Math.abs(c-n*.5)<.12||Math.abs(h-s*.5)<.12||Bi(i,c,h,.012,.75+e()*.75,t.seedI+l*7)}if(o){const l=n*.3,c=s*.72;i.disc(l,c,.03,.2,8,A(Ae,1.05));for(let h=0;h<6;h++){const u=h/6*Math.PI*2;Pr(i,l+Math.cos(u)*.16,c+Math.sin(u)*.16,.03,.22,.014,G(Ne))}i.cyl(l,c,.25,.38,.24,.02,8,A(9387315,1),null),wo(i,n*.5+.1,s*.3,.012),wo(i,n*.5-.1,s*.7,.012)}}function my(i,t){t.r;const e=t.w,n=t.h,s=4;for(let a=0;a<s;a++)for(let l=0;l<s;l++){const c=(a+l)%2===0?A(13617594,1):A(11643545,1);i.flat(e*l/s+.01,n*a/s+.01,e*(l+1)/s-.01,n*(a+1)/s-.01,.014,c)}const r=e/2,o=n/2;i.cyl(r,o,0,.08,.3,.3,10,A(14209732,.95),null),i.disc(r,o,.07,.27,10,A(Ba,1.15),On),i.cyl(r,o,.07,.24,.05,.035,7,A(14209732,.9),A(14209732,.85)),i.cyl(r,o,.24,.3,.11,.09,7,A(14209732,.95),A(Ba,1.2),On),i.cyl(r,o,.3,.44,.02,.012,5,G(12577013),null,vn);for(const[a,l]of[[.18,.18],[e-.18,.18],[.18,n-.18],[e-.18,n-.18]])i.box(a-.09,.014,l-.09,a+.09,.07,l+.09,A(9077624,1),A(Zc,.9)),Us(i,a-.07,l-.07,a+.07,l+.07,.07,.05),wo(i,a+(a<e/2?.16:-.16),l,.014);Ha(i,r-.4,o,.014,!1),Ha(i,r+.4,o,.014,!1)}function gy(i,t,e,n,s,r,o){i.bar(t,n,e,t,n+s,e,.045,.045,o),i.bar(t,n+s,e,t+r,n+s,e,.035,.035,o),i.bar(t,n+s,e,t-r*.3,n+s*.86,e,.025,.025,o),i.bar(t+r*.78,n+s,e,t+r*.78,n+s*.52,e,.012,.012,A(3422268,1))}function vy(i,t){const e=t.w,n=t.h;i.flat(.02,.02,e-.02,n-.02,.014,A(Ie,.78)),i.box(0,0,0,e,.12,.22,A(Ie,.75),A(Ie,.9));for(let s=.18;s<e;s+=.55)i.bar(s,-.35,.08,s,.02,.08,.035,.035,A(5593696,1));if(t.key==="l_marina"){for(let s=0;s<4;s++){const r=.35+s*((e-.7)/3);i.box(r-.035,.03,0,r+.035,.07,n*.58,A(Cr,1.1),A(Cr,1.2)),i.box(r-.13,.025,.35+(s&1)*.3,r+.13,.07,.48+(s&1)*.3,G(Ne),A(4882370,1)),i.bar(r,.07,.41+(s&1)*.3,r,.3,.41+(s&1)*.3,.012,.012,G(Ne))}i.box(.12,0,n-.55,e-.12,.34,n-.12,A(14207924,1),A(Ui,1)),i.wallQuad(0,.22,.08,e-.22,.28,n-.55,.016,G(16770746),Mo);return}i.box(.16,0,n-.8,e*.48,.55,n-.14,A(10462118,1),A(6777968,1)),i.gable(.13,n-.83,e*.48+.03,n-.11,.55,.14,!0,A(6777968,1),A(10462118,1));for(let s=0;s<3;s++)gy(i,.55+s*((e-1.1)/2),.45,.02,1.35,.65,A(14788139,1));Rr(i,t,e*.68,n*.55,.014,12),wo(i,e-.2,n-.2,.014,.7)}function _y(i,t){const e=t.w,n=t.h;i.flat(.02,.02,e-.02,n-.02,.012,A(Ns,1.05));const s=n*.7;i.flat(.12,s-.34,e-.12,s+.34,.022,A(2632753,1));for(let a=.35;a<e-.3;a+=.45)i.flat(a,s-.025,a+.2,s+.025,.027,G(Ne),_n);const r=.18;i.box(.25,0,r,e-1.1,.55,n*.38,A(12107974,1),A(7832716,1)),i.wallQuad(2,.32,.08,e-1.17,.45,n*.38,.018,G(9292008),Fs),i.box(.5,.55,r+.12,e-1.4,.78,n*.38-.12,G(Fn),A(7832716,1));for(let a=0;a<4;a++){const l=.55+a*((e-1.8)/3);i.box(l,.12,n*.38,l+.14,.24,n*.52,A(10134184,1),A(10134184,1))}const o=e-.55;i.cyl(o,n*.22,0,1.25,.16,.11,8,A(Ie,.9),null),i.cyl(o,n*.22,1.25,1.52,.25,.25,8,G(Fn),A(7832716,1),On),i.cyl(o,n*.22,1.52,1.6,.27,.2,8,A(5593696,1),A(5593696,1));for(let a=0;a<2;a++){const l=e*(.32+a*.3),c=n*.5;i.boxR(l,c,.55,.12,.07,.14,Math.PI/2,G(Ne),G(Ne)),i.bar(l-.02,.1,c-.42,l+.02,.1,c+.42,.035,.035,A(4882370,1)),i.bar(l-.2,.1,c,l+.34,.1,c,.025,.025,G(Ne))}if(i.collect){const[a,l,c]=i.toWorld(o,1.73,n*.22);$e.push({kind:2,x:a,y:l,z:c,yaw:0,speed:1.1,phase:wt(t.seedI,67,3),scale:.65}),$e.push({kind:1,x:a,y:l+.12,z:c,yaw:0,speed:1,phase:wt(t.seedI,68,3),scale:.2})}}function xy(i,t){const e=t.w,n=t.h;if(i.flat(.02,.02,e-.02,n-.02,.012,G(Ae)),t.key==="t_subway"){i.box(e*.25,0,n*.28,e*.75,.3,n*.72,G(Fn),A(5333099,1),Fs),i.gable(e*.22,n*.25,e*.78,n*.75,.3,.12,!0,A(4053977,1),A(5333099,1)),i.box(e*.42,.02,n*.08,e*.58,.08,n*.3,A(5593696,1),A(5593696,1)),wo(i,.2,n-.2,.012);return}if(t.key==="t_bus"){i.box(.12,0,.15,e-.12,.42,n*.48,A(12107974,1),A(7832716,1)),i.wallQuad(0,.22,.08,e-.22,.35,.15,.016,G(16770746),Mo);for(let s=0;s<3;s++)i.box(.18+s*.5,.03,n*.62,.55+s*.5,.18,n*.78,A(4053977,.8),A(4053977,1));return}for(let s=0;s<3;s++){const r=.35+s*((n-.7)/2);i.box(.1,.02,r-.11,e-.1,.08,r+.11,A(Ie,.9),A(Ie,1));for(let o=.25;o<e-.2;o+=.45)i.bar(o,.08,r,o,.42,r,.018,.018,G(Ze));i.quad(e-.08,.42,r+.18,.08,.42,r+.18,.14,.52,r-.18,e-.14,.52,r-.18,A(14672870,1))}i.box(e*.32,.08,.12,e*.68,.9,n-.12,G(Fn),A(5333099,1),On),i.gable(e*.29,.09,e*.71,n-.09,.9,.22,!1,A(5333099,1),A(12107974,1))}function Yl(i,t,e,n,s,r,o,a){Ds(i,t,e,n,s,r,o,a,Vt(Math.round((a-o)/.75),2,28),.58,3)}function yy(i,t){const e=t.w,n=t.h,s=e/2,r=n/2,o=t.key;if(i.flat(.03,.03,e-.03,n-.03,.014,o==="arco_forest"?A(Ar,.95):G(Ae)),o==="x_tower"){i.cyl(s,r,0,2.2,.8,.52,10,A(13095642,1),null),i.cyl(s,r,2.2,t.ht*.78,.52,.34,10,A(7312819,1),null);for(let a=3;a<t.ht*.76;a+=1.5)i.cyl(s,r,a,a+.18,.54-a*.002,.54-a*.002,10,G(16767370),null,Is(t,a|0,0,0,.58)?vn:0);if(i.cyl(s,r,t.ht*.78,t.ht*.9,.34,.12,8,A(13620440,1),null),i.cyl(s,r,t.ht*.9,t.ht+6,.1,.008,7,G(15264750),null),i.collect){const[a,l,c]=i.toWorld(s,t.ht+6.1,r);$e.push({kind:1,x:a,y:l,z:c,yaw:0,speed:1,phase:0,scale:.35})}return}if(o==="x_llama"){const a=A(14199351,1.15);i.cyl(s,r,0,1.8,1.05,1.05,14,A(15261640,1),A(14207912,1)),i.dome(s,r,1.8,1.08,14,5,a,1.15),i.cyl(s-.42,r,2.65,3.65,.18,.035,6,a,null),i.cyl(s+.42,r,2.65,3.65,.18,.035,6,a,null),i.wallQuad(0,s-.7,.25,s+.7,1.2,r-1.05,.025,G(4053977),Ni);return}if(o==="x_cityhall"){i.box(.25,0,.55,e-.25,2.3,n-.28,A(14274749,1),A(11115651,1));for(let a=0;a<6;a++)Pr(i,.55+a*((e-1.1)/5),.38,0,1.65,.065,G(Ne));i.gable(.35,.25,e-.35,.68,1.65,.48,!0,A(12103062,1),G(Ne)),i.cyl(s,n*.6,2.3,3.2,.65,.65,12,A(14274749,1),null),i.dome(s,n*.6,3.2,.72,12,5,A(6857882,1)),kr(i,t,s,n*.6,3.85,1.2);return}if(o==="x_statue"){i.box(.18,0,.18,.82,.7,.82,A(12103062,1),A(14010798,1)),i.box(.3,.7,.3,.7,1.05,.7,A(6714733,1),A(7833726,1)),i.bar(.5,1.05,.5,.48,2.55,.5,.11,.11,A(6714733,1)),i.cyl(.48,.5,2.5,2.85,.16,.14,7,A(6714733,1),A(7833726,1)),i.bar(.48,2.2,.5,.18,1.55,.45,.07,.07,A(6714733,1)),i.bar(.48,2.2,.5,.82,2.65,.45,.07,.07,A(6714733,1));return}if(o==="x_observatory"){i.box(.3,0,.3,e-.3,1.3,n-.3,A(14209732,1),A(11051414,1)),i.cyl(s,r,1.3,2,1.05,1.05,14,A(14278112,1),null),i.dome(s,r,2,1.08,14,6,A(13159889,1)),i.box(s-.1,1.95,r-1.09,s+.1,3,r-.98,A(3159611,1),A(3159611,1));return}if(o==="x_casino"){i.box(.25,0,.2,e-.25,2,n-.25,A(14075821,1),A(5918050,1)),i.box(.55,2,.5,e-.55,t.ht,n-.55,A(7560838,1),A(4011080,1)),Yl(i,t,.55,.5,e-.55,n-.55,2.2,t.ht-.4);for(let a=1;a<t.ht;a+=2.2)i.wallQuad(0,.35,a,e-.35,a+.24,.2,.03,_r(t,a|0),Ni);i.cyl(s,.1,.4,2.2,.18,.18,10,_r(t,8),G(16763196),Ni);return}if(o==="arco_plymouth"){for(let a=0;a<8;a++){const l=t.ht*a/8,c=t.ht*(a+1)/8,h=.18+a*.17;i.box(h,l,h,e-h,c,n-h,A(7842244,.92+a*.035),A(2575203,1)),Yl(i,t,h,h,e-h,n-h,l+.25,c-.18)}i.pyramid(s,r,1.3,1.3,t.ht,4,A(12573671,1));return}if(o==="arco_forest"){for(let a=0;a<9;a++){const l=t.ht*a/9,c=.15+a*.18;if(i.box(c,l,c,e-c,l+t.ht/9,n-c,A(9086350,1),A(Ar,1.1)),Yl(i,t,c,c,e-c,n-c,l+.2,l+t.ht/9-.15),(a&1)===0)for(let h=0;h<4;h++)Bi(i,c+.25+h*((e-2*c-.5)/3),c+.12,l+t.ht/9,1.2,t.seedI+a*9+h)}return}if(o==="arco_darco"){const a=A(2434869,1);for(let l=0;l<7;l++){const c=l*t.ht/7,h=1.55-l*.13;i.cyl(s,r,c,c+t.ht/7+.3,h,h*.88,9,a,null),i.cyl(s,r,c+t.ht/14,c+t.ht/14+.2,h+.05,h+.05,9,_r(t,l),null,On);for(let u=0;u<3;u++){const d=u*Math.PI*2/3+l*.7;i.bar(s+Math.cos(d)*h*.75,c+.2,r+Math.sin(d)*h*.75,s+Math.cos(d)*(h+.7),c+t.ht/7,r+Math.sin(d)*(h+.7),.08,.08,a)}}i.cyl(s,r,t.ht,t.ht+5,.25,.01,7,a,null);return}if(o==="arco_launch"){for(const[a,l]of[[.45,.45],[e-.45,.45],[.45,n-.45],[e-.45,n-.45]])i.bar(a,0,l,a,t.ht*.9,l,.13,.13,A(5858155,1));for(let a=4;a<t.ht*.88;a+=5)i.bar(.45,a,.45,e-.45,a,.45,.09,.09,A(7832716,1)),i.bar(.45,a,n-.45,e-.45,a,n-.45,.09,.09,A(7832716,1));i.cyl(s,r,.4,t.ht*.78,.58,.45,12,G(Ne),null),i.cyl(s,r,t.ht*.78,t.ht,.45,.01,12,A(15263976,1),null);for(let a=0;a<4;a++){const l=a*Math.PI/2;i.bar(s+Math.cos(l)*.42,1.2,r+Math.sin(l)*.42,s+Math.cos(l)*.95,.25,r+Math.sin(l)*.95,.14,.08,A(14240834,1))}if(i.collect){const[a,l,c]=i.toWorld(s,t.ht+.2,r);$e.push({kind:1,x:a,y:l,z:c,yaw:0,speed:1,phase:.2,scale:.3})}return}i.box(.25,0,.45,e-.25,t.ht*.45,n-.25,A(14209732,1),A(10327170,1));for(let a=0;a<6;a++)Pr(i,.5+a*((e-1)/5),.28,0,t.ht*.34,.055,G(Ne));i.pyramid(s,n*.58,e*.72,n*.6,t.ht*.45,t.ht*.18,A(7906743,1)),i.wallQuad(0,e*.3,t.ht*.2,e*.7,t.ht*.32,.45,.02,A(13214794,1),_n)}function My(i,t){i.flat(.04,.04,t.w-.04,t.h-.04,.012,A(7301215,.8));for(let e=0;e<9;e++){const n=.08+t.r()*(t.w-.25),s=.08+t.r()*(t.h-.25),r=.06+t.r()*.16;i.boxR(n,s,r*1.7,r,.01,r*(.5+t.r()),t.r()*Math.PI,A(7827562,.7+t.r()*.35),A(9537405,1))}}const wy={house:Vx,rowhouse:Wx,apartment:Xx,tower:qx,shop:$x,office:Kx,skyscraper:Yx,mall:jx,farm:Zx,workshop:Jx,factory:Qx,refinery:ty,warehouse:ey,powerplant:ny,windturbine:iy,solarfarm:sy,watertower:ry,civic:oy,hospital:hy,school:uy,university:dy,stadium:fy,park:py,plaza:my,landmark:yy,port:vy,airport:_y,transit:xy,rubble:My};function e0(i,t){const e=pe(i.building[t]),n=Ji(t),s=Qi(t);for(let r=0;r<e.h;r++)for(let o=0;o<e.w;o++)if(i.water[lt(n+o,s+r)])return Yn;return i.height[t]}function Rd(i,t,e,n=!0){const s=t.building[e];if(!s)return;const r=pe(s),o=Ji(e),a=Qi(e),l=!!(r.grown&&t.condition[e]===0&&t.age[e]>4),c=(o*73856093^a*19349663^t.variant[e]*83492791^s*2654435761)>>>0,h=r.grown?.88+wt(o,a,t.variant[e]+41)*.24:1,u={def:r,key:r.key,w:r.w,h:r.h,level:t.level[e]||r.level||1,seedI:c,r:as(c),ht:Math.max(.2,(r.height??2.5)*h),abandoned:l},d=r.w===r.h?t.rotation[e]:0;i.setFrame(o,e0(t,e),a,r.w,r.h,d),i.collect=n;const f=i.v,g=$e.length;if(t.onFire[e]?i.box(.08,0,.08,r.w-.08,Math.min(u.ht,3),r.h-.08,A(9390384,1),A(3813421,1)):wy[r.archetype](i,u),n&&!t.onFire[e]&&u.ht>20){let v=!1;for(let m=g;m<$e.length;m++)v||(v=$e[m].kind===1);if(!v){const[m,p,M]=i.toWorld(r.w*.5,u.ht+.12,r.h*.5);$e.push({kind:1,x:m,y:p,z:M,yaw:0,speed:1,phase:wt(u.seedI,83,3),scale:.22})}}if(l||t.onFire[e]){const v=!!t.onFire[e];for(let m=f;m<i.v;m++){const p=m*3;if(v)i.col[p]=i.col[p]*.35+.55,i.col[p+1]*=.22,i.col[p+2]*=.08;else{const M=(i.col[p]+i.col[p+1]+i.col[p+2])/3;i.col[p]=Nt(i.col[p],M,.55)*.48,i.col[p+1]=Nt(i.col[p+1],M,.55)*.48,i.col[p+2]=Nt(i.col[p+2],M,.55)*.48}i.emi[m]=0}}}function Pd(i){const t=new hn;return t.setAttribute("position",new De(i.pos.slice(0,i.v*3),3)),t.setAttribute("normal",new De(i.nor.slice(0,i.v*3),3)),t.setAttribute("color",new De(i.col.slice(0,i.v*3),3)),t.setAttribute("aEmissive",new De(i.emi.slice(0,i.v),1)),t.setIndex(new De(i.ind.slice(0,i.ic),1)),t.computeBoundingSphere(),t}class by{constructor(t,e){L(this,"scene");L(this,"grid");L(this,"sink",new Gx);L(this,"chunks",new Array(Se*Un).fill(null));L(this,"chunkAnims",Array.from({length:Se*Un},()=>[]));L(this,"suppressed",new Set);L(this,"pops",[]);L(this,"material");L(this,"nightUniform",{value:0});L(this,"animMaterial");L(this,"rotorMesh",null);L(this,"beaconMesh",null);L(this,"radarMesh",null);L(this,"rotorSpots",[]);L(this,"beaconSpots",[]);L(this,"radarSpots",[]);L(this,"matrix",new me);L(this,"position",new N);L(this,"quaternion",new Di);L(this,"scale",new N);L(this,"qYaw",new Di);L(this,"qSpin",new Di);L(this,"disposed",!1);this.scene=t,this.grid=e,this.material=new yo({vertexColors:!0}),this.material.onBeforeCompile=n=>{n.uniforms.uNight=this.nightUniform,n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
attribute float aEmissive;
varying float vBuildingEmissive;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vBuildingEmissive = aEmissive;`),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform float uNight;
varying float vBuildingEmissive;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
          float eBand = floor(vBuildingEmissive);
          float eStrength = fract(vBuildingEmissive);
          float eGate = smoothstep(eBand < 0.5 ? 0.42 : (eBand < 1.5 ? 0.22 : 0.08), 0.82, uNight);
          vec3 eColour = eBand < 0.5 ? vec3(1.0, 0.694, 0.254) : vColor;
          totalEmissiveRadiance += eColour * eStrength * eGate * 1.8;`)},this.material.customProgramCacheKey=()=>"sethcity-building-emissive-v1",this.animMaterial=new Nu({color:15198956,roughness:.55,metalness:.3}),this.rebuildAll()}rebuildAll(){if(!this.disposed){for(let t=0;t<Un;t++)for(let e=0;e<Se;e++)this.rebuildChunkInternal(e,t,!1);this.rebuildAnimatedMeshes()}}rebuildChunk(t,e){this.rebuildChunkInternal(t,e,!0)}rebuildChunkInternal(t,e,n){if(this.disposed||t<0||e<0||t>=Se||e>=Un)return;const s=e*Se+t,r=this.chunks[s];r&&(this.scene.remove(r),r.geometry.dispose(),this.chunks[s]=null),this.sink.reset(),$e=[];const o=t*qt,a=e*qt;for(let l=a;l<a+qt;l++)for(let c=o;c<o+qt;c++){const h=lt(c,l);!this.grid.building[h]||this.grid.originOffset[h]!==0||this.suppressed.has(h)||Rd(this.sink,this.grid,h)}if(this.chunkAnims[s]=$e,this.sink.v){const l=new Ge(Pd(this.sink),this.material);l.name=`buildings-${t}-${e}`,l.castShadow=!0,l.receiveShadow=!0,l.frustumCulled=!0,this.scene.add(l),this.chunks[s]=l}n&&this.rebuildAnimatedMeshes()}update(t,e,n){if(!this.disposed){this.nightUniform.value=Vt(n,0,1),this.updateRotors(e),this.updateRadars(e),this.updateBeacons(e,n);for(let s=this.pops.length-1;s>=0;s--){const r=this.pops[s];r.t+=t/.5;const o=Math.min(1,r.t),a=o===1?1:Math.pow(2,-9*o)*Math.sin((o*9-.7)*Math.PI)+1;r.mesh.scale.set(a,Math.max(.02,a),a),r.mesh.position.y=r.baseY,o>=1&&(this.scene.remove(r.mesh),r.mesh.geometry.dispose(),this.suppressed.delete(r.i),this.pops.splice(s,1),this.rebuildChunkInternal(Ji(r.i)/qt|0,Qi(r.i)/qt|0,!0))}}}popIn(t){if(this.disposed||!this.grid.building[t])return;const e=this.grid.originOffset[t]===0?t:this.grid.originOf(Ji(t),Qi(t));if(e<0||this.suppressed.has(e))return;if(this.suppressed.add(e),this.rebuildChunkInternal(Ji(e)/qt|0,Qi(e)/qt|0,!0),this.sink.reset(),$e=[],Rd(this.sink,this.grid,e,!1),!this.sink.v){this.suppressed.delete(e),this.rebuildChunkInternal(Ji(e)/qt|0,Qi(e)/qt|0,!0);return}const n=new Ge(Pd(this.sink),this.material),s=pe(this.grid.building[e]),r=Ji(e)+s.w*.5,o=Qi(e)+s.h*.5,a=e0(this.grid,e);n.geometry.translate(-r,-a,-o),n.position.set(r,a,o),n.scale.setScalar(.02),n.castShadow=!0,this.scene.add(n),this.pops.push({i:e,t:0,mesh:n,baseY:a})}dispose(){if(!this.disposed){this.disposed=!0;for(const t of this.chunks)t&&(this.scene.remove(t),t.geometry.dispose());for(const t of this.pops)this.scene.remove(t.mesh),t.mesh.geometry.dispose();this.removeAnimatedMeshes(),this.material.dispose(),this.animMaterial.dispose(),this.pops.length=0,this.suppressed.clear()}}removeAnimatedMeshes(){for(const t of[this.rotorMesh,this.beaconMesh,this.radarMesh])t&&(this.scene.remove(t),t.geometry.dispose(),t.material!==this.animMaterial&&t.material.dispose());this.rotorMesh=null,this.beaconMesh=null,this.radarMesh=null}rebuildAnimatedMeshes(){this.removeAnimatedMeshes(),this.rotorSpots=[],this.beaconSpots=[],this.radarSpots=[];for(const t of this.chunkAnims)for(const e of t)e.kind===0?this.rotorSpots.push(e):e.kind===1?this.beaconSpots.push(e):this.radarSpots.push(e);if(this.rotorSpots.length){const t=new rs(.075,1,.035);t.translate(0,.48,0),this.rotorMesh=new vr(t,this.animMaterial,this.rotorSpots.length*3),this.rotorMesh.name="building-wind-rotors",this.rotorMesh.frustumCulled=!1,this.scene.add(this.rotorMesh)}if(this.beaconSpots.length){const t=new Ch(.07,0),e=new Nu({color:16719896,emissive:16715784,emissiveIntensity:0});this.beaconMesh=new vr(t,e,this.beaconSpots.length),this.beaconMesh.name="building-aviation-beacons",this.beaconMesh.frustumCulled=!1,this.scene.add(this.beaconMesh)}if(this.radarSpots.length){const t=new rs(.75,.06,.16);this.radarMesh=new vr(t,this.animMaterial,this.radarSpots.length),this.radarMesh.name="building-radars",this.radarMesh.frustumCulled=!1,this.scene.add(this.radarMesh)}}updateRotors(t){if(!this.rotorMesh)return;let e=0;for(const n of this.rotorSpots)for(let s=0;s<3;s++)this.position.set(n.x,n.y,n.z),this.qYaw.setFromAxisAngle(this.position.set(0,1,0),n.yaw),this.qSpin.setFromAxisAngle(this.position.set(0,0,1),t*n.speed+n.phase+s*Math.PI*2/3),this.quaternion.copy(this.qYaw).multiply(this.qSpin),this.position.set(n.x,n.y,n.z),this.scale.set(n.scale,n.scale,n.scale),this.matrix.compose(this.position,this.quaternion,this.scale),this.rotorMesh.setMatrixAt(e++,this.matrix);this.rotorMesh.instanceMatrix.needsUpdate=!0}updateRadars(t){if(this.radarMesh){for(let e=0;e<this.radarSpots.length;e++){const n=this.radarSpots[e];this.position.set(n.x,n.y,n.z),this.quaternion.setFromAxisAngle(this.scale.set(0,1,0),t*n.speed+n.phase),this.scale.setScalar(n.scale),this.matrix.compose(this.position,this.quaternion,this.scale),this.radarMesh.setMatrixAt(e,this.matrix)}this.radarMesh.instanceMatrix.needsUpdate=!0}}updateBeacons(t,e){if(!this.beaconMesh)return;for(let s=0;s<this.beaconSpots.length;s++){const r=this.beaconSpots[s],o=Math.max(.08,Math.pow(Math.max(0,Math.sin(t*3.4+r.phase*Math.PI*2)),12));this.position.set(r.x,r.y,r.z),this.quaternion.identity(),this.scale.setScalar(r.scale*(.6+o*.7)),this.matrix.compose(this.position,this.quaternion,this.scale),this.beaconMesh.setMatrixAt(s,this.matrix)}this.beaconMesh.instanceMatrix.needsUpdate=!0;const n=this.beaconMesh.material;n.emissiveIntensity=Vt(e,0,1)*(.5+Math.pow(Math.max(0,Math.sin(t*3.4)),10)*3.5)}}function Sy(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new hn;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Ld(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][d]);const g=Ld(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Ld(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new De(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const v=h.getComponent(d,g);a.setComponent(d+u,g,v)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const Vn=new me,Aa=new N,Ca=new N,Ra=new Di,Ga=new jn,Id=new N(0,1,0),Le=new ct,Ey=new ct,rr=[0,1,0,-1],or=[-1,0,1,0];function Ct(i,t,e=0,n=0,s=0,r={}){const o=i.index?i.toNonIndexed():i;o!==i&&i.dispose(),Ga.set(r.rx??0,r.ry??0,r.rz??0),Vn.compose(Aa.set(e,n,s),Ra.setFromEuler(Ga),Ca.set(r.sx??1,r.sy??1,r.sz??1)),o.applyMatrix4(Vn);const a=o.attributes.position.count,l=new Float32Array(a*3);Le.setHex(t);for(let h=0;h<a;h++)l[h*3]=Le.r,l[h*3+1]=Le.g,l[h*3+2]=Le.b;o.setAttribute("color",new De(l,3));const c=new Float32Array(a).fill(r.emissive??0);return o.setAttribute("aEmissive",new De(c,1)),o.getAttribute("uv")&&o.deleteAttribute("uv"),o}function yn(i){const t=Sy(i,!1);for(const e of i)e.dispose();return t.computeVertexNormals(),t}const Gt=(i,t,e)=>new rs(i,t,e),bo=i=>new Ah(i,0),Dd=(i,t,e)=>new Th(i,t,e);function Ty(){return yn([Ct(Gt(.07,.3,.07),7164216,0,.14,0),Ct(Dd(.3,.62,6),16777215,0,.56,0),Ct(Dd(.2,.46,6),16777215,0,.94,0)])}function Ay(){return yn([Ct(Gt(.08,.32,.08),7164216,0,.15,0),Ct(bo(.3),16777215,0,.52,0,{sy:.92}),Ct(bo(.17),16777215,.15,.4,.09)])}function Cy(){const i=[Ct(Gt(.07,.42,.07),9072461,.02,.2,0,{rz:-.08}),Ct(Gt(.06,.4,.06),9072461,.07,.55,0,{rz:-.14})];for(let t=0;t<6;t++){const e=new ri(.44,.13);e.translate(.24,0,0),i.push(Ct(e,6136396,.1,.76,0,{rz:-.5,ry:t*Math.PI/3}))}return yn(i)}function Ry(){return yn([Ct(Gt(.07,.44,.07),16777215,0,.21,0),Ct(Gt(.035,.3,.035),16777215,.08,.46,.02,{rz:-.7}),Ct(Gt(.035,.26,.035),16777215,-.07,.42,-.02,{rz:.65}),Ct(Gt(.03,.22,.03),16777215,.02,.5,.07,{rx:.6})])}function Py(){return yn([Ct(bo(.17),16777215,0,.05,0,{sy:.62})])}function Ly(){return yn([Ct(bo(.14),16777215,0,.09,0,{sy:.72}),Ct(bo(.09),16777215,.1,.07,.05,{sy:.7})])}function Iy(){return yn([Ct(Gt(.035,.62,.035),3817285,0,.31,0),Ct(Gt(.16,.028,.028),3817285,.08,.62,0),Ct(Gt(.09,.035,.055),16773836,.14,.6,0,{emissive:1})])}function Dy(){const i=[Ct(Gt(.04,.55,.04),3093304,0,.275,0),Ct(Gt(.07,.22,.08),2369323,.015,.66,0)],t=[[16725284,1,.735],[16757796,2,.66],[3137642,3,.585]];for(const[e,n,s]of t)i.push(Ct(new ri(.045,.045),e,.052,s,0,{ry:Math.PI/2,emissive:n}));return yn(i)}function Uy(){return yn([Ct(Gt(.32,.03,.11),10122569,0,.13,0),Ct(Gt(.32,.11,.025),10122569,0,.21,-.05),Ct(Gt(.03,.13,.1),4867648,-.13,.065,0),Ct(Gt(.03,.13,.1),4867648,.13,.065,0)])}function Ny(){return yn([Ct(Gt(.04,.3,.04),10521192,-.45,.15,0),Ct(Gt(.04,.3,.04),10521192,0,.15,0),Ct(Gt(.04,.3,.04),10521192,.45,.15,0),Ct(Gt(.96,.03,.025),10521192,0,.12,0),Ct(Gt(.96,.03,.025),10521192,0,.24,0)])}function Fy(){return yn([Ct(Gt(.5,.09,.2),16777215,0,.05,0),Ct(Gt(.14,.08,.13),16777215,.3,.05,0,{ry:Math.PI/4}),Ct(Gt(.14,.09,.13),15262418,-.08,.14,0),Ct(Gt(.018,.44,.018),9072461,.04,.32,0),Ct(new ri(.26,.32),16118246,.19,.36,0)])}function Oy(){return yn([Ct(Gt(.34,.1,.17),16777215,0,.09,0),Ct(Gt(.17,.08,.15),2304564,-.02,.18,0),Ct(Gt(.02,.03,.04),16773320,.17,.1,.055,{emissive:1}),Ct(Gt(.02,.03,.04),16773320,.17,.1,-.055,{emissive:1}),Ct(Gt(.02,.026,.036),14694956,-.17,.1,.055,{emissive:1}),Ct(Gt(.02,.026,.036),14694956,-.17,.1,-.055,{emissive:1})])}function ky(){return yn([Ct(Gt(.6,.19,.19),16777215,0,.15,0),Ct(Gt(.55,.06,.195),2568509,0,.21,0),Ct(Gt(.02,.035,.05),16773320,.3,.11,.06,{emissive:1}),Ct(Gt(.02,.035,.05),16773320,.3,.11,-.06,{emissive:1}),Ct(Gt(.02,.03,.045),14694956,-.3,.11,.06,{emissive:1}),Ct(Gt(.02,.03,.045),14694956,-.3,.11,-.06,{emissive:1})])}function By(){return yn([Ct(Gt(.14,.15,.17),16777215,.19,.12,0),Ct(Gt(.34,.2,.18),15330279,-.08,.16,0),Ct(Gt(.02,.035,.045),16773320,.26,.1,.055,{emissive:1}),Ct(Gt(.02,.035,.045),16773320,.26,.1,-.055,{emissive:1}),Ct(Gt(.02,.03,.04),14694956,-.25,.1,.055,{emissive:1}),Ct(Gt(.02,.03,.04),14694956,-.25,.1,-.055,{emissive:1})])}function zy(){return yn([Ct(new Eh(.032,.08,2,6),16777215,0,.1,0),Ct(new Ya(.026,6,5),15254426,0,.19,0)])}function Hy(){return{cur:-1,prev:-1,nxt:-1,ex:0,ez:0,cx:0,cz:0,xx:0,xz:0,t:0,sp:1,lane:.16}}const Ud=[4685626,3896632,5008955,9086609],Gy=[7123019,5214783,12745519,7123019],Vy=[6134340,5016124,11042614,8224628],Wy=7297865,Xy=[13777716,15263978,3040192,2829619,13158863,14394938,5086294,8950432],qy=[3844e3,14715450,14270783],Yy=[11553340,4026280,5601870,9080726],$y=[14241603,4161474,14923066,5808220,10120130,14738150,3488063],Nd=[14212578,13065034,4882375,14725439],jy=6200;class Ky{constructor(t,e,n){L(this,"scene");L(this,"grid");L(this,"state");L(this,"matGlow");L(this,"matTL");L(this,"uNight",{value:0});L(this,"uPhase",{value:3});L(this,"conifer");L(this,"leaf");L(this,"palm");L(this,"bare");L(this,"rock");L(this,"bush");L(this,"lamp");L(this,"tlight");L(this,"bench");L(this,"fence");L(this,"boat");L(this,"car");L(this,"bus");L(this,"truck");L(this,"ped");L(this,"cars",[]);L(this,"buses",[]);L(this,"trucks",[]);L(this,"peds",[]);L(this,"nCars",0);L(this,"nBuses",0);L(this,"nTrucks",0);L(this,"nPeds",0);L(this,"roadList",[]);L(this,"walkList",[]);L(this,"boatAnchors",[]);L(this,"boatCandidates",[]);L(this,"staticDirty",!0);L(this,"staticTimer",0);L(this,"lastSeason",-1);L(this,"signKey","");L(this,"signRoot");L(this,"signPostGeo");this.scene=t,this.grid=e,this.state=n,this.matGlow=this.makeGlowMaterial(!1),this.matTL=this.makeGlowMaterial(!0),this.conifer=this.pool(Ty(),3600,this.matGlow,!0),this.leaf=this.pool(Ay(),3200,this.matGlow,!0),this.palm=this.pool(Cy(),700,this.matGlow,!0),this.bare=this.pool(Ry(),3200,this.matGlow,!0),this.rock=this.pool(Py(),1200,this.matGlow,!0),this.bush=this.pool(Ly(),1600,this.matGlow,!1),this.lamp=this.pool(Iy(),1400,this.matGlow,!0),this.tlight=this.pool(Dy(),240,this.matTL,!1),this.bench=this.pool(Uy(),500,this.matGlow,!1),this.fence=this.pool(Ny(),1600,this.matGlow,!1),this.boat=this.pool(Fy(),16,this.matGlow,!0,!0),this.car=this.pool(Oy(),220,this.matGlow,!0,!0),this.bus=this.pool(ky(),24,this.matGlow,!0,!0),this.truck=this.pool(By(),20,this.matGlow,!0,!0),this.ped=this.pool(zy(),90,this.matGlow,!1,!0),this.signRoot=new Ts,this.scene.add(this.signRoot),this.signPostGeo=yn([Ct(Gt(.05,.62,.05),7035461,-.4,.31,0),Ct(Gt(.05,.62,.05),7035461,.4,.31,0)])}rebuildAll(){this.rebuildStatics(),this.rebuildGraph(),this.staticDirty=!1,this.staticTimer=.25}rebuildChunk(t,e){this.staticDirty=!0}update(t,e,n,s){this.state=s,s.time.season!==this.lastSeason&&(this.lastSeason=s.time.season,this.staticDirty=!0),this.staticTimer-=t,this.staticDirty&&this.staticTimer<=0&&(this.rebuildStatics(),this.rebuildGraph(),this.staticDirty=!1,this.staticTimer=.25),this.uNight.value=n;const r=e%10;this.uPhase.value=r<4.5?3:r<5.5?2:1,this.syncSigns(),this.updateVehicles(t,s),this.updateBoats(e)}dispose(){const t=[this.conifer,this.leaf,this.palm,this.bare,this.rock,this.bush,this.lamp,this.tlight,this.bench,this.fence,this.boat,this.car,this.bus,this.truck,this.ped];for(const e of t)this.scene.remove(e),e.geometry.dispose(),e.dispose();this.clearSigns(),this.scene.remove(this.signRoot),this.signPostGeo.dispose(),this.matGlow.dispose(),this.matTL.dispose()}makeGlowMaterial(t){const e=new yo({vertexColors:!0,side:ii}),n=this.uNight,s=this.uPhase;return e.onBeforeCompile=r=>{r.uniforms.uNight=n,t&&(r.uniforms.uPhase=s),r.vertexShader=`attribute float aEmissive;
varying float vEmissive;
`+r.vertexShader.replace("#include <color_vertex>",`#include <color_vertex>
	vEmissive = aEmissive;`);const o=t?"totalEmissiveRadiance += vColor.rgb * ((abs(vEmissive - uPhase) < 0.5) ? 1.2 : 0.06) * step(0.5, vEmissive) * (0.35 + 0.65 * uNight);":"totalEmissiveRadiance += vColor.rgb * vEmissive * uNight * 1.7;";r.fragmentShader=`varying float vEmissive;
uniform float uNight;
`+(t?`uniform float uPhase;
`:"")+r.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
	`+o)},e.customProgramCacheKey=()=>t?"sethcity-props-tl":"sethcity-props",e}pool(t,e,n,s,r=!1){const o=new vr(t,n,e);return o.count=0,o.castShadow=s,o.receiveShadow=!0,o.frustumCulled=!1,r&&o.instanceMatrix.setUsage(Kp),this.scene.add(o),o}put(t,e,n,s,r,o,a,l,c=-1){return e>=t.instanceMatrix.count?e:(Vn.compose(Aa.set(n,s,r),Ra.setFromAxisAngle(Id,o),Ca.set(a,c<0?a:c,a)),t.setMatrixAt(e,Vn),l&&t.setColorAt(e,l),e+1)}rebuildStatics(){const t=this.grid,e=this.state.time.season,n=e===3;let s=0,r=0,o=0,a=0,l=0,c=0,h=0,u=0,d=0,f=0,g=0;for(let p=0;p<j;p++)t.tree[p]&&!t.building[p]&&!t.road[p]&&!t.rail[p]&&!t.water[p]&&(g+=t.tree[p]);const v=g>0?Math.min(1,jy/g):1,m=this.boatCandidates;m.length=0;for(let p=0;p<at;p++)for(let M=0;M<C;M++){const _=lt(M,p),x=t.height[_],T=t.building[_],y=!T&&!t.road[_]&&!t.rail[_]&&!t.water[_];if(t.tree[_]&&y){const w=t.terrain[_];for(let E=0;E<t.tree[_];E++){if(wt(M,p,77+E)>v)continue;const b=.15+.7*wt(M,p,90+E),S=.15+.7*wt(M,p,110+E),I=wt(M,p,130+E)*Math.PI*2,O=.75+.55*wt(M,p,150+E),U=.86+.28*wt(M,p,170+E);w===se.Sand?(Le.setHex(16777215).multiplyScalar(U),o=this.put(this.palm,o,M+b,x,p+S,I,O,Le)):w===se.Rock||w===se.Snow?(Le.setHex(Ud[e]).multiplyScalar(U),s=this.put(this.conifer,s,M+b,x,p+S,I,O*.9,Le)):wt(M,p,190+E)<(w===se.Forest?.6:.45)?(Le.setHex(Ud[e]).multiplyScalar(U),s=this.put(this.conifer,s,M+b,x,p+S,I,O,Le)):n?(Le.setHex(Wy).multiplyScalar(U),a=this.put(this.bare,a,M+b,x,p+S,I,O,Le)):(Le.setHex(Gy[e]).multiplyScalar(U),e===2&&Le.lerp(Ey.setHex(14197815),wt(M,p,210+E)*.55),r=this.put(this.leaf,r,M+b,x,p+S,I,O,Le))}}if(y&&!t.tree[_]){const w=t.terrain[_],E=wt(M,p,230);(w===se.Rock&&E<.2||w!==se.Rock&&E<.012)&&(Le.setHex(9078140).multiplyScalar(.8+.4*wt(M,p,231)),l=this.put(this.rock,l,M+.2+.6*wt(M,p,232),x,p+.2+.6*wt(M,p,233),wt(M,p,234)*Math.PI*2,.55+.9*wt(M,p,235),Le));const b=wt(M,p,240);(w===se.Grass||w===se.Forest)&&b<.05&&(Le.setHex(Vy[e]).multiplyScalar(.85+.3*wt(M,p,241)),c=this.put(this.bush,c,M+.2+.6*wt(M,p,242),x,p+.2+.6*wt(M,p,243),wt(M,p,244)*Math.PI*2,.7+.7*wt(M,p,245),Le))}if(t.road[_]){for(const w of Qf(t,M,p))h=this.put(this.lamp,h,w.wx,w.wy,w.wz,w.rotY,1,null);if(!t.water[_]&&!t.tunnel[_]){const w=ka(t,M,p);let E=0;for(let S=0;S<4;S++)w&1<<S&&E++;const b=t.road[_];if(E>=3&&(b===ke.Avenue||E===4)){const S=Ta(t,M+.12,p+.12)+fo;if(u=this.put(this.tlight,u,M+.12,S,p+.12,-Math.PI/4,1,null),E===4){const I=Ta(t,M+.88,p+.88)+fo;u=this.put(this.tlight,u,M+.88,I,p+.88,Math.PI*.75,1,null)}}}}if(T){const w=pe(T);if((w.archetype==="park"||w.archetype==="plaza")&&wt(M,p,250)<.55&&(Le.setHex(16777215),d=this.put(this.bench,d,M+.25+.5*wt(M,p,251),x,p+.25+.5*wt(M,p,252),wt(M,p,253)*Math.PI*2,1,null)),w.archetype==="farm")for(let E=0;E<4;E++){const b=M+rr[E],S=p+or[E];if(Ht(b,S)&&t.building[lt(b,S)]===T||Ht(b,S)&&t.road[lt(b,S)])continue;const O=E===0||E===2?0:Math.PI/2,U=M+.5+rr[E]*.46,z=p+.5+or[E]*.46;f=this.put(this.fence,f,U,x,z,O,1,null)}}if(t.water[_]&&x<Yn-.45&&M%4===1&&p%4===2&&M>2&&p>2&&M<C-3&&p<at-3){let w=!0;for(let E=-2;E<=2&&w;E++)for(let b=-2;b<=2;b++)if(!t.water[lt(M+b,p+E)]){w=!1;break}w&&m.push(_)}}this.finishPool(this.conifer,s),this.finishPool(this.leaf,r),this.finishPool(this.palm,o),this.finishPool(this.bare,a),this.finishPool(this.rock,l),this.finishPool(this.bush,c),this.finishPool(this.lamp,h),this.finishPool(this.tlight,u),this.finishPool(this.bench,d),this.finishPool(this.fence,f),this.boatAnchors.length=0;for(const p of m){if(this.boatAnchors.length>=14)break;const M=p%C+.5,_=(p/C|0)+.5;let x=!0;for(const T of this.boatAnchors)if(Math.max(Math.abs(T.x-M),Math.abs(T.z-_))<8){x=!1;break}x&&this.boatAnchors.push({x:M,z:_,phase:wt(p,7,3)*Math.PI*2,r:.5+wt(p,11,5)*.5})}for(let p=0;p<this.boatAnchors.length;p++)Le.setHex(Nd[p%Nd.length]),this.boat.setColorAt(p,Le);this.boat.count=this.boatAnchors.length,this.boat.instanceColor&&(this.boat.instanceColor.needsUpdate=!0)}finishPool(t,e){t.count=e,t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0)}rebuildGraph(){const t=this.grid;this.roadList.length=0,this.walkList.length=0;for(let e=0;e<j;e++){if(!t.road[e])continue;this.roadList.push(e);const n=t.road[e];if((n===ke.Street||n===ke.Avenue)&&!t.water[e]&&!t.tunnel[e]){const s=e%C,r=e/C|0;let o=!1;for(let a=0;a<4&&!o;a++){const l=s+rr[a],c=r+or[a];if(!Ht(l,c))continue;const h=lt(l,c);o=t.population[h]+t.jobs[h]>20}o&&this.walkList.push(e)}}for(const e of[this.cars,this.buses,this.trucks,this.peds])for(const n of e)n.cur>=0&&!t.road[n.cur]&&(n.cur=-1)}laneFor(t,e){if(e)return .42;const n=this.grid.road[t];return n===ke.Avenue?.27:n===ke.Highway?.22:.155}speedFor(t,e,n){if(e)return .3;const s=this.grid,r=s.road[t];let o=(r===ke.Highway?3.2:r===ke.Avenue?2.1:1.4)*n;const a=t%C,l=t/C|0,c=ka(s,a,l);let h=0;for(let u=0;u<4;u++)c&1<<u&&h++;return h>=3&&(o*=.55),o}walkOk(t){const e=this.grid.road[t];return e===ke.Street||e===ke.Avenue}pickNext(t,e,n){const s=this.grid,r=t%C,o=t/C|0;let a=0,l=-1,c=-1,h=-1;const u=e>=0?e%C:-99,d=e>=0?e/C|0:-99,f=r-u,g=o-d;let v=-1;for(let p=0;p<4;p++){const M=r+rr[p],_=o+or[p];if(!Ht(M,_))continue;const x=lt(M,_);s.road[x]&&(n&&!this.walkOk(x)||x!==e&&(rr[p]===f&&or[p]===g&&(v=x),a===0?l=x:a===1?c=x:h=x,a++))}if(a===0)return e>=0&&s.road[e]?e:-1;if(v>=0&&Math.random()<.65)return v;const m=Math.random()*a|0;return m===0?l:m===1?c:h}setSegment(t,e,n){const s=t.cur%C+.5,r=(t.cur/C|0)+.5,o=t.nxt%C+.5,a=(t.nxt/C|0)+.5,l=Math.sign(o-s),c=Math.sign(a-r);t.lane=this.laneFor(t.cur,e),t.xx=s+l*.5+-c*t.lane,t.xz=r+c*.5+l*t.lane;const h=Math.sign(s-((t.prev>=0?t.prev%C:t.cur%C)+.5)),u=Math.sign(r-((t.prev>=0?t.prev/C|0:t.cur/C|0)+.5));h!==0&&c!==0?(t.cx=t.xx,t.cz=t.ez):u!==0&&l!==0?(t.cx=t.ex,t.cz=t.xz):(t.cx=(t.ex+t.xx)*.5,t.cz=(t.ez+t.xz)*.5),t.sp=this.speedFor(t.cur,e,n)}spawn(t,e,n,s){if(e.length===0)return!1;const r=e[Math.random()*e.length|0],o=this.pickNext(r,-1,n);if(o<0)return!1;t.cur=r,t.prev=-1,t.nxt=o,t.t=Math.random()*.5;const a=r%C+.5,l=(r/C|0)+.5,c=Math.sign(o%C+.5-a),h=Math.sign((o/C|0)+.5-l),u=this.laneFor(r,n);return t.ex=a-c*.5+-h*u,t.ez=l-h*.5+c*u,this.setSegment(t,n,s),!0}advance(t,e,n){if(t.prev=t.cur,t.cur=t.nxt,t.cur<0||!this.grid.road[t.cur])return!1;const s=this.pickNext(t.cur,t.prev,e);return s<0?!1:(t.nxt=s,t.ex=t.xx,t.ez=t.xz,this.setSegment(t,e,n),!0)}stepPool(t,e,n,s,r,o,a,l,c,h){let u=0;for(;e<n&&u<3&&(t.length<=e&&t.push(Hy()),!!this.spawn(t[e],s,r,o));)Le.setHex(l[Math.random()*l.length|0]),Le.multiplyScalar(.85+Math.random()*.3),a.setColorAt(e,Le),a.instanceColor&&(a.instanceColor.needsUpdate=!0),e++,u++;e>n&&(e=n);const d=this.grid;for(let f=0;f<e;f++){const g=t[f];if((g.cur<0||!d.road[g.cur]||g.nxt<0||!d.road[g.nxt])&&!this.spawn(g,s,r,o)){g.cur=-1,Vn.makeScale(0,0,0),a.setMatrixAt(f,Vn);continue}g.t+=c*g.sp;let v=0;for(;g.t>=1&&v++<3;)if(g.t-=1,!this.advance(g,r,o)&&!this.spawn(g,s,r,o)){g.cur=-1;break}if(g.cur<0){Vn.makeScale(0,0,0),a.setMatrixAt(f,Vn);continue}const m=g.t,p=1-m,M=p*p*g.ex+2*m*p*g.cx+m*m*g.xx,_=p*p*g.ez+2*m*p*g.cz+m*m*g.xz;let x=2*p*(g.cx-g.ex)+2*m*(g.xx-g.cx),T=2*p*(g.cz-g.ez)+2*m*(g.xz-g.cz);Math.abs(x)+Math.abs(T)<1e-5&&(x=1,T=0);const y=Math.atan2(-T,x),w=Ta(d,M,_)+h;Vn.compose(Aa.set(M,w,_),Ra.setFromAxisAngle(Id,y),Ca.set(1,1,1)),a.setMatrixAt(f,Vn)}return a.count=e,a.instanceMatrix.needsUpdate=!0,e}updateVehicles(t,e){const n=e.stats.population,s=e.stats.traffic,r=this.roadList,o=r.length===0,a=o?0:Math.min(220,Math.round(4+n*.012+s*90),r.length*2),l=o?0:Math.min(24,Math.floor(n/900)),c=o?0:Math.min(20,2+Math.floor(e.stats.indBuildings*.4)),h=this.walkList.length===0?0:Math.min(90,Math.floor(n/120));this.nCars=this.stepPool(this.cars,this.nCars,a,r,!1,1,this.car,Xy,t,.015),this.nBuses=this.stepPool(this.buses,this.nBuses,l,r,!1,.8,this.bus,qy,t,.015),this.nTrucks=this.stepPool(this.trucks,this.nTrucks,c,r,!1,.85,this.truck,Yy,t,.015),this.nPeds=this.stepPool(this.peds,this.nPeds,h,this.walkList,!0,1,this.ped,$y,t,fo)}updateBoats(t){const e=this.boatAnchors.length;for(let n=0;n<e;n++){const s=this.boatAnchors[n],r=t*.07+s.phase,o=s.x+Math.cos(r)*s.r,a=s.z+Math.sin(r)*s.r,l=Yn+.045+Math.sin(t*1.25+s.phase*3)*.02,c=Math.atan2(-Math.cos(r),-Math.sin(r));Ga.set(Math.sin(t*.9+s.phase)*.05,c,Math.sin(t*1.1+s.phase)*.06),Vn.compose(Aa.set(o,l,a),Ra.setFromEuler(Ga),Ca.set(1,1,1)),this.boat.setMatrixAt(n,Vn)}e>0&&(this.boat.instanceMatrix.needsUpdate=!0)}clearSigns(){for(const t of[...this.signRoot.children])this.signRoot.remove(t),t.traverse(e=>{const n=e;if(n.isMesh){n.geometry!==this.signPostGeo&&n.geometry.dispose();const s=n.material;if(s!==this.matGlow){const r=s;r.map&&r.map.dispose(),s.dispose()}}})}syncSigns(){const t=this.state.signs;let e=String(t.length);for(const n of t)e+="|"+n.x+","+n.y+","+n.text;if(e!==this.signKey){this.signKey=e,this.clearSigns();for(const n of t)this.buildSign(n)}}buildSign(t){if(!Ht(t.x,t.y))return;const e=this.grid,n=lt(t.x,t.y),s=Math.max(e.height[n],Yn),r=document.createElement("canvas");r.width=256,r.height=96;const o=r.getContext("2d");if(o){o.fillStyle="#12452a",o.fillRect(0,0,256,96),o.strokeStyle="#e9ebe7",o.lineWidth=5,o.strokeRect(6,6,244,84),o.fillStyle="#f4f6f2",o.textAlign="center",o.textBaseline="middle";let d=40;const f=t.text||"·";do o.font=`bold ${d}px system-ui, sans-serif`,d-=2;while(d>12&&o.measureText(f).width>232);o.fillText(f,128,50)}const a=new Df(r);a.colorSpace=Cn,a.anisotropy=4;const l=new Ts,c=new Ge(new ri(.95,.36),new Nr({map:a,side:ii}));c.position.y=.66,l.add(c);const h=new Ge(this.signPostGeo,this.matGlow);l.add(h);let u=wt(t.x,t.y,61)*Math.PI*2;for(let d=0;d<4;d++){const f=t.x+rr[d],g=t.y+or[d];if(Ht(f,g)&&e.road[lt(f,g)]){u=d===0?Math.PI:d===2?0:d===1?Math.PI/2:-Math.PI/2;break}}l.rotation.y=u,l.position.set(t.x+.5,s,t.y+.5),this.signRoot.add(l)}}const Zy=[[["clear",.42],["cloudy",.26],["rain",.2],["fog",.08],["storm",.04]],[["clear",.55],["cloudy",.18],["rain",.1],["storm",.12],["fog",.05]],[["clear",.33],["cloudy",.3],["rain",.22],["fog",.12],["storm",.03]],[["clear",.3],["cloudy",.28],["snow",.3],["fog",.1],["storm",.02]]],Fd={clear:[0,0],cloudy:[.35,.75],rain:[.4,.9],storm:[.7,1],fog:[.5,.95],snow:[.4,.9]},Jy={clear:.2,cloudy:.5,rain:.9,storm:2.2,fog:.1,snow:.5},Od=`
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
`,kd=`
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
`;function Bd(i,t){const e=new cg,n=new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]);e.setAttribute("position",new De(n,3)),e.setIndex([0,1,2,0,2,3]);const s=new Float32Array(i*3),r=new Float32Array(i);for(let o=0;o<i;o++)s[o*3]=t(),s[o*3+1]=t(),s[o*3+2]=t(),r[o]=t();return e.setAttribute("aSeed",new Oa(s,3)),e.setAttribute("aRand",new Oa(r,1)),e.instanceCount=i,e}function Qy(i){const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d");n.clearRect(0,0,256,256);for(let r=0;r<26;r++){const o=i()*256,a=i()*256,l=16+i()*40;for(let c=-1;c<=1;c++)for(let h=-1;h<=1;h++){const u=o+c*256,d=a+h*256;if(u<-l||u>256+l||d<-l||d>256+l)continue;const f=n.createRadialGradient(u,d,l*.1,u,d,l);f.addColorStop(0,"rgba(255,255,255,0.9)"),f.addColorStop(.55,"rgba(255,255,255,0.6)"),f.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=f,n.beginPath(),n.arc(u,d,l,0,Math.PI*2),n.fill()}}const s=new Df(e);return s.wrapS=go,s.wrapT=go,s.repeat.set(2,2),s}const zd=new N,$l=new N;class tM{constructor(t,e){L(this,"state",{kind:"clear",intensity:0,windX:.25,windZ:.1});L(this,"scene");L(this,"camera");L(this,"rnd",as(6192151));L(this,"clock",0);L(this,"timer",25);L(this,"targetKind","clear");L(this,"targetIntensity",0);L(this,"windTX",.25);L(this,"windTZ",.1);L(this,"rain");L(this,"rainU");L(this,"snow");L(this,"snowU");L(this,"cloud");L(this,"cloudTex");L(this,"cloudDepth");L(this,"flash");L(this,"flashT",0);L(this,"boltTimer",6);this.scene=t,this.camera=e,this.rainU={uTime:{value:0},uCenter:{value:new N(64,10,64)},uBox:{value:new N(85,48,85)},uVel:{value:new N(2,-34,1)},uSize:{value:new ut(.035,.95)},uAlpha:{value:.3},uDensity:{value:1},uSway:{value:0},uColor:{value:new ct(10336460)}};const n=new tn({uniforms:this.rainU,vertexShader:Od,fragmentShader:kd,transparent:!0,depthWrite:!1});this.rain=new Ge(Bd(1e3,this.rnd),n),this.rain.frustumCulled=!1,this.rain.renderOrder=60,this.rain.visible=!1,t.add(this.rain),this.snowU={uTime:{value:0},uCenter:{value:new N(64,10,64)},uBox:{value:new N(75,40,75)},uVel:{value:new N(.6,-2.4,.3)},uSize:{value:new ut(.09,.09)},uAlpha:{value:.8},uDensity:{value:1},uSway:{value:.55},uColor:{value:new ct(16777215)}};const s=new tn({uniforms:this.snowU,vertexShader:Od,fragmentShader:kd,transparent:!0,depthWrite:!1});this.snow=new Ge(Bd(800,this.rnd),s),this.snow.frustumCulled=!1,this.snow.renderOrder=60,this.snow.visible=!1,t.add(this.snow),this.cloudTex=Qy(this.rnd);const r=new Nr({colorWrite:!1,depthWrite:!1,transparent:!0});this.cloud=new Ge(new ri(560,560),r),this.cloud.rotation.x=-Math.PI/2,this.cloud.position.set(64,72,64),this.cloud.castShadow=!0,this.cloudDepth=new Bf({depthPacking:bf,map:this.cloudTex,alphaTest:.5}),this.cloud.customDepthMaterial=this.cloudDepth,this.cloud.visible=!1,t.add(this.cloud),this.flash=new lg(14214911,0),t.add(this.flash)}set(t,e){const[n,s]=Fd[t],r=n+(s-n)*.6;this.targetKind=t,this.targetIntensity=t==="clear"?0:re(e??r),this.state.kind=t,this.state.intensity=this.targetIntensity,this.pickWind(t),this.timer=45+this.rnd()*60}pickWind(t){const e=Jy[t]*(.7+this.rnd()*.6),n=this.rnd()*Math.PI*2;this.windTX=Math.cos(n)*e,this.windTZ=Math.sin(n)*e}pickTarget(t){const e=Zy[t];let n=this.rnd(),s="clear";for(const[a,l]of e){if(n<l){s=a;break}n-=l}const[r,o]=Fd[s];this.targetKind=s,this.targetIntensity=s==="clear"?0:r+this.rnd()*(o-r),this.pickWind(s)}update(t,e){this.clock+=t;const n=this.state;this.timer-=t,this.timer<=0&&(this.pickTarget(e.season),this.timer=30+this.rnd()*60),n.kind!==this.targetKind?(n.intensity=Math.max(0,n.intensity-t*.22),n.intensity<=.001&&(n.kind=this.targetKind)):n.intensity+=Vt(this.targetIntensity-n.intensity,-t*.15,t*.12);const s=Math.min(1,t*.4);n.windX=Nt(n.windX,this.windTX,s),n.windZ=Nt(n.windZ,this.windTZ,s);const r=(this.scene.userData.quality??"high")!=="low",o=n.kind,a=n.intensity;zd.set(0,0,-1).applyQuaternion(this.camera.quaternion),$l.copy(this.camera.position).addScaledVector(zd,Vt(this.camera.position.y*.9,6,42)),this.rainU.uTime.value=this.clock,this.snowU.uTime.value=this.clock,this.rainU.uCenter.value.copy($l),this.snowU.uCenter.value.copy($l);const l=r&&(o==="rain"||o==="storm")&&a>.02;if(this.rain.visible=l,l){const u=o==="storm"?1.35:1;this.rainU.uDensity.value=re(a*u),this.rainU.uAlpha.value=.22+a*.2,this.rainU.uVel.value.set(n.windX*14*u,-34-a*10,n.windZ*14*u)}const c=r&&o==="snow"&&a>.02;this.snow.visible=c,c&&(this.snowU.uDensity.value=re(a),this.snowU.uAlpha.value=.6+a*.3,this.snowU.uVel.value.set(n.windX*3,-2.2-a*1.2,n.windZ*3));const h=r&&a>.05&&(o==="cloudy"||o==="rain"||o==="storm"||o==="snow");if(this.cloud.visible=h,h&&(this.cloudTex.offset.x+=n.windX*t*.004,this.cloudTex.offset.y+=n.windZ*t*.004,this.cloudDepth.alphaTest=o==="storm"?.3:o==="cloudy"?.55:.42),r&&o==="storm"&&a>.25&&(this.boltTimer-=t,this.boltTimer<=0&&(this.flashT=.26,this.boltTimer=2+this.rnd()*9)),this.flashT>0){this.flashT=Math.max(0,this.flashT-t);const u=.26-this.flashT;let d;u<.06?d=4.2:u<.11?d=.6:u<.2?d=2.6:d=.4,this.flash.intensity=d*a}else this.flash.intensity!==0&&(this.flash.intensity=0)}dispose(){this.scene.remove(this.rain,this.snow,this.cloud,this.flash),this.rain.geometry.dispose(),this.rain.material.dispose(),this.snow.geometry.dispose(),this.snow.material.dispose(),this.cloud.geometry.dispose(),this.cloud.material.dispose(),this.cloudDepth.dispose(),this.cloudTex.dispose(),this.flash.dispose()}}const pa=[0,0,0];function ar(i,t){const e=i.length-1,n=Math.min(.9999,Math.max(0,t))*e,s=n|0,r=n-s,o=i[s],a=i[s+1];return pa[0]=o[0]+(a[0]-o[0])*r,pa[1]=o[1]+(a[1]-o[1])*r,pa[2]=o[2]+(a[2]-o[2])*r,pa}const eM=[[110,205,110],[168,168,72],[136,92,44],[70,42,20]],nM=[[64,104,228],[80,200,124],[255,206,64]],iM=[[70,200,84],[255,190,54],[232,48,36]],sM=[[190,120,255],[120,40,200]],rM=[[255,120,90],[190,10,40]],oM=[[210,250,250],[20,190,188]],aM=[[255,242,178],[255,158,54],[205,32,64]],lM=[[214,244,232],[36,186,140]],cM=[[226,222,252],[110,84,226]],hM=[[255,224,160],[255,140,32]],uM=[[224,64,52],[240,222,96],[74,204,96]],dM={[Kt.ResLow]:[136,224,110,140],[Kt.ResMed]:[92,205,84,150],[Kt.ResHigh]:[44,180,60,160],[Kt.ComLow]:[108,176,255,140],[Kt.ComHigh]:[42,122,238,160],[Kt.IndAgri]:[216,200,96,140],[Kt.IndLight]:[236,178,64,150],[Kt.IndHeavy]:[210,140,36,160]};let ma=null;function fM(){if(!ma){ma=new Uint8Array(Ps.length);for(const i of Ps)(i.waterOut>0||i.key==="t_subway")&&(ma[i.id]=1)}return ma}class pM{constructor(){L(this,"texture");L(this,"data");L(this,"overlay","none");L(this,"_strength",0);this.data=new Uint8Array(j*4),this.texture=new Fa(this.data,C,at,Nn,fi),this.texture.magFilter=Tn,this.texture.minFilter=Tn,this.texture.generateMipmaps=!1,this.texture.needsUpdate=!0}get strength(){return this._strength}set(t){this.overlay=t,this._strength=t==="none"?0:t==="underground"?1:.85,t==="none"&&(this.data.fill(0),this.texture.needsUpdate=!0)}refresh(t){if(this.overlay==="none")return;const e=t.grid;switch(this.overlay){case"zones":this.pxZones(e);break;case"power":this.pxUtility(e,e.powered,e.wire,!1);break;case"water":this.pxUtility(e,e.watered,e.pipe,!0);break;case"pollution":this.pxPollution(e);break;case"noise":this.pxField(e.noise,sM,215,null);break;case"crime":this.pxField(e.crime,rM,220,null);break;case"landvalue":this.pxLand(e,e.landValue,nM,135);break;case"traffic":this.pxTraffic(e);break;case"transit":this.pxField(e.covTransit,oM,200,null);break;case"density":this.pxDensity(e);break;case"health":this.pxField(e.covHealth,lM,185,null);break;case"education":this.pxField(e.covEducation,cM,185,null);break;case"fire":this.pxFire(e);break;case"desirability":this.pxLand(e,e.desirability,uM,140);break;case"underground":this.pxUnderground(e);break}this.texture.needsUpdate=!0}dispose(){this.texture.dispose()}pxZones(t){const e=this.data;for(let n=0;n<j;n++){const s=n*4,r=dM[t.zone[n]];r?(e[s]=r[0],e[s+1]=r[1],e[s+2]=r[2],e[s+3]=r[3]):e[s+3]=0}}pxUtility(t,e,n,s){const r=this.data;for(let o=0;o<j;o++){const a=o*4;t.building[o]!==0||t.zone[o]!==0?e[o]?(s?(r[a]=84,r[a+1]=172,r[a+2]=255):(r[a]=255,r[a+1]=232,r[a+2]=96),r[a+3]=95):(r[a]=255,r[a+1]=58,r[a+2]=42,r[a+3]=175):n[o]?e[o]?(s?(r[a]=120,r[a+1]=205,r[a+2]=255):(r[a]=255,r[a+1]=240,r[a+2]=150),r[a+3]=150):(r[a]=255,r[a+1]=96,r[a+2]=64,r[a+3]=170):r[a+3]=0}}pxPollution(t){const e=this.data;for(let n=0;n<j;n++){const s=n*4,r=t.pollution[n];if(t.water[n]&&r===0){e[s+3]=0;continue}const o=r/255,a=ar(eM,o);e[s]=a[0],e[s+1]=a[1],e[s+2]=a[2],e[s+3]=36+o*185|0}}pxField(t,e,n,s){const r=this.data;for(let o=0;o<j;o++){const a=o*4,l=t[o];if(l===0||s&&s[o]){r[a+3]=0;continue}const c=l/255,h=ar(e,c);r[a]=h[0],r[a+1]=h[1],r[a+2]=h[2],r[a+3]=c*n|0}}pxLand(t,e,n,s){const r=this.data;for(let o=0;o<j;o++){const a=o*4;if(t.water[o]){r[a+3]=0;continue}const l=ar(n,e[o]/255);r[a]=l[0],r[a+1]=l[1],r[a+2]=l[2],r[a+3]=s}}pxTraffic(t){const e=this.data;for(let n=0;n<j;n++){const s=n*4;if(!t.road[n]){e[s+3]=0;continue}const r=ar(iM,t.traffic[n]/255);e[s]=r[0],e[s+1]=r[1],e[s+2]=r[2],e[s+3]=205}}pxDensity(t){const e=this.data;for(let n=0;n<j;n++){const s=n*4,r=t.population[n]+t.jobs[n];if(r===0){e[s+3]=0;continue}const o=Math.min(1,r/380),a=ar(aM,o);e[s]=a[0],e[s+1]=a[1],e[s+2]=a[2],e[s+3]=60+o*170|0}}pxFire(t){const e=this.data;for(let n=0;n<j;n++){const s=n*4;if(t.onFire[n]){e[s]=255,e[s+1]=46,e[s+2]=10,e[s+3]=245;continue}const r=t.covFire[n];if(r===0){e[s+3]=0;continue}const o=r/255,a=ar(hM,o);e[s]=a[0],e[s+1]=a[1],e[s+2]=a[2],e[s+3]=o*175|0}}pxUnderground(t){const e=this.data,n=fM();for(let s=0;s<j;s++){const r=s*4,o=t.building[s],a=t.pipe[s]!==0,l=t.subway[s]!==0;o!==0&&n[o]?(e[r]=245,e[r+1]=248,e[r+2]=255,e[r+3]=255):a&&l?((Ji(s)+Qi(s)&1)===0?(e[r]=64,e[r+1]=172,e[r+2]=255):(e[r]=255,e[r+1]=152,e[r+2]=44),e[r+3]=235):a?(e[r]=64,e[r+1]=172,e[r+2]=255,e[r+3]=235):l?(e[r]=255,e[r+1]=152,e[r+2]=44,e[r+3]=235):(e[r]=36,e[r+1]=42,e[r+2]=54,e[r+3]=191)}}}const ga=12,va=260,jl=rn.degToRad(12),Kl=rn.degToRad(78),mn=10;class mM{constructor(t,e){L(this,"target",new N(64,0,64));L(this,"_enabled",!0);L(this,"_gesturing",!1);L(this,"distance",90);L(this,"azimuth",Math.PI*.25);L(this,"polar",rn.degToRad(48));L(this,"desiredDistance",90);L(this,"desiredAzimuth",this.azimuth);L(this,"desiredPolar",this.polar);L(this,"desiredX",64);L(this,"desiredZ",64);L(this,"panVX",0);L(this,"panVZ",0);L(this,"rotV",0);L(this,"pointers",new Map);L(this,"grab",null);L(this,"lastX",0);L(this,"lastY",0);L(this,"pairDistance",0);L(this,"pairAngle",0);L(this,"pairY",0);L(this,"centroidX",0);L(this,"centroidY",0);L(this,"grid",null);L(this,"raycaster",new dg);L(this,"ndc",new ut);L(this,"plane",new Zi(new N(0,1,0)));L(this,"scratch",new N);L(this,"preventMenu",t=>t.preventDefault());L(this,"onDown",t=>{if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,type:t.pointerType}),this.dom.setPointerCapture(t.pointerId),this.pointers.size>=2){this.initPair();return}this.enabled&&(this._gesturing=!0,this.lastX=t.clientX,this.lastY=t.clientY,(t.pointerType!=="mouse"||t.button===0)&&(this.grab=this.screenToGround(t.clientX,t.clientY)))});L(this,"onMove",t=>{const e=this.pointers.get(t.pointerId);if(!e)return;if(e.x=t.clientX,e.y=t.clientY,this.pointers.size>=2){const r=[...this.pointers.values()][0],o=[...this.pointers.values()][1],a=o.x-r.x,l=o.y-r.y,c=Math.max(1,Math.hypot(a,l)),h=Math.atan2(l,a),u=(r.y+o.y)*.5,d=(r.x+o.x)*.5,f=this.screenToGround(this.centroidX,this.centroidY);this.desiredDistance=rn.clamp(this.desiredDistance*this.pairDistance/c,ga,va);let g=h-this.pairAngle;g>Math.PI&&(g-=Math.PI*2),g<-Math.PI&&(g+=Math.PI*2),this.desiredAzimuth-=g,this.rotV=-g*30,this.desiredPolar=rn.clamp(this.desiredPolar+(u-this.pairY)*.004,jl,Kl),this.recomputeCamera();const v=this.screenToGround(d,u);f&&v&&(this.desiredX+=f.x-v.x,this.desiredZ+=f.z-v.z),this.pairDistance=c,this.pairAngle=h,this.pairY=u,this.centroidX=d,this.centroidY=u;return}if(!this.enabled)return;const n=t.clientX-this.lastX,s=t.clientY-this.lastY;if(t.pointerType==="mouse"&&t.buttons&2){const r=-n*.006;this.desiredAzimuth+=r,this.desiredPolar=rn.clamp(this.desiredPolar+s*.005,jl,Kl),this.rotV=r*30}else if(this.grab){const r=this.groundAt(t.clientX,t.clientY,this.grab.y);if(r){const o=this.grab.x-r.x,a=this.grab.z-r.z;this.desiredX+=o,this.desiredZ+=a,this.panVX=o*30,this.panVZ=a*30}}this.lastX=t.clientX,this.lastY=t.clientY});L(this,"onUp",t=>{if(this.pointers.delete(t.pointerId),this.dom.hasPointerCapture(t.pointerId)&&this.dom.releasePointerCapture(t.pointerId),this.pointers.size>=2)this.initPair();else if(this.pointers.size===1){const e=[...this.pointers.values()][0];this.lastX=e.x,this.lastY=e.y,this._gesturing=!1,this.grab=this.enabled?this.screenToGround(e.x,e.y):null}else this._gesturing=!1,this.grab=null});L(this,"onWheel",t=>{if(!this.enabled)return;t.preventDefault();const e=this.screenToGround(t.clientX,t.clientY);this.zoomBy(Math.exp(t.deltaY*.0012)),this.distance=this.desiredDistance,this.recomputeCamera();const n=this.screenToGround(t.clientX,t.clientY);if(e&&n){const s=e.x-n.x,r=e.z-n.z;Number.isFinite(s)&&Number.isFinite(r)&&(this.desiredX=rn.clamp(this.desiredX+s,-mn,C+mn),this.desiredZ=rn.clamp(this.desiredZ+r,-mn,at+mn))}});this.camera=t,this.dom=e,e.style.touchAction="none",e.addEventListener("pointerdown",this.onDown),e.addEventListener("pointermove",this.onMove),e.addEventListener("pointerup",this.onUp),e.addEventListener("pointercancel",this.onUp),e.addEventListener("wheel",this.onWheel,{passive:!1}),e.addEventListener("contextmenu",this.preventMenu)}get gesturing(){return this._gesturing}get enabled(){return this._enabled}set enabled(t){this._enabled=t,!t&&this.pointers.size<2&&(this._gesturing=!1,this.grab=null)}pointerRay(t,e){const n=this.dom.getBoundingClientRect();return this.ndc.set((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.ndc,this.camera),this.raycaster.ray}groundAt(t,e,n){return this.plane.constant=-n,this.pointerRay(t,e).intersectPlane(this.plane,this.scratch)?this.scratch.clone():null}screenToGround(t,e){let n=this.grid?Qa(this.grid,this.target.x,this.target.z):this.target.y,s=null;for(let r=0;r<3;r++){if(s=this.groundAt(t,e,n),!s)return null;this.grid&&(n=Qa(this.grid,s.x,s.z))}return s&&(s.y=n),s}screenToTile(t,e,n){const s=this.grid;this.grid=n;const r=this.screenToGround(t,e);return this.grid=s??n,!r||r.x<0||r.z<0||r.x>=C||r.z>=at?null:{x:Math.floor(r.x),y:Math.floor(r.z)}}initPair(){const t=[...this.pointers.values()][0],e=[...this.pointers.values()][1],n=e.x-t.x,s=e.y-t.y;this.pairDistance=Math.max(1,Math.hypot(n,s)),this.pairAngle=Math.atan2(s,n),this.pairY=(t.y+e.y)*.5,this.centroidX=(t.x+e.x)*.5,this.centroidY=this.pairY,this._gesturing=!0,this.grab=null}zoomBy(t){this.desiredDistance=rn.clamp(this.desiredDistance*t,ga,va)}rotateBy(t){this.desiredAzimuth+=t,this.rotV+=t*3}focusOn(t,e,n){this.desiredX=rn.clamp(t,-mn,C+mn),this.desiredZ=rn.clamp(e,-mn,at+mn),n!==void 0&&(this.desiredDistance=rn.clamp(n,ga,va))}recomputeCamera(){const t=Math.sin(this.polar)*this.distance;this.camera.position.set(this.target.x+Math.sin(this.azimuth)*t,this.target.y+Math.cos(this.polar)*this.distance,this.target.z+Math.cos(this.azimuth)*t),this.camera.lookAt(this.target),this.camera.updateMatrixWorld()}update(t,e){this.grid=e;const n=Math.min(t,.05);if(!this._gesturing){this.desiredX+=this.panVX*n,this.desiredZ+=this.panVZ*n,this.desiredAzimuth+=this.rotV*n;const o=Math.exp(-7*n);this.panVX*=o,this.panVZ*=o,this.rotV*=Math.exp(-8*n)}this.desiredX=rn.clamp(this.desiredX,-mn,C+mn),this.desiredZ=rn.clamp(this.desiredZ,-mn,at+mn);const s=1-Math.exp(-14*n);this.target.x+=(this.desiredX-this.target.x)*s,this.target.z+=(this.desiredZ-this.target.z)*s,this.distance+=(this.desiredDistance-this.distance)*s,this.azimuth+=(this.desiredAzimuth-this.azimuth)*s,this.polar+=(this.desiredPolar-this.polar)*s;const r=Qa(e,this.target.x,this.target.z);this.target.y+=(r-this.target.y)*(1-Math.exp(-9*n)),this.recomputeCamera()}getPose(){return{tx:this.desiredX,tz:this.desiredZ,dist:this.desiredDistance,az:this.desiredAzimuth,pol:this.desiredPolar}}setPose(t){this.desiredX=this.target.x=rn.clamp(t.tx,-mn,C+mn),this.desiredZ=this.target.z=rn.clamp(t.tz,-mn,at+mn),this.desiredDistance=this.distance=rn.clamp(t.dist,ga,va),this.desiredAzimuth=this.azimuth=t.az,this.desiredPolar=this.polar=rn.clamp(t.pol,jl,Kl)}dispose(){this.dom.removeEventListener("pointerdown",this.onDown),this.dom.removeEventListener("pointermove",this.onMove),this.dom.removeEventListener("pointerup",this.onUp),this.dom.removeEventListener("pointercancel",this.onUp),this.dom.removeEventListener("wheel",this.onWheel),this.dom.removeEventListener("contextmenu",this.preventMenu)}}const Zl=i=>i==="bulldoze"||i==="tree"||i.startsWith("zone_")||i.startsWith("road_")||i==="rail"||i==="wire"||i==="pipe"||i==="subway",gM=i=>i.startsWith("road_")||i==="rail"||i==="wire"||i==="pipe"||i==="subway";function vM(i,t,e,n){const s=[];if(Math.abs(e-i)>=Math.abs(n-t)){const o=e>=i?1:-1;for(let l=i;l!==e+o;l+=o)s.push({x:l,y:t});const a=n>=t?1:-1;for(let l=t+a;l!==n+a;l+=a)s.push({x:e,y:l})}else{const o=n>=t?1:-1;for(let l=t;l!==n+o;l+=o)s.push({x:i,y:l});const a=e>=i?1:-1;for(let l=i+a;l!==e+a;l+=a)s.push({x:l,y:n})}return s}class _M{constructor(t,e){L(this,"pointer",null);L(this,"x0",0);L(this,"y0",0);L(this,"x1",0);L(this,"y1",0);L(this,"clientX",0);L(this,"clientY",0);L(this,"downX",0);L(this,"downY",0);L(this,"moved",!1);L(this,"longPressed",!1);L(this,"timer",0);L(this,"tool","inspect");L(this,"onRightCancel",t=>{t.button===2&&this.pointer!==null&&(t.preventDefault(),t.stopPropagation(),this.abort(),this.host.sfx("click"))});L(this,"onContext",t=>t.preventDefault());L(this,"onDown",t=>{if(this.pointer!==null||t.button!==0||this.host.overUI(t.clientX,t.clientY))return;const e=this.host.controls.screenToTile(t.clientX,t.clientY,this.host.state.grid);e&&(this.pointer=t.pointerId,this.tool=this.host.state.tool,this.x0=this.x1=e.x,this.y0=this.y1=e.y,this.downX=this.clientX=t.clientX,this.downY=this.clientY=t.clientY,this.moved=this.longPressed=!1,this.tool!=="inspect"&&(this.host.controls.enabled=!1),this.tool==="inspect"&&(this.timer=window.setTimeout(()=>{this.pointer===t.pointerId&&!this.moved&&!this.host.controls.gesturing&&(this.longPressed=!0,this.selectTile(this.x0,this.y0),this.host.onHighlight(null),this.host.sfx("click"))},500)))});L(this,"onMove",t=>{if(t.pointerId!==this.pointer)return;if(this.clientX=t.clientX,this.clientY=t.clientY,this.host.controls.gesturing){this.abort();return}Math.hypot(t.clientX-this.downX,t.clientY-this.downY)>7&&(this.moved=!0,clearTimeout(this.timer));const e=this.host.controls.screenToTile(t.clientX,t.clientY,this.host.state.grid);e&&(this.x1=e.x,this.y1=e.y,Zl(this.tool)&&this.preview())});L(this,"onUp",t=>{if(t.pointerId!==this.pointer)return;if(clearTimeout(this.timer),this.host.controls.gesturing||this.longPressed){this.abort();return}const e=this.tool,n=this.x0,s=this.y0,r=Zl(e)?this.x1:this.x0,o=Zl(e)?this.y1:this.y0;if(this.pointer=null,this.host.controls.enabled=!0,this.clearHighlight(),e==="inspect"){this.moved||this.selectTile(n,s);return}if(e==="sign"){this.placeSign(n,s,t.clientX,t.clientY);return}this.apply(e,n,s,r,o,t.clientX,t.clientY)});L(this,"onCancel",t=>{t.pointerId===this.pointer&&this.abort()});this.dom=t,this.host=e,t.addEventListener("pointerdown",this.onDown),t.addEventListener("pointermove",this.onMove),t.addEventListener("pointerup",this.onUp),t.addEventListener("pointercancel",this.onCancel),t.addEventListener("contextmenu",this.onContext),t.addEventListener("pointerdown",this.onRightCancel,!0)}preview(){const t=this.host.actions.applyTool(this.tool,this.x0,this.y0,this.x1,this.y1,!0);if(gM(this.tool)){const e=this.host.onHighlightPath;if(e){this.host.onHighlight(null),e(vM(this.x0,this.y0,this.x1,this.y1),t.ok);return}}this.host.onHighlight({x0:this.x0,y0:this.y0,x1:this.x1,y1:this.y1,valid:t.ok})}clearHighlight(){this.host.onHighlight(null),this.host.onHighlightPath?.(null,!0)}selectTile(t,e){const n=this.host.state.grid,s=lt(t,e),r=!!(n.building[s]||n.road[s]||n.rail[s]||n.wire[s]||n.pipe[s]||n.subway[s]||n.zone[s]||n.tree[s]||n.water[s]);this.host.onSelect(r?s:null)}async placeSign(t,e,n,s){const r=await this.host.promptSign();r!==null&&(this.host.actions.pendingSignText=r,this.apply("sign",t,e,t,e,n,s))}apply(t,e,n,s,r,o,a){const l=this.host.actions.applyTool(t,e,n,s,r,!1);l.ok?(l.cost&&this.host.money(-l.cost,o,a),this.host.sfx(t==="bulldoze"?"bulldoze":"place")):(this.host.sfx("error"),this.host.toast(l.reason??"Cannot place here","warn"))}abort(){clearTimeout(this.timer),this.pointer=null,this.host.controls.enabled=!0,this.clearHighlight()}update(){this.pointer!==null&&this.host.controls.gesturing&&this.abort()}dispose(){this.abort(),this.dom.removeEventListener("pointerdown",this.onDown),this.dom.removeEventListener("pointermove",this.onMove),this.dom.removeEventListener("pointerup",this.onUp),this.dom.removeEventListener("pointercancel",this.onCancel)}}const xM="modulepreload",yM=function(i,t){return new URL(i,t).href},Hd={},oo=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let o=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");s=o(e.map(h=>{if(h=yM(h,n),h in Hd)return;Hd[h]=!0;const u=h.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(!!n)for(let v=a.length-1;v>=0;v--){const m=a[v];if(m.href===h&&(!u||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${d}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":xM,u||(g.as="script"),g.crossOrigin="",g.href=h,c&&g.setAttribute("nonce",c),document.head.appendChild(g),u)return new Promise((v,m)=>{g.addEventListener("load",v),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},po=i=>`<svg viewBox="0 0 24 24" aria-hidden="true">${i}</svg>`,MM=po('<circle cx="12" cy="12" r="8"/><path d="M14.5 8.5c-1-1-4-.8-4 .8 0 2.5 4.5 1 4.5 3.7 0 1.8-3.5 2.3-5.5.5M12 6v12"/>'),wM=po('<circle cx="9" cy="8" r="3"/><path d="M3 19c.5-4 2.5-6 6-6s5.5 2 6 6M16 7.5a2.5 2.5 0 0 1 0 5M16 14c3 .2 4.5 2 5 5"/>');class bM{constructor(t,e){L(this,"element");L(this,"fundsShown");L(this,"targetFunds");L(this,"tickerOffset",0);L(this,"offs",[]);this.state=t,this.fundsShown=this.targetFunds=t().budget.funds,this.element=document.createElement("div"),this.element.innerHTML=`<div class="hud-top" data-ui>
      <div class="pill hud-funds">${MM}<span class="num funds-v"></span></div>
      <div class="pill hud-date"><span class="season"></span><span class="date-txt"></span></div>
      <div class="pill hud-pop">${wM}<span class="num pop-v"></span></div>
      <div class="pill hud-face"><span class="face-v"></span></div><div class="hud-spacer"></div>
      <div class="speed-group" aria-label="Game speed"></div>
      <button class="icon-btn overlay-btn" aria-label="Map overlays">${po('<path d="m4 8 8-4 8 4-8 4-8-4Z"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4"/>')}</button>
      <button class="icon-btn panels-btn" aria-label="City panels">${po('<path d="M5 6h14M5 12h14M5 18h14"/>')}<span class="dot" hidden></span></button>
      <button class="icon-btn menu-btn-top" aria-label="Menu">${po('<circle cx="12" cy="12" r="9"/><path d="M8 9h8M8 12h8M8 15h8"/>')}</button>
    </div><div class="rci" data-ui aria-label="Residential, commercial and industrial demand"></div>
    <div class="bottom-stack"><div class="ticker" data-ui><button class="ticker-line"><span class="ic">◈</span><span class="ticker-view"><span class="ticker-track"></span></span></button><div class="ticker-list"></div></div><div class="drawer-mount"></div></div>`;const n=this.q(".speed-group");["⏸","▶","▶▶","▶▶▶"].forEach((s,r)=>{const o=document.createElement("button");o.textContent=s,o.ariaLabel=`Speed ${r}`,o.onclick=()=>{t().speed=r,Lt.emit("speed:changed",{speed:r}),this.refresh()},n.append(o)}),this.q(".overlay-btn").addEventListener("click",s=>e.overlays(s.currentTarget)),this.q(".panels-btn").addEventListener("click",e.panels),this.q(".menu-btn-top").addEventListener("click",e.menu),this.q(".ticker-line").addEventListener("click",()=>this.q(".ticker").classList.toggle("open")),this.offs.push(Lt.on("budget:updated",s=>{this.targetFunds=s.funds}),Lt.on("stats:updated",()=>this.refresh()),Lt.on("time:updated",()=>this.refresh()),Lt.on("news",s=>this.addNews(s.text,s.kind)),Lt.on("paper",()=>{this.q(".panels-btn .dot").hidden=!1})),t().news.slice(-8).forEach(s=>this.addNews(s.text,s.kind)),this.refresh()}mount(t){t.append(this.element)}drawerMount(){return this.q(".drawer-mount")}update(t){this.targetFunds=this.state().budget.funds,this.fundsShown+=(this.targetFunds-this.fundsShown)*Math.min(1,t*7),this.q(".hud-funds").classList.toggle("neg",this.targetFunds<0),this.q(".funds-v").textContent=`§${Math.round(this.fundsShown).toLocaleString()}`,this.tickerOffset+=t}setOverlay(t){this.q(".overlay-btn").classList.toggle("on",t!=="none")}clearPaperBadge(){this.q(".panels-btn .dot").hidden=!0}dispose(){this.offs.forEach(t=>t())}refresh(){const t=this.state(),e=t.time;this.targetFunds=t.budget.funds,this.q(".pop-v").textContent=t.stats.population.toLocaleString(),this.q(".date-txt").textContent=`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.month]} ${e.day}, ${e.year}`;const n=this.q(".season");n.className=`season s${e.season}`,n.textContent=["✿","☀","◇","❄"][e.season];const s=t.stats.approval;this.q(".face-v").textContent=s>.7?"◉‿◉":s>.45?"◉—◉":s>.25?"◉︵◉":"×︵×",Array.from(this.q(".speed-group").children).forEach((o,a)=>o.classList.toggle("on",a===t.speed));const r=this.q(".rci");r.innerHTML="",[["r","R"],["c","C"],["i","I"]].forEach(([o,a])=>{const l=t.demand[o],c=document.createElement("div");c.className=`rci-col rci-${o}`;const h=Math.abs(l)*50;c.innerHTML=`<div class="rci-bar"><i class="rci-fill" style="height:${h}%;${l>=0?"bottom":"top"}:50%"></i></div><span class="rci-lbl">${a}</span>`,r.append(c)})}addNews(t,e){const n=this.q(".ticker-track"),s=document.createElement("span");s.className=`t-${e}`,s.textContent=t,n.prepend(s),n.children.length>12&&n.lastElementChild?.remove();const r=document.createElement("div");r.className=`ticker-item k-${e}`,r.innerHTML='<span class="when">Now</span><span></span>',r.lastElementChild.textContent=t,this.q(".ticker-list").prepend(r),this.q(".ticker-list").children.length>12&&this.q(".ticker-list").lastElementChild?.remove()}q(t){return this.element.querySelector(t)}}const SM=[["zones","Zones"],["roads","Roads"],["power","Power"],["water","Water"],["safety","Safety"],["health","Health"],["education","Education"],["leisure","Leisure"],["transport","Transport"],["special","Special"],["terrain","Terrain"],["bulldoze","Bulldoze"]],EM=[["zone_res_low","Residential Low","zones",8,"zone"],["zone_res_med","Residential Med","zones",16,"zone"],["zone_res_high","Residential High","zones",24,"zone"],["zone_com_low","Commercial Low","zones",8,"zone"],["zone_com_high","Commercial High","zones",24,"zone"],["zone_ind_agri","Farmland","zones",8,"zone"],["zone_ind_light","Light Industry","zones",16,"zone"],["zone_ind_heavy","Heavy Industry","zones",24,"zone"],["road_street","Street","roads",12,"network"],["road_avenue","Avenue","roads",60,"network"],["road_highway","Highway","roads",220,"network"],["rail","Rail","roads",90,"network"],["wire","Power Line","power",6,"network"],["pipe","Water Pipe","water",10,"network"],["subway","Subway Tunnel","transport",150,"network"],["sign","City Sign","special",50,"network"],["tree","Plant Trees","terrain",12,"terrain"],["water_place","Place Water","terrain",120,"terrain"],["terrain_raise","Raise","terrain",25,"terrain"],["terrain_lower","Lower","terrain",25,"terrain"],["terrain_level","Level","terrain",25,"terrain"],["inspect","Inspect","terrain",0,"terrain"],["bulldoze","Bulldoze","bulldoze",4,"terrain"]].map(([i,t,e,n,s])=>({tool:i,name:t,category:e,cost:n,archetype:s,desc:`${t} tool.`}));class TM{constructor(t,e){L(this,"element");L(this,"active",null);L(this,"pressTimer",0);L(this,"offs",[]);L(this,"overlayBeforeTool",null);L(this,"builtFor",null);this.state=t,this.hint=e,this.element=document.createElement("div"),this.element.className="drawer",this.element.dataset.ui="",this.element.innerHTML='<div class="drawer-items"></div><div class="drawer-cats"></div><div class="tool-chip"><span class="ic"></span><span class="tool-name"></span><button class="x" aria-label="Cancel tool">×</button></div>';const n=this.q(".drawer-cats");SM.forEach(([s,r])=>{const o=document.createElement("button");o.className="d-cat",o.dataset.cat=s,o.innerHTML=`<span class="ic">${Jl(RM(s))}</span><span>${r}</span>`,o.onclick=()=>this.chooseCategory(s),n.append(o)}),this.q(".tool-chip .x").onclick=()=>this.select("inspect","Inspect"),this.offs.push(Lt.on("budget:updated",()=>this.refreshItems()),Lt.on("stats:updated",()=>this.refreshItems()),Lt.on("milestone",()=>this.refreshItems()))}update(){this.updateChip()}dispose(){clearTimeout(this.pressTimer),this.offs.forEach(t=>t()),this.element.remove()}chooseCategory(t){if(t==="bulldoze"){this.select("bulldoze","Bulldoze");return}this.showCategoryHint(t),this.active=this.active===t?null:t,this.element.classList.toggle("expanded",!!this.active),this.element.querySelectorAll(".d-cat").forEach(e=>e.classList.toggle("on",e.dataset.cat===this.active)),this.refreshItems()}allItems(){const t=Y0.map(e=>({tool:`build_${e.key}`,name:e.name,cost:e.cost,category:e.category,desc:e.desc??`${e.name}, ${e.w}×${e.h} tiles.`,archetype:e.archetype,unlockPop:e.unlockPop,key:e.key}));return[...EM,...t]}refreshItems(){const t=this.q(".drawer-items");if(!this.active){t.innerHTML="",this.builtFor=null;return}const e=this.state(),n=this.allItems().filter(o=>o.category===this.active),s=this.active+"|"+n.map(o=>this.isUnlocked(o,e)?1:0).join("");this.builtFor!==s&&(this.builtFor=s,t.innerHTML="",n.forEach(o=>{const a=document.createElement("button");a.className="d-item",a.dataset.tool=o.tool,a.innerHTML=`<span class="ic">${Jl(o.archetype)}</span><span class="nm"></span><span class="cost">${o.cost?`§${o.cost.toLocaleString()}`:"Free"}</span><span class="d-lock" hidden>${o.unlockPop?.toLocaleString()??"Reward"}</span>`,a.querySelector(".nm").textContent=o.name,a.onclick=()=>{a.classList.contains("poor")?Lt.emit("money:denied",{reason:"Not enough funds"}):a.classList.contains("locked")||this.select(o.tool,o.name)};const l=c=>{this.pressTimer=window.setTimeout(()=>this.describe(o,a),520),a.setPointerCapture?.(c.pointerId)};a.addEventListener("pointerdown",l),["pointerup","pointercancel","pointermove"].forEach(c=>a.addEventListener(c,()=>clearTimeout(this.pressTimer))),t.append(a)}));const r=new Map(n.map(o=>[o.tool,o]));t.querySelectorAll(".d-item").forEach(o=>{const a=r.get(o.dataset.tool);if(!a)return;const l=!this.isUnlocked(a,e),c=e.difficulty!=="sandbox"&&a.cost>e.budget.funds;o.classList.toggle("locked",l),o.classList.toggle("poor",c),o.classList.toggle("sel",e.tool===a.tool),o.disabled=l,o.querySelector(".d-lock").hidden=!l})}isUnlocked(t,e){return e.difficulty==="sandbox"||!t.unlockPop?!t.key||!t.key.startsWith("x_")||t.cost>0||e.unlocked.has(t.key):e.stats.population>=t.unlockPop||!!t.key&&e.unlocked.has(t.key)}describe(t,e){this.element.parentElement?.querySelector(".d-desc")?.remove();const n=document.createElement("div");n.className="d-desc",n.innerHTML='<b></b><div class="sub"></div>',n.querySelector("b").textContent=t.name,n.querySelector(".sub").textContent=t.desc;const s=e.getBoundingClientRect();n.style.left=`${Math.max(8,Math.min(innerWidth-258,s.left))}px`,n.style.bottom=`${innerHeight-s.top+8}px`,this.element.parentElement?.append(n),setTimeout(()=>n.remove(),2800)}select(t,e){const n=this.state();if(t==="inspect")this.overlayBeforeTool!==null&&(n.overlay=this.overlayBeforeTool,Lt.emit("overlay:changed",{overlay:n.overlay}),this.overlayBeforeTool=null);else{const s=this.overlayForTool(t);s&&s!==n.overlay&&(this.overlayBeforeTool===null&&(this.overlayBeforeTool=n.overlay),n.overlay=s,Lt.emit("overlay:changed",{overlay:s}))}n.tool=t,Lt.emit("tool:changed",{tool:t}),this.active=null,this.element.classList.remove("expanded"),this.updateChip(e)}overlayForTool(t){return t.startsWith("zone_")?"zones":t==="pipe"||t==="subway"?"underground":t==="wire"||t.startsWith("build_p_")?"power":t.startsWith("build_w_")?"water":null}showCategoryHint(t){const n={zones:"Paint next to a road — homes need road, power and water to grow.",roads:"Drag roads to connect districts; avenues and highways carry more traffic.",power:"Generate power, then carry it with roads or power lines.",water:"Pumps need shoreline; pipes and roads water tiles within four spaces.",transport:"Rail moves above ground; subway tunnels are easiest to read underground.",terrain:"Shape land carefully — steep ground can block large buildings."}[t];if(!n)return;const s=`sethcity:hint:${t}`;try{if(localStorage.getItem(s))return;localStorage.setItem(s,"shown")}catch{}this.hint(n)}updateChip(t){const e=this.state().tool;this.q(".tool-chip").classList.toggle("show",e!=="inspect");const s=this.allItems().find(r=>r.tool===e);this.q(".tool-name").textContent=t??s?.name??AM(e),this.q(".tool-chip .ic").innerHTML=Jl(s?.archetype??"terrain")}q(t){return this.element.querySelector(t)}}function AM(i){return i.startsWith("build_")?CM(i.slice(6)):i.startsWith("zone_")?Jc(i.slice(5)):Jc(i)}function CM(i){return Ps.find(t=>t.key===i)?.name??Jc(i)}function Jc(i){return i.split("_").filter(Boolean).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")||"Inspect"}function RM(i){return i==="roads"?"network":i==="zones"?"zone":i==="terrain"||i==="bulldoze"?"terrain":Ps.find(t=>t.category===i)?.archetype??"landmark"}function Jl(i){const t={zone:'<path d="M3 20V8l9-5 9 5v12M8 20v-7h8v7"/>',network:'<path d="M4 21 10 3h4l6 18M8 14h8M7 18h10"/>',powerplant:'<path d="M4 20V9h6v11M14 20V4h6v16M13 9l-3 4h4l-3 5"/>',watertower:'<path d="M7 4h10l2 5-2 4H7L5 9l2-5ZM9 13 7 21M15 13l2 8M8 18h8"/>',hospital:'<path d="M5 21V5h14v16M9 10h6M12 7v6M8 21v-5h8v5"/>',school:'<path d="m3 9 9-5 9 5-9 5-9-5Zm3 3v5c4 3 8 3 12 0v-5"/>',park:'<path d="M12 3 7 11h3l-4 6h5v4h2v-4h5l-4-6h3l-5-8Z"/>',terrain:'<path d="m3 18 5-7 4 4 3-5 6 8H3Z"/>',landmark:'<path d="M5 21h14M7 21V9h10v12M9 9l3-6 3 6M10 14h4"/>',transit:'<path d="M6 4h12v13H6V4Zm2 4h8M9 17l-2 4M15 17l2 4"/>',airport:'<path d="m3 13 8-2V4l2-1 1 8 7 2v2l-7 1-1 5h-2v-5l-8-1v-2Z"/>',port:'<path d="M4 18h16M6 18V7h9l3 5M8 7V4h7M3 20c3 2 6-2 9 0s6-2 9 0"/>',house:'<path d="m3 11 9-7 9 7M5 10v10h14V10M10 20v-6h4v6"/>',default:'<rect x="5" y="5" width="14" height="15"/><path d="M8 9h2M14 9h2M8 13h2M14 13h2"/>'};return`<svg viewBox="0 0 24 24" aria-hidden="true">${t[i]??t.default}</svg>`}function PM(i,t,e){const n=Math.min(devicePixelRatio||1,2),s=i.getBoundingClientRect(),r=Math.max(220,s.width||320),o=Math.max(100,s.height||120);i.width=Math.round(r*n),i.height=Math.round(o*n);const a=i.getContext("2d");if(!a)return;a.scale(n,n),a.clearRect(0,0,r,o);const l=t.length?t.slice(-72):[0];let c=Math.min(...l,0),h=Math.max(...l,1);h===c&&(h=c+1);const u={l:38,r:12,t:24,b:17},d=r-u.l-u.r,f=o-u.t-u.b;a.font="10px system-ui",a.fillStyle="#93a0b0",a.fillText(e.label,10,15),a.strokeStyle="rgba(255,255,255,.08)",a.fillStyle="#718090";for(let T=0;T<=2;T++){const y=u.t+f*T/2;a.beginPath(),a.moveTo(u.l,y),a.lineTo(r-u.r,y),a.stroke();const w=h-(h-c)*T/2;a.fillText(Gd(w,e),3,y+3)}const g=T=>u.l+(l.length===1?d:d*T/(l.length-1)),v=T=>u.t+f-(T-c)/(h-c)*f,m=e.color??"#3ddbd9";a.beginPath(),l.forEach((T,y)=>y?a.lineTo(g(y),v(T)):a.moveTo(g(y),v(T)));const p=a.createLinearGradient(0,u.t,0,o-u.b);p.addColorStop(0,`${m}55`),p.addColorStop(1,`${m}00`),a.lineTo(g(l.length-1),o-u.b),a.lineTo(u.l,o-u.b),a.closePath(),a.fillStyle=p,a.fill(),a.beginPath(),l.forEach((T,y)=>y?a.lineTo(g(y),v(T)):a.moveTo(g(y),v(T))),a.strokeStyle=m,a.lineWidth=2,a.lineJoin="round",a.stroke();const M=l[l.length-1],_=Gd(M,e);a.font="bold 10px system-ui";const x=a.measureText(_).width+10;a.fillStyle=m,a.fillRect(r-u.r-x,5,x,17),a.fillStyle="#071716",a.fillText(_,r-u.r-x+5,17)}function Gd(i,t){if(t.percent)return`${Math.round(i*100)}%`;const e=Math.abs(i),n=e>=1e6?`${(i/1e6).toFixed(1)}m`:e>=1e3?`${(i/1e3).toFixed(1)}k`:Math.round(i).toString();return t.money?`§${n}`:n}const LM=["fire","earthquake","tornado","flood","meteor","blackout","riot","volcano","monster","aircrash","meltdown","hurricane","chemical"],IM=["none","zones","power","water","pollution","noise","crime","landvalue","traffic","transit","density","health","education","fire","desirability","underground"];class DM{constructor(t,e,n){L(this,"element");L(this,"current",null);L(this,"inspector",null);L(this,"paperIndex",0);L(this,"lastRefresh",0);L(this,"startY",0);this.host=t,this.toast=e,this.openMenu=n,this.element=document.createElement("div"),this.element.className="panels-layer",this.element.innerHTML='<div class="panel-picker popover" data-ui hidden></div><div class="overlay-picker popover" data-ui hidden></div><section class="sheet" data-ui><header class="sheet-head"><div class="sheet-title"></div><button class="sheet-close" aria-label="Close">×</button></header><div class="sheet-body"></div></section>',this.q(".sheet-close").onclick=()=>this.close();const s=this.q(".sheet-head");s.addEventListener("pointerdown",o=>{this.startY=o.clientY}),s.addEventListener("pointerup",o=>{o.clientY-this.startY>70&&this.close()});const r=this.q(".panel-picker");[["budget","Budget"],["statistics","Statistics"],["city","City"],["advisors","Advisors"],["newspaper","Newspaper"],["manual","Help / Manual"],["settings","Settings"]].forEach(([o,a])=>{const l=document.createElement("button");l.className="pop-item",l.textContent=a,l.onclick=()=>this.open(o),r.append(l)})}showPicker(){const t=this.q(".panel-picker");t.hidden=!t.hidden,this.q(".overlay-picker").hidden=!0}showOverlays(t){const e=this.q(".overlay-picker");e.hidden=!e.hidden,this.q(".panel-picker").hidden=!0,e.childElementCount===0&&IM.forEach(s=>{const r=document.createElement("button");r.className="pop-item",r.textContent=s==="none"?"No overlay":$i(s),r.onclick=()=>{this.host.state.overlay=s,Lt.emit("overlay:changed",{overlay:s}),e.hidden=!0},e.append(r)});const n=t.getBoundingClientRect();e.style.right=`${Math.max(8,innerWidth-n.right)}px`,e.style.top=`${n.bottom+6}px`}open(t){this.current=t,this.q(".panel-picker").hidden=!0,this.q(".overlay-picker").hidden=!0,this.q(".sheet").classList.add("open"),this.render()}close(){this.current=null,this.q(".sheet").classList.remove("open")}showInspector(t){if(this.inspector=t,t===null){this.current==="inspector"&&this.close();return}this.open("inspector")}update(t){this.current&&t-this.lastRefresh>.5&&(this.lastRefresh=t,this.refreshValues())}dispose(){this.element.remove()}render(){if(!this.current)return;const t={budget:"Budget",statistics:"Statistics",city:"City",advisors:"Advisors",newspaper:"Llama Ledger",settings:"Settings",manual:"Instruction Manual",inspector:"Tile Inspector"};this.q(".sheet-title").textContent=t[this.current];const e=this.q(".sheet-body");switch(e.innerHTML="",this.current){case"budget":this.budget(e);break;case"statistics":this.statistics(e);break;case"city":this.city(e);break;case"advisors":this.advisors(e);break;case"newspaper":this.newspaper(e);break;case"settings":this.settings(e);break;case"manual":this.manual(e);break;case"inspector":this.tile(e)}}refreshValues(){const t=this.q(".sheet-body");if(this.current==="budget"){const e=[this.host.state.budget.ledger.incomeRes,this.host.state.budget.ledger.incomeCom,this.host.state.budget.ledger.incomeInd,this.host.state.budget.ledger.incomeOther,-this.host.state.budget.ledger.costRoads,-this.host.state.budget.ledger.costPolice,-this.host.state.budget.ledger.costFire,-this.host.state.budget.ledger.costHealth,-this.host.state.budget.ledger.costEducation,-this.host.state.budget.ledger.costParks,-this.host.state.budget.ledger.costPower,-this.host.state.budget.ledger.costWater,-this.host.state.budget.ledger.costLoans,this.host.state.budget.ledger.net];t.querySelectorAll("[data-ledger]").forEach((n,s)=>n.textContent=no(e[s]??0))}if(this.current==="statistics"){const e=this.host.state.stats,n=[e.population.toLocaleString(),e.jobs.toLocaleString(),ji(e.approval),ji(e.health),ji(e.educationLevel),ji(e.safety),String(Math.round(e.landValueAvg)),e.homeless.toLocaleString()];t.querySelectorAll(".tile .v").forEach((s,r)=>s.textContent=n[r]??"")}if(this.current==="city"&&this.host.state.milestones.forEach((e,n)=>{const s=t.querySelectorAll(".mile .bar i")[n];s&&(s.style.width=`${Math.min(100,this.host.state.stats.population/e.pop*100)}%`)}),this.current==="inspector"&&this.inspector!==null){const e=this.host.state.grid,n=this.inspector,s=[e.landValue[n],e.pollution[n],e.crime[n],e.traffic[n],e.powered[n]?"Connected":"No",e.watered[n]?"Connected":"No"];t.querySelectorAll(".insp-kv .v").forEach((r,o)=>{o>0&&(r.textContent=String(s[o-1]??r.textContent))})}}budget(t){const e=this.host.state,n=e.budget,s=n.ledger;t.innerHTML=`<div class="sec">Monthly ledger</div><table class="ledger">${[["Residential tax",s.incomeRes],["Commercial tax",s.incomeCom],["Industrial tax",s.incomeInd],["Other income",s.incomeOther],["Roads",-s.costRoads],["Police",-s.costPolice],["Fire",-s.costFire],["Health",-s.costHealth],["Education",-s.costEducation],["Parks",-s.costParks],["Power",-s.costPower],["Water",-s.costWater],["Loans",-s.costLoans]].map(([o,a])=>`<tr><td>${o}</td><td>${no(a)}</td></tr>`).join("")}<tr class="net"><td>Net</td><td>${no(s.net)}</td></tr></table><div class="sec">Tax rates</div>`,[["Residential","taxRes"],["Commercial","taxCom"],["Industrial","taxInd"]].forEach(([o,a])=>t.append(this.slider(o,n[a]*100,0,20,1,l=>n[a]=l/100,"%"))),t.insertAdjacentHTML("beforeend",'<div class="sec">Service funding</div>'),[["Roads","fundRoads"],["Police","fundPolice"],["Fire","fundFire"],["Health","fundHealth"],["Education","fundEducation"],["Parks","fundParks"]].forEach(([o,a])=>t.append(this.slider(o,n[a]*100,0,150,5,l=>n[a]=l/100,"%"))),t.querySelectorAll("table.ledger td:last-child").forEach(o=>o.dataset.ledger=""),t.insertAdjacentHTML("beforeend",'<div class="sec">Bonds</div>');const r=document.createElement("div");r.className="row",r.innerHTML='<div class="grow"><div class="lbl">Municipal bond</div><div class="sub">§10,000 over 120 months</div></div><button class="btn sm">Take bond</button>',r.querySelector("button").onclick=()=>void oo(()=>Promise.resolve().then(()=>np),void 0,import.meta.url).then(o=>{o.takeLoan(e,1e4,120)?(this.toast.toast("Bond issued","good"),this.open("budget")):this.toast.toast("Bond request denied","bad")}).catch(()=>this.toast.toast("Economy service unavailable","bad")),t.append(r),n.loans.forEach((o,a)=>{const l=document.createElement("div");l.className="row",l.innerHTML=`<div class="grow"><div class="lbl">§${o.remaining.toLocaleString()} remaining</div><div class="sub">${o.monthsLeft} months · §${o.monthly}/mo</div></div><button class="btn sm">Repay</button>`,l.querySelector("button").addEventListener("click",()=>{n.funds>=o.remaining?(n.funds-=o.remaining,n.loans.splice(a,1),l.remove(),this.toast.toast("Bond repaid","good")):this.toast.toast("Not enough funds","bad")}),t.append(l)}),t.insertAdjacentHTML("beforeend",'<div class="sec">Neighbour deals</div>'),e.deals.forEach(o=>{const a=o.amount*o.pricePerUnit*(o.kind.startsWith("sell")||o.kind==="take_garbage"?1:-1),l=document.createElement("div");l.className="row",l.innerHTML=`<div class="grow"><div class="lbl">${$i(o.kind)} · ${o.neighbor}</div><div class="sub">${no(a)} / month</div></div><button class="tgl ${o.active?"on":""}" aria-label="Toggle deal"><i></i></button>`,l.querySelector("button").addEventListener("click",c=>{o.active=!o.active,c.currentTarget.classList.toggle("on",o.active),this.toast.toast(o.active?"Deal activated":"Deal cancelled","info")}),t.append(l)})}statistics(t){const e=this.host.state,n=e.stats;t.innerHTML=`<div class="tiles">${[["Population",n.population.toLocaleString()],["Jobs",n.jobs.toLocaleString()],["Approval",ji(n.approval)],["Health",ji(n.health)],["Education",ji(n.educationLevel)],["Safety",ji(n.safety)],["Land value",Math.round(n.landValueAvg)],["Homeless",n.homeless.toLocaleString()]].map(([r,o])=>`<div class="tile"><div class="k">${r}</div><div class="v">${o}</div></div>`).join("")}</div>`,[["population","Population","#4ad36e"],["funds","Funds","#3ddbd9",!1,!0],["approval","Approval","#f5b83d",!0],["pollution","Pollution","#b88b57",!0],["traffic","Traffic","#f0554a",!0],["unemployment","Unemployment","#9d84e8",!0]].forEach(([r,o,a,l,c])=>{const h=document.createElement("div");h.className="chart-block";const u=document.createElement("canvas");h.append(u),t.append(h),requestAnimationFrame(()=>PM(u,e.history[r],{label:o,color:a,percent:l,money:c}))})}city(t){const e=this.host.state;t.innerHTML='<div class="sec">Identity</div>',t.append(this.textField("City name",e.cityName,s=>e.cityName=s),this.textField("Mayor",e.mayorName,s=>e.mayorName=s)),t.insertAdjacentHTML("beforeend",'<div class="sec">Milestones</div>'),e.milestones.forEach(s=>{const r=Math.min(100,e.stats.population/s.pop*100);t.insertAdjacentHTML("beforeend",`<div class="mile ${s.reached?"done":""}"><div class="top"><span class="nm">${s.name}</span><span class="target">${s.pop.toLocaleString()}</span></div><div class="desc">${s.desc}</div><div class="bar"><i style="width:${r}%"></i></div></div>`)}),t.insertAdjacentHTML("beforeend",'<div class="sec">Ordinances</div>'),e.ordinances.forEach(s=>{const r=!!s.unlockPop&&e.stats.population<s.unlockPop,o=document.createElement("div");o.className="row",o.innerHTML=`<div class="grow"><div class="lbl">${s.name}</div><div class="sub">${s.desc} · ${no(-s.costPerCapita*e.stats.population)}/mo${r?` · unlock ${s.unlockPop.toLocaleString()}`:""}</div></div><button class="tgl ${s.active?"on":""}" ${r?"disabled":""}><i></i></button>`,o.querySelector("button").onclick=a=>{s.active=!s.active,a.currentTarget.classList.toggle("on",s.active),this.toast.toast(`${s.name} ${s.active?"enacted":"repealed"}`,"info")},t.append(o)}),t.insertAdjacentHTML("beforeend",'<div class="sec">Disasters</div>'),t.append(this.toggleRow("Random disasters",e.disastersEnabled,s=>e.disastersEnabled=s));const n=document.createElement("div");n.className="dis-grid",LM.forEach(s=>{const r=document.createElement("button");r.className="dis-btn",r.innerHTML=`<span class="ic">△</span>${$i(s)}`,r.onclick=()=>void oo(()=>Promise.resolve().then(()=>up),void 0,import.meta.url).then(o=>{const a=o.triggerDisaster(e,s);this.toast.toast(a?`${$i(s)} unleashed`:`${$i(s)} unavailable`,a?"warn":"bad")}).catch(()=>this.toast.toast("Disaster service unavailable","bad")),n.append(r)}),t.append(n)}async advisors(t){t.innerHTML='<div class="paper-empty">Consulting city hall…</div>';try{const{getAdvice:e}=await oo(async()=>{const{getAdvice:n}=await import("./advisors-fvNJFWRR.js");return{getAdvice:n}},[],import.meta.url);if(this.current!=="advisors")return;t.innerHTML="",e(this.host.state).forEach(n=>{const s=document.createElement("div");s.className=`adv m-${n.mood}`,s.innerHTML=`<div class="portrait">${n.advisor.slice(0,1).toUpperCase()}</div><div><div class="who"><b>${n.name}</b><span class="role">${n.advisor}</span><span class="mood-tag m-${n.mood}">${n.mood}</span></div><div class="say"></div></div>`,s.querySelector(".say").textContent=n.text,t.append(s)})}catch{t.innerHTML='<div class="paper-empty">Advisors are in transit.</div>'}}newspaper(t){const e=this.host.state.papers;if(!e.length){t.innerHTML='<div class="paper-empty">No editions have been printed yet.</div>';return}this.paperIndex=Math.min(this.paperIndex,e.length-1);const n=e[this.paperIndex];t.innerHTML=`<div class="paper-wrap"><article class="paper-sheet"><div class="paper-mast">${n.masthead||"The Llama Ledger"}</div><div class="paper-dateline"><span>SETHCITY 6769</span><span>${n.month+1}/${n.year}</span></div><h2 class="paper-headline">${n.headline}</h2>${n.articles.map(s=>`<section class="paper-article"><h4>${s.title}</h4><p>${s.body}</p></section>`).join("")}<div class="paper-classified"><b>Classified</b> — ${n.classified}</div></article><div class="paper-nav"><button class="btn sm prev">Newer</button><span class="ed">Edition ${this.paperIndex+1} of ${e.length}</span><button class="btn sm next">Older</button></div></div>`,t.querySelector(".prev").disabled=this.paperIndex===0,t.querySelector(".next").disabled=this.paperIndex===e.length-1,t.querySelector(".prev").addEventListener("click",()=>{this.paperIndex--,this.render()}),t.querySelector(".next").addEventListener("click",()=>{this.paperIndex++,this.render()})}async settings(t){const e=this.host.state;t.innerHTML='<div class="sec">Graphics</div>';const n=document.createElement("div");n.className="seg",["low","medium","high","auto"].forEach(o=>{const a=document.createElement("button");a.textContent=$i(o),a.onclick=()=>{n.querySelectorAll("button").forEach(l=>l.classList.toggle("on",l===a)),o==="auto"?(localStorage.removeItem("sethcity:quality"),this.toast.toast("Adaptive quality enabled","info")):(localStorage.setItem("sethcity:quality",o),this.host.setQuality(o),this.toast.toast(`${$i(o)} quality selected`,"info"))},n.append(a)}),t.append(n),t.insertAdjacentHTML("beforeend",'<div class="sec">Audio & simulation</div>'),t.append(this.toggleRow("Sound effects",localStorage.getItem("sethcity:sound")!=="off",o=>{localStorage.setItem("sethcity:sound",o?"on":"off"),this.toast.toast(`Sound effects ${o?"on":"off"}`,"info")}),this.toggleRow("Music",localStorage.getItem("sethcity:music")!=="off",o=>{localStorage.setItem("sethcity:music",o?"on":"off"),this.toast.toast(`Music ${o?"on":"off"}`,"info")}),this.toggleRow("Day / night cycle",localStorage.getItem("sethcity:daynight")==="on",o=>{localStorage.setItem("sethcity:daynight",o?"on":"off"),this.toast.toast(o?"Day / night cycle on":"Permanent daytime on","info")}),this.toggleRow("Disasters",e.disastersEnabled,o=>e.disastersEnabled=o));const s=document.createElement("button");s.className="btn full manual-open",s.textContent="Open Instruction Manual",s.onclick=()=>this.open("manual"),t.append(s),t.insertAdjacentHTML("beforeend",`<div class="sec">Save game</div><div class="row"><div class="grow"><div class="lbl">${e.cityName}</div><div class="sub">${$i(e.difficulty)} ${e.difficulty==="sandbox"?"· ∞ funds":""}</div></div><button class="btn save-now">Save now</button></div><div class="save-list"></div>`),t.querySelector(".save-now").addEventListener("click",()=>void this.host.save().then(()=>this.toast.toast("City saved","good")).catch(()=>this.toast.toast("Save failed","bad")));try{const o=await oo(()=>Promise.resolve().then(()=>o0),void 0,import.meta.url),a=await o.listSaves();if(this.current!=="settings"||!t.isConnected)return;const l=t.querySelector(".save-list");if(!l)return;a.forEach(c=>{const h=document.createElement("div");h.className="save-row",h.innerHTML=`<div class="meta"><b>${c.name}</b><div class="sub">Pop ${c.pop.toLocaleString()} · §${c.funds.toLocaleString()}</div></div><button class="btn sm load">Load</button><button class="btn sm danger del">Delete</button>`,h.querySelector(".load").addEventListener("click",()=>void this.host.load(c.slot).then(()=>this.toast.toast("City loaded","good")).catch(()=>this.toast.toast("Load failed","bad"))),h.querySelector(".del").addEventListener("click",()=>void o.deleteSave(c.slot).then(()=>{h.remove(),this.toast.toast("Save deleted","info")}).catch(()=>this.toast.toast("Delete failed","bad"))),l.append(h)})}catch{const o=t.querySelector(".save-list");o&&(o.textContent="Saved cities unavailable.")}const r=document.createElement("button");r.className="btn danger full",r.textContent="Reset / New City",r.onclick=()=>{this.close(),this.openMenu()},t.append(r),t.insertAdjacentHTML("beforeend",'<p class="about">SETHCITY 6769 · A miniature city beyond tomorrow.</p>')}manual(t){const e=[["Getting Started",["Pause while you plan. Your treasury does not earn interest.","Drag a street from open land to make the first spine of your city.","Paint residential zones within 3 tiles of that road.","Build a power source, then connect it with roads or power lines.","Place a shoreline pump or water tower.","Complete the loop with roads or pipes; watered tiles glow blue.","Unpause and watch demand. Buildings appear only when every basic need is met."]],["Zones & Growth",["Green is residential, blue is commercial, amber is industrial.","Road access means a connected road within 3 tiles.","Growth needs road access, power, water, enough land value, and positive demand.","Low-density zones start cheaply and tolerate modest land value.","Medium and high density need stronger land value and services.","Commercial wants customers, access, and manageable traffic.","Industry supplies jobs but creates pollution and noise.","Farms prefer clean, inexpensive land away from dense development.","Buildings level up after conditions stay healthy for a while.","Utility failure, weak demand, or poor access causes decay and abandonment.","Bulldoze abandoned buildings; they drag down nearby land value."]],["Power",["Power plants and renewables create supply.","Roads carry power, so compact blocks need fewer lines.","Power lines bridge gaps and reach remote facilities.","Buildings must touch the live conductor network.","The Power overlay shows connected areas and red shortages.","Demand above supply causes brown-outs, starting in lower-value areas.","Keep reserve capacity before adding dense zones.","Neighbour deals can buy supply or sell genuine surplus."]],["Water",["Pumps must sit at a shoreline and must themselves have power.","Water towers add local capacity away from the coast.","Treatment and desalination unlock stronger options later.","Roads contain water mains automatically.","Pipes are useful across roadless gaps and underground corridors.","A fed road or pipe waters tiles within a 4-tile Chebyshev reach.","Use Underground view to trace bright blue mains.","Broken power at a pump can dry out an entire district."]],["Transport & Traffic",["Streets are cheap; avenues carry much more traffic.","Highways carry the most traffic but cost heavily.","Rail connects major corridors without sharing road capacity.","Subway tunnels are drawn and inspected in Underground view.","Subway stations need connected tunnels to deliver their full benefit.","Transit coverage reduces car trips and congestion.","Use the Traffic overlay to find red bottlenecks.","Avoid forcing every district through one intersection."]],["Services & Coverage",["Police reduces crime; fire stations reduce fire risk.","Clinics and hospitals improve health.","Schools and universities raise education and long-term prosperity.","Parks improve land value and make nearby growth easier.","Transit buildings add coverage and reduce road pressure.","Coverage fades with distance and weak funding.","Service funding sliders change effective coverage.","Use matching overlays to see gaps before complaints become crises."]],["Budget, Taxes, Bonds & Deals",["Residential, commercial, and industrial taxes can be set separately.","High taxes raise cash but suppress demand.","Funding below 100% weakens the service it pays for.","The monthly ledger shows every recurring income and cost.","Bonds provide immediate cash and create monthly repayments.","Repay a bond early only when the treasury covers its balance.","Neighbour deals trade utilities or garbage capacity for monthly cash.","Check the sign of every deal: green income and red expense.","Sandbox ignores spending and unlocks everything."]],["Ordinances",["Ordinances live in the City panel.","Each toggle has a continuing per-capita cost.","Recycling and clean-air rules reduce environmental damage.","Safety ordinances can reduce fire and crime risks.","Some ordinances unlock only after population milestones.","Legalised gambling brings trade-offs; watch city indicators.","Toggle ordinances deliberately, then inspect the next monthly ledger."]],["Overlays & Underground",["Zones — zoning colours and empty painted lots.","Power — live supply coverage and unpowered red areas.","Water — watered coverage and dry gaps.","Pollution — clean green through dirty brown.","Noise — quiet clear through loud purple.","Crime — transparent safety through red hotspots.","Land Value — blue low, green healthy, gold premium.","Traffic — green flow, amber pressure, red congestion.","Transit — cyan public-transport coverage.","Density — where development is concentrated.","Health — relative public-health conditions.","Education — access and educational strength.","Fire — fire-service coverage and risk.","Desirability — combined appeal for development.","Underground — dark view with blue pipes and orange subway tunnels.","No overlay — restores the normal city view."]],["Disasters",["Random disasters can be disabled in Settings or the City panel.","Manual disaster buttons always work when their prerequisites exist.","Fire spreads faster where risk is high and coverage is weak.","Floods and hurricanes punish exposed shorelines.","Blackouts expose cities with no reserve power.","Riots favour high-crime, low-safety areas.","Air crashes require an airport; meltdowns require a nuclear plant.","Pause after impact, inspect damage, then restore roads and utilities first."]],["Milestones & Rewards",["Population milestones appear in the City panel.","Each bar shows progress toward its target.","Reached milestones can grant cash and special reward buildings.","Reward buildings appear in the Special drawer.","Some rewards are free but still need suitable land and access.","A milestone announcement also appears in city news."]],["Seven Useful Tips",["Build compactly: roads carry both power and water.","Leave room to upgrade streets into wider corridors.","Keep dirty industry downwind and away from valuable homes.","Maintain spare power and water before painting high density.","Use overlays early; complaints arrive after the underlying problem.","Raise taxes gently, one category at a time, and watch demand.","Save before experimenting with bonds, deals, or disasters."]]],n=document.createElement("article");n.className="manual";const s=document.createElement("p");s.className="manual-intro",s.textContent="Build the loop, read the overlays, and grow at the pace your utilities can support.",n.append(s),e.forEach(([r,o])=>{const a=document.createElement("section"),l=document.createElement("h3");l.textContent=r;const c=document.createElement("ul");o.forEach(h=>{const u=document.createElement("li");u.textContent=h,c.append(u)}),a.append(l,c),n.append(a)}),t.append(n)}tile(t){if(this.inspector===null)return;const e=this.host.state,n=e.grid,s=this.inspector,r=n.originOf(s%C,Math.floor(s/C)),o=r>=0?r:s,a=pe(n.building[o]),l=["None","Residential Low","Residential Medium","Residential High","Commercial Low","Commercial High","Farmland","Light Industry","Heavy Industry"][n.zone[s]]??"None";t.innerHTML=`<div class="insp-title"><div><div class="big">${n.building[o]?a.name:l==="None"?"Empty land":l}</div><div class="sub">Tile ${s%C}, ${Math.floor(s/C)} · Level ${n.level[o]||0} · Condition ${n.condition[o]}%</div></div></div><div class="insp-grid">${[["Zone",l],["Land value",n.landValue[s]],["Pollution",n.pollution[s]],["Crime",n.crime[s]],["Traffic",n.traffic[s]],["Power",n.powered[s]?"Connected":"No"],["Water",n.watered[s]?"Connected":"No"]].map(([c,h])=>`<div class="insp-kv"><span class="k">${c}</span><span class="v">${h}</span></div>`).join("")}</div><button class="btn danger full bulldoze">Bulldoze</button>`,t.querySelector(".bulldoze").addEventListener("click",()=>{const c=s%C,h=Math.floor(s/C),u=this.host.actions.applyTool("bulldoze",c,h,c,h,!1);this.toast.toast(u.ok?"Bulldozed":u.reason??"Cannot bulldoze",u.ok?"good":"bad"),u.ok&&this.close()})}slider(t,e,n,s,r,o,a){const l=document.createElement("label");l.className="range-row",l.innerHTML=`<span>${t}</span><input type="range" min="${n}" max="${s}" step="${r}" value="${e}"><output>${Math.round(e)}${a}</output>`;const c=l.querySelector("input");return c.oninput=()=>{const h=Number(c.value);l.querySelector("output").textContent=`${h}${a}`,o(h)},l}toggleRow(t,e,n){const s=document.createElement("div");return s.className="row",s.innerHTML=`<div class="grow"><div class="lbl">${t}</div></div><button class="tgl ${e?"on":""}"><i></i></button>`,s.querySelector("button").onclick=r=>{e=!e,r.currentTarget.classList.toggle("on",e),n(e)},s}textField(t,e,n){const s=document.createElement("label");s.className="field",s.innerHTML=`<span>${t}</span><input class="tin" maxlength="32">`;const r=s.querySelector("input");return r.value=e,r.onchange=()=>n(r.value.trim()||e),s}q(t){return this.element.querySelector(t)}}const $i=i=>i.replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase()),ji=i=>`${Math.round(i*100)}%`,no=i=>`${i<0?"−":"+"}§${Math.abs(Math.round(i)).toLocaleString()}`;class UM{constructor(t){L(this,"stack");L(this,"offs");this.root=t,this.stack=document.createElement("div"),this.stack.className="toasts",this.stack.dataset.ui="",t.append(this.stack),this.offs=[Lt.on("money:spent",e=>this.money(e.amount,e.x,e.y)),Lt.on("money:denied",({reason:e})=>this.toast(e||"Not enough funds","bad")),Lt.on("game:saved",()=>this.toast("City saved","good")),Lt.on("milestone",e=>this.toast(`${e.name} reached — §${e.reward.toLocaleString()}`,"good"))]}toast(t,e="info"){const n=document.createElement("div");n.className=`toast k-${e}`;const s={info:"i",good:"✓",warn:"!",bad:"×"};n.innerHTML=`<span class="ic">${s[e]}</span><span></span>`,n.lastElementChild.textContent=t,this.stack.append(n);const r=()=>{n.classList.add("leaving"),setTimeout(()=>n.remove(),260)};n.addEventListener("click",r,{once:!0}),setTimeout(r,3e3)}money(t,e,n){const s=document.createElement("div");s.className=`money-float ${t>0?"gain":"loss"}`,s.style.left=`${e}px`,s.style.top=`${n}px`,s.textContent=`${t>0?"+":"−"}§${Math.abs(t).toLocaleString()}`,this.root.append(s),setTimeout(()=>s.remove(),1200)}dispose(){this.offs.forEach(t=>t()),this.stack.remove()}}const lr=[["Build a road","Open Roads and place a street."],["Zone homes","Choose a residential zone and paint beside the road."],["Power up","Place any power plant."],["Make the connection","Connect power with roads or power lines."],["Create jobs","Zone a commercial area near your homes."],["Watch the city grow","Wait for the first building to rise."],["Let time flow","Unpause or increase the simulation speed."]];class NM{constructor(t,e){L(this,"card");L(this,"offs",[]);L(this,"step",0);L(this,"finished",!1);if(this.state=e,this.card=document.createElement("aside"),this.card.className="coach-card",this.card.dataset.ui="",this.card.innerHTML='<div class="step-no"></div><h4></h4><p></p><div class="coach-foot"><div class="coach-dots"></div><button class="coach-skip">Skip tutorial</button></div>',t.append(this.card),this.card.querySelector("button").onclick=()=>this.finish(),localStorage.getItem("sethcity:tutorial")==="done"){this.card.hidden=!0,this.step=lr.length,this.finished=!0;return}this.render(),this.offs.push(Lt.on("tool:changed",({tool:n})=>{this.step===0&&n.startsWith("road_")?this.next():this.step===1&&n.startsWith("zone_res")?this.next():this.step===2&&n.startsWith("build_p_")?this.next():this.step===3&&(n==="wire"||n.startsWith("road_"))?this.next():this.step===4&&n.startsWith("zone_com")&&this.next(),this.reconcile()}),Lt.on("tile:changed",()=>this.reconcile()),Lt.on("speed:changed",({speed:n})=>{this.step===6&&n>0&&this.finish()})),this.reconcile()}dispose(){this.offs.forEach(t=>t()),this.card.remove()}next(){this.finished||(this.step++,this.state().tutorialStep=this.step,this.step>=lr.length?this.finish():this.render())}reconcile(){if(this.finished)return;const t=this.state(),e=t.grid;let n=!0;for(;n&&!this.finished;)n=!1,this.step===0&&e.road.some(s=>s>0)?(this.next(),n=!0):this.step===1&&e.zone.some(s=>s>=1&&s<=3)?(this.next(),n=!0):this.step===2&&e.building.some(s=>s>0&&pe(s).category==="power")?(this.next(),n=!0):this.step===3&&(e.wire.some(s=>s>0)||e.powered.some(s=>s>0))?(this.next(),n=!0):this.step===4&&e.zone.some(s=>s===4||s===5)?(this.next(),n=!0):this.step===5&&e.building.some(s=>s>0&&pe(s).grown)?(this.next(),n=!0):this.step===6&&t.speed>0&&this.finish()}render(){if(this.finished)return;const t=lr[this.step];this.card.hidden=!1,this.card.querySelector(".step-no").textContent=`Tutorial ${this.step+1} / ${lr.length}`,this.card.querySelector("h4").textContent=t[0],this.card.querySelector("p").textContent=t[1],this.card.style.bottom=this.step<5?"calc(var(--sab) + 132px)":"calc(var(--sab) + 88px)";const e=this.card.querySelector(".coach-dots");e.innerHTML=lr.map((n,s)=>`<i class="${s<this.step?"done":s===this.step?"on":""}"></i>`).join("")}finish(){this.finished||(this.finished=!0,localStorage.setItem("sethcity:tutorial","done"),this.state().tutorialStep=lr.length,this.card.hidden=!0)}}class FM{constructor(t,e){L(this,"hud");L(this,"palette");L(this,"panels");L(this,"toasts");L(this,"tutorial");L(this,"menu");L(this,"offs",[]);L(this,"elapsed",0);this.root=t,this.host=e,t.replaceChildren(),this.toasts=new UM(t),this.panels=new DM(e,this.toasts,()=>this.showMenu()),t.append(this.panels.element),this.hud=new bM(()=>e.state,{menu:()=>this.showMenu(),panels:()=>this.panels.showPicker(),overlays:n=>this.panels.showOverlays(n)}),this.hud.mount(t),this.palette=new TM(()=>e.state,n=>this.toasts.toast(n,"info")),this.hud.drawerMount().append(this.palette.element),this.tutorial=new NM(t,()=>e.state),this.menu=document.createElement("div"),this.menu.className="menu show",this.menu.dataset.ui="",t.append(this.menu),this.renderMenuHome(),this.offs.push(Lt.on("overlay:changed",({overlay:n})=>this.hud.setOverlay(n)),Lt.on("paper",()=>this.toasts.toast("A new Llama Ledger is out","info")),Lt.on("game:loaded",()=>{this.panels.close(),this.palette.update()})),this.probeAutosave()}update(t){this.elapsed+=t,this.hud.update(t),this.palette.update(),this.panels.update(this.elapsed)}hitTest(t,e){const n=document.elementFromPoint(t,e);return!!n&&this.root.contains(n)&&!!n.closest("[data-ui]")}showTileInspector(t){this.panels.showInspector(t)}promptSignText(){return new Promise(t=>{const e=document.createElement("div");e.className="modal-back",e.dataset.ui="",e.innerHTML='<form class="modal"><h3>Place a city sign</h3><input class="tin" maxlength="24" autocomplete="off" placeholder="Sign text"><div class="acts"><button type="button" class="btn cancel">Cancel</button><button class="btn primary">OK</button></div></form>',this.root.append(e);const n=e.querySelector("input");let s=!1;const r=a=>{a.key==="Escape"&&(a.preventDefault(),o(null))},o=a=>{s||(s=!0,document.removeEventListener("keydown",r),e.remove(),t(a))};document.addEventListener("keydown",r),e.querySelector(".cancel").addEventListener("click",()=>o(null)),e.querySelector("form").addEventListener("submit",a=>{a.preventDefault();const l=n.value.trim();o(l||null)}),requestAnimationFrame(()=>n.focus())})}dispose(){this.offs.forEach(t=>t()),this.hud.dispose(),this.palette.dispose(),this.panels.dispose(),this.toasts.dispose(),this.tutorial.dispose(),this.menu.remove()}showMenu(){this.menu.classList.add("show"),this.renderMenuHome()}renderMenuHome(t=this.menu.dataset.auto==="yes"){this.menu.innerHTML=`<div class="menu-scroll"><div class="menu-inner"><div class="menu-logo">SETHCITY <span class="boot-num">6769</span></div><div class="menu-tag">Build tomorrow. Govern forever.</div><button class="menu-btn primary new"><span class="ic">＋</span>New City</button>${t?'<button class="menu-btn continue"><span class="ic">▶</span>Continue</button>':""}<button class="menu-btn load"><span class="ic">▤</span>Load City</button><button class="menu-btn manual"><span class="ic">?</span>Instruction Manual</button><button class="menu-btn settings"><span class="ic">⚙</span>Settings</button><button class="menu-ghost resume">Return to city</button></div></div>`,this.menu.querySelector(".new").addEventListener("click",()=>this.renderNewGame()),this.menu.querySelector(".continue")?.addEventListener("click",()=>void this.host.load("auto").then(()=>this.menu.classList.remove("show"))),this.menu.querySelector(".load").addEventListener("click",()=>{this.menu.classList.remove("show"),this.panels.open("settings")}),this.menu.querySelector(".manual").addEventListener("click",()=>{this.menu.classList.remove("show"),this.panels.open("manual")}),this.menu.querySelector(".settings").addEventListener("click",()=>{this.menu.classList.remove("show"),this.panels.open("settings")}),this.menu.querySelector(".resume").addEventListener("click",()=>this.menu.classList.remove("show"))}renderNewGame(){const t=Math.random()*1e9|0;this.menu.innerHTML=`<div class="menu-scroll"><form class="menu-inner new-form"><button type="button" class="menu-back">‹ Main menu</button><div class="menu-h">Found a new city</div><label class="field"><span>City name</span><input class="tin" name="name" value="SethCity"></label><label class="field"><span>Mayor name</span><input class="tin" name="mayor" value="Mayor Seth"></label><div class="field"><span>Map shape</span><div class="shape-row">${["coastal","river","lakes","plains","valley","islands"].map((a,l)=>`<button type="button" class="shape-chip ${l===0?"on":""}" data-shape="${a}">${Vd(a)}</button>`).join("")}</div></div><div class="map-thumb-wrap"><canvas class="map-thumb" width="112" height="112"></canvas><div class="grow"><label class="range-row"><span>Water</span><input name="water" type="range" min="0" max="100" value="30"><output>30%</output></label><label class="range-row"><span>Hills</span><input name="hills" type="range" min="0" max="100" value="45"><output>45%</output></label><label class="range-row"><span>Trees</span><input name="trees" type="range" min="0" max="100" value="50"><output>50%</output></label></div></div><label class="field"><span>Seed</span><div class="seed-row"><input class="tin seed" type="number" value="${t}"><button type="button" class="btn random">Randomize</button></div></label><div class="field"><span>Difficulty</span><div class="seg">${["easy","normal","hard","sandbox"].map((a,l)=>`<button type="button" data-diff="${a}" class="${l===1?"on":""}">${Vd(a)}${a==="sandbox"?" ∞ funds":""}</button>`).join("")}</div></div><div class="row"><div class="grow"><div class="lbl">Random disasters</div></div><button type="button" class="tgl on disasters"><i></i></button></div><button class="btn primary full">Create SETHCITY 6769</button></form></div>`;const e=this.menu.querySelector("form");let n="coastal",s="normal",r=!0;const o=()=>this.drawMap(e.querySelector("canvas"),n,Number(e.elements.namedItem("water").value)/100,Number(e.elements.namedItem("hills").value)/100,Number(e.querySelector(".seed").value));e.querySelector(".menu-back").addEventListener("click",()=>this.renderMenuHome()),e.querySelectorAll(".shape-chip").forEach(a=>a.addEventListener("click",()=>{n=a.dataset.shape,e.querySelectorAll(".shape-chip").forEach(l=>l.classList.toggle("on",l===a)),o()})),e.querySelectorAll("[data-diff]").forEach(a=>a.addEventListener("click",()=>{s=a.dataset.diff,e.querySelectorAll("[data-diff]").forEach(l=>l.classList.toggle("on",l===a))})),e.querySelector(".disasters").addEventListener("click",a=>{r=!r,a.currentTarget.classList.toggle("on",r)}),e.querySelector(".random").addEventListener("click",()=>{e.querySelector(".seed").value=String(Math.random()*1e9|0),o()}),e.querySelectorAll("input[type=range],.seed").forEach(a=>a.addEventListener("input",()=>{const l=a.parentElement?.querySelector("output");l&&(l.textContent=`${a.value}%`),o()})),e.addEventListener("submit",a=>{a.preventDefault();const l=c=>e.elements.namedItem(c);this.host.newGame({name:l("name").value.trim()||"SethCity",mayor:l("mayor").value.trim()||"Mayor Seth",shape:n,water:Number(l("water").value)/100,hills:Number(l("hills").value)/100,trees:Number(l("trees").value)/100,seed:Number(e.querySelector(".seed").value)|0,difficulty:s,disasters:r}),this.menu.classList.remove("show")}),o()}drawMap(t,e,n,s,r){const o=t.getContext("2d");if(!o)return;const a=28,l=4;o.fillStyle="#123447",o.fillRect(0,0,112,112);for(let c=0;c<a;c++)for(let h=0;h<a;h++){const u=Math.sin((h+r%31)*.55)*Math.cos((c+r%23)*.43)*.25+Math.hypot(h-14,c-14)/20*s;let d=u<n-.2;e==="river"&&(d=Math.abs(h-14-Math.sin(c*.45)*3)<n*4),e==="plains"&&(d=!1),e==="islands"&&(d=u<n+.05),e==="lakes"&&(d=Math.sin(h*.5)+Math.cos(c*.65)>2-n*3),e==="coastal"&&(d=d||h<n*10),e==="valley"&&(d=Math.abs(h-14)<n*2),o.fillStyle=d?"#287aa0":u>.65?"#667469":u>.35?"#4f8e62":"#62a66b",o.fillRect(h*l,c*l,l,l)}}async probeAutosave(){try{await(await oo(()=>Promise.resolve().then(()=>o0),void 0,import.meta.url)).hasAutosave()&&(this.menu.dataset.auto="yes",this.menu.classList.contains("show")&&this.menu.querySelector(".menu-logo")&&this.renderMenuHome(!0))}catch{}}}const Vd=i=>i.charAt(0).toUpperCase()+i.slice(1).replaceAll("_"," ");class OM{constructor(){L(this,"ctx",null);L(this,"master",null);L(this,"effects",null);L(this,"music",null);L(this,"padGain",null);L(this,"humGain",null);L(this,"rainGain",null);L(this,"filter",null);L(this,"pad",[]);L(this,"lfo",null);L(this,"noiseBuffer",null);L(this,"brownBuffer",null);L(this,"muted",!1);L(this,"musicEnabled",!0);L(this,"chordClock",0);L(this,"chordIndex",0);L(this,"walk",26473)}get ready(){return this.ctx!==null}unlock(){if(this.ctx){this.ctx.resume().catch(()=>{});return}const t=window.AudioContext??window.webkitAudioContext;if(!t)return;const e=new t;this.ctx=e,this.master=e.createGain(),this.effects=e.createGain(),this.music=e.createGain(),this.master.gain.value=0,this.effects.gain.value=.82,this.music.gain.value=1,this.effects.connect(this.master),this.music.connect(this.master),this.master.connect(e.destination),this.noiseBuffer=this.makeNoise(!1),this.brownBuffer=this.makeNoise(!0),this.createAmbient(),this.ramp(this.master.gain,this.muted?0:.75,.08),e.resume().catch(()=>{})}makeNoise(t){const e=this.ctx,n=e.createBuffer(1,e.sampleRate*4,e.sampleRate),s=n.getChannelData(0);let r=0;for(let o=0;o<s.length;o++){const a=Math.random()*2-1;t?(r=(r+.02*a)/1.02,s[o]=r*3.5):s[o]=a}return n}createAmbient(){const t=this.ctx;this.padGain=t.createGain(),this.padGain.gain.value=0,this.filter=t.createBiquadFilter(),this.filter.type="lowpass",this.filter.frequency.value=800,this.filter.Q.value=.8;const e=t.createDelay(2);e.delayTime.value=.72;const n=t.createGain();n.gain.value=.22,this.padGain.connect(this.filter),this.filter.connect(this.music),this.filter.connect(e),e.connect(n),n.connect(e),e.connect(this.music);for(let c=0;c<2;c++){const h=t.createOscillator();h.type=c?"triangle":"sawtooth",h.frequency.value=c?110.4:110,h.detune.value=c?7:-5,h.connect(this.padGain),h.start(),this.pad.push(h)}this.lfo=t.createOscillator();const s=t.createGain();this.lfo.frequency.value=.035,s.gain.value=220,this.lfo.connect(s),s.connect(this.filter.frequency),this.lfo.start(),this.humGain=t.createGain(),this.humGain.gain.value=0;const r=t.createBufferSource();r.buffer=this.brownBuffer,r.loop=!0;const o=t.createBiquadFilter();o.type="lowpass",o.frequency.value=180,r.connect(o),o.connect(this.humGain),this.humGain.connect(this.music),r.start(),this.rainGain=t.createGain(),this.rainGain.gain.value=0;const a=t.createBufferSource();a.buffer=this.noiseBuffer,a.loop=!0;const l=t.createBiquadFilter();l.type="bandpass",l.frequency.value=2600,l.Q.value=.45,a.connect(l),l.connect(this.rainGain),this.rainGain.connect(this.music),a.start(),this.setChord(0,0)}ramp(t,e,n=.08){const s=this.ctx.currentTime;t.cancelScheduledValues(s),t.setValueAtTime(t.value,s),t.linearRampToValueAtTime(e,s+n)}tone(t,e,n,s,r="sine",o=this.effects){if(!this.ctx||!o)return;const a=this.ctx.createOscillator(),l=this.ctx.createGain();a.type=r,a.frequency.setValueAtTime(t,e),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(Math.max(2e-4,s),e+Math.min(.015,n*.2)),l.gain.exponentialRampToValueAtTime(1e-4,e+n),a.connect(l),l.connect(o),a.onended=()=>{a.disconnect(),l.disconnect()},a.start(e),a.stop(e+n+.02)}noise(t,e,n,s,r,o=!1){if(!this.ctx||!this.effects)return;const a=this.ctx.createBufferSource(),l=this.ctx.createBiquadFilter(),c=this.ctx.createGain();a.buffer=o?this.brownBuffer:this.noiseBuffer,l.type="lowpass",l.frequency.setValueAtTime(s,t),l.frequency.exponentialRampToValueAtTime(Math.max(20,r),t+e),c.gain.setValueAtTime(1e-4,t),c.gain.exponentialRampToValueAtTime(Math.max(2e-4,n),t+e*.25),c.gain.exponentialRampToValueAtTime(1e-4,t+e),a.connect(l),l.connect(c),c.connect(this.effects),a.onended=()=>{a.disconnect(),l.disconnect(),c.disconnect()},a.start(t),a.stop(t+e+.02)}sfx(t,e=1){if(!this.ctx||this.muted)return;const n=this.ctx.currentTime+.004,s=Math.max(0,Math.min(2,e));if(t==="place")this.noise(n,.09,.09*s,900,180,!0),this.tone(105,n,.11,.12*s);else if(t==="bulldoze")this.noise(n,.42,.24*s,4200,100,!1);else if(t==="error")this.tone(196,n,.2,.1*s,"square"),this.tone(207.65,n,.24,.08*s,"triangle");else if(t==="coin")[523.25,659.25,783.99].forEach((r,o)=>this.tone(r,n+o*.07,.16,.09*s));else if(t==="click")this.tone(1100,n,.025,.05*s,"square");else if(t==="levelup")[261.63,329.63,392,523.25,659.25].forEach((r,o)=>this.tone(r,n+o*.085,.28,.075*s,"triangle"));else if(t==="disaster")this.noise(n,1.6,.32*s,70,210,!0);else if(t==="siren")for(let r=0;r<8;r++)this.tone(r&1?740:540,n+r*.16,.18,.055*s,"sine");else t==="whoosh"?this.noise(n,.4,.13*s,180,6e3,!1):this.tone(420,n,.09,.1*s,"sine")}setChord(t,e){if(!this.ctx||!this.filter)return;this.walk=Math.imul(this.walk,1664525)+1013904223>>>0;const n=[[0,7],[5,12],[9,16],[7,14]],s=[[0,7],[3,10],[8,15],[5,12]];this.chordIndex=(this.chordIndex+(this.walk>>>29)%3-1+4)%4;const r=(t>.55?s:n)[this.chordIndex],o=82.41;this.pad.forEach((a,l)=>a.frequency.linearRampToValueAtTime(o*Math.pow(2,r[l]/12),this.ctx.currentTime+4)),this.filter.frequency.linearRampToValueAtTime(820-t*300-e*120,this.ctx.currentTime+3)}setMuted(t){this.muted=t,this.master&&this.ramp(this.master.gain,t?0:.75,.045)}setMusicEnabled(t){this.musicEnabled=t,this.music&&this.ramp(this.music.gain,t?1:0,.08)}update(t,e,n,s){if(!this.ctx||!this.padGain||!this.humGain||!this.rainGain||!this.music)return;this.chordClock+=t,this.chordClock>=16&&(this.chordClock%=16,this.setChord(n,s));const r=this.musicEnabled&&!this.muted,o=r?.026*(1-n*.45):0,a=r?Math.min(.025,Math.log10(e.stats.population+1)*.0048):0,l=r?Math.max(0,Math.min(1,s))*.018:0,c=1-Math.exp(-t*2.5);this.padGain.gain.setTargetAtTime(o,this.ctx.currentTime,Math.max(.03,.3/Math.max(c,.01))),this.humGain.gain.setTargetAtTime(a,this.ctx.currentTime,.5),this.rainGain.gain.setTargetAtTime(l,this.ctx.currentTime,.4)}dispose(){if(this.ctx){for(const t of this.pad)try{t.stop()}catch{}try{this.lfo?.stop()}catch{}this.ctx.close(),this.ctx=null,this.pad=[]}}}const kM="sethcity-saves",mi="saves",Rs="sethcity:save:",n0=["height","water","terrain","tree","zone","road","rail","wire","pipe","subway","tunnel","building","originOffset","level","variant","rotation","age","condition","powered","watered","roadNet","population","jobs","landValue","pollution","noise","crime","fireRisk","traffic","desirability","covPolice","covFire","covHealth","covEducation","covPark","covTransit","onFire","scratchA","scratchB"];function BM(i){let t="";for(let n=0;n<i.length;n+=32768)t+=String.fromCharCode(...i.subarray(n,n+32768));return btoa(t)}function zM(i){const t=atob(i),e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function HM(i){return{type:i.constructor.name,data:BM(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}}function GM(i,t){if(!t||typeof t!="object")throw new Error("Missing grid array");const e=t;if(e.type!==i.constructor.name||typeof e.data!="string")throw new Error("Invalid grid array");const n=zM(e.data);if(n.byteLength!==i.byteLength)throw new Error("Invalid grid array length");new Uint8Array(i.buffer,i.byteOffset,i.byteLength).set(n)}function i0(i){const t={};for(const r of n0)t[r]=HM(i.grid[r]);const e=Date.now(),n={seed:i.seed,cityName:i.cityName,mayorName:i.mayorName,difficulty:i.difficulty,grid:t,time:i.time,speed:i.speed,budget:i.budget,stats:i.stats,demand:i.demand,ordinances:i.ordinances,milestones:i.milestones,disasters:i.disasters,vehicles:i.vehicles,news:i.news.slice(-50),papers:i.papers,signs:i.signs,deals:i.deals,history:i.history,tool:i.tool,overlay:i.overlay,unlocked:[...i.unlocked],nextDisasterId:i.nextDisasterId,nextNewsId:i.nextNewsId,tutorialStep:i.tutorialStep,disastersEnabled:i.disastersEnabled},s={v:1,savedAt:e,meta:{name:i.cityName,pop:i.stats.population,funds:i.budget.funds,date:e,year:i.time.year},state:n};return JSON.stringify(s)}function Re(i,t,e){return i[t]===void 0||i[t]===null?e:i[t]}function s0(i){const t=JSON.parse(i);if(t.v!==1||!t.state||typeof t.state!="object")throw new Error("Unsupported or invalid save");const e=t.state,n=nh(Re(e,"seed",0),Re(e,"difficulty","normal"));n.cityName=Re(e,"cityName",n.cityName),n.mayorName=Re(e,"mayorName",n.mayorName),n.time={...n.time,...Re(e,"time",{})},n.speed=Re(e,"speed",n.speed);const s=Re(e,"budget",{});n.budget={...n.budget,...s,ledger:{...n.budget.ledger,...s.ledger??{}},loans:s.loans??[]},n.stats={...n.stats,...Re(e,"stats",{})},n.demand={...n.demand,...Re(e,"demand",{})},n.ordinances=Re(e,"ordinances",n.ordinances),n.milestones=Re(e,"milestones",n.milestones),n.disasters=Re(e,"disasters",[]),n.vehicles=Re(e,"vehicles",[]),n.news=Re(e,"news",[]).slice(-50),n.papers=Re(e,"papers",[]),n.signs=Re(e,"signs",[]),n.deals=Re(e,"deals",n.deals),n.history={...n.history,...Re(e,"history",{})},n.tool=Re(e,"tool",n.tool),n.overlay=Re(e,"overlay",n.overlay),n.unlocked=new Set(Re(e,"unlocked",[])),n.nextDisasterId=Re(e,"nextDisasterId",n.nextDisasterId),n.nextNewsId=Re(e,"nextNewsId",n.nextNewsId),n.tutorialStep=Re(e,"tutorialStep",n.tutorialStep),n.disastersEnabled=Re(e,"disastersEnabled",n.disastersEnabled);const r=Re(e,"grid",{});n.grid=new qd;for(const o of n0)GM(n.grid[o],r[o]);return n.grid.markAllDirty(),n}function Ka(){return new Promise((i,t)=>{if(typeof indexedDB>"u"){t(new Error("IndexedDB unavailable"));return}const e=indexedDB.open(kM,1);e.onupgradeneeded=()=>{e.result.objectStoreNames.contains(mi)||e.result.createObjectStore(mi)},e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error)})}async function VM(i,t){const e=await Ka();await new Promise((n,s)=>{const r=e.transaction(mi,"readwrite");r.objectStore(mi).put(t,i),r.oncomplete=()=>n(),r.onerror=()=>s(r.error)}),e.close()}async function WM(i){const t=await Ka(),e=await new Promise((n,s)=>{const r=t.transaction(mi).objectStore(mi).get(i);r.onsuccess=()=>n(typeof r.result=="string"?r.result:null),r.onerror=()=>s(r.error)});return t.close(),e}function XM(i){try{return localStorage.getItem(Rs+i)}catch{return null}}function qM(i,t){try{return localStorage.setItem(Rs+i,t),!0}catch{if(i==="auto")try{return localStorage.removeItem(Rs+i),localStorage.setItem(Rs+i,t),!0}catch{}return!1}}async function Nh(i,t="manual"){let e;try{e=i0(i)}catch{return!1}try{return await VM(t,e),!0}catch{return qM(t,e)}}async function Fh(i){let t=null;try{t=await WM(i)}catch{}if(t??(t=XM(i)),!t)return null;try{return s0(t)}catch{return null}}async function YM(){const i=new Map;try{const e=await Ka();await new Promise((n,s)=>{const r=e.transaction(mi).objectStore(mi).openCursor();r.onsuccess=()=>{const o=r.result;if(!o){n();return}typeof o.value=="string"&&i.set(String(o.key),o.value),o.continue()},r.onerror=()=>s(r.error)}),e.close()}catch{}try{for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e);if(n?.startsWith(Rs)){const s=localStorage.getItem(n);s&&i.set(n.slice(Rs.length),s)}}}catch{}const t=[];for(const[e,n]of i)try{const s=JSON.parse(n);t.push({slot:e,...s.meta})}catch{}return t.sort((e,n)=>n.date-e.date)}async function $M(i){try{const t=await Ka();await new Promise((e,n)=>{const s=t.transaction(mi,"readwrite");s.objectStore(mi).delete(i),s.oncomplete=()=>e(),s.onerror=()=>n(s.error)}),t.close()}catch{}try{localStorage.removeItem(Rs+i)}catch{}}async function r0(){return await Fh("auto")!==null}const o0=Object.freeze(Object.defineProperty({__proto__:null,deleteSave:$M,deserialize:s0,hasAutosave:r0,listSaves:YM,loadGame:Fh,saveGame:Nh,serialize:i0},Symbol.toStringTag,{value:"Module"})),Oh=document.getElementById("scene"),jM=document.getElementById("ui"),Je=new Mx(Oh),io=new tM(Je.scene,Je.camera),So=new mM(Je.camera,Oh),Qc=new OM;let Te=null,bs=null,Wd=null,th="none",Ql=0,a0=!1,tc=0,ec=0;function KM(i){const t=i.grid,e=new Ax(Je.scene,t),n=new kx(Je.scene,t),s=new by(Je.scene,t),r=new Ky(Je.scene,t,i),o=new pM,a=new fp(i),l=new gp(i);return e.build(),n.rebuildAll(),s.rebuildAll(),r.rebuildAll(),t.dirtyChunks.clear(),t.terrainDirty=!1,a.recomputeAll(),{state:i,sim:a,actions:l,terrainR:e,roadR:n,buildingR:s,propR:r,overlay:o}}function ZM(i){i.terrainR.dispose(),i.roadR.dispose(),i.buildingR.dispose(),i.propR.dispose(),i.overlay.dispose()}function eh(i){Te&&ZM(Te),Te=KM(i),th="none",So.focusOn(64,64,90),Lt.emit("game:loaded",{})}const Xd={get state(){return Te.state},get actions(){return Te.actions},get controls(){return So},focus(i,t){So.focusOn(i,t)},setQuality(i){a0=!0,Je.setQuality(i)},async save(){if(!Te)return;await Nh(Te.state)||Lt.emit("news",{id:Te.state.nextNewsId++,tick:Te.state.time.ticks,text:"Save failed — storage is full or unavailable.",kind:"bad"})},async load(i){const t=await Fh(i);t&&eh(t)},newGame(i){const t=nh(i.seed,i.difficulty??"normal");t.cityName=i.name||"SethCity",i.mayor&&(t.mayorName=i.mayor),t.disastersEnabled=i.disasters??!0,jd(t.grid,{seed:i.seed,water:i.water,hills:i.hills,trees:i.trees,shape:i.shape}),eh(t)},sfx(i){Qc.sfx(i)},overUI(i,t){return bs?bs.hitTest(i,t):!1},onHighlight(i){Te?.terrainR.setHighlight(i)},onHighlightPath(i,t){Te?.terrainR.setHighlightTiles(i,t)},onSelect(i){bs?.showTileInspector(i),Lt.emit("select:tile",i===null?null:{i})},toast(i,t="info"){Te&&Lt.emit("news",{id:Te.state.nextNewsId++,tick:Te.state.time.ticks,text:i,kind:t==="info"?"info":t})},money(i,t,e){Lt.emit("money:spent",{amount:i,x:t,y:e,label:""})},async promptSign(){return bs?bs.promptSignText():null}};Lt.on("shake",({intensity:i})=>Je.shake(i));Lt.on("news",i=>{Te&&(Te.state.news.push(i),Te.state.news.length>60&&Te.state.news.splice(0,Te.state.news.length-60))});Object.defineProperty(window,"__sethcity",{get:()=>Te?{state:Te.state,sim:Te.sim,actions:Te.actions,controls:So}:null});Lt.on("tile:changed",({i})=>{if(!Te)return;const t=Te.state.grid;t.building[i]&&t.age[i]===0&&Te.buildingR.popIn(i)});async function JM(){const i=nh(Math.random()*1e9|0,"normal");jd(i.grid,{seed:i.seed,water:.3,hills:.45,trees:.5,shape:"coastal"}),eh(i),bs=new FM(jM,Xd),Wd=new _M(Oh,Xd),r0();const t=()=>{Qc.unlock(),window.removeEventListener("pointerdown",t)};window.addEventListener("pointerdown",t),window.addEventListener("resize",()=>Je.resize()),document.getElementById("boot")?.remove();let e=performance.now();const n=s=>{const r=Math.min(.1,(s-e)/1e3);e=s;const o=Te,a=o.state,l=s/1e3;So.update(r,a.grid),o.sim.update(r),localStorage.getItem("sethcity:daynight")!=="on"&&(a.time.timeOfDay=.42),io.update(r,a.time),Je.updateSky(a.time,io.state),a.grid.terrainDirty&&(o.terrainR.build(),a.grid.terrainDirty=!1);let c=6;for(const u of a.grid.dirtyChunks){const d=u%Se,f=u/Se|0;if(o.terrainR.buildChunk(d,f),o.roadR.rebuildChunk(d,f),o.buildingR.rebuildChunk(d,f),o.propR.rebuildChunk(d,f),a.grid.dirtyChunks.delete(u),--c<=0)break}a.overlay!==th&&(th=a.overlay,o.overlay.set(a.overlay),o.overlay.refresh(a),o.terrainR.setOverlayTexture(a.overlay==="none"?null:o.overlay.texture,o.overlay.strength),Lt.emit("overlay:changed",{overlay:a.overlay})),a.overlay!=="none"&&(Ql+=r,Ql>.25&&(Ql=0,o.overlay.refresh(a)));const h=Je.nightFactor;if(o.terrainR.update(r,l,h),o.roadR.update(r,l,h),o.buildingR.update(r,l,h),o.propR.update(r,l,h,a),Wd?.update(),bs?.update(r),Qc.update(r,a,h,io.state.kind==="rain"||io.state.kind==="storm"?io.state.intensity:0),Je.render(r),!a0&&(tc+=r,tc>4)){tc=0;const u=Je.fps;u<42&&Je.quality!=="low"?Je.setQuality(Je.quality==="high"?"medium":"low"):u>57&&Je.quality==="low"&&Je.setQuality("medium")}ec+=r,ec>60&&a.speed!==0&&(ec=0,Nh(a,"auto").then(()=>Lt.emit("game:saved",{}))),requestAnimationFrame(n)};requestAnimationFrame(n)}JM();
