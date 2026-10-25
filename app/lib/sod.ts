/**
 * Jane Wilson delivery wiring. Same shared fleet delivery catalog contract as AVC01/MJ01:
 * the site asks for its own store id; the service serves the shared fleet catalog under that id.
 * storeId is the id the catalog and Web Chat must submit. It is JWS01. JWC, JWC01 and JWCD01 are rejected.
 *
 * Phone lines live in ./phoneLines.ts (never imported by pages).
 *
 * INTERNAL ONLY: sodDeliveryLine is the dispatch line and must NEVER render in pages, metadata,
 * JSON-LD or the sitemap. Do not import it into any page or client component.
 * scripts/check-public-phones.mjs fails the build if it reaches public output.
 */
export const SOD = {
  storeId: "JWS01",
  apiBase: "https://milestone-1-demo.vercel.app",
  allowedOrigins: ["https://janewilsoncannabisdispensary.com", "https://www.janewilsoncannabisdispensary.com"]
} as const;
