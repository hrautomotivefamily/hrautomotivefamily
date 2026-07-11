import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCar } from "@/lib/db";
import { CarForm } from "@/components/admin/CarForm";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Edit listing",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditCarPage({
  params,
}: {
  params: { slug: string };
}) {
  const car = await getCar(params.slug);
  if (!car) notFound();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-subtle)" }}>
      <div className="container-px py-10">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"
        >
          <Icon name="arrow" width={16} height={16} className="rotate-180" />
          Back to listings
        </Link>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Edit listing
          </h1>
          <Link
            href={`/stock/${car.slug}`}
            target="_blank"
            className="btn-outline"
          >
            View live
            <Icon name="arrow" width={16} height={16} />
          </Link>
        </div>
        <div className="max-w-4xl">
          <CarForm car={car} />
        </div>
      </div>
    </div>
  );
}
