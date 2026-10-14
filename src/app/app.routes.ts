import type { Routes } from '@angular/router';

const SITE = 'Erika Fulgencio';

export const routes: Routes = [
  {
    path: '',
    title: `${SITE} · Senior QA Engineer`,
    loadComponent: () => import('./features/home/home'),
  },
  {
    path: 'about',
    title: `About · ${SITE}`,
    loadComponent: () => import('./features/about/about'),
  },
  {
    path: 'projects',
    title: `Projects · ${SITE}`,
    loadComponent: () => import('./features/projects/projects'),
  },
  {
    path: 'projects/:id',
    title: `Project · ${SITE}`,
    loadComponent: () => import('./features/project-detail/project-detail'),
  },
  {
    path: 'cases/:id',
    title: `Case study · ${SITE}`,
    loadComponent: () => import('./features/case-study/case-study'),
  },
  {
    path: 'skills',
    title: `Skills · ${SITE}`,
    loadComponent: () => import('./features/skills/skills'),
  },
  {
    path: 'resume',
    title: `Résumé · ${SITE}`,
    loadComponent: () => import('./features/resume/resume'),
  },
  {
    path: 'contact',
    title: `Contact · ${SITE}`,
    loadComponent: () => import('./features/contact/contact'),
  },
  { path: '**', redirectTo: '' },
];
