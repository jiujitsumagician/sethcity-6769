import { defOf } from '../core/catalog';
import { bus } from '../core/events';
import type { GameState } from '../core/state';
import type { DisasterKind, OverlayId } from '../core/types';
import { GRID_W } from '../core/types';
import type { UIHost } from './index';
import { drawLineChart } from './charts';
import type { Toasts } from './toast';

export type PanelId =
  | 'budget'
  | 'statistics'
  | 'city'
  | 'advisors'
  | 'newspaper'
  | 'settings'
  | 'manual'
  | 'inspector';
const disasters: DisasterKind[] = [
  'fire',
  'earthquake',
  'tornado',
  'flood',
  'meteor',
  'blackout',
  'riot',
  'volcano',
  'monster',
  'aircrash',
  'meltdown',
  'hurricane',
  'chemical',
];
const overlays: OverlayId[] = [
  'none',
  'zones',
  'power',
  'water',
  'pollution',
  'noise',
  'crime',
  'landvalue',
  'traffic',
  'transit',
  'density',
  'health',
  'education',
  'fire',
  'desirability',
  'underground',
];

export class Panels {
  readonly element: HTMLElement;
  private current: PanelId | null = null;
  private inspector: number | null = null;
  private paperIndex = 0;
  private lastRefresh = 0;
  private startY = 0;

  constructor(
    private readonly host: UIHost,
    private readonly toast: Toasts,
    private readonly openMenu: () => void,
  ) {
    this.element = document.createElement('div');
    this.element.className = 'panels-layer';
    this.element.innerHTML =
      '<div class="panel-picker popover" data-ui hidden></div><div class="overlay-picker popover" data-ui hidden></div><section class="sheet" data-ui><header class="sheet-head"><div class="sheet-title"></div><button class="sheet-close" aria-label="Close">×</button></header><div class="sheet-body"></div></section>';
    this.q('.sheet-close').onclick = () => this.close();
    const head = this.q('.sheet-head');
    head.addEventListener('pointerdown', (e) => {
      this.startY = e.clientY;
    });
    head.addEventListener('pointerup', (e) => {
      if (e.clientY - this.startY > 70) this.close();
    });
    const pick = this.q('.panel-picker');
    [
      ['budget', 'Budget'],
      ['statistics', 'Statistics'],
      ['city', 'City'],
      ['advisors', 'Advisors'],
      ['newspaper', 'Newspaper'],
      ['manual', 'Help / Manual'],
      ['settings', 'Settings'],
    ].forEach(([id, name]) => {
      const b = document.createElement('button');
      b.className = 'pop-item';
      b.textContent = name;
      b.onclick = () => this.open(id as PanelId);
      pick.append(b);
    });
  }
  showPicker(): void {
    const p = this.q('.panel-picker');
    p.hidden = !p.hidden;
    this.q('.overlay-picker').hidden = true;
  }
  showOverlays(anchor: HTMLElement): void {
    const p = this.q('.overlay-picker');
    p.hidden = !p.hidden;
    this.q('.panel-picker').hidden = true;
    if (p.childElementCount === 0)
      overlays.forEach((id) => {
        const b = document.createElement('button');
        b.className = 'pop-item';
        b.textContent = id === 'none' ? 'No overlay' : title(id);
        b.onclick = () => {
          this.host.state.overlay = id;
          bus.emit('overlay:changed', { overlay: id });
          p.hidden = true;
        };
        p.append(b);
      });
    const r = anchor.getBoundingClientRect();
    p.style.right = `${Math.max(8, innerWidth - r.right)}px`;
    p.style.top = `${r.bottom + 6}px`;
  }
  open(id: PanelId): void {
    this.current = id;
    this.q('.panel-picker').hidden = true;
    this.q('.overlay-picker').hidden = true;
    this.q('.sheet').classList.add('open');
    this.render();
  }
  close(): void {
    this.current = null;
    this.q('.sheet').classList.remove('open');
  }
  showInspector(i: number | null): void {
    this.inspector = i;
    if (i === null) {
      if (this.current === 'inspector') this.close();
      return;
    }
    this.open('inspector');
  }
  update(now: number): void {
    if (this.current && now - this.lastRefresh > 0.5) {
      this.lastRefresh = now;
      this.refreshValues();
    }
  }
  dispose(): void {
    this.element.remove();
  }

