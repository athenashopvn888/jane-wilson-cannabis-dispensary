import type { MetadataRoute } from "next";
import { STORE } from "./lib/store";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: STORE.name,
    short_name: STORE.shortName,
    description: "Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12, North York.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6efe4",
    theme_color: "#3b0f5c",
    icons: [
      { src: "/jws-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/jws-icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
