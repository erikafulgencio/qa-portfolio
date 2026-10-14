import { ALTER_NAV, PRO_NAV, isNavActive } from './navigation';

const byLabel = (label: string, nav = PRO_NAV) => nav.find((n) => n.label === label)!;

describe('isNavActive', () => {
  it('matches home only on the root path', () => {
    expect(isNavActive(byLabel('Home'), '/')).toBe(true);
    expect(isNavActive(byLabel('Home'), '/about')).toBe(false);
  });

  it('keeps Projects/Quests active on project and case detail pages', () => {
    expect(isNavActive(byLabel('Projects'), '/projects/pw')).toBe(true);
    expect(isNavActive(byLabel('Projects'), '/cases/breach')).toBe(true);
    expect(isNavActive(byLabel('Quests', ALTER_NAV), '/cases/ai#x')).toBe(true);
  });

  it('does not match on a shared prefix', () => {
    expect(isNavActive(byLabel('About'), '/aboutx')).toBe(false);
  });

  it('maps alter vocabulary onto the same routes', () => {
    expect(byLabel('Lore', ALTER_NAV).path).toBe('/about');
    expect(byLabel('Campaign', ALTER_NAV).path).toBe('/resume');
  });
});
