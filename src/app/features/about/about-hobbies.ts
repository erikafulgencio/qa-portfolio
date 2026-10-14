import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HOBBIES } from '../../content/about';
import { ImagePlaceholder } from '../../shared/image-placeholder';

/** "Off the clock": hobby cards, each with a slowly panning thumbnail strip. */
@Component({
  selector: 'app-about-hobbies',
  imports: [ImagePlaceholder],
  templateUrl: './about-hobbies.html',
  styleUrl: './about-hobbies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutHobbies {
  protected readonly hobbies = HOBBIES;

  /** Pan duration grows with the number of shots so each one stays readable. */
  protected panDuration(shots: number): string {
    return `${3 + 2.2 * shots}s`;
  }
}
