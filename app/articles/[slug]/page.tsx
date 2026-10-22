import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import Footer from "../../components/Footer";
import FleetArticleView from "../../components/fleet/FleetArticleView";
import Nav from "../../components/Nav";
import { GUIDES } from "../../lib/content/guides";
import { loadFleetArticles, type FleetArticle } from "../../lib/fleet/articles";
import { FLEET_ARTICLES_PATH, FLEET_ORIGIN } from "../../lib/fleet/config";

export const dynamic = "force-dynamic";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CODED_SLUGS = new Set<string>([
  "indica",
  "sativa",
  "hybrid",
  "strains-a-to-z",
  ...GUIDES.map((guide) => guide.slug),
]);

async function findArticle(slug: string): Promise<FleetArticle | null> {
  if (!SLUG.test(slug) || CODED_SLUGS.has(slug)) return null;
  const loaded = await loadFleetArticles();
  if (!loaded.ok) return null;
  return loaded.articles.find((article) => article.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await findArticle(slug);
    if (!article) return {};
    return {
      title: article.metaTitle,
      description: article.metaDescription,
      alternates: { canonical: `${FLEET_ORIGIN}${FLEET_ARTICLES_PATH}/${article.slug}` },
    };
  } catch (error) {
    unstable_rethrow(error);
    return {};
  }
}

export default async function FleetArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  let article: FleetArticle | null;
  try {
    const { slug } = await params;
    article = await findArticle(slug);
    if (!article) notFound();
  } catch (error) {
    unstable_rethrow(error);
    notFound();
  }
  return (
    <>
      <Nav />
      <main>
        <FleetArticleView article={article} />
      </main>
      <Footer />
    </>
  );
}
