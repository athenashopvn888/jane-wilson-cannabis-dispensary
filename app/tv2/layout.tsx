import type { Metadata } from "next";
import { SHOW_CIGARETTES } from "../lib/siteConfig";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jane Wilson Cannabis In-Store Items Display",
  description: SHOW_CIGARETTES
    ? "Operational in-store cigarette and nicotine vape display for Jane Wilson Cannabis Dispensary."
    : "Operational in-store nicotine vape display for Jane Wilson Cannabis Dispensary.",
  robots: { index: false, follow: false },
};

export default function Tv2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
