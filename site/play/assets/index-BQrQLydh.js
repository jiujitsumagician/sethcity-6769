var a0=Object.defineProperty;var l0=(i,t,e)=>t in i?a0(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var L=(i,t,e)=>l0(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class c0{constructor(){L(this,"map",new Map)}on(t,e){let n=this.map.get(t);return n||this.map.set(t,n=new Set),n.add(e),()=>n.delete(e)}off(t,e){this.map.get(t)?.delete(e)}emit(t,e){const n=this.map.get(t);if(n)for(const s of n)s(e)}}const kt=new c0,R=128,lt=128,ie=16,Ve=R/ie,Xn=lt/ie,j=R*lt,nn=.35,Ji=0,dt=(i,t)=>t*R+i,or=i=>i%R,ar=i=>i/R|0,zt=(i,t)=>i>=0&&t>=0&&i<R&&t<lt;var Yt=(i=>(i[i.None=0]="None",i[i.ResLow=1]="ResLow",i[i.ResMed=2]="ResMed",i[i.ResHigh=3]="ResHigh",i[i.ComLow=4]="ComLow",i[i.ComHigh=5]="ComHigh",i[i.IndAgri=6]="IndAgri",i[i.IndLight=7]="IndLight",i[i.IndHeavy=8]="IndHeavy",i))(Yt||{}),Ue=(i=>(i[i.None=0]="None",i[i.Street=1]="Street",i[i.Avenue=2]="Avenue",i[i.Highway=3]="Highway",i))(Ue||{}),ne=(i=>(i[i.Grass=0]="Grass",i[i.Sand=1]="Sand",i[i.Rock=2]="Rock",i[i.Snow=3]="Snow",i[i.Dirt=4]="Dirt",i[i.Forest=5]="Forest",i))(ne||{});const h0={easy:1e5,normal:5e4,hard:2e4,sandbox:999999999};class zd{constructor(){L(this,"w",R);L(this,"h",lt);L(this,"height",new Float32Array(j));L(this,"water",new Uint8Array(j));L(this,"terrain",new Uint8Array(j));L(this,"tree",new Uint8Array(j));L(this,"zone",new Uint8Array(j));L(this,"road",new Uint8Array(j));L(this,"rail",new Uint8Array(j));L(this,"wire",new Uint8Array(j));L(this,"pipe",new Uint8Array(j));L(this,"subway",new Uint8Array(j));L(this,"tunnel",new Uint8Array(j));L(this,"building",new Uint16Array(j));L(this,"originOffset",new Uint8Array(j));L(this,"level",new Uint8Array(j));L(this,"variant",new Uint8Array(j));L(this,"rotation",new Uint8Array(j));L(this,"age",new Uint16Array(j));L(this,"condition",new Uint8Array(j));L(this,"powered",new Uint8Array(j));L(this,"watered",new Uint8Array(j));L(this,"roadNet",new Uint16Array(j));L(this,"population",new Uint16Array(j));L(this,"jobs",new Uint16Array(j));L(this,"landValue",new Uint8Array(j));L(this,"pollution",new Uint8Array(j));L(this,"noise",new Uint8Array(j));L(this,"crime",new Uint8Array(j));L(this,"fireRisk",new Uint8Array(j));L(this,"traffic",new Uint8Array(j));L(this,"desirability",new Uint8Array(j));L(this,"covPolice",new Uint8Array(j));L(this,"covFire",new Uint8Array(j));L(this,"covHealth",new Uint8Array(j));L(this,"covEducation",new Uint8Array(j));L(this,"covPark",new Uint8Array(j));L(this,"covTransit",new Uint8Array(j));L(this,"onFire",new Uint8Array(j));L(this,"scratchA",new Uint8Array(j));L(this,"scratchB",new Uint8Array(j));L(this,"dirtyChunks",new Set);L(this,"terrainDirty",!0)}markDirty(t,e){if(!zt(t,e))return;const n=t/ie|0,s=e/ie|0;this.dirtyChunks.add(s*Ve+n),t%ie===0&&n>0&&this.dirtyChunks.add(s*Ve+n-1),t%ie===ie-1&&n<Ve-1&&this.dirtyChunks.add(s*Ve+n+1),e%ie===0&&s>0&&this.dirtyChunks.add((s-1)*Ve+n),e%ie===ie-1&&s<Xn-1&&this.dirtyChunks.add((s+1)*Ve+n)}markAllDirty(){for(let t=0;t<Ve*Xn;t++)this.dirtyChunks.add(t);this.terrainDirty=!0}originOf(t,e){if(!zt(t,e))return-1;const n=dt(t,e);if(!this.building[n])return-1;const s=this.originOffset[n],r=s&15,o=s>>4&15;return dt(t-r,e-o)}isFlat(t,e,n,s){if(!zt(t,e)||!zt(t+n-1,e+s-1))return!1;const r=this.height[dt(t,e)];for(let o=0;o<s;o++)for(let a=0;a<n;a++){const l=dt(t+a,e+o);if(this.water[l]||Math.abs(this.height[l]-r)>.001)return!1}return!0}isClear(t,e,n,s){if(!zt(t,e)||!zt(t+n-1,e+s-1))return!1;for(let r=0;r<s;r++)for(let o=0;o<n;o++){const a=dt(t+o,e+r);if(this.building[a]||this.road[a]||this.rail[a]||this.water[a])return!1}return!0}touchesRoad(t,e,n,s){for(let r=-1;r<=n;r++)if(zt(t+r,e-1)&&this.road[dt(t+r,e-1)]||zt(t+r,e+s)&&this.road[dt(t+r,e+s)])return!0;for(let r=-1;r<=s;r++)if(zt(t-1,e+r)&&this.road[dt(t-1,e+r)]||zt(t+n,e+r)&&this.road[dt(t+n,e+r)])return!0;return!1}touchesWater(t,e,n,s){for(let r=-1;r<=n;r++)if(zt(t+r,e-1)&&this.water[dt(t+r,e-1)]||zt(t+r,e+s)&&this.water[dt(t+r,e+s)])return!0;for(let r=-1;r<=s;r++)if(zt(t-1,e+r)&&this.water[dt(t-1,e+r)]||zt(t+n,e+r)&&this.water[dt(t+n,e+r)])return!0;return!1}clearTile(t){this.building[t]=0,this.originOffset[t]=0,this.level[t]=0,this.age[t]=0,this.condition[t]=0,this.population[t]=0,this.jobs[t]=0,this.onFire[t]=0}}function u0(){return{population:0,jobs:0,unemployment:0,homeless:0,happiness:.5,health:.5,educationLevel:.3,safety:.5,traffic:0,pollution:0,powerDemand:0,powerSupply:0,waterDemand:0,waterSupply:0,approval:.5,landValueAvg:0,resBuildings:0,comBuildings:0,indBuildings:0}}function d0(){return{incomeRes:0,incomeCom:0,incomeInd:0,incomeOther:0,costRoads:0,costPolice:0,costFire:0,costHealth:0,costEducation:0,costParks:0,costPower:0,costWater:0,costLoans:0,net:0}}function f0(){return{funds:5e4,taxRes:.09,taxCom:.09,taxInd:.09,fundRoads:1,fundPolice:1,fundFire:1,fundHealth:1,fundEducation:1,fundParks:1,loans:[],ledger:d0()}}const p0=[{key:"recycling",name:"Recycling Program",desc:"−15% pollution citywide.",costPerCapita:.02,active:!1},{key:"smoke_detectors",name:"Smoke Detector Ordinance",desc:"−25% fire risk.",costPerCapita:.015,active:!1},{key:"neighborhood_watch",name:"Neighbourhood Watch",desc:"−20% crime.",costPerCapita:.012,active:!1},{key:"free_clinics",name:"Free Health Clinics",desc:"+15% health coverage.",costPerCapita:.03,active:!1},{key:"pro_reading",name:"Pro-Reading Campaign",desc:"+15% education.",costPerCapita:.02,active:!1},{key:"transit_subsidy",name:"Transit Subsidy",desc:"−20% traffic.",costPerCapita:.035,active:!1,unlockPop:5e3},{key:"legalise_gambling",name:"Legalised Gambling",desc:"+income, +crime.",costPerCapita:-.05,active:!1,unlockPop:1e4},{key:"tourism",name:"Tourism Board",desc:"+commercial demand.",costPerCapita:.025,active:!1,unlockPop:15e3},{key:"clean_air",name:"Clean Air Act",desc:"−35% industrial pollution, −industrial demand.",costPerCapita:.04,active:!1,unlockPop:25e3},{key:"homeless_shelters",name:"Homeless Shelters",desc:"+approval, −homeless.",costPerCapita:.03,active:!1,unlockPop:2e4}],m0=[{key:"hamlet",name:"Hamlet",desc:"Your first neighbours arrive.",pop:100,reached:!1,reward:0},{key:"village",name:"Village",desc:"Schools and clinics unlocked.",pop:500,reached:!1,reward:2e3},{key:"town",name:"Town",desc:"Medium density unlocked. The city gifts you a Mayor’s House.",pop:2e3,reached:!1,reward:5e3,rewardKey:"x_mayor"},{key:"city",name:"City",desc:"Avenues, colleges and stadiums unlocked.",pop:1e4,reached:!1,reward:15e3},{key:"capital",name:"Capital",desc:"High density and universities unlocked. The Llama Dome arrives.",pop:3e4,reached:!1,reward:4e4,rewardKey:"x_llama"},{key:"boomtown",name:"Boomtown",desc:"The Army offers a base — jobs and order, noise and worry.",pop:45e3,reached:!1,reward:6e4,rewardKey:"x_military"},{key:"metropolis",name:"Metropolis",desc:"Skyscrapers, airports and fusion unlocked.",pop:8e4,reached:!1,reward:1e5},{key:"arcology",name:"Arcology Age",desc:"Self-contained arcologies may now rise.",pop:12e4,reached:!1,reward:15e4,rewardKey:"arco_plymouth"},{key:"megalopolis",name:"Megalopolis",desc:"You built a legend. The Launch Arco awaits.",pop:2e5,reached:!1,reward:25e4,rewardKey:"arco_launch"}],Fr=["Dickville","Port Willard","Flowtown","Sharkton"];function g0(){return[{key:"buy_power_1",neighbor:Fr[0],kind:"buy_power",amount:200,pricePerUnit:2.2,active:!1},{key:"sell_power_1",neighbor:Fr[1],kind:"sell_power",amount:200,pricePerUnit:1.1,active:!1},{key:"buy_water_1",neighbor:Fr[2],kind:"buy_water",amount:300,pricePerUnit:1.6,active:!1},{key:"sell_water_1",neighbor:Fr[3],kind:"sell_water",amount:300,pricePerUnit:.8,active:!1},{key:"garbage_1",neighbor:Fr[0],kind:"take_garbage",amount:1,pricePerUnit:900,active:!1}]}function Jc(i=Math.random()*1e9|0,t="normal"){const e=f0();return e.funds=h0[t],{seed:i,cityName:"SethCity",mayorName:"Mayor Seth",difficulty:t,grid:new zd,time:{ticks:0,day:1,month:0,year:6769,timeOfDay:.32,season:0},speed:2,budget:e,stats:u0(),demand:{r:.8,c:.2,i:.4},ordinances:p0.map(n=>({...n})),milestones:m0.map(n=>({...n})),disasters:[],vehicles:[],news:[],papers:[],signs:[],deals:g0(),history:{population:[],funds:[],approval:[],pollution:[],traffic:[],unemployment:[]},tool:"inspect",overlay:"none",unlocked:new Set,nextDisasterId:1,nextNewsId:1,tutorialStep:0,disastersEnabled:!0}}function is(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function bt(i,t,e=0){let n=Math.imul(i|0,374761393)+Math.imul(t|0,668265263)+Math.imul(e|0,2654435761)|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function Ut(i,t,e){return i+(t-i)*e}function $t(i,t,e){return i<t?t:i>e?e:i}function se(i){return i<0?0:i>1?1:i}function ri(i){return i*i*(3-2*i)}function Ti(i){const t=new Uint8Array(512),e=is(i),n=new Uint8Array(256);for(let a=0;a<256;a++)n[a]=a;for(let a=255;a>0;a--){const l=e()*(a+1)|0,c=n[a];n[a]=n[l],n[l]=c}for(let a=0;a<512;a++)t[a]=n[a&255];const s=(a,l,c)=>{switch(a&3){case 0:return l+c;case 1:return-l+c;case 2:return l-c;default:return-l-c}},r=(a,l)=>{const c=Math.floor(a)&255,h=Math.floor(l)&255,u=a-Math.floor(a),d=l-Math.floor(l),f=ri(u),g=ri(d),v=t[t[c]+h],m=t[t[c]+h+1],p=t[t[c+1]+h],y=t[t[c+1]+h+1],_=Ut(s(v,u,d),s(p,u-1,d),f),x=Ut(s(m,u,d-1),s(y,u-1,d-1),f);return Ut(_,x,g)};return{noise:r,fbm:(a,l,c=5,h=2,u=.5)=>{let d=1,f=1,g=0,v=0;for(let m=0;m<c;m++)g+=d*r(a*f,l*f),v+=d,d*=u,f*=h;return g/v}}}const on=1,li=26,Ra=-7,Qr=3,v0=.5,_0=.45,Qc=new Float32Array(j),Hd=new Float32Array(j),ga=new Float32Array(j),kr=new Float32Array(j),Wt=new Int16Array(j),Yi=new Int16Array(j),Pa=new Uint8Array(j),si=new Int32Array(j),ji=new Int16Array(j),Ri=new Int32Array(j),Or=new Int32Array(j),Ms=new Uint8Array(j),Ni=[1,-1,0,0],Fi=[0,0,1,-1],x0=i=>Math.round(i/nn),Gd=i=>i*nn;function y0(i){const t=i.height,e=i.water;for(let n=0;n<j;n++){const s=Wt[n];t[n]=Gd(s),e[n]=s<0?1:0}}function Ja(i,t,e){const n=$t(t-.5,0,R-1.0001),s=$t(e-.5,0,lt-1.0001),r=n|0,o=s|0,a=r+1<R?r+1:r,l=o+1<lt?o+1:o,c=n-r,h=s-o,u=i.height,d=u[o*R+r],f=u[o*R+a],g=u[l*R+r],v=u[l*R+a],m=d+(f-d)*c,p=g+(v-g)*c;return m+(p-m)*h}function M0(i,t){switch(i){case"coastal":return Ut(.16,.38,t);case"river":return Ut(.035,.11,t);case"lakes":return Ut(.07,.2,t);case"plains":return Ut(.012,.055,t);case"valley":return Ut(.05,.13,t);default:return Ut(.28,.4,t)}}function Gh(i,t,e,n){const s=(t-i.x)*i.ax,r=(e-i.y)*i.ay,o=Math.sqrt(s*s+r*r);if(o>i.r*2.4)return-2;const a=Math.atan2(r,s),l=i.r*(1+i.lobe*(.18*Math.sin(3*a+i.ph)+.11*Math.sin(5*a-i.ph*1.7)));return(l-o)/Math.max(4,l)*1.15+n}function w0(i,t){const e=i.seed|0,n=Ti(e^2654435769),s=Ti(e+1013904223|0),r=Ti(e+1266489917|0),o=Ti(e+424242|0),a=se(i.water),l=i.shape;let c=t()*Math.PI*2;(l==="river"||l==="valley")&&(c=(t()<.5?0:Math.PI*.5)+(t()-.5)*.42);const h=Math.cos(c),u=Math.sin(c),d=t()*6.283,f=t()*6.283,g=t()*6.283,v=[];let m=0,p=3,y=0,_=2,x=1,T=.27;if(l==="lakes"){const M=3+(t()*3|0);for(let w=0;w<M;w++){const E=w/M*6.283+t()*1.4,b=Ut(30,54,t());v.push({x:64+Math.cos(E)*b,y:64+Math.sin(E)*b,r:Ut(9,20,t())*Ut(.8,1.35,a),ax:Ut(.75,1.25,t()),ay:1,ph:t()*6.283,lobe:1})}}else if(l==="plains"){const M=1+(t()*2|0);for(let w=0;w<M;w++){const E=t()*6.283,b=Ut(34,52,t());v.push({x:64+Math.cos(E)*b,y:64+Math.sin(E)*b,r:Ut(6,11,t())*Ut(.8,1.4,a),ax:Ut(.8,1.3,t()),ay:1,ph:t()*6.283,lobe:.7})}}else if(l==="islands"){v.push({x:64+(t()-.5)*8,y:64+(t()-.5)*8,r:56,ax:Ut(.92,1.08,t()),ay:1,ph:t()*6.283,lobe:1.25});const M=3+(t()*4|0);for(let w=0;w<M;w++){const E=w/M*6.283+t()*1.1;v.push({x:64+Math.cos(E)*Ut(58,74,t()),y:64+Math.sin(E)*Ut(58,74,t()),r:Ut(5,13,t()),ax:Ut(.8,1.25,t()),ay:1,ph:t()*6.283,lobe:1})}}else l==="river"?(m=(t()<.5?-1:1)*Ut(.14,.2,t()),p=Ut(2.2,4.6,a),y=(t()-.5)*.4,_=p*.55,x=m>0?-1:1):l==="valley"&&(m=(t()<.5?-1:1)*.15,p=Ut(1.8,3.6,a),T=.27);for(let M=0;M<lt;M++)for(let w=0;w<R;w++){const E=M*R+w,b=n.fbm(w*.016,M*.016,3),S=n.fbm(w*.016+71.3,M*.016+19.7,3),D=w+b*15,k=M+S*15,U=D/R-.5,z=k/lt-.5,W=Math.sqrt(U*U+z*z)*2,$=U*h+z*u,et=-U*u+z*h,Y=s.fbm(w*.019,M*.019,4),rt=s.fbm(w*.062,M*.062,3),xt=1-Math.abs(r.fbm(w*.026,M*.026,5));ga[E]=se(xt*xt*1.15);let Tt=-1,Xt=0;switch(l){case"coastal":{Tt=$*3.3+Y*1.1+rt*.3+Math.sin(et*8.4+d)*.24,Xt=ri(se(-$*2.1-.05))*.9+ri(se((W-.86)*1.7))*.45;break}case"river":{const K=.075*Math.sin($*6.4+d)+.042*Math.sin($*12.1+f)+Y*.03,it=Math.abs(et-m-K)*R;Tt=(p-it)*.5+rt*.25;const yt=Math.abs($-y-.05*Math.sin(et*8.1+g))*R,ct=ri(se(((et-m)*x-.02)*7)),Nt=(_-yt)*.5+rt*.2;Tt=Math.max(Tt,Nt*ct+(ct-1)*2),Xt=ri(se((W-.74)*1.55))*.85+ri(se(((m-et)*x*-1-.06)*4.2))*.55;break}case"valley":{const K=.05*Math.sin($*5.1+d)+Y*.025,it=Math.abs(et-K);Xt=ri(se((it-T)*5.2))*(.85+ga[E]*.35);const yt=Math.abs(et-m*.85-K)*R;Tt=(p-yt)*.5+rt*.2;break}case"lakes":case"plains":{let K=-2;for(let it=0;it<v.length;it++){const yt=Gh(v[it],w,M,Y*.4+rt*.15);yt>K&&(K=yt)}Tt=K,Xt=ri(se((W-(l==="plains"?.92:.8))*1.6))*(l==="plains"?.5:.9);break}default:{let K=-2;for(let ct=0;ct<v.length;ct++){const Nt=Gh(v[ct],w,M,Y*.42+rt*.18);Nt>K&&(K=Nt)}Tt=-K;const it=se(1-Math.abs(K-.5)*2.8),yt=.3+.7*se($*2.8+.4);Xt=it*yt*(.45+ga[E]*.85);break}}Qc[E]=Tt;const ve=o.fbm(w*.0115,M*.0115,3)*.5+.5;Hd[E]=se(Xt)*(.2+.8*ri(se((ve-.33)*2.8)))}}function b0(i){let t=-4,e=4;for(let n=0;n<34;n++){const s=(t+e)*.5;let r=0;for(let o=0;o<j;o++)Qc[o]>s&&r++;r/j>i?t=s:e=s}return(t+e)*.5}function S0(i,t,e){const n=Ut(3.5,li-on,se(i)),s=Ut(.6,2.6,se(i)),r=Ti(e+8675309|0);for(let o=0;o<lt;o++)for(let a=0;a<R;a++){const l=o*R+a;if(Qc[l]>t){Wt[l]=-1;continue}const c=Hd[l],h=c*c*(.5+.5*ga[l])*n,u=(r.fbm(a*.028,o*.028,3)*.5+.5)*s,d=on+Math.round(h+u);Wt[l]=d>li?li:d}}function E0(){si.fill(-1);let i={size:0,seedTile:-1},t=0,e=0,n=0,s=-1;for(let r=0;r<j;r++){if(Wt[r]<0||si[r]>=0)continue;let o=0,a=0;Ri[a++]=r,si[r]=t;let l=0,c=0,h=0;for(;o<a;){const u=Ri[o++];l++;const d=u%R,f=u/R|0;c+=d,h+=f;for(let g=0;g<4;g++){const v=d+Ni[g],m=f+Fi[g];if(v<0||m<0||v>=R||m>=lt)continue;const p=m*R+v;Wt[p]<0||si[p]>=0||(si[p]=t,Ri[a++]=p)}}l>i.size&&(i={size:l,seedTile:r},e=c,n=h,s=t),t++}if(s>=0&&i.size>0){const r=e/i.size,o=n/i.size;let a=1/0;for(let l=0;l<j;l++){if(si[l]!==s)continue;const c=l%R-r,h=(l/R|0)-o,u=c*c+h*h;u<a&&(a=u,i.seedTile=l)}for(let l=0;l<j;l++)si[l]=si[l]===s?1:0}else si.fill(0);return i}function T0(i,t,e){if(Pa.fill(0),Ms.fill(0),i.seedTile<0)return 0;const n=Ti(e+555555|0),s=i.seedTile%R,r=i.seedTile/R|0,o=[];let a=0,l=0;const c=u=>{if(Ms[u]||si[u]!==1)return;Ms[u]=1;const d=u%R,f=u/R|0,g=d-s,v=f-r,m=Math.sqrt(g*g+v*v),p=n.fbm(d*.045,f*.045,3)*26;let y=Math.round(m*4+p+(Wt[u]-on)*16);y<l&&(y=l),y>4095&&(y=4095),y>a&&(a=y);const _=o[y];_?_.push(u):o[y]=[u]};c(i.seedTile);let h=0;for(let u=0;u<=a&&h<t;u++){l=u;const d=o[u];if(d)for(let f=0;f<d.length&&h<t;f++){const g=d[f];Pa[g]=1,Wt[g]=on,h++;const v=g%R,m=g/R|0;for(let p=0;p<4;p++){const y=v+Ni[p],_=m+Fi[p];y<0||_<0||y>=R||_>=lt||c(_*R+y)}}}return h}function Vh(){for(let i=0;i<40;i++){let t=!1;for(let e=0;e<lt;e++)for(let n=0;n<R;n++){const s=e*R+n;if(Pa[s]||Wt[s]<=on)continue;let r=32767,o=!1;for(let l=0;l<4;l++){const c=n+Ni[l],h=e+Fi[l];if(c<0||h<0||c>=R||h>=lt)continue;const u=h*R+c;Wt[u]<0?o=!0:Wt[u]<r&&(r=Wt[u])}let a=r===32767?li:r+Qr;o&&a>on+5&&(a=on+5),Wt[s]>a&&(Wt[s]=a<on?on:a,t=!0)}if(!t)break}}function A0(){Yi.set(Wt);for(let i=1;i<lt-1;i++)for(let t=1;t<R-1;t++){const e=i*R+t;if(Pa[e]||Wt[e]<0)continue;const n=Yi[e-1],s=Yi[e+1],r=Yi[e-R],o=Yi[e+R];n<0||s<0||r<0||o<0||n===s&&r===o&&n===r&&n!==Yi[e]&&(Wt[e]=n)}}function C0(){ji.fill(1023);let i=0;for(let e=0;e<lt;e++)for(let n=0;n<R;n++){const s=e*R+n,r=Wt[s]<0;let o=!1;for(let a=0;a<4;a++){const l=n+Ni[a],c=e+Fi[a];if(!(l<0||c<0||l>=R||c>=lt)&&Wt[c*R+l]<0!==r){o=!0;break}}o&&(ji[s]=0,Ri[i++]=s)}let t=0;for(;t<i;){const e=Ri[t++],n=e%R,s=e/R|0,r=Wt[e]<0,o=ji[e]+1;for(let a=0;a<4;a++){const l=n+Ni[a],c=s+Fi[a];if(l<0||c<0||l>=R||c>=lt)continue;const h=c*R+l;Wt[h]<0===r&&(ji[h]<=o||(ji[h]=o,Ri[i++]=h))}}}function R0(i){const t=Ti(i+24680|0);for(let e=0;e<lt;e++)for(let n=0;n<R;n++){const s=e*R+n;if(Wt[s]>=0)continue;const r=t.fbm(n*.05,e*.05,2)*.9;let o=1+Math.floor(ji[s]*.62+r+.5);o<1&&(o=1),o>-Ra&&(o=-Ra),Wt[s]=-o}}function P0(){for(let t=0;t<lt;t++)for(let e=0;e<R;e++){const n=t*R+e;if(Wt[n]<0){Ms[n]=0;continue}let s=1;for(let r=0;r<4;r++){const o=e+Ni[r],a=t+Fi[r];if(o<0||a<0||o>=R||a>=lt)continue;const l=a*R+o;if(Wt[l]>=0&&Wt[l]!==Wt[n]){s=0;break}}Ms[n]=s}Or.fill(0);let i=0;for(let t=0;t<j;t++){if(!Ms[t]||Or[t])continue;let e=0,n=0;Ri[n++]=t,Or[t]=1;let s=0;for(;e<n;){const r=Ri[e++];s++;const o=r%R,a=r/R|0;for(let l=0;l<4;l++){const c=o+Ni[l],h=a+Fi[l];if(c<0||h<0||c>=R||h>=lt)continue;const u=h*R+c;!Ms[u]||Or[u]||(Or[u]=1,Ri[n++]=u)}}s>i&&(i=s)}return i/j}function L0(i,t){const e=t.seed|0,n=Ti(e+31337|0),s=Ti(e+60613|0),r=se(t.trees);let o=on;for(let m=0;m<j;m++)Wt[m]>o&&(o=Wt[m]);const a=Math.max(11,Math.round(o*.76)),l=Math.max(6,Math.round(o*.52));let c=0,h=0;for(let m=0;m<lt;m++)for(let p=0;p<R;p++){const y=m*R+p;if(Wt[y]<0){kr[y]=-1;continue}c++;const _=(n.fbm(p*.03,m*.03,4)*.5+.5)*.78+(n.fbm(p*.1,m*.1,2)*.5+.5)*.22;kr[y]=_,_>h&&(h=_)}const u=Ut(.035,.52,r)*c;let d=0,f=1;for(let m=0;m<24;m++){const p=(d+f)*.5;let y=0;for(let _=0;_<j;_++)kr[_]>p&&y++;y>u?d=p:f=p}const g=(d+f)*.5,v=Math.max(.02,h-g);for(let m=0;m<lt;m++)for(let p=0;p<R;p++){const y=m*R+p,_=Wt[y];if(_<0){i.terrain[y]=ji[y]<=2?ne.Sand:ne.Dirt,i.tree[y]=0;continue}let x=0;for(let b=0;b<4;b++){const S=p+Ni[b],D=m+Fi[b];if(S<0||D<0||S>=R||D>=lt)continue;const k=Wt[D*R+S];if(k<0)continue;const U=k>_?k-_:_-k;U>x&&(x=U)}const T=bt(p,m,7)<.4?2:1;let M;_>=a?M=ne.Snow:x>=2||_>=l?M=ne.Rock:ji[y]<=T&&_<=on+2?M=ne.Sand:x>=1&&s.fbm(p*.085,m*.085,2)>.34?M=ne.Dirt:M=ne.Grass;let w=(kr[y]-g)/v*3.6+.45;kr[y]<=g&&(w=0),w>0&&(w*=se((a-_)/5),M===ne.Sand?w*=.3:M===ne.Rock?w*=.35:M===ne.Snow&&(w=0),x>=2&&(w*=.5));const E=w<=.2?0:w>3?3:Math.round(w);i.tree[y]=E,E>0&&(M===ne.Grass||M===ne.Dirt)&&(M=ne.Forest),i.terrain[y]=M}}function D0(i){i.zone.fill(0),i.road.fill(0),i.rail.fill(0),i.building.fill(0),i.originOffset.fill(0),i.level.fill(0),i.variant.fill(0),i.rotation.fill(0),i.age.fill(0),i.condition.fill(0),i.powered.fill(0),i.watered.fill(0),i.roadNet.fill(0),i.population.fill(0),i.jobs.fill(0),i.landValue.fill(0),i.pollution.fill(0),i.noise.fill(0),i.crime.fill(0),i.fireRisk.fill(0),i.traffic.fill(0),i.desirability.fill(0),i.covPolice.fill(0),i.covFire.fill(0),i.covHealth.fill(0),i.covEducation.fill(0),i.covPark.fill(0),i.covTransit.fill(0),i.onFire.fill(0)}function Vd(i,t){const e=t.seed|0;let n=M0(t.shape,se(t.water)),s=se(t.hills),r=v0;for(let o=0;o<5;o++){w0(t,is(e+o*7919|0)),S0(s,b0(n),e);const a=E0(),l=Math.min(Math.round(r*j),Math.round(a.size*.94));if(T0(a,l,e),Vh(),A0(),Vh(),P0()>=_0+.015)break;r=Math.min(.68,r+.06),o>=1&&(s*=.8),o>=2&&(n*=.7)}C0(),R0(e),D0(i),y0(i),L0(i,t),i.markAllDirty()}const Ga=new Uint8Array(j),La=(i,t)=>Math.round(i.height[t]/nn);function Wd(i,t,e,n,s){const r=t>0?t-1:0,o=e>0?e-1:0,a=n<R-1?n+1:R-1,l=s<lt-1?s+1:lt-1;for(let c=o;c<=l;c++)for(let h=r;h<=a;h++){const u=c*R+h,d=La(i,u);Wt[u]=d,Yi[u]=d,Ga[u]=0}}function Xd(i,t,e,n){for(let s=0;s<32;s++){let r=!1;for(let o=t;o<=n;o++)for(let a=i;a<=e;a++){const l=o*R+a;if(Ga[l]||Wt[l]<0)continue;let c=32767,h=-32768;for(let d=0;d<4;d++){const f=a+Ni[d],g=o+Fi[d];if(f<0||g<0||f>=R||g>=lt)continue;const v=Wt[g*R+f];v<0||(v<c&&(c=v),v>h&&(h=v))}if(c===32767)continue;let u=Wt[l];u<h-Qr&&(u=h-Qr),u>c+Qr&&(u=c+Qr),u>li&&(u=li),u<on&&(u=on),u!==Wt[l]&&(Wt[l]=u,r=!0)}if(!r)break}}function qd(i,t,e,n,s){let r=on;for(let l=0;l<j;l++){const c=Math.round(i.height[l]/nn);c>r&&(r=c)}const o=Math.max(11,Math.round(r*.76)),a=Math.max(6,Math.round(r*.52));for(let l=e;l<=s;l++)for(let c=t;c<=n;c++){const h=l*R+c;if(i.water[h]){i.terrain[h]=ne.Sand,i.tree[h]=0;continue}const u=La(i,h);let d=0,f=!1;for(let v=-2;v<=2;v++)for(let m=-2;m<=2;m++){const p=c+m,y=l+v;if(p<0||y<0||p>=R||y>=lt)continue;const _=y*R+p;if(i.water[_]){m*m+v*v<=2&&(f=!0);continue}if(m*m+v*v>1)continue;const x=Math.abs(La(i,_)-u);x>d&&(d=x)}let g;u>=o?g=ne.Snow:d>=2||u>=a?g=ne.Rock:f&&u<=on+2?g=ne.Sand:g=ne.Grass,i.tree[h]>0&&(g===ne.Grass||g===ne.Dirt)&&(g=ne.Forest),i.terrain[h]=g}}function Yd(i,t,e,n,s){let r=0;for(let o=e;o<=s;o++)for(let a=t;a<=n;a++){const l=o*R+a;Wt[l]!==Yi[l]&&(i.height[l]=Gd(Wt[l]),i.water[l]=Wt[l]<0?1:0,i.tree[l]=0,i.markDirty(a,o),r++)}return r}function I0(i,t,e,n,s,r){if(!zt(t,e))return 0;const o=0,a=o+10,l=Math.max(0,t-a),c=Math.max(0,e-a),h=Math.min(R-1,t+a),u=Math.min(lt-1,e+a);Wd(i,l,c,h,u);const d=(o+.35)*(o+.35);let f=Wt[dt(t,e)];s==="level"&&r!==void 0&&(f=x0(r));for(let v=-o;v<=o;v++)for(let m=-o;m<=o;m++){if(m*m+v*v>d)continue;const p=t+m,y=e+v;if(!zt(p,y))continue;const _=y*R+p;let x=s==="raise"?Wt[_]+1:s==="lower"?Wt[_]-1:f;x>li&&(x=li),x<Ra&&(x=Ra),Wt[_]=x,Ga[_]=1}Xd(l,c,h,u);const g=Yd(i,l,c,h,u);return g>0&&qd(i,Math.max(0,l-2),Math.max(0,c-2),Math.min(R-1,h+2),Math.min(lt-1,u+2)),g}function U0(i,t,e,n,s){if(n<=0||s<=0||!zt(t,e)||!zt(t+n-1,e+s-1))return!1;let r=0,o=32767,a=-32768;for(let v=0;v<s;v++)for(let m=0;m<n;m++){const p=(e+v)*R+(t+m);if(i.water[p])return!1;const y=La(i,p);r+=y,y<o&&(o=y),y>a&&(a=y)}if(a-o>8)return!1;if(a===o)return!0;let l=Math.round(r/(n*s));l<on&&(l=on),l>li&&(l=li);const c=12,h=Math.max(0,t-c),u=Math.max(0,e-c),d=Math.min(R-1,t+n-1+c),f=Math.min(lt-1,e+s-1+c);Wd(i,h,u,d,f);for(let v=0;v<s;v++)for(let m=0;m<n;m++){const p=(e+v)*R+(t+m);Wt[p]=l,Ga[p]=1}return Xd(h,u,d,f),Yd(i,h,u,d,f)>0&&qd(i,Math.max(0,h-2),Math.max(0,u-2),Math.min(R-1,d+2),Math.min(lt-1,f+2)),!0}const ts=[];function _t(i){const t={id:ts.length,w:1,h:1,cost:0,upkeep:0,grown:!1,residents:0,jobs:0,power:0,powerOut:0,water:0,waterOut:0,pollution:0,noise:0,...i};return ts.push(t),t}_t({key:"empty",name:"—",category:"special",archetype:"rubble"});const N0=[["rl1","Cabin",4,0,12,10322792,1.6],["rl2","Family Home",9,20,30,14207924,2.1],["rl3","Suburban House",14,45,60,15261900,2.6],["rl4","Big House",20,90,105,15788760,3.2],["rl5","Estate",28,150,160,16446692,3.8]];N0.forEach(([i,t,e,n,s,r,o],a)=>_t({key:i,name:t,category:"residential",archetype:(a<2,"house"),grown:!0,zone:Yt.ResLow,level:a+1,residents:e,power:.6+a*.35,water:.5+a*.3,pollution:4,noise:6,minLandValue:n,height:o,palette:[r,9132604,7294519],upkeep:0}));const F0=[["rm1","Duplex",22,30,1322e4,3.4],["rm2","Row Houses",40,55,13942696,4.2],["rm3","Low Apartments",70,80,12629934,6],["rm4","Apartment Block",115,110,12169899,8.5],["rm5","Condominium",170,150,14276047,11]];F0.forEach(([i,t,e,n,s,r],o)=>_t({key:i,name:t,category:"residential",archetype:o<2?"rowhouse":"apartment",grown:!0,zone:Yt.ResMed,level:o+1,residents:e,power:2.2+o*1.4,water:2+o*1.2,pollution:6,noise:14,minLandValue:n,height:r,palette:[s,8219485,4868690]}));const k0=[["rh1","Apartment Tower",240,90,10465476,16],["rh2","High-Rise",380,120,9413819,24],["rh3","Residential Tower",560,150,8362164,33],["rh4","Luxury Tower",780,185,10993110,44],["rh5","Sky Residence",1100,215,12769002,60]];k0.forEach(([i,t,e,n,s,r],o)=>_t({key:i,name:t,category:"residential",archetype:o<1?"apartment":o<4?"tower":"skyscraper",grown:!0,zone:Yt.ResHigh,level:o+1,residents:e,power:8+o*6,water:7+o*5,pollution:8,noise:22,minLandValue:n,height:r,palette:[s,5991037,3028802]}));const O0=[["cl1","Corner Store",6,0,14731686,2.6],["cl2","Shopfront",14,30,15258800,3.4],["cl3","Strip Mall",28,60,14469550,4.2],["cl4","Retail Block",48,95,13680548,6.5],["cl5","Department Store",80,135,13154462,9]];O0.forEach(([i,t,e,n,s,r],o)=>_t({key:i,name:t,category:"commercial",archetype:o<3?"shop":"mall",grown:!0,zone:Yt.ComLow,level:o+1,jobs:e,power:1.6+o*1.5,water:1+o*.9,pollution:8,noise:24,minLandValue:n,height:r,palette:[s,11557450,4152182]}));const B0=[["ch1","Small Office",45,70,10139337,12],["ch2","Office Block",110,105,8824767,20],["ch3","Office Tower",220,140,7312819,32],["ch4","Corporate Tower",400,175,6064301,48],["ch5","Skyscraper",700,210,5210024,72]];B0.forEach(([i,t,e,n,s,r],o)=>_t({key:i,name:t,category:"commercial",archetype:o<2?"office":"skyscraper",grown:!0,zone:Yt.ComHigh,level:o+1,jobs:e,power:7+o*7,water:4+o*4,pollution:10,noise:30,minLandValue:n,height:r,palette:[s,2837091,1715002]}));_t({key:"ia1",name:"Smallholding",category:"industrial",archetype:"farm",grown:!0,zone:Yt.IndAgri,level:1,jobs:8,power:.8,water:3,pollution:10,noise:8,height:1.8,palette:[13215850,8032074,9136957]});_t({key:"ia2",name:"Farm",category:"industrial",archetype:"farm",grown:!0,zone:Yt.IndAgri,level:2,jobs:16,power:1.4,water:6,pollution:16,noise:10,height:2.4,palette:[11879215,9083730,9136957]});_t({key:"ia3",name:"Agri Estate",category:"industrial",archetype:"farm",grown:!0,zone:Yt.IndAgri,level:3,jobs:26,power:2.2,water:10,pollution:24,noise:12,height:3,palette:[10500650,9806940,8018996]});_t({key:"il1",name:"Workshop",category:"industrial",archetype:"workshop",grown:!0,zone:Yt.IndLight,level:1,jobs:20,power:2.5,water:1.5,pollution:30,noise:40,height:3.2,palette:[12103844,8156007,5920850]});_t({key:"il2",name:"Light Factory",category:"industrial",archetype:"factory",grown:!0,zone:Yt.IndLight,level:2,jobs:45,power:5,water:3,pollution:45,noise:55,height:4.5,palette:[11052186,7301728,5065542]});_t({key:"il3",name:"Industrial Park",category:"industrial",archetype:"warehouse",grown:!0,zone:Yt.IndLight,level:3,jobs:80,power:9,water:5,pollution:52,noise:62,height:5.2,palette:[10462118,6777968,4540491]});_t({key:"il4",name:"Technology Plant",category:"industrial",archetype:"factory",grown:!0,zone:Yt.IndLight,level:4,jobs:130,power:16,water:8,pollution:34,noise:48,height:6.5,palette:[13686490,9412781,4872032]});_t({key:"ih1",name:"Factory",category:"industrial",archetype:"factory",grown:!0,zone:Yt.IndHeavy,level:1,jobs:55,power:8,water:6,pollution:90,noise:80,height:5,palette:[10326406,7037272,4143669]});_t({key:"ih2",name:"Heavy Factory",category:"industrial",archetype:"factory",grown:!0,zone:Yt.IndHeavy,level:2,jobs:95,power:15,water:11,pollution:130,noise:95,height:6.5,palette:[9339768,6248014,3814703]});_t({key:"ih3",name:"Refinery",category:"industrial",archetype:"refinery",grown:!0,zone:Yt.IndHeavy,level:3,jobs:150,power:26,water:20,pollution:185,noise:110,height:8,palette:[11581112,8028291,5001298]});_t({key:"ih4",name:"Steelworks",category:"industrial",archetype:"refinery",grown:!0,zone:Yt.IndHeavy,level:4,jobs:220,power:40,water:30,pollution:230,noise:130,height:9.5,palette:[9071450,6113855,3551275]});_t({key:"p_wind",name:"Wind Turbine",category:"power",archetype:"windturbine",w:1,h:1,cost:4500,upkeep:40,powerOut:12,pollution:0,noise:20,height:5.5,desc:"Clean but modest output. Better on hills."});_t({key:"p_solar",name:"Solar Farm",category:"power",archetype:"solarfarm",w:3,h:3,cost:22e3,upkeep:180,powerOut:95,pollution:0,noise:0,height:1,needsFlat:!0,unlockPop:500,desc:"Silent, clean, needs a lot of flat land."});_t({key:"p_coal",name:"Coal Plant",category:"power",archetype:"powerplant",w:4,h:4,cost:16e3,upkeep:420,powerOut:320,pollution:250,noise:120,height:9,needsFlat:!0,desc:"Cheap power. Filthy."});_t({key:"p_gas",name:"Gas Plant",category:"power",archetype:"powerplant",w:4,h:4,cost:3e4,upkeep:560,powerOut:480,pollution:120,noise:90,height:8,needsFlat:!0,unlockPop:2e3,desc:"Cleaner than coal, pricier."});_t({key:"p_hydro",name:"Hydro Dam",category:"power",archetype:"powerplant",w:2,h:2,cost:2e4,upkeep:240,powerOut:220,pollution:0,noise:30,needsWater:!0,height:6,unlockPop:1e3,desc:"Clean shoreline power."});_t({key:"p_oil",name:"Oil Plant",category:"power",archetype:"powerplant",w:4,h:4,cost:22e3,upkeep:500,powerOut:400,pollution:190,noise:100,height:9,needsFlat:!0,unlockPop:1e3,desc:"More power than coal, almost as dirty."});_t({key:"p_nuclear",name:"Nuclear Plant",category:"power",archetype:"powerplant",w:4,h:4,cost:12e4,upkeep:1900,powerOut:1800,pollution:30,noise:60,height:12,needsFlat:!0,unlockPop:3e4,desc:"Enormous output. Meltdown risk if underfunded."});_t({key:"p_microwave",name:"Microwave Receiver",category:"power",archetype:"powerplant",w:4,h:4,cost:2e5,upkeep:2800,powerOut:3200,pollution:0,noise:30,height:13,needsFlat:!0,unlockPop:45e3,desc:"Beamed from orbit. Mostly hits the dish."});_t({key:"p_fusion",name:"Fusion Reactor",category:"power",archetype:"powerplant",w:5,h:5,cost:42e4,upkeep:5200,powerOut:6500,pollution:0,noise:40,height:16,needsFlat:!0,unlockPop:8e4,desc:"The future, today."});_t({key:"w_pump",name:"Water Pump",category:"water",archetype:"watertower",w:2,h:2,cost:3e3,upkeep:60,waterOut:90,power:2,needsWater:!0,height:3.5,desc:"Must be built beside fresh water."});_t({key:"w_tower",name:"Water Tower",category:"water",archetype:"watertower",w:2,h:2,cost:6e3,upkeep:90,waterOut:160,power:3,height:9,desc:"Works anywhere. Costlier per unit."});_t({key:"w_treat",name:"Treatment Plant",category:"water",archetype:"civic",w:3,h:3,cost:24e3,upkeep:300,waterOut:520,power:12,pollution:40,height:4,needsFlat:!0,unlockPop:5e3,desc:"Big supply, mild pollution."});_t({key:"w_desal",name:"Desalination Plant",category:"water",archetype:"civic",w:4,h:4,cost:9e4,upkeep:900,waterOut:1600,power:45,needsWater:!0,height:6,unlockPop:3e4,desc:"Coastal. Vast supply, thirsty for power."});_t({key:"s_police",name:"Police Station",category:"safety",archetype:"civic",w:2,h:2,cost:5e3,upkeep:220,power:2,water:1.5,jobs:20,service:{kind:"police",radius:16,strength:200},height:4,desc:"Cuts crime nearby."});_t({key:"s_police_hq",name:"Police Headquarters",category:"safety",archetype:"civic",w:3,h:3,cost:22e3,upkeep:700,power:6,water:4,jobs:70,service:{kind:"police",radius:30,strength:255},height:8,unlockPop:1e4,desc:"City-wide deterrence."});_t({key:"s_fire",name:"Fire Station",category:"safety",archetype:"civic",w:2,h:2,cost:5500,upkeep:240,power:2,water:3,jobs:22,service:{kind:"fire",radius:16,strength:200},height:4,desc:"Fights fires in range."});_t({key:"s_fire_hq",name:"Fire Headquarters",category:"safety",archetype:"civic",w:3,h:3,cost:24e3,upkeep:760,power:6,water:8,jobs:75,service:{kind:"fire",radius:30,strength:255},height:8,unlockPop:1e4});_t({key:"s_prison",name:"Prison",category:"safety",archetype:"civic",w:4,h:4,cost:3e4,upkeep:1100,power:10,water:12,jobs:90,pollution:20,noise:60,service:{kind:"police",radius:44,strength:140},height:6,unlockPop:8e3,desc:"Boosts police effect citywide, sours the neighbourhood."});_t({key:"h_clinic",name:"Clinic",category:"health",archetype:"hospital",w:2,h:2,cost:6e3,upkeep:260,power:3,water:4,jobs:25,service:{kind:"health",radius:15,strength:180},height:4.5,unlockPop:300});_t({key:"h_hospital",name:"Hospital",category:"health",archetype:"hospital",w:3,h:3,cost:26e3,upkeep:900,power:12,water:14,jobs:120,service:{kind:"health",radius:28,strength:240},height:10,unlockPop:3e3});_t({key:"h_medcenter",name:"Medical Centre",category:"health",archetype:"hospital",w:4,h:4,cost:85e3,upkeep:2400,power:30,water:34,jobs:320,service:{kind:"health",radius:44,strength:255},beauty:{radius:12,strength:30},height:16,unlockPop:25e3});_t({key:"e_school",name:"Elementary School",category:"education",archetype:"school",w:3,h:2,cost:7e3,upkeep:300,power:3,water:4,jobs:30,service:{kind:"education",radius:16,strength:190,tier:1},height:4,unlockPop:300});_t({key:"e_high",name:"High School",category:"education",archetype:"school",w:3,h:3,cost:18e3,upkeep:640,power:7,water:8,jobs:70,service:{kind:"education",radius:22,strength:220,tier:1},height:5.5,unlockPop:2e3});_t({key:"e_library",name:"Library",category:"education",archetype:"civic",w:2,h:2,cost:6500,upkeep:200,power:2,water:1.5,jobs:14,service:{kind:"education",radius:18,strength:120,tier:1},beauty:{radius:8,strength:25},height:5,unlockPop:800});_t({key:"e_college",name:"Community College",category:"education",archetype:"university",w:4,h:4,cost:45e3,upkeep:1500,power:16,water:18,jobs:190,service:{kind:"education",radius:34,strength:240,tier:2},beauty:{radius:14,strength:30},height:8,unlockPop:1e4});_t({key:"e_university",name:"University",category:"education",archetype:"university",w:5,h:5,cost:13e4,upkeep:3600,power:38,water:42,jobs:480,service:{kind:"education",radius:48,strength:255,tier:3},beauty:{radius:20,strength:45},height:11,unlockPop:3e4});_t({key:"e_museum",name:"Museum",category:"education",archetype:"landmark",w:3,h:3,cost:38e3,upkeep:900,power:8,water:6,jobs:60,service:{kind:"education",radius:20,strength:140,tier:2},beauty:{radius:22,strength:70},height:9,unlockPop:15e3});_t({key:"l_park",name:"Small Park",category:"leisure",archetype:"park",w:1,h:1,cost:200,upkeep:6,water:.4,service:{kind:"park",radius:8,strength:110},beauty:{radius:8,strength:40},height:.3});_t({key:"l_fountain",name:"Fountain Square",category:"leisure",archetype:"plaza",w:2,h:2,cost:1800,upkeep:30,water:2,service:{kind:"park",radius:12,strength:150},beauty:{radius:14,strength:70},height:.8,unlockPop:500});_t({key:"l_bigpark",name:"City Park",category:"leisure",archetype:"park",w:3,h:3,cost:6500,upkeep:120,water:5,service:{kind:"park",radius:20,strength:200},beauty:{radius:22,strength:90},height:.5,unlockPop:1500});_t({key:"l_sports",name:"Sports Field",category:"leisure",archetype:"park",w:3,h:3,cost:9e3,upkeep:180,power:3,water:8,jobs:12,service:{kind:"park",radius:18,strength:190},beauty:{radius:12,strength:50},height:1.2,unlockPop:3e3});_t({key:"l_marina",name:"Marina",category:"leisure",archetype:"port",w:3,h:3,cost:26e3,upkeep:420,power:5,water:3,jobs:45,needsWater:!0,service:{kind:"park",radius:18,strength:160},beauty:{radius:24,strength:110},height:2.5,unlockPop:8e3});_t({key:"l_stadium",name:"Stadium",category:"leisure",archetype:"stadium",w:5,h:5,cost:11e4,upkeep:2400,power:40,water:30,jobs:300,service:{kind:"park",radius:30,strength:210},beauty:{radius:30,strength:120},height:14,unlockPop:1e4});_t({key:"l_zoo",name:"Zoo",category:"leisure",archetype:"park",w:4,h:4,cost:62e3,upkeep:1400,power:14,water:26,jobs:160,service:{kind:"park",radius:26,strength:220},beauty:{radius:26,strength:110},height:3,unlockPop:15e3});_t({key:"t_bus",name:"Bus Depot",category:"transport",archetype:"transit",w:2,h:2,cost:8e3,upkeep:320,power:4,water:2,jobs:40,service:{kind:"transit",radius:22,strength:190},height:3.5,unlockPop:2e3,desc:"Cuts traffic in range."});_t({key:"t_train",name:"Train Station",category:"transport",archetype:"transit",w:3,h:3,cost:34e3,upkeep:900,power:12,water:6,jobs:110,service:{kind:"transit",radius:36,strength:240},beauty:{radius:10,strength:30},height:7,unlockPop:1e4,desc:"Best built on a rail line."});_t({key:"t_subway",name:"Subway Station",category:"transport",archetype:"transit",w:2,h:2,cost:15e3,upkeep:480,power:8,water:2,jobs:35,service:{kind:"transit",radius:26,strength:230},height:1.2,unlockPop:5e3,desc:"Connects the surface to subway tunnels below."});_t({key:"t_port",name:"Seaport",category:"transport",archetype:"port",w:4,h:4,cost:7e4,upkeep:1600,power:26,water:12,jobs:420,pollution:90,noise:110,needsWater:!0,height:6,unlockPop:15e3,desc:"Huge industrial demand boost."});_t({key:"t_airport",name:"Airport",category:"transport",archetype:"airport",w:7,h:5,cost:26e4,upkeep:5200,power:90,water:60,jobs:900,pollution:120,noise:200,needsFlat:!0,height:6,unlockPop:8e4,desc:"Massive commercial demand boost."});_t({key:"x_cityhall",name:"City Hall",category:"special",archetype:"landmark",w:3,h:3,cost:2e4,upkeep:500,power:6,water:5,jobs:80,beauty:{radius:26,strength:90},height:12,desc:"Boosts land value and approval."});_t({key:"x_statue",name:"Statue",category:"special",archetype:"landmark",w:1,h:1,cost:3500,upkeep:20,beauty:{radius:14,strength:80},height:5,unlockPop:1e3});_t({key:"x_observatory",name:"Observatory",category:"special",archetype:"landmark",w:3,h:3,cost:55e3,upkeep:1100,power:10,water:4,jobs:60,beauty:{radius:28,strength:120},service:{kind:"education",radius:24,strength:130,tier:2},height:13,unlockPop:25e3});_t({key:"x_tower",name:"Skyline Tower",category:"special",archetype:"landmark",w:3,h:3,cost:3e5,upkeep:4e3,power:40,water:20,jobs:240,beauty:{radius:60,strength:200},height:95,unlockPop:8e4,desc:"The monument that names your city."});_t({key:"x_casino",name:"Casino Resort",category:"special",archetype:"landmark",w:4,h:4,cost:15e4,upkeep:2600,power:45,water:30,jobs:600,beauty:{radius:20,strength:60},height:30,unlockPop:4e4,desc:"Money and crime, in equal measure."});_t({key:"x_mayor",name:"Mayor's House",category:"special",archetype:"house",w:2,h:2,cost:0,upkeep:0,residents:4,power:1,water:1,beauty:{radius:16,strength:60},height:4.5,desc:"A grateful city builds its mayor a home."});_t({key:"x_llama",name:"Llama Dome",category:"special",archetype:"landmark",w:3,h:3,cost:0,upkeep:120,power:6,water:4,jobs:30,beauty:{radius:30,strength:130},service:{kind:"park",radius:24,strength:220},height:10,desc:"The llamas demanded it. Attendance is mandatory fun."});_t({key:"x_military",name:"Military Base",category:"special",archetype:"warehouse",w:5,h:5,cost:0,upkeep:0,jobs:350,power:20,water:15,pollution:60,noise:160,service:{kind:"police",radius:36,strength:120},height:5,desc:"Jobs and order. Also artillery practice at 6am."});_t({key:"arco_plymouth",name:"Plymouth Arco",category:"special",archetype:"landmark",w:4,h:4,cost:1e5,upkeep:3e3,residents:8e3,jobs:2e3,power:120,water:110,pollution:40,noise:40,height:40,unlockPop:12e4,desc:"A city in a bottle — 8,000 souls."});_t({key:"arco_forest",name:"Forest Arco",category:"special",archetype:"landmark",w:4,h:4,cost:15e4,upkeep:3800,residents:12e3,jobs:3e3,power:90,water:140,pollution:0,noise:20,beauty:{radius:20,strength:80},height:46,unlockPop:12e4,desc:"Green terraces to the sky."});_t({key:"arco_darco",name:"Darco Arco",category:"special",archetype:"landmark",w:4,h:4,cost:22e4,upkeep:4600,residents:2e4,jobs:4500,power:160,water:180,pollution:80,noise:60,height:52,unlockPop:15e4,desc:"The dark hive. Rent is cheap."});_t({key:"arco_launch",name:"Launch Arco",category:"special",archetype:"landmark",w:5,h:5,cost:4e5,upkeep:6500,residents:3e4,jobs:8e3,power:300,water:260,pollution:30,noise:80,height:65,unlockPop:2e5,desc:"Destination: elsewhere. Countdown pending."});const mr=ts,ec=Object.fromEntries(ts.map(i=>[i.key,i])),z0=(()=>{var t;const i={};for(const e of ts)!e.grown||e.zone===void 0||(i[t=e.zone]||(i[t]=[])).push(e);for(const e in i)i[e].sort((n,s)=>(n.level??0)-(s.level??0));return i})(),H0=ts.filter(i=>!i.grown&&i.id!==0);function we(i){return ts[i]??ts[0]}const Ge=new Int32Array(j),yn=new Uint8Array(j),ue=new Uint8Array(j),So=new Uint8Array(j),Hn=new Int32Array(j),Br=new Uint8Array(j),Eo=new Uint8Array(j),Is=new Uint32Array(j),nc=new WeakMap;function ic(i){const t=i.road,e=i.roadNet;e.fill(0);let n=0,s=0,r=0;for(let o=0;o<j;o++){if(!t[o]||e[o])continue;n++;let a=0,l=0;Ge[l++]=o,e[o]=n;let c=0;for(;a<l;){const h=Ge[a++];c++;const u=h%R;u>0&&t[h-1]&&!e[h-1]&&(e[h-1]=n,Ge[l++]=h-1),u<R-1&&t[h+1]&&!e[h+1]&&(e[h+1]=n,Ge[l++]=h+1),h>=R&&t[h-R]&&!e[h-R]&&(e[h-R]=n,Ge[l++]=h-R),h<j-R&&t[h+R]&&!e[h+R]&&(e[h+R]=n,Ge[l++]=h+R)}c>r&&(r=c,s=n)}nc.set(i,s)}function Wh(i,t,e){let n=nc.get(i);if(n===void 0&&(ic(i),n=nc.get(i)??0),!n)return!1;const s=i.roadNet,r=t-3<0?0:t-3,o=t+3>=R?R-1:t+3,a=e-3<0?0:e-3,l=e+3>=lt?lt-1:e+3;for(let c=a;c<=l;c++){const h=c*R;for(let u=r;u<=o;u++)if(s[h+u]===n)return!0}return!1}function Xh(i,t,e,n){const s=i.building;for(let r=0;r<t;r++){const o=Hn[r],a=we(s[o]),l=e[r],c=o%R,h=o/R|0,u=Math.min(c+a.w,R),d=Math.min(h+a.h,lt);for(let f=h;f<d;f++)for(let g=c;g<u;g++)n[f*R+g]=l}}function qh(i){const t=i.grid,e=t.building,n=i.stats;let s=0;for(let M=0;M<j;M++)e[M]&&t.originOffset[M]===0&&(Hn[s++]=M);let r=0,o=0,a=0,l=0;const c=i.deals;for(let M=0;M<c.length;M++){const w=c[M];w.active&&(w.kind==="buy_power"?r+=w.amount:w.kind==="sell_power"?o+=w.amount:w.kind==="buy_water"?a+=w.amount:w.kind==="sell_water"&&(l+=w.amount))}for(let M=0;M<j;M++)yn[M]=t.road[M]||t.wire[M]||t.tunnel[M]||e[M]?1:0;ue.fill(0);let h=0,u=0,d=0,f=0;for(let M=0;M<s;M++){const w=Hn[M],E=we(e[w]);if(d+=E.power,E.powerOut>0){f+=E.powerOut;const b=w%R,S=w/R|0,D=Math.min(b+E.w,R),k=Math.min(S+E.h,lt);for(let U=S;U<k;U++)for(let z=b;z<D;z++){const W=U*R+z;ue[W]||(ue[W]=1,Ge[u++]=W)}}}for(;h<u;){const M=Ge[h++],w=M%R;w>0&&yn[M-1]&&!ue[M-1]&&(ue[M-1]=1,Ge[u++]=M-1),w<R-1&&yn[M+1]&&!ue[M+1]&&(ue[M+1]=1,Ge[u++]=M+1),M>=R&&yn[M-R]&&!ue[M-R]&&(ue[M-R]=1,Ge[u++]=M-R),M<j-R&&yn[M+R]&&!ue[M+R]&&(ue[M+R]=1,Ge[u++]=M+R)}const g=Math.max(0,f+r-o);let v=0;for(let M=0;M<s;M++){const w=Hn[M],E=we(e[w]);let b=E.powerOut>0?1:0;if(!b){const S=w%R,D=w/R|0,k=Math.min(S+E.w,R),U=Math.min(D+E.h,lt);t:for(let z=D;z<U;z++)for(let W=S;W<k;W++)if(ue[z*R+W]){b=1;break t}}Br[M]=b,b&&(v+=E.power)}if(v>g){let M=0;for(let E=0;E<s;E++){if(!Br[E])continue;const b=we(e[Hn[E]]);b.power<=0||b.powerOut>0||(Is[M++]=t.landValue[Hn[E]]<<14|E)}Is.subarray(0,M).sort();let w=v-g;for(let E=0;E<M&&w>0;E++){const b=Is[E]&16383;Br[b]=0,w-=we(e[Hn[b]]).power}}const m=t.powered;for(let M=0;M<lt;M++){const w=M*R;for(let E=0;E<R;E++){let b=0;const S=E-3<0?0:E-3,D=E+3>=R?R-1:E+3;for(let k=S;k<=D;k++)if(ue[w+k]){b=1;break}So[w+E]=b}}for(let M=0;M<lt;M++)for(let w=0;w<R;w++){let E=0;const b=M-3<0?0:M-3,S=M+3>=lt?lt-1:M+3;for(let D=b;D<=S;D++)if(So[D*R+w]){E=1;break}m[M*R+w]=E}Xh(t,s,Br,m);for(let M=0;M<j;M++)yn[M]=t.pipe[M]||t.road[M]||t.tunnel[M]?1:0;ue.fill(0),h=0,u=0;let p=0,y=0;for(let M=0;M<s;M++){const w=Hn[M],E=we(e[w]);if(p+=E.water,E.waterOut>0&&Br[M]){y+=E.waterOut;const b=w%R,S=w/R|0,D=Math.min(b+E.w,R),k=Math.min(S+E.h,lt);for(let U=S;U<k;U++)for(let z=b;z<D;z++){const W=U*R+z;yn[W]&&!ue[W]&&(ue[W]=1,Ge[u++]=W),z>0&&yn[W-1]&&!ue[W-1]&&(ue[W-1]=1,Ge[u++]=W-1),z<R-1&&yn[W+1]&&!ue[W+1]&&(ue[W+1]=1,Ge[u++]=W+1),U>0&&yn[W-R]&&!ue[W-R]&&(ue[W-R]=1,Ge[u++]=W-R),U<lt-1&&yn[W+R]&&!ue[W+R]&&(ue[W+R]=1,Ge[u++]=W+R)}}}for(;h<u;){const M=Ge[h++],w=M%R;w>0&&yn[M-1]&&!ue[M-1]&&(ue[M-1]=1,Ge[u++]=M-1),w<R-1&&yn[M+1]&&!ue[M+1]&&(ue[M+1]=1,Ge[u++]=M+1),M>=R&&yn[M-R]&&!ue[M-R]&&(ue[M-R]=1,Ge[u++]=M-R),M<j-R&&yn[M+R]&&!ue[M+R]&&(ue[M+R]=1,Ge[u++]=M+R)}for(let M=0;M<lt;M++){const w=M*R;for(let E=0;E<R;E++){let b=0;const S=E-4<0?0:E-4,D=E+4>=R?R-1:E+4;for(let k=S;k<=D;k++)if(ue[w+k]){b=1;break}So[w+E]=b}}const _=t.watered;for(let M=0;M<lt;M++){const w=M*R,E=M-4<0?0:M-4,b=M+4>=lt?lt-1:M+4;for(let S=0;S<R;S++){let D=0;for(let k=E;k<=b;k++)if(So[k*R+S]){D=1;break}_[w+S]=D}}const x=Math.max(0,y+a-l);let T=0;for(let M=0;M<s;M++){const w=Hn[M],E=we(e[w]);let b=E.waterOut>0?1:0;if(!b){const S=w%R,D=w/R|0,k=Math.min(S+E.w,R),U=Math.min(D+E.h,lt);t:for(let z=D;z<U;z++)for(let W=S;W<k;W++)if(_[z*R+W]){b=1;break t}}Eo[M]=b,b&&(T+=E.water)}if(T>x){let M=0;for(let E=0;E<s;E++){if(!Eo[E])continue;const b=we(e[Hn[E]]);b.water<=0||b.waterOut>0||(Is[M++]=t.landValue[Hn[E]]<<14|E)}Is.subarray(0,M).sort();let w=T-x;for(let E=0;E<M&&w>0;E++){const b=Is[E]&16383;Eo[b]=0,w-=we(e[Hn[b]]).water}}Xh(t,s,Eo,_),n.powerDemand=d,n.powerSupply=g,n.waterDemand=p,n.waterSupply=x}const Yh=ec.t_subway.id,pn=new Uint16Array(j),Us=new Int32Array(j),Qa=new Uint16Array(j/2+2),no=new Int32Array(16);function G0(i){const t=i.subway;pn.fill(0);let e=0;for(let n=0;n<j;n++){if(!t[n]||pn[n])continue;e++;let s=0,r=0;for(Us[r++]=n,pn[n]=e;s<r;){const o=Us[s++],a=o%R;a>0&&t[o-1]&&!pn[o-1]&&(pn[o-1]=e,Us[r++]=o-1),a<R-1&&t[o+1]&&!pn[o+1]&&(pn[o+1]=e,Us[r++]=o+1),o>=R&&t[o-R]&&!pn[o-R]&&(pn[o-R]=e,Us[r++]=o-R),o<j-R&&t[o+R]&&!pn[o+R]&&(pn[o+R]=e,Us[r++]=o+R)}}return e}function zr(i,t){if(!i||t>=no.length)return t;for(let e=0;e<t;e++)if(no[e]===i)return t;return no[t]=i,t+1}function $h(i,t,e){let n=0;const s=i%R,r=i/R|0,o=Math.min(s+t,R),a=Math.min(r+e,lt);for(let l=r;l<a;l++)for(let c=s;c<o;c++){const h=l*R+c;n=zr(pn[h],n),c>0&&(n=zr(pn[h-1],n)),c<R-1&&(n=zr(pn[h+1],n)),l>0&&(n=zr(pn[h-R],n)),l<lt-1&&(n=zr(pn[h+R],n))}return n}function V0(i,t,e,n,s){const r=Math.max(0,Math.ceil(t-n)),o=Math.min(R-1,Math.floor(t+n)),a=Math.max(0,Math.ceil(e-n)),l=Math.min(lt-1,Math.floor(e+n)),c=1/n;for(let h=a;h<=l;h++){const u=h-e,d=h*R;for(let f=r;f<=o;f++){const g=f-t,v=Math.sqrt(g*g+u*u);if(v>=n)continue;const m=i[d+f]+s*(1-v*c);i[d+f]=m>255?255:m}}}function jh(i){const t=i.grid,e=i.budget;t.covPolice.fill(0),t.covFire.fill(0),t.covHealth.fill(0),t.covEducation.fill(0),t.covPark.fill(0),t.covTransit.fill(0);const n=G0(t);Qa.fill(0,0,n+1);for(let s=0;s<j;s++){if(t.building[s]!==Yh||t.originOffset[s]!==0)continue;const r=we(t.building[s]),o=$h(s,r.w,r.h);for(let a=0;a<o;a++)Qa[no[a]]++}for(let s=0;s<j;s++){const r=t.building[s];if(!r||t.originOffset[s]!==0)continue;const o=we(r),a=o.service;if(!a)continue;let l,c;switch(a.kind){case"police":l=t.covPolice,c=e.fundPolice;break;case"fire":l=t.covFire,c=e.fundFire;break;case"health":l=t.covHealth,c=e.fundHealth;break;case"education":l=t.covEducation,c=e.fundEducation;break;case"park":l=t.covPark,c=e.fundParks;break;default:l=t.covTransit,c=e.fundRoads;break}let h=a.strength*c;if(r===Yh){const f=$h(s,o.w,o.h);for(let g=0;g<f;g++)if(Qa[no[g]]>=2){h*=1.25;break}}if(h<=0)continue;const u=s%R,d=s/R|0;V0(l,u+o.w*.5-.5,d+o.h*.5-.5,a.radius,h)}}const Pn=new Float32Array(j),To=new Float32Array(j),va=new Float32Array(j),tl=new Float32Array(j),Zh=new Float32Array(j),Ao=new Float32Array(j);function Ns(i,t){for(let e=0;e<t;e++){for(let n=0;n<lt;n++){const s=n*R;let r=i[s];for(let o=0;o<R;o++){const a=i[s+o],l=o<R-1?i[s+o+1]:a;To[s+o]=(r+a+l)/3,r=a}}for(let n=0;n<R;n++){let s=To[n];for(let r=0;r<lt;r++){const o=r*R+n,a=To[o],l=r<lt-1?To[o+R]:a;i[o]=(s+a+l)/3,s=a}}}}function W0(i,t,e,n){const s=Math.max(0,Math.ceil(i-e)),r=Math.min(R-1,Math.floor(i+e)),o=Math.max(0,Math.ceil(t-e)),a=Math.min(lt-1,Math.floor(t+e)),l=1/e;for(let c=o;c<=a;c++){const h=c-t,u=c*R;for(let d=s;d<=r;d++){const f=d-i,g=Math.sqrt(f*f+h*h);g>=e||(va[u+d]+=n*(1-g*l))}}}function Kh(i){const t=i.grid,e=i.time.season===1,n=i.time.season===3;let s=!1,r=!1,o=!1,a=!1,l=!1;const c=i.ordinances;for(let _=0;_<c.length;_++){const x=c[_];x.active&&(x.key==="recycling"?s=!0:x.key==="smoke_detectors"?r=!0:x.key==="neighborhood_watch"?o=!0:x.key==="clean_air"?a=!0:x.key==="legalise_gambling"&&(l=!0))}for(let _=0;_<j;_++)tl[_]=t.water[_]?220:0;Ns(tl,3),va.fill(0);for(let _=0;_<j;_++){t.tree[_]&&(va[_]+=t.tree[_]*5);const x=t.building[_];if(!x||t.originOffset[_]!==0)continue;const T=we(x),M=T.beauty;M&&W0(_%R+T.w*.5-.5,(_/R|0)+T.h*.5-.5,M.radius,M.strength)}for(let _=0;_<j;_++){let x=0;const T=t.building[_];if(T){const M=we(T);x=M.pollution,a&&M.category==="industrial"&&(x*=.65)}s&&(x*=.85),x+=t.traffic[_]*.25,t.onFire[_]&&(x+=160),Pn[_]=x}Ns(Pn,3);const h=t.pollution;for(let _=0;_<j;_++){let x=Zh[_];h[_]>x&&(x=h[_]);const T=Pn[_];x>200?x=Math.max(T,x*.999):T>x?x=(x+T)*.5:x=x*.82+T*.18,x>340&&(x=340),Zh[_]=x,h[_]=x>255?255:x}for(let _=0;_<j;_++){let x=0;const T=t.building[_];T&&(x=we(T).noise);const M=t.road[_];M===Ue.Street?x+=16+t.traffic[_]*.4:M===Ue.Avenue?x+=30+t.traffic[_]*.45:M===Ue.Highway&&(x+=74+t.traffic[_]*.5),t.rail[_]&&(x+=40),Pn[_]=x}Ns(Pn,2);const u=t.noise;for(let _=0;_<j;_++)u[_]=Pn[_]>255?255:Pn[_];const d=1+i.stats.unemployment*1.5;for(let _=0;_<j;_++){let x=0;const T=t.building[_];if(T){const M=we(T);x=t.population[_]*.3+t.jobs[_]*.12;const w=t.landValue[_];w<90&&(x+=(90-w)*.5),M.grown&&t.condition[_]===0&&t.age[_]>4&&(x+=60),M.key==="x_casino"&&(x+=90),x*=d,l&&(x*=1.3)}Pn[_]=x}Ns(Pn,2);const f=t.crime,g=o?.8:1;for(let _=0;_<j;_++){let x=(Pn[_]-t.covPolice[_]*.85-t.covEducation[_]*.1)*g;x<0&&(x=0),x=(f[_]+x)*.5,f[_]=x>255?255:x}const v=r?.75:1;for(let _=0;_<j;_++){let x=0;const T=t.building[_];if(T){x=26+we(T).pollution*.22,t.condition[_]<60&&t.age[_]>4&&(x+=26);const M=t.landValue[_];M<80&&(x+=(80-M)*.25)}else t.tree[_]&&(x=8+t.tree[_]*7+(e?12:0)-(n?6:0));Pn[_]=x}Ns(Pn,1);const m=t.fireRisk;for(let _=0;_<j;_++){let x=(Pn[_]-t.covFire[_]*.9)*v;t.onFire[_]&&(x=255),x<0&&(x=0),m[_]=x>255?255:x}for(let _=0;_<j;_++){if(t.water[_]){Ao[_]=0;continue}let x=70+tl[_]*.35+va[_]+t.covPark[_]*.28+t.covPolice[_]*.06+t.covEducation[_]*.08+t.covHealth[_]*.05+t.covTransit[_]*.05-h[_]*.5-u[_]*.2-f[_]*.4-t.traffic[_]*.1;const T=t.height[_];T>1&&(x+=Math.min(22,T*5));const M=t.building[_];M&&we(M).grown&&t.condition[_]===0&&t.age[_]>4&&(x-=70),Ao[_]=x}Ns(Ao,2);const p=t.landValue;for(let _=0;_<j;_++){let x=Ao[_];(t.water[_]||x<0)&&(x=0),x=(p[_]+x)*.5,p[_]=x>255?255:x}const y=t.desirability;for(let _=0;_<j;_++){if(t.water[_]){y[_]=0;continue}let x=p[_]*.55+t.covPark[_]*.12+t.covTransit[_]*.08+(t.powered[_]?18:0)+(t.watered[_]?18:0)-f[_]*.3-h[_]*.32-u[_]*.1-t.traffic[_]*.08;x<0&&(x=0),y[_]=x>255?255:x}}const xe=new Int32Array(j),_i=new Int32Array(j),Hr=new Float32Array(j),th=120,X0=th*2.6,q0=th*6;function Y0(i){const t=i%R,e=i/R|0;for(let n=1;n<=3;n++){const s=t-n<0?0:t-n,r=t+n>=R?R-1:t+n,o=e-n<0?0:e-n,a=e+n>=lt?lt-1:e+n;for(let l=o;l<=a;l++){const c=l*R,h=l===e-n||l===e+n;for(let u=s;u<=r;u++)if(!(!h&&u!==t-n&&u!==t+n)&&xe[c+u]>=0)return c+u}}return-1}function Jh(i){const t=i.grid,e=t.road;xe.fill(-1),Hr.fill(0);let n=0;for(let l=0;l<j;l++){const c=t.building[l];if(!c)continue;const h=we(c);if(h.jobs<=0||h.category!=="commercial"&&h.category!=="industrial")continue;const u=l%R;u>0&&e[l-1]&&xe[l-1]<0&&(xe[l-1]=0,_i[n++]=l-1),u<R-1&&e[l+1]&&xe[l+1]<0&&(xe[l+1]=0,_i[n++]=l+1),l>=R&&e[l-R]&&xe[l-R]<0&&(xe[l-R]=0,_i[n++]=l-R),l<j-R&&e[l+R]&&xe[l+R]<0&&(xe[l+R]=0,_i[n++]=l+R)}let s=0;for(;s<n;){const l=_i[s++],c=xe[l]+1,h=l%R;h>0&&e[l-1]&&xe[l-1]<0&&(xe[l-1]=c,_i[n++]=l-1),h<R-1&&e[l+1]&&xe[l+1]<0&&(xe[l+1]=c,_i[n++]=l+1),l>=R&&e[l-R]&&xe[l-R]<0&&(xe[l-R]=c,_i[n++]=l-R),l<j-R&&e[l+R]&&xe[l+R]<0&&(xe[l+R]=c,_i[n++]=l+R)}if(n>0)for(let l=0;l<j;l++){const c=t.population[l];if(!c)continue;const h=Y0(l);if(h<0)continue;let u=c*.42;u*=1-.5*(t.covTransit[l]/255);let d=h;Hr[d]+=u;let f=256;for(;xe[d]>0&&f-- >0;){const g=d%R,v=xe[d];let m=-1;if(g>0&&xe[d-1]>=0&&xe[d-1]<v?m=d-1:g<R-1&&xe[d+1]>=0&&xe[d+1]<v?m=d+1:d>=R&&xe[d-R]>=0&&xe[d-R]<v?m=d-R:d<j-R&&xe[d+R]>=0&&xe[d+R]<v&&(m=d+R),m<0)break;d=m,Hr[d]+=u}}let r=0,o=0;const a=t.traffic;for(let l=0;l<j;l++){const c=e[l];if(!c){a[l]=0;continue}const h=c===Ue.Highway?q0:c===Ue.Avenue?X0:th,u=Hr[l]/h;let d=u*150;d>255&&(d=255),a[l]=(a[l]+d)*.5;const f=Hr[l];f>0&&(r+=f,o+=(u>1?1:u)*f)}i.stats.traffic=r>0?o/r:0}const Fs=i=>Math.max(0,Math.min(1,i)),Qh=i=>i.difficulty==="easy"?.8:i.difficulty==="hard"?1.25:1,$0=i=>i.difficulty==="easy"?1.25:i.difficulty==="hard"?.8:1;function sc(i){const{stats:t,budget:e}=i,n=Math.min(1,t.population/2500),s=t.population?t.jobs/t.population:.55,r=t.jobs?t.population/Math.max(1,t.jobs*1.8):0;let o=.62+(s-.48)*.9*n-e.taxRes*3.8-t.pollution*.22,a=.28+t.population/Math.max(1200,t.comBuildings*1700+1200)-r*.18*n-e.taxCom*3.5,l=.42+r*.25-Math.max(0,t.unemployment-.15)*.55*n-e.taxInd*3.2,c=!1,h=!1;for(let u=0;u<j;u++){if(!i.grid.building[u]||i.grid.originOffset[u])continue;const d=we(i.grid.building[u]).key;d==="t_port"?c=!0:d==="t_airport"&&(h=!0)}c&&(l+=.22),h&&(a+=.28);for(const u of i.ordinances)u.active&&(u.key==="tourism"?a+=.2:u.key==="clean_air"?l-=.16:u.key==="legalise_gambling"&&(a+=.08));i.demand.r=Math.max(-1,Math.min(1,o)),i.demand.c=Math.max(-1,Math.min(1,a)),i.demand.i=Math.max(-1,Math.min(1,l))}function rc(i){const t=i.grid,e=i.stats;let n=0,s=0,r=0,o=0,a=0,l=0,c=0,h=0,u=0,d=0,f=0;for(let g=0;g<j;g++)if(n+=t.population[g],s+=t.jobs[g],t.water[g]||(r+=t.landValue[g],o+=t.pollution[g],a+=t.covHealth[g],l+=t.covEducation[g],c+=255-t.crime[g],h++),t.building[g]&&!t.originOffset[g]){const v=we(t.building[g]).category;v==="residential"?u++:v==="commercial"?d++:v==="industrial"&&f++}e.population=n,e.jobs=s,e.unemployment=n?Fs((n*.48-s)/(n*.48)):0,e.homeless=Math.max(0,Math.round(n*Math.max(0,e.unemployment-.3)*.08)),e.landValueAvg=h?r/h:0,e.pollution=h?o/h/255:0,e.health=h?Fs(.35+a/h/380):.5,e.educationLevel=h?Fs(.2+l/h/330):.3,e.safety=h?Fs(c/h/255):.5,e.happiness=Fs(.62+e.landValueAvg/700+e.health*.12+e.safety*.12-e.unemployment*.35-e.traffic*.2-e.pollution*.3),e.approval=Fs(e.happiness*.72+e.safety*.12+e.health*.08+e.educationLevel*.08),e.resBuildings=u,e.comBuildings=d,e.indBuildings=f}function $d(i){const t=i.budget,e=t.ledger;for(const a of Object.keys(e))e[a]=0;const n=$0(i);e.incomeRes=i.stats.population*t.taxRes*1.7*n;let s=0,r=0;for(let a=0;a<j;a++)if(i.grid.building[a]&&!i.grid.originOffset[a]){const l=we(i.grid.building[a]);l.category==="commercial"?s+=l.jobs:l.category==="industrial"&&(r+=l.jobs);const c=l.upkeep*Qh(i);l.category==="power"?e.costPower+=c:l.category==="water"?e.costWater+=c:l.category==="safety"?(e.costPolice+=c*t.fundPolice,e.costFire+=c*t.fundFire):l.category==="health"?e.costHealth+=c*t.fundHealth:l.category==="education"?e.costEducation+=c*t.fundEducation:l.category==="leisure"?e.costParks+=c*t.fundParks:e.costRoads+=c*.15*t.fundRoads}e.incomeCom=s*t.taxCom*4.2*n,e.incomeInd=r*t.taxInd*3.7*n;let o=0;for(let a=0;a<j;a++)(i.grid.road[a]||i.grid.rail[a]||i.grid.subway[a])&&o++;e.costRoads+=o*.18*t.fundRoads*Qh(i);for(const a of i.ordinances)a.active&&(e.incomeOther-=a.costPerCapita*i.stats.population);for(const a of i.deals)if(a.active){const l=a.amount*a.pricePerUnit;a.kind.startsWith("sell_")||a.kind==="take_garbage"?e.incomeOther+=l:e.incomeOther-=l}for(let a=t.loans.length-1;a>=0;a--){const l=t.loans[a],c=Math.min(l.remaining,l.monthly);l.remaining-=c,l.monthsLeft--,e.costLoans+=c,(l.monthsLeft<=0||l.remaining<=.01)&&t.loans.splice(a,1)}e.net=e.incomeRes+e.incomeCom+e.incomeInd+e.incomeOther-e.costRoads-e.costPolice-e.costFire-e.costHealth-e.costEducation-e.costParks-e.costPower-e.costWater-e.costLoans,i.difficulty!=="sandbox"&&(t.funds+=e.net),kt.emit("budget:updated",t)}function j0(i,t,e){if(i.budget.loans.length>=3||t<5e3||t>1e5||e<60||e>240)return!1;const n=.06+t/1e5*.025+(240-e)/240*.015,s=t*(n/12)/(1-Math.pow(1+n/12,-e));return i.budget.loans.push({principal:t,remaining:s*e,monthly:s,monthsLeft:e,rate:n}),i.budget.funds+=t,kt.emit("budget:updated",i.budget),!0}function jd(i){for(const t of i.milestones)if(!t.reached&&i.stats.population>=t.pop){t.reached=!0,i.budget.funds+=t.reward,t.rewardKey&&i.unlocked.add(t.rewardKey);const e={id:i.nextNewsId++,tick:i.time.ticks,text:`${t.name} reached! ${t.desc}`,kind:"good"};i.news.unshift(e),i.news.length>100&&(i.news.length=100),kt.emit("milestone",t),kt.emit("news",e)}}function Zd(i){const t=new Set(i.unlocked);for(const e of mr)(i.difficulty==="sandbox"||!e.grown&&!e.unlockPop||(e.unlockPop??1/0)<=i.stats.population)&&t.add(e.key);for(const e of i.milestones)e.reached&&e.rewardKey&&t.add(e.rewardKey);return t}const Z0=Object.freeze(Object.defineProperty({__proto__:null,checkMilestones:jd,computeDemand:sc,monthlyBudget:$d,recomputeStats:rc,takeLoan:j0,unlockedKeys:Zd},Symbol.toStringTag,{value:"Module"}));function el(i,t){return t<=Yt.ResHigh?i.demand.r:t<=Yt.ComHigh?i.demand.c:i.demand.i}function Co(i,t,e,n,s,r){const o=z0[i];if(!o)return;let a=0;const l=s%R,c=s/R|0,h=n.grid;for(let d=0;d<o.length;d++){const f=o[d];f.level!==t||h.landValue[s]<(f.minLandValue??0)||r&&!h.isClear(l,c,f.w,f.h)||a++}if(!a)return;let u=bt(l,c,e)*a|0;for(let d=0;d<o.length;d++){const f=o[d];if(!(f.level!==t||h.landValue[s]<(f.minLandValue??0))&&!(r&&!h.isClear(l,c,f.w,f.h))&&u--===0)return f}}function Kd(i,t,e,n,s){const r=i.grid,o=t%R,a=t/R|0,l=Math.min(1,s/(10+(bt(o,a,19)*20|0))),c=Math.round(e.residents*l/(e.w*e.h)),h=Math.round(e.jobs*l/(e.w*e.h));for(let u=0;u<e.h;u++)for(let d=0;d<e.w;d++){const f=(a+u)*R+o+d;r.building[f]=e.id,r.originOffset[f]=d|u<<4,r.level[f]=e.level??1,r.variant[f]=bt(o,a,e.id)*255|0,r.condition[f]=n,r.age[f]=s,r.population[f]=c,r.jobs[f]=h}}function Ro(i,t,e){Kd(i,t,e,180,0),i.grid.markDirty(t%R,t/R|0),kt.emit("tile:changed",{i:t})}function K0(i){const t=i.grid;for(let e=0;e<j;e++){const n=t.building[e];if(n&&!t.originOffset[e]){const l=we(n);if(!l.grown)continue;const c=e%R,h=e/R|0,u=Wh(t,c,h)&&!!t.powered[e]&&!!t.watered[e]&&el(i,l.zone??0)>-.05&&t.landValue[e]>=(l.minLandValue??0);let d=Math.min(65535,t.age[e]+1),f=t.condition[e];if(u?f=Math.min(255,f+3):f=Math.max(0,f-5),Kd(i,e,l,f,d),u&&f>235&&d>150&&bt(c,h,i.time.ticks)<.025){const g=Co(l.zone??0,(l.level??1)+1,d,i,e,!1);g&&Ro(i,e,g)}else if(!u&&f===0&&d>90&&(l.level??1)>1){const g=Co(l.zone??0,(l.level??1)-1,d,i,e,!1);g&&Ro(i,e,g)}else if(u&&f===0&&d>4){const g=Co(l.zone??0,1,d,i,e,!1);Ro(i,e,g??l)}continue}if(n||!t.zone[e]||t.water[e]||t.road[e]||t.rail[e])continue;const s=e%R,r=e/R|0,o=t.zone[e];if(!Wh(t,s,r)||!t.powered[e]||!t.watered[e]||el(i,o)<=0)continue;const a=8e-4+el(i,o)*.0017;if(bt(s,r,i.time.ticks+i.seed)<a){const l=Co(o,1,i.seed,i,e,!0);l&&Ro(i,e,l)}}}function J0(i){const t=is(i.seed+i.time.month+i.time.year*12),e=i.news.filter(c=>c.tick>i.time.ticks-30),n=["CITY HUMS, LLAMAS LISTEN","MAYOR FACES ANOTHER PERFECTLY NORMAL MONTH","CRANES RISE; PIGEONS FILE OBJECTION","SETHCITY BUILDS TOWARD TOMORROW"],s=e[0]?.text.toUpperCase()??n[t()*n.length|0],r=[];if(e.length)for(let c=0;c<Math.min(2,e.length);c++)r.push({title:e[c].kind==="bad"?"Breaking Trouble":"Around the City",body:e[c].text});const o=i.history.population.length>1?i.history.population[i.history.population.length-2]:0;r.push({title:i.stats.population>=o?"Population Points Up":"Census Finds Spare Elbow Room",body:`${i.cityName} now counts ${i.stats.population.toLocaleString()} residents, with approval at ${Math.round(i.stats.approval*100)}% and traffic at ${Math.round(i.stats.traffic*100)}%.`}),r.length<3&&r.push({title:"Treasury Desk",body:`City coffers hold §${Math.round(i.budget.funds).toLocaleString()}. Last month's balance was §${Math.round(i.budget.ledger.net).toLocaleString()}.`});const a=["CLASSIFIED: Lost—one zoning permit, last seen under a coffee mug.","CLASSIFIED: Quiet apartment beside highway. Earplugs included.","CLASSIFIED: Llama seeks municipal role. Strong opinions on parks.","CLASSIFIED: Bridge for sale. Some water damage."],l={year:i.time.year,month:i.time.month,masthead:"The SethCity 6769 Llama Ledger",headline:s,articles:r.slice(0,3),classified:a[t()*a.length|0]};return i.papers.unshift(l),i.papers.length>24&&(i.papers.length=24),kt.emit("paper",l),l}const co=new Map,tu=["fire","earthquake","tornado","flood","meteor","blackout","riot","volcano","monster","aircrash","meltdown","hurricane","chemical"];function Q0(i,t,e="bad"){kt.emit("news",{id:i.nextNewsId++,tick:i.time.ticks,text:t,kind:e})}function gs(i,t,e,n=!0){if(!zt(t,e))return;const s=i.grid,r=dt(t,e),o=s.originOf(t,e);if(o>=0){const a=we(s.building[o]),l=o%R,c=o/R|0;for(let h=0;h<a.h;h++)for(let u=0;u<a.w;u++){const d=l+u,f=c+h;zt(d,f)&&(s.clearTile(dt(d,f)),s.markDirty(d,f))}}else s.clearTile(r),s.markDirty(t,e);n&&(s.road[r]=s.rail[r]=s.wire[r]=s.pipe[r]=s.subway[r]=s.tunnel[r]=0),s.tree[r]=0,kt.emit("tile:changed",{i:r})}function lr(i,t,e,n=18){if(!zt(t,e))return;const s=dt(t,e);(i.grid.building[s]||i.grid.tree[s])&&(i.grid.onFire[s]=Math.max(i.grid.onFire[s],n))}function cr(i,t){let e=-1,n=-1/0;const s=is(i.seed^i.time.ticks^i.nextDisasterId*7919);for(let r=0;r<512;r++){const o=s()*R*lt|0,a=t?t(o):s();a>n&&(e=o,n=a)}return[e%R,e/R|0]}function eu(i,t){for(let e=0;e<i.grid.building.length;e++){const n=i.grid.building[e];if(n&&i.grid.originOffset[e]===0&&t(mr[n]?.key??""))return e}return-1}function oc(i,t,e,n){let s=e,r=n;if(t==="aircrash"){const h=eu(i,u=>u.includes("airport"));if(h<0)return null;s??(s=h%R),r??(r=h/R|0)}else if(t==="meltdown"){const h=eu(i,u=>u.includes("nuclear"));if(h<0)return null;s??(s=h%R),r??(r=h/R|0)}else t==="riot"?[s,r]=s===void 0||r===void 0?cr(i,h=>i.grid.crime[h]-i.grid.covPolice[h]*.7):[s,r]:t==="monster"?[s,r]=s===void 0||r===void 0?cr(i,h=>i.grid.population[h]+i.grid.jobs[h]):[s,r]:(t==="flood"||t==="hurricane")&&(s===void 0||r===void 0)?[s,r]=cr(i,h=>{if(i.grid.water[h])return-1;const u=h%R,d=h/R|0;let f=0;for(let g=-2;g<=2;g++)for(let v=-2;v<=2;v++)zt(u+v,d+g)&&(f+=i.grid.water[dt(u+v,d+g)]);return f}):(s===void 0||r===void 0)&&([s,r]=cr(i));s=Math.max(0,Math.min(R-1,s)),r=Math.max(0,Math.min(lt-1,r));const o={fire:45,earthquake:12,tornado:42,flood:50,meteor:8,blackout:36,riot:32,volcano:55,monster:55,aircrash:24,meltdown:20,hurricane:55,chemical:30},a={id:i.nextDisasterId++,kind:t,x:s,y:r,life:o[t],radius:t==="meltdown"?8:4,intensity:1},l=is(i.seed^a.id*65537);if(a.vx=l()*2-1,a.vy=l()*2-1,i.disasters.push(a),t==="fire"&&lr(i,s,r,28),t==="flood"||t==="hurricane"){const h=[];a.floodedTiles=h,co.set(a.id,h)}return Q0(i,{fire:"A major fire has broken out!",earthquake:"Earthquake rocks SethCity 6769!",tornado:"A tornado is tearing through the city!",flood:"Flood waters surge inland!",meteor:"Meteor impact reported!",blackout:"City-wide blackout!",riot:"Rioting erupts in a high-crime district!",volcano:"A volcano erupts beneath the city!",monster:"The Giant Llama of 6769 is on a rampage!",aircrash:"Aircraft down near the airport!",meltdown:"Nuclear meltdown! The exclusion zone is irradiated.",hurricane:"A hurricane batters the coast!",chemical:"Chemical spill poisons the shoreline!"}[t]),kt.emit("shake",{intensity:t==="earthquake"||t==="meteor"?1:.55}),kt.emit("disaster:start",a),a}function tp(i){const t=i.grid;for(let e=0;e<t.onFire.length;e++){if(!t.onFire[e])continue;const n=e%R,s=e/R|0;if(t.onFire[e]--,t.onFire[e]===0){gs(i,n,s,!1);continue}if((t.onFire[e]&3)===0)for(const[r,o]of[[1,0],[-1,0],[0,1],[0,-1]]){const a=n+r,l=s+o;if(!zt(a,l))continue;const c=dt(a,l),h=Math.max(.01,(t.fireRisk[c]+45-t.covFire[c]*.8)/650);!t.onFire[c]&&bt(a,l,i.time.ticks)<h&&lr(i,a,l)}}}function ep(i,t){const e=i.grid,n=is(i.seed^t.id*8191^t.life*131);if(t.kind==="blackout"){e.powered.fill(0),i.blackoutTicks=t.life;return}if(t.kind==="earthquake")for(let s=0;s<18;s++){const r=Math.round(t.x+(n()-.5)*18),o=Math.round(t.y+(n()-.5)*5);n()>e.condition[dt(Math.max(0,Math.min(127,r)),Math.max(0,Math.min(127,o)))]/300&&gs(i,r,o),n()<.12&&lr(i,r,o)}else if(t.kind==="tornado"||t.kind==="monster"){if(t.kind==="monster"){const r=cr(i,o=>e.population[o]+e.jobs[o]);t.vx=(r[0]-t.x)*.03,t.vy=(r[1]-t.y)*.03}else t.vx=(t.vx??0)*.82+(n()-.5)*.55,t.vy=(t.vy??0)*.82+(n()-.5)*.55;t.x=Math.max(1,Math.min(126,t.x+(t.vx??0))),t.y=Math.max(1,Math.min(126,t.y+(t.vy??0)));const s=t.kind==="monster"?2:1;for(let r=-s;r<=s;r++)for(let o=-s;o<=s;o++)n()<.72&&gs(i,Math.round(t.x)+o,Math.round(t.y)+r)}else if(t.kind==="flood"||t.kind==="hurricane"){let s=t.floodedTiles??co.get(t.id);s||(s=[]),t.floodedTiles=s,co.set(t.id,s);for(let r=0;r<(t.kind==="hurricane"?10:18);r++){const o=Math.round(t.x+(n()-.5)*24),a=Math.round(t.y+(n()-.5)*24);if(!zt(o,a))continue;const l=dt(o,a);let c=!1;for(let h=-1;h<=1;h++)for(let u=-1;u<=1;u++)zt(o+u,a+h)&&e.water[dt(o+u,a+h)]&&(c=!0);if(c&&!e.water[l]&&(s.push(l),e.water[l]=1,e.markDirty(o,a),n()<.45&&gs(i,o,a,!1)),t.kind==="hurricane"&&n()<.25){const h=dt(Math.max(0,Math.min(127,o)),Math.max(0,Math.min(127,a)));e.building[h]&&(e.condition[h]=Math.max(0,e.condition[h]-45))}}}else if(t.kind==="meteor"&&t.life===7){for(let s=-4;s<=4;s++)for(let r=-4;r<=4;r++)if(r*r+s*s<=16){const o=Math.round(t.x)+r,a=Math.round(t.y)+s;gs(i,o,a),zt(o,a)&&(e.height[dt(o,a)]-=nn*Math.max(1,4-Math.hypot(r,s)),e.terrainDirty=!0)}}else if(t.kind==="volcano")for(let s=0;s<7;s++){const r=Math.round((n()-.5)*12),o=Math.round((n()-.5)*12),a=Math.round(t.x)+r,l=Math.round(t.y)+o;if(zt(a,l)){const c=dt(a,l);e.height[c]+=nn*Math.max(0,4-Math.hypot(r,o)*.5),e.water[c]=0,e.terrainDirty=!0,lr(i,a,l,24)}}else if(t.kind==="riot")for(let s=0;s<4;s++){const r=Math.round(t.x+(n()-.5)*8),o=Math.round(t.y+(n()-.5)*8);n()<.3?gs(i,r,o,!1):lr(i,r,o)}else if(t.kind==="aircrash"){const s=24-t.life,r=Math.round(t.x+(t.vx??1)*s),o=Math.round(t.y+(t.vy??.4)*s);gs(i,r,o),lr(i,r,o,26)}else if(t.kind==="meltdown")for(let s=-8;s<=8;s++)for(let r=-8;r<=8;r++)r*r+s*s<=64&&zt(Math.round(t.x)+r,Math.round(t.y)+s)&&(e.pollution[dt(Math.round(t.x)+r,Math.round(t.y)+s)]=255);else if(t.kind==="chemical")for(let s=0;s<20;s++){const r=Math.round(t.x+(n()-.5)*12),o=Math.round(t.y+(n()-.5)*12);zt(r,o)&&(e.pollution[dt(r,o)]=255)}}function Jd(i){tp(i);for(let t=i.disasters.length-1;t>=0;t--){const e=i.disasters[t];if(ep(i,e),e.life--,e.life>0)continue;const n=e.floodedTiles??co.get(e.id);if(n){for(const s of n)i.grid.water[s]=0,i.grid.markDirty(s%R,s/R|0);co.delete(e.id),i.grid.terrainDirty=!0}i.disasters.splice(t,1),kt.emit("disaster:end",{id:e.id})}Qd(i)}function Qd(i){if(!i.disastersEnabled||i.disasters.length||i.time.ticks<24)return;const t=i.difficulty==="hard"?1.7:i.difficulty==="easy"?.65:i.difficulty==="sandbox"?.4:1;if(bt(i.seed,i.time.ticks,6769)>=t/(365*3.2))return;let e=tu[bt(i.time.ticks,i.seed,77)*tu.length|0];if(e==="chemical"){const n=cr(i,s=>{if(!i.grid.building[s]||mr[i.grid.building[s]]?.category!=="industrial")return-1;const r=s%R,o=s/R|0;let a=0;for(let l=-2;l<=2;l++)for(let c=-2;c<=2;c++)zt(r+c,o+l)&&(a+=i.grid.water[dt(r+c,o+l)]);return a});if(!i.grid.building[dt(n[0],n[1])])e="fire";else{oc(i,e,n[0],n[1]);return}}oc(i,e)}const np=Object.freeze(Object.defineProperty({__proto__:null,maybeRandomDisaster:Qd,triggerDisaster:oc,updateDisasters:Jd},Symbol.toStringTag,{value:"Module"})),ip=[0,1,3,9];class sp{constructor(t){L(this,"accumulator",0);L(this,"phase",0);this.state=t}update(t){const e=ip[this.state.speed];if(this.state.time.timeOfDay=(this.state.time.timeOfDay+t/90)%1,!!e)for(this.accumulator+=Math.min(t,.25)*e;this.accumulator>=1;)this.accumulator--,this.tick()}tick(){const t=this.state;if(sc(t),this.phase===0?(ic(t.grid),qh(t)):this.phase===1?jh(t):this.phase===2?Kh(t):Jh(t),this.phase=this.phase+1&3,Jd(t),K0(t),rc(t),jd(t),t.time.ticks++,t.time.day++,t.time.day>30){t.time.day=1,t.time.month++,t.time.month>11&&(t.time.month=0,t.time.year++),t.time.season=t.time.month/3|0,$d(t),J0(t);const e=t.history;e.population.push(t.stats.population),e.funds.push(t.budget.funds),e.approval.push(t.stats.approval),e.pollution.push(t.stats.pollution),e.traffic.push(t.stats.traffic),e.unemployment.push(t.stats.unemployment);for(const n of[e.population,e.funds,e.approval,e.pollution,e.traffic,e.unemployment])n.length>240&&n.splice(0,n.length-240)}kt.emit("stats:updated",t.stats),kt.emit("time:updated",t.time)}recomputeAll(){const t=this.state;ic(t.grid),qh(t),jh(t),Kh(t),Jh(t),rc(t),sc(t),kt.emit("stats:updated",t.stats),kt.emit("budget:updated",t.budget),kt.emit("time:updated",t.time)}}const rp={road_street:12,road_avenue:60,road_highway:220,rail:90,wire:6,pipe:10,subway:150,sign:50,tree:12,water_place:120,terrain_raise:20,terrain_lower:20,terrain_level:25,bulldoze:4},nl={res_low:Yt.ResLow,res_med:Yt.ResMed,res_high:Yt.ResHigh,com_low:Yt.ComLow,com_high:Yt.ComHigh,ind_agri:Yt.IndAgri,ind_light:Yt.IndLight,ind_heavy:Yt.IndHeavy},op={[Yt.ResLow]:8,[Yt.ResMed]:16,[Yt.ResHigh]:24,[Yt.ComLow]:8,[Yt.ComHigh]:24,[Yt.IndAgri]:8,[Yt.IndLight]:16,[Yt.IndHeavy]:24};class ap{constructor(t){L(this,"pendingSignText",null);this.state=t}scale(t){return Math.ceil(t*(this.state.difficulty==="easy"?.8:this.state.difficulty==="hard"?1.25:1))}spend(t){return this.state.difficulty==="sandbox"?!0:this.state.budget.funds<t?!1:(this.state.budget.funds-=t,!0)}canPlace(t,e,n){const s=ec[t];if(!s)return{ok:!1,cost:0,reason:"Unknown building",tiles:0};const r=this.scale(s.cost);if(!zt(e,n)||!zt(e+s.w-1,n+s.h-1))return{ok:!1,cost:r,reason:"Outside city limits",tiles:0};if(!Zd(this.state).has(t))return{ok:!1,cost:r,reason:"Not unlocked",tiles:0};if(!this.state.grid.isClear(e,n,s.w,s.h))return{ok:!1,cost:r,reason:"Site is occupied",tiles:0};if(s.needsWater&&!this.state.grid.touchesWater(e,n,s.w,s.h))return{ok:!1,cost:r,reason:"Must touch water",tiles:0};if(s.needsFlat&&!this.state.grid.isFlat(e,n,s.w,s.h)){let o=1/0,a=-1/0;for(let l=0;l<s.h;l++)for(let c=0;c<s.w;c++){const h=this.state.grid.height[dt(e+c,n+l)];o=Math.min(o,h),a=Math.max(a,h)}if(a-o>nn*4)return{ok:!1,cost:r,reason:"Terrain cannot be flattened",tiles:0}}return this.state.difficulty!=="sandbox"&&this.state.budget.funds<r?{ok:!1,cost:r,reason:"Insufficient funds",tiles:0}:{ok:!0,cost:r,tiles:s.w*s.h}}stamp(t,e,n){const s=this.state.grid,r=e*37+n*71+this.state.seed&255,o=e+n+this.state.seed&3;for(let a=0;a<t.h;a++)for(let l=0;l<t.w;l++){const c=dt(e+l,n+a);s.building[c]=t.id,s.originOffset[c]=l|a<<4,s.level[c]=t.level??1,s.variant[c]=r,s.rotation[c]=o,s.condition[c]=255,s.age[c]=0,s.population[c]=Math.round(t.residents/(t.w*t.h)),s.jobs[c]=Math.round(t.jobs/(t.w*t.h)),s.markDirty(e+l,n+a)}kt.emit("tile:changed",{i:dt(e,n)})}place(t,e,n){const s=this.canPlace(t,e,n);if(!s.ok)return s;const r=ec[t];return r.needsFlat&&!this.state.grid.isFlat(e,n,r.w,r.h)&&!U0(this.state.grid,e,n,r.w,r.h)?{...s,ok:!1,reason:"Terrain cannot be flattened"}:this.spend(s.cost)?(this.stamp(r,e,n),kt.emit("money:spent",{amount:s.cost,x:e,y:n,label:r.name}),s):{...s,ok:!1,reason:"Insufficient funds"}}bulldozeTile(t,e){const n=this.state.grid;if(!zt(t,e))return 0;const s=n.originOf(t,e);let r=0;if(s>=0){const a=we(n.building[s]),l=s%R,c=s/R|0,h=a.w,u=a.h;for(let d=0;d<u;d++)for(let f=0;f<h;f++)n.clearTile(dt(l+f,c+d)),n.markDirty(l+f,c+d),r++;return kt.emit("tile:changed",{i:s}),r}const o=dt(t,e);return n.road[o]||n.rail[o]||n.wire[o]||n.pipe[o]||n.subway[o]||n.zone[o]||n.tree[o]?(n.road[o]=n.rail[o]=n.wire[o]=n.pipe[o]=n.subway[o]=n.tunnel[o]=n.zone[o]=n.tree[o]=0,n.markDirty(t,e),kt.emit("tile:changed",{i:o}),1):0}applyTool(t,e,n,s,r,o){if(t==="inspect")return{ok:!0,cost:0,tiles:0};if(t.startsWith("build_"))return o?this.canPlace(t.slice(6),e,n):this.place(t.slice(6),e,n);if(t.startsWith("zone_")&&!(t.slice(5)in nl))return{ok:!1,cost:0,reason:"Unknown zone",tiles:0};const a=Math.max(0,Math.min(e,s)),l=Math.min(127,Math.max(e,s)),c=Math.max(0,Math.min(n,r)),h=Math.min(127,Math.max(n,r)),u=[];if(t.startsWith("road_")||t==="rail"||t==="wire"||t==="pipe"||t==="subway")if(Math.abs(s-e)>=Math.abs(r-n)){const M=s>=e?1:-1;for(let E=e;E!==s+M;E+=M)zt(E,n)&&u.push([E,n]);const w=r>=n?1:-1;for(let E=n+w;E!==r+w;E+=w)zt(s,E)&&u.push([s,E])}else{const M=r>=n?1:-1;for(let E=n;E!==r+M;E+=M)zt(e,E)&&u.push([e,E]);const w=s>=e?1:-1;for(let E=e+w;E!==s+w;E+=w)zt(E,r)&&u.push([E,r])}else for(let T=c;T<=h;T++)for(let M=a;M<=l;M++)u.push([M,T]);if(!u.length)return{ok:!1,cost:0,reason:"Outside city limits",tiles:0};const f=this.state.grid;for(const[T,M]of u){const w=dt(T,M);if((t.startsWith("road_")||t==="rail"||t==="water_place")&&f.building[w])return{ok:!1,cost:0,reason:"Building in the way",tiles:0};if(t==="water_place"&&(f.road[w]||f.rail[w]))return{ok:!1,cost:0,reason:"Transport route in the way",tiles:0}}if(t.startsWith("zone_")||t==="tree"){const T=u.filter(([M,w])=>{const E=dt(M,w);return!f.building[E]&&!f.road[E]&&!f.rail[E]&&!f.water[E]});if(!T.length)return{ok:!1,cost:0,reason:"Nothing to paint here",tiles:0};u.length=0;for(const M of T)u.push(M)}let g=0,v=0;const m=u[0],p=u[u.length-1],y=(f.height[dt(m[0],m[1])]+f.height[dt(p[0],p[1])])*.5,_=new Set;for(const[T,M]of u){const w=dt(T,M);let E=t.startsWith("zone_")?op[nl[t.slice(5)]]??0:rp[t]??0;if(t==="bulldoze"){const b=f.originOf(T,M);b>=0?_.has(b)?E=0:_.add(b):!f.road[w]&&!f.rail[w]&&!f.wire[w]&&!f.pipe[w]&&!f.zone[w]&&!f.tree[w]&&(E=0)}(t.startsWith("road_")||t==="rail")&&this.state.grid.water[w]&&(E*=5),t.startsWith("road_")&&this.state.grid.height[w]>=y+2*nn&&(E=96),g+=E,v++}const x=this.scale(g);if(this.state.difficulty!=="sandbox"&&this.state.budget.funds<x)return{ok:!1,cost:x,reason:"Insufficient funds",tiles:v};if(o)return{ok:!0,cost:x,tiles:v};if(!this.spend(x))return{ok:!1,cost:x,reason:"Insufficient funds",tiles:v};for(const[T,M]of u){const w=dt(T,M);t==="bulldoze"?this.bulldozeTile(T,M):t.startsWith("zone_")?f.zone[w]=nl[t.slice(5)]??Yt.None:t==="road_street"?(f.zone[w]=0,f.tree[w]=0,f.road[w]=Ue.Street,f.tunnel[w]=!f.water[w]&&f.height[w]>=y+2*nn?1:0):t==="road_avenue"?(f.zone[w]=0,f.tree[w]=0,f.road[w]=Ue.Avenue,f.tunnel[w]=!f.water[w]&&f.height[w]>=y+2*nn?1:0):t==="road_highway"?(f.zone[w]=0,f.tree[w]=0,f.road[w]=Ue.Highway,f.tunnel[w]=!f.water[w]&&f.height[w]>=y+2*nn?1:0):t==="rail"?(f.zone[w]=0,f.tree[w]=0,f.rail[w]=1):t==="wire"?f.wire[w]=1:t==="pipe"?f.pipe[w]=1:t==="subway"?f.subway[w]=1:t==="tree"?f.tree[w]=Math.min(3,f.tree[w]+1):t==="water_place"?(f.zone[w]=0,f.tree[w]=0,f.water[w]=1,f.height[w]=Ji-nn,f.terrainDirty=!0):t.startsWith("terrain_")?(I0(f,T,M,0,t.slice(8),t==="terrain_level"?f.height[dt(m[0],m[1])]:void 0),f.terrainDirty=!0):t==="sign"&&this.pendingSignText&&(this.state.signs.push({x:T,y:M,text:this.pendingSignText.slice(0,24)}),this.pendingSignText=null),f.markDirty(T,M),kt.emit("tile:changed",{i:w})}return{ok:!0,cost:x,tiles:v}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const eh="171",lp=0,nu=1,cp=2,tf=1,ef=2,Ei=3,ki=0,Sn=1,ei=2,Pi=0,ur=1,ac=2,iu=3,su=4,hp=5,_s=100,up=101,dp=102,fp=103,pp=104,mp=200,gp=201,vp=202,_p=203,lc=204,cc=205,xp=206,yp=207,Mp=208,wp=209,bp=210,Sp=211,Ep=212,Tp=213,Ap=214,hc=0,uc=1,dc=2,gr=3,fc=4,pc=5,mc=6,gc=7,nh=0,Cp=1,Rp=2,Qi=0,nf=1,sf=2,rf=3,ih=4,Pp=5,of=6,af=7,lf=300,vr=301,_r=302,vc=303,_c=304,Va=306,ho=1e3,Ai=1001,xc=1002,En=1003,Lp=1004,Po=1005,qn=1006,il=1007,ws=1008,ui=1009,cf=1010,hf=1011,uo=1012,sh=1013,Ts=1014,ai=1015,ci=1016,rh=1017,oh=1018,xr=1020,uf=35902,df=1021,ff=1022,In=1023,pf=1024,mf=1025,dr=1026,yr=1027,ah=1028,lh=1029,gf=1030,ch=1031,hh=1033,_a=33776,xa=33777,ya=33778,Ma=33779,yc=35840,Mc=35841,wc=35842,bc=35843,Sc=36196,Ec=37492,Tc=37496,Ac=37808,Cc=37809,Rc=37810,Pc=37811,Lc=37812,Dc=37813,Ic=37814,Uc=37815,Nc=37816,Fc=37817,kc=37818,Oc=37819,Bc=37820,zc=37821,wa=36492,Hc=36494,Gc=36495,vf=36283,Vc=36284,Wc=36285,Xc=36286,Dp=3200,_f=3201,uh=0,Ip=1,Zi="",An="srgb",Mr="srgb-linear",Da="linear",ye="srgb",ks=7680,ru=519,Up=512,Np=513,Fp=514,xf=515,kp=516,Op=517,Bp=518,zp=519,ou=35044,Hp=35048,au="300 es",Ci=2e3,Ia=2001;class Cr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let lu=1234567;const io=Math.PI/180,fo=180/Math.PI;function Rr(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]+"-"+hn[t&255]+hn[t>>8&255]+"-"+hn[t>>16&15|64]+hn[t>>24&255]+"-"+hn[e&63|128]+hn[e>>8&255]+"-"+hn[e>>16&255]+hn[e>>24&255]+hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function te(i,t,e){return Math.max(t,Math.min(e,i))}function dh(i,t){return(i%t+t)%t}function Gp(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Vp(i,t,e){return i!==t?(e-i)/(t-i):0}function so(i,t,e){return(1-e)*i+e*t}function Wp(i,t,e,n){return so(i,t,1-Math.exp(-e*n))}function Xp(i,t=1){return t-Math.abs(dh(i,t*2)-t)}function qp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Yp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function $p(i,t){return i+Math.floor(Math.random()*(t-i+1))}function jp(i,t){return i+Math.random()*(t-i)}function Zp(i){return i*(.5-Math.random())}function Kp(i){i!==void 0&&(lu=i);let t=lu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Jp(i){return i*io}function Qp(i){return i*fo}function tm(i){return(i&i-1)===0&&i!==0}function em(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function nm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function im(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function sr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function wn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const fn={DEG2RAD:io,RAD2DEG:fo,generateUUID:Rr,clamp:te,euclideanModulo:dh,mapLinear:Gp,inverseLerp:Vp,lerp:so,damp:Wp,pingpong:Xp,smoothstep:qp,smootherstep:Yp,randInt:$p,randFloat:jp,randFloatSpread:Zp,seededRandom:Kp,degToRad:Jp,radToDeg:Qp,isPowerOfTwo:tm,ceilPowerOfTwo:em,floorPowerOfTwo:nm,setQuaternionFromProperEuler:im,normalize:wn,denormalize:sr};class ht{constructor(t=0,e=0){ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kt{constructor(t,e,n,s,r,o,a,l,c){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],y=s[1],_=s[4],x=s[7],T=s[2],M=s[5],w=s[8];return r[0]=o*v+a*y+l*T,r[3]=o*m+a*_+l*M,r[6]=o*p+a*x+l*w,r[1]=c*v+h*y+u*T,r[4]=c*m+h*_+u*M,r[7]=c*p+h*x+u*w,r[2]=d*v+f*y+g*T,r[5]=d*m+f*_+g*M,r[8]=d*p+f*x+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=d*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(sl.makeScale(t,e)),this}rotate(t){return this.premultiply(sl.makeRotation(-t)),this}translate(t,e){return this.premultiply(sl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const sl=new Kt;function yf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ua(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function sm(){const i=Ua("canvas");return i.style.display="block",i}const cu={};function rr(i){i in cu||(cu[i]=!0,console.warn(i))}function rm(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function om(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function am(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const hu=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),uu=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lm(){const i={enabled:!0,workingColorSpace:Mr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ye&&(s.r=Li(s.r),s.g=Li(s.g),s.b=Li(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ye&&(s.r=fr(s.r),s.g=fr(s.g),s.b=fr(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Zi?Da:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Mr]:{primaries:t,whitePoint:n,transfer:Da,toXYZ:hu,fromXYZ:uu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:An},outputColorSpaceConfig:{drawingBufferColorSpace:An}},[An]:{primaries:t,whitePoint:n,transfer:ye,toXYZ:hu,fromXYZ:uu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:An}}}),i}const de=lm();function Li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Os;class cm{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Os===void 0&&(Os=Ua("canvas")),Os.width=t.width,Os.height=t.height;const n=Os.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Os}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ua("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Li(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Li(e[n]/255)*255):e[n]=Li(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let hm=0;class Mf{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=Rr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(rl(s[o].image)):r.push(rl(s[o]))}else r=rl(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function rl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?cm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let um=0;class vn extends Cr{constructor(t=vn.DEFAULT_IMAGE,e=vn.DEFAULT_MAPPING,n=Ai,s=Ai,r=qn,o=ws,a=In,l=ui,c=vn.DEFAULT_ANISOTROPY,h=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=Rr(),this.name="",this.source=new Mf(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ho:t.x=t.x-Math.floor(t.x);break;case Ai:t.x=t.x<0?0:1;break;case xc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ho:t.y=t.y-Math.floor(t.y);break;case Ai:t.y=t.y<0?0:1;break;case xc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=lf;vn.DEFAULT_ANISOTROPY=1;class ke{constructor(t=0,e=0,n=0,s=1){ke.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,x=(f+1)/2,T=(p+1)/2,M=(h+d)/4,w=(u+v)/4,E=(g+m)/4;return _>x&&_>T?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=M/n,r=w/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=M/s,r=E/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=w/r,s=E/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-v)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this.w=te(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this.w=te(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class dm extends Cr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ke(0,0,t,e),this.scissorTest=!1,this.viewport=new ke(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new vn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Mf(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yn extends dm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class wf extends vn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=En,this.minFilter=En,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class fm extends vn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=En,this.minFilter=En,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Di{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*v,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const T=Math.sqrt(_),M=Math.atan2(T,p*y);m=Math.sin(m*M)/T,a=Math.sin(a*M)/T}const x=a*y;if(l=l*m+d*x,c=c*m+f*x,h=h*m+g*x,u=u*m+v*x,m===1-a){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(du.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(du.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ol.copy(this).projectOnVector(t),this.sub(ol)}reflect(t){return this.sub(ol.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ol=new N,du=new Di;class ss{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Kn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Kn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Kn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Kn):Kn.fromBufferAttribute(r,o),Kn.applyMatrix4(t.matrixWorld),this.expandByPoint(Kn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Lo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lo.copy(n.boundingBox)),Lo.applyMatrix4(t.matrixWorld),this.union(Lo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Kn),Kn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Gr),Do.subVectors(this.max,Gr),Bs.subVectors(t.a,Gr),zs.subVectors(t.b,Gr),Hs.subVectors(t.c,Gr),Bi.subVectors(zs,Bs),zi.subVectors(Hs,zs),as.subVectors(Bs,Hs);let e=[0,-Bi.z,Bi.y,0,-zi.z,zi.y,0,-as.z,as.y,Bi.z,0,-Bi.x,zi.z,0,-zi.x,as.z,0,-as.x,-Bi.y,Bi.x,0,-zi.y,zi.x,0,-as.y,as.x,0];return!al(e,Bs,zs,Hs,Do)||(e=[1,0,0,0,1,0,0,0,1],!al(e,Bs,zs,Hs,Do))?!1:(Io.crossVectors(Bi,zi),e=[Io.x,Io.y,Io.z],al(e,Bs,zs,Hs,Do))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Kn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Kn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const xi=[new N,new N,new N,new N,new N,new N,new N,new N],Kn=new N,Lo=new ss,Bs=new N,zs=new N,Hs=new N,Bi=new N,zi=new N,as=new N,Gr=new N,Do=new N,Io=new N,ls=new N;function al(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ls.fromArray(i,r);const a=s.x*Math.abs(ls.x)+s.y*Math.abs(ls.y)+s.z*Math.abs(ls.z),l=t.dot(ls),c=e.dot(ls),h=n.dot(ls);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const pm=new ss,Vr=new N,ll=new N;class Pr{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):pm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vr.subVectors(t,this.center);const e=Vr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Vr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ll.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vr.copy(t.center).add(ll)),this.expandByPoint(Vr.copy(t.center).sub(ll))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yi=new N,cl=new N,Uo=new N,Hi=new N,hl=new N,No=new N,ul=new N;class bf{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yi.copy(this.origin).addScaledVector(this.direction,e),yi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){cl.copy(t).add(e).multiplyScalar(.5),Uo.copy(e).sub(t).normalize(),Hi.copy(this.origin).sub(cl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Uo),a=Hi.dot(this.direction),l=-Hi.dot(Uo),c=Hi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(cl).addScaledVector(Uo,d),f}intersectSphere(t,e){yi.subVectors(t.center,this.origin);const n=yi.dot(this.direction),s=yi.dot(yi)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,yi)!==null}intersectTriangle(t,e,n,s,r){hl.subVectors(e,t),No.subVectors(n,t),ul.crossVectors(hl,No);let o=this.direction.dot(ul),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Hi.subVectors(this.origin,t);const l=a*this.direction.dot(No.crossVectors(Hi,No));if(l<0)return null;const c=a*this.direction.dot(hl.cross(Hi));if(c<0||l+c>o)return null;const h=-a*Hi.dot(ul);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Me{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,g,v,m){Me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,v,m)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Me().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Gs.setFromMatrixColumn(t,0).length(),r=1/Gs.setFromMatrixColumn(t,1).length(),o=1/Gs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-v*c,e[9]=-a*l,e[2]=v-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d+v*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d-v*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(mm,t,gm)}lookAt(t,e,n){const s=this.elements;return Ln.subVectors(t,e),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Gi.crossVectors(n,Ln),Gi.lengthSq()===0&&(Math.abs(n.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Gi.crossVectors(n,Ln)),Gi.normalize(),Fo.crossVectors(Ln,Gi),s[0]=Gi.x,s[4]=Fo.x,s[8]=Ln.x,s[1]=Gi.y,s[5]=Fo.y,s[9]=Ln.y,s[2]=Gi.z,s[6]=Fo.z,s[10]=Ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],y=n[3],_=n[7],x=n[11],T=n[15],M=s[0],w=s[4],E=s[8],b=s[12],S=s[1],D=s[5],k=s[9],U=s[13],z=s[2],W=s[6],$=s[10],et=s[14],Y=s[3],rt=s[7],xt=s[11],Tt=s[15];return r[0]=o*M+a*S+l*z+c*Y,r[4]=o*w+a*D+l*W+c*rt,r[8]=o*E+a*k+l*$+c*xt,r[12]=o*b+a*U+l*et+c*Tt,r[1]=h*M+u*S+d*z+f*Y,r[5]=h*w+u*D+d*W+f*rt,r[9]=h*E+u*k+d*$+f*xt,r[13]=h*b+u*U+d*et+f*Tt,r[2]=g*M+v*S+m*z+p*Y,r[6]=g*w+v*D+m*W+p*rt,r[10]=g*E+v*k+m*$+p*xt,r[14]=g*b+v*U+m*et+p*Tt,r[3]=y*M+_*S+x*z+T*Y,r[7]=y*w+_*D+x*W+T*rt,r[11]=y*E+_*k+x*$+T*xt,r[15]=y*b+_*U+x*et+T*Tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+v*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+m*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],y=u*m*c-v*d*c+v*l*f-a*m*f-u*l*p+a*d*p,_=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,x=h*v*c-g*u*c+g*a*f-o*v*f-h*a*p+o*u*p,T=g*u*l-h*v*l-g*a*d+o*v*d+h*a*m-o*u*m,M=e*y+n*_+s*x+r*T;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/M;return t[0]=y*w,t[1]=(v*d*r-u*m*r-v*s*f+n*m*f+u*s*p-n*d*p)*w,t[2]=(a*m*r-v*l*r+v*s*c-n*m*c-a*s*p+n*l*p)*w,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*w,t[4]=_*w,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*w,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*w,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*w,t[8]=x*w,t[9]=(g*u*r-h*v*r-g*n*f+e*v*f+h*n*p-e*u*p)*w,t[10]=(o*v*r-g*a*r+g*n*c-e*v*c-o*n*p+e*a*p)*w,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*w,t[12]=T*w,t[13]=(h*v*s-g*u*s+g*n*d-e*v*d-h*n*m+e*u*m)*w,t[14]=(g*a*s-o*v*s-g*n*l+e*v*l+o*n*m-e*a*m)*w,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*w,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,y=l*c,_=l*h,x=l*u,T=n.x,M=n.y,w=n.z;return s[0]=(1-(v+p))*T,s[1]=(f+x)*T,s[2]=(g-_)*T,s[3]=0,s[4]=(f-x)*M,s[5]=(1-(d+p))*M,s[6]=(m+y)*M,s[7]=0,s[8]=(g+_)*w,s[9]=(m-y)*w,s[10]=(1-(d+v))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Gs.set(s[0],s[1],s[2]).length();const o=Gs.set(s[4],s[5],s[6]).length(),a=Gs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Jn.copy(this);const c=1/r,h=1/o,u=1/a;return Jn.elements[0]*=c,Jn.elements[1]*=c,Jn.elements[2]*=c,Jn.elements[4]*=h,Jn.elements[5]*=h,Jn.elements[6]*=h,Jn.elements[8]*=u,Jn.elements[9]*=u,Jn.elements[10]*=u,e.setFromRotationMatrix(Jn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Ci){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===Ci)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ia)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Ci){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*c,f=(n+s)*h;let g,v;if(a===Ci)g=(o+r)*u,v=-2*u;else if(a===Ia)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Gs=new N,Jn=new Me,mm=new N(0,0,0),gm=new N(1,1,1),Gi=new N,Fo=new N,Ln=new N,fu=new Me,pu=new Di;class $n{constructor(t=0,e=0,n=0,s=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(te(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-te(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return fu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(fu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return pu.setFromEuler(this),this.setFromQuaternion(pu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class fh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let vm=0;const mu=new N,Vs=new Di,Mi=new Me,ko=new N,Wr=new N,_m=new N,xm=new Di,gu=new N(1,0,0),vu=new N(0,1,0),_u=new N(0,0,1),xu={type:"added"},ym={type:"removed"},Ws={type:"childadded",child:null},dl={type:"childremoved",child:null};class an extends Cr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vm++}),this.uuid=Rr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=an.DEFAULT_UP.clone();const t=new N,e=new $n,n=new Di,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Me},normalMatrix:{value:new Kt}}),this.matrix=new Me,this.matrixWorld=new Me,this.matrixAutoUpdate=an.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Vs.setFromAxisAngle(t,e),this.quaternion.multiply(Vs),this}rotateOnWorldAxis(t,e){return Vs.setFromAxisAngle(t,e),this.quaternion.premultiply(Vs),this}rotateX(t){return this.rotateOnAxis(gu,t)}rotateY(t){return this.rotateOnAxis(vu,t)}rotateZ(t){return this.rotateOnAxis(_u,t)}translateOnAxis(t,e){return mu.copy(t).applyQuaternion(this.quaternion),this.position.add(mu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(gu,t)}translateY(t){return this.translateOnAxis(vu,t)}translateZ(t){return this.translateOnAxis(_u,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Mi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ko.copy(t):ko.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mi.lookAt(Wr,ko,this.up):Mi.lookAt(ko,Wr,this.up),this.quaternion.setFromRotationMatrix(Mi),s&&(Mi.extractRotation(s.matrixWorld),Vs.setFromRotationMatrix(Mi),this.quaternion.premultiply(Vs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(xu),Ws.child=t,this.dispatchEvent(Ws),Ws.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ym),dl.child=t,this.dispatchEvent(dl),dl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Mi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Mi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Mi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(xu),Ws.child=t,this.dispatchEvent(Ws),Ws.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,t,_m),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,xm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}an.DEFAULT_UP=new N(0,1,0);an.DEFAULT_MATRIX_AUTO_UPDATE=!0;an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qn=new N,wi=new N,fl=new N,bi=new N,Xs=new N,qs=new N,yu=new N,pl=new N,ml=new N,gl=new N,vl=new ke,_l=new ke,xl=new ke;class ni{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Qn.subVectors(t,e),s.cross(Qn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Qn.subVectors(s,e),wi.subVectors(n,e),fl.subVectors(t,e);const o=Qn.dot(Qn),a=Qn.dot(wi),l=Qn.dot(fl),c=wi.dot(wi),h=wi.dot(fl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,bi.x),l.addScaledVector(o,bi.y),l.addScaledVector(a,bi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return vl.setScalar(0),_l.setScalar(0),xl.setScalar(0),vl.fromBufferAttribute(t,e),_l.fromBufferAttribute(t,n),xl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(vl,r.x),o.addScaledVector(_l,r.y),o.addScaledVector(xl,r.z),o}static isFrontFacing(t,e,n,s){return Qn.subVectors(n,e),wi.subVectors(t,e),Qn.cross(wi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Qn.cross(wi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ni.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ni.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return ni.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return ni.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ni.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Xs.subVectors(s,n),qs.subVectors(r,n),pl.subVectors(t,n);const l=Xs.dot(pl),c=qs.dot(pl);if(l<=0&&c<=0)return e.copy(n);ml.subVectors(t,s);const h=Xs.dot(ml),u=qs.dot(ml);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Xs,o);gl.subVectors(t,r);const f=Xs.dot(gl),g=qs.dot(gl);if(g>=0&&f<=g)return e.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(qs,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return yu.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(yu,a);const p=1/(m+v+d);return o=v*p,a=d*p,e.copy(n).addScaledVector(Xs,o).addScaledVector(qs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Sf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},Oo={h:0,s:0,l:0};function yl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class at{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=An){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=de.workingColorSpace){if(t=dh(t,1),e=te(e,0,1),n=te(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=yl(o,r,t+1/3),this.g=yl(o,r,t),this.b=yl(o,r,t-1/3)}return de.toWorkingColorSpace(this,s),this}setStyle(t,e=An){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=An){const n=Sf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Li(t.r),this.g=Li(t.g),this.b=Li(t.b),this}copyLinearToSRGB(t){return this.r=fr(t.r),this.g=fr(t.g),this.b=fr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=An){return de.fromWorkingColorSpace(un.copy(this),t),Math.round(te(un.r*255,0,255))*65536+Math.round(te(un.g*255,0,255))*256+Math.round(te(un.b*255,0,255))}getHexString(t=An){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.fromWorkingColorSpace(un.copy(this),e);const n=un.r,s=un.g,r=un.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.fromWorkingColorSpace(un.copy(this),e),t.r=un.r,t.g=un.g,t.b=un.b,t}getStyle(t=An){de.fromWorkingColorSpace(un.copy(this),t);const e=un.r,n=un.g,s=un.b;return t!==An?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Vi),this.setHSL(Vi.h+t,Vi.s+e,Vi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vi),t.getHSL(Oo);const n=so(Vi.h,Oo.h,e),s=so(Vi.s,Oo.s,e),r=so(Vi.l,Oo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const un=new at;at.NAMES=Sf;let Mm=0;class Lr extends Cr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=Rr(),this.name="",this.type="Material",this.blending=ur,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lc,this.blendDst=cc,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=gr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ru,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ks,this.stencilZFail=ks,this.stencilZPass=ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(n.blending=this.blending),this.side!==ki&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==lc&&(n.blendSrc=this.blendSrc),this.blendDst!==cc&&(n.blendDst=this.blendDst),this.blendEquation!==_s&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ru&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ks&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ks&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ks&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class yo extends Lr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=nh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const $e=new N,Bo=new ht;class Pe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ou,this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Bo.fromBufferAttribute(this,e),Bo.applyMatrix3(t),this.setXY(e,Bo.x,Bo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix3(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix4(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyNormalMatrix(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.transformDirection(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=sr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=wn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=sr(e,this.array)),e}setX(t,e){return this.normalized&&(e=wn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=sr(e,this.array)),e}setY(t,e){return this.normalized&&(e=wn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=sr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=wn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=sr(e,this.array)),e}setW(t,e){return this.normalized&&(e=wn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=wn(e,this.array),n=wn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=wn(e,this.array),n=wn(n,this.array),s=wn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=wn(e,this.array),n=wn(n,this.array),s=wn(s,this.array),r=wn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ou&&(t.usage=this.usage),t}}class ph extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class mh extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Le extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let wm=0;const Bn=new Me,Ml=new an,Ys=new N,Dn=new ss,Xr=new ss,en=new N;class ln extends Cr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=Rr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yf(t)?mh:ph)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Bn.makeRotationFromQuaternion(t),this.applyMatrix4(Bn),this}rotateX(t){return Bn.makeRotationX(t),this.applyMatrix4(Bn),this}rotateY(t){return Bn.makeRotationY(t),this.applyMatrix4(Bn),this}rotateZ(t){return Bn.makeRotationZ(t),this.applyMatrix4(Bn),this}translate(t,e,n){return Bn.makeTranslation(t,e,n),this.applyMatrix4(Bn),this}scale(t,e,n){return Bn.makeScale(t,e,n),this.applyMatrix4(Bn),this}lookAt(t){return Ml.lookAt(t),Ml.updateMatrix(),this.applyMatrix4(Ml.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ys).negate(),this.translate(Ys.x,Ys.y,Ys.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Le(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ss);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Dn.setFromBufferAttribute(r),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(Dn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Xr.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(Dn.min,Xr.min),Dn.expandByPoint(en),en.addVectors(Dn.max,Xr.max),Dn.expandByPoint(en)):(Dn.expandByPoint(Xr.min),Dn.expandByPoint(Xr.max))}Dn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)en.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(en));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)en.fromBufferAttribute(a,c),l&&(Ys.fromBufferAttribute(t,c),en.add(Ys)),s=Math.max(s,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<n.count;E++)a[E]=new N,l[E]=new N;const c=new N,h=new N,u=new N,d=new ht,f=new ht,g=new ht,v=new N,m=new N;function p(E,b,S){c.fromBufferAttribute(n,E),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,E),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(D),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),a[E].add(v),a[b].add(v),a[S].add(v),l[E].add(m),l[b].add(m),l[S].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let E=0,b=y.length;E<b;++E){const S=y[E],D=S.start,k=S.count;for(let U=D,z=D+k;U<z;U+=3)p(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const _=new N,x=new N,T=new N,M=new N;function w(E){T.fromBufferAttribute(s,E),M.copy(T);const b=a[E];_.copy(b),_.sub(T.multiplyScalar(T.dot(b))).normalize(),x.crossVectors(M,b);const D=x.dot(l[E])<0?-1:1;o.setXYZW(E,_.x,_.y,_.z,D)}for(let E=0,b=y.length;E<b;++E){const S=y[E],D=S.start,k=S.count;for(let U=D,z=D+k;U<z;U+=3)w(t.getX(U+0)),w(t.getX(U+1)),w(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new N,r=new N,o=new N,a=new N,l=new N,c=new N,h=new N,u=new N;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)en.fromBufferAttribute(t,e),en.normalize(),t.setXYZ(e,en.x,en.y,en.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Pe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ln,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Mu=new Me,cs=new bf,zo=new Pr,wu=new N,Ho=new N,Go=new N,Vo=new N,wl=new N,Wo=new N,bu=new N,Xo=new N;class Oe extends an{constructor(t=new ln,e=new yo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Wo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(wl.fromBufferAttribute(u,t),o?Wo.addScaledVector(wl,h):Wo.addScaledVector(wl.sub(e),h))}e.add(Wo)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(r),cs.copy(t.ray).recast(t.near),!(zo.containsPoint(cs.origin)===!1&&(cs.intersectSphere(zo,wu)===null||cs.origin.distanceToSquared(wu)>(t.far-t.near)**2))&&(Mu.copy(r).invert(),cs.copy(t.ray).applyMatrix4(Mu),!(n.boundingBox!==null&&cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,cs)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,T=_;x<T;x+=3){const M=a.getX(x),w=a.getX(x+1),E=a.getX(x+2);s=qo(this,p,t,n,c,h,u,M,w,E),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=a.getX(m),_=a.getX(m+1),x=a.getX(m+2);s=qo(this,o,t,n,c,h,u,y,_,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),_=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,T=_;x<T;x+=3){const M=x,w=x+1,E=x+2;s=qo(this,p,t,n,c,h,u,M,w,E),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=m,_=m+1,x=m+2;s=qo(this,o,t,n,c,h,u,y,_,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function bm(i,t,e,n,s,r,o,a){let l;if(t.side===Sn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===ki,a),l===null)return null;Xo.copy(a),Xo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Xo);return c<e.near||c>e.far?null:{distance:c,point:Xo.clone(),object:i}}function qo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Ho),i.getVertexPosition(l,Go),i.getVertexPosition(c,Vo);const h=bm(i,t,e,n,Ho,Go,Vo,bu);if(h){const u=new N;ni.getBarycoord(bu,Ho,Go,Vo,u),s&&(h.uv=ni.getInterpolatedAttribute(s,a,l,c,u,new ht)),r&&(h.uv1=ni.getInterpolatedAttribute(r,a,l,c,u,new ht)),o&&(h.normal=ni.getInterpolatedAttribute(o,a,l,c,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new N,materialIndex:0};ni.getNormal(Ho,Go,Vo,d.normal),h.face=d,h.barycoord=u}return h}class es extends ln{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Le(c,3)),this.setAttribute("normal",new Le(h,3)),this.setAttribute("uv",new Le(u,2));function g(v,m,p,y,_,x,T,M,w,E,b){const S=x/w,D=T/E,k=x/2,U=T/2,z=M/2,W=w+1,$=E+1;let et=0,Y=0;const rt=new N;for(let xt=0;xt<$;xt++){const Tt=xt*D-U;for(let Xt=0;Xt<W;Xt++){const ve=Xt*S-k;rt[v]=ve*y,rt[m]=Tt*_,rt[p]=z,c.push(rt.x,rt.y,rt.z),rt[v]=0,rt[m]=0,rt[p]=M>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(Xt/w),u.push(1-xt/E),et+=1}}for(let xt=0;xt<E;xt++)for(let Tt=0;Tt<w;Tt++){const Xt=d+Tt+W*xt,ve=d+Tt+W*(xt+1),K=d+(Tt+1)+W*(xt+1),it=d+(Tt+1)+W*xt;l.push(Xt,ve,it),l.push(ve,K,it),Y+=6}a.addGroup(f,Y,b),f+=Y,d+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new es(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function wr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function bn(i){const t={};for(let e=0;e<i.length;e++){const n=wr(i[e]);for(const s in n)t[s]=n[s]}return t}function Sm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ef(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}const po={clone:wr,merge:bn};var Em=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Je extends Lr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Em,this.fragmentShader=Tm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=wr(t.uniforms),this.uniformsGroups=Sm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Tf extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Me,this.projectionMatrix=new Me,this.projectionMatrixInverse=new Me,this.coordinateSystem=Ci}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wi=new N,Su=new ht,Eu=new ht;class Vn extends Tf{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=fo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(io*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fo*2*Math.atan(Math.tan(io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z)}getViewSize(t,e){return this.getViewBounds(t,Su,Eu),e.subVectors(Eu,Su)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(io*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const $s=-90,js=1;class Am extends an{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Vn($s,js,t,e);s.layers=this.layers,this.add(s);const r=new Vn($s,js,t,e);r.layers=this.layers,this.add(r);const o=new Vn($s,js,t,e);o.layers=this.layers,this.add(o);const a=new Vn($s,js,t,e);a.layers=this.layers,this.add(a);const l=new Vn($s,js,t,e);l.layers=this.layers,this.add(l);const c=new Vn($s,js,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Ci)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ia)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Af extends vn{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:vr,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Cm extends Yn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Af(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:qn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new es(5,5,5),r=new Je({name:"CubemapFromEquirect",uniforms:wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Sn,blending:Pi});r.uniforms.tEquirect.value=e;const o=new Oe(s,r),a=e.minFilter;return e.minFilter===ws&&(e.minFilter=qn),new Am(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class gh{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new at(t),this.density=e}clone(){return new gh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Rm extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Na extends vn{constructor(t=null,e=1,n=1,s,r,o,a,l,c=En,h=En,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fa extends Pe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Zs=new Me,Tu=new Me,Yo=[],Au=new ss,Pm=new Me,qr=new Oe,Yr=new Pr;class ba extends Oe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Fa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Pm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ss),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Zs),Au.copy(t.boundingBox).applyMatrix4(Zs),this.boundingBox.union(Au)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Pr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Zs),Yr.copy(t.boundingSphere).applyMatrix4(Zs),this.boundingSphere.union(Yr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(qr.geometry=this.geometry,qr.material=this.material,qr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yr.copy(this.boundingSphere),Yr.applyMatrix4(n),t.ray.intersectsSphere(Yr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Zs),Tu.multiplyMatrices(n,Zs),qr.matrixWorld=Tu,qr.raycast(t,Yo);for(let o=0,a=Yo.length;o<a;o++){const l=Yo[o];l.instanceId=r,l.object=this,e.push(l)}Yo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Fa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Na(new Float32Array(s*this.count),s,this.count,ah,ai));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const bl=new N,Lm=new N,Dm=new Kt;class $i{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=bl.subVectors(n,e).cross(Lm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(bl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Dm.getNormalMatrix(t),s=this.coplanarPoint(bl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hs=new Pr,$o=new N;class vh{constructor(t=new $i,e=new $i,n=new $i,s=new $i,r=new $i,o=new $i){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ci){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],y=s[13],_=s[14],x=s[15];if(n[0].setComponents(l-r,d-c,m-f,x-p).normalize(),n[1].setComponents(l+r,d+c,m+f,x+p).normalize(),n[2].setComponents(l+o,d+h,m+g,x+y).normalize(),n[3].setComponents(l-o,d-h,m-g,x-y).normalize(),n[4].setComponents(l-a,d-u,m-v,x-_).normalize(),e===Ci)n[5].setComponents(l+a,d+u,m+v,x+_).normalize();else if(e===Ia)n[5].setComponents(a,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hs)}intersectsSprite(t){return hs.center.set(0,0,0),hs.radius=.7071067811865476,hs.applyMatrix4(t.matrixWorld),this.intersectsSphere(hs)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if($o.x=s.normal.x>0?t.max.x:t.min.x,$o.y=s.normal.y>0?t.max.y:t.min.y,$o.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint($o)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class bs extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Cf extends vn{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rf extends vn{constructor(t,e,n,s,r,o,a,l,c,h=dr){if(h!==dr&&h!==yr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===dr&&(n=Ts),n===void 0&&h===yr&&(n=xr),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:En,this.minFilter=l!==void 0?l:En,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class pi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new ht:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new N,s=[],r=[],o=[],a=new N,l=new Me;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new N)}r[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(te(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(te(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class _h extends pi{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ht){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Im extends _h{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function xh(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const jo=new N,Sl=new xh,El=new xh,Tl=new xh;class Um extends pi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new N){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(jo.subVectors(s[0],s[1]).add(s[0]),c=jo);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(jo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=jo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Sl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),El.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),Tl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Sl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),El.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Tl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Sl.calc(l),El.calc(l),Tl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Cu(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Nm(i,t){const e=1-i;return e*e*t}function Fm(i,t){return 2*(1-i)*i*t}function km(i,t){return i*i*t}function ro(i,t,e,n){return Nm(i,t)+Fm(i,e)+km(i,n)}function Om(i,t){const e=1-i;return e*e*e*t}function Bm(i,t){const e=1-i;return 3*e*e*i*t}function zm(i,t){return 3*(1-i)*i*i*t}function Hm(i,t){return i*i*i*t}function oo(i,t,e,n,s){return Om(i,t)+Bm(i,e)+zm(i,n)+Hm(i,s)}class Pf extends pi{constructor(t=new ht,e=new ht,n=new ht,s=new ht){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ht){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(oo(t,s.x,r.x,o.x,a.x),oo(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Gm extends pi{constructor(t=new N,e=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new N){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(oo(t,s.x,r.x,o.x,a.x),oo(t,s.y,r.y,o.y,a.y),oo(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Lf extends pi{constructor(t=new ht,e=new ht){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ht){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ht){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vm extends pi{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Df extends pi{constructor(t=new ht,e=new ht,n=new ht){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ht){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ro(t,s.x,r.x,o.x),ro(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wm extends pi{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ro(t,s.x,r.x,o.x),ro(t,s.y,r.y,o.y),ro(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class If extends pi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ht){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Cu(a,l.x,c.x,h.x,u.x),Cu(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ht().fromArray(s))}return this}}var Ru=Object.freeze({__proto__:null,ArcCurve:Im,CatmullRomCurve3:Um,CubicBezierCurve:Pf,CubicBezierCurve3:Gm,EllipseCurve:_h,LineCurve:Lf,LineCurve3:Vm,QuadraticBezierCurve:Df,QuadraticBezierCurve3:Wm,SplineCurve:If});class Xm extends pi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ru[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Ru[s.type]().fromJSON(s))}return this}}class qm extends Xm{constructor(t){super(),this.type="Path",this.currentPoint=new ht,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Lf(this.currentPoint.clone(),new ht(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Df(this.currentPoint.clone(),new ht(t,e),new ht(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Pf(this.currentPoint.clone(),new ht(t,e),new ht(n,s),new ht(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new If(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){const c=new _h(t,e,n,s,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class yh extends ln{constructor(t=[new ht(0,-.5),new ht(.5,0),new ht(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=te(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,u=new N,d=new ht,f=new N,g=new N,v=new N;let m=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(g)}for(let y=0;y<=e;y++){const _=n+y*h*s,x=Math.sin(_),T=Math.cos(_);for(let M=0;M<=t.length-1;M++){u.x=t[M].x*x,u.y=t[M].y,u.z=t[M].x*T,o.push(u.x,u.y,u.z),d.x=y/e,d.y=M/(t.length-1),a.push(d.x,d.y);const w=l[3*M+0]*x,E=l[3*M+1],b=l[3*M+0]*T;c.push(w,E,b)}}for(let y=0;y<e;y++)for(let _=0;_<t.length-1;_++){const x=_+y*t.length,T=x,M=x+t.length,w=x+t.length+1,E=x+1;r.push(T,M,E),r.push(w,E,M)}this.setIndex(r),this.setAttribute("position",new Le(o,3)),this.setAttribute("uv",new Le(a,2)),this.setAttribute("normal",new Le(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yh(t.points,t.segments,t.phiStart,t.phiLength)}}class Mh extends yh{constructor(t=1,e=1,n=4,s=8){const r=new qm;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new Mh(t.radius,t.length,t.capSegments,t.radialSegments)}}class wh extends ln{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;y(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Le(u,3)),this.setAttribute("normal",new Le(d,3)),this.setAttribute("uv",new Le(f,2));function y(){const x=new N,T=new N;let M=0;const w=(e-t)/n;for(let E=0;E<=r;E++){const b=[],S=E/r,D=S*(e-t)+t;for(let k=0;k<=s;k++){const U=k/s,z=U*l+a,W=Math.sin(z),$=Math.cos(z);T.x=D*W,T.y=-S*n+m,T.z=D*$,u.push(T.x,T.y,T.z),x.set(W,w,$).normalize(),d.push(x.x,x.y,x.z),f.push(U,1-S),b.push(g++)}v.push(b)}for(let E=0;E<s;E++)for(let b=0;b<r;b++){const S=v[b][E],D=v[b+1][E],k=v[b+1][E+1],U=v[b][E+1];(t>0||b!==0)&&(h.push(S,D,U),M+=3),(e>0||b!==r-1)&&(h.push(D,k,U),M+=3)}c.addGroup(p,M,0),p+=M}function _(x){const T=g,M=new ht,w=new N;let E=0;const b=x===!0?t:e,S=x===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*S,0),d.push(0,S,0),f.push(.5,.5),g++;const D=g;for(let k=0;k<=s;k++){const z=k/s*l+a,W=Math.cos(z),$=Math.sin(z);w.x=b*$,w.y=m*S,w.z=b*W,u.push(w.x,w.y,w.z),d.push(0,S,0),M.x=W*.5+.5,M.y=$*.5*S+.5,f.push(M.x,M.y),g++}for(let k=0;k<s;k++){const U=T+k,z=D+k;x===!0?h.push(z,z+1,U):h.push(z+1,z,U),E+=3}c.addGroup(p,E,x===!0?1:2),p+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wh(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class bh extends wh{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new bh(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wa extends ln{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Le(r,3)),this.setAttribute("normal",new Le(r.slice(),3)),this.setAttribute("uv",new Le(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const _=new N,x=new N,T=new N;for(let M=0;M<e.length;M+=3)f(e[M+0],_),f(e[M+1],x),f(e[M+2],T),l(_,x,T,y)}function l(y,_,x,T){const M=T+1,w=[];for(let E=0;E<=M;E++){w[E]=[];const b=y.clone().lerp(x,E/M),S=_.clone().lerp(x,E/M),D=M-E;for(let k=0;k<=D;k++)k===0&&E===M?w[E][k]=b:w[E][k]=b.clone().lerp(S,k/D)}for(let E=0;E<M;E++)for(let b=0;b<2*(M-E)-1;b++){const S=Math.floor(b/2);b%2===0?(d(w[E][S+1]),d(w[E+1][S]),d(w[E][S])):(d(w[E][S+1]),d(w[E+1][S+1]),d(w[E+1][S]))}}function c(y){const _=new N;for(let x=0;x<r.length;x+=3)_.x=r[x+0],_.y=r[x+1],_.z=r[x+2],_.normalize().multiplyScalar(y),r[x+0]=_.x,r[x+1]=_.y,r[x+2]=_.z}function h(){const y=new N;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];const x=m(y)/2/Math.PI+.5,T=p(y)/Math.PI+.5;o.push(x,1-T)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){const _=o[y+0],x=o[y+2],T=o[y+4],M=Math.max(_,x,T),w=Math.min(_,x,T);M>.9&&w<.1&&(_<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),T<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,_){const x=y*3;_.x=t[x+0],_.y=t[x+1],_.z=t[x+2]}function g(){const y=new N,_=new N,x=new N,T=new N,M=new ht,w=new ht,E=new ht;for(let b=0,S=0;b<r.length;b+=9,S+=6){y.set(r[b+0],r[b+1],r[b+2]),_.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),M.set(o[S+0],o[S+1]),w.set(o[S+2],o[S+3]),E.set(o[S+4],o[S+5]),T.copy(y).add(_).add(x).divideScalar(3);const D=m(T);v(M,S+0,y,D),v(w,S+2,_,D),v(E,S+4,x,D)}}function v(y,_,x,T){T<0&&y.x===1&&(o[_]=y.x-1),x.x===0&&x.z===0&&(o[_]=T/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wa(t.vertices,t.indices,t.radius,t.details)}}class Sh extends Wa{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Sh(t.radius,t.detail)}}class Eh extends Wa{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Eh(t.radius,t.detail)}}class mi extends ln{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const y=p*d-o;for(let _=0;_<c;_++){const x=_*u-r;g.push(x,-y,0),v.push(0,0,1),m.push(_/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const _=y+c*p,x=y+c*(p+1),T=y+1+c*(p+1),M=y+1+c*p;f.push(_,x,M),f.push(x,T,M)}this.setIndex(f),this.setAttribute("position",new Le(g,3)),this.setAttribute("normal",new Le(v,3)),this.setAttribute("uv",new Le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mi(t.width,t.height,t.widthSegments,t.heightSegments)}}class Xa extends ln{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new N,d=new N,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const y=[],_=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let T=0;T<=e;T++){const M=T/e;u.x=-t*Math.cos(s+M*r)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(s+M*r)*Math.sin(o+_*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(M+x,1-_),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const _=h[p][y+1],x=h[p][y],T=h[p+1][y],M=h[p+1][y+1];(p!==0||o>0)&&f.push(_,x,M),(p!==n-1||l<Math.PI)&&f.push(x,T,M)}this.setIndex(f),this.setAttribute("position",new Le(g,3)),this.setAttribute("normal",new Le(v,3)),this.setAttribute("uv",new Le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xa(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ym extends Je{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Pu extends Lr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new at(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uh,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class qa extends Lr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uh,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=nh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Uf extends Lr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class $m extends Lr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Th extends an{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new at(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class jm extends Th{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.groundColor=new at(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Al=new Me,Lu=new N,Du=new N;class Zm{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ht(512,512),this.map=null,this.mapPass=null,this.matrix=new Me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vh,this._frameExtents=new ht(1,1),this._viewportCount=1,this._viewports=[new ke(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Lu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Lu),Du.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Du),e.updateMatrixWorld(),Al.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Al),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Al)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ah extends Tf{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Km extends Zm{constructor(){super(new Ah(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Jm extends Th{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.target=new an,this.shadow=new Km}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Qm extends Th{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class tg extends ln{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class eg extends Vn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ng{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Iu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Iu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Iu(){return performance.now()}const Uu=new Me;class ig{constructor(t,e,n=0,s=1/0){this.ray=new bf(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new fh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Uu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Uu),this}intersectObject(t,e=!0,n=[]){return qc(t,this,n,e),n.sort(Nu),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)qc(t[s],this,n,e);return n.sort(Nu),n}}function Nu(i,t){return i.distance-t.distance}function qc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)qc(r[o],t,e,!0)}}function Fu(i,t,e,n){const s=sg(n);switch(e){case df:return i*t;case pf:return i*t;case mf:return i*t*2;case ah:return i*t/s.components*s.byteLength;case lh:return i*t/s.components*s.byteLength;case gf:return i*t*2/s.components*s.byteLength;case ch:return i*t*2/s.components*s.byteLength;case ff:return i*t*3/s.components*s.byteLength;case In:return i*t*4/s.components*s.byteLength;case hh:return i*t*4/s.components*s.byteLength;case _a:case xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ya:case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Mc:case bc:return Math.max(i,16)*Math.max(t,8)/4;case yc:case wc:return Math.max(i,8)*Math.max(t,8)/2;case Sc:case Ec:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Tc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ac:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Cc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Rc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Pc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Lc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Dc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ic:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Uc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Nc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Fc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case kc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Oc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Bc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case zc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case wa:case Hc:case Gc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case vf:case Vc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Wc:case Xc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function sg(i){switch(i){case ui:case cf:return{byteLength:1,components:1};case uo:case hf:case ci:return{byteLength:2,components:1};case rh:case oh:return{byteLength:2,components:4};case Ts:case sh:case ai:return{byteLength:4,components:1};case uf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:eh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=eh);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Nf(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function rg(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var og=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ag=`#ifdef USE_ALPHAHASH
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
#endif`,lg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ug=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dg=`#ifdef USE_AOMAP
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
#endif`,fg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pg=`#ifdef USE_BATCHING
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
#endif`,mg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_g=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,xg=`#ifdef USE_IRIDESCENCE
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
#endif`,yg=`#ifdef USE_BUMPMAP
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
#endif`,Mg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Eg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ag=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Cg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Rg=`#define PI 3.141592653589793
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
} // validated`,Pg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Lg=`vec3 transformedNormal = objectNormal;
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
#endif`,Dg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ig=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ug=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ng=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fg="gl_FragColor = linearToOutputTexel( gl_FragColor );",kg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Og=`#ifdef USE_ENVMAP
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
#endif`,Bg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zg=`#ifdef USE_ENVMAP
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
#endif`,Hg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gg=`#ifdef USE_ENVMAP
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
#endif`,Vg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yg=`#ifdef USE_GRADIENTMAP
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
}`,$g=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kg=`uniform bool receiveShadow;
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
#endif`,Jg=`#ifdef USE_ENVMAP
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
#endif`,Qg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,t1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,e1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,n1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,i1=`PhysicalMaterial material;
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
#endif`,s1=`struct PhysicalMaterial {
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
}`,r1=`
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
#endif`,o1=`#if defined( RE_IndirectDiffuse )
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
#endif`,a1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,l1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,c1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,u1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,d1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,f1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,p1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,m1=`#if defined( USE_POINTS_UV )
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
#endif`,g1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,v1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,x1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,y1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M1=`#ifdef USE_MORPHTARGETS
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
#endif`,w1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,b1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,S1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,E1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,C1=`#ifdef USE_NORMALMAP
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
#endif`,R1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,P1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,L1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,D1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,I1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,U1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,N1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,F1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,k1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,O1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,B1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,z1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,H1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,G1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,V1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,W1=`float getShadowMask() {
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
}`,X1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,q1=`#ifdef USE_SKINNING
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
#endif`,Y1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$1=`#ifdef USE_SKINNING
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
#endif`,j1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Z1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,K1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,J1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Q1=`#ifdef USE_TRANSMISSION
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
#endif`,tv=`#ifdef USE_TRANSMISSION
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
#endif`,ev=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,iv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ov=`uniform sampler2D t2D;
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
}`,av=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,cv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uv=`#include <common>
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
}`,dv=`#if DEPTH_PACKING == 3200
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
}`,fv=`#define DISTANCE
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
}`,pv=`#define DISTANCE
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
}`,mv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vv=`uniform float scale;
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
}`,_v=`uniform vec3 diffuse;
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
}`,xv=`#include <common>
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
}`,yv=`uniform vec3 diffuse;
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
}`,Mv=`#define LAMBERT
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
}`,wv=`#define LAMBERT
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
}`,bv=`#define MATCAP
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
}`,Sv=`#define MATCAP
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
}`,Ev=`#define NORMAL
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
}`,Tv=`#define NORMAL
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
}`,Av=`#define PHONG
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
}`,Cv=`#define PHONG
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
}`,Rv=`#define STANDARD
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
}`,Pv=`#define STANDARD
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
}`,Lv=`#define TOON
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
}`,Dv=`#define TOON
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
}`,Iv=`uniform float size;
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
}`,Uv=`uniform vec3 diffuse;
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
}`,Nv=`#include <common>
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
}`,Fv=`uniform vec3 color;
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
}`,kv=`uniform float rotation;
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
}`,Ov=`uniform vec3 diffuse;
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
}`,Qt={alphahash_fragment:og,alphahash_pars_fragment:ag,alphamap_fragment:lg,alphamap_pars_fragment:cg,alphatest_fragment:hg,alphatest_pars_fragment:ug,aomap_fragment:dg,aomap_pars_fragment:fg,batching_pars_vertex:pg,batching_vertex:mg,begin_vertex:gg,beginnormal_vertex:vg,bsdfs:_g,iridescence_fragment:xg,bumpmap_pars_fragment:yg,clipping_planes_fragment:Mg,clipping_planes_pars_fragment:wg,clipping_planes_pars_vertex:bg,clipping_planes_vertex:Sg,color_fragment:Eg,color_pars_fragment:Tg,color_pars_vertex:Ag,color_vertex:Cg,common:Rg,cube_uv_reflection_fragment:Pg,defaultnormal_vertex:Lg,displacementmap_pars_vertex:Dg,displacementmap_vertex:Ig,emissivemap_fragment:Ug,emissivemap_pars_fragment:Ng,colorspace_fragment:Fg,colorspace_pars_fragment:kg,envmap_fragment:Og,envmap_common_pars_fragment:Bg,envmap_pars_fragment:zg,envmap_pars_vertex:Hg,envmap_physical_pars_fragment:Jg,envmap_vertex:Gg,fog_vertex:Vg,fog_pars_vertex:Wg,fog_fragment:Xg,fog_pars_fragment:qg,gradientmap_pars_fragment:Yg,lightmap_pars_fragment:$g,lights_lambert_fragment:jg,lights_lambert_pars_fragment:Zg,lights_pars_begin:Kg,lights_toon_fragment:Qg,lights_toon_pars_fragment:t1,lights_phong_fragment:e1,lights_phong_pars_fragment:n1,lights_physical_fragment:i1,lights_physical_pars_fragment:s1,lights_fragment_begin:r1,lights_fragment_maps:o1,lights_fragment_end:a1,logdepthbuf_fragment:l1,logdepthbuf_pars_fragment:c1,logdepthbuf_pars_vertex:h1,logdepthbuf_vertex:u1,map_fragment:d1,map_pars_fragment:f1,map_particle_fragment:p1,map_particle_pars_fragment:m1,metalnessmap_fragment:g1,metalnessmap_pars_fragment:v1,morphinstance_vertex:_1,morphcolor_vertex:x1,morphnormal_vertex:y1,morphtarget_pars_vertex:M1,morphtarget_vertex:w1,normal_fragment_begin:b1,normal_fragment_maps:S1,normal_pars_fragment:E1,normal_pars_vertex:T1,normal_vertex:A1,normalmap_pars_fragment:C1,clearcoat_normal_fragment_begin:R1,clearcoat_normal_fragment_maps:P1,clearcoat_pars_fragment:L1,iridescence_pars_fragment:D1,opaque_fragment:I1,packing:U1,premultiplied_alpha_fragment:N1,project_vertex:F1,dithering_fragment:k1,dithering_pars_fragment:O1,roughnessmap_fragment:B1,roughnessmap_pars_fragment:z1,shadowmap_pars_fragment:H1,shadowmap_pars_vertex:G1,shadowmap_vertex:V1,shadowmask_pars_fragment:W1,skinbase_vertex:X1,skinning_pars_vertex:q1,skinning_vertex:Y1,skinnormal_vertex:$1,specularmap_fragment:j1,specularmap_pars_fragment:Z1,tonemapping_fragment:K1,tonemapping_pars_fragment:J1,transmission_fragment:Q1,transmission_pars_fragment:tv,uv_pars_fragment:ev,uv_pars_vertex:nv,uv_vertex:iv,worldpos_vertex:sv,background_vert:rv,background_frag:ov,backgroundCube_vert:av,backgroundCube_frag:lv,cube_vert:cv,cube_frag:hv,depth_vert:uv,depth_frag:dv,distanceRGBA_vert:fv,distanceRGBA_frag:pv,equirect_vert:mv,equirect_frag:gv,linedashed_vert:vv,linedashed_frag:_v,meshbasic_vert:xv,meshbasic_frag:yv,meshlambert_vert:Mv,meshlambert_frag:wv,meshmatcap_vert:bv,meshmatcap_frag:Sv,meshnormal_vert:Ev,meshnormal_frag:Tv,meshphong_vert:Av,meshphong_frag:Cv,meshphysical_vert:Rv,meshphysical_frag:Pv,meshtoon_vert:Lv,meshtoon_frag:Dv,points_vert:Iv,points_frag:Uv,shadow_vert:Nv,shadow_frag:Fv,sprite_vert:kv,sprite_frag:Ov},ut={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},oi={basic:{uniforms:bn([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:bn([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new at(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:bn([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:bn([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:bn([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new at(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:bn([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:bn([ut.points,ut.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:bn([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:bn([ut.common,ut.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:bn([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:bn([ut.sprite,ut.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:bn([ut.common,ut.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:bn([ut.lights,ut.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};oi.physical={uniforms:bn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};const Zo={r:0,b:0,g:0},us=new $n,Bv=new Me;function zv(i,t,e,n,s,r,o){const a=new at(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?e:t).get(x)),x}function v(_){let x=!1;const T=g(_);T===null?p(a,l):T&&T.isColor&&(p(T,1),x=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,x){const T=g(x);T&&(T.isCubeTexture||T.mapping===Va)?(h===void 0&&(h=new Oe(new es(1,1,1),new Je({name:"BackgroundCubeMaterial",uniforms:wr(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(M,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),us.copy(x.backgroundRotation),us.x*=-1,us.y*=-1,us.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(us.y*=-1,us.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Bv.makeRotationFromEuler(us)),h.material.toneMapped=de.getTransfer(T.colorSpace)!==ye,(u!==T||d!==T.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Oe(new mi(2,2),new Je({name:"BackgroundMaterial",uniforms:wr(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=de.getTransfer(T.colorSpace)!==ye,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function p(_,x){_.getRGB(Zo,Ef(i)),n.buffers.color.setClear(Zo.r,Zo.g,Zo.b,x,o)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(_,x=1){a.set(_),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(a,l)},render:v,addToRenderList:m,dispose:y}}function Hv(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(S,D,k,U,z){let W=!1;const $=u(U,k,D);r!==$&&(r=$,c(r.object)),W=f(S,U,k,z),W&&g(S,U,k,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,x(S,D,k,U),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,D,k){const U=k.wireframe===!0;let z=n[S.id];z===void 0&&(z={},n[S.id]=z);let W=z[D.id];W===void 0&&(W={},z[D.id]=W);let $=W[U];return $===void 0&&($=d(l()),W[U]=$),$}function d(S){const D=[],k=[],U=[];for(let z=0;z<e;z++)D[z]=0,k[z]=0,U[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:k,attributeDivisors:U,object:S,attributes:{},index:null}}function f(S,D,k,U){const z=r.attributes,W=D.attributes;let $=0;const et=k.getAttributes();for(const Y in et)if(et[Y].location>=0){const xt=z[Y];let Tt=W[Y];if(Tt===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(Tt=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(Tt=S.instanceColor)),xt===void 0||xt.attribute!==Tt||Tt&&xt.data!==Tt.data)return!0;$++}return r.attributesNum!==$||r.index!==U}function g(S,D,k,U){const z={},W=D.attributes;let $=0;const et=k.getAttributes();for(const Y in et)if(et[Y].location>=0){let xt=W[Y];xt===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(xt=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(xt=S.instanceColor));const Tt={};Tt.attribute=xt,xt&&xt.data&&(Tt.data=xt.data),z[Y]=Tt,$++}r.attributes=z,r.attributesNum=$,r.index=U}function v(){const S=r.newAttributes;for(let D=0,k=S.length;D<k;D++)S[D]=0}function m(S){p(S,0)}function p(S,D){const k=r.newAttributes,U=r.enabledAttributes,z=r.attributeDivisors;k[S]=1,U[S]===0&&(i.enableVertexAttribArray(S),U[S]=1),z[S]!==D&&(i.vertexAttribDivisor(S,D),z[S]=D)}function y(){const S=r.newAttributes,D=r.enabledAttributes;for(let k=0,U=D.length;k<U;k++)D[k]!==S[k]&&(i.disableVertexAttribArray(k),D[k]=0)}function _(S,D,k,U,z,W,$){$===!0?i.vertexAttribIPointer(S,D,k,z,W):i.vertexAttribPointer(S,D,k,U,z,W)}function x(S,D,k,U){v();const z=U.attributes,W=k.getAttributes(),$=D.defaultAttributeValues;for(const et in W){const Y=W[et];if(Y.location>=0){let rt=z[et];if(rt===void 0&&(et==="instanceMatrix"&&S.instanceMatrix&&(rt=S.instanceMatrix),et==="instanceColor"&&S.instanceColor&&(rt=S.instanceColor)),rt!==void 0){const xt=rt.normalized,Tt=rt.itemSize,Xt=t.get(rt);if(Xt===void 0)continue;const ve=Xt.buffer,K=Xt.type,it=Xt.bytesPerElement,yt=K===i.INT||K===i.UNSIGNED_INT||rt.gpuType===sh;if(rt.isInterleavedBufferAttribute){const ct=rt.data,Nt=ct.stride,jt=rt.offset;if(ct.isInstancedInterleavedBuffer){for(let ee=0;ee<Y.locationSize;ee++)p(Y.location+ee,ct.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let ee=0;ee<Y.locationSize;ee++)m(Y.location+ee);i.bindBuffer(i.ARRAY_BUFFER,ve);for(let ee=0;ee<Y.locationSize;ee++)_(Y.location+ee,Tt/Y.locationSize,K,xt,Nt*it,(jt+Tt/Y.locationSize*ee)*it,yt)}else{if(rt.isInstancedBufferAttribute){for(let ct=0;ct<Y.locationSize;ct++)p(Y.location+ct,rt.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let ct=0;ct<Y.locationSize;ct++)m(Y.location+ct);i.bindBuffer(i.ARRAY_BUFFER,ve);for(let ct=0;ct<Y.locationSize;ct++)_(Y.location+ct,Tt/Y.locationSize,K,xt,Tt*it,Tt/Y.locationSize*ct*it,yt)}}else if($!==void 0){const xt=$[et];if(xt!==void 0)switch(xt.length){case 2:i.vertexAttrib2fv(Y.location,xt);break;case 3:i.vertexAttrib3fv(Y.location,xt);break;case 4:i.vertexAttrib4fv(Y.location,xt);break;default:i.vertexAttrib1fv(Y.location,xt)}}}}y()}function T(){E();for(const S in n){const D=n[S];for(const k in D){const U=D[k];for(const z in U)h(U[z].object),delete U[z];delete D[k]}delete n[S]}}function M(S){if(n[S.id]===void 0)return;const D=n[S.id];for(const k in D){const U=D[k];for(const z in U)h(U[z].object),delete U[z];delete D[k]}delete n[S.id]}function w(S){for(const D in n){const k=n[D];if(k[S.id]===void 0)continue;const U=k[S.id];for(const z in U)h(U[z].object),delete U[z];delete k[S.id]}}function E(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:b,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function Gv(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Vv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==In&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const E=w===ci&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==ui&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ai&&!E)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,M=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:T,maxSamples:M}}function Wv(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new $i,a=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const y=r?0:n,_=y*4;let x=p.clippingState||null;l.value=x,x=h(g,d,_,f);for(let T=0;T!==_;++T)x[T]=e[T];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,x=f;_!==v;++_,x+=4)o.copy(u[_]).applyMatrix4(y,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Xv(i){let t=new WeakMap;function e(o,a){return a===vc?o.mapping=vr:a===_c&&(o.mapping=_r),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===vc||a===_c)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Cm(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const hr=4,ku=[.125,.215,.35,.446,.526,.582],xs=20,Cl=new Ah,Ou=new at;let Rl=null,Pl=0,Ll=0,Dl=!1;const vs=(1+Math.sqrt(5))/2,Ks=1/vs,Bu=[new N(-vs,Ks,0),new N(vs,Ks,0),new N(-Ks,0,vs),new N(Ks,0,vs),new N(0,vs,-Ks),new N(0,vs,Ks),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class zu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Rl=this._renderer.getRenderTarget(),Pl=this._renderer.getActiveCubeFace(),Ll=this._renderer.getActiveMipmapLevel(),Dl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Rl,Pl,Ll),this._renderer.xr.enabled=Dl,t.scissorTest=!1,Ko(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===vr||t.mapping===_r?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Rl=this._renderer.getRenderTarget(),Pl=this._renderer.getActiveCubeFace(),Ll=this._renderer.getActiveMipmapLevel(),Dl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:qn,minFilter:qn,generateMipmaps:!1,type:ci,format:In,colorSpace:Mr,depthBuffer:!1},s=Hu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qv(r)),this._blurMaterial=Yv(r,t,e)}return s}_compileMaterial(t){const e=new Oe(this._lodPlanes[0],t);this._renderer.compile(e,Cl)}_sceneToCubeUV(t,e,n,s){const a=new Vn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Ou),h.toneMapping=Qi,h.autoClear=!1;const f=new yo({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1}),g=new Oe(new es,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(Ou),v=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;Ko(s,y*_,p>2?_:0,_,_),h.setRenderTarget(s),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===vr||t.mapping===_r;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Oe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Ko(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Cl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Bu[(s-r-1)%Bu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Oe(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*xs-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):xs;m>xs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${xs}`);const p=[];let y=0;for(let w=0;w<xs;++w){const E=w/v,b=Math.exp(-E*E/2);p.push(b),w===0?y+=b:w<m&&(y+=2*b)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-n;const x=this._sizeLods[s],T=3*x*(s>_-hr?s-_+hr:0),M=4*(this._cubeSize-x);Ko(e,T,M,3*x,2*x),l.setRenderTarget(e),l.render(u,Cl)}}function qv(i){const t=[],e=[],n=[];let s=i;const r=i-hr+1+ku.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-hr?l=ku[o-i+hr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*f),_=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let M=0;M<f;M++){const w=M%3*2/3-1,E=M>2?0:-1,b=[w,E,0,w+2/3,E,0,w+2/3,E+1,0,w,E,0,w+2/3,E+1,0,w,E+1,0];y.set(b,v*g*M),_.set(d,m*g*M);const S=[M,M,M,M,M,M];x.set(S,p*g*M)}const T=new ln;T.setAttribute("position",new Pe(y,v)),T.setAttribute("uv",new Pe(_,m)),T.setAttribute("faceIndex",new Pe(x,p)),t.push(T),s>hr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Hu(i,t,e){const n=new Yn(i,t,e);return n.texture.mapping=Va,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ko(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Yv(i,t,e){const n=new Float32Array(xs),s=new N(0,1,0);return new Je({name:"SphericalGaussianBlur",defines:{n:xs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ch(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Gu(){return new Je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ch(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Vu(){return new Je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ch(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Ch(){return`

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
	`}function $v(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===vc||l===_c,h=l===vr||l===_r;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new zu(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new zu(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function jv(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&rr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Zv(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let _=0,x=y.length;_<x;_+=3){const T=y[_+0],M=y[_+1],w=y[_+2];d.push(T,M,M,w,w,T)}}else if(g!==void 0){const y=g.array;v=g.version;for(let _=0,x=y.length/3-1;_<x;_+=3){const T=_+0,M=_+1,w=_+2;d.push(T,M,M,w,w,T)}}else return;const m=new(yf(d)?mh:ph)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Kv(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*v[y];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Jv(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Qv(i,t,e){const n=new WeakMap,s=new ke;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;f===!0&&(_=1),g===!0&&(_=2),v===!0&&(_=3);let x=a.attributes.position.count*_,T=1;x>t.maxTextureSize&&(T=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const M=new Float32Array(x*T*4*u),w=new wf(M,x,T,u);w.type=ai,w.needsUpdate=!0;const E=_*4;for(let S=0;S<u;S++){const D=m[S],k=p[S],U=y[S],z=x*T*4*S;for(let W=0;W<D.count;W++){const $=W*E;f===!0&&(s.fromBufferAttribute(D,W),M[z+$+0]=s.x,M[z+$+1]=s.y,M[z+$+2]=s.z,M[z+$+3]=0),g===!0&&(s.fromBufferAttribute(k,W),M[z+$+4]=s.x,M[z+$+5]=s.y,M[z+$+6]=s.z,M[z+$+7]=0),v===!0&&(s.fromBufferAttribute(U,W),M[z+$+8]=s.x,M[z+$+9]=s.y,M[z+$+10]=s.z,M[z+$+11]=U.itemSize===4?s.w:1)}}d={count:u,texture:w,size:new ht(x,T)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function t_(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Ff=new vn,Wu=new Rf(1,1),kf=new wf,Of=new fm,Bf=new Af,Xu=[],qu=[],Yu=new Float32Array(16),$u=new Float32Array(9),ju=new Float32Array(4);function Dr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Xu[s];if(r===void 0&&(r=new Float32Array(s),Xu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Qe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function tn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ya(i,t){let e=qu[t];e===void 0&&(e=new Int32Array(t),qu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function e_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function n_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;i.uniform2fv(this.addr,t),tn(e,t)}}function i_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Qe(e,t))return;i.uniform3fv(this.addr,t),tn(e,t)}}function s_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;i.uniform4fv(this.addr,t),tn(e,t)}}function r_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),tn(e,t)}else{if(Qe(e,n))return;ju.set(n),i.uniformMatrix2fv(this.addr,!1,ju),tn(e,n)}}function o_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),tn(e,t)}else{if(Qe(e,n))return;$u.set(n),i.uniformMatrix3fv(this.addr,!1,$u),tn(e,n)}}function a_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),tn(e,t)}else{if(Qe(e,n))return;Yu.set(n),i.uniformMatrix4fv(this.addr,!1,Yu),tn(e,n)}}function l_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function c_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;i.uniform2iv(this.addr,t),tn(e,t)}}function h_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;i.uniform3iv(this.addr,t),tn(e,t)}}function u_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;i.uniform4iv(this.addr,t),tn(e,t)}}function d_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function f_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;i.uniform2uiv(this.addr,t),tn(e,t)}}function p_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;i.uniform3uiv(this.addr,t),tn(e,t)}}function m_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;i.uniform4uiv(this.addr,t),tn(e,t)}}function g_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Wu.compareFunction=xf,r=Wu):r=Ff,e.setTexture2D(t||r,s)}function v_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Of,s)}function __(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Bf,s)}function x_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||kf,s)}function y_(i){switch(i){case 5126:return e_;case 35664:return n_;case 35665:return i_;case 35666:return s_;case 35674:return r_;case 35675:return o_;case 35676:return a_;case 5124:case 35670:return l_;case 35667:case 35671:return c_;case 35668:case 35672:return h_;case 35669:case 35673:return u_;case 5125:return d_;case 36294:return f_;case 36295:return p_;case 36296:return m_;case 35678:case 36198:case 36298:case 36306:case 35682:return g_;case 35679:case 36299:case 36307:return v_;case 35680:case 36300:case 36308:case 36293:return __;case 36289:case 36303:case 36311:case 36292:return x_}}function M_(i,t){i.uniform1fv(this.addr,t)}function w_(i,t){const e=Dr(t,this.size,2);i.uniform2fv(this.addr,e)}function b_(i,t){const e=Dr(t,this.size,3);i.uniform3fv(this.addr,e)}function S_(i,t){const e=Dr(t,this.size,4);i.uniform4fv(this.addr,e)}function E_(i,t){const e=Dr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function T_(i,t){const e=Dr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function A_(i,t){const e=Dr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function C_(i,t){i.uniform1iv(this.addr,t)}function R_(i,t){i.uniform2iv(this.addr,t)}function P_(i,t){i.uniform3iv(this.addr,t)}function L_(i,t){i.uniform4iv(this.addr,t)}function D_(i,t){i.uniform1uiv(this.addr,t)}function I_(i,t){i.uniform2uiv(this.addr,t)}function U_(i,t){i.uniform3uiv(this.addr,t)}function N_(i,t){i.uniform4uiv(this.addr,t)}function F_(i,t,e){const n=this.cache,s=t.length,r=Ya(e,s);Qe(n,r)||(i.uniform1iv(this.addr,r),tn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Ff,r[o])}function k_(i,t,e){const n=this.cache,s=t.length,r=Ya(e,s);Qe(n,r)||(i.uniform1iv(this.addr,r),tn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Of,r[o])}function O_(i,t,e){const n=this.cache,s=t.length,r=Ya(e,s);Qe(n,r)||(i.uniform1iv(this.addr,r),tn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Bf,r[o])}function B_(i,t,e){const n=this.cache,s=t.length,r=Ya(e,s);Qe(n,r)||(i.uniform1iv(this.addr,r),tn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||kf,r[o])}function z_(i){switch(i){case 5126:return M_;case 35664:return w_;case 35665:return b_;case 35666:return S_;case 35674:return E_;case 35675:return T_;case 35676:return A_;case 5124:case 35670:return C_;case 35667:case 35671:return R_;case 35668:case 35672:return P_;case 35669:case 35673:return L_;case 5125:return D_;case 36294:return I_;case 36295:return U_;case 36296:return N_;case 35678:case 36198:case 36298:case 36306:case 35682:return F_;case 35679:case 36299:case 36307:return k_;case 35680:case 36300:case 36308:case 36293:return O_;case 36289:case 36303:case 36311:case 36292:return B_}}class H_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=y_(e.type)}}class G_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=z_(e.type)}}class V_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Il=/(\w+)(\])?(\[|\.)?/g;function Zu(i,t){i.seq.push(t),i.map[t.id]=t}function W_(i,t,e){const n=i.name,s=n.length;for(Il.lastIndex=0;;){const r=Il.exec(n),o=Il.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Zu(e,c===void 0?new H_(a,i,t):new G_(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new V_(a),Zu(e,u)),e=u}}}class Sa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);W_(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Ku(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const X_=37297;let q_=0;function Y_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Ju=new Kt;function $_(i){de._getMatrix(Ju,de.workingColorSpace,i);const t=`mat3( ${Ju.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(i)){case Da:return[t,"LinearTransferOETF"];case ye:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Qu(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Y_(i.getShaderSource(t),o)}else return s}function j_(i,t){const e=$_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Z_(i,t){let e;switch(t){case nf:e="Linear";break;case sf:e="Reinhard";break;case rf:e="Cineon";break;case ih:e="ACESFilmic";break;case of:e="AgX";break;case af:e="Neutral";break;case Pp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Jo=new N;function K_(){de.getLuminanceCoefficients(Jo);const i=Jo.x.toFixed(4),t=Jo.y.toFixed(4),e=Jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(to).join(`
`)}function Q_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function t2(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function to(i){return i!==""}function td(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ed(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const e2=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yc(i){return i.replace(e2,i2)}const n2=new Map;function i2(i,t){let e=Qt[t];if(e===void 0){const n=n2.get(t);if(n!==void 0)e=Qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Yc(e)}const s2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nd(i){return i.replace(s2,r2)}function r2(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function id(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function o2(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tf?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ef?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ei&&(t="SHADOWMAP_TYPE_VSM"),t}function a2(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vr:case _r:t="ENVMAP_TYPE_CUBE";break;case Va:t="ENVMAP_TYPE_CUBE_UV";break}return t}function l2(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case _r:t="ENVMAP_MODE_REFRACTION";break}return t}function c2(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nh:t="ENVMAP_BLENDING_MULTIPLY";break;case Cp:t="ENVMAP_BLENDING_MIX";break;case Rp:t="ENVMAP_BLENDING_ADD";break}return t}function h2(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function u2(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=o2(e),c=a2(e),h=l2(e),u=c2(e),d=h2(e),f=J_(e),g=Q_(r),v=s.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(to).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(to).join(`
`),p.length>0&&(p+=`
`)):(m=[id(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(to).join(`
`),p=[id(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Qi?"#define TONE_MAPPING":"",e.toneMapping!==Qi?Qt.tonemapping_pars_fragment:"",e.toneMapping!==Qi?Z_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,j_("linearToOutputTexel",e.outputColorSpace),K_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(to).join(`
`)),o=Yc(o),o=td(o,e),o=ed(o,e),a=Yc(a),a=td(a,e),a=ed(a,e),o=nd(o),a=nd(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===au?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===au?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=y+m+o,x=y+p+a,T=Ku(s,s.VERTEX_SHADER,_),M=Ku(s,s.FRAGMENT_SHADER,x);s.attachShader(v,T),s.attachShader(v,M),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(D){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(v).trim(),U=s.getShaderInfoLog(T).trim(),z=s.getShaderInfoLog(M).trim();let W=!0,$=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,M);else{const et=Qu(s,T,"vertex"),Y=Qu(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+k+`
`+et+`
`+Y)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(U===""||z==="")&&($=!1);$&&(D.diagnostics={runnable:W,programLog:k,vertexShader:{log:U,prefix:m},fragmentShader:{log:z,prefix:p}})}s.deleteShader(T),s.deleteShader(M),E=new Sa(s,v),b=t2(s,v)}let E;this.getUniforms=function(){return E===void 0&&w(this),E};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,X_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=q_++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=M,this}let d2=0;class f2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new p2(t),e.set(t,n)),n}}class p2{constructor(t){this.id=d2++,this.code=t,this.usedTimes=0}}function m2(i,t,e,n,s,r,o){const a=new fh,l=new f2,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,S,D,k,U){const z=k.fog,W=U.geometry,$=b.isMeshStandardMaterial?k.environment:null,et=(b.isMeshStandardMaterial?e:t).get(b.envMap||$),Y=et&&et.mapping===Va?et.image.height:null,rt=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const xt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Tt=xt!==void 0?xt.length:0;let Xt=0;W.morphAttributes.position!==void 0&&(Xt=1),W.morphAttributes.normal!==void 0&&(Xt=2),W.morphAttributes.color!==void 0&&(Xt=3);let ve,K,it,yt;if(rt){const _e=oi[rt];ve=_e.vertexShader,K=_e.fragmentShader}else ve=b.vertexShader,K=b.fragmentShader,l.update(b),it=l.getVertexShaderID(b),yt=l.getFragmentShaderID(b);const ct=i.getRenderTarget(),Nt=i.state.buffers.depth.getReversed(),jt=U.isInstancedMesh===!0,ee=U.isBatchedMesh===!0,Fe=!!b.map,le=!!b.matcap,We=!!et,F=!!b.aoMap,Fn=!!b.lightMap,re=!!b.bumpMap,oe=!!b.normalMap,Dt=!!b.displacementMap,Ae=!!b.emissiveMap,It=!!b.metalnessMap,I=!!b.roughnessMap,C=b.anisotropy>0,V=b.clearcoat>0,Q=b.dispersion>0,nt=b.iridescence>0,J=b.sheen>0,Pt=b.transmission>0,mt=C&&!!b.anisotropyMap,wt=V&&!!b.clearcoatMap,ce=V&&!!b.clearcoatNormalMap,ot=V&&!!b.clearcoatRoughnessMap,St=nt&&!!b.iridescenceMap,Bt=nt&&!!b.iridescenceThicknessMap,Gt=J&&!!b.sheenColorMap,Et=J&&!!b.sheenRoughnessMap,ae=!!b.specularMap,Jt=!!b.specularColorMap,Ee=!!b.specularIntensityMap,O=Pt&&!!b.transmissionMap,ft=Pt&&!!b.thicknessMap,Z=!!b.gradientMap,tt=!!b.alphaMap,vt=b.alphaTest>0,gt=!!b.alphaHash,Zt=!!b.extensions;let ze=Qi;b.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(ze=i.toneMapping);const cn={shaderID:rt,shaderType:b.type,shaderName:b.name,vertexShader:ve,fragmentShader:K,defines:b.defines,customVertexShaderID:it,customFragmentShaderID:yt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:ee,batchingColor:ee&&U._colorsTexture!==null,instancing:jt,instancingColor:jt&&U.instanceColor!==null,instancingMorph:jt&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ct===null?i.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Mr,alphaToCoverage:!!b.alphaToCoverage,map:Fe,matcap:le,envMap:We,envMapMode:We&&et.mapping,envMapCubeUVHeight:Y,aoMap:F,lightMap:Fn,bumpMap:re,normalMap:oe,displacementMap:d&&Dt,emissiveMap:Ae,normalMapObjectSpace:oe&&b.normalMapType===Ip,normalMapTangentSpace:oe&&b.normalMapType===uh,metalnessMap:It,roughnessMap:I,anisotropy:C,anisotropyMap:mt,clearcoat:V,clearcoatMap:wt,clearcoatNormalMap:ce,clearcoatRoughnessMap:ot,dispersion:Q,iridescence:nt,iridescenceMap:St,iridescenceThicknessMap:Bt,sheen:J,sheenColorMap:Gt,sheenRoughnessMap:Et,specularMap:ae,specularColorMap:Jt,specularIntensityMap:Ee,transmission:Pt,transmissionMap:O,thicknessMap:ft,gradientMap:Z,opaque:b.transparent===!1&&b.blending===ur&&b.alphaToCoverage===!1,alphaMap:tt,alphaTest:vt,alphaHash:gt,combine:b.combine,mapUv:Fe&&v(b.map.channel),aoMapUv:F&&v(b.aoMap.channel),lightMapUv:Fn&&v(b.lightMap.channel),bumpMapUv:re&&v(b.bumpMap.channel),normalMapUv:oe&&v(b.normalMap.channel),displacementMapUv:Dt&&v(b.displacementMap.channel),emissiveMapUv:Ae&&v(b.emissiveMap.channel),metalnessMapUv:It&&v(b.metalnessMap.channel),roughnessMapUv:I&&v(b.roughnessMap.channel),anisotropyMapUv:mt&&v(b.anisotropyMap.channel),clearcoatMapUv:wt&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:ce&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:Gt&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:Et&&v(b.sheenRoughnessMap.channel),specularMapUv:ae&&v(b.specularMap.channel),specularColorMapUv:Jt&&v(b.specularColorMap.channel),specularIntensityMapUv:Ee&&v(b.specularIntensityMap.channel),transmissionMapUv:O&&v(b.transmissionMap.channel),thicknessMapUv:ft&&v(b.thicknessMap.channel),alphaMapUv:tt&&v(b.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(oe||C),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!W.attributes.uv&&(Fe||tt),fog:!!z,useFog:b.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Nt,skinning:U.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:Xt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:ze,decodeVideoTexture:Fe&&b.map.isVideoTexture===!0&&de.getTransfer(b.map.colorSpace)===ye,decodeVideoTextureEmissive:Ae&&b.emissiveMap.isVideoTexture===!0&&de.getTransfer(b.emissiveMap.colorSpace)===ye,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ei,flipSided:b.side===Sn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Zt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&b.extensions.multiDraw===!0||ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return cn.vertexUv1s=c.has(1),cn.vertexUv2s=c.has(2),cn.vertexUv3s=c.has(3),c.clear(),cn}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const D in b.defines)S.push(D),S.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(y(S,b),_(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function y(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function _(b,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){const S=g[b.type];let D;if(S){const k=oi[S];D=po.clone(k.uniforms)}else D=b.uniforms;return D}function T(b,S){let D;for(let k=0,U=h.length;k<U;k++){const z=h[k];if(z.cacheKey===S){D=z,++D.usedTimes;break}}return D===void 0&&(D=new u2(i,S,b,r),h.push(D)),D}function M(b){if(--b.usedTimes===0){const S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function w(b){l.remove(b)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:T,releaseProgram:M,releaseShaderCache:w,programs:h,dispose:E}}function g2(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function v2(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function sd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function rd(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,v,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||v2),n.length>1&&n.sort(d||sd),s.length>1&&s.sort(d||sd)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function _2(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new rd,i.set(n,[o])):s>=r.length?(o=new rd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function x2(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new at};break;case"SpotLight":e={position:new N,direction:new N,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new at,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new at,groundColor:new at};break;case"RectAreaLight":e={color:new at,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function y2(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let M2=0;function w2(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function b2(i){const t=new x2,e=y2(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);const s=new N,r=new Me,o=new Me;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,y=0,_=0,x=0,T=0,M=0,w=0;c.sort(w2);for(let b=0,S=c.length;b<S;b++){const D=c[b],k=D.color,U=D.intensity,z=D.distance,W=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=k.r*U,u+=k.g*U,d+=k.b*U;else if(D.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(D.sh.coefficients[$],U);w++}else if(D.isDirectionalLight){const $=t.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const et=D.shadow,Y=e.get(D);Y.shadowIntensity=et.intensity,Y.shadowBias=et.bias,Y.shadowNormalBias=et.normalBias,Y.shadowRadius=et.radius,Y.shadowMapSize=et.mapSize,n.directionalShadow[f]=Y,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=D.shadow.matrix,y++}n.directional[f]=$,f++}else if(D.isSpotLight){const $=t.get(D);$.position.setFromMatrixPosition(D.matrixWorld),$.color.copy(k).multiplyScalar(U),$.distance=z,$.coneCos=Math.cos(D.angle),$.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),$.decay=D.decay,n.spot[v]=$;const et=D.shadow;if(D.map&&(n.spotLightMap[T]=D.map,T++,et.updateMatrices(D),D.castShadow&&M++),n.spotLightMatrix[v]=et.matrix,D.castShadow){const Y=e.get(D);Y.shadowIntensity=et.intensity,Y.shadowBias=et.bias,Y.shadowNormalBias=et.normalBias,Y.shadowRadius=et.radius,Y.shadowMapSize=et.mapSize,n.spotShadow[v]=Y,n.spotShadowMap[v]=W,x++}v++}else if(D.isRectAreaLight){const $=t.get(D);$.color.copy(k).multiplyScalar(U),$.halfWidth.set(D.width*.5,0,0),$.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=$,m++}else if(D.isPointLight){const $=t.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),$.distance=D.distance,$.decay=D.decay,D.castShadow){const et=D.shadow,Y=e.get(D);Y.shadowIntensity=et.intensity,Y.shadowBias=et.bias,Y.shadowNormalBias=et.normalBias,Y.shadowRadius=et.radius,Y.shadowMapSize=et.mapSize,Y.shadowCameraNear=et.camera.near,Y.shadowCameraFar=et.camera.far,n.pointShadow[g]=Y,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=D.shadow.matrix,_++}n.point[g]=$,g++}else if(D.isHemisphereLight){const $=t.get(D);$.skyColor.copy(D.color).multiplyScalar(U),$.groundColor.copy(D.groundColor).multiplyScalar(U),n.hemi[p]=$,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const E=n.hash;(E.directionalLength!==f||E.pointLength!==g||E.spotLength!==v||E.rectAreaLength!==m||E.hemiLength!==p||E.numDirectionalShadows!==y||E.numPointShadows!==_||E.numSpotShadows!==x||E.numSpotMaps!==T||E.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=x+T-M,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=w,E.directionalLength=f,E.pointLength=g,E.spotLength=v,E.rectAreaLength=m,E.hemiLength=p,E.numDirectionalShadows=y,E.numPointShadows=_,E.numSpotShadows=x,E.numSpotMaps=T,E.numLightProbes=w,n.version=M2++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const _=c[p];if(_.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(_.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(_.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function od(i){const t=new b2(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function S2(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new od(i),t.set(s,[a])):r>=o.length?(a=new od(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const E2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T2=`uniform sampler2D shadow_pass;
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
}`;function A2(i,t,e){let n=new vh;const s=new ht,r=new ht,o=new ke,a=new Uf({depthPacking:_f}),l=new $m,c={},h=e.maxTextureSize,u={[ki]:Sn,[Sn]:ki,[ei]:ei},d=new Je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:E2,fragmentShader:T2}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new ln;g.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Oe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tf;let p=this.type;this.render=function(M,w,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const b=i.getRenderTarget(),S=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Pi),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const U=p!==Ei&&this.type===Ei,z=p===Ei&&this.type!==Ei;for(let W=0,$=M.length;W<$;W++){const et=M[W],Y=et.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const rt=Y.getFrameExtents();if(s.multiply(rt),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/rt.x),s.x=r.x*rt.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/rt.y),s.y=r.y*rt.y,Y.mapSize.y=r.y)),Y.map===null||U===!0||z===!0){const Tt=this.type!==Ei?{minFilter:En,magFilter:En}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Yn(s.x,s.y,Tt),Y.map.texture.name=et.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const xt=Y.getViewportCount();for(let Tt=0;Tt<xt;Tt++){const Xt=Y.getViewport(Tt);o.set(r.x*Xt.x,r.y*Xt.y,r.x*Xt.z,r.y*Xt.w),k.viewport(o),Y.updateMatrices(et,Tt),n=Y.getFrustum(),x(w,E,Y.camera,et,this.type)}Y.isPointLightShadow!==!0&&this.type===Ei&&y(Y,E),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,S,D)};function y(M,w){const E=t.update(v);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Yn(s.x,s.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(w,null,E,d,v,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(w,null,E,f,v,null)}function _(M,w,E,b){let S=null;const D=E.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)S=D;else if(S=E.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const k=S.uuid,U=w.uuid;let z=c[k];z===void 0&&(z={},c[k]=z);let W=z[U];W===void 0&&(W=S.clone(),z[U]=W,w.addEventListener("dispose",T)),S=W}if(S.visible=w.visible,S.wireframe=w.wireframe,b===Ei?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:u[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,E.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const k=i.properties.get(S);k.light=E}return S}function x(M,w,E,b,S){if(M.visible===!1)return;if(M.layers.test(w.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&S===Ei)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,M.matrixWorld);const U=t.update(M),z=M.material;if(Array.isArray(z)){const W=U.groups;for(let $=0,et=W.length;$<et;$++){const Y=W[$],rt=z[Y.materialIndex];if(rt&&rt.visible){const xt=_(M,rt,b,S);M.onBeforeShadow(i,M,w,E,U,xt,Y),i.renderBufferDirect(E,null,U,xt,M,Y),M.onAfterShadow(i,M,w,E,U,xt,Y)}}}else if(z.visible){const W=_(M,z,b,S);M.onBeforeShadow(i,M,w,E,U,W,null),i.renderBufferDirect(E,null,U,W,M,null),M.onAfterShadow(i,M,w,E,U,W,null)}}const k=M.children;for(let U=0,z=k.length;U<z;U++)x(k[U],w,E,b,S)}function T(M){M.target.removeEventListener("dispose",T);for(const E in c){const b=c[E],S=M.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const C2={[hc]:uc,[dc]:mc,[fc]:gc,[gr]:pc,[uc]:hc,[mc]:dc,[gc]:fc,[pc]:gr};function R2(i,t){function e(){let O=!1;const ft=new ke;let Z=null;const tt=new ke(0,0,0,0);return{setMask:function(vt){Z!==vt&&!O&&(i.colorMask(vt,vt,vt,vt),Z=vt)},setLocked:function(vt){O=vt},setClear:function(vt,gt,Zt,ze,cn){cn===!0&&(vt*=ze,gt*=ze,Zt*=ze),ft.set(vt,gt,Zt,ze),tt.equals(ft)===!1&&(i.clearColor(vt,gt,Zt,ze),tt.copy(ft))},reset:function(){O=!1,Z=null,tt.set(-1,0,0,0)}}}function n(){let O=!1,ft=!1,Z=null,tt=null,vt=null;return{setReversed:function(gt){if(ft!==gt){const Zt=t.get("EXT_clip_control");ft?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT);const ze=vt;vt=null,this.setClear(ze)}ft=gt},getReversed:function(){return ft},setTest:function(gt){gt?ct(i.DEPTH_TEST):Nt(i.DEPTH_TEST)},setMask:function(gt){Z!==gt&&!O&&(i.depthMask(gt),Z=gt)},setFunc:function(gt){if(ft&&(gt=C2[gt]),tt!==gt){switch(gt){case hc:i.depthFunc(i.NEVER);break;case uc:i.depthFunc(i.ALWAYS);break;case dc:i.depthFunc(i.LESS);break;case gr:i.depthFunc(i.LEQUAL);break;case fc:i.depthFunc(i.EQUAL);break;case pc:i.depthFunc(i.GEQUAL);break;case mc:i.depthFunc(i.GREATER);break;case gc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=gt}},setLocked:function(gt){O=gt},setClear:function(gt){vt!==gt&&(ft&&(gt=1-gt),i.clearDepth(gt),vt=gt)},reset:function(){O=!1,Z=null,tt=null,vt=null,ft=!1}}}function s(){let O=!1,ft=null,Z=null,tt=null,vt=null,gt=null,Zt=null,ze=null,cn=null;return{setTest:function(_e){O||(_e?ct(i.STENCIL_TEST):Nt(i.STENCIL_TEST))},setMask:function(_e){ft!==_e&&!O&&(i.stencilMask(_e),ft=_e)},setFunc:function(_e,jn,vi){(Z!==_e||tt!==jn||vt!==vi)&&(i.stencilFunc(_e,jn,vi),Z=_e,tt=jn,vt=vi)},setOp:function(_e,jn,vi){(gt!==_e||Zt!==jn||ze!==vi)&&(i.stencilOp(_e,jn,vi),gt=_e,Zt=jn,ze=vi)},setLocked:function(_e){O=_e},setClear:function(_e){cn!==_e&&(i.clearStencil(_e),cn=_e)},reset:function(){O=!1,ft=null,Z=null,tt=null,vt=null,gt=null,Zt=null,ze=null,cn=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,y=null,_=null,x=null,T=null,M=null,w=new at(0,0,0),E=0,b=!1,S=null,D=null,k=null,U=null,z=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,et=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(Y)[1]),$=et>=1):Y.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),$=et>=2);let rt=null,xt={};const Tt=i.getParameter(i.SCISSOR_BOX),Xt=i.getParameter(i.VIEWPORT),ve=new ke().fromArray(Tt),K=new ke().fromArray(Xt);function it(O,ft,Z,tt){const vt=new Uint8Array(4),gt=i.createTexture();i.bindTexture(O,gt),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Zt=0;Zt<Z;Zt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ft+Zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return gt}const yt={};yt[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),yt[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),yt[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),yt[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ct(i.DEPTH_TEST),o.setFunc(gr),re(!1),oe(nu),ct(i.CULL_FACE),F(Pi);function ct(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function Nt(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function jt(O,ft){return u[O]!==ft?(i.bindFramebuffer(O,ft),u[O]=ft,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ft),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function ee(O,ft){let Z=f,tt=!1;if(O){Z=d.get(ft),Z===void 0&&(Z=[],d.set(ft,Z));const vt=O.textures;if(Z.length!==vt.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let gt=0,Zt=vt.length;gt<Zt;gt++)Z[gt]=i.COLOR_ATTACHMENT0+gt;Z.length=vt.length,tt=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,tt=!0);tt&&i.drawBuffers(Z)}function Fe(O){return g!==O?(i.useProgram(O),g=O,!0):!1}const le={[_s]:i.FUNC_ADD,[up]:i.FUNC_SUBTRACT,[dp]:i.FUNC_REVERSE_SUBTRACT};le[fp]=i.MIN,le[pp]=i.MAX;const We={[mp]:i.ZERO,[gp]:i.ONE,[vp]:i.SRC_COLOR,[lc]:i.SRC_ALPHA,[bp]:i.SRC_ALPHA_SATURATE,[Mp]:i.DST_COLOR,[xp]:i.DST_ALPHA,[_p]:i.ONE_MINUS_SRC_COLOR,[cc]:i.ONE_MINUS_SRC_ALPHA,[wp]:i.ONE_MINUS_DST_COLOR,[yp]:i.ONE_MINUS_DST_ALPHA,[Sp]:i.CONSTANT_COLOR,[Ep]:i.ONE_MINUS_CONSTANT_COLOR,[Tp]:i.CONSTANT_ALPHA,[Ap]:i.ONE_MINUS_CONSTANT_ALPHA};function F(O,ft,Z,tt,vt,gt,Zt,ze,cn,_e){if(O===Pi){v===!0&&(Nt(i.BLEND),v=!1);return}if(v===!1&&(ct(i.BLEND),v=!0),O!==hp){if(O!==m||_e!==b){if((p!==_s||x!==_s)&&(i.blendEquation(i.FUNC_ADD),p=_s,x=_s),_e)switch(O){case ur:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ac:i.blendFunc(i.ONE,i.ONE);break;case iu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case su:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ur:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ac:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case iu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case su:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}y=null,_=null,T=null,M=null,w.set(0,0,0),E=0,m=O,b=_e}return}vt=vt||ft,gt=gt||Z,Zt=Zt||tt,(ft!==p||vt!==x)&&(i.blendEquationSeparate(le[ft],le[vt]),p=ft,x=vt),(Z!==y||tt!==_||gt!==T||Zt!==M)&&(i.blendFuncSeparate(We[Z],We[tt],We[gt],We[Zt]),y=Z,_=tt,T=gt,M=Zt),(ze.equals(w)===!1||cn!==E)&&(i.blendColor(ze.r,ze.g,ze.b,cn),w.copy(ze),E=cn),m=O,b=!1}function Fn(O,ft){O.side===ei?Nt(i.CULL_FACE):ct(i.CULL_FACE);let Z=O.side===Sn;ft&&(Z=!Z),re(Z),O.blending===ur&&O.transparent===!1?F(Pi):F(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const tt=O.stencilWrite;a.setTest(tt),tt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ae(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ct(i.SAMPLE_ALPHA_TO_COVERAGE):Nt(i.SAMPLE_ALPHA_TO_COVERAGE)}function re(O){S!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),S=O)}function oe(O){O!==lp?(ct(i.CULL_FACE),O!==D&&(O===nu?i.cullFace(i.BACK):O===cp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Nt(i.CULL_FACE),D=O}function Dt(O){O!==k&&($&&i.lineWidth(O),k=O)}function Ae(O,ft,Z){O?(ct(i.POLYGON_OFFSET_FILL),(U!==ft||z!==Z)&&(i.polygonOffset(ft,Z),U=ft,z=Z)):Nt(i.POLYGON_OFFSET_FILL)}function It(O){O?ct(i.SCISSOR_TEST):Nt(i.SCISSOR_TEST)}function I(O){O===void 0&&(O=i.TEXTURE0+W-1),rt!==O&&(i.activeTexture(O),rt=O)}function C(O,ft,Z){Z===void 0&&(rt===null?Z=i.TEXTURE0+W-1:Z=rt);let tt=xt[Z];tt===void 0&&(tt={type:void 0,texture:void 0},xt[Z]=tt),(tt.type!==O||tt.texture!==ft)&&(rt!==Z&&(i.activeTexture(Z),rt=Z),i.bindTexture(O,ft||yt[O]),tt.type=O,tt.texture=ft)}function V(){const O=xt[rt];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function nt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pt(){try{i.texSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function mt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function wt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ce(){try{i.texStorage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ot(){try{i.texStorage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function St(){try{i.texImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Bt(){try{i.texImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Gt(O){ve.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),ve.copy(O))}function Et(O){K.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),K.copy(O))}function ae(O,ft){let Z=c.get(ft);Z===void 0&&(Z=new WeakMap,c.set(ft,Z));let tt=Z.get(O);tt===void 0&&(tt=i.getUniformBlockIndex(ft,O.name),Z.set(O,tt))}function Jt(O,ft){const tt=c.get(ft).get(O);l.get(ft)!==tt&&(i.uniformBlockBinding(ft,tt,O.__bindingPointIndex),l.set(ft,tt))}function Ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},rt=null,xt={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,y=null,_=null,x=null,T=null,M=null,w=new at(0,0,0),E=0,b=!1,S=null,D=null,k=null,U=null,z=null,ve.set(0,0,i.canvas.width,i.canvas.height),K.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ct,disable:Nt,bindFramebuffer:jt,drawBuffers:ee,useProgram:Fe,setBlending:F,setMaterial:Fn,setFlipSided:re,setCullFace:oe,setLineWidth:Dt,setPolygonOffset:Ae,setScissorTest:It,activeTexture:I,bindTexture:C,unbindTexture:V,compressedTexImage2D:Q,compressedTexImage3D:nt,texImage2D:St,texImage3D:Bt,updateUBOMapping:ae,uniformBlockBinding:Jt,texStorage2D:ce,texStorage3D:ot,texSubImage2D:J,texSubImage3D:Pt,compressedTexSubImage2D:mt,compressedTexSubImage3D:wt,scissor:Gt,viewport:Et,reset:Ee}}function P2(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ht,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,C){return f?new OffscreenCanvas(I,C):Ua("canvas")}function v(I,C,V){let Q=1;const nt=It(I);if((nt.width>V||nt.height>V)&&(Q=V/Math.max(nt.width,nt.height)),Q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const J=Math.floor(Q*nt.width),Pt=Math.floor(Q*nt.height);u===void 0&&(u=g(J,Pt));const mt=C?g(J,Pt):u;return mt.width=J,mt.height=Pt,mt.getContext("2d").drawImage(I,0,0,J,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+J+"x"+Pt+")."),mt}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function y(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(I,C,V,Q,nt=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let J=C;if(C===i.RED&&(V===i.FLOAT&&(J=i.R32F),V===i.HALF_FLOAT&&(J=i.R16F),V===i.UNSIGNED_BYTE&&(J=i.R8)),C===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.R8UI),V===i.UNSIGNED_SHORT&&(J=i.R16UI),V===i.UNSIGNED_INT&&(J=i.R32UI),V===i.BYTE&&(J=i.R8I),V===i.SHORT&&(J=i.R16I),V===i.INT&&(J=i.R32I)),C===i.RG&&(V===i.FLOAT&&(J=i.RG32F),V===i.HALF_FLOAT&&(J=i.RG16F),V===i.UNSIGNED_BYTE&&(J=i.RG8)),C===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.RG8UI),V===i.UNSIGNED_SHORT&&(J=i.RG16UI),V===i.UNSIGNED_INT&&(J=i.RG32UI),V===i.BYTE&&(J=i.RG8I),V===i.SHORT&&(J=i.RG16I),V===i.INT&&(J=i.RG32I)),C===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.RGB8UI),V===i.UNSIGNED_SHORT&&(J=i.RGB16UI),V===i.UNSIGNED_INT&&(J=i.RGB32UI),V===i.BYTE&&(J=i.RGB8I),V===i.SHORT&&(J=i.RGB16I),V===i.INT&&(J=i.RGB32I)),C===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),V===i.UNSIGNED_INT&&(J=i.RGBA32UI),V===i.BYTE&&(J=i.RGBA8I),V===i.SHORT&&(J=i.RGBA16I),V===i.INT&&(J=i.RGBA32I)),C===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),C===i.RGBA){const Pt=nt?Da:de.getTransfer(Q);V===i.FLOAT&&(J=i.RGBA32F),V===i.HALF_FLOAT&&(J=i.RGBA16F),V===i.UNSIGNED_BYTE&&(J=Pt===ye?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function x(I,C){let V;return I?C===null||C===Ts||C===xr?V=i.DEPTH24_STENCIL8:C===ai?V=i.DEPTH32F_STENCIL8:C===uo&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Ts||C===xr?V=i.DEPTH_COMPONENT24:C===ai?V=i.DEPTH_COMPONENT32F:C===uo&&(V=i.DEPTH_COMPONENT16),V}function T(I,C){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==En&&I.minFilter!==qn?Math.log2(Math.max(C.width,C.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?C.mipmaps.length:1}function M(I){const C=I.target;C.removeEventListener("dispose",M),E(C),C.isVideoTexture&&h.delete(C)}function w(I){const C=I.target;C.removeEventListener("dispose",w),S(C)}function E(I){const C=n.get(I);if(C.__webglInit===void 0)return;const V=I.source,Q=d.get(V);if(Q){const nt=Q[C.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&b(I),Object.keys(Q).length===0&&d.delete(V)}n.remove(I)}function b(I){const C=n.get(I);i.deleteTexture(C.__webglTexture);const V=I.source,Q=d.get(V);delete Q[C.__cacheKey],o.memory.textures--}function S(I){const C=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(C.__webglFramebuffer[Q]))for(let nt=0;nt<C.__webglFramebuffer[Q].length;nt++)i.deleteFramebuffer(C.__webglFramebuffer[Q][nt]);else i.deleteFramebuffer(C.__webglFramebuffer[Q]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[Q])}else{if(Array.isArray(C.__webglFramebuffer))for(let Q=0;Q<C.__webglFramebuffer.length;Q++)i.deleteFramebuffer(C.__webglFramebuffer[Q]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let Q=0;Q<C.__webglColorRenderbuffer.length;Q++)C.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[Q]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const V=I.textures;for(let Q=0,nt=V.length;Q<nt;Q++){const J=n.get(V[Q]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(V[Q])}n.remove(I)}let D=0;function k(){D=0}function U(){const I=D;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),D+=1,I}function z(I){const C=[];return C.push(I.wrapS),C.push(I.wrapT),C.push(I.wrapR||0),C.push(I.magFilter),C.push(I.minFilter),C.push(I.anisotropy),C.push(I.internalFormat),C.push(I.format),C.push(I.type),C.push(I.generateMipmaps),C.push(I.premultiplyAlpha),C.push(I.flipY),C.push(I.unpackAlignment),C.push(I.colorSpace),C.join()}function W(I,C){const V=n.get(I);if(I.isVideoTexture&&Dt(I),I.isRenderTargetTexture===!1&&I.version>0&&V.__version!==I.version){const Q=I.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(V,I,C);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+C)}function $(I,C){const V=n.get(I);if(I.version>0&&V.__version!==I.version){K(V,I,C);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+C)}function et(I,C){const V=n.get(I);if(I.version>0&&V.__version!==I.version){K(V,I,C);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+C)}function Y(I,C){const V=n.get(I);if(I.version>0&&V.__version!==I.version){it(V,I,C);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+C)}const rt={[ho]:i.REPEAT,[Ai]:i.CLAMP_TO_EDGE,[xc]:i.MIRRORED_REPEAT},xt={[En]:i.NEAREST,[Lp]:i.NEAREST_MIPMAP_NEAREST,[Po]:i.NEAREST_MIPMAP_LINEAR,[qn]:i.LINEAR,[il]:i.LINEAR_MIPMAP_NEAREST,[ws]:i.LINEAR_MIPMAP_LINEAR},Tt={[Up]:i.NEVER,[zp]:i.ALWAYS,[Np]:i.LESS,[xf]:i.LEQUAL,[Fp]:i.EQUAL,[Bp]:i.GEQUAL,[kp]:i.GREATER,[Op]:i.NOTEQUAL};function Xt(I,C){if(C.type===ai&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===qn||C.magFilter===il||C.magFilter===Po||C.magFilter===ws||C.minFilter===qn||C.minFilter===il||C.minFilter===Po||C.minFilter===ws)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,rt[C.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,rt[C.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,rt[C.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,xt[C.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,xt[C.minFilter]),C.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Tt[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===En||C.minFilter!==Po&&C.minFilter!==ws||C.type===ai&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function ve(I,C){let V=!1;I.__webglInit===void 0&&(I.__webglInit=!0,C.addEventListener("dispose",M));const Q=C.source;let nt=d.get(Q);nt===void 0&&(nt={},d.set(Q,nt));const J=z(C);if(J!==I.__cacheKey){nt[J]===void 0&&(nt[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),nt[J].usedTimes++;const Pt=nt[I.__cacheKey];Pt!==void 0&&(nt[I.__cacheKey].usedTimes--,Pt.usedTimes===0&&b(C)),I.__cacheKey=J,I.__webglTexture=nt[J].texture}return V}function K(I,C,V){let Q=i.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),C.isData3DTexture&&(Q=i.TEXTURE_3D);const nt=ve(I,C),J=C.source;e.bindTexture(Q,I.__webglTexture,i.TEXTURE0+V);const Pt=n.get(J);if(J.version!==Pt.__version||nt===!0){e.activeTexture(i.TEXTURE0+V);const mt=de.getPrimaries(de.workingColorSpace),wt=C.colorSpace===Zi?null:de.getPrimaries(C.colorSpace),ce=C.colorSpace===Zi||mt===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);let ot=v(C.image,!1,s.maxTextureSize);ot=Ae(C,ot);const St=r.convert(C.format,C.colorSpace),Bt=r.convert(C.type);let Gt=_(C.internalFormat,St,Bt,C.colorSpace,C.isVideoTexture);Xt(Q,C);let Et;const ae=C.mipmaps,Jt=C.isVideoTexture!==!0,Ee=Pt.__version===void 0||nt===!0,O=J.dataReady,ft=T(C,ot);if(C.isDepthTexture)Gt=x(C.format===yr,C.type),Ee&&(Jt?e.texStorage2D(i.TEXTURE_2D,1,Gt,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,Gt,ot.width,ot.height,0,St,Bt,null));else if(C.isDataTexture)if(ae.length>0){Jt&&Ee&&e.texStorage2D(i.TEXTURE_2D,ft,Gt,ae[0].width,ae[0].height);for(let Z=0,tt=ae.length;Z<tt;Z++)Et=ae[Z],Jt?O&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Et.width,Et.height,St,Bt,Et.data):e.texImage2D(i.TEXTURE_2D,Z,Gt,Et.width,Et.height,0,St,Bt,Et.data);C.generateMipmaps=!1}else Jt?(Ee&&e.texStorage2D(i.TEXTURE_2D,ft,Gt,ot.width,ot.height),O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ot.width,ot.height,St,Bt,ot.data)):e.texImage2D(i.TEXTURE_2D,0,Gt,ot.width,ot.height,0,St,Bt,ot.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Jt&&Ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Gt,ae[0].width,ae[0].height,ot.depth);for(let Z=0,tt=ae.length;Z<tt;Z++)if(Et=ae[Z],C.format!==In)if(St!==null)if(Jt){if(O)if(C.layerUpdates.size>0){const vt=Fu(Et.width,Et.height,C.format,C.type);for(const gt of C.layerUpdates){const Zt=Et.data.subarray(gt*vt/Et.data.BYTES_PER_ELEMENT,(gt+1)*vt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,gt,Et.width,Et.height,1,St,Zt)}C.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,Et.width,Et.height,ot.depth,St,Et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,Gt,Et.width,Et.height,ot.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?O&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,Et.width,Et.height,ot.depth,St,Bt,Et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,Gt,Et.width,Et.height,ot.depth,0,St,Bt,Et.data)}else{Jt&&Ee&&e.texStorage2D(i.TEXTURE_2D,ft,Gt,ae[0].width,ae[0].height);for(let Z=0,tt=ae.length;Z<tt;Z++)Et=ae[Z],C.format!==In?St!==null?Jt?O&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,Et.width,Et.height,St,Et.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,Gt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?O&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Et.width,Et.height,St,Bt,Et.data):e.texImage2D(i.TEXTURE_2D,Z,Gt,Et.width,Et.height,0,St,Bt,Et.data)}else if(C.isDataArrayTexture)if(Jt){if(Ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Gt,ot.width,ot.height,ot.depth),O)if(C.layerUpdates.size>0){const Z=Fu(ot.width,ot.height,C.format,C.type);for(const tt of C.layerUpdates){const vt=ot.data.subarray(tt*Z/ot.data.BYTES_PER_ELEMENT,(tt+1)*Z/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,ot.width,ot.height,1,St,Bt,vt)}C.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,St,Bt,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Gt,ot.width,ot.height,ot.depth,0,St,Bt,ot.data);else if(C.isData3DTexture)Jt?(Ee&&e.texStorage3D(i.TEXTURE_3D,ft,Gt,ot.width,ot.height,ot.depth),O&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,St,Bt,ot.data)):e.texImage3D(i.TEXTURE_3D,0,Gt,ot.width,ot.height,ot.depth,0,St,Bt,ot.data);else if(C.isFramebufferTexture){if(Ee)if(Jt)e.texStorage2D(i.TEXTURE_2D,ft,Gt,ot.width,ot.height);else{let Z=ot.width,tt=ot.height;for(let vt=0;vt<ft;vt++)e.texImage2D(i.TEXTURE_2D,vt,Gt,Z,tt,0,St,Bt,null),Z>>=1,tt>>=1}}else if(ae.length>0){if(Jt&&Ee){const Z=It(ae[0]);e.texStorage2D(i.TEXTURE_2D,ft,Gt,Z.width,Z.height)}for(let Z=0,tt=ae.length;Z<tt;Z++)Et=ae[Z],Jt?O&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,St,Bt,Et):e.texImage2D(i.TEXTURE_2D,Z,Gt,St,Bt,Et);C.generateMipmaps=!1}else if(Jt){if(Ee){const Z=It(ot);e.texStorage2D(i.TEXTURE_2D,ft,Gt,Z.width,Z.height)}O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,Bt,ot)}else e.texImage2D(i.TEXTURE_2D,0,Gt,St,Bt,ot);m(C)&&p(Q),Pt.__version=J.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function it(I,C,V){if(C.image.length!==6)return;const Q=ve(I,C),nt=C.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+V);const J=n.get(nt);if(nt.version!==J.__version||Q===!0){e.activeTexture(i.TEXTURE0+V);const Pt=de.getPrimaries(de.workingColorSpace),mt=C.colorSpace===Zi?null:de.getPrimaries(C.colorSpace),wt=C.colorSpace===Zi||Pt===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const ce=C.isCompressedTexture||C.image[0].isCompressedTexture,ot=C.image[0]&&C.image[0].isDataTexture,St=[];for(let tt=0;tt<6;tt++)!ce&&!ot?St[tt]=v(C.image[tt],!0,s.maxCubemapSize):St[tt]=ot?C.image[tt].image:C.image[tt],St[tt]=Ae(C,St[tt]);const Bt=St[0],Gt=r.convert(C.format,C.colorSpace),Et=r.convert(C.type),ae=_(C.internalFormat,Gt,Et,C.colorSpace),Jt=C.isVideoTexture!==!0,Ee=J.__version===void 0||Q===!0,O=nt.dataReady;let ft=T(C,Bt);Xt(i.TEXTURE_CUBE_MAP,C);let Z;if(ce){Jt&&Ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,ae,Bt.width,Bt.height);for(let tt=0;tt<6;tt++){Z=St[tt].mipmaps;for(let vt=0;vt<Z.length;vt++){const gt=Z[vt];C.format!==In?Gt!==null?Jt?O&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,0,0,gt.width,gt.height,Gt,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,ae,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Jt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,0,0,gt.width,gt.height,Gt,Et,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,ae,gt.width,gt.height,0,Gt,Et,gt.data)}}}else{if(Z=C.mipmaps,Jt&&Ee){Z.length>0&&ft++;const tt=It(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,ae,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ot){Jt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,St[tt].width,St[tt].height,Gt,Et,St[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ae,St[tt].width,St[tt].height,0,Gt,Et,St[tt].data);for(let vt=0;vt<Z.length;vt++){const Zt=Z[vt].image[tt].image;Jt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,0,0,Zt.width,Zt.height,Gt,Et,Zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,ae,Zt.width,Zt.height,0,Gt,Et,Zt.data)}}else{Jt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Gt,Et,St[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ae,Gt,Et,St[tt]);for(let vt=0;vt<Z.length;vt++){const gt=Z[vt];Jt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,0,0,Gt,Et,gt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,ae,Gt,Et,gt.image[tt])}}}m(C)&&p(i.TEXTURE_CUBE_MAP),J.__version=nt.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function yt(I,C,V,Q,nt,J){const Pt=r.convert(V.format,V.colorSpace),mt=r.convert(V.type),wt=_(V.internalFormat,Pt,mt,V.colorSpace),ce=n.get(C),ot=n.get(V);if(ot.__renderTarget=C,!ce.__hasExternalTextures){const St=Math.max(1,C.width>>J),Bt=Math.max(1,C.height>>J);nt===i.TEXTURE_3D||nt===i.TEXTURE_2D_ARRAY?e.texImage3D(nt,J,wt,St,Bt,C.depth,0,Pt,mt,null):e.texImage2D(nt,J,wt,St,Bt,0,Pt,mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),oe(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,nt,ot.__webglTexture,0,re(C)):(nt===i.TEXTURE_2D||nt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,nt,ot.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ct(I,C,V){if(i.bindRenderbuffer(i.RENDERBUFFER,I),C.depthBuffer){const Q=C.depthTexture,nt=Q&&Q.isDepthTexture?Q.type:null,J=x(C.stencilBuffer,nt),Pt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=re(C);oe(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt,J,C.width,C.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt,J,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,J,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pt,i.RENDERBUFFER,I)}else{const Q=C.textures;for(let nt=0;nt<Q.length;nt++){const J=Q[nt],Pt=r.convert(J.format,J.colorSpace),mt=r.convert(J.type),wt=_(J.internalFormat,Pt,mt,J.colorSpace),ce=re(C);V&&oe(C)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,wt,C.width,C.height):oe(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,wt,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,wt,C.width,C.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Nt(I,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(C.depthTexture);Q.__renderTarget=C,(!Q.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),W(C.depthTexture,0);const nt=Q.__webglTexture,J=re(C);if(C.depthTexture.format===dr)oe(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0);else if(C.depthTexture.format===yr)oe(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function jt(I){const C=n.get(I),V=I.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==I.depthTexture){const Q=I.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),Q){const nt=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,Q.removeEventListener("dispose",nt)};Q.addEventListener("dispose",nt),C.__depthDisposeCallback=nt}C.__boundDepthTexture=Q}if(I.depthTexture&&!C.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Nt(C.__webglFramebuffer,I)}else if(V){C.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[Q]),C.__webglDepthbuffer[Q]===void 0)C.__webglDepthbuffer[Q]=i.createRenderbuffer(),ct(C.__webglDepthbuffer[Q],I,!1);else{const nt=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=C.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,J)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=i.createRenderbuffer(),ct(C.__webglDepthbuffer,I,!1);else{const Q=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=C.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,nt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(I,C,V){const Q=n.get(I);C!==void 0&&yt(Q.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&jt(I)}function Fe(I){const C=I.texture,V=n.get(I),Q=n.get(C);I.addEventListener("dispose",w);const nt=I.textures,J=I.isWebGLCubeRenderTarget===!0,Pt=nt.length>1;if(Pt||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=C.version,o.memory.textures++),J){V.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(C.mipmaps&&C.mipmaps.length>0){V.__webglFramebuffer[mt]=[];for(let wt=0;wt<C.mipmaps.length;wt++)V.__webglFramebuffer[mt][wt]=i.createFramebuffer()}else V.__webglFramebuffer[mt]=i.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){V.__webglFramebuffer=[];for(let mt=0;mt<C.mipmaps.length;mt++)V.__webglFramebuffer[mt]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Pt)for(let mt=0,wt=nt.length;mt<wt;mt++){const ce=n.get(nt[mt]);ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&oe(I)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let mt=0;mt<nt.length;mt++){const wt=nt[mt];V.__webglColorRenderbuffer[mt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[mt]);const ce=r.convert(wt.format,wt.colorSpace),ot=r.convert(wt.type),St=_(wt.internalFormat,ce,ot,wt.colorSpace,I.isXRRenderTarget===!0),Bt=re(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt,St,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,V.__webglColorRenderbuffer[mt])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ct(V.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Xt(i.TEXTURE_CUBE_MAP,C);for(let mt=0;mt<6;mt++)if(C.mipmaps&&C.mipmaps.length>0)for(let wt=0;wt<C.mipmaps.length;wt++)yt(V.__webglFramebuffer[mt][wt],I,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,wt);else yt(V.__webglFramebuffer[mt],I,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(C)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let mt=0,wt=nt.length;mt<wt;mt++){const ce=nt[mt],ot=n.get(ce);e.bindTexture(i.TEXTURE_2D,ot.__webglTexture),Xt(i.TEXTURE_2D,ce),yt(V.__webglFramebuffer,I,ce,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,0),m(ce)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let mt=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(mt=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,Q.__webglTexture),Xt(mt,C),C.mipmaps&&C.mipmaps.length>0)for(let wt=0;wt<C.mipmaps.length;wt++)yt(V.__webglFramebuffer[wt],I,C,i.COLOR_ATTACHMENT0,mt,wt);else yt(V.__webglFramebuffer,I,C,i.COLOR_ATTACHMENT0,mt,0);m(C)&&p(mt),e.unbindTexture()}I.depthBuffer&&jt(I)}function le(I){const C=I.textures;for(let V=0,Q=C.length;V<Q;V++){const nt=C[V];if(m(nt)){const J=y(I),Pt=n.get(nt).__webglTexture;e.bindTexture(J,Pt),p(J),e.unbindTexture()}}}const We=[],F=[];function Fn(I){if(I.samples>0){if(oe(I)===!1){const C=I.textures,V=I.width,Q=I.height;let nt=i.COLOR_BUFFER_BIT;const J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pt=n.get(I),mt=C.length>1;if(mt)for(let wt=0;wt<C.length;wt++)e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let wt=0;wt<C.length;wt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(nt|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(nt|=i.STENCIL_BUFFER_BIT)),mt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[wt]);const ce=n.get(C[wt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ce,0)}i.blitFramebuffer(0,0,V,Q,0,0,V,Q,nt,i.NEAREST),l===!0&&(We.length=0,F.length=0,We.push(i.COLOR_ATTACHMENT0+wt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(We.push(J),F.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,We))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),mt)for(let wt=0;wt<C.length;wt++){e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[wt]);const ce=n.get(C[wt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,ce,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const C=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[C])}}}function re(I){return Math.min(s.maxSamples,I.samples)}function oe(I){const C=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Dt(I){const C=o.render.frame;h.get(I)!==C&&(h.set(I,C),I.update())}function Ae(I,C){const V=I.colorSpace,Q=I.format,nt=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||V!==Mr&&V!==Zi&&(de.getTransfer(V)===ye?(Q!==In||nt!==ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),C}function It(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=k,this.setTexture2D=W,this.setTexture2DArray=$,this.setTexture3D=et,this.setTextureCube=Y,this.rebindTextures=ee,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=Fn,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=oe}function L2(i,t){function e(n,s=Zi){let r;const o=de.getTransfer(s);if(n===ui)return i.UNSIGNED_BYTE;if(n===rh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===oh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===uf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===cf)return i.BYTE;if(n===hf)return i.SHORT;if(n===uo)return i.UNSIGNED_SHORT;if(n===sh)return i.INT;if(n===Ts)return i.UNSIGNED_INT;if(n===ai)return i.FLOAT;if(n===ci)return i.HALF_FLOAT;if(n===df)return i.ALPHA;if(n===ff)return i.RGB;if(n===In)return i.RGBA;if(n===pf)return i.LUMINANCE;if(n===mf)return i.LUMINANCE_ALPHA;if(n===dr)return i.DEPTH_COMPONENT;if(n===yr)return i.DEPTH_STENCIL;if(n===ah)return i.RED;if(n===lh)return i.RED_INTEGER;if(n===gf)return i.RG;if(n===ch)return i.RG_INTEGER;if(n===hh)return i.RGBA_INTEGER;if(n===_a||n===xa||n===ya||n===Ma)if(o===ye)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===_a)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===_a)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===yc||n===Mc||n===wc||n===bc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===yc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Mc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===bc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sc||n===Ec||n===Tc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Sc||n===Ec)return o===ye?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Tc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ac||n===Cc||n===Rc||n===Pc||n===Lc||n===Dc||n===Ic||n===Uc||n===Nc||n===Fc||n===kc||n===Oc||n===Bc||n===zc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ac)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Cc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Rc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Pc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Lc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Dc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ic)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Uc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Nc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===kc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===zc)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wa||n===Hc||n===Gc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===wa)return o===ye?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Hc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Gc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vf||n===Vc||n===Wc||n===Xc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===wa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const D2={type:"move"};class Ul{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(D2)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new bs;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const I2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U2=`
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

}`;class N2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new vn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Je({vertexShader:I2,fragmentShader:U2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Oe(new mi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class F2 extends Cr{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=new N2,m=e.getContextAttributes();let p=null,y=null;const _=[],x=[],T=new ht;let M=null;const w=new Vn;w.viewport=new ke;const E=new Vn;E.viewport=new ke;const b=[w,E],S=new eg;let D=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let it=_[K];return it===void 0&&(it=new Ul,_[K]=it),it.getTargetRaySpace()},this.getControllerGrip=function(K){let it=_[K];return it===void 0&&(it=new Ul,_[K]=it),it.getGripSpace()},this.getHand=function(K){let it=_[K];return it===void 0&&(it=new Ul,_[K]=it),it.getHandSpace()};function U(K){const it=x.indexOf(K.inputSource);if(it===-1)return;const yt=_[it];yt!==void 0&&(yt.update(K.inputSource,K.frame,c||o),yt.dispatchEvent({type:K.type,data:K.inputSource}))}function z(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",W);for(let K=0;K<_.length;K++){const it=x[K];it!==null&&(x[K]=null,_[K].disconnect(it))}D=null,k=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,y=null,ve.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",z),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0){const it={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Yn(f.framebufferWidth,f.framebufferHeight,{format:In,type:ui,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let it=null,yt=null,ct=null;m.depth&&(ct=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=m.stencil?yr:dr,yt=m.stencil?xr:Ts);const Nt={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Nt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Yn(d.textureWidth,d.textureHeight,{format:In,type:ui,depthTexture:new Rf(d.textureWidth,d.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ve.setContext(s),ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function W(K){for(let it=0;it<K.removed.length;it++){const yt=K.removed[it],ct=x.indexOf(yt);ct>=0&&(x[ct]=null,_[ct].disconnect(yt))}for(let it=0;it<K.added.length;it++){const yt=K.added[it];let ct=x.indexOf(yt);if(ct===-1){for(let jt=0;jt<_.length;jt++)if(jt>=x.length){x.push(yt),ct=jt;break}else if(x[jt]===null){x[jt]=yt,ct=jt;break}if(ct===-1)break}const Nt=_[ct];Nt&&Nt.connect(yt)}}const $=new N,et=new N;function Y(K,it,yt){$.setFromMatrixPosition(it.matrixWorld),et.setFromMatrixPosition(yt.matrixWorld);const ct=$.distanceTo(et),Nt=it.projectionMatrix.elements,jt=yt.projectionMatrix.elements,ee=Nt[14]/(Nt[10]-1),Fe=Nt[14]/(Nt[10]+1),le=(Nt[9]+1)/Nt[5],We=(Nt[9]-1)/Nt[5],F=(Nt[8]-1)/Nt[0],Fn=(jt[8]+1)/jt[0],re=ee*F,oe=ee*Fn,Dt=ct/(-F+Fn),Ae=Dt*-F;if(it.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ae),K.translateZ(Dt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Nt[10]===-1)K.projectionMatrix.copy(it.projectionMatrix),K.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const It=ee+Dt,I=Fe+Dt,C=re-Ae,V=oe+(ct-Ae),Q=le*Fe/I*It,nt=We*Fe/I*It;K.projectionMatrix.makePerspective(C,V,Q,nt,It,I),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function rt(K,it){it===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(it.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let it=K.near,yt=K.far;v.texture!==null&&(v.depthNear>0&&(it=v.depthNear),v.depthFar>0&&(yt=v.depthFar)),S.near=E.near=w.near=it,S.far=E.far=w.far=yt,(D!==S.near||k!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),D=S.near,k=S.far),w.layers.mask=K.layers.mask|2,E.layers.mask=K.layers.mask|4,S.layers.mask=w.layers.mask|E.layers.mask;const ct=K.parent,Nt=S.cameras;rt(S,ct);for(let jt=0;jt<Nt.length;jt++)rt(Nt[jt],ct);Nt.length===2?Y(S,w,E):S.projectionMatrix.copy(w.projectionMatrix),xt(K,S,ct)};function xt(K,it,yt){yt===null?K.matrix.copy(it.matrixWorld):(K.matrix.copy(yt.matrixWorld),K.matrix.invert(),K.matrix.multiply(it.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(it.projectionMatrix),K.projectionMatrixInverse.copy(it.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=fo*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let Tt=null;function Xt(K,it){if(h=it.getViewerPose(c||o),g=it,h!==null){const yt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let ct=!1;yt.length!==S.cameras.length&&(S.cameras.length=0,ct=!0);for(let jt=0;jt<yt.length;jt++){const ee=yt[jt];let Fe=null;if(f!==null)Fe=f.getViewport(ee);else{const We=u.getViewSubImage(d,ee);Fe=We.viewport,jt===0&&(t.setRenderTargetTextures(y,We.colorTexture,d.ignoreDepthValues?void 0:We.depthStencilTexture),t.setRenderTarget(y))}let le=b[jt];le===void 0&&(le=new Vn,le.layers.enable(jt),le.viewport=new ke,b[jt]=le),le.matrix.fromArray(ee.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(ee.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),jt===0&&(S.matrix.copy(le.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ct===!0&&S.cameras.push(le)}const Nt=s.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")){const jt=u.getDepthInformation(yt[0]);jt&&jt.isValid&&jt.texture&&v.init(t,jt,s.renderState)}}for(let yt=0;yt<_.length;yt++){const ct=x[yt],Nt=_[yt];ct!==null&&Nt!==void 0&&Nt.update(ct,it,c||o)}Tt&&Tt(K,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const ve=new Nf;ve.setAnimationLoop(Xt),this.setAnimationLoop=function(K){Tt=K},this.dispose=function(){}}}const ds=new $n,k2=new Me;function O2(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ef(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,_,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Sn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Sn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),_=y.envMap,x=y.envMapRotation;_&&(m.envMap.value=_,ds.copy(x),ds.x*=-1,ds.y*=-1,ds.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ds.y*=-1,ds.z*=-1),m.envMapRotation.value.setFromMatrix4(k2.makeRotationFromEuler(ds)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Sn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function B2(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){const x=_.program;n.uniformBlockBinding(y,x)}function c(y,_){let x=s[y.id];x===void 0&&(g(y),x=h(y),s[y.id]=x,y.addEventListener("dispose",m));const T=_.program;n.updateUBOMapping(y,T);const M=t.render.frame;r[y.id]!==M&&(d(y),r[y.id]=M)}function h(y){const _=u();y.__bindingPointIndex=_;const x=i.createBuffer(),T=y.__size,M=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,T,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,x),x}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const _=s[y.id],x=y.uniforms,T=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let M=0,w=x.length;M<w;M++){const E=Array.isArray(x[M])?x[M]:[x[M]];for(let b=0,S=E.length;b<S;b++){const D=E[b];if(f(D,M,b,T)===!0){const k=D.__offset,U=Array.isArray(D.value)?D.value:[D.value];let z=0;for(let W=0;W<U.length;W++){const $=U[W],et=v($);typeof $=="number"||typeof $=="boolean"?(D.__data[0]=$,i.bufferSubData(i.UNIFORM_BUFFER,k+z,D.__data)):$.isMatrix3?(D.__data[0]=$.elements[0],D.__data[1]=$.elements[1],D.__data[2]=$.elements[2],D.__data[3]=0,D.__data[4]=$.elements[3],D.__data[5]=$.elements[4],D.__data[6]=$.elements[5],D.__data[7]=0,D.__data[8]=$.elements[6],D.__data[9]=$.elements[7],D.__data[10]=$.elements[8],D.__data[11]=0):($.toArray(D.__data,z),z+=et.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,_,x,T){const M=y.value,w=_+"_"+x;if(T[w]===void 0)return typeof M=="number"||typeof M=="boolean"?T[w]=M:T[w]=M.clone(),!0;{const E=T[w];if(typeof M=="number"||typeof M=="boolean"){if(E!==M)return T[w]=M,!0}else if(E.equals(M)===!1)return E.copy(M),!0}return!1}function g(y){const _=y.uniforms;let x=0;const T=16;for(let w=0,E=_.length;w<E;w++){const b=Array.isArray(_[w])?_[w]:[_[w]];for(let S=0,D=b.length;S<D;S++){const k=b[S],U=Array.isArray(k.value)?k.value:[k.value];for(let z=0,W=U.length;z<W;z++){const $=U[z],et=v($),Y=x%T,rt=Y%et.boundary,xt=Y+rt;x+=rt,xt!==0&&T-xt<et.storage&&(x+=T-xt),k.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=et.storage}}}const M=x%T;return M>0&&(x+=T-M),y.__size=x,y.__cache={},this}function v(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){const _=y.target;_.removeEventListener("dispose",m);const x=o.indexOf(_.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class z2{constructor(t={}){const{canvas:e=sm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const y=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=An,this.toneMapping=Qi,this.toneMappingExposure=1;const x=this;let T=!1,M=0,w=0,E=null,b=-1,S=null;const D=new ke,k=new ke;let U=null;const z=new at(0);let W=0,$=e.width,et=e.height,Y=1,rt=null,xt=null;const Tt=new ke(0,0,$,et),Xt=new ke(0,0,$,et);let ve=!1;const K=new vh;let it=!1,yt=!1;const ct=new Me,Nt=new Me,jt=new N,ee=new ke,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let le=!1;function We(){return E===null?Y:1}let F=n;function Fn(P,B){return e.getContext(P,B)}try{const P={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${eh}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),F===null){const B="webgl2";if(F=Fn(B,P),F===null)throw Fn(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let re,oe,Dt,Ae,It,I,C,V,Q,nt,J,Pt,mt,wt,ce,ot,St,Bt,Gt,Et,ae,Jt,Ee,O;function ft(){re=new jv(F),re.init(),Jt=new L2(F,re),oe=new Vv(F,re,t,Jt),Dt=new R2(F,re),oe.reverseDepthBuffer&&d&&Dt.buffers.depth.setReversed(!0),Ae=new Jv(F),It=new g2,I=new P2(F,re,Dt,It,oe,Jt,Ae),C=new Xv(x),V=new $v(x),Q=new rg(F),Ee=new Hv(F,Q),nt=new Zv(F,Q,Ae,Ee),J=new t_(F,nt,Q,Ae),Gt=new Qv(F,oe,I),ot=new Wv(It),Pt=new m2(x,C,V,re,oe,Ee,ot),mt=new O2(x,It),wt=new _2,ce=new S2(re),Bt=new zv(x,C,V,Dt,J,f,l),St=new A2(x,J,oe),O=new B2(F,Ae,oe,Dt),Et=new Gv(F,re,Ae),ae=new Kv(F,re,Ae),Ae.programs=Pt.programs,x.capabilities=oe,x.extensions=re,x.properties=It,x.renderLists=wt,x.shadowMap=St,x.state=Dt,x.info=Ae}ft();const Z=new F2(x,F);this.xr=Z,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const P=re.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=re.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(P){P!==void 0&&(Y=P,this.setSize($,et,!1))},this.getSize=function(P){return P.set($,et)},this.setSize=function(P,B,X=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=P,et=B,e.width=Math.floor(P*Y),e.height=Math.floor(B*Y),X===!0&&(e.style.width=P+"px",e.style.height=B+"px"),this.setViewport(0,0,P,B)},this.getDrawingBufferSize=function(P){return P.set($*Y,et*Y).floor()},this.setDrawingBufferSize=function(P,B,X){$=P,et=B,Y=X,e.width=Math.floor(P*X),e.height=Math.floor(B*X),this.setViewport(0,0,P,B)},this.getCurrentViewport=function(P){return P.copy(D)},this.getViewport=function(P){return P.copy(Tt)},this.setViewport=function(P,B,X,q){P.isVector4?Tt.set(P.x,P.y,P.z,P.w):Tt.set(P,B,X,q),Dt.viewport(D.copy(Tt).multiplyScalar(Y).round())},this.getScissor=function(P){return P.copy(Xt)},this.setScissor=function(P,B,X,q){P.isVector4?Xt.set(P.x,P.y,P.z,P.w):Xt.set(P,B,X,q),Dt.scissor(k.copy(Xt).multiplyScalar(Y).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(P){Dt.setScissorTest(ve=P)},this.setOpaqueSort=function(P){rt=P},this.setTransparentSort=function(P){xt=P},this.getClearColor=function(P){return P.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor.apply(Bt,arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha.apply(Bt,arguments)},this.clear=function(P=!0,B=!0,X=!0){let q=0;if(P){let H=!1;if(E!==null){const st=E.texture.format;H=st===hh||st===ch||st===lh}if(H){const st=E.texture.type,pt=st===ui||st===Ts||st===uo||st===xr||st===rh||st===oh,Mt=Bt.getClearColor(),At=Bt.getClearAlpha(),Vt=Mt.r,qt=Mt.g,Ft=Mt.b;pt?(g[0]=Vt,g[1]=qt,g[2]=Ft,g[3]=At,F.clearBufferuiv(F.COLOR,0,g)):(v[0]=Vt,v[1]=qt,v[2]=Ft,v[3]=At,F.clearBufferiv(F.COLOR,0,v))}else q|=F.COLOR_BUFFER_BIT}B&&(q|=F.DEPTH_BUFFER_BIT),X&&(q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Bt.dispose(),wt.dispose(),ce.dispose(),It.dispose(),C.dispose(),V.dispose(),J.dispose(),Ee.dispose(),O.dispose(),Pt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Nh),Z.removeEventListener("sessionend",Fh),rs.stop()};function tt(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const P=Ae.autoReset,B=St.enabled,X=St.autoUpdate,q=St.needsUpdate,H=St.type;ft(),Ae.autoReset=P,St.enabled=B,St.autoUpdate=X,St.needsUpdate=q,St.type=H}function gt(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Zt(P){const B=P.target;B.removeEventListener("dispose",Zt),ze(B)}function ze(P){cn(P),It.remove(P)}function cn(P){const B=It.get(P).programs;B!==void 0&&(B.forEach(function(X){Pt.releaseProgram(X)}),P.isShaderMaterial&&Pt.releaseShaderCache(P))}this.renderBufferDirect=function(P,B,X,q,H,st){B===null&&(B=Fe);const pt=H.isMesh&&H.matrixWorld.determinant()<0,Mt=n0(P,B,X,q,H);Dt.setMaterial(q,pt);let At=X.index,Vt=1;if(q.wireframe===!0){if(At=nt.getWireframeAttribute(X),At===void 0)return;Vt=2}const qt=X.drawRange,Ft=X.attributes.position;let he=qt.start*Vt,me=(qt.start+qt.count)*Vt;st!==null&&(he=Math.max(he,st.start*Vt),me=Math.min(me,(st.start+st.count)*Vt)),At!==null?(he=Math.max(he,0),me=Math.min(me,At.count)):Ft!=null&&(he=Math.max(he,0),me=Math.min(me,Ft.count));const Ye=me-he;if(Ye<0||Ye===1/0)return;Ee.setup(H,q,Mt,X,At);let He,fe=Et;if(At!==null&&(He=Q.get(At),fe=ae,fe.setIndex(He)),H.isMesh)q.wireframe===!0?(Dt.setLineWidth(q.wireframeLinewidth*We()),fe.setMode(F.LINES)):fe.setMode(F.TRIANGLES);else if(H.isLine){let Ot=q.linewidth;Ot===void 0&&(Ot=1),Dt.setLineWidth(Ot*We()),H.isLineSegments?fe.setMode(F.LINES):H.isLineLoop?fe.setMode(F.LINE_LOOP):fe.setMode(F.LINE_STRIP)}else H.isPoints?fe.setMode(F.POINTS):H.isSprite&&fe.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)fe.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(re.get("WEBGL_multi_draw"))fe.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ot=H._multiDrawStarts,sn=H._multiDrawCounts,ge=H._multiDrawCount,Zn=At?Q.get(At).bytesPerElement:1,Ds=It.get(q).currentProgram.getUniforms();for(let Rn=0;Rn<ge;Rn++)Ds.setValue(F,"_gl_DrawID",Rn),fe.render(Ot[Rn]/Zn,sn[Rn])}else if(H.isInstancedMesh)fe.renderInstances(he,Ye,H.count);else if(X.isInstancedBufferGeometry){const Ot=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,sn=Math.min(X.instanceCount,Ot);fe.renderInstances(he,Ye,sn)}else fe.render(he,Ye)};function _e(P,B,X){P.transparent===!0&&P.side===ei&&P.forceSinglePass===!1?(P.side=Sn,P.needsUpdate=!0,bo(P,B,X),P.side=ki,P.needsUpdate=!0,bo(P,B,X),P.side=ei):bo(P,B,X)}this.compile=function(P,B,X=null){X===null&&(X=P),p=ce.get(X),p.init(B),_.push(p),X.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),P!==X&&P.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const q=new Set;return P.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const st=H.material;if(st)if(Array.isArray(st))for(let pt=0;pt<st.length;pt++){const Mt=st[pt];_e(Mt,X,H),q.add(Mt)}else _e(st,X,H),q.add(st)}),_.pop(),p=null,q},this.compileAsync=function(P,B,X=null){const q=this.compile(P,B,X);return new Promise(H=>{function st(){if(q.forEach(function(pt){It.get(pt).currentProgram.isReady()&&q.delete(pt)}),q.size===0){H(P);return}setTimeout(st,10)}re.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let jn=null;function vi(P){jn&&jn(P)}function Nh(){rs.stop()}function Fh(){rs.start()}const rs=new Nf;rs.setAnimationLoop(vi),typeof self<"u"&&rs.setContext(self),this.setAnimationLoop=function(P){jn=P,Z.setAnimationLoop(P),P===null?rs.stop():rs.start()},Z.addEventListener("sessionstart",Nh),Z.addEventListener("sessionend",Fh),this.render=function(P,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(B),B=Z.getCamera()),P.isScene===!0&&P.onBeforeRender(x,P,B,E),p=ce.get(P,_.length),p.init(B),_.push(p),Nt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),K.setFromProjectionMatrix(Nt),yt=this.localClippingEnabled,it=ot.init(this.clippingPlanes,yt),m=wt.get(P,y.length),m.init(),y.push(m),Z.enabled===!0&&Z.isPresenting===!0){const st=x.xr.getDepthSensingMesh();st!==null&&Za(st,B,-1/0,x.sortObjects)}Za(P,B,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(rt,xt),le=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,le&&Bt.addToRenderList(m,P),this.info.render.frame++,it===!0&&ot.beginShadows();const X=p.state.shadowsArray;St.render(X,P,B),it===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,H=m.transmissive;if(p.setupLights(),B.isArrayCamera){const st=B.cameras;if(H.length>0)for(let pt=0,Mt=st.length;pt<Mt;pt++){const At=st[pt];Oh(q,H,P,At)}le&&Bt.render(P);for(let pt=0,Mt=st.length;pt<Mt;pt++){const At=st[pt];kh(m,P,At,At.viewport)}}else H.length>0&&Oh(q,H,P,B),le&&Bt.render(P),kh(m,P,B);E!==null&&(I.updateMultisampleRenderTarget(E),I.updateRenderTargetMipmap(E)),P.isScene===!0&&P.onAfterRender(x,P,B),Ee.resetDefaultState(),b=-1,S=null,_.pop(),_.length>0?(p=_[_.length-1],it===!0&&ot.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Za(P,B,X,q){if(P.visible===!1)return;if(P.layers.test(B.layers)){if(P.isGroup)X=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(B);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||K.intersectsSprite(P)){q&&ee.setFromMatrixPosition(P.matrixWorld).applyMatrix4(Nt);const pt=J.update(P),Mt=P.material;Mt.visible&&m.push(P,pt,Mt,X,ee.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||K.intersectsObject(P))){const pt=J.update(P),Mt=P.material;if(q&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),ee.copy(P.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),ee.copy(pt.boundingSphere.center)),ee.applyMatrix4(P.matrixWorld).applyMatrix4(Nt)),Array.isArray(Mt)){const At=pt.groups;for(let Vt=0,qt=At.length;Vt<qt;Vt++){const Ft=At[Vt],he=Mt[Ft.materialIndex];he&&he.visible&&m.push(P,pt,he,X,ee.z,Ft)}}else Mt.visible&&m.push(P,pt,Mt,X,ee.z,null)}}const st=P.children;for(let pt=0,Mt=st.length;pt<Mt;pt++)Za(st[pt],B,X,q)}function kh(P,B,X,q){const H=P.opaque,st=P.transmissive,pt=P.transparent;p.setupLightsView(X),it===!0&&ot.setGlobalState(x.clippingPlanes,X),q&&Dt.viewport(D.copy(q)),H.length>0&&wo(H,B,X),st.length>0&&wo(st,B,X),pt.length>0&&wo(pt,B,X),Dt.buffers.depth.setTest(!0),Dt.buffers.depth.setMask(!0),Dt.buffers.color.setMask(!0),Dt.setPolygonOffset(!1)}function Oh(P,B,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new Yn(1,1,{generateMipmaps:!0,type:re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float")?ci:ui,minFilter:ws,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));const st=p.state.transmissionRenderTarget[q.id],pt=q.viewport||D;st.setSize(pt.z,pt.w);const Mt=x.getRenderTarget();x.setRenderTarget(st),x.getClearColor(z),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),le&&Bt.render(X);const At=x.toneMapping;x.toneMapping=Qi;const Vt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),it===!0&&ot.setGlobalState(x.clippingPlanes,q),wo(P,X,q),I.updateMultisampleRenderTarget(st),I.updateRenderTargetMipmap(st),re.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let Ft=0,he=B.length;Ft<he;Ft++){const me=B[Ft],Ye=me.object,He=me.geometry,fe=me.material,Ot=me.group;if(fe.side===ei&&Ye.layers.test(q.layers)){const sn=fe.side;fe.side=Sn,fe.needsUpdate=!0,Bh(Ye,X,q,He,fe,Ot),fe.side=sn,fe.needsUpdate=!0,qt=!0}}qt===!0&&(I.updateMultisampleRenderTarget(st),I.updateRenderTargetMipmap(st))}x.setRenderTarget(Mt),x.setClearColor(z,W),Vt!==void 0&&(q.viewport=Vt),x.toneMapping=At}function wo(P,B,X){const q=B.isScene===!0?B.overrideMaterial:null;for(let H=0,st=P.length;H<st;H++){const pt=P[H],Mt=pt.object,At=pt.geometry,Vt=q===null?pt.material:q,qt=pt.group;Mt.layers.test(X.layers)&&Bh(Mt,B,X,At,Vt,qt)}}function Bh(P,B,X,q,H,st){P.onBeforeRender(x,B,X,q,H,st),P.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),H.onBeforeRender(x,B,X,q,P,st),H.transparent===!0&&H.side===ei&&H.forceSinglePass===!1?(H.side=Sn,H.needsUpdate=!0,x.renderBufferDirect(X,B,q,H,P,st),H.side=ki,H.needsUpdate=!0,x.renderBufferDirect(X,B,q,H,P,st),H.side=ei):x.renderBufferDirect(X,B,q,H,P,st),P.onAfterRender(x,B,X,q,H,st)}function bo(P,B,X){B.isScene!==!0&&(B=Fe);const q=It.get(P),H=p.state.lights,st=p.state.shadowsArray,pt=H.state.version,Mt=Pt.getParameters(P,H.state,st,B,X),At=Pt.getProgramCacheKey(Mt);let Vt=q.programs;q.environment=P.isMeshStandardMaterial?B.environment:null,q.fog=B.fog,q.envMap=(P.isMeshStandardMaterial?V:C).get(P.envMap||q.environment),q.envMapRotation=q.environment!==null&&P.envMap===null?B.environmentRotation:P.envMapRotation,Vt===void 0&&(P.addEventListener("dispose",Zt),Vt=new Map,q.programs=Vt);let qt=Vt.get(At);if(qt!==void 0){if(q.currentProgram===qt&&q.lightsStateVersion===pt)return Hh(P,Mt),qt}else Mt.uniforms=Pt.getUniforms(P),P.onBeforeCompile(Mt,x),qt=Pt.acquireProgram(Mt,At),Vt.set(At,qt),q.uniforms=Mt.uniforms;const Ft=q.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Ft.clippingPlanes=ot.uniform),Hh(P,Mt),q.needsLights=s0(P),q.lightsStateVersion=pt,q.needsLights&&(Ft.ambientLightColor.value=H.state.ambient,Ft.lightProbe.value=H.state.probe,Ft.directionalLights.value=H.state.directional,Ft.directionalLightShadows.value=H.state.directionalShadow,Ft.spotLights.value=H.state.spot,Ft.spotLightShadows.value=H.state.spotShadow,Ft.rectAreaLights.value=H.state.rectArea,Ft.ltc_1.value=H.state.rectAreaLTC1,Ft.ltc_2.value=H.state.rectAreaLTC2,Ft.pointLights.value=H.state.point,Ft.pointLightShadows.value=H.state.pointShadow,Ft.hemisphereLights.value=H.state.hemi,Ft.directionalShadowMap.value=H.state.directionalShadowMap,Ft.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ft.spotShadowMap.value=H.state.spotShadowMap,Ft.spotLightMatrix.value=H.state.spotLightMatrix,Ft.spotLightMap.value=H.state.spotLightMap,Ft.pointShadowMap.value=H.state.pointShadowMap,Ft.pointShadowMatrix.value=H.state.pointShadowMatrix),q.currentProgram=qt,q.uniformsList=null,qt}function zh(P){if(P.uniformsList===null){const B=P.currentProgram.getUniforms();P.uniformsList=Sa.seqWithValue(B.seq,P.uniforms)}return P.uniformsList}function Hh(P,B){const X=It.get(P);X.outputColorSpace=B.outputColorSpace,X.batching=B.batching,X.batchingColor=B.batchingColor,X.instancing=B.instancing,X.instancingColor=B.instancingColor,X.instancingMorph=B.instancingMorph,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function n0(P,B,X,q,H){B.isScene!==!0&&(B=Fe),I.resetTextureUnits();const st=B.fog,pt=q.isMeshStandardMaterial?B.environment:null,Mt=E===null?x.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Mr,At=(q.isMeshStandardMaterial?V:C).get(q.envMap||pt),Vt=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,qt=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ft=!!X.morphAttributes.position,he=!!X.morphAttributes.normal,me=!!X.morphAttributes.color;let Ye=Qi;q.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Ye=x.toneMapping);const He=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,fe=He!==void 0?He.length:0,Ot=It.get(q),sn=p.state.lights;if(it===!0&&(yt===!0||P!==S)){const xn=P===S&&q.id===b;ot.setState(q,P,xn)}let ge=!1;q.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==sn.state.version||Ot.outputColorSpace!==Mt||H.isBatchedMesh&&Ot.batching===!1||!H.isBatchedMesh&&Ot.batching===!0||H.isBatchedMesh&&Ot.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ot.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ot.instancing===!1||!H.isInstancedMesh&&Ot.instancing===!0||H.isSkinnedMesh&&Ot.skinning===!1||!H.isSkinnedMesh&&Ot.skinning===!0||H.isInstancedMesh&&Ot.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ot.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ot.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ot.instancingMorph===!1&&H.morphTexture!==null||Ot.envMap!==At||q.fog===!0&&Ot.fog!==st||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==ot.numPlanes||Ot.numIntersection!==ot.numIntersection)||Ot.vertexAlphas!==Vt||Ot.vertexTangents!==qt||Ot.morphTargets!==Ft||Ot.morphNormals!==he||Ot.morphColors!==me||Ot.toneMapping!==Ye||Ot.morphTargetsCount!==fe)&&(ge=!0):(ge=!0,Ot.__version=q.version);let Zn=Ot.currentProgram;ge===!0&&(Zn=bo(q,B,H));let Ds=!1,Rn=!1,Nr=!1;const Ie=Zn.getUniforms(),kn=Ot.uniforms;if(Dt.useProgram(Zn.program)&&(Ds=!0,Rn=!0,Nr=!0),q.id!==b&&(b=q.id,Rn=!0),Ds||S!==P){Dt.buffers.depth.getReversed()?(ct.copy(P.projectionMatrix),om(ct),am(ct),Ie.setValue(F,"projectionMatrix",ct)):Ie.setValue(F,"projectionMatrix",P.projectionMatrix),Ie.setValue(F,"viewMatrix",P.matrixWorldInverse);const Tn=Ie.map.cameraPosition;Tn!==void 0&&Tn.setValue(F,jt.setFromMatrixPosition(P.matrixWorld)),oe.logarithmicDepthBuffer&&Ie.setValue(F,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Ie.setValue(F,"isOrthographic",P.isOrthographicCamera===!0),S!==P&&(S=P,Rn=!0,Nr=!0)}if(H.isSkinnedMesh){Ie.setOptional(F,H,"bindMatrix"),Ie.setOptional(F,H,"bindMatrixInverse");const xn=H.skeleton;xn&&(xn.boneTexture===null&&xn.computeBoneTexture(),Ie.setValue(F,"boneTexture",xn.boneTexture,I))}H.isBatchedMesh&&(Ie.setOptional(F,H,"batchingTexture"),Ie.setValue(F,"batchingTexture",H._matricesTexture,I),Ie.setOptional(F,H,"batchingIdTexture"),Ie.setValue(F,"batchingIdTexture",H._indirectTexture,I),Ie.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&Ie.setValue(F,"batchingColorTexture",H._colorsTexture,I));const On=X.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&Gt.update(H,X,Zn),(Rn||Ot.receiveShadow!==H.receiveShadow)&&(Ot.receiveShadow=H.receiveShadow,Ie.setValue(F,"receiveShadow",H.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(kn.envMap.value=At,kn.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&B.environment!==null&&(kn.envMapIntensity.value=B.environmentIntensity),Rn&&(Ie.setValue(F,"toneMappingExposure",x.toneMappingExposure),Ot.needsLights&&i0(kn,Nr),st&&q.fog===!0&&mt.refreshFogUniforms(kn,st),mt.refreshMaterialUniforms(kn,q,Y,et,p.state.transmissionRenderTarget[P.id]),Sa.upload(F,zh(Ot),kn,I)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Sa.upload(F,zh(Ot),kn,I),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Ie.setValue(F,"center",H.center),Ie.setValue(F,"modelViewMatrix",H.modelViewMatrix),Ie.setValue(F,"normalMatrix",H.normalMatrix),Ie.setValue(F,"modelMatrix",H.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const xn=q.uniformsGroups;for(let Tn=0,Ka=xn.length;Tn<Ka;Tn++){const os=xn[Tn];O.update(os,Zn),O.bind(os,Zn)}}return Zn}function i0(P,B){P.ambientLightColor.needsUpdate=B,P.lightProbe.needsUpdate=B,P.directionalLights.needsUpdate=B,P.directionalLightShadows.needsUpdate=B,P.pointLights.needsUpdate=B,P.pointLightShadows.needsUpdate=B,P.spotLights.needsUpdate=B,P.spotLightShadows.needsUpdate=B,P.rectAreaLights.needsUpdate=B,P.hemisphereLights.needsUpdate=B}function s0(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(P,B,X){It.get(P.texture).__webglTexture=B,It.get(P.depthTexture).__webglTexture=X;const q=It.get(P);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,B){const X=It.get(P);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(P,B=0,X=0){E=P,M=B,w=X;let q=!0,H=null,st=!1,pt=!1;if(P){const At=It.get(P);if(At.__useDefaultFramebuffer!==void 0)Dt.bindFramebuffer(F.FRAMEBUFFER,null),q=!1;else if(At.__webglFramebuffer===void 0)I.setupRenderTarget(P);else if(At.__hasExternalTextures)I.rebindTextures(P,It.get(P.texture).__webglTexture,It.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const Ft=P.depthTexture;if(At.__boundDepthTexture!==Ft){if(Ft!==null&&It.has(Ft)&&(P.width!==Ft.image.width||P.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(P)}}const Vt=P.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(pt=!0);const qt=It.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(qt[B])?H=qt[B][X]:H=qt[B],st=!0):P.samples>0&&I.useMultisampledRTT(P)===!1?H=It.get(P).__webglMultisampledFramebuffer:Array.isArray(qt)?H=qt[X]:H=qt,D.copy(P.viewport),k.copy(P.scissor),U=P.scissorTest}else D.copy(Tt).multiplyScalar(Y).floor(),k.copy(Xt).multiplyScalar(Y).floor(),U=ve;if(Dt.bindFramebuffer(F.FRAMEBUFFER,H)&&q&&Dt.drawBuffers(P,H),Dt.viewport(D),Dt.scissor(k),Dt.setScissorTest(U),st){const At=It.get(P.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,At.__webglTexture,X)}else if(pt){const At=It.get(P.texture),Vt=B||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.__webglTexture,X||0,Vt)}b=-1},this.readRenderTargetPixels=function(P,B,X,q,H,st,pt){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=It.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&pt!==void 0&&(Mt=Mt[pt]),Mt){Dt.bindFramebuffer(F.FRAMEBUFFER,Mt);try{const At=P.texture,Vt=At.format,qt=At.type;if(!oe.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!oe.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=P.width-q&&X>=0&&X<=P.height-H&&F.readPixels(B,X,q,H,Jt.convert(Vt),Jt.convert(qt),st)}finally{const At=E!==null?It.get(E).__webglFramebuffer:null;Dt.bindFramebuffer(F.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(P,B,X,q,H,st,pt){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=It.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&pt!==void 0&&(Mt=Mt[pt]),Mt){const At=P.texture,Vt=At.format,qt=At.type;if(!oe.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!oe.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=P.width-q&&X>=0&&X<=P.height-H){Dt.bindFramebuffer(F.FRAMEBUFFER,Mt);const Ft=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ft),F.bufferData(F.PIXEL_PACK_BUFFER,st.byteLength,F.STREAM_READ),F.readPixels(B,X,q,H,Jt.convert(Vt),Jt.convert(qt),0);const he=E!==null?It.get(E).__webglFramebuffer:null;Dt.bindFramebuffer(F.FRAMEBUFFER,he);const me=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await rm(F,me,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ft),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,st),F.deleteBuffer(Ft),F.deleteSync(me),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,B=null,X=0){P.isTexture!==!0&&(rr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,P=arguments[1]);const q=Math.pow(2,-X),H=Math.floor(P.image.width*q),st=Math.floor(P.image.height*q),pt=B!==null?B.x:0,Mt=B!==null?B.y:0;I.setTexture2D(P,0),F.copyTexSubImage2D(F.TEXTURE_2D,X,0,0,pt,Mt,H,st),Dt.unbindTexture()};const r0=F.createFramebuffer(),o0=F.createFramebuffer();this.copyTextureToTexture=function(P,B,X=null,q=null,H=0,st=null){P.isTexture!==!0&&(rr("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,P=arguments[1],B=arguments[2],st=arguments[3]||0,X=null),st===null&&(H!==0?(rr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),st=H,H=0):st=0);let pt,Mt,At,Vt,qt,Ft,he,me,Ye;const He=P.isCompressedTexture?P.mipmaps[st]:P.image;if(X!==null)pt=X.max.x-X.min.x,Mt=X.max.y-X.min.y,At=X.isBox3?X.max.z-X.min.z:1,Vt=X.min.x,qt=X.min.y,Ft=X.isBox3?X.min.z:0;else{const On=Math.pow(2,-H);pt=Math.floor(He.width*On),Mt=Math.floor(He.height*On),P.isDataArrayTexture?At=He.depth:P.isData3DTexture?At=Math.floor(He.depth*On):At=1,Vt=0,qt=0,Ft=0}q!==null?(he=q.x,me=q.y,Ye=q.z):(he=0,me=0,Ye=0);const fe=Jt.convert(B.format),Ot=Jt.convert(B.type);let sn;B.isData3DTexture?(I.setTexture3D(B,0),sn=F.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(I.setTexture2DArray(B,0),sn=F.TEXTURE_2D_ARRAY):(I.setTexture2D(B,0),sn=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);const ge=F.getParameter(F.UNPACK_ROW_LENGTH),Zn=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Ds=F.getParameter(F.UNPACK_SKIP_PIXELS),Rn=F.getParameter(F.UNPACK_SKIP_ROWS),Nr=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,He.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,He.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Vt),F.pixelStorei(F.UNPACK_SKIP_ROWS,qt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ft);const Ie=P.isDataArrayTexture||P.isData3DTexture,kn=B.isDataArrayTexture||B.isData3DTexture;if(P.isDepthTexture){const On=It.get(P),xn=It.get(B),Tn=It.get(On.__renderTarget),Ka=It.get(xn.__renderTarget);Dt.bindFramebuffer(F.READ_FRAMEBUFFER,Tn.__webglFramebuffer),Dt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ka.__webglFramebuffer);for(let os=0;os<At;os++)Ie&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,It.get(P).__webglTexture,H,Ft+os),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,It.get(B).__webglTexture,st,Ye+os)),F.blitFramebuffer(Vt,qt,pt,Mt,he,me,pt,Mt,F.DEPTH_BUFFER_BIT,F.NEAREST);Dt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Dt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||P.isRenderTargetTexture||It.has(P)){const On=It.get(P),xn=It.get(B);Dt.bindFramebuffer(F.READ_FRAMEBUFFER,r0),Dt.bindFramebuffer(F.DRAW_FRAMEBUFFER,o0);for(let Tn=0;Tn<At;Tn++)Ie?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,On.__webglTexture,H,Ft+Tn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,On.__webglTexture,H),kn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,xn.__webglTexture,st,Ye+Tn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,xn.__webglTexture,st),H!==0?F.blitFramebuffer(Vt,qt,pt,Mt,he,me,pt,Mt,F.COLOR_BUFFER_BIT,F.NEAREST):kn?F.copyTexSubImage3D(sn,st,he,me,Ye+Tn,Vt,qt,pt,Mt):F.copyTexSubImage2D(sn,st,he,me,Vt,qt,pt,Mt);Dt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Dt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else kn?P.isDataTexture||P.isData3DTexture?F.texSubImage3D(sn,st,he,me,Ye,pt,Mt,At,fe,Ot,He.data):B.isCompressedArrayTexture?F.compressedTexSubImage3D(sn,st,he,me,Ye,pt,Mt,At,fe,He.data):F.texSubImage3D(sn,st,he,me,Ye,pt,Mt,At,fe,Ot,He):P.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,st,he,me,pt,Mt,fe,Ot,He.data):P.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,st,he,me,He.width,He.height,fe,He.data):F.texSubImage2D(F.TEXTURE_2D,st,he,me,pt,Mt,fe,Ot,He);F.pixelStorei(F.UNPACK_ROW_LENGTH,ge),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Zn),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ds),F.pixelStorei(F.UNPACK_SKIP_ROWS,Rn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Nr),st===0&&B.generateMipmaps&&F.generateMipmap(sn),Dt.unbindTexture()},this.copyTextureToTexture3D=function(P,B,X=null,q=null,H=0){return P.isTexture!==!0&&(rr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,P=arguments[2],B=arguments[3],H=arguments[4]||0),rr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(P,B,X,q,H)},this.initRenderTarget=function(P){It.get(P).__webglFramebuffer===void 0&&I.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?I.setTextureCube(P,0):P.isData3DTexture?I.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?I.setTexture2DArray(P,0):I.setTexture2D(P,0),Dt.unbindTexture()},this.resetState=function(){M=0,w=0,E=null,Dt.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}}const zf={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ir{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const H2=new Ah(-1,1,1,-1,0,1);class G2 extends ln{constructor(){super(),this.setAttribute("position",new Le([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Le([0,2,0,0,2,0],2))}}const V2=new G2;class Rh{constructor(t){this._mesh=new Oe(V2,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,H2)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Hf extends Ir{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Je?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=po.clone(t.uniforms),this.material=new Je({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Rh(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class ad extends Ir{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class W2 extends Ir{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class X2{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new ht);this._width=n.width,this._height=n.height,e=new Yn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ci}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Hf(zf),this.copyPass.material.blending=Pi,this.clock=new ng}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ad!==void 0&&(o instanceof ad?n=!0:o instanceof W2&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ht);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class q2 extends Ir{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new at}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const Y2={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new at(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class br extends Ir{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new ht(t.x,t.y):new ht(256,256),this.clearColor=new at(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Yn(r,o,{type:ci}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new Yn(r,o,{type:ci});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new Yn(r,o,{type:ci});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=Y2;this.highPassUniforms=po.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Je({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ht(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=zf;this.copyUniforms=po.clone(h.uniforms),this.blendMaterial=new Je({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:ac,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new at,this.oldClearAlpha=1,this.basic=new yo,this.fsQuad=new Rh(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ht(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=br.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=br.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Je({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ht(.5,.5)},direction:{value:new ht(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Je({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}br.BlurDirectionX=new ht(1,0);br.BlurDirectionY=new ht(0,1);const $2={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class j2 extends Ir{constructor(){super();const t=$2;this.uniforms=po.clone(t.uniforms),this.material=new Ym({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Rh(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},de.getTransfer(this._outputColorSpace)===ye&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===nf?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===sf?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===rf?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ih?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===of?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===af&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Nl=(i,t,e)=>{const n=se((e-i)/(t-i));return n*n*(3-2*n)};function Z2(i,t){const e=i.r*.3+i.g*.59+i.b*.11;i.r=Ut(i.r,e,t),i.g=Ut(i.g,e,t),i.b=Ut(i.b,e,t)}function ld(i,t,e){if(e<=t[0].t)return i.copy(t[0].c);for(let n=1;n<t.length;n++)if(e<=t[n].t){const s=t[n-1],r=t[n],o=(e-s.t)/(r.t-s.t);return i.copy(s.c).lerp(r.c,o)}return i.copy(t[t.length-1].c)}const cd=[{t:0,c:new at(16738854)},{t:.1,c:new at(16754511)},{t:.28,c:new at(16769202)},{t:.6,c:new at(16774370)}],K2=new at(4029643),J2=new at(330010),Q2=new at(12442090),tx=new at(1186611),ex=new at(16749640),nx=new at(13624056),ix=new at(1713216),sx=new at(10127974),rx=new at(922144),ox=new at(9414872),ax=new at(9279390),lx=[new at(15662057),new at(16774365),new at(16771792),new at(15332095)],Fl=new N,kl=new N,Qo=new N,Si=new N,fs=new N,Ol=new N,Bl=new N,zl=new N,Hl=new at,Js=new at,hd=new at,ta=new at,cx=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,hx=`
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
`,ux={name:"TiltShiftGradeShader",uniforms:{tDiffuse:{value:null},uResolution:{value:new ht(1,1)},uMaxBlur:{value:2.6},uFocusY:{value:.44},uBand:{value:.13},uVignette:{value:.42},uSat:{value:1.12},uTint:{value:new N(1.05,1,.93)}},vertexShader:`
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
  `};class dx{constructor(t){L(this,"scene",new Rm);L(this,"camera");L(this,"gl");L(this,"_quality");L(this,"_fps",60);L(this,"_night",0);L(this,"elapsed",0);L(this,"fpsAcc",0);L(this,"fpsFrames",0);L(this,"shakeT",0);L(this,"shakeAmp",0);L(this,"canvas");L(this,"sun");L(this,"hemi");L(this,"sky");L(this,"fogExp");L(this,"bodyDir",new N(.4,.8,.3));L(this,"composer",null);L(this,"bloom",null);L(this,"grade",null);L(this,"output",null);L(this,"skyU",{uSunDir:{value:new N(0,1,0)},uMoonDir:{value:new N(0,-1,0)},uZenith:{value:new at(4029643)},uHorizon:{value:new at(12442090)},uSunTint:{value:new at(16774370)},uNight:{value:0},uGolden:{value:0},uDim:{value:0},uTime:{value:0}});this.canvas=t;const e=navigator.hardwareConcurrency??4,n=navigator.deviceMemory??8;this._quality=e>=6&&n>=6?"high":"medium",this.gl=new z2({canvas:t,antialias:!1,alpha:!1,stencil:!1,powerPreference:"high-performance"}),this.gl.toneMapping=ih,this.gl.toneMappingExposure=1.12,this.gl.outputColorSpace=An,this.gl.shadowMap.enabled=!0,this.gl.shadowMap.type=ef,this.camera=new Vn(50,1,.5,2400),this.camera.position.set(104,58,116),this.camera.lookAt(64,0,64),this.fogExp=new gh(12375266,.0018),this.scene.fog=this.fogExp,this.hemi=new jm(13624056,10127974,.55),this.scene.add(this.hemi),this.sun=new Jm(16774370,3),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-3e-4,this.sun.shadow.normalBias=.5,this.sun.shadow.camera.near=10,this.sun.shadow.camera.far=520,this.scene.add(this.sun),this.scene.add(this.sun.target);const s=new Je({uniforms:this.skyU,vertexShader:cx,fragmentShader:hx,side:Sn,depthWrite:!1,fog:!1});this.sky=new Oe(new Xa(1e3,32,16),s),this.sky.frustumCulled=!1,this.sky.renderOrder=-100,this.scene.add(this.sky),this.applyQuality(),this.resize()}get nightFactor(){return this._night}get fps(){return this._fps}get quality(){return this._quality}set quality(t){this.setQuality(t)}setQuality(t){t!==this._quality&&(this._quality=t,this.applyQuality())}pixelRatio(){const t=window.devicePixelRatio||1;return this._quality==="high"?Math.min(t,2):this._quality==="medium"?Math.min(t,1.5):1}applyQuality(){const t=this._quality;this.scene.userData.quality=t;const e=t!=="low";this.gl.shadowMap.enabled=e,this.sun.castShadow=e;const n=t==="high"?2048:1024;this.sun.shadow.mapSize.x!==n&&(this.sun.shadow.mapSize.set(n,n),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null)),this.gl.shadowMap.needsUpdate=!0,this.buildPost(),this.resize()}disposePost(){this.bloom&&this.bloom.dispose(),this.grade&&this.grade.dispose(),this.output&&this.output.dispose(),this.composer&&this.composer.dispose(),this.composer=null,this.bloom=null,this.grade=null,this.output=null}buildPost(){if(this.disposePost(),this._quality==="low")return;const t=new Yn(2,2,{type:ci,samples:this._quality==="high"?4:0});this.composer=new X2(this.gl,t),this.composer.addPass(new q2(this.scene,this.camera)),this.bloom=new br(new ht(window.innerWidth,window.innerHeight),.35,.55,.85),this.composer.addPass(this.bloom),this.grade=new Hf(ux),this.composer.addPass(this.grade),this.output=new j2,this.composer.addPass(this.output)}resize(){const t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight,n=this.pixelRatio();this.gl.setPixelRatio(n),this.gl.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.composer&&(this.composer.setPixelRatio(n),this.composer.setSize(t,e)),this.grade&&(this.grade.uniforms.uResolution.value.set(t*n,e*n),this.grade.uniforms.uMaxBlur.value=2.6*n)}updateSky(t,e){const n=(t.timeOfDay-.25)*Math.PI*2,s=Math.cos(n),r=Math.sin(n);Fl.set(s,r,.38).normalize(),kl.set(-s,-r,.3).normalize();const o=Nl(-.04,.14,r);this._night=1-o;const a=se(e.intensity);let l=0;switch(e.kind){case"cloudy":l=.3*a;break;case"rain":l=.5*a;break;case"storm":l=.68*a;break;case"snow":l=.42*a;break;case"fog":l=.55*a;break;default:l=0}const c=se(1-Math.abs(r-.08)/.22)*o*(1-l*.8),h=lx[t.season];r>0?(ld(Hl,cd,r),Z2(Hl,l*.5),this.sun.color.copy(Hl),this.sun.intensity=Nl(0,.1,r)*(1.25+1.9*se(r))*(1-l*.75),this.bodyDir.copy(Fl)):(this.sun.color.copy(ox),this.sun.intensity=Nl(0,.12,-r)*.42*(1-l*.6),this.bodyDir.copy(kl)),Js.copy(nx).multiply(h),this.hemi.color.copy(ix).lerp(Js,o),this.hemi.groundColor.copy(rx).lerp(sx,o),this.hemi.intensity=(.34+.42*o)*(1-l*.35),Js.copy(K2).multiply(h),hd.copy(J2).lerp(Js,o),Js.copy(Q2).multiply(h),ta.copy(tx).lerp(Js,o),ta.lerp(ex,c*.7);const u=this.skyU;u.uSunDir.value.copy(Fl),u.uMoonDir.value.copy(kl),u.uZenith.value.copy(hd),u.uHorizon.value.copy(ta),ld(u.uSunTint.value,cd,Math.max(r,0)),u.uNight.value=this._night,u.uGolden.value=c,u.uDim.value=l,this.fogExp.color.copy(ta).lerp(ax,l*.5),this.fogExp.density=.0016+l*.0038+(e.kind==="fog"?.016*a:0)+this._night*6e-4,this.gl.toneMappingExposure=1.14-.22*this._night,this.bloom&&(this.bloom.threshold=Ut(.85,.55,this._night),this.bloom.strength=Ut(.32,.7,this._night)+c*.08),this.grade&&(this.grade.uniforms.uTint.value.set(Ut(1.05+c*.06,.92,this._night),Ut(1,.97,this._night),Ut(.93-c*.04,1.1,this._night)),this.grade.uniforms.uSat.value=1.14-l*.28-this._night*.08)}fitShadow(){if(!this.sun.castShadow)return;const t=this.camera;Qo.set(0,0,-1).applyQuaternion(t.quaternion);let e=60;Qo.y<-.05&&(e=$t(-t.position.y/Qo.y,6,320)),Si.copy(t.position).addScaledVector(Qo,e),Si.x=$t(Si.x,-24,152),Si.z=$t(Si.z,-24,152),Si.y=0;const n=$t(Math.ceil(e*1.05/12)*12,24,168),s=this.sun.shadow.camera;Math.abs(s.right-n)>.5&&(s.left=-n,s.right=n,s.top=n,s.bottom=-n,s.updateProjectionMatrix());const r=this.bodyDir;fs.set(0,1,0).cross(r),fs.lengthSq()<1e-4&&fs.set(1,0,0),fs.normalize(),Ol.copy(r).cross(fs).normalize();const o=n*2/this.sun.shadow.mapSize.x,a=Math.round(Si.dot(fs)/o)*o,l=Math.round(Si.dot(Ol)/o)*o,c=Si.dot(r);Bl.copy(fs).multiplyScalar(a).addScaledVector(Ol,l).addScaledVector(r,c),this.sun.target.position.copy(Bl),this.sun.position.copy(Bl).addScaledVector(r,240),this.sun.target.updateMatrixWorld()}render(t){this.elapsed+=t,this.fpsFrames++,this.fpsAcc+=t,this.fpsAcc>=1&&(this._fps=this.fpsFrames/this.fpsAcc,this.fpsFrames=0,this.fpsAcc=0),this.camera.updateMatrixWorld(),this.sky.position.copy(this.camera.position),this.skyU.uTime.value=this.elapsed,this.fitShadow();let e=!1;if(this.shakeT>0){this.shakeT=Math.max(0,this.shakeT-t);const n=this.shakeT/.6,s=this.shakeAmp*n*n*.55;zl.set(Math.sin(this.elapsed*61.7)*s,Math.sin(this.elapsed*47.3+1.7)*s*.6,Math.cos(this.elapsed*53.9+.6)*s),this.camera.position.add(zl),this.camera.updateMatrixWorld(),e=!0,this.shakeT===0&&(this.shakeAmp=0)}this.composer?this.composer.render(t):this.gl.render(this.scene,this.camera),e&&(this.camera.position.sub(zl),this.camera.updateMatrixWorld())}shake(t){this.shakeAmp=Math.max(this.shakeAmp,$t(t,0,4)),this.shakeT=.6}dispose(){this.disposePost(),this.scene.remove(this.sun,this.sun.target,this.hemi,this.sky),this.sky.material.dispose(),this.sky.geometry.dispose(),this.sun.shadow.map&&this.sun.shadow.map.dispose(),this.sun.dispose(),this.hemi.dispose(),this.gl.dispose()}}const Mn=i=>new at(i),rn={grass:Mn(7645515),grassAlt:Mn(9289051),grassDry:Mn(11121759),forest:Mn(5078843),forestDeep:Mn(3959601),sand:Mn(15325608),sandWet:Mn(13350532),rock:Mn(9604225),rockDark:Mn(7301471),snow:Mn(16120059),dirt:Mn(11242340),bedShallow:Mn(14469524),bedDeep:Mn(2376012),cliff:Mn(8747886),cliffLow:Mn(5130304)},$a=ie*ie*20,fx=ie*ie*30,ea=new Float32Array($a*3),na=new Float32Array($a*3),ia=new Float32Array($a*3),ud=new Float32Array($a),ps=new Uint16Array(fx),Xi=new at,Ze=new at,px=new N(.45,.72,.28).normalize(),$r=new N,dd=7*nn,fd=2.6,mx=-9*nn;function sa(i,t,e,n){const s=se((t-i)/(nn*2)),r=se((e-i)/(nn*2)),o=se((n-i)/(nn*2)),a=s+r+o*(s+r>1.2?.2:.55),l=(t<i-1e-4?1:0)+(e<i-1e-4?1:0);return Math.max(.5,1-a*.15)+l*.03}function ra(i,t){return .955+.09*bt(i,t,23)}const Gf=`
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
`,gx=`
  uniform float uTime;
  varying vec3 vWorld;
  ${Gf}
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vec3 w = swell(wp.xz, uTime);
    wp.y += w.x;
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,vx=`
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
  ${Gf}

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
`;class _x{constructor(t,e){L(this,"scene");L(this,"grid");L(this,"group",new bs);L(this,"chunks",new Array(Ve*Xn).fill(null));L(this,"groundMat");L(this,"waterMesh");L(this,"waterMat");L(this,"infoTex");L(this,"infoData");L(this,"blankTex");L(this,"shoreDist",new Int16Array(R*lt));L(this,"bfs",new Int32Array(R*lt));L(this,"sun",null);L(this,"sunSearched",!1);L(this,"sunRetry",0);L(this,"disposed",!1);L(this,"infoDirty",!0);L(this,"gu",{uOverlay:{value:null},uOverlayStrength:{value:0},uHighlight:{value:new ke(0,0,0,0)},uHighlightColor:{value:new at(3989631)},uHighlightOn:{value:0},uTime:{value:0}});this.scene=t,this.grid=e,this.blankTex=new Na(new Uint8Array([0,0,0,0]),1,1),this.blankTex.needsUpdate=!0,this.gu.uOverlay.value=this.blankTex,this.groundMat=this.makeGroundMaterial(),this.infoData=new Uint8Array(R*lt*4),this.infoTex=new Na(this.infoData,R,lt,In),this.infoTex.minFilter=qn,this.infoTex.magFilter=qn,this.infoTex.wrapS=Ai,this.infoTex.wrapT=Ai,this.infoTex.generateMipmaps=!1,this.infoTex.needsUpdate=!0,this.waterMat=new Je({uniforms:{uTime:{value:0},uNight:{value:0},uInfo:{value:this.infoTex},uSunDir:{value:px.clone()},uSunColor:{value:new at(16773327)},uSkyColor:{value:new at(10473712)},uDeep:{value:new at(733022)},uShallow:{value:new at(3130806)},uFoam:{value:new at(15924223)}},vertexShader:gx,fragmentShader:vx,transparent:!0,depthWrite:!1,side:ki});const n=new mi(R,lt,64,64);n.rotateX(-Math.PI/2),this.waterMesh=new Oe(n,this.waterMat),this.waterMesh.position.set(R/2,Ji+.02,lt/2),this.waterMesh.renderOrder=2,this.waterMesh.frustumCulled=!1,this.waterMesh.matrixAutoUpdate=!1,this.waterMesh.updateMatrix(),this.waterMesh.updateMatrixWorld(!0),this.group.add(this.waterMesh),this.scene.add(this.group)}makeGroundMaterial(){const t=new qa({vertexColors:!0}),e=this.gu;return t.onBeforeCompile=n=>{n.uniforms.uOverlay=e.uOverlay,n.uniforms.uOverlayStrength=e.uOverlayStrength,n.uniforms.uHighlight=e.uHighlight,n.uniforms.uHighlightColor=e.uHighlightColor,n.uniforms.uHighlightOn=e.uHighlightOn,n.uniforms.uTime=e.uTime,n.vertexShader=`attribute float aWind;
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
           }`)},t}hAt(t,e){return t<0||e<0||t>=R||e>=lt?mx:this.grid.height[e*R+t]}tileColour(t,e,n,s){const r=this.grid,o=bt(t,e,3),a=bt(t,e,9);if(r.water[n]){s.copy(rn.bedShallow).lerp(rn.bedDeep,se(-r.height[n]/dd)),s.multiplyScalar(.92+.16*o);return}switch(r.terrain[n]){case ne.Forest:s.copy(rn.forest).lerp(rn.forestDeep,o);break;case ne.Sand:s.copy(rn.sand).lerp(rn.sandWet,o*.55);break;case ne.Rock:s.copy(rn.rock).lerp(rn.rockDark,o);break;case ne.Snow:s.copy(rn.snow).lerp(rn.rock,o*.16);break;case ne.Dirt:s.copy(rn.dirt).lerp(rn.sandWet,o*.45);break;default:s.copy(rn.grass).lerp(rn.grassAlt,o),a>.8&&s.lerp(rn.grassDry,(a-.8)*2);break}(t>0&&r.water[n-1]||t<R-1&&r.water[n+1]||e>0&&r.water[n-R]||e<lt-1&&r.water[n+R])&&s.lerp(rn.sandWet,.4);const l=r.height[n]/nn;s.multiplyScalar(Ut(.95,1.08,se(l/20))*(.94+.12*bt(t,e,17)))}build(){this.refreshWaterInfo();for(let t=0;t<Xn;t++)for(let e=0;e<Ve;e++)this.buildChunk(e,t,!1)}buildChunk(t,e,n=!0){if(t<0||e<0||t>=Ve||e>=Xn)return;n&&(this.infoDirty=!0);const s=this.grid;let r=0,o=0,a=1/0,l=-1/0;const c=t*ie,h=e*ie,u=(f,g,v,m,p,y,_,x,T)=>{const M=r*3;ea[M]=f,ea[M+1]=g,ea[M+2]=v,na[M]=m,na[M+1]=p,na[M+2]=y,ia[M]=_.r*x,ia[M+1]=_.g*x,ia[M+2]=_.b*x,ud[r]=T,g<a&&(a=g),g>l&&(l=g),r++},d=f=>{ps[o++]=f,ps[o++]=f+1,ps[o++]=f+2,ps[o++]=f,ps[o++]=f+2,ps[o++]=f+3};for(let f=h;f<h+ie;f++)for(let g=c;g<c+ie;g++){const v=f*R+g,m=s.height[v],p=g,y=g+1,_=f,x=f+1,T=this.hAt(g+1,f),M=this.hAt(g-1,f),w=this.hAt(g,f-1),E=this.hAt(g,f+1),b=this.hAt(g+1,f-1),S=this.hAt(g-1,f-1),D=this.hAt(g+1,f+1),k=this.hAt(g-1,f+1);this.tileColour(g,f,v,Xi);const U=s.terrain[v],z=!s.water[v]&&(U===ne.Grass||U===ne.Forest)?1:0,W=r;u(p,m,x,0,1,0,Xi,sa(m,M,E,k)*ra(g,f+1),z),u(y,m,x,0,1,0,Xi,sa(m,T,E,D)*ra(g+1,f+1),z),u(y,m,_,0,1,0,Xi,sa(m,T,w,b)*ra(g+1,f),z),u(p,m,_,0,1,0,Xi,sa(m,M,w,S)*ra(g,f),z),d(W);const $=.9+.2*bt(g,f,41);Ze.copy(rn.cliff).lerp(Xi,.22).multiplyScalar($);const et=1,Y=.56;if(T<m-1e-4){const rt=r;u(y,m,_,1,0,0,Ze,et,0),u(y,m,x,1,0,0,Ze,et,0),u(y,T,x,1,0,0,Ze,Y,0),u(y,T,_,1,0,0,Ze,Y,0),d(rt)}if(M<m-1e-4){const rt=r;u(p,m,x,-1,0,0,Ze,et,0),u(p,m,_,-1,0,0,Ze,et,0),u(p,M,_,-1,0,0,Ze,Y,0),u(p,M,x,-1,0,0,Ze,Y,0),d(rt)}if(E<m-1e-4){const rt=r;u(y,m,x,0,0,1,Ze,et,0),u(p,m,x,0,0,1,Ze,et,0),u(p,E,x,0,0,1,Ze,Y,0),u(y,E,x,0,0,1,Ze,Y,0),d(rt)}if(w<m-1e-4){const rt=r;u(p,m,_,0,0,-1,Ze,et,0),u(y,m,_,0,0,-1,Ze,et,0),u(y,w,_,0,0,-1,Ze,Y,0),u(p,w,_,0,0,-1,Ze,Y,0),d(rt)}}this.upload(e*Ve+t,r,o,c,h,a,l)}upload(t,e,n,s,r,o,a){let l=this.chunks[t];if(!l||l.vertCap<e||l.idxCap<n){l&&(this.group.remove(l.mesh),l.geo.dispose());const v=Math.max(1024,Math.ceil(e*1.35)),m=Math.max(1536,Math.ceil(n*1.35)),p=new ln;p.setAttribute("position",new Pe(new Float32Array(v*3),3)),p.setAttribute("normal",new Pe(new Float32Array(v*3),3)),p.setAttribute("color",new Pe(new Float32Array(v*3),3)),p.setAttribute("aWind",new Pe(new Float32Array(v),1)),p.setIndex(new Pe(new Uint16Array(m),1));const y=new Oe(p,this.groundMat);y.receiveShadow=!0,y.castShadow=!1,y.matrixAutoUpdate=!1,y.updateMatrix(),this.group.add(y),l={mesh:y,geo:p,vertCap:v,idxCap:m},this.chunks[t]=l}const c=l.geo.getAttribute("position"),h=l.geo.getAttribute("normal"),u=l.geo.getAttribute("color"),d=l.geo.getAttribute("aWind"),f=l.geo.getIndex();c.array.set(ea.subarray(0,e*3)),h.array.set(na.subarray(0,e*3)),u.array.set(ia.subarray(0,e*3)),d.array.set(ud.subarray(0,e)),f.array.set(ps.subarray(0,n)),c.needsUpdate=!0,h.needsUpdate=!0,u.needsUpdate=!0,d.needsUpdate=!0,f.needsUpdate=!0,l.geo.setDrawRange(0,n),Number.isFinite(o)||(o=0,a=0);const g=ie*.5;l.geo.boundingSphere||(l.geo.boundingSphere=new Pr),l.geo.boundingSphere.center.set(s+g,(o+a)*.5,r+g),l.geo.boundingSphere.radius=Math.sqrt(g*g*2+((a-o)*.5)**2)+.05,l.geo.boundingBox||(l.geo.boundingBox=new ss),l.geo.boundingBox.min.set(s,o,r),l.geo.boundingBox.max.set(s+ie,a,r+ie)}refreshWaterInfo(){const t=this.grid,e=this.shoreDist,n=this.bfs,s=this.infoData;e.fill(1023);let r=0;for(let l=0;l<lt;l++)for(let c=0;c<R;c++){const h=l*R+c;t.water[h]&&(c>0&&!t.water[h-1]||c<R-1&&!t.water[h+1]||l>0&&!t.water[h-R]||l<lt-1&&!t.water[h+R])&&(e[h]=0,n[r++]=h)}let o=0;for(;o<r;){const l=n[o++],c=l%R,h=l/R|0,u=e[l]+1;u>fd+1||(c>0&&t.water[l-1]&&e[l-1]>u&&(e[l-1]=u,n[r++]=l-1),c<R-1&&t.water[l+1]&&e[l+1]>u&&(e[l+1]=u,n[r++]=l+1),h>0&&t.water[l-R]&&e[l-R]>u&&(e[l-R]=u,n[r++]=l-R),h<lt-1&&t.water[l+R]&&e[l+R]>u&&(e[l+R]=u,n[r++]=l+R))}let a=0;for(let l=0;l<R*lt;l++){const c=l*4;t.water[l]?(a++,s[c]=se(-t.height[l]/dd)*255|0,s[c+1]=se(1-e[l]/fd)*255|0,s[c+2]=0):(s[c]=0,s[c+1]=255,s[c+2]=255),s[c+3]=255}this.waterMesh.visible=a>0,this.infoTex.needsUpdate=!0,this.infoDirty=!1}update(t,e,n){if(this.disposed)return;this.infoDirty&&this.refreshWaterInfo(),this.gu.uTime.value=e;const s=this.waterMat.uniforms;s.uTime.value=e,s.uNight.value=se(n),this.sun||(this.sunRetry-=t,(!this.sunSearched||this.sunRetry<=0)&&(this.sunSearched=!0,this.sunRetry=1.5,this.scene.traverse(r=>{!this.sun&&r.isDirectionalLight&&(this.sun=r)}))),this.sun&&($r.copy(this.sun.position).sub(this.sun.target.position),$r.lengthSq()>1e-6&&($r.normalize(),$r.y>.04&&s.uSunDir.value.copy($r)),Xi.copy(this.sun.color),Ze.setHex(12571647),s.uSunColor.value.copy(Xi).lerp(Ze,se(n)))}setOverlayTexture(t,e){this.gu.uOverlay.value=t??this.blankTex,this.gu.uOverlayStrength.value=t?se(e):0}setHighlight(t){if(!t){this.gu.uHighlightOn.value=0;return}const e=Math.min(t.x0,t.x1),n=Math.max(t.x0,t.x1)+1,s=Math.min(t.y0,t.y1),r=Math.max(t.y0,t.y1)+1;this.gu.uHighlight.value.set(e,s,n,r),this.gu.uHighlightColor.value.setHex(t.valid?3989631:15747666),this.gu.uHighlightOn.value=1}dispose(){if(!this.disposed){this.disposed=!0,this.scene.remove(this.group);for(let t=0;t<this.chunks.length;t++){const e=this.chunks[t];e&&(this.group.remove(e.mesh),e.geo.dispose(),this.chunks[t]=null)}this.group.remove(this.waterMesh),this.waterMesh.geometry.dispose(),this.waterMat.dispose(),this.groundMat.dispose(),this.infoTex.dispose(),this.blankTex.dispose(),this.gu.uOverlay.value=null}}}const Rt=.02,ao=.055,Xe=.012,xx=.32,Vf=Ji+.55,Ss=[0,1,0,-1],Es=[-1,0,1,0],Be=i=>new at(i),pd=Be(4277580),md=Be(3751236),Qs=Be(3422270),qi=Be(10196876),yx=Be(11907493),dn=Be(15330279),oa=Be(14266683),jr=Be(11184026),gd=Be(9273190),Mx=Be(8227416),wx=Be(12304838),vd=Be(9409947),_d=Be(13554647),Gl=Be(7765123),Zr=Be(8090984),bx=Be(6643540),Kr=Be(5719865),Vl=Be(10134187),ii=Be(9673633),xd=Be(2500652),Wl=Be(10196105),Xl=Be(8156780),Sx=Be(1053206);function ti(i,t,e){return zt(t,e)&&i.road[dt(t,e)]>0}function Ph(i,t,e){return zt(t,e)&&i.rail[dt(t,e)]>0}function aa(i,t,e){return zt(t,e)&&i.wire[dt(t,e)]>0}function ka(i,t,e){let n=0;for(let s=0;s<4;s++)ti(i,t+Ss[s],e+Es[s])&&(n|=1<<s);return n}function yd(i,t,e){let n=0;for(let s=0;s<4;s++)Ph(i,t+Ss[s],e+Es[s])&&(n|=1<<s);return n}function Lh(i,t,e,n){const s=n?Ph:ti,r=(f,g)=>zt(f,g)&&i.water[dt(f,g)]===1&&s(i,f,g),o=(r(t+1,e)?1:0)+(r(t-1,e)?1:0),a=(r(t,e+1)?1:0)+(r(t,e-1)?1:0);let l;if(o!==a)l=o>a?0:1;else{const f=(s(i,t+1,e)?1:0)+(s(i,t-1,e)?1:0);l=(s(i,t,e+1)?1:0)+(s(i,t,e-1)?1:0)>f?1:0}const c=l===0?1:0,h=l===0?0:1;let u=0;for(;u<64&&r(t-c*(u+1),e-h*(u+1));)u++;let d=0;for(;d<64&&r(t+c*(d+1),e+h*(d+1));)d++;return{axis:l,neg:u,run:u+d+1}}function Ex(i){return Math.min(.5,.05+i*.055)}function Wf(i,t){return Ex(i)*Math.sin($t(t,0,1)*Math.PI)}function Xf(i,t,e){const n=ti(i,t+1,e)?1:0,s=ti(i,t-1,e)?1:0,r=ti(i,t,e-1)?1:0,o=ti(i,t,e+1)?1:0,a=n+s>=r+o?0:1,l=a===0?1:0,c=a===0?0:1,h=(x,T)=>ti(i,x,T)&&i.tunnel[dt(x,T)]===1;let u=0;for(;u<64&&h(t-l*(u+1),e-c*(u+1));)u++;let d=0;for(;d<64&&h(t+l*(d+1),e+c*(d+1));)d++;const f=t-l*(u+1),g=e-c*(u+1),v=t+l*(d+1),m=e+c*(d+1),p=i.height[dt(t,e)],y=ti(i,f,g)&&!i.tunnel[dt(f,g)]?Ki(i,f,g,!1):p,_=ti(i,v,m)&&!i.tunnel[dt(v,m)]?Ki(i,v,m,!1):p;return{axis:a,neg:u,run:u+d+1,hA:y,hB:_}}function Ki(i,t,e,n){const s=dt(t,e);if(i.water[s]){const o=Lh(i,t,e,n);return Vf+Wf(o.run,(o.neg+.5)/o.run)}const r=i.height[s];return!n&&i.road[s]===Ue.Highway&&!i.tunnel[s]?r+xx:r}function Tx(i,t,e,n,s,r){const o=dt(t,e),a=dt(n,s),l=!r&&i.tunnel[o]===1,c=!r&&i.tunnel[a]===1;if(c&&!l)return Ki(i,t,e,r);if(l&&!c)return Ki(i,n,s,r);if(l&&c){const h=Xf(i,t,e);return Ut(h.hA,h.hB,(h.neg+(n+s>t+e?1:0))/h.run)}if(i.water[o]&&i.water[a]){const h=Lh(i,t,e,r),u=n-t,d=s-e,f=h.axis===0?u:d;if(h.axis===0&&d===0||h.axis===1&&u===0){const g=f>0?(h.neg+1)/h.run:h.neg/h.run;return Vf+Wf(h.run,g)}}return Math.max(Ki(i,t,e,r),Ki(i,n,s,r))}const Wn=new Float64Array(5);function qf(i,t,e,n){const s=n?Ph:ti,r=Ki(i,t,e,n);Wn[0]=r;for(let o=0;o<4;o++){const a=t+Ss[o],l=e+Es[o];Wn[1+o]=s(i,a,l)?Tx(i,t,e,a,l,n):r}}function Yf(i,t,e,n,s,r,o){const a=r<.5?(s-i)*(1-2*r):(e-i)*(2*r-1),l=o<.5?(t-i)*(1-2*o):(n-i)*(2*o-1);return i+a+l}function Ea(i,t,e){const n=$t(Math.floor(t),0,R-1),s=$t(Math.floor(e),0,lt-1),r=dt(n,s),o=i.road[r]>0,a=i.rail[r]>0;if(!o&&!a)return i.height[r]+Rt;const l=$t(t-n,0,1),c=$t(e-s,0,1);if(o&&i.tunnel[r]){const h=Xf(i,n,s),u=h.axis===0?l:c;return Ut(h.hA,h.hB,(h.neg+u)/h.run)+Rt}return qf(i,n,s,!o),Yf(Wn[0],Wn[1],Wn[2],Wn[3],Wn[4],l,c)+Rt}function $f(i,t,e){const n=dt(t,e),s=i.road[n];if(!s||s===Ue.Highway)return[];if(i.water[n]||i.tunnel[n])return[];const r=ka(i,t,e);if(r!==5&&r!==10)return[];if((t+e&1)!==0)return[];const o=r===5,a=bt(t,e,31)<.5?-1:1,l=s===Ue.Avenue?.07:.18;let c,h,u,d,f;o?(c=a<0?l*.45:1-l*.45,h=.5,u=a<0?0:Math.PI,d=a<0?l+.15:1-l-.15,f=.5):(h=a<0?l*.45:1-l*.45,c=.5,u=a<0?-Math.PI/2:Math.PI/2,f=a<0?l+.15:1-l-.15,d=.5);const g=t+c,v=e+h,m=Ea(i,g,v)+ao;return[{wx:g,wz:v,wy:m,rotY:u,poolU:d,poolV:f}]}class Ax{constructor(){L(this,"pos",[]);L(this,"nor",[]);L(this,"col",[]);L(this,"emi",[]);L(this,"ind",[]);L(this,"vc",0)}quad(t,e,n,s,r,o,a,l,c,h,u,d,f,g,v=0){const m=s-t,p=r-e,y=o-n,_=h-t,x=u-e,T=d-n;let M=p*T-y*x,w=y*_-m*T,E=m*x-p*_;const b=Math.hypot(M,w,E)||1;M/=b,w/=b,E/=b;const S=f.r*g,D=f.g*g,k=f.b*g,U=this.vc;this.pos.push(t,e,n,s,r,o,a,l,c,h,u,d);for(let z=0;z<4;z++)this.nor.push(M,w,E),this.col.push(S,D,k),this.emi.push(v);this.ind.push(U,U+1,U+2,U,U+2,U+3),this.vc+=4}wall(t,e,n,s,r,o,a,l,c,h){this.quad(t,r,e,n,a,s,n,l,s,t,o,e,c,h)}bar(t,e,n,s,r,o,a,l,c){let h=s-t,u=r-e,d=o-n;const f=Math.hypot(h,u,d)||1;h/=f,u/=f,d/=f;let g=-d,v=0,m=h;const p=Math.hypot(g,v,m);p<1e-4?(g=1,v=0,m=0):(g/=p,m/=p);const y=v*d-m*u,_=m*h-g*d,x=g*u-v*h,T=[g+y,g-y,-g-y,-g+y],M=[v+_,v-_,-v-_,-v+_],w=[m+x,m-x,-m-x,-m+x];for(let E=0;E<4;E++){const b=E+1&3;this.quad(t+T[E]*a,e+M[E]*a,n+w[E]*a,t+T[b]*a,e+M[b]*a,n+w[b]*a,s+T[b]*a,r+M[b]*a,o+w[b]*a,s+T[E]*a,r+M[E]*a,o+w[E]*a,l,c)}}get empty(){return this.ind.length===0}}function Lt(i,t,e,n,s,r,o,a,l,c,h,u=0){i.quad(t+s,n(s,r)+l,e+r,t+s,n(s,a)+l,e+a,t+o,n(o,a)+l,e+a,t+o,n(o,r)+l,e+r,c,h,u)}class Cx{constructor(t,e){L(this,"scene");L(this,"grid");L(this,"meshes");L(this,"material");L(this,"uNight",{value:0});this.scene=t,this.grid=e,this.meshes=new Array(Ve*Xn).fill(null),this.material=new qa({vertexColors:!0});const n=this.uNight;this.material.onBeforeCompile=s=>{s.uniforms.uNight=n,s.vertexShader=`attribute float aEmissive;
varying float vEmissive;
`+s.vertexShader.replace("#include <color_vertex>",`#include <color_vertex>
	vEmissive = aEmissive;`),s.fragmentShader=`varying float vEmissive;
uniform float uNight;
`+s.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
	totalEmissiveRadiance += vec3(1.0, 0.72, 0.38) * vEmissive * uNight;`)},this.material.customProgramCacheKey=()=>"sethcity-roads"}rebuildAll(){for(let t=0;t<Xn;t++)for(let e=0;e<Ve;e++)this.buildChunk(e,t)}rebuildChunk(t,e){this.buildChunk(t,e),this.chunkHasBridge(t,e)&&(t>0&&this.buildChunk(t-1,e),t<Ve-1&&this.buildChunk(t+1,e),e>0&&this.buildChunk(t,e-1),e<Xn-1&&this.buildChunk(t,e+1))}update(t,e,n){this.uNight.value=n}dispose(){for(let t=0;t<this.meshes.length;t++)this.removeMesh(t);this.material.dispose()}chunkHasBridge(t,e){const n=this.grid,s=t*ie,r=e*ie;for(let o=r;o<r+ie;o++)for(let a=s;a<s+ie;a++){const l=dt(a,o);if(n.water[l]&&(n.road[l]||n.rail[l]))return!0}return!1}removeMesh(t){const e=this.meshes[t];e&&(this.scene.remove(e),e.geometry.dispose(),this.meshes[t]=null)}buildChunk(t,e){const n=e*Ve+t;this.removeMesh(n);const s=this.grid,r=new Ax,o=t*ie,a=e*ie;for(let h=a;h<a+ie;h++)for(let u=o;u<o+ie;u++){const d=dt(u,h);s.road[d]?this.roadTile(r,u,h):s.rail[d]&&this.railTile(r,u,h),s.wire[d]&&this.wireTile(r,u,h)}if(r.empty)return;const l=new ln;l.setAttribute("position",new Le(r.pos,3)),l.setAttribute("normal",new Le(r.nor,3)),l.setAttribute("color",new Le(r.col,3)),l.setAttribute("aEmissive",new Le(r.emi,1)),l.setIndex(r.pos.length/3>65535?new mh(r.ind,1):new ph(r.ind,1)),l.computeBoundingSphere();const c=new Oe(l,this.material);c.castShadow=!0,c.receiveShadow=!0,c.matrixAutoUpdate=!1,this.scene.add(c),this.meshes[n]=c}makeSurf(t,e,n){qf(this.grid,t,e,n);const s=Wn[0],r=Wn[1],o=Wn[2],a=Wn[3],l=Wn[4];return(c,h)=>Yf(s,r,o,a,l,c,h)}roadTile(t,e,n){const s=this.grid,r=dt(e,n);if(s.tunnel[r]){this.portals(t,e,n);return}const o=s.road[r],a=ka(s,e,n),l=this.makeSurf(e,n,!1),c=.93+bt(e,n,11)*.11;if(s.water[r]?this.bridge(t,e,n,l,a,!1,o,c):o===Ue.Highway?this.highway(t,e,n,l,a,c):this.streetAvenue(t,e,n,l,a,o,c),s.rail[r]){const h=yd(s,e,n);for(let u=0;u<4;u++)h&1<<u&&this.railPair(t,e,n,l,u,Rt+.012,0,.52)}}streetAvenue(t,e,n,s,r,o,a){const l=this.grid,c=o===Ue.Avenue,h=c?.07:.18,u=1-h,d=c?md:pd;let f=0;for(let p=0;p<4;p++)r&1<<p&&f++;Lt(t,e,n,s,h,h,u,u,Rt,d,a),r&1&&Lt(t,e,n,s,h,0,u,h,Rt,d,a),r&2&&Lt(t,e,n,s,u,h,1,u,Rt,d,a),r&4&&Lt(t,e,n,s,h,u,u,1,Rt,d,a),r&8&&Lt(t,e,n,s,0,h,h,u,Rt,d,a);const g=Rt+ao,v=.94+bt(e,n,13)*.1;Lt(t,e,n,s,0,0,h,h,g,qi,v),Lt(t,e,n,s,u,0,1,h,g,qi,v),Lt(t,e,n,s,u,u,1,1,g,qi,v),Lt(t,e,n,s,0,u,h,1,g,qi,v),r&1||Lt(t,e,n,s,h,0,u,h,g,qi,v),r&2||Lt(t,e,n,s,u,h,1,u,g,qi,v),r&4||Lt(t,e,n,s,h,u,u,1,g,qi,v),r&8||Lt(t,e,n,s,0,h,h,u,g,qi,v);const m=(p,y,_,x)=>{t.wall(e+p,n+y,e+_,n+x,s(p,y)+Rt,s(p,y)+g,s(_,x)+Rt,s(_,x)+g,yx,a)};if(r&1?(m(h,h,h,0),m(u,0,u,h)):m(h,h,u,h),r&2?(m(u,h,1,h),m(1,u,u,u)):m(u,h,u,u),r&4?(m(h,1,h,u),m(u,u,u,1)):m(u,u,h,u),r&8?(m(0,h,h,h),m(h,u,0,u)):m(h,u,h,h),this.rampFills(t,e,n,s,r,h,u,gd,a),f>=3)this.crosswalks(t,e,n,s,r,h,u);else if(!c){for(let p=0;p<4;p++)if(r&1<<p)for(let y=0;y<3;y++){const _=.05+y*.17,x=_+.09;p===0?Lt(t,e,n,s,.487,_,.513,x,Xe,oa,1):p===2?Lt(t,e,n,s,.487,1-x,.513,1-_,Xe,oa,1):p===3?Lt(t,e,n,s,_,.487,x,.513,Xe,oa,1):Lt(t,e,n,s,1-x,.487,1-_,.513,Xe,oa,1)}}if(c&&f<=2){for(let _=0;_<4;_++){if(!(r&1<<_))continue;const x=h+.028,T=h+.05,M=u-.05,w=u-.028;if(_===0||_===2){const E=_===0?0:.55,b=_===0?.45:1;Lt(t,e,n,s,x,E,T,b,Xe,dn,.9),Lt(t,e,n,s,M,E,w,b,Xe,dn,.9)}else{const E=_===3?0:.55,b=_===3?.45:1;Lt(t,e,n,s,E,x,b,T,Xe,dn,.9),Lt(t,e,n,s,E,M,b,w,Xe,dn,.9)}}const p=Rt+.07,y=(_,x,T,M)=>{Lt(t,e,n,s,_,x,T,M,p,jr,a),t.wall(e+_,n+x,e+_,n+M,s(_,x)+Rt,s(_,x)+p,s(_,M)+Rt,s(_,M)+p,jr,a*.85),t.wall(e+T,n+M,e+T,n+x,s(T,M)+Rt,s(T,M)+p,s(T,x)+Rt,s(T,x)+p,jr,a*.85),t.wall(e+T,n+x,e+_,n+x,s(T,x)+Rt,s(T,x)+p,s(_,x)+Rt,s(_,x)+p,jr,a*.85),t.wall(e+_,n+M,e+T,n+M,s(_,M)+Rt,s(_,M)+p,s(T,M)+Rt,s(T,M)+p,jr,a*.85)};y(.45,.45,.55,.55),r&1&&y(.45,0,.55,.45),r&2&&y(.55,.45,1,.55),r&4&&y(.45,.55,.55,1),r&8&&y(0,.45,.45,.55)}for(const p of $f(l,e,n))Lt(t,e,n,s,p.poolU-.14,p.poolV-.14,p.poolU+.14,p.poolV+.14,Xe*.6,d,a,.85)}crosswalks(t,e,n,s,r,o,a){for(let h=0;h<4;h++){if(!(r&1<<h))continue;const u=o+.03,d=a-.03;for(let f=u;f+.05<=d+1e-4;f+=.05+.048)h===0?Lt(t,e,n,s,f,.045,f+.05,.145,Xe,dn,.95):h===2?Lt(t,e,n,s,f,.855,f+.05,.955,Xe,dn,.95):h===3?Lt(t,e,n,s,.045,f,.145,f+.05,Xe,dn,.95):Lt(t,e,n,s,.855,f,.955,f+.05,Xe,dn,.95)}}rampFills(t,e,n,s,r,o,a,l,c){const u=this.grid.height[dt(e,n)],d=u-.04,f=(g,v)=>s(g,v)-u>.05;r&1&&(f(o,0)||f(a,0))&&(t.wall(e+o,n,e+o,n+o,d,s(o,0)+Rt,d,s(o,o)+Rt,l,c),t.wall(e+a,n+o,e+a,n,d,s(a,o)+Rt,d,s(a,0)+Rt,l,c)),r&4&&(f(o,1)||f(a,1))&&(t.wall(e+o,n+a,e+o,n+1,d,s(o,a)+Rt,d,s(o,1)+Rt,l,c),t.wall(e+a,n+1,e+a,n+a,d,s(a,1)+Rt,d,s(a,a)+Rt,l,c)),r&2&&(f(1,o)||f(1,a))&&(t.wall(e+1,n+o,e+a,n+o,d,s(1,o)+Rt,d,s(a,o)+Rt,l,c),t.wall(e+a,n+a,e+1,n+a,d,s(a,a)+Rt,d,s(1,a)+Rt,l,c)),r&8&&(f(0,o)||f(0,a))&&(t.wall(e+o,n+o,e,n+o,d,s(o,o)+Rt,d,s(0,o)+Rt,l,c),t.wall(e,n+a,e+o,n+a,d,s(0,a)+Rt,d,s(o,a)+Rt,l,c))}highway(t,e,n,s,r,o){const a=this.grid,l=.08,c=.92,h=a.height[dt(e,n)];Lt(t,e,n,s,l,l,c,c,Rt,Qs,o),r&1&&Lt(t,e,n,s,l,0,c,l,Rt,Qs,o),r&2&&Lt(t,e,n,s,c,l,1,c,Rt,Qs,o),r&4&&Lt(t,e,n,s,l,c,c,1,Rt,Qs,o),r&8&&Lt(t,e,n,s,0,l,l,c,Rt,Qs,o);const u=(p,y,_,x,T,M,w,E)=>{t.quad(e+T,h+.01,n+w,e+M,h+.01,n+E,e+_,s(_,x)+Rt*.5,n+x,e+p,s(p,y)+Rt*.5,n+y,Mx,o)};r&1||u(c,l,l,l,1,0,0,0),r&4||u(l,c,c,c,0,1,1,1),r&2||u(c,c,c,l,1,1,1,0),r&8||u(l,l,l,c,0,0,0,1);const d=(p,y,_,x)=>{const T=s(p,y)+Rt+.05,M=s(_,x)+Rt+.05;t.bar(e+p,T+.06,n+y,e+_,M+.06,n+x,.022,wx,o)},f=r&8?0:l,g=r&2?1:c,v=r&1?0:l,m=r&4?1:c;r&1||d(f,l,g,l),r&4||d(f,c,g,c),r&8||d(l,v,l,m),r&2||d(c,v,c,m);for(let p=0;p<4;p++)if(r&1<<p)for(const y of[-.17,.17])for(let _=0;_<3;_++){const x=.06+_*.17,T=x+.08,M=.5+y-.012,w=.5+y+.012;p===0?Lt(t,e,n,s,M,x,w,T,Xe,dn,.9):p===2?Lt(t,e,n,s,M,1-T,w,1-x,Xe,dn,.9):p===3?Lt(t,e,n,s,x,M,T,w,Xe,dn,.9):Lt(t,e,n,s,1-T,M,1-x,w,Xe,dn,.9)}}bridge(t,e,n,s,r,o,a,l){const c=this.grid,h=dt(e,n),u=o?.2:.14,d=1-u,f=o?vd:a===Ue.Highway?Qs:md;Lt(t,e,n,s,u,u,d,d,Rt,f,l),r&1&&Lt(t,e,n,s,u,0,d,u,Rt,f,l),r&2&&Lt(t,e,n,s,d,u,1,d,Rt,f,l),r&4&&Lt(t,e,n,s,u,d,d,1,Rt,f,l),r&8&&Lt(t,e,n,s,0,u,u,d,Rt,f,l);const g=r&8?0:u,v=r&2?1:d,m=r&1?0:u,p=r&4?1:d,y=(x,T,M,w)=>{const E=s(x,T)+Rt,b=s(M,w)+Rt;t.wall(e+x,n+T,e+M,n+w,E-.16,E-.01,b-.16,b-.01,vd,l),t.bar(e+x,E+.09,n+T,e+M,b+.09,n+w,.02,_d,l),t.bar(e+x,E+.045,n+T,e+M,b+.045,n+w,.012,_d,l*.9)};if(r&1||y(v,u,g,u),r&4||y(g,d,v,d),r&8||y(u,m,u,p),r&2||y(d,p,d,m),o)for(let x=0;x<4;x++)r&1<<x&&this.railPair(t,e,n,s,x,Rt+.01,0,.52);else for(let x=0;x<4;x++)if(r&1<<x)for(let T=0;T<3;T++){const M=.06+T*.17,w=M+.08;x===0?Lt(t,e,n,s,.488,M,.512,w,Xe,dn,.9):x===2?Lt(t,e,n,s,.488,1-w,.512,1-M,Xe,dn,.9):x===3?Lt(t,e,n,s,M,.488,w,.512,Xe,dn,.9):Lt(t,e,n,s,1-w,.488,1-M,.512,Xe,dn,.9)}const _=Lh(c,e,n,o);if(_.neg%2===0){const x=s(.5,.5)+Rt,T=Math.min(c.height[h],Ji-.2)-.1,M=_.axis===0?0:.27,w=_.axis===0?.27:0;t.bar(e+.5-M,T,n+.5-w,e+.5-M,x-.1,n+.5-w,.07,Gl,l),t.bar(e+.5+M,T,n+.5+w,e+.5+M,x-.1,n+.5+w,.07,Gl,l),t.bar(e+.5-M*1.2,x-.14,n+.5-w*1.2,e+.5+M*1.2,x-.14,n+.5+w*1.2,.045,Gl,l*.95)}}railPair(t,e,n,s,r,o,a,l){for(const u of[-.14,.14]){const d=.5+u-.016,f=.5+u+.016;let g,v,m,p;r===0?(g=d,m=f,v=a,p=l):r===2?(g=d,m=f,v=1-l,p=1-a):r===3?(g=a,m=l,v=d,p=f):(g=1-l,m=1-a,v=d,p=f),Lt(t,e,n,s,g,v,m,p,o+.052,Vl,1),t.wall(e+g,n+v,e+g,n+p,s(g,v)+o,s(g,v)+o+.052,s(g,p)+o,s(g,p)+o+.052,Vl,.7),t.wall(e+m,n+p,e+m,n+v,s(m,p)+o,s(m,p)+o+.052,s(m,v)+o,s(m,v)+o+.052,Vl,.7)}}railTile(t,e,n){const s=this.grid,r=dt(e,n),o=yd(s,e,n),a=this.makeSurf(e,n,!0),l=.93+bt(e,n,17)*.11;if(s.water[r]){this.bridge(t,e,n,a,o,!0,0,l);return}const c=.22,h=.78,u=Rt+.045;Lt(t,e,n,a,c,c,h,h,u,Zr,l),o&1&&Lt(t,e,n,a,c,0,h,c,u,Zr,l),o&2&&Lt(t,e,n,a,h,c,1,h,u,Zr,l),o&4&&Lt(t,e,n,a,c,h,h,1,u,Zr,l),o&8&&Lt(t,e,n,a,0,c,c,h,u,Zr,l);const d=(g,v,m,p)=>{t.wall(e+g,n+v,e+m,n+p,a(g,v)+.004,a(g,v)+u,a(m,p)+.004,a(m,p)+u,bx,l)};o&1?(d(c,0,c,c),d(h,c,h,0)):d(h,c,c,c),o&2?(d(1,c,h,c),d(h,h,1,h)):d(h,h,h,c),o&4?(d(c,h,c,1),d(h,1,h,h)):d(c,h,h,h),o&8?(d(c,c,0,c),d(0,h,c,h)):d(c,c,c,h),this.rampFills(t,e,n,a,o,c,h,gd,l);let f=0;for(let g=0;g<4;g++)o&1<<g&&f++;for(let g=0;g<4;g++)if(o&1<<g){for(let v=.07;v<.5;v+=.16){const m=v-.032,p=v+.032;g===0?Lt(t,e,n,a,.28,m,.72,p,u+.008,Kr,l):g===2?Lt(t,e,n,a,.28,1-p,.72,1-m,u+.008,Kr,l):g===3?Lt(t,e,n,a,m,.28,p,.72,u+.008,Kr,l):Lt(t,e,n,a,1-p,.28,1-m,.72,u+.008,Kr,l)}this.railPair(t,e,n,a,g,u,0,.53)}if(f===1){const g=o&1?2:o&2?3:o&4?0:1,v=a(.5,.5)+u,m=e+.5+Ss[g]*.18,p=n+.5+Es[g]*.18,y=Ss[g]===0?.18:0,_=Es[g]===0?.18:0;t.bar(m-y,v+.1,p-_,m+y,v+.1,p+_,.035,Kr,1)}}portals(t,e,n){const s=this.grid;for(let r=0;r<4;r++){const o=e+Ss[r],a=n+Es[r];if(!ti(s,o,a)||s.tunnel[dt(o,a)]||s.water[dt(o,a)])continue;const l=Ki(s,o,a,!1)+Rt,c=.95+bt(e,n,23+r)*.08,h=.04;let u,d,f,g;r===0?(u=e+1,d=n+h,f=e,g=n+h):r===2?(u=e,d=n+1-h,f=e+1,g=n+1-h):r===1?(u=e+1-h,d=n,f=e+1-h,g=n+1):(u=e+h,d=n+1,f=e+h,g=n);const v=f-u,m=g-d,p=(b,S,D,k,U,z)=>{t.wall(u+v*b,d+m*b,u+v*S,d+m*S,D,k,D,k,U,z)};p(0,.22,l-.05,l+.95,Wl,c),p(.78,1,l-.05,l+.95,Wl,c),p(.22,.78,l+.68,l+.95,Wl,c);const y=-Ss[r]*.1,_=-Es[r]*.1;t.wall(u+v*.22+y,d+m*.22+_,u+v*.78+y,d+m*.78+_,l-.02,l+.68,l-.02,l+.68,Sx,1),t.bar(u,l+.98,d,f,l+.98,g,.045,Xl,c);const x=.5,T=u+v*x+y*.5,M=d+m*x+_*.5;t.quad(T-v*.28-y,l+.002,M-m*.28-_,T-v*.28+y,l+.002,M-m*.28+_,T+v*.28+y,l+.002,M+m*.28+_,T+v*.28-y,l+.002,M+m*.28-_,pd,c);const w=s.height[dt(e,n)],E=(b,S)=>{const D=u+v*b,k=d+m*b,U=D-y*3+v*.06*S,z=k-_*3+m*.06*S;t.wall(D,k,U,z,l-.05,l+.85,l-.05,Math.max(l+.35,w*.4+l*.6),Xl,c*.95),t.wall(U,z,D,k,l-.05,Math.max(l+.35,w*.4+l*.6),l-.05,l+.85,Xl,c*.95)};E(.02,1),E(.98,-1)}}pylonAttach(t,e){const n=this.grid,s=dt(t,e),r=n.water[s]===1,o=r?Ji-.45:n.height[s],a=r?3.35:2.45;return{base:o,top:o+a,arm:o+a*.84}}wireTile(t,e,n){const s=this.grid,r=this.pylonAttach(e,n),o=e+.5,a=n+.5,l=.92+bt(e,n,41)*.12,c=aa(s,e+1,n),h=aa(s,e-1,n),u=aa(s,e,n-1),d=aa(s,e,n+1),f=c||h,g=u||d,v=.021;for(const y of[-1,1])for(const _ of[-1,1])t.bar(o+y*.17,r.base,a+_*.17,o+y*.05,r.arm,a+_*.05,v,ii,l);const m=r.base+(r.arm-r.base)*.45,p=.115;for(const[y,_,x,T]of[[-1,-1,1,-1],[1,-1,1,1],[1,1,-1,1],[-1,1,-1,-1]])t.bar(o+y*.16,r.base+.12,a+_*.16,o+x*p,m,a+T*p,.012,ii,l*.9),t.bar(o+x*.16,r.base+.12,a+T*.16,o+y*p,m,a+_*p,.012,ii,l*.9);t.bar(o-p,m,a-p,o+p,m,a-p,.012,ii,l),t.bar(o+p,m,a-p,o+p,m,a+p,.012,ii,l),t.bar(o+p,m,a+p,o-p,m,a+p,.012,ii,l),t.bar(o-p,m,a+p,o-p,m,a-p,.012,ii,l),(f||!g)&&t.bar(o,r.arm,a-.33,o,r.arm,a+.33,.026,ii,l),g&&t.bar(o-.33,r.arm,a,o+.33,r.arm,a,.026,ii,l),t.bar(o,r.arm,a,o,r.top+.16,a,.018,ii,l),c&&this.span(t,e,n,e+1,n,0),d&&this.span(t,e,n,e,n+1,1)}span(t,e,n,s,r,o){const a=this.pylonAttach(e,n),l=this.pylonAttach(s,r),c=e+.5,h=n+.5,u=s+.5,d=r+.5,f=o===0?0:.3,g=o===0?.3:0,v=6,m=.2;for(const p of[-1,1]){let y=c+f*p,_=h+g*p,x=a.arm+.03;for(let T=1;T<=v;T++){const M=T/v,w=Ut(c+f*p,u+f*p,M),E=Ut(h+g*p,d+g*p,M),b=Ut(a.arm+.03,l.arm+.03,M)-m*4*M*(1-M),S=.011;t.quad(y,x-S,_,w,b-S,E,w,b+S,E,y,x+S,_,xd,1),t.quad(w,b-S,E,y,x-S,_,y,x+S,_,w,b+S,E,xd,1),y=w,_=E,x=b}}}}const Md=new Map,la=new at;function G(i){let t=Md.get(i);return t||(la.setHex(i),t=[la.r,la.g,la.b],Md.set(i,t)),t}function A(i,t=1){const e=G(i);return[e[0]*t,e[1]*t,e[2]*t]}const Un=2240832,Re=12104358,Se=10196876,Ps=3816770,Ii=4867136,De=15921386,je=10134184,Rx=10246721,$c=5012026,Sr=7316296,Er=7033142,Px=5081660,Oa=4169673,Ba=15262418,Lx=5324847,wd=[3530976,16736162,16763196,8257386,10120191,16747325],mn=.85,Nn=.45,Ui=1.9,gn=1.55,mo=2.85,Ls=2.5;let qe=[];class Dx{constructor(){L(this,"pos",new Float32Array(3*8192));L(this,"nor",new Float32Array(3*8192));L(this,"col",new Float32Array(3*8192));L(this,"emi",new Float32Array(8192));L(this,"ind",new Uint32Array(12288));L(this,"v",0);L(this,"ic",0);L(this,"ox",0);L(this,"oy",0);L(this,"oz",0);L(this,"fw",1);L(this,"fh",1);L(this,"rot",0);L(this,"collect",!0)}reset(){this.v=0,this.ic=0}setFrame(t,e,n,s,r,o){this.ox=t,this.oy=e,this.oz=n,this.fw=s,this.fh=r,this.rot=o&3}ensure(t,e){const n=(this.v+t)*3;if(n>this.pos.length){const s=Math.max(n,this.pos.length*2),r=new Float32Array(s);r.set(this.pos),this.pos=r;const o=new Float32Array(s);o.set(this.nor),this.nor=o;const a=new Float32Array(s);a.set(this.col),this.col=a;const l=new Float32Array(s/3);l.set(this.emi),this.emi=l}if(this.ic+e>this.ind.length){const s=Math.max(this.ic+e,this.ind.length*2),r=new Uint32Array(s);r.set(this.ind),this.ind=r}}toWorld(t,e,n){const s=this.fw*.5,r=this.fh*.5,o=t-s,a=n-r;let l,c;switch(this.rot){case 1:l=-a,c=o;break;case 2:l=-o,c=-a;break;case 3:l=a,c=-o;break;default:l=o,c=a}return[this.ox+s+l,this.oy+e,this.oz+r+c]}worldYaw(t){return t+this.rot*(Math.PI/2)}vert(t,e,n,s,r,o,a,l){const c=this.fw*.5,h=this.fh*.5,u=t-c,d=n-h;let f,g,v,m;switch(this.rot){case 1:f=-d,g=u,v=-o,m=s;break;case 2:f=-u,g=-d,v=-s,m=-o;break;case 3:f=d,g=-u,v=o,m=-s;break;default:f=u,g=d,v=s,m=o}const p=this.v*3;return this.pos[p]=this.ox+c+f,this.pos[p+1]=this.oy+e,this.pos[p+2]=this.oz+h+g,this.nor[p]=v,this.nor[p+1]=r,this.nor[p+2]=m,this.col[p]=a[0],this.col[p+1]=a[1],this.col[p+2]=a[2],this.emi[this.v]=l,this.v++}quad(t,e,n,s,r,o,a,l,c,h,u,d,f,g=0){const v=s-t,m=r-e,p=o-n,y=h-t,_=u-e,x=d-n;let T=m*x-p*_,M=p*y-v*x,w=v*_-m*y;const E=Math.hypot(T,M,w);if(E<1e-9)return;T/=E,M/=E,w/=E,this.ensure(4,6);const b=this.vert(t,e,n,T,M,w,f,g),S=this.vert(s,r,o,T,M,w,f,g),D=this.vert(a,l,c,T,M,w,f,g),k=this.vert(h,u,d,T,M,w,f,g),U=this.ic;this.ind[U]=b,this.ind[U+1]=S,this.ind[U+2]=D,this.ind[U+3]=b,this.ind[U+4]=D,this.ind[U+5]=k,this.ic+=6}tri(t,e,n,s,r,o,a,l,c,h,u=0){const d=s-t,f=r-e,g=o-n,v=a-t,m=l-e,p=c-n;let y=f*p-g*m,_=g*v-d*p,x=d*m-f*v;const T=Math.hypot(y,_,x);if(T<1e-9)return;y/=T,_/=T,x/=T,this.ensure(3,3);const M=this.vert(t,e,n,y,_,x,h,u),w=this.vert(s,r,o,y,_,x,h,u),E=this.vert(a,l,c,y,_,x,h,u);this.ind[this.ic]=M,this.ind[this.ic+1]=w,this.ind[this.ic+2]=E,this.ic+=3}box(t,e,n,s,r,o,a,l,c=0,h=!1){this.quad(s,e,o,s,e,n,s,r,n,s,r,o,a,c),this.quad(t,e,n,t,e,o,t,r,o,t,r,n,a,c),this.quad(t,e,o,s,e,o,s,r,o,t,r,o,a,c),this.quad(s,e,n,t,e,n,t,r,n,s,r,n,a,c),this.quad(t,r,o,s,r,o,s,r,n,t,r,n,l,c),h&&this.quad(t,e,n,s,e,n,s,e,o,t,e,o,l,c)}boxR(t,e,n,s,r,o,a,l,c,h=0){const u=Math.cos(a),d=Math.sin(a),f=n*.5,g=s*.5,v=[],m=[],p=[-f,f,f,-f],y=[-g,-g,g,g];for(let _=0;_<4;_++)v.push(t+p[_]*u-y[_]*d),m.push(e+p[_]*d+y[_]*u);for(let _=0;_<4;_++){const x=_+1&3;this.quad(v[x],r,m[x],v[_],r,m[_],v[_],o,m[_],v[x],o,m[x],l,h)}this.quad(v[3],o,m[3],v[2],o,m[2],v[1],o,m[1],v[0],o,m[0],c,h)}flat(t,e,n,s,r,o,a=0){this.quad(t,r,s,n,r,s,n,r,e,t,r,e,o,a)}disc(t,e,n,s,r,o,a=0){for(let l=0;l<r;l++){const c=l/r*Math.PI*2,h=(l+1)/r*Math.PI*2;this.tri(t,n,e,t+Math.cos(h)*s,n,e+Math.sin(h)*s,t+Math.cos(c)*s,n,e+Math.sin(c)*s,o,a)}}cyl(t,e,n,s,r,o,a,l,c=null,h=0){for(let u=0;u<a;u++){const d=u/a*Math.PI*2,f=(u+1)/a*Math.PI*2,g=Math.cos(d),v=Math.sin(d),m=Math.cos(f),p=Math.sin(f);o>1e-4?this.quad(t+m*r,n,e+p*r,t+g*r,n,e+v*r,t+g*o,s,e+v*o,t+m*o,s,e+p*o,l,h):this.tri(t+m*r,n,e+p*r,t+g*r,n,e+v*r,t,s,e,l,h)}if(c&&o>1e-4)for(let u=0;u<a;u++){const d=u/a*Math.PI*2,f=(u+1)/a*Math.PI*2;this.tri(t,s,e,t+Math.cos(f)*o,s,e+Math.sin(f)*o,t+Math.cos(d)*o,s,e+Math.sin(d)*o,c,h)}}dome(t,e,n,s,r,o,a,l=1,c=0){for(let h=0;h<o;h++){const u=h/o*Math.PI*.5,d=(h+1)/o*Math.PI*.5,f=s*Math.cos(u),g=s*Math.cos(d),v=n+s*Math.sin(u)*l,m=n+s*Math.sin(d)*l;for(let p=0;p<r;p++){const y=p/r*Math.PI*2,_=(p+1)/r*Math.PI*2,x=Math.cos(y),T=Math.sin(y),M=Math.cos(_),w=Math.sin(_);h===o-1?this.tri(t+M*f,v,e+w*f,t+x*f,v,e+T*f,t,m,e,a,c):this.quad(t+M*f,v,e+w*f,t+x*f,v,e+T*f,t+x*g,m,e+T*g,t+M*g,m,e+w*g,a,c)}}}gable(t,e,n,s,r,o,a,l,c){const h=r+o;if(a){const u=(e+s)*.5;this.quad(n,r,e,t,r,e,t,h,u,n,h,u,l),this.quad(t,r,s,n,r,s,n,h,u,t,h,u,l),this.tri(t,r,e,t,r,s,t,h,u,c),this.tri(n,r,s,n,r,e,n,h,u,c)}else{const u=(t+n)*.5;this.quad(t,r,e,t,r,s,u,h,s,u,h,e,l),this.quad(n,r,s,n,r,e,u,h,e,u,h,s,l),this.tri(n,r,e,t,r,e,u,h,e,c),this.tri(t,r,s,n,r,s,u,h,s,c)}}hip(t,e,n,s,r,o,a,l){const c=r+o,h=n-t,u=s-e;if(h>=u){const d=l??u*.5,f=(e+s)*.5,g=t+d,v=n-d;this.quad(n,r,e,t,r,e,g,c,f,v,c,f,a),this.quad(t,r,s,n,r,s,v,c,f,g,c,f,a),this.tri(t,r,e,t,r,s,g,c,f,a),this.tri(n,r,s,n,r,e,v,c,f,a)}else{const d=l??h*.5,f=(t+n)*.5,g=e+d,v=s-d;this.quad(t,r,e,t,r,s,f,c,v,f,c,g,a),this.quad(n,r,s,n,r,e,f,c,g,f,c,v,a),this.tri(n,r,e,t,r,e,f,c,g,a),this.tri(t,r,s,n,r,s,f,c,v,a)}}pyramid(t,e,n,s,r,o,a){this.hip(t-n*.5,e-s*.5,t+n*.5,e+s*.5,r,o,a,Math.min(n,s)*.5)}bar(t,e,n,s,r,o,a,l,c,h=0){let u=s-t,d=r-e,f=o-n;const g=Math.hypot(u,d,f);if(g<1e-9)return;u/=g,d/=g,f/=g;let v,m,p;Math.abs(d)<.92?(v=0,m=1,p=0):(v=1,m=0,p=0);let y=d*p-f*m,_=f*v-u*p,x=u*m-d*v;const T=Math.hypot(y,_,x);y/=T,_/=T,x/=T;const M=d*x-f*_,w=f*y-u*x,E=u*_-d*y,b=[],S=[],D=[1,-1,-1,1],k=[1,1,-1,-1];for(let U=0;U<4;U++){const z=y*a*D[U]+M*l*k[U],W=_*a*D[U]+w*l*k[U],$=x*a*D[U]+E*l*k[U];b.push([t+z,e+W,n+$]),S.push([s+z,r+W,o+$])}for(let U=0;U<4;U++){const z=U+1&3;this.quad(b[z][0],b[z][1],b[z][2],b[U][0],b[U][1],b[U][2],S[U][0],S[U][1],S[U][2],S[z][0],S[z][1],S[z][2],c,h)}this.quad(S[0][0],S[0][1],S[0][2],S[1][0],S[1][1],S[1][2],S[2][0],S[2][1],S[2][2],S[3][0],S[3][1],S[3][2],c,h),this.quad(b[3][0],b[3][1],b[3][2],b[2][0],b[2][1],b[2][2],b[1][0],b[1][1],b[1][2],b[0][0],b[0][1],b[0][2],c,h)}wallQuad(t,e,n,s,r,o,a,l,c=0){switch(t&3){case 0:{const h=o-a;this.quad(s,n,h,e,n,h,e,r,h,s,r,h,l,c);return}case 1:{const h=o+a;this.quad(h,n,s,h,n,e,h,r,e,h,r,s,l,c);return}case 2:{const h=o+a;this.quad(e,n,h,s,n,h,s,r,h,e,r,h,l,c);return}default:{const h=o-a;this.quad(h,n,e,h,n,s,h,r,s,h,r,e,l,c);return}}}}function pe(i,t,e){const n=i.def.palette;return n&&n.length>t?n[t]:e}function As(i,t,e,n,s){return bt(i.seedI+t*7,e*13+n*131,977)<s}function ns(i){return .42+i.level*.06}function be(i,t,e,n,s,r,o,a,l,c,h,u=mn){if(l<1||c<1)return;const d=(s-n)/c,f=(a-o)/l,g=d*.52,v=f*.55,m=G(Un);for(let p=0;p<l;p++){const y=o+(p+.5)*f;for(let _=0;_<c;_++){const x=n+(_+.5)*d,T=As(t,p,_,e,h);i.wallQuad(e,x-g/2,y-v/2,x+g/2,y+v/2,r,.016,m,T?u:0)}}}function ca(i,t,e,n,s,r,o,a,l,c,h=2,u=mn){if(l<1)return;const d=(a-o)/l,f=d*.52,g=G(Un),v=(s-n)/h;for(let m=0;m<l;m++){const p=o+(m+.5)*d;for(let y=0;y<h;y++){const _=n+y*v+v*.08,x=n+(y+1)*v-v*.08,T=As(t,m,y,e,c);i.wallQuad(e,_,p-f/2,x,p+f/2,r,.016,g,T?u:0)}}}function Cs(i,t,e,n,s,r,o,a,l,c,h=2,u=mn){ca(i,t,0,e+.06,s-.06,n,o,a,l,c,h,u),ca(i,t,2,e+.06,s-.06,r,o,a,l,c,h,u),ca(i,t,1,n+.06,r-.06,s,o,a,l,c,h,u),ca(i,t,3,n+.06,r-.06,e,o,a,l,c,h,u)}function gi(i,t,e,n,s,r=.14,o=.24,a=Lx){i.wallQuad(t,e-r/2,s,e+r/2,s+o,n,.014,G(a))}function di(i,t,e,n,s,r,o,a=.045,l=.08){i.box(t,r,e,n,r+l,e+a,o,o),i.box(t,r,s-a,n,r+l,s,o,o),i.box(t,r,e+a,t+a,r+l,s-a,o,o),i.box(n-a,r,e+a,n,r+l,s-a,o,o)}function Mo(i,t,e,n,s,r,o,a){const l=G(je),c=A(je,.7);for(let h=0;h<a;h++){const u=Ut(e,s-.16,t.r()),d=Ut(n,r-.14,t.r());i.box(u,o,d,u+.13+t.r()*.08,o+.08+t.r()*.07,d+.12,c,l)}}function jf(i,t,e,n,s,r=.09,o=Rx){const a=G(o);i.box(t-r/2,n,e-r/2,t+r/2,n+s,e+r/2,a,A(o,.75)),i.box(t-r*.68,n+s,e-r*.68,t+r*.68,n+s+.03,e+r*.68,A(o,.6),A(2763306,1))}function Ur(i,t,e,n,s,r){i.bar(e,s,n,e,s+r,n,.014,.014,G(14211288));const o=G([4053977,14965327,15909198][(t.seedI+t.level)%3]);i.quad(e,s+r-.02,n,e+.22,s+r-.05,n,e+.22,s+r-.13,n,e,s+r-.16,n,o),i.quad(e,s+r-.16,n,e+.22,s+r-.13,n,e+.22,s+r-.05,n,e,s+r-.02,n,o)}function Oi(i,t,e,n,s,r){const o=.03*s;i.bar(t,n,e,t,n+.16*s,e,o,o,G(Er));const a=A(Px,.85+bt(r,3,11)*.4),l=(.11+bt(r,5,13)*.05)*s;i.dome(t,e,n+.12*s,l,5,2,a,1.5)}function Rs(i,t,e,n,s,r,o=.1){i.box(t,r,e,n,r+o,s,A($c,.85),G($c))}function za(i,t,e,n,s){const r=A(Er,1.2);s?i.box(t-.08,n+.03,e-.025,t+.08,n+.05,e+.025,r,r):i.box(t-.025,n+.03,e-.08,t+.025,n+.05,e+.08,r,r)}function go(i,t,e,n,s=.34){i.bar(t,n,e,t,n+s,e,.012,.012,A(4474956,1));const r=G(16773833);i.box(t-.03,n+s,e-.03,t+.03,n+s+.045,e+.03,r,r,gn)}function Cn(i,t,e,n,s,r,o,a,l=-1,c=0,h=0){const d=(f,g,v)=>{if(!(v-g<.02))switch(f){case 0:i.box(g,r,e-.018,v,r+o,e+.018,a,a);return;case 1:i.box(n-.018,r,g,n+.018,r+o,v,a,a);return;case 2:i.box(g,r,s-.018,v,r+o,s+.018,a,a);return;default:i.box(t-.018,r,g,t+.018,r+o,v,a,a);return}};for(let f=0;f<4;f++){const g=f===0||f===2?t:e,v=f===0||f===2?n:s;f===l?(d(f,g,Math.max(g,c)),d(f,Math.min(v,h),v)):d(f,g,v)}}function hi(i,t,e,n,s,r,o,a=9){i.cyl(t,e,n,n+r,s,s,a,G(o),A(o,.82)),i.cyl(t,e,n+r,n+r+s*.3,s,s*.35,a,A(o,.9),A(o,.8))}function Tr(i,t,e,n,s,r){const o=[12737354,4882370,12756042,5939306,9080726];for(let a=0;a<r;a++){const l=e+(t.r()-.5)*.5,c=n+(t.r()-.5)*.5,h=.1+t.r()*.06,u=o[t.r()*o.length|0];i.box(l,s,c,l+h*1.7,s+h+(t.r()<.4?h:0),c+h,A(u,.9),G(u))}}function Ar(i,t,e,n,s,r,o){i.cyl(t,e,n,n+s,r,r,6,o,null)}function pr(i,t=0){return G(wd[bt(i.seedI,71+t,5)*wd.length|0])}function Ix(i,t){const e=t.w>1,n=t.w,s=t.h,r=t.r,o=pe(t,0,14207924),a=pe(t,1,9132604),l=pe(t,2,7294519),c=A(o,.94+r()*.12),h=A(a,.9+r()*.2),u=e||t.level>=3&&r()<.55?2:1,d=e?.42:.34,f=u*d;i.flat(.02,.02,n-.02,s-.02,.012,A(Sr,.9+r()*.2));const g=e?n*.62:.5+r()*.1,v=e?s*.5:.42+r()*.08,m=e?(n-g)/2:.1+r()*(n-g-.28),p=e?.28:.16+r()*.08;i.box(m,0,p,m+g,f,p+v,c,c);const y=!e&&r()<.4;let _=null;if(y){const S=v*.7,D=m+g-.06;D+.24<n-.06&&(i.box(D,0,p+.05,D+.24,d,p+.05+S,c,c),_=[D,p+.05,D+.24,p+.05+S])}const x=e||r()<.45,T=.035;x?i.hip(m-T,p-T,m+g+T,p+v+T,f,e?.34:.22+r()*.08,h,Math.min(g,v)*.36):i.gable(m-T,p-T,m+g+T,p+v+T,f,.2+r()*.1,r()<.5,h,c),_&&i.gable(_[0]-.02,_[1]-.02,_[2]+.02,_[3]+.02,d,.13,!1,h,c),jf(i,m+g*(.22+r()*.5),p+v*.5,f+.1,.16+r()*.08,e?.09:.07);const M=ns(t);if(be(i,t,0,m+.05,m+g-.05,p,.05,f-.04,u,e?4:2,M),be(i,t,1,p+.04,p+v-.04,m+g,.05,f-.04,u,2,M*.8),be(i,t,3,p+.04,p+v-.04,m,.05,f-.04,u,2,M*.8),gi(i,0,m+g*(e?.5:.3),p,0,e?.16:.12,e?.3:.24),e||r()<.6){const b=m+g*(e?.3:.14),S=m+g*(e?.7:.5),D=.1;i.flat(b,p-D,S,p,.035,A(l,1.1));const k=A(De,.95);i.bar(b+.02,.03,p-D+.02,b+.02,d*.8,p-D+.02,.013,.013,k),i.bar(S-.02,.03,p-D+.02,S-.02,d*.8,p-D+.02,.013,.013,k),i.quad(S+.02,d*.8,p-D-.01,b-.02,d*.8,p-D-.01,b-.02,d*.95,p+.02,S+.02,d*.95,p+.02,h),e&&(Ar(i,b+.05,p-D+.05,.03,d*1.6,.03,G(De)),Ar(i,S-.05,p-D+.05,.03,d*1.6,.03,G(De)))}const w=!e&&!y&&r()<.45,E=w?m+g+.02:m+g*.72;w&&E+.26<n-.02?(i.box(E,0,p+.02,E+.26,.26,p+.3,c,h),i.wallQuad(0,E+.03,.02,E+.23,.2,p+.02,.012,A(De,.85)),i.flat(E+.02,0,E+.24,p+.02,.02,G(Se))):i.flat(E-.07,0,E+.07,p,.02,G(Se)),Cn(i,.06,.06,n-.06,s-.06,.012,e?.09:.07,e?A(9080726,1):G(Ba),0,E-.09,E+.11),r()<.75&&Rs(i,m-.04,p+v+.05,m+g*.5,p+v+.13,.012,.07+r()*.05),r()<.85&&Oi(i,n-.18,s-.2,.012,.8+r()*.7,t.seedI+5),e&&(Oi(i,.2,s-.24,.012,1.1,t.seedI+9),Ur(i,t,m+g+.12,p+.1,.012,.7))}function Ux(i,t){const e=t.r,n=2+(e()*2|0),s=.09,r=.62+e()*.1,o=.14,a=pe(t,0,13942696);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Se));const l=ns(t);let c=s;const h=(t.w-s*2)/n;for(let u=0;u<n;u++){const d=t.ht*(.82+e()*.3)*.42,f=A(a,.8+e()*.35),g=c+h-.015;i.box(c,0,o,g,d,o+r,f,A(Ii,.9)),i.box(c-.012,d-.035,o-.02,g+.012,d,o+r+.01,A(a,.6),A(a,.62)),e()<.5&&i.box(c+h*.3,d,o+r*.4,c+h*.6,d+.07,o+r*.7,A(Ii,1.2),A(Ii,1.35));const v=Math.max(2,Math.round(d/.3));be(i,t,0,c+.04,g-h*.34,o,.3,d-.05,v-1,1,l),be(i,t,2,c+.04,g-.04,o+r,.3,d-.05,v-1,2,l*.7);const m=c+h*.76;gi(i,0,m,o,.06,.11,.2),i.box(m-.07,0,o-.09,m+.07,.03,o,G(Se),G(Se)),i.box(m-.07,.03,o-.05,m+.07,.06,o,G(Se),G(Se)),c+=h}Rs(i,.08,o+r+.06,t.w-.08,o+r+.13,.012,.07),e()<.6&&Oi(i,t.w*.5,t.h-.12,.012,.7,t.seedI+3)}function Nx(i,t){const e=t.r,n=t.ht,s=.08;i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Se));const r=pe(t,0,12629934),o=A(r,.92+e()*.14),a=A(pe(t,1,8219485),1),l=Math.min(.4,n*.18);i.box(s,0,s,t.w-s,l,t.h-s,o,A(r,.8));const c=s+.05,h=s+.07,u=t.w-s-.05,d=t.h-s-.05;i.box(c,l,h,u,n,d,o,A(Ii,1));const f=$t(Math.round(n/.42),3,14),g=ns(t);Cs(i,t,c,h,u,d,l+.05,n-.1,f,g,2);const v=A(r,.7),m=$t(f-1,2,8);for(let p=1;p<=m;p++){const y=l+(n-l-.15)*p/(m+1);if(As(t,p,99,7,.75)){const _=c+.08,x=c+.08+(u-c-.16)*.4;i.box(_,y,h-.06,x,y+.018,h+.01,v,v),i.box(_,y+.018,h-.062,x,y+.07,h-.045,a,a)}if(As(t,p,98,8,.75)){const _=u-.08-(u-c-.16)*.4,x=u-.08;i.box(_,y,h-.06,x,y+.018,h+.01,v,v),i.box(_,y+.018,h-.062,x,y+.07,h-.045,a,a)}}i.box(u-.16,l,d-.02,u-.02,n+.1,d+.06,A(r,.75),A(r,.7)),di(i,c,h,u,d,n,A(r,.72)),Mo(i,t,c+.06,h+.06,u-.2,d-.1,n,3),n>5&&hi(i,c+.14,h+.14,n,.07,.12,8225416,7),i.wallQuad(0,s+.05,.05,t.w-s-.3,l-.06,s,.016,G(16443320),Ls),gi(i,0,t.w-s-.18,s,0,.13,l*.7)}function Fx(i,t){const e=t.r,n=t.ht;i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Se));const s=pe(t,0,9413819),r=pe(t,1,5991037),o=A(s,.94+e()*.12),a=A(r,1),l=$t(n*.06,.35,.9),c=.06;i.box(c,0,c,t.w-c,l,t.h-c,o,A(s,.78)),i.wallQuad(0,c+.06,.08,t.w-c-.06,l-.08,c,.016,G(16771522),Ls),di(i,c,c,t.w-c,t.h-c,l,A(s,.7),.04,.05);const h=.19+e()*.04,u=l+(n-l)*(.66+e()*.12),d=h,f=h,g=t.w-h,v=t.h-h;i.box(d,l,f,g,u,v,o,A(s,.8));const m=h+.08;i.box(m,u,m,t.w-m,n,t.h-m,o,A(Ii,.95));for(const[M,w]of[[d,f],[g,f],[d,v],[g,v]])i.box(M-.022,l,w-.022,M+.022,u+.02,w+.022,a,a);const p=ns(t),y=$t(Math.round((u-l)/.55),4,14),_=$t(Math.round((n-u)/.55),2,8);Cs(i,t,d,f,g,v,l+.08,u-.08,y,p,2),Cs(i,t,m,m,t.w-m,t.h-m,u+.08,n-.1,_,p,2),di(i,m,m,t.w-m,t.h-m,n,a,.04,.07);const x=t.w/2,T=t.h/2;if(i.box(x-.1,n,T-.1,x+.1,n+.14,T+.1,a,a),i.bar(x,n+.14,T,x,n+.55+e()*.3,T,.016,.016,G(14211288)),i.collect&&n>18){const[M,w,E]=i.toWorld(x,n+.6+e()*.25,T);qe.push({kind:1,x:M,y:w,z:E,yaw:0,speed:1,phase:bt(t.seedI,17,3),scale:.2})}}function kx(i,t){const e=t.r,n=t.ht;i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Se));const s=pe(t,0,5210024),r=pe(t,1,2837091),o=e()<.4,a=o?3:2+(e()<.5?1:0),l=ns(t),c=t.w/2,h=t.h/2;let u=0,d=t.w/2-.07;const f=d*Math.pow(o?.68:.62,a-1),g=A(r,1);for(let p=0;p<a;p++){const y=p===a-1?1:.42+.24*p+e()*.08,_=p===a-1?n:n*y,x=A(s,(o?1:.9)+p*.06);i.box(c-d,u,h-d,c+d,_,h+d,x,A(r,.9));const T=$t(Math.round((_-u)/.62),2,16);Cs(i,t,c-d,h-d,c+d,h+d,u+.08,_-.08,T,l,d>.55?3:2);for(const[M,w]of[[c-d,h-d],[c+d,h-d],[c-d,h+d],[c+d,h+d]])i.box(M-.018,u,w-.018,M+.018,_,w+.018,g,g);di(i,c-d,h-d,c+d,h+d,_,g,.035,.05),u=_,p<a-1&&(d*=o?.68:.62)}i.wallQuad(0,.14,.06,t.w-.14,.5,h-t.w/2+.07,.03,G(14676735),Ls);const v=pr(t,1);i.wallQuad(0,c-f+.03,n-.22,c+f-.03,n-.1,h-f,.02,v,gn),i.wallQuad(2,c-f+.03,n-.22,c+f-.03,n-.1,h+f,.02,v,gn),i.wallQuad(1,h-f+.03,n-.22,h+f-.03,n-.1,c+f,.02,v,gn),i.wallQuad(3,h-f+.03,n-.22,h+f-.03,n-.1,c-f,.02,v,gn);const m=.6+e()*.9;if(i.cyl(c,h,n,n+m,.05,.005,5,G(13620440)),i.collect){const[p,y,_]=i.toWorld(c,n+m+.06,h);qe.push({kind:1,x:p,y,z:_,yaw:0,speed:1,phase:bt(t.seedI,19,3),scale:.24})}}function Ox(i,t){const e=t.r,n=pe(t,0,14731686),s=pe(t,1,11557450),r=A(n,.92+e()*.14);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Se));const o=t.level>=3?2:1,a=$t(t.ht*.75,.5,1.5)*(o===2?1:.72),l=.07,c=.1,h=t.w-.07,u=t.h-.14;i.box(l,0,c,h,a,u,r,A(Ii,1.05)),di(i,l,c,h,u,a,A(n,.68)),Mo(i,t,l+.05,c+.05,h-.2,u-.16,a,2),i.wallQuad(0,l+.05,.04,h-.05,a*(o===2?.4:.62),c,.018,G(16770746),mo),gi(i,0,(l+h)/2,c,0,.12,a*.4,3817285);const d=a*(o===2?.44:.68);if(i.wallQuad(0,l+.08,d,h-.08,d+.13,c,.022,pr(t),Ui),e()<.65){const g=(h-l-.1)/3;for(let v=0;v<3;v++){const m=l+.05+v*g,p=v%2===0?A(s,1):G(De);i.quad(m+g,d-.02,c-.001,m,d-.02,c-.001,m,d-.1,c-.12,m+g,d-.1,c-.12,p),i.quad(m,d-.02,c-.001,m+g,d-.02,c-.001,m+g,d-.1,c-.12,m,d-.1,c-.12,A(5592405,1))}}o===2&&be(i,t,0,l+.06,h-.06,c,a*.58,a-.06,1,3,ns(t)),be(i,t,2,l+.06,h-.06,u,a*.2,a-.08,o,2,ns(t)*.6),i.flat(l+.04,u+.02,h-.04,t.h-.03,.02,G(Ps)),Tr(i,t,t.w*.5,t.h-.09,.02,2)}function Bx(i,t){const e=t.r,n=pe(t,0,13154462),s=A(n,.95+e()*.1);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Se));const r=$t(t.ht*.42,.7,2.6),o=.06,a=.2,l=t.w-.06,c=t.h-.08;i.box(o,0,a,l,r,c,s,A(Ii,1.1)),di(i,o,a,l,c,r,A(n,.7)),Mo(i,t,o+.08,a+.1,l-.24,c-.2,r,4);const h=t.w*.32,u=t.w*.68;i.box(h,0,a-.1,u,r*1.18,a+.1,G(Un),A(Un,1.3),Ls),i.gable(h-.02,a-.12,u+.02,a+.12,r*1.18,.12,!0,A(je,1),A(je,.9)),i.wallQuad(0,o+.05,.05,h-.04,r*.5,a,.018,G(16770746),mo),i.wallQuad(0,u+.04,.05,l-.05,r*.5,a,.018,G(16770746),mo);const d=l-.1;i.box(d-.035,0,a-.16,d+.035,r*1.6,a-.1,A(5593696,1),A(5593696,1)),i.wallQuad(0,d-.09,r*1.15,d+.09,r*1.55,a-.16,.012,pr(t),Ui),i.flat(o,.02,l,a-.14,.018,G(Ps));for(let f=0;f<5;f++){const g=Ut(o+.08,l-.1,f/4);i.flat(g,.03,g+.016,a-.16,.022,G(14211278))}}function zx(i,t){const e=t.r,n=t.ht;i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Se));const s=pe(t,0,8824767),r=pe(t,1,2837091),o=.11+e()*.03,a=o,l=o,c=t.w-o,h=t.h-o,u=$t(n*.12,.32,.6),d=$t(Math.round((n-u)/.5),3,16),f=(n-u)/d,g=A(r,1.05),v=A(s,1);i.box(a-.03,0,l-.03,c+.03,u,h+.03,A(r,.85),A(r,.8)),i.wallQuad(0,a+.03,.05,c-.03,u-.05,l-.03,.018,G(14216447),Ls);const m=ns(t);i.box(a,u,l,c,n,h,v,A(r,.85));for(let p=0;p<d;p++){const y=u+p*f;i.box(a-.014,y+f*.72,l-.014,c+.014,y+f,h+.014,g,g)}if(Cs(i,t,a,l,c,h,u+.03,n-.05,d,m,3,mn),di(i,a,l,c,h,n,g,.04,.06),Mo(i,t,a+.06,l+.06,c-.2,h-.16,n,3),i.collect&&n>18){i.bar(t.w/2,n,t.h/2,t.w/2,n+.32,t.h/2,.014,.014,G(14211288));const[p,y,_]=i.toWorld(t.w/2,n+.35,t.h/2);qe.push({kind:1,x:p,y,z:_,yaw:0,speed:1,phase:bt(t.seedI,23,3),scale:.18})}}function Hx(i,t){const e=t.r,n=[[9083730,7308354],[13215850,11899471],[8032074,9806940],[10120127,8673439]],s=n[e()*n.length|0];i.flat(.02,.02,t.w-.02,t.h-.02,.01,A(9136957,.9));const r=6+(e()*3|0),o=.05,a=t.h-.05;for(let v=0;v<r;v++){const m=.06+(t.w-.12)*v/r,p=(t.w-.12)/r*.55;i.box(m,.01,o,m+p,.035,a,A(s[v%2],1),G(s[v%2]))}const l=pe(t,0,11879215),c=.34+t.level*.03,h=.24+t.level*.02,u=.1,d=.08,f=.16+t.level*.02,g=A(l,.95+e()*.1);i.box(u,0,d,u+c,f,d+h,g,g);{const v=u-.02,m=u+c+.02,p=d-.02,y=d+h+.02,_=p+(y-p)*.2,x=y-(y-p)*.2,T=(p+y)/2,M=.18+t.level*.02,w=f+M*.6,E=f+M,b=A(9405559,1);i.quad(m,f,p,v,f,p,v,w,_,m,w,_,b),i.quad(m,w,_,v,w,_,v,E,T,m,E,T,b),i.quad(v,f,y,m,f,y,m,w,x,v,w,x,b),i.quad(v,w,x,m,w,x,m,E,T,v,E,T,b);const S=[[p,f],[_,w],[T,E],[x,w],[y,f]];for(let D=1;D<S.length-1;D++)i.tri(v,S[0][1],S[0][0],v,S[D+1][1],S[D+1][0],v,S[D][1],S[D][0],g),i.tri(m,S[0][1],S[0][0],m,S[D][1],S[D][0],m,S[D+1][1],S[D+1][0],g);i.wallQuad(3,d+h*.35,f*.3,d+h*.65,f+.06,u,.014,A(l,.55))}if(t.level>=2||e()<.5){const v=u+c+.12,m=d+.1;i.cyl(v,m,0,.34+t.level*.05,.07,.07,8,G(13225425),null),i.dome(v,m,.34+t.level*.05,.07,8,3,A(10134184,1))}if(t.level>=2){const v=t.w-.32,m=t.h-.3,p=.22,y=.18,_=G(15261900);i.box(v,0,m,v+p,.16,m+y,_,_),i.gable(v-.015,m-.015,v+p+.015,m+y+.015,.16,.09,!0,A(7294519,1),_),i.wallQuad(0,v+.04,.03,v+.1,.1,m,.012,G(Un),As(t,1,1,0,.8)?mn:0)}Cn(i,.03,.03,t.w-.03,t.h-.03,.01,.05,A(Er,1.25)),e()<.7&&Oi(i,t.w-.14,.14,.01,.9,t.seedI+7)}function Gx(i,t){const e=t.r,n=pe(t,0,12103844),s=A(n,.92+e()*.14);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ps));const r=$t(t.ht*.24,.42,.9),o=.08,a=.12,l=t.w-.24,c=t.h-.1;i.box(o,0,a,l,r,c,s,A(n,.75));const h=o+(l-o)*.25,u=l-(l-o)*.25;i.box(h,r,a+.08,u,r+.1,c-.08,G(Un),A(n,.7),Nn),i.gable(h-.02,a+.06,u+.02,c-.06,r+.1,.07,!0,A(Ii,1.1),A(n,.7)),i.wallQuad(0,o+.06,0,o+.34,r*.66,a,.014,A(9343898,1)),i.wallQuad(0,o+.4,r*.25,l-.06,r*.6,a,.014,G(Un),As(t,0,2,0,.6)?mn:0),Tr(i,t,l+.14,t.h*.4,.012,3),Cn(i,.04,.04,t.w-.04,t.h-.04,.012,.08,A(7830916,1),0,o+.02,o+.38),jf(i,l-.1,c-.14,r,.16,.05,6975349)}function Vx(i,t){const e=t.r,n=pe(t,0,11052186),s=A(n,.9+e()*.16);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ps));const r=$t(t.ht*.28,.5,1.6),o=.07,a=.1,l=t.w-.07,c=t.h-.3;i.box(o,0,a,l,r,c,s,A(n,.7));const h=3+(e()*2|0),u=(c-a)/h,d=.14,f=A(n,.68),g=G(Un);for(let p=0;p<h;p++){const y=a+p*u,_=y+u;i.wallQuad(0,o+.01,r,l-.01,r+d,y,-.001,g,Nn),i.quad(l,r+d,y,o,r+d,y,o,r,_,l,r,_,f),i.tri(o,r,y,o,r,_,o,r+d,y,s),i.tri(l,r,_,l,r,y,l,r+d,y,s)}const v=t.level>=2?2:1;for(let p=0;p<v;p++){const y=o+.16+p*.3;i.cyl(y,c-.12,r,r+.5+t.level*.12,.05,.04,7,A(9076856,1),A(5919822,1)),i.cyl(y,c-.12,r+.42+t.level*.12,r+.5+t.level*.12,.048,.048,7,A(11552058,1),null)}hi(i,l-.14,a+.14,0,.09,.3,10134184),i.bar(l-.14,.28,a+.14,l-.02,r*.5,a+.3,.02,.02,G(je));const m=.14;i.box(o+.05,0,c,o+.55,m,c+.12,A(Re,.85),G(Re)),i.box(o+.05,m+.14,c,o+.55,m+.18,c+.14,A(5593696,1),A(5593696,1)),i.wallQuad(2,o+.1,.02,o+.28,m+.12,c,.013,A(7830916,1)),i.wallQuad(2,o+.32,.02,o+.5,m+.12,c,.013,A(7830916,1)),Tr(i,t,t.w-.24,t.h-.16,.012,3)}function Wx(i,t){const e=t.r;i.flat(.02,.02,t.w-.02,t.h-.02,.012,A(Ps,1.1));const n=pe(t,0,11581112),s=2+(e()*2|0);for(let d=0;d<s;d++){const f=.2+d%2*.34,g=t.h-.24-(d/2|0)*.3;hi(i,f,g,0,.12+e()*.03,.2+e()*.1,n,10)}const r=$t(t.ht*.75,1.2,2.2);for(let d=0;d<2;d++){const f=t.w-.2-d*.22,g=.2+d*.12;i.cyl(f,g,0,r-d*.3,.055,.05,8,A(n,1.05),A(n,.85));for(let v=1;v<=2;v++){const m=(r-d*.3)*v/3;i.cyl(f,g,m,m+.02,.075,.075,8,A(6975605,1),A(6975605,1))}}const o=t.w*.5,a=.12;i.cyl(o,a,0,r*1.15,.028,.024,6,A(n,.9),null),i.box(o-.035,r*1.15,a-.035,o+.035,r*1.15+.07,a+.035,G(16754237),G(16763230),gn);const l=.16,c=.16;i.cyl(l,c,0,r,.05,.042,7,G(De),null),i.cyl(l,c,r*.55,r*.65,.052,.05,7,A(11552058,1),null),i.cyl(l,c,r*.85,r*.95,.05,.046,7,A(11552058,1),null);const h=.12;i.bar(.14,h,t.h-.3,t.w-.2,h,.28,.018,.018,G(je)),i.bar(.14,h+.05,t.h-.3,t.w-.2,h+.05,.28,.018,.018,A(13214794,1));for(let d=0;d<3;d++){const f=.2+d*.3,g=Ut(.14,t.w-.2,f),v=Ut(t.h-.3,.28,f);i.bar(g,0,v,g,h+.05,v,.015,.015,A(6975605,1))}const u=A(n,.9);i.box(.08,0,.34,.5,.34,t.h-.5,u,A(n,.72)),be(i,t,0,.12,.46,.34,.1,.28,1,2,.6,Nn),Cn(i,.04,.04,t.w-.04,t.h-.04,.012,.08,A(7830916,1))}function Xx(i,t){const e=t.r,n=pe(t,0,10462118),s=A(n,.92+e()*.12);i.flat(.02,.02,t.w-.02,t.h-.02,.012,G(Ps));const r=$t(t.ht*.16,.4,.85),o=t.key==="x_military",a=.07,l=.1,c=t.w-.07,h=o?t.h*.5:t.h-.34,u=o?A(7043666,1):s;i.box(a,0,l,c,r,h,u,A(o?5924933:n,.72)),i.hip(a-.02,l-.02,c+.02,h+.02,r,.1,o?A(5332544,1):A(n,.66),.14);const d=$t(Math.round((c-a)/.4),2,6);for(let f=0;f<d;f++){const g=a+.1+f*((c-a-.2)/d);i.wallQuad(0,g,.02,g+(c-a-.2)/d-.08,r*.7,l,.014,A(8685967,1))}if(i.box(a-.012,r-.05,l-.012,c+.012,r-.02,h+.012,A(n,.6),A(n,.6)),Tr(i,t,t.w*.3,h+.24,.012,o?2:4),Tr(i,t,t.w*.7,h+.2,.012,3),Cn(i,.04,.04,t.w-.04,t.h-.04,.012,.09,A(7830916,1),0,a+.05,c-.05),o){const f=t.w-.4,g=t.h-.42;for(const[p,y]of[[-.08,-.08],[.08,-.08],[-.08,.08],[.08,.08]])i.bar(f+p,0,g+y,f+p*.7,.5,g+y*.7,.02,.02,A(5924933,1));i.box(f-.11,.5,g-.11,f+.11,.66,g+.11,A(7043666,1),A(5332544,1)),i.wallQuad(0,f-.08,.54,f+.08,.62,g-.11,.012,G(Un),Nn),i.pyramid(f,g,.26,.26,.66,.08,A(5332544,1));const v=.5,m=t.h-.55;if(i.disc(v,m,.018,.34,12,A(4869715,1)),i.box(v-.16,.02,m-.03,v+.16,.028,m+.03,G(14211278),G(14211278)),i.box(v-.16,.02,m-.14,v-.1,.028,m+.14,G(14211278),G(14211278)),i.box(v+.1,.02,m-.14,v+.16,.028,m+.14,G(14211278),G(14211278)),i.collect){const[p,y,_]=i.toWorld(f,.8,g);qe.push({kind:2,x:p,y,z:_,yaw:0,speed:1.4,phase:bt(t.seedI,31,3),scale:.5})}Ur(i,t,.24,.24,.012,.8)}}function qx(i,t){t.r;const e=t.w,n=t.h;i.flat(.03,.03,e-.03,n-.03,.014,A(Re,.8)),Cn(i,.05,.05,e-.05,n-.05,.014,.1,A(7830916,1),0,e*.35,e*.65);const s=t.key;if(s==="p_hydro"){const u=A(Re,.95);i.quad(e-.06,.02,.05,.06,.02,.05,.18,t.ht*.55,.55,e-.18,t.ht*.55,.55,u),i.box(.06,0,.05,e-.06,.1,.2,u,u),i.box(.14,0,.5,e-.14,t.ht*.55,.72,u,A(Re,.8));for(let d=0;d<3;d++){const f=.22+d*((e-.44)/2.2);i.wallQuad(0,f,.06,f+.16,t.ht*.4,.5,.014,A(5204861,1),Nn)}i.cyl(.3,.4,0,t.ht*.72,.09,.08,7,u,A(Re,.85)),i.cyl(e-.3,.4,0,t.ht*.72,.09,.08,7,u,A(Re,.85)),i.box(.3,0,.8,e-.3,.5,n-.2,A(10135728,1),A(7832716,1)),be(i,t,2,.4,e-.4,n-.2,.14,.42,1,4,.8,mn);return}if(s==="p_nuclear"){for(const u of[e*.3,e*.7]){const d=n*.62,f=t.ht*.9;if(i.cyl(u,d,0,f*.68,.62,.4,11,G(14672870),null),i.cyl(u,d,f*.68,f,.4,.46,11,G(13949404),null),i.cyl(u,d,f,f+.001,.46,.3,11,A(3159611,1),null),i.collect){const[g,v,m]=i.toWorld(u+.46,f+.06,d);qe.push({kind:1,x:g,y:v,z:m,yaw:0,speed:1,phase:bt(t.seedI,41+u*10,3),scale:.22})}}i.cyl(e*.5,n*.22,0,.5,.34,.34,10,G(15264750),null),i.dome(e*.5,n*.22,.5,.34,10,4,G(14672870)),i.box(.14,0,.05,e-.14,.42,.34,A(12107974,1),A(9410461,1)),be(i,t,0,.24,e-.24,.05,.12,.34,1,6,.8,mn);return}if(s==="p_fusion"){const u=e*.5,d=n*.52;i.cyl(u,d,0,.5,1.05,1.05,14,A(13226712,1),A(11187387,1)),i.dome(u,d,.5,1.05,14,5,A(14213349,1),.75),i.cyl(u,d,.42,.54,1.07,1.07,14,G(4053977),null,gn);for(let f=0;f<8;f++){const g=f/8*Math.PI*2,v=u+Math.cos(g)*1.2,m=d+Math.sin(g)*1.2;i.box(v-.06,0,m-.06,v+.06,.7+f%2*.15,m+.06,A(7832716,1),G(4053977),f%2===0?Nn:0)}if(i.box(.2,0,n-.6,e-.2,.46,n-.1,A(12107974,1),A(9410461,1)),be(i,t,0,.3,e-.3,n-.6,.12,.4,1,6,.85,mn),i.collect){const[f,g,v]=i.toWorld(u,1.319,d);qe.push({kind:1,x:f,y:g,z:v,yaw:0,speed:1,phase:bt(t.seedI,43,3),scale:.24})}return}if(s==="p_microwave"){const u=e*.5,d=n*.48;i.cyl(u,d,0,.3,.5,.5,12,A(Re,.9),A(Re,.8)),i.cyl(u,d,.3,1.15,.28,1.25,14,A(13949404,1),null),i.cyl(u,d,1.16,.36,1.22,.24,14,A(15791093,1),null);for(let f=0;f<3;f++){const g=f/3*Math.PI*2+.5;i.bar(u+Math.cos(g)*1.05,1.05,d+Math.sin(g)*1.05,u,t.ht*.16+1.5,d,.022,.022,G(je))}i.box(u-.07,t.ht*.16+1.44,d-.07,u+.07,t.ht*.16+1.62,d+.07,G(16747325),G(16763230),Ui),i.box(.16,0,n-.52,e*.55,.4,n-.08,A(12107974,1),A(9410461,1)),be(i,t,0,.24,e*.5,n-.52,.1,.34,1,4,.8,mn);return}const r=s==="p_coal",o=s==="p_oil",a=pe(t,0,r?9274748:11581112),l=A(a,.95),c=t.ht*.32;i.box(.14,0,n*.42,e-.14,c,n-.14,l,A(a,.72)),i.gable(.12,n*.42-.02,e-.12,n-.12,c,.16,!0,A(a,.66),l),be(i,t,0,.3,e-.3,n*.42,c*.35,c*.85,1,6,.8,mn);const h=r?2:1;for(let u=0;u<h;u++){const d=e*.3+u*e*.24,f=n*.28;if(i.cyl(d,f,0,t.ht,.11,.08,8,A(10327693,1),A(4867392,1)),i.cyl(d,f,t.ht*.82,t.ht*.9,.095,.088,8,A(11552058,1),null),i.collect&&u===0){const[g,v,m]=i.toWorld(d,t.ht+.08,f);qe.push({kind:1,x:g,y:v,z:m,yaw:0,speed:1,phase:bt(t.seedI,47,3),scale:.2})}}r?(i.pyramid(e*.72,n*.2,.7,.5,.014,.3,A(2895408,1)),i.bar(e*.72,.26,n*.2,e*.5,c*.8,n*.45,.05,.02,A(6975605,1))):o?(hi(i,e*.68,n*.18,0,.22,.28,10134184,11),hi(i,e*.86-.12,n*.3,0,.15,.22,10134184,10)):(hi(i,e*.74,n*.2,0,.18,.24,13225425,10),i.bar(e*.74,.1,n*.2,e*.5,.1,n*.45,.02,.02,A(13214794,1)))}function Yx(i,t){const e=t.r,n=t.ht*.82,s=t.w/2,r=t.h/2;i.disc(s,r,.016,.22,8,A(Re,.9)),i.cyl(s,r,0,n,.075,.038,8,G(15659507),null);const o=e()*Math.PI*2,a=s-Math.sin(o)*.02,l=r-Math.cos(o)*.02;if(i.boxR(a,l,.14,.3,n-.07,n+.07,o,G(14870249),A(11552058,1)),gi(i,0,s,r-.075,0,.09,.16,5333099),i.collect){const c=s+Math.sin(o)*.17,h=r+Math.cos(o)*.17,[u,d,f]=i.toWorld(c,n,h);qe.push({kind:0,x:u,y:d,z:f,yaw:i.worldYaw(Math.atan2(Math.sin(o),Math.cos(o))),speed:(.9+e()*1.3)*(e()<.5?1:-1),phase:e()*Math.PI*2,scale:t.ht*.34})}}function $x(i,t){t.r,i.flat(.03,.03,t.w-.03,t.h-.03,.012,A(12166010,.9));const e=4,n=3,s=A(1915487,1.1);for(let r=0;r<e;r++){const o=.3+r*((t.h-.7)/(e-1));for(let a=0;a<n;a++){const l=.4+a*((t.w-.8)/(n-1));i.bar(l-.28,0,o,l-.28,.09,o,.014,.014,G(je)),i.bar(l+.28,0,o,l+.28,.09,o,.014,.014,G(je)),i.bar(l-.34,.2,o-.14,l+.34,.09,o+.14,.02,.34,s)}}i.box(t.w-.4,0,t.h-.32,t.w-.12,.2,t.h-.1,A(Re,.95),A(Re,.8)),Cn(i,.05,.05,t.w-.05,t.h-.05,.012,.08,A(7830916,1))}function jx(i,t){t.r;const e=t.w/2,n=t.h/2;if(t.key==="w_pump"){i.flat(.04,.04,t.w-.04,t.h-.04,.014,A(Re,.85));const l=A(pe(t,0,9417673),1);i.box(.3,0,.5,t.w-.3,.45,t.h-.24,l,A(5995148,1)),i.gable(.28,.48,t.w-.28,t.h-.22,.45,.14,!0,A(5333099,1),l),be(i,t,0,.4,t.w-.4,.5,.14,.38,1,2,.7,mn),i.bar(e,.12,.5,e,.08,-.12,.05,.05,G(je)),i.cyl(e,.16,0,.24,.1,.1,8,A(je,.9),A(je,.8)),hi(i,t.w-.34,t.h-.5,0,.11,.2,10470356,9);return}i.disc(e,n,.016,.34,9,A(Re,.9));const s=t.ht*.55,r=t.ht*.3,o=A(8225416,1);for(const[l,c]of[[-.26,-.26],[.26,-.26],[-.26,.26],[.26,.26]])i.bar(e+l,0,n+c,e+l*.45,s,n+c*.45,.028,.028,o);i.bar(e-.26,.05,n-.26,e+.12,s*.55,n-.12,.014,.014,o),i.bar(e+.26,.05,n-.26,e-.12,s*.55,n-.12,.014,.014,o),i.cyl(e,n,0,s,.05,.05,7,A(6975605,1),null),i.cyl(e,n,s-.04,s,.34,.34,9,A(6975605,1),null);const a=pe(t,0,13225425);if(i.cyl(e,n,s,s+r,.24,.3,9,A(a,1),null),i.cyl(e,n,s+r,s+r+.1,.3,.3,9,G(a),null),i.cyl(e,n,s+r+.1,s+r+.28,.3,.02,9,A(a,.9),null),i.collect&&t.ht>7){const[l,c,h]=i.toWorld(e,s+r+.34,n);qe.push({kind:1,x:l,y:c,z:h,yaw:0,speed:1,phase:bt(t.seedI,53,3),scale:.16})}}function Zx(i,t){const e=t.key;if(e==="w_treat")return Kx(i,t);if(e==="w_desal")return Jx(i,t);if(e==="s_prison")return Qx(i,t);const n=t.r,s=t.w,r=t.h,o=e.startsWith("s_police"),a=e.startsWith("s_fire"),l=e==="e_library",c=o?12897748:a?13063496:pe(t,0,14209732),h=A(c,.96+n()*.08),u=A(c,.72);i.flat(.02,.02,s-.02,r-.02,.012,G(Se));const d=$t(t.ht*.45,.6,3.2),f=.12,g=.22,v=s-.12,m=r-.14;i.box(f,0,g,v,d,m,h,A(c,.8)),di(i,f,g,v,m,d,u);const p=.75,y=$t(Math.round(d/.5),1,5);be(i,t,0,f+.08,v-.08,g,.28,d-.08,y,$t(s*2,2,6)|0,p),be(i,t,1,g+.08,m-.08,v,.28,d-.08,y,$t(r*2,2,5)|0,p*.8),be(i,t,3,g+.08,m-.08,f,.28,d-.08,y,$t(r*2,2,5)|0,p*.8);const _=s*.5-.24,x=s*.5+.24;if(i.box(_,0,g-.14,x,.04,g,G(Se),G(Se)),i.box(_+.03,.04,g-.08,x-.03,.08,g,G(Se),G(Se)),l||!o&&!a){const T=l?4:2;for(let M=0;M<T;M++){const w=Ut(_+.06,x-.06,M/(T-1));Ar(i,w,g-.09,.08,d*.62,.028,G(De))}i.gable(_-.02,g-.13,x+.02,g+.05,d*.7,.12,!0,u,G(De))}if(gi(i,0,s*.5,g,.08,.18,.3,4866100),o&&(i.wallQuad(0,f+.05,d*.42,v-.05,d*.56,g,.02,G(2973598),gn),i.disc(s*.5,g-.001,d+0,.001,4,u),i.box(s*.5-.09,d,g+.1,s*.5+.09,d+.05,g+.2,G(2973598),G(5214164),gn),Ur(i,t,v-.1,g-.1,.012,.6)),a){for(let T=0;T<2;T++){const M=f+.14+T*((v-f-.28)/1.4);i.wallQuad(0,M,.02,M+(v-f)*.26,d*.6,g,.018,A(13949404,1))}i.box(v-.24,0,m-.24,v-.04,d*1.9,m-.04,h,A(9387315,1)),i.wallQuad(0,v-.2,d*1.5,v-.08,d*1.7,m-.24,.014,G(16763196),gn)}if(l&&i.wallQuad(0,_+.05,d*.72,x-.05,d*.84,g,.024,A(13214794,1.1),gn),(e==="s_police_hq"||e==="s_fire_hq")&&(i.bar(s*.5,d,r*.6,s*.5,d+.7,r*.6,.016,.016,G(14211288)),i.collect)){const[T,M,w]=i.toWorld(s*.5,d+.74,r*.6);qe.push({kind:1,x:T,y:M,z:w,yaw:0,speed:1,phase:bt(t.seedI,61,3),scale:.16})}}function Kx(i,t){t.r,i.flat(.03,.03,t.w-.03,t.h-.03,.014,A(Re,.85));for(const[n,s]of[[t.w*.3,t.h*.62],[t.w*.7,t.h*.62]])i.cyl(n,s,0,.12,.5,.5,12,A(Re,.95),null),i.disc(n,s,.1,.46,12,A(4161423,1.1)),i.bar(n-.46,.14,s,n+.46,.14,s,.02,.014,G(je));const e=A(pe(t,0,12107974),1);i.box(.14,0,.1,t.w-.14,.4,t.h*.36,e,A(9410461,1)),be(i,t,0,.24,t.w-.24,.1,.12,.34,1,5,.75,mn),i.bar(t.w*.3,.1,t.h*.4,t.w*.3,.1,t.h*.6,.03,.03,G(je)),i.bar(t.w*.7,.1,t.h*.4,t.w*.7,.1,t.h*.6,.03,.03,G(je)),hi(i,t.w-.3,t.h-.26,0,.13,.24,10470356,9),Cn(i,.05,.05,t.w-.05,t.h-.05,.014,.08,A(7830916,1))}function Jx(i,t){t.r,i.flat(.03,.03,t.w-.03,t.h-.03,.014,A(Re,.85)),i.box(t.w*.4,0,0,t.w*.6,.06,.5,A(Re,.8),A(4161423,1.15)),i.bar(t.w*.5,.1,.05,t.w*.5,.1,.6,.06,.06,G(je));const e=A(pe(t,0,13620954),1);for(let n=0;n<2;n++){const s=.6+n*.9;i.box(.2,0,s,t.w-.6,.44,s+.7,e,A(10134699,1)),i.gable(.18,s-.02,t.w-.58,s+.72,.44,.12,!0,A(7832716,1),e),be(i,t,0,.3,t.w-.7,s,.14,.38,1,6,.7,mn)}hi(i,t.w-.34,t.h*.4,0,.16,.3,10470356,10),hi(i,t.w-.34,t.h*.7,0,.16,.3,10470356,10),Cn(i,.05,.05,t.w-.05,t.h-.05,.014,.08,A(7830916,1),0,t.w*.38,t.w*.62)}function Qx(i,t){t.r;const e=t.w,n=t.h;i.flat(.03,.03,e-.03,n-.03,.014,A(Re,.72));const s=A(11053216,.95),r=.05,o=.3;i.box(.1,0,.1,e-.1,o,.1+r,s,s),i.box(.1,0,n-.1-r,e-.1,o,n-.1,s,s),i.box(.1,0,.1,.1+r,o,n-.1,s,s),i.box(e-.1-r,0,.1,e-.1,o,n-.1,s,s);for(const[l,c]of[[.16,.16],[e-.16,.16],[.16,n-.16],[e-.16,n-.16]])i.bar(l,0,c,l,.55,c,.03,.03,s),i.box(l-.09,.55,c-.09,l+.09,.7,c+.09,A(9079426,1),A(7303016,1)),i.wallQuad(0,l-.06,.58,l+.06,.67,c-.09,.012,G(16773833),gn),i.pyramid(l,c,.22,.22,.7,.06,A(7303016,1));const a=A(pe(t,0,10326406),1);i.box(.3,0,n*.4,e-.3,.6,n*.62,a,A(7301730,1)),i.box(e*.42,0,n*.62,e*.58,.6,n-.24,a,A(7301730,1)),be(i,t,0,.4,e-.4,n*.4,.16,.52,2,8,.35,Nn),gi(i,0,e*.5,.1,0,.22,.26,3817285),i.flat(.3,.16,e*.6,n*.36,.018,A(8358511,1))}function ty(i,t){t.r;const e=t.w,n=t.h;i.flat(.02,.02,e-.02,n-.02,.012,G(Se));const s=pe(t,0,15001834),r=A(s,.97),o=$t(t.ht*.55,.9,8),a=e*.24,l=e*.76,c=.2,h=n-.24;i.box(a,0,c,l,o,h,r,A(s,.8));const u=o*.55;i.box(.1,0,c+.1,a,u,h-.1,r,A(s,.8)),i.box(l,0,c+.1,e-.1,u,h-.1,r,A(s,.8));const d=.85,f=$t(Math.round(o/.5),2,10);Cs(i,t,a,c,l,h,.3,o-.08,f,d,2);const g=$t(Math.round(u/.5),1,5);be(i,t,0,.16,a-.05,c+.1,.2,u-.06,g,3,d),be(i,t,0,l+.05,e-.16,c+.1,.2,u-.06,g,3,d);const v=e*.5,m=o*.82,p=G(14698556);if(i.wallQuad(0,v-.045,m-.13,v+.045,m+.13,c,.024,p,Ui),i.wallQuad(0,v-.13,m-.045,v+.13,m+.045,c,.024,p,Ui),i.box(v-.3,.3,c-.18,v+.3,.34,c,A(s,.85),A(s,.8)),i.bar(v-.28,0,c-.16,v-.28,.3,c-.16,.016,.016,G(je)),i.bar(v+.28,0,c-.16,v+.28,.3,c-.16,.016,.016,G(je)),gi(i,0,v,c,0,.2,.28,5333099),e>=3){const y=(a+l)/2,_=(c+h)/2;i.disc(y,_,o+.012,.34,12,A(4869715,1)),i.box(y-.14,o+.014,_-.026,y+.14,o+.02,_+.026,G(14211278),G(14211278)),i.box(y-.14,o+.014,_-.12,y-.09,o+.02,_+.12,G(14211278),G(14211278)),i.box(y+.09,o+.014,_-.12,y+.14,o+.02,_+.12,G(14211278),G(14211278))}else Mo(i,t,a+.05,c+.05,l-.2,h-.16,o,2);di(i,a,c,l,h,o,A(s,.75))}function ey(i,t){const e=t.r,n=t.w,s=t.h;i.flat(.02,.02,n-.02,s-.02,.012,A(Sr,.95)),pe(t,0,13208922);const r=A(13208922,.95+e()*.08),o=$t(t.ht*.4,.6,2.4),a=.12,l=n-.9,c=.2,h=s-.5;i.box(a,0,c,l,o,h,r,A(9396026,.9)),di(i,a,c,l,h,o,A(9396026,.8)),be(i,t,0,a+.08,l-.08,c,.2,o-.08,2,5,.55),be(i,t,2,a+.08,l-.08,h,.2,o-.08,2,4,.4);const u=(a+l)/2;i.box(u-.16,0,c-.1,u+.16,o*.55,c,r,A(9396026,.85)),i.gable(u-.18,c-.12,u+.18,c+.02,o*.55,.1,!0,A(7293485,1),r),gi(i,0,u,c-.1,0,.14,.24,4866100),i.disc(u,c-.1-.012+0,o*.45,1e-4,3,G(De)),i.wallQuad(0,u-.05,o*.36,u+.05,o*.46,c-.1,.014,G(De),Nn),i.box(l+.05,0,c+.1,n-.14,o*.85,h,A(12103844,1),A(9077624,1)),i.gable(l+.03,c+.08,n-.12,h+.02,o*.85,.12,!1,A(7301730,1),A(12103844,1)),i.flat(a+.05,h+.08,n*.6,s-.08,.016,A(14196831,.9)),i.bar(n*.2,.02,s-.2,n*.34,.14,s-.32,.02,.02,G(14698556)),i.bar(n*.34,.14,s-.32,n*.4,.02,s-.26,.05,.012,A(16763196,1)),Ur(i,t,n*.7,s-.24,.014,.7),Cn(i,.05,.05,n-.05,s-.05,.012,.06,G(Ba),0,u-.2,u+.2)}function ny(i,t){const e=t.r,n=t.w,s=t.h;i.flat(.02,.02,n-.02,s-.02,.012,A(Sr,1));const r=pe(t,0,10838602),o=A(r,.95+e()*.08),a=A(14209732,1),l=$t(t.ht*.28,.7,2.6),c=.14,h=.5;i.box(c,0,c,n-c,l,c+h,o,A(r,.75)),i.box(c,0,s-c-h,n-c,l,s-c,o,A(r,.75)),i.box(c,0,c+h,c+h,l,s-c-h,o,A(r,.75)),i.box(n-c-h,0,c+h,n-c,l,s-c-h,o,A(r,.75));const u=.6;be(i,t,0,c+.1,n-c-.1,c,.16,l-.08,2,7,u),be(i,t,2,c+.1,n-c-.1,s-c,.16,l-.08,2,7,u*.8),be(i,t,1,c+h+.06,s-c-h-.06,n-c,.16,l-.08,2,5,u*.8),be(i,t,3,c+h+.06,s-c-h-.06,c,.16,l-.08,2,5,u*.8);const d=c+h+.06,f=n-c-h-.06,g=s-c-h-.06;i.flat(d,(s-.16)/2-.06,f,(s-.16)/2+.06,.02,G(Se)),i.flat((n-.16)/2-.06,d,(n-.16)/2+.06,g,.021,G(Se)),Rs(i,d+.08,d+.08,d+.4,d+.4,.012),Rs(i,f-.4,g-.4,f-.08,g-.08,.012),Oi(i,d+.5,g-.3,.012,1.1,t.seedI+11),Oi(i,f-.5,d+.3,.012,1,t.seedI+13);const v=n/2;i.box(v-.24,0,c-.05,v+.24,l*1.9,c+h+.05,o,a),i.pyramid(v,c+h*.5,.54,h+.14,l*1.9,.3,A(5333099,1)),i.disc(v,c-.05-.014,l*1.55,1e-4,3,G(De)),i.wallQuad(0,v-.07,l*1.45,v+.07,l*1.62,c-.05,.016,G(16446688),gn),gi(i,0,v,c-.05,0,.2,l*.6,4143667),i.box(c-.012,l-.05,c-.012,n-c+.012,l,c+h+.012,a,a),Ur(i,t,v+.4,c-.12,.012,.8)}function iy(i,t){t.r;const e=t.w,n=t.h;i.flat(.02,.02,e-.02,n-.02,.012,G(Se));const s=e/2,r=n/2,o=$t(t.ht*.16,1.4,2.6),a=e*.46,l=n*.4,c=18,h=pe(t,0,14209732),u=A(h,.95),d=A(4091822,1),f=A(15659507,1),g=(v,m,p)=>{const y=v/c*Math.PI*2;return[s+Math.cos(y)*m,r+Math.sin(y)*p]};for(let v=0;v<c;v++){const m=(v+1)%c,[p,y]=g(v,a,l),[_,x]=g(m,a,l),[T,M]=g(v,a*.55,l*.5),[w,E]=g(m,a*.55,l*.5);i.quad(_,0,x,p,0,y,p,o,y,_,o,x,u,0),i.quad(p,o,y,_,o,x,w,o*.25,E,T,o*.25,M,d),i.quad(T,o*.25,M,w,o*.25,E,w,.05,E,T,.05,M,A(h,.8));const[b,S]=g(v,a*1.04,l*1.05),[D,k]=g(m,a*1.04,l*1.05),[U,z]=g(v,a*.72,l*.68),[W,$]=g(m,a*.72,l*.68);i.quad(b,o+.06,S,D,o+.06,k,W,o+.18,$,U,o+.18,z,f),i.quad(D,o+.02,k,b,o+.02,S,U,o+.14,z,W,o+.14,$,A(h,.7))}i.disc(s,r,.06,a*.52,16,A(5148477,1.1)),i.flat(s-a*.3,r-.012,s+a*.3,r+.012,.075,G(15266020)),i.flat(s-.012,r-l*.28,s+.012,r+l*.28,.075,G(15266020));for(const[v,m]of[[.2,.2],[e-.2,.2],[.2,n-.2],[e-.2,n-.2]]){i.bar(v,0,m,v,o*1.9,m,.026,.026,A(7830916,1));const p=s-v,y=r-m,_=Math.hypot(p,y),x=v+p/_*.12,T=m+y/_*.12;i.bar(v,o*1.9,m,x,o*1.98,T,.09,.05,G(16120058),Ui)}for(const v of[0,2]){const m=v===0?r-l:r+l;i.wallQuad(v,s-.3,.02,s+.3,o*.5,m,-.05,A(5333099,1))}}function sy(i,t){const e=t.r,n=t.w,s=t.h,r=t.key;if(i.flat(.015,.015,n-.015,s-.015,.012,A(Sr,.95+e()*.15)),r==="l_sports"){i.flat(.3,.3,n-.3,s-.3,.02,A(5148477,1.15)),Cn(i,.26,.26,n-.26,s-.26,.02,.001,G(15266020)),i.flat(n/2-.012,.3,n/2+.012,s-.3,.026,G(15266020));for(const l of[.34,s-.34])i.bar(n/2-.12,.02,l,n/2-.12,.12,l,.012,.012,G(De)),i.bar(n/2+.12,.02,l,n/2+.12,.12,l,.012,.012,G(De)),i.bar(n/2-.12,.12,l,n/2+.12,.12,l,.012,.012,G(De));for(let l=0;l<3;l++)i.box(.06,l*.05,.5+l*.07,.2,l*.05+.05,s-.5,A(10134184,1-l*.05),G(je));for(const[l,c]of[[.14,.14],[n-.14,.14],[.14,s-.14],[n-.14,s-.14]])i.bar(l,0,c,l,.7,c,.02,.02,A(7830916,1)),i.box(l-.05,.7,c-.03,l+.05,.76,c+.03,G(16120058),G(16120058),gn);return}if(r==="l_zoo"){Cn(i,.06,.06,n-.06,s-.06,.012,.09,A(Er,1.2),0,n*.4,n*.6),i.bar(n*.4,0,.06,n*.4,.34,.06,.02,.02,A(13214794,1)),i.bar(n*.6,0,.06,n*.6,.34,.06,.02,.02,A(13214794,1)),i.bar(n*.4,.34,.06,n*.6,.34,.06,.02,.05,A(13214794,1)),Cn(i,.2,.5,n*.48,s*.5,.012,.06,G(Ba)),Cn(i,n*.55,.44,n-.2,s*.42,.012,.06,G(Ba)),i.disc(n*.68,s*.72,.02,.34,10,A(Oa,1));for(let l=0;l<3;l++){const c=.3+e()*(n*.35),h=.6+e()*(s*.3),u=A([15260868,12160350,15920608][l%3],1);i.box(c,.06,h,c+.11,.13,h+.05,u,u),i.bar(c+.01,.06,h+.025,c+.01,.02,h+.025,.012,.012,u),i.bar(c+.1,.06,h+.025,c+.1,.02,h+.025,.012,.012,u),i.bar(c+.1,.13,h+.025,c+.12,.2,h+.025,.016,.016,u),i.box(c+.1,.2,h+.005,c+.15,.235,h+.045,u,u)}for(let l=0;l<4;l++)Oi(i,.24+e()*(n-.5),.2+e()*(s-.5),.012,.8+e()*.6,t.seedI+l*3);i.flat(n*.42,.08,n*.58,s*.55,.018,G(Se));return}const o=n>=2;i.flat(n*.5-.07,.03,n*.5+.07,s-.03,.018,A(13286813,1)),i.flat(.03,s*.5-.07,n-.03,s*.5+.07,.019,A(13286813,1)),(o||e()<.4)&&(i.disc(n*.7,s*.3,.02,Math.min(n,s)*.16,10,A(Oa,1.05)),i.cyl(n*.7,s*.3,.006,.03,Math.min(n,s)*.175,Math.min(n,s)*.175,10,A(Se,.9),null)),Rs(i,.08,.08,n*.34,.15,.012),Rs(i,n-.34,s-.15,n-.08,s-.08,.012),za(i,n*.4,s*.5+.12,.012,!0),za(i,n*.6,s*.5-.12,.012,!0);const a=o?7:2+(e()*2|0);for(let l=0;l<a;l++){const c=.14+e()*(n-.3),h=.14+e()*(s-.3);Math.abs(c-n*.5)<.12||Math.abs(h-s*.5)<.12||Oi(i,c,h,.012,.75+e()*.75,t.seedI+l*7)}if(o){const l=n*.3,c=s*.72;i.disc(l,c,.03,.2,8,A(Se,1.05));for(let h=0;h<6;h++){const u=h/6*Math.PI*2;Ar(i,l+Math.cos(u)*.16,c+Math.sin(u)*.16,.03,.22,.014,G(De))}i.cyl(l,c,.25,.38,.24,.02,8,A(9387315,1),null),go(i,n*.5+.1,s*.3,.012),go(i,n*.5-.1,s*.7,.012)}}function ry(i,t){t.r;const e=t.w,n=t.h,s=4;for(let a=0;a<s;a++)for(let l=0;l<s;l++){const c=(a+l)%2===0?A(13617594,1):A(11643545,1);i.flat(e*l/s+.01,n*a/s+.01,e*(l+1)/s-.01,n*(a+1)/s-.01,.014,c)}const r=e/2,o=n/2;i.cyl(r,o,0,.08,.3,.3,10,A(14209732,.95),null),i.disc(r,o,.07,.27,10,A(Oa,1.15),Nn),i.cyl(r,o,.07,.24,.05,.035,7,A(14209732,.9),A(14209732,.85)),i.cyl(r,o,.24,.3,.11,.09,7,A(14209732,.95),A(Oa,1.2),Nn),i.cyl(r,o,.3,.44,.02,.012,5,G(12577013),null,mn);for(const[a,l]of[[.18,.18],[e-.18,.18],[.18,n-.18],[e-.18,n-.18]])i.box(a-.09,.014,l-.09,a+.09,.07,l+.09,A(9077624,1),A($c,.9)),Rs(i,a-.07,l-.07,a+.07,l+.07,.07,.05),go(i,a+(a<e/2?.16:-.16),l,.014);za(i,r-.4,o,.014,!1),za(i,r+.4,o,.014,!1)}function oy(i,t,e,n,s,r,o){i.bar(t,n,e,t,n+s,e,.045,.045,o),i.bar(t,n+s,e,t+r,n+s,e,.035,.035,o),i.bar(t,n+s,e,t-r*.3,n+s*.86,e,.025,.025,o),i.bar(t+r*.78,n+s,e,t+r*.78,n+s*.52,e,.012,.012,A(3422268,1))}function ay(i,t){const e=t.w,n=t.h;i.flat(.02,.02,e-.02,n-.02,.014,A(Re,.78)),i.box(0,0,0,e,.12,.22,A(Re,.75),A(Re,.9));for(let s=.18;s<e;s+=.55)i.bar(s,-.35,.08,s,.02,.08,.035,.035,A(5593696,1));if(t.key==="l_marina"){for(let s=0;s<4;s++){const r=.35+s*((e-.7)/3);i.box(r-.035,.03,0,r+.035,.07,n*.58,A(Er,1.1),A(Er,1.2)),i.box(r-.13,.025,.35+(s&1)*.3,r+.13,.07,.48+(s&1)*.3,G(De),A(4882370,1)),i.bar(r,.07,.41+(s&1)*.3,r,.3,.41+(s&1)*.3,.012,.012,G(De))}i.box(.12,0,n-.55,e-.12,.34,n-.12,A(14207924,1),A(Ii,1)),i.wallQuad(0,.22,.08,e-.22,.28,n-.55,.016,G(16770746),mo);return}i.box(.16,0,n-.8,e*.48,.55,n-.14,A(10462118,1),A(6777968,1)),i.gable(.13,n-.83,e*.48+.03,n-.11,.55,.14,!0,A(6777968,1),A(10462118,1));for(let s=0;s<3;s++)oy(i,.55+s*((e-1.1)/2),.45,.02,1.35,.65,A(14788139,1));Tr(i,t,e*.68,n*.55,.014,12),go(i,e-.2,n-.2,.014,.7)}function ly(i,t){const e=t.w,n=t.h;i.flat(.02,.02,e-.02,n-.02,.012,A(Ps,1.05));const s=n*.7;i.flat(.12,s-.34,e-.12,s+.34,.022,A(2632753,1));for(let a=.35;a<e-.3;a+=.45)i.flat(a,s-.025,a+.2,s+.025,.027,G(De),gn);const r=.18;i.box(.25,0,r,e-1.1,.55,n*.38,A(12107974,1),A(7832716,1)),i.wallQuad(2,.32,.08,e-1.17,.45,n*.38,.018,G(9292008),Ls),i.box(.5,.55,r+.12,e-1.4,.78,n*.38-.12,G(Un),A(7832716,1));for(let a=0;a<4;a++){const l=.55+a*((e-1.8)/3);i.box(l,.12,n*.38,l+.14,.24,n*.52,A(10134184,1),A(10134184,1))}const o=e-.55;i.cyl(o,n*.22,0,1.25,.16,.11,8,A(Re,.9),null),i.cyl(o,n*.22,1.25,1.52,.25,.25,8,G(Un),A(7832716,1),Nn),i.cyl(o,n*.22,1.52,1.6,.27,.2,8,A(5593696,1),A(5593696,1));for(let a=0;a<2;a++){const l=e*(.32+a*.3),c=n*.5;i.boxR(l,c,.55,.12,.07,.14,Math.PI/2,G(De),G(De)),i.bar(l-.02,.1,c-.42,l+.02,.1,c+.42,.035,.035,A(4882370,1)),i.bar(l-.2,.1,c,l+.34,.1,c,.025,.025,G(De))}if(i.collect){const[a,l,c]=i.toWorld(o,1.73,n*.22);qe.push({kind:2,x:a,y:l,z:c,yaw:0,speed:1.1,phase:bt(t.seedI,67,3),scale:.65}),qe.push({kind:1,x:a,y:l+.12,z:c,yaw:0,speed:1,phase:bt(t.seedI,68,3),scale:.2})}}function cy(i,t){const e=t.w,n=t.h;if(i.flat(.02,.02,e-.02,n-.02,.012,G(Se)),t.key==="t_subway"){i.box(e*.25,0,n*.28,e*.75,.3,n*.72,G(Un),A(5333099,1),Ls),i.gable(e*.22,n*.25,e*.78,n*.75,.3,.12,!0,A(4053977,1),A(5333099,1)),i.box(e*.42,.02,n*.08,e*.58,.08,n*.3,A(5593696,1),A(5593696,1)),go(i,.2,n-.2,.012);return}if(t.key==="t_bus"){i.box(.12,0,.15,e-.12,.42,n*.48,A(12107974,1),A(7832716,1)),i.wallQuad(0,.22,.08,e-.22,.35,.15,.016,G(16770746),mo);for(let s=0;s<3;s++)i.box(.18+s*.5,.03,n*.62,.55+s*.5,.18,n*.78,A(4053977,.8),A(4053977,1));return}for(let s=0;s<3;s++){const r=.35+s*((n-.7)/2);i.box(.1,.02,r-.11,e-.1,.08,r+.11,A(Re,.9),A(Re,1));for(let o=.25;o<e-.2;o+=.45)i.bar(o,.08,r,o,.42,r,.018,.018,G(je));i.quad(e-.08,.42,r+.18,.08,.42,r+.18,.14,.52,r-.18,e-.14,.52,r-.18,A(14672870,1))}i.box(e*.32,.08,.12,e*.68,.9,n-.12,G(Un),A(5333099,1),Nn),i.gable(e*.29,.09,e*.71,n-.09,.9,.22,!1,A(5333099,1),A(12107974,1))}function ql(i,t,e,n,s,r,o,a){Cs(i,t,e,n,s,r,o,a,$t(Math.round((a-o)/.75),2,28),.58,3)}function hy(i,t){const e=t.w,n=t.h,s=e/2,r=n/2,o=t.key;if(i.flat(.03,.03,e-.03,n-.03,.014,o==="arco_forest"?A(Sr,.95):G(Se)),o==="x_tower"){i.cyl(s,r,0,2.2,.8,.52,10,A(13095642,1),null),i.cyl(s,r,2.2,t.ht*.78,.52,.34,10,A(7312819,1),null);for(let a=3;a<t.ht*.76;a+=1.5)i.cyl(s,r,a,a+.18,.54-a*.002,.54-a*.002,10,G(16767370),null,As(t,a|0,0,0,.58)?mn:0);if(i.cyl(s,r,t.ht*.78,t.ht*.9,.34,.12,8,A(13620440,1),null),i.cyl(s,r,t.ht*.9,t.ht+6,.1,.008,7,G(15264750),null),i.collect){const[a,l,c]=i.toWorld(s,t.ht+6.1,r);qe.push({kind:1,x:a,y:l,z:c,yaw:0,speed:1,phase:0,scale:.35})}return}if(o==="x_llama"){const a=A(14199351,1.15);i.cyl(s,r,0,1.8,1.05,1.05,14,A(15261640,1),A(14207912,1)),i.dome(s,r,1.8,1.08,14,5,a,1.15),i.cyl(s-.42,r,2.65,3.65,.18,.035,6,a,null),i.cyl(s+.42,r,2.65,3.65,.18,.035,6,a,null),i.wallQuad(0,s-.7,.25,s+.7,1.2,r-1.05,.025,G(4053977),Ui);return}if(o==="x_cityhall"){i.box(.25,0,.55,e-.25,2.3,n-.28,A(14274749,1),A(11115651,1));for(let a=0;a<6;a++)Ar(i,.55+a*((e-1.1)/5),.38,0,1.65,.065,G(De));i.gable(.35,.25,e-.35,.68,1.65,.48,!0,A(12103062,1),G(De)),i.cyl(s,n*.6,2.3,3.2,.65,.65,12,A(14274749,1),null),i.dome(s,n*.6,3.2,.72,12,5,A(6857882,1)),Ur(i,t,s,n*.6,3.85,1.2);return}if(o==="x_statue"){i.box(.18,0,.18,.82,.7,.82,A(12103062,1),A(14010798,1)),i.box(.3,.7,.3,.7,1.05,.7,A(6714733,1),A(7833726,1)),i.bar(.5,1.05,.5,.48,2.55,.5,.11,.11,A(6714733,1)),i.cyl(.48,.5,2.5,2.85,.16,.14,7,A(6714733,1),A(7833726,1)),i.bar(.48,2.2,.5,.18,1.55,.45,.07,.07,A(6714733,1)),i.bar(.48,2.2,.5,.82,2.65,.45,.07,.07,A(6714733,1));return}if(o==="x_observatory"){i.box(.3,0,.3,e-.3,1.3,n-.3,A(14209732,1),A(11051414,1)),i.cyl(s,r,1.3,2,1.05,1.05,14,A(14278112,1),null),i.dome(s,r,2,1.08,14,6,A(13159889,1)),i.box(s-.1,1.95,r-1.09,s+.1,3,r-.98,A(3159611,1),A(3159611,1));return}if(o==="x_casino"){i.box(.25,0,.2,e-.25,2,n-.25,A(14075821,1),A(5918050,1)),i.box(.55,2,.5,e-.55,t.ht,n-.55,A(7560838,1),A(4011080,1)),ql(i,t,.55,.5,e-.55,n-.55,2.2,t.ht-.4);for(let a=1;a<t.ht;a+=2.2)i.wallQuad(0,.35,a,e-.35,a+.24,.2,.03,pr(t,a|0),Ui);i.cyl(s,.1,.4,2.2,.18,.18,10,pr(t,8),G(16763196),Ui);return}if(o==="arco_plymouth"){for(let a=0;a<8;a++){const l=t.ht*a/8,c=t.ht*(a+1)/8,h=.18+a*.17;i.box(h,l,h,e-h,c,n-h,A(7842244,.92+a*.035),A(2575203,1)),ql(i,t,h,h,e-h,n-h,l+.25,c-.18)}i.pyramid(s,r,1.3,1.3,t.ht,4,A(12573671,1));return}if(o==="arco_forest"){for(let a=0;a<9;a++){const l=t.ht*a/9,c=.15+a*.18;if(i.box(c,l,c,e-c,l+t.ht/9,n-c,A(9086350,1),A(Sr,1.1)),ql(i,t,c,c,e-c,n-c,l+.2,l+t.ht/9-.15),(a&1)===0)for(let h=0;h<4;h++)Oi(i,c+.25+h*((e-2*c-.5)/3),c+.12,l+t.ht/9,1.2,t.seedI+a*9+h)}return}if(o==="arco_darco"){const a=A(2434869,1);for(let l=0;l<7;l++){const c=l*t.ht/7,h=1.55-l*.13;i.cyl(s,r,c,c+t.ht/7+.3,h,h*.88,9,a,null),i.cyl(s,r,c+t.ht/14,c+t.ht/14+.2,h+.05,h+.05,9,pr(t,l),null,Nn);for(let u=0;u<3;u++){const d=u*Math.PI*2/3+l*.7;i.bar(s+Math.cos(d)*h*.75,c+.2,r+Math.sin(d)*h*.75,s+Math.cos(d)*(h+.7),c+t.ht/7,r+Math.sin(d)*(h+.7),.08,.08,a)}}i.cyl(s,r,t.ht,t.ht+5,.25,.01,7,a,null);return}if(o==="arco_launch"){for(const[a,l]of[[.45,.45],[e-.45,.45],[.45,n-.45],[e-.45,n-.45]])i.bar(a,0,l,a,t.ht*.9,l,.13,.13,A(5858155,1));for(let a=4;a<t.ht*.88;a+=5)i.bar(.45,a,.45,e-.45,a,.45,.09,.09,A(7832716,1)),i.bar(.45,a,n-.45,e-.45,a,n-.45,.09,.09,A(7832716,1));i.cyl(s,r,.4,t.ht*.78,.58,.45,12,G(De),null),i.cyl(s,r,t.ht*.78,t.ht,.45,.01,12,A(15263976,1),null);for(let a=0;a<4;a++){const l=a*Math.PI/2;i.bar(s+Math.cos(l)*.42,1.2,r+Math.sin(l)*.42,s+Math.cos(l)*.95,.25,r+Math.sin(l)*.95,.14,.08,A(14240834,1))}if(i.collect){const[a,l,c]=i.toWorld(s,t.ht+.2,r);qe.push({kind:1,x:a,y:l,z:c,yaw:0,speed:1,phase:.2,scale:.3})}return}i.box(.25,0,.45,e-.25,t.ht*.45,n-.25,A(14209732,1),A(10327170,1));for(let a=0;a<6;a++)Ar(i,.5+a*((e-1)/5),.28,0,t.ht*.34,.055,G(De));i.pyramid(s,n*.58,e*.72,n*.6,t.ht*.45,t.ht*.18,A(7906743,1)),i.wallQuad(0,e*.3,t.ht*.2,e*.7,t.ht*.32,.45,.02,A(13214794,1),gn)}function uy(i,t){i.flat(.04,.04,t.w-.04,t.h-.04,.012,A(7301215,.8));for(let e=0;e<9;e++){const n=.08+t.r()*(t.w-.25),s=.08+t.r()*(t.h-.25),r=.06+t.r()*.16;i.boxR(n,s,r*1.7,r,.01,r*(.5+t.r()),t.r()*Math.PI,A(7827562,.7+t.r()*.35),A(9537405,1))}}const dy={house:Ix,rowhouse:Ux,apartment:Nx,tower:Fx,shop:Ox,office:zx,skyscraper:kx,mall:Bx,farm:Hx,workshop:Gx,factory:Vx,refinery:Wx,warehouse:Xx,powerplant:qx,windturbine:Yx,solarfarm:$x,watertower:jx,civic:Zx,hospital:ty,school:ey,university:ny,stadium:iy,park:sy,plaza:ry,landmark:hy,port:ay,airport:ly,transit:cy,rubble:uy};function bd(i,t,e,n=!0){const s=t.building[e];if(!s)return;const r=we(s),o=or(e),a=ar(e),l=!!(r.grown&&t.condition[e]===0&&t.age[e]>4),c=(o*73856093^a*19349663^t.variant[e]*83492791^s*2654435761)>>>0,h=r.grown?.88+bt(o,a,t.variant[e]+41)*.24:1,u={def:r,key:r.key,w:r.w,h:r.h,level:t.level[e]||r.level||1,seedI:c,r:is(c),ht:Math.max(.2,(r.height??2.5)*h),abandoned:l};i.setFrame(o,t.height[e],a,r.w,r.h,t.rotation[e]),i.collect=n;const d=i.v,f=qe.length;if(t.onFire[e]?i.box(.08,0,.08,r.w-.08,Math.min(u.ht,3),r.h-.08,A(9390384,1),A(3813421,1)):dy[r.archetype](i,u),n&&!t.onFire[e]&&u.ht>20){let g=!1;for(let v=f;v<qe.length;v++)g||(g=qe[v].kind===1);if(!g){const[v,m,p]=i.toWorld(r.w*.5,u.ht+.12,r.h*.5);qe.push({kind:1,x:v,y:m,z:p,yaw:0,speed:1,phase:bt(u.seedI,83,3),scale:.22})}}if(l||t.onFire[e]){const g=!!t.onFire[e];for(let v=d;v<i.v;v++){const m=v*3;if(g)i.col[m]=i.col[m]*.35+.55,i.col[m+1]*=.22,i.col[m+2]*=.08;else{const p=(i.col[m]+i.col[m+1]+i.col[m+2])/3;i.col[m]=Ut(i.col[m],p,.55)*.48,i.col[m+1]=Ut(i.col[m+1],p,.55)*.48,i.col[m+2]=Ut(i.col[m+2],p,.55)*.48}i.emi[v]=0}}}function Sd(i){const t=new ln;return t.setAttribute("position",new Pe(i.pos.slice(0,i.v*3),3)),t.setAttribute("normal",new Pe(i.nor.slice(0,i.v*3),3)),t.setAttribute("color",new Pe(i.col.slice(0,i.v*3),3)),t.setAttribute("aEmissive",new Pe(i.emi.slice(0,i.v),1)),t.setIndex(new Pe(i.ind.slice(0,i.ic),1)),t.computeBoundingSphere(),t}class fy{constructor(t,e){L(this,"scene");L(this,"grid");L(this,"sink",new Dx);L(this,"chunks",new Array(Ve*Xn).fill(null));L(this,"chunkAnims",Array.from({length:Ve*Xn},()=>[]));L(this,"suppressed",new Set);L(this,"pops",[]);L(this,"material");L(this,"nightUniform",{value:0});L(this,"animMaterial");L(this,"rotorMesh",null);L(this,"beaconMesh",null);L(this,"radarMesh",null);L(this,"rotorSpots",[]);L(this,"beaconSpots",[]);L(this,"radarSpots",[]);L(this,"matrix",new Me);L(this,"position",new N);L(this,"quaternion",new Di);L(this,"scale",new N);L(this,"qYaw",new Di);L(this,"qSpin",new Di);L(this,"disposed",!1);this.scene=t,this.grid=e,this.material=new qa({vertexColors:!0}),this.material.onBeforeCompile=n=>{n.uniforms.uNight=this.nightUniform,n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
attribute float aEmissive;
varying float vBuildingEmissive;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vBuildingEmissive = aEmissive;`),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform float uNight;
varying float vBuildingEmissive;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
          float eBand = floor(vBuildingEmissive);
          float eStrength = fract(vBuildingEmissive);
          float eGate = smoothstep(eBand < 0.5 ? 0.42 : (eBand < 1.5 ? 0.22 : 0.08), 0.82, uNight);
          vec3 eColour = eBand < 0.5 ? vec3(1.0, 0.694, 0.254) : vColor;
          totalEmissiveRadiance += eColour * eStrength * eGate * 1.8;`)},this.material.customProgramCacheKey=()=>"sethcity-building-emissive-v1",this.animMaterial=new Pu({color:15198956,roughness:.55,metalness:.3}),this.rebuildAll()}rebuildAll(){if(!this.disposed){for(let t=0;t<Xn;t++)for(let e=0;e<Ve;e++)this.rebuildChunkInternal(e,t,!1);this.rebuildAnimatedMeshes()}}rebuildChunk(t,e){this.rebuildChunkInternal(t,e,!0)}rebuildChunkInternal(t,e,n){if(this.disposed||t<0||e<0||t>=Ve||e>=Xn)return;const s=e*Ve+t,r=this.chunks[s];r&&(this.scene.remove(r),r.geometry.dispose(),this.chunks[s]=null),this.sink.reset(),qe=[];const o=t*ie,a=e*ie;for(let l=a;l<a+ie;l++)for(let c=o;c<o+ie;c++){const h=dt(c,l);!this.grid.building[h]||this.grid.originOffset[h]!==0||this.suppressed.has(h)||bd(this.sink,this.grid,h)}if(this.chunkAnims[s]=qe,this.sink.v){const l=new Oe(Sd(this.sink),this.material);l.name=`buildings-${t}-${e}`,l.castShadow=!0,l.receiveShadow=!0,l.frustumCulled=!0,this.scene.add(l),this.chunks[s]=l}n&&this.rebuildAnimatedMeshes()}update(t,e,n){if(!this.disposed){this.nightUniform.value=$t(n,0,1),this.updateRotors(e),this.updateRadars(e),this.updateBeacons(e,n);for(let s=this.pops.length-1;s>=0;s--){const r=this.pops[s];r.t+=t/.5;const o=Math.min(1,r.t),a=o===1?1:Math.pow(2,-9*o)*Math.sin((o*9-.7)*Math.PI)+1;r.mesh.scale.set(a,Math.max(.02,a),a),r.mesh.position.y=r.baseY,o>=1&&(this.scene.remove(r.mesh),r.mesh.geometry.dispose(),this.suppressed.delete(r.i),this.pops.splice(s,1),this.rebuildChunkInternal(or(r.i)/ie|0,ar(r.i)/ie|0,!0))}}}popIn(t){if(this.disposed||!this.grid.building[t])return;const e=this.grid.originOffset[t]===0?t:this.grid.originOf(or(t),ar(t));if(e<0||this.suppressed.has(e)||(this.suppressed.add(e),this.rebuildChunkInternal(or(e)/ie|0,ar(e)/ie|0,!0),this.sink.reset(),qe=[],bd(this.sink,this.grid,e,!1),!this.sink.v))return;const n=new Oe(Sd(this.sink),this.material),s=we(this.grid.building[e]),r=or(e)+s.w*.5,o=ar(e)+s.h*.5;n.geometry.translate(-r,-this.grid.height[e],-o),n.position.set(r,this.grid.height[e],o),n.scale.setScalar(.02),n.castShadow=!0,this.scene.add(n),this.pops.push({i:e,t:0,mesh:n,baseY:this.grid.height[e]})}dispose(){if(!this.disposed){this.disposed=!0;for(const t of this.chunks)t&&(this.scene.remove(t),t.geometry.dispose());for(const t of this.pops)this.scene.remove(t.mesh),t.mesh.geometry.dispose();this.removeAnimatedMeshes(),this.material.dispose(),this.animMaterial.dispose(),this.pops.length=0,this.suppressed.clear()}}removeAnimatedMeshes(){for(const t of[this.rotorMesh,this.beaconMesh,this.radarMesh])t&&(this.scene.remove(t),t.geometry.dispose(),t.material!==this.animMaterial&&t.material.dispose());this.rotorMesh=null,this.beaconMesh=null,this.radarMesh=null}rebuildAnimatedMeshes(){this.removeAnimatedMeshes(),this.rotorSpots=[],this.beaconSpots=[],this.radarSpots=[];for(const t of this.chunkAnims)for(const e of t)e.kind===0?this.rotorSpots.push(e):e.kind===1?this.beaconSpots.push(e):this.radarSpots.push(e);if(this.rotorSpots.length){const t=new es(.075,1,.035);t.translate(0,.48,0),this.rotorMesh=new ba(t,this.animMaterial,this.rotorSpots.length*3),this.rotorMesh.name="building-wind-rotors",this.rotorMesh.frustumCulled=!1,this.scene.add(this.rotorMesh)}if(this.beaconSpots.length){const t=new Eh(.07,0),e=new Pu({color:16719896,emissive:16715784,emissiveIntensity:0});this.beaconMesh=new ba(t,e,this.beaconSpots.length),this.beaconMesh.name="building-aviation-beacons",this.beaconMesh.frustumCulled=!1,this.scene.add(this.beaconMesh)}if(this.radarSpots.length){const t=new es(.75,.06,.16);this.radarMesh=new ba(t,this.animMaterial,this.radarSpots.length),this.radarMesh.name="building-radars",this.radarMesh.frustumCulled=!1,this.scene.add(this.radarMesh)}}updateRotors(t){if(!this.rotorMesh)return;let e=0;for(const n of this.rotorSpots)for(let s=0;s<3;s++)this.position.set(n.x,n.y,n.z),this.qYaw.setFromAxisAngle(this.position.set(0,1,0),n.yaw),this.qSpin.setFromAxisAngle(this.position.set(0,0,1),t*n.speed+n.phase+s*Math.PI*2/3),this.quaternion.copy(this.qYaw).multiply(this.qSpin),this.position.set(n.x,n.y,n.z),this.scale.set(n.scale,n.scale,n.scale),this.matrix.compose(this.position,this.quaternion,this.scale),this.rotorMesh.setMatrixAt(e++,this.matrix);this.rotorMesh.instanceMatrix.needsUpdate=!0}updateRadars(t){if(this.radarMesh){for(let e=0;e<this.radarSpots.length;e++){const n=this.radarSpots[e];this.position.set(n.x,n.y,n.z),this.quaternion.setFromAxisAngle(this.scale.set(0,1,0),t*n.speed+n.phase),this.scale.setScalar(n.scale),this.matrix.compose(this.position,this.quaternion,this.scale),this.radarMesh.setMatrixAt(e,this.matrix)}this.radarMesh.instanceMatrix.needsUpdate=!0}}updateBeacons(t,e){if(!this.beaconMesh)return;for(let s=0;s<this.beaconSpots.length;s++){const r=this.beaconSpots[s],o=Math.max(.08,Math.pow(Math.max(0,Math.sin(t*3.4+r.phase*Math.PI*2)),12));this.position.set(r.x,r.y,r.z),this.quaternion.identity(),this.scale.setScalar(r.scale*(.6+o*.7)),this.matrix.compose(this.position,this.quaternion,this.scale),this.beaconMesh.setMatrixAt(s,this.matrix)}this.beaconMesh.instanceMatrix.needsUpdate=!0;const n=this.beaconMesh.material;n.emissiveIntensity=$t(e,0,1)*(.5+Math.pow(Math.max(0,Math.sin(t*3.4)),10)*3.5)}}function py(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new ln;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Ed(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][d]);const g=Ed(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Ed(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Pe(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const v=h.getComponent(d,g);a.setComponent(d+u,g,v)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const Gn=new Me,Ta=new N,Aa=new N,Ca=new Di,Ha=new $n,Td=new N(0,1,0),Ce=new at,my=new at,tr=[0,1,0,-1],er=[-1,0,1,0];function Ct(i,t,e=0,n=0,s=0,r={}){const o=i.index?i.toNonIndexed():i;o!==i&&i.dispose(),Ha.set(r.rx??0,r.ry??0,r.rz??0),Gn.compose(Ta.set(e,n,s),Ca.setFromEuler(Ha),Aa.set(r.sx??1,r.sy??1,r.sz??1)),o.applyMatrix4(Gn);const a=o.attributes.position.count,l=new Float32Array(a*3);Ce.setHex(t);for(let h=0;h<a;h++)l[h*3]=Ce.r,l[h*3+1]=Ce.g,l[h*3+2]=Ce.b;o.setAttribute("color",new Pe(l,3));const c=new Float32Array(a).fill(r.emissive??0);return o.setAttribute("aEmissive",new Pe(c,1)),o.getAttribute("uv")&&o.deleteAttribute("uv"),o}function _n(i){const t=py(i,!1);for(const e of i)e.dispose();return t.computeVertexNormals(),t}const Ht=(i,t,e)=>new es(i,t,e),vo=i=>new Sh(i,0),Ad=(i,t,e)=>new bh(i,t,e);function gy(){return _n([Ct(Ht(.07,.3,.07),7164216,0,.14,0),Ct(Ad(.3,.62,6),16777215,0,.56,0),Ct(Ad(.2,.46,6),16777215,0,.94,0)])}function vy(){return _n([Ct(Ht(.08,.32,.08),7164216,0,.15,0),Ct(vo(.3),16777215,0,.52,0,{sy:.92}),Ct(vo(.17),16777215,.15,.4,.09)])}function _y(){const i=[Ct(Ht(.07,.42,.07),9072461,.02,.2,0,{rz:-.08}),Ct(Ht(.06,.4,.06),9072461,.07,.55,0,{rz:-.14})];for(let t=0;t<6;t++){const e=new mi(.44,.13);e.translate(.24,0,0),i.push(Ct(e,6136396,.1,.76,0,{rz:-.5,ry:t*Math.PI/3}))}return _n(i)}function xy(){return _n([Ct(Ht(.07,.44,.07),16777215,0,.21,0),Ct(Ht(.035,.3,.035),16777215,.08,.46,.02,{rz:-.7}),Ct(Ht(.035,.26,.035),16777215,-.07,.42,-.02,{rz:.65}),Ct(Ht(.03,.22,.03),16777215,.02,.5,.07,{rx:.6})])}function yy(){return _n([Ct(vo(.17),16777215,0,.05,0,{sy:.62})])}function My(){return _n([Ct(vo(.14),16777215,0,.09,0,{sy:.72}),Ct(vo(.09),16777215,.1,.07,.05,{sy:.7})])}function wy(){return _n([Ct(Ht(.035,.62,.035),3817285,0,.31,0),Ct(Ht(.16,.028,.028),3817285,.08,.62,0),Ct(Ht(.09,.035,.055),16773836,.14,.6,0,{emissive:1})])}function by(){const i=[Ct(Ht(.04,.55,.04),3093304,0,.275,0),Ct(Ht(.07,.22,.08),2369323,.015,.66,0)],t=[[16725284,1,.735],[16757796,2,.66],[3137642,3,.585]];for(const[e,n,s]of t)i.push(Ct(new mi(.045,.045),e,.052,s,0,{ry:Math.PI/2,emissive:n}));return _n(i)}function Sy(){return _n([Ct(Ht(.32,.03,.11),10122569,0,.13,0),Ct(Ht(.32,.11,.025),10122569,0,.21,-.05),Ct(Ht(.03,.13,.1),4867648,-.13,.065,0),Ct(Ht(.03,.13,.1),4867648,.13,.065,0)])}function Ey(){return _n([Ct(Ht(.04,.3,.04),10521192,-.45,.15,0),Ct(Ht(.04,.3,.04),10521192,0,.15,0),Ct(Ht(.04,.3,.04),10521192,.45,.15,0),Ct(Ht(.96,.03,.025),10521192,0,.12,0),Ct(Ht(.96,.03,.025),10521192,0,.24,0)])}function Ty(){return _n([Ct(Ht(.5,.09,.2),16777215,0,.05,0),Ct(Ht(.14,.08,.13),16777215,.3,.05,0,{ry:Math.PI/4}),Ct(Ht(.14,.09,.13),15262418,-.08,.14,0),Ct(Ht(.018,.44,.018),9072461,.04,.32,0),Ct(new mi(.26,.32),16118246,.19,.36,0)])}function Ay(){return _n([Ct(Ht(.34,.1,.17),16777215,0,.09,0),Ct(Ht(.17,.08,.15),2304564,-.02,.18,0),Ct(Ht(.02,.03,.04),16773320,.17,.1,.055,{emissive:1}),Ct(Ht(.02,.03,.04),16773320,.17,.1,-.055,{emissive:1}),Ct(Ht(.02,.026,.036),14694956,-.17,.1,.055,{emissive:1}),Ct(Ht(.02,.026,.036),14694956,-.17,.1,-.055,{emissive:1})])}function Cy(){return _n([Ct(Ht(.6,.19,.19),16777215,0,.15,0),Ct(Ht(.55,.06,.195),2568509,0,.21,0),Ct(Ht(.02,.035,.05),16773320,.3,.11,.06,{emissive:1}),Ct(Ht(.02,.035,.05),16773320,.3,.11,-.06,{emissive:1}),Ct(Ht(.02,.03,.045),14694956,-.3,.11,.06,{emissive:1}),Ct(Ht(.02,.03,.045),14694956,-.3,.11,-.06,{emissive:1})])}function Ry(){return _n([Ct(Ht(.14,.15,.17),16777215,.19,.12,0),Ct(Ht(.34,.2,.18),15330279,-.08,.16,0),Ct(Ht(.02,.035,.045),16773320,.26,.1,.055,{emissive:1}),Ct(Ht(.02,.035,.045),16773320,.26,.1,-.055,{emissive:1}),Ct(Ht(.02,.03,.04),14694956,-.25,.1,.055,{emissive:1}),Ct(Ht(.02,.03,.04),14694956,-.25,.1,-.055,{emissive:1})])}function Py(){return _n([Ct(new Mh(.032,.08,2,6),16777215,0,.1,0),Ct(new Xa(.026,6,5),15254426,0,.19,0)])}function Ly(){return{cur:-1,prev:-1,nxt:-1,ex:0,ez:0,cx:0,cz:0,xx:0,xz:0,t:0,sp:1,lane:.16}}const Cd=[4685626,3896632,5008955,9086609],Dy=[7123019,5214783,12745519,7123019],Iy=[6134340,5016124,11042614,8224628],Uy=7297865,Ny=[13777716,15263978,3040192,2829619,13158863,14394938,5086294,8950432],Fy=[3844e3,14715450,14270783],ky=[11553340,4026280,5601870,9080726],Oy=[14241603,4161474,14923066,5808220,10120130,14738150,3488063],Rd=[14212578,13065034,4882375,14725439],By=6200;class zy{constructor(t,e,n){L(this,"scene");L(this,"grid");L(this,"state");L(this,"matGlow");L(this,"matTL");L(this,"uNight",{value:0});L(this,"uPhase",{value:3});L(this,"conifer");L(this,"leaf");L(this,"palm");L(this,"bare");L(this,"rock");L(this,"bush");L(this,"lamp");L(this,"tlight");L(this,"bench");L(this,"fence");L(this,"boat");L(this,"car");L(this,"bus");L(this,"truck");L(this,"ped");L(this,"cars",[]);L(this,"buses",[]);L(this,"trucks",[]);L(this,"peds",[]);L(this,"nCars",0);L(this,"nBuses",0);L(this,"nTrucks",0);L(this,"nPeds",0);L(this,"roadList",[]);L(this,"walkList",[]);L(this,"boatAnchors",[]);L(this,"staticDirty",!0);L(this,"staticTimer",0);L(this,"lastSeason",-1);L(this,"signKey","");L(this,"signRoot");L(this,"signPostGeo");this.scene=t,this.grid=e,this.state=n,this.matGlow=this.makeGlowMaterial(!1),this.matTL=this.makeGlowMaterial(!0),this.conifer=this.pool(gy(),3600,this.matGlow,!0),this.leaf=this.pool(vy(),3200,this.matGlow,!0),this.palm=this.pool(_y(),700,this.matGlow,!0),this.bare=this.pool(xy(),3200,this.matGlow,!0),this.rock=this.pool(yy(),1200,this.matGlow,!0),this.bush=this.pool(My(),1600,this.matGlow,!1),this.lamp=this.pool(wy(),1400,this.matGlow,!0),this.tlight=this.pool(by(),240,this.matTL,!1),this.bench=this.pool(Sy(),500,this.matGlow,!1),this.fence=this.pool(Ey(),1600,this.matGlow,!1),this.boat=this.pool(Ty(),16,this.matGlow,!0,!0),this.car=this.pool(Ay(),220,this.matGlow,!0,!0),this.bus=this.pool(Cy(),24,this.matGlow,!0,!0),this.truck=this.pool(Ry(),20,this.matGlow,!0,!0),this.ped=this.pool(Py(),90,this.matGlow,!1,!0),this.signRoot=new bs,this.scene.add(this.signRoot),this.signPostGeo=_n([Ct(Ht(.05,.62,.05),7035461,-.4,.31,0),Ct(Ht(.05,.62,.05),7035461,.4,.31,0)])}rebuildAll(){this.rebuildStatics(),this.rebuildGraph(),this.staticDirty=!1,this.staticTimer=.25}rebuildChunk(t,e){this.staticDirty=!0}update(t,e,n,s){this.state=s,s.time.season!==this.lastSeason&&(this.lastSeason=s.time.season,this.staticDirty=!0),this.staticTimer-=t,this.staticDirty&&this.staticTimer<=0&&(this.rebuildStatics(),this.rebuildGraph(),this.staticDirty=!1,this.staticTimer=.25),this.uNight.value=n;const r=e%10;this.uPhase.value=r<4.5?3:r<5.5?2:1,this.syncSigns(),this.updateVehicles(t,s),this.updateBoats(e)}dispose(){const t=[this.conifer,this.leaf,this.palm,this.bare,this.rock,this.bush,this.lamp,this.tlight,this.bench,this.fence,this.boat,this.car,this.bus,this.truck,this.ped];for(const e of t)this.scene.remove(e),e.geometry.dispose(),e.dispose();this.clearSigns(),this.scene.remove(this.signRoot),this.signPostGeo.dispose(),this.matGlow.dispose(),this.matTL.dispose()}makeGlowMaterial(t){const e=new qa({vertexColors:!0,side:ei}),n=this.uNight,s=this.uPhase;return e.onBeforeCompile=r=>{r.uniforms.uNight=n,t&&(r.uniforms.uPhase=s),r.vertexShader=`attribute float aEmissive;
varying float vEmissive;
`+r.vertexShader.replace("#include <color_vertex>",`#include <color_vertex>
	vEmissive = aEmissive;`);const o=t?"totalEmissiveRadiance += vColor.rgb * ((abs(vEmissive - uPhase) < 0.5) ? 1.2 : 0.06) * step(0.5, vEmissive) * (0.35 + 0.65 * uNight);":"totalEmissiveRadiance += vColor.rgb * vEmissive * uNight * 1.7;";r.fragmentShader=`varying float vEmissive;
uniform float uNight;
`+(t?`uniform float uPhase;
`:"")+r.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
	`+o)},e.customProgramCacheKey=()=>t?"sethcity-props-tl":"sethcity-props",e}pool(t,e,n,s,r=!1){const o=new ba(t,n,e);return o.count=0,o.castShadow=s,o.receiveShadow=!0,o.frustumCulled=!1,r&&o.instanceMatrix.setUsage(Hp),this.scene.add(o),o}put(t,e,n,s,r,o,a,l,c=-1){return e>=t.instanceMatrix.count?e:(Gn.compose(Ta.set(n,s,r),Ca.setFromAxisAngle(Td,o),Aa.set(a,c<0?a:c,a)),t.setMatrixAt(e,Gn),l&&t.setColorAt(e,l),e+1)}rebuildStatics(){const t=this.grid,e=this.state.time.season,n=e===3;let s=0,r=0,o=0,a=0,l=0,c=0,h=0,u=0,d=0,f=0,g=0;for(let p=0;p<j;p++)t.tree[p]&&!t.building[p]&&!t.road[p]&&!t.rail[p]&&!t.water[p]&&(g+=t.tree[p]);const v=g>0?Math.min(1,By/g):1,m=[];for(let p=0;p<lt;p++)for(let y=0;y<R;y++){const _=dt(y,p),x=t.height[_],T=t.building[_],M=!T&&!t.road[_]&&!t.rail[_]&&!t.water[_];if(t.tree[_]&&M){const w=t.terrain[_];for(let E=0;E<t.tree[_];E++){if(bt(y,p,77+E)>v)continue;const b=.15+.7*bt(y,p,90+E),S=.15+.7*bt(y,p,110+E),D=bt(y,p,130+E)*Math.PI*2,k=.75+.55*bt(y,p,150+E),U=.86+.28*bt(y,p,170+E);w===ne.Sand?(Ce.setHex(16777215).multiplyScalar(U),o=this.put(this.palm,o,y+b,x,p+S,D,k,Ce)):w===ne.Rock||w===ne.Snow?(Ce.setHex(Cd[e]).multiplyScalar(U),s=this.put(this.conifer,s,y+b,x,p+S,D,k*.9,Ce)):bt(y,p,190+E)<(w===ne.Forest?.6:.45)?(Ce.setHex(Cd[e]).multiplyScalar(U),s=this.put(this.conifer,s,y+b,x,p+S,D,k,Ce)):n?(Ce.setHex(Uy).multiplyScalar(U),a=this.put(this.bare,a,y+b,x,p+S,D,k,Ce)):(Ce.setHex(Dy[e]).multiplyScalar(U),e===2&&Ce.lerp(my.setHex(14197815),bt(y,p,210+E)*.55),r=this.put(this.leaf,r,y+b,x,p+S,D,k,Ce))}}if(M&&!t.tree[_]){const w=t.terrain[_],E=bt(y,p,230);(w===ne.Rock&&E<.2||w!==ne.Rock&&E<.012)&&(Ce.setHex(9078140).multiplyScalar(.8+.4*bt(y,p,231)),l=this.put(this.rock,l,y+.2+.6*bt(y,p,232),x,p+.2+.6*bt(y,p,233),bt(y,p,234)*Math.PI*2,.55+.9*bt(y,p,235),Ce));const b=bt(y,p,240);(w===ne.Grass||w===ne.Forest)&&b<.05&&(Ce.setHex(Iy[e]).multiplyScalar(.85+.3*bt(y,p,241)),c=this.put(this.bush,c,y+.2+.6*bt(y,p,242),x,p+.2+.6*bt(y,p,243),bt(y,p,244)*Math.PI*2,.7+.7*bt(y,p,245),Ce))}if(t.road[_]){for(const w of $f(t,y,p))h=this.put(this.lamp,h,w.wx,w.wy,w.wz,w.rotY,1,null);if(!t.water[_]&&!t.tunnel[_]){const w=ka(t,y,p);let E=0;for(let S=0;S<4;S++)w&1<<S&&E++;const b=t.road[_];if(E>=3&&(b===Ue.Avenue||E===4)){const S=Ea(t,y+.12,p+.12)+ao;if(u=this.put(this.tlight,u,y+.12,S,p+.12,-Math.PI/4,1,null),E===4){const D=Ea(t,y+.88,p+.88)+ao;u=this.put(this.tlight,u,y+.88,D,p+.88,Math.PI*.75,1,null)}}}}if(T){const w=we(T);if((w.archetype==="park"||w.archetype==="plaza")&&bt(y,p,250)<.55&&(Ce.setHex(16777215),d=this.put(this.bench,d,y+.25+.5*bt(y,p,251),x,p+.25+.5*bt(y,p,252),bt(y,p,253)*Math.PI*2,1,null)),w.archetype==="farm")for(let E=0;E<4;E++){const b=y+tr[E],S=p+er[E];if(zt(b,S)&&t.building[dt(b,S)]===T||zt(b,S)&&t.road[dt(b,S)])continue;const k=E===0||E===2?0:Math.PI/2,U=y+.5+tr[E]*.46,z=p+.5+er[E]*.46;f=this.put(this.fence,f,U,x,z,k,1,null)}}if(t.water[_]&&x<Ji-.45&&y%4===1&&p%4===2&&y>2&&p>2&&y<R-3&&p<lt-3){let w=!0;for(let E=-2;E<=2&&w;E++)for(let b=-2;b<=2;b++)if(!t.water[dt(y+b,p+E)]){w=!1;break}w&&m.push(_)}}this.finishPool(this.conifer,s),this.finishPool(this.leaf,r),this.finishPool(this.palm,o),this.finishPool(this.bare,a),this.finishPool(this.rock,l),this.finishPool(this.bush,c),this.finishPool(this.lamp,h),this.finishPool(this.tlight,u),this.finishPool(this.bench,d),this.finishPool(this.fence,f),this.boatAnchors.length=0;for(const p of m){if(this.boatAnchors.length>=14)break;const y=p%R+.5,_=(p/R|0)+.5;let x=!0;for(const T of this.boatAnchors)if(Math.max(Math.abs(T.x-y),Math.abs(T.z-_))<8){x=!1;break}x&&this.boatAnchors.push({x:y,z:_,phase:bt(p,7,3)*Math.PI*2,r:.5+bt(p,11,5)*.5})}for(let p=0;p<this.boatAnchors.length;p++)Ce.setHex(Rd[p%Rd.length]),this.boat.setColorAt(p,Ce);this.boat.count=this.boatAnchors.length,this.boat.instanceColor&&(this.boat.instanceColor.needsUpdate=!0)}finishPool(t,e){t.count=e,t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0)}rebuildGraph(){const t=this.grid;this.roadList.length=0,this.walkList.length=0;for(let e=0;e<j;e++){if(!t.road[e])continue;this.roadList.push(e);const n=t.road[e];if((n===Ue.Street||n===Ue.Avenue)&&!t.water[e]&&!t.tunnel[e]){const s=e%R,r=e/R|0;let o=!1;for(let a=0;a<4&&!o;a++){const l=s+tr[a],c=r+er[a];if(!zt(l,c))continue;const h=dt(l,c);o=t.population[h]+t.jobs[h]>20}o&&this.walkList.push(e)}}for(const e of[this.cars,this.buses,this.trucks,this.peds])for(const n of e)n.cur>=0&&!t.road[n.cur]&&(n.cur=-1)}laneFor(t,e){if(e)return .42;const n=this.grid.road[t];return n===Ue.Avenue?.27:n===Ue.Highway?.22:.155}speedFor(t,e,n){if(e)return .3;const s=this.grid,r=s.road[t];let o=(r===Ue.Highway?3.2:r===Ue.Avenue?2.1:1.4)*n;const a=t%R,l=t/R|0,c=ka(s,a,l);let h=0;for(let u=0;u<4;u++)c&1<<u&&h++;return h>=3&&(o*=.55),o}walkOk(t){const e=this.grid.road[t];return e===Ue.Street||e===Ue.Avenue}pickNext(t,e,n){const s=this.grid,r=t%R,o=t/R|0;let a=0,l=-1,c=-1,h=-1;const u=e>=0?e%R:-99,d=e>=0?e/R|0:-99,f=r-u,g=o-d;let v=-1;for(let p=0;p<4;p++){const y=r+tr[p],_=o+er[p];if(!zt(y,_))continue;const x=dt(y,_);s.road[x]&&(n&&!this.walkOk(x)||x!==e&&(tr[p]===f&&er[p]===g&&(v=x),a===0?l=x:a===1?c=x:h=x,a++))}if(a===0)return e>=0&&s.road[e]?e:-1;if(v>=0&&Math.random()<.65)return v;const m=Math.random()*a|0;return m===0?l:m===1?c:h}setSegment(t,e,n){const s=t.cur%R+.5,r=(t.cur/R|0)+.5,o=t.nxt%R+.5,a=(t.nxt/R|0)+.5,l=Math.sign(o-s),c=Math.sign(a-r);t.lane=this.laneFor(t.cur,e),t.xx=s+l*.5+-c*t.lane,t.xz=r+c*.5+l*t.lane;const h=Math.sign(s-((t.prev>=0?t.prev%R:t.cur%R)+.5)),u=Math.sign(r-((t.prev>=0?t.prev/R|0:t.cur/R|0)+.5));h!==0&&c!==0?(t.cx=t.xx,t.cz=t.ez):u!==0&&l!==0?(t.cx=t.ex,t.cz=t.xz):(t.cx=(t.ex+t.xx)*.5,t.cz=(t.ez+t.xz)*.5),t.sp=this.speedFor(t.cur,e,n)}spawn(t,e,n,s){if(e.length===0)return!1;const r=e[Math.random()*e.length|0],o=this.pickNext(r,-1,n);if(o<0)return!1;t.cur=r,t.prev=-1,t.nxt=o,t.t=Math.random()*.5;const a=r%R+.5,l=(r/R|0)+.5,c=Math.sign(o%R+.5-a),h=Math.sign((o/R|0)+.5-l),u=this.laneFor(r,n);return t.ex=a-c*.5+-h*u,t.ez=l-h*.5+c*u,this.setSegment(t,n,s),!0}advance(t,e,n){if(t.prev=t.cur,t.cur=t.nxt,t.cur<0||!this.grid.road[t.cur])return!1;const s=this.pickNext(t.cur,t.prev,e);return s<0?!1:(t.nxt=s,t.ex=t.xx,t.ez=t.xz,this.setSegment(t,e,n),!0)}stepPool(t,e,n,s,r,o,a,l,c,h){let u=0;for(;e<n&&u<3&&(t.length<=e&&t.push(Ly()),!!this.spawn(t[e],s,r,o));)Ce.setHex(l[Math.random()*l.length|0]),Ce.multiplyScalar(.85+Math.random()*.3),a.setColorAt(e,Ce),a.instanceColor&&(a.instanceColor.needsUpdate=!0),e++,u++;e>n&&(e=n);const d=this.grid;for(let f=0;f<e;f++){const g=t[f];if((g.cur<0||!d.road[g.cur])&&!this.spawn(g,s,r,o)){g.cur=-1,Gn.makeScale(0,0,0),a.setMatrixAt(f,Gn);continue}g.t+=c*g.sp;let v=0;for(;g.t>=1&&v++<3;)if(g.t-=1,!this.advance(g,r,o)&&!this.spawn(g,s,r,o)){g.cur=-1;break}if(g.cur<0){Gn.makeScale(0,0,0),a.setMatrixAt(f,Gn);continue}const m=g.t,p=1-m,y=p*p*g.ex+2*m*p*g.cx+m*m*g.xx,_=p*p*g.ez+2*m*p*g.cz+m*m*g.xz;let x=2*p*(g.cx-g.ex)+2*m*(g.xx-g.cx),T=2*p*(g.cz-g.ez)+2*m*(g.xz-g.cz);Math.abs(x)+Math.abs(T)<1e-5&&(x=1,T=0);const M=Math.atan2(-T,x),w=Ea(d,y,_)+h;Gn.compose(Ta.set(y,w,_),Ca.setFromAxisAngle(Td,M),Aa.set(1,1,1)),a.setMatrixAt(f,Gn)}return a.count=e,a.instanceMatrix.needsUpdate=!0,e}updateVehicles(t,e){const n=e.stats.population,s=e.stats.traffic,r=this.roadList,o=r.length===0,a=o?0:Math.min(220,Math.round(4+n*.012+s*90),r.length*2),l=o?0:Math.min(24,Math.floor(n/900)),c=o?0:Math.min(20,2+Math.floor(e.stats.indBuildings*.4)),h=this.walkList.length===0?0:Math.min(90,Math.floor(n/120));this.nCars=this.stepPool(this.cars,this.nCars,a,r,!1,1,this.car,Ny,t,.015),this.nBuses=this.stepPool(this.buses,this.nBuses,l,r,!1,.8,this.bus,Fy,t,.015),this.nTrucks=this.stepPool(this.trucks,this.nTrucks,c,r,!1,.85,this.truck,ky,t,.015),this.nPeds=this.stepPool(this.peds,this.nPeds,h,this.walkList,!0,1,this.ped,Oy,t,ao)}updateBoats(t){const e=this.boatAnchors.length;for(let n=0;n<e;n++){const s=this.boatAnchors[n],r=t*.07+s.phase,o=s.x+Math.cos(r)*s.r,a=s.z+Math.sin(r)*s.r,l=Ji+.045+Math.sin(t*1.25+s.phase*3)*.02,c=Math.atan2(-Math.cos(r),-Math.sin(r));Ha.set(Math.sin(t*.9+s.phase)*.05,c,Math.sin(t*1.1+s.phase)*.06),Gn.compose(Ta.set(o,l,a),Ca.setFromEuler(Ha),Aa.set(1,1,1)),this.boat.setMatrixAt(n,Gn)}e>0&&(this.boat.instanceMatrix.needsUpdate=!0)}clearSigns(){for(const t of[...this.signRoot.children])this.signRoot.remove(t),t.traverse(e=>{const n=e;if(n.isMesh){n.geometry!==this.signPostGeo&&n.geometry.dispose();const s=n.material;if(s!==this.matGlow){const r=s;r.map&&r.map.dispose(),s.dispose()}}})}syncSigns(){const t=this.state.signs;let e=String(t.length);for(const n of t)e+="|"+n.x+","+n.y+","+n.text;if(e!==this.signKey){this.signKey=e,this.clearSigns();for(const n of t)this.buildSign(n)}}buildSign(t){if(!zt(t.x,t.y))return;const e=this.grid,n=dt(t.x,t.y),s=Math.max(e.height[n],Ji),r=document.createElement("canvas");r.width=256,r.height=96;const o=r.getContext("2d");if(o){o.fillStyle="#12452a",o.fillRect(0,0,256,96),o.strokeStyle="#e9ebe7",o.lineWidth=5,o.strokeRect(6,6,244,84),o.fillStyle="#f4f6f2",o.textAlign="center",o.textBaseline="middle";let d=40;const f=t.text||"·";do o.font=`bold ${d}px system-ui, sans-serif`,d-=2;while(d>12&&o.measureText(f).width>232);o.fillText(f,128,50)}const a=new Cf(r);a.colorSpace=An,a.anisotropy=4;const l=new bs,c=new Oe(new mi(.95,.36),new yo({map:a,side:ei}));c.position.y=.66,l.add(c);const h=new Oe(this.signPostGeo,this.matGlow);l.add(h);let u=bt(t.x,t.y,61)*Math.PI*2;for(let d=0;d<4;d++){const f=t.x+tr[d],g=t.y+er[d];if(zt(f,g)&&e.road[dt(f,g)]){u=d===0?Math.PI:d===2?0:d===1?Math.PI/2:-Math.PI/2;break}}l.rotation.y=u,l.position.set(t.x+.5,s,t.y+.5),this.signRoot.add(l)}}const Hy=[[["clear",.42],["cloudy",.26],["rain",.2],["fog",.08],["storm",.04]],[["clear",.55],["cloudy",.18],["rain",.1],["storm",.12],["fog",.05]],[["clear",.33],["cloudy",.3],["rain",.22],["fog",.12],["storm",.03]],[["clear",.3],["cloudy",.28],["snow",.3],["fog",.1],["storm",.02]]],Pd={clear:[0,0],cloudy:[.35,.75],rain:[.4,.9],storm:[.7,1],fog:[.5,.95],snow:[.4,.9]},Gy={clear:.2,cloudy:.5,rain:.9,storm:2.2,fog:.1,snow:.5},Ld=`
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
`,Dd=`
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
`;function Id(i,t){const e=new tg,n=new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]);e.setAttribute("position",new Pe(n,3)),e.setIndex([0,1,2,0,2,3]);const s=new Float32Array(i*3),r=new Float32Array(i);for(let o=0;o<i;o++)s[o*3]=t(),s[o*3+1]=t(),s[o*3+2]=t(),r[o]=t();return e.setAttribute("aSeed",new Fa(s,3)),e.setAttribute("aRand",new Fa(r,1)),e.instanceCount=i,e}function Vy(i){const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d");n.clearRect(0,0,256,256);for(let r=0;r<26;r++){const o=i()*256,a=i()*256,l=16+i()*40;for(let c=-1;c<=1;c++)for(let h=-1;h<=1;h++){const u=o+c*256,d=a+h*256;if(u<-l||u>256+l||d<-l||d>256+l)continue;const f=n.createRadialGradient(u,d,l*.1,u,d,l);f.addColorStop(0,"rgba(255,255,255,0.9)"),f.addColorStop(.55,"rgba(255,255,255,0.6)"),f.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=f,n.beginPath(),n.arc(u,d,l,0,Math.PI*2),n.fill()}}const s=new Cf(e);return s.wrapS=ho,s.wrapT=ho,s.repeat.set(2,2),s}const Ud=new N,Yl=new N;class Wy{constructor(t,e){L(this,"state",{kind:"clear",intensity:0,windX:.25,windZ:.1});L(this,"scene");L(this,"camera");L(this,"rnd",is(6192151));L(this,"clock",0);L(this,"timer",25);L(this,"targetKind","clear");L(this,"targetIntensity",0);L(this,"windTX",.25);L(this,"windTZ",.1);L(this,"rain");L(this,"rainU");L(this,"snow");L(this,"snowU");L(this,"cloud");L(this,"cloudTex");L(this,"cloudDepth");L(this,"flash");L(this,"flashT",0);L(this,"boltTimer",6);this.scene=t,this.camera=e,this.rainU={uTime:{value:0},uCenter:{value:new N(64,10,64)},uBox:{value:new N(85,48,85)},uVel:{value:new N(2,-34,1)},uSize:{value:new ht(.035,.95)},uAlpha:{value:.3},uDensity:{value:1},uSway:{value:0},uColor:{value:new at(10336460)}};const n=new Je({uniforms:this.rainU,vertexShader:Ld,fragmentShader:Dd,transparent:!0,depthWrite:!1});this.rain=new Oe(Id(1e3,this.rnd),n),this.rain.frustumCulled=!1,this.rain.renderOrder=60,this.rain.visible=!1,t.add(this.rain),this.snowU={uTime:{value:0},uCenter:{value:new N(64,10,64)},uBox:{value:new N(75,40,75)},uVel:{value:new N(.6,-2.4,.3)},uSize:{value:new ht(.09,.09)},uAlpha:{value:.8},uDensity:{value:1},uSway:{value:.55},uColor:{value:new at(16777215)}};const s=new Je({uniforms:this.snowU,vertexShader:Ld,fragmentShader:Dd,transparent:!0,depthWrite:!1});this.snow=new Oe(Id(800,this.rnd),s),this.snow.frustumCulled=!1,this.snow.renderOrder=60,this.snow.visible=!1,t.add(this.snow),this.cloudTex=Vy(this.rnd);const r=new yo({colorWrite:!1,depthWrite:!1,transparent:!0});this.cloud=new Oe(new mi(560,560),r),this.cloud.rotation.x=-Math.PI/2,this.cloud.position.set(64,72,64),this.cloud.castShadow=!0,this.cloudDepth=new Uf({depthPacking:_f,map:this.cloudTex,alphaTest:.5}),this.cloud.customDepthMaterial=this.cloudDepth,this.cloud.visible=!1,t.add(this.cloud),this.flash=new Qm(14214911,0),t.add(this.flash)}set(t,e){const[n,s]=Pd[t],r=n+(s-n)*.6;this.targetKind=t,this.targetIntensity=t==="clear"?0:se(e??r),this.state.kind=t,this.state.intensity=this.targetIntensity,this.pickWind(t),this.timer=45+this.rnd()*60}pickWind(t){const e=Gy[t]*(.7+this.rnd()*.6),n=this.rnd()*Math.PI*2;this.windTX=Math.cos(n)*e,this.windTZ=Math.sin(n)*e}pickTarget(t){const e=Hy[t];let n=this.rnd(),s="clear";for(const[a,l]of e){if(n<l){s=a;break}n-=l}const[r,o]=Pd[s];this.targetKind=s,this.targetIntensity=s==="clear"?0:r+this.rnd()*(o-r),this.pickWind(s)}update(t,e){this.clock+=t;const n=this.state;this.timer-=t,this.timer<=0&&(this.pickTarget(e.season),this.timer=30+this.rnd()*60),n.kind!==this.targetKind?(n.intensity=Math.max(0,n.intensity-t*.22),n.intensity<=.001&&(n.kind=this.targetKind)):n.intensity+=$t(this.targetIntensity-n.intensity,-t*.15,t*.12);const s=Math.min(1,t*.4);n.windX=Ut(n.windX,this.windTX,s),n.windZ=Ut(n.windZ,this.windTZ,s);const r=(this.scene.userData.quality??"high")!=="low",o=n.kind,a=n.intensity;Ud.set(0,0,-1).applyQuaternion(this.camera.quaternion),Yl.copy(this.camera.position).addScaledVector(Ud,$t(this.camera.position.y*.9,6,42)),this.rainU.uTime.value=this.clock,this.snowU.uTime.value=this.clock,this.rainU.uCenter.value.copy(Yl),this.snowU.uCenter.value.copy(Yl);const l=r&&(o==="rain"||o==="storm")&&a>.02;if(this.rain.visible=l,l){const u=o==="storm"?1.35:1;this.rainU.uDensity.value=se(a*u),this.rainU.uAlpha.value=.22+a*.2,this.rainU.uVel.value.set(n.windX*14*u,-34-a*10,n.windZ*14*u)}const c=r&&o==="snow"&&a>.02;this.snow.visible=c,c&&(this.snowU.uDensity.value=se(a),this.snowU.uAlpha.value=.6+a*.3,this.snowU.uVel.value.set(n.windX*3,-2.2-a*1.2,n.windZ*3));const h=r&&a>.05&&(o==="cloudy"||o==="rain"||o==="storm"||o==="snow");if(this.cloud.visible=h,h&&(this.cloudTex.offset.x+=n.windX*t*.004,this.cloudTex.offset.y+=n.windZ*t*.004,this.cloudDepth.alphaTest=o==="storm"?.3:o==="cloudy"?.55:.42),r&&o==="storm"&&a>.25&&(this.boltTimer-=t,this.boltTimer<=0&&(this.flashT=.26,this.boltTimer=2+this.rnd()*9)),this.flashT>0){this.flashT=Math.max(0,this.flashT-t);const u=.26-this.flashT;let d;u<.06?d=4.2:u<.11?d=.6:u<.2?d=2.6:d=.4,this.flash.intensity=d*a}else this.flash.intensity!==0&&(this.flash.intensity=0)}dispose(){this.scene.remove(this.rain,this.snow,this.cloud,this.flash),this.rain.geometry.dispose(),this.rain.material.dispose(),this.snow.geometry.dispose(),this.snow.material.dispose(),this.cloud.geometry.dispose(),this.cloud.material.dispose(),this.cloudDepth.dispose(),this.cloudTex.dispose(),this.flash.dispose()}}const ha=[0,0,0];function nr(i,t){const e=i.length-1,n=Math.min(.9999,Math.max(0,t))*e,s=n|0,r=n-s,o=i[s],a=i[s+1];return ha[0]=o[0]+(a[0]-o[0])*r,ha[1]=o[1]+(a[1]-o[1])*r,ha[2]=o[2]+(a[2]-o[2])*r,ha}const Xy=[[110,205,110],[168,168,72],[136,92,44],[70,42,20]],qy=[[64,104,228],[80,200,124],[255,206,64]],Yy=[[70,200,84],[255,190,54],[232,48,36]],$y=[[190,120,255],[120,40,200]],jy=[[255,120,90],[190,10,40]],Zy=[[210,250,250],[20,190,188]],Ky=[[255,242,178],[255,158,54],[205,32,64]],Jy=[[214,244,232],[36,186,140]],Qy=[[226,222,252],[110,84,226]],tM=[[255,224,160],[255,140,32]],eM=[[224,64,52],[240,222,96],[74,204,96]],nM={[Yt.ResLow]:[136,224,110,140],[Yt.ResMed]:[92,205,84,150],[Yt.ResHigh]:[44,180,60,160],[Yt.ComLow]:[108,176,255,140],[Yt.ComHigh]:[42,122,238,160],[Yt.IndAgri]:[216,200,96,140],[Yt.IndLight]:[236,178,64,150],[Yt.IndHeavy]:[210,140,36,160]};let ua=null;function iM(){if(!ua){ua=new Uint8Array(mr.length);for(const i of mr)(i.waterOut>0||i.key==="t_subway")&&(ua[i.id]=1)}return ua}class sM{constructor(){L(this,"texture");L(this,"data");L(this,"overlay","none");L(this,"_strength",0);this.data=new Uint8Array(j*4),this.texture=new Na(this.data,R,lt,In,ui),this.texture.magFilter=En,this.texture.minFilter=En,this.texture.generateMipmaps=!1,this.texture.needsUpdate=!0}get strength(){return this._strength}set(t){this.overlay=t,this._strength=t==="none"?0:t==="underground"?1:.85,t==="none"&&(this.data.fill(0),this.texture.needsUpdate=!0)}refresh(t){if(this.overlay==="none")return;const e=t.grid;switch(this.overlay){case"zones":this.pxZones(e);break;case"power":this.pxUtility(e,e.powered,e.wire,!1);break;case"water":this.pxUtility(e,e.watered,e.pipe,!0);break;case"pollution":this.pxPollution(e);break;case"noise":this.pxField(e.noise,$y,215,null);break;case"crime":this.pxField(e.crime,jy,220,null);break;case"landvalue":this.pxLand(e,e.landValue,qy,135);break;case"traffic":this.pxTraffic(e);break;case"transit":this.pxField(e.covTransit,Zy,200,null);break;case"density":this.pxDensity(e);break;case"health":this.pxField(e.covHealth,Jy,185,null);break;case"education":this.pxField(e.covEducation,Qy,185,null);break;case"fire":this.pxFire(e);break;case"desirability":this.pxLand(e,e.desirability,eM,140);break;case"underground":this.pxUnderground(e);break}this.texture.needsUpdate=!0}dispose(){this.texture.dispose()}pxZones(t){const e=this.data;for(let n=0;n<j;n++){const s=n*4,r=nM[t.zone[n]];r?(e[s]=r[0],e[s+1]=r[1],e[s+2]=r[2],e[s+3]=r[3]):e[s+3]=0}}pxUtility(t,e,n,s){const r=this.data;for(let o=0;o<j;o++){const a=o*4;t.building[o]!==0||t.zone[o]!==0?e[o]?(s?(r[a]=84,r[a+1]=172,r[a+2]=255):(r[a]=255,r[a+1]=232,r[a+2]=96),r[a+3]=95):(r[a]=255,r[a+1]=58,r[a+2]=42,r[a+3]=175):n[o]?e[o]?(s?(r[a]=120,r[a+1]=205,r[a+2]=255):(r[a]=255,r[a+1]=240,r[a+2]=150),r[a+3]=150):(r[a]=255,r[a+1]=96,r[a+2]=64,r[a+3]=170):r[a+3]=0}}pxPollution(t){const e=this.data;for(let n=0;n<j;n++){const s=n*4,r=t.pollution[n];if(t.water[n]&&r===0){e[s+3]=0;continue}const o=r/255,a=nr(Xy,o);e[s]=a[0],e[s+1]=a[1],e[s+2]=a[2],e[s+3]=36+o*185|0}}pxField(t,e,n,s){const r=this.data;for(let o=0;o<j;o++){const a=o*4,l=t[o];if(l===0||s&&s[o]){r[a+3]=0;continue}const c=l/255,h=nr(e,c);r[a]=h[0],r[a+1]=h[1],r[a+2]=h[2],r[a+3]=c*n|0}}pxLand(t,e,n,s){const r=this.data;for(let o=0;o<j;o++){const a=o*4;if(t.water[o]){r[a+3]=0;continue}const l=nr(n,e[o]/255);r[a]=l[0],r[a+1]=l[1],r[a+2]=l[2],r[a+3]=s}}pxTraffic(t){const e=this.data;for(let n=0;n<j;n++){const s=n*4;if(!t.road[n]){e[s+3]=0;continue}const r=nr(Yy,t.traffic[n]/255);e[s]=r[0],e[s+1]=r[1],e[s+2]=r[2],e[s+3]=205}}pxDensity(t){const e=this.data;for(let n=0;n<j;n++){const s=n*4,r=t.population[n]+t.jobs[n];if(r===0){e[s+3]=0;continue}const o=Math.min(1,r/380),a=nr(Ky,o);e[s]=a[0],e[s+1]=a[1],e[s+2]=a[2],e[s+3]=60+o*170|0}}pxFire(t){const e=this.data;for(let n=0;n<j;n++){const s=n*4;if(t.onFire[n]){e[s]=255,e[s+1]=46,e[s+2]=10,e[s+3]=245;continue}const r=t.covFire[n];if(r===0){e[s+3]=0;continue}const o=r/255,a=nr(tM,o);e[s]=a[0],e[s+1]=a[1],e[s+2]=a[2],e[s+3]=o*175|0}}pxUnderground(t){const e=this.data,n=iM();for(let s=0;s<j;s++){const r=s*4,o=t.building[s],a=t.pipe[s]!==0,l=t.subway[s]!==0;o!==0&&n[o]?(e[r]=245,e[r+1]=248,e[r+2]=255,e[r+3]=255):a&&l?((or(s)+ar(s)&1)===0?(e[r]=64,e[r+1]=172,e[r+2]=255):(e[r]=255,e[r+1]=152,e[r+2]=44),e[r+3]=235):a?(e[r]=64,e[r+1]=172,e[r+2]=255,e[r+3]=235):l?(e[r]=255,e[r+1]=152,e[r+2]=44,e[r+3]=235):(e[r]=36,e[r+1]=42,e[r+2]=54,e[r+3]=191)}}}const da=12,fa=260,$l=fn.degToRad(12),jl=fn.degToRad(78),zn=10;class rM{constructor(t,e){L(this,"target",new N(64,0,64));L(this,"_enabled",!0);L(this,"_gesturing",!1);L(this,"distance",90);L(this,"azimuth",Math.PI*.25);L(this,"polar",fn.degToRad(48));L(this,"desiredDistance",90);L(this,"desiredAzimuth",this.azimuth);L(this,"desiredPolar",this.polar);L(this,"desiredX",64);L(this,"desiredZ",64);L(this,"panVX",0);L(this,"panVZ",0);L(this,"rotV",0);L(this,"pointers",new Map);L(this,"grab",null);L(this,"lastX",0);L(this,"lastY",0);L(this,"pairDistance",0);L(this,"pairAngle",0);L(this,"pairY",0);L(this,"centroidX",0);L(this,"centroidY",0);L(this,"grid",null);L(this,"raycaster",new ig);L(this,"ndc",new ht);L(this,"plane",new $i(new N(0,1,0)));L(this,"scratch",new N);L(this,"preventMenu",t=>t.preventDefault());L(this,"onDown",t=>{if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,type:t.pointerType}),this.dom.setPointerCapture(t.pointerId),this.pointers.size>=2){this.initPair();return}this.enabled&&(this._gesturing=!0,this.lastX=t.clientX,this.lastY=t.clientY,(t.pointerType!=="mouse"||t.button===0)&&(this.grab=this.screenToGround(t.clientX,t.clientY)))});L(this,"onMove",t=>{const e=this.pointers.get(t.pointerId);if(!e)return;if(e.x=t.clientX,e.y=t.clientY,this.pointers.size>=2){const r=[...this.pointers.values()][0],o=[...this.pointers.values()][1],a=o.x-r.x,l=o.y-r.y,c=Math.max(1,Math.hypot(a,l)),h=Math.atan2(l,a),u=(r.y+o.y)*.5,d=(r.x+o.x)*.5,f=this.screenToGround(this.centroidX,this.centroidY);this.desiredDistance=fn.clamp(this.desiredDistance*this.pairDistance/c,da,fa);let g=h-this.pairAngle;g>Math.PI&&(g-=Math.PI*2),g<-Math.PI&&(g+=Math.PI*2),this.desiredAzimuth-=g,this.rotV=-g*30,this.desiredPolar=fn.clamp(this.desiredPolar+(u-this.pairY)*.004,$l,jl),this.recomputeCamera();const v=this.screenToGround(d,u);f&&v&&(this.desiredX+=f.x-v.x,this.desiredZ+=f.z-v.z),this.pairDistance=c,this.pairAngle=h,this.pairY=u,this.centroidX=d,this.centroidY=u;return}if(!this.enabled)return;const n=t.clientX-this.lastX,s=t.clientY-this.lastY;if(t.pointerType==="mouse"&&t.buttons&2){const r=-n*.006;this.desiredAzimuth+=r,this.desiredPolar=fn.clamp(this.desiredPolar+s*.005,$l,jl),this.rotV=r*30}else if(this.grab){const r=this.groundAt(t.clientX,t.clientY,this.grab.y);if(r){const o=this.grab.x-r.x,a=this.grab.z-r.z;this.desiredX+=o,this.desiredZ+=a,this.panVX=o*30,this.panVZ=a*30}}this.lastX=t.clientX,this.lastY=t.clientY});L(this,"onUp",t=>{if(this.pointers.delete(t.pointerId),this.dom.hasPointerCapture(t.pointerId)&&this.dom.releasePointerCapture(t.pointerId),this.pointers.size>=2)this.initPair();else if(this.pointers.size===1){const e=[...this.pointers.values()][0];this.lastX=e.x,this.lastY=e.y,this.grab=null}else this._gesturing=!1,this.grab=null});L(this,"onWheel",t=>{if(!this.enabled)return;t.preventDefault();const e=this.screenToGround(t.clientX,t.clientY);this.zoomBy(Math.exp(t.deltaY*.0012)),this.distance=this.desiredDistance,this.recomputeCamera();const n=this.screenToGround(t.clientX,t.clientY);e&&n&&(this.desiredX+=e.x-n.x,this.desiredZ+=e.z-n.z)});this.camera=t,this.dom=e,e.style.touchAction="none",e.addEventListener("pointerdown",this.onDown),e.addEventListener("pointermove",this.onMove),e.addEventListener("pointerup",this.onUp),e.addEventListener("pointercancel",this.onUp),e.addEventListener("wheel",this.onWheel,{passive:!1}),e.addEventListener("contextmenu",this.preventMenu)}get gesturing(){return this._gesturing}get enabled(){return this._enabled}set enabled(t){this._enabled=t,!t&&this.pointers.size<2&&(this._gesturing=!1,this.grab=null)}pointerRay(t,e){const n=this.dom.getBoundingClientRect();return this.ndc.set((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.ndc,this.camera),this.raycaster.ray}groundAt(t,e,n){return this.plane.constant=-n,this.pointerRay(t,e).intersectPlane(this.plane,this.scratch)?this.scratch.clone():null}screenToGround(t,e){let n=this.grid?Ja(this.grid,this.target.x,this.target.z):this.target.y,s=null;for(let r=0;r<3;r++){if(s=this.groundAt(t,e,n),!s)return null;this.grid&&(n=Ja(this.grid,s.x,s.z))}return s&&(s.y=n),s}screenToTile(t,e,n){const s=this.grid;this.grid=n;const r=this.screenToGround(t,e);return this.grid=s??n,!r||r.x<0||r.z<0||r.x>=R||r.z>=lt?null:{x:Math.floor(r.x),y:Math.floor(r.z)}}initPair(){const t=[...this.pointers.values()][0],e=[...this.pointers.values()][1],n=e.x-t.x,s=e.y-t.y;this.pairDistance=Math.max(1,Math.hypot(n,s)),this.pairAngle=Math.atan2(s,n),this.pairY=(t.y+e.y)*.5,this.centroidX=(t.x+e.x)*.5,this.centroidY=this.pairY,this._gesturing=!0,this.grab=null}zoomBy(t){this.desiredDistance=fn.clamp(this.desiredDistance*t,da,fa)}rotateBy(t){this.desiredAzimuth+=t,this.rotV+=t*3}focusOn(t,e,n){this.desiredX=fn.clamp(t,-zn,R+zn),this.desiredZ=fn.clamp(e,-zn,lt+zn),n!==void 0&&(this.desiredDistance=fn.clamp(n,da,fa))}recomputeCamera(){const t=Math.sin(this.polar)*this.distance;this.camera.position.set(this.target.x+Math.sin(this.azimuth)*t,this.target.y+Math.cos(this.polar)*this.distance,this.target.z+Math.cos(this.azimuth)*t),this.camera.lookAt(this.target),this.camera.updateMatrixWorld()}update(t,e){this.grid=e;const n=Math.min(t,.05);if(!this._gesturing){this.desiredX+=this.panVX*n,this.desiredZ+=this.panVZ*n,this.desiredAzimuth+=this.rotV*n;const o=Math.exp(-7*n);this.panVX*=o,this.panVZ*=o,this.rotV*=Math.exp(-8*n)}this.desiredX=fn.clamp(this.desiredX,-zn,R+zn),this.desiredZ=fn.clamp(this.desiredZ,-zn,lt+zn);const s=1-Math.exp(-14*n);this.target.x+=(this.desiredX-this.target.x)*s,this.target.z+=(this.desiredZ-this.target.z)*s,this.distance+=(this.desiredDistance-this.distance)*s,this.azimuth+=(this.desiredAzimuth-this.azimuth)*s,this.polar+=(this.desiredPolar-this.polar)*s;const r=Ja(e,this.target.x,this.target.z);this.target.y+=(r-this.target.y)*(1-Math.exp(-9*n)),this.recomputeCamera()}getPose(){return{tx:this.desiredX,tz:this.desiredZ,dist:this.desiredDistance,az:this.desiredAzimuth,pol:this.desiredPolar}}setPose(t){this.desiredX=this.target.x=fn.clamp(t.tx,-zn,R+zn),this.desiredZ=this.target.z=fn.clamp(t.tz,-zn,lt+zn),this.desiredDistance=this.distance=fn.clamp(t.dist,da,fa),this.desiredAzimuth=this.azimuth=t.az,this.desiredPolar=this.polar=fn.clamp(t.pol,$l,jl)}dispose(){this.dom.removeEventListener("pointerdown",this.onDown),this.dom.removeEventListener("pointermove",this.onMove),this.dom.removeEventListener("pointerup",this.onUp),this.dom.removeEventListener("pointercancel",this.onUp),this.dom.removeEventListener("wheel",this.onWheel),this.dom.removeEventListener("contextmenu",this.preventMenu)}}const Zl=i=>i==="bulldoze"||i==="tree"||i.startsWith("zone_")||i.startsWith("road_")||i==="rail"||i==="wire"||i==="pipe"||i==="subway";class oM{constructor(t,e){L(this,"pointer",null);L(this,"x0",0);L(this,"y0",0);L(this,"x1",0);L(this,"y1",0);L(this,"clientX",0);L(this,"clientY",0);L(this,"downX",0);L(this,"downY",0);L(this,"moved",!1);L(this,"longPressed",!1);L(this,"timer",0);L(this,"tool","inspect");L(this,"onDown",t=>{if(this.pointer!==null||t.button!==0||this.host.overUI(t.clientX,t.clientY))return;const e=this.host.controls.screenToTile(t.clientX,t.clientY,this.host.state.grid);e&&(this.pointer=t.pointerId,this.tool=this.host.state.tool,this.x0=this.x1=e.x,this.y0=this.y1=e.y,this.downX=this.clientX=t.clientX,this.downY=this.clientY=t.clientY,this.moved=this.longPressed=!1,this.tool!=="inspect"&&(this.host.controls.enabled=!1),this.tool==="inspect"&&(this.timer=window.setTimeout(()=>{this.pointer===t.pointerId&&!this.moved&&!this.host.controls.gesturing&&(this.longPressed=!0,this.selectTile(this.x0,this.y0),this.host.onHighlight(null),this.host.sfx("click"))},500)))});L(this,"onMove",t=>{if(t.pointerId!==this.pointer)return;if(this.clientX=t.clientX,this.clientY=t.clientY,this.host.controls.gesturing){this.abort();return}Math.hypot(t.clientX-this.downX,t.clientY-this.downY)>7&&(this.moved=!0,clearTimeout(this.timer));const e=this.host.controls.screenToTile(t.clientX,t.clientY,this.host.state.grid);e&&(this.x1=e.x,this.y1=e.y,Zl(this.tool)&&this.preview())});L(this,"onUp",t=>{if(t.pointerId!==this.pointer)return;if(clearTimeout(this.timer),this.host.controls.gesturing||this.longPressed){this.abort();return}const e=this.tool,n=this.x0,s=this.y0,r=Zl(e)?this.x1:this.x0,o=Zl(e)?this.y1:this.y0;if(this.pointer=null,this.host.controls.enabled=!0,this.host.onHighlight(null),e==="inspect"){this.moved||this.selectTile(n,s);return}if(e==="sign"){this.placeSign(n,s,t.clientX,t.clientY);return}this.apply(e,n,s,r,o,t.clientX,t.clientY)});L(this,"onCancel",t=>{t.pointerId===this.pointer&&this.abort()});this.dom=t,this.host=e,t.addEventListener("pointerdown",this.onDown),t.addEventListener("pointermove",this.onMove),t.addEventListener("pointerup",this.onUp),t.addEventListener("pointercancel",this.onCancel)}preview(){const t=this.host.actions.applyTool(this.tool,this.x0,this.y0,this.x1,this.y1,!0);this.host.onHighlight({x0:this.x0,y0:this.y0,x1:this.x1,y1:this.y1,valid:t.ok})}selectTile(t,e){const n=this.host.state.grid,s=dt(t,e),r=!!(n.building[s]||n.road[s]||n.rail[s]||n.wire[s]||n.pipe[s]||n.subway[s]||n.zone[s]||n.tree[s]||n.water[s]);this.host.onSelect(r?s:null)}async placeSign(t,e,n,s){const r=await this.host.promptSign();r!==null&&(this.host.actions.pendingSignText=r,this.apply("sign",t,e,t,e,n,s))}apply(t,e,n,s,r,o,a){const l=this.host.actions.applyTool(t,e,n,s,r,!1);l.ok?(l.cost&&this.host.money(-l.cost,o,a),this.host.sfx(t==="bulldoze"?"bulldoze":"place")):(this.host.sfx("error"),this.host.toast(l.reason??"Cannot place here","warn"))}abort(){clearTimeout(this.timer),this.pointer=null,this.host.controls.enabled=!0,this.host.onHighlight(null)}update(){this.pointer!==null&&this.host.controls.gesturing&&this.abort()}dispose(){this.abort(),this.dom.removeEventListener("pointerdown",this.onDown),this.dom.removeEventListener("pointermove",this.onMove),this.dom.removeEventListener("pointerup",this.onUp),this.dom.removeEventListener("pointercancel",this.onCancel)}}const aM="modulepreload",lM=function(i,t){return new URL(i,t).href},Nd={},eo=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let o=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");s=o(e.map(h=>{if(h=lM(h,n),h in Nd)return;Nd[h]=!0;const u=h.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(!!n)for(let v=a.length-1;v>=0;v--){const m=a[v];if(m.href===h&&(!u||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${d}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":aM,u||(g.as="script"),g.crossOrigin="",g.href=h,c&&g.setAttribute("nonce",c),document.head.appendChild(g),u)return new Promise((v,m)=>{g.addEventListener("load",v),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},lo=i=>`<svg viewBox="0 0 24 24" aria-hidden="true">${i}</svg>`,cM=lo('<circle cx="12" cy="12" r="8"/><path d="M14.5 8.5c-1-1-4-.8-4 .8 0 2.5 4.5 1 4.5 3.7 0 1.8-3.5 2.3-5.5.5M12 6v12"/>'),hM=lo('<circle cx="9" cy="8" r="3"/><path d="M3 19c.5-4 2.5-6 6-6s5.5 2 6 6M16 7.5a2.5 2.5 0 0 1 0 5M16 14c3 .2 4.5 2 5 5"/>');class uM{constructor(t,e){L(this,"element");L(this,"fundsShown");L(this,"targetFunds");L(this,"tickerOffset",0);L(this,"offs",[]);this.state=t,this.fundsShown=this.targetFunds=t().budget.funds,this.element=document.createElement("div"),this.element.innerHTML=`<div class="hud-top" data-ui>
      <div class="pill hud-funds">${cM}<span class="num funds-v"></span></div>
      <div class="pill hud-date"><span class="season"></span><span class="date-txt"></span></div>
      <div class="pill hud-pop">${hM}<span class="num pop-v"></span></div>
      <div class="pill hud-face"><span class="face-v"></span></div><div class="hud-spacer"></div>
      <div class="speed-group" aria-label="Game speed"></div>
      <button class="icon-btn overlay-btn" aria-label="Map overlays">${lo('<path d="m4 8 8-4 8 4-8 4-8-4Z"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4"/>')}</button>
      <button class="icon-btn panels-btn" aria-label="City panels">${lo('<path d="M5 6h14M5 12h14M5 18h14"/>')}<span class="dot" hidden></span></button>
      <button class="icon-btn menu-btn-top" aria-label="Menu">${lo('<circle cx="12" cy="12" r="9"/><path d="M8 9h8M8 12h8M8 15h8"/>')}</button>
    </div><div class="rci" data-ui aria-label="Residential, commercial and industrial demand"></div>
    <div class="bottom-stack"><div class="ticker" data-ui><button class="ticker-line"><span class="ic">◈</span><span class="ticker-view"><span class="ticker-track"></span></span></button><div class="ticker-list"></div></div><div class="drawer-mount"></div></div>`;const n=this.q(".speed-group");["⏸","▶","▶▶","▶▶▶"].forEach((s,r)=>{const o=document.createElement("button");o.textContent=s,o.ariaLabel=`Speed ${r}`,o.onclick=()=>{t().speed=r,kt.emit("speed:changed",{speed:r}),this.refresh()},n.append(o)}),this.q(".overlay-btn").addEventListener("click",s=>e.overlays(s.currentTarget)),this.q(".panels-btn").addEventListener("click",e.panels),this.q(".menu-btn-top").addEventListener("click",e.menu),this.q(".ticker-line").addEventListener("click",()=>this.q(".ticker").classList.toggle("open")),this.offs.push(kt.on("budget:updated",s=>{this.targetFunds=s.funds}),kt.on("stats:updated",()=>this.refresh()),kt.on("time:updated",()=>this.refresh()),kt.on("news",s=>this.addNews(s.text,s.kind)),kt.on("paper",()=>{this.q(".panels-btn .dot").hidden=!1})),t().news.slice(-8).forEach(s=>this.addNews(s.text,s.kind)),this.refresh()}mount(t){t.append(this.element)}drawerMount(){return this.q(".drawer-mount")}update(t){this.targetFunds=this.state().budget.funds,this.fundsShown+=(this.targetFunds-this.fundsShown)*Math.min(1,t*7),this.q(".hud-funds").classList.toggle("neg",this.targetFunds<0),this.q(".funds-v").textContent=`§${Math.round(this.fundsShown).toLocaleString()}`,this.tickerOffset+=t}setOverlay(t){this.q(".overlay-btn").classList.toggle("on",t!=="none")}clearPaperBadge(){this.q(".panels-btn .dot").hidden=!0}dispose(){this.offs.forEach(t=>t())}refresh(){const t=this.state(),e=t.time;this.targetFunds=t.budget.funds,this.q(".pop-v").textContent=t.stats.population.toLocaleString(),this.q(".date-txt").textContent=`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.month]} ${e.day}, ${e.year}`;const n=this.q(".season");n.className=`season s${e.season}`,n.textContent=["✿","☀","◇","❄"][e.season];const s=t.stats.approval;this.q(".face-v").textContent=s>.7?"◉‿◉":s>.45?"◉—◉":s>.25?"◉︵◉":"×︵×",Array.from(this.q(".speed-group").children).forEach((o,a)=>o.classList.toggle("on",a===t.speed));const r=this.q(".rci");r.innerHTML="",[["r","R"],["c","C"],["i","I"]].forEach(([o,a])=>{const l=t.demand[o],c=document.createElement("div");c.className=`rci-col rci-${o}`;const h=Math.abs(l)*50;c.innerHTML=`<div class="rci-bar"><i class="rci-fill" style="height:${h}%;${l>=0?"bottom":"top"}:50%"></i></div><span class="rci-lbl">${a}</span>`,r.append(c)})}addNews(t,e){const n=this.q(".ticker-track"),s=document.createElement("span");s.className=`t-${e}`,s.textContent=t,n.prepend(s),n.children.length>12&&n.lastElementChild?.remove();const r=document.createElement("div");r.className=`ticker-item k-${e}`,r.innerHTML='<span class="when">Now</span><span></span>',r.lastElementChild.textContent=t,this.q(".ticker-list").prepend(r),this.q(".ticker-list").children.length>12&&this.q(".ticker-list").lastElementChild?.remove()}q(t){return this.element.querySelector(t)}}const dM=[["zones","Zones"],["roads","Roads"],["power","Power"],["water","Water"],["safety","Safety"],["health","Health"],["education","Education"],["leisure","Leisure"],["transport","Transport"],["special","Special"],["terrain","Terrain"],["bulldoze","Bulldoze"]],fM=[["zone_res_low","Residential Low","zones",8,"zone"],["zone_res_med","Residential Med","zones",16,"zone"],["zone_res_high","Residential High","zones",24,"zone"],["zone_com_low","Commercial Low","zones",8,"zone"],["zone_com_high","Commercial High","zones",24,"zone"],["zone_ind_agri","Farmland","zones",8,"zone"],["zone_ind_light","Light Industry","zones",16,"zone"],["zone_ind_heavy","Heavy Industry","zones",24,"zone"],["road_street","Street","roads",12,"network"],["road_avenue","Avenue","roads",60,"network"],["road_highway","Highway","roads",220,"network"],["rail","Rail","roads",90,"network"],["wire","Power Line","power",6,"network"],["pipe","Water Pipe","water",10,"network"],["subway","Subway Tunnel","transport",150,"network"],["sign","City Sign","special",50,"network"],["tree","Plant Trees","terrain",12,"terrain"],["water_place","Place Water","terrain",120,"terrain"],["terrain_raise","Raise","terrain",25,"terrain"],["terrain_lower","Lower","terrain",25,"terrain"],["terrain_level","Level","terrain",25,"terrain"],["inspect","Inspect","terrain",0,"terrain"],["bulldoze","Bulldoze","bulldoze",4,"terrain"]].map(([i,t,e,n,s])=>({tool:i,name:t,category:e,cost:n,archetype:s,desc:`${t} tool.`}));class pM{constructor(t){L(this,"element");L(this,"active",null);L(this,"pressTimer",0);L(this,"offs",[]);L(this,"builtFor",null);this.state=t,this.element=document.createElement("div"),this.element.className="drawer",this.element.dataset.ui="",this.element.innerHTML='<div class="drawer-items"></div><div class="drawer-cats"></div><div class="tool-chip"><span class="ic"></span><span class="tool-name"></span><button class="x" aria-label="Cancel tool">×</button></div>';const e=this.q(".drawer-cats");dM.forEach(([n,s])=>{const r=document.createElement("button");r.className="d-cat",r.dataset.cat=n,r.innerHTML=`<span class="ic">${Kl(mM(n))}</span><span>${s}</span>`,r.onclick=()=>this.chooseCategory(n),e.append(r)}),this.q(".tool-chip .x").onclick=()=>this.select("inspect","Inspect"),this.offs.push(kt.on("budget:updated",()=>this.refreshItems()),kt.on("stats:updated",()=>this.refreshItems()))}update(){this.updateChip()}dispose(){clearTimeout(this.pressTimer),this.offs.forEach(t=>t()),this.element.remove()}chooseCategory(t){if(t==="bulldoze"){this.select("bulldoze","Bulldoze");return}this.active=this.active===t?null:t,this.element.classList.toggle("expanded",!!this.active),this.element.querySelectorAll(".d-cat").forEach(e=>e.classList.toggle("on",e.dataset.cat===this.active)),this.refreshItems()}allItems(){const t=H0.map(e=>({tool:`build_${e.key}`,name:e.name,cost:e.cost,category:e.category,desc:e.desc??`${e.name}, ${e.w}×${e.h} tiles.`,archetype:e.archetype,unlockPop:e.unlockPop,key:e.key}));return[...fM,...t]}refreshItems(){const t=this.q(".drawer-items");if(!this.active){t.innerHTML="",this.builtFor=null;return}const e=this.state(),n=this.allItems().filter(o=>o.category===this.active),s=this.active+"|"+n.map(o=>this.isUnlocked(o,e)?1:0).join("");this.builtFor!==s&&(this.builtFor=s,t.innerHTML="",n.forEach(o=>{const a=document.createElement("button");a.className="d-item",a.dataset.tool=o.tool,a.innerHTML=`<span class="ic">${Kl(o.archetype)}</span><span class="nm"></span><span class="cost">${o.cost?`§${o.cost.toLocaleString()}`:"Free"}</span><span class="d-lock" hidden>${o.unlockPop?.toLocaleString()??"Reward"}</span>`,a.querySelector(".nm").textContent=o.name,a.onclick=()=>{a.classList.contains("poor")?kt.emit("money:denied",{reason:"Not enough funds"}):a.classList.contains("locked")||this.select(o.tool,o.name)};const l=c=>{this.pressTimer=window.setTimeout(()=>this.describe(o,a),520),a.setPointerCapture?.(c.pointerId)};a.addEventListener("pointerdown",l),["pointerup","pointercancel","pointermove"].forEach(c=>a.addEventListener(c,()=>clearTimeout(this.pressTimer))),t.append(a)}));const r=new Map(n.map(o=>[o.tool,o]));t.querySelectorAll(".d-item").forEach(o=>{const a=r.get(o.dataset.tool);if(!a)return;const l=!this.isUnlocked(a,e),c=e.difficulty!=="sandbox"&&a.cost>e.budget.funds;o.classList.toggle("locked",l),o.classList.toggle("poor",c),o.classList.toggle("sel",e.tool===a.tool),o.disabled=l,o.querySelector(".d-lock").hidden=!l})}isUnlocked(t,e){return e.difficulty==="sandbox"||!t.unlockPop?!t.key||!t.key.startsWith("x_")||t.cost>0||e.unlocked.has(t.key):e.stats.population>=t.unlockPop||!!t.key&&e.unlocked.has(t.key)}describe(t,e){this.element.parentElement?.querySelector(".d-desc")?.remove();const n=document.createElement("div");n.className="d-desc",n.innerHTML='<b></b><div class="sub"></div>',n.querySelector("b").textContent=t.name,n.querySelector(".sub").textContent=t.desc;const s=e.getBoundingClientRect();n.style.left=`${Math.max(8,Math.min(innerWidth-258,s.left))}px`,n.style.bottom=`${innerHeight-s.top+8}px`,this.element.parentElement?.append(n),setTimeout(()=>n.remove(),2800)}select(t,e){const n=this.state();n.tool=t,kt.emit("tool:changed",{tool:t}),this.active=null,this.element.classList.remove("expanded"),this.updateChip(e)}updateChip(t){const e=this.state().tool;this.q(".tool-chip").classList.toggle("show",e!=="inspect");const s=this.allItems().find(r=>r.tool===e);this.q(".tool-name").textContent=t??s?.name??e,this.q(".tool-chip .ic").innerHTML=Kl(s?.archetype??"terrain")}q(t){return this.element.querySelector(t)}}function mM(i){return i==="roads"?"network":i==="zones"?"zone":i==="terrain"||i==="bulldoze"?"terrain":mr.find(t=>t.category===i)?.archetype??"landmark"}function Kl(i){const t={zone:'<path d="M3 20V8l9-5 9 5v12M8 20v-7h8v7"/>',network:'<path d="M4 21 10 3h4l6 18M8 14h8M7 18h10"/>',powerplant:'<path d="M4 20V9h6v11M14 20V4h6v16M13 9l-3 4h4l-3 5"/>',watertower:'<path d="M7 4h10l2 5-2 4H7L5 9l2-5ZM9 13 7 21M15 13l2 8M8 18h8"/>',hospital:'<path d="M5 21V5h14v16M9 10h6M12 7v6M8 21v-5h8v5"/>',school:'<path d="m3 9 9-5 9 5-9 5-9-5Zm3 3v5c4 3 8 3 12 0v-5"/>',park:'<path d="M12 3 7 11h3l-4 6h5v4h2v-4h5l-4-6h3l-5-8Z"/>',terrain:'<path d="m3 18 5-7 4 4 3-5 6 8H3Z"/>',landmark:'<path d="M5 21h14M7 21V9h10v12M9 9l3-6 3 6M10 14h4"/>',transit:'<path d="M6 4h12v13H6V4Zm2 4h8M9 17l-2 4M15 17l2 4"/>',airport:'<path d="m3 13 8-2V4l2-1 1 8 7 2v2l-7 1-1 5h-2v-5l-8-1v-2Z"/>',port:'<path d="M4 18h16M6 18V7h9l3 5M8 7V4h7M3 20c3 2 6-2 9 0s6-2 9 0"/>',house:'<path d="m3 11 9-7 9 7M5 10v10h14V10M10 20v-6h4v6"/>',default:'<rect x="5" y="5" width="14" height="15"/><path d="M8 9h2M14 9h2M8 13h2M14 13h2"/>'};return`<svg viewBox="0 0 24 24" aria-hidden="true">${t[i]??t.default}</svg>`}function gM(i,t,e){const n=Math.min(devicePixelRatio||1,2),s=i.getBoundingClientRect(),r=Math.max(220,s.width||320),o=Math.max(100,s.height||120);i.width=Math.round(r*n),i.height=Math.round(o*n);const a=i.getContext("2d");if(!a)return;a.scale(n,n),a.clearRect(0,0,r,o);const l=t.length?t.slice(-72):[0];let c=Math.min(...l,0),h=Math.max(...l,1);h===c&&(h=c+1);const u={l:38,r:12,t:24,b:17},d=r-u.l-u.r,f=o-u.t-u.b;a.font="10px system-ui",a.fillStyle="#93a0b0",a.fillText(e.label,10,15),a.strokeStyle="rgba(255,255,255,.08)",a.fillStyle="#718090";for(let T=0;T<=2;T++){const M=u.t+f*T/2;a.beginPath(),a.moveTo(u.l,M),a.lineTo(r-u.r,M),a.stroke();const w=h-(h-c)*T/2;a.fillText(Fd(w,e),3,M+3)}const g=T=>u.l+(l.length===1?d:d*T/(l.length-1)),v=T=>u.t+f-(T-c)/(h-c)*f,m=e.color??"#3ddbd9";a.beginPath(),l.forEach((T,M)=>M?a.lineTo(g(M),v(T)):a.moveTo(g(M),v(T)));const p=a.createLinearGradient(0,u.t,0,o-u.b);p.addColorStop(0,`${m}55`),p.addColorStop(1,`${m}00`),a.lineTo(g(l.length-1),o-u.b),a.lineTo(u.l,o-u.b),a.closePath(),a.fillStyle=p,a.fill(),a.beginPath(),l.forEach((T,M)=>M?a.lineTo(g(M),v(T)):a.moveTo(g(M),v(T))),a.strokeStyle=m,a.lineWidth=2,a.lineJoin="round",a.stroke();const y=l[l.length-1],_=Fd(y,e);a.font="bold 10px system-ui";const x=a.measureText(_).width+10;a.fillStyle=m,a.fillRect(r-u.r-x,5,x,17),a.fillStyle="#071716",a.fillText(_,r-u.r-x+5,17)}function Fd(i,t){if(t.percent)return`${Math.round(i*100)}%`;const e=Math.abs(i),n=e>=1e6?`${(i/1e6).toFixed(1)}m`:e>=1e3?`${(i/1e3).toFixed(1)}k`:Math.round(i).toString();return t.money?`§${n}`:n}const vM=["fire","earthquake","tornado","flood","meteor","blackout","riot","volcano","monster","aircrash","meltdown","hurricane","chemical"],_M=["none","zones","power","water","pollution","noise","crime","landvalue","traffic","transit","density","health","education","fire","desirability","underground"];class xM{constructor(t,e){L(this,"element");L(this,"current",null);L(this,"inspector",null);L(this,"paperIndex",0);L(this,"lastRefresh",0);L(this,"startY",0);this.host=t,this.toast=e,this.element=document.createElement("div"),this.element.className="panels-layer",this.element.innerHTML='<div class="panel-picker popover" data-ui hidden></div><div class="overlay-picker popover" data-ui hidden></div><section class="sheet" data-ui><header class="sheet-head"><div class="sheet-title"></div><button class="sheet-close" aria-label="Close">×</button></header><div class="sheet-body"></div></section>',this.q(".sheet-close").onclick=()=>this.close();const n=this.q(".sheet-head");n.addEventListener("pointerdown",r=>{this.startY=r.clientY}),n.addEventListener("pointerup",r=>{r.clientY-this.startY>70&&this.close()});const s=this.q(".panel-picker");[["budget","Budget"],["statistics","Statistics"],["city","City"],["advisors","Advisors"],["newspaper","Newspaper"],["settings","Settings"]].forEach(([r,o])=>{const a=document.createElement("button");a.className="pop-item",a.textContent=o,a.onclick=()=>this.open(r),s.append(a)})}showPicker(){const t=this.q(".panel-picker");t.hidden=!t.hidden,this.q(".overlay-picker").hidden=!0}showOverlays(t){const e=this.q(".overlay-picker");e.hidden=!e.hidden,this.q(".panel-picker").hidden=!0,e.childElementCount===0&&_M.forEach(s=>{const r=document.createElement("button");r.className="pop-item",r.textContent=s==="none"?"No overlay":ms(s),r.onclick=()=>{this.host.state.overlay=s,kt.emit("overlay:changed",{overlay:s}),e.hidden=!0},e.append(r)});const n=t.getBoundingClientRect();e.style.right=`${Math.max(8,innerWidth-n.right)}px`,e.style.top=`${n.bottom+6}px`}open(t){this.current=t,this.q(".panel-picker").hidden=!0,this.q(".overlay-picker").hidden=!0,this.q(".sheet").classList.add("open"),this.render()}close(){this.current=null,this.q(".sheet").classList.remove("open")}showInspector(t){if(this.inspector=t,t===null){this.current==="inspector"&&this.close();return}this.open("inspector")}update(t){this.current&&t-this.lastRefresh>.5&&(this.lastRefresh=t,this.render())}dispose(){this.element.remove()}render(){if(!this.current)return;const t={budget:"Budget",statistics:"Statistics",city:"City",advisors:"Advisors",newspaper:"Llama Ledger",settings:"Settings",inspector:"Tile Inspector"};this.q(".sheet-title").textContent=t[this.current];const e=this.q(".sheet-body");switch(e.innerHTML="",this.current){case"budget":this.budget(e);break;case"statistics":this.statistics(e);break;case"city":this.city(e);break;case"advisors":this.advisors(e);break;case"newspaper":this.newspaper(e);break;case"settings":this.settings(e);break;case"inspector":this.tile(e)}}budget(t){const e=this.host.state,n=e.budget,s=n.ledger;t.innerHTML=`<div class="sec">Monthly ledger</div><table class="ledger">${[["Residential tax",s.incomeRes],["Commercial tax",s.incomeCom],["Industrial tax",s.incomeInd],["Other income",s.incomeOther],["Roads",-s.costRoads],["Police",-s.costPolice],["Fire",-s.costFire],["Health",-s.costHealth],["Education",-s.costEducation],["Parks",-s.costParks],["Power",-s.costPower],["Water",-s.costWater],["Loans",-s.costLoans]].map(([o,a])=>`<tr><td>${o}</td><td>${ma(a)}</td></tr>`).join("")}<tr class="net"><td>Net</td><td>${ma(s.net)}</td></tr></table><div class="sec">Tax rates</div>`,[["Residential","taxRes"],["Commercial","taxCom"],["Industrial","taxInd"]].forEach(([o,a])=>t.append(this.slider(o,n[a]*100,0,20,1,l=>n[a]=l/100,"%"))),t.insertAdjacentHTML("beforeend",'<div class="sec">Service funding</div>'),[["Roads","fundRoads"],["Police","fundPolice"],["Fire","fundFire"],["Health","fundHealth"],["Education","fundEducation"],["Parks","fundParks"]].forEach(([o,a])=>t.append(this.slider(o,n[a]*100,0,150,5,l=>n[a]=l/100,"%"))),t.insertAdjacentHTML("beforeend",'<div class="sec">Bonds</div>');const r=document.createElement("div");r.className="row",r.innerHTML='<div class="grow"><div class="lbl">Municipal bond</div><div class="sub">§10,000 over 120 months</div></div><button class="btn sm">Take bond</button>',r.querySelector("button").onclick=()=>void eo(()=>Promise.resolve().then(()=>Z0),void 0,import.meta.url).then(o=>{o.takeLoan(e,1e4,120)&&this.toast.toast("Bond issued","good"),this.render()}).catch(()=>this.toast.toast("Economy service unavailable","bad")),t.append(r),n.loans.forEach((o,a)=>{const l=document.createElement("div");l.className="row",l.innerHTML=`<div class="grow"><div class="lbl">§${o.remaining.toLocaleString()} remaining</div><div class="sub">${o.monthsLeft} months · §${o.monthly}/mo</div></div><button class="btn sm">Repay</button>`,l.querySelector("button").addEventListener("click",()=>{n.funds>=o.remaining?(n.funds-=o.remaining,n.loans.splice(a,1),this.render()):this.toast.toast("Not enough funds","bad")}),t.append(l)}),t.insertAdjacentHTML("beforeend",'<div class="sec">Neighbour deals</div>'),e.deals.forEach(o=>{const a=o.amount*o.pricePerUnit*(o.kind.startsWith("sell")||o.kind==="take_garbage"?1:-1),l=document.createElement("div");l.className="row",l.innerHTML=`<div class="grow"><div class="lbl">${ms(o.kind)} · ${o.neighbor}</div><div class="sub">${ma(a)} / month</div></div><button class="tgl ${o.active?"on":""}" aria-label="Toggle deal"><i></i></button>`,l.querySelector("button").addEventListener("click",()=>{o.active=!o.active,this.render()}),t.append(l)})}statistics(t){const e=this.host.state,n=e.stats;t.innerHTML=`<div class="tiles">${[["Population",n.population.toLocaleString()],["Jobs",n.jobs.toLocaleString()],["Approval",pa(n.approval)],["Health",pa(n.health)],["Education",pa(n.educationLevel)],["Safety",pa(n.safety)],["Land value",Math.round(n.landValueAvg)],["Homeless",n.homeless.toLocaleString()]].map(([r,o])=>`<div class="tile"><div class="k">${r}</div><div class="v">${o}</div></div>`).join("")}</div>`,[["population","Population","#4ad36e"],["funds","Funds","#3ddbd9",!1,!0],["approval","Approval","#f5b83d",!0],["pollution","Pollution","#b88b57",!0],["traffic","Traffic","#f0554a",!0],["unemployment","Unemployment","#9d84e8",!0]].forEach(([r,o,a,l,c])=>{const h=document.createElement("div");h.className="chart-block";const u=document.createElement("canvas");h.append(u),t.append(h),requestAnimationFrame(()=>gM(u,e.history[r],{label:o,color:a,percent:l,money:c}))})}city(t){const e=this.host.state;t.innerHTML='<div class="sec">Identity</div>',t.append(this.textField("City name",e.cityName,s=>e.cityName=s),this.textField("Mayor",e.mayorName,s=>e.mayorName=s)),t.insertAdjacentHTML("beforeend",'<div class="sec">Milestones</div>'),e.milestones.forEach(s=>{const r=Math.min(100,e.stats.population/s.pop*100);t.insertAdjacentHTML("beforeend",`<div class="mile ${s.reached?"done":""}"><div class="top"><span class="nm">${s.name}</span><span class="target">${s.pop.toLocaleString()}</span></div><div class="desc">${s.desc}</div><div class="bar"><i style="width:${r}%"></i></div></div>`)}),t.insertAdjacentHTML("beforeend",'<div class="sec">Ordinances</div>'),e.ordinances.forEach(s=>{const r=!!s.unlockPop&&e.stats.population<s.unlockPop,o=document.createElement("div");o.className="row",o.innerHTML=`<div class="grow"><div class="lbl">${s.name}</div><div class="sub">${s.desc} · ${ma(-s.costPerCapita*e.stats.population)}/mo${r?` · unlock ${s.unlockPop.toLocaleString()}`:""}</div></div><button class="tgl ${s.active?"on":""}" ${r?"disabled":""}><i></i></button>`,o.querySelector("button").onclick=()=>{s.active=!s.active,this.render()},t.append(o)}),t.insertAdjacentHTML("beforeend",'<div class="sec">Disasters</div>'),t.append(this.toggleRow("Random disasters",e.disastersEnabled,s=>e.disastersEnabled=s));const n=document.createElement("div");n.className="dis-grid",vM.forEach(s=>{const r=document.createElement("button");r.className="dis-btn",r.innerHTML=`<span class="ic">△</span>${ms(s)}`,r.onclick=()=>void eo(()=>Promise.resolve().then(()=>np),void 0,import.meta.url).then(o=>{const a=o.triggerDisaster(e,s);this.toast.toast(a?`${ms(s)} unleashed`:`${ms(s)} unavailable`,a?"warn":"bad")}).catch(()=>this.toast.toast("Disaster service unavailable","bad")),n.append(r)}),t.append(n)}async advisors(t){t.innerHTML='<div class="paper-empty">Consulting city hall…</div>';try{const{getAdvice:e}=await eo(async()=>{const{getAdvice:n}=await import("./advisors-fvNJFWRR.js");return{getAdvice:n}},[],import.meta.url);if(this.current!=="advisors")return;t.innerHTML="",e(this.host.state).forEach(n=>{const s=document.createElement("div");s.className=`adv m-${n.mood}`,s.innerHTML=`<div class="portrait">${n.advisor.slice(0,1).toUpperCase()}</div><div><div class="who"><b>${n.name}</b><span class="role">${n.advisor}</span><span class="mood-tag m-${n.mood}">${n.mood}</span></div><div class="say"></div></div>`,s.querySelector(".say").textContent=n.text,t.append(s)})}catch{t.innerHTML='<div class="paper-empty">Advisors are in transit.</div>'}}newspaper(t){const e=this.host.state.papers;if(!e.length){t.innerHTML='<div class="paper-empty">No editions have been printed yet.</div>';return}this.paperIndex=Math.min(this.paperIndex,e.length-1);const n=e[this.paperIndex];t.innerHTML=`<div class="paper-wrap"><article class="paper-sheet"><div class="paper-mast">${n.masthead||"The Llama Ledger"}</div><div class="paper-dateline"><span>SETHCITY 6769</span><span>${n.month+1}/${n.year}</span></div><h2 class="paper-headline">${n.headline}</h2>${n.articles.map(s=>`<section class="paper-article"><h4>${s.title}</h4><p>${s.body}</p></section>`).join("")}<div class="paper-classified"><b>Classified</b> — ${n.classified}</div></article><div class="paper-nav"><button class="btn sm prev">Newer</button><span class="ed">Edition ${this.paperIndex+1} of ${e.length}</span><button class="btn sm next">Older</button></div></div>`,t.querySelector(".prev").disabled=this.paperIndex===0,t.querySelector(".next").disabled=this.paperIndex===e.length-1,t.querySelector(".prev").addEventListener("click",()=>{this.paperIndex--,this.render()}),t.querySelector(".next").addEventListener("click",()=>{this.paperIndex++,this.render()})}async settings(t){const e=this.host.state;t.innerHTML='<div class="sec">Graphics</div>';const n=document.createElement("div");n.className="seg",["low","medium","high","auto"].forEach(r=>{const o=document.createElement("button");o.textContent=ms(r),o.onclick=()=>{r==="auto"?localStorage.removeItem("sethcity:quality"):(localStorage.setItem("sethcity:quality",r),this.host.setQuality(r))},n.append(o)}),t.append(n),t.insertAdjacentHTML("beforeend",'<div class="sec">Audio & simulation</div>'),t.append(this.toggleRow("Sound effects",localStorage.getItem("sethcity:sound")!=="off",r=>localStorage.setItem("sethcity:sound",r?"on":"off")),this.toggleRow("Music",localStorage.getItem("sethcity:music")!=="off",r=>localStorage.setItem("sethcity:music",r?"on":"off")),this.toggleRow("Disasters",e.disastersEnabled,r=>e.disastersEnabled=r)),t.insertAdjacentHTML("beforeend",`<div class="sec">Save game</div><div class="row"><div class="grow"><div class="lbl">${e.cityName}</div><div class="sub">${ms(e.difficulty)} ${e.difficulty==="sandbox"?"· ∞ funds":""}</div></div><button class="btn save-now">Save now</button></div><div class="save-list"></div>`),t.querySelector(".save-now").addEventListener("click",()=>void this.host.save().then(()=>this.toast.toast("City saved","good")));try{const r=await eo(()=>Promise.resolve().then(()=>t0),void 0,import.meta.url),o=await r.listSaves(),a=t.querySelector(".save-list");if(!a)return;o.forEach(l=>{const c=document.createElement("div");c.className="save-row",c.innerHTML=`<div class="meta"><b>${l.name}</b><div class="sub">Pop ${l.pop.toLocaleString()} · §${l.funds.toLocaleString()}</div></div><button class="btn sm load">Load</button><button class="btn sm danger del">Delete</button>`,c.querySelector(".load").addEventListener("click",()=>void this.host.load(l.slot)),c.querySelector(".del").addEventListener("click",()=>void r.deleteSave(l.slot).then(()=>c.remove())),a.append(c)})}catch{}const s=document.createElement("button");s.className="btn danger full",s.textContent="Reset / New City",s.onclick=()=>kt.emit("news",{id:e.nextNewsId++,tick:e.time.ticks,text:"Open the menu to start a new city.",kind:"info"}),t.append(s),t.insertAdjacentHTML("beforeend",'<p class="about">SETHCITY 6769 · A miniature city beyond tomorrow.</p>')}tile(t){if(this.inspector===null)return;const e=this.host.state,n=e.grid,s=this.inspector,r=we(n.building[s]),o=["None","Residential L","Residential M","Residential H","Commercial L","Commercial M","Commercial H","Industrial L","Industrial M","Industrial H"][n.zone[s]]??"None";t.innerHTML=`<div class="insp-title"><div><div class="big">${n.building[s]?r.name:o==="None"?"Empty land":o}</div><div class="sub">Tile ${s%R}, ${Math.floor(s/R)} · Level ${n.level[s]||0} · Condition ${n.condition[s]}%</div></div></div><div class="insp-grid">${[["Zone",o],["Land value",n.landValue[s]],["Pollution",n.pollution[s]],["Crime",n.crime[s]],["Traffic",n.traffic[s]],["Power",n.powered[s]?"Connected":"No"],["Water",n.watered[s]?"Connected":"No"]].map(([a,l])=>`<div class="insp-kv"><span class="k">${a}</span><span class="v">${l}</span></div>`).join("")}</div><button class="btn danger full bulldoze">Bulldoze</button>`,t.querySelector(".bulldoze").addEventListener("click",()=>{const a=s%R,l=Math.floor(s/R),c=this.host.actions.applyTool("bulldoze",a,l,a,l,!1);this.toast.toast(c.ok?"Bulldozed":c.reason??"Cannot bulldoze",c.ok?"good":"bad"),c.ok&&this.close()})}slider(t,e,n,s,r,o,a){const l=document.createElement("label");l.className="range-row",l.innerHTML=`<span>${t}</span><input type="range" min="${n}" max="${s}" step="${r}" value="${e}"><output>${Math.round(e)}${a}</output>`;const c=l.querySelector("input");return c.oninput=()=>{const h=Number(c.value);l.querySelector("output").textContent=`${h}${a}`,o(h)},l}toggleRow(t,e,n){const s=document.createElement("div");return s.className="row",s.innerHTML=`<div class="grow"><div class="lbl">${t}</div></div><button class="tgl ${e?"on":""}"><i></i></button>`,s.querySelector("button").onclick=r=>{e=!e,r.currentTarget.classList.toggle("on",e),n(e)},s}textField(t,e,n){const s=document.createElement("label");s.className="field",s.innerHTML=`<span>${t}</span><input class="tin" maxlength="32">`;const r=s.querySelector("input");return r.value=e,r.onchange=()=>n(r.value.trim()||e),s}q(t){return this.element.querySelector(t)}}const ms=i=>i.replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase()),pa=i=>`${Math.round(i*100)}%`,ma=i=>`${i<0?"−":"+"}§${Math.abs(Math.round(i)).toLocaleString()}`;class yM{constructor(t){L(this,"stack");L(this,"offs");this.root=t,this.stack=document.createElement("div"),this.stack.className="toasts",this.stack.dataset.ui="",t.append(this.stack),this.offs=[kt.on("money:spent",e=>this.money(e.amount,e.x,e.y)),kt.on("money:denied",({reason:e})=>this.toast(e||"Not enough funds","bad")),kt.on("game:saved",()=>this.toast("City saved","good")),kt.on("milestone",e=>this.toast(`${e.name} reached — §${e.reward.toLocaleString()}`,"good"))]}toast(t,e="info"){const n=document.createElement("div");n.className=`toast k-${e}`;const s={info:"i",good:"✓",warn:"!",bad:"×"};n.innerHTML=`<span class="ic">${s[e]}</span><span></span>`,n.lastElementChild.textContent=t,this.stack.append(n);const r=()=>{n.classList.add("leaving"),setTimeout(()=>n.remove(),260)};n.addEventListener("click",r,{once:!0}),setTimeout(r,3e3)}money(t,e,n){const s=document.createElement("div");s.className=`money-float ${t>0?"gain":"loss"}`,s.style.left=`${e}px`,s.style.top=`${n}px`,s.textContent=`${t>0?"+":"−"}§${Math.abs(t).toLocaleString()}`,this.root.append(s),setTimeout(()=>s.remove(),1200)}dispose(){this.offs.forEach(t=>t()),this.stack.remove()}}const ir=[["Build a road","Open Roads and place a street."],["Zone homes","Choose a residential zone and paint beside the road."],["Power up","Place any power plant."],["Make the connection","Connect power with roads or power lines."],["Create jobs","Zone a commercial area near your homes."],["Watch the city grow","Wait for the first building to rise."],["Let time flow","Unpause or increase the simulation speed."]];class MM{constructor(t,e){L(this,"card");L(this,"offs",[]);L(this,"step",0);if(this.state=e,this.card=document.createElement("aside"),this.card.className="coach-card",this.card.dataset.ui="",this.card.innerHTML='<div class="step-no"></div><h4></h4><p></p><div class="coach-foot"><div class="coach-dots"></div><button class="coach-skip">Skip tutorial</button></div>',t.append(this.card),this.card.querySelector("button").onclick=()=>this.finish(),localStorage.getItem("sethcity:tutorial")==="done"){this.card.hidden=!0,this.step=ir.length;return}this.render(),this.offs.push(kt.on("tool:changed",({tool:n})=>{this.step===0&&n.startsWith("road_")?this.next():this.step===1&&n.startsWith("zone_res")?this.next():this.step===2&&n.startsWith("build_p_")?this.next():this.step===3&&(n==="wire"||n.startsWith("road_"))?this.next():this.step===4&&n.startsWith("zone_com")&&this.next()}),kt.on("tile:changed",({i:n})=>{this.step===5&&this.state().grid.building[n]&&this.next()}),kt.on("speed:changed",({speed:n})=>{this.step===6&&n>0&&this.finish()}))}dispose(){this.offs.forEach(t=>t()),this.card.remove()}next(){this.step++,this.state().tutorialStep=this.step,this.step>=ir.length?this.finish():this.render()}render(){const t=ir[this.step];this.card.hidden=!1,this.card.querySelector(".step-no").textContent=`Tutorial ${this.step+1} / ${ir.length}`,this.card.querySelector("h4").textContent=t[0],this.card.querySelector("p").textContent=t[1],this.card.style.bottom=this.step<5?"calc(var(--sab) + 132px)":"calc(var(--sab) + 88px)";const e=this.card.querySelector(".coach-dots");e.innerHTML=ir.map((n,s)=>`<i class="${s<this.step?"done":s===this.step?"on":""}"></i>`).join("")}finish(){localStorage.setItem("sethcity:tutorial","done"),this.state().tutorialStep=ir.length,this.card.hidden=!0}}class wM{constructor(t,e){L(this,"hud");L(this,"palette");L(this,"panels");L(this,"toasts");L(this,"tutorial");L(this,"menu");L(this,"offs",[]);L(this,"elapsed",0);this.root=t,this.host=e,t.replaceChildren(),this.toasts=new yM(t),this.panels=new xM(e,this.toasts),t.append(this.panels.element),this.hud=new uM(()=>e.state,{menu:()=>this.showMenu(),panels:()=>this.panels.showPicker(),overlays:n=>this.panels.showOverlays(n)}),this.hud.mount(t),this.palette=new pM(()=>e.state),this.hud.drawerMount().append(this.palette.element),this.tutorial=new MM(t,()=>e.state),this.menu=document.createElement("div"),this.menu.className="menu show",this.menu.dataset.ui="",t.append(this.menu),this.renderMenuHome(),this.offs.push(kt.on("overlay:changed",({overlay:n})=>this.hud.setOverlay(n)),kt.on("paper",()=>this.toasts.toast("A new Llama Ledger is out","info")),kt.on("game:loaded",()=>{this.panels.close(),this.palette.update()})),this.probeAutosave()}update(t){this.elapsed+=t,this.hud.update(t),this.palette.update(),this.panels.update(this.elapsed)}hitTest(t,e){const n=document.elementFromPoint(t,e);return!!n&&this.root.contains(n)&&!!n.closest("[data-ui]")}showTileInspector(t){this.panels.showInspector(t)}promptSignText(){return new Promise(t=>{const e=document.createElement("div");e.className="modal-back",e.dataset.ui="",e.innerHTML='<form class="modal"><h3>Place a city sign</h3><input class="tin" maxlength="24" autocomplete="off" placeholder="Sign text"><div class="acts"><button type="button" class="btn cancel">Cancel</button><button class="btn primary">OK</button></div></form>',this.root.append(e);const n=e.querySelector("input"),s=r=>{e.remove(),t(r)};e.querySelector(".cancel").addEventListener("click",()=>s(null)),e.querySelector("form").addEventListener("submit",r=>{r.preventDefault();const o=n.value.trim();s(o||null)}),requestAnimationFrame(()=>n.focus())})}dispose(){this.offs.forEach(t=>t()),this.hud.dispose(),this.palette.dispose(),this.panels.dispose(),this.toasts.dispose(),this.tutorial.dispose(),this.menu.remove()}showMenu(){this.menu.classList.add("show"),this.renderMenuHome()}renderMenuHome(t=this.menu.dataset.auto==="yes"){this.menu.innerHTML=`<div class="menu-scroll"><div class="menu-inner"><div class="menu-logo">SETHCITY <span class="boot-num">6769</span></div><div class="menu-tag">Build tomorrow. Govern forever.</div><button class="menu-btn primary new"><span class="ic">＋</span>New City</button>${t?'<button class="menu-btn continue"><span class="ic">▶</span>Continue</button>':""}<button class="menu-btn load"><span class="ic">▤</span>Load City</button><button class="menu-btn settings"><span class="ic">⚙</span>Settings</button><button class="menu-ghost resume">Return to city</button></div></div>`,this.menu.querySelector(".new").addEventListener("click",()=>this.renderNewGame()),this.menu.querySelector(".continue")?.addEventListener("click",()=>void this.host.load("auto").then(()=>this.menu.classList.remove("show"))),this.menu.querySelector(".load").addEventListener("click",()=>{this.menu.classList.remove("show"),this.panels.open("settings")}),this.menu.querySelector(".settings").addEventListener("click",()=>{this.menu.classList.remove("show"),this.panels.open("settings")}),this.menu.querySelector(".resume").addEventListener("click",()=>this.menu.classList.remove("show"))}renderNewGame(){const t=Math.random()*1e9|0;this.menu.innerHTML=`<div class="menu-scroll"><form class="menu-inner new-form"><button type="button" class="menu-back">‹ Main menu</button><div class="menu-h">Found a new city</div><label class="field"><span>City name</span><input class="tin" name="name" value="SethCity"></label><label class="field"><span>Mayor name</span><input class="tin" name="mayor" value="Mayor Seth"></label><div class="field"><span>Map shape</span><div class="shape-row">${["coastal","river","lakes","plains","valley","islands"].map((a,l)=>`<button type="button" class="shape-chip ${l===0?"on":""}" data-shape="${a}">${kd(a)}</button>`).join("")}</div></div><div class="map-thumb-wrap"><canvas class="map-thumb" width="112" height="112"></canvas><div class="grow"><label class="range-row"><span>Water</span><input name="water" type="range" min="0" max="100" value="30"><output>30%</output></label><label class="range-row"><span>Hills</span><input name="hills" type="range" min="0" max="100" value="45"><output>45%</output></label><label class="range-row"><span>Trees</span><input name="trees" type="range" min="0" max="100" value="50"><output>50%</output></label></div></div><label class="field"><span>Seed</span><div class="seed-row"><input class="tin seed" type="number" value="${t}"><button type="button" class="btn random">Randomize</button></div></label><div class="field"><span>Difficulty</span><div class="seg">${["easy","normal","hard","sandbox"].map((a,l)=>`<button type="button" data-diff="${a}" class="${l===1?"on":""}">${kd(a)}${a==="sandbox"?" ∞ funds":""}</button>`).join("")}</div></div><div class="row"><div class="grow"><div class="lbl">Random disasters</div></div><button type="button" class="tgl on disasters"><i></i></button></div><button class="btn primary full">Create SETHCITY 6769</button></form></div>`;const e=this.menu.querySelector("form");let n="coastal",s="normal",r=!0;const o=()=>this.drawMap(e.querySelector("canvas"),n,Number(e.elements.namedItem("water").value)/100,Number(e.elements.namedItem("hills").value)/100,Number(e.querySelector(".seed").value));e.querySelector(".menu-back").addEventListener("click",()=>this.renderMenuHome()),e.querySelectorAll(".shape-chip").forEach(a=>a.addEventListener("click",()=>{n=a.dataset.shape,e.querySelectorAll(".shape-chip").forEach(l=>l.classList.toggle("on",l===a)),o()})),e.querySelectorAll("[data-diff]").forEach(a=>a.addEventListener("click",()=>{s=a.dataset.diff,e.querySelectorAll("[data-diff]").forEach(l=>l.classList.toggle("on",l===a))})),e.querySelector(".disasters").addEventListener("click",a=>{r=!r,a.currentTarget.classList.toggle("on",r)}),e.querySelector(".random").addEventListener("click",()=>{e.querySelector(".seed").value=String(Math.random()*1e9|0),o()}),e.querySelectorAll("input[type=range],.seed").forEach(a=>a.addEventListener("input",()=>{const l=a.parentElement?.querySelector("output");l&&(l.textContent=`${a.value}%`),o()})),e.addEventListener("submit",a=>{a.preventDefault();const l=c=>e.elements.namedItem(c);this.host.newGame({name:l("name").value.trim()||"SethCity",mayor:l("mayor").value.trim()||"Mayor Seth",shape:n,water:Number(l("water").value)/100,hills:Number(l("hills").value)/100,trees:Number(l("trees").value)/100,seed:Number(e.querySelector(".seed").value)|0,difficulty:s,disasters:r}),this.menu.classList.remove("show")}),o()}drawMap(t,e,n,s,r){const o=t.getContext("2d");if(!o)return;const a=28,l=4;o.fillStyle="#123447",o.fillRect(0,0,112,112);for(let c=0;c<a;c++)for(let h=0;h<a;h++){const u=Math.sin((h+r%31)*.55)*Math.cos((c+r%23)*.43)*.25+Math.hypot(h-14,c-14)/20*s;let d=u<n-.2;e==="river"&&(d=Math.abs(h-14-Math.sin(c*.45)*3)<n*4),e==="plains"&&(d=!1),e==="islands"&&(d=u<n+.05),e==="lakes"&&(d=Math.sin(h*.5)+Math.cos(c*.65)>2-n*3),e==="coastal"&&(d=d||h<n*10),e==="valley"&&(d=Math.abs(h-14)<n*2),o.fillStyle=d?"#287aa0":u>.65?"#667469":u>.35?"#4f8e62":"#62a66b",o.fillRect(h*l,c*l,l,l)}}async probeAutosave(){try{await(await eo(()=>Promise.resolve().then(()=>t0),void 0,import.meta.url)).hasAutosave()&&(this.menu.dataset.auto="yes",this.menu.classList.contains("show")&&this.menu.querySelector(".menu-logo")&&this.renderMenuHome(!0))}catch{}}}const kd=i=>i.charAt(0).toUpperCase()+i.slice(1).replaceAll("_"," ");class bM{constructor(){L(this,"ctx",null);L(this,"master",null);L(this,"effects",null);L(this,"music",null);L(this,"padGain",null);L(this,"humGain",null);L(this,"rainGain",null);L(this,"filter",null);L(this,"pad",[]);L(this,"lfo",null);L(this,"noiseBuffer",null);L(this,"brownBuffer",null);L(this,"muted",!1);L(this,"musicEnabled",!0);L(this,"chordClock",0);L(this,"chordIndex",0);L(this,"walk",26473)}get ready(){return this.ctx!==null}unlock(){if(this.ctx){this.ctx.resume();return}const t=window.AudioContext??window.webkitAudioContext;if(!t)return;const e=new t;this.ctx=e,this.master=e.createGain(),this.effects=e.createGain(),this.music=e.createGain(),this.master.gain.value=0,this.effects.gain.value=.82,this.music.gain.value=1,this.effects.connect(this.master),this.music.connect(this.master),this.master.connect(e.destination),this.noiseBuffer=this.makeNoise(!1),this.brownBuffer=this.makeNoise(!0),this.createAmbient(),this.ramp(this.master.gain,this.muted?0:.75,.08),e.resume()}makeNoise(t){const e=this.ctx,n=e.createBuffer(1,e.sampleRate*4,e.sampleRate),s=n.getChannelData(0);let r=0;for(let o=0;o<s.length;o++){const a=Math.random()*2-1;t?(r=(r+.02*a)/1.02,s[o]=r*3.5):s[o]=a}return n}createAmbient(){const t=this.ctx;this.padGain=t.createGain(),this.padGain.gain.value=0,this.filter=t.createBiquadFilter(),this.filter.type="lowpass",this.filter.frequency.value=800,this.filter.Q.value=.8;const e=t.createDelay(2);e.delayTime.value=.72;const n=t.createGain();n.gain.value=.22,this.padGain.connect(this.filter),this.filter.connect(this.music),this.filter.connect(e),e.connect(n),n.connect(e),e.connect(this.music);for(let c=0;c<2;c++){const h=t.createOscillator();h.type=c?"triangle":"sawtooth",h.frequency.value=c?110.4:110,h.detune.value=c?7:-5,h.connect(this.padGain),h.start(),this.pad.push(h)}this.lfo=t.createOscillator();const s=t.createGain();this.lfo.frequency.value=.035,s.gain.value=220,this.lfo.connect(s),s.connect(this.filter.frequency),this.lfo.start(),this.humGain=t.createGain(),this.humGain.gain.value=0;const r=t.createBufferSource();r.buffer=this.brownBuffer,r.loop=!0;const o=t.createBiquadFilter();o.type="lowpass",o.frequency.value=180,r.connect(o),o.connect(this.humGain),this.humGain.connect(this.music),r.start(),this.rainGain=t.createGain(),this.rainGain.gain.value=0;const a=t.createBufferSource();a.buffer=this.noiseBuffer,a.loop=!0;const l=t.createBiquadFilter();l.type="bandpass",l.frequency.value=2600,l.Q.value=.45,a.connect(l),l.connect(this.rainGain),this.rainGain.connect(this.music),a.start(),this.setChord(0,0)}ramp(t,e,n=.08){const s=this.ctx.currentTime;t.cancelScheduledValues(s),t.setValueAtTime(t.value,s),t.linearRampToValueAtTime(e,s+n)}tone(t,e,n,s,r="sine",o=this.effects){if(!this.ctx||!o)return;const a=this.ctx.createOscillator(),l=this.ctx.createGain();a.type=r,a.frequency.setValueAtTime(t,e),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(Math.max(2e-4,s),e+Math.min(.015,n*.2)),l.gain.exponentialRampToValueAtTime(1e-4,e+n),a.connect(l),l.connect(o),a.start(e),a.stop(e+n+.02)}noise(t,e,n,s,r,o=!1){if(!this.ctx||!this.effects)return;const a=this.ctx.createBufferSource(),l=this.ctx.createBiquadFilter(),c=this.ctx.createGain();a.buffer=o?this.brownBuffer:this.noiseBuffer,l.type="lowpass",l.frequency.setValueAtTime(s,t),l.frequency.exponentialRampToValueAtTime(Math.max(20,r),t+e),c.gain.setValueAtTime(1e-4,t),c.gain.exponentialRampToValueAtTime(n,t+e*.25),c.gain.exponentialRampToValueAtTime(1e-4,t+e),a.connect(l),l.connect(c),c.connect(this.effects),a.start(t),a.stop(t+e+.02)}sfx(t,e=1){if(!this.ctx||this.muted)return;const n=this.ctx.currentTime+.004,s=Math.max(0,Math.min(2,e));if(t==="place")this.noise(n,.09,.09*s,900,180,!0),this.tone(105,n,.11,.12*s);else if(t==="bulldoze")this.noise(n,.42,.24*s,4200,100,!1);else if(t==="error")this.tone(196,n,.2,.1*s,"square"),this.tone(207.65,n,.24,.08*s,"triangle");else if(t==="coin")[523.25,659.25,783.99].forEach((r,o)=>this.tone(r,n+o*.07,.16,.09*s));else if(t==="click")this.tone(1100,n,.025,.05*s,"square");else if(t==="levelup")[261.63,329.63,392,523.25,659.25].forEach((r,o)=>this.tone(r,n+o*.085,.28,.075*s,"triangle"));else if(t==="disaster")this.noise(n,1.6,.32*s,70,210,!0);else if(t==="siren")for(let r=0;r<8;r++)this.tone(r&1?740:540,n+r*.16,.18,.055*s,"sine");else t==="whoosh"?this.noise(n,.4,.13*s,180,6e3,!1):this.tone(420,n,.09,.1*s,"sine")}setChord(t,e){if(!this.ctx||!this.filter)return;this.walk=Math.imul(this.walk,1664525)+1013904223>>>0;const n=[[0,7],[5,12],[9,16],[7,14]],s=[[0,7],[3,10],[8,15],[5,12]];this.chordIndex=(this.chordIndex+(this.walk>>>29)%3-1+4)%4;const r=(t>.55?s:n)[this.chordIndex],o=82.41;this.pad.forEach((a,l)=>a.frequency.linearRampToValueAtTime(o*Math.pow(2,r[l]/12),this.ctx.currentTime+4)),this.filter.frequency.linearRampToValueAtTime(820-t*300-e*120,this.ctx.currentTime+3)}setMuted(t){this.muted=t,this.master&&this.ramp(this.master.gain,t?0:.75,.045)}setMusicEnabled(t){this.musicEnabled=t,this.music&&this.ramp(this.music.gain,t?1:0,.08)}update(t,e,n,s){if(!this.ctx||!this.padGain||!this.humGain||!this.rainGain||!this.music)return;this.chordClock+=t,this.chordClock>=16&&(this.chordClock%=16,this.setChord(n,s));const r=this.musicEnabled&&!this.muted,o=r?.026*(1-n*.45):0,a=r?Math.min(.025,Math.log10(e.stats.population+1)*.0048):0,l=r?Math.max(0,Math.min(1,s))*.018:0,c=1-Math.exp(-t*2.5);this.padGain.gain.setTargetAtTime(o,this.ctx.currentTime,Math.max(.03,.3/Math.max(c,.01))),this.humGain.gain.setTargetAtTime(a,this.ctx.currentTime,.5),this.rainGain.gain.setTargetAtTime(l,this.ctx.currentTime,.4)}dispose(){if(this.ctx){for(const t of this.pad)try{t.stop()}catch{}try{this.lfo?.stop()}catch{}this.ctx.close(),this.ctx=null,this.pad=[]}}}const SM="sethcity-saves",fi="saves",_o="sethcity:save:",Zf=["height","water","terrain","tree","zone","road","rail","wire","pipe","subway","tunnel","building","originOffset","level","variant","rotation","age","condition","powered","watered","roadNet","population","jobs","landValue","pollution","noise","crime","fireRisk","traffic","desirability","covPolice","covFire","covHealth","covEducation","covPark","covTransit","onFire","scratchA","scratchB"];function EM(i){let t="";for(let n=0;n<i.length;n+=32768)t+=String.fromCharCode(...i.subarray(n,n+32768));return btoa(t)}function TM(i){const t=atob(i),e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function AM(i){return{type:i.constructor.name,data:EM(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}}function CM(i,t){if(!t||typeof t!="object")throw new Error("Missing grid array");const e=t;if(e.type!==i.constructor.name||typeof e.data!="string")throw new Error("Invalid grid array");const n=TM(e.data);if(n.byteLength!==i.byteLength)throw new Error("Invalid grid array length");new Uint8Array(i.buffer,i.byteOffset,i.byteLength).set(n)}function Kf(i){const t={};for(const r of Zf)t[r]=AM(i.grid[r]);const e=Date.now(),n={seed:i.seed,cityName:i.cityName,mayorName:i.mayorName,difficulty:i.difficulty,grid:t,time:i.time,speed:i.speed,budget:i.budget,stats:i.stats,demand:i.demand,ordinances:i.ordinances,milestones:i.milestones,disasters:i.disasters,vehicles:i.vehicles,news:i.news.slice(-50),papers:i.papers,signs:i.signs,deals:i.deals,history:i.history,tool:i.tool,overlay:i.overlay,unlocked:[...i.unlocked],nextDisasterId:i.nextDisasterId,nextNewsId:i.nextNewsId,tutorialStep:i.tutorialStep,disastersEnabled:i.disastersEnabled},s={v:1,savedAt:e,meta:{name:i.cityName,pop:i.stats.population,funds:i.budget.funds,date:e,year:i.time.year},state:n};return JSON.stringify(s)}function Te(i,t,e){return i[t]===void 0||i[t]===null?e:i[t]}function Jf(i){const t=JSON.parse(i);if(t.v!==1||!t.state||typeof t.state!="object")throw new Error("Unsupported or invalid save");const e=t.state,n=Jc(Te(e,"seed",0),Te(e,"difficulty","normal"));n.cityName=Te(e,"cityName",n.cityName),n.mayorName=Te(e,"mayorName",n.mayorName),n.time={...n.time,...Te(e,"time",{})},n.speed=Te(e,"speed",n.speed);const s=Te(e,"budget",{});n.budget={...n.budget,...s,ledger:{...n.budget.ledger,...s.ledger??{}},loans:s.loans??[]},n.stats={...n.stats,...Te(e,"stats",{})},n.demand={...n.demand,...Te(e,"demand",{})},n.ordinances=Te(e,"ordinances",n.ordinances),n.milestones=Te(e,"milestones",n.milestones),n.disasters=Te(e,"disasters",[]),n.vehicles=Te(e,"vehicles",[]),n.news=Te(e,"news",[]).slice(-50),n.papers=Te(e,"papers",[]),n.signs=Te(e,"signs",[]),n.deals=Te(e,"deals",n.deals),n.history={...n.history,...Te(e,"history",{})},n.tool=Te(e,"tool",n.tool),n.overlay=Te(e,"overlay",n.overlay),n.unlocked=new Set(Te(e,"unlocked",[])),n.nextDisasterId=Te(e,"nextDisasterId",n.nextDisasterId),n.nextNewsId=Te(e,"nextNewsId",n.nextNewsId),n.tutorialStep=Te(e,"tutorialStep",n.tutorialStep),n.disastersEnabled=Te(e,"disastersEnabled",n.disastersEnabled);const r=Te(e,"grid",{});n.grid=new zd;for(const o of Zf)CM(n.grid[o],r[o]);return n.grid.markAllDirty(),n}function ja(){return new Promise((i,t)=>{if(typeof indexedDB>"u"){t(new Error("IndexedDB unavailable"));return}const e=indexedDB.open(SM,1);e.onupgradeneeded=()=>{e.result.objectStoreNames.contains(fi)||e.result.createObjectStore(fi)},e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error)})}async function RM(i,t){const e=await ja();await new Promise((n,s)=>{const r=e.transaction(fi,"readwrite");r.objectStore(fi).put(t,i),r.oncomplete=()=>n(),r.onerror=()=>s(r.error)}),e.close()}async function PM(i){const t=await ja(),e=await new Promise((n,s)=>{const r=t.transaction(fi).objectStore(fi).get(i);r.onsuccess=()=>n(typeof r.result=="string"?r.result:null),r.onerror=()=>s(r.error)});return t.close(),e}async function Dh(i,t="auto"){const e=Kf(i);try{await RM(t,e)}catch{localStorage.setItem(_o+t,e)}}async function Ih(i){let t=null;try{t=await PM(i)}catch{}if(t??(t=localStorage.getItem(_o+i)),!t)return null;try{return Jf(t)}catch{return null}}async function LM(){const i=new Map;try{const e=await ja();await new Promise((n,s)=>{const r=e.transaction(fi).objectStore(fi).openCursor();r.onsuccess=()=>{const o=r.result;if(!o){n();return}typeof o.value=="string"&&i.set(String(o.key),o.value),o.continue()},r.onerror=()=>s(r.error)}),e.close()}catch{}for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e);if(n?.startsWith(_o)){const s=localStorage.getItem(n);s&&i.set(n.slice(_o.length),s)}}const t=[];for(const[e,n]of i)try{const s=JSON.parse(n);t.push({slot:e,...s.meta})}catch{}return t.sort((e,n)=>n.date-e.date)}async function DM(i){try{const t=await ja();await new Promise((e,n)=>{const s=t.transaction(fi,"readwrite");s.objectStore(fi).delete(i),s.oncomplete=()=>e(),s.onerror=()=>n(s.error)}),t.close()}catch{}localStorage.removeItem(_o+i)}async function Qf(){return await Ih("auto")!==null}const t0=Object.freeze(Object.defineProperty({__proto__:null,deleteSave:DM,deserialize:Jf,hasAutosave:Qf,listSaves:LM,loadGame:Ih,saveGame:Dh,serialize:Kf},Symbol.toStringTag,{value:"Module"})),Uh=document.getElementById("scene"),IM=document.getElementById("ui"),Ke=new dx(Uh),Jr=new Wy(Ke.scene,Ke.camera),xo=new rM(Ke.camera,Uh),jc=new bM;let Ne=null,ys=null,Od=null,Zc="none",Jl=0,e0=!1,Ql=0,tc=0;function UM(i){const t=i.grid,e=new _x(Ke.scene,t),n=new Cx(Ke.scene,t),s=new fy(Ke.scene,t),r=new zy(Ke.scene,t,i),o=new sM,a=new sp(i),l=new ap(i);return e.build(),n.rebuildAll(),s.rebuildAll(),r.rebuildAll(),t.dirtyChunks.clear(),t.terrainDirty=!1,a.recomputeAll(),{state:i,sim:a,actions:l,terrainR:e,roadR:n,buildingR:s,propR:r,overlay:o}}function NM(i){i.terrainR.dispose(),i.roadR.dispose(),i.buildingR.dispose(),i.propR.dispose(),i.overlay.dispose()}function Kc(i){Ne&&NM(Ne),Ne=UM(i),Zc="none",xo.focusOn(64,64,90),kt.emit("game:loaded",{})}const Bd={get state(){return Ne.state},get actions(){return Ne.actions},get controls(){return xo},focus(i,t){xo.focusOn(i,t)},setQuality(i){e0=!0,Ke.setQuality(i)},async save(){Ne&&await Dh(Ne.state)},async load(i){const t=await Ih(i);t&&Kc(t)},newGame(i){const t=Jc(i.seed,i.difficulty??"normal");t.cityName=i.name||"SethCity",i.mayor&&(t.mayorName=i.mayor),t.disastersEnabled=i.disasters??!0,Vd(t.grid,{seed:i.seed,water:i.water,hills:i.hills,trees:i.trees,shape:i.shape}),Kc(t)},sfx(i){jc.sfx(i)},overUI(i,t){return ys?ys.hitTest(i,t):!1},onHighlight(i){Ne?.terrainR.setHighlight(i)},onSelect(i){ys?.showTileInspector(i),kt.emit("select:tile",i===null?null:{i})},toast(i,t="info"){Ne&&kt.emit("news",{id:Ne.state.nextNewsId++,tick:Ne.state.time.ticks,text:i,kind:t==="info"?"info":t})},money(i,t,e){kt.emit("money:spent",{amount:i,x:t,y:e,label:""})},async promptSign(){return ys?ys.promptSignText():null}};kt.on("shake",({intensity:i})=>Ke.shake(i));kt.on("news",i=>{Ne&&(Ne.state.news.push(i),Ne.state.news.length>60&&Ne.state.news.splice(0,Ne.state.news.length-60))});Object.defineProperty(window,"__sethcity",{get:()=>Ne?{state:Ne.state,sim:Ne.sim,actions:Ne.actions,controls:xo}:null});kt.on("tile:changed",({i})=>{if(!Ne)return;const t=Ne.state.grid;t.building[i]&&t.age[i]===0&&Ne.buildingR.popIn(i)});async function FM(){const i=Jc(Math.random()*1e9|0,"normal");Vd(i.grid,{seed:i.seed,water:.3,hills:.45,trees:.5,shape:"coastal"}),Kc(i),ys=new wM(IM,Bd),Od=new oM(Uh,Bd),Qf();const t=()=>{jc.unlock(),window.removeEventListener("pointerdown",t)};window.addEventListener("pointerdown",t),window.addEventListener("resize",()=>Ke.resize()),document.getElementById("boot")?.remove();let e=performance.now();const n=s=>{const r=Math.min(.1,(s-e)/1e3);e=s;const o=Ne,a=o.state,l=s/1e3;xo.update(r,a.grid),o.sim.update(r),Jr.update(r,a.time),Ke.updateSky(a.time,Jr.state),a.grid.terrainDirty&&(o.terrainR.build(),a.grid.terrainDirty=!1);let c=6;for(const u of a.grid.dirtyChunks){const d=u%Ve,f=u/Ve|0;if(o.terrainR.buildChunk(d,f),o.roadR.rebuildChunk(d,f),o.buildingR.rebuildChunk(d,f),o.propR.rebuildChunk(d,f),a.grid.dirtyChunks.delete(u),--c<=0)break}a.overlay!==Zc&&(Zc=a.overlay,o.overlay.set(a.overlay),o.overlay.refresh(a),o.terrainR.setOverlayTexture(a.overlay==="none"?null:o.overlay.texture,o.overlay.strength),kt.emit("overlay:changed",{overlay:a.overlay})),a.overlay!=="none"&&(Jl+=r,Jl>.25&&(Jl=0,o.overlay.refresh(a)));const h=Ke.nightFactor;if(o.terrainR.update(r,l,h),o.roadR.update(r,l,h),o.buildingR.update(r,l,h),o.propR.update(r,l,h,a),Od?.update(),ys?.update(r),jc.update(r,a,h,Jr.state.kind==="rain"||Jr.state.kind==="storm"?Jr.state.intensity:0),Ke.render(r),!e0&&(Ql+=r,Ql>4)){Ql=0;const u=Ke.fps;u<42&&Ke.quality!=="low"?Ke.setQuality(Ke.quality==="high"?"medium":"low"):u>57&&Ke.quality==="low"&&Ke.setQuality("medium")}tc+=r,tc>60&&a.speed!==0&&(tc=0,Dh(a,"auto").then(()=>kt.emit("game:saved",{}))),requestAnimationFrame(n)};requestAnimationFrame(n)}FM();
