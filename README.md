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

The Contact page and the Professional home page embed a HubSpot form (free CRM). Submissions land in HubSpot as contacts. Fields, styling, the thank-you message and spam protection (reCAPTCHA) are all edited in HubSpot's form editor, so form changes don't need a code change.

To point the site at a different form, copy the values from HubSpot's embed code (**Marketing → Forms → Share → Embed**) into [`src/environments/environment.ts`](src/environments/environment.ts). If a visitor's ad blocker stops HubSpot from loading, the site offers an email link instead.

## Deploying

Every push to `main` runs lint, unit tests and e2e tests, then deploys to GitHub Pages. You only need to set this up once: in the repository, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
