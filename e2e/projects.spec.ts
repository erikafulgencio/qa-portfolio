import { expect, test, visit } from './fixtures';

test('development projects show their artwork and real snapshots', async ({ page }) => {
  await visit(page, '/projects');
  await page.getByRole('button', { name: /Development Projects/ }).click();

  const grid = page.getByTestId('project-grid');
  await expect(grid.locator('.card')).toHaveCount(3);
  await expect(grid.locator('app-dev-art')).toHaveCount(3);

  // The portfolio card frames real captures of both modes, and every one of them loads.
  const shots = grid.locator('.card-item--feature app-dev-art img');
  await expect(shots).toHaveCount(2);
  for (const img of await shots.all()) {
    await expect(img).toHaveJSProperty('complete', true);
    expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  }
});

test('"All" groups automation and development projects', async ({ page }) => {
  await visit(page, '/projects');
  const labels = page.getByTestId('project-grid').locator('.group-label');
  await expect(labels).toHaveText([/Automation\s*5/, /Development\s*3/]);
});

test('a development project gallery opens in a lightbox', async ({ page }) => {
  await visit(page, '/projects/port');
  await expect(page.getByRole('link', { name: /Visit the live site/ })).toHaveAttribute(
    'href',
    'https://erikafulgencio.github.io/qa-portfolio/',
  );

  await page.getByRole('button', { name: /Bug Squash mid-hunt/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('figcaption')).toContainText('Mini game · Bug Squash');

  await dialog.getByRole('button', { name: 'Next snapshot' }).click();
  await expect(dialog.locator('figcaption')).toContainText('Spot the defect');

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});
