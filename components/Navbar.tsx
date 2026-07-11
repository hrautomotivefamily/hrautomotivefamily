"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/lib/site";
import { Icon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-hair bg-[color:var(--bg)]/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="container-px flex h-[72px] items-center justify-between">
          <Link
            href="#top"
            className="flex items-center gap-3"
            aria-label={`${site.name} home`}
          >
            <Logo
              className={`h-9 w-9 transition-colors ${
                scrolled ? "text-accent" : "text-white"
              }`}
            />
            <span
              className={`font-heading text-lg font-bold tracking-tight transition-colors ${
                scrolled ? "text-[color:var(--fg)]" : "text-white"
              }`}
            >
              {site.name}
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                      scrolled ? "text-[color:var(--fg)]" : "text-white/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <ThemeToggle
                className={scrolled ? "" : "border-white/25 text-white"}
              />
              <Link href="#contact" className="btn-primary">
                Get a Free Quote
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle
              className={scrolled ? "" : "border-white/25 text-white"}
            />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-hair backdrop-blur-md ${
                scrolled ? "text-[color:var(--fg)]" : "border-white/25 text-white"
              }`}
            >
              <Icon name="menu" />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-px flex h-[72px] items-center justify-between">
              <span className="font-heading text-lg font-bold text-white">
                {site.name}
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white"
              >
                <Icon name="close" />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
              className="container-px mt-8 flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-heading text-2xl font-semibold text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 },
                }}
                className="mt-6"
              >
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Get a Free Quote
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
