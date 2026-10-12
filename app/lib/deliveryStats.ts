import type { DeliveryProduct } from "./pricing";

/** Delivery catalog price-per-gram and THC ranges, computed only from real feed data (port of AVC01 tierStats). */
export type TierStats = { count: number; perGram?: [number, number]; thc?: [number, number] };
const range = (v: number[]): [number, number] | undefined => (v.length ? [Math.min(...v), Math.max(...v)] : undefined);
const thcNumbers = (raw: unknown): number[] => (String(raw ?? "").match(/\d+(?:\.\d+)?/g) || []).map(Number).filter((n) => n > 0 && n <= 100);

export function deliveryTierStats(products: DeliveryProduct[]): { tier: string; stats: TierStats }[] {
  const tiers = [...new Set(products.map((p) => String(p.tier || "").trim()).filter(Boolean))];
  return tiers.map((tier) => {
    const list = products.filter((p) => p.tier === tier);
    const perGram: number[] = [];
    const thc: number[] = [];
    for (const p of list) {
      for (const o of p.priceOptions || []) {
        const grams = Number(String(o.label).replace(/[^0-9.]/g, ""));
        if (grams > 0 && o.price > 0) perGram.push(o.price / grams);
      }
      thc.push(...thcNumbers(p.thc));
    }
    return { tier, stats: { count: list.length, perGram: range(perGram), thc: range(thc) } };
  });
}

const money = (n: number) => `$${(Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")}`;
const pct = (n: number) => String(Math.round(n * 10) / 10).replace(/\.0$/, "");

export function tierRangeText(s: TierStats): string | null {
  const parts: string[] = [];
  if (s.perGram) { const [lo, hi] = s.perGram; parts.push(money(lo) === money(hi) ? `${money(lo)} a gram` : `from ${money(lo)} to ${money(hi)} a gram`); }
  if (s.thc) { const [lo, hi] = s.thc; parts.push(pct(lo) === pct(hi) ? `THC about ${pct(lo)}%` : `THC about ${pct(lo)} to ${pct(hi)}%`); }
  if (!parts.length) return null;
  const [first, ...rest] = parts;
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(" · ");
}
