// Content migrated verbatim from the Claude Design source. Edit freely; components read only from here.
import type { Award, Certification, SkillGroup, TrainingItem } from './models';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'Automation testing',
    icon: 'ph-robot',
    items: [
      [
        'Selenium WebDriver & Selenium IDE',
        'My first automation home. Page-object suites for regression on POS and web platforms — written, reviewed and maintained.',
      ],
      [
        'Playwright',
        'Current favourite for end-to-end work: fast, parallel, and much kinder about waiting.',
      ],
      [
        'Robot Framework',
        'Keyword-driven suites when the team includes people who read tests but do not write code.',
      ],
      [
        'Postman, Newman & Swagger',
        'API testing across telemedicine and POS work — collections, environments, auth and OAuth token handling.',
      ],
    ],
  },
  {
    name: 'Languages',
    icon: 'ph-code',
    items: [
      [
        'SQL',
        'Data validation is half of real testing. Joins, aggregates and back-end verification against what the UI claims.',
      ],
      [
        'Python',
        'Automation glue and Robot Framework libraries. Python Essentials 1 certified, still learning.',
      ],
      ['JavaScript', 'Enough to read the front end I am testing and to write Playwright specs.'],
      ['Java', 'Reading and extending Selenium suites written in Java, plus test data utilities.'],
      [
        'HTML & CSS',
        'freeCodeCamp Responsive Web Design — useful for UI defects and for arguing with a mockup.',
      ],
    ],
  },
  {
    name: 'Databases',
    icon: 'ph-database',
    items: [
      ['MySQL', 'Daily driver for test data setup and back-end verification.'],
      ['MSSQL', 'Enterprise POS work — stored procedures and transaction checks.'],
      ['SQLite', 'Mobile app local storage verification.'],
      ['Visual FoxPro', 'Legacy system testing. Yes, really.'],
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: 'ph-cloud',
    items: [
      ['AWS S3', 'Verifying uploads, storage behaviour and asset delivery during release checks.'],
      [
        'AWS CloudWatch',
        'Reading logs and metrics to tell an environment defect from a code defect.',
      ],
    ],
  },
  {
    name: 'Test & project management',
    icon: 'ph-kanban',
    items: [
      ['Jira', 'Workflow design, defect hygiene, and dashboards leadership actually opens.'],
      ['Zephyr', 'Test case management structured by risk area and test level.'],
      ['TestLink', 'Earlier test repositories and traceability.'],
      ['Trello', 'Lightweight boards for coordination when the project is not on Jira.'],
      ['Asana', 'Task and release tracking for cross-functional delivery teams.'],
      ['OpenProject', 'Self-hosted planning and work packages on client-side projects.'],
    ],
  },
  {
    name: 'Cross-browser & mobile',
    icon: 'ph-devices',
    items: [
      ['BrowserStack', 'Real-device and cross-browser coverage on web releases.'],
      ['TestMu AI (formerly LambdaTest)', 'Parallel cross-browser runs and screenshot comparison.'],
      [
        'BlueStacks / Nox / LDPlayer',
        'Android emulation for mobile regression when devices are short.',
      ],
    ],
  },
  {
    name: 'AI-driven testing',
    icon: 'ph-sparkle',
    items: [
      [
        'ClaudeCode',
        'My main AI pair for automation work — scaffolding suites, refactoring page objects, reviewing diffs.',
      ],
      [
        'ClaudeDesign',
        'Turning specs and mockups into working front-end artifacts I can test against.',
      ],
      [
        'AI Skills and Commands',
        'Custom Skills and slash commands that carry our templates and severity definitions, so output arrives review-ready.',
      ],
      [
        'OpenCode',
        'Open-source coding agent for drafting and extending automation code, always with a human review step.',
      ],
      [
        'Claude, ChatGPT, Gemini, Perplexity, Deepseek, Kling, Veo',
        'Research, requirement questioning, rubber-ducking test ideas, and generating media for test data.',
      ],
      [
        'OpenClaw',
        'Agentic browser automation — exploring flows and drafting the checks that follow.',
      ],
      [
        'AI Integrated Testing',
        'Wiring AI into the everyday test cycle with guardrails: prompt patterns that produce tests with real oracles.',
      ],
    ],
  },
  {
    name: 'Leadership & strategy',
    icon: 'ph-users-three',
    items: [
      [
        'Test strategy & planning',
        'Risk-based planning mapped to what the business actually fears, with criteria written down.',
      ],
      [
        'QA process standardization',
        'Sprint planning, documentation, defect tracking and metrics made consistent across pods.',
      ],
      [
        'Team coaching & 1:1s',
        'QA Touchdown: recurring 1:1s, evaluations, mentorship. 12 engineers and trainees at peak.',
      ],
      [
        'Stakeholder alignment',
        'Translating between technical feasibility and business goals so nobody negotiates with a guess.',
      ],
      [
        'Crisis test management',
        'Acting Test Manager during a live security incident, under executive visibility.',
      ],
    ],
  },
];

export const TRAINING: TrainingItem[] = [
  {
    icon: 'ph-certificate',
    label: 'ISTQB Test Management',
    pct: '65%',
  },
  {
    icon: 'ph-code-block',
    label: 'Claude Code & Claude Design',
    pct: '80%',
  },
  {
    icon: 'ph-robot',
    label: 'Deeper automation practice',
    pct: '55%',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    icon: 'ph-certificate',
    badge: 'Certified',
    title: 'ISTQB Certified Tester, Foundation Level',
    issuer: 'ISTQB',
  },
  {
    icon: 'ph-plugs-connected',
    badge: 'Micro-credential',
    title: 'API Testing: Introduction, Test Planning & Design',
    issuer: 'AT*SQA',
  },
  {
    icon: 'ph-code',
    badge: 'Foundation',
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
  },
  {
    icon: 'ph-arrows-clockwise',
    badge: 'Course',
    title: 'Agile PM: Agile, Scrum, Kanban & XP',
    issuer: 'Udemy',
  },
  {
    icon: 'ph-cloud',
    badge: 'Accreditation',
    title: 'AWS Partner: Accreditation (Business)',
    issuer: 'Amazon Web Services',
  },
  {
    icon: 'ph-browsers',
    badge: 'Certification',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
  },
];

export const AWARDS: Award[] = [
  {
    id: 'eoy',
    icon: 'ph-trophy',
    title: 'Employee of the Year 2020',
    meta: 'ANSI Information Systems · pandemic response period',
    story:
      'For holding testing delivery together through the shift to remote work, when the process had to be rebuilt mid-flight.',
  },
  {
    id: 'eoq4',
    icon: 'ph-medal',
    title: 'Employee of the Quarter, 2019 Q4',
    meta: 'ANSI Information Systems',
    story:
      'Came off a launch where the defects were caught in sprint planning rather than in production.',
  },
  {
    id: 'eoq2',
    icon: 'ph-medal',
    title: 'Employee of the Quarter, 2018 Q2',
    meta: 'ANSI Information Systems',
    story:
      'Kiosk and POS integration testing — the quarter I learned how much a payment edge case can cost.',
  },
  {
    id: 'rookie',
    icon: 'ph-sparkle',
    title: 'Rookie of the Year nominee, 2017',
    meta: 'ANSI Information Systems',
    story:
      'Year one: led testing on a major project that deployed with zero critical bugs. It set the standard I still chase.',
  },
];
