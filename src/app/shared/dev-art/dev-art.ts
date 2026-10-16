import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { DevArt as DevArtKind, DevProject, IconName, Snapshot } from '../../content/models';

type Token = readonly [kind: 'sel' | 'prop' | 'val' | 'punc', text: string];

/** The CSS typed out in the `editor` art, one array of tokens per line. */
const CODE: readonly (readonly Token[])[] = [
  [
    ['sel', '.orb'],
    ['punc', ' {'],
  ],
  [
    ['prop', '  animation'],
    ['punc', ': '],
    ['val', 'orbit 6s linear infinite'],
    ['punc', ';'],
  ],
  [['punc', '}']],
  [
    ['sel', '.switch:checked i'],
    ['punc', ' {'],
  ],
  [
    ['prop', '  translate'],
    ['punc', ': '],
    ['val', '1.2em'],
    ['punc', ';'],
  ],
  [['punc', '}']],
  [
    ['sel', '.ball'],
    ['punc', ' { '],
    ['prop', 'animation'],
    ['punc', ': '],
    ['val', 'squish .8s'],
    ['punc', '; }'],
  ],
];

/** The shell session typed out in the `terminal` art. */
const SHELL: readonly { cmd: boolean; text: string }[] = [
  { cmd: true, text: 'python seed.py --env uat' },
  { cmd: false, text: '✓ fixtures seeded · 3 tables' },
  { cmd: true, text: 'sqlcmd -i reconcile.sql' },
  { cmd: false, text: '✓ 0 mismatches · ui vs db' },
  { cmd: true, text: 'pytest -q' },
  { cmd: false, text: '························ passed' },
  { cmd: true, text: 'python teardown.py' },
  { cmd: false, text: '✓ clean · safe to run again' },
];

/**
 * Animated artwork for a development project. `site` frames real screenshots in a browser and
 * wipes between the two captures, like the site's own mode switch; `editor` and `terminal` are
 * drawn entirely in CSS. A parent can lift the frames by setting `--art-active: 1`.
 */
@Component({
  selector: 'app-dev-art',
  templateUrl: './dev-art.html',
  styleUrl: './dev-art.scss',
  host: { '[class.fill]': 'fill()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevArt {
  readonly art = input.required<DevArtKind>();
  readonly screens = input<DevProject['screens']>();
  readonly highlights = input<DevProject['highlights']>([]);
  /** Large faint icon in the background. */
  readonly icon = input<IconName>();
  /** Address shown in the browser bar of the `site` art. */
  readonly url = input<string>();
  /** Hide the whole artwork from assistive tech, e.g. inside a card link that is already labelled. */
  readonly decorative = input(false);
  /** Stretch to the parent's height instead of keeping 16:10. */
  readonly fill = input(false);

  protected readonly code = CODE;
  protected readonly shell = SHELL;
  protected readonly sparks = [0, 1, 2, 3, 4, 5];

  protected readonly address = computed(() =>
    (this.url() ?? '').replace(/^https?:\/\//, '').replace(/\/$/, ''),
  );

  /** "Professional · home" → "Professional". */
  protected modeOf(s: Snapshot): string {
    return s.caption.split(' · ')[0];
  }

  protected altOf(s: Snapshot): string {
    return this.decorative() ? '' : s.alt;
  }
}
