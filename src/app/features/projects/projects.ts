import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ModeService } from '../../core/mode.service';
import type { IconName } from '../../content/models';
import { QUESTS, WORK_ARTIFACTS } from '../../content/projects';
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
  link: string[];
}

interface Filter {
  label: string;
  count: number;
}

const PRO_FILTERS = ['All', 'Automation Projects', 'Development Projects'] as const;
const ALTER_FILTERS = ['All', 'Boss fight', 'Side quest'] as const;

@Component({
  selector: 'app-projects-page',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPage {
  protected readonly mode = inject(ModeService);
  protected readonly artifacts = WORK_ARTIFACTS;

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

  protected readonly cards = computed<Card[]>(() =>
    this.mode.isPro() ? this.proCards(this.proFilter()) : this.alterCards(this.alterFilter()),
  );

  protected pick(label: string): void {
    if (this.mode.isPro()) this.proFilter.set(label as (typeof PRO_FILTERS)[number]);
    else this.alterFilter.set(label as (typeof ALTER_FILTERS)[number]);
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
      link: ['/projects', p.id],
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
      link: questLink(q),
    }));
  }
}
