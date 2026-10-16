// Encodes a contact detail for src/app/content/profile.ts (decoded by content/protect.ts `reveal`).
// Usage: node scripts/protect.mjs "+63 912-345-6789"
const text = process.argv[2];
if (!text) {
  console.error('usage: node scripts/protect.mjs "<email or phone number>"');
  process.exit(1);
}
console.log(Buffer.from([...text].reverse().join(''), 'utf8').toString('base64'));
