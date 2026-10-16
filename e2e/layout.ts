import type { Page } from '@playwright/test';

// Layout measurements shared by responsive.spec.ts and mobile.spec.ts.

export interface Layout {
  overflow: string[];
  broken: string[];
  smallTargets: string[];
}

/** Runs in the page. Kept dependency-free: it is serialised into the browser. */
export function measure(touch: boolean): Layout {
  const vw = innerWidth;
  const visible = (el: Element) => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return s.visibility !== 'hidden' && s.display !== 'none' && r.width > 0 && r.height > 0;
  };
  const describe = (el: Element) => {
    let host = el.parentElement;
    while (host && !host.tagName.includes('-')) host = host.parentElement;
    const cls = [...el.classList].slice(0, 2).join('.');
    return `${host ? host.tagName.toLowerCase() + ' › ' : ''}${el.tagName.toLowerCase()}${cls ? '.' + cls : ''}`;
  };

  const overflow: string[] = [];
  if (document.documentElement.scrollWidth > vw + 1) {
    for (const el of document.querySelectorAll('body *')) {
      if (el.getBoundingClientRect().right > vw + 1 && visible(el)) overflow.push(describe(el));
      if (overflow.length >= 5) break;
    }
    if (!overflow.length) overflow.push(`page is ${document.documentElement.scrollWidth}px wide`);
  }

  const broken = [...document.images]
    .filter((img) => img.complete && img.naturalWidth === 0 && img.getAttribute('src'))
    .map((img) => img.getAttribute('src') ?? '');

  const smallTargets: string[] = [];
  if (touch) {
    for (const el of document.querySelectorAll<HTMLElement>(
      'a[href], button, [role="button"], input:not([type="hidden"]), select, textarea',
    )) {
      if (el.closest('[aria-hidden="true"]') || !visible(el)) continue;
      // Stretched links: an absolutely positioned ::after makes the whole card the target.
      if (getComputedStyle(el, '::after').position === 'absolute') continue;
      // Links inside running text are exempt (WCAG 2.5.8 "inline" exception).
      const s = getComputedStyle(el);
      if (s.display === 'inline' && /^(P|LI|SPAN|DD|TD)$/.test(el.parentElement?.tagName ?? '')) {
        continue;
      }
      const r = el.getBoundingClientRect();
      if (r.width < 24 || r.height < 24) {
        smallTargets.push(`${describe(el)} ${Math.round(r.width)}×${Math.round(r.height)}`);
      }
    }
  }
  return { overflow, broken, smallTargets };
}

export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    scrollTo(0, 0);
  });
}

export interface MobileText {
  /** Form fields under 16px: iOS Safari zooms the whole page in when one is focused. */
  zoomingFields: string[];
  /** Share of visible characters set below 12px (Lighthouse "legible font sizes" allows 40%). */
  smallTextShare: number;
}

/** Runs in the page. */
export function measureText(): MobileText {
  const zoomingFields = [...document.querySelectorAll<HTMLElement>('input, select, textarea')]
    .filter((el) => !el.closest('[aria-hidden="true"]') && el.getBoundingClientRect().width > 0)
    .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16)
    .map((el) => `${el.getAttribute('name') ?? el.id} ${getComputedStyle(el).fontSize}`);

  let total = 0;
  let small = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const el = n.parentElement;
    const chars = n.textContent?.trim().length ?? 0;
    if (!el || !chars || el.closest('[aria-hidden="true"], .visually-hidden, script, style'))
      continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || getComputedStyle(el).visibility === 'hidden') continue;
    total += chars;
    if (parseFloat(getComputedStyle(el).fontSize) < 12) small += chars;
  }
  return { zoomingFields, smallTextShare: total ? small / total : 0 };
}
