/**
 * PLACEHOLDER_FOR_CODEX — cigarettes deal creative on the homepage and cigarette page.
 */
import PlaceholderArt from "./PlaceholderArt";

export default function CigsDealPlaceholder() {
  return (
    <section className="cigsDeal" aria-label="Cigarette deal creative">
      <PlaceholderArt
        src="/placeholders/cigs-deal-hero.svg"
        alt="Placeholder for the Jane Wilson cigarettes deal banner"
        caption="PLACEHOLDER — Codex: cigs deal creative"
      />
      <PlaceholderArt
        src="/placeholders/cigs-pack-shot.svg"
        alt="Placeholder for the Jane Wilson cigarette pack shot"
        caption="PLACEHOLDER — Codex: cigs deal creative"
      />
    </section>
  );
}
