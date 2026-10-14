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
  value: string;
  href: string;
  /** Float animation duration. */
  dur: string;
}
