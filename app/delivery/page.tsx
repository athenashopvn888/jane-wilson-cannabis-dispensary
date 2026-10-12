import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import FaqBlock, { faqSchema } from "../components/FaqBlock";
import PriceNotice from "../components/PriceNotice";
import DeliveryCatalog from "../components/DeliveryCatalog";
import { getDeliveryCatalog } from "../lib/delivery";
import { deliveryTierStats, tierRangeText } from "../lib/deliveryStats";
import { sortProducts, type DeliveryProduct } from "../lib/pricing";
import { PRICE_RULE_FAQ, STORE_PRICE_ON_DELIVERY_FAQ } from "../lib/content/faqs";
import { STORE } from "../lib/store";
import styles from "../jws-pages.module.css";
import "./delivery.css";

export const revalidate = 300;

const PATH = "/delivery";
const URL_ = `${STORE.origin}${PATH}`;
const TITLE = "Cannabis Delivery Menu in North York | Jane Wilson Cannabis Dispensary";
const DESC = "Cannabis delivery menu from Jane Wilson Cannabis Dispensary in North York. Bulk delivery pricing from 7g, separate from in-store prices. Adults 19+, ID checked at the door.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: URL_ },
  openGraph: { title: TITLE, description: DESC, url: URL_, type: "website" }
};

const FAQS = [
  { q: "Where does delivery start?", a: "Delivery uses bulk pricing, starting at 7 grams, with a minimum order. We confirm the total when you order." },
  { q: "How do I order?", a: `Browse the delivery menu, then call us on ${STORE.phone}. We confirm stock, address coverage and the total.` },
  { q: "Do I need ID?", a: "Yes. Photo ID showing you are 19+ is checked at the door." },
  { q: PRICE_RULE_FAQ.q, a: PRICE_RULE_FAQ.a },
  { q: STORE_PRICE_ON_DELIVERY_FAQ.q, a: STORE_PRICE_ON_DELIVERY_FAQ.a }
];

export default async function DeliveryPage() {
  const d = await getDeliveryCatalog();
  const products: DeliveryProduct[] = d.state === "live" ? d.products : [];
  const tierLines = deliveryTierStats(products)
    .map(({ tier, stats }) => ({ tier, line: tierRangeText(stats) }))
    .filter((x): x is { tier: string; line: string } => Boolean(x.line));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${URL_}#webpage`,
        url: URL_,
        name: "Cannabis Delivery Menu in North York",
        description: DESC,
        about: { "@id": `${STORE.origin}/#store` },
        isPartOf: { "@id": `${STORE.origin}/#website` },
        ...(products.length
          ? { mainEntity: { "@type": "ItemList", numberOfItems: products.length, itemListElement: sortProducts(products).map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name })) } }
          : {})
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: STORE.origin }, { "@type": "ListItem", position: 2, name: "Delivery", item: URL_ }] },
      faqSchema(FAQS, `${URL_}#faq`)
    ]
  };

  return (
    <main className={styles.main}>
      <JsonLd data={schema} />
      <Nav />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Delivery</span></nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>Jane St · North York · 19+</span>
            <h1>Cannabis Delivery from Jane Wilson</h1>
            <p>Delivery has its own menu with bulk pricing, starting at 7 grams. Browse it below, then call us to order. Adults 19+, photo ID checked at the door.</p>
            <p>Want a small amount, or want it right now? Our store at {STORE.street} is the fastest way, with in-store deals like Buy 2g Get 1g FREE.</p>
          </div>
          <aside className={styles.sideCard} aria-label="Order by phone">
            <strong>Order by phone</strong>
            <span>{STORE.hoursLabel}</span>
            <a className={styles.callBtn} href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
            <Link className={styles.ghostBtn} href="/faq#delivery-price-rule">Why delivery prices differ</Link>
          </aside>
        </section>

        <ol className={styles.steps} aria-label="How delivery works">
          <li>Look through the delivery menu.</li>
          <li>Call us on {STORE.phone}.</li>
          <li>We confirm stock, address coverage and the total.</li>
          <li>Show photo ID at the door.</li>
        </ol>

        {d.state === "soon" && <div className={styles.notice} role="status"><strong>Delivery menu coming soon.</strong> The online delivery menu for this store is not connected yet, so there is no delivery menu to show. Visit the <Link href="/#weed-tiers">store menu</Link> or call {STORE.phone}.</div>}
        {d.state === "unavailable" && <div className={styles.notice} role="status"><strong>Delivery menu temporarily unavailable.</strong> Please check back shortly or call the store.</div>}

        {d.state === "live" && (
          <>
            <PriceNotice scope="delivery" />
            {tierLines.length > 0 && (
              <section className={`${styles.section} ${styles.band}`} aria-label="Delivery price per gram by tier">
                <h2>Delivery prices per gram</h2>
                <ul className={styles.ranges}>{tierLines.map((x) => <li key={x.tier}><strong>{x.tier}</strong><br />{x.line}</li>)}</ul>
              </section>
            )}
            <DeliveryCatalog products={products} />
            <section className={`${styles.section} ${styles.loyalty}`} aria-labelledby="loyalty-title">
              <h2 id="loyalty-title">Member Loyalty Savings</h2>
              <p>Qualify with an eligible regular-price 28g purchase in BC Premium, Crafts, or Exotics, or with a selected 2 × 28g tier offer. Rewards and coupons apply to a later order—not the qualifying purchase.</p>
              <ol>
                <li><strong>Qualify</strong><span>Purchase an eligible regular-price ounce or selected two-ounce tier offer.</span></li>
                <li><strong>Return</strong><span>On your next visit, save $30 on an eligible regular-price 28g item in the selected tier.</span></li>
                <li><strong>Use your coupon later</strong><span>A 3g Craft coupon earned with a qualifying $120+ purchase is redeemed on your next order.</span></li>
                <li><strong>Keep access active</strong><span>Make a $50+ purchase within 14 days, or requalify with an eligible full-price purchase.</span></li>
              </ol>
              <aside><strong>Important conditions</strong><p>Complimentary items apply only to regular-price Craft or Exotic ounces—not BC Premium. Loyalty prices are firm and cannot be reduced with points. Loyalty-price orders do not include extra complimentary items. The dispatcher confirms current eligibility and any included item before checkout.</p></aside>
            </section>
          </>
        )}

        <FaqBlock faqs={FAQS} title="Delivery questions" />
        <p className={styles.prose}>More answers on the <Link href="/faq">FAQ page</Link>. Learn about strains in our <Link href="/guides">strain guides</Link>.</p>
      </div>
      <Footer />
    </main>
  );
}
