import Image from "next/image";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import FaqBlock, { faqSchema } from "../../components/FaqBlock";
import StrainList from "./StrainList";
import { GUIDES } from "../../lib/content/guides";
import { guideFamily, type GuideHub } from "../../lib/content/guideHubs";
import { STORE } from "../../lib/store";
import styles from "../../jwc-pages.module.css";

export default function GuideHubPage({ hub }: { hub: GuideHub }) {
  const path = `/guides/${hub.slug}`;
  const url = `${STORE.origin}${path}`;
  const guides = (hub.slug === "strains-a-to-z" ? GUIDES : GUIDES.filter((g) => guideFamily(g.type) === hub.slug)).toSorted((a, b) => a.name.localeCompare(b.name));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: hub.title, description: hub.description,
        primaryImageOfPage: { "@type": "ImageObject", contentUrl: `${STORE.origin}/images/${hub.image.file}`, caption: hub.image.alt, name: hub.image.title, width: hub.image.w, height: hub.image.h },
        mainEntity: { "@type": "ItemList", numberOfItems: guides.length, itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: `${g.name} strain guide`, url: `${STORE.origin}/guides/${g.slug}` })) }
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: STORE.origin }, { "@type": "ListItem", position: 2, name: "Guides", item: `${STORE.origin}/guides` }, { "@type": "ListItem", position: 3, name: hub.label, item: url }] },
      faqSchema(hub.faqs, `${url}#faq`)
    ]
  };
  return (
    <main className={styles.main}>
      <JsonLd data={schema} />
      <Nav />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span>{hub.label}</span></nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>Strain guides</span>
            <h1>{hub.title}</h1>
            <p>{hub.intro}</p>
          </div>
          <aside className={styles.sideCard}>
            <strong>Want to know what&apos;s in?</strong>
            <span>Open our menu to see what&apos;s on the shelf today, or call us on {STORE.phone}.</span>
            <Link className={styles.callBtn} href="/#weed-tiers">See our menu</Link>
          </aside>
        </section>
        <figure className={styles.figure}><Image src={`/images/${hub.image.file}`} alt={hub.image.alt} title={hub.image.title} width={hub.image.w} height={hub.image.h} sizes="(max-width: 1100px) 100vw, 1080px" priority /><figcaption className={styles.prose}>{hub.image.title}</figcaption></figure>
        <section className={styles.section}><h2>How to use these guides</h2><ul className={styles.prose}>{hub.points.map((p) => <li key={p}>{p}</li>)}</ul></section>
        <section className={styles.section}>
          <h2>{hub.slug === "strains-a-to-z" ? "Strain guide index" : `${hub.label} guide index`}</h2>
          <StrainList guides={guides} noun={hub.slug === "strains-a-to-z" ? "strains" : `${hub.label.toLowerCase()} strains`} />
        </section>
        <section className={styles.section}><h2>Browse by type</h2><ul className={styles.chips}><li><Link href="/guides/indica">Indica</Link></li><li><Link href="/guides/sativa">Sativa</Link></li><li><Link href="/guides/hybrid">Hybrid</Link></li><li><Link href="/guides/strains-a-to-z">Strains A–Z</Link></li></ul></section>
        <FaqBlock faqs={hub.faqs} title="Questions" />
      </div>
      <Footer />
    </main>
  );
}
