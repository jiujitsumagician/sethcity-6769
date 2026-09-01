import { TILE_COUNT } from '../core/types';
import type { GameState } from '../core/state';
import { CATALOG, defOf } from '../core/catalog';
import { bus } from '../core/events';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const diffCost = (s: GameState) => s.difficulty === 'easy' ? 0.8 : s.difficulty === 'hard' ? 1.25 : 1;
const taxYield = (s: GameState) => s.difficulty === 'easy' ? 1.25 : s.difficulty === 'hard' ? 0.8 : 1;

export function computeDemand(state: GameState): void {
  const { stats, budget } = state;
  const jobsPerResident = stats.population ? stats.jobs / stats.population : 0.55;
  const housingPressure = stats.jobs ? stats.population / Math.max(1, stats.jobs * 1.8) : 0;
  let r = 0.62 + (jobsPerResident - 0.48) * 0.9 - budget.taxRes * 3.8 - stats.pollution * 0.22;
  let c = 0.28 + stats.population / Math.max(1200, stats.comBuildings * 1700 + 1200) - housingPressure * 0.18 - budget.taxCom * 3.5;
  let ind = 0.42 + housingPressure * 0.25 - stats.unemployment * 0.55 - budget.taxInd * 3.2;
  let seaport = false;
  let airport = false;
  for (let i = 0; i < TILE_COUNT; i++) {
    if (!state.grid.building[i] || state.grid.originOffset[i]) continue;
    const key = defOf(state.grid.building[i]).key;
    if (key === 't_port') seaport = true;
    else if (key === 't_airport') airport = true;
  }
  if (seaport) ind += 0.22;
  if (airport) c += 0.28;
  for (const o of state.ordinances) if (o.active) {
    if (o.key === 'tourism') c += 0.2;
    else if (o.key === 'clean_air') ind -= 0.16;
    else if (o.key === 'legalise_gambling') c += 0.08;
  }
  state.demand.r = Math.max(-1, Math.min(1, r));
  state.demand.c = Math.max(-1, Math.min(1, c));
  state.demand.i = Math.max(-1, Math.min(1, ind));
}

export function recomputeStats(state: GameState): void {
  const g = state.grid;
  const s = state.stats;
  let pop = 0, jobs = 0, lv = 0, pol = 0, health = 0, edu = 0, safe = 0, n = 0;
  let rb = 0, cb = 0, ib = 0;
  for (let i = 0; i < TILE_COUNT; i++) {
    pop += g.population[i]; jobs += g.jobs[i];
    if (!g.water[i]) { lv += g.landValue[i]; pol += g.pollution[i]; health += g.covHealth[i]; edu += g.covEducation[i]; safe += 255 - g.crime[i]; n++; }
    if (g.building[i] && !g.originOffset[i]) {
      const c = defOf(g.building[i]).category;
      if (c === 'residential') rb++; else if (c === 'commercial') cb++; else if (c === 'industrial') ib++;
    }
  }
  s.population = pop; s.jobs = jobs;
  s.unemployment = pop ? clamp01((pop * 0.48 - jobs) / (pop * 0.48)) : 0;
  s.homeless = Math.max(0, Math.round(pop * Math.max(0, s.unemployment - 0.3) * 0.08));
  s.landValueAvg = n ? lv / n : 0; s.pollution = n ? pol / n / 255 : 0;
  s.health = n ? clamp01(0.35 + health / n / 380) : 0.5;
  s.educationLevel = n ? clamp01(0.2 + edu / n / 330) : 0.3;
  s.safety = n ? clamp01(safe / n / 255) : 0.5;
  s.happiness = clamp01(0.62 + s.landValueAvg / 700 + s.health * 0.12 + s.safety * 0.12 - s.unemployment * 0.35 - s.traffic * 0.2 - s.pollution * 0.3);
  s.approval = clamp01(s.happiness * 0.72 + s.safety * 0.12 + s.health * 0.08 + s.educationLevel * 0.08);
  s.resBuildings = rb; s.comBuildings = cb; s.indBuildings = ib;
}

