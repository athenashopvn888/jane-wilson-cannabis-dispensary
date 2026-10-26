import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import Nav from "../components/Nav";
import { STORE, storeSchema } from "../lib/store";

export const metadata: Metadata = {
  title: "Visit Jane Wilson Cannabis | Jane St Unit 12",
  description: "Plan a visit to Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12. Directions, TTC, parking and daily hours (10 AM to midnight).",
  alternates: { canonical: "/visit" },
  openGraph: { title: "Visit Jane Wilson Cannabis Dispensary", url: "/visit" }
};

const faqs = [
  {
    question: "What is the exact Jane Wilson Cannabis address?",
    answer: `Jane Wilson Cannabis Dispensary is at ${STORE.address}. Look for Unit 12 at 2111 Jane Street.`
  },
  {
    question: "Which TTC routes serve Jane Street near Wilson Avenue?",
    answer: "The 35 Jane and 935 Jane Express serve the Jane Street corridor and stop at Wilson Avenue. Routes and service can change, so check the TTC trip planner before leaving."
  },
  {
    question: "Is parking guaranteed at the store?",
    answer: "There's no dedicated lot, so check the posted signs near the storefront before you park."
  },
  {
    question: "What are today’s opening hours?",
    answer: `${STORE.name} is open ${STORE.hoursLabel}. Looking for one strain? Call ${STORE.phone} first.`
  },
  {
    question: "Do I need identification?",
    answer: "Yes. You must be 19+, and we ID anyone who looks under 25, so bring government-issued photo ID."
  }
];

export default function VisitPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      storeSchema(),
      {
        "@type": "WebPage",
        "@id": `${STORE.origin}/visit#webpage`,
        url: `${STORE.origin}/visit`,
        name: "Visit Jane Wilson Cannabis Dispensary",
        about: { "@id": `${STORE.origin}/#store` },
        breadcrumb: { "@id": `${STORE.origin}/visit#breadcrumbs` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${STORE.origin}/visit#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: "Visit", item: `${STORE.origin}/visit` }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${STORE.origin}/visit#faq`,
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } }))
      }
    ]
  };

  return (
    <main>
      <Nav />
      <section className="visitHero">
        <div className="visitHeroCopy">
          <p className="eyebrow">DIRECTIONS · JANE &amp; WILSON</p>
          <h1>How to find Jane Wilson Cannabis Dispensary</h1>
          <p>We&apos;re at 2111 Jane St, Unit 12, on Jane Street just by Wilson Avenue in North York. Here&apos;s how to get here by TTC or car.</p>
          <div className="heroActions"><a href={STORE.maps}>Open Google Maps</a><a className="ghost" href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a></div>
          <div className="visitHeroFacts"><span><b>{STORE.street}</b>{STORE.locality}</span><span><b>Open daily</b>10:00 AM–midnight</span></div>
        </div>
        <div className="visitVisual">
          <Image src="/brand/side-window-combined.png" fill sizes="(max-width: 1150px) 100vw, 48vw" priority alt="Jane Wilson green and purple storefront brand artwork" />
          <div className="visitVisualBadge"><span>JANE × WILSON</span><strong>Unit 12</strong><small>2111 Jane Street</small></div>
        </div>
      </section>

      <section className="arrivalGrid">
        <article><span>01</span><h2>Address</h2><p><strong>{STORE.street}</strong><br />{STORE.locality}<br />Canada</p><a href={STORE.maps}>Get directions on Google Maps →</a></article>
        <article><span>02</span><h2>By TTC</h2><p>There&apos;s a TTC stop at Jane and Wilson, about 200 metres from the door. Check live service on the TTC site before you leave.</p></article>
        <article><span>03</span><h2>Find the door</h2><p>Look for Unit 12 and our purple-and-green window art.</p><a href={`tel:${STORE.phoneHref}`}>Can&apos;t find us? Give us a call →</a></article>
        <article><span>04</span><h2>Hours</h2><p><strong>{STORE.hoursLabel}.</strong> Coming for one strain? Call first and we&apos;ll check.</p><a href={`tel:${STORE.phoneHref}`}>{STORE.phone} →</a></article>
      </section>

      <section className="parkingNote">
        <div><p className="eyebrow">ARRIVING BY CAR</p><h2>Driving in</h2></div>
        <p>We don&apos;t have a dedicated lot, so check the posted signs near the storefront before you park.</p>
      </section>

      <section className="corridorBand"><div><p className="eyebrow">JANE–WILSON · DOWNSVIEW</p><h2>More about the shop</h2><p>Read about the neighbourhood, our five flower tiers and what to expect when you come in.</p><Link href="/weed-dispensary-jane-street">Open the Jane Street store guide →</Link></div><Image src="/brand/front-right-papers.png" width={1000} height={1000} alt="Jane Wilson purple rolling papers storefront artwork" /></section>

      <section className="faq"><p className="eyebrow">VISIT FAQ</p><h2>Before you head to Jane Street</h2>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
      <Footer />
      <JsonLd data={schema} />
    </main>
  );
}
