"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CarPhoto } from "@/components/CarPhoto";
import { Icon } from "@/components/Icons";
import { bulkSetStatus, bulkDelete } from "@/app/admin/actions";
import {
  STATUS_ORDER,
  STATUS_LABELS,
  formatPrice,
  formatMileage,
  type Car,
  type StockStatus,
} from "@/lib/stock";

const statusStyles: Record<StockStatus, string> = {
  available: "bg-success/15 text-success",
  reserved: "bg-accent/15 text-accent",
  deposit: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
  sold: "bg-charcoal/15 text-charcoal dark:bg-white/10 dark:text-white",
};

export function AdminListings({ cars }: { cars: Car[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allSelected = cars.length > 0 && selected.size === cars.length;

  function toggle(slug: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(slug)) n.delete(slug);
      else n.add(slug);
      return n;
    });
  }
  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(cars.map((c) => c.slug)));
  }

  async function setStatus(status: StockStatus, slugs: string[], clearSelection: boolean) {
    if (slugs.length === 0) return;
    setBusy(true);
    setError(null);
    const res = await bulkSetStatus(slugs, status);
    setBusy(false);
    if (res.error) return setError(res.error);
    if (clearSelection) setSelected(new Set());
    router.refresh();
  }

  async function remove(slugs: string[], message: string) {
    if (slugs.length === 0) return;
    if (!window.confirm(message)) return;
    setBusy(true);
    setError(null);
    const res = await bulkDelete(slugs);
    setBusy(false);
    if (res.error) return setError(res.error);
    setSelected(new Set());
    router.refresh();
  }

  const chip =
    "rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors disabled:opacity-50";

  return (
    <div>
      {/* bulk action bar */}
      <div className="sticky top-2 z-10 mb-5 rounded-xl2 border border-hair bg-[color:var(--bg)] p-3 shadow-soft">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="h-4 w-4 accent-[#1E88E5]"
            />
            Select all
          </label>
          <span className="text-sm text-muted">
            {selected.size} selected
          </span>

          {selected.size > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted">→ mark as:</span>
              {STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={busy}
                  onClick={() => setStatus(s, Array.from(selected), true)}
                  className={`${chip} border-transparent ${statusStyles[s]} hover:brightness-95`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  remove(
                    Array.from(selected),
                    `Delete ${selected.size} listing${selected.size === 1 ? "" : "s"}? This cannot be undone.`
                  )
                }
                className={`${chip} border-red-500/40 text-red-600 hover:bg-red-500/10 dark:text-red-400`}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>

      {/* rows */}
      <div className="space-y-4">
        {cars.map((car) => {
          const isSel = selected.has(car.slug);
          return (
            <div
              key={car.slug}
              className={`card-surface flex flex-col gap-4 rounded-xl2 p-4 shadow-soft transition-shadow sm:flex-row sm:items-center ${
                isSel ? "ring-2 ring-accent" : ""
              }`}
            >
              <label className="flex items-center gap-3 sm:contents">
                <input
                  type="checkbox"
                  checked={isSel}
                  onChange={() => toggle(car.slug)}
                  className="h-5 w-5 shrink-0 accent-[#1E88E5]"
                  aria-label={`Select ${car.title}`}
                />
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-40">
                  <CarPhoto car={car} sizes="160px" className="object-cover" />
                </div>
              </label>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[car.status]}`}
                  >
                    {STATUS_LABELS[car.status]}
                  </span>
                  <span className="text-sm text-muted">{car.plateAge || car.year}</span>
                </div>
                <h2 className="mt-1 truncate font-heading text-lg font-bold">{car.title}</h2>
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

              <div className="flex flex-wrap items-center gap-2">
                {STATUS_ORDER.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={busy || car.status === s}
                    onClick={() => setStatus(s, [car.slug], false)}
                    className={`${chip} ${
                      car.status === s
                        ? "cursor-default border-transparent " + statusStyles[s]
                        : "border-hair text-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
                <Link
                  href={`/admin/${car.slug}/edit`}
                  className="inline-flex h-8 items-center rounded-full border border-hair px-4 text-xs font-semibold hover:border-accent hover:text-accent"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => remove([car.slug], `Delete "${car.title}"? This cannot be undone.`)}
                  className={`${chip} border-red-500/30 text-red-600 hover:bg-red-500/10 dark:text-red-400`}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
