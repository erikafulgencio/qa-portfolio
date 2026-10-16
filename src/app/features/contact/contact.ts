import { LowerCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DOCUMENT, inject } from '@angular/core';

import { CONTACT_LINKS, profileEmail } from '../../content/profile';
import { ContactReveal } from '../../core/contact-reveal.service';
import { ContactForm } from '../../shared/contact-form/contact-form';

@Component({
  selector: 'app-contact-page',
  imports: [ContactForm, LowerCasePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPage {
  protected readonly links = CONTACT_LINKS;
  protected readonly reveal = inject(ContactReveal);
  private readonly document = inject(DOCUMENT);

  /** Opens a pre-addressed email; the address is decoded only at this moment. */
  protected bookCoffee(): void {
    const subject = encodeURIComponent('Coffee chat');
    this.document.defaultView?.location.assign(`mailto:${profileEmail()}?subject=${subject}`);
  }

  protected isExternal(href: string): boolean {
    return /^https?:/.test(href);
  }
}
