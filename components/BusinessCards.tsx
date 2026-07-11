"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { BrandLogo } from "./BrandLogo";
import { Icon } from "./Icons";
import { QRCode } from "./QRCode";
import { ThemeToggle } from "./ThemeToggle";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative aspect-[1.75/1] w-full overflow-hidden rounded-2xl shadow-soft-lg ${className}`}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function BusinessCards() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-subtle)" }}>
      {/* top bar */}
      <div className="container-px flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <BrandLogo dark={false} heightClass="h-7" />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/" className="btn-outline">
            <Icon name="arrow" className="rotate-180" width={16} height={16} />
            Back to site
          </Link>
        </div>
      </div>

      <div className="container-px py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Brand Collateral</span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Business Cards
          </h1>
          <p className="mt-5 text-lg text-muted">
            Premium, minimalist cards using the exact HR Automotive branding —
            white background, navy accents and softly rounded corners.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-10 lg:grid-cols-2">
          {/* FRONT */}
          <div>
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted">
              Front
            </p>
            <Card>
              <div className="absolute inset-0 bg-white" />
              {/* navy accent corner */}
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-navy/5" />
              <div
                className="absolute left-0 top-0 h-full w-2"
                style={{ background: "linear-gradient(180deg,#0F2D52,#1E88E5)" }}
              />
              <div className="relative flex h-full flex-col justify-between p-7 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <BrandLogo dark={false} heightClass="h-10" />
                    <div className="mt-2 text-[11px] font-medium tracking-wide text-charcoal">
                      Family Run. Professionally Done.
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Vehicle Repairs • Bodywork • Paint
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-[12px] text-charcoal sm:grid-cols-2 sm:gap-x-6">
                  <span className="flex items-center gap-2">
                    <Icon name="phone" width={14} height={14} className="text-accent" />
                    {site.phoneDisplay}
                  </span>
                  <span className="flex items-center gap-2 truncate">
                    <Icon name="mail" width={14} height={14} className="text-accent" />
                    {site.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="pin" width={14} height={14} className="text-accent" />
                    {site.website}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* BACK */}
          <div>
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted">
              Back
            </p>
            <Card>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(150deg,#0F2D52,#12325a 60%,#0b2444)" }}
              />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-accent/20 blur-2xl" />
              <div className="relative flex h-full items-center justify-between gap-6 p-7 sm:p-8">
                <div className="flex-1">
                  <BrandLogo dark heightClass="h-8" />
                  <div className="mt-4 font-heading text-lg font-bold leading-tight text-white">
                    Scan to Get a<br />Free Quote
                  </div>
                  <p className="mt-3 max-w-[16rem] text-[11px] leading-relaxed text-white/70">
                    Point your camera at the code to request your free, honest
                    quote in seconds.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-soft">
                  <QRCode size={116} fg="#0F2D52" bg="#FFFFFF" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* brand palette reference */}
        <div className="mx-auto mt-20 max-w-5xl">
          <h2 className="text-center font-heading text-2xl font-bold">
            Brand palette
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Navy", hex: "#0F2D52" },
              { name: "Charcoal", hex: "#2E3135" },
              { name: "Accent Blue", hex: "#1E88E5" },
              { name: "Success", hex: "#2E7D32" },
              { name: "Light", hex: "#F6F7F8" },
              { name: "White", hex: "#FFFFFF" },
            ].map((c) => (
              <div
                key={c.name}
                className="card-surface overflow-hidden rounded-xl2 shadow-soft"
              >
                <div className="h-20" style={{ backgroundColor: c.hex }} />
                <div className="p-3">
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted">{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
