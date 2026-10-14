---
name: run-and-verify
description: Start the portfolio's Angular dev server and verify it in Chrome — every route in both Professional and Alter Ego modes, console errors, mobile width, and screenshots. Use after UI changes, before shipping, or when asked to "run", "preview", "check" or "screenshot" the site.
---

# Run and verify the portfolio

## 1. Start the dev server (background)

```bash
npm start -- --port 4200
```

Run it with `run_in_background: true`. It's ready when the output shows `Local: http://localhost:4200/`.
`npm start` regenerates the Phosphor icon subset first (`prestart`). If port 4200 is taken, use another port.

## 2. Static checks first (fast)

```bash
npx ngc -p tsconfig.app.json --noEmit   # strict template type-check, ~4s
npm run lint
```

## 3. Walk the site in Chrome

Load the Chrome tools in one ToolSearch call: `tabs_context_mcp, tabs_create_mcp, navigate, computer, read_console_messages, resize_window, javascript_tool`. Open a **new** tab.

For each mode:

- To set the mode, run JS `localStorage.setItem('ef-mode','pro'|'alter')` and reload, or click the header's Site mode buttons.
- **Wait for the boot loader to finish.** The `#pl-loader` overlay takes about 1.3–3 s; check with JS `!document.getElementById('pl-loader')`.

Then check each route: `/`, `/about`, `/projects`, `/projects/pw`, `/cases/breach`, `/skills`, `/resume`, `/contact`. On every route:

- Take a screenshot and compare it with the design intent:
  - **Professional:** light lavender, white rounded cards, monospace copy.
  - **Alter Ego:** dark navy HUD, cyan and pink accents, chamfered corners.
- Read the console: `read_console_messages` with pattern `error|warn`. It must be clean.
- At 375 px wide (`resize_window`), check there's no horizontal scroll: JS `document.documentElement.scrollWidth <= innerWidth`. Also check that the header menu button opens the nav.

Interactive spot checks:

- **Home:** Bug Squash. Start the hunt and click a bug; "+15" or "+10" should pop.
- **Alter About:** Spot the defect. TC-03 is the bug.
- **Contact:** submit the form empty. All 4 messages should show, and focus should move to Name.
- **Project detail:** the like button should trigger the heart rain and a toast.
- **Mode switch:** the loader covers the page, the theme flips, and the route stays the same.

## 4. Report

Report what you checked, plus screenshots of anything wrong. State failures plainly, with the console text. Close the tabs you opened, and stop the background server when done.

## Automated equivalent

`npm run e2e` runs the Playwright suite in `e2e/`, which covers routes × modes, mobile overflow, contact validation, games and axe accessibility. It starts its own server on port 4300 (`E2E_PORT` overrides this).
