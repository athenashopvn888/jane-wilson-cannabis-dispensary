import { Fragment } from "react";
import Link from "next/link";
import { BANNER_SLOTS, type BannerPage } from "../lib/banners";
import styles from "./BannerSlots.module.css";
import CigaretteSeasonalNotice from "./CigaretteSeasonalNotice";

/** Renders the banner slots for a page from app/lib/banners.ts. Slots without `file` show a labelled PLACEHOLDER box. */
export default function BannerSlots({ page }: { page: BannerPage }) {
  const group = BANNER_SLOTS[page];
  const headingId = `banner-slots-${page}`;
  // Homepage: seasonal cigarette notice sits directly above the first cigarette banner.
  const isCig = (slot: { id: string; href: string }) => /cig/i.test(`${slot.id} ${slot.href}`);
  const firstCig = page === "home" ? group.slots.findIndex(isCig) : -1;
  return (
    <section className={styles.wrap} aria-labelledby={headingId} data-banner-page={page}>
      <h2 id={headingId} className={styles.heading}>{group.heading}</h2>
      <ul className={styles.grid}>
        {group.slots.map((slot, i) => (
          <Fragment key={slot.id}>
          {i === firstCig ? (
            <li style={{ gridColumn: "1 / -1", listStyle: "none" }}>
              <CigaretteSeasonalNotice />
            </li>
          ) : null}
          <li className={styles.item} data-slot={slot.id}>
            <figure className={styles.figure}>
              <Link href={slot.href} title={slot.title} className={styles.link}>
                {slot.file ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={slot.file} srcSet={slot.file800 ? `${slot.file800} 800w, ${slot.file} ${slot.w}w` : undefined} sizes="(max-width:700px) 100vw, 560px" alt={slot.alt} title={slot.title} width={slot.w} height={slot.h} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                ) : (
                  <span className={styles.placeholder} style={{ aspectRatio: `${slot.w} / ${slot.h}` }} role="img" aria-label={slot.alt} data-placeholder="true">
                    <span className={styles.slotLabel}>BANNER SLOT: {slot.label} ({slot.w}x{slot.h})</span>
                    <span className={styles.slotHint}>PLACEHOLDER: Jane Wilson art pending</span>
                  </span>
                )}
                <span className={styles.textBar}>{slot.textBar}</span>
              </Link>
              <figcaption className={styles.caption}>{slot.caption}</figcaption>
            </figure>
          </li>
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
