import { activeChapter, storyProgress } from './story-progress';

describe('storyProgress', () => {
  const vh = 1000;

  it('is 0 before the section reaches 45% of the viewport', () => {
    expect(storyProgress(800, 4000, vh)).toBe(0);
    expect(storyProgress(450, 4000, vh)).toBe(0);
  });

  it('grows linearly while scrolling through the section', () => {
    // span = 4000 - 500 = 3500; (450 - (-1300)) / 3500 = 0.5
    expect(storyProgress(-1300, 4000, vh)).toBe(50);
  });

  it('is capped at 100', () => {
    expect(storyProgress(-10_000, 4000, vh)).toBe(100);
  });

  it('does not divide by zero for short sections', () => {
    expect(storyProgress(0, 300, vh)).toBe(100);
  });
});

describe('activeChapter', () => {
  it('defaults to the first chapter', () => {
    expect(activeChapter([600, 1400, 2200], 1000)).toBe(0);
  });

  it('picks the last chapter above 42% of the viewport', () => {
    expect(activeChapter([-900, -100, 300, 1200], 1000)).toBe(2);
  });

  it('handles an empty list', () => {
    expect(activeChapter([], 1000)).toBe(0);
  });
});
