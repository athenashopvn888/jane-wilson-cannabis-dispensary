import type { Metadata } from "next";
import Link from "next/link";
import CigsDealPlaceholder from "../components/CigsDealPlaceholder";
import Footer from "../components/Footer";
import ItemGrid from "../components/ItemGrid";
import JsonLd from "../components/JsonLd";
import MenuPreviewNote from "../components/MenuPreviewNote";
import Nav from "../components/Nav";
import { collectionSchema } from "../lib/collectionSchema";
import { cigaretteItems, getMenu } from "../lib/inventory";
import { STORE } from "../lib/store";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Native Cigarettes on Jane Street | Jane Wilson",
  description: "Native cigarette listings at Jane Wilson Cannabis Dispensary, 2111 Jane St, Unit 12, North York. Adults 19+. Open 10:00 AM to midnight daily.",
  alternates: { canonical: "/native-cigarettes-jane-street" },
  openGraph: { title: "Native Cigarettes on Jane Street", url: "/native-cigarettes-jane-street" }
};

const faqs = [
  {
    question: "Where are native cigarettes sold?",
    answer: `At ${STORE.name}, ${STORE.address}. Adults 19+ with government photo ID.`
  },
  {
    question: "What are the store hours?",
    answer: `The counter is open ${STORE.hoursLabel}.`
  },
  {
    question: "Should I confirm a carton before travelling?",
    answer: "Yes. The page is a menu preview. Confirm the brand and price at the Jane Wilson counter until the Jane Wilson live feed is connected."
  }
];

export default async function NativeCigarettesPage() {
  const menu = await getMenu();
  const items = cigaretteItems(menu.items);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...collectionSchema({
        path: "/native-cigarettes-jane-street",
        name: "Native cigarettes on Jane Street",
        description: "Native cigarette listings at Jane Wilson Cannabis Dispensary.",
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
          <p className="eyebrow">JANE STREET · ADULTS 19+</p>
          <h1>Native cigarettes on Jane Street</h1>
          <p>
            {STORE.name} lists native cigarettes at {STORE.street}, near Wilson Avenue in Downsview. The counter is open {STORE.hoursLabel}.
          </p>
          <MenuPreviewNote />
          <div className="heroActions">
            <a href="#listings">View cigarette listings</a>
            <Link className="ghost" href="/visit">Plan your visit</Link>
          </div>
        </div>
        {/* PLACEHOLDER_FOR_CODEX cigs deal creative */}
        <CigsDealPlaceholder />
      </section>

      <section className="menuShell" id="listings">
        <div className="menuIntro">
          <div>
            <p className="eyebrow">{items.length} LISTINGS</p>
            <h2>Cigarette menu</h2>
          </div>
          <p>Tobacco products are for adults 19+. Prices below are the posted menu amounts. Confirm the carton at Unit 12.</p>
        </div>
        <ItemGrid items={items} />
      </section>

      <section className="faq">
        <p className="eyebrow">CIGARETTE FAQ</p>
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
