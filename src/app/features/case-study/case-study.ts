import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ScrollService } from '../../core/scroll.service';
import { CASES } from '../../content/cases';
import { type CaseSectionId, caseSections, nextCase, pad2, readMins } from './case-study.utils';

@Component({
  selector: 'app-case-study-page',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './case-study.html',
  styleUrl: './case-study.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CaseStudyPage {
  private readonly title = inject(Title);
  private readonly scroll = inject(ScrollService);
  private readonly document = inject(DOCUMENT);

  /** Route parameter `:id`. */
  readonly id = input<string>();

  private readonly index = computed(() => CASES.findIndex((c) => c.id === this.id()));
  protected readonly study = computed(() => CASES[this.index()]);
  protected readonly fileNo = computed(() => pad2(this.index() + 1));
  protected readonly minutes = computed(() => {
    const c = this.study();
    return c ? readMins(c) : 0;
  });
  protected readonly sections = computed(() => {
    const c = this.study();
    return c ? caseSections(c) : [];
  });
  protected readonly next = computed(() => {
    const c = this.study();
    return c ? nextCase(CASES, c.id) : undefined;
  });
  /** Long titles get a smaller display size so they still fit the hero. */
  protected readonly longTitle = computed(() => (this.study()?.title.length ?? 0) > 20);
  protected readonly showHeadline = computed(() => {
    const c = this.study();
    return !!c && c.headline !== c.sub;
  });

  /** Reading progress, 0–1, driven by the shared scroll position. */
  protected readonly progress = computed(() => {
    const y = this.scroll.y();
    const el = this.document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    return max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
  });

  constructor() {
    effect(() => {
      const c = this.study();
      this.title.setTitle(c ? c.title : 'Case study not found');
    });
  }

  protected n(id: CaseSectionId): string {
    return this.sections().find((s) => s.id === id)?.n ?? '';
  }

  protected jump(id: CaseSectionId): void {
    const el = this.document.getElementById(id);
    if (!el) return;
    this.scroll.toElement(el);
    el.focus({ preventScroll: true });
  }
}
