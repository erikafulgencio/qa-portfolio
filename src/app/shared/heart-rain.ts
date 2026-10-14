import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { HEART_PATH } from './heart-path';
import { LikesService, heartLayout } from './likes.service';

/** Full-screen heart rain plus the thank-you toast, shown after a project is liked. */
@Component({
  selector: 'app-heart-rain',
  template: `
    @if (burst(); as b) {
      <div class="rain" aria-hidden="true">
        @for (h of hearts(); track $index) {
          <span
            class="heart"
            [style.left.%]="h.left"
            [style.width.px]="h.size"
            [style.height.px]="h.size"
            [style.color]="h.color"
            [style.animation-duration.s]="h.dur"
            [style.animation-delay.s]="h.delay"
          >
            <svg viewBox="0 0 256 256">
              <path [attr.d]="heart" fill="currentColor" stroke="currentColor" stroke-width="14" />
            </svg>
          </span>
        }
      </div>
      <div class="toast-wrap" role="status">
        <div class="toast">
          <i class="ph ph-bug crawl crawl--a" aria-hidden="true"></i>
          <i class="ph ph-bug-droid crawl crawl--b" aria-hidden="true"></i>
          <i class="ph ph-bug-beetle crawl crawl--c" aria-hidden="true"></i>
          <span class="badge" aria-hidden="true"><i class="ph ph-bug-beetle"></i></span>
          <span class="msg">
            Thank you so much for appreciating my hard work
            <span class="beat" aria-hidden="true">
              <svg viewBox="0 0 256 256">
                <path
                  [attr.d]="heart"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="14"
                />
              </svg>
            </span>
          </span>
        </div>
      </div>
    }
  `,
  styles: `
    .rain {
      position: fixed;
      inset: 0;
      z-index: 79;
      pointer-events: none;
      overflow: hidden;
    }

    .heart {
      position: absolute;
      top: 0;
      opacity: 0.9;
      animation-name: pr-rain;
      animation-timing-function: linear;
      animation-fill-mode: both;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .toast-wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 80;
      display: flex;
      justify-content: center;
      padding: 0 16px;
      pointer-events: none;
    }

    .toast {
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      gap: 13px;
      max-width: 420px;
      padding: 16px 22px;
      border-radius: 18px;
      background: linear-gradient(135deg, #241e44, #14112a 70%);
      color: #fff;
      box-shadow:
        0 26px 50px -22px rgba(20, 20, 40, 0.75),
        0 0 0 1px rgba(157, 139, 255, 0.25) inset;
      animation: pr-toast 4.6s ease both;
    }

    .crawl {
      position: absolute;
      pointer-events: none;
      animation: pr-crawlx ease-in-out infinite;

      &--a {
        right: 14px;
        bottom: -4px;
        font-size: 32px;
        color: rgba(157, 139, 255, 0.3);
        animation-duration: 4.4s;
        animation-direction: reverse;
      }

      &--b {
        right: 96px;
        top: -4px;
        font-size: 22px;
        color: rgba(255, 120, 150, 0.35);
        animation-duration: 2.6s;
      }

      &--c {
        left: 120px;
        bottom: 2px;
        font-size: 18px;
        color: rgba(157, 139, 255, 0.28);
        animation-duration: 3.8s;
        animation-direction: reverse;
      }
    }

    .badge {
      position: relative;
      flex: none;
      width: 34px;
      height: 34px;
      border-radius: 11px;
      display: grid;
      place-items: center;
      background: rgba(255, 255, 255, 0.1);

      i {
        font-size: 18px;
        color: #9d8bff;
        animation: pr-cup 3.2s ease-in-out infinite;
      }
    }

    .msg {
      position: relative;
      font-family: var(--font-mono);
      font-size: 11.5px;
      line-height: 1.6;
      letter-spacing: 0.02em;
    }

    .beat {
      display: inline-block;
      width: 13px;
      height: 13px;
      color: #ff6b8a;
      vertical-align: -2px;
      animation: pr-heart 1.1s ease-in-out infinite;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeartRain {
  private readonly likes = inject(LikesService);

  protected readonly heart = HEART_PATH;
  protected readonly burst = this.likes.burst;
  protected readonly hearts = computed(() => {
    const b = this.burst();
    return b ? heartLayout(b.seed) : [];
  });
}
