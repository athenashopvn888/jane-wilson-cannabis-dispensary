/** Optional store-specific hiring copy for the in-store boards. */
export type TvHiringConfig = {
  store: string;
  headline: string;
  role: string;
  cta: string;
  url: string;
  displayUrl: string;
};

// Jane Wilson has no approved hiring message in the current site data.
export const tvHiring: TvHiringConfig | null = null;
