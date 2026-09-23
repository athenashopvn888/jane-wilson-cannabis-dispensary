import Link from "next/link";
import { STORE, TIERS } from "../lib/store";

export default function Footer() {
  return (
    <footer>
      <div><strong>{STORE.name}</strong><br />{STORE.street}<br />{STORE.locality}<br /><span className="footerHours">Hours: {STORE.hoursStatus}</span></div>
      <div><a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a><br /><a href={STORE.maps}>Open in Google Maps</a><br /><Link href="/visit">Transit &amp; arrival guide</Link><br /><Link href="/weed-dispensary-jane-street">Jane Street store guide</Link></div>
      <div className="footerTiers">{TIERS.map((tier) => <Link key={tier.slug} href={`/${tier.slug}`}>{tier.name}</Link>)}<span>Adults 19+ only.</span></div>
    </footer>
  );
}
