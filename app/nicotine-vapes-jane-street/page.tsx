import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import ItemGrid from "../components/ItemGrid";
import JsonLd from "../components/JsonLd";
import MenuPreviewNote from "../components/MenuPreviewNote";
import Nav from "../components/Nav";
import { collectionSchema } from "../lib/collectionSchema";
import { getMenu, nicotineVapeItems } from "../lib/inventory";
import { STORE } from "../lib/store";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Nicotine Vapes on Jane Street | Jane Wilson",
  description: "Nicotine vape listings at Jane Wilson Cannabis Dispensary, 2111 Jane St, Unit 12, North York. Adults 19+. Nicotine is addictive. Open 10:00 AM to midnight daily.",
  alternates: { canonical: "/nicotine-vapes-jane-street" },
  openGraph: { title: "Nicotine Vapes on Jane Street", url: "/nicotine-vapes-jane-street" }
};

const faqs = [
  {
    question: "Where are nicotine vapes listed?",
    answer: `At ${STORE.name}, ${STORE.address}. This page is only the nicotine vape list. Flower tiers stay on their own pages.`
  },
  {
    question: "Who can buy nicotine vapes?",
    answer: "Adults 19+ with government photo ID. Nicotine is addictive."
  },
  {
    question: "What are the store hours?",
    answer: `The counter is open ${STORE.hoursLabel}.`
  },
  {
    question: "Are these prices final?",
    answer: "Treat the list as a menu preview. Confirm the device and price at the Jane Wilson counter until the Jane Wilson live feed is connected."
  }
];

export default async function NicotineVapesPage() {
  const menu = await getMenu();
  const items = nicotineVapeItems(menu.items);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...collectionSchema({
        path: "/nicotine-vapes-jane-street",
        name: "Nicotine vapes on Jane Street",
        description: "Nicotine vape listings at Jane Wilson Cannabis Dispensary.",
        items: items.map((item) => ({ name: item.name, url: `${STORE.origin}/item/${item.slug}` }))
      })["@graph"],
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer }
        }))
      }
    ]
  };

  return (
    <main>
      <Nav />
      <section className="corridorHero">
        <div>
          <p className="eyebrow">JANE STREET · ADULTS 19+ · NICOTINE IS ADDICTIVE</p>
          <h1>Nicotine vapes on Jane Street</h1>
          <p>
            {STORE.name} keeps nicotine vapes on their own list at {STORE.street}, near Wilson Avenue in Downsview. Hours are {STORE.hoursLabel}.
          </p>
          <MenuPreviewNote />
          <div className="heroActions">
            <a href="#listings">View nicotine vapes</a>
            <Link className="ghost" href="/native-cigarettes-jane-street">Native cigarettes</Link>
          </div>
        </div>
        <aside className="hoursCard">
          <p className="eyebrow">COUNTER HOURS</p>
          <p className="hoursNotice">{STORE.hoursLabel}</p>
          <p><a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a></p>
          <p>{STORE.street}</p>
          <Link href="/visit">Unit 12 arrival guide →</Link>
        </aside>
      </section>

      <section className="menuShell" id="listings">
        <div className="menuIntro">
          <div>
            <p className="eyebrow">{items.length} LISTINGS</p>
            <h2>Nicotine vape menu</h2>
          </div>
          <p>Prices are the posted menu amounts. Confirm the device at the Jane Wilson counter. Flower is listed on the five weed tiers.</p>
        </div>
        <ItemGrid items={items} />
      </section>

      <section className="faq">
        <p className="eyebrow">NICOTINE VAPE FAQ</p>
        <h2>Before you come to Jane Street</h2>
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
      <Footer />
      <JsonLd data={schema} />
    </main>
  );
}
