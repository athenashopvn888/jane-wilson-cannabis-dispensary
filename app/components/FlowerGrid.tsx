import FlowerMenuCard from "./FlowerMenuCard";
import { isFreeGramTier } from "./FreeGramPromo";
import { availableFlowerPrices, flowerPath, type FlowerProduct } from "../lib/inventory";

function gramsFor(tier: string, label: string) {
  if (isFreeGramTier(tier) && label === "5g") return 6;
  const grams = Number.parseInt(label, 10);
  return Number.isFinite(grams) ? grams : 0;
}

export default function FlowerGrid({ flowers }: { flowers: FlowerProduct[] }) {
  return (
    <div className="flowerGrid">
      {flowers.map((flower) => (
        <FlowerMenuCard
          key={`${flower.tier}-${flower.sku}-${flower.slug}`}
          name={flower.name}
          type={flower.type}
          thc={flower.thc}
          isSale={flower.isSale}
          tier={flower.tier}
          href={flowerPath(flower)}
          image={flower.image}
          weights={availableFlowerPrices(flower).map(({ label, point }) => ({
            label: isFreeGramTier(flower.tier) && label === "5g" ? "6g" : label,
            grams: gramsFor(flower.tier, label),
            regular: typeof point.regular === "number" ? point.regular : 0,
            sale: typeof point.sale === "number" ? point.sale : null,
          }))}
        />
      ))}
    </div>
  );
}
