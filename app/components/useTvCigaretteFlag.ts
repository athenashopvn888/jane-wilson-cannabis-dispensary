"use client";

import { useEffect, useState } from "react";
import { SHOW_CIGARETTES } from "../lib/siteConfig";

/** TV cigarette flag from /api/content-status. Website pages do not use this. */
export function useTvCigaretteFlag() {
  const [on, setOn] = useState(SHOW_CIGARETTES);

  useEffect(() => {
    let cancel = false;
    fetch("/api/content-status", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { cig?: { tv?: boolean } } | null) => {
        if (cancel || typeof data?.cig?.tv !== "boolean") return;
        setOn(data.cig.tv);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, []);

  return on;
}
