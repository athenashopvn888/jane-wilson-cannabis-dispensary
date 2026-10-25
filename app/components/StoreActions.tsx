import { STORE } from "../lib/store";
import styles from "../jwc-pages.module.css";

/** Store visit actions. Directions is the primary button, with hours beside it and Call Store as a smaller link. */
export default function StoreActions() {
  return (
    <div className={styles.storeActions} aria-label="Store visit">
      <a className={styles.callBtn} href={STORE.maps} target="_blank" rel="noreferrer">Directions</a>
      <span className={styles.hoursBeside}>Hours: {STORE.hoursLabel}</span>
      <a className={styles.callStore} href={`tel:${STORE.phoneHref}`}>Call Store</a>
    </div>
  );
}
