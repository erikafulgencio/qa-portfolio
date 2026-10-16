import type { Page } from '@playwright/test';

import { CONTACT_LINKS } from '../src/app/content/profile';
import { reveal } from '../src/app/content/protect';
import { HUBSPOT_API, ROUTES, expect, test, visit } from './fixtures';

// Security checks. They run in the normal suite against the dev server and, via `npm run e2e:prod`,
// against the production Pages build, where the Content-Security-Policy from scripts/csp.mjs is
// in force. The CSP-specific assertions only apply to the production build.
const PROD = process.env['E2E_PROD'] === '1';

/** The only third-party host the site may contact at runtime (HubSpot's Forms API). */
const ALLOWED_HOSTS = ['api.hsforms.com'];

/** Relative path, so it resolves under /qa-portfolio/ on the production build too. */
const rel = (path: string) => (path === '/' ? './' : path.slice(1));

/** Records CSP violations reported by the browser. */
async function watchCsp(page: Page): Promise<() => Promise<string[]>> {
  await page.addInitScript(() => {
    const seen: string[] = [];
    (window as unknown as { __csp: string[] }).__csp = seen;
    document.addEventListener('securitypolicyviolation', (e) =>
      seen.push(`${e.violatedDirective} blocked ${e.blockedURI || 'inline'}`),
    );
  });
  return () => page.evaluate(() => (window as unknown as { __csp: string[] }).__csp);
}

for (const mode of ['pro', 'alter'] as const) {
  for (const route of ROUTES) {
    test(`${route.name} (${mode}) only talks to allowed hosts over HTTPS`, async ({
      page,
      baseURL,
    }) => {
      const origin = new URL(baseURL ?? 'http://localhost').origin;
      const offenders: string[] = [];
      page.on('request', (req) => {
        const url = new URL(req.url());
        if (url.protocol === 'data:' || url.protocol === 'blob:') return;
        if (url.origin === origin) return;
        if (url.protocol !== 'https:' || !ALLOWED_HOSTS.includes(url.hostname)) {
          offenders.push(req.url());
        }
      });
      const violations = await watchCsp(page);
      await visit(page, rel(route.path), mode);
      // Scroll the whole page so lazy content loads too.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
      });
      expect(offenders, 'requests to unexpected hosts or over plain HTTP').toEqual([]);
      expect(await violations(), 'Content-Security-Policy violations').toEqual([]);
    });
  }
}

test('links that open a new tab cannot reach back into this page (reverse tabnabbing)', async ({
  page,
}) => {
  test.setTimeout(120_000); // visits every route
  const unsafe: string[] = [];
  for (const route of ROUTES) {
    await visit(page, rel(route.path));
    const found = await page.$$eval('a[target="_blank"]', (links) =>
      links
        .filter((a) => !/\bnoopener\b/.test(a.getAttribute('rel') ?? ''))
        .map((a) => a.getAttribute('href') ?? ''),
    );
    unsafe.push(...found.map((href) => `${route.path}: ${href}`));
  }
  expect(unsafe).toEqual([]);
});

