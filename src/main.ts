/**
 * SETHCITY 6769 — integration entry point.
 * Owns the game loop and wires every module together.
 */
import { bus } from './core/events';
import { createState, type GameState } from './core/state';
import {
  CHUNK,
  CHUNKS_X,
  type Difficulty,
  type GameTime,
  type OverlayId,
} from './core/types';
import { generateTerrain, type TerrainShape } from './sim/terrain';
import { Simulation } from './sim/simulation';
import { Actions } from './sim/actions';
import { Renderer } from './render/renderer';
import { TerrainRenderer } from './render/terrainMesh';
import { RoadRenderer } from './render/roads';
import { BuildingRenderer } from './render/buildings';
import { PropRenderer } from './render/props';
import { Weather } from './render/weather';
import { OverlayLayer } from './render/overlays';
import { CameraController } from './input/camera-controls';
import { Picker } from './input/picker';
import { UI } from './ui/index';
import { AudioEngine } from './audio/audio';
import { saveGame, loadGame, hasAutosave } from './save/save';

interface World {
  state: GameState;
  sim: Simulation;
  actions: Actions;
  terrainR: TerrainRenderer;
  roadR: RoadRenderer;
  buildingR: BuildingRenderer;
  propR: PropRenderer;
  overlay: OverlayLayer;
}

const canvas = document.getElementById('scene') as HTMLCanvasElement;
const uiRoot = document.getElementById('ui') as HTMLElement;

const renderer = new Renderer(canvas);
const weather = new Weather(renderer.scene, renderer.camera);
const controls = new CameraController(renderer.camera, canvas);
const audio = new AudioEngine();

let world: World | null = null;
let ui: UI | null = null;
let picker: Picker | null = null;
let lastOverlay: OverlayId = 'none';
let overlayClock = 0;
let manualQuality = false;
let qualityClock = 0;
let saveDebounce = 0;

function buildWorld(state: GameState): World {
  const grid = state.grid;
  const terrainR = new TerrainRenderer(renderer.scene, grid);
  const roadR = new RoadRenderer(renderer.scene, grid);
  const buildingR = new BuildingRenderer(renderer.scene, grid);
  const propR = new PropRenderer(renderer.scene, grid, state);
  const overlay = new OverlayLayer();
  const sim = new Simulation(state);
  const actions = new Actions(state);
  terrainR.build();
  roadR.rebuildAll();
  buildingR.rebuildAll();
  propR.rebuildAll();
  grid.dirtyChunks.clear();
  grid.terrainDirty = false;
  sim.recomputeAll();
  return { state, sim, actions, terrainR, roadR, buildingR, propR, overlay };
}

function disposeWorld(w: World) {
  w.terrainR.dispose();
  w.roadR.dispose();
  w.buildingR.dispose();
  w.propR.dispose();
  w.overlay.dispose();
}

function startGame(state: GameState) {
  if (world) disposeWorld(world);
  world = buildWorld(state);
  lastOverlay = 'none';
  controls.focusOn(64, 64, 90);
  bus.emit('game:loaded', {});
}

/* ───────────────────────────── host facades ───────────────────────────── */

const host = {
  get state() {
    return world!.state;
  },
  get actions() {
    return world!.actions;
  },
  get controls() {
    return controls;
  },
  focus(x: number, y: number) {
    controls.focusOn(x, y);
  },
  setQuality(q: 'low' | 'medium' | 'high') {
    manualQuality = true;
    renderer.setQuality(q);
  },
  async save() {
    if (world) await saveGame(world.state);
  },
  async load(slot: string) {
    const s = await loadGame(slot);
    if (s) startGame(s);
  },
  newGame(opts: {
    name: string;
    mayor?: string;
    shape: string;
    water: number;
    hills: number;
    trees: number;
    seed: number;
    difficulty?: Difficulty;
    disasters?: boolean;
  }) {
    const state = createState(opts.seed, opts.difficulty ?? 'normal');
    state.cityName = opts.name || 'SethCity';
    if (opts.mayor) state.mayorName = opts.mayor;
    state.disastersEnabled = opts.disasters ?? true;
    generateTerrain(state.grid, {
      seed: opts.seed,
      water: opts.water,
      hills: opts.hills,
      trees: opts.trees,
      shape: opts.shape as TerrainShape,
    });
    startGame(state);
  },
  sfx(name: string) {
    audio.sfx(name as Parameters<AudioEngine['sfx']>[0]);
  },
  overUI(x: number, y: number) {
    return ui ? ui.hitTest(x, y) : false;
  },
  onHighlight(
    r: { x0: number; y0: number; x1: number; y1: number; valid: boolean } | null,
  ) {
    world?.terrainR.setHighlight(r);
  },
  onSelect(i: number | null) {
    ui?.showTileInspector(i);
    bus.emit('select:tile', i === null ? null : { i });
  },
  toast(msg: string, kind: 'info' | 'warn' | 'bad' = 'info') {
    if (!world) return;
    bus.emit('news', {
      id: world.state.nextNewsId++,
      tick: world.state.time.ticks,
      text: msg,
      kind: kind === 'info' ? 'info' : kind,
    });
  },
  money(amount: number, clientX: number, clientY: number) {
    bus.emit('money:spent', { amount, x: clientX, y: clientY, label: '' });
  },
  async promptSign(): Promise<string | null> {
    return ui ? ui.promptSignText() : null;
  },
};

