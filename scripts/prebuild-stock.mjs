/**
 * Refresh the temporary menu JSON before `next build` when APPS_SCRIPT_URL is set.
 * TEMP_STOCK_SOURCE=JFC01
 * If the fetch fails or the URL is unset, the mirrored flowers.json and items.json stay in place.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEMP_STOCK_SOURCE = "JFC01";
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const FLOWERS_PATH = path.join(root, "app", "lib", "flowers.json");
const ITEMS_PATH = path.join(root, "app", "lib", "items.json");

if (!APPS_SCRIPT_URL) {
  console.log(`[prebuild] No APPS_SCRIPT_URL set — using mirrored JSON (TEMP_STOCK_SOURCE=${TEMP_STOCK_SOURCE})`);
} else {
  const url = `${APPS_SCRIPT_URL}?store=${TEMP_STOCK_SOURCE}`;
  console.log(`[prebuild] Fetching temporary stock TEMP_STOCK_SOURCE=${TEMP_STOCK_SOURCE}`);
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
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
