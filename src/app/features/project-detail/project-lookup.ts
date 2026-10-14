import { CASES } from '../../content/cases';
import type { IconName, Quest } from '../../content/models';
import { DEV_PROJECTS, QUESTS } from '../../content/projects';

export type ProjectCategory = 'Automation project' | 'Development project';

/** A project as listed in Professional mode: the automation side quests plus the development projects. */
export interface ProjectView {
  id: string;
  icon: IconName;
  kicker: string;
  title: string;
  sub: string;
  bullets: string[];
  stack: string[];
  why: string;
  category: ProjectCategory;
  cta?: string;
}

export const PRO_PROJECTS: ProjectView[] = [
  ...QUESTS.filter((q) => q.type === 'Side quest').map((q): ProjectView => ({
    id: q.id,
    icon: q.icon,
    kicker: q.kicker,
    title: q.title,
    sub: q.sub,
    bullets: q.bullets,
    stack: q.stack,
    why: q.sub,
    category: 'Automation project',
    cta: q.cta,
  })),
  ...DEV_PROJECTS.map((p): ProjectView => ({ ...p, category: 'Development project' })),
];

export function findProject(id: string | undefined): ProjectView | undefined {
  return PRO_PROJECTS.find((p) => p.id === id);
}

/** Boss fights are told as case studies; their project URL should forward there. */
export function hasCaseStudy(id: string | undefined): boolean {
  return CASES.some((c) => c.id === id);
}

/** The next project in the Professional list, wrapping around. */
export function nextProject(id: string): ProjectView {
  const i = PRO_PROJECTS.findIndex((p) => p.id === id);
  return PRO_PROJECTS[(i + 1) % PRO_PROJECTS.length];
}

/** Router link for a quest card: the case study when one exists, otherwise the project page. */
export function questLink(q: Pick<Quest, 'id'>): string[] {
  return hasCaseStudy(q.id) ? ['/cases', q.id] : ['/projects', q.id];
}
