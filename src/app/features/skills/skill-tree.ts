import type { IconName, SkillGroup } from '../../content/models';

export interface SkillDetail {
  name: string;
  note: string;
  category: string;
  icon: IconName;
}

/** Looks up a skill by name across all groups, falling back to the first skill. */
export function findSkill(groups: SkillGroup[], name: string): SkillDetail {
  for (const g of groups) {
    const item = g.items.find(([n]) => n === name);
    if (item) return { name: item[0], note: item[1], category: g.name, icon: g.icon };
  }
  const g = groups[0];
  return { name: g.items[0][0], note: g.items[0][1], category: g.name, icon: g.icon };
}
