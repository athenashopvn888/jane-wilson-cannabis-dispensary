import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import Nav from "../components/Nav";
import { RESOURCE_ARTICLES } from "../lib/content/resources";
import { STORE } from "../lib/store";
import styles from "../jws-pages.module.css";

const URL_ = `${STORE.origin}/resources`;
const TITLE = "Resources | Jane Wilson Cannabis Dispensary | Jane Street North York";
const DESCRIPTION =
  "Local guides for Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12: flower tiers, indica sativa and hybrid labels, and visiting Jane Street at Wilson. Adults 19+.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_ },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL_, type: "website" },
};

export default function ResourcesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${URL_}#webpage`,
        url: URL_,
        name: TITLE,
        description: DESCRIPTION,
        about: { "@id": `${STORE.origin}/#store` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: RESOURCE_ARTICLES.length,
          itemListElement: RESOURCE_ARTICLES.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: article.title,
            url: `${STORE.origin}/resources/${article.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: "Resources", item: URL_ },
        ],
      },
    ],
  };

  return (
    <main className={styles.main}>
      <JsonLd data={schema} />
      <Nav />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Resources</span>
        </nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>Jane Street · North York</span>
            <h1>Resources for the Jane and Wilson counter</h1>
            <p>
              Short local reading before you visit Unit 12. These articles explain the flower lanes, the indica, sativa, and hybrid labels, and how to reach 2111 Jane Street. They do not claim what is on the shelf today.
            </p>
          </div>
          <aside className={styles.sideCard}>
            <strong>Shop and visit</strong>
            <Link className={styles.ghostBtn} href="/menu">In-store menu</Link>
            <Link className={styles.ghostBtn} href="/weed-dispensary-jane-street">Jane Street weed dispensary</Link>
            <Link className={styles.ghostBtn} href="/guides">Cannabis strain guides</Link>
          </aside>
        </section>
        <section className={styles.section}>
          <h2>Local articles</h2>
          <div className={styles.tiles}>
            {RESOURCE_ARTICLES.map((article) => (
              <Link className={styles.tile} href={`/resources/${article.slug}`} key={article.slug}>
                <span>{article.eyebrow}</span>
                <h3>{article.title}</h3>
                <p>{article.intro}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <h2>Flower lanes</h2>
          <ul className={styles.chips}>
            <li><Link href="/exotic-weed">Exotic Weed</Link></li>
            <li><Link href="/premium-weed">Premium Weed</Link></li>
            <li><Link href="/aaa-weed">AAA+ Weed</Link></li>
            <li><Link href="/aa-weed">AA Weed</Link></li>
            <li><Link href="/budget-weed">Budget Weed</Link></li>
            <li><Link href="/dispensary-near-me">Dispensary near me</Link></li>
          </ul>
        </section>
      </div>
      <Footer />
    </main>
  );
}
