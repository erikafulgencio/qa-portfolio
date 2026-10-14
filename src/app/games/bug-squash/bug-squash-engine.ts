/**
 * Bug Squash game rules, free of Angular and the DOM so they can be unit-tested with a fake clock.
 * Positions are percentages of the arena; velocities are percent per second; times are milliseconds.
 */

export type SquashPhase = 'idle' | 'run' | 'over';

export interface Bug {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  life: number;
}

export interface Splat {
  id: number;
  x: number;
  y: number;
  pts: number;
}

export const ROUND_SECONDS = 20;
export const MAX_BUGS = 6;
export const FAST_SQUASH_MS = 1500;
export const FAST_POINTS = 15;
export const SLOW_POINTS = 10;
const MIN_FRAME_S = 0.028;
const MAX_FRAME_S = 0.05;

export class BugSquashEngine {
  phase: SquashPhase = 'idle';
  score = 0;
  best = 0;
  escaped = 0;
  timeLeft = ROUND_SECONDS;
  bugs: Bug[] = [];
  splats: Splat[] = [];
  squashes = 0;

  private startedAt = 0;
  private lastFrame = 0;
  private nextId = 1;

  constructor(private readonly random: () => number = Math.random) {}

  start(now: number): void {
    this.phase = 'run';
    this.score = 0;
    this.escaped = 0;
    this.timeLeft = ROUND_SECONDS;
    this.splats = [];
    this.squashes = 0;
    this.startedAt = now;
    this.lastFrame = now;
    this.bugs = [this.spawn(now), this.spawn(now), this.spawn(now)];
  }

  /** Bugs on screen grow from 3 to 6 as the round goes on. */
  targetBugCount(): number {
    return Math.min(MAX_BUGS, 3 + Math.floor((ROUND_SECONDS - this.timeLeft) / 7));
  }

  /** Advances the round to `now`. Returns true when visible state changed. */
  step(now: number): boolean {
    if (this.phase !== 'run') return false;

    const left = ROUND_SECONDS - Math.floor((now - this.startedAt) / 1000);
    if (left <= 0) {
      this.finish();
      return true;
    }
    const clockChanged = left !== this.timeLeft;
    this.timeLeft = left;

    const dt = Math.min(MAX_FRAME_S, (now - this.lastFrame) / 1000);
    if (dt < MIN_FRAME_S) return clockChanged;
    this.lastFrame = now;

    const kept: Bug[] = [];
    for (const b of this.bugs) {
      if (now - b.born > b.life) {
        this.escaped++;
        continue;
      }
      let vx = b.vx + (this.random() - 0.5) * 14 * dt;
      let vy = b.vy + (this.random() - 0.5) * 14 * dt;
      let x = b.x + vx * dt;
      let y = b.y + vy * dt;
      if (x < 6) [x, vx] = [6, Math.abs(vx)];
      if (x > 94) [x, vx] = [94, -Math.abs(vx)];
      if (y < 8) [y, vy] = [8, Math.abs(vy)];
      if (y > 92) [y, vy] = [92, -Math.abs(vy)];
      kept.push({ ...b, x, y, vx, vy });
    }
    while (kept.length < this.targetBugCount()) kept.push(this.spawn(now));
    this.bugs = kept;
    return true;
  }

  /** Squashes a bug: 15 points inside the first 1.5s of its life, otherwise 10. */
  squash(id: number, now: number): number {
    if (this.phase !== 'run') return 0;
    const bug = this.bugs.find((b) => b.id === id);
    if (!bug) return 0;
    const pts = now - bug.born < FAST_SQUASH_MS ? FAST_POINTS : SLOW_POINTS;
    this.score += pts;
    this.squashes++;
    this.bugs = [...this.bugs.filter((b) => b.id !== id), this.spawn(now)].slice(-MAX_BUGS);
    this.splats = [...this.splats, { id: bug.id, x: bug.x, y: bug.y, pts }].slice(-4);
    return pts;
  }

  /** Bug heading in degrees, for rotating the sprite. */
  static heading(b: Pick<Bug, 'vx' | 'vy'>): number {
    return (Math.atan2(b.vy, b.vx) * 180) / Math.PI + 90;
  }

  private finish(): void {
    this.phase = 'over';
    this.timeLeft = 0;
    this.bugs = [];
    this.best = Math.max(this.best, this.score);
  }

  private spawn(now: number): Bug {
    const angle = this.random() * Math.PI * 2;
    const speed = 11 + this.random() * 12;
    return {
      id: this.nextId++,
      x: 12 + this.random() * 76,
      y: 14 + this.random() * 72,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      born: now,
      life: 4200 + this.random() * 2200,
    };
  }
}
