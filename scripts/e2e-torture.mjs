// Torture sweep: exercise every tool/building/overlay/disaster/panel/shape.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
mkdirSync('.tmp/shots', { recursive: true });

const browser = await chromium.launch({ args: ['--use-gl=angle'] });
const page = await browser.newPage({ viewport: { width: 412, height: 915 }, hasTouch: true, isMobile: true });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
const mark = (tag) => { const n = errors.length; return () => (errors.length > n ? `${tag}: ${errors.slice(n).join(' | ').slice(0, 300)}` : null); };
const bad = [];

await page.addInitScript(() => { try { localStorage.setItem('sethcity:tutorial', 'done'); } catch {} });
await page.goto('http://localhost:5183', { waitUntil: 'load' });
await page.waitForSelector('#boot', { state: 'detached', timeout: 40000 });
await page.waitForTimeout(1500);

// sandbox plains city
await page.getByText('New City').first().tap();
await page.waitForTimeout(400);
await page.getByRole('button', { name: 'Plains' }).first().tap();
await page.getByRole('button', { name: /Sandbox/i }).first().tap();
await page.getByRole('button', { name: /Create/i }).first().tap();
await page.waitForTimeout(2000);

// 1. every placeable building
let m = mark('placements');
const placeReport = await page.evaluate(() => {
  const sc = window.__sethcity, a = sc.actions, g = sc.state.grid;
  const fails = [];
  // find flat dry spots systematically
  const spots = [];
  for (let y = 4; y < 124; y += 2) for (let x = 4; x < 124; x += 2) spots.push([x, y]);
  let cursor = 0;
  const keys = Object.keys(window.__sethcity.actions).length ? null : null;
  const CAT = [];
  // pull placeable keys from a probe placement error? cheat: read from palette via state? Instead: known list via catalog through canPlace probing is not possible without keys.
  return { fails, note: 'keys enumerated in next step' };
});
// enumerate PLACEABLE via the palette DOM instead
await page.evaluate(() => { window.__sethcity.state.stats.population = 999999; });
const items = await page.evaluate(() => {
  // palette builds from PLACEABLE — walk categories through its item dataset
  const tools = new Set();
  document.querySelectorAll('#ui .d-item').forEach((b) => tools.add(b.dataset.tool));
  return [...tools];
});
const catButtons = ['Zones','Roads','Power','Water','Safety','Health','Education','Leisure','Transport','Special','Terrain'];
const allTools = new Set();
for (const c of catButtons) {
  await page.getByRole('button', { name: c, exact: true }).first().tap().catch(() => {});
  await page.waitForTimeout(350);
  const t = await page.evaluate(() => [...document.querySelectorAll('#ui .d-item')].map((b) => b.dataset.tool).filter(Boolean));
  t.forEach((x) => allTools.add(x));
  await page.getByRole('button', { name: c, exact: true }).first().tap().catch(() => {});
  await page.waitForTimeout(150);
}
console.log('tools discovered: ' + allTools.size);
const placeRes = await page.evaluate((tools) => {
  const sc = window.__sethcity, a = sc.actions, g = sc.state.grid;
  const fails = [];
  let px = 4, py = 4;
  const next = () => { px += 9; if (px > 118) { px = 4; py += 9; } };
  for (const t of tools) {
    if (!t.startsWith('build_')) continue;
    const key = t.slice(6);
    let ok = false, reason = '';
    for (let tries = 0; tries < 160 && !ok; tries++) {
      const r = a.applyTool(t, px, py, px, py, false);
      ok = r.ok; reason = r.reason ?? '';
      if (!ok) next();
    }
    if (!ok) fails.push(key + ' (' + reason + ')');
    next();
  }
  return fails;
}, [...allTools]);
if (placeRes.length) bad.push('UNPLACEABLE: ' + placeRes.join(', '));
let e1 = m(); if (e1) bad.push(e1);

// 2. every non-build tool
m = mark('tools');
const toolRes = await page.evaluate(() => {
  const sc = window.__sethcity, a = sc.actions;
  const fails = [];
  const line = (t, x0, y0, x1, y1) => { const r = a.applyTool(t, x0, y0, x1, y1, false); if (!r.ok) fails.push(t + ':' + (r.reason ?? '')); };
  line('road_street', 10, 100, 40, 100); line('road_avenue', 10, 104, 40, 104); line('road_highway', 10, 108, 40, 108);
  line('rail', 10, 112, 40, 112); line('wire', 10, 116, 40, 116); line('pipe', 10, 118, 40, 118); line('subway', 10, 120, 40, 120);
  line('zone_res_low', 44, 98, 54, 102); line('zone_res_med', 44, 104, 54, 106); line('zone_res_high', 44, 108, 54, 110);
  line('zone_com_low', 56, 98, 66, 102); line('zone_com_high', 56, 104, 66, 106);
  line('zone_ind_agri', 68, 98, 78, 102); line('zone_ind_light', 68, 104, 78, 106); line('zone_ind_heavy', 68, 108, 78, 110);
  line('tree', 80, 98, 90, 102);
  line('terrain_raise', 95, 100, 95, 100); line('terrain_lower', 97, 100, 97, 100); line('terrain_level', 99, 100, 99, 100);
  sc.actions.pendingSignText = 'TORTURE';
  line('sign', 101, 100, 101, 100);
  line('water_place', 103, 100, 103, 100);
  line('bulldoze', 10, 100, 20, 100);
  return fails;
});
if (toolRes.length) bad.push('TOOL FAILS: ' + toolRes.join(', '));
let e2 = m(); if (e2) bad.push(e2);

