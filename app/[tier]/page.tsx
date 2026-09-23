import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FlowerGrid from "../components/FlowerGrid";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import MenuPreviewNote from "../components/MenuPreviewNote";
import Nav from "../components/Nav";
import { collectionSchema } from "../lib/collectionSchema";
import { flowerHref, flowersForTier, getMenu } from "../lib/inventory";
import { STORE, TIERS, WEIGHTS } from "../lib/store";

export const revalidate = 300;

export function generateStaticParams() {
  return TIERS.map(({ slug }) => ({ tier: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const { tier: slug } = await params;
  const tier = TIERS.find((item) => item.slug === slug);
  if (!tier) return {};
  return {
    title: `${tier.name} on Jane Street | North York`,
    description: `${tier.summary} Compare 3g, 5g, 14g, and 28g listings at Jane Wilson Cannabis Dispensary near Jane Street and Wilson Avenue in North York.`,
    alternates: { canonical: `/${tier.slug}` },
    openGraph: { title: `${tier.name} | Jane Wilson Cannabis`, url: `/${tier.slug}` }
  };
}

export default async function TierPage({ params }: { params: Promise<{ tier: string }> }) {
  const { tier: slug } = await params;
  const tier = TIERS.find((item) => item.slug === slug);
  if (!tier) notFound();

  const menu = await getMenu();
  const flowers = flowersForTier(menu.flowers, tier.slug);
  const tierIndex = TIERS.findIndex((item) => item.slug === tier.slug);
  const art = tierIndex % 2 === 0 ? "/brand/front-left-grinder.png" : "/brand/front-right-papers.png";
  const faqs = [
    {
      question: `What is ${tier.name}?`,
      answer: `${tier.summary} ${tier.guide}`
    },
    {
      question: `Which weights are listed for ${tier.name}?`,
      answer: "Listings use 3g, 5g, 14g, and 28g. A dash means that weight is not posted for that flower."
    },
    {
      question: `Where can I confirm today’s ${tier.name} selection?`,
      answer: `Call Jane Wilson Cannabis Dispensary at ${STORE.phone} or visit ${STORE.street}. Hours are ${STORE.hoursLabel}.`
    },
    {
      question: "Is this the final Jane Wilson menu?",
      answer: "This page is a menu preview. Confirm availability and prices at the Jane Wilson counter until the Jane Wilson live feed is connected."
    }
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...collectionSchema({
        path: `/${tier.slug}`,
        name: `${tier.name} on Jane Street`,
        description: tier.summary,
        items: flowers.map((flower) => ({ name: flower.name, url: flowerHref(flower) }))
      })["@graph"],
      {
        "@type": "BreadcrumbList",
        "@id": `${STORE.origin}/${tier.slug}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: tier.name, item: `${STORE.origin}/${tier.slug}` }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${STORE.origin}/${tier.slug}#faq`,
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
      <section className="tierHero" style={{ "--tier": tier.tone } as React.CSSProperties}>
        <div className="tierHeroCopy">
          <p className="eyebrow">JANE STREET · WEED COLLECTION 0{tierIndex + 1}</p>
          <h1>{tier.name}</h1>
          <p className="tierSubtitle">Flower tier at Jane &amp; Wilson in North York</p>
          <p>{tier.summary}</p>
          <p>{tier.guide}</p>
          <p>{flowers.length} flowers listed · weights {WEIGHTS.join(", ")}</p>
          <div className="tierHeroActions">
            <a href="#listings">View listings</a>
            <Link href="/visit">Visit Unit 12</Link>
          </div>
        </div>
        <div className="tierHeroArt">
          <div className="tierHalo" />
          <Image src={art} width={1200} height={1200} priority sizes="(max-width: 760px) 90vw, 42vw" alt={`${tier.name} Jane Wilson green and purple collection artwork`} />
        </div>
      </section>

      <section className="menuShell" id="listings">
        <div className="menuIntro">
          <div>
            <p className="eyebrow">3g · 5g · 14g · 28g</p>
            <h2>{tier.name} listings</h2>
          </div>
          <MenuPreviewNote />
        </div>
        <FlowerGrid flowers={flowers} />
      </section>

      <section className="tierEditorial">
        <p className="eyebrow">HOW THIS TIER FITS</p>
        <h2>{tier.name} in the five-tier flower ladder</h2>
        <p>{tier.guide} Hours at {STORE.street} are {STORE.hoursLabel}.</p>
        <div className="editorialLinks">
          <Link href="/weed-dispensary-jane-street">Jane Street weed dispensary guide →</Link>
          <Link href="/visit">TTC, map, and Unit 12 arrival →</Link>
        </div>
      </section>

      <section className="otherTiers">
        <p className="eyebrow">COMPARE COLLECTIONS</p>
        <h2>Explore every Weed tier</h2>
        <div>
          {TIERS.map((item) => (
            <Link className={item.slug === tier.slug ? "activeTier" : ""} href={`/${item.slug}`} key={item.slug}>
              {item.name}<span>→</span>
            </Link>
          ))}
        </div>
        <div className="tierLinks">
          <Link href="/weed-dispensary-jane-street">Jane Street Weed Dispensary</Link>
          <Link href="/visit">Visit Jane Wilson</Link>
          <Link href="/native-cigarettes-jane-street">Native cigarettes</Link>
          <Link href="/nicotine-vapes-jane-street">Nicotine vapes</Link>
          <Link className="backLink" href="/#weed-tiers">← Home</Link>
        </div>
      </section>

      <section className="faq tierFaq">
        <p className="eyebrow">{tier.name.toUpperCase()} FAQ</p>
        <h2>Before you visit</h2>
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
