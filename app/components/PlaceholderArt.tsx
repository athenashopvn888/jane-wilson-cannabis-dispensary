/**
 * PLACEHOLDER_FOR_CODEX
 * Creative slots for later photo fill-in. The SVG itself carries the visible placeholder label.
 */
export default function PlaceholderArt({
  src,
  alt,
  caption
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="placeholderSlot">
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
