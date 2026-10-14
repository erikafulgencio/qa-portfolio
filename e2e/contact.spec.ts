import { HUBSPOT_SCRIPT, expect, test, visit } from './fixtures';

test.describe('contact page', () => {
  test('mounts the HubSpot form frame with the configured IDs', async ({ page }) => {
    await visit(page, '/contact');
    const frame = page.getByTestId('hubspot-frame');
    await expect(frame).toHaveClass(/hs-form-frame/);
    await expect(frame).toHaveAttribute('data-region', 'na2');
    await expect(frame).toHaveAttribute('data-portal-id', '247691262');
    await expect(frame).toHaveAttribute('data-form-id', '33284959-3f74-4e50-a920-75e617be1b7d');
    await expect(page.locator('#hs-form-embed-script')).toHaveAttribute(
      'src',
      'https://js-na2.hsforms.net/forms/embed/247691262.js',
    );
    await expect(
      page.locator('app-hubspot-form').getByRole('link', { name: 'm.erika.fulgencio@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:m.erika.fulgencio@gmail.com');
  });

  test('offers email when HubSpot is blocked', async ({ page, consoleErrors }) => {
    await page.route(HUBSPOT_SCRIPT, (route) => route.abort('blockedbyclient'));
    await visit(page, '/contact');

    const fallback = page.getByTestId('hubspot-fallback');
    await expect(fallback).toBeVisible();
    await expect(fallback.getByRole('link', { name: 'Email me instead' })).toHaveAttribute(
      'href',
      /^mailto:m\.erika\.fulgencio@gmail\.com/,
    );
    await expect(page.getByTestId('hubspot-frame')).toBeHidden();

    // The blocked request itself is logged by the browser; that's the scenario under test.
    const unexpected = consoleErrors.filter((e) => !/Failed to load resource/.test(e));
    consoleErrors.splice(0, consoleErrors.length, ...unexpected);
  });

  test('contact links point somewhere real', async ({ page }) => {
    await visit(page, '/contact');
    await expect(page.getByRole('link', { name: /^Email/ }).first()).toHaveAttribute(
      'href',
      /^mailto:/,
    );
    await expect(page.getByRole('link', { name: /LinkedIn/ }).first()).toHaveAttribute(
      'href',
      /linkedin\.com\/in\/meafulgencio/,
    );
    await expect(page.getByRole('link', { name: /Phone/ }).first()).toHaveAttribute(
      'href',
      /^tel:/,
    );
  });
});

// Talks to the real HubSpot service, so it only runs locally (never in CI).
test.describe('HubSpot live embed', () => {
  test.skip(!!process.env['CI'], 'external service');

  test('renders on first load and again after in-app navigation', async ({ page }) => {
    await page.route(HUBSPOT_SCRIPT, (route) => route.continue());
    await visit(page, '/contact');
    const iframe = page.getByTestId('hubspot-frame').locator('iframe');
    await expect(iframe).toHaveCount(1, { timeout: 15_000 });

    // Leave and come back without a reload: HubSpot must render into the new frame.
    const nav = page.locator('#site-nav');
    await nav.getByRole('link', { name: 'Skills', includeHidden: true }).dispatchEvent('click');
    await expect(page).toHaveURL(/\/skills$/);
    await nav.getByRole('link', { name: 'Contact', includeHidden: true }).dispatchEvent('click');
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByTestId('hubspot-frame').locator('iframe')).toHaveCount(1, {
      timeout: 15_000,
    });
    await expect(page.getByTestId('hubspot-fallback')).toHaveCount(0);
  });
});
