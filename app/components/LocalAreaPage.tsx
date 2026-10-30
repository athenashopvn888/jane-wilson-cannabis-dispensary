import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { localAreaBySlug } from "../lib/localAreas";
import { AREA_LINKS } from "../lib/shopLinks";
import { STORE, storeSchema } from "../lib/store";
import Footer from "./Footer";
import JsonLd from "./JsonLd";
import Nav from "./Nav";
import styles from "../jwc-pages.module.css";

export function areaMetadata(slug: string): Metadata {
  const area = localAreaBySlug(slug);
  if (!area) return {};
  const title = `${area.title} | Jane Wilson Cannabis Dispensary`;
  return {
    title: { absolute: title },
    description: area.description,
    alternates: { canonical: area.path },
    openGraph: { title, description: area.description, url: area.path, type: "website" }
  };
}

export default function LocalAreaPage({ slug }: { slug: string }) {
  const area = localAreaBySlug(slug);
  if (!area) notFound();
  const url = `${STORE.origin}${area.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      storeSchema(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: area.h1,
        description: area.description,
        about: { "@id": `${STORE.origin}/#store` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: area.title, item: url }
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: area.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a }
        }))
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
          <span>{area.title}</span>
        </nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>{area.kicker}</span>
            <h1>{area.h1}</h1>
            <p>{area.lead}</p>
          </div>
          <aside className={styles.sideCard}>
            <strong>{STORE.street}</strong>
            <span>{STORE.locality}</span>
            <span>{STORE.hoursLabel}</span>
            <a className={styles.callBtn} href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
            <a className={styles.ghostBtn} href={STORE.maps}>Directions</a>
            <Link className={styles.ghostBtn} href="/visit">Visit Unit 12</Link>
          </aside>
        </section>
        {area.sections.map((section) => (
          <section className={styles.section} key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p className={styles.prose} key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <section className={styles.faqs}>
          <h2>Questions from {area.title}</h2>
          {area.faqs.map((faq) => (
            <details className={styles.faqItem} key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>
        <p className={styles.prose}>
          {AREA_LINKS.map((link, index) => (
            <span key={link.path}>
              {index > 0 ? " · " : null}
              <Link href={link.path}>{link.title}</Link>
            </span>
          ))}
        </p>
      </div>
      <Footer />
    </main>
  );
}
