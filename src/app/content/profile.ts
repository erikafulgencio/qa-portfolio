import type { ContactLink } from './models';

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
  email: 'm.erika.fulgencio@gmail.com',
  github: 'https://github.com/meafulgencio',
  codepen: 'https://codepen.io/meafulgencio',
  /** Set to a file under `public/` (e.g. `assets/erika-fulgencio-resume.pdf`) to show the download button. */
  resumePdfUrl: '',
} as const;

export const CONTACT_LINKS: ContactLink[] = [
  {
    icon: 'ph-envelope-simple',
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    dur: '6s',
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
    value: '+63 XXX-XXX-XXXX',
    href: 'tel:+63XXXXXXXXXX',
    dur: '7s',
  },
  {
    icon: 'ph-chat-circle-dots',
    label: 'Viber',
    value: '+63 XXX-XXX-XXXX',
    href: 'viber://chat?number=%2B63XXXXXXXXXX',
    dur: '7.8s',
  },
];
