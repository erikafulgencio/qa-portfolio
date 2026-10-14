import { CASES } from '../../content/cases';
import type { CaseStudy } from '../../content/models';
import { caseSections, nextCase, pad2, readMins } from './case-study.utils';

const base: Pick<CaseStudy, 'problem' | 'problemParas' | 'actions' | 'challenges' | 'learnings'> = {
  problem: '',
  problemParas: [],
  actions: [],
  challenges: [],
  learnings: [],
};

describe('case study utils', () => {
  it('pads numbers to two digits', () => {
    expect(pad2(1)).toBe('01');
    expect(pad2(12)).toBe('12');
  });

  it('never reports less than three minutes', () => {
    expect(readMins({ ...base, problem: 'short' })).toBe(3);
  });

  it('counts problem text (or paragraphs) plus action descriptions at 900 chars per minute', () => {
    const actions = [{ n: '1', t: 't', d: 'x'.repeat(2700) }];
    expect(readMins({ ...base, problem: 'y'.repeat(1800), actions })).toBe(5);
    expect(readMins({ ...base, problemParas: ['y'.repeat(4500)] })).toBe(5);
  });

  it('numbers only the sections a case has', () => {
    expect(caseSections(base).map((s) => [s.id, s.n])).toEqual([
      ['cs-situation', '01'],
      ['cs-did', '02'],
      ['cs-results', '03'],
    ]);
    const full = caseSections({
      challenges: [{ t: 'a', d: 'b' }],
      learnings: [{ t: 'c', d: 'd' }],
    });
    expect(full.map((s) => s.n)).toEqual(['01', '02', '03', '04', '05']);
    expect(full[1].label).toBe('The challenge');
  });

  it('wraps to the first case after the last', () => {
    expect(nextCase(CASES, CASES[0].id).id).toBe(CASES[1].id);
    expect(nextCase(CASES, CASES[CASES.length - 1].id).id).toBe(CASES[0].id);
  });
});
