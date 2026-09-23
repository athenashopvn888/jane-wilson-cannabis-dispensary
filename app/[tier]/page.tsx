import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import Nav from "../components/Nav";
import { STORE, TIERS, WEIGHTS } from "../lib/store";

export function generateStaticParams() {
  return TIERS.map(({ slug }) => ({ tier: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const { tier: slug } = await params;
  const tier = TIERS.find((item) => item.slug === slug);
  if (!tier) return {};
  return {
    title: `${tier.name} on Jane Street | North York`,
    description: `${tier.summary} Explore ${tier.name} at Jane Wilson Cannabis Dispensary near Jane Street and Wilson Avenue in North York.`,
    alternates: { canonical: `/${tier.slug}` },
    openGraph: { title: `${tier.name} | Jane Wilson Cannabis`, url: `/${tier.slug}` }
  };
}

export default async function TierPage({ params }: { params: Promise<{ tier: string }> }) {
  const { tier: slug } = await params;
  const tier = TIERS.find((item) => item.slug === slug);
  if (!tier) notFound();

  const tierIndex = TIERS.findIndex((item) => item.slug === tier.slug);
  const art = tierIndex % 2 === 0 ? "/brand/front-left-grinder.png" : "/brand/front-right-papers.png";
  const faqs = [
    {
      question: `What is ${tier.name}?`,
      answer: `${tier.summary} ${tier.guide}`
    },
    {
      question: `Which weights are shown for ${tier.name}?`,
      answer: "The page keeps 3.5g, 7g, 14g, and 28g positions visible. The store must confirm which weights and prices are currently available for each product."
    },
    {
      question: `Where can I ask about today’s ${tier.name} selection?`,
      answer: `Call Jane Wilson Cannabis Dispensary at ${STORE.phone} or visit ${STORE.street} near Jane Street and Wilson Avenue.`
    },
    {
      question: "Can I rely on this page for live stock?",
      answer: "Not yet. The JWCD01 governed menu source is not connected, so this page does not publish product names, availability, or dollar prices."
    }
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${STORE.origin}/${tier.slug}#collection`,
        url: `${STORE.origin}/${tier.slug}`,
        name: `${tier.name} on Jane Street`,
        description: tier.summary,
        about: { "@id": `${STORE.origin}/#store` },
        mainEntity: { "@id": `${STORE.origin}/${tier.slug}#weights` }
      },
      {
        "@type": "ItemList",
        "@id": `${STORE.origin}/${tier.slug}#weights`,
        name: `${tier.name} weight and price formats`,
        numberOfItems: WEIGHTS.length,
        itemListElement: WEIGHTS.map((weight, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${weight} ${tier.name} price position — confirm with store`
        }))
      },
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
        <div className="tierHeroCopy"><p className="eyebrow">JANE STREET · WEED COLLECTION 0{tierIndex + 1}</p><h1>{tier.name}</h1><p className="tierSubtitle">Flower tier at Jane &amp; Wilson in North York</p><p>{tier.summary}</p><p>{tier.guide}</p><div className="tierHeroActions"><a href="#weight-prices">Weight &amp; price format</a><Link href="/visit">Visit Unit 12</Link></div></div>
        <div className="tierHeroArt"><div className="tierHalo" /><Image src={art} width={1200} height={1200} priority sizes="(max-width: 760px) 90vw, 42vw" alt={`${tier.name} Jane Wilson green and purple collection artwork`} /></div>
      </section>

      <section className="menuShell" id="weight-prices">
        <div className="menuIntro"><div><p className="eyebrow">WEIGHT PRICES</p><h2>Four weight positions, confirmed by the store</h2></div><p>Prices are not copied from Jane Finch or any other dispensary. Until the governed JWCD01 menu is connected, call the Jane Wilson counter for the exact product, weight, and dollar price.</p></div>
        <div className="weightBoard" aria-label={`${tier.name} weight price confirmation board`}>
          {WEIGHTS.map((weight) => (
            <div key={weight}><span>{weight}</span><strong>CALL FOR TODAY’S PRICE</strong><a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a></div>
          ))}
        </div>
        <aside className="inventoryTruth">
          <div className="feedIcon">JW</div>
          <div><h2>Current {tier.name} listings</h2><p>The JWCD01 governed menu source is not available in this build. To prevent false stock, this page publishes no made-up strain names, availability, or prices. Call or visit for today’s selection.</p></div>
          <a href={`tel:${STORE.phoneHref}`}>Call the Jane Wilson store</a>
        </aside>
      </section>

      <section className="tierEditorial">
        <p className="eyebrow">HOW THIS TIER FITS</p>
        <h2>{tier.name} in the five-tier flower ladder</h2>
        <p>{tier.guide} The five Weed pages keep each collection distinct, while the Jane Street corridor and visit pages own the local information about the physical storefront.</p>
        <div className="editorialLinks"><Link href="/weed-dispensary-jane-street">Jane Street weed dispensary guide →</Link><Link href="/visit">TTC, map, and Unit 12 arrival →</Link></div>
      </section>

      <section className="otherTiers"><p className="eyebrow">COMPARE COLLECTIONS</p><h2>Explore every Weed tier</h2><div>{TIERS.map((item) => <Link className={item.slug === tier.slug ? "activeTier" : ""} href={`/${item.slug}`} key={item.slug}>{item.name}<span>→</span></Link>)}</div><div className="tierLinks"><Link href="/weed-dispensary-jane-street">Jane Street Weed Dispensary</Link><Link href="/visit">Visit Jane Wilson</Link><Link className="backLink" href="/#weed-tiers">← Home</Link></div></section>

      <section className="faq tierFaq"><p className="eyebrow">{tier.name.toUpperCase()} FAQ</p><h2>Before you visit</h2>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
      <Footer />
      <JsonLd data={schema} />
    </main>
  );
}
