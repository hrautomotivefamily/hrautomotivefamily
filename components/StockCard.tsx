import Link from "next/link";
import { CarPhoto } from "./CarPhoto";
import { Icon } from "./Icons";
import { formatMileage, formatPrice, type Car } from "@/lib/stock";

const statusStyles: Record<Car["status"], string> = {
  available: "bg-success text-white",
  reserved: "bg-accent text-white",
  sold: "bg-charcoal text-white",
};

const statusLabel: Record<Car["status"], string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

export function StockCard({ car, priority = false }: { car: Car; priority?: boolean }) {
  const sold = car.status === "sold";

  return (
    <Link
      href={`/stock/${car.slug}`}
      className="card-surface group relative flex h-full flex-col overflow-hidden rounded-xl2 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 ${
            sold ? "opacity-70" : ""
          }`}
        >
          <CarPhoto car={car} priority={priority} className="object-cover" />
        </div>

        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold tracking-wide shadow-soft ${statusStyles[car.status]}`}
        >
          {statusLabel[car.status]}
        </span>

        <span className="absolute bottom-3 right-3 z-10 rounded-full bg-navy/90 px-3.5 py-1.5 font-heading text-sm font-bold text-white shadow-soft backdrop-blur-sm">
          {formatPrice(car.price)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold leading-tight tracking-tight">
          {car.title}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {car.plateAge} • {car.colour} • {car.doors}dr
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-hair pt-4 text-center">
          <Spec label="Mileage" value={car.mileage === null ? "—" : formatMileage(car.mileage).replace(" miles", "")} />
          <Spec label="Fuel" value={car.fuel} />
          <Spec label="Gearbox" value={car.transmission === "Manual" ? "Man" : "Auto"} />
        </dl>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          View details
          <Icon name="arrow" width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold">{value}</dd>
    </div>
  );
}
