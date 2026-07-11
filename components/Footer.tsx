import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { Logo } from "./Logo";
import { Icon } from "./Icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="container-px py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link href="#top" className="flex items-center gap-3">
              <Logo className="h-9 w-9 text-white" />
              <span className="font-heading text-lg font-bold">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {site.tagline} Expert vehicle repairs, bodywork and paint
              restoration you can trust.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Explore
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/business-cards"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  Business Cards
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-white/75 transition-colors hover:text-white"
                >
                  <Icon name="mail" width={18} height={18} />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/75">
                <Icon name="pin" width={18} height={18} />
                {site.address}
              </li>
            </ul>
            <Link href="#contact" className="btn-primary mt-6">
              Get a Free Quote
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
