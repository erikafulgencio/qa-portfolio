export interface ContactForm {
  name: string;
  email: string;
  /** Subject line. */
  title: string;
  message: string;
}

export type ContactField = keyof ContactForm;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const CONTACT_FIELDS: readonly ContactField[] = ['name', 'email', 'title', 'message'];

export const FIELD_MAX: Record<ContactField, number> = {
  name: 50,
  email: 50,
  title: 50,
  message: 255,
};

export const DISPOSABLE_DOMAINS: readonly string[] = [
  'mailinator.com',
  'yopmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'tempmail.com',
  'temp-mail.org',
  'trashmail.com',
  'sharklasers.com',
  'getnada.com',
  'dispostable.com',
  'throwawaymail.com',
  'mailnesia.com',
  'fakeinbox.com',
  'maildrop.cc',
  'example.com',
  'test.com',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
const PLACEHOLDER_LOCAL_PART = /^(test|asdf|abc|dummy|sample|noreply|no-reply|qwerty|aaa|a)$/;

export function emptyContactForm(): ContactForm {
  return { name: '', email: '', title: '', message: '' };
}

/** Trims and caps every field the way the inputs do while typing. */
export function normalizeContactForm(form: ContactForm): ContactForm {
  return {
    name: form.name.trim().slice(0, FIELD_MAX.name),
    email: form.email.trim().toLowerCase().slice(0, FIELD_MAX.email),
    title: form.title.trim().slice(0, FIELD_MAX.title),
    message: form.message.trim().slice(0, FIELD_MAX.message),
  };
}

/** Returns a message per invalid field; an empty object means the form can be sent. */
export function validateContact(form: ContactForm): ContactErrors {
  const { name, email, title, message } = normalizeContactForm(form);
  const errors: ContactErrors = {};

  if (!name) errors.name = 'Your name is required.';
  else if (name.length < 2) errors.name = 'Please enter at least 2 characters.';

  if (!email) errors.email = 'An email address is required.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'That is not a valid email address.';
  else if (DISPOSABLE_DOMAINS.includes(email.split('@')[1]))
    errors.email = 'Disposable or placeholder domains are not accepted.';
  else if (PLACEHOLDER_LOCAL_PART.test(email.split('@')[0]))
    errors.email = 'Please use a real email address I can reply to.';

  if (!title) errors.title = 'A subject is required.';
  else if (title.length < 3) errors.title = 'Please give the message a clearer subject.';

  if (!message) errors.message = 'Please write a message.';
  else if (message.length < 10) errors.message = 'A little more detail, please (10+ characters).';

  return errors;
}
