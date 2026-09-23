export const STORE = {
  code: "JWCD01",
  name: "Jane Wilson Cannabis Dispensary",
  shortName: "Jane Wilson Cannabis",
  address: "2111 Jane St #12, North York, ON M3M 1A2, Canada",
  street: "2111 Jane St, Unit 12",
  locality: "North York, ON M3M 1A2",
  phone: "437-465-7700",
  phoneHref: "+14374657700",
  origin: "https://janewilsoncannabisdispensary.com",
  maps: "https://maps.app.goo.gl/vxXQtLG52Fw6UeZy6"
} as const;

export const TIERS = [
  { slug: "exotic-weed", name: "Exotic Weed", tone: "#681ca8" },
  { slug: "premium-weed", name: "Premium Weed", tone: "#7d31bd" },
  { slug: "aaa-weed", name: "AAA+ Weed", tone: "#913fd0" },
  { slug: "aa-weed", name: "AA Weed", tone: "#27a951" },
  { slug: "budget-weed", name: "Budget Weed", tone: "#43cc5c" }
] as const;

export type TierSlug = (typeof TIERS)[number]["slug"];
