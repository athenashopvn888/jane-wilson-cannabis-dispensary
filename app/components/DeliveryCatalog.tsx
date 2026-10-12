"use client";
import { useEffect, useMemo, useState } from "react";
import PriceBlock from "./PriceBlock";
import { sortProducts, TIER_ORDER, type DeliveryProduct } from "../lib/pricing";

type Filter = "ALL" | (typeof TIER_ORDER)[number];
const FILTERS: Filter[] = ["ALL", ...TIER_ORDER];

export default function DeliveryCatalog({ products }: { products: DeliveryProduct[] }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<DeliveryProduct | null>(null);

  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [selected]);

  const visible = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return sortProducts(products.filter((p) => (filter === "ALL" || p.tier === filter) && (!needle || `${p.name} ${p.category || ""} ${p.strain || ""}`.toLowerCase().includes(needle))));
  }, [products, filter, search]);

  return (
    <section className="dl" aria-label="Delivery catalog">
      <div className="dl-tools">
        <div className="dl-filters" role="group" aria-label="Flower tiers">
          {FILTERS.map((t) => (
            <button type="button" key={t} className={filter === t ? "on" : ""} aria-pressed={filter === t} onClick={() => setFilter(t)}>
              {t}<span>{t === "ALL" ? products.length : products.filter((p) => p.tier === t).length}</span>
            </button>
          ))}
        </div>
        <label className="dl-search"><span>Search products</span><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Product or strain" /></label>
      </div>
      <p className="dl-count">{visible.length} products</p>
      <div className="cards">
        {visible.map((p) => (
          <article className="card" key={p.publicProductId}>
            <button type="button" className="dl-img" onClick={() => setSelected(p)} aria-label={`View details for ${p.name}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.images?.[0] ? <img src={p.images[0]} alt={`${p.name} cannabis delivery in North York`} title={p.name} width={400} height={300} loading="lazy" decoding="async" /> : <span>Jane Wilson Cannabis</span>}
            </button>
            <div className="dl-badges"><span>{p.tier}</span>{p.category && <span>{p.category}</span>}</div>
            <h3><button type="button" className="dl-name" onClick={() => setSelected(p)}>{p.name}</button></h3>
            <PriceBlock product={p} />
            <button type="button" className="dl-details" onClick={() => setSelected(p)}>View details</button>
          </article>
        ))}
      </div>
      {visible.length === 0 && <p className="notice">No products match that search.</p>}
      {selected && (
        <div className="dl-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          <section className="dl-drawer" role="dialog" aria-modal="true" aria-labelledby="dl-title">
            <header><strong>Product details</strong><button type="button" onClick={() => setSelected(null)} aria-label="Close product details">├ù</button></header>
            <div className="dl-drawer-body">
              {(selected.images || []).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt={`${selected.name}${i ? ` alternate ${i + 1}` : ""} cannabis delivery in North York`} loading="lazy" decoding="async" />
              ))}
              <h2 id="dl-title">{selected.name}</h2>
              <p>{selected.description || "Ask the store for current product details."}</p>
              {(selected.effects || []).length > 0 && <div className="dl-effects">{selected.effects!.map((e) => <span key={e}>{e}</span>)}</div>}
              <PriceBlock product={selected} />
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
