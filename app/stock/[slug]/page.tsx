import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StockGallery } from "@/components/StockGallery";
import { Icon } from "@/components/Icons";
import { getCar, getStock } from "@/lib/db";
import { formatPrice, formatMileage } from "@/lib/stock";
import { site } from "@/lib/site";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const car = await getCar(params.slug);
  if (!car) return { title: "Car not found" };
  const title = `${car.title} — ${formatPrice(car.price)}`;
  const description = `${car.year} ${car.title} for sale in ${site.locality}, ${site.region}. ${car.summary}`;
  return {
    title,
    description,
    alternates: { canonical: `/stock/${car.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

const statusLabel = {
  available: "Available now",
  reserved: "Reserved",
  deposit: "Deposit taken",
  sold: "Sold",
} as const;

export default async function CarPage({ params }: { params: { slug: string } }) {
  const car = await getCar(params.slug);
  if (!car) notFound();

  const specs = [
    { label: "Year", value: car.plateAge ? `${car.year} (${car.plateAge})` : `${car.year}` },
    { label: "Mileage", value: formatMileage(car.mileage) },
    { label: "Engine", value: car.engine },
    { label: "Transmission", value: car.transmission },
    { label: "Fuel", value: car.fuel },
    { label: "Colour", value: car.colour },
    { label: "Doors", value: `${car.doors}` },
    { label: "Body style", value: car.bodyStyle },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: car.title,
    brand: { "@type": "Brand", name: car.make },
    model: car.model,
    vehicleModelDate: `${car.year}`,
    color: car.colour,
    fuelType: car.fuel,
    vehicleTransmission: car.transmission,
    numberOfDoors: car.doors,
    ...(car.mileage !== null && {
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: car.mileage,
        unitCode: "SMI",
      },
    }),
    offers: {
      "@type": "Offer",
      url: `${getBaseUrl()}/stock/${car.slug}`,
      price: car.price,
      priceCurrency: "GBP",
      availability:
        car.status === "sold"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      seller: { "@type": "AutoDealer", name: site.name, areaServed: `${site.locality}, ${site.region}` },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: getBaseUrl() },
      { "@type": "ListItem", position: 2, name: "Cars for Sale", item: `${getBaseUrl()}/stock` },
      { "@type": "ListItem", position: 3, name: car.title },
    ],
  };

  const others = (await getStock()).filter(
    (c) => c.slug !== car.slug && c.status !== "sold"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar variant="solid" />
      <main id="main" className="pt-[72px]">
        <div className="container-px py-10 sm:py-14">
          {/* breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span>/</span>
            <Link href="/stock" className="hover:text-accent">
              Cars for Sale
            </Link>
            <span>/</span>
            <span className="text-[color:var(--fg)]">{car.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            {/* left — gallery + details */}
            <div>
              <StockGallery car={car} />

              {car.summary && (
                <div className="mt-10">
                  <h2 className="font-heading text-2xl font-bold">Overview</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">
                    {car.summary}
                  </p>
                </div>
              )}

              {/* spec table */}
              <div className="mt-10">
                <h2 className="font-heading text-2xl font-bold">Specification</h2>
                <dl className="card-surface mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl2 sm:grid-cols-4">
                  {specs.map((s) => (
                    <div key={s.label} className="bg-[color:var(--bg)] p-4">
                      <dt className="text-xs uppercase tracking-widest text-muted">
                        {s.label}
                      </dt>
                      <dd className="mt-1 font-heading font-semibold">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* features */}
              {car.features.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-heading text-2xl font-bold">
                    Key features
                  </h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {car.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                          <Icon name="check" width={14} height={14} />
                        </span>
                        <span className="text-[15px]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* right — sticky buy panel */}
            <div>
              <div className="card-surface sticky top-[88px] rounded-xl3 p-7 shadow-soft-lg">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    car.status === "sold"
                      ? "bg-charcoal/10 text-charcoal dark:bg-white/10 dark:text-white"
                      : "bg-success/15 text-success"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {statusLabel[car.status]}
                </span>

                <h1 className="mt-4 font-heading text-2xl font-bold leading-tight">
                  {car.title}
                </h1>
                <p className="mt-1 text-sm text-muted">
                  {car.plateAge} • {car.colour} • {formatMileage(car.mileage)}
                </p>

                <div className="mt-5 font-heading text-4xl font-extrabold text-navy dark:text-white">
                  {formatPrice(car.price)}
                </div>

                <div className="mt-6 space-y-3">
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="btn-primary w-full"
                  >
                    <Icon name="phone" width={18} height={18} />
                    Call about this car
                  </a>
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full"
                  >
                    Message on Facebook
                  </a>
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(
                      `Enquiry: ${car.title}`
                    )}`}
                    className="btn-outline w-full"
                  >
                    <Icon name="mail" width={18} height={18} />
                    Email us
                  </a>
                </div>

                <ul className="mt-6 space-y-2.5 border-t border-hair pt-6 text-sm text-muted">
                  <li className="flex items-center gap-2.5">
                    <Icon name="check" width={16} height={16} className="text-success" />
                    Repaired &amp; prepared in-house
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Icon name="check" width={16} height={16} className="text-success" />
                    Honest history &amp; description
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Icon name="pin" width={16} height={16} className="text-accent" />
                    {site.locality}, {site.region}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* other stock */}
          {others.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-2xl font-bold">More stock</h2>
                <Link href="/stock" className="text-sm font-semibold text-accent">
                  View all →
                </Link>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {others.slice(0, 3).map((c) => (
                  <StockCardLite key={c.slug} slug={c.slug} title={c.title} price={c.price} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// lightweight inline card to avoid importing the client card here
function StockCardLite({
  slug,
  title,
  price,
}: {
  slug: string;
  title: string;
  price: number;
}) {
  return (
    <Link
      href={`/stock/${slug}`}
      className="card-surface flex items-center justify-between rounded-xl2 p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg"
    >
      <div>
        <div className="font-heading font-semibold">{title}</div>
        <div className="text-sm text-muted">{formatPrice(price)}</div>
      </div>
      <Icon name="arrow" className="text-accent" />
    </Link>
  );
}