/* ───────────────────────────── bus wiring ─────────────────────────────── */

bus.on('shake', ({ intensity }) => renderer.shake(intensity));
bus.on('news', (n) => {
  if (!world) return;
  world.state.news.push(n);
  if (world.state.news.length > 60)
    world.state.news.splice(0, world.state.news.length - 60);
});

/* test/debug hook — read-only view of the live state */
Object.defineProperty(window, '__sethcity', {
  get: () =>
    world
      ? { state: world.state, sim: world.sim, actions: world.actions, controls }
      : null,
});
bus.on('tile:changed', ({ i }) => {
  if (!world) return;
  const g = world.state.grid;
  if (g.building[i] && g.age[i] === 0) world.buildingR.popIn(i);
});

/* ─────────────────────────── boot + game loop ─────────────────────────── */

async function boot() {
  const state = createState((Math.random() * 1e9) | 0, 'normal');
  generateTerrain(state.grid, {
    seed: state.seed,
    water: 0.3,
    hills: 0.45,
    trees: 0.5,
    shape: 'coastal',
  });
  startGame(state);

  ui = new UI(uiRoot, host);
  picker = new Picker(canvas, host);

  // resume prompt is the UI's job; we just surface whether an autosave exists
  void hasAutosave();

  const unlock = () => {
    audio.unlock();
    window.removeEventListener('pointerdown', unlock);
  };
  window.addEventListener('pointerdown', unlock);

  window.addEventListener('resize', () => renderer.resize());
  document.getElementById('boot')?.remove();

  let last = performance.now();
  const frame = (now: number) => {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const w = world!;
    const state = w.state;
    const elapsed = now / 1000;

    controls.update(dt, state.grid);
    w.sim.update(dt);
    weather.update(dt, state.time);
    renderer.updateSky(state.time, weather.state);

    /* dirty chunk rebuilds — bounded per frame */
    if (state.grid.terrainDirty) {
      w.terrainR.build();
      state.grid.terrainDirty = false;
    }
    let budget = 6;
    for (const c of state.grid.dirtyChunks) {
      const cx = c % CHUNKS_X;
      const cy = (c / CHUNKS_X) | 0;
      w.terrainR.buildChunk(cx, cy);
      w.roadR.rebuildChunk(cx, cy);
      w.buildingR.rebuildChunk(cx, cy);
      w.propR.rebuildChunk(cx, cy);
      state.grid.dirtyChunks.delete(c);
      if (--budget <= 0) break;
    }

    /* overlays */
    if (state.overlay !== lastOverlay) {
      lastOverlay = state.overlay;
      w.overlay.set(state.overlay);
      w.overlay.refresh(state);
      w.terrainR.setOverlayTexture(
        state.overlay === 'none' ? null : w.overlay.texture,
        w.overlay.strength,
      );
      bus.emit('overlay:changed', { overlay: state.overlay });
    }
    if (state.overlay !== 'none') {
      overlayClock += dt;
      if (overlayClock > 0.25) {
        overlayClock = 0;
        w.overlay.refresh(state);
      }
    }

    const night = renderer.nightFactor;
    w.terrainR.update(dt, elapsed, night);
    w.roadR.update(dt, elapsed, night);
    w.buildingR.update(dt, elapsed, night);
    w.propR.update(dt, elapsed, night, state);

    picker?.update();
    ui?.update(dt);
    audio.update(
      dt,
      state,
      night,
      weather.state.kind === 'rain' || weather.state.kind === 'storm'
        ? weather.state.intensity
        : 0,
    );

    renderer.render(dt);

    /* adaptive quality governor (unless the user pinned it) */
    if (!manualQuality) {
      qualityClock += dt;
      if (qualityClock > 4) {
        qualityClock = 0;
        const fps = renderer.fps;
        if (fps < 42 && renderer.quality !== 'low') {
          renderer.setQuality(renderer.quality === 'high' ? 'medium' : 'low');
        } else if (fps > 57 && renderer.quality === 'low') {
          renderer.setQuality('medium');
        }
      }
    }

    /* debounced autosave every ~60s of play */
    saveDebounce += dt;
    if (saveDebounce > 60 && state.speed !== 0) {
      saveDebounce = 0;
      void saveGame(state, 'auto').then(() => bus.emit('game:saved', {}));
    }

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

void boot();
