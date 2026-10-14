// Content migrated verbatim from the Claude Design source. Edit freely; components read only from here.
import type { Hobby, Interest, SpotRow, StoryAct, TitledText } from './models';

export const ABOUT_CHIPS: string[] = [
  'Curiosity first',
  'Systems thinker',
  'Root-cause hunter',
  'Quality advocate',
];

export const SHORT_LEAD =
  'I started my career in QA with a curiosity for how systems work and a desire to understand what happens beneath the surface. As I gained experience, I realized I wanted more than simply executing test cases, so I began challenging myself by exploring edge cases, chasing difficult bugs, understanding what was happening behind the screen, and digging until I could find the root cause.';

export const SHORT_PULL = "That's when I found what kept me going: curiosity.";

export const SHORT_BODY =
  'My programming background helped me see beyond the UI, including APIs, backend logic, data, and system behavior. The deeper I explored, the more I realized that QA was where my curiosity, critical thinking, and love of problem-solving came together.';

export const DEPTH_LAYERS: (TitledText & { n: string })[] = [
  {
    n: '00',
    t: 'UI',
    d: 'what the user sees',
  },
  {
    n: '01',
    t: 'APIs',
    d: 'what the screen asks for',
  },
  {
    n: '02',
    t: 'Backend logic',
    d: 'where the rules live',
  },
  {
    n: '03',
    t: 'Data',
    d: 'what is actually true',
  },
  {
    n: '04',
    t: 'System behavior',
    d: 'what it does under pressure',
  },
];

