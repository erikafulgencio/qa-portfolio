import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';

import { LikeButton } from '../../shared/like-button';
import { findProject, hasCaseStudy, nextProject } from './project-lookup';

const SITE = 'Erika Fulgencio';

@Component({
  selector: 'app-project-detail-page',
  imports: [RouterLink, LikeButton],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectDetailPage {
  private readonly title = inject(Title);
  private readonly router = inject(Router);

  /** Route parameter `:id`. */
  readonly id = input<string>();

  protected readonly project = computed(() => findProject(this.id()));
  protected readonly next = computed(() => {
    const p = this.project();
    return p ? nextProject(p.id) : undefined;
  });

  /** Floating "?" glyphs on the "Ask me about it" button: [left %, font px, duration s, delay s]. */
  protected readonly questions = [
    [9, 13, 3.4, 0],
    [22, 10, 4.2, 0.5],
    [35, 15, 3.8, 1.1],
    [48, 11, 4.6, 0.3],
    [61, 14, 3.6, 1.5],
    [74, 10, 4.4, 0.9],
    [88, 13, 3.9, 1.9],
  ] as const;

  constructor() {
    effect(() => {
      const id = this.id();
      if (!this.project() && hasCaseStudy(id)) {
        void this.router.navigate(['/cases', id], { replaceUrl: true });
        return;
      }
      const p = this.project();
      this.title.setTitle(p ? `${p.title} · ${SITE}` : `Project not found · ${SITE}`);
    });
  }
}
