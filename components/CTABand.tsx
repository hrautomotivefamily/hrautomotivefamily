import Link from "next/link";
import { Reveal } from "./Reveal";
import { Icon } from "./Icons";
import { site } from "@/lib/site";

export function CTABand() {
  return (
    <section className="relative py-10">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl3 bg-navy px-8 py-14 text-center shadow-soft-lg sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Professional results, without dealership prices.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
                Bring us your vehicle and experience the difference honest,
                family-run craftsmanship makes.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link href="#contact" className="btn-primary">
                  Get a Free Quote
                  <Icon name="arrow" width={18} height={18} />
                </Link>
                <a href={`mailto:${site.email}`} className="btn-ghost">
                  Email us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
