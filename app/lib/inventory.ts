/**
 * Temporary Jane Wilson menu.
 * TEMP_STOCK_SOURCE=JFC01
 *
 * Live refresh: APPS_SCRIPT_URL?store=JFC01 (Apps Script getAdcInventory / doGet).
 * Fallback: mirrored flowers.json + items.json snapshot.
 * Public pages must not name the source store.
 */
import flowersJson from "./flowers.json";
import itemsJson from "./items.json";
import { STORE, TIERS, WEIGHTS, type FlowerWeight, tierByKey, tierBySlug } from "./store";

export interface PricePoint {
  regular: number;
  sale: number | null;
}

export interface FlowerProduct {
  sku: string;
  name: string;
  slug: string;
  tier: string;
  type: string;
  isHot: boolean;
  isSale: boolean;
  thc: string;
  price3g: PricePoint | null;
  price5g: PricePoint | null;
  price14g: PricePoint | null;
  price28g: PricePoint | null;
  image: string;
}

export interface ItemProduct {
  sku: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  thc: string;
  mg: string;
  price: string;
  image: string;
  promoImage: string | null;
}

export const FLOWER_PRICE_FIELDS: Record<FlowerWeight, "price3g" | "price5g" | "price14g" | "price28g"> = {
  "3g": "price3g",
  "5g": "price5g",
  "14g": "price14g",
  "28g": "price28g"
};

const TEMP_STOCK_SOURCE = "JFC01";
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";

export const staticFlowers = flowersJson as FlowerProduct[];
export const staticItems = itemsJson as ItemProduct[];

export interface MenuSnapshot {
  flowers: FlowerProduct[];
  items: ItemProduct[];
  isLive: boolean;
  stockDate: string | null;
}

function snapshot(flowers: FlowerProduct[], items: ItemProduct[], isLive: boolean, stockDate: string | null): MenuSnapshot {
  return { flowers, items, isLive, stockDate };
}

function asFlowers(value: unknown): FlowerProduct[] {
  if (!Array.isArray(value)) return [];
  return value.filter((row): row is FlowerProduct => {
    if (!row || typeof row !== "object") return false;
    const flower = row as FlowerProduct;
    return typeof flower.name === "string" && typeof flower.slug === "string" && typeof flower.sku === "string" && typeof flower.tier === "string";
  });
}

function asItems(value: unknown): ItemProduct[] {
  if (!Array.isArray(value)) return [];
  return value.filter((row): row is ItemProduct => {
    if (!row || typeof row !== "object") return false;
    const item = row as ItemProduct;
    return typeof item.name === "string" && typeof item.slug === "string" && typeof item.sku === "string" && typeof item.category === "string";
  });
}

export async function getMenu(): Promise<MenuSnapshot> {
  if (!APPS_SCRIPT_URL) return snapshot(staticFlowers, staticItems, false, null);
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?store=${TEMP_STOCK_SOURCE}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as { flowers?: unknown; items?: unknown; stockDate?: string };
    const flowers = asFlowers(data.flowers);
    const items = asItems(data.items);
    if (flowers.length === 0 || items.length === 0) throw new Error("Empty temporary menu");
    return snapshot(flowers, items, true, data.stockDate || null);
  } catch (error) {
    console.warn("[inventory] Temporary live fetch failed, using JSON snapshot:", error);
    return snapshot(staticFlowers, staticItems, false, null);
  }
}

export function flowersForTier(flowers: FlowerProduct[], slug: string) {
  const tier = tierBySlug(slug);
  if (!tier) return [];
  return flowers.filter((flower) => flower.tier.toUpperCase() === tier.key);
}

export function flowerPath(flower: FlowerProduct) {
  const tier = tierByKey(flower.tier) ?? TIERS.find((item) => item.key === flower.tier.toUpperCase());
  const slug = tier?.slug ?? "exotic-weed";
  return `/flower/${slug}/${flower.sku}`;
}

export function flowerHref(flower: FlowerProduct) {
  return `${STORE.origin}${flowerPath(flower)}`;
}

export function findFlower(flowers: FlowerProduct[], tierSlug: string, sku: string) {
  return flowersForTier(flowers, tierSlug).find((flower) => flower.sku === sku);
}

export function itemsByCategory(items: ItemProduct[], category: string) {
  return items.filter((item) => item.category.toUpperCase() === category.toUpperCase());
}

export function cigaretteItems(items: ItemProduct[]) {
  return itemsByCategory(items, "CIGARETTES").filter(hasCrediblePublicPrice);
}

export function nicotineVapeItems(items: ItemProduct[]) {
  return itemsByCategory(items, "VAPE PENS").filter(hasCrediblePublicPrice);
}

export function itemPath(item: ItemProduct) {
  return `/item/${item.slug}`;
}

export function findPublicItem(items: ItemProduct[], slug: string) {
  return [...cigaretteItems(items), ...nicotineVapeItems(items)].find((item) => item.slug === slug);
}

export function availableFlowerPrices(flower: FlowerProduct) {
  return WEIGHTS.flatMap((label) => {
    const point = flower[FLOWER_PRICE_FIELDS[label]];
    return point ? [{ label, point }] : [];
  });
}

export function formatFlowerPrice(point: PricePoint | null) {
  if (!point || typeof point.regular !== "number") return { current: "—", compare: null as string | null };
  if (typeof point.sale === "number" && point.sale !== point.regular) {
    return { current: `$${point.sale}`, compare: `$${point.regular}` };
  }
  return { current: `$${point.regular}`, compare: null };
}

export function flowerOffers(flower: FlowerProduct) {
  return WEIGHTS.flatMap((label) => {
    const point = flower[FLOWER_PRICE_FIELDS[label]];
    if (!point || typeof point.regular !== "number") return [];
    const amount = typeof point.sale === "number" ? point.sale : point.regular;
    return [
      {
        "@type": "Offer",
        name: label,
        price: String(amount),
        priceCurrency: "CAD",
        url: flowerHref(flower),
        seller: { "@id": `${STORE.origin}/#store` }
      }
    ];
  });
}

export function itemOfferAmounts(price: string) {
  return [...price.matchAll(/\$(\d+(?:\.\d{1,2})?)/g)].map((match) => match[1]);
}

function hasCrediblePublicPrice(item: ItemProduct) {
  const amounts = itemOfferAmounts(item.price).map(Number);
  return amounts.length > 0 && amounts.every((amount) => Number.isFinite(amount) && amount > 1);
}
