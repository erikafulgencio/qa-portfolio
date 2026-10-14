import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ModeService } from '../../core/mode.service';
import { AlterHome } from './alter-home/alter-home';
import { ProHome } from './pro-home/pro-home';

@Component({
  selector: 'app-home-page',
  imports: [ProHome, AlterHome],
  template: `
    @if (mode.isPro()) {
      <app-pro-home />
    } @else {
      <app-alter-home />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  protected readonly mode = inject(ModeService);
}
