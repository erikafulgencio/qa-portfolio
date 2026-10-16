// Adds a Content-Security-Policy <meta> to the production index.html. GitHub Pages can't send
// headers, so the policy has to live in the page. Inline <script> blocks (the boot loader) and inline
// event handlers (Angular's critical-CSS `onload`) are allowed by hash, recomputed on every build,
// so editing src/index.html never silently breaks the site. Runs from `npm run build:pages`.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const file = 'dist/qa-portfolio/browser/index.html';
// Browsers hash a script's text after the HTML parser has normalised line endings to LF, so do the
// same; otherwise a file saved with CRLF endings (e.g. on Windows) gets hashes that never match.
const sha = (text) =>
  `'sha256-${createHash('sha256').update(text.replace(/\r\n?/g, '\n'), 'utf8').digest('base64')}'`;

let html = readFileSync(file, 'utf8');
if (html.includes('http-equiv="Content-Security-Policy"')) {
  console.log('csp: already present');
  process.exit(0);
}

const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) =>
  sha(m[1]),
);
const handlers = [...html.matchAll(/\son[a-z]+="([^"]*)"/g)].map((m) => sha(m[1]));

const policy = [
  "default-src 'self'",
  [
    "script-src 'self'",
    ...scripts,
    ...(handlers.length ? ["'unsafe-hashes'", ...new Set(handlers)] : []),
  ].join(' '),
  // Angular injects component styles as <style> elements at runtime.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "media-src 'self'",
  // The contact form posts to HubSpot's Forms API (core/contact.service.ts).
  "connect-src 'self' https://api.hsforms.com",
  "object-src 'none'",
  "frame-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}" />`;
// Must come before any script it governs: place it straight after <meta charset>.
html = html.replace(/(<meta charset="[^"]*"\s*\/?>)/i, `$1\n    ${meta}`);
if (!html.includes(meta))
  throw new Error('csp: could not find <meta charset> to anchor the policy');
writeFileSync(file, html);
console.log(
  `csp: ${file} (${scripts.length} inline script hash(es), ${handlers.length} handler hash(es))`,
);
