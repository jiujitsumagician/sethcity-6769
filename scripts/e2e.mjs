// SethCity 6769 — headless phone-viewport smoke/E2E harness.
// Usage: node scripts/e2e.mjs [--url http://localhost:5183] [--shots dir] [--long]
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const arg = (k, d) => {
  const i = process.argv.indexOf(k);
  return i > -1 ? process.argv[i + 1] : d;
};
const URL = arg('--url', 'http://localhost:5183');
const SHOTS = resolve(arg('--shots', '.tmp/shots'));
const LONG = process.argv.includes('--long');
mkdirSync(SHOTS, { recursive: true });

const errors = [];
const browser = await chromium.launch({
  args: ['--use-gl=angle', '--enable-webgl', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({
  viewport: { width: 412, height: 915 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 1.75,
});
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`);
});

const shot = (name) => page.screenshot({ path: `${SHOTS}/${name}.png` });
const fail = (msg) => {
  console.error(`FAIL: ${msg}`);
  for (const e of errors.slice(0, 20)) console.error('  ' + e);
  process.exit(1);
};

console.log(`open ${URL}`);
await page.goto(URL, { waitUntil: 'load', timeout: 30000 }).catch((e) => fail(`goto: ${e.message}`));

// 1. boot splash must clear (main.ts removes #boot after first frame)
await page.waitForSelector('#boot', { state: 'detached', timeout: 30000 }).catch(() => fail('#boot never cleared — game did not reach first frame'));
console.log('boot cleared');
await page.waitForTimeout(2500);
await shot('01-first-frame');

// 2. WebGL context alive + scene rendering (canvas non-black pixels)
const px = await page.evaluate(() => {
  const c = document.getElementById('scene');
  if (!c) return null;
  const gl = c.getContext('webgl2') || c.getContext('webgl');
  return { w: c.width, h: c.height, hasGl: !!gl };
});
if (!px || !px.w) fail('no #scene canvas');
console.log(`canvas ${px.w}x${px.h}`);

// 3. UI mounted
const uiKids = await page.evaluate(() => document.getElementById('ui')?.childElementCount ?? 0);
if (uiKids === 0) fail('#ui is empty — UI failed to mount');
console.log(`ui children: ${uiKids}`);

// 4. no page errors so far
if (errors.length) fail(`${errors.length} console/page errors on boot`);
console.log('no boot errors');

// 5. let the sim run; take timed screenshots
await page.waitForTimeout(LONG ? 12000 : 5000);
await shot('02-running');
if (errors.length) fail(`${errors.length} errors while running`);
console.log('sim running clean');

// 6. poke the canvas with a few taps + a drag (camera pan) — must not throw
const box = await page.locator('#scene').boundingBox();
const cx = box.x + box.width / 2;
const cy = box.y + box.height / 2;
await page.touchscreen.tap(cx, cy);
await page.waitForTimeout(400);
await page.mouse.move(cx, cy);
await page.mouse.down();
for (let i = 1; i <= 8; i++) {
  await page.mouse.move(cx + i * 18, cy + i * 6);
  await page.waitForTimeout(30);
}
await page.mouse.up();
await page.waitForTimeout(800);
await shot('03-after-input');
if (errors.length) fail(`${errors.length} errors after input`);
console.log('input handled clean');

console.log('SMOKE PASS');
await browser.close();
