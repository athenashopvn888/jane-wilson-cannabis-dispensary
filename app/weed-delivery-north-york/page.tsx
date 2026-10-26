import type { Metadata } from "next";
import WeedDeliveryGuide, { type WeedDeliveryCopy } from "../components/WeedDeliveryGuide";
import { DELIVERY_HOURS_LABEL } from "../lib/deliveryHours";
import { STORE } from "../lib/store";

const PATH = "/weed-delivery-north-york";
const TITLE = "Weed Delivery in North York | Jane Wilson Cannabis Dispensary";
const DESC = "Weed delivery in North York from Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12, near Wilson Avenue and Downsview. Delivery hours 10:00 a.m. to 10:00 p.m. daily. Adults 19+.";

const COPY: WeedDeliveryCopy = {
  path: PATH,
  crumb: "North York",
  kicker: "North York · Jane and Wilson · 19+",
  title: TITLE,
  description: DESC,
  h1: "Weed delivery in North York from Jane Wilson",
  paragraphs: [
    `Jane Wilson Cannabis Dispensary delivers weed across North York from our shop at ${STORE.street}, ${STORE.locality}: Jane and Wilson, Downsview and the neighbourhoods around them.`,
    `Delivery hours are ${DELIVERY_HOURS_LABEL}. The walk-in counter is open ${STORE.hoursLabel}. Open the delivery menu, then use LIVE ORDER in Web Chat. The dispatcher confirms whether your address is covered, what is in stock, and the total. Adults 19+, photo ID at the door.`
  ],
  sections: [
    {
      heading: "Ordering from the Jane Street counter",
      paragraphs: [
        "Delivery uses its own bulk menu, starting at 7 grams, with a minimum order. Those prices are separate from the jars you buy in person. In-store Buy 2g Get 1g FREE is only for Exotic, Premium, and AAA+ at the counter. It does not apply to a delivery order.",
        "Have a Canadian mobile number ready. New customers complete a private ID check in the chat. Returning customers use the same mobile number as their account. Nothing is reserved until the dispatcher confirms it."
      ]
    },
    {
      heading: "If you would rather walk in",
      paragraphs: [
        `The shop is at ${STORE.address}, a short walk from the TTC stop at Jane and Wilson. There's no dedicated lot, so check the posted signs. We're open ${STORE.hoursLabel}.`
      ]
    }
  ],
  faqs: [
    { q: "Do you deliver in North York?", a: `Jane Wilson Cannabis Dispensary takes delivery orders from ${STORE.street} in North York. Delivery hours are ${DELIVERY_HOURS_LABEL}. The dispatcher confirms your address before the order is accepted.` },
    { q: "Is this a different store from the Jane Street counter?", a: `No. Delivery orders go out from our shop at ${STORE.address}.` },
    { q: "What are the walk-in hours?", a: `The counter is open ${STORE.hoursLabel}. Delivery hours are shorter: ${DELIVERY_HOURS_LABEL}.` },
    { q: "Does the free-gram offer apply?", a: "Only in the store, and only on Exotic, Premium, and AAA+. Delivery orders use delivery prices." }
  ],
  related: [
    { href: "/delivery", label: "Delivery menu" },
    { href: "/weed-delivery-toronto", label: "Toronto weed delivery" },
    { href: "/visit", label: "Visit Unit 12" },
    { href: "/weed-dispensary-jane-street", label: "Jane Street store" },
    { href: "/hours", label: "Store hours" },
    { href: "/exotic-weed", label: "Exotic Weed" },
    { href: "/premium-weed", label: "Premium Weed" },
    { href: "/aaa-weed", label: "AAA+ Weed" }
  ],
  areaServed: ["North York", "Jane and Wilson", "Downsview"]
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: `${STORE.origin}${PATH}` },
  openGraph: { title: TITLE, description: DESC, url: `${STORE.origin}${PATH}`, type: "website" }
};

export default function WeedDeliveryNorthYorkPage() {
  return <WeedDeliveryGuide copy={COPY} />;
}
