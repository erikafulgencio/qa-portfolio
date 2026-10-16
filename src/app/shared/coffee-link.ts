import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Dark pill that keeps filling with coffee — the Professional "Let's grab coffee" call to action. */
@Component({
  selector: 'app-coffee-link',
  imports: [RouterLink],
  template: `
    <a class="coffee" routerLink="/contact" [class.coffee--lg]="size() === 'lg'">
      <span class="liquid" aria-hidden="true">
        <span class="pour"><span class="fill"></span><span class="foam"></span></span>
      </span>
      <span class="rim" aria-hidden="true"></span>
      <span class="cup" aria-hidden="true">
        <span class="steam"></span>
        <i class="ph ph-coffee"></i>
      </span>
      <span class="label">{{ label() }}</span>
    </a>
  `,
  styles: `
    @use 'mixins' as *;

    .coffee {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 11px 18px;
      border-radius: 999px;
      @include kicker(10px, 0.14em);
      color: #fff;
      background: tx(84%);
      text-decoration: none;
      white-space: nowrap;
      transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;

      @media (hover: hover) {
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px -14px ac(75%);
        }
      }

      &--lg {
        padding: 15px 26px;
        font-size: 11.5px;
        letter-spacing: 0.18em;
      }
    }

    .liquid {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      overflow: hidden;
      pointer-events: none;
    }

    .pour {
      position: absolute;
      inset: auto 0 0;
      height: 118%;
      animation: pr-pour 4.2s cubic-bezier(0.4, 0.8, 0.2, 1) infinite;
    }

    .fill {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, #35200f 0%, #6f4526 55%, #9c6b3d 100%);
    }

    .foam {
      position: absolute;
      left: -20%;
      right: -20%;
      top: -6px;
      height: 13px;
      border-radius: 50%;
      background: #cfa878;
      opacity: 0.9;
      animation: pr-slosh 2.1s ease-in-out infinite;
    }

    .rim {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
      pointer-events: none;
    }

    .cup {
      position: relative;
      display: inline-grid;
      place-items: center;
      width: 15px;
      height: 15px;

      i {
        font-size: 14px;
        animation: pr-cup 3.4s ease-in-out infinite;
      }
    }

    .steam {
      position: absolute;
      top: -7px;
      width: 3px;
      height: 9px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.75);
      animation: pr-steam 2.4s ease-out infinite;
    }

    .label {
      position: relative;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoffeeLink {
  readonly label = input("Let's grab coffee");
  readonly size = input<'md' | 'lg'>('md');
}
