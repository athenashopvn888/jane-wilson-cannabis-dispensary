import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import ItemGrid from "../../components/ItemGrid";
import JsonLd from "../../components/JsonLd";
import MenuPreviewNote from "../../components/MenuPreviewNote";
import Nav from "../../components/Nav";
import { categoryBySlug, productsForCategory } from "../../lib/catalog";
import { collectionSchema } from "../../lib/collectionSchema";
import { getMenu, itemPath } from "../../lib/inventory";
import { CATEGORY_LINKS } from "../../lib/shopLinks";
import { STORE } from "../../lib/store";
import styles from "../../jwc-pages.module.css";

export const revalidate = 300;

export function generateStaticParams() {
  return CATEGORY_LINKS.map((category) => ({ section: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const category = categoryBySlug(section);
  if (!category) return {};
  const title = `${category.title} | Jane Wilson Cannabis Dispensary`;
  const description = `${category.detail} In-store at ${STORE.street}, North York. Adults 19+. Prices come from the current menu.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: category.path },
    openGraph: { title, description, url: category.path, type: "website" }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const category = categoryBySlug(section);
  if (!category) notFound();
  const menu = await getMenu();
  const products = productsForCategory(menu.items, category.slug);
  const title = `${category.title} at Jane Wilson`;
  const description = `${category.detail} Listed for the counter at ${STORE.street}.`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...collectionSchema({
        path: category.path,
        name: title,
        description,
        items: products.map((item) => ({ name: item.name, url: `${STORE.origin}${itemPath(item, menu.items)}` }))
      })["@graph"],
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: "Menu", item: `${STORE.origin}/menu` },
          { "@type": "ListItem", position: 3, name: category.title, item: `${STORE.origin}${category.path}` }
        ]
      }
    ]
  };

  return (
    <main className={styles.main}>
      <JsonLd data={schema} />
      <Nav />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/menu">Menu</Link>
          <span>/</span>
          <span>{category.title}</span>
        </nav>
        <section className={styles.hero}>
          <div className={styles.heroCard}>
            <span className={styles.kicker}>In store · Jane Street · 19+</span>
            <h1>{title}</h1>
            <p>{description} Confirm the item and the price at the counter before you make the trip. The menu changes through the day.</p>
          </div>
          <aside className={styles.sideCard}>
            <strong>{STORE.hoursLabel}</strong>
            <a className={styles.callBtn} href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
            <Link className={styles.ghostBtn} href="/menu">Full menu</Link>
            <Link className={styles.ghostBtn} href="/visit">Plan your visit</Link>
          </aside>
        </section>
        <MenuPreviewNote />
        {products.length > 0 ? (
          <ItemGrid items={products} catalog={menu.items} />
        ) : (
          <p className={styles.prose}>Nothing in {category.title} is listed right now. Call {STORE.phone} or drop by {STORE.street}.</p>
        )}
        <p className={styles.prose}>
          {CATEGORY_LINKS.map((link, index) => (
            <span key={link.path}>
              {index > 0 ? " · " : null}
              <Link href={link.path}>{link.title}</Link>
            </span>
          ))}
        </p>
      </div>
      <Footer />
    </main>
  );
}
