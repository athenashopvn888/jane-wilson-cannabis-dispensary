import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jane Wilson Cannabis In-Store Flower Display",
  description: "Operational in-store flower menu display for Jane Wilson Cannabis Dispensary.",
  robots: { index: false, follow: false },
};

export default function TvLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
