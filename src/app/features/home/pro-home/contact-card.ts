import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CONTACT_LINKS } from '../../../content/profile';
import { CoffeeLink } from '../../../shared/coffee-link';
import { HubspotForm } from '../../../shared/hubspot-form/hubspot-form';

@Component({
  selector: 'app-contact-card',
  imports: [RouterLink, CoffeeLink, HubspotForm],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCard {
  protected readonly links = CONTACT_LINKS;

  protected isExternal(href: string): boolean {
    return href.startsWith('http');
  }
}
