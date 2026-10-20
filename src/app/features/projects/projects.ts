import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { ModeService } from '../../core/mode.service';
import type { DevProject, IconName } from '../../content/models';
import { QUESTS, WORK_ARTIFACTS } from '../../content/projects';
import { DevArt } from '../../shared/dev-art/dev-art';
import { TechLogo } from '../../shared/tech-logo';
import { PRO_PROJECTS, questLink } from '../project-detail/project-lookup';

interface Card {
  id: string;
  icon: IconName;
  kicker: string;
  title: string;
  sub: string;
  bullets: string[];
  stack: string[];
  cta: string;
  status?: string;
  link: string[];
  art?: DevProject['art'];
  screens?: DevProject['screens'];
  highlights?: DevProject['highlights'];
  url?: string;
}

/** A run of cards under one heading. `showcase` lays development projects out around their art. */
interface Group {
  label: string;
  cards: Card[];
  showcase: boolean;
}

interface Filter {
  label: string;
  count: number;
}

const PRO_FILTERS = ['All', 'Automation Projects', 'Development Projects'] as const;
const ALTER_FILTERS = ['All', 'Boss fight', 'Side quest'] as const;

@Component({
  selector: 'app-projects-page',
  imports: [RouterLink, DevArt, TechLogo],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPage {
  protected readonly mode = inject(ModeService);
  protected readonly artifacts = WORK_ARTIFACTS;
  private readonly document = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);

  private readonly proFilter = signal<(typeof PRO_FILTERS)[number]>('All');
  private readonly alterFilter = signal<(typeof ALTER_FILTERS)[number]>('All');

  protected readonly activeFilter = computed(() =>
    this.mode.isPro() ? this.proFilter() : this.alterFilter(),
  );

  protected readonly filters = computed<Filter[]>(() =>
    this.mode.isPro()
      ? PRO_FILTERS.map((label) => ({ label, count: this.proCards(label).length }))
      : ALTER_FILTERS.map((label) => ({ label, count: this.alterCards(label).length })),
  );

  /** "All" in Professional mode splits into automation and development; every other view is one run. */
  protected readonly groups = computed<Group[]>(() => {
    if (!this.mode.isPro()) {
      return [{ label: '', cards: this.alterCards(this.alterFilter()), showcase: false }];
    }
    const filter = this.proFilter();
    if (filter !== 'All') {
      return [
        {
          label: '',
          cards: this.proCards(filter),
          showcase: filter === 'Development Projects',
        },
      ];
    }
    return [
      { label: 'Automation', cards: this.proCards('Automation Projects'), showcase: false },
      { label: 'Development', cards: this.proCards('Development Projects'), showcase: true },
    ];
  });

  /** Switches filter; where supported, cards morph to their new places with a view transition. */
  protected pick(label: string): void {
    const apply = () => {
      if (this.mode.isPro()) this.proFilter.set(label as (typeof PRO_FILTERS)[number]);
      else this.alterFilter.set(label as (typeof ALTER_FILTERS)[number]);
    };
    const reduceMotion = this.document.defaultView?.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (typeof this.document.startViewTransition !== 'function' || reduceMotion) {
      apply();
      return;
    }
    this.document.startViewTransition(() => {
      apply();
      this.appRef.tick();
    });
  }

  private proCards(filter: (typeof PRO_FILTERS)[number]): Card[] {
    const list =
      filter === 'All'
        ? PRO_PROJECTS
        : PRO_PROJECTS.filter((p) =>
            filter === 'Automation Projects'
              ? p.category === 'Automation project'
              : p.category === 'Development project',
          );
    return list.map((p) => ({
      id: p.id,
      icon: p.icon,
      kicker: p.kicker,
      title: p.title,
      sub: p.sub,
      bullets: p.bullets,
      stack: p.stack,
      cta: p.cta ?? 'View project',
      status: p.status,
      link: ['/projects', p.id],
      art: p.art,
      screens: p.screens,
      highlights: p.highlights,
      url: p.links?.[0]?.href,
    }));
  }

  private alterCards(filter: (typeof ALTER_FILTERS)[number]): Card[] {
    const list = filter === 'All' ? QUESTS : QUESTS.filter((q) => q.type === filter);
    return list.map((q) => ({
      id: q.id,
      icon: q.icon,
      kicker: q.kicker,
      title: q.title,
      sub: q.sub,
      bullets: q.bullets,
      stack: q.stack,
      cta: q.cta ?? 'View quest',
      status: q.status,
      link: questLink(q),
    }));
  }
}
