import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import FaqBlock, { faqSchema } from "../components/FaqBlock";
import { HOME_FAQS, PRICE_RULE_FAQ, STORE_PRICE_ON_DELIVERY_FAQ } from "../lib/content/faqs";
import { STORE } from "../lib/store";
import styles from "../jwc-pages.module.css";

const URL_ = `${STORE.origin}/faq`;
const TITLE = "FAQ | Jane Wilson Cannabis Dispensary | Jane St North York";
const DESC = "Answers about the Jane Wilson Cannabis Dispensary address, ID, flower weights, delivery and why delivery prices differ from in-store prices.";

export const metadata: Metadata = { title: { absolute: TITLE }, description: DESC, alternates: { canonical: URL_ }, openGraph: { title: TITLE, description: DESC, url: URL_, type: "website" } };

export default function FaqPage() {
  const all = [PRICE_RULE_FAQ, STORE_PRICE_ON_DELIVERY_FAQ, ...HOME_FAQS];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${URL_}#webpage`, url: URL_, name: TITLE, description: DESC, about: { "@id": `${STORE.origin}/#store` } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: STORE.origin }, { "@type": "ListItem", position: 2, name: "FAQ", item: URL_ }] },
      faqSchema(all, `${URL_}#faq`)
    ]
  };
  return (
    <main className={styles.main}>
      <JsonLd data={schema} />
      <Nav />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>FAQ</span></nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>Questions · Adults 19+</span>
            <h1>Frequently Asked Questions</h1>
            <p>Store and delivery are two separate menus. Here&apos;s how prices, ID, weights and delivery work at Jane Wilson Cannabis Dispensary.</p>
          </div>
          <aside className={styles.sideCard}>
            <strong>Still have a question?</strong>
            <a className={styles.callBtn} href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
            <Link className={styles.ghostBtn} href="/delivery">Delivery menu</Link>
          </aside>
        </section>
        <FaqBlock faqs={[PRICE_RULE_FAQ, STORE_PRICE_ON_DELIVERY_FAQ]} title="Store and delivery prices" />
        <FaqBlock faqs={HOME_FAQS} title="Store and delivery questions" />
      </div>
      <Footer />
    </main>
  );
}
