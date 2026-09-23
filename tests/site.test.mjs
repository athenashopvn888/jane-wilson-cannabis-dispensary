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
});

test("all five tier labels include Weed", () => {
  const store = read("app/lib/store.ts");
  for (const label of ["Exotic Weed", "Premium Weed", "AAA+ Weed", "AA Weed", "Budget Weed"]) assert.ok(store.includes(label));
});

test("weight price UI covers all standard weights", () => {
  const tier = read("app/[tier]/page.tsx");
  for (const weight of ["3.5g", "7g", "14g", "28g"]) assert.ok(tier.includes(weight));
  assert.match(tier, /weight prices/i);
});

test("no unsupported hours, reviews, delivery, or copied JFC identity", () => {
  const files = ["app/page.tsx", "app/layout.tsx", "app/lib/store.ts", "app/[tier]/page.tsx"].map(read).join("\n");
  assert.doesNotMatch(files, /24 hours|24\/7|Google reviews|delivery available/i);
  assert.doesNotMatch(files, /Jane Finch Cannabis|2728 Jane|JFC01/);
});
