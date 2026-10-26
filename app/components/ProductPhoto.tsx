"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductPhoto({ src, alt, sizes = "(max-width: 700px) 100vw, (max-width: 1150px) 50vw, 33vw" }: { src: string; alt: string; sizes?: string }) {
  const [visible, setVisible] = useState(Boolean(src));
  if (!visible) return <div className="productImageFallback" aria-hidden="true" />;
  return (
    <div className="productPhoto">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        onError={() => setVisible(false)}
      />
    </div>
  );
}
