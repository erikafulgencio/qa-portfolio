import { expect, test, visit, waitForLoader } from './fixtures';

test('switching to Alter Ego re-themes the site and survives a reload', async ({
  page,
  isMobile,
}) => {
  await visit(page, '/skills');
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();

  await page
    .getByRole('group', { name: 'Site mode' })
    .getByRole('button', { name: 'Alter Ego' })
    .click();
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'alter');
  await waitForLoader(page);

  // Same route, game vocabulary.
  await expect(page).toHaveURL(/\/skills$/);
  const nav = page.locator('#site-nav');
  await expect(nav.getByRole('link', { name: 'Quests', includeHidden: true })).toBeAttached();
  await expect(nav.getByRole('link', { name: 'Lore', includeHidden: true })).toBeAttached();
  expect(await page.evaluate(() => localStorage.getItem('ef-mode'))).toBe('alter');

  await page.reload();
  await waitForLoader(page);
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'alter');
});

test('switching back to Professional', async ({ page, isMobile }) => {
  await visit(page, '/', 'alter');
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();
  const professional = page
    .getByRole('group', { name: 'Site mode' })
    .getByRole('button', { name: 'Professional' });
  await professional.click();
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'pro');
  await waitForLoader(page);
  await expect(professional).toHaveAttribute('aria-pressed', 'true');
});
