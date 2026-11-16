import type { Metadata } from "next";

/** Existing 512×512 store logo in /public. No people. */
export const SOCIAL_IMAGE_URL = "https://janewilsoncannabisdispensary.com/jwc-icon-512.png";

const SOCIAL_IMAGE = {
  url: SOCIAL_IMAGE_URL,
  width: 512,
  height: 512,
  alt: "Jane Wilson Cannabis Dispensary",
  type: "image/png" as const
};

/**
 * Adds og:image and twitter:image when Open Graph is already set.
 * Does not change existing Open Graph title, description, or URL.
 * Sets twitter:card only when this is the first twitter block.
 */
export function withSocialImage(metadata: Metadata): Metadata {
  if (!metadata.openGraph) return metadata;
  const existing = metadata.twitter;
  const twitter =
    existing && typeof existing === "object"
      ? { ...existing, images: existing.images ?? [SOCIAL_IMAGE_URL] }
      : { card: "summary_large_image" as const, images: [SOCIAL_IMAGE_URL] };
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: metadata.openGraph.images ?? [SOCIAL_IMAGE]
    },
    twitter
  };
}
