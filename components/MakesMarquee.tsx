const makes = [
  "Toyota",
  "BMW",
  "Audi",
  "Volkswagen",
  "Ford",
  "Mercedes-Benz",
  "Nissan",
  "Vauxhall",
  "Honda",
  "Kia",
  "Peugeot",
  "Land Rover",
];

export function MakesMarquee() {
  return (
    <section
      aria-label="All makes welcome"
      className="border-y border-hair py-10"
      style={{ backgroundColor: "var(--bg-subtle)" }}
    >
      <p className="container-px mb-7 text-center text-xs font-semibold uppercase tracking-[0.28em] text-muted">
        All makes &amp; models welcome
      </p>
      <div className="marquee-mask relative overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-14 whitespace-nowrap pr-14">
          {[...makes, ...makes].map((make, i) => (
            <span
              key={`${make}-${i}`}
              className="font-heading text-2xl font-bold tracking-tight text-muted/70 transition-colors sm:text-3xl"
              aria-hidden={i >= makes.length}
            >
              {make}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
