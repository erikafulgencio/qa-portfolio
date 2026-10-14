import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { PROFILE } from '../../content/profile';
import { environment } from '../../../environments/environment';

export type EmbedState = 'loading' | 'ready' | 'failed';

/** How long to wait for HubSpot to render before offering the email fallback. */
export const EMBED_TIMEOUT_MS = 12_000;
export const EMBED_SCRIPT_ID = 'hs-form-embed-script';

/**
 * HubSpot's embedded contact form (fields, styling and CAPTCHA are managed in HubSpot).
 * The embed script is (re-)injected each time this component mounts — see injectScript().
 */
@Component({
  selector: 'app-hubspot-form',
  templateUrl: './hubspot-form.html',
  styleUrl: './hubspot-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubspotForm {
  private readonly document = inject(DOCUMENT);
  private readonly frame = viewChild.required<ElementRef<HTMLElement>>('frame');

  /** Optional intro line above the form. */
  readonly note = input('All fields required. I read every message myself.');

  protected readonly config = environment.hubspot;
  protected readonly email = PROFILE.email;
  protected readonly state = signal<EmbedState>('loading');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const host = this.frame().nativeElement;
      const observer = new MutationObserver(() => {
        if (host.childElementCount > 0) this.settle('ready');
      });
      observer.observe(host, { childList: true, subtree: true });
      const timer = setTimeout(() => this.settle('failed'), EMBED_TIMEOUT_MS);
      this.injectScript();
      destroyRef.onDestroy(() => {
        observer.disconnect();
        clearTimeout(timer);
      });
    });
  }

  private settle(state: Exclude<EmbedState, 'loading'>): void {
    if (this.state() === 'loading') this.state.set(state);
  }

  private injectScript(): void {
    // HubSpot's v4 embed scans for .hs-form-frame only on its first run and then guards itself with
    // window.__HS__FORMS__EMBED__. In an SPA the frame is re-created on every visit, so drop the guard
    // and re-run the script; without this a second visit to a page with the form stays blank.
    const win = this.document.defaultView as (Window & { __HS__FORMS__EMBED__?: unknown }) | null;
    if (win) delete win.__HS__FORMS__EMBED__;
    this.document.getElementById(EMBED_SCRIPT_ID)?.remove();
    const script = this.document.createElement('script');
    script.id = EMBED_SCRIPT_ID;
    script.src = this.config.embedScript;
    script.defer = true;
    script.onerror = () => this.settle('failed');
    this.document.body.appendChild(script);
  }
}
