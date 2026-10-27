import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickContact from "@/components/QuickContact";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import { site } from "@/data/site";

const sans = Inter_Tight({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Architecture for Gatherings, Lagos`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: "en_NG" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#141210" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ArchitectureFirm",
  name: site.name,
  url: site.url,
  telephone: site.phoneDisplay,
  email: site.email,
  founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.title },
  address: { "@type": "PostalAddress", streetAddress: site.address[0], addressLocality: "Lagos", addressCountry: "NG" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${sans.variable}`}>
      <body>
        <a href="#main" className="meta sr-only z-[200] bg-ink p-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Loader />
        <MotionProvider>
          <div className="mx-auto max-w-[1600px] px-2 pb-20 pt-2 md:px-4 md:pb-4 md:pt-4">
            <Header />
            <main id="main" className="mt-2 space-y-2 md:mt-3 md:space-y-3">{children}</main>
            <Footer />
          </div>
        </MotionProvider>
        <QuickContact />
        <Cursor />
      </body>
    </html>
  );
}
