/**
 * Reading progress through the "full story" section, as a whole percentage (0–100).
 * Starts once the section top passes 45% of the viewport and completes when its bottom
 * is half a viewport from the top.
 */
export function storyProgress(
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number,
): number {
  const span = sectionHeight - viewportHeight * 0.5;
  const p = (viewportHeight * 0.45 - sectionTop) / (span > 0 ? span : 1);
  return Math.round(Math.max(0, Math.min(1, p)) * 100);
}

/** Index of the active chapter: the last one whose top has scrolled above 42% of the viewport. */
export function activeChapter(chapterTops: readonly number[], viewportHeight: number): number {
  let idx = 0;
  chapterTops.forEach((top, i) => {
    if (top < viewportHeight * 0.42) idx = i;
  });
  return idx;
}
