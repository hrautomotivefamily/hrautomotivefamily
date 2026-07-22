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

function uniqueSorted<T extends string | number>(values: T[]): T[] {
  return Array.from(new Set(values)).sort((a, b) =>
    typeof a === "number" && typeof b === "number"
      ? a - b
      : String(a).localeCompare(String(b))
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-4 top-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl2 border border-hair bg-[color:var(--bg)] px-4 pb-2.5 pt-6 text-sm font-semibold text-[color:var(--fg)] shadow-soft transition-colors hover:border-accent focus:border-accent focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">
        <Icon name="arrow" width={16} height={16} className="rotate-90" />
      </span>
    </label>
  );
}

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
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [range, setRange] = useState<[number, number]>([bounds.min, bounds.max]);

  const hasPriceFilter = bounds.max > bounds.min;
  const [lo, hi] = range;

  // Dropdown options (models narrow to the chosen make).
  const makes = useMemo(() => uniqueSorted(cars.map((c) => c.make)), [cars]);
  const models = useMemo(
    () => uniqueSorted(cars.filter((c) => !make || c.make === make).map((c) => c.model)),
    [cars, make]
  );
  const transmissions = useMemo(
    () => uniqueSorted(cars.map((c) => c.transmission)),
    [cars]
  );
  const fuels = useMemo(() => uniqueSorted(cars.map((c) => c.fuel)), [cars]);

  const visible = useMemo(() => {
    return cars
      .filter((c) => (tab === "all" ? true : c.status === tab))
      .filter((c) => !make || c.make === make)
      .filter((c) => !model || c.model === model)
      .filter((c) => !transmission || c.transmission === transmission)
      .filter((c) => !fuel || c.fuel === fuel)
      .filter((c) => !hasPriceFilter || (c.price >= lo && c.price <= hi))
      // available first, then reserved/deposit/sold
      .sort((a, b) => statusRank(a.status) - statusRank(b.status));
  }, [cars, tab, make, model, transmission, fuel, lo, hi, hasPriceFilter]);

  const pct = (v: number) =>
    bounds.max === bounds.min ? 0 : ((v - bounds.min) / (bounds.max - bounds.min)) * 100;

  const filtersActive =
    !!make ||
    !!model ||
    !!transmission ||
    !!fuel ||
    lo !== bounds.min ||
    hi !== bounds.max;

  const resetAll = () => {
    setMake("");
    setModel("");
    setTransmission("");
    setFuel("");
    setRange([bounds.min, bounds.max]);
  };

  return (
    <div>
      {/* filter panel */}
      <div className="card-surface mb-8 rounded-xl3 p-5 shadow-soft sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Icon name="wheel" width={18} height={18} className="text-accent" />
          <span className="font-heading text-sm font-bold uppercase tracking-widest">
            Find your car
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            label="Make"
            value={make}
            onChange={(v) => {
              setMake(v);
              setModel(""); // reset model when make changes
            }}
            options={[
              { value: "", label: "Any make" },
              ...makes.map((m) => ({ value: m, label: m })),
            ]}
          />
          <Select
            label="Model"
            value={model}
            onChange={setModel}
            options={[
              { value: "", label: "All models" },
              ...models.map((m) => ({ value: m, label: m })),
            ]}
          />
          <Select
            label="Transmission"
            value={transmission}
            onChange={setTransmission}
            options={[
              { value: "", label: "Any" },
              ...transmissions.map((m) => ({ value: m, label: m })),
            ]}
          />
          <Select
            label="Fuel"
            value={fuel}
            onChange={setFuel}
            options={[
              { value: "", label: "Any" },
              ...fuels.map((m) => ({ value: m, label: m })),
            ]}
          />
        </div>

        {/* price range slider */}
        {hasPriceFilter && (
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                Price range
              </span>
              <span className="text-sm font-semibold text-accent">
                {formatPrice(lo)} – {formatPrice(hi)}
              </span>
            </div>

            <div className="relative mt-3 h-6 max-w-md">
              <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-black/10 dark:bg-white/15" />
              <div
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent"
                style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
              />
              <input
                type="range"
                aria-label="Minimum price"
                min={bounds.min}
                max={bounds.max}
                step={100}
                value={lo}
                onChange={(e) => setRange([Math.min(Number(e.target.value), hi), hi])}
                className="range-thumb pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent"
              />
              <input
                type="range"
                aria-label="Maximum price"
                min={bounds.min}
                max={bounds.max}
                step={100}
                value={hi}
                onChange={(e) => setRange([lo, Math.max(Number(e.target.value), lo)])}
                className="range-thumb pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent"
              />
            </div>
          </div>
        )}

        {/* result count + reset */}
        <div className="mt-5 flex items-center justify-between border-t border-hair pt-4">
          <span className="text-sm font-semibold">
            {visible.length} {visible.length === 1 ? "car" : "cars"} found
          </span>
          {filtersActive && (
            <button
              type="button"
              onClick={resetAll}
              className="text-xs font-semibold text-muted underline-offset-2 hover:text-accent hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* status tabs */}
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
          <p className="mt-5 text-lg font-semibold">No cars match your filters</p>
          <p className="mt-2 text-muted">
            Try widening the price range, choosing a different tab, or{" "}
            {filtersActive ? "clearing the filters." : "checking back soon."}
          </p>
          {filtersActive && (
            <button type="button" onClick={resetAll} className="btn-outline mt-6">
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
