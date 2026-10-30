import Link from "next/link";
import ProductPhoto from "./ProductPhoto";
import { itemPath, type ItemProduct } from "../lib/inventory";

export default function ItemGrid({ items, catalog }: { items: ItemProduct[]; catalog?: ItemProduct[] }) {
  const pool = catalog && catalog.length ? catalog : items;
  return (
    <div className="itemGrid">
      {items.map((item) => {
        const href = itemPath(item, pool);
        return (
          <article className="itemCard" key={href}>
            <Link href={href} className="flowerImageLink">
              <ProductPhoto src={item.image} alt={item.name} sizes="(max-width: 700px) 46vw, (max-width: 1150px) 50vw, 33vw" />
            </Link>
            <div className="flowerBody">
              <h3>
                <Link href={href}>{item.name}</Link>
              </h3>
              {item.price ? <p className="flowerPriceLabel">IN-STORE PRICE</p> : null}
              <p className="itemPrice">{item.price || "Confirm at the counter"}</p>
              <div className="flowerActions">
                <Link className="flowerView" href={href}>View Details →</Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
