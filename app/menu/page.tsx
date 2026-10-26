import type { Metadata } from "next";
import Link from "next/link";
import FlowerGrid from "../components/FlowerGrid";
import Footer from "../components/Footer";
import ItemGrid from "../components/ItemGrid";
import JsonLd from "../components/JsonLd";
import MenuPreviewNote from "../components/MenuPreviewNote";
import Nav from "../components/Nav";
import { cigaretteItems, flowersForTier, getMenu, nicotineVapeItems } from "../lib/inventory";
import { SHOW_CIGARETTES } from "../lib/siteConfig";
import { STORE, TIERS } from "../lib/store";
import styles from "../jwc-pages.module.css";

export const revalidate = 300;

const URL_ = `${STORE.origin}/menu`;
const TITLE = "Menu | Jane Wilson Cannabis Dispensary | Jane Street North York";
const DESCRIPTION =
  "In-store menu preview for Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12, North York. Flower tiers and nicotine vapes. Adults 19+. Confirm availability at the counter.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_ },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL_, type: "website" },
};

export default async function MenuPage() {
  const menu = await getMenu();
  const vapes = nicotineVapeItems(menu.items);
  const cigarettes = SHOW_CIGARETTES ? cigaretteItems(menu.items) : [];
  const groups = TIERS.map((tier) => ({ tier, flowers: flowersForTier(menu.flowers, tier.slug) }));
  const flowerCount = groups.reduce((sum, group) => sum + group.flowers.length, 0);
  const empty = flowerCount === 0 && vapes.length === 0 && cigarettes.length === 0;
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
          numberOfItems: TIERS.length,
          itemListElement: TIERS.map((tier, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tier.name,
            url: `${STORE.origin}/${tier.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: "Menu", item: URL_ },
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
          <span>Menu</span>
        </nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>In store · Jane Street</span>
            <h1>Menu at Jane Wilson Cannabis Dispensary</h1>
            <p>
              Flower lanes and nicotine vapes for the Unit 12 counter at {STORE.street}. This page is a preview. Confirm the jar, the device, and the price at the counter. Adults 19+ with photo ID.
            </p>
          </div>
          <aside className={styles.sideCard}>
            <strong>{STORE.hoursLabel}</strong>
            <a className={styles.callBtn} href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
            <Link className={styles.ghostBtn} href="/weed-dispensary-jane-street">Jane Street weed dispensary</Link>
            <Link className={styles.ghostBtn} href="/visit">Plan your visit</Link>
          </aside>
        </section>
        <MenuPreviewNote />
        {empty ? (
          <div className={styles.notice} role="status">
            <strong>The online menu is updating.</strong> Drop by {STORE.street} or call {STORE.phone}. We&apos;re open {STORE.hoursLabel}, and each flower tier is linked below.
          </div>
        ) : null}
        {groups.map(({ tier, flowers }) => (
          <section className={styles.section} key={tier.slug} id={tier.slug}>
            <h2>
              <Link href={`/${tier.slug}`}>{tier.name}</Link>
            </h2>
            {flowers.length > 0 ? (
              <FlowerGrid flowers={flowers} />
            ) : (
              <p className={styles.prose}>
                Nothing is listed in {tier.name} right now. Confirm that lane at the Jane Wilson counter, or open the <Link href={`/${tier.slug}`}>{tier.name} page</Link>.
              </p>
            )}
          </section>
        ))}
        <section className={styles.section}>
          <h2>
            <Link href="/nicotine-vapes-jane-street">Nicotine vapes</Link>
          </h2>
          {vapes.length > 0 ? (
            <ItemGrid items={vapes} />
          ) : (
            <p className={styles.prose}>No nicotine vapes are listed right now. Confirm devices at the counter. Adults 19+. Nicotine is addictive.</p>
          )}
        </section>
        {SHOW_CIGARETTES ? (
          <section className={styles.section}>
            <h2>
              <Link href="/native-cigarettes-jane-street">Native cigarettes</Link>
            </h2>
            {cigarettes.length > 0 ? <ItemGrid items={cigarettes} /> : <p className={styles.prose}>No cigarettes are listed online right now. Ask at the shop. Adults 19+.</p>}
          </section>
        ) : null}
        <p className={styles.prose}>
          <Link href="/guides">Cannabis strain guides</Link>
          {" · "}
          <Link href="/resources">Jane Street resources</Link>
          {" · "}
          <Link href="/dispensary-near-me">Dispensary near me</Link>
        </p>
      </div>
      <Footer />
    </main>
  );
}
