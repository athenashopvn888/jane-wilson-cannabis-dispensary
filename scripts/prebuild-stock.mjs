/**
 * Refresh menu JSON before `next build`.
 * MENU_FEED_URL fetches the Jane Wilson live feed (store JWS01) and writes
 * only when every flower tier is still present. Otherwise the mirrored JSON stays.
 * APPS_SCRIPT_URL remains the temporary mirror refresh.
 * TEMP_STOCK_SOURCE=JFC01
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEMP_STOCK_SOURCE = "JFC01";
const LIVE_MENU_STORE = "JWS01";
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";
const MENU_FEED_URL = (process.env.MENU_FEED_URL || "").trim();
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const FLOWERS_PATH = path.join(root, "app", "lib", "flowers.json");
const ITEMS_PATH = path.join(root, "app", "lib", "items.json");
const TIERS = ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"];

function usableLiveMenu(data) {
  if (!data || !Array.isArray(data.flowers) || !Array.isArray(data.items)) return false;
  if (data.flowers.length === 0 || data.items.length === 0) return false;
  const tiers = new Set(data.flowers.map((flower) => flower.tier));
  if (!TIERS.every((tier) => tiers.has(tier))) return false;
  const priceKeys = new Set(data.flowers.flatMap((flower) => Object.keys(flower).filter((key) => key.startsWith("price"))));
  const allowed = ["price3g", "price5g", "price14g", "price28g"];
  if ([...priceKeys].some((key) => !allowed.includes(key))) return false;
  const cigs = data.items.filter((item) => item.category === "CIGARETTES");
  const vapes = data.items.filter((item) => item.category === "VAPE PENS");
  return cigs.length > 0 && vapes.length > 0;
}

async function pull(url, label) {
  console.log(`[prebuild] Fetching ${label}`);
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

let wrote = false;
if (MENU_FEED_URL) {
  try {
    const data = await pull(`${MENU_FEED_URL}?store=${LIVE_MENU_STORE}`, `live menu store=${LIVE_MENU_STORE}`);
    if (!usableLiveMenu(data)) throw new Error("Live menu is incomplete, keeping the mirrored JSON");
    writeFileSync(FLOWERS_PATH, JSON.stringify(data.flowers, null, 2));
    writeFileSync(ITEMS_PATH, JSON.stringify(data.items, null, 2));
    wrote = true;
    console.log(`[prebuild] JWS01 flowers ${data.flowers.length}, items ${data.items.length}`);
  } catch (error) {
    console.warn(`[prebuild] Jane Wilson live menu not written (${error.message}).`);
  }
}

if (!wrote && !APPS_SCRIPT_URL) {
  console.log(`[prebuild] No MENU_FEED_URL or APPS_SCRIPT_URL set — using mirrored JSON (TEMP_STOCK_SOURCE=${TEMP_STOCK_SOURCE})`);
} else if (!wrote) {
  const url = `${APPS_SCRIPT_URL}?store=${TEMP_STOCK_SOURCE}`;
  console.log(`[prebuild] Fetching temporary stock TEMP_STOCK_SOURCE=${TEMP_STOCK_SOURCE}`);
  try {
    const data = await pull(url, `temporary stock TEMP_STOCK_SOURCE=${TEMP_STOCK_SOURCE}`);
    if (!Array.isArray(data.flowers) || !Array.isArray(data.items) || data.flowers.length === 0 || data.items.length === 0) {
      throw new Error("Invalid temporary menu payload");
    }
    writeFileSync(FLOWERS_PATH, JSON.stringify(data.flowers, null, 2));
    writeFileSync(ITEMS_PATH, JSON.stringify(data.items, null, 2));
    console.log(`[prebuild] flowers ${data.flowers.length}, items ${data.items.length}, stockDate ${data.stockDate || "unknown"}`);
  } catch (error) {
    console.warn(`[prebuild] Live fetch failed (${error.message}). Keeping mirrored JSON.`);
  }
}
