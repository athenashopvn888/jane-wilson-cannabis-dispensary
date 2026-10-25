import type { MetadataRoute } from "next";
import { flowerPath, staticFlowers, staticItems } from "./lib/inventory";
import { SHOW_CIGARETTES, isHiddenCigaretteItem } from "./lib/siteConfig";
import { STORE, TIERS } from "./lib/store";
import { GUIDES } from "./lib/content/guides";
import { RESOURCE_ARTICLES } from "./lib/content/resources";
import { loadFleetArticles } from "./lib/fleet/articles";

const CODED_ARTICLE_SLUGS = new Set<string>([
  "indica",
  "sativa",
  "hybrid",
  "strains-a-to-z",
  ...GUIDES.map((guide) => guide.slug),
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/visit", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/hours", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/weed-dispensary-jane-street", changeFrequency: "weekly" as const, priority: 0.95 },
    ...(SHOW_CIGARETTES ? [{ path: "/native-cigarettes-jane-street", changeFrequency: "daily" as const, priority: 0.8 }] : []),
    { path: "/nicotine-vapes-jane-street", changeFrequency: "daily" as const, priority: 0.8 },
    { path: "/delivery", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/weed-delivery-north-york", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/weed-delivery-toronto", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/faq", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/guides", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/resources", changeFrequency: "weekly" as const, priority: 0.7 },
    ...RESOURCE_ARTICLES.map((article) => ({ path: `/resources/${article.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    { path: "/menu", changeFrequency: "daily" as const, priority: 0.85 },
    { path: "/dispensary-near-me", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/guides/indica", changeFrequency: "weekly" as const, priority: 0.6 },
    { path: "/guides/sativa", changeFrequency: "weekly" as const, priority: 0.6 },
    { path: "/guides/hybrid", changeFrequency: "weekly" as const, priority: 0.6 },
    { path: "/guides/strains-a-to-z", changeFrequency: "weekly" as const, priority: 0.6 },
    ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, changeFrequency: "monthly" as const, priority: 0.5 }))
  ];
  const publicItems = staticItems.filter((item) => {
    if (item.category === "VAPE PENS") return true;
    if (item.category !== "CIGARETTES") return false;
    return !isHiddenCigaretteItem(item);
  });

  let fleetArticlePages: MetadataRoute.Sitemap = [];
  try {
    const loaded = await loadFleetArticles();
    if (loaded.ok) {
      fleetArticlePages = loaded.articles
        .filter((article) => !CODED_ARTICLE_SLUGS.has(article.slug))
        .map((article) => ({
          url: `${STORE.origin}/articles/${article.slug}`,
          lastModified: article.publishedAt,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }));
    }
  } catch {
    fleetArticlePages = [];
  }

  return [
    ...pages.map((page) => ({ url: `${STORE.origin}${page.path}`, lastModified: now, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...TIERS.map((tier) => ({ url: `${STORE.origin}/${tier.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.85 })),
    ...staticFlowers.map((flower) => ({ url: `${STORE.origin}${flowerPath(flower)}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.6 })),
    ...publicItems.map((item) => ({ url: `${STORE.origin}/item/${item.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.55 })),
    ...fleetArticlePages,
  ];
}
