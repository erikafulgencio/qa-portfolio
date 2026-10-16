import { isStaleChunkError } from './stale-chunk';

describe('isStaleChunkError', () => {
  it('recognises the stale-chunk errors of each browser', () => {
    for (const message of [
      'Failed to fetch dynamically imported module: https://x/chunk-ABC.js', // Chrome
      'Importing a module script failed.', // Safari
      'error loading dynamically imported module: https://x/chunk-ABC.js', // Firefox
    ]) {
      expect(isStaleChunkError(new TypeError(message))).toBe(true);
    }
  });

  it('ignores ordinary errors', () => {
    expect(isStaleChunkError(new Error('Cannot read properties of undefined'))).toBe(false);
    expect(isStaleChunkError(undefined)).toBe(false);
  });
});
