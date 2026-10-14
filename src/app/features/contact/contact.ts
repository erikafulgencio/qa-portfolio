import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CONTACT_LINKS, PROFILE } from '../../content/profile';
import { HubspotForm } from '../../shared/hubspot-form/hubspot-form';

@Component({
  selector: 'app-contact-page',
  imports: [HubspotForm],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPage {
  protected readonly links = CONTACT_LINKS;
  protected readonly coffeeHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Coffee chat')}`;

  protected isExternal(href: string): boolean {
    return /^https?:/.test(href);
  }
}
