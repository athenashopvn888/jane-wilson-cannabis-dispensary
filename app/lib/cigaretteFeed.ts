import { SHOW_CIGARETTES } from "./siteConfig";

export type CigaretteSnapshot = {
  web: { show: boolean };
  tv: { show: boolean };
  guides: { show: boolean };
};

/**
 * Diagnostic flags for /api/content-status.
 * The menu feed 404s today, so this fails open to the coded gate.
 * It does not add or remove redirects.
 */
export async function getCigaretteSnapshot(): Promise<CigaretteSnapshot> {
  const show = SHOW_CIGARETTES;
  return { web: { show }, tv: { show }, guides: { show } };
}
