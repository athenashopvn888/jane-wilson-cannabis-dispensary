export const STORE = {
  code: "JWCD01",
  name: "Jane Wilson Cannabis Dispensary",
  shortName: "Jane Wilson Cannabis",
  address: "2111 Jane St, Unit 12, North York, ON M3M 1A2",
  street: "2111 Jane St, Unit 12",
  locality: "North York, ON M3M 1A2",
  phone: "437-465-7700",
  phoneHref: "+14374657700",
  /** Canonical host for schema, sitemap, robots, and canonical tags. */
  origin: "https://janewilsoncannabisdispensary.com",
  canonicalTarget: "https://janewilsoncannabisdispensary.com",
  preview: "https://jane-wilson-cannabis-dispensary.vercel.app",
  maps: "https://maps.app.goo.gl/vxXQtLG52Fw6UeZy6",
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
  "Menu preview — confirm availability and prices at the Jane Wilson counter until the Jane Wilson live feed is connected.";

export const TIERS = [
  {
    slug: "exotic-weed",
    key: "EXOTIC",
    name: "Exotic Weed",
    tone: "#681ca8",
    summary: "The top flower tier for shoppers comparing standout aroma, appearance, and cultivar character.",
    guide: "Exotic Weed is the top shelf in the Jane Wilson five-tier flower ladder. Compare 3g, 5g, 14g, and 28g prices on this page, then confirm the jar at the Unit 12 counter."
  },
  {
    slug: "premium-weed",
    key: "PREMIUM",
    name: "Premium Weed",
    tone: "#7d31bd",
    summary: "An upper flower tier for people looking for a strong balance of quality, presentation, and value.",
    guide: "Premium Weed sits below Exotic Weed and above AAA+ Weed. Weights on this page are 3g, 5g, 14g, and 28g."
  },
  {
    slug: "aaa-weed",
    key: "AAA+",
    name: "AAA+ Weed",
    tone: "#913fd0",
    summary: "The middle tier in the Jane Wilson flower ladder, designed for straightforward comparison shopping.",
    guide: "AAA+ Weed is the middle collection. Use the 3g, 5g, 14g, and 28g columns, then confirm today’s jar at Jane Wilson."
  },
  {
    slug: "aa-weed",
    key: "AA",
    name: "AA Weed",
    tone: "#27a951",
    summary: "A value-focused flower tier positioned between AAA+ Weed and Budget Weed.",
    guide: "AA Weed is its own collection, separate from Budget Weed. Listed weights are 3g, 5g, 14g, and 28g."
  },
  {
    slug: "budget-weed",
    key: "BUDGET",
    name: "Budget Weed",
    tone: "#43cc5c",
    summary: "The entry-value tier in the five-level Jane Wilson flower menu.",
    guide: "Budget Weed is the entry-value tier at 2111 Jane Street. Compare 3g, 5g, 14g, and 28g, then confirm at the counter."
  }
] as const;

export type TierSlug = (typeof TIERS)[number]["slug"];

export const LOCAL_ROUTES = [
  { href: "/visit", label: "Visit Jane Wilson", detail: "Map, TTC arrival, Unit 12, parking notes, and daily hours" },
  { href: "/weed-dispensary-jane-street", label: "Jane Street Weed Dispensary", detail: "The Jane–Wilson and Downsview corridor guide" },
  { href: "/native-cigarettes-jane-street", label: "Native Cigarettes", detail: "Cigarette listings for the Jane Street counter. Adults 19+." },
  { href: "/nicotine-vapes-jane-street", label: "Nicotine Vapes", detail: "Nicotine vape listings, kept separate from flower. Adults 19+." }
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
    name: STORE.name,
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
    areaServed: STORE.neighbourhoods
  };
}