export const STORY_ACTS: StoryAct[] = [
  {
    n: '01',
    icon: 'ph-signpost',
    title: 'I had no idea what I wanted to do',
    paras: [
      'When I was younger, I wanted to become a nurse. Then I thought maybe a doctor. But those paths were expensive and my family could not afford them, so for a while I honestly had no idea what I wanted to do.',
      'My dad suggested IT. It was still a relatively new field then, so I thought: why not, I will try it. Then I started studying and discovered something I was not expecting — there was a lot of math.',
      'I genuinely thought I would not make it. There were times I was convinced I would not pass, let alone graduate. But somehow, I did.',
      'And after graduating I still did not have a clear answer to what I actually wanted to do. I only knew I enjoyed creating systems — understanding how things worked, how the pieces connected, why a system behaved the way it did. At one point I even considered becoming a Systems Analyst. Looking back, that probably should have been a clue.',
    ],
    list: [],
    quote: '',
  },
  {
    n: '02',
    icon: 'ph-map-pin',
    title: 'A practical decision',
    paras: [
      'My first QA job was not part of a carefully planned career path. Honestly, I chose it because it was close to home.',
      'I had a developer opportunity on the table, but I knew what commuting in the Philippines could be like — waking up early, waiting for transportation, the heat, the traffic, spending so much time and energy just getting to the office. I did not want that if I could avoid it.',
      'So when I found a QA opportunity nearby I thought: why not. That is how I ended up in QA. I did not know it would become my career. I just knew it was easier to get to work.',
    ],
    list: [],
    quote: '',
  },
  {
    n: '03',
    icon: 'ph-magnifying-glass',
    title: 'Something was missing',
    paras: [
      'I was not unhappy with QA. It just felt incomplete. I was testing features, checking expected results, completing my tasks and moving on. But I kept wondering: is this all there is to QA?',
      'I did not want to spend years simply executing test cases. I wanted something to challenge me. Something to look forward to. Something that would keep me curious and give me a reason to keep learning.',
      'So I started creating those challenges for myself. Instead of only testing what was expected, I started asking:',
    ],
    list: [
      'What happens if I do this?',
      'What if the user does not follow the happy path?',
      'What if the data is unexpected?',
      'What if two things happen at the same time?',
      'What if the session expires halfway through?',
      'What if someone does something nobody thought a user would do?',
    ],
    quote:
      'I started looking for the things that were not obvious. And the more I looked, the more I found.',
  },
  {
    n: '04',
    icon: 'ph-stack',
    title: 'Looking underneath the screen',
    paras: [
      'My programming background helped me take that exploration further. What we see on the screen is only one layer of a system. Behind a button click could be an API request; behind that request, business logic, validation, database operations, service-to-service communication, and a response coming back to the user.',
      'So I started using that understanding in my testing. I did not just want to know what happened — I wanted to know why it happened. If something looked wrong on the frontend, I could investigate what was happening behind it. If an API returned unexpected data, I could look at how that data was processed. If something failed intermittently, I could dig through logs, follow the sequence of events, and work out what conditions triggered it.',
      'I started looking at both sides: what the user is experiencing, and what the system is actually doing. That helped me identify bugs, understand their behaviour, and trace them closer to their root cause.',
      'Sometimes that meant spending far too much time on one weird bug. There were days I swear I gave myself a headache just trying to figure something out. But I enjoyed it — there is something incredibly satisfying about taking something that does not make sense and eventually making sense of it.',
    ],
    list: [],
    quote:
      'The strange behaviour. The bug that is hard to reproduce. The edge case nobody thought about. The issue where you think "surely this cannot be a bug" — and then you prove that it is.',
  },
  {
    n: '05',
    icon: 'ph-graph',
    title: 'And then the iceberg got bigger',
    paras: [
      'The more experience I gained, the more I realised a defect is not always a coding problem. Sometimes the requirement is wrong. Sometimes two business rules contradict each other. Sometimes the design does not reflect what the user actually needs. Sometimes the environment causes the problem. Sometimes the frontend and backend interpret something differently. Sometimes the team builds exactly what was written — but what was written was not the right solution.',
      'That is when I started seeing QA differently. Testing was only the tip of the iceberg. Underneath it were requirements, assumptions, business rules, design, architecture, data, environments, processes, risks and — most importantly — the people we are building the software for.',
      'So I do not think QA is simply about asking "does it work?" I think we also need to ask:',
    ],
    list: [
      'Are we solving the right problem?',
      'What are we assuming?',
      'What could go wrong?',
      'What have we not considered?',
      'What is happening underneath?',
      'Does this actually help the person we are building it for?',
    ],
    quote:
      'We do not build software to satisfy requirements or meet a deadline. We build it to solve problems. Quality is whether it fulfils that purpose.',
  },
  {
    n: '06',
    icon: 'ph-shield-check',
    title: 'What QA means to me',
    paras: [
      'I do not see QA as the person who waits at the end of development to say pass or fail. I see QA as a quality advocate, an investigator and a problem solver.',
      'Someone who understands the system. Someone who challenges assumptions. Someone who asks uncomfortable questions. Someone who looks beyond the obvious. Someone who can connect what the user experiences with what is happening underneath.',
      'And someone who remembers that quality is not just the absence of bugs — it is whether the software achieves what it was meant to achieve. That is the kind of QA I want to be, and the kind of QA I hope more people can see. Because QA is often misunderstood as simply testing the software, and there is so much more beneath the surface.',
    ],
    list: [],
    quote: '',
  },
  {
    n: '07',
    icon: 'ph-compass',
    title: 'Still looking',
    paras: [
      'I did not start QA knowing exactly where I was going. I started because it was practical. I stayed because I went looking for something more.',
      'And I found it in curiosity. In exploration. In understanding systems. In asking why. In finding what others might miss. And in realising that quality is deeper than testing.',
    ],
    list: [],
    quote: '',
  },
];

