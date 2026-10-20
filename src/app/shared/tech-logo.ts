import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { GLYPHS, LOGOS } from './tech-logos';

/**
 * Decorative brand mark (or, for generic items, a Phosphor glyph) for a stack chip; the chip's
 * text stays the accessible label. Stack names with neither render nothing.
 */
@Component({
  selector: 'app-tech-logo',
  template: `
    @if (logo(); as l) {
      <svg [attr.viewBox]="l.viewBox" aria-hidden="true" focusable="false">
        @for (p of l.paths; track $index) {
          <path [attr.d]="p.d" [attr.fill]="p.fill" [attr.transform]="p.transform ?? null" />
        }
      </svg>
    } @else if (glyph(); as g) {
      <i class="ph {{ g }}" aria-hidden="true"></i>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: none;
    }
    :host(:empty) {
      display: none;
    }
    svg {
      width: 1.35em;
      height: 1.35em;
    }
    i {
      font-size: 1.25em;
      line-height: 1;
      opacity: 0.85;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechLogo {
  readonly name = input.required<string>();
  private readonly key = computed(() => this.name().toLowerCase());
  protected readonly logo = computed(() => LOGOS[this.key()]);
  protected readonly glyph = computed(() => GLYPHS[this.key()]);
}
