import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import Nav from "../components/Nav";
import { SHOW_CIGARETTES } from "../lib/siteConfig";
import { AREA_LINKS } from "../lib/shopLinks";
import { STORE, TIERS } from "../lib/store";

export const metadata: Metadata = {
  title: "Weed Dispensary Jane Street at Wilson | North York",
  description: "Jane Wilson Cannabis Dispensary is the Jane Street storefront at 2111 Jane St, Unit 12 near Wilson Avenue and Downsview. Five flower tiers, nicotine vapes, open 10 AM to midnight daily.",
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
    answer: "Yes. We're a few minutes from Downsview, at 2111 Jane Street by Wilson Avenue."
  },
  {
    question: "What Weed tiers does the store organize?",
    answer: "Exotic, Premium, AAA+, AA and Budget. The menu changes, so call if you're after one strain."
  },
  {
    question: "How do I get to Unit 12?",
    answer: "Use the supplied Google Maps pin or the visit page. The 35 Jane and 935 Jane Express serve the Jane Street corridor, including Wilson Avenue."
  },
  {
    question: "Is the store open now?",
    answer: `${STORE.name} is open ${STORE.hoursLabel}. Call ${STORE.phone} to confirm a specific product before travelling.`
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
        <div><p className="eyebrow">JANE STREET · WILSON AVENUE · DOWNSVIEW</p><h1>Weed Dispensary on Jane Street at Wilson</h1><p>{STORE.name} is at Unit 12, 2111 Jane Street in North York, right by Wilson Avenue. We&apos;re the neighbourhood weed shop for Jane and Wilson, Downsview and the rest of the Jane corridor.</p><div className="heroActions"><Link href="/visit">How to get here</Link><a className="ghost" href={STORE.maps}>Map the store</a></div></div>
        <Image src="/brand/front-left-grinder.png" width={1200} height={1200} priority sizes="(max-width: 900px) 86vw, 43vw" alt="Jane Wilson purple grinder artwork on a green and purple storefront design" />
      </section>

      <section className="geoNarrative">
        <div><p className="eyebrow">THE LOCAL STOREFRONT</p><h2>On Jane Street, by Wilson</h2></div>
        <div><p>We&apos;re on Jane Street near Wilson Avenue, a short trip from Downsview. A TTC stop at Jane and Wilson is about 200 metres away. If you&apos;re driving, check the posted signs near the storefront before you park.</p><p>Hours are {STORE.hoursLabel}. Call <a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a> {SHOW_CIGARETTES ? "when a specific flower, carton, or nicotine vape is the reason for the trip." : "when a specific flower or nicotine vape is the reason for the trip."}</p><p>More for this counter: the <Link href="/dispensary-near-me">dispensary near me</Link> page, the <Link href="/menu">in-store menu</Link>, and <Link href="/resources">Jane Street resources</Link>.</p></div>
      </section>

      <section className="localTierList corridorTiers">
        <p className="eyebrow">OUR FLOWER TIERS</p><h2>Compare flower tiers before your visit</h2>
        <p>Exotic, Premium and AAA+ come in 3g, 6g, 14g and 28g. AA and Budget come in 3g, 5g, 14g and 28g. Nicotine vapes have their own page.</p>
        <div>{TIERS.map((tier) => <Link key={tier.slug} href={`/${tier.slug}`}><span className="localTierName">{tier.name}</span><small>{tier.summary}</small><b>Explore tier →</b></Link>)}</div>
      </section>

      <section className="truthGrid">
        <article><span>ADDRESS</span><h2>{STORE.street}</h2><p>{STORE.locality}</p><a href={STORE.maps}>Open map →</a></article>
        <article><span>HOURS</span><h2>{STORE.hoursLabel}</h2><p>{STORE.street}</p><a href={`tel:${STORE.phoneHref}`}>{STORE.phone} →</a></article>
        <article><span>MENU</span><h2>{SHOW_CIGARETTES ? "Flower, cigarettes, vapes" : "Flower and vapes"}</h2><p>The menu changes through the day. Call or drop in to check a strain before you make the trip.</p><Link href="/#weed-tiers">Browse flower tiers →</Link></article>
      </section>

      <section className="localTierList">
        <p className="eyebrow">NEARBY AREAS</p>
        <h2>Neighbourhoods around Jane and Wilson</h2>
        <p>These pages are visit notes for people coming from nearby parts of North York. The counter is still Unit 12.</p>
        <div>{AREA_LINKS.map((area) => <Link key={area.path} href={area.path}><span className="localTierName">{area.title}</span><small>{area.detail}</small><b>Open area page →</b></Link>)}</div>
      </section>

      <section className="faq"><p className="eyebrow">JANE STREET FAQ</p><h2>Questions about the shop</h2>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
      <Footer />
      <JsonLd data={schema} />
    </main>
  );
}
