import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { site } from "@/lib/site";
import { getBaseUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} — Car Body Repairs & Bodywork in Halifax`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "mechanic near me",
    "mechanic Halifax",
    "car garage near me",
    "mobile mechanic Halifax",
    "mobile mechanic Calderdale",
    "mobile car mechanic West Yorkshire",
    "Peugeot specialist Halifax",
    "Citroen specialist Halifax",
    "Toyota Aygo specialist Halifax",
    "VW Polo mechanic Halifax",
    "bodywork all makes Halifax",
    "car body repairs Halifax",
    "bodyshop Halifax",
    "mechanics Halifax",
    "car repairs Halifax",
    "garage Halifax",
    "car servicing Halifax",
    "oil change Halifax",
    "bodywork West Yorkshire",
    "accident repairs Halifax",
    "car respray Halifax",
    "dent removal Halifax",
    "scratch repair Halifax",
    "alloy wheel repair Calderdale",
    "insurance repairs West Yorkshire",
    "cars for sale Halifax",
    "used cars Halifax",
    "car spraying Halifax",
    "family run garage Halifax",
    "HR Automotive Halifax",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Automotive",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — Car Body Repairs & Bodywork in Halifax`,
    description: site.description,
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: baseUrl,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Car Body Repairs & Bodywork in Halifax`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "geo.region": "GB-CLD",
    "geo.placename": "Halifax, West Yorkshire",
    "geo.position": "53.7247;-1.8577",
    ICBM: "53.7247, -1.8577",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1626" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body className="font-body antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
