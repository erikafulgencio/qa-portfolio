---
name: new-section
description: Scaffold a new page or section of the portfolio following project conventions — standalone OnPush component, lazy route, copy in content/, mode-aware styling for Professional and Alter Ego, unit spec and e2e smoke test. Use when asked to add a page, view, section, card or feature to the site.
---

# Add a new section or page

Read `CLAUDE.md` first for the architecture. Then work in this order.

## 1. Content first

Put all copy and data in `src/app/content/`:

- Add a typed export to an existing file, or create a new `<topic>.ts`.
- Add any new interface to `content/models.ts`.
- Icons are Phosphor class names typed as `IconName` (for example `'ph-bug'`).
- Check that an icon exists in `node_modules/@phosphor-icons/web/src/regular/style.css`. An unknown name fails `npm run icons`.

Components only import content; they never hard-code lists.

## 2. Component

- For a new page: `src/app/features/<name>/<name>.ts` with `export default class <Name>Page`. Routes lazy-load default exports.
- For a section inside a page: put it next to that page, e.g. `features/home/pro-home/<section>.ts`.
- Generate it with `npx ng g c features/<name> --skip-tests` (the schematic defaults to SCSS and OnPush), or write it by hand:
  - standalone, `changeDetection: ChangeDetectionStrategy.OnPush`
  - `inject()`, `input()`, `signal()`/`computed()`, and `@if`/`@for` control flow
  - selector prefix `app-`
- For mode-specific UI, inject `ModeService` and branch on `isPro()`. Where the markup is the same, just rely on the CSS tokens.

## 3. Styling

Start the component stylesheet with `@use 'mixins' as *;` (from `src/styles/_mixins.scss`).

- **Colours:** use `var(--gs-*)` tokens and the helpers `tx(55%)`, `ac(12%)`, `hot(8%)` and `bg(70%)`. Never use raw hex values that differ per mode.
- **Corners:** `@include chamfer(10px)` gives clipped corners in Alter and rounded corners in Professional. Use `@include pro { }` / `@include alter { }` for mode-only rules.
- **Labels:** `@include kicker()` and `@include mono()`.
- **Breakpoints:** `@include below($bp-lg | $bp-md | $bp-sm)`. Every layout must work at 375 px.
- **Global classes:** `.container`, `.page`, `.page-title`, `.sheet`, `.panel`, `.pill`, `.btn`, `.chip`, `.kicker` and `.icon-tile` live in `src/styles/_ui.scss`.
- **Animations:** use the global keyframes in `src/styles/_keyframes.scss` (`g-rise`, `g-float`, `pr-pour`…).
  - Don't redefine them in component styles.
  - Angular scopes component `@keyframes`, so a name used from a `[style]` binding must live in the global file.
  - The reduced-motion guard is global.

## 4. Route and navigation (pages only)

- Add the route to `src/app/app.routes.ts` with a `title`.
- If the page needs a nav entry, add it to `PRO_NAV` and/or `ALTER_NAV` in `src/app/core/navigation.ts`.
- For in-page jumps, use `ScrollService.toElement()`, not `href="#id"`, because `<base href>` would break those links on GitHub Pages.

## 5. Tests

- **Unit:** put pure logic in a plain `.ts` helper and test it with Vitest (`*.spec.ts` next to it). Use TestBed only for real component behaviour.
- **E2E:** add the route to `ROUTES` in `e2e/fixtures.ts`. That alone gives you render, mobile-overflow and axe checks in both modes. Add a focused spec if the section is interactive.

## 6. Verify

```bash
npm run icons && npx ngc -p tsconfig.app.json --noEmit && npm run lint && npm test
npx playwright test e2e/navigation.spec.ts e2e/a11y.spec.ts
```

Then use the `run-and-verify` skill to look at it in both modes.
