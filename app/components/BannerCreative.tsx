import CreativePhoto from "./CreativePhoto";

export default function BannerCreative() {
  return (
    <section className="bannerSlots" aria-label="Jane Wilson store and product gallery">
      <CreativePhoto
        src="/creative/banner-hero.webp"
        alt="Cannabis flower jars on a modern green and purple retail counter"
        priority
        sizes="(max-width: 700px) 100vw, 1380px"
      />
      <div className="bannerPair">
        <CreativePhoto
          src="/creative/banner-carousel-1.webp"
          alt="Cannabis flower, a purple grinder, and rolling papers on a stone tray"
        />
        <CreativePhoto
          src="/creative/banner-carousel-2.webp"
          alt="Modern cannabis retail interior with green and purple geometric lighting"
        />
      </div>
    </section>
  );
}
