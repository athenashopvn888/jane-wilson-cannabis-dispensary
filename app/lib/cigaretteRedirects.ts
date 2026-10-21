import itemsJson from "./items.json";
import { CIGARETTE_PAGE_PATH, SHOW_CIGARETTES, VAPE_PAGE_PATH, isHiddenCigaretteItem } from "./siteConfig";

type MenuRow = { slug: string; category: string; name: string };

/** Temporary 302s. Omitted entirely when SHOW_CIGARETTES is on, so the old URLs render again. */
export function cigaretteRedirects(): { source: string; destination: string; statusCode: 302 }[] {
  if (SHOW_CIGARETTES) return [];
  const sources = [
    CIGARETTE_PAGE_PATH,
    ...(itemsJson as MenuRow[])
      .filter((item) => isHiddenCigaretteItem(item))
      .map((item) => `/item/${item.slug}`)
  ];
  return sources.map((source) => ({
    source,
    destination: VAPE_PAGE_PATH,
    statusCode: 302 as const
  }));
}
