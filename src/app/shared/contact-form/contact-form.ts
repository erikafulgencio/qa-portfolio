import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { ContactService } from '../../core/contact.service';
import {
  CONTACT_FIELDS,
  FIELD_MAX,
  type ContactField,
  type ContactForm as ContactFormValue,
  emptyContactForm,
  normalizeContactForm,
  validateContact,
} from '../../core/contact-validators';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

interface FieldDef {
  key: Exclude<ContactField, 'message'>;
  label: string;
  type: 'text' | 'email';
  placeholder: string;
  autocomplete: string;
}

let nextFormId = 0;

/** Contact form shared by the Professional home page and the Contact page. */
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  private readonly contact = inject(ContactService);
  private readonly formEl = viewChild.required<ElementRef<HTMLFormElement>>('form');

  protected readonly uid = `cf${nextFormId++}`;
  protected readonly max = FIELD_MAX;
  protected readonly fields: FieldDef[] = [
    { key: 'name', label: 'Name', type: 'text', placeholder: 'John Doe', autocomplete: 'name' },
    {
      key: 'email',
      label: 'Email address',
      type: 'email',
      placeholder: 'john@company.com',
      autocomplete: 'email',
    },
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Senior QA Engineer role at Acme',
      autocomplete: 'off',
    },
  ];

  protected readonly value = signal<ContactFormValue>(emptyContactForm());
  protected readonly touched = signal<Partial<Record<ContactField, boolean>>>({});
  protected readonly honeypot = signal('');
  protected readonly status = signal<Status>('idle');
  protected readonly mailtoHref = signal('');

  protected readonly errors = computed(() => validateContact(this.value()));
  protected readonly usesHubSpot = this.contact.usesHubSpot;

  protected visibleError(key: ContactField): string | undefined {
    return this.touched()[key] ? this.errors()[key] : undefined;
  }

  protected set(key: ContactField, raw: string): void {
    this.value.update((v) => ({ ...v, [key]: raw.slice(0, FIELD_MAX[key]) }));
  }

  protected touch(key: ContactField): void {
    this.touched.update((t) => ({ ...t, [key]: true }));
  }

  protected async submit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.status() === 'sending') return;

    const errors = this.errors();
    const firstInvalid = CONTACT_FIELDS.find((k) => errors[k]);
    if (firstInvalid) {
      this.touched.set({ name: true, email: true, title: true, message: true });
      this.formEl().nativeElement.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // Bots fill every field, including the hidden one; pretend success and send nothing.
    if (this.honeypot()) {
      this.status.set('sent');
      return;
    }

    this.status.set('sending');
    try {
      const result = await this.contact.send(this.value());
      if (result === 'mailto')
        this.mailtoHref.set(this.contact.mailtoHref(normalizeContactForm(this.value())));
      this.status.set(result);
    } catch {
      this.status.set('error');
    }
  }

  protected reset(): void {
    this.value.set(emptyContactForm());
    this.touched.set({});
    this.status.set('idle');
  }
}
