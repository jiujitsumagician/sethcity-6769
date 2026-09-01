import type { GameState } from '../core/state';
import { bus } from '../core/events';
import { rebuildRoadNetwork, propagateUtilities } from './network';
import { computeCoverage } from './services';
import { computeFields } from './fields';
import { computeTraffic } from './traffic';
import { computeDemand, recomputeStats, monthlyBudget, checkMilestones } from './economy';
import { growAndDecay } from './zoning';
import { publishPaper } from './newspaper';
import { updateDisasters } from './disasters';

const RATES = [0, 1, 3, 9] as const;

export class Simulation {
  private accumulator = 0;
  private phase = 0;
  constructor(public readonly state: GameState) {}
  update(dt: number): void {
    const rate = RATES[this.state.speed];
    this.state.time.timeOfDay = (this.state.time.timeOfDay + dt / 90) % 1;
    if (!rate) return;
    this.accumulator += Math.min(dt, 0.25) * rate;
    while (this.accumulator >= 1) { this.accumulator--; this.tick(); }
  }
  tick(): void {
    const s = this.state;
    computeDemand(s);
    if (this.phase === 0) { rebuildRoadNetwork(s.grid); propagateUtilities(s); }
    else if (this.phase === 1) computeCoverage(s);
    else if (this.phase === 2) computeFields(s);
    else computeTraffic(s);
    this.phase = (this.phase + 1) & 3;
    updateDisasters(s);
    growAndDecay(s);
    recomputeStats(s);
    checkMilestones(s);
    s.time.ticks++;
    s.time.day++;
    if (s.time.day > 30) {
      s.time.day = 1; s.time.month++;
      if (s.time.month > 11) { s.time.month = 0; s.time.year++; }
      s.time.season = ((s.time.month / 3) | 0) as 0 | 1 | 2 | 3;
      monthlyBudget(s);
      publishPaper(s);
      const h = s.history;
      h.population.push(s.stats.population); h.funds.push(s.budget.funds); h.approval.push(s.stats.approval); h.pollution.push(s.stats.pollution); h.traffic.push(s.stats.traffic); h.unemployment.push(s.stats.unemployment);
      for (const a of [h.population, h.funds, h.approval, h.pollution, h.traffic, h.unemployment]) if (a.length > 240) a.splice(0, a.length - 240);
    }
    bus.emit('stats:updated', s.stats);
    bus.emit('time:updated', s.time);
  }
  recomputeAll(): void {
    const s = this.state;
    rebuildRoadNetwork(s.grid);
    propagateUtilities(s);
    computeCoverage(s);
    computeFields(s);
    computeTraffic(s);
    recomputeStats(s);
    computeDemand(s);
    bus.emit('stats:updated', s.stats);
    bus.emit('budget:updated', s.budget);
    bus.emit('time:updated', s.time);
  }
}
