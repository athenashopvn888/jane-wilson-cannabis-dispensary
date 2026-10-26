import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { BANNER_SLOTS } from "../app/lib/banners.ts";
import { CODED_BANNERS } from "../app/lib/fleet/config.ts";
import { homeMobileLeadBanner, mobileLeadHideCss } from "../app/lib/mobileLeadBanner.ts";
import type { ResolvedBanner } from "../app/lib/fleet/types.ts";

const root = new URL("../", import.meta.url);

test("coded homepage leads with the Top Weed Tier banner", () => {
  const lead = homeMobileLeadBanner();
  const slot = BANNER_SLOTS.home.slots[0];
  assert.ok(lead);
  assert.equal(lead.slotId, "home-top-weed-tier");
  assert.equal(lead.coreId, "weed");
  assert.equal(lead.href, "/premium-weed");
  assert.equal(lead.src, "/images/jane-wilson-home-top-weed-tier.webp?v=20261026");
  assert.equal(lead.src800, "/images/jane-wilson-home-top-weed-tier-800w.webp?v=20261026");
  assert.equal(lead.width, 1600);
  assert.equal(lead.height, 900);
  assert.equal(lead.textBar, slot.textBar);
  assert.equal(lead.alt, slot.alt);
  assert.equal(lead.title, slot.title);
  assert.equal(lead.caption, slot.caption);
  const hide = mobileLeadHideCss(lead);
  assert.match(hide, /@media \(max-width:767px\)/);
  assert.match(hide, /\[data-slot="home-top-weed-tier"\]/);
  assert.match(hide, /\[data-core-banner="weed"\]/);
  assert.match(hide, /display:none/);
  assert.doesNotMatch(hide, /home-vapes|home-cigarettes|home-bb-marlboro/);
});

test("a sheet override keeps the current weed banner target and copy", () => {
  const sheet = CODED_BANNERS.map((banner, index): ResolvedBanner => index === 0 ? {
    ...banner,
    image: "https://cdn.example/custom-weed.webp",
    alt: "Custom alt",
    title: "Custom title",
    textBar: "Custom text bar",
    caption: "Custom caption",
    imageWidth: 1200,
    imageHeight: 600,
  } : banner);
  const lead = homeMobileLeadBanner(sheet);
  assert.ok(lead);
  assert.equal(lead.href, "/premium-weed");
  assert.equal(lead.src, "https://cdn.example/custom-weed.webp");
  assert.equal(lead.src800, undefined);
  assert.equal(lead.width, 1200);
  assert.equal(lead.height, 600);
  assert.equal(lead.alt, "Custom alt");
  assert.equal(lead.title, "Custom title");
  assert.equal(lead.textBar, "Custom text bar");
  assert.equal(lead.caption, "Custom caption");
  assert.match(mobileLeadHideCss(lead), /home-top-weed-tier/);
});

test("a hidden top weed banner promotes the next visible promo instead of duplicating it", () => {
  const sheet = CODED_BANNERS.map((banner): ResolvedBanner => banner.id === "weed" ? { ...banner, hidden: true } : banner);
  const lead = homeMobileLeadBanner(sheet);
  assert.ok(lead);
  assert.equal(lead.coreId, "vapes");
  assert.equal(lead.slotId, "home-vapes");
  assert.equal(lead.href, "/nicotine-vapes-jane-street");
  assert.equal(lead.src, "/images/jane-wilson-home-vapes.webp");
  const hide = mobileLeadHideCss(lead);
  assert.match(hide, /home-vapes/);
  assert.doesNotMatch(hide, /home-top-weed-tier|data-core-banner="weed"/);
});

test("homepage source places the lead banner after the status strip and before the hero", () => {
  const home = readFileSync(new URL("app/page.tsx", root), "utf8");
  const status = home.indexOf('className="statusBar"');
  const lead = home.indexOf("<MobileLeadBanner");
  const hero = home.indexOf('className="hero homeHero"');
  assert.ok(status > -1 && lead > status && hero > lead);
  assert.match(home, /Get directions/);
  const component = readFileSync(new URL("app/components/MobileLeadBanner.tsx", root), "utf8");
  assert.match(component, /width=\{banner\.width\}/);
  assert.match(component, /height=\{banner\.height\}/);
  assert.match(component, /fetchPriority="high"/);
  assert.match(component, /loading="eager"/);
  assert.match(component, /media="\(max-width: 767px\)"/);
  assert.match(component, /rel="preload"/);
  assert.match(component, /banner\.textBar/);
  assert.match(component, /banner\.alt/);
  assert.match(component, /banner\.title/);
  assert.match(component, /banner\.caption/);
  assert.match(component, /href=\{banner\.href\}/);
  const css = readFileSync(new URL("app/components/MobileLeadBanner.module.css", root), "utf8");
  assert.match(css, /@media \(min-width: 768px\)/);
  assert.match(css, /display:\s*none/);
});
