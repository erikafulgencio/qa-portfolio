import { TestBed } from '@angular/core/testing';

import { DEV_PROJECTS, QUESTS } from '../content/projects';
import { TechLogo } from './tech-logo';
import { GLYPHS, LOGOS } from './tech-logos';

/** Brands with no mark available: they stay text-only rather than borrow a generic glyph. */
const TEXT_ONLY = ['testng', 'newman', 'zephyr', 'zephyr scale', 'bluestacks'];

function render(name: string): HTMLElement {
  const fixture = TestBed.createComponent(TechLogo);
  fixture.componentRef.setInput('name', name);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('TechLogo', () => {
  it('draws a decorative brand mark for known stack names, in any case', () => {
    for (const name of ['Selenium', 'Java', 'JAVA', 'GitHub Actions', 'Robot Framework']) {
      const svg = render(name).querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
      expect(svg?.querySelectorAll('path').length).toBeGreaterThan(0);
    }
  });

  it('only sets a transform on paths that need one', () => {
    const transforms = [...render('Python').querySelectorAll('path')].map((p) =>
      p.getAttribute('transform'),
    );
    expect(transforms.every((t) => t !== null)).toBe(true);
    expect(render('Java').querySelector('path')?.hasAttribute('transform')).toBe(false);
  });

  it('falls back to a decorative Phosphor glyph for generic items', () => {
    const el = render('SQL');
    expect(el.querySelector('svg')).toBeNull();
    const glyph = el.querySelector('i');
    expect(glyph?.className).toContain('ph-database');
    expect(glyph?.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders nothing for stack names without a mark or glyph', () => {
    const el = render('TestNG');
    expect(el.querySelector('svg, i')).toBeNull();
  });

  it('covers every stack item in the projects, or lists it as text-only on purpose', () => {
    const names = new Set(
      [...QUESTS, ...DEV_PROJECTS].flatMap((p) => p.stack.map((s) => s.toLowerCase())),
    );
    const uncovered = [...names].filter((n) => !LOGOS[n] && !GLYPHS[n] && !TEXT_ONLY.includes(n));
    expect(uncovered).toEqual([]);
  });

  it('keeps every mark drawable: square view box, path data, a fill on each path', () => {
    for (const [name, logo] of Object.entries(LOGOS)) {
      const [, , w, h] = logo.viewBox.split(' ').map(Number);
      expect(w, name).toBe(h);
      for (const p of logo.paths) {
        expect(p.d.length, name).toBeGreaterThan(0);
        expect(p.fill, name).toMatch(/^(#[0-9a-f]{3,6}|currentColor)$/i);
      }
    }
  });
});
