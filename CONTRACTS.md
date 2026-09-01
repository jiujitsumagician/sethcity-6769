# SETHCITY 6769 — module contracts (FROZEN)

A mobile-first 3D city builder. Vite + TypeScript + three.js 0.171. No external art
assets — **every mesh, texture and sound is generated procedurally in code.**
The game is **SethCity 6769** (set in the year 6769): a full SimCity-2000-class feature
set — every SC2K system has an equivalent here (zones, power incl. lines, water incl.
pipes, subways, rail, highways, bridges & tunnels, all service buildings, prisons,
rewards, arcologies, ordinances, bonds, newspapers, advisors, neighbour deals, signs,
the full disaster roster, query tool, underground view) plus modern extras (day/night,
seasons, weather, traffic sim, milestones, difficulty levels, sandbox mode, tutorial).
Any place a UI string names the game, it is "SethCity 6769".

## Ground rules for every agent

1. **Do not modify** `src/core/*` (types.ts, grid.ts, state.ts, catalog.ts, events.ts,
   rng.ts), `index.html`, `tsconfig.json`, `vite.config.ts`, or `src/main.ts`.
   If you believe a core type is wrong, write your workaround locally and note it in
   your final report instead.
2. **Only create the files listed in your task.** Never touch another agent's files.
3. Everything must typecheck under `strict: true`. Run `npx tsc --noEmit` before you
   finish and fix every error **in your own files**. Errors in files that do not exist
   yet (other agents' modules) are expected — ignore those.
4. `import * as THREE from 'three'` — three is a real dependency, already installed.
   Import extras from `three/examples/jsm/...` freely (they ship with the package).
5. Target: a mid-range phone at 60fps. Budget ≈ 150 draw calls, ≤ 400k triangles.
   Prefer merged geometry per 16×16 chunk and instanced meshes. No per-frame allocation
   in hot loops (reuse scratch vectors/matrices).
6. Code style: 2-space indent, single quotes, semicolons, named exports.
7. Write the code as if it ships. No TODOs, no stubs, no `throw new Error('not
   implemented')`.

## World conventions

- Tile `(x, y)` where `x ∈ [0,128)`, `y ∈ [0,128)`. Linear index `i = y*128 + x`.
- three.js is **Y-up**. Tile `(x,y)` occupies world X `[x, x+1]`, world Z `[y, y+1]`.
  Tile centre = `(x + 0.5, height, y + 0.5)`.
- `grid.height[i]` is the elevation of that tile's **flat top surface**, in world units,
  already quantised to multiples of `HEIGHT_STEP` (0.35). Terrain is **stepped**, SimCity
  2000 style: flat tile tops with vertical cliff walls between differing neighbours.
- `SEA_LEVEL = 0`. `grid.water[i] === 1` means the tile is submerged; its `height` is the
  lake/sea floor (negative).
- Map centre is `(64, 0, 64)`.

## Visual direction — "miniature diorama at golden hour"

Stylised low-poly with clean flat-shaded facets, high colour saturation, strong warm key
light and cool sky-blue ambient bounce, soft contact shadows, a **tilt-shift** blur that
sells the toy-city scale, subtle bloom on night windows and vehicle lights, and animated
water with fresnel + specular glints. Think *Monument Valley* meets *Cities: Skylines*.
Everything reads clearly at 6" on a phone: chunky silhouettes, no thin detail under ~0.1
world units.

---

# File assignments

## A1 — `src/sim/terrain.ts`, `src/render/terrainMesh.ts`

```ts
// sim/terrain.ts
export interface TerrainOptions {
  seed: number;
  /** 0..1 — how much of the map is water */
  water: number;
  /** 0..1 — hill amplitude */
  hills: number;
  /** 0..1 — forest density */
  trees: number;
  /** 'coastal' | 'river' | 'lakes' | 'plains' | 'valley' | 'islands' */
  shape: TerrainShape;
}
export type TerrainShape = 'coastal' | 'river' | 'lakes' | 'plains' | 'valley' | 'islands';
export const TERRAIN_SHAPES: { id: TerrainShape; name: string }[];
export function generateTerrain(grid: Grid, opts: TerrainOptions): void;
/** bilinear-ish sampled ground height for a world-space point (used by camera + props) */
export function heightAtWorld(grid: Grid, wx: number, wz: number): number;
/** raise/lower a tile by one HEIGHT_STEP, smoothing neighbours; returns tiles changed */
export function terraform(grid: Grid, x: number, y: number, radius: number, mode: 'raise' | 'lower' | 'level', levelTo?: number): number;
/** flatten a footprint to its average height; returns false when impossible */
export function flattenFor(grid: Grid, x: number, y: number, w: number, h: number): boolean;
```

Generation must produce **beautiful, playable** maps: a large flat buildable core, hills
at the edges, one coherent water feature per shape, sandy beaches at the shoreline, rock
above a height threshold, snow on peaks, forests in bands. Set `grid.terrain[i]`,
`grid.tree[i]` (0..3), `grid.water[i]`, `grid.height[i]`. Quantise all heights to
`HEIGHT_STEP`. At least 45% of the map must be flat, dry, contiguous, buildable land.

```ts
// render/terrainMesh.ts
export class TerrainRenderer {
  constructor(scene: THREE.Scene, grid: Grid);
  /** full rebuild of ground + cliffs + shoreline; call when terrainDirty */
  build(): void;
  /** rebuild one 16×16 chunk (after terraform) */
  buildChunk(cx: number, cy: number): void;
  /** per-frame: water animation, wind on grass */
  update(dt: number, elapsed: number, nightFactor: number): void;
  /** overlay data texture from render/overlays.ts, blended over the ground */
  setOverlayTexture(tex: THREE.Texture | null, strength: number): void;
  /** highlight a rectangular region (build preview). null clears. */
  setHighlight(r: { x0: number; y0: number; x1: number; y1: number; valid: boolean } | null): void;
  dispose(): void;
}
```

Ground: one merged mesh per chunk, vertex-coloured by `terrain`/height/slope with subtle
per-tile noise so it never looks flat-shaded-uniform. Cliff sides get a darker rock tone.
Shoreline tiles blend to sand. Water: a single animated plane covering the whole map at
`y = SEA_LEVEL + 0.02` using a custom ShaderMaterial — two scrolling normal-ish wave
layers, fresnel edge, depth-based colour ramp from turquoise shallows to deep blue,
specular sun glint, and a soft foam line where it meets land. It must look genuinely
good; this is the single most eye-catching surface in the game.

The ground material must expose an overlay slot: `onBeforeCompile` mixing an RGBA
`DataTexture` (128×128, `NearestFilter`) over the albedo by `uOverlayStrength`, sampled
by world XZ / 128.

## A2 — `src/sim/network.ts`, `src/sim/services.ts`, `src/sim/fields.ts`, `src/sim/traffic.ts`

```ts
// network.ts
/** flood-fills road connectivity into grid.roadNet (component id, 0 = no road) */
export function rebuildRoadNetwork(grid: Grid): void;
/** sets grid.powered / grid.watered and fills stats power/water supply+demand */
export function propagateUtilities(state: GameState): void;
/** true when tile (x,y) can reach the largest road component */
export function isConnected(grid: Grid, x: number, y: number): boolean;

// services.ts
/** fills covPolice/covFire/covHealth/covEducation/covPark/covTransit from placed buildings,
 *  scaled by the matching budget funding multiplier */
export function computeCoverage(state: GameState): void;

// fields.ts
/** pollution + noise diffusion, crime, land value, fire risk, desirability. Runs every tick. */
export function computeFields(state: GameState): void;

// traffic.ts
/** commuter flow: residents seek jobs along the road graph; fills grid.traffic and stats.traffic */
export function computeTraffic(state: GameState): void;
```

**Power** conducts through a connectivity graph of: road tiles, `grid.wire` power-line
tiles, and building footprints — flood-fill from producer buildings. A building is powered
when any footprint tile touches (4-neighbour) a powered conductor or it produces power
itself. **Water**, SC2K-style: `grid.pipe` water mains are fed by producer buildings
(pump/tower/treatment/desal — their footprints seed the pipe network they touch); roads
also carry mains under them. A tile is `watered` when it is within 4 tiles (Chebyshev) of
any fed pipe/road tile. **Subway**: `grid.subway` tunnels + subway-station buildings —
stations connected to the same tunnel network multiply their transit coverage strength by
1.25 and stations feed `covTransit`. If total power supply < demand, brown out a
deterministic subset (lowest land value first) so the shortfall is visible; same for
water. Neighbour deals (`state.deals`, active ones) add flat amounts to supply (buy) or
reserve supply (sell) before the brown-out calculation.

Fields must be *cheap*: use separable box blurs / multi-pass 3×3 diffusion over
`Uint8Array`, not per-tile radius loops. `computeCoverage` may use a summed-area /
dilate approach. Every function must run in < 4 ms for a full 128×128 map.

Traffic: don't do real A*. Do a multi-source BFS "job accessibility" field from
commercial+industrial road-adjacent tiles, then push residential population along the
gradient and accumulate load per road tile, capped by road capacity
(street 1×, avenue 2.6×, highway 6×). Transit coverage reduces load.

## A3 — `src/render/buildings.ts`

```ts
export class BuildingRenderer {
  constructor(scene: THREE.Scene, grid: Grid);
  rebuildAll(): void;
  rebuildChunk(cx: number, cy: number): void;
  /** nightFactor 0..1 drives window emissive; elapsed drives blinking lights */
  update(dt: number, elapsed: number, nightFactor: number): void;
  /** construction animation: call when a building appears at tile i */
  popIn(i: number): void;
  dispose(): void;
}
```

**This is the visual centrepiece.** Generate every building procedurally from its
`BuildingDef.archetype`, `level`, `palette`, `height` and a deterministic per-tile seed
(`hash2(x, y, salt)`), merged into one `BufferGeometry` per 16×16 chunk (one draw call
per chunk) with attributes `position`, `normal`, `color` and a custom `float aEmissive`.

Quality bar per archetype — each needs real silhouette variety, not boxes:
- `house` — pitched/hipped roofs, chimney, porch, garage, fenced garden, driveway to the
  road, varied footprint inset, 6+ visibly different variants.
- `rowhouse` / `apartment` — stepped masses, balconies, cornices, roof plant, stair core.
- `tower` / `skyscraper` — setbacks, a crown/spire, mullion banding, corner chamfers, roof
  antennae + red aviation light, podium base wider than the shaft.
- `shop` / `mall` — awnings, signage bands (emissive at night), flat roof with HVAC units.
- `office` — curtain wall with strong horizontal banding, lobby glazing at ground level.
- `farm` — barn with gambrel roof, silo, ploughed field texture in vertex colour, crop rows.
- `workshop` / `factory` / `refinery` — sawtooth roofs, chimneys with smoke anchors, pipes,
  tanks, cranes, loading bays.
- `warehouse` — long low shed, roller doors, yard.
- `powerplant` — cooling towers (nuclear/fusion), stacks (coal/gas), turbine hall.
- `windturbine` — tower + nacelle + 3 blades **that spin** (see below).
- `solarfarm` — tilted panel rows on racks.
- `watertower` — legs + tank, or pump house.
- `civic` / `school` / `hospital` / `university` — porticos, columns, clock/cross/flag,
  courtyards, wings around a quad.
- `stadium` — elliptical bowl, roof ring, floodlight masts (emissive at night).
- `park` / `plaza` — paths, hedges, benches, a pond, trees (see below).
- `landmark` — genuinely distinct hero shapes per key (`x_tower` must be a striking
  supertall; `x_observatory` a dome; `x_cityhall` a domed civic block; `x_statue` a
  figure on a plinth; `x_casino` a glitzy slab with a sign).
- `port` / `airport` / `transit` — quays + cranes + containers, runway + terminal +
  parked aircraft, platform canopy.

Windows: emit them as separate quads slightly proud of the facade with `aEmissive = 1`,
lit warm-yellow at night in a deterministic random pattern (~55% occupancy, varying by
`level`) so the skyline glitters. Ground-floor retail glows earlier in the evening.

Animated parts (turbine blades, rotating radar, blinking aviation lights) go into a
separate small `InstancedMesh` set updated in `update()` — keep them off the merged
chunk geometry.

`popIn` should scale a building up from 0 with a short elastic ease so growth feels alive;
track animating tiles in a small map and fold the scale into the merged geometry by
rebuilding that chunk, or overlay a temporary mesh — your choice, but it must not stutter.

## A4 — `src/render/renderer.ts`, `src/render/weather.ts`, `src/render/overlays.ts`

```ts
// renderer.ts
export type Quality = 'low' | 'medium' | 'high';
export class Renderer {
  constructor(canvas: HTMLCanvasElement);
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly gl: THREE.WebGLRenderer;
  /** 0 = full day, 1 = deep night */
  readonly nightFactor: number;
  quality: Quality;
  setQuality(q: Quality): void;
  resize(): void;
  /** advance sun/moon/sky/fog for the current game time */
  updateSky(time: GameTime, weather: WeatherState): void;
  render(dt: number): void;
  shake(intensity: number): void;
  /** average fps over the last second, for the adaptive quality governor */
  readonly fps: number;
  dispose(): void;
}

// weather.ts
export type WeatherKind = 'clear' | 'cloudy' | 'rain' | 'storm' | 'fog' | 'snow';
export interface WeatherState { kind: WeatherKind; intensity: number; windX: number; windZ: number; }
export class Weather {
  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera);
  readonly state: WeatherState;
  set(kind: WeatherKind, intensity?: number): void;
  /** picks new weather over time based on season */
  update(dt: number, time: GameTime): void;
  dispose(): void;
}

// overlays.ts
export class OverlayLayer {
  constructor();
  readonly texture: THREE.DataTexture;
  /** 0 when overlay is 'none' */
  readonly strength: number;
  set(overlay: OverlayId): void;
  /** recompute pixels from the current grid; call ~4×/second while an overlay is on */
  refresh(state: GameState): void;
  dispose(): void;
}
```

Renderer: `WebGLRenderer` with `antialias` only on high, `powerPreference:'high-performance'`,
`ACESFilmicToneMapping`, `SRGBColorSpace`, capped `devicePixelRatio` (≤2 high, ≤1.5 medium,
1 low). One `DirectionalLight` sun with a **cascade-free but well-fitted** shadow camera
that follows the camera target (2048 high / 1024 medium / shadows off on low),
`HemisphereLight` for bounce, and an animated procedural sky dome (custom shader: horizon
gradient, sun disc + glow, moon + stars fading in at night, gradient shifting through
dawn/day/dusk/night). Exponential fog whose colour tracks the sky.

Post-processing via `EffectComposer` (high/medium only): `RenderPass` → `UnrealBloomPass`
(subtle, threshold ~0.85 by day, ~0.55 at night) → a **custom tilt-shift + vignette +
colour-grade ShaderPass** → `OutputPass`. On low quality render straight to screen.

`shake()` decays over ~0.6s and offsets the camera; used by disasters and demolition.

`updateSky` maps `time.timeOfDay` (0 = midnight, 0.5 = noon) to sun elevation/azimuth,
key colour (deep blue → amber dawn → white noon → orange dusk → moonlit blue), intensity,
and `nightFactor`. Seasons tint ambient. Weather dims and desaturates.

Weather: instanced rain streaks / snow flakes in a moving box around the camera, drifting
cloud shadow projected as a subtle scrolling darkening, fog density boost, lightning
flashes in storms (brief light intensity + colour spike). All GPU-cheap and disabled on low.

Overlays: 128×128 RGBA `DataTexture`, `NearestFilter`, no mips. Colour ramps per overlay —
`pollution` green→brown, `crime` transparent→red, `landvalue` blue→green→gold,
`traffic` green→amber→red, `power` unpowered red / powered translucent yellow,
`water` similar in blue, `zones` the standard green/blue/amber zone colours,
`noise` transparent→purple, `transit` coverage in cyan,
`density`/`health`/`education`/`fire`/`desirability` sensible sequential ramps, and
`underground` — a dark slate wash (alpha ~0.75 everywhere) with `grid.pipe` drawn in
bright blue, `grid.subway` in bright orange, subway-station and water-producer footprints
as white squares — the SC2K underground view. Alpha 0 elsewhere (for other overlays)
where the datum does not apply so the ground shows through.

## A5 — `src/render/roads.ts`, `src/render/props.ts`

```ts
// roads.ts
export class RoadRenderer {
  constructor(scene: THREE.Scene, grid: Grid);
  rebuildAll(): void;
  rebuildChunk(cx: number, cy: number): void;
  update(dt: number, elapsed: number, nightFactor: number): void;
  dispose(): void;
}

// props.ts
export class PropRenderer {
  constructor(scene: THREE.Scene, grid: Grid, state: GameState);
  rebuildAll(): void;
  rebuildChunk(cx: number, cy: number): void;
  /** drives cosmetic traffic + pedestrians; density scales with stats */
  update(dt: number, elapsed: number, nightFactor: number, state: GameState): void;
  dispose(): void;
}
```

Roads: proper tile-connection meshing (16 cases from the 4-neighbour bitmask) — straight,
corner, T, cross, dead-end — with kerbs, centre lines (dashed on streets, solid double on
avenues), crosswalk stripes at intersections, and a raised median on avenues. Highways sit
on an embankment with guard rails. Rail: sleepers + two rails, ballast bed. Roads must
follow terrain height exactly and produce ramps on slopes. One merged mesh per chunk.
At night, streetlights along road edges cast small emissive pools (emissive vertex colour,
no real lights).

**Bridges**: a road/rail tile on water (`grid.water[i] && grid.road[i]`) renders as a
bridge deck at `SEA_LEVEL + 0.55` with piers down into the water and railings; consecutive
water tiles form one continuous span with a gentle arch. **Tunnels**: `grid.tunnel[i]`
means the road passes through a hill — render a stone portal at each end of a tunnel run
(where tunnel meets non-tunnel road) and nothing on top; the terrain above stays intact.
**Power lines**: `grid.wire` tiles render as lattice pylons with drooping catenary wires
between 4-connected neighbours (and to adjacent powered buildings' rooflines is NOT
needed — pylon-to-pylon only); over water use taller pylons.
**Signs**: `state.signs` render as little billboards on posts with the text drawn onto a
tiny CanvasTexture, double-sided, always upright.

Props: instanced trees (3–4 species: conifer, broadleaf, palm on sand, dead/bare in winter)
placed from `grid.tree`, seasonal foliage colour, plus rocks, bushes, fences, benches,
streetlamps, traffic lights at large intersections, power pylons on empty land, and boats
on water. Vehicles: an `InstancedMesh` pool (≤ 220 cars, ≤ 24 buses, ≤ 20 trucks) of small
low-poly vehicles that drive along the road graph — pick a random road tile, walk to a
random connected neighbour, ease along the tile, repeat; keep to the right, slow at
intersections, headlights (emissive quads) at night. Vehicle count scales with
`state.stats.population` and `state.stats.traffic`. Also a few pedestrians as tiny capsules
on pavements near dense zones. This ambient life is what makes the city feel alive — make
it convincing but cheap.

## A6 — `src/ui/*`

Files: `src/ui/style.css`, `src/ui/index.ts`, `src/ui/hud.ts`, `src/ui/palette.ts`,
`src/ui/panels.ts`, `src/ui/charts.ts`, `src/ui/toast.ts`, `src/ui/tutorial.ts`.

```ts
// ui/index.ts
import type { Actions } from '../sim/actions';
export interface UIHost {
  state: GameState;
  actions: Actions;
  /** centre the camera on a tile */
  focus(x: number, y: number): void;
  /** change render quality */
  setQuality(q: 'low' | 'medium' | 'high'): void;
  save(): Promise<void>;
  load(slot: string): Promise<void>;
  newGame(opts: { name: string; shape: string; water: number; hills: number; trees: number; seed: number }): void;
  sfx(name: string): void;
}
export class UI {
  constructor(root: HTMLElement, host: UIHost);
  update(dt: number): void;
  /** true when a pointer is over UI chrome — the picker must ignore it */
  hitTest(x: number, y: number): boolean;
  showTileInspector(i: number | null): void;
  /** modal text input used by the sign tool; resolves null on cancel */
  promptSignText(): Promise<string | null>;
  dispose(): void;
}
```

Mobile-first, thumb-reachable, **portrait and landscape**, safe-area aware
(`env(safe-area-inset-*)`), 44px minimum touch targets, no hover-only affordances.
Dark, glassy, high-contrast UI: near-black translucent panels with a subtle blur,
a single accent (electric cyan `#3ddbd9`) plus semantic green/amber/red, and a clean
geometric sans stack (`system-ui, 'Segoe UI', Inter, sans-serif`) with tabular numerals
for figures. Animate with transforms/opacity only.

Screens:
- **Boot/menu** — logo, New City (name + map shape picker with a live thumbnail sketch of
  the generated map, water/hills/trees sliders, seed), Continue, Load, Settings.
- **Top HUD** — funds (animated counter, red when negative), date + season icon, population,
  approval face, speed control (⏸ ▶ ▶▶ ▶▶▶), overlay button, menu button.
- **RCI demand bar** — three vertical bars, green/blue/amber, animated.
- **News ticker** — scrolling one-line advisor messages, tap to expand.
- **Bottom build drawer** — horizontally scrollable category rail
  (Zones, Roads, Power, Water, Safety, Health, Education, Leisure, Transport, Special,
  Terrain, Bulldoze) that expands into a grid of items showing an icon, name, cost and a
  lock badge with the unlock population. Disabled/greyed when unaffordable or locked.
  Long-press an item for its description. Selecting a tool collapses the drawer to a
  compact "active tool" chip with a cancel ✕.
- **Panels** (sheet that slides up, dismissible by swipe-down):
  - *Budget* — ledger table, tax sliders per zone type, service funding sliders, bonds
    (take/repay loans), and the neighbour-deals list (`state.deals`) with per-deal
    activate/cancel toggles showing the monthly cash effect.
  - *Statistics* — line charts for population, funds, approval, pollution, traffic,
    unemployment; plus current-value stat tiles.
  - *City* — name, mayor, milestones list with progress, ordinances with toggles, and a
    **Disasters** section: buttons to trigger each DisasterKind on demand (SC2K style),
    plus the random-disasters toggle.
  - *Advisors* — the seven advisors (finance, safety, health, education, transport,
    environment, planning) with portrait glyph, mood and current advice from
    `getAdvice(state)` (sim/advisors.ts).
  - *Newspaper* — the "SethCity 6769 Llama Ledger": renders `state.papers[0]` as a
    front page (masthead, dateline, headline, articles, one-line classified) with a
    serif-styled layout; browse older editions. A toast/badge announces each new edition.
  - *Settings* — quality, sound, music, disasters on/off, autosave, save/load, reset,
    plus difficulty display and sandbox badge.
  - *Tile inspector* — what's here (building name, zone, level, condition), its per-tile
    stats (land value, pollution, crime, traffic, power/water state), and a bulldoze
    button.
- **New game screen** must expose the full customisation set: city name, mayor name,
  map shape + water/hills/trees sliders + seed, difficulty (easy/normal/hard/**sandbox**
  — sandbox shows "∞ funds"), and disasters on/off.
- **Sign tool**: when the picker asks for sign text (`ui.promptSignText()` — export it as
  part of the UI class), show a small centred modal with a text input (max 24 chars) that
  resolves a Promise<string|null>.
- **Underground view**: selecting the 'underground' overlay also dims the scene via the
  overlay strength — the UI just needs a toggle button in the overlay picker with a
  pipe/subway icon.
- **Toasts + floating money** — `+§120` / `−§4,500` floats up at the tap point.
- **Tutorial** — a 7-step coach-mark sequence: place a road, zone residential, add power,
  connect it, zone commercial, watch it grow, unpause. Skippable, remembered in
  localStorage.

`ui/charts.ts` renders to a `<canvas>`: smooth line charts with an area gradient fill,
axis labels, and a last-value badge. No chart library.

The build drawer's item icons must be inline SVG generated per archetype — small, crisp,
recognisable glyphs, not emoji.

## A7 — `src/input/camera-controls.ts`, `src/input/picker.ts`, `src/sim/disasters.ts`, `src/save/save.ts`, `src/audio/audio.ts`

```ts
// camera-controls.ts
export class CameraController {
  constructor(camera: THREE.PerspectiveCamera, dom: HTMLElement);
  /** ground-plane point the camera orbits */
  readonly target: THREE.Vector3;
  enabled: boolean;
  /** true while a camera gesture is in progress */
  readonly gesturing: boolean;
  update(dt: number, grid: Grid): void;
  focusOn(x: number, z: number, distance?: number): void;
  /** ray from screen point to the terrain; null when it misses */
  screenToTile(clientX: number, clientY: number, grid: Grid): { x: number; y: number } | null;
  screenToGround(clientX: number, clientY: number): THREE.Vector3 | null;
  zoomBy(factor: number): void;
  rotateBy(radians: number): void;
  /** serialisable pose */
  getPose(): { tx: number; tz: number; dist: number; az: number; pol: number };
  setPose(p: { tx: number; tz: number; dist: number; az: number; pol: number }): void;
  dispose(): void;
}

// picker.ts
import type { Actions } from '../sim/actions';
export interface PickerHost {
  state: GameState;
  actions: Actions;
  controls: CameraController;
  /** true when the point is over UI chrome */
  overUI(x: number, y: number): boolean;
  onHighlight(r: { x0: number; y0: number; x1: number; y1: number; valid: boolean } | null): void;
  onSelect(i: number | null): void;
  sfx(name: string): void;
  toast(msg: string, kind?: 'info' | 'warn' | 'bad'): void;
  money(amount: number, clientX: number, clientY: number): void;
}
export class Picker {
  constructor(dom: HTMLElement, host: PickerHost);
  update(): void;
  dispose(): void;
}

// sim/disasters.ts
export function updateDisasters(state: GameState): void;
export function triggerDisaster(state: GameState, kind: DisasterKind, x?: number, y?: number): ActiveDisaster | null;
export function maybeRandomDisaster(state: GameState): void;

// save/save.ts
export interface SaveMeta { slot: string; name: string; pop: number; funds: number; date: number; year: number; }
export function serialize(state: GameState): string;
export function deserialize(json: string): GameState;
export function saveGame(state: GameState, slot?: string): Promise<void>;
export function loadGame(slot: string): Promise<GameState | null>;
export function listSaves(): Promise<SaveMeta[]>;
export function deleteSave(slot: string): Promise<void>;
export function hasAutosave(): Promise<boolean>;

// audio/audio.ts
export type SfxName = 'place' | 'bulldoze' | 'error' | 'coin' | 'click' | 'levelup' | 'disaster' | 'siren' | 'whoosh' | 'pop';
export class AudioEngine {
  constructor();
  /** must be called from a user gesture */
  unlock(): void;
  readonly ready: boolean;
  sfx(name: SfxName, volume?: number): void;
  setMuted(m: boolean): void;
  setMusicEnabled(m: boolean): void;
  /** ambient bed follows population + time of day + weather */
  update(dt: number, state: GameState, nightFactor: number, rain: number): void;
  dispose(): void;
}
```

Camera: **one finger drags to pan** (grab-the-ground: the world point under the finger
stays under the finger), **two fingers pinch to zoom and twist to rotate**, two-finger
vertical drag tilts. Mouse: LMB drag pans when no tool is active, wheel zooms, RMB drags
to orbit. Momentum/inertia on pan and rotate with smooth damping. Clamp: distance 12–260,
polar 12°–78°, target inside the map bounds + margin. Zoom toward the pinch centroid.
Must feel *excellent* — this is the thing the player touches most.

Picker: tap = apply the current tool to one tile; drag = rectangle for zones/bulldoze/
trees, line (L-shaped, dominant axis first) for roads/rail/wire/pipe/subway. Live preview
via `onHighlight` with cost, calling `actions.applyTool(..., preview=true)`. Long-press
with the inspect tool opens the tile inspector. The `sign` tool: on tap, `await` the
host's sign-text prompt (add `promptSign(): Promise<string|null>` to `PickerHost`) then
call `actions.applyTool('sign', …)` after stashing the text in
`state.signs`-friendly form via `actions.pendingSignText = text` (Actions exposes that
field). Must not fire when `controls.gesturing` or `overUI()`.

Disasters — the full SC2K roster. fire spreads to neighbours by `fireRisk`, suppressed by
`covFire`; earthquakes level a swathe and start fires; tornadoes wander and destroy a
path; floods surge water tiles outward near the shore then recede; meteors crater;
blackouts kill power for N ticks; riots spawn in high-crime low-safety areas; **volcano**
pushes terrain up into a cone at a random spot, spews lava (fires) downhill; **monster** —
the Giant Llama of 6769 — walks a rampage path toward the densest district, crushing what
it steps on, shrugging off everything; **aircrash** (only when an airport exists) torches
a line of tiles; **meltdown** (only when a nuclear plant exists and fundPower is starved
or randomly at tiny odds) irradiates a zone — tiles get pollution 255 and stay
unbuildable for years; **hurricane** batters the coast with wind (random light damage +
floods); **chemical** spill poisons water-adjacent industry surroundings. Each emits
`bus.emit('news', …)` and `bus.emit('shake', …)` and a paper-worthy story. Respect
`state.disastersEnabled` (manual triggers via the disaster menu still work when random
disasters are off — gate only the random ones).

Save: JSON with typed arrays base64-encoded, versioned, stored in IndexedDB with a
localStorage fallback. Autosave to slot `auto` every game-month. Must round-trip exactly.

Audio: **fully procedural WebAudio** — no files. Short synthesised blips for UI, a filtered
noise burst for bulldoze, a coin arpeggio, a two-tone siren, a rumble for disasters, plus a
gentle generative ambient music bed (slow evolving pad from detuned oscillators through a
lowpass + reverb-ish delay, chord changes every ~16s, warmer by day, sparser at night) and
a city hum whose level tracks population. Everything must respect mute and start silent
until `unlock()`.

## A8 — `src/sim/zoning.ts`, `src/sim/economy.ts`, `src/sim/simulation.ts`, `src/sim/actions.ts`, `src/sim/advisors.ts`, `src/sim/newspaper.ts`

```ts
// zoning.ts
/** grows, upgrades, downgrades and abandons buildings on zoned tiles */
export function growAndDecay(state: GameState): void;

// economy.ts
export function computeDemand(state: GameState): void;
export function recomputeStats(state: GameState): void;
/** called once per game month */
export function monthlyBudget(state: GameState): void;
export function takeLoan(state: GameState, principal: number, months: number): boolean;
export function checkMilestones(state: GameState): void;
export function unlockedKeys(state: GameState): Set<string>;

// simulation.ts
export class Simulation {
  constructor(state: GameState);
  /** call every animation frame with real seconds */
  update(dt: number): void;
  /** one discrete sim tick (≈ one game day) */
  tick(): void;
  /** full recompute after load / terraform / large edit */
  recomputeAll(): void;
}

// actions.ts
export interface ToolResult { ok: boolean; cost: number; reason?: string; tiles: number; }
export class Actions {
  constructor(state: GameState);
  /** text the sign tool will stamp on the next applyTool('sign', …) */
  pendingSignText: string | null;
  /** validate + price a single placement */
  canPlace(key: string, x: number, y: number): ToolResult;
  place(key: string, x: number, y: number): ToolResult;
  /** apply the given tool over a rect/line. preview=true prices without mutating. */
  applyTool(tool: ToolId, x0: number, y0: number, x1: number, y1: number, preview: boolean): ToolResult;
  bulldozeTile(x: number, y: number): number;
  spend(amount: number): boolean;
}

// advisors.ts
/** rule-based advice from the seven advisors, worst problems first */
export function getAdvice(state: GameState): AdvisorMessage[];

// newspaper.ts
/** compose this month's edition of the Llama Ledger from recent news + stats.
 *  Witty, varied (seeded by state.seed + month), SC2K-flavoured. Pushes onto
 *  state.papers (cap 24) and emits bus.emit('paper', …). */
export function publishPaper(state: GameState): Newspaper;
```

Balance targets: a fresh city with §50,000 should reach ~2,000 population in ~4 game years
of attentive play; runaway growth and instant bankruptcy are both failures. Zones cost
§8/tile (low), §16 (med), §24 (high); streets §12/tile, avenues §60, highways §220,
rail §90, wire §6, pipe §10, subway tunnel §150, sign §50, tree §12, bulldoze §4.
Bridges (road/rail dragged across water) cost 5× the road price per water tile; a road
dragged across tiles whose height exceeds the endpoints by ≥ 2×HEIGHT_STEP becomes a
tunnel there at 8× street price (set `grid.tunnel`), keeping the terrain intact.
`water_place` floods a land tile to SEA_LEVEL for §120 (terrain editor); `tree` plants
`grid.tree` up to 3. Difficulty scales everything: easy = 0.8× costs, 1.25× tax yield;
hard = 1.25× costs, 0.8× tax yield, disasters more frequent; **sandbox** = `spend()`
always succeeds and never deducts, everything unlocked from the start.
Growth requires: zoned, road-adjacent (within 3 tiles of a road),
powered, watered, and `landValue ≥ def.minLandValue`, with demand for that category > 0.
Upgrade when conditions have held for a while and land value supports the next level;
downgrade/abandon when power, water, road access or demand fails for long enough.
Abandoned buildings become `condition 0` eyesores that hurt land value until bulldozed.

`Simulation.update` runs a fixed-step accumulator; tick rates: paused 0, slow 1/s,
normal 3/s, fast 9/s. One tick = one game day. Cheap per-tick work every tick; expensive
passes (fields, coverage, traffic) staggered round-robin across ticks so no frame spikes.
Emit `stats:updated`, `budget:updated`, `time:updated`, `news`, `milestone` on the bus.
On each new month: `monthlyBudget`, apply active neighbour-deal cash flows, then
`publishPaper(state)` (sim/newspaper.ts). `checkMilestones` grants the milestone cash +
unlocks `rewardKey` buildings (they appear in Special at their catalog cost — reward ones
are §0) and posts news. `monthlyBudget` also prices active deals: buy deals cost
`amount × pricePerUnit`, sell deals earn it (into `ledger.incomeOther`). Sandbox skips
all charges. Advisors are pure functions — the UI polls `getAdvice`.

`recomputeAll` must be safe to call at any time and leave the sim in a consistent state.

---

## Integration

`src/main.ts` (written by the lead, do not touch) wires everything:
`Renderer → TerrainRenderer/RoadRenderer/BuildingRenderer/PropRenderer/Weather/OverlayLayer`,
`CameraController + Picker`, `Simulation + Actions`, `UI`, `AudioEngine`, `save`.

When you finish, report: files written, anything you had to deviate on, and any assumption
another module must honour.

---

# INTEGRATION NOTES (facts already locked in by finished modules — honour these)

From **A2** (sim/network.ts, services.ts, fields.ts, traffic.ts — DONE):
- `grid.powered[i]` is 1 within **Chebyshev 3** of any live conductor (deliberately the
  same radius as the isConnected road-access rule — a zone tile allowed to grow must also
  read powered; a one-tile halo causes the interior-zone zero-growth bug), then overridden
  per building footprint (browned-out buildings stamp 0). Zoning may test
  `grid.powered[i]` / `grid.watered[i]` directly on 1×1 growth candidates. Building
  power-connection truth (bPow) still requires footprint overlap with the conduction
  network itself.
- `isConnected(grid,x,y)` = a road tile of the largest component within Chebyshev 3 —
  exactly the zoning road-access rule. Use it.
- Zoning MUST stamp `grid.population` per residential tile (traffic reads it), initialise
  `condition > 0` and `age = 0` on spawn; "abandoned" is detected as
  `def.grown && condition === 0 && age > 4`.
- Water producers only feed mains when powered. Brown-outs consider network-connected
  consumers; stats power/waterDemand report totals.
- Ordinance field effects (recycling, clean_air, smoke_detectors, neighborhood_watch,
  legalise_gambling) are applied inside computeFields — do NOT double-apply them.
- Tiles with pollution ≥ 200 decay slowly (radiation); disasters can stamp 255 once and it
  lingers for years.
- Per-tick call order: propagateUtilities → computeCoverage → computeFields.
  `grid.scratchA/scratchB` are free for any module's use.
- Traffic: commuter volume = pop×0.42, transit halves it; capacities 120/312/720 per tile.

From **A4** (render/renderer.ts, weather.ts, overlays.ts — DONE):
- Renderer writes `scene.userData.quality` = 'low'|'medium'|'high' each quality change;
  Weather reads it. No other module may overwrite that key.
- Overlay DataTexture: flipY=false, data index `(y*128+x)*4`, sample at uv = worldXZ/128,
  linear colour, texel alpha premultiplies the mix; strength 0.85 normal / 1.0 underground.
- Renderer.render offsets camera.position during shake and restores after the draw —
  CameraController must not cache camera.position across frames outside its own update.
- updateSky is called before render every frame (main.ts does this).
- Underground overlay derives producer squares from CATALOG (waterOut>0 or key 't_subway').

For **render/terrainMesh.ts**: the file exists but was cut off mid-write (missing tail).
Its owner must READ what is there and complete/repair it to the A1 contract, keeping the
overlay conventions above.
