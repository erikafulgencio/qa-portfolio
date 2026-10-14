import { ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core';

import { BugSquashEngine } from './bug-squash-engine';
import { BugSquashGame } from './bug-squash-game';

/** The playable Bug Squash field. `variant` switches between the Professional and Alter Ego skins. */
@Component({
  selector: 'app-bug-squash-arena',
  templateUrl: './bug-squash-arena.html',
  styleUrl: './bug-squash-arena.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'variant()' },
})
export class BugSquashArena {
  protected readonly game = inject(BugSquashGame);
  readonly variant = input<'pro' | 'alter'>('pro');

  protected readonly heading = BugSquashEngine.heading;
  protected readonly flecks = [
    { fx: '-16px', fy: '-13px', size: 5, hot: false, dur: 0.6 },
    { fx: '15px', fy: '-10px', size: 4, hot: false, dur: 0.65 },
    { fx: '6px', fy: '16px', size: 4, hot: true, dur: 0.7 },
  ];

  constructor() {
    this.game.resume();
    inject(DestroyRef).onDestroy(() => this.game.stop());
  }
}
