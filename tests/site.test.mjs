import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root), "utf8");

test("exact approved NAP and canonical domain are centralized", () => {
  const store = read("app/lib/store.ts");
  assert.match(store, /Jane Wilson Cannabis Dispensary/);
  assert.match(store, /2111 Jane St #12, North York, ON M3M 1A2, Canada/);
  assert.match(store, /437-465-7700/);
  assert.match(store, /janewilsoncannabisdispensary\.com/);
  assert.match(store, /jane-wilson-cannabis-dispensary\.vercel\.app/);
});

test("all five tier labels include Weed", () => {
  const store = read("app/lib/store.ts");
  for (const label of ["Exotic Weed", "Premium Weed", "AAA+ Weed", "AA Weed", "Budget Weed"]) assert.ok(store.includes(label));
});

test("weight price UI covers all standard weights", () => {
  const tier = read("app/[tier]/page.tsx");
  const store = read("app/lib/store.ts");
  for (const weight of ["3.5g", "7g", "14g", "28g"]) assert.ok(store.includes(weight));
  assert.match(tier, /weight and price formats/i);
  assert.match(tier, /CALL FOR TODAY’S PRICE/);
});

test("no unsupported hours, reviews, delivery, or copied JFC identity", () => {
  const files = ["app/page.tsx", "app/layout.tsx", "app/lib/store.ts", "app/[tier]/page.tsx", "app/visit/page.tsx", "app/weed-dispensary-jane-street/page.tsx"].map(read).join("\n");
  assert.doesNotMatch(files, /24 hours|24\/7|Google reviews|delivery available/i);
  assert.doesNotMatch(files, /Jane Finch Cannabis|2728 Jane|JFC01/);
});

test("fleet rebuild ships visit and Jane Street corridor owners", () => {
  const home = read("app/page.tsx");
  const visit = read("app/visit/page.tsx");
  const corridor = read("app/weed-dispensary-jane-street/page.tsx");
  assert.match(home, /RouteHubs/);
  assert.match(visit, /FAQPage/);
  assert.match(visit, /35 Jane/);
  assert.match(corridor, /Jane Street.*Wilson/i);
  assert.match(corridor, /ItemList/);
});

test("tier pages include CollectionPage ItemList FAQ and internal mesh", () => {
  const tier = read("app/[tier]/page.tsx");
  for (const token of ["CollectionPage", "ItemList", "FAQPage", "/visit", "/weed-dispensary-jane-street"]) assert.ok(tier.includes(token));
  assert.doesNotMatch(tier, /Product name from store feed|menu connection in progress/i);
});

test("sitemap lists only live indexable owners and tiers", () => {
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /\/visit/);
  assert.match(sitemap, /\/weed-dispensary-jane-street/);
  assert.doesNotMatch(sitemap, /weed-dispensary-north-york/);
});
