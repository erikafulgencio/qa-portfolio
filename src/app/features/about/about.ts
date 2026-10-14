import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ModeService } from '../../core/mode.service';
import { AlterAbout } from './alter-about';
import { ProAbout } from './pro-about';

/** About page: the Professional origin story or the Alter Ego "Lore", depending on site mode. */
@Component({
  selector: 'app-about-page',
  imports: [ProAbout, AlterAbout],
  template: `
    @if (mode.isPro()) {
      <app-pro-about />
    } @else {
      <app-alter-about />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPage {
  protected readonly mode = inject(ModeService);
}
