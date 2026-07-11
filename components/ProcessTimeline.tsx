"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { processStages } from "@/lib/site";
import { Reveal } from "./Reveal";

function Stage({
  stage,
  index,
}: {
  stage: (typeof processStages)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const fromLeft = index % 2 === 0;

  return (
    <motion.li
      initial={{
        opacity: 0,
        x: reduce ? 0 : fromLeft ? -48 : 48,
        y: reduce ? 24 : 0,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center gap-6 md:gap-10 ${
        fromLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* card */}
      <div className="md:w-[calc(50%-2.5rem)]">
        <div className="card-surface group rounded-xl2 p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
          <span className="font-heading text-sm font-bold text-accent">
            {stage.number}
          </span>
          <h3 className="mt-1 font-heading text-xl font-bold tracking-tight">
            {stage.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {stage.description}
          </p>
        </div>
      </div>

      {/* node */}
      <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 md:left-1/2 md:block md:-translate-x-1/2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent shadow-[0_0_0_6px_rgba(30,136,229,0.15)]">
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
      </div>

      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </motion.li>
  );
}

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="process"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: "var(--bg-subtle)" }}
    >
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our Process</span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Nine steps, done properly
          </h2>
          <p className="mt-5 text-lg text-muted">
            From the first honest conversation to the moment you drive away, every
            stage is deliberate, transparent and finished with care.
          </p>
        </Reveal>

        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
          {/* center track */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-hair md:block">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-accent to-navy"
            />
          </div>

          <ul className="flex flex-col gap-8 md:gap-12">
            {processStages.map((stage, i) => (
              <Stage key={stage.number} stage={stage} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
