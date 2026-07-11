import type { Metadata } from "next";
import Link from "next/link";
import { CarForm } from "@/components/admin/CarForm";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "New listing",
  robots: { index: false, follow: false },
};

export default function NewCarPage() {
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
        <h1 className="mb-8 font-heading text-3xl font-bold tracking-tight">
          New listing
        </h1>
        <div className="max-w-4xl">
          <CarForm />
        </div>
      </div>
    </div>
  );
}
