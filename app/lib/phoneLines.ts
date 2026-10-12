/**
 * JWS01 phone lines (Tri 2026-10-13).
 * masterLine: public Master Lines number, the ONLY phone shown anywhere (STORE.phone mirrors it).
 * sodDeliveryLine: INTERNAL ONLY dispatch line. Never import this file into a page, component,
 * metadata, JSON-LD or the sitemap. scripts/check-public-phones.mjs fails the build if it leaks.
 */
export const PHONE_LINES = {
  masterLine: "+1 437-465-7700",
  sodDeliveryLine: "+1 437-523-7076"
} as const;
