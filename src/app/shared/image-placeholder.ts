import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Stand-in for imagery that has not been added yet (certificates, game screenshots, logos).
 * Drop the real file under public/assets and set `src` in the content file to replace it.
 */
@Component({
  selector: 'app-image-placeholder',
  template: `
    @if (src(); as s) {
      <img [src]="s" [alt]="label()" loading="lazy" decoding="async" />
    } @else {
      <div class="placeholder-tile" role="img" [attr.aria-label]="label()">
        @if (initials()) {
          <span class="initials">{{ initials() }}</span>
        } @else {
          <i class="ph {{ icon() }}" aria-hidden="true"></i>
        }
        @if (showLabel()) {
          <span class="caption">{{ label() }}</span>
        }
      </div>
    }
  `,
  styles: `
    @use 'mixins' as *;

    :host {
      display: block;
      overflow: hidden;
      border-radius: inherit;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .placeholder-tile {
      position: relative;
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      align-content: center;
      gap: 6px;
      padding: 8px;
      text-align: center;
      color: var(--gs-accent);
      background:
        radial-gradient(circle at 30% 20%, ac(18%), transparent 60%),
        linear-gradient(150deg, ac(10%), hot(8%));

      i {
        font-size: 22px;
        opacity: 0.8;
      }
    }

    .initials {
      font-family: var(--font-heading);
      font-weight: 600;
      font-size: 18px;
      letter-spacing: 0.04em;
    }

    .caption {
      @include mono(8.5px, 0.08em);
      text-transform: uppercase;
      color: tx(55%);
      line-height: 1.3;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePlaceholder {
  readonly label = input.required<string>();
  readonly src = input<string | undefined>();
  readonly icon = input('ph-image');
  readonly initials = input('');
  readonly showLabel = input(true);
}
