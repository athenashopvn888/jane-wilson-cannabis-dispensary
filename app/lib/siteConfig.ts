/**
 * Site-wide cigarette visibility.
 * SHOW_CIGARETTES defaults to false. Set NEXT_PUBLIC_SHOW_CIGARETTES=true
 * (also 1, yes, or on) and rebuild to restore every gated surface.
 */
const SHOW_CIGARETTES_DEFAULT = false;

const rawShowCigarettes = process.env.NEXT_PUBLIC_SHOW_CIGARETTES;

export const SHOW_CIGARETTES =
  rawShowCigarettes == null || rawShowCigarettes.trim() === ""
    ? SHOW_CIGARETTES_DEFAULT
    : /^(1|true|yes|on)$/i.test(rawShowCigarettes.trim());

export const CIGARETTE_PAGE_PATH = "/native-cigarettes-jane-street";
export const VAPE_PAGE_PATH = "/nicotine-vapes-jane-street";

/** Rolling papers, Backwoods, and cigarillos stay listed when cigarettes are hidden. */
export function isKeptSmokeAccessory(name: string): boolean {
  return /\bbackwoods\b|\bcigarillos?\b|rolling\s+papers?/i.test(name);
}

export function isCigaretteCategory(category: string | undefined): boolean {
  return (category || "").toUpperCase() === "CIGARETTES";
}

export function isHiddenCigaretteItem(item: { category?: string; name?: string }): boolean {
  if (SHOW_CIGARETTES) return false;
  if (!isCigaretteCategory(item.category)) return false;
  return !isKeptSmokeAccessory(item.name || "");
}
