# Erika Fulgencio · QA Portfolio

> There's more to it than meets the eye.

The portfolio of an ISTQB-certified Senior QA Engineer, built with Angular. The site has two complete modes over the same pages:

- **Professional:** a clean profile with projects, case studies, skills, a résumé and a contact form.
- **Alter Ego, "The Glitchbane":** the same story told as a game HUD, with quests, lore and a campaign log.

Both modes include small QA mini-games: **Bug Squash** and **Spot the Defect**.

**Live:** https://erikafulgencio.github.io/qa-portfolio/

## Stack

- Angular 21 (standalone components, signals, zoneless change detection, SCSS)
- Vitest for unit tests, Playwright and axe-core for end-to-end and accessibility tests
- ESLint with angular-eslint, including template accessibility rules
- Self-hosted Inter and Phosphor Icons (no CDNs)
- GitHub Actions running CI, then a GitHub Pages deploy

## Getting started

Requires Node 22.12+.

```bash
npm ci
npm start            # http://localhost:4200
```

| Script                | What it does                                                                          |
| --------------------- | ------------------------------------------------------------------------------------- |
| `npm start`           | Dev server                                                                            |
| `npm run build`       | Production build into `dist/qa-portfolio/browser`                                     |
| `npm run build:pages` | Build for GitHub Pages (`/qa-portfolio/` base href and SPA 404 fallback)              |
| `npm run lint`        | ESLint, plus a check that the icon subset is up to date                               |
| `npm test`            | Unit tests (Vitest)                                                                   |
| `npm run e2e`         | End-to-end and accessibility tests (Playwright)                                       |
| `npm run icons`       | Regenerate the Phosphor icon subset (runs automatically before start, build and test) |

## Editing content

All copy and data lives in typed files under [`src/app/content/`](src/app/content). Edit those files, not the components. To show the résumé download button, put a PDF in `public/assets/` and set `PROFILE.resumePdfUrl`.

## Contact form (HubSpot, free)

Messages go to HubSpot Forms through its free, browser-friendly submission API. To set it up:

1. Create a free HubSpot account. Then go to **Marketing → Forms** and create a form with the **First name**, **Email** and **Message** fields.
2. Copy your **portal ID** (Account ID) and the form's **GUID** from the form's embed code.
3. Put both values in [`src/environments/environment.ts`](src/environments/environment.ts).

Until these values are set, the form validates the input and then opens the visitor's email app with the message filled in.

## Deploying

Every push to `main` runs lint, unit tests and e2e tests, then deploys to GitHub Pages. You only need to set this up once: in the repository, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
