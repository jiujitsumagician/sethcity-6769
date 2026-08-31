/**
 * SETHCITY 6769 — shared type contracts.
 * EVERY module compiles against this file. Do not change exported signatures
 * without updating CONTRACTS.md; agents must treat this as frozen.
 */

/* ────────────────────────────── world constants ───────────────────────────── */

export const GRID_W = 128;
export const GRID_H = 128;
export const TILE = 1; // world units per tile
export const CHUNK = 16; // tiles per render chunk edge
export const CHUNKS_X = GRID_W / CHUNK;
export const CHUNKS_Y = GRID_H / CHUNK;
export const TILE_COUNT = GRID_W * GRID_H;
/** Terrain elevation is quantised to this many world units per step. */
export const HEIGHT_STEP = 0.35;
export const SEA_LEVEL = 0; // height value considered water surface

export const idx = (x: number, y: number) => y * GRID_W + x;
export const tx = (i: number) => i % GRID_W;
export const ty = (i: number) => (i / GRID_W) | 0;
export const inBounds = (x: number, y: number) =>
  x >= 0 && y >= 0 && x < GRID_W && y < GRID_H;

/* ────────────────────────────────── enums ─────────────────────────────────── */

export const enum Zone {
  None = 0,
  ResLow = 1,
  ResMed = 2,
  ResHigh = 3,
  ComLow = 4,
  ComHigh = 5,
  IndAgri = 6,
  IndLight = 7,
  IndHeavy = 8,
}

export const enum RoadType {
  None = 0,
  Street = 1,
  Avenue = 2,
  Highway = 3,
}

export const enum TerrainKind {
  Grass = 0,
  Sand = 1,
  Rock = 2,
  Snow = 3,
  Dirt = 4,
  Forest = 5,
}

/** Visual archetype used by the procedural building mesh generator. */
export type Archetype =
  | 'house'
  | 'rowhouse'
  | 'apartment'
  | 'tower'
  | 'shop'
  | 'office'
  | 'skyscraper'
  | 'mall'
  | 'farm'
  | 'workshop'
  | 'factory'
  | 'refinery'
  | 'warehouse'
  | 'powerplant'
  | 'windturbine'
  | 'solarfarm'
  | 'watertower'
  | 'civic'
  | 'hospital'
  | 'school'
  | 'university'
  | 'stadium'
  | 'park'
  | 'plaza'
  | 'landmark'
  | 'port'
  | 'airport'
  | 'transit'
  | 'rubble';

export type Category =
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'power'
  | 'water'
  | 'safety'
  | 'health'
  | 'education'
  | 'leisure'
  | 'transport'
  | 'special';

/* ────────────────────────────── building catalog ──────────────────────────── */

export interface BuildingDef {
  /** stable numeric id, index into CATALOG */
  id: number;
  key: string;
  name: string;
  category: Category;
  archetype: Archetype;
  /** footprint in tiles */
  w: number;
  h: number;
  /** construction cost in §; 0 for zone-grown buildings (paid by sim) */
  cost: number;
  /** monthly upkeep in § */
  upkeep: number;
  /** true when the sim grows it on a zone rather than the player placing it */
  grown: boolean;
  /** zone it grows on (grown buildings only) */
  zone?: Zone;
  /** development level 1..5 required to appear */
  level?: number;
  /** residents housed */
  residents: number;
  /** jobs provided */
  jobs: number;
  /** MW consumed (positive) */
  power: number;
  /** MW produced */
  powerOut: number;
  /** water units consumed */
  water: number;
  /** water units produced */
  waterOut: number;
  /** ambient pollution emitted 0..255 at source */
  pollution: number;
  /** noise 0..255 at source */
  noise: number;
  /** service coverage this building projects */
  service?: {
    kind: 'police' | 'fire' | 'health' | 'education' | 'park' | 'transit';
    radius: number;
    strength: number;
    /** education tier: 1 school, 2 college, 3 university */
    tier?: number;
  };
  /** land-value bonus in radius */
  beauty?: { radius: number; strength: number };
  /** minimum land value needed to appear (grown buildings) */
  minLandValue?: number;
  /** must touch water to build */
  needsWater?: boolean;
  /** must be flat ground */
  needsFlat?: boolean;
  /** unlock population threshold */
  unlockPop?: number;
  /** colour hints for the mesh generator (hex) */
  palette?: number[];
  /** approximate height in world units (mesh generator may vary ±25%) */
  height?: number;
  desc?: string;
}

/* ─────────────────────────────── player tools ─────────────────────────────── */

export type ToolId =
  | 'inspect'
  | 'bulldoze'
  | 'road_street'
  | 'road_avenue'
  | 'road_highway'
  | 'rail'
  | 'wire'
  | 'pipe'
  | 'subway'
  | 'sign'
  | 'tree'
  | 'water_place'
  | `zone_${string}`
  | `build_${string}`
  | 'terrain_raise'
  | 'terrain_lower'
  | 'terrain_level';

export type OverlayId =
  | 'none'
  | 'zones'
  | 'power'
  | 'water'
  | 'pollution'
  | 'noise'
  | 'crime'
  | 'landvalue'
  | 'traffic'
  | 'transit'
  | 'density'
  | 'health'
  | 'education'
  | 'fire'
  | 'desirability'
  | 'underground';

export type Difficulty = 'easy' | 'normal' | 'hard' | 'sandbox';

