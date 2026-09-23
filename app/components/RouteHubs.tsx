import Link from "next/link";
import { LOCAL_ROUTES, TIERS } from "../lib/store";

export default function RouteHubs() {
  return (
    <section className="routeHubs" aria-labelledby="route-hubs-title">
      <p className="eyebrow">PLAN YOUR VISIT · EXPLORE THE MENU</p>
      <h2 id="route-hubs-title">Everything for the Jane–Wilson location</h2>
      <div className="hubGrid">
        {LOCAL_ROUTES.map((route) => (
          <Link className="hubCard hubCardLocal" href={route.href} key={route.href}>
            <span>LOCAL GUIDE</span>
            <h3>{route.label}</h3>
            <p>{route.detail}</p>
            <b>Open guide →</b>
          </Link>
        ))}
        {TIERS.map((tier) => (
          <Link
            className="hubCard"
            href={`/${tier.slug}`}
            key={tier.slug}
            style={{ "--tier": tier.tone } as React.CSSProperties}
          >
            <span>WEED TIER</span>
            <h3>{tier.name}</h3>
            <p>{tier.summary}</p>
            <b>Explore {tier.name} →</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
