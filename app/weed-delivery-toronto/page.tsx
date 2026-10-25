import type { Metadata } from "next";
import WeedDeliveryGuide, { type WeedDeliveryCopy } from "../components/WeedDeliveryGuide";
import { DELIVERY_HOURS_LABEL } from "../lib/deliveryHours";
import { STORE } from "../lib/store";

const PATH = "/weed-delivery-toronto";
const TITLE = "Weed Delivery in Toronto | Jane Wilson Cannabis on Jane Street";
const DESC = "Toronto weed delivery from Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12 in North York. One counter. Delivery hours 10:00 a.m. to 10:00 p.m. daily. Adults 19+.";

const COPY: WeedDeliveryCopy = {
  path: PATH,
  crumb: "Toronto",
  kicker: "Toronto · North York counter · 19+",
  title: TITLE,
  description: DESC,
  h1: "Toronto weed delivery from the Jane Street counter",
  paragraphs: [
    `Jane Wilson Cannabis Dispensary is one store at ${STORE.address}. North York is inside Toronto, and this page is for Toronto customers asking about weed delivery from that counter. It is not a city-wide directory and it does not add another Jane Wilson location.`,
    `Delivery hours are ${DELIVERY_HOURS_LABEL}. Open the delivery menu and start LIVE ORDER in Web Chat. The dispatcher confirms whether your Toronto address is in range, then confirms stock and the total. Adults 19+, photo ID at the door.`
  ],
  sections: [
    {
      heading: "What this page covers",
      paragraphs: [
        "Searchers looking for weed delivery in Toronto still order from the Jane and Wilson counter. Coverage is confirmed one address at a time. If the dispatcher cannot take the address, the walk-in counter is the other option.",
        "Delivery prices start at 7 grams and follow the delivery menu, not the in-store shelf. Buy 2g Get 1g FREE is an in-store offer for Exotic, Premium, and AAA+ only. AA, Budget, and delivery orders do not get that offer."
      ]
    },
    {
      heading: "The counter, if delivery is not the right fit",
      paragraphs: [
        `Walk in at ${STORE.street}, ${STORE.locality}. Store hours are ${STORE.hoursLabel}. The 35 Jane and 935 Jane Express stop along Jane Street at Wilson Avenue. Use Directions for the map pin, and check posted parking signs when you arrive.`,
        "For the Jane–Wilson and Downsview corridor specifically, use the North York delivery page. This Toronto page stays on the city question: one counter, delivery hours, and a live order chat."
      ]
    }
  ],
  faqs: [
    { q: "Do you deliver anywhere in Toronto?", a: `Orders start at ${STORE.street} in North York. Delivery hours are ${DELIVERY_HOURS_LABEL}. The dispatcher confirms the address. This is not a promise of city-wide coverage.` },
    { q: "Where is the store?", a: `${STORE.name} is at ${STORE.address}, on Jane Street near Wilson Avenue.` },
    { q: "How do I place the order?", a: "Open the delivery menu, choose LIVE ORDER, and send your choices in Web Chat with a Canadian mobile number." },
    { q: "Can I get the in-store free gram on delivery?", a: "No. Buy 2g Get 1g FREE is only for Exotic, Premium, and AAA+ bought at the counter." }
  ],
  related: [
    { href: "/delivery", label: "Delivery menu" },
    { href: "/weed-delivery-north-york", label: "North York weed delivery" },
    { href: "/visit", label: "Visit Unit 12" },
    { href: "/weed-dispensary-jane-street", label: "Jane Street store" },
    { href: "/hours", label: "Store hours" },
    { href: "/dispensary-near-me", label: "Dispensary near me" }
  ],
  areaServed: ["Toronto", "North York"]
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: `${STORE.origin}${PATH}` },
  openGraph: { title: TITLE, description: DESC, url: `${STORE.origin}${PATH}`, type: "website" }
};

export default function WeedDeliveryTorontoPage() {
  return <WeedDeliveryGuide copy={COPY} />;
}
