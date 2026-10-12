import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import StrainList from "./_components/StrainList";
import { GUIDES } from "../lib/content/guides";
import { STORE } from "../lib/store";
import styles from "../jws-pages.module.css";

const URL_ = `${STORE.origin}/guides`;
const TITLE = "Cannabis Strain Guides | Jane Wilson Cannabis Dispensary";
const DESC = "Strain guides from Jane Wilson Cannabis Dispensary: family trees, aroma and what to look for. Indica, sativa and hybrid.";
export const metadata: Metadata = { title: { absolute: TITLE }, description: DESC, alternates: { canonical: URL_ }, openGraph: { title: TITLE, description: DESC, url: URL_, type: "website" } };

export default function GuidesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${URL_}#webpage`, url: URL_, name: "Cannabis Strain Guides", description: DESC, mainEntity: { "@type": "ItemList", numberOfItems: GUIDES.length, itemListElement: GUIDES.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: `${g.name} strain guide`, url: `${STORE.origin}/guides/${g.slug}` })) } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: STORE.origin }, { "@type": "ListItem", position: 2, name: "Guides", item: URL_ }] }
    ]
  };
  return (
    <main className={styles.main}>
      <JsonLd data={schema} />
      <Nav />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Guides</span></nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>Learn</span>
            <h1>Cannabis Strain Guides</h1>
            <p>Short guides to well-known strains: where they come from, what they smell like and what to look for. Want to know what&apos;s in today? Open our <Link href="/#weed-tiers" style={{ color: "#a7f3b6" }}>menu</Link> or call us on {STORE.phone}.</p>
          </div>
          <aside className={styles.sideCard}>
            <strong>Browse by type</strong>
            <Link className={styles.ghostBtn} href="/guides/indica">Indica strains</Link>
            <Link className={styles.ghostBtn} href="/guides/sativa">Sativa strains</Link>
            <Link className={styles.ghostBtn} href="/guides/hybrid">Hybrid strains</Link>
          </aside>
        </section>
        <section className={styles.section}>
          <h2>Popular strain guides</h2>
          <StrainList />
          <p className={styles.prose}><Link href="/guides/strains-a-to-z">Browse every published strain guide A–Z</Link></p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
