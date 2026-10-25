/**
 * Shared fleet menu feed. Pages call this for store JWS01.
 * MENU_FEED_URL overrides the shared Apps Script. An empty or failed
 * response stays on the mirrored JSON in inventory.ts.
 */
export const DEFAULT_MENU_FEED_URL =
  "https://script.google.com/macros/s/AKfycbx09_sDal1eMVF1r-hUck4e7oq_XBHEWhGvA79JuhZNQ6P4CdhCas0xE3FfexWQ3hq4/exec";

export const LIVE_MENU_STORE = "JWS01";

export function menuFeedUrl(): string {
  return (process.env.MENU_FEED_URL || "").trim() || DEFAULT_MENU_FEED_URL;
}

export async function fetchMenuPayload(store = LIVE_MENU_STORE): Promise<Record<string, unknown> | null> {
  const base = menuFeedUrl();
  if (!base) return null;
  try {
    const response = await fetch(`${base}?store=${encodeURIComponent(store)}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as unknown;
    if (!data || typeof data !== "object" || Array.isArray(data)) return null;
    return data as Record<string, unknown>;
  } catch (error) {
    console.warn(`[menu] ${store} feed failed:`, error);
    return null;
  }
}
