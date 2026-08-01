import { Reveal } from "./Reveal";
import { faqs } from "@/lib/site";

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">FAQs</span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Questions, answered
          </h2>
          <p className="mt-5 text-lg text-muted">
            Everything you might want to know before you get in touch.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-hair overflow-hidden rounded-xl3 border border-hair">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="group bg-[color:var(--bg)] open:bg-[color:var(--bg-subtle)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-heading text-[15px] font-bold tracking-tight">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hair text-muted transition-transform duration-300 group-open:rotate-45">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
