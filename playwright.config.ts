import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env['E2E_PORT'] ?? 4300);

/**
 * E2E_PROD=1 (set by `npm run e2e:prod`) tests the production GitHub Pages build instead of the
 * dev server: served by scripts/serve-dist.mjs under /qa-portfolio/, so the real CSP is in force.
 */
const PROD = process.env['E2E_PROD'] === '1';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 2 : undefined,
  reporter: process.env['CI'] ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: PROD ? 'http://localhost:8080/qa-portfolio/' : `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: PROD
    ? [{ name: 'prod', use: { ...devices['Desktop Chrome'] }, testMatch: /security\.spec\.ts/ }]
    : [
        // Desktop: the whole suite in Google Chrome, Firefox and Safari's engine (WebKit).
        { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
        // Phones: the @mobile-tagged tests in Chrome on Android, Safari on iPhone and Firefox on
        // Android. Firefox has no full device emulation, so it gets the size, density, touch and UA.
        { name: 'mobile', use: { ...devices['Pixel 7'] }, grep: /@mobile/ },
        { name: 'iphone', use: { ...devices['iPhone 13'] }, grep: /@mobile/ },
        {
          name: 'firefox-mobile',
          use: {
            browserName: 'firefox',
            viewport: { width: 412, height: 839 },
            deviceScaleFactor: 2.625,
            hasTouch: true,
            userAgent: 'Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
          },
          grep: /@mobile/,
        },
      ],
  webServer: PROD
    ? {
        command: 'node scripts/serve-dist.mjs',
        url: 'http://localhost:8080/qa-portfolio/',
        // The CI security job starts it first so OWASP ZAP can scan the same server.
        reuseExistingServer: true,
        timeout: 30_000,
      }
    : {
        command: `npx ng serve --port ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env['CI'],
        timeout: 180_000,
      },
});
