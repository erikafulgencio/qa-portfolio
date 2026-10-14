import { TestBed } from '@angular/core/testing';

import { SPOT_MESSAGES, SpotTheDefect } from './spot-the-defect';

describe('SpotTheDefect', () => {
  const render = async () => {
    const fixture = TestBed.createComponent(SpotTheDefect);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const row = (id: string) =>
      [...el.querySelectorAll<HTMLButtonElement>('.row')].find((r) => r.textContent?.includes(id))!;
    const message = () => el.querySelector('.msg')!.textContent!.trim();
    return { fixture, el, row, message };
  };

  it('shows six PASS rows and the idle prompt', async () => {
    const { el, message } = await render();
    const rows = el.querySelectorAll('.row');
    expect(rows).toHaveLength(6);
    rows.forEach((r) => expect(r.querySelector('.status')!.textContent).toBe('PASS'));
    expect(message()).toBe(SPOT_MESSAGES.idle);
  });

  it('rewards picking TC-03 and explains the defect', async () => {
    const { fixture, row, message } = await render();
    row('TC-03').click();
    await fixture.whenStable();
    expect(message()).toBe(SPOT_MESSAGES.hit);
    expect(row('TC-03').getAttribute('aria-pressed')).toBe('true');
  });

  it('nudges on a wrong pick and resets', async () => {
    const { fixture, el, row, message } = await render();
    row('TC-01').click();
    await fixture.whenStable();
    expect(message()).toBe(SPOT_MESSAGES.miss);
    el.querySelector<HTMLButtonElement>('.reset')!.click();
    await fixture.whenStable();
    expect(message()).toBe(SPOT_MESSAGES.idle);
  });
});
