import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** The "E" diamond monogram; the hot middle bar pulses. */
@Component({
  selector: 'app-monogram',
  template: `
    <svg
      viewBox="0 0 48 48"
      [attr.width]="size()"
      [attr.height]="size()"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 2.5 L45.5 24 L24 45.5 L2.5 24 Z"
        fill="none"
        stroke="var(--gs-accent)"
        stroke-width="1.4"
        opacity=".85"
      />
      <path
        d="M15 14.5 V33.5"
        stroke="var(--gs-accent)"
        stroke-width="2.6"
        stroke-linecap="square"
      />
      <path d="M15 15.5 H31" stroke="var(--gs-accent)" stroke-width="2.6" stroke-linecap="square" />
      <path d="M15 32.5 H31" stroke="var(--gs-accent)" stroke-width="2.6" stroke-linecap="square" />
      <path
        class="bar"
        d="M15 24 H45"
        stroke="var(--gs-hot)"
        stroke-width="2.6"
        stroke-linecap="square"
      />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: none;
    }
    svg {
      overflow: visible;
    }
    .bar {
      animation: g-pulse 3.4s ease-in-out infinite;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Monogram {
  readonly size = input(30);
}
