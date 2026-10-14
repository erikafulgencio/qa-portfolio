import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';

import { BugSquashEngine, type Bug, type Splat, type SquashPhase } from './bug-squash-engine';

interface Snapshot {
  phase: SquashPhase;
  score: number;
  best: number;
  escaped: number;
  timeLeft: number;
  bugs: Bug[];
  splats: Splat[];
  squashes: number;
}

/**
 * Drives one shared BugSquashEngine with requestAnimationFrame. Root-scoped so the best score
 * survives navigation and both Home variants (Professional and Alter Ego) show the same round.
 */
@Injectable({ providedIn: 'root' })
export class BugSquashGame {
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly engine = new BugSquashEngine();
  private frame = 0;

  private readonly state = signal<Snapshot>(this.snapshot());

  readonly phase = computed(() => this.state().phase);
  readonly score = computed(() => this.state().score);
  readonly best = computed(() => this.state().best);
  readonly escaped = computed(() => this.state().escaped);
  readonly bugs = computed(() => this.state().bugs);
  readonly splats = computed(() => this.state().splats);
  readonly squashes = computed(() => this.state().squashes);
  readonly clock = computed(() => `00:${String(this.state().timeLeft).padStart(2, '0')}`);
  readonly title = computed(() => (this.phase() === 'over' ? 'Run complete' : 'Bug Squash'));
  readonly subtitle = computed(() =>
    this.phase() === 'over'
      ? `Score ${this.score()} · ${this.escaped()} escaped into production.`
      : '20 seconds. Click every bug before it escapes to production.',
  );
  readonly cta = computed(() => (this.phase() === 'over' ? 'Run it again' : 'Start hunt'));

  start(): void {
    this.engine.start(this.now());
    this.sync();
    this.loop();
  }

  /** Restarts the frame loop for a round still in progress (after the arena was re-mounted). */
  resume(): void {
    if (this.engine.phase === 'run' && !this.frame) this.loop();
  }

  squash(id: number): void {
    if (this.engine.squash(id, this.now())) this.sync();
  }

  /** Stops the animation loop (e.g. when the arena leaves the page); the round resumes on the next start. */
  stop(): void {
    if (this.frame) this.window?.cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  private loop(): void {
    this.stop();
    const win = this.window;
    if (!win) return;
    const tick = () => {
      if (this.engine.step(this.now())) this.sync();
      this.frame = this.engine.phase === 'run' ? win.requestAnimationFrame(tick) : 0;
    };
    this.frame = win.requestAnimationFrame(tick);
  }

  private now(): number {
    return this.window?.performance.now() ?? Date.now();
  }

  private sync(): void {
    this.state.set(this.snapshot());
  }

  private snapshot(): Snapshot {
    const e = this.engine;
    return {
      phase: e.phase,
      score: e.score,
      best: e.best,
      escaped: e.escaped,
      timeLeft: e.timeLeft,
      bugs: e.bugs,
      splats: e.splats,
      squashes: e.squashes,
    };
  }
}
