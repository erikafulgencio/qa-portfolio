import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { HEART_PATH } from './heart-path';
import { LikesService } from './likes.service';

/** Heart toggle for a project. `label` mode shows "Appreciate this / Appreciated" instead of a count. */
@Component({
  selector: 'app-like-button',
  template: `
    <button
      type="button"
      class="like"
      [class.like--on]="liked()"
      [attr.aria-pressed]="liked()"
      [attr.aria-label]="(liked() ? 'Remove appreciation for ' : 'Appreciate ') + title()"
      [title]="liked() ? 'Appreciated' : 'Appreciate this project'"
      (click)="toggle($event)"
    >
      <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
        <path
          [attr.d]="heart"
          [attr.fill]="liked() ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="14"
        />
      </svg>
      @if (withLabel()) {
        <span>{{ liked() ? 'Appreciated' : 'Appreciate this' }}</span>
      } @else {
        <span>{{ liked() ? 1 : 0 }}</span>
      }
    </button>
  `,
  styles: `
    @use 'mixins' as *;

    .like {
      flex: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      padding: 6px 11px;
      border-radius: 999px;
      border: 1px solid tx(14%);
      background: transparent;
      color: tx(55%);
      @include mono(10px);
      transition: all 0.25s ease;

      &:hover {
        transform: translateY(-2px);
      }

      &--on {
        color: var(--gs-hot-soft);
        background: hot(12%);
        border-color: hot(45%);

        svg {
          animation: pr-heart 0.6s ease;
        }
      }
    }

    svg {
      width: 13px;
      height: 13px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikeButton {
  private readonly likes = inject(LikesService);

  readonly projectId = input.required<string>();
  readonly title = input('this project');
  readonly withLabel = input(false);

  protected readonly heart = HEART_PATH;
  protected readonly liked = computed(() => {
    this.likes.burst(); // re-evaluate after every toggle
    return this.likes.isLiked(this.projectId());
  });

  protected toggle(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.likes.toggle(this.projectId());
  }
}
