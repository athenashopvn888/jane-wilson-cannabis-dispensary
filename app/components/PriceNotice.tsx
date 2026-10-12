import Link from "next/link";

/** In-store vs delivery price rule. Same wording as every fleet site; links to the FAQ answer. */
export default function PriceNotice({ scope }: { scope: "store" | "delivery" }) {
  return scope === "store" ? (
    <p className="price-rule-notice"><strong>IN-STORE PRICES ONLY.</strong> These prices do not apply to delivery orders. Delivery has its own prices. Why? <Link href="/faq#delivery-price-rule">See the FAQ</Link></p>
  ) : (
    <p className="price-rule-notice delivery-price-rule"><strong>DELIVERY PRICES ONLY.</strong> Delivery orders are charged these prices, not in-store prices. <Link href="/faq#delivery-price-rule">See the FAQ</Link></p>
  );
}
