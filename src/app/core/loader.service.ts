import { DOCUMENT, Injectable, inject } from '@angular/core';

import type { Mode } from './mode.service';

interface BootLoader {
  show(mode: Mode, opt?: { swap?: boolean; onCovered?: () => void }): void;
  ready(): void;
}

/**
 * Thin wrapper over the boot loader defined inline in src/index.html (window.__efLoader).
 * When the loader is absent (unit tests, SSR-less tooling) every call degrades to an immediate no-op.
 */
@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly window = inject(DOCUMENT).defaultView as
    (Window & { __efLoader?: BootLoader }) | null;

  private get loader(): BootLoader | undefined {
    return this.window?.__efLoader;
  }

  /** Lets the first-paint loader finish once the app has rendered. */
  ready(): void {
    this.loader?.ready();
  }

  /** Covers the page, runs `swap` underneath, then reveals the new state. */
  transition(mode: Mode, swap: () => void): void {
    const loader = this.loader;
    if (!loader || this.prefersReducedMotion()) {
      swap();
      return;
    }
    loader.show(mode, { swap: true, onCovered: swap });
  }

  private prefersReducedMotion(): boolean {
    return !!this.window?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }
}
