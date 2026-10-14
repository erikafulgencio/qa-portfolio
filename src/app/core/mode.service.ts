import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';

import { LoaderService } from './loader.service';

export type Mode = 'pro' | 'alter';

export const MODE_STORAGE_KEY = 'ef-mode';

const THEME_COLOR: Record<Mode, string> = { pro: '#f2f1f6', alter: '#0c0e1a' };

/**
 * Site-wide presentation mode: "Professional" (default) or "Alter Ego".
 * Persists to localStorage and mirrors onto <html data-mode>, which drives every theme token.
 */
@Injectable({ providedIn: 'root' })
export class ModeService {
  private readonly document = inject(DOCUMENT);
  private readonly loader = inject(LoaderService);

  readonly mode = signal<Mode>(this.readStored());
  readonly isPro = computed(() => this.mode() === 'pro');
  readonly isAlter = computed(() => this.mode() === 'alter');

  constructor() {
    effect(() => {
      const mode = this.mode();
      this.document.documentElement.setAttribute('data-mode', mode);
      this.document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', THEME_COLOR[mode]);
      this.store(mode);
    });
  }

  /** Switches mode behind the loader transition; a no-op when already in that mode. */
  switchTo(mode: Mode): void {
    if (mode === this.mode()) return;
    this.loader.transition(mode, () => this.mode.set(mode));
  }

  toggle(): void {
    this.switchTo(this.isPro() ? 'alter' : 'pro');
  }

  private readStored(): Mode {
    try {
      return this.document.defaultView?.localStorage.getItem(MODE_STORAGE_KEY) === 'alter'
        ? 'alter'
        : 'pro';
    } catch {
      return 'pro';
    }
  }

  private store(mode: Mode): void {
    try {
      this.document.defaultView?.localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch {
      // Storage can be unavailable (private mode, blocked site data); the mode still works for this visit.
    }
  }
}
