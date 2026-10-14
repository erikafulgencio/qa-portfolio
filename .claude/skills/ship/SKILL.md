---
name: ship
description: Release the portfolio — run lint, unit tests, e2e and a production Pages build, commit, push main to GitHub and watch the GitHub Pages deploy. Use when asked to ship, release, deploy, publish or "push it live".
---

# Ship

Pushing to `main` on `erikafulgencio/qa-portfolio` deploys the live site through `.github/workflows/deploy.yml`. Confirm with the user before pushing unless they already asked you to ship in this conversation.

## 1. Gates (stop at the first failure and report it)

```bash
npm ci                     # only if package-lock.json changed or node_modules is stale
npm run lint               # ESLint + Angular template a11y rules + icon subset freshness
npm test                   # Vitest unit tests
npm run e2e                # Playwright: routes × modes, mobile, contact, games, axe
npm run build:pages        # production build with base-href /qa-portfolio/ + 404.html fallback
```

- If `npm install` crashes with `Cannot read properties of null (reading 'edgesOut')`, that's an npm 10 bug. Use `npx -y npm@11 install` instead.
- The production build must not exceed the budgets in `angular.json`. Treat new budget warnings as something to report.

## 2. Commit

Use the `commit` skill. It has the Conventional Commit format and the attribution trailer.

## 3. Push

```bash
git push origin main
```

- Never force-push `main`.
- If the push is rejected (non-fast-forward), run `git pull --rebase origin main`, re-run the gates, then push.
- **Auth:** `git push` uses Git Credential Manager. If it fails, ask the user to run `! gh auth login`. Don't try to handle credentials yourself.

## 4. Watch the deploy

```bash
gh run list --workflow deploy.yml --limit 1
gh run watch <run-id> --exit-status
```

- If `gh` isn't authenticated, give the user the Actions URL instead: https://github.com/erikafulgencio/qa-portfolio/actions
- The live site is at **https://erikafulgencio.github.io/qa-portfolio/**.
- First deploy only: the repo needs **Settings → Pages → Source: GitHub Actions**. Without it, the `deploy` job fails with a Pages "not found" error.

## 5. Smoke-check production

Open the live URL with the `run-and-verify` skill's Chrome steps, or at least load `/` and one deep link such as `/qa-portfolio/cases/breach`. Check the console. Report the run URL and the result.
