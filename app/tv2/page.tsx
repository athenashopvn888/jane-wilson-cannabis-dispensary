import TvAutoRefresh from "../components/TvAutoRefresh";
import { cigaretteItems, getMenu, nicotineVapeItems, type ItemProduct } from "../lib/inventory";
import { STORE } from "../lib/store";
import styles from "./tv2.module.css";

export const revalidate = 300;

function ItemBoard({ title, items }: Readonly<{ title: string; items: ItemProduct[] }>) {
  return (
    <section className={styles.board}>
      <h2>{title}</h2>
      <div className={styles.rows}>
        {items.map((item) => (
          <div className={styles.row} key={item.sku}>
            <div>
              <strong>{item.name}</strong>
              <span>{[item.type, item.thc, item.mg].filter(Boolean).join(" · ")}</span>
            </div>
            <b>{item.price}</b>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function Tv2Page() {
  const menu = await getMenu();
  const cigarettes = cigaretteItems(menu.items);
  const nicotineVapes = nicotineVapeItems(menu.items);

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
      <div className={styles.grid}>
        <ItemBoard title="Native Cigarettes" items={cigarettes} />
        <ItemBoard title="Nicotine Vapes" items={nicotineVapes} />
      </div>
    </main>
  );
}
