import { ROUTES, expect, test, visit } from './fixtures';
import { measure, scrollThrough } from './layout';

// Responsive checks for every route, in both modes, from a small phone to a wide desktop. Runs in each
// desktop engine project (Chromium, Firefox, WebKit), so it is also the cross-browser layout check.
// Most visitors arrive on a phone, so phone sizes dominate the list (true touch-device behaviour is
// covered by mobile.spec.ts on the Pixel and iPhone projects).
const WIDTHS = [
  [320, 640], // iPhone SE (1st gen), small Androids
  [360, 780], // most common Android width
  [375, 812], // iPhone mini / X / 11 Pro
  [390, 844], // iPhone 12–15
  [412, 915], // Pixel, Galaxy S
  [430, 932], // iPhone Pro Max / Plus
  [844, 390], // phone in landscape
  [768, 1024], // tablet portrait
  [1024, 768], // tablet landscape / small laptop
  [1440, 900], // desktop
  [1920, 1080], // large desktop
] as const;

/** Widest viewport treated as a touch screen for the tap-target check. */
const TOUCH_MAX = 844;

for (const mode of ['pro', 'alter'] as const) {
  for (const route of ROUTES) {
    test(`${route.name} (${mode}) lays out cleanly from 320px to 1920px`, async ({ page }) => {
      test.setTimeout(240_000);
      const problems: string[] = [];
      for (const [width, height] of WIDTHS) {
        await page.setViewportSize({ width, height });
        await visit(page, route.path, mode);
        await scrollThrough(page);
        const found = await page.evaluate(measure, width <= TOUCH_MAX);
        problems.push(
          ...found.overflow.map((d) => `${width}px horizontal overflow: ${d}`),
          ...found.broken.map((d) => `${width}px broken image: ${d}`),
          ...found.smallTargets.map((d) => `${width}px tap target under 24px: ${d}`),
        );
      }
      expect(problems).toEqual([]);
    });
  }
}
