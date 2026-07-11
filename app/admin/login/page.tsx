import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";
import { BrandLogo } from "@/components/BrandLogo";
import { adminConfigured } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { from?: string };
}) {
  const from = searchParams.from?.startsWith("/admin") ? searchParams.from : "/admin";
  const configured = adminConfigured();

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6"
      style={{ backgroundColor: "var(--bg-subtle)" }}
    >
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
          <BrandLogo dark={false} heightClass="h-9" />
        </Link>

        <div className="card-surface rounded-xl3 p-8 shadow-soft-lg">
          <h1 className="font-heading text-2xl font-bold">Admin sign in</h1>
          <p className="mt-2 text-sm text-muted">
            Manage your car listings.
          </p>

          {configured ? (
            <div className="mt-6">
              <LoginForm from={from} />
            </div>
          ) : (
            <div className="mt-6 rounded-xl2 border border-hair bg-[color:var(--bg-subtle)] p-4 text-sm text-muted">
              <p className="font-semibold text-[color:var(--fg)]">
                Admin isn&apos;t set up yet
              </p>
              <p className="mt-2">
                Set an{" "}
                <code className="rounded bg-black/10 px-1 dark:bg-white/10">
                  ADMIN_PASSWORD
                </code>{" "}
                environment variable, then reload this page to sign in.
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-muted hover:text-accent">
            ← Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}