  private render(): void {
    if (!this.current) return;
    const names: Record<PanelId, string> = {
      budget: 'Budget',
      statistics: 'Statistics',
      city: 'City',
      advisors: 'Advisors',
      newspaper: 'Llama Ledger',
      settings: 'Settings',
      manual: 'Instruction Manual',
      inspector: 'Tile Inspector',
    };
    this.q('.sheet-title').textContent = names[this.current];
    const body = this.q('.sheet-body');
    body.innerHTML = '';
    switch (this.current) {
      case 'budget':
        this.budget(body);
        break;
      case 'statistics':
        this.statistics(body);
        break;
      case 'city':
        this.city(body);
        break;
      case 'advisors':
        void this.advisors(body);
        break;
      case 'newspaper':
        this.newspaper(body);
        break;
      case 'settings':
        void this.settings(body);
        break;
      case 'manual':
        this.manual(body);
        break;
      case 'inspector':
        this.tile(body);
    }
  }
  private refreshValues(): void {
    const body = this.q('.sheet-body');
    if (this.current === 'budget') {
      const values = [
        this.host.state.budget.ledger.incomeRes,
        this.host.state.budget.ledger.incomeCom,
        this.host.state.budget.ledger.incomeInd,
        this.host.state.budget.ledger.incomeOther,
        -this.host.state.budget.ledger.costRoads,
        -this.host.state.budget.ledger.costPolice,
        -this.host.state.budget.ledger.costFire,
        -this.host.state.budget.ledger.costHealth,
        -this.host.state.budget.ledger.costEducation,
        -this.host.state.budget.ledger.costParks,
        -this.host.state.budget.ledger.costPower,
        -this.host.state.budget.ledger.costWater,
        -this.host.state.budget.ledger.costLoans,
        this.host.state.budget.ledger.net,
      ];
      body
        .querySelectorAll<HTMLElement>('[data-ledger]')
        .forEach((el, i) => (el.textContent = money(values[i] ?? 0)));
    }
    if (this.current === 'statistics') {
      const st = this.host.state.stats;
      const values = [
        st.population.toLocaleString(),
        st.jobs.toLocaleString(),
        pct(st.approval),
        pct(st.health),
        pct(st.educationLevel),
        pct(st.safety),
        String(Math.round(st.landValueAvg)),
        st.homeless.toLocaleString(),
      ];
      body
        .querySelectorAll<HTMLElement>('.tile .v')
        .forEach((el, i) => (el.textContent = values[i] ?? ''));
    }
    if (this.current === 'city') {
      this.host.state.milestones.forEach((m, i) => {
        const bar = body.querySelectorAll<HTMLElement>('.mile .bar i')[i];
        if (bar)
          bar.style.width = `${Math.min(100, (this.host.state.stats.population / m.pop) * 100)}%`;
      });
    }
    if (this.current === 'inspector' && this.inspector !== null) {
      const g = this.host.state.grid,
        i = this.inspector;
      const values = [
        g.landValue[i],
        g.pollution[i],
        g.crime[i],
        g.traffic[i],
        g.powered[i] ? 'Connected' : 'No',
        g.watered[i] ? 'Connected' : 'No',
      ];
      body.querySelectorAll<HTMLElement>('.insp-kv .v').forEach((el, n) => {
        if (n > 0) el.textContent = String(values[n - 1] ?? el.textContent);
      });
    }
  }
  private budget(body: HTMLElement): void {
    const s = this.host.state,
      b = s.budget,
      l = b.ledger;
    body.innerHTML = `<div class="sec">Monthly ledger</div><table class="ledger">${[
      ['Residential tax', l.incomeRes],
      ['Commercial tax', l.incomeCom],
      ['Industrial tax', l.incomeInd],
      ['Other income', l.incomeOther],
      ['Roads', -l.costRoads],
      ['Police', -l.costPolice],
      ['Fire', -l.costFire],
      ['Health', -l.costHealth],
      ['Education', -l.costEducation],
      ['Parks', -l.costParks],
      ['Power', -l.costPower],
      ['Water', -l.costWater],
      ['Loans', -l.costLoans],
    ]
      .map(([n, v]) => `<tr><td>${n}</td><td>${money(v as number)}</td></tr>`)
      .join(
        '',
      )}<tr class="net"><td>Net</td><td>${money(l.net)}</td></tr></table><div class="sec">Tax rates</div>`;
    [
      ['Residential', 'taxRes'],
      ['Commercial', 'taxCom'],
      ['Industrial', 'taxInd'],
    ].forEach(([n, k]) =>
      body.append(
        this.slider(
          n,
          b[k as 'taxRes'] * 100,
          0,
          20,
          1,
          (v) => (b[k as 'taxRes'] = v / 100),
          '%',
        ),
      ),
    );
    body.insertAdjacentHTML(
      'beforeend',
      '<div class="sec">Service funding</div>',
    );
    [
      ['Roads', 'fundRoads'],
      ['Police', 'fundPolice'],
      ['Fire', 'fundFire'],
      ['Health', 'fundHealth'],
      ['Education', 'fundEducation'],
      ['Parks', 'fundParks'],
    ].forEach(([n, k]) =>
      body.append(
        this.slider(
          n,
          b[k as 'fundRoads'] * 100,
          0,
          150,
          5,
          (v) => (b[k as 'fundRoads'] = v / 100),
          '%',
        ),
      ),
    );
    body
      .querySelectorAll('table.ledger td:last-child')
      .forEach((el) => ((el as HTMLElement).dataset.ledger = ''));
    body.insertAdjacentHTML('beforeend', '<div class="sec">Bonds</div>');
    const bond = document.createElement('div');
    bond.className = 'row';
    bond.innerHTML = `<div class="grow"><div class="lbl">Municipal bond</div><div class="sub">§10,000 over 120 months</div></div><button class="btn sm">Take bond</button>`;
    bond.querySelector('button')!.onclick = () =>
      void import('../sim/economy')
        .then((m) => {
          if (m.takeLoan(s, 10000, 120)) {
            this.toast.toast('Bond issued', 'good');
            this.open('budget');
          } else this.toast.toast('Bond request denied', 'bad');
        })
        .catch(() => this.toast.toast('Economy service unavailable', 'bad'));
    body.append(bond);
    b.loans.forEach((loan, i) => {
      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `<div class="grow"><div class="lbl">§${loan.remaining.toLocaleString()} remaining</div><div class="sub">${loan.monthsLeft} months · §${loan.monthly}/mo</div></div><button class="btn sm">Repay</button>`;
      row.querySelector('button')!.addEventListener('click', () => {
        if (b.funds >= loan.remaining) {
          b.funds -= loan.remaining;
          b.loans.splice(i, 1);
          row.remove();
          this.toast.toast('Bond repaid', 'good');
        } else this.toast.toast('Not enough funds', 'bad');
      });
      body.append(row);
    });
    body.insertAdjacentHTML(
      'beforeend',
      '<div class="sec">Neighbour deals</div>',
    );
    s.deals.forEach((d) => {
      const cash =
        d.amount *
        d.pricePerUnit *
        (d.kind.startsWith('sell') || d.kind === 'take_garbage' ? 1 : -1);
      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `<div class="grow"><div class="lbl">${title(d.kind)} · ${d.neighbor}</div><div class="sub">${money(cash)} / month</div></div><button class="tgl ${d.active ? 'on' : ''}" aria-label="Toggle deal"><i></i></button>`;
      row.querySelector('button')!.addEventListener('click', (e) => {
        d.active = !d.active;
        (e.currentTarget as HTMLElement).classList.toggle('on', d.active);
        this.toast.toast(
          d.active ? 'Deal activated' : 'Deal cancelled',
          'info',
        );
      });
      body.append(row);
    });
  }
  private statistics(body: HTMLElement): void {
    const s = this.host.state,
      st = s.stats;
    body.innerHTML = `<div class="tiles">${[
      ['Population', st.population.toLocaleString()],
      ['Jobs', st.jobs.toLocaleString()],
      ['Approval', pct(st.approval)],
      ['Health', pct(st.health)],
      ['Education', pct(st.educationLevel)],
      ['Safety', pct(st.safety)],
      ['Land value', Math.round(st.landValueAvg)],
      ['Homeless', st.homeless.toLocaleString()],
    ]
      .map(
        ([k, v]) =>
          `<div class="tile"><div class="k">${k}</div><div class="v">${v}</div></div>`,
      )
      .join('')}</div>`;
    const defs: [keyof typeof s.history, string, string, boolean?, boolean?][] =
      [
        ['population', 'Population', '#4ad36e'],
        ['funds', 'Funds', '#3ddbd9', false, true],
        ['approval', 'Approval', '#f5b83d', true],
        ['pollution', 'Pollution', '#b88b57', true],
        ['traffic', 'Traffic', '#f0554a', true],
        ['unemployment', 'Unemployment', '#9d84e8', true],
      ];
    defs.forEach(([key, label, color, percent, moneyFlag]) => {
      const wrap = document.createElement('div');
      wrap.className = 'chart-block';
      const c = document.createElement('canvas');
      wrap.append(c);
      body.append(wrap);
      requestAnimationFrame(() =>
        drawLineChart(c, s.history[key], {
          label,
          color,
          percent,
          money: moneyFlag,
        }),
      );
    });
  }
  private city(body: HTMLElement): void {
    const s = this.host.state;
    body.innerHTML = '<div class="sec">Identity</div>';
    body.append(
      this.textField('City name', s.cityName, (v) => (s.cityName = v)),
      this.textField('Mayor', s.mayorName, (v) => (s.mayorName = v)),
    );
    body.insertAdjacentHTML('beforeend', '<div class="sec">Milestones</div>');
    s.milestones.forEach((m) => {
      const p = Math.min(100, (s.stats.population / m.pop) * 100);
      body.insertAdjacentHTML(
        'beforeend',
        `<div class="mile ${m.reached ? 'done' : ''}"><div class="top"><span class="nm">${m.name}</span><span class="target">${m.pop.toLocaleString()}</span></div><div class="desc">${m.desc}</div><div class="bar"><i style="width:${p}%"></i></div></div>`,
      );
    });
    body.insertAdjacentHTML('beforeend', '<div class="sec">Ordinances</div>');
    s.ordinances.forEach((o) => {
      const locked = !!o.unlockPop && s.stats.population < o.unlockPop;
      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `<div class="grow"><div class="lbl">${o.name}</div><div class="sub">${o.desc} · ${money(-o.costPerCapita * s.stats.population)}/mo${locked ? ` · unlock ${o.unlockPop!.toLocaleString()}` : ''}</div></div><button class="tgl ${o.active ? 'on' : ''}" ${locked ? 'disabled' : ''}><i></i></button>`;
      row.querySelector('button')!.onclick = (event) => {
        o.active = !o.active;
        (event.currentTarget as HTMLElement).classList.toggle('on', o.active);
        this.toast.toast(
          `${o.name} ${o.active ? 'enacted' : 'repealed'}`,
          'info',
        );
      };
      body.append(row);
    });
    body.insertAdjacentHTML('beforeend', '<div class="sec">Disasters</div>');
    body.append(
      this.toggleRow(
        'Random disasters',
        s.disastersEnabled,
        (v) => (s.disastersEnabled = v),
      ),
    );
    const grid = document.createElement('div');
    grid.className = 'dis-grid';
    disasters.forEach((kind) => {
      const b = document.createElement('button');
      b.className = 'dis-btn';
      b.innerHTML = `<span class="ic">△</span>${title(kind)}`;
      b.onclick = () =>
        void import('../sim/disasters')
          .then((m) => {
            const d = m.triggerDisaster(s, kind);
            this.toast.toast(
              d ? `${title(kind)} unleashed` : `${title(kind)} unavailable`,
              d ? 'warn' : 'bad',
            );
          })
          .catch(() => this.toast.toast('Disaster service unavailable', 'bad'));
      grid.append(b);
    });
    body.append(grid);
  }
  private async advisors(body: HTMLElement): Promise<void> {
    body.innerHTML = '<div class="paper-empty">Consulting city hall…</div>';
    try {
      const { getAdvice } = await import('../sim/advisors');
      if (this.current !== 'advisors') return;
      body.innerHTML = '';
      getAdvice(this.host.state).forEach((a) => {
        const e = document.createElement('div');
        e.className = `adv m-${a.mood}`;
        e.innerHTML = `<div class="portrait">${a.advisor.slice(0, 1).toUpperCase()}</div><div><div class="who"><b>${a.name}</b><span class="role">${a.advisor}</span><span class="mood-tag m-${a.mood}">${a.mood}</span></div><div class="say"></div></div>`;
        (e.querySelector('.say') as HTMLElement).textContent = a.text;
        body.append(e);
      });
    } catch {
      body.innerHTML =
        '<div class="paper-empty">Advisors are in transit.</div>';
    }
  }
  private newspaper(body: HTMLElement): void {
    const papers = this.host.state.papers;
    if (!papers.length) {
      body.innerHTML =
        '<div class="paper-empty">No editions have been printed yet.</div>';
      return;
    }
    this.paperIndex = Math.min(this.paperIndex, papers.length - 1);
    const p = papers[this.paperIndex];
    body.innerHTML = `<div class="paper-wrap"><article class="paper-sheet"><div class="paper-mast">${p.masthead || 'The Llama Ledger'}</div><div class="paper-dateline"><span>SETHCITY 6769</span><span>${p.month + 1}/${p.year}</span></div><h2 class="paper-headline">${p.headline}</h2>${p.articles.map((a) => `<section class="paper-article"><h4>${a.title}</h4><p>${a.body}</p></section>`).join('')}<div class="paper-classified"><b>Classified</b> — ${p.classified}</div></article><div class="paper-nav"><button class="btn sm prev">Newer</button><span class="ed">Edition ${this.paperIndex + 1} of ${papers.length}</span><button class="btn sm next">Older</button></div></div>`;
    (body.querySelector('.prev') as HTMLButtonElement).disabled =
      this.paperIndex === 0;
    (body.querySelector('.next') as HTMLButtonElement).disabled =
      this.paperIndex === papers.length - 1;
    body.querySelector('.prev')!.addEventListener('click', () => {
      this.paperIndex--;
      this.render();
    });
    body.querySelector('.next')!.addEventListener('click', () => {
      this.paperIndex++;
      this.render();
    });
  }
  private async settings(body: HTMLElement): Promise<void> {
    const s = this.host.state;
    body.innerHTML = '<div class="sec">Graphics</div>';
    const seg = document.createElement('div');
    seg.className = 'seg';
    (['low', 'medium', 'high', 'auto'] as const).forEach((q) => {
      const b = document.createElement('button');
      b.textContent = title(q);
      b.onclick = () => {
        seg
          .querySelectorAll('button')
          .forEach((x) => x.classList.toggle('on', x === b));
        if (q === 'auto') {
          localStorage.removeItem('sethcity:quality');
          this.toast.toast('Adaptive quality enabled', 'info');
        } else {
          localStorage.setItem('sethcity:quality', q);
          this.host.setQuality(q);
          this.toast.toast(`${title(q)} quality selected`, 'info');
        }
      };
      seg.append(b);
    });
    body.append(seg);
    body.insertAdjacentHTML(
      'beforeend',
      '<div class="sec">Audio & simulation</div>',
    );
    body.append(
      this.toggleRow(
        'Sound effects',
        localStorage.getItem('sethcity:sound') !== 'off',
        (v) => {
          localStorage.setItem('sethcity:sound', v ? 'on' : 'off');
          this.toast.toast(`Sound effects ${v ? 'on' : 'off'}`, 'info');
        },
      ),
      this.toggleRow(
        'Music',
        localStorage.getItem('sethcity:music') !== 'off',
        (v) => {
          localStorage.setItem('sethcity:music', v ? 'on' : 'off');
          this.toast.toast(`Music ${v ? 'on' : 'off'}`, 'info');
        },
      ),
      this.toggleRow(
        'Day / night cycle',
        localStorage.getItem('sethcity:daynight') === 'on',
        (v) => {
          localStorage.setItem('sethcity:daynight', v ? 'on' : 'off');
          this.toast.toast(
            v ? 'Day / night cycle on' : 'Permanent daytime on',
            'info',
          );
        },
      ),
      this.toggleRow(
        'Disasters',
        s.disastersEnabled,
        (v) => (s.disastersEnabled = v),
      ),
    );
    const manual = document.createElement('button');
    manual.className = 'btn full manual-open';
    manual.textContent = 'Open Instruction Manual';
    manual.onclick = () => this.open('manual');
    body.append(manual);
    body.insertAdjacentHTML(
      'beforeend',
      `<div class="sec">Save game</div><div class="row"><div class="grow"><div class="lbl">${s.cityName}</div><div class="sub">${title(s.difficulty)} ${s.difficulty === 'sandbox' ? '· ∞ funds' : ''}</div></div><button class="btn save-now">Save now</button></div><div class="save-list"></div>`,
    );
    body.querySelector('.save-now')!.addEventListener(
      'click',
      () =>
        void this.host
          .save()
          .then(() => this.toast.toast('City saved', 'good'))
          .catch(() => this.toast.toast('Save failed', 'bad')),
    );
    try {
      const mod = await import('../save/save');
      const saves = await mod.listSaves();
      if (this.current !== 'settings' || !body.isConnected) return;
      const list = body.querySelector('.save-list');
      if (!list) return;
      saves.forEach((meta) => {
        const row = document.createElement('div');
        row.className = 'save-row';
        row.innerHTML = `<div class="meta"><b>${meta.name}</b><div class="sub">Pop ${meta.pop.toLocaleString()} · §${meta.funds.toLocaleString()}</div></div><button class="btn sm load">Load</button><button class="btn sm danger del">Delete</button>`;
        row.querySelector('.load')!.addEventListener(
          'click',
          () =>
            void this.host
              .load(meta.slot)
              .then(() => this.toast.toast('City loaded', 'good'))
              .catch(() => this.toast.toast('Load failed', 'bad')),
        );
        row.querySelector('.del')!.addEventListener(
          'click',
          () =>
            void mod
              .deleteSave(meta.slot)
              .then(() => {
                row.remove();
                this.toast.toast('Save deleted', 'info');
              })
              .catch(() => this.toast.toast('Delete failed', 'bad')),
        );
        list.append(row);
      });
    } catch {
      const list = body.querySelector('.save-list');
      if (list) list.textContent = 'Saved cities unavailable.';
    }
    const reset = document.createElement('button');
    reset.className = 'btn danger full';
    reset.textContent = 'Reset / New City';
    reset.onclick = () => {
      this.close();
      this.openMenu();
    };
    body.append(reset);
    body.insertAdjacentHTML(
      'beforeend',
      '<p class="about">SETHCITY 6769 · A miniature city beyond tomorrow.</p>',
    );
  }
  private manual(body: HTMLElement): void {
    const sections: [string, string[]][] = [
      [
        'Getting Started',
        [
          'Pause while you plan. Your treasury does not earn interest.',
          'Drag a street from open land to make the first spine of your city.',
          'Paint residential zones within 3 tiles of that road.',
          'Build a power source, then connect it with roads or power lines.',
          'Place a shoreline pump or water tower.',
          'Complete the loop with roads or pipes; watered tiles glow blue.',
          'Unpause and watch demand. Buildings appear only when every basic need is met.',
        ],
      ],
      [
        'Zones & Growth',
        [
          'Green is residential, blue is commercial, amber is industrial.',
          'Road access means a connected road within 3 tiles.',
          'Growth needs road access, power, water, enough land value, and positive demand.',
          'Low-density zones start cheaply and tolerate modest land value.',
          'Medium and high density need stronger land value and services.',
          'Commercial wants customers, access, and manageable traffic.',
          'Industry supplies jobs but creates pollution and noise.',
          'Farms prefer clean, inexpensive land away from dense development.',
          'Buildings level up after conditions stay healthy for a while.',
          'Utility failure, weak demand, or poor access causes decay and abandonment.',
          'Bulldoze abandoned buildings; they drag down nearby land value.',
        ],
      ],
      [
        'Power',
        [
          'Power plants and renewables create supply.',
          'Roads carry power, so compact blocks need fewer lines.',
          'Power lines bridge gaps and reach remote facilities.',
          'Buildings must touch the live conductor network.',
          'The Power overlay shows connected areas and red shortages.',
          'Demand above supply causes brown-outs, starting in lower-value areas.',
          'Keep reserve capacity before adding dense zones.',
          'Neighbour deals can buy supply or sell genuine surplus.',
        ],
      ],
      [
        'Water',
        [
          'Pumps must sit at a shoreline and must themselves have power.',
          'Water towers add local capacity away from the coast.',
          'Treatment and desalination unlock stronger options later.',
          'Roads contain water mains automatically.',
          'Pipes are useful across roadless gaps and underground corridors.',
          'A fed road or pipe waters tiles within a 4-tile Chebyshev reach.',
          'Use Underground view to trace bright blue mains.',
          'Broken power at a pump can dry out an entire district.',
        ],
      ],
      [
        'Transport & Traffic',
        [
          'Streets are cheap; avenues carry much more traffic.',
          'Highways carry the most traffic but cost heavily.',
          'Rail connects major corridors without sharing road capacity.',
          'Subway tunnels are drawn and inspected in Underground view.',
          'Subway stations need connected tunnels to deliver their full benefit.',
          'Transit coverage reduces car trips and congestion.',
          'Use the Traffic overlay to find red bottlenecks.',
          'Avoid forcing every district through one intersection.',
        ],
      ],
      [
        'Services & Coverage',
        [
          'Police reduces crime; fire stations reduce fire risk.',
          'Clinics and hospitals improve health.',
          'Schools and universities raise education and long-term prosperity.',
          'Parks improve land value and make nearby growth easier.',
          'Transit buildings add coverage and reduce road pressure.',
          'Coverage fades with distance and weak funding.',
          'Service funding sliders change effective coverage.',
          'Use matching overlays to see gaps before complaints become crises.',
        ],
      ],
      [
        'Budget, Taxes, Bonds & Deals',
        [
          'Residential, commercial, and industrial taxes can be set separately.',
          'High taxes raise cash but suppress demand.',
          'Funding below 100% weakens the service it pays for.',
          'The monthly ledger shows every recurring income and cost.',
          'Bonds provide immediate cash and create monthly repayments.',
          'Repay a bond early only when the treasury covers its balance.',
          'Neighbour deals trade utilities or garbage capacity for monthly cash.',
          'Check the sign of every deal: green income and red expense.',
          'Sandbox ignores spending and unlocks everything.',
        ],
      ],
      [
        'Ordinances',
        [
          'Ordinances live in the City panel.',
          'Each toggle has a continuing per-capita cost.',
          'Recycling and clean-air rules reduce environmental damage.',
          'Safety ordinances can reduce fire and crime risks.',
          'Some ordinances unlock only after population milestones.',
          'Legalised gambling brings trade-offs; watch city indicators.',
          'Toggle ordinances deliberately, then inspect the next monthly ledger.',
        ],
      ],
      [
        'Overlays & Underground',
        [
          'Zones — zoning colours and empty painted lots.',
          'Power — live supply coverage and unpowered red areas.',
          'Water — watered coverage and dry gaps.',
          'Pollution — clean green through dirty brown.',
          'Noise — quiet clear through loud purple.',
          'Crime — transparent safety through red hotspots.',
          'Land Value — blue low, green healthy, gold premium.',
          'Traffic — green flow, amber pressure, red congestion.',
          'Transit — cyan public-transport coverage.',
          'Density — where development is concentrated.',
          'Health — relative public-health conditions.',
          'Education — access and educational strength.',
          'Fire — fire-service coverage and risk.',
          'Desirability — combined appeal for development.',
          'Underground — dark view with blue pipes and orange subway tunnels.',
          'No overlay — restores the normal city view.',
        ],
      ],
      [
        'Disasters',
        [
          'Random disasters can be disabled in Settings or the City panel.',
          'Manual disaster buttons always work when their prerequisites exist.',
          'Fire spreads faster where risk is high and coverage is weak.',
          'Floods and hurricanes punish exposed shorelines.',
          'Blackouts expose cities with no reserve power.',
          'Riots favour high-crime, low-safety areas.',
          'Air crashes require an airport; meltdowns require a nuclear plant.',
          'Pause after impact, inspect damage, then restore roads and utilities first.',
        ],
      ],
      [
        'Milestones & Rewards',
        [
          'Population milestones appear in the City panel.',
          'Each bar shows progress toward its target.',
          'Reached milestones can grant cash and special reward buildings.',
          'Reward buildings appear in the Special drawer.',
          'Some rewards are free but still need suitable land and access.',
          'A milestone announcement also appears in city news.',
        ],
      ],
      [
        'Seven Useful Tips',
        [
          'Build compactly: roads carry both power and water.',
          'Leave room to upgrade streets into wider corridors.',
          'Keep dirty industry downwind and away from valuable homes.',
          'Maintain spare power and water before painting high density.',
          'Use overlays early; complaints arrive after the underlying problem.',
          'Raise taxes gently, one category at a time, and watch demand.',
          'Save before experimenting with bonds, deals, or disasters.',
        ],
      ],
    ];
    const article = document.createElement('article');
    article.className = 'manual';
    const intro = document.createElement('p');
    intro.className = 'manual-intro';
    intro.textContent =
      'Build the loop, read the overlays, and grow at the pace your utilities can support.';
    article.append(intro);
    sections.forEach(([heading, items]) => {
      const section = document.createElement('section');
      const h = document.createElement('h3');
      h.textContent = heading;
      const ul = document.createElement('ul');
      items.forEach((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        ul.append(li);
      });
      section.append(h, ul);
      article.append(section);
    });
    body.append(article);
  }
  private tile(body: HTMLElement): void {
    if (this.inspector === null) return;
    const s = this.host.state,
      g = s.grid,
      tapped = this.inspector,
      origin = g.originOf(tapped % GRID_W, Math.floor(tapped / GRID_W)),
      i = origin >= 0 ? origin : tapped,
      d = defOf(g.building[i]);
    const zone =
      [
        'None',
        'Residential Low',
        'Residential Medium',
        'Residential High',
        'Commercial Low',
        'Commercial High',
        'Farmland',
        'Light Industry',
        'Heavy Industry',
      ][g.zone[tapped]] ?? 'None';
    body.innerHTML = `<div class="insp-title"><div><div class="big">${g.building[i] ? d.name : zone === 'None' ? 'Empty land' : zone}</div><div class="sub">Tile ${tapped % GRID_W}, ${Math.floor(tapped / GRID_W)} · Level ${g.level[i] || 0} · Condition ${g.condition[i]}%</div></div></div><div class="insp-grid">${[
      ['Zone', zone],
      ['Land value', g.landValue[tapped]],
      ['Pollution', g.pollution[tapped]],
      ['Crime', g.crime[tapped]],
      ['Traffic', g.traffic[tapped]],
      ['Power', g.powered[tapped] ? 'Connected' : 'No'],
      ['Water', g.watered[tapped] ? 'Connected' : 'No'],
    ]
      .map(
        ([k, v]) =>
          `<div class="insp-kv"><span class="k">${k}</span><span class="v">${v}</span></div>`,
      )
      .join(
        '',
      )}</div><button class="btn danger full bulldoze">Bulldoze</button>`;
    body.querySelector('.bulldoze')!.addEventListener('click', () => {
      const x = tapped % GRID_W,
        y = Math.floor(tapped / GRID_W);
      const r = this.host.actions.applyTool('bulldoze', x, y, x, y, false);
      this.toast.toast(
        r.ok ? 'Bulldozed' : (r.reason ?? 'Cannot bulldoze'),
        r.ok ? 'good' : 'bad',
      );
      if (r.ok) this.close();
    });
  }
  private slider(
    name: string,
    value: number,
    min: number,
    max: number,
    step: number,
    on: (v: number) => void,
    suffix: string,
  ): HTMLElement {
    const row = document.createElement('label');
    row.className = 'range-row';
    row.innerHTML = `<span>${name}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${value}"><output>${Math.round(value)}${suffix}</output>`;
    const input = row.querySelector('input')!;
    input.oninput = () => {
      const v = Number(input.value);
      row.querySelector('output')!.textContent = `${v}${suffix}`;
      on(v);
    };
    return row;
  }
  private toggleRow(
    name: string,
    value: boolean,
    on: (v: boolean) => void,
  ): HTMLElement {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<div class="grow"><div class="lbl">${name}</div></div><button class="tgl ${value ? 'on' : ''}"><i></i></button>`;
    row.querySelector('button')!.onclick = (e) => {
      value = !value;
      (e.currentTarget as HTMLElement).classList.toggle('on', value);
      on(value);
    };
    return row;
  }
  private textField(
    name: string,
    value: string,
    on: (v: string) => void,
  ): HTMLElement {
    const label = document.createElement('label');
    label.className = 'field';
    label.innerHTML = `<span>${name}</span><input class="tin" maxlength="32">`;
    const i = label.querySelector('input')!;
    i.value = value;
    i.onchange = () => on(i.value.trim() || value);
    return label;
  }
  private q(sel: string): HTMLElement {
    return this.element.querySelector(sel) as HTMLElement;
  }
}
const title = (s: string) =>
  s.replaceAll('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const pct = (v: number) => `${Math.round(v * 100)}%`;
const money = (v: number) =>
  `${v < 0 ? '−' : '+'}§${Math.abs(Math.round(v)).toLocaleString()}`;
