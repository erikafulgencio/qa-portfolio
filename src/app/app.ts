import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoaderService } from './core/loader.service';
import { ModeService } from './core/mode.service';
import { BackToTop } from './layout/back-to-top';
import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';
import { HeartRain } from './shared/heart-rain';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, BackToTop, HeartRain],
  template: `
    <button type="button" class="skip-link" (click)="skipToContent()">Skip to content</button>
    <app-heart-rain />
    <app-site-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-site-footer />
    <app-back-to-top />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main {
      flex: 1;
      outline: none;
      // At least a screen tall, so the footer starts below the fold and doesn't jump down when the
      // lazily loaded page arrives (it was the site's one layout shift, CLS 0.2).
      min-height: 100vh;
      min-height: 100svh;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Injected eagerly so <html data-mode> is kept in sync from the first render.
  protected readonly mode = inject(ModeService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    const loader = inject(LoaderService);
    afterNextRender(() => loader.ready());
  }

  protected skipToContent(): void {
    this.document.getElementById('main')?.focus();
  }
}
