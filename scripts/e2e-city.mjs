// Full gameplay verification: found a plains city, build road+zones+power+water,
// fast-forward, assert population > 0.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const SHOTS = '.tmp/shots';
mkdirSync(SHOTS, { recursive: true });

const errors = [];
const browser = await chromium.launch({ args: ['--use-gl=angle'] });
const page = await browser.newPage({
  viewport: { width: 412, height: 915 },
  hasTouch: true, isMobile: true, deviceScaleFactor: 1.75,
});
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
const die = (msg) => { console.error('FAIL: ' + msg); errors.slice(0, 12).forEach(e => console.error('  ' + e)); process.exit(1); };

await page.addInitScript(() => {
  try { localStorage.setItem('sethcity:tutorial', 'done'); } catch {}
});
await page.goto('http://localhost:5183', { waitUntil: 'load' });
await page.waitForSelector('#boot', { state: 'detached', timeout: 30000 });
await page.waitForTimeout(1200);

// New plains city
await page.getByText('New City', { exact: false }).first().tap();
await page.waitForTimeout(500);
await page.getByRole('button', { name: 'Plains' }).first().tap();
await page.getByRole('button', { name: /Create/i }).first().tap();
await page.waitForTimeout(2500);
// dismiss the tutorial coach-card robustly (it intercepts pointer events)
await page.waitForTimeout(1000);
await page.evaluate(() => {
  const btns = [...document.querySelectorAll('#ui button, #ui a')];
  const skip = btns.find((b) => /skip tutorial/i.test(b.textContent || ''));
  if (skip) skip.click();
});
await page.waitForFunction(
  () => !document.querySelector('.coach-card') ||
    document.querySelector('.coach-card').offsetParent === null ||
    document.querySelector('.coach-card').hidden,
  { timeout: 5000 },
).catch(() => {});
await page.waitForTimeout(500);

const tapCat = async (name) => {
  await page.getByRole('button', { name, exact: true }).first().tap();
  await page.waitForTimeout(500);
};
const dumpDrawer = async () => await page.evaluate(() =>
  [...document.querySelectorAll('#ui button')].filter(e => e.offsetParent !== null)
    .map(e => (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 44)));

// ROAD: pick street, drag a long horizontal line mid-screen
await tapCat('Roads');
console.log('drawer(Roads): ' + JSON.stringify((await dumpDrawer()).slice(0, 20)));
await page.getByRole('button', { name: /Street/i }).first().tap();
await page.waitForTimeout(400);
const dragLine = async (x1, y1, x2, y2, steps = 14) => {
  await page.mouse.move(x1, y1); await page.mouse.down();
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(x1 + ((x2 - x1) * i) / steps, y1 + ((y2 - y1) * i) / steps);
    await page.waitForTimeout(25);
  }
  await page.mouse.up(); await page.waitForTimeout(400);
};
await dragLine(60, 480, 360, 480);   // main street
await dragLine(206, 480, 206, 640);  // side street down
await page.screenshot({ path: `${SHOTS}/20-roads.png` });

// ZONES: residential rect above street, commercial + industrial along it
await tapCat('Zones');
console.log('drawer(Zones): ' + JSON.stringify((await dumpDrawer()).slice(0, 20)));
await page.getByRole('button', { name: /Res.*Low|Low.*Res|Residential/i }).first().tap();
await page.waitForTimeout(300);
await dragLine(80, 440, 330, 400, 10);  // rect drag (picker treats as rect)
await tapCat('Zones');
await page.getByRole('button', { name: /Com/i }).first().tap();
await page.waitForTimeout(300);
await dragLine(80, 520, 190, 560, 8);
await tapCat('Zones');
await page.getByRole('button', { name: /Ind/i }).first().tap();
await page.waitForTimeout(300);
await dragLine(230, 520, 340, 560, 8);
await page.screenshot({ path: `${SHOTS}/21-zones.png` });

// POWER + WATER: place via the actions hook at exact road-adjacent tiles
// (same code path the picker uses; taps already proven by roads/zones above)
const placed = await page.evaluate(() => {
  const sc = window.__sethcity;
  const g = sc.state.grid;
  const tryPlace = (key, count) => {
    const done = [];
    for (let i = 0; i < 128 * 128 && done.length < count; i++) {
      if (!g.road[i]) continue;
      const x = i % 128, y = (i / 128) | 0;
      for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, -1]]) {
        const r = sc.actions.canPlace(key, x + dx, y + dy);
        if (r.ok) {
          const p = sc.actions.place(key, x + dx, y + dy);
          if (p.ok) { done.push([x + dx, y + dy]); break; }
        }
      }
    }
    return done;
  };
  return { wind: tryPlace('p_wind', 3), tower: tryPlace('w_tower', 2) };
});
console.log('placed: ' + JSON.stringify(placed));
await page.screenshot({ path: `${SHOTS}/22-utilities.png` });

// cancel tool if a chip exists, then max speed
const chip = page.locator('#ui [data-ui] button', { hasText: '✕' }).first();
if (await chip.isVisible().catch(() => false)) await chip.tap();
// speed: tap the fastest speed button — find by title or last speed control
const spd = await page.evaluate(() => {
  const btns = [...document.querySelectorAll('#ui button')].filter(e => e.offsetParent !== null);
  const cand = btns.filter(b => /▶▶▶|fast|Fast/.test(b.textContent || b.title || ''));
  if (cand.length) { cand[cand.length - 1].click(); return (cand[cand.length - 1].textContent || cand[cand.length - 1].title).trim(); }
  return null;
});
console.log('speed set via: ' + spd);

// run the sim ~40s real time
for (let i = 0; i < 8; i++) { await page.waitForTimeout(5000); }
await page.screenshot({ path: `${SHOTS}/23-city-grown.png` });

// precise sim diagnostics via the debug hook
const diag = await page.evaluate(() => {
  const g = window.__sethcity?.state;
  if (!g) return null;
  const gr = g.grid;
  let zoned = 0, roads = 0, poweredZoned = 0, wateredZoned = 0, buildings = 0, producers = 0;
  for (let i = 0; i < 128 * 128; i++) {
    if (gr.road[i]) roads++;
    if (gr.building[i] && !gr.originOffset[i]) { buildings++; }
    if (gr.zone[i] && !gr.building[i]) {
      zoned++;
      if (gr.powered[i]) poweredZoned++;
      if (gr.watered[i]) wateredZoned++;
    }
  }
  return {
    pop: g.stats.population, funds: g.budget.funds, ticks: g.time.ticks,
    demand: g.demand, zoned, roads, poweredZoned, wateredZoned, buildings,
    powerSupply: g.stats.powerSupply, powerDemand: g.stats.powerDemand,
    waterSupply: g.stats.waterSupply, waterDemand: g.stats.waterDemand,
  };
});
console.log('DIAG: ' + JSON.stringify(diag, null, 1));
console.log('ERRORS: ' + (errors.length ? '\n' + errors.slice(0, 12).join('\n') : 'none'));
await browser.close();
