import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import MenuPreviewNote from "../../components/MenuPreviewNote";
import Nav from "../../components/Nav";
import ProductPhoto from "../../components/ProductPhoto";
import { findPublicItem, getMenu, itemOfferAmounts, staticItems } from "../../lib/inventory";
import { STORE } from "../../lib/store";

export const revalidate = 300;

export function generateStaticParams() {
  const items = [
    ...staticItems.filter((item) => item.category.toUpperCase() === "CIGARETTES"),
    ...staticItems.filter((item) => item.category.toUpperCase() === "VAPE PENS")
  ];
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findPublicItem(staticItems, slug);
  if (!item) return {};
  const section = item.category.toUpperCase() === "CIGARETTES" ? "Native cigarettes" : "Nicotine vapes";
  return {
    title: `${item.name} | ${section}`,
    description: `${item.name} listed at Jane Wilson Cannabis Dispensary on Jane Street. Adults 19+.`,
    alternates: { canonical: `/item/${item.slug}` }
  };
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menu = await getMenu();
  const item = findPublicItem(menu.items, slug);
  if (!item) notFound();
  const isCigarette = item.category.toUpperCase() === "CIGARETTES";
  const backHref = isCigarette ? "/native-cigarettes-jane-street" : "/nicotine-vapes-jane-street";
  const backLabel = isCigarette ? "Native cigarettes" : "Nicotine vapes";
  const amounts = item.price ? itemOfferAmounts(item.price) : [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    sku: item.sku,
    image: item.image || undefined,
    url: `${STORE.origin}/item/${item.slug}`,
    brand: { "@type": "Brand", name: STORE.name },
    category: backLabel,
    offers: amounts.map((price) => ({
      "@type": "Offer",
      name: item.price,
      price,
      priceCurrency: "CAD",
      url: `${STORE.origin}/item/${item.slug}`,
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
            <MenuPreviewNote />
            {isCigarette ? <p>Tobacco products are for adults 19+. Bring government photo ID to {STORE.street}.</p> : <p>Nicotine vapes are for adults 19+. Nicotine is addictive. This list is separate from flower.</p>}
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
