import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { STORE, TIERS } from "../lib/store";

export const metadata: Metadata = {
  title: "Weed Dispensary North York | Jane Wilson Cannabis Dispensary",
  description: "Jane Wilson Cannabis Dispensary is located at 2111 Jane St #12 in North York. Find store information and explore Weed and cannabis categories for this location.",
  alternates: { canonical: "/weed-dispensary-north-york" }
};

export default function NorthYorkPage() {
  return (
    <main>
      <Nav />
      <section className="localHero">
        <p className="eyebrow">2111 JANE ST · UNIT 12</p>
        <h1>Weed Dispensary in North York</h1>
        <p>{STORE.name} is located at {STORE.address}. Use this page for the official address, phone, map, and direct access to the store’s five Weed flower tiers.</p>
        <div className="heroActions"><a href={STORE.maps}>Open Google Maps</a><a className="ghost" href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a></div>
      </section>
      <section className="localTierList">
        <h2>Explore the Weed flower tiers</h2>
        <p>The flower menu is organized into five store tier names. Product and weight-price information appears only when supplied by the Jane Wilson inventory source.</p>
        <div>{TIERS.map((tier) => <Link key={tier.slug} href={`/${tier.slug}`}>{tier.name}<span>View tier →</span></Link>)}</div>
      </section>
      <section className="localDetails"><div><h2>Jane Wilson Cannabis Dispensary</h2><address>{STORE.street}<br />{STORE.locality}<br />Canada</address></div><div><h2>Contact</h2><p><a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a></p><p><a href={STORE.maps}>Google Maps</a></p></div></section>
      <Footer />
    </main>
  );
}
