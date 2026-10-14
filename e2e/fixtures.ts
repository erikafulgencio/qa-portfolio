import { test as base, expect, type Page } from '@playwright/test';

export type Mode = 'pro' | 'alter';

export const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/projects', name: 'projects' },
  { path: '/projects/pw', name: 'project detail' },
  { path: '/cases/breach', name: 'case study' },
  { path: '/skills', name: 'skills' },
  { path: '/resume', name: 'résumé' },
  { path: '/contact', name: 'contact' },
] as const;

/** Waits until the boot/mode-swap loader overlay has been removed from the page. */
export async function waitForLoader(page: Page): Promise<void> {
  await expect(page.locator('#pl-loader')).toHaveCount(0, { timeout: 15_000 });
}

/** Opens a route in the given mode (seeded through localStorage before any script runs). */
export async function visit(page: Page, path: string, mode: Mode = 'pro'): Promise<void> {
  await page.addInitScript((m) => {
    try {
      if (!sessionStorage.getItem('e2e-seeded')) {
        localStorage.setItem('ef-mode', m);
        sessionStorage.setItem('e2e-seeded', '1');
      }
    } catch {
      /* storage unavailable */
    }
  }, mode);
  await page.goto(path);
  await waitForLoader(page);
}

interface Fixtures {
  /** Console errors and uncaught exceptions collected during the test; asserted empty afterwards. */
  consoleErrors: string[];
}

export const test = base.extend<Fixtures>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', (err) => errors.push(err.message));
      await use(errors);
      expect(errors, 'console errors').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
