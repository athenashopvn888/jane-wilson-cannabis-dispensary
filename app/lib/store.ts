/** Jane Wilson Google Business Profile. The only directions / map URL on the site. */
export const GOOGLE_BUSINESS_PROFILE_URL = "https://maps.app.goo.gl/xcYB9eL7g9SF8UtMA";

/** Jane Wilson Google review form. The only leave-a-review URL on the site. */
export const GOOGLE_REVIEW_URL = "https://g.page/r/Ce0u9eTmYclKEAI/review";

export const STORE = {
  code: "JWC01",
  name: "Jane Wilson Cannabis Dispensary",
  shortName: "Jane Wilson Cannabis",
  address: "2111 Jane St, Unit 12, North York, ON M3M 1A2",
  street: "2111 Jane St, Unit 12",
  locality: "North York, ON M3M 1A2",
  /** Public Master Lines number (see lib/phoneLines.ts). The only phone shown on the site. */
  masterLine: "+1 437-465-7700",
  phone: "437-465-7700",
  phoneHref: "+14374657700",
  /** Canonical host for schema, sitemap, robots, and canonical tags. */
  origin: "https://janewilsoncannabisdispensary.com",
  canonicalTarget: "https://janewilsoncannabisdispensary.com",
  preview: "https://jane-wilson-cannabis-dispensary.vercel.app",
  /** Google Business Profile. Every directions and map link uses this one URL. */
  maps: GOOGLE_BUSINESS_PROFILE_URL,
  /** Google Maps place pin for 2111 Jane St #12 (the maps link above). */
  latitude: 43.7190908,
  longitude: -79.5080771,
  corridor: "Jane Street at Wilson Avenue",
  neighbourhoods: ["Jane and Wilson", "Downsview", "North York"],
  hoursLabel: "10:00 AM – 12:00 AM (midnight) daily",
  hoursOpens: "10:00",
  hoursCloses: "00:00"
} as const;

export const HOURS_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
] as const;

/** Fleet flower weights. Price columns are 3g / 5g / 14g / 28g only. */
export const WEIGHTS = ["3g", "5g", "14g", "28g"] as const;

export type FlowerWeight = (typeof WEIGHTS)[number];

export const MENU_PREVIEW_NOTE =
  "The menu changes through the day. Call or drop in to check a strain before you make the trip.";

export const TIERS = [
  {
    slug: "exotic-weed",
    key: "EXOTIC",
    name: "Exotic Weed",
    tone: "#681ca8",
    summary: "Our top shelf: the standout looks, loud aromas and rarer cultivars.",
    guide: "Exotic Weed is our top shelf. It comes in 3g, 6g, 14g and 28g, and gets the in-store free gram along with Premium and AAA+."
  },
  {
    slug: "premium-weed",
    key: "PREMIUM",
    name: "Premium Weed",
    tone: "#7d31bd",
    summary: "Top-quality flower one step under Exotic.",
    guide: "Premium Weed sits below Exotic Weed and above AAA+ Weed. Weights on this page are 3g, 6g, 14g, and 28g."
  },
  {
    slug: "aaa-weed",
    key: "AAA+",
    name: "AAA+ Weed",
    tone: "#913fd0",
    summary: "Solid, well-grown flower in the middle of the menu.",
    guide: "AAA+ Weed sits in the middle of our menu and comes in 3g, 6g, 14g and 28g."
  },
  {
    slug: "aa-weed",
    key: "AA",
    name: "AA Weed",
    tone: "#27a951",
    summary: "Good everyday flower, and the only tier with a true 5g.",
    guide: "AA Weed is its own collection, separate from Budget Weed. Listed weights are 3g, 5g, 14g, and 28g."
  },
  {
    slug: "budget-weed",
    key: "BUDGET",
    name: "Budget Weed",
    tone: "#43cc5c",
    summary: "The easy everyday tier at Jane and Wilson.",
    guide: "Budget Weed is our everyday tier, in 3g, 5g, 14g and 28g."
  }
] as const;

export type TierSlug = (typeof TIERS)[number]["slug"];

export const LOCAL_ROUTES = [
  { href: "/visit", label: "Visit Jane Wilson", detail: "Directions, TTC and daily hours" },
  { href: "/weed-dispensary-jane-street", label: "Jane Street Weed Dispensary", detail: "All about our shop at Jane and Wilson" },
  { href: "/native-cigarettes-jane-street", label: "Native Cigarettes", detail: "Cigarette listings for the Jane Street counter. Adults 19+." },
  { href: "/nicotine-vapes-jane-street", label: "Nicotine Vapes", detail: "Nicotine vape listings, kept separate from flower. Adults 19+." },
  { href: "/menu", label: "Menu", detail: "In-store flower and nicotine vape preview. Confirm at the counter." },
  { href: "/resources", label: "Resources", detail: "Guides to our flower tiers, strain types and visiting the shop" },
  { href: "/dispensary-near-me", label: "Dispensary near me", detail: "Looking for a dispensary near Jane and Wilson? Start here." }
] as const;

export function tierBySlug(slug: string) {
  return TIERS.find((tier) => tier.slug === slug);
}

export function tierByKey(key: string) {
  return TIERS.find((tier) => tier.key === key);
}

export function storeSchema() {
  return {
    "@type": "CannabisStore",
    "@id": `${STORE.origin}/#store`,
    name: "Jane Wilson Cannabis Dispensary Weed Delivery",
    alternateName: STORE.name,
    url: STORE.origin,
    telephone: STORE.phoneHref,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...HOURS_DAYS],
      opens: STORE.hoursOpens,
      closes: STORE.hoursCloses
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2111 Jane St, Unit 12",
      addressLocality: "North York",
      addressRegion: "ON",
      postalCode: "M3M 1A2",
      addressCountry: "CA"
    },
    hasMap: STORE.maps,
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE.latitude,
      longitude: STORE.longitude
    },
    areaServed: STORE.neighbourhoods
  };
}
