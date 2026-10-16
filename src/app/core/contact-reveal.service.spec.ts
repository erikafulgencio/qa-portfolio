import { TestBed } from '@angular/core/testing';

import { CONTACT_LINKS, PROFILE, profileEmail } from '../content/profile';
import { ContactReveal } from './contact-reveal.service';

const link = (label: string) => CONTACT_LINKS.find((l) => l.label === label)!;

describe('ContactReveal', () => {
  let reveal: ContactReveal;

  beforeEach(() => {
    reveal = TestBed.inject(ContactReveal);
  });

  it('keeps protected details masked, with no link, until shown', () => {
    for (const label of ['Email', 'Phone', 'Viber']) {
      expect(reveal.isHidden(link(label))).toBe(true);
      expect(reveal.value(link(label))).toContain('•');
      expect(reveal.href(link(label))).toBe('');
    }
  });

  it('builds the right link for each kind once shown', () => {
    for (const label of ['Email', 'Phone', 'Viber']) reveal.show(link(label));
    expect(reveal.href(link('Email'))).toBe(`mailto:${profileEmail()}`);
    expect(reveal.href(link('Phone'))).toMatch(/^tel:\+63\d{10}$/);
    expect(reveal.href(link('Viber'))).toMatch(/^viber:\/\/chat\?number=%2B63\d{10}$/);
    expect(reveal.value(link('Phone'))).toMatch(/^\+63 \d{3}-\d{3}-\d{4}$/);
  });

  it('leaves ordinary links alone', () => {
    expect(reveal.isHidden(link('LinkedIn'))).toBe(false);
    expect(reveal.href(link('LinkedIn'))).toMatch(/^https:\/\/www\.linkedin\.com\//);
  });

  it('never stores a detail as readable text', () => {
    const source = JSON.stringify({ PROFILE, CONTACT_LINKS });
    expect(source).not.toContain(profileEmail());
    expect(source).not.toMatch(/\d{3}-\d{3}-\d{4}/);
    // The masked forms can't be matched by address or number harvesting patterns.
    expect(source).not.toMatch(/[\w.+-]+@[\w-]+\.\w+/);
  });
});
