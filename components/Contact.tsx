"use client";

import { useState } from "react";
import { openingHours, site } from "@/lib/site";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder submit — wire to an email service or API route later.
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* left — details */}
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Get a free, honest quote
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted">
              Tell us about your vehicle and we&apos;ll get back to you with clear,
              fair advice — no obligation, no pressure.
            </p>

            <div className="mt-9 space-y-3">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="card-surface flex items-center gap-4 rounded-xl2 p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-navy text-white">
                  <Icon name="phone" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted">
                    Call us
                  </span>
                  <span className="font-heading font-semibold">
                    {site.phoneDisplay}
                  </span>
                </span>
                <Icon name="arrow" className="ml-auto text-accent" />
              </a>

              <a
                href={`mailto:${site.email}`}
                className="card-surface flex items-center gap-4 rounded-xl2 p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-accent text-white">
                  <Icon name="mail" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-widest text-muted">
                    Email
                  </span>
                  <span className="block truncate font-heading font-semibold">
                    {site.email}
                  </span>
                </span>
                <Icon name="arrow" className="ml-auto text-accent" />
              </a>
            </div>

            {/* opening hours */}
            <div className="card-surface mt-4 rounded-xl2 p-6 shadow-soft">
              <div className="flex items-center gap-2">
                <Icon name="clock" className="text-accent" />
                <h3 className="font-heading font-bold">Opening hours</h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {openingHours.map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between border-b border-hair pb-2.5 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-muted">{row.day}</span>
                    <span className="font-medium">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* map placeholder */}
            <div className="relative mt-4 overflow-hidden rounded-xl2 border border-hair shadow-soft">
              <div
                className="flex h-52 items-center justify-center"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(30,136,229,0.12), rgba(15,45,82,0.16)), radial-gradient(circle at 30% 30%, rgba(30,136,229,0.18), transparent 60%)",
                  backgroundColor: "var(--bg-subtle)",
                }}
              >
                <div className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-soft">
                    <Icon name="pin" />
                  </span>
                  <p className="mt-3 font-heading text-sm font-semibold">
                    {site.name}
                  </p>
                  <p className="text-xs text-muted">{site.address}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">
                    Google Map placeholder
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* right — form */}
          <Reveal delay={0.1}>
            <div className="card-surface rounded-xl3 p-8 shadow-soft-lg sm:p-10">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-white shadow-soft">
                    <Icon name="check" width={30} height={30} />
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-bold">
                    Thank you
                  </h3>
                  <p className="mt-3 max-w-xs text-muted">
                    Your request has been received. We&apos;ll be in touch shortly
                    with your free quote.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="btn-outline mt-8"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" name="name" autoComplete="name" required />
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                    />
                  </div>
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                  <Field label="Vehicle make & model" name="vehicle" />
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about the damage or work you need…"
                      className="w-full rounded-xl2 border border-hair bg-transparent px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Request my free quote
                    <Icon name="arrow" width={18} height={18} />
                  </button>
                  <p className="text-center text-xs text-muted">
                    We respect your privacy. Your details are only used to respond
                    to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl2 border border-hair bg-transparent px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
