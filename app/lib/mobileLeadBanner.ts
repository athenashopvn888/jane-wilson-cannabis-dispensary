import { BANNER_SLOTS, type BannerSlot } from "./banners.ts";
import type { ResolvedBanner } from "./fleet/types.ts";
import { CIGARETTE_PAGE_PATH, SHOW_CIGARETTES } from "./siteConfig.ts";

const SLOT_ID_BY_CORE = {
  weed: "home-top-weed-tier",
  vapes: "home-vapes",
  cigarettes: "home-cigarettes-2-packs",
  "premium-cigarettes": "home-bb-marlboro-belmont",
} as const;

export type MobileLeadBannerModel = {
  slotId: string;
  coreId: string;
  href: string;
  textBar: string;
  alt: string;
  title: string;
  caption: string;
  src: string;
  src800?: string;
  width: number;
  height: number;
};

function cigaretteHidden(id: string, href: string) {
  if (SHOW_CIGARETTES) return false;
  return href === CIGARETTE_PAGE_PATH || id === "cigarettes" || id === "premium-cigarettes";
}

function slotFor(coreId: ResolvedBanner["id"]): BannerSlot | undefined {
  return BANNER_SLOTS.home.slots.find((slot) => slot.id === SLOT_ID_BY_CORE[coreId]);
}

function fromResolved(banner: ResolvedBanner): MobileLeadBannerModel | null {
  const slot = slotFor(banner.id);
  const src = banner.render === "image" && banner.image ? banner.image : banner.codedImage || slot?.file;
  if (!src || cigaretteHidden(banner.id, banner.href)) return null;
  const usingCodedFile = Boolean(slot?.file && (src === slot.file || src === banner.codedImage));
  return {
    slotId: slot?.id ?? banner.id,
    coreId: banner.id,
    href: banner.href,
    textBar: banner.textBar,
    alt: banner.alt,
    title: banner.title,
    caption: banner.caption,
    src,
    src800: usingCodedFile ? slot?.file800 : undefined,
    width: usingCodedFile ? slot?.w ?? banner.imageWidth ?? 1600 : banner.imageWidth || slot?.w || 1600,
    height: usingCodedFile ? slot?.h ?? banner.imageHeight ?? 900 : banner.imageHeight || slot?.h || 900,
  };
}

function fromSlot(slot: BannerSlot): MobileLeadBannerModel | null {
  if (!slot.file || cigaretteHidden(slot.id, slot.href)) return null;
  const coreId = (Object.entries(SLOT_ID_BY_CORE).find(([, slotId]) => slotId === slot.id)?.[0] ?? slot.id) as MobileLeadBannerModel["coreId"];
  return {
    slotId: slot.id,
    coreId,
    href: slot.href,
    textBar: slot.textBar,
    alt: slot.alt,
    title: slot.title,
    caption: slot.caption,
    src: slot.file,
    src800: slot.file800,
    width: slot.w,
    height: slot.h,
  };
}

/**
 * Banner shown above the homepage hero on viewports under 768px.
 * Prefers the Top Weed Tier homepage art. If that slot is hidden or has no
 * file, uses the next visible homepage promo that still has art.
 */
export function homeMobileLeadBanner(sheetBanners?: ResolvedBanner[]): MobileLeadBannerModel | null {
  if (sheetBanners?.length) {
    const visible = sheetBanners.filter((banner) => !banner.hidden && !cigaretteHidden(banner.id, banner.href));
    const weed = visible.find((banner) => banner.id === "weed");
    const chosen = weed ?? visible[0];
    if (!chosen) return null;
    return fromResolved(chosen);
  }

  const slots = BANNER_SLOTS.home.slots.filter((slot) => slot.file && !cigaretteHidden(slot.id, slot.href));
  const top = slots.find((slot) => slot.id === "home-top-weed-tier") ?? slots[0];
  return top ? fromSlot(top) : null;
}

/** Hides only the promoted banner in the lower homepage stack on mobile. */
export function mobileLeadHideCss(banner: MobileLeadBannerModel): string {
  const slot = banner.slotId.replace(/[^a-z0-9-]/gi, "");
  const core = banner.coreId.replace(/[^a-z0-9-]/gi, "");
  return `@media (max-width:767px){[data-banner-page="home"] [data-slot="${slot}"],[data-fleet-homepage-announcement] [data-core-banner="${core}"]{display:none}}`;
}
