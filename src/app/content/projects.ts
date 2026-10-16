// Content migrated verbatim from the Claude Design source. Edit freely; components read only from here.
import type { DevProject, Quest, Snapshot, WorkArtifact } from './models';

/** Screenshots captured from the live site by `npm run snapshots`. */
const shot = (file: string, caption: string, alt: string): Snapshot => ({
  src: `assets/img/projects/${file}.webp`,
  srcset: `assets/img/projects/${file}-720.webp 720w, assets/img/projects/${file}.webp 1440w`,
  caption,
  alt,
});

const PORTFOLIO_PRO = shot(
  'portfolio-pro-desktop',
  'Professional · home',
  'The portfolio home page in Professional mode: a light lavender hero with an iceberg illustration.',
);
const PORTFOLIO_ALTER = shot(
  'portfolio-alter-desktop',
  'Alter Ego · home',
  'The portfolio home page in Alter Ego mode: a dark game-HUD hero with the Glitchbane character art.',
);

export const QUESTS: Quest[] = [
  {
    id: 'sel',
    type: 'Side quest',
    icon: 'ph-browsers',
    kicker: 'UI automation',
    rank: 'RANK A',
    title: 'Web regression suite',
    sub: 'Page-object structured regression pack for a multi-module web platform.',
    bullets: [
      'Page-object model with reusable component wrappers',
      'Data-driven cases fed from CSV and SQL fixtures',
      'Cross-browser runs pushed to BrowserStack',
    ],
    stack: ['Selenium', 'Python', 'SQL', 'BrowserStack'],
    cta: 'GitHub soon',
  },
  {
    id: 'pw',
    type: 'Side quest',
    icon: 'ph-lightning',
    kicker: 'End-to-end',
    rank: 'RANK A',
    title: 'Playwright E2E pack',
    sub: 'Fast parallel end-to-end coverage for critical user journeys.',
    bullets: [
      'Auth, checkout and account journeys in parallel projects',
      'Trace and video artifacts on failure for triage',
      'Runs on every build instead of on request',
    ],
    stack: ['Playwright', 'JavaScript', 'CI'],
    cta: 'GitHub soon',
  },
  {
    id: 'api',
    type: 'Side quest',
    icon: 'ph-plugs-connected',
    kicker: 'API testing',
    rank: 'RANK B',
    title: 'API collection & contract checks',
    sub: 'Postman collections covering auth flows, negative cases and data validation.',
    bullets: [
      'OAuth token handling and environment chaining',
      'Negative and boundary cases, not just happy paths',
      'Newman runs for repeatable regression',
    ],
    stack: ['Postman', 'Newman', 'OAuth'],
    cta: 'Sample on request',
  },
  {
    id: 'rf',
    type: 'Side quest',
    icon: 'ph-keyboard',
    kicker: 'Keyword-driven',
    rank: 'RANK B',
    title: 'Robot Framework suite',
    sub: 'Readable keyword tests for teams where non-coders review the tests.',
    bullets: [
      'Custom Python keyword libraries',
      'Shared resource files across squads',
      'Human-readable reports for stakeholders',
    ],
    stack: ['Robot Framework', 'Python'],
    cta: 'GitHub soon',
  },
  {
    id: 'sql',
    type: 'Side quest',
    icon: 'ph-database',
    kicker: 'Data validation',
    rank: 'RANK B',
    title: 'Back-end verification queries',
    sub: 'SQL sets that check what the UI claims against what the database stored.',
    bullets: [
      'Reconciliation queries for POS transactions',
      'Test data setup and teardown scripts',
      'Separates data defects from code defects',
    ],
    stack: ['SQL', 'MySQL', 'MSSQL'],
    cta: 'Sample on request',
  },
  {
    id: 'breach',
    type: 'Boss fight',
    icon: 'ph-shield-warning',
    kicker: 'Crisis response',
    rank: 'RAID',
    title: 'Zero Hour',
    sub: 'Led QA for an accelerated migration of the flagship AI platform — 8 engineers, thin requirements, executives watching.',
    bullets: [
      'Six test types coordinated in parallel',
      'Daily reporting straight to leadership',
      '8 engineers + 4 trainees kept steady',
    ],
    stack: ['Jira', 'Zephyr Scale', 'Selenium'],
    cta: 'Read the fight',
  },
  {
    id: 'ai',
    type: 'Boss fight',
    icon: 'ph-robot',
    kicker: 'AI-driven testing',
    rank: 'RAID',
    title: 'Custom Claude Skills for QA',
    sub: 'AI integrated into everyday QA work as a tool with guardrails, not a shortcut.',
    bullets: [
      'House templates encoded as Skills',
      'Review gate on every generated artifact',
      'Faster automation drafting',
    ],
    stack: ['Claude', 'Copilot', 'Playwright'],
    cta: 'Read the fight',
  },
  {
    id: 'uat',
    type: 'Boss fight',
    icon: 'ph-flask',
    kicker: 'Process',
    rank: 'ELITE',
    title: 'A room of our own',
    sub: 'Proposing and launching a dedicated UAT environment so production stopped being the test bed.',
    bullets: [
      'Cost of the missing environment made visible',
      'Entry and exit criteria written down',
      'Adopted across multiple pods',
    ],
    stack: ['Jira', 'AWS', 'RACI'],
    cta: 'Read the fight',
  },
  {
    id: 'chatbot',
    type: 'Boss fight',
    icon: 'ph-rocket-launch',
    kicker: 'Delivery',
    rank: 'ELITE',
    title: 'One week early',
    sub: 'Taking over an MVP AI chatbot mobile app mid-project as a first-time project coordinator.',
    bullets: [
      'Scope reconstructed into one tracked plan',
      'Weekly scrum for blocker resolution',
      'Closed out with full handover docs',
    ],
    stack: ['Jira', 'Trello', 'BlueStacks'],
    cta: 'Read the fight',
  },
  {
    id: 'bounty',
    type: 'Boss fight',
    icon: 'ph-bug',
    kicker: 'Team culture',
    rank: 'ELITE',
    title: 'Bug Hunt Bounty',
    sub: 'Turning defect discovery into something the team wanted to win.',
    bullets: [
      'Rewarded severity and report clarity, not volume',
      'Paired with QA Touchdown 1:1s',
      'Survived a crisis period intact',
    ],
    stack: ['Jira', 'Zephyr', 'Slack'],
    cta: 'Read the fight',
  },
];