test('contact form treats markup as text, never as HTML (XSS)', async ({ page }) => {
  let sent = '';
  await page.route(HUBSPOT_API, async (r) => {
    sent = r.request().postData() ?? '';
    await r.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
  const violations = await watchCsp(page);
  await visit(page, rel('/contact'));

  const payload = '<img src=x onerror="window.__xss=1"><script>window.__xss=1</script>';
  const form = page.locator('app-contact-form').first();
  await form.getByLabel('Name *').fill(`Jane ${payload}`);
  await form.getByLabel('Email address *').fill('jane@acme.io');
  await form.getByLabel('Title *').fill(`Hello ${payload}`);
  await form.getByLabel('Message *').fill(`A message long enough to pass. ${payload}`);
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.getByRole('button', { name: 'Write another' })).toBeVisible();

  expect(
    await page.evaluate(() => (window as unknown as { __xss?: number }).__xss),
  ).toBeUndefined();
  await expect(page.locator('img[src="x"]')).toHaveCount(0);
  // The payload is submitted verbatim as data; escaping is the renderer's job, not the transport's.
  expect(sent).toContain('onerror');
  expect(await violations()).toEqual([]);
});

test('the spam honeypot is hidden from people and assistive tech', async ({ page }) => {
  await visit(page, rel('/contact'));
  const trap = page.locator('input[name="company"]');
  await expect(trap).toHaveAttribute('tabindex', '-1');
  await expect(trap).toHaveAttribute('autocomplete', 'off');
  await expect(page.locator('.hp')).toHaveAttribute('aria-hidden', 'true');
  await expect(trap).not.toBeInViewport();
});

// ── Privacy ──────────────────────────────────────────────────────────────────────────────────────

test('contact details never appear as readable text in the page or its scripts', async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  // The plaintext is derived at runtime from the encoded content, so this file never holds it.
  const secrets = CONTACT_LINKS.filter((l) => l.protect).flatMap((l) => {
    const value = reveal(l.protect!.code);
    return [value, value.replace(/[^\d]/g, '')].filter((s) => s.length >= 8);
  });
  const leaks: string[] = [];
  const scripts = new Set<string>();
  for (const route of ROUTES) {
    await visit(page, rel(route.path));
    const html = await page.content();
    for (const s of secrets) if (html.includes(s)) leaks.push(`${route.path} page`);
    for (const src of await page.$$eval('script[src]', (els) =>
      els.map((e) => (e as HTMLScriptElement).src),
    )) {
      scripts.add(src);
    }
  }
  // Lazy chunks too: every script the app has loaded.
  for (const src of await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .map((e) => e.name)
      .filter((n) => /\.js(\?|$)/.test(n)),
  )) {
    scripts.add(src);
  }
  for (const src of scripts) {
    const body = await (await request.get(src)).text();
    for (const s of secrets) if (body.includes(s)) leaks.push(src);
  }
  expect(leaks).toEqual([]);
});

test('asks search engines not to cache or quote it, and opts out of AI training', async ({
  page,
}) => {
  await visit(page, './');
  const robots = await page.locator('meta[name="robots"]').getAttribute('content');
  for (const directive of ['noarchive', 'nosnippet', 'noimageindex', 'noai', 'noimageai']) {
    expect(robots).toContain(directive);
  }
  await expect(page.locator('meta[name="tdm-reservation"]')).toHaveAttribute('content', '1');
});

test('sets no cookies, so no consent banner is needed', async ({ page, context }) => {
  test.setTimeout(120_000);
  await page.route(HUBSPOT_API, (r) =>
    r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
  );
  for (const route of ROUTES) await visit(page, rel(route.path));
  const form = page.locator('app-contact-form').first();
  await form.getByLabel('Name *').fill('Jane Tester');
  await form.getByLabel('Email address *').fill('jane@acme.io');
  await form.getByLabel('Title *').fill('Privacy check');
  await form.getByLabel('Message *').fill('Checking that sending a message sets no cookie.');
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.getByRole('button', { name: 'Write another' })).toBeVisible();

  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => document.cookie)).toBe('');
  // The only thing kept in the browser is the visitor's own mode choice.
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys.filter((k) => k !== 'ef-mode')).toEqual([]);
});

test.describe('production build', () => {
  test.skip(!PROD, 'only meaningful against the production build (npm run e2e:prod)');

  test('ships a strict Content-Security-Policy', async ({ page }) => {
    await visit(page, './');
    const csp = await page
      .locator('meta[http-equiv="Content-Security-Policy"]')
      .getAttribute('content');
    expect(csp).toBeTruthy();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    // Inline scripts are allowed by hash only — never wholesale.
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-eval'/);
  });

  test('does not expose source maps or repository files', async ({ page, request }) => {
    await visit(page, './');
    const scripts = await page.$$eval('script[src]', (s) =>
      s.map((el) => (el as HTMLScriptElement).src),
    );
    for (const src of scripts) {
      const body = await (await request.get(src)).text();
      expect(body, `${src} references a source map`).not.toContain('sourceMappingURL');
    }
    for (const path of ['.git/config', '.env', 'package.json', 'src/environments/environment.ts']) {
      const res = await request.get(path);
      const text = await res.text();
      // Unknown paths fall back to the SPA shell (as on GitHub Pages) — never the real file.
      expect(text, `${path} is served`).not.toMatch(/\[core\]|"devDependencies"|hubspot/i);
    }
  });
});
