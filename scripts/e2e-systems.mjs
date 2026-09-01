// Systems E2E (dev server): save/load round-trip, overlays, disaster, no errors.
import { chromium } from 'playwright';
const browser = await chromium.launch({ args: ['--use-gl=angle'] });
const page = await browser.newPage({ viewport: { width: 412, height: 915 }, hasTouch: true, isMobile: true });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.addInitScript(() => { try { localStorage.setItem('sethcity:tutorial', 'done'); } catch {} });
await page.goto('http://localhost:5184', { waitUntil: 'load' });
await page.waitForSelector('#boot', { state: 'detached', timeout: 60000 });
await page.waitForTimeout(2000);
await page.getByText('New City').first().tap();
await page.waitForTimeout(400);
await page.getByRole('button', { name: 'Plains' }).first().tap();
await page.getByRole('button', { name: /Create/i }).first().tap();
await page.waitForTimeout(2000);

const before = await page.evaluate(async () => {
  const sc = window.__sethcity, a = sc.actions;
  a.applyTool('road_street', 40, 64, 90, 64, false);
  a.applyTool('zone_res_low', 45, 61, 85, 63, false);
  a.applyTool('zone_ind_light', 45, 65, 70, 67, false);
  for (const [x, y] of [[42, 63], [43, 63]]) a.place('p_wind', x, y);
  a.place('w_tower', 87, 62);
  for (let t = 0; t < 300; t++) sc.sim.tick();
  const s = sc.state;
  s.signs.push({ x: 50, y: 60, text: 'E2E WAS HERE' });
  const save = await import('/src/save/save.ts');
  await save.saveGame(s, 'e2e');
  return { pop: s.stats.population, funds: Math.round(s.budget.funds), ticks: s.time.ticks, signs: s.signs.length, papers: s.papers.length, deals: s.deals.length };
});
console.log('SAVED: ' + JSON.stringify(before));

await page.reload({ waitUntil: 'load' });
await page.waitForSelector('#boot', { state: 'detached', timeout: 60000 });
await page.waitForTimeout(2000);
const after = await page.evaluate(async () => {
  const save = await import('/src/save/save.ts');
  const s = await save.loadGame('e2e');
  if (!s) return null;
  return { pop: s.stats.population, funds: Math.round(s.budget.funds), ticks: s.time.ticks, signs: s.signs.length, sign0: s.signs[0]?.text, papers: s.papers.length, deals: s.deals.length };
});
console.log('LOADED: ' + JSON.stringify(after));
const match = after && after.pop === before.pop && after.funds === before.funds && after.ticks === before.ticks && after.signs === before.signs && after.sign0 === 'E2E WAS HERE';
console.log('ROUNDTRIP: ' + (match ? 'PASS' : 'MISMATCH'));

// disaster: real trigger through the module
const dis = await page.evaluate(async () => {
  const sc = window.__sethcity;
  const d = await import('/src/sim/disasters.ts');
  const res = d.triggerDisaster(sc.state, 'tornado');
  for (let t = 0; t < 60; t++) { d.updateDisasters(sc.state); sc.sim.tick(); }
  return { started: !!res, active: sc.state.disasters.length, news: sc.state.news.slice(-2).map(n => n.text) };
});
console.log('DISASTER: ' + JSON.stringify(dis));

// overlays cycle on live game
for (const o of ['pollution', 'landvalue', 'traffic', 'power', 'water', 'underground', 'none']) {
  await page.evaluate((ov) => { window.__sethcity.state.overlay = ov; }, o);
  await page.waitForTimeout(600);
}
console.log('overlays cycled');
console.log('ERRORS: ' + (errors.length ? '\n' + errors.slice(0, 12).join('\n') : 'none'));
await browser.close();
