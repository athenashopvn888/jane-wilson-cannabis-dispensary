"use client";

import { useState } from "react";
import Link from "next/link";
import ProductPhoto from "./ProductPhoto";
import {
  BOGO_BUY_2_GET_1,
  BOGO_BUY_3_GET_3,
  formatPackDollars,
  formatPackPerGram,
  isFreeGramTier,
  packPaid,
} from "./FreeGramPromo";

export interface FlowerCardWeight {
  label: string;
  grams: number;
  regular: number;
  sale: number | null;
}

function typeTone(type: string) {
  const value = type.toLowerCase();
  if (value === "indica") return "flowerTypeIndica";
  if (value === "sativa") return "flowerTypeSativa";
  if (value === "hybrid") return "flowerTypeHybrid";
  return "flowerTypeOther";
}

export default function FlowerMenuCard({
  name,
  type,
  thc,
  isSale,
  tier,
  href,
  image,
  weights,
}: {
  name: string;
  type: string;
  thc: string;
  isSale: boolean;
  tier: string;
  href: string;
  image: string;
  weights: FlowerCardWeight[];
}) {
  const priced = weights.filter((weight) => packPaid(weight) !== null && weight.grams > 0);
  const [selected, setSelected] = useState(0);
  const active = priced[selected] ?? priced[0];
  const paid = active ? packPaid(active) : null;
  const anchor = priced.find((weight) => weight.label === "3g");
  const six = priced.find((weight) => weight.label === "6g");
  const anchorPaid = anchor ? packPaid(anchor) : null;
  const sixPaid = six ? packPaid(six) : null;
  const bogo = isFreeGramTier(tier) && (anchorPaid !== null || sixPaid !== null);
  const compare = active && paid !== null && typeof active.sale === "number" && active.sale > 0 && active.sale !== active.regular
    ? formatPackDollars(active.regular)
    : null;
  const oldPerGram = bogo && anchor && anchor.regular > 0 ? `${formatPackDollars(anchor.regular / 2)}/g` : null;
  const effective = active && paid !== null ? formatPackPerGram(paid, active.grams) : null;
  let promo: string | null = null;
  if (bogo && active && paid !== null && active.label === "3g") {
    promo = `${BOGO_BUY_2_GET_1} / Pay ${formatPackDollars(paid)} = ${active.grams}g`;
  } else if (bogo && active && paid !== null && active.label === "6g") {
    promo = `${BOGO_BUY_3_GET_3} / Pay ${formatPackDollars(paid)} = ${active.grams}g`;
  }
  const hint = bogo && six && sixPaid !== null && active && active.label !== "6g"
    ? `6g → ${formatPackPerGram(sixPaid, six.grams)}`
    : null;

  return (
    <article className="flowerCard" data-flower-card={name}>
      <Link href={href} className="flowerImageLink">
        <ProductPhoto src={image} alt={name} sizes="(max-width: 700px) 46vw, (max-width: 1150px) 50vw, 33vw" />
        {thc ? <span className="flowerThc">THC {thc}</span> : null}
        {isSale ? <span className="flowerSale">Sale</span> : null}
      </Link>
      <div className="flowerBody">
        <span className={`flowerType ${typeTone(type)}`}>{type || "Flower"}</span>
        <h3>
          <Link href={href}>{name}</Link>
        </h3>
        {active && paid !== null ? (
          <div className="flowerQuote">
            <p className="flowerPriceLabel">IN-STORE PRICE</p>
            <div className="flowerPriceRow">
              <p className="flowerPriceGroup">
                <strong className="flowerPriceMain">{formatPackDollars(paid)}</strong>
                {compare ? <s className="flowerPriceOld">{compare}</s> : null}
              </p>
              <p className="flowerPerGrams">
                {oldPerGram ? <s>{oldPerGram}</s> : null}
                {effective ? <span className="flowerPerGram">{effective}</span> : null}
              </p>
            </div>
            {promo ? <p className="flowerPromo">{promo}</p> : null}
            {hint ? <p className="flowerHint">{hint}</p> : null}
          </div>
        ) : null}
        <div className="flowerActions">
          {priced.length > 0 ? (
            <div className="flowerSizes" role="group" aria-label={`${name} sizes`}>
              {priced.map((weight, index) => {
                const amount = packPaid(weight);
                const on = index === (priced[selected] ? selected : 0);
                return (
                  <button
                    key={weight.label}
                    type="button"
                    className={on ? "flowerSize isSelected" : "flowerSize"}
                    aria-pressed={on}
                    onClick={() => setSelected(index)}
                  >
                    <b>{weight.label}</b>
                    <span>{amount !== null ? formatPackDollars(amount) : ""}</span>
                  </button>
                );
              })}
            </div>
          ) : null}
          <Link className="flowerView" href={href}>View Details →</Link>
        </div>
      </div>
    </article>
  );
}
