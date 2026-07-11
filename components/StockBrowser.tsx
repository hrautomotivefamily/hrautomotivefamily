"use client";

import { useMemo, useState } from "react";
import { StockCard } from "./StockCard";
import { Icon } from "./Icons";
import type { Car, StockStatus } from "@/lib/stock";

type Tab = "all" | StockStatus;

const TABS: { key: Tab; label: string }[] = [
  { key: "available", label: "Available" },
  { key: "reserved", label: "Reserved" },
  { key: "sold", label: "Sold" },
  { key: "all", label: "All" },
];

export function StockBrowser({ cars }: { cars: Car[] }) {
  const counts = useMemo(() => {
    const c = { all: cars.length, available: 0, reserved: 0, sold: 0 };
    for (const car of cars) c[car.status]++;
    return c;
  }, [cars]);

  const [tab, setTab] = useState<Tab>(counts.available > 0 ? "available" : "all");

  const visible = tab === "all" ? cars : cars.filter((c) => c.status === tab);

  return (
    <div>
      {/* tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
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
            No {tab === "all" ? "" : tab} cars right now
          </p>
          <p className="mt-2 text-muted">
            {tab === "available"
              ? "All our current stock is reserved or sold — check back soon."
              : "Check back soon or get in touch."}
          </p>
        </div>
      )}
    </div>
  );
}
