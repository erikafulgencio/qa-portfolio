import { expect, test, visit } from './fixtures';

for (const mode of ['pro', 'alter'] as const) {
  test(`Bug Squash can be played on the ${mode} home page`, async ({ page }) => {
    await visit(page, '/', mode);
    const arena = page.locator('app-bug-squash-arena');
    await arena.scrollIntoViewIfNeeded();
    await arena.getByRole('button', { name: 'Start hunt' }).click();

    const bugs = arena.getByRole('button', { name: 'Squash bug' });
    await expect(bugs.first()).toBeVisible();
    expect(await bugs.count()).toBeGreaterThanOrEqual(3);

    await bugs.first().dispatchEvent('pointerdown');
    await expect(arena.locator('.points').first()).toHaveText(/^\+1[05]$/);
    await expect(arena.getByLabel('Time left')).toHaveText(/00:(1\d|20)/);
  });
}

test('Spot the defect rewards the lying result', async ({ page }) => {
  await visit(page, '/about', 'alter');
  const game = page.locator('app-spot-the-defect');
  await game.getByRole('button', { name: /TC-01/ }).click();
  await expect(game.getByRole('status')).toHaveText(/genuinely passes/);
  await game.getByRole('button', { name: /TC-03/ }).click();
  await expect(game.getByRole('status')).toHaveText(/Nice catch — TC-03/);
  await game.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(game.getByRole('status')).toHaveText('Six results. One is lying.');
});

test('liking a project rains hearts and thanks the visitor', async ({ page }) => {
  await visit(page, '/projects/pw');
  await page
    .getByRole('button', { name: /Appreciate/ })
    .first()
    .click();
  await expect(page.getByText('Thank you so much for appreciating my hard work')).toBeVisible();
  await expect(page.getByRole('button', { name: /^Appreciated/ }).first()).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
