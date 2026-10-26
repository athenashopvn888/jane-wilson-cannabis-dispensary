import type { Metadata } from "next";
import WeedDeliveryGuide, { type WeedDeliveryCopy } from "../components/WeedDeliveryGuide";
import { DELIVERY_HOURS_LABEL } from "../lib/deliveryHours";
import { STORE } from "../lib/store";

const PATH = "/weed-delivery-toronto";
const TITLE = "Weed Delivery in Toronto | Jane Wilson Cannabis on Jane Street";
const DESC = "Toronto weed delivery from Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12 in North York. Delivery 10 AM to 10 PM daily. Adults 19+.";

const COPY: WeedDeliveryCopy = {
  path: PATH,
  crumb: "Toronto",
  kicker: "Toronto · North York counter · 19+",
  title: TITLE,
  description: DESC,
  h1: "Toronto weed delivery from the Jane Street counter",
  paragraphs: [
    `Jane Wilson Cannabis Dispensary delivers weed from our shop at ${STORE.address} in North York. Send us your Toronto address and the dispatcher will tell you right away if you're in range.`,
    `Delivery hours are ${DELIVERY_HOURS_LABEL}. Open the delivery menu and start LIVE ORDER in Web Chat. The dispatcher confirms whether your Toronto address is in range, then confirms stock and the total. Adults 19+, photo ID at the door.`
  ],
  sections: [
    {
      heading: "What this page covers",
      paragraphs: [
        "Every Toronto order goes out from our Jane and Wilson shop, and we confirm coverage one address at a time. If you're out of range, you're always welcome to come by the shop.",
        "Delivery prices start at 7 grams and follow the delivery menu, not the in-store shelf. Buy 2g Get 1g FREE is an in-store offer for Exotic, Premium, and AAA+ only. AA, Budget, and delivery orders do not get that offer."
      ]
    },
    {
      heading: "The counter, if delivery is not the right fit",
      paragraphs: [
        `Walk in at ${STORE.street}, ${STORE.locality}. Store hours are ${STORE.hoursLabel}. The 35 Jane and 935 Jane Express stop along Jane Street at Wilson Avenue. Use Directions for the map pin, and check posted parking signs when you arrive.`,
        "Closer to Jane and Wilson or Downsview? See our North York delivery page."
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
