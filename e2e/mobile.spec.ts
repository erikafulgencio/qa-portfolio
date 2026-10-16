import { ROUTES, expect, test, visit } from './fixtures';
import { measure, measureText, scrollThrough } from './layout';

// Phone-first checks on real device profiles: the Pixel 7 (Android Chrome), iPhone 13 (iOS Safari) and
// Firefox-on-Android projects run every @mobile test with touch, a mobile user agent and the device's
// pixel density. The desktop projects have no touchscreen, so these checks don't apply there.
test.skip(({ hasTouch }) => !hasTouch, 'phone-only checks: they run on the touch device projects');

test('the page can be pinch-zoomed @mobile', async ({ page }) => {
  await visit(page, '/');
  const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
  expect(viewport).not.toMatch(/user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/);
});

// Regression: on iOS Safari a tap applies :hover and keeps it ("sticky hover"). The hero button's
// hover style used to widen it, which pushed "Résumé" onto a new line until the visitor tapped away.
test('tapping a button leaves no sticky hover state and does not reflow its row @mobile', async ({
  page,
}) => {
  await visit(page, '/');
  const projects = page.getByRole('link', { name: 'See my projects' });
  const resume = page.locator('app-pro-hero').getByRole('link', { name: /Résumé/ });
  const look = () =>
    projects.evaluate((el) => {
      const s = getComputedStyle(el);
      return `${s.backgroundColor} ${s.letterSpacing} ${s.transform}`;
    });
  const before = { look: await look(), resume: await resume.boundingBox() };
  await projects.hover();
  await page.waitForTimeout(400); // longer than the 0.3s hover transition
  expect(await look()).toBe(before.look);
  expect(await resume.boundingBox()).toEqual(before.resume);
});

for (const mode of ['pro', 'alter'] as const) {
  for (const route of ROUTES) {
    test(`${route.name} (${mode}) works on a phone, portrait and landscape @mobile`, async ({
      page,
    }) => {
      test.setTimeout(90_000);
      const portrait = page.viewportSize() ?? { width: 390, height: 844 };
      const problems: string[] = [];
      for (const [label, size] of [
        ['portrait', portrait],
        ['landscape', { width: portrait.height, height: portrait.width }],
      ] as const) {
        await page.setViewportSize(size);
        await visit(page, route.path, mode);
        await scrollThrough(page);
        const layout = await page.evaluate(measure, true);
        const text = await page.evaluate(measureText);
        problems.push(
          ...layout.overflow.map((d) => `${label}: horizontal overflow: ${d}`),
          ...layout.broken.map((d) => `${label}: broken image: ${d}`),
          ...layout.smallTargets.map((d) => `${label}: tap target under 24px: ${d}`),
          ...text.zoomingFields.map((d) => `${label}: field under 16px (iOS zooms in): ${d}`),
        );
        if (text.smallTextShare > 0.4) {
          problems.push(
            `${label}: ${Math.round(text.smallTextShare * 100)}% of text is under 12px (max 40%)`,
          );
        }
      }
      expect(problems).toEqual([]);
    });
  }
}

test('tapping a skill shows its note right under its group @mobile', async ({ page }) => {
  await visit(page, '/skills');
  const group = page.locator('section.group', {
    has: page.getByRole('heading', { name: 'Languages' }),
  });
  await group.getByRole('button', { name: 'Python', exact: true }).tap();
  const note = group.locator('.inline-note');
  await expect(note).toBeVisible();
  await expect(note).toContainText('Python');
  await expect(note).toBeInViewport();
});
