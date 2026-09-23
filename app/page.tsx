import Image from "next/image";
import Link from "next/link";
import AgeGate from "./components/AgeGate";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import Nav from "./components/Nav";
import RouteHubs from "./components/RouteHubs";
import { STORE, TIERS } from "./lib/store";

const faqs = [
  {
    question: "Where is Jane Wilson Cannabis Dispensary?",
    answer: `The store is at ${STORE.address}, near the Jane Street and Wilson Avenue corridor.`
  },
  {
    question: "What are the store hours?",
    answer: `Verified public hours are not yet available on this website. ${STORE.hoursStatus} at ${STORE.phone} before travelling.`
  },
  {
    question: "Which Weed flower tiers can I explore?",
    answer: "The store organizes flower into Exotic Weed, Premium Weed, AAA+ Weed, AA Weed, and Budget Weed. Current products and prices must be confirmed by the Jane Wilson store."
  },
  {
    question: "What ID do I need?",
    answer: "Cannabis retail is for adults 19+. Bring valid government-issued photo identification when you visit."
  },
  {
    question: "How do I reach Unit 12 by TTC?",
    answer: "The 35 Jane and 935 Jane Express serve the Jane Street corridor, including stops at Wilson Avenue. Check the TTC trip planner for current service before leaving."
  }
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${STORE.origin}/#webpage`,
        url: STORE.origin,
        name: "Jane Wilson Cannabis Dispensary on Jane Street",
        about: { "@id": `${STORE.origin}/#store` },
        isPartOf: { "@id": `${STORE.origin}/#website` }
      },
      {
        "@type": "FAQPage",
        "@id": `${STORE.origin}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer }
        }))
      }
    ]
  };

  return (
    <main>
      <AgeGate />
      <Nav />
      <section className="statusBar" aria-label="Store facts">
        <span>{STORE.street}</span>
        <span>{STORE.corridor}</span>
        <span>Hours: {STORE.hoursStatus}</span>
      </section>
      <section className="hero">
        <div className="heroCopy">
          <div className="heroBadge">19+ · JANE–WILSON · DOWNSVIEW</div>
          <p className="eyebrow">2111 JANE ST · UNIT 12</p>
          <h1>Jane Wilson<span>Cannabis Dispensary</span></h1>
          <p className="heroText">A Jane Street cannabis storefront serving the Jane–Wilson and Downsview corridor in North York. Plan your arrival, find Unit 12, and explore five clearly organized Weed flower tiers.</p>
          <div className="heroActions"><Link href="#weed-tiers">Explore Weed Tiers</Link><Link className="ghost" href="/visit">Plan Your Visit</Link></div>
          <p className="truthNote"><strong>Store hours:</strong> {STORE.hoursStatus}. Exact product names, availability, weights, and dollar prices are published only from the governed JWCD01 store source.</p>
        </div>
        <div className="heroArt" aria-label="Jane Wilson storefront artwork">
          <div className="heroPattern" />
          <Image className="heroProduct heroProductOne" src="/brand/front-left-grinder.png" width={1200} height={1200} sizes="(max-width: 980px) 74vw, 34vw" priority alt="Purple grinder with cannabis leaf on green and purple geometric artwork" />
          <Image className="heroProduct heroProductTwo" src="/brand/front-right-papers.png" width={1200} height={1200} sizes="(max-width: 980px) 64vw, 28vw" priority alt="Purple rolling paper package on green and purple geometric artwork" />
          <div className="heroArtLabel"><b>JANE WILSON</b><span>JANE ST · UNIT 12</span></div>
        </div>
      </section>

      <section className="artStrip" aria-label="Jane Wilson storefront design"><Image src="/brand/accessories-sign.svg" width={2300} height={240} alt="Jane Wilson smoke accessories, grinders, and rolling papers sign artwork" /></section>

      <section className="quickFacts" aria-label="Jane Wilson Cannabis store information">
        <div><span>LOCATION</span><strong>{STORE.street}</strong><small>{STORE.locality}</small></div>
        <div><span>HOURS</span><strong>Confirm before travelling</strong><a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a></div>
        <div><span>DIRECTIONS</span><strong>Jane St near Wilson Ave</strong><Link href="/visit">TTC &amp; arrival guide</Link></div>
        <div><span>AGE</span><strong>Adults 19+</strong><small>Government photo ID required</small></div>
      </section>

      <section className="tiers" id="weed-tiers">
        <p className="eyebrow">FIVE WEED COLLECTIONS</p>
        <h2>Compare the Jane Wilson flower tiers</h2>
        <p className="sectionLead">Each page explains where its tier sits in the store’s flower ladder and keeps the standard 3.5g, 7g, 14g, and 28g price positions visible. Call the Jane Wilson counter for today’s exact listings and prices.</p>
        <div className="tierGrid">
          {TIERS.map((tier, index) => (
            <Link className="tierCard" href={`/${tier.slug}`} key={tier.slug} style={{ "--tier": tier.tone } as React.CSSProperties}>
              <span className="tierNumber">0{index + 1}</span><div className="tierHex" /><h3>{tier.name}</h3><p>{tier.summary}</p><b>Explore tier <i>→</i></b>
            </Link>
          ))}
        </div>
      </section>

      <RouteHubs />

      <section className="corridorStory">
        <div>
          <p className="eyebrow">THE JANE STREET OWNER</p>
          <h2>Built around Jane–Wilson, not a city-wide template</h2>
          <p>{STORE.name} is a single storefront at {STORE.street}. The site focuses on people already travelling along Jane Street, arriving near Wilson Avenue, or coming from the Downsview area. It does not present another store’s inventory, hours, or services as Jane Wilson facts.</p>
          <div className="storyLinks"><Link href="/weed-dispensary-jane-street">Explore the Jane Street store guide →</Link><Link href="/visit">How to reach Unit 12 →</Link></div>
        </div>
        <Image src="/brand/side-window-combined.png" width={1400} height={1000} sizes="(max-width: 980px) 100vw, 48vw" alt="Jane Wilson green and purple storefront artwork featuring a grinder and rolling papers" />
      </section>

      <section className="visitPanel">
        <div><p className="eyebrow">VISIT JANE WILSON</p><h2>{STORE.street}</h2><p>{STORE.locality}</p><p className="hoursNotice">Hours: {STORE.hoursStatus}</p></div>
        <div className="visitActions"><Link href="/visit">Transit &amp; arrival guide</Link><a href={STORE.maps}>Open Google Maps</a><a className="ghost" href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a></div>
      </section>

      <section className="faq">
        <p className="eyebrow">STORE FAQ</p><h2>Jane Wilson Cannabis information</h2>
        {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
      </section>
      <Footer />
      <JsonLd data={schema} />
    </main>
  );
}
