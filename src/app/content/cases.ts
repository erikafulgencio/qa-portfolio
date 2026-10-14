// Content migrated verbatim from the Claude Design source. Edit freely; components read only from here.
import type { CaseStudy } from './models';

export const CASES: CaseStudy[] = [
  {
    id: 'breach',
    icon: 'ph-shield-warning',
    kicker: 'Platform migration',
    title: 'Zero Hour',
    headline: 'Leading QA Through a High-Stakes, Accelerated Platform Migration',
    sub: "Ten weeks into a new senior role, leading eight QA engineers through an executive-driven migration of the company's flagship AI platform.",
    meta: 'Baytech BPO · 2025',
    role: 'Senior QA Engineer, acting Test Manager',
    stats: [
      {
        v: '80% in 2 days',
        k: 'of logged defects turned around',
      },
      {
        v: '8 + 2',
        k: 'QA engineers and OJT trainees led',
      },
      {
        v: '62% first-fix',
        k: 'closed defects fixed right the first time',
      },
    ],
    glance: [
      {
        k: 'Role',
        v: 'QA Lead, acting as de facto Test Manager',
      },
      {
        k: 'Team',
        v: '8 QA engineers + 2 OJT trainees',
      },
      {
        k: 'Timing',
        v: 'Roughly 10 weeks into a new Senior QA Engineer role',
      },
      {
        k: 'Scope',
        v: "Large-scale, time-critical migration of the company's flagship AI-powered SaaS platform to a new architecture, on an accelerated executive-driven timeline",
      },
      {
        k: 'Complexity',
        v: 'Marketing site, SEO and content pages, a CMS carrying a very large article library, multiple subdomains, analytics integrations, multiple LLM integrations, image and video generation, several subscription tiers',
      },
      {
        k: 'Outcome',
        v: 'Large majority of logged defects closed, 80% resolved within 2 days, daily stakeholder visibility up to executive level',
      },
    ],
    problem: '',
    problemParas: [
      'I joined as a Senior QA Engineer. My first time holding a leadership title at this level.',
      "Ten weeks in, before I'd built deep institutional knowledge of the product, the team, or the codebase, leadership called for a full migration of the company's biggest revenue-driving product off its legacy stack and onto a new architecture, on an accelerated timeline with no room for a normal planning cycle.",
      'This was not a small product: a marketing site, SEO and content pages, multiple subdomains, analytics and tracking integrations, several LLM-powered features, image and video generation tools, and multiple subscription tiers each with different access rules.',
      "I'd never led a migration close to this scale, and I didn't yet know the system the way my team did. My team was newer and mostly junior, several recently absorbed OJTs and had already been told testing was too slow and too many bugs were escaping to production.",
      'That was the environment I had to lead QA through.',
    ],
    challenges: [
      {
        t: 'Information gaps',
        d: "Initial technical discussions happened between leadership and the dev team. QA wasn't in the room, so I had to actively pull context rather than wait for it.",
      },
      {
        t: 'Thin requirements',
        d: 'Tickets were created fast by developers without formal product input, some barely more than a title, so acceptance criteria and scope were often unclear or missing.',
      },
      {
        t: 'Capacity and morale',
        d: 'A mostly junior team, already under scrutiny, was asked to test a rebuilt platform at speed under executive-level visibility.',
      },
      {
        t: "Fixes that didn't hold",
        d: 'Without acceptance criteria to anchor them, fixes sometimes missed the underlying intent of the bug, so defects kept reopening, burning retest cycles we didn\'t have room for on an already compressed timeline, and eroding confidence in "closed" as a status that meant anything.',
      },
      {
        t: 'Risks moved faster than plans could keep up',
        d: "I logged every escalated risk with a mitigation or contingency plan and raised it with the PM as soon as it surfaced, but on an accelerated timeline, some plans outran the org's ability to implement them before the risk played out. It was a mixed record, and knowing something was coming without always having the bandwidth to head it off in time was its own kind of pressure.",
      },
    ],
    actions: [
      {
        n: '1',
        t: 'Built context fast, from the ground up',
        d: 'Rather than wait for information to trickle down, I went directly to the PM, IT and the dev team to understand scope, constraints and the reasoning behind the migration and what it would actually require from QA. I needed the "why" before I could lead the "how".',
      },
      {
        n: '2',
        t: "Turned my team's product knowledge into a test strategy",
        d: 'I brought the full picture to the people who knew the system by heart. Together we built a risk-based strategy: scope, dependency mapping between features, test order by risk and severity, and testers assigned to the areas where they had the deepest feature expertise.',
      },
      {
        n: '3',
        t: 'Established an early QA forecast under uncertainty',
        d: 'With tickets still being finalized, I facilitated a high-level QA estimate based on the available scope, using assumptions and identified gaps to highlight risks and open questions with the PM.',
      },
      {
        n: '4',
        t: 'Created scope guardrails where documentation was thin',
        d: 'I introduced an in-scope / out-of-scope definition per ticket so the team had a documented, agreed boundary for what would and would not be tested turning ambiguity into something workable.',
      },
      {
        n: '5',
        t: 'Stood up the process infrastructure the team needed',
        d: 'Test plan, checklist documentation, and when PM bandwidth was limited, tracking ticket handover dates and ETAs myself. I built a defect monitoring sheet tracking age and resolution as an early-warning view, and logged each risk with a mitigation or contingency plan.',
      },
      {
        n: '6',
        t: 'Reported transparently, every day',
        d: 'Daily test progress reports to stakeholders throughout the migration, and a full test summary report at completion both cited by stakeholders as valuable visibility during a high-pressure period.',
      },
      {
        n: '7',
        t: 'Made reopened defects a shared conversation',
        d: 'Rather than let repeat reopens keep happening silently, I used the defect monitoring sheet to flag repeat-reopen patterns and brought them back to the PM and dev leads to work through together as a ticket-clarity issue which is what fed directly into the in-scope / out-of-scope guardrails above.',
      },
      {
        n: '8',
        t: 'Kept risk visible and escalated early',
        d: "I built the test plan, coordinated the checklist documentation, and since day-to-day tracking of ticket handovers and ETAs wasn't something anyone owned full-time, took that on myself so the team always knew what was coming and when. I also built a defect monitoring sheet tracking defect age and resolution, which gave us an early-warning view of where things were stalling, so risks could be logged and escalated as early as possible.",
      },
      {
        n: '9',
        t: 'Protected team morale under pressure',
        d: 'Regular 1:1s and check-ins surfaced how much strain people were under. I launched a Bug Hunt Bounty initiative with recognition and rewards; morale and engagement visibly improved, and the team said so in retrospective.',
      },
    ],
    results: [
      'The large majority of all logged defects were closed by reporting time, despite the compressed timeline.',
      '80% of defects turned around within 2 days of being logged — the product of active monitoring and control rather than luck: daily tracking of defect age, continuous collaboration with devs and the PM, and unblocking hurdles and coordinating handovers as soon as they surfaced.',
      '62% of closed defects were fixed correctly on the first attempt; the remainder fed root-cause conversations about ticket clarity.',
      'A daily reporting cadence held throughout, giving leadership up to executive level continuous visibility into risk and progress.',
      'Reusable QA artifacts, in-scope/out-of-scope guidelines, a defect-aging monitoring sheet, a structured test plan that outlasted the migration.',
      'Team morale and cohesion measurably strengthened; the team named it a turning point in retrospective.',
    ],
    closing:
      'The migration shipped successfully and the platform has run stable since launch. Some lower-severity defects surfaced afterward, visible and tracked by stakeholders throughout, but none were showstopper-level — a reflection of how well the risk-based prioritisation held up in practice.',
    learnings: [
      {
        t: 'Understanding beats assuming',
        d: 'Going directly to the people closest to the problem, rather than waiting for information to be handed down, is what let me build a credible strategy fast.',
      },
      {
        t: 'Structure is a gift during chaos',
        d: "When requirements are thin, the fastest way to unblock a team isn't to wait for perfect tickets — it's to define the boundaries yourself and get agreement on them.",
      },
      {
        t: "Process and people can't be separated",
        d: 'The defect dashboards and test plans mattered, but the 1:1s and the bounty program were just as responsible for getting the team through this intact.',
      },
    ],
    skills: [
      'High-stakes QA leadership',
      'Risk-based test strategy',
      'Cross-functional stakeholder management',
      'Defect & risk management',
      'QA process design under pressure',
      'Metrics-driven reporting',
      'Team leadership & mentorship',
    ],
    lesson:
      "Structure is a gift during chaos. When requirements are thin, the fastest way to unblock a team isn't waiting for perfect tickets — it's defining the boundaries yourself and getting agreement on them.",
    docs: [
      'Test Plan',
      'Test Completion Report',
      'Test Progress Report',
      'QA Checklist',
      'Defect Monitoring Sheet',
      'Risk, Mitigation & Contingency',
      'QA Metrics',
    ],
    tools: [
      'OpenProject',
      'Asana',
      'Slack',
      'Google Sheets',
      'Postman',
      'TestMu (Formerly known as LambdaTest)',
      'SEO & Analytics Testing',
      'Payment Testing',
      'Functional Testing',
      'End to end Testing',
      'UI Testing',
      'Performance Testing',
    ],
  },
  {
    id: 'bounty',
    icon: 'ph-bug',
    kicker: 'Team culture',
    title: 'Bug Hunt Bounty',
    headline: 'Turning defect discovery into something the team wanted to win.',
    sub: 'Turning defect discovery into something the team wanted to win.',
    meta: 'Baytech BPO · 2025',
    role: 'QA Lead, program owner',
    stats: [
      {
        v: '12 people',
        k: 'engineers and trainees participating',
      },
      {
        v: 'Recurring',
        k: 'QA Touchdown 1:1 cadence',
      },
      {
        v: 'Sustained',
        k: 'morale through a crisis period',
      },
    ],
    glance: [],
    problem:
      'Regression season is where curiosity goes to die. I wanted more edge-case hunting and real ownership without adding pressure to a stretched team.',
    problemParas: [],
    challenges: [],
    actions: [
      {
        n: '1',
        t: 'Made finding bugs count',
        d: 'Rewarded high-value defects rather than ticket volume — severity and clarity of the report both mattered.',
      },
      {
        n: '2',
        t: 'Paired it with QA Touchdown',
        d: 'Recurring 1:1s, evaluations, mentorship and coaching, so recognition was personal and not just a leaderboard.',
      },
      {
        n: '3',
        t: 'Kept it alive under pressure',
        d: 'Ran the program straight through the security incident, when engagement mattered most.',
      },
      {
        n: '4',
        t: 'Coached report quality',
        d: 'Used winning entries to teach reproducible steps, evidence and severity reasoning.',
      },
    ],
    results: [
      'Higher engagement and more meaningful defects caught before release.',
      'Noticeably better defect report quality across the team.',
      'Morale held through a high-pressure incident period.',
    ],
    closing: '',
    learnings: [],
    skills: [],
    lesson: 'People do their best testing when it feels like curiosity, not compliance.',
    docs: ['Bounty program brief', 'Defect quality rubric', 'QA Touchdown 1:1 template'],
    tools: ['Jira', 'Zephyr', 'Slack'],
  },
  {
    id: 'uat',
    icon: 'ph-flask',
    kicker: 'Process',
    title: 'A room of our own',
    headline:
      'Proposing and launching a dedicated UAT environment so production stopped being the test bed.',
    sub: 'Proposing and launching a dedicated UAT environment so production stopped being the test bed.',
    meta: 'Baytech BPO · 2025',
    role: 'QA Lead, proposal author',
    stats: [
      {
        v: 'Fewer',
        k: 'production incidents',
      },
      {
        v: 'Fewer',
        k: 'emergency hotfixes',
      },
      {
        v: 'Multi-pod',
        k: 'adoption across teams',
      },
    ],
    glance: [],
    problem:
      'UAT happened wherever there was room — often too close to production. Defects surfaced late, hotfixes multiplied, and every release carried avoidable risk. The fix was not more testing; it was somewhere proper to do it.',
    problemParas: [],
    challenges: [],
    actions: [
      {
        n: '1',
        t: 'Made the cost visible',
        d: 'Tied recurring incidents and hotfixes back to the missing environment, in numbers stakeholders already tracked.',
      },
      {
        n: '2',
        t: 'Wrote the proposal',
        d: 'Scope, ownership, data handling, entry and exit criteria, and sign-off — a document that could be approved rather than debated.',
      },
      {
        n: '3',
        t: 'Standardized around it',
        d: 'Sprint planning, documentation and defect tracking updated so UAT became a stage, not a favour.',
      },
      {
        n: '4',
        t: 'Added release governance',
        d: 'Semantic versioning and RACI documentation so everyone knew what shipped and who owned it.',
      },
    ],
    results: [
      'Production incidents and hotfixes reduced after rollout.',
      'A repeatable UAT stage with defined entry and exit criteria.',
      'QA discipline centralized across multiple pods.',
    ],
    closing: '',
    learnings: [],
    skills: [],
    lesson:
      'The strongest QA argument is an operational cost, stated plainly, with a proposal attached.',
    docs: [
      'UAT environment proposal',
      'QA process standards',
      'RACI matrix',
      'Release versioning guide',
    ],
    tools: ['Jira', 'OpenProject', 'AWS S3', 'AWS CloudWatch'],
  },
  {
    id: 'chatbot',
    icon: 'ph-rocket-launch',
    kicker: 'Delivery',
    title: 'One week early',
    headline:
      'Taking over an MVP AI chatbot mobile app mid-project as a first-time project coordinator.',
    sub: 'Taking over an MVP AI chatbot mobile app mid-project as a first-time project coordinator.',
    meta: 'Baytech BPO · 2025',
    role: 'Project Coordinator (first time)',
    stats: [
      {
        v: '-7 days',
        k: 'delivered ahead of deadline',
      },
      {
        v: 'Mid-flight',
        k: 'handover point',
      },
      {
        v: 'Weekly',
        k: 'scrum ceremonies led',
      },
    ],
    glance: [],
    problem:
      'The MVP was already moving when it landed on my desk, and I had never run project coordination before. Scope, dependencies and status all lived in different heads.',
    problemParas: [],
    challenges: [],
    actions: [
      {
        n: '1',
        t: 'Rebuilt the picture',
        d: 'Reconstructed scope and remaining work into one tracked plan before touching the schedule.',
      },
      {
        n: '2',
        t: 'Ran the ceremonies',
        d: 'Weekly scrum for progress visibility and fast blocker resolution across Dev, QA and Product.',
      },
      {
        n: '3',
        t: 'Translated both ways',
        d: 'Kept technical feasibility and business expectation in the same conversation instead of two.',
      },
      {
        n: '4',
        t: 'Closed it properly',
        d: 'Project closure report, app submission history, deployment heads-up and QA certification.',
      },
    ],
    results: [
      'Delivered one week ahead of the committed deadline.',
      'Clean handover documentation for the next cycle.',
      'Became the template for how later small projects were closed out.',
    ],
    closing: '',
    learnings: [],
    skills: [],
    lesson:
      'Coordination is mostly making the invisible visible. The schedule fixes itself once everyone sees the same board.',
    docs: [
      'Project closure report',
      'App submission history',
      'Deployment heads-up',
      'QA certification',
    ],
    tools: ['Jira', 'Trello', 'Asana', 'BlueStacks', 'TestMu AI'],
  },
  {
    id: 'ai',
    icon: 'ph-robot',
    kicker: 'AI-driven testing',
    title: 'Custom Claude Skills for QA',
    headline:
      'Integrating AI into everyday QA work as a tool with guardrails, not a shortcut around thinking.',
    sub: 'Integrating AI into everyday QA work as a tool with guardrails, not a shortcut around thinking.',
    meta: 'Baytech BPO · 2025–2026',
    role: 'QA Lead, AI initiative owner',
    stats: [
      {
        v: '4 workflows',
        k: 'requirements, test cases, defects, docs',
      },
      {
        v: 'Custom',
        k: 'Claude Skills built for the team',
      },
      {
        v: 'Faster',
        k: 'script creation with review kept intact',
      },
    ],
    glance: [],
    problem:
      'The company was moving in an AI-driven direction and QA was expected to keep pace without dropping rigor. Generic prompting produced test cases that looked plausible and tested nothing. I wanted AI inside the process, with our standards encoded and a human review step that never got skipped.',
    problemParas: [],
    challenges: [],
    actions: [
      {
        n: '1',
        t: 'Picked the four highest-friction tasks',
        d: 'Requirement analysis, test-case generation, defect investigation and documentation — where engineers spent time without adding judgement.',
      },
      {
        n: '2',
        t: 'Built custom Claude Skills',
        d: 'Encoded our templates, severity definitions and documentation standards so output arrived in house format, review-ready.',
      },
      {
        n: '3',
        t: 'Accelerated automation',
        d: 'Used AI to draft and extend Selenium and Playwright scripts, then reviewed and maintained them like any other code.',
      },
      {
        n: '4',
        t: 'Wrote the proposals',
        d: 'Formal proposals on AI tooling, QA training and automation standardization, so adoption was a decision rather than a rumour.',
      },
    ],
    results: [
      'Automation coverage grew without a matching increase in script-writing hours.',
      'Test-case and defect documentation became consistent across pods.',
      'AI use standardized with a review gate, so output stayed inspectable.',
    ],
    closing: '',
    learnings: [],
    skills: [],
    lesson:
      'AI is a very fast junior engineer. It only helps once your standards are written down.',
    docs: [
      'AI tooling proposal',
      'QA automation standardization plan',
      'Custom Claude Skills',
      'QA training outline',
    ],
    tools: ['ClaudeCode', 'OpenCode', 'Playwright', 'Selenium', 'Robot Framework'],
  },
];
