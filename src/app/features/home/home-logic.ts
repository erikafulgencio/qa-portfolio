import type { DevProject, IconName, Quest } from '../../content/models';

export type ProCategory = 'All' | 'Automation Projects' | 'Development Projects';

export const PRO_CATEGORIES: { label: ProCategory; icon: IconName }[] = [
  { label: 'All', icon: 'ph-squares-four' },
  { label: 'Automation Projects', icon: 'ph-robot' },
  { label: 'Development Projects', icon: 'ph-code' },
];

/** A project card on the Professional home page (automation quests + development projects). */
export interface ProProject {
  id: string;
  icon: IconName;
  kicker: string;
  title: string;
  sub: string;
  stack: string[];
  /** e.g. "In progress" while the project is still being built. */
  status?: string;
  category: Exclude<ProCategory, 'All'>;
}

/** Professional mode lists the automation "side quests" plus the development projects. */
export function proProjectBuckets(
  quests: Quest[],
  devProjects: DevProject[],
): Record<ProCategory, ProProject[]> {
  const auto: ProProject[] = quests
    .filter((q) => q.type === 'Side quest')
    .map(({ id, icon, kicker, title, sub, stack, status }) => ({
      id,
      icon,
      kicker,
      title,
      sub,
      stack,
      status,
      category: 'Automation Projects',
    }));
  const dev: ProProject[] = devProjects.map(({ id, icon, kicker, title, sub, stack }) => ({
    id,
    icon,
    kicker,
    title,
    sub,
    stack,
    category: 'Development Projects',
  }));
  return { All: [...auto, ...dev], 'Automation Projects': auto, 'Development Projects': dev };
}

/** Index arithmetic for carousels that wrap in both directions. */
export function wrapIndex(i: number, length: number): number {
  if (length <= 0) return 0;
  return ((i % length) + length) % length;
}

/** "Baytech BPO · 2025–2026" → "2025–2026". */
export function metaYear(meta: string): string {
  return (meta.split('·').pop() ?? '').trim();
}
