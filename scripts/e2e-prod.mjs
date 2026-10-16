// `npm run e2e:prod`: runs the security spec against the production Pages build (run
// `npm run build:pages` first). A script rather than `E2E_PROD=1 playwright …` so it also works in
// Windows shells. Extra arguments are passed through to Playwright.
import { spawnSync } from 'node:child_process';

const result = spawnSync('npx', ['playwright', 'test', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, E2E_PROD: '1' },
});
process.exit(result.status ?? 1);
