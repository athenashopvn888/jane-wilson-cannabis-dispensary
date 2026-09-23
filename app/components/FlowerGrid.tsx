import Link from "next/link";
import ProductPhoto from "./ProductPhoto";
import { FLOWER_PRICE_FIELDS, flowerPath, formatFlowerPrice, type FlowerProduct } from "../lib/inventory";
import { WEIGHTS } from "../lib/store";

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
              {WEIGHTS.map((label) => {
                const price = formatFlowerPrice(flower[FLOWER_PRICE_FIELDS[label]]);
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
          </div>
        </article>
      ))}
    </div>
  );
}
