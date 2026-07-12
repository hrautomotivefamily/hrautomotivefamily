"use client";

import Image from "next/image";
import { useState } from "react";
import { Placeholder } from "./Placeholder";
import type { Car } from "@/lib/stock";

/**
 * Renders a car's photo when present and loadable, otherwise the branded
 * placeholder. Local paths (/uploads, /stock) use next/image; remote URLs
 * (e.g. Supabase Storage) use a plain <img>. If an image fails to load (e.g. a
 * private Supabase bucket), it falls back to the placeholder instead of showing
 * a broken-image icon.
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
  const [failed, setFailed] = useState(false);
  const src = car.images[index];
  const alt = `${car.title} — ${car.colour}`;

  if (src && !failed) {
    if (/^https?:\/\//.test(src)) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
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
        onError={() => setFailed(true)}
        className={className ?? "object-cover"}
      />
    );
  }

  return <Placeholder tone={car.tone} className={className} />;
}
