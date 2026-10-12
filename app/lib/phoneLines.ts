/**
 * JWS01 phone lines (Tri 2026-10-13).
 * masterLine: public Master Lines number, the ONLY phone shown anywhere (STORE.phone mirrors it).
 * sodDeliveryLine: INTERNAL ONLY dispatch line. This repository is PUBLIC, so the number itself is
 * NOT stored here; it lives in the private fleet config (fleet-seo-command-center, POD11 / JWS01).
 * scripts/check-public-phones.mjs fails the build if it ever reaches public output.
 */
export const PHONE_LINES = {
  masterLine: "+1 437-465-7700",
  sodDeliveryLine: null as string | null // internal only; see private fleet config
} as const;