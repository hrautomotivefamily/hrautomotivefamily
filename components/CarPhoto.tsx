import Image from "next/image";
import { Placeholder } from "./Placeholder";
import type { Car } from "@/lib/stock";

/**
 * Renders a car's photo when present, otherwise the branded SVG placeholder.
 * Local paths (e.g. /uploads/…, /stock/…) go through next/image for
 * optimisation; remote URLs (e.g. Supabase Storage) render via a plain <img>
 * so no host allow-listing is needed and arbitrary URLs never crash the page.
 */
export function CarPhoto({
  car,
  index = 0,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  car: Car;
  index?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const src = car.images[index];
  const alt = `${car.title} — ${car.colour}`;

  if (src) {
    if (/^https?:\/\//.test(src)) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full ${className ?? "object-cover"}`}
        />
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className ?? "object-cover"}
      />
    );
  }

  return <Placeholder tone={car.tone} className={className} />;
}
