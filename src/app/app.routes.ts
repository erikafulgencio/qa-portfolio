import type { Routes } from '@angular/router';

const SITE = 'Erika Fulgencio';

export const routes: Routes = [
  {
    path: '',
    title: `${SITE} | Senior QA Engineer`,
    loadComponent: () => import('./features/home/home'),
  },
  {
    path: 'about',
    title: 'About',
    loadComponent: () => import('./features/about/about'),
  },
  {
    path: 'projects',
    title: 'Projects',
    loadComponent: () => import('./features/projects/projects'),
  },
  {
    path: 'projects/:id',
    title: 'Project',
    loadComponent: () => import('./features/project-detail/project-detail'),
  },
  {
    path: 'cases/:id',
    title: 'Case study',
    loadComponent: () => import('./features/case-study/case-study'),
  },
  {
    path: 'skills',
    title: 'Skills',
    loadComponent: () => import('./features/skills/skills'),
  },
  {
    path: 'resume',
    title: 'Résumé',
    loadComponent: () => import('./features/resume/resume'),
  },
  {
    path: 'contact',
    title: 'Contact',
    loadComponent: () => import('./features/contact/contact'),
  },
  { path: '**', redirectTo: '' },
];
