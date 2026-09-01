// Build a substantial city via the actions hook, run years of sim, screenshot.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
mkdirSync('.tmp/shots', { recursive: true });

const browser = await chromium.launch({ args: ['--use-gl=angle'] });
const page = await browser.newPage({
  viewport: { width: 412, height: 915 },
  hasTouch: true, isMobile: true, deviceScaleFactor: 1.75,
});
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.addInitScript(() => { try { localStorage.setItem('sethcity:tutorial', 'done'); } catch {} });
await page.goto('http://localhost:5183', { waitUntil: 'load' });
await page.waitForSelector('#boot', { state: 'detached', timeout: 40000 });
await page.waitForTimeout(1500);
await page.getByText('New City').first().tap();
await page.waitForTimeout(400);
await page.getByRole('button', { name: 'Coastal' }).first().tap();
await page.getByRole('button', { name: /Create/i }).first().tap();
await page.waitForTimeout(2500);

const build = await page.evaluate(() => {
  const sc = window.__sethcity, a = sc.actions, s = sc.state, g = s.grid;
  s.difficulty = 'sandbox'; // showcase: unlimited funds, everything unlocked
  // find a big flat land patch center
  let cx = 64, cy = 64, best = -1;
  for (let y = 20; y < 108; y += 4) for (let x = 20; x < 108; x += 4) {
    let flat = 0;
    for (let dy = -10; dy <= 10; dy++) for (let dx = -10; dx <= 10; dx++) {
      const i = (y + dy) * 128 + (x + dx);
      if (i >= 0 && i < 16384 && !g.water[i] && g.tree[i] === 0) flat++;
    }
    if (flat > best) { best = flat; cx = x; cy = y; }
  }
  const R = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const x0 = R(cx - 14, 2, 100), y0 = R(cy - 14, 2, 100);
  // road grid: avenues on the spine, streets every 4
  a.applyTool('road_avenue', x0, y0 + 14, x0 + 28, y0 + 14, false);
  a.applyTool('road_avenue', x0 + 14, y0, x0 + 14, y0 + 28, false);
  for (let k = 0; k <= 28; k += 4) {
    a.applyTool('road_street', x0, y0 + k, x0 + 28, y0 + k, false);
    a.applyTool('road_street', x0 + k, y0, x0 + k, y0 + 28, false);
  }
  // zones: quadrants — res low/med, com, ind
  a.applyTool('zone_res_low', x0 + 1, y0 + 1, x0 + 13, y0 + 7, false);
  a.applyTool('zone_res_med', x0 + 1, y0 + 9, x0 + 13, y0 + 13, false);
  a.applyTool('zone_com_low', x0 + 15, y0 + 1, x0 + 27, y0 + 7, false);
  a.applyTool('zone_res_low', x0 + 15, y0 + 9, x0 + 27, y0 + 13, false);
  a.applyTool('zone_ind_light', x0 + 1, y0 + 15, x0 + 13, y0 + 27, false);
  a.applyTool('zone_res_low', x0 + 15, y0 + 15, x0 + 27, y0 + 21, false);
  a.applyTool('zone_com_low', x0 + 15, y0 + 23, x0 + 27, y0 + 27, false);
  // utilities beside roads
  const place = (key, n) => {
    let placed = 0;
    for (let i = 0; i < 16384 && placed < n; i++) {
      if (!g.road[i]) continue;
      const x = i % 128, y = (i / 128) | 0;
      for (const [dx, dy] of [[1, 1], [-1, -1], [1, -1], [-1, 1]]) {
        const r = a.canPlace(key, x + dx, y + dy);
        if (r.ok && a.place(key, x + dx, y + dy).ok) { placed++; break; }
      }
    }
    return placed;
  };
  const coal = place('p_coal', 1), wind = place('p_wind', 4), tower = place('w_tower', 3), pump = place('w_pump', 1);
  const park = place('l_park', 6), school = place('e_school', 1), police = place('s_police', 1), fire = place('s_fire', 1), clinic = place('h_clinic', 1);
  // focus camera on town center
  return { cx, cy, coal, wind, tower, pump, park, school, police, fire, clinic };
});
console.log('built: ' + JSON.stringify(build));
await page.evaluate((b) => {
  const sc = window.__sethcity;
  sc.state.speed = 3;
  window.__sethcity && void 0;
}, build);

// run ~4 game years in bursts of direct ticks (fast + deterministic)
for (let burst = 0; burst < 6; burst++) {
  await page.evaluate(() => { for (let t = 0; t < 250; t++) window.__sethcity.sim.tick(); });
  await page.waitForTimeout(700); // let renderer catch up on dirty chunks
}
const stats = await page.evaluate(() => {
  const s = window.__sethcity.state;
  return { pop: s.stats.population, jobs: s.stats.jobs, funds: Math.round(s.budget.funds), year: s.time.year, month: s.time.month, demand: s.demand, happiness: s.stats.happiness, approval: s.stats.approval };
});
console.log('CITY: ' + JSON.stringify(stats));

// day shot centred on the city
await page.evaluate((b) => {
  const c = window.__sethcity;
  c.state.time.timeOfDay = 0.45;
  c.controls.focusOn(b.cx + 2, b.cy + 2, 46);
}, build);
await page.waitForTimeout(2500);
await page.screenshot({ path: '.tmp/shots/30-city-day.png' });

// dusk + night shots
await page.evaluate(() => { window.__sethcity.state.time.timeOfDay = 0.79; });
await page.waitForTimeout(2000);
await page.screenshot({ path: '.tmp/shots/31-city-dusk.png' });
await page.evaluate(() => { window.__sethcity.state.time.timeOfDay = 0.98; });
await page.waitForTimeout(2000);
await page.screenshot({ path: '.tmp/shots/32-city-night.png' });

console.log('ERRORS: ' + (errors.length ? '\n' + errors.slice(0, 10).join('\n') : 'none'));
await browser.close();