export const DEV_PROJECTS: DevProject[] = [
  {
    id: 'port',
    icon: 'ph-layout',
    kicker: 'Front-end build',
    title: 'This portfolio',
    sub: 'A hand-built portfolio with two complete modes — a professional profile and a game-styled alter ego — sharing one codebase.',
    bullets: [
      'Two design systems driven by one theme switch',
      'Interactive QA mini-games built from scratch',
      'Animation and layout work done without a UI framework',
    ],
    stack: ['Angular', 'TypeScript', 'SCSS', 'Playwright'],
    why: 'A QA portfolio should show judgement, not just a CV. Building it myself also keeps my front-end reading sharp — it is easier to test what you have had to build.',
    art: 'site',
    highlights: [
      { icon: 'ph-swap', label: '2 modes · 1 codebase' },
      { icon: 'ph-check-circle', label: 'axe-checked in both modes' },
    ],
    screens: [PORTFOLIO_PRO, PORTFOLIO_ALTER],
    gallery: [
      PORTFOLIO_PRO,
      PORTFOLIO_ALTER,
      shot(
        'portfolio-pro-squash',
        'Mini game · Bug Squash',
        'Bug Squash mid-hunt: bugs crawl across a staging grid towards production.',
      ),
      shot(
        'portfolio-alter-about',
        'Mini game · Spot the defect',
        'The Alter Ego origin story page beside the Spot the defect mini game.',
      ),
      shot(
        'portfolio-pro-skills',
        'Professional · skill tree',
        'The Professional skills page: grouped skill cards and a currently-training panel.',
      ),
    ],
    links: [
      {
        label: 'Visit the live site',
        href: 'https://erikafulgencio.github.io/qa-portfolio/',
        icon: 'ph-globe',
      },
      {
        label: 'View source',
        href: 'https://github.com/erikafulgencio/qa-portfolio',
        icon: 'ph-github-logo',
      },
    ],
  },
  {
    id: 'pen',
    icon: 'ph-codepen-logo',
    kicker: 'Experiments',
    title: 'CodePen experiments',
    sub: 'Small front-end studies: components, motion, layout puzzles and CSS behaviour worth understanding.',
    bullets: [
      'Isolated components pulled out of real UI problems',
      'Motion and state studies I reuse in prototypes',
      'Notes on browser quirks that later became test ideas',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    why: 'Half of the UI defects I find come from knowing how the layer is normally built. Experimenting keeps that instinct current.',
    art: 'editor',
    highlights: [{ icon: 'ph-sparkle', label: 'Motion & state studies' }],
  },
  {
    id: 'tools',
    icon: 'ph-terminal-window',
    kicker: 'Tooling',
    title: 'Test data & utility scripts',
    sub: 'Python and SQL helpers that generate, seed, reconcile and tear down test data so a suite can run twice in a row.',
    bullets: [
      'Seed and teardown scripts for repeatable runs',
      'Reconciliation queries that separate data defects from code defects',
      'Small CLI helpers for environment checks before a test cycle',
    ],
    stack: ['Python', 'SQL', 'CLI'],
    why: 'Most flaky suites are not flaky code — they are dirty data. Owning the data setup removed a whole class of false failures.',
    art: 'terminal',
    highlights: [{ icon: 'ph-arrows-clockwise', label: 'Run #2 · same result' }],
  },
];

export const WORK_ARTIFACTS: WorkArtifact[] = [
  {
    icon: 'ph-clipboard-text',
    name: 'Test plan',
    desc: 'Scope, risk, entry/exit criteria and resourcing for a release.',
  },
  {
    icon: 'ph-list-checks',
    name: 'Test cases & suites',
    desc: 'Zephyr suites structured by risk area and test level.',
  },
  {
    icon: 'ph-bug-beetle',
    name: 'Defect report',
    desc: 'Reproducible steps, evidence, severity and priority reasoning.',
  },
  {
    icon: 'ph-file-text',
    name: 'Test summary report',
    desc: 'What was tested, what shipped, what risk remains.',
  },
];
