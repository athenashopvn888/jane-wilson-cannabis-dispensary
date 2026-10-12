import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import FaqBlock, { faqSchema } from "../../components/FaqBlock";
import { GUIDES } from "../../lib/content/guides";
import { STRAIN_COPY, firstSentence } from "../../lib/content/strainCopy";
import { STORE } from "../../lib/store";
import styles from "../../jws-pages.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));
const guide = (slug: string) => GUIDES.find((g) => g.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = guide((await params).slug);
  if (!g) return {};
  const c = STRAIN_COPY[g.slug];
  return {
    title: { absolute: `${g.name} Strain Guide | Jane Wilson Cannabis Dispensary` },
    description: `${firstSentence(c.intro)} Aroma, family tree and what to look for, from Jane Wilson Cannabis Dispensary in North York.`,
    alternates: { canonical: `${STORE.origin}/guides/${g.slug}` }
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = guide((await params).slug);
  if (!g) notFound();
  const c = STRAIN_COPY[g.slug];
  const url = `${STORE.origin}/guides/${g.slug}`;
  const faqs = [
    { q: `What is ${g.name}?`, a: `${g.name} is a ${g.type} cannabis strain, ${g.lineage}. It's known for ${g.aroma}.` },
    c.faq,
    { q: `Do you have ${g.name} today?`, a: `Our selection changes through the day. Open our menu to see what's in, or call us on ${STORE.phone} and we'll check the shelf.` }
  ];
  const related = c.compare.map((s) => guide(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: `${g.name} Strain Guide`, description: firstSentence(c.intro) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: STORE.origin }, { "@type": "ListItem", position: 2, name: "Guides", item: `${STORE.origin}/guides` }, { "@type": "ListItem", position: 3, name: g.name, item: url }] },
      faqSchema(faqs, `${url}#faq`)
    ]
  };
  return (
    <main className={styles.main}>
      <JsonLd data={schema} />
      <Nav />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span>{g.name}</span></nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>Strain guide · {g.type}</span>
            <h1>{g.name} in North York</h1>
            <p>{c.intro}</p>
          </div>
          <aside className={styles.sideCard}>
            <strong>Quick facts</strong>
            <span>Type: {g.type}</span><span>Aroma: {g.aroma}</span><span>Family tree: {g.lineage}</span>
          </aside>
        </section>
        <section className={styles.section}><h2>About {g.name}</h2><p>{c.about}</p></section>
        <section className={styles.section}><h2>What to look for</h2><p>{c.tip}</p></section>
        <section className={`${styles.section} ${styles.band}`}>
          <h2>Find it at our shop</h2>
          <p>We&apos;re at {STORE.street}, open {STORE.hoursLabel}. Want it brought to you? Start on our <Link href="/delivery">delivery page</Link>.</p>
          <p><Link className={styles.callBtn} href="/#weed-tiers">See our menu</Link> <a className={styles.ghostBtn} href={`tel:${STORE.phoneHref}`}>Call us</a></p>
        </section>
        {related.length > 0 && <section className={styles.section}><h2>If you like {g.name}</h2><ul className={styles.chips}>{related.map((r) => <li key={r.slug}><Link href={`/guides/${r.slug}`}>{r.name}</Link></li>)}</ul></section>}
        <FaqBlock faqs={faqs} title="Questions" />
      </div>
      <Footer />
    </main>
  );
}
