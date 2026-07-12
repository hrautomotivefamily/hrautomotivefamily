"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { Icon } from "./Icons";

/**
 * First-visit "mystery gift" popup.
 *
 * - Appears once per browser (localStorage flag) ~1.2s after the page loads.
 * - Stage 1: an animated gift box the visitor taps to open.
 * - Stage 2: confetti burst + the offer reveal (FREE Car Diagnosis) with
 *   claim-by-email CTA and full terms & conditions.
 * - Never shows again after being opened or dismissed, unless the visitor
 *   clears their browsing data.
 */

const STORAGE_KEY = "hr-mystery-gift-v1";

const CLAIM_SUBJECT = "FREE Car Diagnosis — Claim";
const CLAIM_BODY = `Hi HR Automotive,

I'd like to claim my FREE car diagnosis. My details:

Full name:
Phone number:
Vehicle make & model:
Registration:
Preferred date/time for booking:

Thanks!`;

const TERMS: string[] = [
  "One free diagnostic check per customer, per vehicle.",
  "To claim, email us with your full name, contact number, vehicle make, model and registration.",
  "The free diagnosis is provided upon a confirmed booking only and is subject to availability.",
  "Covers a standard diagnostic scan and visual assessment. Any repair work identified will be quoted separately — no obligation.",
  "No cash alternative. The offer is non-transferable.",
  "Limited-time offer: HR Automotive reserves the right to amend or withdraw it at any time without notice.",
];

/* ---------------------------- confetti ---------------------------- */

const CONFETTI_COLORS = ["#1E88E5", "#0F2D52", "#2E7D32", "#FFD54F", "#FFFFFF"];

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 340,
        y: -(60 + Math.random() * 220),
        rotate: (Math.random() - 0.5) * 540,
        scale: 0.6 + Math.random() * 0.9,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 0.12,
        round: Math.random() > 0.5,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0 }}
          animate={{
            opacity: [1, 1, 0],
            x: p.x,
            y: [0, p.y, p.y + 160],
            rotate: p.rotate,
            scale: p.scale,
          }}
          transition={{ duration: 1.6, delay: p.delay, ease: "easeOut" }}
          className={`absolute left-1/2 top-1/3 h-2.5 w-2.5 ${p.round ? "rounded-full" : "rounded-[2px]"}`}
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

/* ---------------------------- gift box ---------------------------- */

