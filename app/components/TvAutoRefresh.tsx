"use client";

import { useEffect } from "react";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export default function TvAutoRefresh() {
  useEffect(() => {
    const timer = window.setInterval(() => window.location.reload(), REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return null;
}
