import type { Nap, ResolvedBanner, ResolvedPage } from "./types.ts";
import { GOOGLE_BUSINESS_PROFILE_URL } from "../store.ts";

/**
 * The only store-specific fleet file. Other stores replace this module
 * and leave the rest of app/lib/fleet and app/components/fleet as-is.
 */
export const FLEET_STORE_CODE = "JWS01";
export const FLEET_STORE_NAME = "Jane Wilson Cannabis Dispensary";
export const FLEET_AREA = "North York";
export const FLEET_DOMAIN = "janewilsoncannabisdispensary.com";
export const FLEET_DOMAINS = ["janewilsoncannabisdispensary.com", "www.janewilsoncannabisdispensary.com"] as const;
export const FLEET_ORIGIN = "https://janewilsoncannabisdispensary.com";

/** Public blob origin. Objects live at /{storeCode}/manifest.json and /{storeCode}/articles/. */
export const FLEET_BLOB_ORIGIN = "https://dhaah0upvlpukv56.public.blob.vercel-storage.com";

export const FLEET_COLORS = {
  banner: "#1e082d",
  bannerText: "#ffffff",
} as const;

/**
 * Digits or formatted numbers. An article containing any of these is dropped.
 * The private delivery line is read at runtime and is never written here.
 * Client bundles do not receive that value.
 */
function blockedPhones(): readonly string[] {
  const digits = (process.env.SOD_STORE_JWS01_PHONE || "").replace(/\D/g, "");
  return digits ? [digits, "telnyx"] : ["telnyx"];
}

export const FLEET_BLOCKED_PHONES: readonly string[] = blockedPhones();

export const FLEET_ARTICLES_PATH = "/articles";

/** Page and spot names for the six TV2 category cards. Spot is the card name. */
export const TV2_PAGE = "TV2";
export const TV2_CARDS = [
  "PREROLLS_ADDONS",
  "VAPES",
  "EDIBLES",
  "CONCENTRATES",
  "CIGARETTES",
  "MAGIC",
] as const;

export const TV_PAGE = "TV";
export const TV_FULLSCREEN_SPOTS = [
  "Fullscreen promo 1",
  "Fullscreen promo 2",
  "Fullscreen promo 3",
] as const;

/** Fort York Cannabis takeover defaults: 5s on screen, once a minute, 5s first preview, 650ms slide. */
export const TV_PROMO_SHOW_SECONDS = 5;
export const TV_PROMO_EVERY_MINUTES = 1;
export const TV_PROMO_INITIAL_DELAY_MS = 5_000;
export const TV_PROMO_SLIDE_MS = 650;

export function defaultManifestUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/manifest.json`;
}

export function articlesIndexUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/index.json`;
}

