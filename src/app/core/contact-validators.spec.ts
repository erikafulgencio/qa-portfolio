import { type ContactForm, normalizeContactForm, validateContact } from './contact-validators';

const valid: ContactForm = {
  name: 'Jane Tester',
  email: 'jane@acme.io',
  title: 'QA Lead role',
  message: 'We need someone to rebuild our regression strategy.',
};

const errorFor = (patch: Partial<ContactForm>) => validateContact({ ...valid, ...patch });

describe('validateContact', () => {
  it('accepts a complete, realistic message', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it.each([
    [{ name: '' }, 'name', 'Your name is required.'],
    [{ name: '   ' }, 'name', 'Your name is required.'],
    [{ name: 'J' }, 'name', 'Please enter at least 2 characters.'],
    [{ email: '' }, 'email', 'An email address is required.'],
    [{ email: 'jane@acme' }, 'email', 'That is not a valid email address.'],
    [{ email: 'jane acme.io' }, 'email', 'That is not a valid email address.'],
    [
      { email: 'jane@mailinator.com' },
      'email',
      'Disposable or placeholder domains are not accepted.',
    ],
    [{ email: 'Jane@EXAMPLE.com' }, 'email', 'Disposable or placeholder domains are not accepted.'],
    [{ email: 'test@acme.io' }, 'email', 'Please use a real email address I can reply to.'],
    [{ email: 'no-reply@acme.io' }, 'email', 'Please use a real email address I can reply to.'],
    [{ title: '' }, 'title', 'A subject is required.'],
    [{ title: 'Hi' }, 'title', 'Please give the message a clearer subject.'],
    [{ message: '' }, 'message', 'Please write a message.'],
    [{ message: 'Too short' }, 'message', 'A little more detail, please (10+ characters).'],
  ] as const)('%o → %s: %s', (patch, field, message) => {
    expect(errorFor(patch)[field]).toBe(message);
  });

  it('checks boundaries after trimming', () => {
    expect(errorFor({ name: ' Jo ' }).name).toBeUndefined();
    expect(errorFor({ title: 'Hey' }).title).toBeUndefined();
    expect(errorFor({ message: '  1234567890  ' }).message).toBeUndefined();
  });

  it('reports every invalid field at once', () => {
    expect(Object.keys(validateContact({ name: '', email: '', title: '', message: '' }))).toEqual([
      'name',
      'email',
      'title',
      'message',
    ]);
  });
});

describe('normalizeContactForm', () => {
  it('trims, lowercases the email and caps lengths', () => {
    const out = normalizeContactForm({
      name: '  Jane  ',
      email: ' JANE@Acme.IO ',
      title: 'x'.repeat(80),
      message: 'm'.repeat(400),
    });
    expect(out.name).toBe('Jane');
    expect(out.email).toBe('jane@acme.io');
    expect(out.title).toHaveLength(50);
    expect(out.message).toHaveLength(255);
  });
});
