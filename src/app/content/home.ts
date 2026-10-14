// Content migrated verbatim from the Claude Design source. Edit freely; components read only from here.
import type { HudStat, NumberedText, TitledText, IconName } from './models';

export const MINDSET_QUESTIONS: string[] = [
  'What could go wrong?',
  'Why?',
  'What are we missing?',
  'How do we prevent it?',
  'How do we improve?',
];

export const PRINCIPLES: (TitledText & { icon: IconName })[] = [
  {
    icon: 'ph-magnifying-glass-plus',
    t: 'Analyze the requirement first',
    d: 'Most defects are decided before a line of code exists. I analyze what is missing while it is still cheap to change.',
  },
  {
    icon: 'ph-strategy',
    t: 'Risk decides the depth',
    d: 'Not everything deserves the same coverage. Money, data and trust paths get the hours; cosmetics get a checklist.',
  },
  {
    icon: 'ph-magnifying-glass',
    t: 'Root cause over reproduction',
    d: 'A ticket that names the layer that failed saves a developer half a day of guessing.',
  },
  {
    icon: 'ph-arrows-clockwise',
    t: 'Every escape updates the process',
    d: 'If a bug reached production, the interesting question is which gate let it through — not who wrote it.',
  },
];

export const LOOP_STAGES: NumberedText[] = [
  {
    n: '01',
    t: 'Read and interrogate',
    d: 'Requirements, designs, acceptance criteria — and the questions nobody asked yet.',
  },
  {
    n: '02',
    t: 'Risk-based planning',
    d: 'Where would failure hurt most? That becomes the test strategy and the order of work.',
  },
  {
    n: '03',
    t: 'Design with real oracles',
    d: 'Cases that state the expected result and why it is expected, not just steps to click.',
  },
  {
    n: '04',
    t: 'Execute and explore',
    d: 'Scripted passes for coverage, exploratory sessions for the things scripts never find.',
  },
  {
    n: '05',
    t: 'Report with evidence',
    d: 'Reproducible steps, logs or API responses, severity and business impact in one place.',
  },
  {
    n: '06',
    t: 'Feed it back',
    d: 'Regression coverage, a process change, or a definition of done that closes the gap.',
  },
];

export const LEAVE_BEHIND: string[] = [
  'Test strategy and test plan mapped to product risk',
  'Test conditions, cases and data with stated expected results',
  'Traceability matrix from requirement to case to defect',
  'Test progress reports — daily or weekly, with blockers named',
  'Test completion report: coverage, residual risk, what we chose not to test',
  'Defect reports with evidence, severity, priority and business impact',
];

export const SIGNALS: TitledText[] = [
  {
    t: 'Defect escape rate',
    d: 'What reached users tells me where my coverage was optimistic.',
  },
  {
    t: 'Time to reproduce',
    d: 'Slow reproduction usually means weak logging or thin test data — both fixable.',
  },
  {
    t: 'Flaky test ratio',
    d: 'A suite nobody trusts is worse than no suite. Flakes get triaged like bugs.',
  },
  {
    t: 'Reopen rate',
    d: 'Reopened tickets point at unclear expected results, not careless developers.',
  },
];

export const RITUALS: TitledText[] = [
  {
    t: 'In refinement, not after it',
    d: 'I join grooming to raise testability and edge cases before estimates are locked.',
  },
  {
    t: 'Pair on the hard ones',
    d: 'Sitting with a developer on a stubborn defect beats four rounds of ticket comments.',
  },
  {
    t: 'Written triage, shared language',
    d: 'Severity and priority defined once, so the argument is about the product, not the labels.',
  },
  {
    t: 'Mentoring juniors',
    d: 'Teaching how to question a requirement scales further than reviewing their cases.',
  },
];

export const HUD_STATS: HudStat[] = [
  {
    k: 'Class',
    v: 'The Glitchbane',
    icon: 'ph-sword',
    w: '100%',
  },
  {
    k: 'Specialization',
    v: 'Defect Hunting',
    icon: 'ph-bug',
    w: '92%',
  },
  {
    k: 'Ultimate',
    v: 'Release Blocker',
    icon: 'ph-shield-check',
    w: '86%',
  },
  {
    k: 'Weakness',
    v: 'Coffee and puppies',
    icon: 'ph-coffee',
    w: '100%',
  },
];

export const CHARACTER_SHEET: { k: string; v: string }[] = [
  {
    k: 'Weapon',
    v: 'Keen Eyes & Curiosity',
  },
  {
    k: 'Passive',
    v: 'Nothing escapes scrutiny.',
  },
  {
    k: 'Specialization',
    v: 'Defect Hunting',
  },
  {
    k: 'Ultimate',
    v: 'Release Blocker — prevents critical defects from reaching production.',
  },
  {
    k: 'Weakness',
    v: 'Coffee and puppies',
  },
];

export const TICKER: string[] = [
  'Selenium',
  'Playwright',
  'Robot Framework',
  'Postman',
  'SQL',
  'Python',
  'Jira',
  'Zephyr',
  'BrowserStack',
  'AWS',
  'Claude Skills',
  'ISTQB CTFL',
];
