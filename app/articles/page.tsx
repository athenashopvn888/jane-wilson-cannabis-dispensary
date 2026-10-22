import type { Metadata } from "next";
import Link from "next/link";
import { notFound, unstable_rethrow } from "next/navigation";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { GUIDES } from "../lib/content/guides";
import { loadFleetArticles, mergeArticleLinks } from "../lib/fleet/articles";
import { FLEET_ARTICLES_PATH, FLEET_ORIGIN } from "../lib/fleet/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles",
  description: "Guides and articles from Jane Wilson Cannabis Dispensary.",
  alternates: { canonical: `${FLEET_ORIGIN}${FLEET_ARTICLES_PATH}` },
};

const HUBS = [
  { slug: "indica", title: "Indica" },
  { slug: "sativa", title: "Sativa" },
  { slug: "hybrid", title: "Hybrid" },
  { slug: "strains-a-to-z", title: "Strains A to Z" },
] as const;

function codedLinks() {
  return [
    ...HUBS.map((hub) => ({ slug: hub.slug, title: hub.title, href: `/guides/${hub.slug}` })),
    ...GUIDES.map((guide) => ({ slug: guide.slug, title: guide.name, href: `/guides/${guide.slug}` })),
  ];
}

export default async function ArticlesPage() {
  let links;
  try {
    const loaded = await loadFleetArticles();
    if (!loaded.ok) notFound();
    links = mergeArticleLinks(codedLinks(), loaded.articles);
  } catch (error) {
    unstable_rethrow(error);
    notFound();
  }
  return (
    <>
      <Nav />
      <main>
        <h1>Articles</h1>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
