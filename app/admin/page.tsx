import type { Metadata } from "next";
import Link from "next/link";
import { getStock } from "@/lib/db";
import { adminConfigured } from "@/lib/auth";
import { Icon } from "@/components/Icons";
import { BrandLogo } from "@/components/BrandLogo";
import { AdminListings } from "@/components/admin/AdminListings";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { saved?: string; deleted?: string; updated?: string; error?: string };
}) {
  const cars = await getStock();
  const configured = adminConfigured();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-subtle)" }}>
      {/* top bar */}
      <header className="border-b border-hair bg-[color:var(--bg)]">
        <div className="container-px flex h-[72px] items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo dark={false} heightClass="h-7" />
            <span className="font-heading font-bold text-muted">/ Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="btn-outline">
              View site
              <Icon name="arrow" width={16} height={16} />
            </Link>
            <form action={logout}>
              <button type="submit" className="btn-outline">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container-px py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              Car listings
            </h1>
            <p className="mt-1 text-muted">
              {cars.length} {cars.length === 1 ? "listing" : "listings"} · manage
              your stock below.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/gallery" className="btn-outline">
              <Icon name="sparkle" width={18} height={18} />
              Manage gallery
            </Link>
            <Link href="/admin/new" className="btn-primary">
              <Icon name="sparkle" width={18} height={18} />
              New listing
            </Link>
          </div>
        </div>

        {!configured && (
          <p className="mt-6 rounded-xl2 border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
            Heads up: no <code>ADMIN_PASSWORD</code> is set, so this page is
            unprotected. Set it in your environment before going live.
          </p>
        )}

        {(searchParams.saved || searchParams.deleted || searchParams.updated) && (
          <p className="mt-6 flex items-center gap-2 rounded-xl2 bg-success/10 px-4 py-3 text-sm text-success">
            <Icon name="check" width={16} height={16} />
            {searchParams.saved
              ? "Listing saved."
              : searchParams.deleted
                ? "Listing deleted."
                : "Listing updated."}
          </p>
        )}

        {searchParams.error && (
          <p className="mt-6 flex items-start gap-2 rounded-xl2 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            <Icon name="close" width={16} height={16} className="mt-0.5 shrink-0" />
            {searchParams.error}
          </p>
        )}

        {/* list */}
        <div className="mt-8">
          {cars.length === 0 ? (
            <div className="card-surface rounded-xl2 p-10 text-center shadow-soft">
              <p className="text-lg font-semibold">No listings yet</p>
              <p className="mt-2 text-muted">Add your first car to get started.</p>
              <Link href="/admin/new" className="btn-primary mt-6">
                New listing
              </Link>
            </div>
          ) : (
            <AdminListings cars={cars} />
          )}
        </div>
      </main>
    </div>
  );
}
