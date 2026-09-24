import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../../components/Footer";
import JsonLd from "../../../components/JsonLd";
import MenuPreviewNote from "../../../components/MenuPreviewNote";
import Nav from "../../../components/Nav";
import ProductPhoto from "../../../components/ProductPhoto";
import { availableFlowerPrices, flowerHref, flowerOffers, flowersForTier, formatFlowerPrice, getMenu, staticFlowers } from "../../../lib/inventory";
import { STORE, TIERS, tierBySlug } from "../../../lib/store";

export const revalidate = 300;

export function generateStaticParams() {
  return TIERS.flatMap((tier) =>
    flowersForTier(staticFlowers, tier.slug).map((flower) => ({ tier: tier.slug, sku: flower.sku }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ tier: string; sku: string }> }): Promise<Metadata> {
  const { tier: tierSlug, sku } = await params;
  const tier = tierBySlug(tierSlug);
  const flower = flowersForTier(staticFlowers, tierSlug).find((item) => item.sku === sku);
  if (!tier || !flower) return {};
  return {
    title: `${flower.name} | ${tier.name}`,
    description: `${flower.name} in ${tier.name} at Jane Wilson Cannabis Dispensary. Weights: 3g, 5g, 14g, and 28g.`,
    alternates: { canonical: `/flower/${tier.slug}/${flower.sku}` }
  };
}

export default async function FlowerPage({ params }: { params: Promise<{ tier: string; sku: string }> }) {
  const { tier: tierSlug, sku } = await params;
  const tier = tierBySlug(tierSlug);
  if (!tier) notFound();
  const menu = await getMenu();
  const flower = flowersForTier(menu.flowers, tier.slug).find((item) => item.sku === sku);
  if (!flower) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: flower.name,
    sku: flower.sku,
    image: flower.image || undefined,
    url: flowerHref(flower),
    brand: { "@type": "Brand", name: STORE.name },
    category: tier.name,
    offers: flowerOffers(flower)
  };

  return (
    <main>
      <Nav />
      <article className="productPage">
        <p className="eyebrow">{tier.name.toUpperCase()} · JANE STREET</p>
        <div className="productLayout">
          <ProductPhoto src={flower.image} alt={flower.name} />
          <div>
            <h1>{flower.name}</h1>
            <p className="flowerMeta">
              <span>{flower.type || "Flower"}</span>
              {flower.thc ? <span>THC {flower.thc}</span> : null}
            </p>
            <p>{tier.guide}</p>
            <MenuPreviewNote />
            <dl className="weightPrices productWeights">
              {availableFlowerPrices(flower).map(({ label, point }) => {
                const price = formatFlowerPrice(point);
                return (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>
                      <strong>{price.current}</strong>
                      {price.compare ? <s>{price.compare}</s> : null}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <div className="heroActions">
              <Link href={`/${tier.slug}`}>Back to {tier.name}</Link>
              <Link className="ghost" href="/visit">Visit Unit 12</Link>
            </div>
            <p className="truthNote">Hours: {STORE.hoursLabel}. {STORE.street}. {STORE.phone}.</p>
          </div>
        </div>
      </article>
      <Footer />
      <JsonLd data={schema} />
    </main>
  );
}
