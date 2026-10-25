import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import Nav from "../../components/Nav";
import { RESOURCE_ARTICLES, resourceBySlug, type TextPart } from "../../lib/content/resources";
import { STORE } from "../../lib/store";
import styles from "../../jwc-pages.module.css";

export function generateStaticParams() {
  return RESOURCE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = resourceBySlug(slug);
  if (!article) return {};
  const url = `${STORE.origin}/resources/${article.slug}`;
  return {
    title: { absolute: article.seoTitle },
    description: article.description,
    alternates: { canonical: url },
    openGraph: { title: article.seoTitle, description: article.description, url, type: "article" },
  };
}

function Parts({ parts }: { parts: TextPart[] }) {
  return (
    <p className={styles.prose}>
      {parts.map((part, index) =>
        part.kind === "link" ? (
          <Link href={part.href} key={`${part.href}-${index}`}>
            {part.label}
          </Link>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </p>
  );
}

export default async function ResourceArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = resourceBySlug(slug);
  if (!article) notFound();
  const url = `${STORE.origin}/resources/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: STORE.name, url: STORE.origin },
        publisher: { "@type": "Organization", name: STORE.name, url: STORE.origin },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${STORE.origin}/resources` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({
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
          <Link href="/resources">Resources</Link>
          <span>/</span>
          <span>{article.title}</span>
        </nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>{article.eyebrow}</span>
            <h1>{article.title}</h1>
            <p>{article.intro}</p>
          </div>
          <aside className={styles.sideCard}>
            <strong>{STORE.street}</strong>
            <span>{STORE.locality}</span>
            <span>Hours: {STORE.hoursLabel}</span>
            <a className={styles.callBtn} href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
            <Link className={styles.ghostBtn} href="/visit">Plan the visit</Link>
          </aside>
        </section>
        {article.sections.map((section) => (
          <section className={styles.section} key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <Parts key={`${section.heading}-${index}`} parts={paragraph} />
            ))}
          </section>
        ))}
        <section className={styles.faqs}>
          <h2>Questions</h2>
          {article.faqs.map((faq) => (
            <details className={styles.faqItem} key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>
        <p className={styles.prose}>
          <Link href="/resources">All Jane Street resources</Link>
          {" · "}
          <Link href="/guides">Cannabis strain guides</Link>
          {" · "}
          <Link href="/weed-dispensary-jane-street">Jane Street weed dispensary</Link>
        </p>
      </div>
      <Footer />
    </main>
  );
}