export const HOBBIES: Hobby[] = [
  {
    icon: 'ph-game-controller',
    t: 'Gaming',
    d: 'Path of Exile, Monster Hunter World, Marvel Rivals, Slay the Spire, Luma Island, Bloons TD6, CookieRun Kingdom, CookieRun Idle, Stardew Valley, Backpack Battle, Risk of Rain, Minecraft Dungeons, Palworld, Grounded 2, Running Era and Cooking Fever — the genres that reward patient system-reading.',
    shots: [
      {
        label: 'Path of Exile 2',
      },
      {
        label: 'Monster Hunter',
      },
      {
        label: 'Marvel Rivals',
      },
      {
        label: 'Slay the Spire',
      },
      {
        label: 'Luma Island',
      },
      {
        label: 'Bloons TD6',
      },
      {
        label: 'CookieRun Kingdom',
      },
      {
        label: 'CookieRun Idle',
      },
      {
        label: 'Stardew Valley',
      },
      {
        label: 'Backpack Battle',
      },
      {
        label: 'Risk of Rain',
      },
      {
        label: 'Minecraft Dungeons',
      },
      {
        label: 'Palworld',
      },
      {
        label: 'Grounded 2',
      },
      {
        label: 'Running Era',
      },
      {
        label: 'Cooking Fever',
      },
    ],
  },
  {
    icon: 'ph-books',
    t: 'Studying, always',
    d: 'Reviewing for the ISTQB Test Management exam, and exploring Claude Design, Claude Code and automation testing.',
    shots: [
      {
        label: 'ISTQB',
      },
      {
        label: 'Claude',
      },
    ],
  },
  {
    icon: 'ph-television-simple',
    t: 'F.R.I.E.N.D.S, again',
    d: 'Third full run of F.R.I.E.N.D.S, and currently working through Chicago Fire. Comfort watching while a regression suite runs in the background.',
    shots: [
      {
        label: 'F.R.I.E.N.D.S',
      },
      {
        label: 'Chicago Fire',
      },
    ],
  },
  {
    icon: 'ph-coffee',
    t: 'Coffee and a puppy',
    d: 'What I want right now: a Starbucks coffee jelly or a flat white, and a hug from my golden retriever.',
    shots: [
      {
        label: 'Coffee jelly',
      },
      {
        label: 'Flat white',
      },
      {
        label: 'Golden retriever',
      },
    ],
  },
];

export const ALTER_INTERESTS: Interest[] = [
  {
    icon: 'ph-television-simple',
    title: 'Sitcoms on permanent rotation',
    body: 'F.R.I.E.N.D.S, The Big Bang Theory, The Office, Modern Family. Comfort viewing, and a surprisingly good source of edge cases.',
  },
  {
    icon: 'ph-game-controller',
    title: 'Games, most genres',
    body: 'RPG, MMORPG, MOBA, FPS, simulation, tower defense, idle and card games. Mobile and PC.',
  },
  {
    icon: 'ph-book-open-text',
    title: 'Light novels & classics',
    body: 'Wuxia, xianxia, manhwa, manga, and the occasional classic. Well past 700 chapters — I stopped counting.',
  },
  {
    icon: 'ph-sparkle',
    title: 'Anime',
    body: 'Long-running shonen to quiet slice-of-life, depending on the week. First cosplay: Kento Nanami, fem version.',
  },
  {
    icon: 'ph-dog',
    title: 'Dogs, unconditionally',
    body: 'Will pause any conversation. Non-negotiable.',
  },
  {
    icon: 'ph-sneaker-move',
    title: 'Running, sometimes',
    body: 'Honest about the "sometimes". Also learning something new whenever I can.',
  },
];

export const SPOT_ROWS: SpotRow[] = [
  {
    id: 'TC-01',
    label: 'Login with valid credentials',
    status: 'PASS',
    bug: false,
  },
  {
    id: 'TC-02',
    label: 'Reject expired session token',
    status: 'PASS',
    bug: false,
  },
  {
    id: 'TC-03',
    label: 'Cart total after 10% discount → expected ₱900, actual ₱1,000',
    status: 'PASS',
    bug: true,
  },
  {
    id: 'TC-04',
    label: 'Password reset email delivery',
    status: 'PASS',
    bug: false,
  },
  {
    id: 'TC-05',
    label: 'Checkout blocked on failed payment',
    status: 'PASS',
    bug: false,
  },
  {
    id: 'TC-06',
    label: 'Order history sorted newest first',
    status: 'PASS',
    bug: false,
  },
];
