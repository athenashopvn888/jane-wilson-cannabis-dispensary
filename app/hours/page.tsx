import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./seo.module.css";

const ORIGIN = "https://janewilsoncannabisdispensary.com";
const PAGE_URL = `${ORIGIN}/hours`;
const TITLE = "Jane Wilson Cannabis Dispensary Hours | Daily 10:00 AM – 12:00 AM at 2111 Jane St, Unit 12";
const DESCRIPTION = "Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12, North York, ON M3M 1A2: daily 10:00 am – 12:00 am. Day-by-day hours, phone +1 (437) 465-7700 and visit links. Adults 19+ with photo ID.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const FAQS = [
  { q: "What are Jane Wilson Cannabis Dispensary's hours?", a: "Daily 10:00 AM – 12:00 AM. Day-by-day hours are listed on this page." },
  { q: "Where is Jane Wilson Cannabis Dispensary?", a: "2111 Jane St, Unit 12, North York, ON M3M 1A2. Call +1 (437) 465-7700." },
  { q: "Who can shop here?", a: "Adults 19+ with valid government-issued photo ID." },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Store",
      "@id": "https://janewilsoncannabisdispensary.com/#store",
      name: "Jane Wilson Cannabis Dispensary",
      url: ORIGIN,
      telephone: "+14374657700",
      address: { "@type": "PostalAddress", streetAddress: "2111 Jane St, Unit 12", addressLocality: "North York", addressRegion: "ON", postalCode: "M3M 1A2", addressCountry: "CA" },
      openingHoursSpecification: [{"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "10:00", "closes": "00:00"}],
    },
    { "@type": "WebPage", "@id": `${PAGE_URL}#webpage`, url: PAGE_URL, name: TITLE, description: DESCRIPTION, about: { "@id": "https://janewilsoncannabisdispensary.com/#store" } },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: ORIGIN },
        { "@type": "ListItem", position: 2, name: "Store Hours", item: PAGE_URL },
      ],
    },
    { "@type": "FAQPage", "@id": `${PAGE_URL}#faq`, mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function HoursPage() {
  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Store Hours</span></nav>
        <p className={styles.kicker}>Store hours · Adults 19+</p>
        <h1 className={styles.title}>Jane Wilson Cannabis Dispensary Hours</h1>
        <p className={styles.lead}>Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12 in North York is daily 10:00 AM – 12:00 AM. These are the same hours published in this site&apos;s store details. Adults 19+ with government-issued photo ID.</p>
        <div className={styles.card}>
          <p><strong>Jane Wilson Cannabis Dispensary</strong></p>
          <p>2111 Jane St, Unit 12, North York, ON M3M 1A2</p>
          <p>Phone: <a href="tel:+14374657700">+1 (437) 465-7700</a></p>
          <p>Daily 10:00 AM – 12:00 AM</p>
          <p><a href="https://www.google.com/maps/search/?api=1&query=2111+Jane+St%2C+Unit+12%2C+North+York%2C+ON+M3M+1A2" target="_blank" rel="noreferrer">Open in Google Maps</a></p>
        </div>
        <section className={styles.section}>
          <h2>Weekly hours</h2>
          <div className={styles.weekRow}><span>Monday</span><strong>10:00 AM – 12:00 AM</strong></div>
          <div className={styles.weekRow}><span>Tuesday</span><strong>10:00 AM – 12:00 AM</strong></div>
          <div className={styles.weekRow}><span>Wednesday</span><strong>10:00 AM – 12:00 AM</strong></div>
          <div className={styles.weekRow}><span>Thursday</span><strong>10:00 AM – 12:00 AM</strong></div>
          <div className={styles.weekRow}><span>Friday</span><strong>10:00 AM – 12:00 AM</strong></div>
          <div className={styles.weekRow}><span>Saturday</span><strong>10:00 AM – 12:00 AM</strong></div>
          <div className={styles.weekRow}><span>Sunday</span><strong>10:00 AM – 12:00 AM</strong></div>
        </section>
        <section className={styles.section}>
          <h2>Plan your visit</h2>
          <div className={styles.ctaRow}>
            <a href="tel:+14374657700" className={`${styles.cta} ${styles.ctaPrimary}`}>Call +1 (437) 465-7700</a>
            <Link href="/" className={styles.cta}>Store menu</Link>
            <Link href="/visit" className={styles.cta}>Visit &amp; directions</Link>
          </div>
          <p className={styles.note}>Adults 19+. Government-issued photo ID required.</p>
        </section>
        <section className={styles.section}>
          <h2>Hours FAQs</h2>
          {FAQS.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      </div>
      <Footer />
    </main>
  );
}
