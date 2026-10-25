import Link from "next/link";
import { GUIDES, type Guide } from "../../lib/content/guides";
import { STRAIN_COPY, firstSentence } from "../../lib/content/strainCopy";
import styles from "../../jwc-pages.module.css";

/** Most-asked-for names first (same order as AVC01). Anything not in GUIDES is ignored. */
export const POPULAR_STRAINS = ["gelato", "purple-punch", "pink-kush", "og-kush", "granddaddy-purple", "sour-diesel", "northern-lights", "jack-herer", "blue-dream", "wedding-cake", "girl-scout-cookies", "zkittlez", "runtz", "gorilla-glue-4", "pineapple-express"];
const LIMIT = 15;

const Tile = ({ g }: { g: Guide }) => (
  <Link className={styles.tile} href={`/guides/${g.slug}`}><span>{g.type}</span><h3>{g.name}</h3><p>{firstSentence(STRAIN_COPY[g.slug].intro)}</p></Link>
);

export default function StrainList({ guides = GUIDES, noun = "strains" }: { guides?: Guide[]; noun?: string }) {
  const popular = POPULAR_STRAINS.map((slug) => guides.find((g) => g.slug === slug)).filter((g): g is Guide => Boolean(g)).slice(0, LIMIT);
  const shown = new Set(popular.map((g) => g.slug));
  const rest = guides.filter((g) => !shown.has(g.slug)).toSorted((a, b) => a.name.localeCompare(b.name));
  if (guides.length <= LIMIT || rest.length === 0 || popular.length === 0) return <div className={styles.tiles}>{guides.map((g) => <Tile key={g.slug} g={g} />)}</div>;
  return (
    <>
      <div className={styles.tiles}>{popular.map((g) => <Tile key={g.slug} g={g} />)}</div>
      <details className={styles.more}>
        <summary>Show all {guides.length} {noun}</summary>
        <div className={styles.tiles}>{rest.map((g) => <Tile key={g.slug} g={g} />)}</div>
      </details>
    </>
  );
}
