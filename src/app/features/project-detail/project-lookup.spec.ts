import { DEV_PROJECTS, QUESTS } from '../../content/projects';
import { PRO_PROJECTS, findProject, hasCaseStudy, nextProject, questLink } from './project-lookup';

describe('project lookup', () => {
  it('lists the five automation side quests followed by the three development projects', () => {
    expect(PRO_PROJECTS).toHaveLength(8);
    expect(PRO_PROJECTS.slice(0, 5).every((p) => p.category === 'Automation project')).toBe(true);
    expect(PRO_PROJECTS.slice(5).map((p) => p.id)).toEqual(DEV_PROJECTS.map((p) => p.id));
  });

  it('uses the subtitle as the "why" for automation projects and the authored why for dev projects', () => {
    expect(findProject('pw')?.why).toBe(findProject('pw')?.sub);
    expect(findProject('port')?.why).toBe(DEV_PROJECTS[0].why);
  });

  it('returns undefined for unknown or boss-fight ids', () => {
    expect(findProject('nope')).toBeUndefined();
    expect(findProject(undefined)).toBeUndefined();
    expect(findProject('breach')).toBeUndefined();
  });

  it('cycles to the next project and wraps at the end', () => {
    expect(nextProject('sel').id).toBe('pw');
    expect(nextProject('tools').id).toBe('sel');
  });

  it('routes boss fights to their case study and side quests to the project page', () => {
    const bossFights = QUESTS.filter((q) => q.type === 'Boss fight');
    expect(bossFights.every((q) => hasCaseStudy(q.id))).toBe(true);
    expect(questLink({ id: 'breach' })).toEqual(['/cases', 'breach']);
    expect(questLink({ id: 'sql' })).toEqual(['/projects', 'sql']);
  });
});
