import type { MetadataRoute } from "next";
import { STORE, TIERS } from "./lib/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/visit", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/weed-dispensary-jane-street", changeFrequency: "weekly" as const, priority: 0.95 }
  ];

  return [
    ...pages.map((page) => ({ url: `${STORE.origin}${page.path}`, lastModified: now, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...TIERS.map((tier) => ({ url: `${STORE.origin}/${tier.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.85 }))
  ];
}