export function articleBodyUrl(slug: string, storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/${encodeURIComponent(slug)}.json`;
}

export const CODED_NAP: Nap = {
  name: "Jane Wilson Cannabis Dispensary",
  street: "2111 Jane St, Unit 12",
  city: "North York",
  province: "ON",
  postalCode: "M3M 1A2",
  cityLine: "North York, ON M3M 1A2",
  area: "North York",
  intersection: "Jane Street at Wilson Avenue",
  areaLine: "Jane Street at Wilson Avenue, North York",
  phoneDisplay: "437-465-7700",
  phoneTel: "+14374657700",
  hours: "10:00 AM – 12:00 AM (midnight) daily",
  mapsSearchUrl: GOOGLE_BUSINESS_PROFILE_URL,
  mapsEmbedUrl: GOOGLE_BUSINESS_PROFILE_URL,
  lat: "43.7190908",
  lng: "-79.5080771",
  schemaName: "Jane Wilson Cannabis Dispensary Weed Delivery",
  website: "https://janewilsoncannabisdispensary.com",
};

export const CODED_BANNERS: ResolvedBanner[] = [
  {
    id: "weed",
    page: "Home",
    spot: "Top banner",
    href: "/premium-weed",
    categoryName: "Top Weed Tier",
    hidden: false,
    render: "image",
    image: "/images/jane-wilson-home-top-weed-tier.webp",
    codedImage: "/images/jane-wilson-home-top-weed-tier.webp",
    imageWidth: 1600,
    imageHeight: 900,
    alt: "Top weed tier: Exotic, Premium and AAA+ weed at Jane Wilson Cannabis Dispensary, Jane Street, North York",
    title: "Shop Exotic, Premium and AAA+ weed on Jane Street",
    textBar: "Top weed tier: Exotic, Premium and AAA+",
    caption: "Exotic, Premium and AAA+ flower, in 3g, 6g, 14g and 28g.",
  },
  {
    id: "vapes",
    page: "Home",
    spot: "Promo banner 2",
    href: "/nicotine-vapes-jane-street",
    categoryName: "Vapes",
    hidden: false,
    render: "image",
    image: "/images/jane-wilson-home-vapes.webp",
    codedImage: "/images/jane-wilson-home-vapes.webp",
    imageWidth: 1600,
    imageHeight: 900,
    alt: "Nicotine vapes and THC vapes at Jane Wilson Cannabis Dispensary, Jane Street, North York",
    title: "Shop vapes on Jane Street",
    textBar: "Vapes: nicotine and THC",
    caption: "Nicotine vape disposables and THC vapes at the Jane Street counter.",
  },
  {
    id: "cigarettes",
    page: "Home",
    spot: "Promo banner 3",
    href: "/native-cigarettes-jane-street",
    categoryName: "Cigarettes",
    hidden: false,
    render: "image",
    image: "/images/jane-wilson-home-cigarettes-2-packs.webp",
    codedImage: "/images/jane-wilson-home-cigarettes-2-packs.webp",
    imageWidth: 1600,
    imageHeight: 900,
    alt: "Cigarettes mix and match, 2 packs for $5 or $25 a carton, at Jane Wilson Cannabis Dispensary, North York",
    title: "Cigarettes on Jane Street",
    textBar: "Cigarettes: 2 packs $5 or $25 a carton",
    caption: "Mix and match: 2 packs for $5 or $25 a carton.",
  },
  {
    id: "premium-cigarettes",
    page: "Home",
    spot: "Promo banner 4",
    href: "/native-cigarettes-jane-street",
    categoryName: "Premium Cigarettes",
    hidden: false,
    render: "image",
    image: "/images/jane-wilson-home-bb-marlboro-belmont.webp",
    codedImage: "/images/jane-wilson-home-bb-marlboro-belmont.webp",
    imageWidth: 1448,
    imageHeight: 1086,
    alt: "BB Full, BB Light, Belmont and Marlboro cigarettes at Jane Wilson Cannabis Dispensary, North York",
    title: "BB, Marlboro and Belmont cigarettes on Jane Street",
    textBar: "BB Full, BB Light and Belmont. Marlboro & Belmont $10",
    caption: "BB Full, BB Light and Belmont, plus Marlboro and Belmont at $10.",
  },
];

export const CODED_PAGES: Record<string, ResolvedPage> = {
  Home: {
    description: "Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12 serves the Jane–Wilson and Downsview corridor. Open 10:00 AM to midnight daily. Flower tiers and nicotine vapes for adults 19+.",
    metaTitle: "Jane Wilson Cannabis Dispensary Weed Delivery | Jane St North York",
    metaDescription: "Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12 serves the Jane–Wilson and Downsview corridor. Open 10:00 AM to midnight daily. Flower tiers and nicotine vapes for adults 19+.",
  },
  Contact: {
    description: "Visit Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12, North York, ON M3M 1A2. Open 10:00 AM to midnight daily.",
    metaTitle: "Visit Jane Wilson Cannabis Dispensary | 2111 Jane St, North York",
    metaDescription: "Visit Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12, North York, ON M3M 1A2. Open 10:00 AM to midnight daily.",
  },
};
