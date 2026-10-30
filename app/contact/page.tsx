import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import Nav from "../components/Nav";
import { HOURS_DAYS, STORE, storeSchema } from "../lib/store";
import styles from "../jwc-pages.module.css";

const PATH = "/contact";
const TITLE = "Contact Jane Wilson Cannabis Dispensary | Jane St North York";
const DESCRIPTION = "Visit or call Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12, North York, ON M3M 1A2. Open 10:00 AM to midnight daily. Adults 19+.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" }
};

export default function ContactPage() {
  const url = `${STORE.origin}${PATH}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      storeSchema(),
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: TITLE,
        description: DESCRIPTION,
        about: { "@id": `${STORE.origin}/#store` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: "Contact", item: url }
        ]
      }
    ]
  };

  return (
    <main className={styles.main}>
      <JsonLd data={schema} />
      <Nav />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Contact</span>
        </nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>Jane and Wilson · 19+</span>
            <h1>Contact Jane Wilson Cannabis</h1>
            <p>The counter is at {STORE.address}. Call {STORE.phone} for a product check, or use the visit page for the TTC notes. Adults 19+ with photo ID.</p>
          </div>
          <aside className={styles.sideCard}>
            <strong>{STORE.street}</strong>
            <span>{STORE.locality}</span>
            <a className={styles.callBtn} href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
            <a className={styles.ghostBtn} href={STORE.maps}>Directions</a>
            <Link className={styles.ghostBtn} href="/visit">Visit notes</Link>
          </aside>
        </section>
        <section className={styles.section}>
          <h2>Hours</h2>
          <ul className={styles.ranges}>
            {HOURS_DAYS.map((day) => (
              <li key={day}>
                <span>{day}</span>
                <strong className={styles.tierFact}>{STORE.hoursLabel}</strong>
              </li>
            ))}
          </ul>
          <p className={styles.prose}>Delivery hours are shorter than the walk-in counter. Open the delivery page for that schedule. In-store prices stay at the counter.</p>
        </section>
        <section className={styles.section}>
          <h2>What to ask</h2>
          <p className={styles.prose}>Flower is listed by tier: Exotic, Premium, AAA+, AA, and Budget. Pre-rolls, THC vapes, edibles, concentrates, and accessories have their own pages when those products are on the menu. The menu changes through the day, so call before you travel for one name.</p>
          <p className={styles.prose}>
            <Link href="/faq">FAQ</Link>
            {" · "}
            <Link href="/menu">Menu</Link>
            {" · "}
            <Link href="/hours">Store hours</Link>
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
