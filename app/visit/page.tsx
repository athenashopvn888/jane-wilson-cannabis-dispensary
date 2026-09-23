import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import Nav from "../components/Nav";
import { STORE, storeSchema } from "../lib/store";

export const metadata: Metadata = {
  title: "Visit Jane Wilson Cannabis | Jane St Unit 12",
  description: "Plan a visit to Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12. Find the map, phone number, TTC Jane corridor notes, and arrival guidance.",
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
    answer: "This website does not claim a dedicated or guaranteed parking space. Check the immediate storefront area and obey all posted parking signs when you arrive."
  },
  {
    question: "What are today’s opening hours?",
    answer: `Verified public hours are not yet available on this website. Call ${STORE.phone} before travelling.`
  },
  {
    question: "Do I need identification?",
    answer: "Yes. Cannabis retail is for adults 19+. Bring valid government-issued photo identification."
  }
];

export default function VisitPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      storeSchema(`${STORE.origin}/visit`),
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
        <div><p className="eyebrow">HOW TO REACH UNIT 12</p><h1>Visit Jane Wilson Cannabis on Jane Street</h1><p>Use this guide for the exact storefront address, map, TTC corridor notes, and the last step to Unit 12 near Jane Street and Wilson Avenue.</p><div className="heroActions"><a href={STORE.maps}>Open Google Maps</a><a className="ghost" href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a></div></div>
        <div className="visitDoor"><Image src="/brand/door-upper.svg" width={600} height={700} alt="Jane Wilson Cannabis Dispensary upper door artwork" /><Image src="/brand/door-lower.svg" width={600} height={700} alt="Jane Wilson green and purple lower door artwork" /></div>
      </section>

      <section className="arrivalGrid">
        <article><span>01</span><h2>Pin the exact address</h2><p><strong>{STORE.street}</strong><br />{STORE.locality}<br />Canada</p><a href={STORE.maps}>Open the supplied Google Maps pin →</a></article>
        <article><span>02</span><h2>Travel the Jane corridor</h2><p>The 35 Jane and 935 Jane Express serve Jane Street and include stops at Wilson Avenue. Check live TTC service and choose the direction that fits your trip.</p><a href="https://www.ttc.ca/routes-and-schedules/35/0/4738">Check the 35 Jane route on TTC →</a></article>
        <article><span>03</span><h2>Find Unit 12</h2><p>Use the storefront number and Jane Wilson purple-and-green window graphics to identify the correct unit. This is one physical Jane Street storefront.</p><a href={`tel:${STORE.phoneHref}`}>Call if you need a landmark check →</a></article>
        <article><span>04</span><h2>Confirm before travelling</h2><p><strong>Hours:</strong> {STORE.hoursStatus}. Current inventory and prices also require confirmation from this store.</p><a href={`tel:${STORE.phoneHref}`}>{STORE.phone} →</a></article>
      </section>

      <section className="parkingNote">
        <div><p className="eyebrow">ARRIVING BY CAR</p><h2>Check signs when you arrive</h2></div>
        <p>The site does not promise a dedicated parking lot or a guaranteed space. Use the map pin, inspect the immediate storefront area, and follow all posted curb, private-lot, and time-limit signs.</p>
      </section>

      <section className="corridorBand"><div><p className="eyebrow">JANE–WILSON · DOWNSVIEW</p><h2>One storefront, one local owner page</h2><p>The Jane Street corridor page explains the physical location and its five Weed tiers without presenting a second North York location.</p><Link href="/weed-dispensary-jane-street">Open the Jane Street store guide →</Link></div><Image src="/brand/front-right-papers.png" width={1000} height={1000} alt="Jane Wilson purple rolling papers storefront artwork" /></section>

      <section className="faq"><p className="eyebrow">VISIT FAQ</p><h2>Before you head to Jane Street</h2>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
      <Footer />
      <JsonLd data={schema} />
    </main>
  );
}
