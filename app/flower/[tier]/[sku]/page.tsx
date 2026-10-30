import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../../components/Footer";
import JsonLd from "../../../components/JsonLd";
import MenuPreviewNote from "../../../components/MenuPreviewNote";
import Nav from "../../../components/Nav";
import ProductPhoto from "../../../components/ProductPhoto";
import { isFreeGramTier } from "../../../components/FreeGramPromo";
import { availableFlowerPrices, flowerHref, flowerOffers, flowersForTier, formatFlowerPrice, getMenu, staticFlowers } from "../../../lib/inventory";
import { STORE, TIERS, tierByKey, tierBySlug } from "../../../lib/store";

export const revalidate = 300;

export async function generateStaticParams() {
  const params = TIERS.flatMap((tier) =>
    flowersForTier(staticFlowers, tier.slug).map((flower) => ({ tier: tier.slug, sku: flower.sku }))
  );
  const seen = new Set(params.map((item) => `${item.tier}/${item.sku}`));
  try {
    const menu = await getMenu();
    for (const flower of menu.flowers) {
      const tier = tierByKey(flower.tier);
      if (!tier) continue;
      const key = `${tier.slug}/${flower.sku}`;
      if (seen.has(key)) continue;
      seen.add(key);
      params.push({ tier: tier.slug, sku: flower.sku });
    }
  } catch {
    // Static flower paths above stay in the build.
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ tier: string; sku: string }> }): Promise<Metadata> {
  const { tier: tierSlug, sku } = await params;
  const tier = tierBySlug(tierSlug);
  const menu = await getMenu();
  const flower = flowersForTier(menu.flowers, tierSlug).find((item) => item.sku === sku)
    ?? flowersForTier(staticFlowers, tierSlug).find((item) => item.sku === sku);
  if (!tier || !flower) return {};
  return {
    title: `${flower.name} | ${tier.name}`,
    description: `${flower.name} in ${tier.name} at Jane Wilson Cannabis Dispensary. Weights: 3g, ${isFreeGramTier(flower.tier) ? "6g" : "5g"}, 14g, and 28g.`,
    alternates: { canonical: `/flower/${tier.slug}/${flower.sku}` }
  };
}

export default async function FlowerPage({ params }: { params: Promise<{ tier: string; sku: string }> }) {
  const { tier: tierSlug, sku } = await params;
  const tier = tierBySlug(tierSlug);
  if (!tier) notFound();
  const menu = await getMenu();
  const liveFlower = flowersForTier(menu.flowers, tier.slug).find((item) => item.sku === sku);
  const savedFlower = flowersForTier(staticFlowers, tier.slug).find((item) => item.sku === sku);
  const flower = liveFlower ?? savedFlower;
  if (!flower) notFound();
  const unavailable = menu.isLive && !liveFlower;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: flower.name,
    sku: flower.sku,
    image: flower.image || undefined,
    url: flowerHref(flower),
    brand: { "@type": "Brand", name: STORE.name },
    category: tier.name,
    offers: flowerOffers(flower).map((offer) => (
      unavailable ? { ...offer, availability: "https://schema.org/OutOfStock" } : offer
    ))
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
            {unavailable ? (
              <p>Currently unavailable. This strain is not on today&apos;s menu. The prices below are the last listed in-store prices.</p>
            ) : (
              <MenuPreviewNote />
            )}
            <dl className="weightPrices productWeights">
              {availableFlowerPrices(flower).map(({ label, point }) => {
                const price = formatFlowerPrice(point);
                return (
                  <div key={label}>
                    <dt>{(isFreeGramTier(flower.tier) && label === "5g" ? "6g" : label)}</dt>
                    <dd>
                      <strong>{price.current}</strong>
                      {price.compare ? <s>{price.compare}</s> : null}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <div className="heroActions">
              <Link href={`/${tier.slug}`}>{unavailable ? `See ${tier.name}` : `Back to ${tier.name}`}</Link>
              <Link className="ghost" href="/menu">Menu</Link>
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
