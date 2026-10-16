import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

import type { ContactLink } from '../content/models';
import { reveal } from '../content/protect';

/**
 * Reveal-on-tap for protected contact details (see content/protect.ts). Root-scoped, so a detail
 * revealed on Home stays revealed on the Contact page.
 */
@Injectable({ providedIn: 'root' })
export class ContactReveal {
  private readonly document = inject(DOCUMENT);
  private readonly revealed = signal<ReadonlySet<string>>(new Set());

  isHidden(link: ContactLink): boolean {
    return !!link.protect && !this.revealed().has(link.label);
  }

  value(link: ContactLink): string {
    return link.protect && !this.isHidden(link) ? reveal(link.protect.code) : link.value;
  }

  href(link: ContactLink): string {
    if (!link.protect) return link.href;
    if (this.isHidden(link)) return '';
    const value = reveal(link.protect.code);
    const digits = value.replace(/[^\d+]/g, '');
    switch (link.protect.kind) {
      case 'email':
        return `mailto:${value}`;
      case 'phone':
        return `tel:${digits}`;
      case 'viber':
        return `viber://chat?number=${encodeURIComponent(digits)}`;
    }
  }

  /** Shows the detail. On a phone, a number also opens the dialler or Viber on the same tap. */
  show(link: ContactLink): void {
    this.revealed.update((set) => new Set(set).add(link.label));
    const touch = this.document.defaultView?.matchMedia?.('(hover: none)').matches;
    if (touch && link.protect?.kind !== 'email') {
      this.document.defaultView?.location.assign(this.href(link));
    }
  }
}
