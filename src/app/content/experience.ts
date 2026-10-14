// Content migrated verbatim from the Claude Design source. Edit freely; components read only from here.
import type { ChartBar, Job } from './models';

export const EXPERIENCE_CHART: ChartBar[] = [
  {
    year: '2017',
    h: '26%',
    label: 'Junior QA — first major project',
    level: 'junior',
  },
  {
    year: '2018',
    h: '34%',
    label: 'Kiosk and POS integration testing',
    level: 'junior',
  },
  {
    year: '2019',
    h: '44%',
    label: 'Supervising 6 QA engineers',
    level: 'junior',
  },
  {
    year: '2020',
    h: '54%',
    label: 'Employee of the Year',
    level: 'junior',
  },
  {
    year: '2021',
    h: '62%',
    label: 'Mid-level QA, telemedicine',
    level: 'mid',
  },
  {
    year: '2022',
    h: '70%',
    label: 'Squad QA lead, mentoring 7',
    level: 'mid',
  },
  {
    year: '2023',
    h: '76%',
    label: 'Acting QA Lead, Squad 1',
    level: 'mid',
  },
  {
    year: '2025',
    h: '88%',
    label: 'QA Lead, 12 people, crisis response',
    level: 'lead',
  },
  {
    year: '2026',
    h: '100%',
    label: 'Test management, AI-driven testing',
    level: 'lead',
  },
];

export const JOBS: Job[] = [
  {
    dates: 'March 2025 – May 2026',
    mark: 'BT',
    domain: 'AI Chatbot · SaaS',
    role: 'Senior Software QA Engineer (QA Lead)',
    company: 'Baytech BPO Corporation — Ortigas · with Project & Technical Coordinator scope',
    points: [
      'Supervised 8 QA Engineers and 4 OJT trainees; ran "QA Touchdown" 1:1s, evaluations and mentorship.',
      'Standardized QA process end to end: sprint planning, test documentation, defect tracking and metrics.',
      'Built QA metrics, KPIs, dashboards and test summary reports for decision-making visibility.',
      'Led QA as de facto Test Manager during a critical security incident under executive visibility.',
      'Wrote and maintained Selenium and Playwright automation; drove AI-driven testing with custom Claude Skills.',
      'Proposed and launched a dedicated UAT environment, reducing production incidents and hotfixes.',
      'Delivered the MVP AI Chatbot mobile app one week early as first-time Project Coordinator.',
    ],
  },
  {
    dates: 'Oct 2021 – June 2024',
    mark: 'YD',
    domain: 'Telemedicine · health',
    role: 'Software QA Engineer (Mid-Level)',
    company: 'Yondu, Inc. — BGC Taguig · Telemedicine health app',
    points: [
      'Led QA for Squad 2 (CRF and DevOps support) and acted as QA Lead for Squad 1.',
      'Cut development cost by catching defects during sprint planning rather than after build.',
      'Mentored 7 QA Engineers through onboarding and beyond.',
      'Ran web, mobile and API testing (Postman) across platforms.',
    ],
  },
  {
    dates: 'June 2017 – June 2021',
    mark: 'AN',
    domain: 'POS · kiosk · fuel',
    role: 'Quality Assurance Engineer (Junior)',
    company: 'ANSI Information Systems Inc. — Manila · POS & Retail',
    points: [
      'Led testing for a major project that deployed with zero critical bugs.',
      'Supervised 6 QA Engineers on bug isolation and critical functionality testing.',
      'Ran functional, UI, integration, end-to-end, performance and UAT testing.',
      'Delivered end-user training and authored the client user manual.',
      'Key projects: self-ordering kiosk with pay/claim integration, Easystore POS/KDS, FuelPOS with pump integration.',
    ],
  },
];

export const COMPETENCIES: string[] = [
  'QA leadership',
  'Test strategy',
  'Agile / Scrum',
  'Defect & risk management',
  'QA metrics design',
  'Stakeholder management',
  'Project coordination',
];
