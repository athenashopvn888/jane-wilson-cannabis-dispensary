"use client";

import { useState } from "react";

export default function ProductPhoto({ src, alt }: { src: string; alt: string }) {
  const [visible, setVisible] = useState(Boolean(src));
  if (!visible) return <div className="productImageFallback" aria-hidden="true" />;
  return <img src={src} alt={alt} onError={() => setVisible(false)} />;
}