export const STARTING_FUNDS: Record<Difficulty, number> = {
  easy: 100000,
  normal: 50000,
  hard: 20000,
  sandbox: 999999999,
};

/** a player-placed text sign */
export interface CitySign {
  x: number;
  y: number;
  text: string;
}

/** monthly buy/sell agreement with a neighbouring city */
export interface NeighborDeal {
  key: string;
  neighbor: string;
  kind: 'buy_power' | 'sell_power' | 'buy_water' | 'sell_water' | 'take_garbage';
  amount: number;
  pricePerUnit: number;
  active: boolean;
}

export interface AdvisorMessage {
  advisor: 'finance' | 'safety' | 'health' | 'education' | 'transport' | 'environment' | 'planning';
  name: string;
  mood: 'happy' | 'neutral' | 'worried' | 'angry';
  text: string;
}

/** monthly newspaper edition */
export interface Newspaper {
  year: number;
  month: number;
  masthead: string;
  headline: string;
  articles: { title: string; body: string }[];
  classified: string;
}

/* ─────────────────────────────── city statistics ──────────────────────────── */

export interface Demand {
  r: number; // -1..1
  c: number;
  i: number;
}

export interface Budget {
  funds: number;
  /** tax rates 0..0.20 */
  taxRes: number;
  taxCom: number;
  taxInd: number;
  /** service funding multipliers 0..1.5 */
  fundRoads: number;
  fundPolice: number;
  fundFire: number;
  fundHealth: number;
  fundEducation: number;
  fundParks: number;
  loans: Loan[];
  /** last computed monthly ledger */
  ledger: Ledger;
}

export interface Loan {
  principal: number;
  remaining: number;
  monthly: number;
  monthsLeft: number;
  rate: number;
}

export interface Ledger {
  incomeRes: number;
  incomeCom: number;
  incomeInd: number;
  incomeOther: number;
  costRoads: number;
  costPolice: number;
  costFire: number;
  costHealth: number;
  costEducation: number;
  costParks: number;
  costPower: number;
  costWater: number;
  costLoans: number;
  net: number;
}

export interface CityStats {
  population: number;
  jobs: number;
  unemployment: number; // 0..1
  homeless: number;
  happiness: number; // 0..1
  health: number; // 0..1
  educationLevel: number; // 0..1
  safety: number; // 0..1
  traffic: number; // 0..1 congestion
  pollution: number; // 0..1 average
  powerDemand: number;
  powerSupply: number;
  waterDemand: number;
  waterSupply: number;
  approval: number; // 0..1 mayor rating
  landValueAvg: number;
  /** counts by zone category */
  resBuildings: number;
  comBuildings: number;
  indBuildings: number;
}

export interface GameTime {
  /** total elapsed sim ticks */
  ticks: number;
  day: number;
  month: number; // 0..11
  year: number;
  /** 0..1 fraction of day, drives the sun */
  timeOfDay: number;
  season: 0 | 1 | 2 | 3; // spring summer autumn winter
}

export type SpeedId = 0 | 1 | 2 | 3; // paused, slow, normal, fast

export interface Ordinance {
  key: string;
  name: string;
  desc: string;
  costPerCapita: number;
  active: boolean;
  unlockPop?: number;
}

export interface Milestone {
  key: string;
  name: string;
  desc: string;
  pop: number;
  reached: boolean;
  reward: number;
  /** catalog key of a reward building unlocked at this milestone */
  rewardKey?: string;
}

export interface NewsItem {
  id: number;
  tick: number;
  text: string;
  kind: 'info' | 'good' | 'warn' | 'bad';
}

/* ────────────────────────────── disaster system ───────────────────────────── */

export type DisasterKind =
  | 'fire'
  | 'earthquake'
  | 'tornado'
  | 'flood'
  | 'meteor'
  | 'blackout'
  | 'riot'
  | 'volcano'
  | 'monster'
  | 'aircrash'
  | 'meltdown'
  | 'hurricane'
  | 'chemical';

export interface ActiveDisaster {
  id: number;
  kind: DisasterKind;
  x: number;
  y: number;
  /** ticks remaining */
  life: number;
  radius: number;
  /** free-form per-kind state */
  vx?: number;
  vy?: number;
  intensity: number;
}

/* ───────────────────────────────── vehicles ───────────────────────────────── */

export interface Vehicle {
  kind: 'car' | 'bus' | 'truck' | 'train' | 'boat' | 'plane' | 'emergency';
  /** world position */
  x: number;
  z: number;
  y: number;
  heading: number;
  speed: number;
  colour: number;
  /** path of tile indices */
  path: number[];
  node: number;
  t: number;
  alive: boolean;
}

/* ────────────────────────────────── events ────────────────────────────────── */

export interface GameEvents {
  'tile:changed': { i: number };
  'chunk:dirty': { cx: number; cy: number };
  'stats:updated': CityStats;
  'budget:updated': Budget;
  'time:updated': GameTime;
  'news': NewsItem;
  'disaster:start': ActiveDisaster;
  'disaster:end': { id: number };
  'tool:changed': { tool: ToolId };
  'overlay:changed': { overlay: OverlayId };
  'milestone': Milestone;
  'money:spent': { amount: number; x: number; y: number; label: string };
  'money:denied': { reason: string };
  'select:tile': { i: number } | null;
  'game:loaded': Record<string, never>;
  'game:saved': Record<string, never>;
  'speed:changed': { speed: SpeedId };
  'shake': { intensity: number };
  'paper': Newspaper;
}
