import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { MakesMarquee } from "@/components/MakesMarquee";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Services } from "@/components/Services";
import { StockSection } from "@/components/StockSection";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { CTABand } from "@/components/CTABand";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { site, services, testimonials, areaServed } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  image: "/og.png",
  priceRange: "££",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: "GB",
  },
  areaServed: areaServed.map((name) => ({ "@type": "City", name })),
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title },
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: testimonials.length,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <Highlights />
        <BeforeAfter />
        <ProcessTimeline />
        <Services />
        <MakesMarquee />
        <StockSection />
        <Gallery />
        <Testimonials />
        <CTABand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
