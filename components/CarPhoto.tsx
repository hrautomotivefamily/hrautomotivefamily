import Image from "next/image";
import { CarScene } from "./CarScene";
import type { Car } from "@/lib/stock";

/**
 * Renders a car's cover photo when real images are present, otherwise falls
 * back to the branded SVG placeholder. Drop photos into public/stock/<slug>/
 * and list them in the car's `images` array to switch automatically.
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

  if (src) {
    return (
      <Image
        src={src}
        alt={`${car.title} — ${car.colour}`}
        fill
        sizes={sizes}
        priority={priority}
        className={className ?? "object-cover"}
      />
    );
  }

  return (
    <CarScene
      variant="repaired"
      tone={car.tone}
      seed={`${car.slug}-${index}`}
      className={className ?? "h-full w-full"}
    />
  );
}