export function monthlyBudget(state: GameState): void {
  const b = state.budget, l = b.ledger;
  for (const k of Object.keys(l) as (keyof typeof l)[]) l[k] = 0;
  const yieldMul = taxYield(state);
  l.incomeRes = state.stats.population * b.taxRes * 1.7 * yieldMul;
  let comJobs = 0, indJobs = 0;
  for (let i = 0; i < TILE_COUNT; i++) if (state.grid.building[i] && !state.grid.originOffset[i]) {
    const d = defOf(state.grid.building[i]);
    if (d.category === 'commercial') comJobs += d.jobs; else if (d.category === 'industrial') indJobs += d.jobs;
    const cost = d.upkeep * diffCost(state);
    if (d.category === 'power') l.costPower += cost;
    else if (d.category === 'water') l.costWater += cost;
    else if (d.category === 'safety') { l.costPolice += cost * b.fundPolice; l.costFire += cost * b.fundFire; }
    else if (d.category === 'health') l.costHealth += cost * b.fundHealth;
    else if (d.category === 'education') l.costEducation += cost * b.fundEducation;
    else if (d.category === 'leisure') l.costParks += cost * b.fundParks;
    else l.costRoads += cost * 0.15 * b.fundRoads;
  }
  l.incomeCom = comJobs * b.taxCom * 4.2 * yieldMul; l.incomeInd = indJobs * b.taxInd * 3.7 * yieldMul;
  let roadTiles = 0; for (let i = 0; i < TILE_COUNT; i++) if (state.grid.road[i] || state.grid.rail[i] || state.grid.subway[i]) roadTiles++;
  l.costRoads += roadTiles * 0.18 * b.fundRoads * diffCost(state);
  for (const o of state.ordinances) if (o.active) l.incomeOther -= o.costPerCapita * state.stats.population;
  for (const d of state.deals) if (d.active) { const cash = d.amount * d.pricePerUnit; if (d.kind.startsWith('sell_') || d.kind === 'take_garbage') l.incomeOther += cash; else l.incomeOther -= cash; }
  for (let i = b.loans.length - 1; i >= 0; i--) { const loan = b.loans[i]; const pay = Math.min(loan.remaining, loan.monthly); loan.remaining -= pay; loan.monthsLeft--; l.costLoans += pay; if (loan.monthsLeft <= 0 || loan.remaining <= 0.01) b.loans.splice(i, 1); }
  l.net = l.incomeRes + l.incomeCom + l.incomeInd + l.incomeOther - l.costRoads - l.costPolice - l.costFire - l.costHealth - l.costEducation - l.costParks - l.costPower - l.costWater - l.costLoans;
  if (state.difficulty !== 'sandbox') b.funds += l.net;
  bus.emit('budget:updated', b);
}

export function takeLoan(state: GameState, principal: number, months: number): boolean {
  if (state.budget.loans.length >= 3 || principal < 5000 || principal > 100000 || months < 60 || months > 240) return false;
  const rate = 0.06 + (principal / 100000) * 0.025 + (240 - months) / 240 * 0.015;
  const monthly = principal * (rate / 12) / (1 - Math.pow(1 + rate / 12, -months));
  state.budget.loans.push({ principal, remaining: monthly * months, monthly, monthsLeft: months, rate });
  state.budget.funds += principal; bus.emit('budget:updated', state.budget); return true;
}

export function checkMilestones(state: GameState): void {
  for (const m of state.milestones) if (!m.reached && state.stats.population >= m.pop) {
    m.reached = true; state.budget.funds += m.reward; if (m.rewardKey) state.unlocked.add(m.rewardKey);
    const news = { id: state.nextNewsId++, tick: state.time.ticks, text: `${m.name} reached! ${m.desc}`, kind: 'good' as const };
    state.news.unshift(news); if (state.news.length > 100) state.news.length = 100;
    bus.emit('milestone', m); bus.emit('news', news);
  }
}

export function unlockedKeys(state: GameState): Set<string> {
  const out = new Set<string>(state.unlocked);
  for (const d of CATALOG) if (state.difficulty === 'sandbox' || (!d.grown && !d.unlockPop || (d.unlockPop ?? Infinity) <= state.stats.population)) out.add(d.key);
  for (const m of state.milestones) if (m.reached && m.rewardKey) out.add(m.rewardKey);
  return out;
}
