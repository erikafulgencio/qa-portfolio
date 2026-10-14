import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { CASES } from '../../../content/cases';
import { CHARACTER_SHEET, HUD_STATS, TICKER } from '../../../content/home';
import type { Quest } from '../../../content/models';
import { PROFILE } from '../../../content/profile';
import { QUESTS } from '../../../content/projects';
import { BugSquashArena } from '../../../games/bug-squash/bug-squash-arena';

const FEATURED_IDS = ['pw', 'breach', 'ai'];

/** Link target for a quest: boss fights open their case study, everything else its project page. */
export function questLink(q: Quest): string[] {
  return CASES.some((c) => c.id === q.id) ? ['/cases', q.id] : ['/projects', q.id];
}

/** Alter Ego home: game-HUD hero with the Glitchbane video, ticker, character sheet and quest board. */
@Component({
  selector: 'app-alter-home',
  imports: [RouterLink, BugSquashArena],
  templateUrl: './alter-home.html',
  styleUrl: './alter-home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlterHome {
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('heroVideo');

  protected readonly profile = PROFILE;
  protected readonly hud = HUD_STATS;
  protected readonly ticker = TICKER;
  protected readonly sheet = CHARACTER_SHEET;
  protected readonly featured = FEATURED_IDS.map((id) => QUESTS.find((q) => q.id === id)).filter(
    (q): q is Quest => !!q,
  );
  protected readonly questLink = questLink;
  protected readonly embers = [
    { left: 12, size: 4, color: 'var(--gs-accent)', dur: 9, delay: 0 },
    { left: 26, size: 3, color: 'var(--gs-hot)', dur: 11, delay: 1.4 },
    { left: 41, size: 5, color: 'var(--gs-accent)', dur: 8, delay: 2.6 },
    { left: 58, size: 3, color: 'var(--gs-hot-soft)', dur: 12, delay: 0.7 },
    { left: 72, size: 4, color: 'var(--gs-accent)', dur: 10, delay: 3.4 },
    { left: 84, size: 3, color: 'var(--gs-hot)', dur: 9.5, delay: 4.6 },
    { left: 93, size: 4, color: 'var(--gs-accent)', dur: 13, delay: 2 },
  ];

  constructor() {
    const win = inject(DOCUMENT).defaultView;
    // Autoplay only when the visitor has not asked for reduced motion; the poster frame shows otherwise.
    afterNextRender(() => {
      const el = this.video()?.nativeElement;
      if (!el || win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
      el.muted = true;
      el.play()?.catch(() => {
        // Autoplay can be blocked (e.g. data saver); the poster image remains visible.
      });
    });
  }
}
