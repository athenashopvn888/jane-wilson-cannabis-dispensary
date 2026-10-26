import Link from "next/link";
import ProductPhoto from "./ProductPhoto";
import { itemPath, type ItemProduct } from "../lib/inventory";

export default function ItemGrid({ items }: { items: ItemProduct[] }) {
  return (
    <div className="itemGrid">
      {items.map((item) => (
        <article className="itemCard" key={item.sku}>
          <Link href={itemPath(item)} className="flowerImageLink">
            <ProductPhoto src={item.image} alt={item.name} sizes="(max-width: 700px) 46vw, (max-width: 1150px) 50vw, 33vw" />
          </Link>
          <div className="flowerBody">
            <h3>
              <Link href={itemPath(item)}>{item.name}</Link>
            </h3>
            {item.price ? <p className="flowerPriceLabel">IN-STORE PRICE</p> : null}
            <p className="itemPrice">{item.price || "Confirm at the counter"}</p>
            <div className="flowerActions">
              <Link className="flowerView" href={itemPath(item)}>View Details →</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
