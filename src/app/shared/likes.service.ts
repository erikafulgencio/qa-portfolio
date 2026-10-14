import { Injectable, signal } from '@angular/core';

export interface HeartBurst {
  /** Seed for the deterministic heart layout. */
  seed: number;
}

export const HEART_COUNT = 120;
export const BURST_MS = 5200;

/** Project "appreciation" likes (in-memory only) and the heart-rain celebration they trigger. */
@Injectable({ providedIn: 'root' })
export class LikesService {
  private readonly liked = signal<Record<string, boolean>>({});
  readonly burst = signal<HeartBurst | null>(null);
  private timer: ReturnType<typeof setTimeout> | undefined;

  isLiked(id: string): boolean {
    return !!this.liked()[id];
  }

  /** Toggles a like; liking (not unliking) starts the heart rain and the thank-you toast. */
  toggle(id: string, now = Date.now()): void {
    const next = !this.isLiked(id);
    this.liked.update((m) => ({ ...m, [id]: next }));
    if (!next) return;
    this.burst.set({ seed: now });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.burst.set(null), BURST_MS);
  }
}

export interface Heart {
  left: number;
  size: number;
  dur: number;
  delay: number;
  color: string;
}

const HEART_COLORS = ['#6d4bd6', '#8b6cea', '#3f2b8f', '#ff6b8a', '#b9a6f5', '#ff9db3'];

/** Deterministic pseudo-random heart layout (sine-seeded, as in the original design). */
export function heartLayout(seed: number, count = HEART_COUNT): Heart[] {
  const r = (i: number, k: number) => {
    const x = Math.sin(seed * 0.001 + i * 12.9898 + k * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return Array.from({ length: count }, (_, i) => ({
    left: 2 + r(i, 1) * 94,
    size: 14 + r(i, 2) * 20,
    dur: 2.4 + r(i, 3) * 1.8,
    delay: r(i, 4) * 1.6,
    color: HEART_COLORS[i % HEART_COLORS.length],
  }));
}
