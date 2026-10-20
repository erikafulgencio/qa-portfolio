import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MINDSET_QUESTIONS } from '../../../content/home';
import { CERT_BADGES, PROFILE } from '../../../content/profile';

/** Professional hero: availability line, headline, CTAs, proof pill and the animated iceberg. */
@Component({
  selector: 'app-pro-hero',
  imports: [RouterLink],
  templateUrl: './pro-hero.html',
  styleUrl: './pro-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProHero {
  protected readonly profile = PROFILE;
  /** Foundation (blue) first, then Advanced Test Management (red). */
  protected readonly certBadges = [...CERT_BADGES].reverse();
  protected readonly mindset = MINDSET_QUESTIONS;
  protected readonly bubbles = [
    { cx: 296, cy: 392, r: 3.4, hot: false, dur: 6, delay: 0 },
    { cx: 314, cy: 428, r: 2.4, hot: true, dur: 7.5, delay: 1.4 },
    { cx: 98, cy: 404, r: 3, hot: false, dur: 8, delay: 2.6 },
    { cx: 82, cy: 352, r: 2, hot: true, dur: 6.8, delay: 3.6 },
  ];
}
