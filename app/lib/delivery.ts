// Server-side only: imported by the /delivery server component.
import { SOD } from "./sod";

import type { DeliveryProduct } from "./pricing";
export type { DeliveryProduct };
export type DeliveryState =
  | { state: "live"; products: DeliveryProduct[]; importedAt: string }
  | { state: "soon" } // JWC01 is not registered in SOD yet (STORE_NOT_FOUND): no false claims
  | { state: "unavailable" }; // registered but the catalog cannot be read right now

/**
 * Fleet delivery loader: the SOD catalog for THIS store id only, rendered on the server.
 * Fail-closed: the payload must declare storeId === JWC01 and carry products; never another store's catalog.
 */
/** A healthy fleet catalog has about 60 products; fewer than this is treated as a broken payload, not a menu. */
export const MIN_PRODUCTS = 50;

export async function getDeliveryCatalog(): Promise<DeliveryState> {
  try {
    const res = await fetch(`${SOD.apiBase}/api/catalog?store=${encodeURIComponent(SOD.storeId)}`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(15000) });
    const text = await res.text();
    let data: Record<string, unknown> = {};
    try { data = JSON.parse(text); } catch { return { state: "unavailable" }; }
    if (data.code === "STORE_NOT_FOUND") return { state: "soon" };
    if (!res.ok || data.ok === false) return { state: "unavailable" };
    if (data.storeId !== SOD.storeId) return { state: "unavailable" };
    // Fleet standard: every delivery store serves the same shared catalog under its own storeId, so the catalog
    // version/import date/label is NOT a store-specific signal. Fail closed only on a malformed or too-small payload.
    const raw = Array.isArray(data.products) ? (data.products as DeliveryProduct[]) : [];
    const products = raw.filter((p) => p && typeof p.publicProductId === "string" && p.publicProductId && typeof p.name === "string" && p.name.trim() && Array.isArray(p.priceOptions) && p.priceOptions.length > 0);
    if (products.length < MIN_PRODUCTS) return { state: "unavailable" };
    return { state: "live", products, importedAt: String(data.importedAt || "") };
  } catch {
    return { state: "unavailable" };
  }
}
