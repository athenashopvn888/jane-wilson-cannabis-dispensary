import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import JsonLd from "./JsonLd";
import FaqBlock, { faqSchema } from "./FaqBlock";
import StoreActions from "./StoreActions";
import IdVerificationChat from "../delivery/IdVerificationChat";
import { deliveryHoursSchema, DELIVERY_HOURS_LABEL } from "../lib/deliveryHours";
import { STORE } from "../lib/store";
import styles from "../jwc-pages.module.css";

export type WeedDeliveryCopy = {
  path: string;
  crumb: string;
  kicker: string;
  title: string;
  description: string;
  h1: string;
  paragraphs: string[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
  areaServed: string[];
};

export default function WeedDeliveryGuide({ copy }: { copy: WeedDeliveryCopy }) {
  const url = `${STORE.origin}${copy.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: copy.h1,
        description: copy.description,
        about: { "@id": `${STORE.origin}/#store` },
        isPartOf: { "@id": `${STORE.origin}/#website` }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: copy.h1,
        serviceType: "Weed delivery",
        url,
        provider: { "@id": `${STORE.origin}/#store` },
        areaServed: copy.areaServed.map((name) => ({ "@type": "Place", name })),
        hoursAvailable: deliveryHoursSchema(),
        availableChannel: { "@type": "ServiceChannel", serviceUrl: `${STORE.origin}/delivery?liveOrder=1#live-order`, name: "LIVE ORDER Web Chat" }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: "Weed delivery", item: `${STORE.origin}/delivery` },
          { "@type": "ListItem", position: 3, name: copy.crumb, item: url }
        ]
      },
      faqSchema(copy.faqs, `${url}#faq`)
    ]
  };

  return (
    <main className={styles.main}>
      <JsonLd data={schema} />
      <Nav />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/delivery">Weed delivery</Link><span>/</span><span>{copy.crumb}</span>
        </nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>{copy.kicker}</span>
            <h1>{copy.h1}</h1>
            {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <aside className={styles.sideCard} aria-label="Delivery order and store visit">
            <strong>LIVE ORDER</strong>
            <span>Delivery hours: {DELIVERY_HOURS_LABEL}</span>
            <Link className={styles.ghostBtn} href="/delivery?liveOrder=1#live-order">Open the delivery menu</Link>
            <StoreActions />
          </aside>
        </section>
        {copy.sections.map((section) => (
          <section className={styles.section} key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p className={styles.prose} key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <section className={styles.section}>
          <h2>Related pages</h2>
          <ul className={styles.chips}>{copy.related.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
        </section>
        <FaqBlock faqs={copy.faqs} title="Delivery questions" />
      </div>
      <IdVerificationChat />
      <Footer showNicotine={false} />
    </main>
  );
}
