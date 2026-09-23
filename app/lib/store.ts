export const STORE = {
  code: "JWCD01",
  name: "Jane Wilson Cannabis Dispensary",
  shortName: "Jane Wilson Cannabis",
  address: "2111 Jane St #12, North York, ON M3M 1A2, Canada",
  street: "2111 Jane St, Unit 12",
  locality: "North York, ON M3M 1A2",
  phone: "437-465-7700",
  phoneHref: "+14374657700",
  origin: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jane-wilson-cannabis-dispensary.vercel.app",
  canonicalTarget: "https://janewilsoncannabisdispensary.com",
  maps: "https://maps.app.goo.gl/vxXQtLG52Fw6UeZy6",
  corridor: "Jane Street at Wilson Avenue",
  neighbourhoods: ["Jane and Wilson", "Downsview", "North York"],
  hoursStatus: "Call the store to confirm today’s hours"
} as const;

export const TIERS = [
  {
    slug: "exotic-weed",
    name: "Exotic Weed",
    tone: "#681ca8",
    summary: "The top flower tier for shoppers comparing standout aroma, appearance, and cultivar character.",
    guide: "Ask what is currently listed in Exotic Weed, then compare the exact weights and prices confirmed by the Jane Wilson counter."
  },
  {
    slug: "premium-weed",
    name: "Premium Weed",
    tone: "#7d31bd",
    summary: "An upper flower tier for people looking for a strong balance of quality, presentation, and value.",
    guide: "Premium Weed sits below Exotic Weed in the store’s five-tier structure and above AAA+ Weed."
  },
  {
    slug: "aaa-weed",
    name: "AAA+ Weed",
    tone: "#913fd0",
    summary: "The middle tier in the Jane Wilson flower ladder, designed for straightforward comparison shopping.",
    guide: "Use this page to understand the AAA+ Weed tier, then call the store for the current strain list, weights, and prices."
  },
  {
    slug: "aa-weed",
    name: "AA Weed",
    tone: "#27a951",
    summary: "A value-focused flower tier positioned between AAA+ Weed and Budget Weed.",
    guide: "AA Weed is a separate collection from Budget Weed; confirm the exact product and price before travelling."
  },
  {
    slug: "budget-weed",
    name: "Budget Weed",
    tone: "#43cc5c",
    summary: "The entry-value tier in the five-level Jane Wilson flower menu.",
    guide: "Budget Weed is organized for price-conscious comparison without borrowing listings from another store."
  }
] as const;

export type TierSlug = (typeof TIERS)[number]["slug"];

export const WEIGHTS = ["3.5g", "7g", "14g", "28g"] as const;

export const LOCAL_ROUTES = [
  { href: "/visit", label: "Visit Jane Wilson", detail: "Map, TTC arrival, Unit 12, and last-mile notes" },
  { href: "/weed-dispensary-jane-street", label: "Jane Street Weed Dispensary", detail: "The Jane–Wilson and Downsview corridor guide" }
] as const;

export function storeSchema(url = STORE.origin) {
  return {
    "@type": "CannabisStore",
    "@id": `${STORE.origin}/#store`,
    name: STORE.name,
    url,
    telephone: STORE.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2111 Jane St, Unit 12",
      addressLocality: "North York",
      addressRegion: "ON",
      postalCode: "M3M 1A2",
      addressCountry: "CA"
    },
    hasMap: STORE.maps,
    areaServed: STORE.neighbourhoods
  };
}
