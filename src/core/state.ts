/** SETHCITY 6769 — the whole mutable game state. FROZEN CONTRACT. */
import { Grid } from './grid';
import {
  STARTING_FUNDS,
  type ActiveDisaster,
  type Budget,
  type CitySign,
  type CityStats,
  type Demand,
  type Difficulty,
  type GameTime,
  type Milestone,
  type NeighborDeal,
  type NewsItem,
  type Newspaper,
  type Ordinance,
  type OverlayId,
  type SpeedId,
  type ToolId,
  type Vehicle,
} from './types';

export interface HistorySeries {
  population: number[];
  funds: number[];
  approval: number[];
  pollution: number[];
  traffic: number[];
  unemployment: number[];
}

export interface GameState {
  seed: number;
  cityName: string;
  mayorName: string;
  difficulty: Difficulty;
  grid: Grid;
  time: GameTime;
  speed: SpeedId;
  budget: Budget;
  stats: CityStats;
  demand: Demand;
  ordinances: Ordinance[];
  milestones: Milestone[];
  disasters: ActiveDisaster[];
  vehicles: Vehicle[];
  news: NewsItem[];
  /** archived monthly newspapers, newest first, capped at 24 */
  papers: Newspaper[];
  signs: CitySign[];
  deals: NeighborDeal[];
  history: HistorySeries;
  tool: ToolId;
  overlay: OverlayId;
  /** ids of catalog buildings unlocked so far */
  unlocked: Set<string>;
  /** running counters */
  nextDisasterId: number;
  nextNewsId: number;
  /** true while the intro tutorial is running */
  tutorialStep: number;
  disastersEnabled: boolean;
}

export function emptyStats(): CityStats {
  return {
    population: 0,
    jobs: 0,
    unemployment: 0,
    homeless: 0,
    happiness: 0.5,
    health: 0.5,
    educationLevel: 0.3,
    safety: 0.5,
    traffic: 0,
    pollution: 0,
    powerDemand: 0,
    powerSupply: 0,
    waterDemand: 0,
    waterSupply: 0,
    approval: 0.5,
    landValueAvg: 0,
    resBuildings: 0,
    comBuildings: 0,
    indBuildings: 0,
  };
}

export function emptyLedger() {
  return {
    incomeRes: 0,
    incomeCom: 0,
    incomeInd: 0,
    incomeOther: 0,
    costRoads: 0,
    costPolice: 0,
    costFire: 0,
    costHealth: 0,
    costEducation: 0,
    costParks: 0,
    costPower: 0,
    costWater: 0,
    costLoans: 0,
    net: 0,
  };
}

export function emptyBudget(): Budget {
  return {
    funds: 50000,
    taxRes: 0.09,
    taxCom: 0.09,
    taxInd: 0.09,
    fundRoads: 1,
    fundPolice: 1,
    fundFire: 1,
    fundHealth: 1,
    fundEducation: 1,
    fundParks: 1,
    loans: [],
    ledger: emptyLedger(),
  };
}

export const ORDINANCES: Ordinance[] = [
  { key: 'recycling', name: 'Recycling Program', desc: '−15% pollution citywide.', costPerCapita: 0.02, active: false },
  { key: 'smoke_detectors', name: 'Smoke Detector Ordinance', desc: '−25% fire risk.', costPerCapita: 0.015, active: false },
  { key: 'neighborhood_watch', name: 'Neighbourhood Watch', desc: '−20% crime.', costPerCapita: 0.012, active: false },
  { key: 'free_clinics', name: 'Free Health Clinics', desc: '+15% health coverage.', costPerCapita: 0.03, active: false },
  { key: 'pro_reading', name: 'Pro-Reading Campaign', desc: '+15% education.', costPerCapita: 0.02, active: false },
  { key: 'transit_subsidy', name: 'Transit Subsidy', desc: '−20% traffic.', costPerCapita: 0.035, active: false, unlockPop: 5000 },
  { key: 'legalise_gambling', name: 'Legalised Gambling', desc: '+income, +crime.', costPerCapita: -0.05, active: false, unlockPop: 10000 },
  { key: 'tourism', name: 'Tourism Board', desc: '+commercial demand.', costPerCapita: 0.025, active: false, unlockPop: 15000 },
  { key: 'clean_air', name: 'Clean Air Act', desc: '−35% industrial pollution, −industrial demand.', costPerCapita: 0.04, active: false, unlockPop: 25000 },
  { key: 'homeless_shelters', name: 'Homeless Shelters', desc: '+approval, −homeless.', costPerCapita: 0.03, active: false, unlockPop: 20000 },
];

