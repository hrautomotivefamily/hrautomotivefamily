"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { CarScene } from "./CarScene";
import { Icon } from "./Icons";

const stats = [
  { value: "20+", label: "Years of craft" },
  { value: "5,000+", label: "Repairs completed" },
  { value: "100%", label: "Honest workmanship" },
];

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy"
    >
      {/* backdrop artwork */}
      <div className="absolute inset-0">
        <CarScene
          variant="repaired"
          tone="midnight"
          seed="hero"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
      </div>

      <div className="container-px relative z-10 grid w-full items-center gap-12 pt-28 pb-20 lg:grid-cols-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-8 xl:col-span-7"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-white/80 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Family owned & operated
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-heading text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Family Run.
            <span className="block bg-gradient-to-r from-white via-white to-[#8FB4D9] bg-clip-text text-transparent">
              Professionally Done.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            {site.description}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Link href="#contact" className="btn-primary">
              Get a Free Quote
              <Icon name="arrow" width={18} height={18} />
            </Link>
            <Link href="#work" className="btn-ghost">
              View Our Work
            </Link>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-heading text-3xl font-bold text-white">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-white/60">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#work"
        aria-label="Scroll to our work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <motion.span
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]"
        >
          Scroll
          <span className="flex h-9 w-5 justify-center rounded-full border border-white/40 pt-1.5">
            <span className="h-2 w-1 rounded-full bg-white/70" />
          </span>
        </motion.span>
      </motion.a>
    </section>
  );
}
