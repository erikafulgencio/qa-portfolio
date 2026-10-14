import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { AWARDS, CERTIFICATIONS, SKILL_GROUPS, TRAINING } from '../../content/skills';
import { ImagePlaceholder } from '../../shared/image-placeholder';
import { findSkill } from './skill-tree';

@Component({
  selector: 'app-skills-page',
  imports: [ImagePlaceholder],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SkillsPage {
  protected readonly groups = SKILL_GROUPS;
  protected readonly training = TRAINING;
  protected readonly certs = CERTIFICATIONS;
  protected readonly awards = AWARDS;

  protected readonly selected = signal('Playwright');
  protected readonly openAward = signal<string | null>(null);
  protected readonly detail = computed(() => findSkill(this.groups, this.selected()));

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  protected toggleAward(id: string): void {
    this.openAward.update((cur) => (cur === id ? null : id));
  }
}
