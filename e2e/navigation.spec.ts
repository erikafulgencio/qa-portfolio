import { ROUTES, expect, test, visit } from './fixtures';

for (const mode of ['pro', 'alter'] as const) {
  test.describe(`${mode} mode`, () => {
    for (const route of ROUTES) {
      test(`renders ${route.name} @mobile`, async ({ page }) => {
        await visit(page, route.path, mode);
        await expect(page.locator('html')).toHaveAttribute('data-mode', mode);
        await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
        await expect(page.locator('#site-nav')).toBeAttached();
      });

      test(`${route.name} has no horizontal overflow on a phone @mobile`, async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await visit(page, route.path, mode);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(1);
      });
    }
  });
}

test('header navigation reaches every Professional page', async ({ page, isMobile }) => {
  test.skip(isMobile, 'covered by the mobile menu test');
  await visit(page, '/');
  const nav = page.getByRole('navigation', { name: 'Main' });
  for (const [label, path] of [
    ['About', '/about'],
    ['Projects', '/projects'],
    ['Skills', '/skills'],
    ['Résumé', '/resume'],
    ['Contact', '/contact'],
    ['Home', '/'],
  ] as const) {
    await nav.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path === '/' ? '/$' : path}$`));
    await expect(nav.getByRole('link', { name: label, exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
  }
});

test('mobile menu opens and navigates @mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await visit(page, '/');
  await page.getByRole('button', { name: 'Menu' }).click();
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Skills' })
    .click();
  await expect(page).toHaveURL(/\/skills$/);
  await expect(page.getByRole('navigation', { name: 'Main' })).toBeHidden();
});

// 1536×864 laptops at 150% zoom land around 1024 CSS px: the menu is a right-hand drawer there.
test('menu drawer slides in from the right and closes on scrim or Escape', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 560 });
  await visit(page, '/');
  const nav = page.getByRole('navigation', { name: 'Main' });
  const menu = page.getByRole('button', { name: 'Menu' });

  await expect(nav).toBeHidden();
  await menu.click();
  await expect(nav).toBeVisible();
  const drawer = page.locator('app-site-header .collapse');
  // Poll past the slide-in transition: flush against the right edge, full height.
  await expect
    .poll(async () => {
      const box = await drawer.boundingBox();
      return box && [Math.round(box.x + box.width), Math.round(box.y), Math.round(box.height)];
    })
    .toEqual([1024, 0, 560]);

  await page.getByRole('button', { name: 'Close menu' }).click({ position: { x: 20, y: 300 } });
  await expect(nav).toBeHidden();

  await menu.click();
  await expect(nav).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
});

test('home hero keeps the iceberg beside the copy on small laptops', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 560 });
  await visit(page, '/', 'pro');
  const copy = await page.locator('app-pro-hero .copy').boundingBox();
  const iceberg = await page.locator('app-pro-hero .iceberg').boundingBox();
  expect(iceberg!.x).toBeGreaterThan(copy!.x + copy!.width);
});

test('deep links and unknown paths', async ({ page }) => {
  await visit(page, '/cases/uat');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A room of our own');

  await page.goto('/does-not-exist');
  await expect(page).toHaveURL(/\/$/);
});

test('every case study links to the next one', async ({ page }) => {
  await visit(page, '/cases/breach');
  const titles = [
    'Bug Hunt Bounty',
    'A room of our own',
    'One week early',
    'Custom Claude Skills for QA',
  ];
  for (const title of titles) {
    await page
      .getByRole('link', { name: new RegExp(title) })
      .last()
      .click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText(title);
  }
});
