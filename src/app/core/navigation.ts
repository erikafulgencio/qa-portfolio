import type { IconName } from '../content/models';

export interface NavItem {
  label: string;
  path: string;
  /** Extra path prefixes that should also mark this item active. */
  alsoActiveOn?: string[];
}

export const PRO_NAV: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects', alsoActiveOn: ['/cases'] },
  { label: 'Skills', path: '/skills' },
  { label: 'Résumé', path: '/resume' },
  { label: 'Contact', path: '/contact' },
];

/** Alter Ego renames the same routes in game vocabulary. */
export const ALTER_NAV: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Quests', path: '/projects', alsoActiveOn: ['/cases'] },
  { label: 'Skills', path: '/skills' },
  { label: 'Lore', path: '/about' },
  { label: 'Campaign', path: '/resume' },
];

export const MODE_OPTIONS: { mode: 'alter' | 'pro'; label: string; icon: IconName }[] = [
  { mode: 'alter', label: 'Alter Ego', icon: 'ph-sword' },
  { mode: 'pro', label: 'Professional', icon: 'ph-briefcase' },
];

export function isNavActive(item: NavItem, url: string): boolean {
  const path = url.split(/[?#]/)[0];
  if (item.path === '/') return path === '/' || path === '';
  return [item.path, ...(item.alsoActiveOn ?? [])].some(
    (p) => path === p || path.startsWith(p + '/'),
  );
}
