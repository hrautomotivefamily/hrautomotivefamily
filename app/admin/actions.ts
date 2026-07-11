"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkCredentials,
  createSession,
  destroySession,
  isAuthed,
} from "@/lib/auth";
import { createCar, updateCar, deleteCar, slugExists, getCar } from "@/lib/db";
import { slugify, type Car, type StockStatus } from "@/lib/stock";
import type { FormState } from "@/lib/form";

const STATUSES: StockStatus[] = ["available", "reserved", "sold"];
const TONES: Car["tone"][] = ["navy", "charcoal", "midnight", "slate"];

/* ----------------------------- auth ----------------------------- */

export async function login(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");
  if (!checkCredentials(username, password)) {
    return { error: "Incorrect username or password." };
  }
  await createSession();
  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logout(): Promise<void> {
  destroySession();
  redirect("/admin/login");
}

/* ---------------------------- helpers --------------------------- */

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function toInt(value: FormDataEntryValue | null): number | null {
  const n = parseInt(String(value ?? "").replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

function buildCar(formData: FormData): Car | { error: string } {
  const make = String(formData.get("make") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const title =
    String(formData.get("title") ?? "").trim() || `${make} ${model}`.trim();
  const price = toInt(formData.get("price"));
  const year = toInt(formData.get("year"));

  if (!make || !model) return { error: "Make and model are required." };
  if (price === null) return { error: "A valid price is required." };
  if (year === null) return { error: "A valid year is required." };

  const status = String(formData.get("status") ?? "available") as StockStatus;
  const tone = String(formData.get("tone") ?? "navy") as Car["tone"];
  const transmission =
    String(formData.get("transmission") ?? "Manual") === "Automatic"
      ? "Automatic"
      : "Manual";
  const fuelRaw = String(formData.get("fuel") ?? "Petrol");
  const fuel = (["Petrol", "Diesel", "Hybrid", "Electric"].includes(fuelRaw)
    ? fuelRaw
    : "Petrol") as Car["fuel"];

  const customSlug = String(formData.get("slug") ?? "").trim();
  const slug =
    slugify(customSlug) ||
    slugify(`${title}-${String(formData.get("plateAge") ?? "")}`) ||
    slugify(title);

  return {
    slug,
    make,
    model,
    title,
    year,
    plateAge: String(formData.get("plateAge") ?? "").trim(),
    price,
    mileage: toInt(formData.get("mileage")),
    engine: String(formData.get("engine") ?? "").trim(),
    transmission,
    fuel,
    colour: String(formData.get("colour") ?? "").trim(),
    doors: toInt(formData.get("doors")) ?? 5,
    bodyStyle: String(formData.get("bodyStyle") ?? "Hatchback").trim(),
    status: STATUSES.includes(status) ? status : "available",
    tone: TONES.includes(tone) ? tone : "navy",
    images: parseLines(formData.get("images")),
    summary: String(formData.get("summary") ?? "").trim(),
    features: parseLines(formData.get("features")),
  };
}

async function requireAuth() {
  if (!(await isAuthed())) redirect("/admin/login");
}

/* ----------------------------- CRUD ----------------------------- */

export async function saveCar(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth();

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const built = buildCar(formData);
  if ("error" in built) return { error: built.error };

  const clash = await slugExists(built.slug, originalSlug || undefined);
  if (clash) {
    return {
      error: `A listing with the web address "/stock/${built.slug}" already exists. Change the title or set a different URL slug.`,
    };
  }

  try {
    if (originalSlug) {
      await updateCar(originalSlug, built);
    } else {
      await createCar(built);
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not save the listing." };
  }

  revalidatePath("/");
  revalidatePath("/stock");
  revalidatePath(`/stock/${built.slug}`);
  if (originalSlug && originalSlug !== built.slug) {
    revalidatePath(`/stock/${originalSlug}`);
  }
  revalidatePath("/admin");
  redirect("/admin?saved=1");
}

export async function removeCar(formData: FormData): Promise<void> {
  await requireAuth();
  const slug = String(formData.get("slug") ?? "").trim();
  let error: string | undefined;
  if (slug) {
    try {
      await deleteCar(slug);
      revalidatePath("/");
      revalidatePath("/stock");
      revalidatePath(`/stock/${slug}`);
      revalidatePath("/admin");
    } catch (e) {
      error = e instanceof Error ? e.message : "Could not delete the listing.";
    }
  }
  // redirect() throws by design, so it must live outside the try/catch above
  redirect(error ? `/admin?error=${encodeURIComponent(error)}` : "/admin?deleted=1");
}

export async function quickStatus(formData: FormData): Promise<void> {
  await requireAuth();
  const slug = String(formData.get("slug") ?? "").trim();
  const status = String(formData.get("status") ?? "") as StockStatus;
  let error: string | undefined;
  if (slug && STATUSES.includes(status)) {
    try {
      const car = await getCar(slug);
      if (car) {
        await updateCar(slug, { ...car, status });
        revalidatePath("/");
        revalidatePath("/stock");
        revalidatePath(`/stock/${slug}`);
        revalidatePath("/admin");
      }
    } catch (e) {
      error = e instanceof Error ? e.message : "Could not update the listing.";
    }
  }
  redirect(error ? `/admin?error=${encodeURIComponent(error)}` : "/admin?updated=1");
}
