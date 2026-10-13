import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root), "utf8");

function walk(dir) {
  const abs = path.join(fileURLToPath(root), dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs).flatMap((name) => {
    const rel = path.join(dir, name);
    const full = path.join(fileURLToPath(root), rel);
    return statSync(full).isDirectory() ? walk(rel) : [rel];
  });
}

test("exact approved NAP, hours, and canonical domain are centralized", () => {
  const store = read("app/lib/store.ts");
  assert.match(store, /code: "JWS01"/);
  assert.doesNotMatch(store, /JWCD01/);
  assert.match(store, /Jane Wilson Cannabis Dispensary/);
  assert.match(store, /2111 Jane St, Unit 12, North York, ON M3M 1A2/);
  assert.match(store, /437-465-7700/);
  assert.match(store, /\+14374657700/);
  assert.match(store, /janewilsoncannabisdispensary\.com/);
  assert.match(store, /jane-wilson-cannabis-dispensary\.vercel\.app/);
  assert.match(store, /10:00 AM – 12:00 AM \(midnight\) daily/);
  assert.match(store, /openingHoursSpecification/);
  assert.match(store, /hoursOpens: "10:00"/);
  assert.match(store, /hoursCloses: "00:00"/);
  assert.match(store, /opens: STORE.hoursOpens/);
});

const DELIVERY_PRICING_FILE = /^app[\\/](delivery[\\/]|lib[\\/](delivery|deliveryStats|pricing)\.ts$|components[\\/](DeliveryCatalog|PriceBlock|PriceNotice)\.tsx$)/;

test("flower weights are the fleet 3g 5g 14g 28g set", () => {
  const store = read("app/lib/store.ts");
  const inventory = read("app/lib/inventory.ts");
  const grid = read("app/components/FlowerGrid.tsx");
  assert.match(store, /WEIGHTS = \["3g", "5g", "14g", "28g"\]/);
  for (const field of ["price3g", "price5g", "price14g", "price28g"]) assert.ok(inventory.includes(field));
  assert.match(grid, /availableFlowerPrices\(flower\)\.map/);
  assert.doesNotMatch(grid, /price\.current === "—"|>—</);
  const ui = walk("app")
    .filter((file) => (file.endsWith(".tsx") || file.endsWith(".ts")) && !/^app[\\/](tv|tv2)[\\/]/.test(file))
    .map((file) => read(file))
    .join("\n");
  assert.doesNotMatch(ui, /3\.5g/);
  // 7g is allowed ONLY on delivery pricing surfaces: delivery uses bulk packs that start at 7g (Tri 2026-10-13).
  const storeUi = walk("app")
    .filter((file) => (file.endsWith(".tsx") || file.endsWith(".ts")) && !/^app[\\/](tv|tv2)[\\/]/.test(file) && !DELIVERY_PRICING_FILE.test(file))
    .map((file) => read(file))
    .join("\n");
  assert.doesNotMatch(storeUi, /(?<![0-9])7g/);
  // 6g is allowed: the top-3 tiers (Exotic, Premium, AAA+) sell the second pack as 6g (feed field price5g). AA stays a true 5g.
});

test("temporary menu snapshot has every flower tier plus cigarettes and nicotine vapes", () => {
  const flowers = JSON.parse(read("app/lib/flowers.json"));
  const items = JSON.parse(read("app/lib/items.json"));
  const tiers = new Set(flowers.map((flower) => flower.tier));
  for (const tier of ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"]) {
    const rows = flowers.filter((flower) => flower.tier === tier);
    assert.ok(rows.length > 0, tier);
    assert.ok(rows.some((flower) => flower.price3g || flower.price5g || flower.price14g || flower.price28g));
  }
  assert.equal(tiers.size, 5);
  const cigs = items.filter((item) => item.category === "CIGARETTES");
  const vapes = items.filter((item) => item.category === "VAPE PENS");
  assert.ok(cigs.length > 0);
  assert.ok(vapes.length > 0);
  assert.ok(cigs.every((item) => item.name && item.price && item.sku));
  assert.ok(vapes.every((item) => item.name && item.price && item.sku));
  const priceKeys = new Set(flowers.flatMap((flower) => Object.keys(flower).filter((key) => key.startsWith("price"))));
  assert.deepEqual([...priceKeys].sort(), ["price14g", "price28g", "price3g", "price5g"]);
});

test("public UI does not name the temporary stock source and has no 24-hour route", () => {
  const ui = walk("app")
    .filter((file) => file.endsWith(".tsx") && !/^app[\\/](tv|tv2)[\\/]/.test(file) && !/[\\/]TvStoreHeader\.tsx$/.test(file))
    .map((file) => read(file))
    .join("\n");
  assert.doesNotMatch(ui, /Jane Finch|JFC01|Athena|2728 Jane|24 hours|24\/7|open 24/i);
  // JWS01 delivers (Tri 2026-10-13): /delivery is an allowed route; 24-hour routes stay banned.
  assert.equal(walk("app").some((file) => /24-hour/i.test(file)), false);
  assert.ok(existsSync(new URL("app/delivery/page.tsx", root)));
  assert.match(read("app/lib/inventory.ts"), /TEMP_STOCK_SOURCE=JFC01/);
  assert.match(read("app/lib/store.ts"), /Menu preview — confirm availability and prices at the Jane Wilson counter/);
  assert.match(read("app/page.tsx"), /MenuPreviewNote/);
});

