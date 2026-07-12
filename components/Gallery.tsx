"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Placeholder } from "./Placeholder";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";
import { type GalleryItem } from "@/lib/showcase";

function GalleryMedia({
  item,
  className,
}: {
  item: GalleryItem;
  className?: string;
}) {
  if (item.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.src} alt={item.title} className={className ?? "h-full w-full object-cover"} />;
  }
  return <Placeholder tone={item.tone} className={className} />;
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, next, prev]);

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32"
      style={{ backgroundColor: "var(--bg-subtle)" }}
    >
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Gallery</span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            A portfolio built on results
          </h2>
          <p className="mt-5 text-lg text-muted">
            A selection of recent work. Tap any image to view it full screen.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid auto-rows-[190px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View ${item.title}`}
                className={`group relative overflow-hidden rounded-xl2 shadow-soft ${item.span}`}
              >
                <GalleryMedia
                  item={item}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-left">
                  <span className="font-heading text-sm font-semibold text-white drop-shadow">
                    {item.title}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 translate-y-2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Icon name="arrow" width={16} height={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <Icon name="close" />
            </button>

            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 sm:left-8"
            >
              <Icon name="arrow" className="rotate-180" />
            </button>

            <motion.figure
              key={items[open].id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl2 shadow-soft-lg">
                <GalleryMedia item={items[open]} className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-4 text-center font-heading text-lg font-semibold text-white">
                {items[open].title}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 sm:right-8"
            >
              <Icon name="arrow" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
