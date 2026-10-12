import { formatCurrency, pricingView, type DeliveryProduct } from "../lib/pricing";

/** Same chips and promo lines as After Dark (MJ01): compact weights, MEMBER LOYALTY 28g, N x 28g DEAL, STANDARD 28g. */
export default function PriceBlock({ product }: { product: DeliveryProduct }) {
  const v = pricingView(product);
  return (
    <div className="pb">
      {v.compact.length > 0 && <div className="pb-compact">{v.compact.map((o) => <span key={o.key}>{o.label} <strong>{formatCurrency(o.price)}</strong></span>)}</div>}
      <div className="pb-decision">
        {v.loyalty !== null && <span className="pb-loyalty"><small>MEMBER LOYALTY 28g</small><strong>{formatCurrency(v.loyalty)}</strong></span>}
        {v.bundles.map((b, i) => <span key={`${b.quantity}-${i}`}><small>{b.quantity} × 28g DEAL</small><strong>{formatCurrency(b.each)} each</strong><em>{formatCurrency(b.total)} total</em></span>)}
        {v.standard28 !== null && <span><small>STANDARD 28g</small><strong>{formatCurrency(v.standard28)}</strong></span>}
      </div>
    </div>
  );
}
