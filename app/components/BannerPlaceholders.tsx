/**
 * PLACEHOLDER_FOR_CODEX — homepage hero and carousel banner slots.
 */
import PlaceholderArt from "./PlaceholderArt";

const CAPTION = "PLACEHOLDER — Codex: replace with real storefront/banner photo";

export default function BannerPlaceholders() {
  return (
    <section className="bannerSlots" aria-label="Storefront banner placeholders">
      <PlaceholderArt src="/placeholders/banner-hero.svg" alt="Placeholder for the Jane Wilson storefront hero banner" caption={CAPTION} />
      <PlaceholderArt src="/placeholders/banner-carousel-1.svg" alt="Placeholder for the first Jane Wilson carousel banner" caption={CAPTION} />
      <PlaceholderArt src="/placeholders/banner-carousel-2.svg" alt="Placeholder for the second Jane Wilson carousel banner" caption={CAPTION} />
    </section>
  );
}
