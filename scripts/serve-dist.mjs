// Serves the GitHub Pages build exactly as Pages does: under /qa-portfolio/, with 404.html as the
// SPA fallback. Used by the security job (Playwright + OWASP ZAP) to test the real production
// output. `npm run build:pages && npm run serve:dist` → http://localhost:8080/qa-portfolio/
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { createGzip } from 'node:zlib';

const ROOT = 'dist/qa-portfolio/browser';
const BASE = '/qa-portfolio/';
const PORT = Number(process.env.PORT ?? 8080);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.svg', '.json']);

// Gzip text like GitHub Pages does, so performance audits measure realistic transfer sizes.
function send(req, res, status, file) {
  const headers = { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' };
  const gzip =
    COMPRESSIBLE.has(extname(file)) && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '');
  if (gzip) headers['Content-Encoding'] = 'gzip';
  res.writeHead(status, headers);
  const stream = createReadStream(file);
  (gzip ? stream.pipe(createGzip()) : stream).pipe(res);
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  if (!url.pathname.startsWith(BASE)) {
    // Like the real domain: the bare root redirects, anything else outside the site is a 404
    // (so audits get the same robots.txt answer as erikafulgencio.github.io).
    if (url.pathname === '/') res.writeHead(302, { Location: BASE });
    else res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end();
  }
  const rel = normalize(decodeURIComponent(url.pathname.slice(BASE.length))).replace(
    /^(\.\.[/\\])+/,
    '',
  );
  let file = join(ROOT, rel);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (existsSync(file)) return send(req, res, 200, file);
  return send(req, res, 404, join(ROOT, '404.html'));
}).listen(PORT, () => console.log(`serve-dist: http://localhost:${PORT}${BASE}`));
