import type { CaseStudy } from '../../content/models';

export type CaseSectionId =
  'cs-situation' | 'cs-challenge' | 'cs-did' | 'cs-results' | 'cs-learned';

export interface CaseSection {
  id: CaseSectionId;
  label: string;
  /** Two-digit number, assigned only to sections the case actually has. */
  n: string;
}

export const pad2 = (n: number): string => String(n).padStart(2, '0');

/** Estimated reading time in minutes (never less than three). */
export function readMins(c: Pick<CaseStudy, 'problem' | 'problemParas' | 'actions'>): number {
  const problem = c.problem || c.problemParas.join(' ');
  const actions = c.actions.reduce((n, a) => n + a.d.length, 0);
  return Math.max(3, Math.round((problem.length + actions) / 900));
}

/** The case's sections in reading order, numbered by presence. */
export function caseSections(c: Pick<CaseStudy, 'challenges' | 'learnings'>): CaseSection[] {
  const all: [CaseSectionId, string, boolean][] = [
    ['cs-situation', 'The situation', true],
    ['cs-challenge', 'The challenge', c.challenges.length > 0],
    ['cs-did', 'What I did', true],
    ['cs-results', 'The results', true],
    ['cs-learned', 'What I learned', c.learnings.length > 0],
  ];
  return all.filter(([, , on]) => on).map(([id, label], i) => ({ id, label, n: pad2(i + 1) }));
}

/** The next case in the list, wrapping around. */
export function nextCase<T extends { id: string }>(cases: readonly T[], id: string): T {
  const i = cases.findIndex((c) => c.id === id);
  return cases[(i + 1) % cases.length];
}
