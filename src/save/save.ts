import { Grid } from '../core/grid';
import { createState, type GameState } from '../core/state';

export interface SaveMeta { slot: string; name: string; pop: number; funds: number; date: number; year: number }

const DB_NAME = 'sethcity-saves';
const STORE = 'saves';
const PREFIX = 'sethcity:save:';
const arrays = [
  'height', 'water', 'terrain', 'tree', 'zone', 'road', 'rail', 'wire', 'pipe', 'subway', 'tunnel',
  'building', 'originOffset', 'level', 'variant', 'rotation', 'age', 'condition', 'powered', 'watered',
  'roadNet', 'population', 'jobs', 'landValue', 'pollution', 'noise', 'crime', 'fireRisk', 'traffic',
  'desirability', 'covPolice', 'covFire', 'covHealth', 'covEducation', 'covPark', 'covTransit', 'onFire',
  'scratchA', 'scratchB',
] as const;

type GridArrayKey = typeof arrays[number];
interface EncodedArray { type: string; data: string }
interface Envelope { v: 1; savedAt: number; meta: Omit<SaveMeta, 'slot'>; state: Record<string, unknown> }

function bytesToBase64(bytes: Uint8Array): string {
  let result = '';
  const size = 0x8000;
  for (let i = 0; i < bytes.length; i += size) result += String.fromCharCode(...bytes.subarray(i, i + size));
  return btoa(result);
}

function base64ToBytes(data: string): Uint8Array {
  const raw = atob(data);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

function encodeArray(a: ArrayBufferView): EncodedArray {
  return { type: a.constructor.name, data: bytesToBase64(new Uint8Array(a.buffer, a.byteOffset, a.byteLength)) };
}

function copyArray(target: ArrayBufferView, encoded: unknown): void {
  if (!encoded || typeof encoded !== 'object' || !('data' in encoded) || typeof (encoded as EncodedArray).data !== 'string') return;
  const bytes = base64ToBytes((encoded as EncodedArray).data);
  new Uint8Array(target.buffer, target.byteOffset, target.byteLength).set(bytes.subarray(0, target.byteLength));
}

export function serialize(state: GameState): string {
  const grid: Record<string, EncodedArray> = {};
  for (const key of arrays) grid[key] = encodeArray(state.grid[key]);
  const savedAt = Date.now();
  const body: Record<string, unknown> = {
    seed: state.seed, cityName: state.cityName, mayorName: state.mayorName, difficulty: state.difficulty,
    grid, time: state.time, speed: state.speed, budget: state.budget, stats: state.stats, demand: state.demand,
    ordinances: state.ordinances, milestones: state.milestones, disasters: state.disasters, vehicles: [],
    news: state.news.slice(-50), papers: state.papers, signs: state.signs, deals: state.deals, history: state.history,
    tool: 'inspect', overlay: 'none', unlocked: [...state.unlocked], nextDisasterId: state.nextDisasterId,
    nextNewsId: state.nextNewsId, tutorialStep: state.tutorialStep, disastersEnabled: state.disastersEnabled,
  };
  const envelope: Envelope = { v: 1, savedAt, meta: { name: state.cityName, pop: state.stats.population, funds: state.budget.funds, date: savedAt, year: state.time.year }, state: body };
  return JSON.stringify(envelope);
}

function objectValue<T>(source: Record<string, unknown>, key: string, fallback: T): T {
  return source[key] === undefined || source[key] === null ? fallback : source[key] as T;
}

export function deserialize(json: string): GameState {
  const parsed = JSON.parse(json) as Partial<Envelope>;
  if (parsed.v !== 1 || !parsed.state || typeof parsed.state !== 'object') throw new Error('Unsupported or invalid save');
  const s = parsed.state;
  const state = createState(objectValue(s, 'seed', 0), objectValue(s, 'difficulty', 'normal'));
  state.cityName = objectValue(s, 'cityName', state.cityName);
  state.mayorName = objectValue(s, 'mayorName', state.mayorName);
  state.time = { ...state.time, ...objectValue(s, 'time', {}) };
  state.speed = objectValue(s, 'speed', state.speed);
  const savedBudget = objectValue<Partial<GameState['budget']>>(s, 'budget', {});
  state.budget = { ...state.budget, ...savedBudget, ledger: { ...state.budget.ledger, ...(savedBudget.ledger ?? {}) }, loans: savedBudget.loans ?? [] };
  state.stats = { ...state.stats, ...objectValue(s, 'stats', {}) };
  state.demand = { ...state.demand, ...objectValue(s, 'demand', {}) };
  state.ordinances = objectValue(s, 'ordinances', state.ordinances);
  state.milestones = objectValue(s, 'milestones', state.milestones);
  state.disasters = objectValue(s, 'disasters', []);
  state.vehicles = [];
  state.news = objectValue<GameState['news']>(s, 'news', []).slice(-50);
  state.papers = objectValue(s, 'papers', []);
  state.signs = objectValue(s, 'signs', []);
  state.deals = objectValue(s, 'deals', state.deals);
  state.history = { ...state.history, ...objectValue(s, 'history', {}) };
  state.tool = 'inspect'; state.overlay = 'none';
  state.unlocked = new Set(objectValue<string[]>(s, 'unlocked', []));
  state.nextDisasterId = objectValue(s, 'nextDisasterId', state.nextDisasterId);
  state.nextNewsId = objectValue(s, 'nextNewsId', state.nextNewsId);
  state.tutorialStep = objectValue(s, 'tutorialStep', state.tutorialStep);
  state.disastersEnabled = objectValue(s, 'disastersEnabled', state.disastersEnabled);
  const encodedGrid = objectValue<Record<string, unknown>>(s, 'grid', {});
  state.grid = new Grid();
  for (const key of arrays) copyArray(state.grid[key], encodedGrid[key]);
  state.grid.markAllDirty();
  return state;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') { reject(new Error('IndexedDB unavailable')); return; }
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => { if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE); };
    req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error);
  });
}

