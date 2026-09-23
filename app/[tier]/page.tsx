import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { STORE, TIERS } from "../lib/store";

export function generateStaticParams() { return TIERS.map(({ slug }) => ({ tier: slug })); }

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const { tier: slug } = await params;
  const tier = TIERS.find((item) => item.slug === slug);
  if (!tier) return {};
  return { title: `${tier.name} & Cannabis Flower North York`, description: `Explore ${tier.name} at Jane Wilson Cannabis Dispensary in North York. Review the current flower collection and available weight-price information presented on the page.`, alternates: { canonical: `/${tier.slug}` } };
}

export default async function TierPage({ params }: { params: Promise<{ tier: string }> }) {
  const { tier: slug } = await params;
  const tier = TIERS.find((item) => item.slug === slug);
  if (!tier) notFound();
  const tierIndex = TIERS.findIndex((item) => item.slug === tier.slug);
  const art = tierIndex % 2 === 0 ? "/brand/front-left-grinder.png" : "/brand/front-right-papers.png";
  return (
    <main>
      <Nav />
      <section className="tierHero" style={{ "--tier": tier.tone } as React.CSSProperties}>
        <div className="tierHeroCopy"><p className="eyebrow">JANE WILSON · WEED COLLECTION 0{tierIndex + 1}</p><h1>{tier.name}</h1><p className="tierSubtitle">Cannabis flower in North York</p><p>Open a product to compare every supplied weight and price. Missing inventory is never guessed or borrowed from another storefront.</p><div className="tierHeroActions"><a href="#menu">View menu format</a><Link href="/weed-dispensary-north-york">Store details</Link></div></div>
        <div className="tierHeroArt"><div className="tierHalo" /><Image src={art} width={1200} height={1200} priority sizes="(max-width: 760px) 90vw, 42vw" alt={`${tier.name} Jane Wilson green and purple collection artwork`} /></div>
      </section>
      <section className="menuShell" id="menu">
        <div className="menuIntro"><div><p className="eyebrow">WEIGHT PRICES</p><h2>Every available weight. Right on the card.</h2></div><p>The Jane Wilson menu renderer is ready for the store feed. It displays only weight and price pairs supplied for that exact product.</p></div>
        <div className="productPreview">
          <div className="previewVisual"><Image src={art} width={900} height={900} alt="Jane Wilson product-card artwork preview" /></div>
          <div className="previewBody"><span className="previewTier">{tier.name}</span><h3>Product name from store feed</h3><p className="previewNote">No product name, potency, availability, or price is invented.</p><div className="weightDemo" aria-label="Weight price display format"><span><b>3.5g</b><em>store price</em></span><span><b>7g</b><em>store price</em></span><span><b>14g</b><em>store price</em></span><span><b>28g</b><em>store price</em></span></div></div>
        </div>
        <div className="feedNotice"><div className="feedIcon">JW</div><div><h2>Jane Wilson menu connection in progress</h2><p>Exact products and dollar amounts will appear as soon as the governed JWCD01 store feed is connected. This preview deliberately does not reuse another store’s live stock.</p></div><a href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a></div>
      </section>
      <section className="otherTiers"><p className="eyebrow">COMPARE COLLECTIONS</p><h2>Explore every Weed tier</h2><div>{TIERS.map((item) => <Link className={item.slug === tier.slug ? "activeTier" : ""} href={`/${item.slug}`} key={item.slug}>{item.name}<span>→</span></Link>)}</div>
        <div className="tierLinks"><Link href="/weed-dispensary-north-york">Weed Dispensary in North York</Link><Link className="backLink" href="/#weed-tiers">← Home</Link></div>
      </section>
      <Footer />
    </main>
  );
}
