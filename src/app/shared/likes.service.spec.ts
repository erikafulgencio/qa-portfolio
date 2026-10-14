import { TestBed } from '@angular/core/testing';

import { BURST_MS, HEART_COUNT, LikesService, heartLayout } from './likes.service';

describe('LikesService', () => {
  let likes: LikesService;

  beforeEach(() => {
    vi.useFakeTimers();
    likes = TestBed.inject(LikesService);
  });

  afterEach(() => vi.useRealTimers());

  it('toggles a like on and off', () => {
    likes.toggle('pw');
    expect(likes.isLiked('pw')).toBe(true);
    likes.toggle('pw');
    expect(likes.isLiked('pw')).toBe(false);
  });

  it('starts the heart rain only when liking, and clears it after the burst', () => {
    likes.toggle('pw', 42);
    expect(likes.burst()).toEqual({ seed: 42 });
    vi.advanceTimersByTime(BURST_MS);
    expect(likes.burst()).toBeNull();

    likes.toggle('pw'); // unlike
    expect(likes.burst()).toBeNull();
  });
});

describe('heartLayout', () => {
  it('is deterministic for a seed and stays on screen', () => {
    const a = heartLayout(1234);
    expect(a).toHaveLength(HEART_COUNT);
    expect(heartLayout(1234)).toEqual(a);
    for (const h of a) {
      expect(h.left).toBeGreaterThanOrEqual(2);
      expect(h.left).toBeLessThanOrEqual(96);
      expect(h.size).toBeGreaterThanOrEqual(14);
      expect(h.size).toBeLessThanOrEqual(34);
    }
  });
});
