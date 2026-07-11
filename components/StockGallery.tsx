"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CarPhoto } from "./CarPhoto";
import { SoldStamp } from "./SoldStamp";
import { Icon } from "./Icons";
import type { Car } from "@/lib/stock";

export function StockGallery({ car }: { car: Car }) {
  const count = Math.max(car.images.length, 1);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const hasRealPhotos = car.images.length > 0;

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + count) % count);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom, count]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setZoom(true)}
        aria-label="View photo full screen"
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl2 shadow-soft"
      >
        <CarPhoto
          car={car}
          index={active}
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {car.status === "sold" && <SoldStamp size="lg" />}
        <span className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 rounded-full bg-navy/85 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <Icon name="sparkle" width={14} height={14} />
          {hasRealPhotos ? "Tap to enlarge" : "Photos coming soon"}
        </span>
      </button>

      {car.images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {car.images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-lg ring-2 transition-all ${
                active === i ? "ring-accent" : "ring-transparent hover:ring-hair"
              }`}
            >
              <CarPhoto car={car} index={i} sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setZoom(false)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10"
            >
              <Icon name="close" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-xl2 shadow-soft-lg"
            >
              <CarPhoto car={car} index={active} sizes="90vw" className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
