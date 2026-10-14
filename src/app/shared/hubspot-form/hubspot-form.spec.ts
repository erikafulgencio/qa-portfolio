import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { EMBED_SCRIPT_ID, EMBED_TIMEOUT_MS, HubspotForm } from './hubspot-form';

describe('HubspotForm', () => {
  const render = async () => {
    const fixture = TestBed.createComponent(HubspotForm);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      el,
      frame: el.querySelector<HTMLElement>('.hs-form-frame')!,
      script: () => document.getElementById(EMBED_SCRIPT_ID) as HTMLScriptElement | null,
    };
  };

  afterEach(() => {
    document.getElementById(EMBED_SCRIPT_ID)?.remove();
    vi.useRealTimers();
  });

  it('renders the HubSpot frame with the configured region and IDs', async () => {
    const { frame } = await render();
    expect(frame.dataset['region']).toBe(environment.hubspot.region);
    expect(frame.dataset['portalId']).toBe(environment.hubspot.portalId);
    expect(frame.dataset['formId']).toBe(environment.hubspot.formId);
  });

  it('injects the embed script once and shows a loading state', async () => {
    const { el, script } = await render();
    expect(script()?.src).toBe(environment.hubspot.embedScript);
    expect(document.querySelectorAll(`#${EMBED_SCRIPT_ID}`)).toHaveLength(1);
    expect(el.querySelector('.loading')?.textContent).toContain('Loading the form');
  });

  it('clears the embed guard so a remount re-renders', async () => {
    (window as unknown as Record<string, unknown>)['__HS__FORMS__EMBED__'] = { mounted: true };
    await render();
    expect('__HS__FORMS__EMBED__' in window).toBe(false);
    await render();
    expect(document.querySelectorAll(`#${EMBED_SCRIPT_ID}`)).toHaveLength(1);
  });

  it('becomes ready once HubSpot adds content to the frame', async () => {
    const { fixture, el, frame } = await render();
    frame.appendChild(document.createElement('iframe'));
    await new Promise((r) => setTimeout(r));
    await fixture.whenStable();
    expect(el.querySelector('.loading')).toBeNull();
    expect(el.querySelector('[data-testid="hubspot-fallback"]')).toBeNull();
  });

  it('falls back to email when the script fails to load', async () => {
    const { fixture, el, script } = await render();
    script()!.dispatchEvent(new Event('error'));
    await fixture.whenStable();
    const fallback = el.querySelector('[data-testid="hubspot-fallback"]');
    expect(fallback?.querySelector('a')?.getAttribute('href')).toMatch(/^mailto:/);
  });

  it('falls back to email when HubSpot never renders', async () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(HubspotForm);
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(EMBED_TIMEOUT_MS);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('[data-testid="hubspot-fallback"]'),
    ).not.toBeNull();
  });
});
