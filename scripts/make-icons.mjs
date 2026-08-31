// Rasterise public/icon.svg into Android launcher mipmaps + web PNGs.
import { chromium } from 'playwright';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(resolve(root, 'public/icon.svg'), 'utf8');

const targets = [
  ['android/app/src/main/res/mipmap-mdpi/ic_launcher.png', 48],
  ['android/app/src/main/res/mipmap-hdpi/ic_launcher.png', 72],
  ['android/app/src/main/res/mipmap-xhdpi/ic_launcher.png', 96],
  ['android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png', 144],
  ['android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png', 192],
  ['android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png', 48],
  ['android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png', 72],
  ['android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png', 96],
  ['android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png', 144],
  ['android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png', 192],
  ['public/icon-512.png', 512],
  ['public/icon-192.png', 192],
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [rel, size] of targets) {
  const round = rel.includes('_round');
  await page.setViewportSize({ width: size, height: size });
  const radius = round ? size / 2 : Math.round(size * 96 / 512);
  await page.setContent(
    `<body style="margin:0;background:transparent">` +
      `<div style="width:${size}px;height:${size}px;border-radius:${radius}px;overflow:hidden">` +
      svg.replace('<svg ', `<svg width="${size}" height="${size}" `) +
      `</div></body>`,
  );
  const buf = await page.screenshot({ omitBackground: true });
  const out = resolve(root, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, buf);
  console.log('wrote', rel);
}
await browser.close();
