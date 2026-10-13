/**
 * JWS01 banner PLACEHOLDER slots (Tri 2026-10-13). One config drives every slot.
 * Each slot is a neutral JWS-coloured box until Codex supplies JWS-branded art.
 * When art lands: set `file` (and `file800`) to a /public/images path; BannerSlots then renders the image
 * with the alt/title/caption below. Never use art showing another store's name.
 * Public phone in any art: Master Lines 437-465-7700 only.
 */
export type BannerSlot = {
  id: string;
  label: string;
  w: number;
  h: number;
  href: string;
  textBar: string;
  alt: string;
  title: string;
  caption: string;
  file?: string;
  file800?: string;
};

export type BannerPage = "home" | "premium-weed" | "vapes" | "cigarettes" | "delivery";

const CIGS = "/native-cigarettes-jane-street";
const VAPES = "/nicotine-vapes-jane-street";

export const BANNER_SLOTS: Record<BannerPage, { heading: string; slots: BannerSlot[] }> = {
  // Tri's homepage order: Top Weed Tier, Vapes, Cigarettes 2 packs $5 / $25 carton, BB FULL/LIGHT/BELMONT + Marlboro & Belmont $10.
  home: {
    heading: "Shop Top Weed, Vapes and Cigarettes on Jane Street",
    slots: [
      { id: "home-top-weed-tier", label: "Top Weed Tier", w: 1600, h: 900, href: "/premium-weed", textBar: "Top weed tier: Exotic, Premium and AAA+", alt: "Top weed tier: Exotic, Premium and AAA+ weed at Jane Wilson Cannabis Dispensary, Jane Street, North York", title: "Shop Exotic, Premium and AAA+ weed on Jane Street", caption: "Exotic, Premium and AAA+ flower, in 3g, 6g, 14g and 28g." },
      { id: "home-vapes", label: "Vapes", w: 1600, h: 900, href: VAPES, textBar: "Vapes: nicotine and THC", alt: "Nicotine vapes and THC vapes at Jane Wilson Cannabis Dispensary, Jane Street, North York", title: "Shop vapes on Jane Street", caption: "Nicotine vape disposables and THC vapes at the Jane Street counter." },
      { id: "home-cigarettes-2-packs", label: "Cigarettes 2 packs $5 / $25 carton", w: 1600, h: 900, href: CIGS, textBar: "Cigarettes: 2 packs $5 or $25 a carton", alt: "Cigarettes mix and match, 2 packs for $5 or $25 a carton, at Jane Wilson Cannabis Dispensary, North York", title: "Cigarettes on Jane Street", caption: "Mix and match: 2 packs for $5 or $25 a carton." },
      { id: "home-bb-marlboro-belmont", label: "BB FULL / LIGHT / BELMONT + Marlboro & Belmont $10", w: 1448, h: 1086, href: CIGS, textBar: "BB Full, BB Light and Belmont. Marlboro & Belmont $10", alt: "BB Full, BB Light, Belmont and Marlboro cigarettes at Jane Wilson Cannabis Dispensary, North York", title: "BB, Marlboro and Belmont cigarettes on Jane Street", caption: "BB Full, BB Light and Belmont, plus Marlboro and Belmont at $10." }
    ]
  },
  "premium-weed": {
    heading: "Exotic, Premium and AAA+",
    slots: [
      { id: "tier-top-weed-owner-banner", label: "Top Weed Tiers owner banner", w: 1672, h: 941, href: "/premium-weed", textBar: "Exotic, Premium and AAA+: Buy 2g Get 1g FREE in store", alt: "Top weed tiers at Jane Wilson Cannabis Dispensary: Exotic, Premium and AAA+", title: "Top weed tiers on Jane Street", caption: "In-store free-gram promo applies to the top three tiers." }
    ]
  },
  vapes: {
    heading: "Vapes at Jane Wilson",
    slots: [
      { id: "vapes-owner-banner", label: "Vapes owner banner (nicotine + THC)", w: 1672, h: 941, href: VAPES, textBar: "Nicotine vapes and THC vapes", alt: "Jane Wilson vapes: nicotine vape disposables and THC vape disposables", title: "Vapes at Jane Wilson Cannabis Dispensary", caption: "Nicotine vapes on the left, THC vapes on the right." },
      { id: "vapes-nicotine-banner", label: "Nicotine vapes banner", w: 1672, h: 941, href: VAPES, textBar: "Nicotine vape disposables", alt: "Nicotine vape disposables at Jane Wilson Cannabis Dispensary, North York", title: "Nicotine vapes on Jane Street", caption: "Nicotine vape disposables at the Jane Street counter." },
      { id: "vapes-thc-banner", label: "THC vapes banner", w: 1672, h: 941, href: VAPES, textBar: "THC vape disposables", alt: "THC vape disposables at Jane Wilson Cannabis Dispensary, North York", title: "THC vapes on Jane Street", caption: "THC vape disposables, adults 19+." }
    ]
  },
  cigarettes: {
    heading: "Cigarette deals on Jane Street",
    slots: [
      { id: "cigs-bb-marlboro-belmont", label: "BB / Marlboro / Belmont owner banner", w: 1448, h: 1086, href: CIGS, textBar: "BB Full, BB Light, Belmont. Marlboro & Belmont $10", alt: "BB, Marlboro and Belmont cigarette packs at Jane Wilson Cannabis Dispensary", title: "BB, Marlboro and Belmont cigarettes on Jane Street", caption: "Marlboro and Belmont at $10." },
      { id: "cigs-mix-match", label: "Cigarettes mix & match owner banner", w: 1672, h: 941, href: CIGS, textBar: "Mix and match: 2 packs $5 or $25 a carton", alt: "Canadian cigarette brands, mix and match 2 packs for $5 or $25 a carton, at Jane Wilson Cannabis Dispensary", title: "Canadian cigarette brands on Jane Street", caption: "2 packs for $5 or $25 a carton." },
      { id: "cigs-full-light-preorder", label: "Full & light pre-order owner banner", w: 1672, h: 941, href: CIGS, textBar: "Full and light brands: ask to pre-order", alt: "Full and light cigarette brands available to pre-order at Jane Wilson Cannabis Dispensary", title: "Pre-order your cigarette brand on Jane Street", caption: "Call 437-465-7700 to ask about a brand." }
    ]
  },
  delivery: {
    heading: "Weed delivery from Jane Street",
    slots: [
      { id: "delivery-handoff-illustration", label: "Weed delivery handoff illustration", w: 1200, h: 800, href: "/delivery", textBar: "Weed delivery: bulk pricing, separate menu", alt: "Illustrated sealed-bag weed delivery handoff concept for North York from Jane Wilson Cannabis Dispensary", title: "Illustrated Jane Wilson weed delivery concept", caption: "Delivery has its own bulk menu. Adults 19+, ID checked at the door." }
    ]
  }
};
