import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROFILE } from '../../../content/profile';
import { DEV_PROJECTS, QUESTS } from '../../../content/projects';
import { LikeButton } from '../../../shared/like-button';
import { PRO_CATEGORIES, type ProCategory, proProjectBuckets } from '../home-logic';

@Component({
  selector: 'app-projects-card',
  imports: [RouterLink, LikeButton],
  templateUrl: './projects-card.html',
  styleUrl: './projects-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsCard {
  protected readonly profile = PROFILE;
  protected readonly categories = PRO_CATEGORIES;
  protected readonly buckets = proProjectBuckets(QUESTS, DEV_PROJECTS);
  protected readonly category = signal<ProCategory>('All');
  protected readonly visible = computed(() => this.buckets[this.category()]);
}