test("fleet pages ship visit, Jane Street, cigarettes, vapes, and tier schema", () => {
  const home = read("app/page.tsx");
  const visit = read("app/visit/page.tsx");
  const corridor = read("app/weed-dispensary-jane-street/page.tsx");
  const tier = read("app/[tier]/page.tsx");
  const cigs = read("app/native-cigarettes-jane-street/page.tsx");
  const vapes = read("app/nicotine-vapes-jane-street/page.tsx");
  assert.match(home, /RouteHubs/);
  assert.match(home, /BannerCreative/);
  assert.match(home, /CigsDealCreative/);
  assert.match(visit, /FAQPage/);
  assert.match(visit, /35 Jane/);
  assert.match(visit, /openingHoursSpecification|storeSchema/);
  assert.match(corridor, /Jane Street/);
  assert.match(read("app/lib/collectionSchema.ts"), /CollectionPage/);
  assert.match(read("app/lib/collectionSchema.ts"), /ItemList/);
  assert.match(tier, /collectionSchema/);
  assert.match(tier, /FlowerGrid/);
  assert.match(cigs, /cigaretteItems/);
  assert.match(vapes, /nicotineVapeItems/);
  assert.match(read("app/flower/[tier]/[sku]/page.tsx"), /flowerOffers/);
});

test("optimized creative replaces every placeholder and brand art remains", () => {
  for (const file of [
    "public/creative/banner-hero.webp",
    "public/creative/banner-carousel-1.webp",
    "public/creative/banner-carousel-2.webp",
    "public/creative/cigs-deal-hero.webp",
    "public/creative/cigs-pack-shot.webp"
  ]) {
    const asset = new URL(file, root);
    assert.equal(existsSync(asset), true, file);
    assert.ok(statSync(asset).size < 200_000, `${file} should remain LCP-friendly`);
  }
  const publicFiles = walk("public");
  const appSource = walk("app")
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
    .map((file) => read(file))
    .join("\n");
  assert.equal(publicFiles.some((file) => file.includes("placeholders")), false);
  assert.doesNotMatch(appSource, /PLACEHOLDER_FOR_CODEX|PLACEHOLDER —/);
  assert.match(read("app/components/CreativePhoto.tsx"), /next\/image/);
  assert.equal(existsSync(new URL("public/brand/front-left-grinder.png", root)), true);
  assert.equal(existsSync(new URL("public/brand/door-upper.svg", root)), true);
});

test("every fleet banner slot ships JWS art and homepage responsive art", () => {
  const banners = read("app/lib/banners.ts");
  const assets = [
    "home-top-weed-tier",
    "home-vapes",
    "home-cigarettes-2-packs",
    "home-bb-marlboro-belmont",
    "tier-top-weed-owner-banner",
    "vapes-owner-banner",
    "vapes-nicotine-banner",
    "vapes-thc-banner",
    "cigs-bb-marlboro-belmont",
    "cigs-mix-match",
    "cigs-full-light-preorder",
    "delivery-handoff-illustration"
  ];

  for (const id of assets) {
    const file = `public/images/jane-wilson-${id}.webp`;
    assert.equal(existsSync(new URL(file, root)), true, file);
    assert.ok(statSync(new URL(file, root)).size < 350_000, `${file} must stay under 350 KB`);
    assert.match(banners, new RegExp(`file: "/images/jane-wilson-${id}\\.webp"`));
  }

  for (const id of assets.slice(0, 4)) {
    const file800 = `public/images/jane-wilson-${id}-800w.webp`;
    assert.equal(existsSync(new URL(file800, root)), true, file800);
    assert.ok(statSync(new URL(file800, root)).size < 120_000, `${file800} must stay under 120 KB`);
    assert.match(banners, new RegExp(`file800: "/images/jane-wilson-${id}-800w\\.webp"`));
  }
});