function GiftBox({ opening }: { opening: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto h-40 w-40 sm:h-44 sm:w-44">
      {/* glow */}
      <motion.div
        aria-hidden
        animate={reduce ? {} : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-accent/30 blur-3xl"
      />

      {/* lid — outer div handles centering so motion transforms don't override it */}
      <div className="absolute left-1/2 top-[14%] z-10 w-[112%] -translate-x-1/2">
        <motion.svg
          viewBox="0 0 120 34"
          className="w-full"
          animate={
            opening
              ? { y: -90, rotate: -18, opacity: 0 }
              : reduce
                ? {}
                : { y: [0, -4, 0] }
          }
          transition={
            opening
              ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
        <rect x="2" y="8" width="116" height="24" rx="6" fill="#0F2D52" />
        <rect x="2" y="8" width="116" height="24" rx="6" fill="url(#lidshine)" />
        <rect x="52" y="4" width="16" height="28" rx="3" fill="#1E88E5" />
        {/* bow */}
        <path
          d="M60 8 C 50 -6 30 0 38 9 C 42 13 52 11 60 8 Z M60 8 C 70 -6 90 0 82 9 C 78 13 68 11 60 8 Z"
          fill="#1E88E5"
        />
          <defs>
            <linearGradient id="lidshine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* base */}
      <div className="absolute bottom-0 left-1/2 w-[86%] -translate-x-1/2">
        <motion.svg
          viewBox="0 0 104 74"
          className="w-full"
          animate={opening ? { scaleY: 0.96, y: 4 } : {}}
          transition={{ duration: 0.4 }}
        >
          <rect x="2" y="2" width="100" height="70" rx="8" fill="#16335c" />
          <rect x="2" y="2" width="100" height="70" rx="8" fill="url(#boxshine)" />
          <rect x="44" y="2" width="16" height="70" fill="#1E88E5" />
          <defs>
            <linearGradient id="boxshine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </div>
  );
}

/* ----------------------------- popup ------------------------------ */

export function MysteryGift() {
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState<"closed" | "opening" | "offer">("closed");
  const [showTerms, setShowTerms] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return; // storage unavailable — skip rather than nag every visit
    }
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const remember = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  };

  const dismiss = () => {
    remember();
    setVisible(false);
  };

  const openGift = () => {
    if (stage !== "closed") return;
    remember(); // opening counts as seen
    setStage("opening");
    setTimeout(() => setStage("offer"), reduce ? 50 : 620);
  };

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    CLAIM_SUBJECT
  )}&body=${encodeURIComponent(CLAIM_BODY)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Limited time offer"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-xl3 bg-white shadow-soft-lg dark:bg-[#101f33]"
          >
            {/* decorative top wash */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-44"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 0%, rgba(30,136,229,0.18), transparent 70%)",
              }}
            />

            <button
              type="button"
              aria-label="Close offer"
              onClick={dismiss}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-hair text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name="close" width={16} height={16} />
            </button>

            <div className="relative px-6 pb-7 pt-8 sm:px-8">
              <AnimatePresence mode="wait">
                {stage !== "offer" ? (
                  /* ---------------- stage 1: the box ---------------- */
                  <motion.div
                    key="box"
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="text-center"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                      </span>
                      Limited time offer
                    </motion.span>

                    <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-[color:var(--fg)]">
                      A gift for you 🎁
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                      Something for your car is inside. Tap the box to open it.
                    </p>

                    <motion.button
                      type="button"
                      onClick={openGift}
                      whileHover={reduce ? {} : { scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      animate={
                        stage === "closed" && !reduce
                          ? { rotate: [0, -2, 2, -2, 2, 0] }
                          : {}
                      }
                      transition={{
                        rotate: { duration: 0.9, repeat: Infinity, repeatDelay: 1.6 },
                      }}
                      className="mt-6 block w-full cursor-pointer rounded-xl2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label="Open your mystery gift"
                    >
                      <GiftBox opening={stage === "opening"} />
                    </motion.button>

                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                      Tap to open
                    </p>
                  </motion.div>
                ) : (
                  /* ---------------- stage 2: the offer ---------------- */
                  <motion.div
                    key="offer"
                    initial={{ opacity: 0, y: 26, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative text-center"
                  >
                    {!reduce && <ConfettiBurst />}

                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                      Limited time offer
                    </span>

                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-[color:var(--fg)] sm:text-4xl">
                        FREE Car{" "}
                        <span className="bg-gradient-to-r from-accent to-navy bg-clip-text text-transparent dark:to-[#8FB4D9]">
                          Diagnosis
                        </span>
                      </h2>
                    </motion.div>

                    <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
                      Book in with us and get a full diagnostic check on your
                      vehicle — completely free. Email us with your details to
                      claim.
                    </p>

                    <div className="mt-6 space-y-3">
                      <a href={mailto} className="btn-primary w-full" onClick={remember}>
                        <Icon name="mail" width={18} height={18} />
                        Claim by email
                      </a>
                      <button type="button" onClick={dismiss} className="btn-outline w-full">
                        Maybe later
                      </button>
                    </div>

                    <p className="mt-4 text-xs text-muted">
                      Include your name, phone, vehicle make &amp; model and
                      registration. Valid upon booking.
                    </p>

                    {/* terms & conditions */}
                    <div className="mt-5 border-t border-hair pt-4 text-left">
                      <button
                        type="button"
                        onClick={() => setShowTerms((s) => !s)}
                        aria-expanded={showTerms}
                        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-accent"
                      >
                        Terms &amp; conditions
                        <Icon
                          name="arrow"
                          width={14}
                          height={14}
                          className={`transition-transform duration-300 ${showTerms ? "-rotate-90" : "rotate-90"}`}
                        />
                      </button>
                      <AnimatePresence>
                        {showTerms && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            {TERMS.map((t, i) => (
                              <li
                                key={i}
                                className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-muted first:mt-3"
                              >
                                <Icon
                                  name="check"
                                  width={12}
                                  height={12}
                                  className="mt-0.5 shrink-0 text-success"
                                />
                                {t}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
