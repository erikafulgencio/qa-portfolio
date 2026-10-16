# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Erika Fulgencio's QA-engineer portfolio. It's an Angular 21 single-page app with two complete presentation modes over the same routes:

- **Professional** (default): light lavender with white cards.
- **Alter Ego** ("The Glitchbane"): dark game-HUD styling.

The visual reference is the Claude Design project "Erika's QA Portfolio Design" ("Portfolio Game Site"). This repo is a from-scratch rebuild of that design and shares none of its code. It's hosted on GitHub Pages at `https://erikafulgencio.github.io/qa-portfolio/`.

## Commands

```bash
npm start                 # dev server on :4200 (regenerates the icon subset first)
npm run build             # production build → dist/qa-portfolio/browser
npm run build:pages       # Pages build: --base-href /qa-portfolio/, CSP meta (scripts/csp.mjs), per-route index.html + 404.html (spa-fallback.mjs)
npm run lint              # ESLint (TS + template a11y rules) + checks src/styles/_icons.scss is up to date
npm test                  # Vitest unit tests, single run (npm run test:watch for watch mode)
npm run e2e               # Playwright, all projects: desktop (Google Chrome), firefox, webkit, mobile (Pixel 7), iphone (iPhone 13), firefox-mobile; own `ng serve` on :4300
npm run e2e:prod          # security spec against the production build (run build:pages first; serves it on :8080)
npm run audit:deps        # npm audit, fails on high/critical
npm run perf              # Lighthouse CI on the production build (run build:pages first): mobile budgets in lighthouserc.json
npm run verify            # the full gate: lint, unit, e2e, build:pages, e2e:prod, perf, audit (what autofix runs)
npm run snapshots         # re-capture the portfolio screenshots in public/assets/img/projects (dev server must be running)
npx ngc -p tsconfig.app.json --noEmit   # fast strict template type-check without building
```

How to run one test:

- **Vitest:** `npx ng test --watch=false --include src/app/games/bug-squash/bug-squash-engine.spec.ts`. Narrow further by test name with `--filter "<regex>"`.
- **Playwright:** `npx playwright test e2e/contact.spec.ts -g "validates a field"`. Add `--project=desktop` for one engine, or `--ui` to debug.
- **Test suites:** `responsive.spec.ts` (every route × mode at 11 widths, 320px–1920px: overflow, broken images, 24px tap targets) runs in each desktop engine; `mobile.spec.ts` (`@mobile`, touch device profiles: legible text, iOS zoom-on-focus, landscape, sticky hover) runs on `mobile`, `iphone` and `firefox-mobile`; `security.spec.ts` (allowed hosts, CSP, XSS, tabnabbing, exposure).

Environment notes:

- **Node:** this machine runs Node 22.20. Angular 22's CLI needs Node 22.22.3 or newer, so the project is pinned to Angular 21 LTS. Don't upgrade Angular without upgrading Node first.
- **npm bug:** `npm install` on npm 10.9 can crash with `Cannot read properties of null (reading 'edgesOut')`. Use `npx -y npm@11 install <pkg>`. `npm ci` from the lockfile is fine.

## Architecture

- **Modes:**
  - `core/mode.service.ts` holds a `mode` signal (`'pro' | 'alter'`). It persists to `localStorage['ef-mode']` and writes `<html data-mode>`.
  - All theming is CSS custom properties. `src/styles/_tokens.scss` defines Alter as the base and overrides it under `:root[data-mode='pro']`.
  - Pages either branch markup on `ModeService.isPro()`, or share markup and rely on the tokens. Home and About each have separate pro and alter sub-components; the other pages share one template.
  - `--gs-clip` is set to `none` only in pro mode. `@include chamfer()` uses `var(--gs-clip, polygon(...))`, which gives clipped corners in Alter and rounded ones in Professional.
- **Boot and mode-swap loader:** this lives in `src/index.html` as plain inline JS and CSS (`window.__efLoader`), so it paints before Angular boots and applies the saved mode with no flash.
  - `App` calls `LoaderService.ready()` after the first render.
  - `ModeService.switchTo()` covers the page, swaps the mode underneath, then reveals it.
  - Without `window.__efLoader` (tests), the transition runs immediately.
