import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { ModeService } from '../core/mode.service';
import { ScrollService } from '../core/scroll.service';

/** Professional-mode floating button, shown after scrolling 420px. */
@Component({
  selector: 'app-back-to-top',
  template: `
    @if (visible()) {
      <button type="button" class="top" aria-label="Back to top" (click)="scroll.toTop()">
        <span class="ring" aria-hidden="true"></span>
        <i class="ph ph-arrow-up" aria-hidden="true"></i>
      </button>
    }
  `,
  styles: `
    @use 'mixins' as *;

    .top {
      position: fixed;
      right: 26px;
      bottom: 26px;
      z-index: 50;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: none;
      display: grid;
      place-items: center;
      color: #fff;
      background: tx(86%);
      font-size: 20px;
      cursor: pointer;
      box-shadow: 0 18px 34px -16px rgba(20, 20, 40, 0.6);
      animation: g-rise 0.4s ease both;
      transition:
        background 0.25s ease,
        transform 0.25s ease;

      @media (hover: hover) {
        &:hover {
          background: var(--gs-accent);
          transform: translateY(-3px);
        }
      }

      // Phones: smaller and frosted, so the content underneath stays readable, and clear of the
      // iPhone home indicator.
      @include phone {
        right: 14px;
        bottom: calc(14px + env(safe-area-inset-bottom, 0px));
        width: 44px;
        height: 44px;
        font-size: 18px;
        color: var(--gs-text);
        background: color-mix(in srgb, var(--surface) 78%, transparent);
        backdrop-filter: blur(10px) saturate(1.4);
        -webkit-backdrop-filter: blur(10px) saturate(1.4);
        border: 1px solid ac(22%);
        box-shadow: 0 10px 24px -12px rgba(20, 20, 40, 0.45);

        .ring {
          display: none;
        }
      }
    }

    .ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid ac(60%);
      animation: pr-ring 2.2s ease-out infinite;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTop {
  protected readonly scroll = inject(ScrollService);
  private readonly mode = inject(ModeService);

  protected readonly visible = computed(() => this.mode.isPro() && this.scroll.y() > 420);
}