// 3. overlays
m = mark('overlays');
for (const o of ['zones','power','water','pollution','noise','crime','landvalue','traffic','transit','density','health','education','fire','desirability','underground','none']) {
  await page.evaluate((ov) => { window.__sethcity.state.overlay = ov; }, o);
  await page.waitForTimeout(350);
}
let e3 = m(); if (e3) bad.push(e3);

// 4. disasters (each kind, ride it out with direct ticks)
m = mark('disasters');
for (const k of ['fire','earthquake','tornado','flood','meteor','blackout','riot','volcano','monster','aircrash','meltdown','hurricane','chemical']) {
  const r = await page.evaluate((kind) => {
    const sc = window.__sethcity;
    try {
      sc.state.disastersEnabled = true;
      // built bundle: reach trigger via sim tick path — disasters module is bundled; use UI path unavailable headless; approximate by direct import unavailable → use window hook if exposed
      return 'no-direct';
    } catch (e) { return 'ERR ' + e.message; }
  }, k);
}
// disasters via dev-module path happens in e2e-systems; here just run long sim with random disasters on
await page.evaluate(() => { for (let t = 0; t < 400; t++) window.__sethcity.sim.tick(); });
let e4 = m(); if (e4) bad.push(e4);

// 5. panels sweep via UI
m = mark('panels');
for (const p of ['Budget','Statistics','City','Advisors','Newspaper','Settings']) {
  const b = page.getByRole('button', { name: p }).first();
  if (await b.count() && await b.isVisible().catch(() => false)) {
    await b.tap().catch(() => {});
    await page.waitForTimeout(600);
    await page.screenshot({ path: `.tmp/shots/70-panel-${p}.png` });
    // close: tap ✕ or swipe — try close buttons
    await page.evaluate(() => {
      const x = [...document.querySelectorAll('#ui button')].find((b) => /^[×✕x]$/.test((b.textContent || '').trim()));
      if (x) x.click();
    });
    await page.waitForTimeout(300);
  } else bad.push('PANEL MISSING BUTTON: ' + p);
}
let e5 = m(); if (e5) bad.push(e5);

// 6. newGame churn across all shapes
m = mark('newgame-churn');
for (const shape of ['Coastal','River','Lakes','Valley','Islands','Plains']) {
  await page.evaluate(() => {
    const menu = [...document.querySelectorAll('#ui button')].find((b) => /menu/i.test(b.getAttribute('aria-label') || '') || /≡|☰/.test(b.textContent || ''));
    if (menu) menu.click();
  });
  await page.waitForTimeout(400);
  const nc = page.getByText('New City').first();
  if (await nc.isVisible().catch(() => false)) {
    await nc.tap();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: shape }).first().tap().catch(() => {});
    await page.getByRole('button', { name: /Create/i }).first().tap();
    await page.waitForTimeout(2200);
  } else { bad.push('MENU: could not reopen for ' + shape); break; }
}
let e6 = m(); if (e6) bad.push(e6);

// 7. desktop mouse: wheel zoom + RMB orbit
m = mark('desktop-mouse');
await page.mouse.move(206, 460);
for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, -240); await page.waitForTimeout(80); }
await page.mouse.down({ button: 'right' });
for (let i = 0; i < 8; i++) { await page.mouse.move(206 + i * 14, 460 + i * 4); await page.waitForTimeout(30); }
await page.mouse.up({ button: 'right' });
await page.waitForTimeout(400);
let e7 = m(); if (e7) bad.push(e7);

// 8. landscape viewport
m = mark('landscape');
await page.setViewportSize({ width: 915, height: 412 });
await page.waitForTimeout(1200);
await page.screenshot({ path: '.tmp/shots/71-landscape.png' });
let e8 = m(); if (e8) bad.push(e8);

console.log('=== TORTURE SCORECARD ===');
console.log(bad.length ? bad.map((b) => 'BAD ' + b).join('\n') : 'ALL CLEAN');
console.log('total console/page errors: ' + errors.length);
await browser.close();
