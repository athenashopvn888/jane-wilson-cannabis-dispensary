import type { MetadataRoute } from "next";
import { flowerPath, staticFlowers, staticItems } from "./lib/inventory";
import { STORE, TIERS } from "./lib/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/visit", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/weed-dispensary-jane-street", changeFrequency: "weekly" as const, priority: 0.95 },
    { path: "/native-cigarettes-jane-street", changeFrequency: "daily" as const, priority: 0.8 },
    { path: "/nicotine-vapes-jane-street", changeFrequency: "daily" as const, priority: 0.8 }
  ];
  const publicItems = staticItems.filter((item) => item.category === "CIGARETTES" || item.category === "VAPE PENS");

  return [
    ...pages.map((page) => ({ url: `${STORE.origin}${page.path}`, lastModified: now, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...TIERS.map((tier) => ({ url: `${STORE.origin}/${tier.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.85 })),
    ...staticFlowers.map((flower) => ({ url: `${STORE.origin}${flowerPath(flower)}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.6 })),
    ...publicItems.map((item) => ({ url: `${STORE.origin}/item/${item.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.55 }))
  ];
}
