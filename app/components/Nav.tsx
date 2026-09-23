import Link from "next/link";
import { STORE, TIERS } from "../lib/store";

export default function Nav() {
  return (
    <header className="siteHeader">
      <div className="navWrap">
        <Link className="brand" href="/" aria-label={`${STORE.name} home`}>
          <span className="brandMark">JW</span>
          <span><b>JANE WILSON</b><small>CANNABIS DISPENSARY</small></span>
        </Link>
        <nav aria-label="Primary navigation">
          {TIERS.map((tier) => <Link key={tier.slug} href={`/${tier.slug}`}>{tier.name}</Link>)}
          <Link href="/weed-dispensary-north-york">North York Store</Link>
          <Link href="/#visit">Visit</Link>
        </nav>
        <a className="callButton" href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
      </div>
    </header>
  );
}
