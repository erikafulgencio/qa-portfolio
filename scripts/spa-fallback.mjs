// GitHub Pages serves 404.html for unknown paths; a copy of index.html lets Angular route deep links.
import { copyFileSync } from 'node:fs';

const dist = 'dist/qa-portfolio/browser';
copyFileSync(`${dist}/index.html`, `${dist}/404.html`);
console.log(`spa-fallback: ${dist}/404.html`);