export const MILESTONES: Milestone[] = [
  { key: 'hamlet', name: 'Hamlet', desc: 'Your first neighbours arrive.', pop: 100, reached: false, reward: 0 },
  { key: 'village', name: 'Village', desc: 'Schools and clinics unlocked.', pop: 500, reached: false, reward: 2000 },
  { key: 'town', name: 'Town', desc: 'Medium density unlocked. The city gifts you a Mayor’s House.', pop: 2000, reached: false, reward: 5000, rewardKey: 'x_mayor' },
  { key: 'city', name: 'City', desc: 'Avenues, colleges and stadiums unlocked.', pop: 10000, reached: false, reward: 15000 },
  { key: 'capital', name: 'Capital', desc: 'High density and universities unlocked. The Llama Dome arrives.', pop: 30000, reached: false, reward: 40000, rewardKey: 'x_llama' },
  { key: 'boomtown', name: 'Boomtown', desc: 'The Army offers a base — jobs and order, noise and worry.', pop: 45000, reached: false, reward: 60000, rewardKey: 'x_military' },
  { key: 'metropolis', name: 'Metropolis', desc: 'Skyscrapers, airports and fusion unlocked.', pop: 80000, reached: false, reward: 100000 },
  { key: 'arcology', name: 'Arcology Age', desc: 'Self-contained arcologies may now rise.', pop: 120000, reached: false, reward: 150000, rewardKey: 'arco_plymouth' },
  { key: 'megalopolis', name: 'Megalopolis', desc: 'You built a legend. The Launch Arco awaits.', pop: 200000, reached: false, reward: 250000, rewardKey: 'arco_launch' },
];

export const NEIGHBOR_NAMES = ['Dickville', 'Port Willard', 'Flowtown', 'Sharkton'] as const;

export function defaultDeals(): NeighborDeal[] {
  return [
    { key: 'buy_power_1', neighbor: NEIGHBOR_NAMES[0], kind: 'buy_power', amount: 200, pricePerUnit: 2.2, active: false },
    { key: 'sell_power_1', neighbor: NEIGHBOR_NAMES[1], kind: 'sell_power', amount: 200, pricePerUnit: 1.1, active: false },
    { key: 'buy_water_1', neighbor: NEIGHBOR_NAMES[2], kind: 'buy_water', amount: 300, pricePerUnit: 1.6, active: false },
    { key: 'sell_water_1', neighbor: NEIGHBOR_NAMES[3], kind: 'sell_water', amount: 300, pricePerUnit: 0.8, active: false },
    { key: 'garbage_1', neighbor: NEIGHBOR_NAMES[0], kind: 'take_garbage', amount: 1, pricePerUnit: 900, active: false },
  ];
}

export function createState(
  seed = (Math.random() * 1e9) | 0,
  difficulty: Difficulty = 'normal',
): GameState {
  const budget = emptyBudget();
  budget.funds = STARTING_FUNDS[difficulty];
  return {
    seed,
    cityName: 'SethCity',
    mayorName: 'Mayor Seth',
    difficulty,
    grid: new Grid(),
    time: { ticks: 0, day: 1, month: 0, year: 6769, timeOfDay: 0.32, season: 0 },
    speed: 2,
    budget,
    stats: emptyStats(),
    demand: { r: 0.8, c: 0.2, i: 0.4 },
    ordinances: ORDINANCES.map((o) => ({ ...o })),
    milestones: MILESTONES.map((m) => ({ ...m })),
    disasters: [],
    vehicles: [],
    news: [],
    papers: [],
    signs: [],
    deals: defaultDeals(),
    history: {
      population: [],
      funds: [],
      approval: [],
      pollution: [],
      traffic: [],
      unemployment: [],
    },
    tool: 'inspect',
    overlay: 'none',
    unlocked: new Set<string>(),
    nextDisasterId: 1,
    nextNewsId: 1,
    tutorialStep: 0,
    disastersEnabled: true,
  };
}
