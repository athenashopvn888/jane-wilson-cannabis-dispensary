import { FULL_NAME_NAP } from "./lib/fullNameNap";
import Image from "next/image";
import Link from "next/link";
import BannerCreative from "./components/BannerCreative";
import CigsDealCreative from "./components/CigsDealCreative";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import MenuPreviewNote from "./components/MenuPreviewNote";
import Nav from "./components/Nav";
import RouteHubs from "./components/RouteHubs";
import { SHOW_CIGARETTES } from "./lib/siteConfig";
import { STORE, TIERS } from "./lib/store";
import BannerSlots from "./components/BannerSlots";
import FleetAnnouncementBanner from "./components/fleet/FleetAnnouncementBanner";
import { CODED_BANNERS } from "./lib/fleet/config";
import { getFleetContent } from "./lib/fleetContent";

const faqs = [
  {
    question: "Where is Jane Wilson Cannabis Dispensary?",
    answer: `The store is at ${STORE.address}, near the Jane Street and Wilson Avenue corridor in Downsview.`
  },
  {
    question: "What are the store hours?",
    answer: `${STORE.name} is open ${STORE.hoursLabel}, every day of the week. Looking for one strain? Give us a call at ${STORE.phone} before you head over.`
  },
  {
    question: "Which flower tiers can I compare?",
    answer: "We carry five flower tiers: Exotic, Premium, AAA+, AA and Budget. Exotic, Premium and AAA+ come in 3g, 6g, 14g and 28g. AA and Budget come in 3g, 5g, 14g and 28g."
  },
  ...(SHOW_CIGARETTES
    ? [{
        question: "Do you list native cigarettes and nicotine vapes?",
        answer: "Yes. Native cigarettes and nicotine vapes each have a Jane Street page with current menu listings. Both are for adults 19+."
      }]
    : [{
        question: "Do you list nicotine vapes?",
        answer: "Yes. Nicotine vapes have a Jane Street page with current menu listings. Nicotine vapes are for adults 19+."
      }]),
  {
    question: "What ID do I need?",
    answer: SHOW_CIGARETTES
      ? "Cannabis, tobacco, and nicotine retail is for adults 19+. You must be 19 or older. Bring government-issued photo ID, because we ID anyone who looks under 25."
      : "Cannabis and nicotine retail is for adults 19+. You must be 19 or older. Bring government-issued photo ID, because we ID anyone who looks under 25."
  },
  {
    question: "Can I take the TTC?",
    answer: "Yes. There's a TTC stop at Jane and Wilson, about a two-minute walk from the store. Check the TTC trip planner before you leave."
  }
];

