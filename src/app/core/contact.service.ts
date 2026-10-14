import { HttpClient } from '@angular/common/http';
import { DOCUMENT, Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { PROFILE } from '../content/profile';
import { type ContactForm, normalizeContactForm } from './contact-validators';

export const HUBSPOT_SUBMIT_URL = 'https://api.hsforms.com/submissions/v3/integration/submit';

/** How a message left the site: posted to HubSpot, or handed to the visitor's email app. */
export type ContactResult = 'sent' | 'mailto';

export interface HubSpotConfig {
  portalId: string;
  formGuid: string;
}

/**
 * Sends contact messages through HubSpot's unauthenticated Forms v3 endpoint (CORS-enabled, free tier).
 * The HubSpot form must have CAPTCHA turned off, or HubSpot rejects API submissions with
 * FORM_HAS_RECAPTCHA_ENABLED. Without HubSpot configuration it falls back to a pre-filled mailto: link.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);

  /** Overridable in tests. */
  config: HubSpotConfig = environment.hubspot;

  get usesHubSpot(): boolean {
    return !!(this.config.portalId && this.config.formGuid);
  }

  async send(form: ContactForm): Promise<ContactResult> {
    const clean = normalizeContactForm(form);
    if (!this.usesHubSpot) {
      this.openMailto(clean);
      return 'mailto';
    }
    const { portalId, formGuid } = this.config;
    await firstValueFrom(
      this.http.post(`${HUBSPOT_SUBMIT_URL}/${portalId}/${formGuid}`, this.payload(clean)),
    );
    return 'sent';
  }

  /**
   * HubSpot submission body, using the form's default contact properties (First name, Last name,
   * Email, Message). The site's single Name field is split on the first space, and the subject is
   * prefixed into the message because the HubSpot form has no subject field.
   */
  payload(form: ContactForm) {
    const { first, last } = splitName(form.name);
    const field = (name: string, value: string) => ({ objectTypeId: '0-1', name, value });
    return {
      fields: [
        field('firstname', first),
        ...(last ? [field('lastname', last)] : []),
        field('email', form.email),
        field('message', `Subject: ${form.title}\n\n${form.message}`),
      ],
      context: {
        pageUri: this.document.location?.href ?? '',
        pageName: this.document.title,
      },
    };
  }

  mailtoHref(form: ContactForm): string {
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    return `mailto:${PROFILE.email}?subject=${encodeURIComponent(form.title)}&body=${encodeURIComponent(body)}`;
  }

  private openMailto(form: ContactForm): void {
    this.document.defaultView?.location.assign(this.mailtoHref(form));
  }
}

/** "Mary Ann Cruz" → first "Mary", last "Ann Cruz". A single word is a first name only. */
export function splitName(name: string): { first: string; last: string } {
  const [first = '', ...rest] = name.trim().split(/\s+/);
  return { first, last: rest.join(' ') };
}
