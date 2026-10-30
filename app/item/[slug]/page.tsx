import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import MenuPreviewNote from "../../components/MenuPreviewNote";
import Nav from "../../components/Nav";
import ProductPhoto from "../../components/ProductPhoto";
import { categoryForItem } from "../../lib/catalog";
import { cigaretteItems, findPublicItem, getMenu, itemOfferAmounts, itemPublicSlug, nicotineVapeItems, shelfItems, staticItems } from "../../lib/inventory";
import { isHiddenCigaretteItem, VAPE_PAGE_PATH } from "../../lib/siteConfig";
import { STORE } from "../../lib/store";

export const revalidate = 300;

export async function generateStaticParams() {
  const staticPool = [...cigaretteItems(staticItems), ...nicotineVapeItems(staticItems)];
  const slugs = new Set(staticPool.map((item) => itemPublicSlug(item, staticPool)));
  try {
    const menu = await getMenu();
    const source = menu.isLive ? menu.items : staticItems;
    const livePool = [...cigaretteItems(source).filter((item) => !isHiddenCigaretteItem(item)), ...shelfItems(source)];
    for (const item of livePool) slugs.add(itemPublicSlug(item, livePool));
  } catch {
    // The mirrored JSON above still publishes the known product paths.
  }
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getMenu();
  const pool = menu.items.length ? menu.items : staticItems;
  const item = findPublicItem(pool, slug);
  if (!item || isHiddenCigaretteItem(item)) return {};
  const section = categoryForItem(item);
  return {
    title: `${item.name} | ${section.title}`,
    description: `${item.name} listed at Jane Wilson Cannabis Dispensary on Jane Street. Adults 19+.`,
    alternates: { canonical: `/item/${itemPublicSlug(item, pool)}` }
  };
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menu = await getMenu();
  const item = findPublicItem(menu.items, slug);
  if (!item) notFound();
  if (isHiddenCigaretteItem(item)) redirect(VAPE_PAGE_PATH);
  const section = categoryForItem(item);
  const isCigarette = item.category.toUpperCase() === "CIGARETTES";
  const isNicotine = item.category.toUpperCase() === "VAPE PENS";
  const backHref = section.path;
  const backLabel = section.title;
  const publicSlug = itemPublicSlug(item, menu.items);
  const amounts = item.price ? itemOfferAmounts(item.price) : [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    sku: item.sku,
    image: item.image || undefined,
    url: `${STORE.origin}/item/${publicSlug}`,
    brand: { "@type": "Brand", name: STORE.name },
    category: backLabel,
    offers: amounts.map((price) => ({
      "@type": "Offer",
      name: item.price,
      price,
      priceCurrency: "CAD",
      url: `${STORE.origin}/item/${publicSlug}`,
      seller: { "@id": `${STORE.origin}/#store` }
    }))
  };

  return (
    <main>
      <Nav />
      <article className="productPage">
        <p className="eyebrow">{backLabel.toUpperCase()} · JANE STREET · 19+</p>
        <div className="productLayout">
          <ProductPhoto src={item.image} alt={item.name} />
          <div>
            <h1>{item.name}</h1>
            <p className="itemPrice">{item.price || "Confirm at the counter"}</p>
            {item.mg ? <p className="flowerMeta"><span>{item.mg}</span></p> : null}
            {item.thc ? <p className="flowerMeta"><span>THC {item.thc}</span></p> : null}
            <MenuPreviewNote />
            {isCigarette ? <p>Tobacco products are for adults 19+. Bring government photo ID to {STORE.street}.</p> : isNicotine ? <p>Nicotine vapes are for adults 19+. Nicotine is addictive. This list is separate from flower.</p> : <p>{item.name} is listed for the counter at {STORE.street}. The price above is the in-store price from the menu. Adults 19+.</p>}
            <div className="heroActions">
              <Link href={backHref}>Back to {backLabel}</Link>
              <a className="ghost" href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
            </div>
            <p className="truthNote">Hours: {STORE.hoursLabel}. {STORE.street}.</p>
          </div>
        </div>
      </article>
      <Footer />
      <JsonLd data={schema} />
    </main>
  );
}