- **Content is data:** every list and long piece of copy lives in typed files in `src/app/content/` (types in `models.ts`), and components only render it.
  - `QUESTS` are projects. Their `type: 'Boss fight'` entries must have a matching `CASES` id; those render at `/cases/:id`.
  - Side quests plus `DEV_PROJECTS` are the 8 Professional projects at `/projects/:id`. Development projects only appear in Professional mode.
  - Missing imagery (certificates, logos, game screenshots) renders `<app-image-placeholder>` until a `src`/`image` is set.
- **Routing:** `app.routes.ts` lazy-loads each page's default export from `features/<page>/<page>.ts`. Route params arrive as signal `input()`s (`withComponentInputBinding`).
  - Don't use `href="#anchor"` for in-page jumps. `<base href>` turns them into navigations on Pages. Use `ScrollService.toElement()` instead.
- **Contact:** the site renders its own themed form (`shared/contact-form`) and posts to a HubSpot form through the Forms v3 unauthenticated, CORS-enabled endpoint (`core/contact.service.ts`).
  - Don't swap in HubSpot's embed: it renders in a cross-origin iframe the site's CSS can't theme, and that's why the custom form exists.
  - `core/contact-validators.ts` holds pure validation with the design's exact messages.
  - The portal ID and form GUID live in `src/environments/environment.ts`. If either is empty, the form falls back to opening a pre-filled `mailto:`.
  - The HubSpot form (`na2` account) has First name, Last name, Email, Phone and Message fields. The site splits its single Name field into `firstname`/`lastname` and prefixes the subject into `message`.
  - **The HubSpot form's CAPTCHA must be off.** Otherwise HubSpot answers `400 FORM_HAS_RECAPTCHA_ENABLED`, and the form shows an error with a pre-filled email link. Check it with `HUBSPOT_LIVE=1 npx playwright test -g "live contract"`, which sends a deliberately invalid email, so no contact is created.
  - Spam control is strict validation plus a hidden `company` honeypot.
- **Games:**
  - Bug Squash: `games/bug-squash/bug-squash-engine.ts` holds the pure rules with an injectable random source and explicit timestamps, and is unit-tested with a fake clock. `BugSquashGame` is a root-scoped service that runs `requestAnimationFrame`, so the best score survives navigation. `BugSquashArena` renders both skins.
  - Spot the defect: `games/spot-the-defect`.
- **Icons:** these are Phosphor's regular-weight font. `scripts/build-icons.mjs` scans `src/**/*.{ts,html}` for `ph-*` names and generates `src/styles/_icons.scss` with only those glyphs.
  - It runs before `start`, `build` and `test`, fails on unknown icon names, and `npm run lint` fails if the committed file is stale.
  - Avoid CSS class names starting with `ph-`; the scanner treats them as icons.
- **Styles:**
  - Component stylesheets `@use 'mixins' as *;`. `src/styles` is on the Sass include path.
  - Helpers: `tx/ac/hot/bg(%)` for colour-mix, plus `chamfer`, `kicker`, `mono`, `pro`/`alter` and `below($bp-lg|md|sm)`.
  - Shared keyframes are global in `_keyframes.scss`. Angular scopes `@keyframes` declared in component styles, so any animation name set from a `[style]` binding must be global.
  - Reduced motion is handled globally in `_base.scss`.
  - **Most visitors are on phones.** Use `@include phone` (narrow screens and touch screens up to 932px, so landscape phones too) for phone styles. `mono()`/`kicker()` already lift small text on phones (body copy to 14px, labels to 11–12.5px); text set with a raw `font-size` needs its own `@include phone` override. Form fields are 16px on phones (iOS zooms otherwise).
  - **Wrap every `:hover` style in `@media (hover: hover)`**, and never change size or spacing on hover. iOS keeps `:hover` after a tap ("sticky hover"); `mobile.spec.ts` guards this. Touch screens get `:active` press states instead.
  - `@include chip-scroller($bleed)` turns a wrapping chip row into one swipeable line on phones.

## Conventions

