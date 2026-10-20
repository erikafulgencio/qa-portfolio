import { DEV_PROJECTS, QUESTS } from '../../content/projects';
import { PRO_PROJECTS, findProject, hasCaseStudy, nextProject, questLink } from './project-lookup';

describe('project lookup', () => {
  it('lists the six automation side quests followed by the three development projects', () => {
    expect(PRO_PROJECTS).toHaveLength(9);
    expect(PRO_PROJECTS.slice(0, 6).every((p) => p.category === 'Automation project')).toBe(true);
    expect(PRO_PROJECTS.slice(6).map((p) => p.id)).toEqual(DEV_PROJECTS.map((p) => p.id));
  });

  it('uses the authored why when there is one, otherwise the subtitle', () => {
    expect(findProject('pw')?.why).toBe(findProject('pw')?.sub);
    expect(findProject('webdriver')?.why).toBe(QUESTS[0].why);
    expect(findProject('webdriver')?.why).not.toBe(findProject('webdriver')?.sub);
    expect(findProject('port')?.why).toBe(DEV_PROJECTS[0].why);
  });

  it('returns undefined for unknown or boss-fight ids', () => {
    expect(findProject('nope')).toBeUndefined();
    expect(findProject(undefined)).toBeUndefined();
    expect(findProject('breach')).toBeUndefined();
  });

  it('cycles to the next project and wraps at the end', () => {
    expect(nextProject('sel').id).toBe('pw');
    expect(nextProject('tools').id).toBe('webdriver');
  });

  it('carries a work-in-progress status through to the project view', () => {
    expect(findProject('webdriver')?.status).toBe('In progress');
    expect(findProject('pw')?.status).toBeUndefined();
  });

  it('routes boss fights to their case study and side quests to the project page', () => {
    const bossFights = QUESTS.filter((q) => q.type === 'Boss fight');
    expect(bossFights.every((q) => hasCaseStudy(q.id))).toBe(true);
    expect(questLink({ id: 'breach' })).toEqual(['/cases', 'breach']);
    expect(questLink({ id: 'sql' })).toEqual(['/projects', 'sql']);
  });
});