test("premium marketing layout replaces the blank visit artwork", () => {
  const home = read("app/page.tsx");
  const visit = read("app/visit/page.tsx");
  const css = read("app/globals.css");
  assert.match(home, /homeHeroArt/);
  assert.match(home, /brandStatement/);
  assert.match(home, /Jane Wilson Cannabis Dispensary<\/span>Find your tier/);
  assert.match(visit, /visitVisual/);
  assert.match(visit, /side-window-combined\.png/);
  assert.doesNotMatch(visit, /door-upper|door-lower|visitDoor/);
  assert.match(css, /\.visitVisual\{position:relative;min-height:570px/);
  assert.match(css, /\.homeHeroArt>img\{object-fit:cover/);
});

test("branded favicon is declared through the Next.js metadata contract", () => {
  const layout = read("app/layout.tsx");
  const nav = read("app/components/Nav.tsx");
  const tvStore = read("app/lib/tvStore.ts");
  const manifest = read("app/manifest.ts");
  assert.match(layout, /icons:\s*\{/);
  assert.match(layout, /url: "\/icon\.png"/);
  assert.match(layout, /url: "\/apple-icon\.png"/);
  assert.match(layout, /url: "\/favicon-32x32\.png"/);
  assert.match(layout, /url: "\/favicon-16x16\.png"/);
  assert.match(layout, /manifest: "\/manifest\.webmanifest"/);
  assert.match(nav, /\/images\/jane-wilson-jws-logo\.webp/);
  assert.match(tvStore, /\/images\/jane-wilson-jws-logo\.webp/);
  assert.match(manifest, /\/jws-icon-192\.png/);
  assert.match(manifest, /\/jws-icon-512\.png/);
  for (const file of [
    "app/icon.png",
    "app/apple-icon.png",
    "public/favicon-32x32.png",
    "public/favicon-16x16.png",
    "public/jws-icon-192.png",
    "public/jws-icon-512.png",
    "public/images/jane-wilson-jws-logo.webp"
  ]) {
    assert.ok(existsSync(new URL(file, root)), `${file} should exist`);
  }
});

test("public menu hides unavailable flower weights and rejects suspicious one-dollar vape rows", () => {
  const inventory = read("app/lib/inventory.ts");
  const flowerPage = read("app/flower/[tier]/[sku]/page.tsx");
  const itemPage = read("app/item/[slug]/page.tsx");
  assert.match(inventory, /availableFlowerPrices/);
  assert.match(inventory, /amount > 1/);
  assert.match(inventory, /VAPE PENS.*filter\(hasCrediblePublicPrice\)/s);
  assert.match(flowerPage, /availableFlowerPrices\(flower\)\.map/);
  assert.match(itemPage, /nicotineVapeItems\(staticItems\)/);
});

test("mobile header collapses into one menu control instead of dumping every link", () => {
  const nav = read("app/components/Nav.tsx");
  const css = read("app/globals.css");
  assert.match(nav, /menuToggle/);
  assert.match(nav, /aria-expanded/);
  assert.match(nav, /aria-controls/);
  assert.match(nav, /navLocked/);
  assert.match(nav, /Close menu/);
  assert.match(nav, /createPortal/);
  assert.match(nav, /document\.body/);
  assert.match(nav, /--mobile-nav-top/);
  assert.match(nav, /Directions/);
  assert.match(css, /\.mobileMenuLayer\{position:fixed;z-index:1000/);
  assert.match(css, /\.menuScrim\{/);
  assert.match(css, /min-height:50px/);
  assert.match(css, /html\.navLocked/);
  assert.match(css, /line-height:1\.12/);
  assert.doesNotMatch(css, /\.navWrap nav\{display:flex;flex-wrap:wrap/);
  assert.doesNotMatch(css, /\.navTiers\{display:flex;flex-wrap:wrap\}/);
});

test("sitemap lists live routes and omits the demoted North York path", () => {
  const sitemap = read("app/sitemap.ts");
  for (const route of [
    "/visit",
    "/weed-dispensary-jane-street",
    "/native-cigarettes-jane-street",
    "/nicotine-vapes-jane-street",
    "flowerPath"
  ]) {
    assert.ok(sitemap.includes(route));
  }
  assert.doesNotMatch(sitemap, /weed-dispensary-north-york|24-hour/);
  // JWS01 delivers (Tri 2026-10-13): /delivery is a live route and belongs in the sitemap.
  assert.ok(sitemap.includes('"/delivery"'));
  const northYork = read("app/weed-dispensary-north-york/page.tsx");
  assert.match(northYork, /permanentRedirect\("\/weed-dispensary-jane-street"\)/);
});

test("delivery orders use JWS01 LIVE ORDER Web Chat instead of a phone-order CTA", () => {
  const delivery = read("app/delivery/page.tsx");
  const chat = read("app/delivery/IdVerificationChat.tsx");
  const css = read("app/delivery/delivery.css");

  assert.match(delivery, /IdVerificationChat/);
  assert.match(delivery, /LIVE ORDER/);
  assert.match(delivery, /Open Web Chat/);
  assert.match(delivery, /serviceUrl/);
  assert.doesNotMatch(delivery, /Order by phone|call us to order|servicePhone|contactType: "orders"/i);

  assert.match(chat, /sod-web-chat:JWS01/);
  assert.match(chat, /storeId: "JWS01"/);
  assert.match(chat, /READY_V1/);
  assert.match(chat, /\/api\/web-chat\/session/);
  assert.match(chat, /\/api\/web-chat\/messages/);
  assert.match(chat, /\/api\/web-chat\/id-review/);
  assert.match(chat, /\/api\/web-chat\/phone/);
  assert.match(chat, /\/api\/web-chat\/order-cycle/);
  assert.doesNotMatch(chat, /SOD_STORE_JWS01_PHONE/);

  assert.match(css, /\.sod-chat-launcher/);
  assert.match(css, /body\.sod-chat-open/);
  assert.match(css, /@media \(max-width: 520px\)/);
});