- Components are standalone and OnPush (the lint rule enforces OnPush), and use `inject()`, signals and `@if`/`@for`. The selector prefix is `app-`.
- E2E: `e2e/fixtures.ts` stubs HubSpot's API with a 200 response, so tests never create real contacts. Contact tests register their own `page.route(HUBSPOT_API, …)` to assert on the payload or simulate a rejection.
- E2E: add every new route to `ROUTES` in `e2e/fixtures.ts`. That gives you render, phone-overflow and axe checks in both modes. The fixture fails any test that logs a console error. Wait out the loader with `visit()` or `waitForLoader()`.

## Deploying

- Pushing to `main` runs `.github/workflows/deploy.yml`: CI (`ci.yml`), then `build:pages`, then GitHub Pages. Nothing deploys unless every CI job passes:
  - **quality**: lint, unit tests, production build.
  - **e2e**: the Playwright suite in each of the six projects (Google Chrome, Firefox, WebKit desktop; Chrome Android, Safari iPhone, Firefox Android).
  - **security**: npm audit, gitleaks secret scan (full history), `e2e:prod` against the built site, OWASP ZAP baseline (`.zap/rules.tsv` ignores only header rules GitHub Pages can't satisfy).
  - **performance**: Lighthouse CI, 5 pages × 3 runs with mobile emulation. Budgets: performance ≥ 90; accessibility, best practices and SEO = 100; LCP ≤ 3 s; CLS ≤ 0.1; TBT ≤ 200 ms; ≤ 500 KB per page.
  - **dependency-review** on pull requests.
- `codeql.yml` runs CodeQL static analysis on pushes, pull requests and weekly; findings go to the Security tab.
- `autofix.yml`: when the deploy run fails on a test or build job, Claude Code fixes it on an `autofix/<run id>` branch (up to 3 attempts, each checked with `npm run verify`), opens a PR, re-runs CI on it, then squash-merges and dispatches the deploy. If it can't get green it labels the PR `autofix-needs-human`. Claude only edits files; the workflow does the git, PR and merge steps. It needs the `CLAUDE_CODE_OAUTH_TOKEN` secret (`/install-github-app`) or `ANTHROPIC_API_KEY`, and skips with a warning without one.
- Pull requests run `ci.yml` and `codeql.yml`.
- Pages must be set to **Source: GitHub Actions** in the repo settings.

## Project skills (`.claude/skills/`)

- `run-and-verify`: run the site and check it in Chrome.
- `new-section`: add a page or section.
- `update-content`: edit copy and data.
- `commit`: commit format and gates.
- `ship`: test, build, push and watch the deploy.

## Privacy and performance rules

- **Contact details are protected.** Email, phone and Viber are stored encoded in `content/profile.ts` (`node scripts/protect.mjs "<value>"`) and shown masked until tapped (`core/contact-reveal.service.ts`). Never put a real address or number into source as plain text: `security.spec.ts` scans the built page and every bundle for it.
- **Crawlers:** `src/index.html` asks search engines not to cache, quote or image-index the site and opts out of AI training and text-and-data mining (`robots`, `tdm-reservation`). AI crawlers that only read `robots.txt` need one at the domain root (a separate `erikafulgencio.github.io` repository).
- **No cookies, no trackers.** The only browser storage is `ef-mode` (localStorage) and `ef-booted` (sessionStorage, loader). That's why there is no consent banner. A test fails if a cookie ever appears; adding analytics or a third-party embed would also need a consent banner and CSP changes.
- **CSP:** `scripts/csp.mjs` hashes inline scripts at build time (after normalising line endings, as browsers do). Third-party hosts must be added there and to `ALLOWED_HOSTS` in `security.spec.ts`.
- **Images:** ship WebP sized to how they display, with a `srcset` for large ones (`npm run snapshots` writes 1440 px and 720 px WebP). Icons: `npm run icons` subsets the Phosphor font to the glyphs in use (`src/styles/fonts/phosphor-subset.woff2`).
- **Boot loader** (`src/index.html`): the monogram assembly plays once per session (`fast` variant on reloads and mode swaps). Keep it short; it sits in front of every first paint.

