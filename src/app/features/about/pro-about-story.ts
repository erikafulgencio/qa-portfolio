import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  effect,
  inject,
  signal,
  untracked,
  viewChildren,
} from '@angular/core';

import { ScrollService } from '../../core/scroll.service';
import { STORY_ACTS } from '../../content/about';
import { activeChapter, storyProgress } from './story-progress';

/** "The full story": seven chapters with a reading-progress bar and a sticky chapter rail. */
@Component({
  selector: 'app-pro-about-story',
  templateUrl: './pro-about-story.html',
  styleUrl: './pro-about-story.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'full-story', class: 'story', 'aria-labelledby': 'story-title', role: 'region' },
})
export class ProAboutStory {
  private readonly scroll = inject(ScrollService);
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly acts = STORY_ACTS;
  protected readonly progress = signal(0);
  protected readonly activeIdx = signal(0);

  private readonly chapters = viewChildren<ElementRef<HTMLElement>>('chapter');

  constructor() {
    // Re-measure on every scroll tick.
    effect(() => {
      this.scroll.y();
      const chapters = this.chapters();
      if (!this.window) return;
      const vh = this.window.innerHeight;
      const rect = this.host.nativeElement.getBoundingClientRect();
      untracked(() => {
        this.progress.set(storyProgress(rect.top, rect.height, vh));
        this.activeIdx.set(
          activeChapter(
            chapters.map((c) => c.nativeElement.getBoundingClientRect().top),
            vh,
          ),
        );
      });
    });
  }

  protected jumpTo(index: number): void {
    const el = this.chapters()[index]?.nativeElement;
    if (el) this.scroll.toElement(el, 96);
  }
}
