import Link from "next/link";
import { Reveal } from "./Reveal";
import { Icon } from "./Icons";
import { site } from "@/lib/site";

const points = [
  "Repairs & servicing at your home or roadside",
  "Save a trip — no waiting around at a garage",
  "Same honest, family-run workmanship — wherever you are",
];

export function MobileMechanic() {
  return (
    <section id="mobile" className="relative py-10 sm:py-14">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-navy via-navy to-[#123a68] px-8 py-12 shadow-soft-lg sm:px-14 sm:py-16">
            {/* glows */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Our little trick
                </span>

                <h2 className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  Can&apos;t get to us?
                  <span className="block bg-gradient-to-r from-white to-[#8FB4D9] bg-clip-text text-transparent">
                    We come to you.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-lg text-white/75">
                  We&apos;re a <strong className="text-white">mobile mechanic</strong> too.
                  Wherever you are across {site.locality} and Calderdale, we&apos;ll bring
                  the workshop to your driveway or the roadside.
                </p>

                <ul className="mt-7 grid gap-3 sm:grid-cols-1">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-white/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/25 text-success">
                        <Icon name="check" width={13} height={13} />
                      </span>
                      <span className="text-[15px]">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="btn-primary"
                  >
                    <Icon name="phone" width={18} height={18} />
                    Call {site.phoneDisplay}
                  </a>
                  <Link href="#contact" className="btn-ghost">
                    Book a callout
                  </Link>
                </div>
              </div>

              {/* van emblem */}
              <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
                <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md">
                  <div className="absolute inset-4 rounded-full border border-dashed border-white/15" />
                  <Icon name="van" width={104} height={104} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
