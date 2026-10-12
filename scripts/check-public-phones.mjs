// Fails the build if the internal SOD delivery line reaches public output (HTML, RSC, JS, sitemap, robots).
// Digits are assembled at runtime so this script itself never contains the literal.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const d = ["437", "523", "7076"];
const needles = [d.join("-"), d.join(""), `(${d[0]}) ${d[1]}-${d[2]}`, d.join(" "), d.join(".")];
const roots = [".next/server/app", ".next/static", "public"].filter((p) => existsSync(p));
const exts = /\.(html|rsc|body|js|json|txt|xml|meta|css)$/;
const hits = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (exts.test(name)) {
      const text = readFileSync(p, "utf8");
      for (const n of needles) if (text.includes(n)) hits.push(`${p}: ${n}`);
    }
  }
}
roots.forEach(walk);
if (hits.length) {
  console.error("Internal SOD delivery line found in public output:\n" + hits.join("\n"));
  process.exit(1);
}
console.log(`check-public-phones: OK (${roots.join(", ")} scanned, SOD line absent)`);
