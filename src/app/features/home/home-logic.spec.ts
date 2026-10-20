import { DEV_PROJECTS, QUESTS } from '../../content/projects';
import { metaYear, proProjectBuckets, wrapIndex } from './home-logic';

describe('home logic', () => {
  describe('proProjectBuckets', () => {
    const buckets = proProjectBuckets(QUESTS, DEV_PROJECTS);

    it('lists the 6 automation side quests and 3 development projects', () => {
      expect(buckets['Automation Projects'].length).toBe(6);
      expect(buckets['Development Projects'].length).toBe(3);
      expect(buckets.All.length).toBe(9);
    });

    it('never shows boss fights (those are case studies)', () => {
      const bossIds = QUESTS.filter((q) => q.type === 'Boss fight').map((q) => q.id);
      expect(buckets.All.some((p) => bossIds.includes(p.id))).toBe(false);
    });

    it('keeps automation projects ahead of development projects in "All"', () => {
      expect(buckets.All.map((p) => p.category)).toEqual([
        ...Array(6).fill('Automation Projects'),
        ...Array(3).fill('Development Projects'),
      ]);
    });
  });

  describe('wrapIndex', () => {
    it('wraps forwards and backwards', () => {
      expect(wrapIndex(5, 5)).toBe(0);
      expect(wrapIndex(-1, 5)).toBe(4);
      expect(wrapIndex(7, 5)).toBe(2);
      expect(wrapIndex(-6, 5)).toBe(4);
    });

    it('is safe for empty lists', () => {
      expect(wrapIndex(3, 0)).toBe(0);
    });
  });

  it('metaYear takes the part after the last separator', () => {
    expect(metaYear('Baytech BPO · 2025–2026')).toBe('2025–2026');
    expect(metaYear('2025')).toBe('2025');
  });
});
