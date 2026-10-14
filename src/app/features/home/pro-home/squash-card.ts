import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BugSquashArena } from '../../../games/bug-squash/bug-squash-arena';
import { BugSquashGame } from '../../../games/bug-squash/bug-squash-game';

@Component({
  selector: 'app-squash-card',
  imports: [BugSquashArena],
  templateUrl: './squash-card.html',
  styleUrl: './squash-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquashCard {
  protected readonly game = inject(BugSquashGame);

  protected pad(n: number, width: number): string {
    return String(n).padStart(width, '0');
  }
}
