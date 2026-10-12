import Link from "next/link";
import ProductPhoto from "./ProductPhoto";
import { FreeGramCardLine } from "./FreeGramPromo";
import { availableFlowerPrices, flowerPath, formatFlowerPrice, type FlowerProduct } from "../lib/inventory";

function freeGram3g(point: { regular: number; sale: number | null } | null | undefined) {
  if (!point || typeof point.regular !== "number" || point.regular <= 0) return null;
  const amount = typeof point.sale === "number" && point.sale > 0 && point.sale !== point.regular ? point.sale : point.regular;
  return { amount, regular: point.regular };
}

function typeLabel(type: string) {
  if (!type) return "Flower";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function FlowerGrid({ flowers }: { flowers: FlowerProduct[] }) {
  return (
    <div className="flowerGrid">
      {flowers.map((flower) => (
        <article className="flowerCard" key={`${flower.tier}-${flower.sku}-${flower.slug}`}>
          <Link href={flowerPath(flower)} className="flowerImageLink">
            <ProductPhoto src={flower.image} alt={flower.name} />
          </Link>
          <div className="flowerBody">
            <p className="flowerMeta">
              <span>{typeLabel(flower.type)}</span>
              {flower.thc ? <span>THC {flower.thc}</span> : null}
              {flower.isSale ? <span className="salePill">Sale</span> : null}
            </p>
            <h3>
              <Link href={flowerPath(flower)}>{flower.name}</Link>
            </h3>
            <dl className="weightPrices">
              {availableFlowerPrices(flower).map(({ label, point }) => {
                const price = formatFlowerPrice(point);
                return (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>
                      <strong>{price.current}</strong>
                      {price.compare ? <s>{price.compare}</s> : null}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <FreeGramCardLine name={flower.name} tier={flower.tier} price3g={freeGram3g(flower.price3g)} show6g={false} />
          </div>
        </article>
      ))}
    </div>
  );
}
