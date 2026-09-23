import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import { STORE, storeSchema } from "./lib/store";

export const metadata: Metadata = {
  metadataBase: new URL(STORE.origin),
  title: { default: "Jane Wilson Cannabis Dispensary | Jane St North York", template: "%s | Jane Wilson Cannabis" },
  description: "Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12 serves the Jane–Wilson and Downsview corridor. Plan a visit and explore five Weed flower tiers.",
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
    "@graph": [
      storeSchema(),
      {
        "@type": "WebSite",
        "@id": `${STORE.origin}/#website`,
        url: STORE.origin,
        name: STORE.name,
        publisher: { "@id": `${STORE.origin}/#store` },
        inLanguage: "en-CA"
      }
    ]
  };
  return (
    <html lang="en-CA">
      <body>
        {children}
        <JsonLd data={schema} />
      </body>
    </html>
  );
}
