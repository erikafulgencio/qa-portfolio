import { DOCUMENT, DestroyRef, Injectable, inject, signal } from '@angular/core';

/** Window scroll position, shared by the shrinking header and the back-to-top button. */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly window = inject(DOCUMENT).defaultView;

  readonly y = signal(0);

  constructor() {
    const win = this.window;
    if (!win) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = win.requestAnimationFrame(() => {
        frame = 0;
        this.y.set(win.scrollY);
      });
    };
    win.addEventListener('scroll', onScroll, { passive: true });
    inject(DestroyRef).onDestroy(() => win.removeEventListener('scroll', onScroll));
    this.y.set(win.scrollY);
  }

  toTop(): void {
    this.window?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** Smooth-scrolls so `el` sits just below the sticky header. */
  toElement(el: Element, offset = 96): void {
    const win = this.window;
    if (!win) return;
    win.scrollTo({
      top: el.getBoundingClientRect().top + win.scrollY - offset,
      behavior: 'smooth',
    });
  }
}
