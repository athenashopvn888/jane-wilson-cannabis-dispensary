import type { Metadata } from "next";
import "./globals.css";
import { STORE } from "./lib/store";

export const metadata: Metadata = {
  metadataBase: new URL(STORE.origin),
  title: { default: "Jane Wilson Cannabis Dispensary | Jane St North York", template: "%s | Jane Wilson Cannabis" },
  description: "Jane Wilson Cannabis Dispensary is located at 2111 Jane St #12 in North York, Ontario. Explore the store’s Weed flower tiers and cannabis information online.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Jane Wilson Cannabis Dispensary",
    description: "Five clearly labelled weed tiers at 2111 Jane St, Unit 12, North York.",
    url: STORE.origin,
    siteName: STORE.name,
    locale: "en_CA",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: STORE.name,
    url: STORE.origin,
    telephone: STORE.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2111 Jane St, Unit 12",
      addressLocality: "North York",
      addressRegion: "ON",
      postalCode: "M3M 1A2",
      addressCountry: "CA"
    }
  };
  return (
    <html lang="en-CA">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
