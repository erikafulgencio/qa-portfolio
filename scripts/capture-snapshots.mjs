// Captures the screenshots the "This portfolio" project shows (public/assets/img/projects/).
// Run against a live dev server: `npm start`, then `npm run snapshots` (SNAPSHOT_URL to override).
import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const BASE = (process.env.SNAPSHOT_URL ?? 'http://localhost:4200').replace(/\/$/, '');
const OUT = 'public/assets/img/projects';

const DESKTOP = { width: 1440, height: 900 };

/**
 * [file name, route, mode, viewport, optional selector to capture instead of the viewport,
 *  optional button to press first (its animations are then left running so the game is mid-play)]
 */
const SHOTS = [
  ['portfolio-pro-desktop', '/', 'pro', DESKTOP],
  ['portfolio-alter-desktop', '/', 'alter', DESKTOP],
  ['portfolio-pro-skills', '/skills', 'pro', DESKTOP],
  ['portfolio-alter-about', '/about', 'alter', DESKTOP],
  ['portfolio-pro-squash', '/', 'pro', DESKTOP, 'app-squash-card .sheet', /start hunt/i],
];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
// Encodes a PNG as WebP at full and half width with the browser's own canvas encoder, so the
// site serves small images without an image-processing dependency.
const encoder = await (await browser.newContext()).newPage();
async function saveWebp(name, png) {
  const files = await encoder.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const encode = (w) => {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = Math.round((img.height * w) / img.width);
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/webp', 0.8).split(',')[1];
    };
    return { full: encode(img.width), half: encode(Math.round(img.width / 2)) };
  }, png.toString('base64'));
  writeFileSync(`${OUT}/${name}.webp`, Buffer.from(files.full, 'base64'));
  writeFileSync(`${OUT}/${name}-720.webp`, Buffer.from(files.half, 'base64'));
}

try {
  for (const [name, path, mode, viewport, selector, press] of SHOTS) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    await context.addInitScript((m) => localStorage.setItem('ef-mode', m), mode);
    const page = await context.newPage();
    await page.goto(BASE + path);
    await page.locator('#pl-loader').waitFor({ state: 'detached', timeout: 20_000 });
    // Let entrance animations and lazy images settle before the shutter.
    await page.waitForTimeout(1500);
    if (press) {
      await page.locator(selector).first().scrollIntoViewIfNeeded();
      await page.getByRole('button', { name: press }).click();
      await page.waitForTimeout(2600);
    }
    const options = { animations: press ? 'allow' : 'disabled' };
    const png = selector
      ? await page.locator(selector).first().screenshot(options)
      : await page.screenshot(options);
    await saveWebp(name, png);
    await context.close();
    console.log(`snapshots: ${OUT}/${name}.webp (+ -720.webp)`);
  }
} finally {
  await browser.close();
}
