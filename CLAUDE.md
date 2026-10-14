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
npm run build:pages       # build with --base-href /qa-portfolio/ + 404.html SPA fallback (what CI deploys)
npm run lint              # ESLint (TS + template a11y rules) + checks src/styles/_icons.scss is up to date
npm test                  # Vitest unit tests, single run (npm run test:watch for watch mode)
npm run e2e               # Playwright; starts its own `ng serve` on :4300 (E2E_PORT to override)
npx ngc -p tsconfig.app.json --noEmit   # fast strict template type-check without building
```

How to run one test:

- **Vitest:** `npx ng test --watch=false --include src/app/games/bug-squash/bug-squash-engine.spec.ts`. Narrow further by test name with `--filter "<regex>"`.
- **Playwright:** `npx playwright test e2e/contact.spec.ts -g "HubSpot is blocked"`. Add `--project=desktop` to skip the mobile project, or `--ui` to debug.

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
- **Contact:** `shared/hubspot-form` embeds HubSpot's own form (new-editor, `na2` region). Its fields, styling and reCAPTCHA are managed in HubSpot, not in this repo.
  - The script URL and IDs live in `src/environments/environment.ts`, copied from HubSpot's embed code.
  - HubSpot's v4 embed only scans the page for `.hs-form-frame` on its first run, then sets a `window.__HS__FORMS__EMBED__` guard. In this SPA the component deletes that guard and re-injects the script on every mount; without that, a second visit to a page with the form stays blank. HubSpot sizes its iframe lazily once it scrolls into view, so read height with `getBoundingClientRect`, not `offsetHeight`.
  - If the script fails or nothing renders within 12 s (often an ad blocker), the component shows a `mailto:` fallback.
  - The form can't be posted to via HubSpot's submissions API while CAPTCHA is on (`FORM_HAS_RECAPTCHA_ENABLED`), which is why it's embedded.
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

## Conventions

- Components are standalone and OnPush (the lint rule enforces OnPush), and use `inject()`, signals and `@if`/`@for`. The selector prefix is `app-`.
- E2E: HubSpot's script is stubbed with an empty response in `e2e/fixtures.ts`, so the suite never calls HubSpot. Opt in per test with `page.route(HUBSPOT_SCRIPT, r => r.continue())`; the live-embed test does this and is skipped in CI.
- E2E: add every new route to `ROUTES` in `e2e/fixtures.ts`. That gives you render, phone-overflow and axe checks in both modes. The fixture fails any test that logs a console error. Wait out the loader with `visit()` or `waitForLoader()`.

## Deploying

- Pushing to `main` runs `.github/workflows/deploy.yml`: CI (lint, unit, e2e), then `build:pages`, then GitHub Pages.
- Pull requests run `ci.yml` only.
- Pages must be set to **Source: GitHub Actions** in the repo settings.

## Project skills (`.claude/skills/`)

- `run-and-verify`: run the site and check it in Chrome.
- `new-section`: add a page or section.
- `update-content`: edit copy and data.
- `commit`: commit format and gates.
- `ship`: test, build, push and watch the deploy.
