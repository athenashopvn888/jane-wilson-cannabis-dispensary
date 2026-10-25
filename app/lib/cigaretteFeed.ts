import { fetchMenuPayload } from "./menuFeed";
import { SHOW_CIGARETTES } from "./siteConfig";

export type CigaretteSnapshot = {
  web: { show: boolean };
  tv: { show: boolean };
  guides: { show: boolean };
};

function liveTvFlag(data: Record<string, unknown> | null): boolean | null {
  const cig = data?.cig;
  if (!cig || typeof cig !== "object" || Array.isArray(cig)) return null;
  const block = cig as Record<string, unknown>;
  if (typeof block.tvOn === "boolean") return block.tvOn;
  if (typeof block.on === "boolean") return block.on;
  return null;
}

/**
 * Diagnostic flags for /api/content-status.
 * The website flag stays on the coded gate. TV follows an explicit live
 * tvOn/on flag when the menu feed returns one, and otherwise stays on that gate.
 * It does not add or remove redirects.
 */
export async function getCigaretteSnapshot(): Promise<CigaretteSnapshot> {
  const web = SHOW_CIGARETTES;
  const liveTv = liveTvFlag(await fetchMenuPayload());
  const tv = liveTv === null ? web : liveTv;
  return { web: { show: web }, tv: { show: tv }, guides: { show: web } };
}
