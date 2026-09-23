import Link from "next/link";
import Image from "next/image";
import AgeGate from "./components/AgeGate";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { STORE, TIERS } from "./lib/store";

export default function HomePage() {
  return (
    <main>
      <AgeGate />
      <Nav />
      <section className="hero">
        <div className="heroCopy">
          <div className="heroBadge">19+ · NORTH YORK</div>
          <p className="eyebrow">2111 JANE ST · UNIT 12</p>
          <h1>Jane Wilson<span>Cannabis Dispensary</span></h1>
          <p className="heroText">Jane Wilson Cannabis Dispensary is located at 2111 Jane St #12 in North York, Ontario. Explore five clear Weed flower tiers and cannabis information for this location.</p>
          <div className="heroActions"><Link href="#weed-tiers">Browse Weed</Link><a className="ghost" href={STORE.maps}>Get Directions</a></div>
          <p className="truthNote">Current products and prices appear only when the Jane Wilson store feed is connected.</p>
        </div>
        <div className="heroArt" aria-label="Jane Wilson storefront artwork">
          <div className="heroPattern" />
          <Image className="heroProduct heroProductOne" src="/brand/front-left-grinder.png" width={1200} height={1200} sizes="(max-width: 980px) 74vw, 34vw" priority alt="Purple grinder with cannabis leaf on green and purple geometric artwork" />
          <Image className="heroProduct heroProductTwo" src="/brand/front-right-papers.png" width={1200} height={1200} sizes="(max-width: 980px) 64vw, 28vw" priority alt="Purple rolling paper package on green and purple geometric artwork" />
          <div className="heroArtLabel"><b>JANE WILSON</b><span>PURPLE × GREEN</span></div>
        </div>
      </section>

      <section className="artStrip" aria-label="Jane Wilson storefront design"><Image src="/brand/accessories-sign.svg" width={2300} height={240} alt="Jane Wilson smoke accessories, grinders, and rolling papers sign artwork" /></section>

      <section className="tiers" id="weed-tiers">
        <p className="eyebrow">SHOP BY WEED TIER</p>
        <h2>Find the weed tier that fits your visit</h2>
        <p className="sectionLead">Every tier name includes “Weed,” and product cards are designed to show each available weight with its price.</p>
        <div className="tierGrid">
          {TIERS.map((tier, index) => (
            <Link className="tierCard" href={`/${tier.slug}`} key={tier.slug} style={{ "--tier": tier.tone } as React.CSSProperties}>
              <span className="tierNumber">0{index + 1}</span><div className="tierHex" /><h3>{tier.name}</h3><p>Strains · weights · prices</p><b>Explore tier <i>→</i></b>
            </Link>
          ))}
        </div>
      </section>

      <section className="localOwner">
        <p className="eyebrow">JANE STREET · NORTH YORK</p>
        <h2>Cannabis Dispensary on Jane Street in North York</h2>
        <p>Use the dedicated local store page for Jane Wilson Cannabis Dispensary’s address, phone number, map, and links to all five Weed collections.</p>
        <Link href="/weed-dispensary-north-york">Weed Dispensary in North York →</Link>
      </section>

      <section className="featureBand">
        <Image src="/brand/side-window-combined.png" width={1400} height={1000} sizes="(max-width: 980px) 100vw, 50vw" alt="Green and purple geometric Jane Wilson artwork with grinder and rolling papers" />
        <div><p className="eyebrow">THE JANE WILSON LOOK</p><h2>Built from the storefront—not a generic template.</h2><p>The website now carries the same hexagon geometry, rich purple accessories, sharp green accents, and clean white space used across the approved window, door, and fascia artwork.</p><Link className="textLink" href="/weed-dispensary-north-york">Visit the North York store page →</Link></div>
      </section>

      <section className="visit" id="visit">
        <div><p className="eyebrow">VISIT JANE WILSON</p><h2>{STORE.street}</h2><p>{STORE.locality}</p><p><a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a></p></div>
        <div className="visitActions"><a href={STORE.maps}>Open Google Maps</a><a className="ghost" href={`tel:${STORE.phoneHref}`}>Call the store</a></div>
      </section>
      <section className="faq">
        <p className="eyebrow">STORE FAQ</p><h2>Jane Wilson Cannabis information</h2>
        <details><summary>Where is Jane Wilson Cannabis Dispensary?</summary><p>Jane Wilson Cannabis Dispensary is located at {STORE.address}.</p></details>
        <details><summary>What is the store phone number?</summary><p>The phone number is <a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a>.</p></details>
        <details><summary>What Weed flower tiers are listed?</summary><p>Exotic Weed, Premium Weed, AAA+ Weed, AA Weed, and Budget Weed.</p></details>
        <details><summary>Is JaneWilsonSmoke.com the main website?</summary><p>No. JaneWilsonSmoke.com is intended to redirect to the canonical Jane Wilson Cannabis Dispensary website.</p></details>
      </section>
      <Footer />
    </main>
  );
}
