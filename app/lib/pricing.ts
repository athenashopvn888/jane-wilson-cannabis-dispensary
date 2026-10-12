// Delivery price display logic. Mirrors the operating fleet store After Dark (MJ01) DeliveryContent.tsx so the
// same live SOD catalog fields produce the same chips, labels and promo lines on every store.
export type Tier = "SHREDS" | "Budget" | "BC Premium" | "CRAFTS" | "Exotics";
export type PriceOption = { key: string; label: string; price: number };
export type Offer = { kind: "prime_time" | "multi_ounce"; quantity?: number; price?: number; bonus?: string; perUnitPrice?: number; totalPrice?: number };
export type DeliveryProduct = {
  publicProductId: string; name: string; tier?: string; category?: string; strain?: string; thc?: string;
  effects?: string[]; description?: string | null; images?: string[]; priceOptions?: PriceOption[]; offers?: Offer[];
};

export const TIER_ORDER: Tier[] = ["Exotics", "CRAFTS", "BC Premium", "Budget", "SHREDS"];
const LOYALTY_TIERS = ["Exotics", "CRAFTS", "BC Premium"];

export function entryPrice(p: DeliveryProduct): number {
  const prices = (p.priceOptions || []).map((o) => o.price);
  return prices.length ? Math.min(...prices) : Number.POSITIVE_INFINITY;
}

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return "$0";
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return `$${rounded.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")}`;
}

/** 3 x 28g for $95 is shown as $33 each (fleet rule); otherwise the supplied per-unit price, else total / quantity. */
export function bundleEach(quantity: number, total: number, perUnitPrice?: number): number {
  if (quantity === 3 && total === 95) return 33;
  const supplied = Number(perUnitPrice);
  return Number.isFinite(supplied) && supplied > 0 ? supplied : total / quantity;
}

export type PricingView = {
  compact: PriceOption[];
  loyalty: number | null;
  bundles: { quantity: number; each: number; total: number }[];
  standard28: number | null;
};

export function pricingView(product: DeliveryProduct): PricingView {
  const options = product.priceOptions || [];
  const standard28 = options.find((o) => o.label === "28g");
  const compact = options.filter((o) => o.label !== "28g");
  const explicit = product.offers?.find((o) => o.kind === "prime_time");
  const eligible = LOYALTY_TIERS.includes(product.tier || "");
  const explicitPrice = Number(explicit?.price);
  const loyalty = Number.isFinite(explicitPrice) && explicitPrice > 0 ? explicitPrice : eligible && standard28 ? standard28.price - 30 : null;
  const supplied = product.offers?.filter((o) => o.kind === "multi_ounce" && Number(o.quantity) !== 2) ?? [];
  const raw = eligible && loyalty
    ? [{ quantity: 2, perUnitPrice: loyalty, totalPrice: loyalty * 2 } as Offer, ...supplied]
    : product.offers?.filter((o) => o.kind === "multi_ounce") ?? [];
  const bundles = raw.map((o) => {
    const quantity = Number(o.quantity);
    const total = Number(o.totalPrice);
    return { quantity, each: bundleEach(quantity, total, o.perUnitPrice), total };
  });
  return { compact, loyalty, bundles, standard28: standard28 ? standard28.price : null };
}

export function sortProducts(products: DeliveryProduct[]): DeliveryProduct[] {
  const rank = (t?: string) => { const i = TIER_ORDER.indexOf(t as Tier); return i < 0 ? 99 : i; };
  return [...products].sort((a, b) => rank(a.tier) - rank(b.tier) || entryPrice(a) - entryPrice(b) || a.name.localeCompare(b.name));
}
