// Drive: menu → New City → start → look at the city. Dumps DOM when lost.
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

await page.goto('http://localhost:5183', { waitUntil: 'load' });
await page.waitForSelector('#boot', { state: 'detached', timeout: 30000 });
await page.waitForTimeout(1500);

// open New City
const newBtn = page.getByText('New City', { exact: false }).first();
await newBtn.tap();
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS}/10-newgame-form.png` });

// dump visible buttons/inputs so we can see the form structure
const form = await page.evaluate(() => {
  const els = [...document.querySelectorAll('#ui button, #ui input, #ui select, #ui [role=button], #ui label')];
  return els.filter(e => e.offsetParent !== null).map(e =>
    `${e.tagName}${e.type ? ':' + e.type : ''} "${(e.textContent || e.value || e.placeholder || '').trim().slice(0, 40)}"`).slice(0, 60);
});
console.log('FORM ELEMENTS:\n' + form.join('\n'));

// try to start the game: look for a likely primary action
const candidates = ['Found City', 'Start', 'Begin', 'Create', 'Build', 'Go'];
let started = false;
for (const label of candidates) {
  const b = page.getByRole('button', { name: new RegExp(label, 'i') }).first();
  if (await b.count() > 0 && await b.isVisible().catch(() => false)) {
    console.log('tapping: ' + label);
    await b.tap();
    started = true;
    break;
  }
}
if (!started) console.log('NO START BUTTON FOUND — see form dump');

await page.waitForTimeout(4000);
await page.screenshot({ path: `${SHOTS}/11-city-after-start.png` });

// pinch-zoom out a little + pan to survey the map (two quick drags)
const c = { x: 206, y: 500 };
await page.mouse.move(c.x, c.y); await page.mouse.down();
for (let i = 0; i < 10; i++) { await page.mouse.move(c.x + i * 12, c.y + i * 10); await page.waitForTimeout(25); }
await page.mouse.up();
await page.waitForTimeout(1500);
await page.screenshot({ path: `${SHOTS}/12-city-panned.png` });

console.log('ERRORS: ' + (errors.length ? '\n' + errors.slice(0, 10).join('\n') : 'none'));
await browser.close();
