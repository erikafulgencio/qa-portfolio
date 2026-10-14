import { SKILL_GROUPS } from '../../content/skills';
import { findSkill } from './skill-tree';

describe('findSkill', () => {
  it('returns the skill with its group as category', () => {
    const d = findSkill(SKILL_GROUPS, 'Playwright');
    expect(d.name).toBe('Playwright');
    expect(d.category).toBe('Automation testing');
    expect(d.note).toContain('end-to-end');
    expect(d.icon).toBe('ph-robot');
  });

  it('finds skills outside the first group', () => {
    expect(findSkill(SKILL_GROUPS, 'SQL').category).toBe('Languages');
  });

  it('falls back to the first skill for unknown names', () => {
    const d = findSkill(SKILL_GROUPS, 'Nope');
    expect(d.name).toBe(SKILL_GROUPS[0].items[0][0]);
  });
});
