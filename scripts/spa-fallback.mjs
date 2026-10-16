// GitHub Pages serves 404.html for unknown paths; a copy of index.html lets Angular route deep links.
// That fallback still answers with HTTP 404, though (browsers log it, search engines drop the page),
// so every known route also gets its own index.html and is served with 200. Routes come from
// app.routes.ts; the :id routes are filled from the content files, so new projects need no edit here.
//
// Each route page also preloads its own lazy chunk and that chunk's imports. Angular only preloads
// main.js's dependencies, so without this a deep link loads as a waterfall
// (HTML → main.js → route chunk → shared chunks), one slow round trip per step on a phone.
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';

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

// ── Route chunk preloads ─────────────────────────────────────────────────────────────────────────
const shell = readFileSync(`${dist}/index.html`, 'utf8');
const mainFile = readdirSync(dist).find((f) => /^main-[A-Z0-9]+\.js$/.test(f));
const main = mainFile ? readFileSync(`${dist}/${mainFile}`, 'utf8') : '';
// route pattern → its lazy chunk, e.g. "projects/:id" → "chunk-76DOWQP7.js"
const routeChunk = new Map(
  [
    ...main.matchAll(
      /path:"([a-z/:-]*)"((?:(?!path:").){0,400}?)import\("\.\/(chunk-[A-Z0-9]+\.js)"\)/gs,
    ),
  ].map((m) => [m[1], m[3]]),
);
const alreadyPreloaded = new Set(
  [...shell.matchAll(/modulepreload" href="(chunk-[A-Z0-9]+\.js)"/g)].map((m) => m[1]),
);

/** A chunk plus everything it statically imports, minus what index.html already preloads. */
function chunkClosure(chunk, seen = new Set()) {
  if (seen.has(chunk) || !existsSync(`${dist}/${chunk}`)) return seen;
  seen.add(chunk);
  const code = readFileSync(`${dist}/${chunk}`, 'utf8');
  for (const m of code.matchAll(/(?:from|import)\s*"\.\/(chunk-[A-Z0-9]+\.js)"/g))
    chunkClosure(m[1], seen);
  return seen;
}

function withPreloads(path) {
  const pattern = path.startsWith('projects/')
    ? 'projects/:id'
    : path.startsWith('cases/')
      ? 'cases/:id'
      : path;
  const chunk = routeChunk.get(pattern);
  if (!chunk) return shell;
  const links = [...chunkClosure(chunk)]
    .filter((c) => !alreadyPreloaded.has(c))
    .map((c) => `<link rel="modulepreload" href="${c}">`)
    .join('');
  return shell.replace('</head>', `${links}</head>`);
}

if (routeChunk.size < staticPaths.length) {
  console.warn(
    `spa-fallback: found chunks for ${routeChunk.size} routes only; route pages will skip preloads`,
  );
}

writeFileSync(`${dist}/index.html`, withPreloads(''));
for (const path of new Set(paths)) {
  mkdirSync(`${dist}/${path}`, { recursive: true });
  writeFileSync(`${dist}/${path}/index.html`, withPreloads(path));
}
console.log(
  `spa-fallback: ${dist}/404.html + ${new Set(paths).size} route pages (route chunks preloaded for ${routeChunk.size} routes)`,
);
