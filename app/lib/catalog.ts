import { isFreeGramTier, packPaid } from "../components/FreeGramPromo";
import { shelfItems, type FlowerProduct, type ItemProduct } from "./inventory";
import { CATEGORY_LINKS, type CategorySlug } from "./shopLinks";

const FEED_CATEGORIES: Record<CategorySlug, string[]> = {
  prerolls: ["PREROLLS"],
  "vape-disposables": ["VAPE DISPOSABLE"],
  edibles: ["EDIBLES"],
  concentrates: ["CONCENTRATES"],
  "add-ons": ["ADD ONS"],
  magic: ["MAGIC & OTHERS"]
};

export function categoryBySlug(slug: string) {
  return CATEGORY_LINKS.find((category) => category.slug === slug);
}

function inFeedCategories(item: ItemProduct, names: string[]) {
  const category = item.category.toUpperCase();
  return names.some((name) => name === category);
}

function isAddonPreRoll(item: ItemProduct) {
  return item.category.toUpperCase() === "ADD ONS" && /pre-?roll/i.test(item.name);
}

/** Products for a category page. Prices and names come from the menu rows only. */
export function productsForCategory(items: ItemProduct[], slug: CategorySlug) {
  const shelf = shelfItems(items);
  const names = FEED_CATEGORIES[slug];
  const matched = shelf.filter((item) => inFeedCategories(item, names));
  if (slug !== "prerolls") return matched;
  const extras = shelf.filter((item) => isAddonPreRoll(item) && !matched.some((row) => row.sku === item.sku && row.slug === item.slug));
  return [...matched, ...extras];
}

export function categoryForItem(item: ItemProduct) {
  const category = item.category.toUpperCase();
  if (category === "CIGARETTES") return { title: "Native cigarettes", path: "/native-cigarettes-jane-street" };
  if (category === "VAPE PENS") return { title: "Nicotine vapes", path: "/nicotine-vapes-jane-street" };
  if (category === "PREROLLS" || isAddonPreRoll(item)) {
    const prerolls = CATEGORY_LINKS.find((link) => link.slug === "prerolls");
    return { title: prerolls?.title ?? "Pre-Rolls", path: prerolls?.path ?? "/items/prerolls" };
  }
  const match = (Object.keys(FEED_CATEGORIES) as CategorySlug[]).find((slug) => FEED_CATEGORIES[slug].includes(category));
  const link = match ? CATEGORY_LINKS.find((itemLink) => itemLink.slug === match) : undefined;
  return { title: link?.title ?? item.category, path: link?.path ?? "/menu" };
}

function money(amount: number) {
  const cents = Math.round(amount * 100);
  const body = cents % 100 === 0 ? String(cents / 100) : (cents / 100).toFixed(2);
  return `$${body}`;
}

function percentLabel(value: number) {
  return Number.isInteger(value) ? String(value) : String(Math.round(value * 10) / 10);
}

function thcPercent(value: string) {
  const match = value.match(/(\d+(?:\.\d+)?)\s*%/);
  if (!match) return null;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

function packGrams(field: "price3g" | "price5g" | "price14g" | "price28g", tierKey: string) {
  if (field === "price3g") return 3;
  if (field === "price14g") return 14;
  if (field === "price28g") return 28;
  return isFreeGramTier(tierKey) ? 6 : 5;
}

/** In-store per-gram span and THC span from the flowers actually listed on the tier. */
export function tierShelfLine(flowers: FlowerProduct[], tierKey: string) {
  const rates: number[] = [];
  const thcValues: number[] = [];
  for (const flower of flowers) {
    const thc = thcPercent(flower.thc || "");
    if (thc !== null) thcValues.push(thc);
    for (const field of ["price3g", "price5g", "price14g", "price28g"] as const) {
      const paid = packPaid(flower[field]);
      const grams = packGrams(field, tierKey);
      if (paid && grams > 0) rates.push(paid / grams);
    }
  }
  const thcLine = (() => {
    if (!thcValues.length) return "";
    const low = Math.min(...thcValues);
    const high = Math.max(...thcValues);
    return low === high ? ` THC about ${percentLabel(low)}%.` : ` THC about ${percentLabel(low)} to ${percentLabel(high)}%.`;
  })();
  if (!rates.length) return thcLine ? `THC on the listed flowers.${thcLine}` : null;
  const low = Math.min(...rates);
  const high = Math.max(...rates);
  const price = low === high ? `${money(low)} a gram` : `From ${money(low)} to ${money(high)} a gram`;
  return `In-store price. ${price}.${thcLine}`;
}
