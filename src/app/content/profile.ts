import type { ContactLink } from './models';
import { reveal } from './protect';

export const PROFILE = {
  name: 'Erika Fulgencio',
  title: 'Senior QA Engineer',
  alterTitle: 'The Glitchbane',
  alterLevel: 'LV.08',
  availability: 'Open to QA Roles, Consulting and Anything Quality',
  location: 'Manila, PH',
  timezone: 'GMT+8',
  yearsInQa: 8,
  certification: 'ISTQB® CTAL-TM and CTFL',
  /** Email address, encoded (see content/protect.ts). Use `profileEmail()` to read it. */
  emailCode: 'bW9jLmxpYW1nQG9pY25lZ2x1Zi5ha2lyZS5t',
  github: 'https://github.com/meafulgencio',
  codepen: 'https://codepen.io/meafulgencio',
  /** Set to a file under `public/` (e.g. `assets/erika-fulgencio-resume.pdf`) to show the download button. */
  resumePdfUrl: '',
} as const;

/** The email address, decoded at the moment it is needed (e.g. building a mailto: link). */
export function profileEmail(): string {
  return reveal(PROFILE.emailCode);
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    icon: 'ph-envelope-simple',
    label: 'Email',
    value: 'm.erika••••@gmail.com',
    href: '',
    dur: '6s',
    protect: { kind: 'email', code: PROFILE.emailCode },
  },
  {
    icon: 'ph-linkedin-logo',
    label: 'LinkedIn',
    value: 'linkedin.com/in/meafulgencio',
    href: 'https://www.linkedin.com/in/meafulgencio',
    dur: '7.5s',
  },
  {
    icon: 'ph-github-logo',
    label: 'GitHub',
    value: 'github.com/meafulgencio',
    href: PROFILE.github,
    dur: '6.8s',
  },
  {
    icon: 'ph-codepen-logo',
    label: 'CodePen',
    value: 'front-end experiments',
    href: PROFILE.codepen,
    dur: '8.2s',
  },
  {
    icon: 'ph-phone',
    label: 'Phone',
    value: '+63 9•• ••• ••89',
    href: '',
    dur: '7s',
    protect: { kind: 'phone', code: 'OTgwNC02MzUtMDI5IDM2Kw==' },
  },
  {
    icon: 'ph-chat-circle-dots',
    label: 'Viber',
    value: '+63 9•• ••• ••61',
    href: '',
    dur: '7.8s',
    protect: { kind: 'viber', code: 'MTY5Ni00NTQtMzI5IDM2Kw==' },
  },
];
