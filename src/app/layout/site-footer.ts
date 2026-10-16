import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ModeService } from '../core/mode.service';
import { PROFILE } from '../content/profile';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  template: `
    <footer>
      <div class="inner">
        <span
          >© {{ year }} {{ profile.name }} ·
          {{ mode.isPro() ? profile.title : profile.alterTitle }}</span
        >
        <nav class="links" aria-label="Footer">
          <a routerLink="/projects">{{ mode.isPro() ? 'Projects' : 'Quests' }}</a>
          <a routerLink="/resume">{{ mode.isPro() ? 'Résumé' : 'Campaign' }}</a>
          @if (mode.isPro()) {
            <a routerLink="/about">About</a>
          } @else {
            <a routerLink="/contact">Party up</a>
          }
        </nav>
      </div>
    </footer>
  `,
  styles: `
    @use 'mixins' as *;

    footer {
      border-top: 1px solid ac(16%);
    }

    .inner {
      max-width: 1220px;
      margin: 0 auto;
      padding: 24px 26px;
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      align-items: center;
      font-size: 11.5px;

      @include phone {
        font-size: 12.5px;
        // Room for the back-to-top button, so it never sits on the last links.
        padding: 24px 20px calc(80px + env(safe-area-inset-bottom, 0px));
        flex-direction: column;
        text-align: center;
      }
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: tx(55%);
    }

    .links {
      margin-left: auto;
      display: flex;
      gap: 16px;

      @include phone {
        margin-left: 0;
        justify-content: center;
        gap: 22px;
      }

      a {
        display: inline-flex;
        align-items: center;
        min-height: 24px; // WCAG 2.2 target size
        text-decoration: none;
        color: var(--gs-accent);

        @media (hover: hover) {
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly mode = inject(ModeService);
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
}
