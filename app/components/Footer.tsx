import Link from "next/link";
import { SHOW_CIGARETTES } from "../lib/siteConfig";
import { AREA_LINKS, CATEGORY_LINKS } from "../lib/shopLinks";
import { STORE, TIERS } from "../lib/store";

export default function Footer({ showNicotine = true }: { showNicotine?: boolean }) {
  return (
    <footer>
      <div><strong>{STORE.name}</strong><br />{STORE.street}<br />{STORE.locality}<br /><span className="footerHours">Hours: {STORE.hoursLabel}</span></div>
      <div><a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a><br /><a href={STORE.maps}>Open in Google Maps</a><br /><Link href="/visit">Transit &amp; arrival guide</Link><br /><Link href="/hours">Store Hours</Link><br /><Link href="/weed-dispensary-jane-street">Jane Street store guide</Link><br /><Link href="/menu">Menu</Link><br /><Link href="/resources">Resources</Link><br /><Link href="/dispensary-near-me">Dispensary near me</Link><br />{showNicotine && SHOW_CIGARETTES ? <><Link href="/native-cigarettes-jane-street">Native cigarettes</Link><br /></> : null}{showNicotine ? <Link href="/nicotine-vapes-jane-street">Nicotine vapes</Link> : null}</div>
      <div className="footerTiers">{TIERS.map((tier) => <Link key={tier.slug} href={`/${tier.slug}`}>{tier.name}</Link>)}{CATEGORY_LINKS.map((link) => <Link key={link.path} href={link.path}>{link.title}</Link>)}<Link href="/contact">Contact</Link>{AREA_LINKS.map((link) => <Link key={link.path} href={link.path}>{link.title}</Link>)}<span>Adults 19+ only.</span></div>
    </footer>
  );
}
