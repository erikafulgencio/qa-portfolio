import type { Page, Request } from '@playwright/test';

import { HUBSPOT_API, expect, test, visit } from './fixtures';

const form = (page: Page) => page.locator('app-contact-form').first();

async function fillValidMessage(page: Page) {
  await form(page).getByLabel('Name *').fill('Jane Tester');
  await form(page).getByLabel('Email address *').fill('jane@acme.io');
  await form(page).getByLabel('Title *').fill('QA Lead role');
  await form(page)
    .getByLabel('Message *')
    .fill('We need someone to rebuild our regression strategy.');
}

test.describe('contact form', () => {
  test.beforeEach(async ({ page }) => {
    await visit(page, '/contact');
  });

  test('shows every validation message when sent empty and focuses the first field', async ({
    page,
  }) => {
    await form(page).getByRole('button', { name: 'Send message' }).click();
    for (const msg of [
      'Your name is required.',
      'An email address is required.',
      'A subject is required.',
      'Please write a message.',
    ]) {
      await expect(form(page).getByText(msg)).toBeVisible();
    }
    await expect(form(page).getByLabel('Name *')).toBeFocused();
    await expect(form(page).getByLabel('Name *')).toHaveAttribute('aria-invalid', 'true');
  });

  test('validates a field when it loses focus', async ({ page }) => {
    const email = form(page).getByLabel('Email address *');
    await email.fill('qa@mailinator.com');
    await email.blur();
    await expect(
      form(page).getByText('Disposable or placeholder domains are not accepted.'),
    ).toBeVisible();

    await email.fill('test@acme.io');
    await expect(
      form(page).getByText('Please use a real email address I can reply to.'),
    ).toBeVisible();

    await email.fill('jane@acme.io');
    await expect(form(page).locator('.error')).toHaveCount(0);
  });

  test('caps input length and shows the counter', async ({ page }) => {
    const title = form(page).getByLabel('Title *');
    await title.fill('x'.repeat(80));
    await expect(title).toHaveValue('x'.repeat(50));
    await expect(form(page).getByText('50/50')).toBeVisible();
  });

  test('sends a valid message to the HubSpot form', async ({ page }) => {
    let submitted: Request | undefined;
    await page.route(HUBSPOT_API, (route) => {
      submitted = route.request();
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"inlineMessage":"Thanks"}',
      });
    });

    await fillValidMessage(page);
    await form(page).getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByTestId('contact-success')).toContainText('Message sent.');

    expect(submitted?.url()).toBe(
      'https://api.hsforms.com/submissions/v3/integration/submit/247691262/33284959-3f74-4e50-a920-75e617be1b7d',
    );
    const body = submitted?.postDataJSON();
    expect(body.fields).toEqual([
      { objectTypeId: '0-1', name: 'firstname', value: 'Jane' },
      { objectTypeId: '0-1', name: 'lastname', value: 'Tester' },
      { objectTypeId: '0-1', name: 'email', value: 'jane@acme.io' },
      {
        objectTypeId: '0-1',
        name: 'message',
        value: 'Subject: QA Lead role\n\nWe need someone to rebuild our regression strategy.',
      },
    ]);

    await page
      .getByTestId('contact-success')
      .getByRole('button', { name: 'Write another' })
      .click();
    await expect(form(page).getByLabel('Name *')).toHaveValue('');
  });

  test('offers email when HubSpot rejects the message', async ({ page, consoleErrors }) => {
    await page.route(HUBSPOT_API, (route) =>
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ errors: [{ errorType: 'FORM_HAS_RECAPTCHA_ENABLED' }] }),
      }),
    );

    await fillValidMessage(page);
    await form(page).getByRole('button', { name: 'Send message' }).click();

    const alert = form(page).getByRole('alert');
    await expect(alert).toContainText('could not be sent');
    await expect(alert.getByRole('link', { name: 'send it by email' })).toHaveAttribute(
      'href',
      /^mailto:m\.erika\.fulgencio@gmail\.com\?subject=QA%20Lead%20role/,
    );
    await expect(form(page).getByLabel('Message *')).toHaveValue(
      'We need someone to rebuild our regression strategy.',
    );

    // The browser logs the failed request itself; that's the scenario under test.
    const unexpected = consoleErrors.filter((e) => !/Failed to load resource/.test(e));
    consoleErrors.splice(0, consoleErrors.length, ...unexpected);
  });

  test('contact links point somewhere real', async ({ page }) => {
    // The links float gently; freeze them so the clicks below land on a still target.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.getByRole('link', { name: /LinkedIn/ }).first()).toHaveAttribute(
      'href',
      /linkedin\.com\/in\/meafulgencio/,
    );
    // Email and phone are masked until asked for, then become real links.
    for (const [label, href] of [
      ['email', /^mailto:\S+@\S+$/],
      ['phone', /^tel:\+63\d{10}$/],
      ['viber', /^viber:\/\/chat\?number=%2B63\d{10}$/],
    ] as const) {
      await page
        .getByRole('button', { name: new RegExp(`^Show ${label}`) })
        .first()
        .click();
      await expect(
        page.getByRole('link', { name: new RegExp(`^${label}`, 'i') }).first(),
      ).toHaveAttribute('href', href);
    }
  });
});

// Contract check against the real HubSpot form. Opt-in (HUBSPOT_LIVE=1) and never in CI.
// It submits an invalid email on purpose, so HubSpot rejects it and no contact is created.
test.describe('HubSpot live contract', () => {
  test.skip(!process.env['HUBSPOT_LIVE'] || !!process.env['CI'], 'set HUBSPOT_LIVE=1 to run');

  test('the HubSpot form accepts API submissions (CAPTCHA is off)', async ({ request }) => {
    const res = await request.post(
      'https://api.hsforms.com/submissions/v3/integration/submit/247691262/33284959-3f74-4e50-a920-75e617be1b7d',
      { data: { fields: [{ objectTypeId: '0-1', name: 'email', value: 'not-an-email' }] } },
    );
    const errorTypes = ((await res.json()).errors ?? []).map(
      (e: { errorType: string }) => e.errorType,
    );
    expect(errorTypes, 'turn off CAPTCHA on the HubSpot form').not.toContain(
      'FORM_HAS_RECAPTCHA_ENABLED',
    );
  });
});