export default async function HomePage() {
  const fleet = await getFleetContent();
  const sheetBanners = fleet.active && fleet.banners.some((banner, index) => banner !== CODED_BANNERS[index]) ? fleet.banners : undefined;
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
      <Nav />
      <section className="statusBar" aria-label="Store facts">
        <span>Jane Street · North York</span>
        <span>Open daily 10:00 AM–midnight</span>
        <span>Adults 19+</span>
      </section>
      <section className="hero homeHero">
        <div className="heroCopy homeHeroCopy">
          <div className="heroBadge">JANE STREET · NORTH YORK · ADULTS 19+</div>
          <p className="eyebrow">JANE ST &amp; WILSON AVE · NORTH YORK</p>
          <h1><span>Jane Wilson Cannabis Dispensary</span>Your weed dispensary at Jane and Wilson</h1>
          <p data-fullname-subline="" style={{ margin: "4px 0 0", fontSize: "13px", fontWeight: 600, lineHeight: 1.35, opacity: 0.85, color: "inherit", overflowWrap: "anywhere" }}>{FULL_NAME_NAP.fullName}</p>
          <p className="heroText">
            {SHOW_CIGARETTES
              ? "We're a neighbourhood weed shop on Jane Street, just by Wilson Avenue. Look through the flower menu from Exotic down to Budget, check the nicotine vapes and cigarettes, then come see us at Unit 12. Open every day, 10 AM to midnight."
              : "We're a neighbourhood weed shop on Jane Street, just by Wilson Avenue. Look through the flower menu from Exotic down to Budget, check the nicotine vapes, then come see us at Unit 12. Open every day, 10 AM to midnight."}
          </p>
          <div className="heroActions">
            <Link href="#weed-tiers">See the weed menu</Link>
            <a className="ghost" href={STORE.maps}>Get directions</a>
            <Link className="ghost" href="/hours">Store hours</Link>
          </div>
          <div className="heroTrust" aria-label="Store highlights">
            <div><strong>5</strong><span>Weed tiers</span></div>
            <div><strong>Unit 12</strong><span>2111 Jane St</span></div>
            <div><strong>Daily</strong><span>10 AM–midnight</span></div>
          </div>
        </div>
        <div className="heroArt homeHeroArt" aria-label="Jane Wilson cannabis retail artwork">
          <Image src="/creative/banner-hero.webp" fill sizes="(max-width: 1050px) 100vw, 55vw" priority alt="Cannabis flower jars on a modern green and purple retail counter" />
          <div className="homeHeroArtShade" />
          <div className="heroArtLabel"><b>JANE × WILSON</b><span>NORTH YORK · ONTARIO</span></div>
          <div className="heroArtAddress"><span>Visit the store</span><strong>{STORE.street}</strong><small>{STORE.locality}</small></div>
        </div>
      </section>

      {sheetBanners ? <FleetAnnouncementBanner banners={sheetBanners} /> : <BannerSlots page="home" />}

      <section className="brandStatement" aria-labelledby="brand-statement-title">
        <div>
          <p className="eyebrow">HOW OUR FLOWER MENU WORKS</p>
          <h2 id="brand-statement-title">Five flower tiers,<br /><em>from top shelf to everyday.</em></h2>
        </div>
        <div>
          <p>Exotic, Premium and AAA+ come in 3g, 6g, 14g and 28g. AA and Budget come in 3g, 5g, 14g and 28g. Every tier has its own page, so you can see what&apos;s on the menu before you head over.</p>
          <div className="brandStatementLinks"><Link href="/exotic-weed">See Exotic Weed →</Link><Link href="/visit">Get directions →</Link></div>
        </div>
      </section>

      <section className="artStrip" aria-label="Jane Wilson storefront design">
        <Image src="/brand/accessories-sign.svg" width={2300} height={240} alt="Jane Wilson smoke accessories, grinders, and rolling papers sign artwork" />
      </section>

      <section className="quickFacts" aria-label="Jane Wilson Cannabis store information">
        <div><span>LOCATION</span><strong>{STORE.street}</strong><small>{STORE.locality}</small></div>
        <div><span>HOURS</span><strong>{STORE.hoursLabel}</strong><Link href="/hours">Full hours</Link></div>
        <div><span>DIRECTIONS</span><strong>Jane St near Wilson Ave</strong><Link href="/visit">Directions &amp; TTC</Link></div>
        <div><span>AGE</span><strong>Adults 19+</strong><small>Bring photo ID. We ID anyone who looks under 25.</small></div>
      </section>

      <section className="tiers" id="weed-tiers">
        <p className="eyebrow">OUR FLOWER TIERS</p>
        <h2>Compare the Jane Wilson flower tiers</h2>
        <p className="sectionLead">Tap a tier to see what&apos;s on its menu. Exotic, Premium and AAA+ come in 6g packs, and AA has a true 5g. The menu changes, so call or drop in if you&apos;re after one strain.</p>
        <MenuPreviewNote />
        <div className="tierGrid">
          {TIERS.map((tier, index) => (
            <Link className="tierCard" href={`/${tier.slug}`} key={tier.slug} style={{ "--tier": tier.tone } as React.CSSProperties}>
              <span className="tierNumber">0{index + 1}</span>
              <div className="tierHex" />
              <h3>{tier.name}</h3>
              <p>{tier.summary}</p>
              <b>Explore tier <i>→</i></b>
            </Link>
          ))}
        </div>
      </section>

      <BannerCreative />

      <RouteHubs />

      {SHOW_CIGARETTES ? (
      <section className="cigsDealBand">
        <div>
          <p className="eyebrow">NATIVE CIGARETTES</p>
          <h2>Native cigarettes on Jane Street</h2>
          <p>For adults 19+. See the cigarette list, then pick up at Unit 12 any day from 10 AM to midnight.</p>
          <Link href="/native-cigarettes-jane-street">Open native cigarettes →</Link>
        </div>
        <CigsDealCreative />
      </section>
      ) : null}

      <section className="corridorStory">
        <div>
          <p className="eyebrow">JANE–WILSON · DOWNSVIEW</p>
          <h2>Your local shop at Jane and Wilson</h2>
          <p>{STORE.name} is at {STORE.street}, right on Jane Street by Wilson Avenue. It&apos;s a quick stop if you live in Downsview, work along Jane, or are passing through North York. We&apos;re open {STORE.hoursLabel}.</p>
          <div className="storyLinks">
            <Link href="/weed-dispensary-jane-street">Explore the Jane Street store guide →</Link>
            <Link href="/visit">Directions to Unit 12 →</Link>
            <Link href="/resources">Jane Street resources →</Link>
            <Link href="/menu">In-store menu →</Link>
            <Link href="/nicotine-vapes-jane-street">Nicotine vapes on Jane Street →</Link>
          </div>
        </div>
        <Image src="/brand/side-window-combined.png" width={1400} height={1000} sizes="(max-width: 980px) 100vw, 48vw" alt="Jane Wilson green and purple storefront artwork featuring a grinder and rolling papers" />
      </section>

      <section className="visitPanel">
        <div>
          <p className="eyebrow">VISIT JANE WILSON</p>
          <h2>{STORE.street}</h2>
          <p>{STORE.locality}</p>
          <p className="hoursNotice">Hours: {STORE.hoursLabel}</p>
        </div>
        <div className="visitActions">
          <a href={STORE.maps}>Open Google Maps</a>
          <Link href="/visit">Directions &amp; TTC</Link>
          <a className="ghost" href={`tel:${STORE.phoneHref}`}>Call {STORE.phone}</a>
        </div>
      </section>

      <section className="faq">
        <p className="eyebrow">STORE FAQ</p>
        <h2>Jane Wilson Cannabis Dispensary FAQs</h2>
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
      <Footer />
      <JsonLd data={schema} />
    </main>
  );
}
