import {
  BugSquashEngine,
  FAST_POINTS,
  MAX_BUGS,
  ROUND_SECONDS,
  SLOW_POINTS,
} from './bug-squash-engine';

/** Deterministic random source cycling through fixed values. */
const fixedRandom = (...values: number[]) => {
  let i = 0;
  return () => values[i++ % values.length];
};

describe('BugSquashEngine', () => {
  let engine: BugSquashEngine;

  beforeEach(() => {
    engine = new BugSquashEngine(fixedRandom(0.5));
    engine.start(0);
  });

  it('starts a 20 second round with three bugs and a clean score', () => {
    expect(engine.phase).toBe('run');
    expect(engine.timeLeft).toBe(ROUND_SECONDS);
    expect(engine.bugs).toHaveLength(3);
    expect(engine.score).toBe(0);
    expect(engine.escaped).toBe(0);
  });

  it('spawns bugs inside the arena', () => {
    for (const b of engine.bugs) {
      expect(b.x).toBeGreaterThanOrEqual(12);
      expect(b.x).toBeLessThanOrEqual(88);
      expect(b.y).toBeGreaterThanOrEqual(14);
      expect(b.y).toBeLessThanOrEqual(86);
    }
  });

  it('awards 15 points for a fast squash and 10 after 1.5s', () => {
    const [first, second] = engine.bugs;
    expect(engine.squash(first.id, 1000)).toBe(FAST_POINTS);
    expect(engine.squash(second.id, 1600)).toBe(SLOW_POINTS);
    expect(engine.score).toBe(25);
    expect(engine.squashes).toBe(2);
  });

  it('replaces a squashed bug and keeps at most four splats', () => {
    for (let i = 0; i < 6; i++) engine.squash(engine.bugs[0].id, 100 + i);
    expect(engine.bugs).toHaveLength(3);
    expect(engine.splats).toHaveLength(4);
  });

  it('ignores clicks on unknown bugs', () => {
    expect(engine.squash(9999, 10)).toBe(0);
    expect(engine.score).toBe(0);
  });

  it('skips frames shorter than 28ms', () => {
    const before = engine.bugs.map((b) => b.x);
    engine.step(20);
    expect(engine.bugs.map((b) => b.x)).toEqual(before);
  });

  it('moves bugs and keeps them within the walls', () => {
    for (let t = 40; t < 4000; t += 40) engine.step(t);
    for (const b of engine.bugs) {
      expect(b.x).toBeGreaterThanOrEqual(6);
      expect(b.x).toBeLessThanOrEqual(94);
      expect(b.y).toBeGreaterThanOrEqual(8);
      expect(b.y).toBeLessThanOrEqual(92);
    }
  });

  it('counts bugs that outlive their lifetime as escaped and respawns them', () => {
    // fixedRandom(0.5) gives every bug a 5300ms life.
    for (let t = 40; t <= 5400; t += 40) engine.step(t);
    expect(engine.escaped).toBeGreaterThanOrEqual(3);
    expect(engine.bugs.length).toBeGreaterThanOrEqual(3);
  });

  it('ramps up to more bugs as time runs out, capped at six', () => {
    engine.timeLeft = 13; // 7s elapsed
    expect(engine.targetBugCount()).toBe(4);
    engine.timeLeft = 6;
    expect(engine.targetBugCount()).toBe(5);
    engine.timeLeft = -100;
    expect(engine.targetBugCount()).toBe(MAX_BUGS);
  });

  it('ticks the clock down once per second', () => {
    engine.step(1000);
    expect(engine.timeLeft).toBe(19);
    engine.step(5500);
    expect(engine.timeLeft).toBe(15);
  });

  it('ends the round at 20 seconds and records the best score', () => {
    engine.squash(engine.bugs[0].id, 10);
    engine.step(20_000);
    expect(engine.phase).toBe('over');
    expect(engine.timeLeft).toBe(0);
    expect(engine.bugs).toHaveLength(0);
    expect(engine.best).toBe(FAST_POINTS);
    expect(engine.squash(1, 20_010)).toBe(0);
  });

  it('keeps the best score across rounds', () => {
    engine.squash(engine.bugs[0].id, 10);
    engine.step(20_000);
    engine.start(30_000);
    engine.step(50_000);
    expect(engine.score).toBe(0);
    expect(engine.best).toBe(FAST_POINTS);
  });

  it('points the sprite along its velocity', () => {
    expect(BugSquashEngine.heading({ vx: 1, vy: 0 })).toBe(90);
    expect(BugSquashEngine.heading({ vx: 0, vy: 1 })).toBe(180);
  });
});
