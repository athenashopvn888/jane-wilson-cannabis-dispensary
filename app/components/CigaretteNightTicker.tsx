"use client";

import { useEffect, useState } from "react";
import { useTvCigaretteFlag } from "./useTvCigaretteFlag";
import { CIGARETTE_FLASH_MESSAGE, isCigaretteFlashWindow } from "../tv/flashMessages";

/** Night cigarette ticker line: shows 17:00-07:59 America/Toronto only, hidden 08:00-16:59. */
export default function CigaretteNightTicker() {
  const tvCig = useTvCigaretteFlag();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const sync = () => setShow(isCigaretteFlashWindow());
    sync();
    const t = window.setInterval(sync, 30_000);
    return () => window.clearInterval(t);
  }, []);
  if (!tvCig || !show) return null;
  return (
    <div
      data-cigarette-ticker=""
      role="marquee"
      aria-label={CIGARETTE_FLASH_MESSAGE}
      style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 50, overflow: "hidden", whiteSpace: "nowrap", background: "#b91c1c", color: "#fff", fontWeight: 900, fontSize: "clamp(18px, 2.2vw, 34px)", letterSpacing: "0.04em", padding: "8px 0", display: "flex", gap: 64 }}
    >
      <style>{"@keyframes jwsCigTicker{from{transform:translateX(0)}to{transform:translateX(-100%)}}"}</style>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} aria-hidden={i > 0 ? "true" : undefined} style={{ flex: "none", animation: "jwsCigTicker 18s linear infinite" }}>
          {CIGARETTE_FLASH_MESSAGE}
        </span>
      ))}
    </div>
  );
}
