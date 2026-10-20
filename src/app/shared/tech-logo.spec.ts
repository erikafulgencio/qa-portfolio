import { TestBed } from '@angular/core/testing';

import { TechLogo } from './tech-logo';

function render(name: string): HTMLElement {
  const fixture = TestBed.createComponent(TechLogo);
  fixture.componentRef.setInput('name', name);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('TechLogo', () => {
  it('draws a decorative brand mark for known stack names, in any case', () => {
    for (const name of ['Selenium', 'Java', 'JAVA']) {
      const svg = render(name).querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
      expect(svg?.querySelectorAll('path').length).toBeGreaterThan(0);
    }
  });

  it('renders nothing for stack names without a logo', () => {
    expect(render('TestNG').querySelector('svg')).toBeNull();
  });
});
