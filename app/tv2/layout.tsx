import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jane Wilson Cannabis In-Store Items Display",
  description: "Operational in-store cigarette and nicotine vape display for Jane Wilson Cannabis Dispensary.",
  robots: { index: false, follow: false },
};

export default function Tv2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
