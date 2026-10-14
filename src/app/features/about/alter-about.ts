import { ChangeDetectionStrategy, Component } from '@angular/core';

import type { IconName } from '../../content/models';
import { ALTER_INTERESTS } from '../../content/about';
import { SpotTheDefect } from '../../games/spot-the-defect/spot-the-defect';

@Component({
  selector: 'app-alter-about',
  imports: [SpotTheDefect],
  templateUrl: './alter-about.html',
  styleUrl: './alter-about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlterAbout {
  protected readonly interests = ALTER_INTERESTS;

  protected readonly lore = [
    "Then I got bored. All I did was test. So I made it a challenge instead — hunting edge cases, chasing the bugs that were hard to isolate, digging until I found the root cause, and cheerfully becoming the programmer's problem, because they were the ones who had to fix it.",
    "That's where I shine. It built my critical thinking and showed me I love exploring — the thrill of finding a bug nobody thought of, one you almost can't believe is a bug. That's when QA stopped being a shortcut and became the thing I love.",
    "Further in, I see it's deeper still — like an iceberg. A defect isn't always the code. Sometimes it's the requirement, a conflict in the business rules, the design, the mockup, the environment. It's not the dev's fault; it's the whole team's system.",
  ];

  protected readonly cosplay = [
    {
      src: 'assets/img/cosplay-townhall.jpg',
      alt: 'Erika cosplaying a fem Kento Nanami at the company townhall',
      position: '50% 50%',
    },
    {
      src: 'assets/img/cosplay-walk.jpg',
      alt: 'Erika walking in her Kento Nanami cosplay, sunglasses on',
      position: '50% 30%',
    },
    {
      src: 'assets/img/erika-headphones.jpg',
      alt: 'Erika with headphones on',
      position: '50% 50%',
    },
  ];

  protected readonly currently: { icon: IconName; text: string }[] = [
    {
      icon: 'ph-books',
      text: 'Reviewing for the ISTQB Test Management exam, and exploring Claude Design, Claude Code and automation testing.',
    },
    { icon: 'ph-television-simple', text: 'Watching The Office — third run.' },
    {
      icon: 'ph-game-controller',
      text: 'Playing tower defense, idle, card, simulation and MMORPG.',
    },
    { icon: 'ph-coffee', text: 'Wants right now: a good coffee and a hug from my puppy.' },
  ];
}
