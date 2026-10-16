import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import type { SpotRow } from '../../content/models';
import { SPOT_ROWS } from '../../content/about';

export const SPOT_MESSAGES = {
  idle: 'Six results. One is lying.',
  hit: 'Nice catch — TC-03 passed with a wrong total. Severity: Major, Priority: High.',
  miss: 'That one genuinely passes. Compare expected against actual.',
} as const;

/** "Spot the defect": every row says PASS, but one result is wrong. */
@Component({
  selector: 'app-spot-the-defect',
  template: `
    <div class="head">
      <span class="live" aria-hidden="true"></span>
      <span class="label">Mini game · Spot the defect</span>
    </div>
    <p class="prompt" id="spot-prompt">
      One of these results is lying. Tap the row you'd raise a ticket for.
    </p>
    <div class="rows" role="group" aria-labelledby="spot-prompt">
      <span class="scan" aria-hidden="true"></span>
      @for (r of rows(); track r.id) {
        <button
          type="button"
          class="row"
          [class.hit]="picked() === r.id && r.bug"
          [class.miss]="picked() === r.id && !r.bug"
          [attr.aria-pressed]="picked() === r.id"
          (click)="picked.set(r.id)"
        >
          <span class="id">{{ r.id }}</span>
          <span class="text">{{ r.label }}</span>
          <span class="status">{{ r.status }}</span>
        </button>
      }
    </div>
    <p
      class="msg"
      [class.msg--hit]="result() === 'hit'"
      [class.msg--miss]="result() === 'miss'"
      role="status"
    >
      {{ message() }}
    </p>
    <button type="button" class="reset" (click)="picked.set(null)">Reset</button>
  `,
  styles: `
    @use 'mixins' as *;

    :host {
      position: relative;
      display: block;
      border: 1px solid ac(28%);
      background: bg(80%);
      padding: 20px;
      @include chamfer(12px);
    }

    .head {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-bottom: 10px;
    }

    .live {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--gs-accent);
      animation: g-pulse 1.8s ease-in-out infinite;
    }

    .label {
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gs-accent);
    }

    .prompt {
      font-size: 12.5px;
      color: tx(60%);
      margin: 0 0 10px;
    }

    .rows {
      position: relative;
      display: grid;
      gap: 5px;
    }

    .scan {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(to right, transparent, var(--gs-accent), transparent);
      animation: g-scan 4.5s linear infinite;
      pointer-events: none;
    }

    .row {
      display: grid;
      grid-template-columns: 42px 1fr auto;
      gap: 9px;
      align-items: center;
      padding: 9px 11px;
      cursor: pointer;
      font-size: 12px;
      text-align: left;
      border: 1px solid tx(12%);
      background: transparent;
      transition: border-color 0.2s ease;

      @media (hover: hover) {
        &:hover {
          border-color: var(--gs-accent);
        }
      }

      &.hit {
        border-color: var(--gs-accent);
        background: ac(14%);

        .status {
          color: var(--gs-accent);
        }
      }

      &.miss {
        border-color: hot(50%);
        background: hot(8%);
      }
    }

    .id,
    .status {
      font-family: var(--font-mono);
      color: tx(55%);
    }

    .text {
      color: tx(85%);
    }

    .msg {
      min-height: 42px;
      font-size: 12.5px;
      color: tx(60%);
      display: flex;
      align-items: center;
      margin-top: 8px;
      line-height: 1.5;

      &--hit {
        color: var(--gs-accent);
      }

      &--miss {
        color: var(--gs-hot-soft);
      }
    }

    .reset {
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      padding: 8px 14px;
      background: transparent;
      border: 1px solid tx(28%);

      @media (hover: hover) {
        &:hover {
          border-color: var(--gs-accent);
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotTheDefect {
  readonly rows = input<SpotRow[]>(SPOT_ROWS);
  readonly picked = signal<string | null>(null);

  readonly result = computed<'idle' | 'hit' | 'miss'>(() => {
    const row = this.rows().find((r) => r.id === this.picked());
    if (!row) return 'idle';
    return row.bug ? 'hit' : 'miss';
  });

  protected readonly message = computed(() => SPOT_MESSAGES[this.result()]);
}
