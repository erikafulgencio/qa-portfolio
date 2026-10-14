import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { ABOUT_CHIPS, DEPTH_LAYERS, SHORT_BODY, SHORT_LEAD, SHORT_PULL } from '../../content/about';
import { CoffeeLink } from '../../shared/coffee-link';
import { AboutHobbies } from './about-hobbies';
import { ProAboutStory } from './pro-about-story';

@Component({
  selector: 'app-pro-about',
  imports: [CoffeeLink, ProAboutStory, AboutHobbies],
  templateUrl: './pro-about.html',
  styleUrl: './pro-about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAbout {
  protected readonly chips = ABOUT_CHIPS;
  protected readonly lead = SHORT_LEAD;
  protected readonly pull = SHORT_PULL;
  protected readonly body = SHORT_BODY;
  protected readonly layers = DEPTH_LAYERS;

  protected readonly showFull = signal(false);

  protected toggleStory(): void {
    this.showFull.update((v) => !v);
  }
}
