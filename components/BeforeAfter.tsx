"use client";

import { useCallback, useRef, useState } from "react";
import { CarScene } from "./CarScene";
import { Reveal } from "./Reveal";
import { Icon } from "./Icons";

type Example = {
  id: string;
  label: string;
  tone: "navy" | "charcoal" | "midnight" | "slate";
};

const examples: Example[] = [
  { id: "ex1", label: "Front wing collision repair", tone: "navy" },
  { id: "ex2", label: "Full panel respray", tone: "charcoal" },
  { id: "ex3", label: "Scratch & dent restoration", tone: "slate" },
];

function Slider({ example }: { example: Example }) {
  const [pos, setPos] = useState(52);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 4));
  };

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-xl2 shadow-soft-lg"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* AFTER (repaired) — full background */}
      <div className="absolute inset-0">
        <CarScene
          variant="repaired"
          tone={example.tone}
          seed={`${example.id}-after`}
          className="h-full w-full"
        />
        <span className="absolute right-4 top-4 rounded-full bg-success/90 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-soft">
          After
        </span>
      </div>

      {/* BEFORE (damaged) — clipped */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <CarScene
          variant="damaged"
          tone={example.tone}
          seed={`${example.id}-before`}
          className="h-full w-full"
        />
        <span className="absolute left-4 top-4 rounded-full bg-charcoal/85 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-soft">
          Before
        </span>
      </div>

      {/* divider + glass handle */}
      <div
        className="absolute inset-y-0 z-10 w-px bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.6)]"
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          role="slider"
          aria-label={`Reveal repaired result — ${example.label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onPointerDown={onPointerDown}
          onKeyDown={onKeyDown}
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/70 bg-white/15 text-white shadow-glass backdrop-blur-md transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Icon name="arrow" width={16} height={16} className="-ml-1 rotate-180" />
          <Icon name="arrow" width={16} height={16} className="-ml-2" />
        </button>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Before &amp; After</span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            The difference is in the detail
          </h2>
          <p className="mt-5 text-lg text-muted">
            Drag the handle to reveal the transformation. Every repair is
            finished to a standard we would put our own name to — because we do.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-4xl">
          <Slider example={examples[active]} key={examples[active].id} />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {examples.map((ex, i) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active === i
                    ? "border-accent bg-accent text-white shadow-soft"
                    : "border-hair text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
