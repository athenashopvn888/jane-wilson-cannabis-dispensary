import TvAutoRefresh from "../components/TvAutoRefresh";
import {
  FLOWER_PRICE_FIELDS,
  flowersForTier,
  formatFlowerPrice,
  getMenu,
} from "../lib/inventory";
import { STORE, TIERS, WEIGHTS } from "../lib/store";
import styles from "./tv.module.css";

export const revalidate = 300;

export default async function TvPage() {
  const menu = await getMenu();

  return (
    <main className={styles.screen}>
      <TvAutoRefresh />
      <header className={styles.header}>
        <div>
          <p>{STORE.corridor}</p>
          <h1>{STORE.shortName}</h1>
        </div>
        <div className={styles.storeFacts}>
          <strong>{STORE.street}</strong>
          <span>{STORE.hoursLabel}</span>
          <span>Adults 19+</span>
        </div>
      </header>

      <div className={styles.tierGrid}>
        {TIERS.map((tier) => {
          const flowers = flowersForTier(menu.flowers, tier.slug);
          return (
            <section className={styles.tier} key={tier.slug} style={{ "--tier": tier.tone } as React.CSSProperties}>
              <h2>{tier.name}</h2>
              <div className={styles.tableHead}>
                <span>Flower</span>
                {WEIGHTS.map((weight) => <span key={weight}>{weight}</span>)}
              </div>
              <div className={styles.rows}>
                {flowers.map((flower) => (
                  <div className={styles.row} key={flower.sku}>
                    <span className={styles.flowerName}>{flower.name}</span>
                    {WEIGHTS.map((weight) => {
                      const value = formatFlowerPrice(flower[FLOWER_PRICE_FIELDS[weight]]);
                      return (
                        <span className={styles.price} key={weight}>
                          {value.compare && <del>{value.compare}</del>}
                          <b>{value.current}</b>
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
