import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Jane Street Weed Dispensary | Jane Wilson Cannabis",
  alternates: { canonical: "/weed-dispensary-jane-street" },
  robots: { index: false, follow: true }
};

export default function NorthYorkRedirectPage() {
  permanentRedirect("/weed-dispensary-jane-street");
}
