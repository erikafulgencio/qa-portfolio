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
  /** The certification lines in the Professional hero pill; each one stays on a single line. */
  certificationLines: ['ISTQB® CTAL-Test Management', 'ISTQB® CTFL Certified'],
  /** Public verification: the official U.S. List of Certified Software Testers (AT*SQA). */
  certifiedTesterProfile:
    'https://atsqa.org/certified-testers/profile/e780bc9c6aed404185615527cab3bf09',
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

/** Official ISTQB® Certified Tester badges, as issued with the AT*SQA listing. */
export const CERT_BADGES = [
  {
    src: 'assets/img/certs/istqb-ctal-tm.webp',
    srcset: 'assets/img/certs/istqb-ctal-tm.webp 1x, assets/img/certs/istqb-ctal-tm@2x.webp 2x',
    alt: 'ISTQB® Certified Tester, Advanced Level Test Management badge',
  },
  {
    src: 'assets/img/certs/istqb-ctfl.webp',
    srcset: 'assets/img/certs/istqb-ctfl.webp 1x, assets/img/certs/istqb-ctfl@2x.webp 2x',
    alt: 'ISTQB® Certified Tester, Foundation Level badge',
  },
] as const;
