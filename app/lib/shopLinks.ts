/** Public shop and neighbourhood links. Safe to import from client components. */

export const CATEGORY_LINKS = [
  { slug: "prerolls", path: "/items/prerolls", title: "Pre-Rolls", detail: "Infused pre-rolls and the 1g pre-rolls listed with add-ons." },
  { slug: "vape-disposables", path: "/items/vape-disposables", title: "THC Vapes", detail: "Disposable cannabis vapes from the current menu." },
  { slug: "edibles", path: "/items/edibles", title: "Edibles", detail: "Gummies, chocolates, and other edible formats when they are listed." },
  { slug: "concentrates", path: "/items/concentrates", title: "Concentrates", detail: "Hash and other extracts when they are listed." },
  { slug: "add-ons", path: "/items/add-ons", title: "Accessories", detail: "Papers, 1g pre-rolls, and other add-ons from the menu." },
  { slug: "magic", path: "/items/magic", title: "Magic Stuff", detail: "Specialty items kept in their own menu section." }
] as const;

export type CategorySlug = (typeof CATEGORY_LINKS)[number]["slug"];

export const AREA_LINKS = [
  { slug: "downsview", path: "/downsview", title: "Downsview", detail: "The Jane and Wilson counter for the Downsview corridor." },
  { slug: "jane-and-wilson", path: "/jane-and-wilson", title: "Jane and Wilson", detail: "The intersection the shop sits on." },
  { slug: "oakdale", path: "/oakdale", title: "Oakdale", detail: "Wilson Avenue west of Jane, in the same local area." },
  { slug: "black-creek", path: "/black-creek", title: "Black Creek", detail: "The creek and ward around Jane and Wilson." },
  { slug: "brookhaven-amesbury", path: "/brookhaven-amesbury", title: "Brookhaven-Amesbury", detail: "South along Jane Street, toward Lawrence." },
  { slug: "yorkdale", path: "/yorkdale", title: "Yorkdale", detail: "East along Wilson Avenue from the Jane Street counter." }
] as const;

export type AreaSlug = (typeof AREA_LINKS)[number]["slug"];
