"use client";

import { useMemo, useState } from "react";
import { StockCard } from "./StockCard";
import { Icon } from "./Icons";
import { STATUS_ORDER, formatPrice, type Car, type StockStatus } from "@/lib/stock";

type Tab = "all" | StockStatus;

const TABS: { key: Tab; label: string }[] = [
  { key: "available", label: "Available" },
  { key: "reserved", label: "Reserved" },
  { key: "deposit", label: "Deposit taken" },
  { key: "sold", label: "Sold" },
  { key: "all", label: "All" },
];

// Available first, then reserved, deposit, sold — used to order the grid.
const statusRank = (s: StockStatus) => STATUS_ORDER.indexOf(s);

export function StockBrowser({ cars }: { cars: Car[] }) {
  const counts = useMemo(() => {
    const c = { all: cars.length, available: 0, reserved: 0, deposit: 0, sold: 0 };
    for (const car of cars) c[car.status]++;
    return c;
  }, [cars]);

  // Price bounds across all stock, rounded to tidy £100 steps.
  const bounds = useMemo(() => {
    const prices = cars.map((c) => c.price).filter((p) => p > 0);
    if (prices.length === 0) return { min: 0, max: 0 };
    const min = Math.floor(Math.min(...prices) / 100) * 100;
    const max = Math.ceil(Math.max(...prices) / 100) * 100;
    return { min, max };
  }, [cars]);

  const [tab, setTab] = useState<Tab>("all");
  const [range, setRange] = useState<[number, number]>([bounds.min, bounds.max]);

  const hasPriceFilter = bounds.max > bounds.min;
  const [lo, hi] = range;

  const visible = useMemo(() => {
    return cars
      .filter((c) => (tab === "all" ? true : c.status === tab))
      .filter((c) => !hasPriceFilter || (c.price >= lo && c.price <= hi))
      // available first, then reserved/deposit/sold
      .sort((a, b) => statusRank(a.status) - statusRank(b.status));
  }, [cars, tab, lo, hi, hasPriceFilter]);

  const pct = (v: number) =>
    bounds.max === bounds.min ? 0 : ((v - bounds.min) / (bounds.max - bounds.min)) * 100;

  return (
    <div>
      {/* tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const n = counts[t.key];
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                active
                  ? "border-accent bg-accent text-white shadow-soft"
                  : "border-hair text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-1.5 text-xs ${
                  active ? "bg-white/25" : "bg-black/5 dark:bg-white/10"
                }`}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>

      {/* price range slider */}
      {hasPriceFilter && (
        <div className="mb-10 max-w-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Price range</span>
            <span className="text-sm font-semibold text-accent">
              {formatPrice(lo)} – {formatPrice(hi)}
            </span>
          </div>

          <div className="relative mt-4 h-6">
            {/* track */}
            <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-black/10 dark:bg-white/15" />
            {/* selected fill */}
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent"
              style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
            />
            {/* min thumb */}
            <input
              type="range"
              aria-label="Minimum price"
              min={bounds.min}
              max={bounds.max}
              step={100}
              value={lo}
              onChange={(e) => {
                const v = Math.min(Number(e.target.value), hi);
                setRange([v, hi]);
              }}
              className="range-thumb pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent"
            />
            {/* max thumb */}
            <input
              type="range"
              aria-label="Maximum price"
              min={bounds.min}
              max={bounds.max}
              step={100}
              value={hi}
              onChange={(e) => {
                const v = Math.max(Number(e.target.value), lo);
                setRange([lo, v]);
              }}
              className="range-thumb pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent"
            />
          </div>

          {(lo !== bounds.min || hi !== bounds.max) && (
            <button
              type="button"
              onClick={() => setRange([bounds.min, bounds.max])}
              className="mt-3 text-xs font-semibold text-muted underline-offset-2 hover:text-accent hover:underline"
            >
              Reset price
            </button>
          )}
        </div>
      )}

      {visible.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((car, i) => (
            <StockCard key={car.slug} car={car} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="card-surface rounded-xl2 p-12 text-center shadow-soft">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
            <Icon name="car" width={26} height={26} />
          </span>
          <p className="mt-5 text-lg font-semibold">
            No cars match your filters
          </p>
          <p className="mt-2 text-muted">
            Try widening the price range or choosing a different tab.
          </p>
        </div>
      )}
    </div>
  );
}
