import { LowerCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CONTACT_LINKS } from '../../../content/profile';
import { ContactReveal } from '../../../core/contact-reveal.service';
import { CoffeeLink } from '../../../shared/coffee-link';
import { ContactForm } from '../../../shared/contact-form/contact-form';

@Component({
  selector: 'app-contact-card',
  imports: [RouterLink, CoffeeLink, ContactForm, LowerCasePipe],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCard {
  protected readonly links = CONTACT_LINKS;
  protected readonly reveal = inject(ContactReveal);

  protected isExternal(href: string): boolean {
    return href.startsWith('http');
  }
}
