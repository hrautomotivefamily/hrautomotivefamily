import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StockBrowser } from "@/components/StockBrowser";
import { Icon } from "@/components/Icons";
import { getStock } from "@/lib/db";
import { site, areaServed } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cars for Sale in Halifax, West Yorkshire",
  description: `Quality used cars, repaired and finished in-house by ${site.name} in Halifax, West Yorkshire. Honest descriptions and fair prices.`,
  alternates: { canonical: "/stock" },
};

export const dynamic = "force-dynamic";

export default async function StockPage() {
  const stock = await getStock();

  return (
    <>
      <Navbar variant="solid" />
      <main id="main" className="pt-[88px]">
        {/* header */}
        <section className="border-b border-hair bg-[color:var(--bg-subtle)]">
          <div className="container-px py-14 sm:py-20">
            <nav className="mb-5 flex items-center gap-2 text-sm text-muted">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span>/</span>
              <span className="text-[color:var(--fg)]">Cars for Sale</span>
            </nav>
            <span className="eyebrow">Current Stock</span>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Quality used cars in {site.locality}, {site.region}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Each car is repaired and prepared in our own workshop before it goes
              on sale. Serving {areaServed.slice(0, 5).join(", ")} and the wider{" "}
              {site.region}.
            </p>
          </div>
        </section>

        {/* grid */}
        <section className="py-16 sm:py-20">
          <div className="container-px">
            {stock.length > 0 ? (
              <StockBrowser cars={stock} />
            ) : (
              <div className="card-surface mx-auto max-w-xl rounded-xl2 p-12 text-center shadow-soft">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
                  <Icon name="car" width={28} height={28} />
                </span>
                <p className="mt-6 text-lg font-semibold">
                  No cars in stock right now
                </p>
                <p className="mt-2 text-muted">
                  We add new arrivals regularly. Follow us on Facebook or get in
                  touch to be first to know.
                </p>
                <Link href="/#contact" className="btn-primary mt-8">
                  Contact us
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