async function idbPut(slot: string, value: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).put(value, slot); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); });
  db.close();
}

async function idbGet(slot: string): Promise<string | null> {
  const db = await openDb();
  const value = await new Promise<string | null>((resolve, reject) => { const req = db.transaction(STORE).objectStore(STORE).get(slot); req.onsuccess = () => resolve(typeof req.result === 'string' ? req.result : null); req.onerror = () => reject(req.error); });
  db.close(); return value;
}

export async function saveGame(state: GameState, slot = 'auto'): Promise<void> {
  const data = serialize(state);
  try { await idbPut(slot, data); } catch { localStorage.setItem(PREFIX + slot, data); }
}

export async function loadGame(slot: string): Promise<GameState | null> {
  let data: string | null = null;
  try { data = await idbGet(slot); } catch { /* fallback below */ }
  data ??= localStorage.getItem(PREFIX + slot);
  if (!data) return null;
  try { return deserialize(data); } catch { return null; }
}

export async function listSaves(): Promise<SaveMeta[]> {
  const values = new Map<string, string>();
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => { const req = db.transaction(STORE).objectStore(STORE).openCursor(); req.onsuccess = () => { const c = req.result; if (!c) { resolve(); return; } if (typeof c.value === 'string') values.set(String(c.key), c.value); c.continue(); }; req.onerror = () => reject(req.error); }); db.close();
  } catch { /* local-only environment */ }
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k?.startsWith(PREFIX)) { const v = localStorage.getItem(k); if (v) values.set(k.slice(PREFIX.length), v); } }
  const result: SaveMeta[] = [];
  for (const [slot, data] of values) try { const e = JSON.parse(data) as Envelope; result.push({ slot, ...e.meta }); } catch { /* ignore corrupt slots */ }
  return result.sort((a, b) => b.date - a.date);
}

export async function deleteSave(slot: string): Promise<void> {
  try { const db = await openDb(); await new Promise<void>((resolve, reject) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).delete(slot); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); }); db.close(); } catch { /* fallback still removed */ }
  localStorage.removeItem(PREFIX + slot);
}

export async function hasAutosave(): Promise<boolean> { return (await loadGame('auto')) !== null; }
