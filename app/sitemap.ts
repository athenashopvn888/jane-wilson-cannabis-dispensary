import type { MetadataRoute } from "next";
import { STORE, TIERS } from "./lib/store";
export default function sitemap(): MetadataRoute.Sitemap { const now = new Date(); return [{ url: STORE.origin, lastModified: now, changeFrequency: "weekly", priority: 1 }, { url: `${STORE.origin}/weed-dispensary-north-york`, lastModified: now, changeFrequency: "weekly", priority: 0.9 }, ...TIERS.map((tier) => ({ url: `${STORE.origin}/${tier.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 }))]; }
