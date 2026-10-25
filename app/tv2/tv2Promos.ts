export const TV2_DAYTIME_START_HOUR = 9;
export const TV2_DAYTIME_END_HOUR = 17;

export const CIGARETTE_OFFER_CYCLE_MS = 30_000;
export const CIGARETTE_OFFER_VISIBLE_MS = 5_000;

export const CIGARETTE_PROMOS = [
  {
    src: "/images/jane-wilson-home-cigarettes-2-packs.webp",
    alt: "Mix and match, 2 packs for $5 or $25 a carton, at Jane Wilson Cannabis Dispensary",
  },
  {
    src: "/images/jane-wilson-home-bb-marlboro-belmont.webp",
    alt: "BB, Marlboro and Belmont cigarettes at Jane Wilson Cannabis Dispensary",
  },
] as const;

export type Tv2DaytimePromo = {
  src: string;
  fallbackSrc?: string;
  alt: string;
};

export const TV2_DAYTIME_PROMOS: Readonly<
  Partial<Record<string, Tv2DaytimePromo>>
> = {
  CIGARETTES: {
    src: "/banners/cannabis_banner_mashup_variation_01_600x600.webp",
    alt: "Cannabis Collection Promo",
  },
  VAPES: {
    src: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/cannabis_banner_mashup_variation_01_600x600.webp",
    fallbackSrc:
      "/banners/cannabis_banner_mashup_variation_01_600x600.webp",
    alt: "Ultimate Cannabis Collection Promo",
  },
};

export function isTv2Daytime(now = new Date()): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", hour: "2-digit", hourCycle: "h23" })
      .formatToParts(now).find((p) => p.type === "hour")?.value ?? "0",
  );
  return hour >= TV2_DAYTIME_START_HOUR && hour < TV2_DAYTIME_END_HOUR;
}

export function getTv2DaytimePromo(
  cardId: string,
  daytime: boolean,
): Tv2DaytimePromo | undefined {
  return daytime ? TV2_DAYTIME_PROMOS[cardId] : undefined;
}

export function isCigaretteOfferVisible(
  daytime: boolean,
  elapsedMs: number,
): boolean {
  if (daytime || !Number.isFinite(elapsedMs) || elapsedMs < 0) return false;
  return elapsedMs % CIGARETTE_OFFER_CYCLE_MS < CIGARETTE_OFFER_VISIBLE_MS;
}

export function getCigaretteOfferPromo(daytime: boolean, elapsedMs: number) {
  if (!isCigaretteOfferVisible(daytime, elapsedMs)) return undefined;
  const cycle = Math.floor(elapsedMs / CIGARETTE_OFFER_CYCLE_MS);
  return CIGARETTE_PROMOS[cycle % CIGARETTE_PROMOS.length];
}

