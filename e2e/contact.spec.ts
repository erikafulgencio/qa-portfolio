import type { Page } from '@playwright/test';

import { expect, test, visit } from './fixtures';

const form = (page: Page) => page.locator('app-contact-form').first();

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

  test('a valid message is handed off (mailto fallback while HubSpot is unconfigured)', async ({
    page,
  }) => {
    await form(page).getByLabel('Name *').fill('Jane Tester');
    await form(page).getByLabel('Email address *').fill('jane@acme.io');
    await form(page).getByLabel('Title *').fill('QA Lead role');
    await form(page)
      .getByLabel('Message *')
      .fill('We need someone to rebuild our regression strategy.');
    await form(page).getByRole('button', { name: 'Send message' }).click();

    const success = page.getByTestId('contact-success');
    await expect(success).toBeVisible();
    await expect(success.getByRole('link', { name: 'Open it again' })).toHaveAttribute(
      'href',
      /^mailto:m\.erika\.fulgencio@gmail\.com\?subject=QA%20Lead%20role/,
    );
    await success.getByRole('button', { name: 'Write another' }).click();
    await expect(form(page).getByLabel('Name *')).toHaveValue('');
  });

  test('contact links point somewhere real', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Email/ }).first()).toHaveAttribute(
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
