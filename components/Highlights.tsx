import { Icon } from "./Icons";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: "shield",
    title: "Insurance approved",
    text: "We handle insurance repairs directly, start to finish.",
  },
  {
    icon: "doc",
    title: "Free, honest quotes",
    text: "Clear pricing and straight advice — never a hard sell.",
  },
  {
    icon: "sparkle",
    title: "Quality first",
    text: "We prioritise quality on every job, big or small.",
  },
  {
    icon: "star",
    title: "Family run",
    text: "A name we stand behind on every single job.",
  },
];

export function Highlights() {
  return (
    <section className="relative z-10 -mt-px border-b border-hair" style={{ backgroundColor: "var(--bg)" }}>
      <div className="container-px py-12 sm:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl2 bg-navy/5 text-navy dark:bg-white/10 dark:text-white">
                  <Icon name={item.icon} width={24} height={24} />
                </span>
                <div>
                  <h3 className="font-heading text-[15px] font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
