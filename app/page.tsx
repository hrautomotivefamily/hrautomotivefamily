import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { MakesMarquee } from "@/components/MakesMarquee";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Services } from "@/components/Services";
import { StockSection } from "@/components/StockSection";
import { MobileMechanic } from "@/components/MobileMechanic";
import { GallerySection } from "@/components/GallerySection";
import { Testimonials } from "@/components/Testimonials";
import { CTABand } from "@/components/CTABand";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { MysteryGift } from "@/components/MysteryGift";
import { site, services, testimonials, areaServed, hoursSpec, geo, faqs } from "@/lib/site";
import { getBaseUrl } from "@/lib/seo";

const baseUrl = getBaseUrl();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "AutoBodyShop", "LocalBusiness"],
  "@id": `${baseUrl}/#business`,
  name: site.name,
  legalName: site.name,
  slogan: site.tagline,
  description: site.description,
  url: baseUrl,
  email: site.email,
  telephone: site.phone,
  image: `${baseUrl}/og.png`,
  logo: `${baseUrl}/icon.svg`,
  priceRange: "££",
  currenciesAccepted: "GBP",
  paymentAccepted: "Cash, Card, Bank transfer",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: geo.latitude,
    longitude: geo.longitude,
  },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${geo.latitude},${geo.longitude}`,
  areaServed: areaServed.map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: hoursSpec.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [site.facebook].filter(Boolean),
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.description },
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: testimonials.length,
    bestRating: "5",
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: baseUrl,
  inLanguage: "en-GB",
  publisher: { "@id": `${baseUrl}/#business` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        {/* Our differentiator — the mobile mechanic service */}
        <MobileMechanic />
        {/* Cars for sale — front and centre */}
        <StockSection />
        <MakesMarquee />
        <Highlights />
        <GallerySection />
        <Testimonials />
        {/* Descriptions & about — kept toward the bottom */}
        <Services />
        <BeforeAfter />
        <ProcessTimeline />
        <FAQ />
        <CTABand />
        <Contact />
      </main>
      <Footer />
      <MysteryGift />
    </>
  );
}
