"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/site";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <section id="reviews" className="relative py-24 sm:py-32">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Trusted by families like yours
          </h2>
          <p className="mt-5 text-lg text-muted">
            We measure our success by the trust our customers place in us — and
            the vehicles they bring back.
          </p>
        </Reveal>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <motion.li
              key={t.name}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <figure className="card-surface relative h-full rounded-xl2 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg sm:p-10">
                <Icon
                  name="quote"
                  width={44}
                  height={44}
                  className="text-accent/25"
                />
                <div className="mt-2 flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" width={18} height={18} className="fill-accent" />
                  ))}
                </div>
                <blockquote className="mt-5 text-lg leading-relaxed text-[color:var(--fg)]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 border-t border-hair pt-5">
                  <div className="font-heading font-bold">{t.name}</div>
                  <div className="text-sm text-muted">{t.detail}</div>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
