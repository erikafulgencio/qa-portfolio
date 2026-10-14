import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CaseCarousel } from './case-carousel';
import { ContactCard } from './contact-card';
import { HowIWork } from './how-i-work';
import { ProHero } from './pro-hero';
import { ProjectsCard } from './projects-card';
import { SquashCard } from './squash-card';

/** Professional home: a stack of white sheet cards over a soft lavender page. */
@Component({
  selector: 'app-pro-home',
  imports: [ProHero, ProjectsCard, CaseCarousel, HowIWork, ContactCard, SquashCard],
  template: `
    <div class="orb" aria-hidden="true"></div>
    <app-pro-hero />
    <app-projects-card />
    <app-case-carousel />
    <app-how-i-work />
    <app-contact-card />
    <app-squash-card />
  `,
  styles: `
    @use 'mixins' as *;

    :host {
      position: relative;
      display: block;
      overflow: hidden;
      border-bottom: 1px solid ac(18%);
    }

    .orb {
      position: absolute;
      top: -180px;
      right: -140px;
      width: 540px;
      height: 540px;
      border-radius: 50%;
      background: radial-gradient(circle, ac(22%), transparent 68%);
      filter: blur(16px);
      animation: g-float 20s ease-in-out infinite;
      pointer-events: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProHome {}
