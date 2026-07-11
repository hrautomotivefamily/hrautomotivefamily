import type { Metadata } from "next";
import Link from "next/link";
import { getStock } from "@/lib/db";
import { adminConfigured } from "@/lib/auth";
import { formatPrice, formatMileage, type StockStatus } from "@/lib/stock";
import { CarPhoto } from "@/components/CarPhoto";
import { Icon } from "@/components/Icons";
import { BrandLogo } from "@/components/BrandLogo";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { logout, removeCar, quickStatus } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statusStyles: Record<StockStatus, string> = {
  available: "bg-success/15 text-success",
  reserved: "bg-accent/15 text-accent",
  sold: "bg-charcoal/15 text-charcoal dark:bg-white/10 dark:text-white",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { saved?: string; deleted?: string; updated?: string; error?: string };
}) {
  const cars = await getStock();
  const configured = adminConfigured();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-subtle)" }}>
      {/* top bar */}
      <header className="border-b border-hair bg-[color:var(--bg)]">
        <div className="container-px flex h-[72px] items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo dark={false} heightClass="h-7" />
            <span className="font-heading font-bold text-muted">/ Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="btn-outline">
              View site
              <Icon name="arrow" width={16} height={16} />
            </Link>
            <form action={logout}>
              <button type="submit" className="btn-outline">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container-px py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              Car listings
            </h1>
            <p className="mt-1 text-muted">
              {cars.length} {cars.length === 1 ? "listing" : "listings"} · manage
              your stock below.
            </p>
          </div>
          <Link href="/admin/new" className="btn-primary">
            <Icon name="sparkle" width={18} height={18} />
            New listing
          </Link>
        </div>

        {!configured && (
          <p className="mt-6 rounded-xl2 border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
            Heads up: no <code>ADMIN_PASSWORD</code> is set, so this page is
            unprotected. Set it in your environment before going live.
          </p>
        )}

        {(searchParams.saved || searchParams.deleted || searchParams.updated) && (
          <p className="mt-6 flex items-center gap-2 rounded-xl2 bg-success/10 px-4 py-3 text-sm text-success">
            <Icon name="check" width={16} height={16} />
            {searchParams.saved
              ? "Listing saved."
              : searchParams.deleted
                ? "Listing deleted."
                : "Listing updated."}
          </p>
        )}

        {searchParams.error && (
          <p className="mt-6 flex items-start gap-2 rounded-xl2 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            <Icon name="close" width={16} height={16} className="mt-0.5 shrink-0" />
            {searchParams.error}
          </p>
        )}

        {/* list */}
        <div className="mt-8 space-y-4">
          {cars.length === 0 && (
            <div className="card-surface rounded-xl2 p-10 text-center shadow-soft">
              <p className="text-lg font-semibold">No listings yet</p>
              <p className="mt-2 text-muted">
                Add your first car to get started.
              </p>
              <Link href="/admin/new" className="btn-primary mt-6">
                New listing
              </Link>
            </div>
          )}

          {cars.map((car) => (
            <div
              key={car.slug}
              className="card-surface flex flex-col gap-4 rounded-xl2 p-4 shadow-soft sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg">
                <CarPhoto car={car} sizes="160px" className="object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[car.status]}`}
                  >
                    {car.status}
                  </span>
                  <span className="text-sm text-muted">
                    {car.plateAge || car.year}
                  </span>
                </div>
                <h2 className="mt-1 truncate font-heading text-lg font-bold">
                  {car.title}
                </h2>
                <p className="text-sm text-muted">
                  {formatPrice(car.price)} · {formatMileage(car.mileage)} ·{" "}
                  <Link
                    href={`/stock/${car.slug}`}
                    target="_blank"
                    className="text-accent hover:underline"
                  >
                    /stock/{car.slug}
                  </Link>
                </p>
              </div>

              {/* quick status */}
              <div className="flex flex-wrap items-center gap-2">
                {(["available", "reserved", "sold"] as StockStatus[]).map((s) => (
                  <form action={quickStatus} key={s}>
                    <input type="hidden" name="slug" value={car.slug} />
                    <input type="hidden" name="status" value={s} />
                    <button
                      type="submit"
                      disabled={car.status === s}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                        car.status === s
                          ? "cursor-default border-transparent " + statusStyles[s]
                          : "border-hair text-muted hover:border-accent hover:text-accent"
                      }`}
                    >
                      {s}
                    </button>
                  </form>
                ))}

                <Link
                  href={`/admin/${car.slug}/edit`}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-hair px-4 text-xs font-semibold hover:border-accent hover:text-accent"
                >
                  Edit
                </Link>

                <form action={removeCar}>
                  <input type="hidden" name="slug" value={car.slug} />
                  <ConfirmButton
                    confirm={`Delete "${car.title}"? This cannot be undone.`}
                    className="inline-flex h-9 items-center rounded-full border border-red-500/30 px-4 text-xs font-semibold text-red-600 hover:bg-red-500/10 disabled:opacity-50 dark:text-red-400"
                  >
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
