"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/site";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Services</span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Craftsmanship for every repair
          </h2>
          <p className="mt-5 text-lg text-muted">
            Professional results without dealership prices. Whatever your vehicle
            needs, it is treated with the same precision and pride.
          </p>
        </Reveal>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.li
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <article className="card-surface group relative h-full overflow-hidden rounded-xl2 p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft-lg">
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl2 bg-navy text-white transition-all duration-500 group-hover:bg-accent group-hover:scale-105">
                  <Icon name={service.icon} width={26} height={26} />
                </span>

                <h3 className="mt-6 font-heading text-xl font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {service.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn more
                  <Icon name="arrow" width={16} height={16} />
                </span>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
