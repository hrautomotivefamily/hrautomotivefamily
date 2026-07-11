import Link from "next/link";
import { getStock } from "@/lib/db";
import { StockCard } from "./StockCard";
import { Reveal } from "./Reveal";
import { Icon } from "./Icons";

export async function StockSection() {
  const all = await getStock();
  // show available/reserved first, fall back to sold to fill the row
  const ordered = [
    ...all.filter((c) => c.status !== "sold"),
    ...all.filter((c) => c.status === "sold"),
  ];
  const cars = ordered.slice(0, 3);

  return (
    <section id="stock" className="relative py-24 sm:py-32">
      <div className="container-px">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Cars for Sale</span>
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Freshly repaired &amp; ready to drive
            </h2>
            <p className="mt-5 text-lg text-muted">
              Every car we sell is repaired and finished in our own workshop to
              the same standard as our customer work. Honest descriptions, fair
              prices, no hidden history.
            </p>
          </div>
          <Link href="/stock" className="btn-outline shrink-0">
            View all stock
            <Icon name="arrow" width={18} height={18} />
          </Link>
        </Reveal>

        {cars.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car, i) => (
              <Reveal key={car.slug} delay={i * 0.08}>
                <StockCard car={car} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-14">
            <div className="card-surface rounded-xl2 p-12 text-center shadow-soft">
              <p className="text-lg font-semibold">No cars in stock right now</p>
              <p className="mt-2 text-muted">
                New arrivals are added regularly — check back soon or get in touch.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
