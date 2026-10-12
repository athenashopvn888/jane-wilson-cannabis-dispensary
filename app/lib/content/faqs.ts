/** FAQ copy reused from AVC01 (app/lib/content/menuCopy.ts) with the store details swapped to Jane Wilson. */
export type Faq = { id?: string; q: string; a: string };

export const PRICE_RULE_FAQ: Faq = { id: "delivery-price-rule", q: "Why are delivery prices different from in-store prices?", a: "Store and delivery are two separate menus. Delivery uses bulk pricing: larger packages, starting at 7 grams, with a minimum order, so the price is set for bigger orders brought to your door. In-store prices and deals, like Buy 2g Get 1g FREE, are for smaller amounts you pick up in person, and they don't apply to delivery. If you only want a small amount or want it right now, our store on Jane Street is the fastest way to get it." };

export const STORE_PRICE_ON_DELIVERY_FAQ: Faq = { id: "store-price-on-delivery", q: "Can I get the store price on a delivery order?", a: "No. Delivery orders always use delivery prices, and store prices only apply to in-store purchases. See the answer above for why." };

export const HOME_FAQS: Faq[] = [
  { q: "Where is Jane Wilson Cannabis Dispensary?", a: "At 2111 Jane St, Unit 12, North York, ON M3M 1A2, near Jane Street and Wilson Avenue." },
  { q: "What is the phone number?", a: "(437) 465-7700." },
  { q: "What are your hours?", a: "Open daily from 10:00 AM to 12:00 AM (midnight)." },
  { q: "Do I need ID?", a: "Yes. Adults 19+ must show valid government-issued photo ID, in store and at delivery." },
  { q: "How does delivery work?", a: "Browse the delivery menu and call us on (437) 465-7700 to place your order. Delivery starts at 7 grams and has a minimum order. Open the delivery page to get started." },
  { q: "What flower weights do you sell?", a: "In store: 3g, 6g, 14g and 28g on Exotic, Premium and AAA+, and 3g, 5g, 14g and 28g on AA and Budget, depending on the strain." },
  { q: "Where can I see what you have today?", a: "Open our menu page, or call us on (437) 465-7700." }
];
