/** Phosphor icon class name, e.g. `ph-bug`. Rendered by `<app-icon>`. */
export type IconName = `ph-${string}`;

export interface TitledText {
  t: string;
  d: string;
}

export interface NumberedText extends TitledText {
  n: string;
}

export interface Stat {
  /** Headline value, e.g. "80% in 2 days". */
  v: string;
  /** Caption under the value. */
  k: string;
}

export type QuestType = 'Boss fight' | 'Side quest';

/** A project as shown on the Projects page. Boss fights have a matching case study. */
export interface Quest {
  id: string;
  type: QuestType;
  icon: IconName;
  kicker: string;
  rank: string;
  title: string;
  sub: string;
  bullets: string[];
  stack: string[];
  cta?: string;
}

/** A screenshot under `public/`, e.g. `assets/img/projects/portfolio-pro-desktop.webp`. */
export interface Snapshot {
  src: string;
  /** Responsive candidates, e.g. "a-720.webp 720w, a.webp 1440w"; phones download the small one. */
  srcset?: string;
  alt: string;
  /** Short label shown with the image, e.g. "Professional · home". */
  caption: string;
}

/**
 * Artwork drawn for a development project: `site` frames real screenshots in a browser,
 * `editor` is an animated code pen, `terminal` an animated shell session.
 */
export type DevArt = 'site' | 'editor' | 'terminal';

export interface ExternalLink {
  label: string;
  href: string;
  icon: IconName;
}

/** Development project, only listed in Professional mode. */
export interface DevProject {
  id: string;
  icon: IconName;
  kicker: string;
  title: string;
  sub: string;
  bullets: string[];
  stack: string[];
  why: string;
  art: DevArt;
  /** Short facts that float over the artwork as glass chips (keep them to a few words). */
  highlights?: { icon: IconName; label: string }[];
  /** For `site` art: two desktop captures the browser wipes between on a loop (e.g. both modes). */
  screens?: [Snapshot, Snapshot];
  /** Screenshots listed on the project page. */
  gallery?: Snapshot[];
  links?: ExternalLink[];
}

export interface WorkArtifact {
  icon: IconName;
  name: string;
  desc: string;
}

export interface CaseStudy {
  id: string;
  icon: IconName;
  kicker: string;
  title: string;
  headline: string;
  sub: string;
  meta: string;
  role: string;
  stats: Stat[];
  glance: { k: string; v: string }[];
  problem: string;
  problemParas: string[];
  challenges: TitledText[];
  actions: NumberedText[];
  results: string[];
  closing: string;
  learnings: TitledText[];
  skills: string[];
  lesson: string;
  docs: string[];
  tools: string[];
}

export interface SkillGroup {
  name: string;
  icon: IconName;
  /** [skill name, note shown in the detail panel] */
  items: [string, string][];
}

export interface TrainingItem {
  icon: IconName;
  label: string;
  /** Progress as a CSS percentage, e.g. "65%". */
  pct: string;
}

export interface Certification {
  icon: IconName;
  badge: string;
  title: string;
  issuer: string;
  /** Optional certificate image under `public/`. A placeholder renders when absent. */
  image?: string;
}

export interface Award {
  id: string;
  icon: IconName;
  title: string;
  meta: string;
  story: string;
}

export interface StoryAct {
  n: string;
  icon: IconName;
  title: string;
  paras: string[];
  list: string[];
  quote: string;
}

export interface HobbyShot {
  label: string;
  /** Image under `public/`. A placeholder renders when absent. */
  src?: string;
}

export interface Hobby {
  icon: IconName;
  t: string;
  d: string;
  shots: HobbyShot[];
}

export interface Interest {
  icon: IconName;
  title: string;
  body: string;
}

export interface SpotRow {
  id: string;
  label: string;
  status: string;
  bug: boolean;
}

export interface ChartBar {
  year: string;
  /** Bar height as a CSS percentage. */
  h: string;
  label: string;
  level: 'junior' | 'mid' | 'lead';
}

export interface Job {
  dates: string;
  /** Initials shown in the logo tile. */
  mark: string;
  logo?: string;
  domain: string;
  role: string;
  company: string;
  points: string[];
}

export interface HudStat {
  k: string;
  v: string;
  icon: IconName;
  /** Bar fill as a CSS percentage. */
  w: string;
}

export interface ContactLink {
  icon: IconName;
  label: string;
  /** Shown text. For a protected detail, its masked form, e.g. "+63 9•• ••• ••89". */
  value: string;
  /** Link target. Empty for a protected detail: it is built from `protect` once revealed. */
  href: string;
  /** Float animation duration. */
  dur: string;
  /** A personal detail kept away from scrapers: encoded (scripts/protect.mjs), revealed on tap. */
  protect?: { kind: 'email' | 'phone' | 'viber'; code: string };
}
