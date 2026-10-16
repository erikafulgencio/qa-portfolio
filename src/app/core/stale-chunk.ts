import { DOCUMENT, inject } from '@angular/core';
import type { NavigationError } from '@angular/router';

/**
 * Each deploy renames the lazy route chunks. A page opened (or cached) before a deploy still
 * points at the old names, so its next navigation fails with "Failed to fetch dynamically imported
 * module" and goes nowhere. When that happens, load the destination fresh, which picks up the new
 * build. A short-lived marker stops a reload loop if the chunk is genuinely missing.
 */
const STALE_CHUNK =
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError|Loading chunk [\w-]+ failed/i;

const MARKER = 'ef-chunk-reload';
const WINDOW_MS = 10_000;

export function isStaleChunkError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? '');
  return STALE_CHUNK.test(message);
}

/** Router navigation error handler (see app.config.ts). */
export function reloadOnStaleChunk(event: NavigationError): void {
  if (!isStaleChunkError(event.error)) return;
  const document = inject(DOCUMENT);
  const win = document.defaultView;
  if (!win) return;
  try {
    const last = Number(win.sessionStorage.getItem(MARKER) ?? 0);
    if (Date.now() - last < WINDOW_MS) return; // already tried: don't loop
    win.sessionStorage.setItem(MARKER, String(Date.now()));
  } catch {
    // Storage blocked: still reload once; the next failure will simply show the current page.
  }
  const base = document.querySelector('base')?.getAttribute('href') ?? '/';
  win.location.assign(base.replace(/\/$/, '') + event.url);
}
