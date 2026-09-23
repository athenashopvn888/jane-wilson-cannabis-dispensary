import Link from "next/link";
import ProductPhoto from "./ProductPhoto";
import { itemPath, type ItemProduct } from "../lib/inventory";

export default function ItemGrid({ items }: { items: ItemProduct[] }) {
  return (
    <div className="itemGrid">
      {items.map((item) => (
        <article className="itemCard" key={item.sku}>
          <Link href={itemPath(item)} className="flowerImageLink">
            <ProductPhoto src={item.image} alt={item.name} />
          </Link>
          <div className="flowerBody">
            <h3>
              <Link href={itemPath(item)}>{item.name}</Link>
            </h3>
            <p className="itemPrice">{item.price || "Confirm at the counter"}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
