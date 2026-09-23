import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import Nav from "../components/Nav";
import { STORE, TIERS } from "../lib/store";

export const metadata: Metadata = {
  title: "Weed Dispensary Jane Street at Wilson | North York",
  description: "Jane Wilson Cannabis Dispensary is the Jane Street storefront at 2111 Jane St, Unit 12 near Wilson Avenue and Downsview. Explore five Weed tiers and plan your visit.",
  alternates: { canonical: "/weed-dispensary-jane-street" },
  openGraph: { title: "Jane Street Weed Dispensary at Wilson Avenue", url: "/weed-dispensary-jane-street" }
};

const faqs = [
  {
    question: "Is Jane Wilson Cannabis on Jane Street?",
    answer: `Yes. ${STORE.name} is at ${STORE.address}, near the Jane Street and Wilson Avenue corridor.`
  },
  {
    question: "Is this the Jane Street store for the Downsview area?",
    answer: "This is the single Jane Wilson Cannabis storefront at 2111 Jane Street. The page is written for the Jane–Wilson and nearby Downsview corridor, not for every part of Toronto."
  },
  {
    question: "What Weed tiers does the store organize?",
    answer: "The five tier names are Exotic Weed, Premium Weed, AAA+ Weed, AA Weed, and Budget Weed. Call the store for today’s exact products, weights, and prices."
  },
  {
    question: "How do I get to Unit 12?",
    answer: "Use the supplied Google Maps pin or the visit page. The 35 Jane and 935 Jane Express serve the Jane Street corridor, including Wilson Avenue."
  },
  {
    question: "Is the store open now?",
    answer: `This website does not yet have verified operating hours. Call ${STORE.phone} to confirm today’s hours before travelling.`
  }
];

export default function JaneStreetPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${STORE.origin}/weed-dispensary-jane-street#webpage`,
        url: `${STORE.origin}/weed-dispensary-jane-street`,
        name: "Weed Dispensary on Jane Street at Wilson Avenue",
        about: { "@id": `${STORE.origin}/#store` },
        mainEntity: { "@id": `${STORE.origin}/weed-dispensary-jane-street#tiers` }
      },
      {
        "@type": "ItemList",
        "@id": `${STORE.origin}/weed-dispensary-jane-street#tiers`,
        name: "Jane Wilson Weed tiers",
        numberOfItems: TIERS.length,
        itemListElement: TIERS.map((tier, index) => ({ "@type": "ListItem", position: index + 1, name: tier.name, url: `${STORE.origin}/${tier.slug}` }))
      },
      {
        "@type": "FAQPage",
        "@id": `${STORE.origin}/weed-dispensary-jane-street#faq`,
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: "Jane Street Weed Dispensary", item: `${STORE.origin}/weed-dispensary-jane-street` }
        ]
      }
    ]
  };

  return (
    <main>
      <Nav />
      <section className="corridorHero">
        <div><p className="eyebrow">JANE STREET · WILSON AVENUE · DOWNSVIEW</p><h1>Weed Dispensary on Jane Street at Wilson</h1><p>{STORE.name} is the Unit 12 storefront at 2111 Jane Street in North York. This is the local owner page for the Jane–Wilson and nearby Downsview corridor.</p><div className="heroActions"><Link href="/visit">How to get here</Link><a className="ghost" href={STORE.maps}>Map the store</a></div></div>
        <Image src="/brand/front-left-grinder.png" width={1200} height={1200} priority sizes="(max-width: 900px) 86vw, 43vw" alt="Jane Wilson purple grinder artwork on a green and purple storefront design" />
      </section>

      <section className="geoNarrative">
        <div><p className="eyebrow">THE LOCAL STOREFRONT</p><h2>A focused Jane–Wilson cannabis guide</h2></div>
        <div><p>The address sits on Jane Street near Wilson Avenue, with the Jane corridor connecting the storefront to nearby Downsview. The website keeps that geographic focus instead of claiming to be a storefront in every North York neighbourhood.</p><p>Travelling by TTC? The 35 Jane and 935 Jane Express stop along Jane Street at Wilson Avenue. Driving? Use the exact map pin and obey the parking signs you find on arrival. The <Link href="/visit">visit page</Link> keeps transit, map, Unit 12, and arrival details together.</p><p>Hours have not yet been supplied by an authoritative store source. Call <a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a> before travelling; no “open now” or 24-hour claim is published here.</p></div>
      </section>

      <section className="localTierList corridorTiers">
        <p className="eyebrow">FIVE CLEAR WEED TIERS</p><h2>Compare flower tiers before your visit</h2>
        <p>Each tier page explains its place in the flower ladder and shows the standard weight-price positions. Exact dollar prices and products remain store-confirmed until the JWCD01 governed menu is connected.</p>
        <div>{TIERS.map((tier) => <Link key={tier.slug} href={`/${tier.slug}`}><span className="localTierName">{tier.name}</span><small>{tier.summary}</small><b>Explore tier →</b></Link>)}</div>
      </section>

      <section className="truthGrid">
        <article><span>ADDRESS</span><h2>{STORE.street}</h2><p>{STORE.locality}</p><a href={STORE.maps}>Open map →</a></article>
        <article><span>HOURS</span><h2>Confirm by phone</h2><p>{STORE.hoursStatus}</p><a href={`tel:${STORE.phoneHref}`}>{STORE.phone} →</a></article>
        <article><span>MENU</span><h2>Store-confirmed facts only</h2><p>No other dispensary’s inventory or pricing is shown as Jane Wilson stock.</p><Link href="/#weed-tiers">Browse tier guides →</Link></article>
      </section>

      <section className="faq"><p className="eyebrow">JANE STREET FAQ</p><h2>Jane–Wilson store questions</h2>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
      <Footer />
      <JsonLd data={schema} />
    </main>
  );
}
