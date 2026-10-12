// Fails the build if the private SOD delivery line reaches public output (HTML, RSC, JS, sitemap, robots).
// The number is NEVER stored in this public repository. It is read at build time from the
// SOD_STORE_JWS01_PHONE environment variable (set in Vercel / CI secrets). If the variable is
// missing, the check is skipped with a notice so local and fork builds still pass.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const raw = process.env.SOD_STORE_JWS01_PHONE || "";
const digits = raw.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
if (digits.length !== 10) {
  console.log("check-public-phones: SKIPPED (SOD_STORE_JWS01_PHONE not set)");
  process.exit(0);
}
const a = digits.slice(0, 3), b = digits.slice(3, 6), c = digits.slice(6);
const needles = [digits, `1${digits}`, `${a}-${b}-${c}`, `(${a}) ${b}-${c}`, `${a} ${b} ${c}`, `${a}.${b}.${c}`];
const roots = [".next/server/app", ".next/static", "public"].filter((p) => existsSync(p));
const exts = /\.(html|rsc|body|js|json|txt|xml|meta|css)$/;
let hits = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (exts.test(name)) {
      const text = readFileSync(p, "utf8");
      if (needles.some((n) => text.includes(n))) { hits++; console.error(`Private delivery line found in public output: ${p}`); }
    }
  }
}
roots.forEach(walk);
if (hits) process.exit(1);
console.log(`check-public-phones: OK (${roots.join(", ")} scanned, private delivery line absent)`);
