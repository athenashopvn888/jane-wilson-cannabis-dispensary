"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SHOW_CIGARETTES } from "../lib/siteConfig";
import { STORE, TIERS } from "../lib/store";

const STORE_LINKS = [
  { href: "/weed-dispensary-jane-street", label: "Jane Street Store" },
  { href: "/visit", label: "Visit" },
  { href: "/native-cigarettes-jane-street", label: "Cigarettes" },
  { href: "/nicotine-vapes-jane-street", label: "Nicotine Vapes" },
  { href: "/delivery", label: "Delivery" },
  { href: "/faq", label: "FAQ" },
  { href: "/guides", label: "Guides" },
  { href: "/resources", label: "Resources" },
  { href: "/menu", label: "Menu" }
] as const;

const VISIBLE_STORE_LINKS = SHOW_CIGARETTES
  ? STORE_LINKS
  : STORE_LINKS.filter((link) => link.href !== "/native-cigarettes-jane-street");

function isCurrent(pathname: string, href: string) {
  return pathname === href;
}

export default function Nav() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  function closeMenu(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const applyOffset = () => {
      document.documentElement.style.setProperty("--mobile-nav-top", `${header.getBoundingClientRect().bottom}px`);
    };
    applyOffset();
    const observer = new ResizeObserver(applyOffset);
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--mobile-nav-top");
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1051px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    document.documentElement.classList.add("navLocked");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !drawer) return;
      const items = [...drawer.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !drawer.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !drawer.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const frame = requestAnimationFrame(() => {
      drawer?.querySelector<HTMLElement>("nav a")?.focus();
    });
    return () => {
      document.documentElement.classList.remove("navLocked");
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, [open]);

  return (
    <>
      <header id="main-nav" className="siteHeader" ref={headerRef}>
        <div className="navWrap">
        <Link className="brand" href="/" aria-label={`${STORE.name} home`}>
          <span className="brandMark" aria-hidden="true">
            <Image src="/images/jane-wilson-jwc-logo.webp" alt="Jane Wilson Cannabis Dispensary logo" width={64} height={64} priority />
          </span>
          <span className="brandWords">
            <b>JANE WILSON</b>
            <small>CANNABIS DISPENSARY</small>
          </span>
        </Link>
        <nav className="desktopNav" aria-label="Primary navigation">
          {VISIBLE_STORE_LINKS.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isCurrent(pathname, link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
          <WeedMenu pathname={pathname} />
        </nav>
        <div className="navActions">
          <a className="callButton" href={STORE.maps} target="_blank" rel="noreferrer" aria-label="Get directions">
            <MapPinIcon />
          </a>
          <button
            ref={toggleRef}
            className="menuToggle"
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? closeMenu(false) : setOpen(true))}
          >
            <span className="menuBars" aria-hidden="true" />
          </button>
        </div>
        </div>
      </header>
      {open
        ? createPortal(
            <div className="mobileMenuLayer">
              <button className="menuScrim" type="button" aria-label="Close menu" onClick={() => closeMenu()} />
              <div id={menuId} ref={drawerRef} className="menuDrawer" role="dialog" aria-modal="true" aria-label="Site menu">
                <div className="menuDrawerHead">
                  <div>
                    <p className="menuDrawerTitle">Browse Jane Wilson</p>
                    <p className="menuDrawerHint">Choose a section below. Tap the X to close.</p>
                  </div>
                </div>
                <div className="menuQuickActions" aria-label="Store actions">
                  <a href={STORE.maps} target="_blank" rel="noreferrer">Directions</a>
                  <a href={`tel:${STORE.phoneHref}`}>Call store</a>
                </div>
                <nav aria-label="Mobile navigation">
                  <p className="menuGroupLabel">Store</p>
                  <div className="menuLinkGrid">
                    {VISIBLE_STORE_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                        onClick={() => closeMenu(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <p className="menuGroupLabel">Shop flower by tier</p>
                  <div className="menuLinkGrid menuTierGrid">
                    {TIERS.map((tier) => (
                      <Link
                        key={tier.slug}
                        href={`/${tier.slug}`}
                        aria-current={isCurrent(pathname, `/${tier.slug}`) ? "page" : undefined}
                        onClick={() => closeMenu(false)}
                      >
                        {tier.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}

function WeedMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const active = TIERS.some((tier) => isCurrent(pathname, `/${tier.slug}`));
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <div className={`navWeed${open ? " isOpen" : ""}`} ref={ref} onMouseLeave={() => setOpen(false)}>
      <button type="button" className={`navWeedToggle${active ? " isActive" : ""}`} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((v) => !v)}>
        Weed <span aria-hidden="true">▾</span>
      </button>
      <div id={menuId} className="navWeedMenu navTiers" role="group" aria-label="Weed tiers">
        {TIERS.map((tier) => (
          <Link key={tier.slug} href={`/${tier.slug}`} aria-current={isCurrent(pathname, `/${tier.slug}`) ? "page" : undefined} onClick={() => setOpen(false)}>
            {tier.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg className="callIcon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742zM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      />
    </svg>
  );
}
