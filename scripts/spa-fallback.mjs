// GitHub Pages serves 404.html for unknown paths; a copy of index.html lets Angular route deep links.
// That fallback still answers with HTTP 404, though (browsers log it, search engines drop the page),
// so every known route also gets its own index.html and is served with 200. Routes come from
// app.routes.ts; the :id routes are filled from the content files, so new projects need no edit here.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';

const dist = 'dist/qa-portfolio/browser';
copyFileSync(`${dist}/index.html`, `${dist}/404.html`);

const ids = (file) =>
  [...readFileSync(file, 'utf8').matchAll(/^ {4}id: '([a-z0-9-]+)'/gm)].map((m) => m[1]);
const routes = readFileSync('src/app/app.routes.ts', 'utf8');
const staticPaths = [...routes.matchAll(/path: '([a-z-]+)'/g)].map((m) => m[1]);

const paths = [
  ...staticPaths,
  ...ids('src/app/content/projects.ts').map((id) => `projects/${id}`),
  ...ids('src/app/content/cases.ts').map((id) => `cases/${id}`),
];
if (staticPaths.length < 4 || paths.length < 10) {
  throw new Error(
    `spa-fallback: found only ${paths.length} routes; did the route/content format change?`,
  );
}
for (const path of new Set(paths)) {
  mkdirSync(`${dist}/${path}`, { recursive: true });
  copyFileSync(`${dist}/index.html`, `${dist}/${path}/index.html`);
}
console.log(`spa-fallback: ${dist}/404.html + ${new Set(paths).size} route pages`);
