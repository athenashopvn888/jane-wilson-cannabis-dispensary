import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Weed Dispensary in North York at Jane & Wilson | Jane Wilson Cannabis",
  alternates: { canonical: "/weed-dispensary-jane-street" },
  robots: { index: false, follow: true }
};

export default function NorthYorkRedirectPage() {
  permanentRedirect("/weed-dispensary-jane-street");
}
