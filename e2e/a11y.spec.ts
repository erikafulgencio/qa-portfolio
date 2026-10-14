import AxeBuilder from '@axe-core/playwright';

import { ROUTES, expect, test, visit } from './fixtures';

for (const mode of ['pro', 'alter'] as const) {
  for (const route of ROUTES) {
    test(`${route.name} (${mode}) has no serious accessibility violations`, async ({ page }) => {
      // Reduced motion freezes entrance/float animations so contrast is measured on final colours.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await visit(page, route.path, mode);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        // Decorative animated layers are aria-hidden; colour contrast on moving gradients is checked by eye.
        .exclude('[aria-hidden="true"]')
        .analyze();
      const serious = results.violations.filter((v) =>
        ['serious', 'critical'].includes(v.impact ?? ''),
      );
      expect(
        serious.map(
          (v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(' ')).join(', ')})`,
        ),
      ).toEqual([]);
    });
  }
}
