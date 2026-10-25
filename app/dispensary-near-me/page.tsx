import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import Nav from "../components/Nav";
import { STORE, TIERS, storeSchema } from "../lib/store";
import styles from "../jws-pages.module.css";

const URL_ = `${STORE.origin}/dispensary-near-me`;
const TITLE = "Dispensary Near Me on Jane Street | North York | Jane Wilson Cannabis";
const DESCRIPTION =
  "Jane Wilson Cannabis Dispensary is the Unit 12 counter at 2111 Jane St, North York, near Wilson Avenue and Downsview. Daily 10:00 AM to midnight. Adults 19+.";

const FAQS = [
  {
    q: "Where is the dispensary near Jane and Wilson?",
    a: "Jane Wilson Cannabis Dispensary is at 2111 Jane St, Unit 12, North York, ON M3M 1A2, on Jane Street near Wilson Avenue.",
  },
  {
    q: "Which neighbourhoods is this page for?",
    a: "This page is for the Jane–Wilson corridor, nearby Downsview, and North York shoppers looking for this Unit 12 storefront.",
  },
  {
    q: "How do I get there on the TTC?",
    a: "The 35 Jane and 935 Jane Express serve Jane Street, including stops at Wilson Avenue. Check live TTC service before you leave.",
  },
  {
    q: "What are the hours?",
    a: "Daily 10:00 AM to midnight. Call 437-465-7700 if you want to confirm a detail before you travel. Adults 19+ with photo ID.",
  },
];

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_ },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL_, type: "website" },
};

export default function DispensaryNearMePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      storeSchema(),
      {
        "@type": "WebPage",
        "@id": `${URL_}#webpage`,
        url: URL_,
        name: TITLE,
        description: DESCRIPTION,
        about: { "@id": `${STORE.origin}/#store` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: "Dispensary near me", item: URL_ },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
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
          <span>Dispensary near me</span>
        </nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>Jane Street · North York · Adults 19+</span>
            <h1>Dispensary near me on Jane Street in North York</h1>
            <p>
              If you are searching for a dispensary near Jane Street, Wilson Avenue, Downsview, or this part of North York, Jane Wilson Cannabis Dispensary is the Unit 12 counter at {STORE.street}.
            </p>
            <p>{STORE.locality}. Hours: {STORE.hoursLabel}.</p>
          </div>
          <aside className={styles.sideCard}>
            <strong>This storefront</strong>
            <span>{STORE.address}</span>
            <a className={styles.callBtn} href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
            <a className={styles.ghostBtn} href={STORE.maps}>Open Google Maps</a>
            <Link className={styles.ghostBtn} href="/visit">TTC and arrival</Link>
          </aside>
        </section>
        <section className={styles.section}>
          <h2>One Jane Street counter</h2>
          <p className={styles.prose}>
            This is not a city-wide directory. It is the local page for the <Link href="/weed-dispensary-jane-street">Jane Street weed dispensary</Link> at Unit 12. The 35 Jane and 935 Jane Express run along Jane Street and stop at Wilson Avenue. The <Link href="/hours">store hours</Link> are 10:00 AM to midnight every day.
          </p>
          <p className={styles.prose}>
            Before you leave, open the <Link href="/menu">in-store menu</Link> and the <Link href="/guides">cannabis strain guides</Link>. The menu is a preview. Confirm the jar at the counter. The <Link href="/resources">Jane Street resources</Link> explain the flower lanes and the visit.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Flower lanes at this counter</h2>
          <div className={styles.tiles}>
            {TIERS.map((tier) => (
              <Link className={styles.tile} href={`/${tier.slug}`} key={tier.slug}>
                <span>Weed tier</span>
                <h3>{tier.name}</h3>
                <p>{tier.summary}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className={styles.faqs}>
          <h2>Near Jane and Wilson</h2>
          {FAQS.map((faq) => (
            <details className={styles.faqItem} key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <Footer />
    </main>
  );
}
