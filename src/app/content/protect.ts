/**
 * Contact details (email, phone, Viber) are stored encoded, so they never appear as readable text in
 * the page or the JavaScript bundles that address harvesters scan. They are decoded only when a
 * visitor asks for them. Encode a new value with `node scripts/protect.mjs "<text>"`.
 */
export function reveal(code: string): string {
  return [...atob(code)].reverse().join('');
}
