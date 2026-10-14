import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

import { ModeService } from '../core/mode.service';
import { ALTER_NAV, MODE_OPTIONS, PRO_NAV, isNavActive, type NavItem } from '../core/navigation';
import { ScrollService } from '../core/scroll.service';
import { PROFILE } from '../content/profile';
import { CoffeeLink } from '../shared/coffee-link';
import { Monogram } from '../shared/monogram';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, Monogram, CoffeeLink],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.solid]': 'solid()',
    '[class.menu-open]': 'menuOpen()',
  },
})
export class SiteHeader {
  protected readonly modeService = inject(ModeService);
  private readonly scroll = inject(ScrollService);
  private readonly router = inject(Router);

  protected readonly profile = PROFILE;
  protected readonly modes = MODE_OPTIONS;
  protected readonly menuOpen = signal(false);
  protected readonly solid = computed(() => this.scroll.y() > 24);
  protected readonly nav = computed(() => (this.modeService.isPro() ? PRO_NAV : ALTER_NAV));

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  constructor() {
    // Close the mobile menu after every navigation.
    effect(() => {
      this.url();
      untracked(() => this.menuOpen.set(false));
    });
  }

  protected isActive(item: NavItem): boolean {
    return isNavActive(item, this.url());
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
