import CreativePhoto from "./CreativePhoto";

export default function CigsDealCreative() {
  return (
    <section className="cigsDeal" aria-label="Cigarette catalogue photography">
      <CreativePhoto
        src="/creative/cigs-deal-hero.webp"
        alt="Unbranded cigarette packs and cartons on a dark retail counter"
        sizes="(max-width: 700px) 100vw, 42vw"
      />
      <CreativePhoto
        src="/creative/cigs-pack-shot.webp"
        alt="Unbranded cigarette pack and carton product photo"
        sizes="(max-width: 700px) 100vw, 24vw"
      />
    </section>
  );
}
