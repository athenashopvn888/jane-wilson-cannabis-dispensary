import type { Metadata } from "next";
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
  return (
    <main>
      <Nav />
      <section className="tierHero" style={{ "--tier": tier.tone } as React.CSSProperties}>
        <p className="eyebrow">JANE WILSON WEED MENU</p><h1>{tier.name} &amp; Cannabis Flower in North York</h1>
        <p>Each in-stock strain will display every available weight and its price directly on the product card.</p>
      </section>
      <section className="menuPending">
        <div className="weightDemo" aria-label="Weight price display format">
          <span>3.5g <b>price</b></span><span>7g <b>price</b></span><span>14g <b>price</b></span><span>28g <b>price</b></span>
        </div>
        <h2>{tier.name} inventory connection pending</h2>
        <p>The menu intentionally does not present another store’s products or prices as Jane Wilson inventory. Product cards and exact weight prices will populate here when the new store is mapped to its governed store feed.</p>
        <p><a href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a> if you are planning a visit.</p>
        <div className="tierLinks"><Link href="/weed-dispensary-north-york">Weed Dispensary in North York</Link><Link className="backLink" href="/#weed-tiers">← All Weed tiers</Link></div>
      </section>
      <Footer />
    </main>
  );
}
