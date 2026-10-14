import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { MODE_STORAGE_KEY, ModeService } from './mode.service';

describe('ModeService', () => {
  const setup = () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ModeService);
    TestBed.tick();
    return service;
  };

  beforeEach(() => localStorage.clear());

  it('defaults to Professional', () => {
    const service = setup();
    expect(service.mode()).toBe('pro');
    expect(service.isPro()).toBe(true);
    expect(document.documentElement.getAttribute('data-mode')).toBe('pro');
  });

  it('restores a saved Alter Ego preference', () => {
    localStorage.setItem(MODE_STORAGE_KEY, 'alter');
    expect(setup().mode()).toBe('alter');
  });

  it('ignores unknown stored values', () => {
    localStorage.setItem(MODE_STORAGE_KEY, 'dark');
    expect(setup().mode()).toBe('pro');
  });

  it('switches through the loader transition and persists the choice', () => {
    const service = setup();
    const loader = TestBed.inject(LoaderService);
    const transition = vi.spyOn(loader, 'transition');

    service.switchTo('alter');
    TestBed.tick();

    expect(transition).toHaveBeenCalledOnce();
    expect(service.mode()).toBe('alter');
    expect(document.documentElement.getAttribute('data-mode')).toBe('alter');
    expect(localStorage.getItem(MODE_STORAGE_KEY)).toBe('alter');
  });

  it('does not run a transition when the mode is unchanged', () => {
    const service = setup();
    const transition = vi.spyOn(TestBed.inject(LoaderService), 'transition');
    service.switchTo('pro');
    expect(transition).not.toHaveBeenCalled();
  });

  it('still works when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const service = setup();
    expect(service.mode()).toBe('pro');
    service.toggle();
    TestBed.tick();
    expect(service.mode()).toBe('alter');
    vi.restoreAllMocks();
  });
});
