import Link from "next/link";
import ProductPhoto from "./ProductPhoto";
import { availableFlowerPrices, flowerPath, formatFlowerPrice, type FlowerProduct } from "../lib/inventory";

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
          </div>
        </article>
      ))}
    </div>
  );
}
