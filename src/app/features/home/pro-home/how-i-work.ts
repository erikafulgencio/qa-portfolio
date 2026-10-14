import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LEAVE_BEHIND, LOOP_STAGES, PRINCIPLES, RITUALS, SIGNALS } from '../../../content/home';

@Component({
  selector: 'app-how-i-work',
  templateUrl: './how-i-work.html',
  styleUrl: './how-i-work.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowIWork {
  protected readonly principles = PRINCIPLES;
  protected readonly loop = LOOP_STAGES;
  protected readonly leaveBehind = LEAVE_BEHIND;
  protected readonly signals = SIGNALS;
  protected readonly rituals = RITUALS;
}
