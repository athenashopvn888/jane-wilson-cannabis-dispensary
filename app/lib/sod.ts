/**
 * JWC01 delivery (SOD) wiring. Same shared fleet delivery catalog contract as AVC01/MJ01:
 * the site asks SOD for its own store id; SOD serves the shared fleet catalog under that id.
 * storeId is JWC01. Catalog and Web Chat submit that id. A missing catalog is unavailable, not a hold screen.
 *
 * Phone lines live in ./phoneLines.ts (never imported by pages).
 *
 * INTERNAL ONLY: sodDeliveryLine is the dispatch line and must NEVER render in pages, metadata,
 * JSON-LD or the sitemap. Do not import it into any page or client component.
 * scripts/check-public-phones.mjs fails the build if it reaches public output.
 */
export const SOD = {
  storeId: "JWC01",
  apiBase: "https://milestone-1-demo.vercel.app",
  allowedOrigins: ["https://janewilsoncannabisdispensary.com", "https://www.janewilsoncannabisdispensary.com"]
} as const;
