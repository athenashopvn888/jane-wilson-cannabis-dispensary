import Link from "next/link";
import { homeMobileLeadBanner, mobileLeadHideCss, type MobileLeadBannerModel } from "../lib/mobileLeadBanner.ts";
import type { ResolvedBanner } from "../lib/fleet/types.ts";
import styles from "./MobileLeadBanner.module.css";

const DESKTOP_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function sourcesFor(banner: MobileLeadBannerModel) {
  if (!banner.src800) return { src: banner.src, srcSet: undefined, sizes: undefined };
  return {
    src: banner.src800,
    srcSet: `${banner.src800} 800w, ${banner.src} ${banner.width}w`,
    sizes: "100vw",
  };
}

export default function MobileLeadBanner({ sheetBanners }: { sheetBanners?: ResolvedBanner[] }) {
  const banner = homeMobileLeadBanner(sheetBanners);
  if (!banner?.src) return null;
  const sources = sourcesFor(banner);
  const local = banner.src.startsWith("/") && (!banner.src800 || banner.src800.startsWith("/"));
  return (
    <section className={styles.lead} data-mobile-lead-banner={banner.slotId} aria-label={banner.title}>
      <style>{mobileLeadHideCss(banner)}</style>
      {local ? (
        <link
          rel="preload"
          as="image"
          href={sources.src}
          imageSrcSet={sources.srcSet}
          imageSizes={sources.sizes}
          media="(max-width: 767px)"
          fetchPriority="high"
        />
      ) : null}
      <figure className={styles.figure}>
        <Link href={banner.href} title={banner.title} className={styles.link}>
          <picture>
            {/* Desktop selects this inline pixel so the real file is not fetched again. */}
            <source media="(min-width: 768px)" srcSet={DESKTOP_PIXEL} />
            <img
              className={styles.image}
              src={sources.src}
              srcSet={sources.srcSet}
              sizes={sources.sizes}
              alt={banner.alt}
              title={banner.title}
              width={banner.width}
              height={banner.height}
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </picture>
          <span className={styles.textBar}>{banner.textBar}</span>
        </Link>
        <figcaption className={styles.caption}>{banner.caption}</figcaption>
      </figure>
    </section>
  );
}
