import { QUESTS } from '../../../content/projects';
import { questLink } from './alter-home';

describe('questLink', () => {
  const quest = (id: string) => QUESTS.find((q) => q.id === id)!;

  it('sends boss fights to their case study', () => {
    expect(questLink(quest('breach'))).toEqual(['/cases', 'breach']);
    expect(questLink(quest('ai'))).toEqual(['/cases', 'ai']);
  });

  it('sends side quests to their project page', () => {
    expect(questLink(quest('pw'))).toEqual(['/projects', 'pw']);
  });
});
