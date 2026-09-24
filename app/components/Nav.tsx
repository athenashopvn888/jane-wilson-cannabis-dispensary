"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { STORE, TIERS } from "../lib/store";

const STORE_LINKS = [
  { href: "/weed-dispensary-jane-street", label: "Jane Street Store" },
  { href: "/visit", label: "Visit" },
  { href: "/native-cigarettes-jane-street", label: "Cigarettes" },
  { href: "/nicotine-vapes-jane-street", label: "Nicotine Vapes" }
] as const;

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
      <header className="siteHeader" ref={headerRef}>
        <div className="navWrap">
        <Link className="brand" href="/" aria-label={`${STORE.name} home`}>
          <span className="brandMark" aria-hidden="true">JW</span>
          <span className="brandWords">
            <b>JANE WILSON</b>
            <small>CANNABIS DISPENSARY</small>
          </span>
        </Link>
        <nav className="desktopNav" aria-label="Primary navigation">
          {STORE_LINKS.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isCurrent(pathname, link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
          <div className="navTiers">
            {TIERS.map((tier) => (
              <Link key={tier.slug} href={`/${tier.slug}`} aria-current={isCurrent(pathname, `/${tier.slug}`) ? "page" : undefined}>
                {tier.name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="navActions">
          <a className="callButton" href={`tel:${STORE.phoneHref}`} aria-label={`Call ${STORE.phone}`}>
            <PhoneIcon />
            <span className="callLabel">Call</span> <span className="callNumber">{STORE.phone}</span>
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
                    {STORE_LINKS.map((link) => (
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

function PhoneIcon() {
  return (
    <svg className="callIcon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z"
      />
    </svg>
  );
}
