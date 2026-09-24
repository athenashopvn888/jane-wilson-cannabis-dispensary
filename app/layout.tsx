import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import { STORE, storeSchema } from "./lib/store";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const displayFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(STORE.origin),
  title: { default: "Jane Wilson Cannabis Dispensary | Jane St North York", template: "%s | Jane Wilson Cannabis" },
  description: "Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12 serves the Jane–Wilson and Downsview corridor. Open 10:00 AM to midnight daily. Flower tiers, native cigarettes, and nicotine vapes for adults 19+.",
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
    <html lang="en-CA" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        {children}
        <JsonLd data={schema} />
      </body>
    </html>
  );
}
