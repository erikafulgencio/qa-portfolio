import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CASES } from '../../../content/cases';
import { metaYear, wrapIndex } from '../home-logic';

/** One case study at a time, with dots and wrap-around prev/next. */
@Component({
  selector: 'app-case-carousel',
  imports: [RouterLink],
  templateUrl: './case-carousel.html',
  styleUrl: './case-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseCarousel {
  protected readonly cases = CASES;
  protected readonly index = signal(0);
  protected readonly active = computed(() => {
    const i = wrapIndex(this.index(), this.cases.length);
    const c = this.cases[i];
    return {
      ...c,
      i,
      n: String(i + 1).padStart(2, '0'),
      year: metaYear(c.meta),
      docs: c.docs.slice(0, 3),
      hasArt: c.id === 'breach',
    };
  });

  protected go(i: number): void {
    this.index.set(wrapIndex(i, this.cases.length));
  }

  protected step(delta: number): void {
    this.go(this.index() + delta);
  }
}
