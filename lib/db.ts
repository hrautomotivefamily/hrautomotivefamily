import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { seedStock, type Car } from "./stock";
import type { GalleryItem } from "./showcase";

/**
 * Storage adapter for car listings. Three backends, chosen automatically:
 *
 * 1. Supabase over HTTPS (recommended) — set SUPABASE_URL and
 *    SUPABASE_SERVICE_ROLE_KEY. No connection string / pooler needed. Requires
 *    a `cars` table (see supabase-schema.sql — run it once in the SQL editor).
 * 2. Direct Postgres — set DATABASE_URL (auto-creates the table).
 * 3. Local JSON file (.data/stock.json) — development only, when neither is set.
 */

const useSupabase =
  !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
const usePg = !useSupabase && !!process.env.DATABASE_URL;

const NO_DB_HINT =
  "Listings can't be saved yet. In your hosting environment set SUPABASE_URL and " +
  "SUPABASE_SERVICE_ROLE_KEY (and run the one-time setup SQL), then redeploy.";

const NO_TABLE_HINT =
  "The `cars` table doesn't exist yet. Open Supabase → SQL Editor and run the " +
  "setup SQL from supabase-schema.sql, then try again.";

const GALLERY_TABLE_HINT =
  "The `gallery` table doesn't exist yet. Open Supabase → SQL Editor and run the " +
  "gallery table SQL from supabase-schema.sql, then try again.";

/* ------------------------------------------------------------------ */
/* Supabase (HTTPS) backend                                            */
/* ------------------------------------------------------------------ */

type SupabaseClient = import("@supabase/supabase-js").SupabaseClient;
let sbClient: SupabaseClient | null = null;

async function sb(): Promise<SupabaseClient> {
  if (!sbClient) {
    const { createClient } = await import("@supabase/supabase-js");
    sbClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  }
  return sbClient;
}

function isMissingTable(err: { code?: string; message?: string } | null) {
  if (!err) return false;
  return (
    err.code === "PGRST205" ||
    err.code === "42P01" ||
    /relation .*cars.* does not exist|could not find the table/i.test(
      err.message ?? ""
    )
  );
}

async function supabaseSeedIfEmpty() {
  const client = await sb();
  await client
    .from("cars")
    .upsert(
      seedStock.map((c) => ({ slug: c.slug, data: c })),
      { onConflict: "slug" }
    );
}

/* ------------------------------------------------------------------ */
/* JSON file backend                                                   */
/* ------------------------------------------------------------------ */

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "stock.json");

async function fileReadAll(): Promise<Car[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Car[];
  } catch {
    try {
      await fileWriteAll(seedStock);
    } catch {
      /* read-only filesystem — serve seed from memory */
    }
    return [...seedStock];
  }
}

async function fileWriteAll(cars: Car[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(cars, null, 2), "utf8");
}

async function fileMutate(next: Car[]): Promise<void> {
  try {
    await fileWriteAll(next);
  } catch {
    throw new Error(NO_DB_HINT);
  }
}

/* ------------------------------------------------------------------ */
/* Postgres backend                                                    */
/* ------------------------------------------------------------------ */

let sqlClient: import("postgres").Sql | null = null;
let schemaReady = false;

async function sql() {
  if (!sqlClient) {
    const postgres = (await import("postgres")).default;
    sqlClient = postgres(process.env.DATABASE_URL!, {
      ssl: "require",
      max: 3,
      idle_timeout: 20,
      prepare: false,
    });
  }
  if (!schemaReady) {
    await sqlClient`
      CREATE TABLE IF NOT EXISTS cars (
        slug        TEXT PRIMARY KEY,
        data        JSONB NOT NULL,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    const [{ count }] = await sqlClient`SELECT count(*)::int AS count FROM cars`;
    if (count === 0) {
      for (const car of [...seedStock].reverse()) {
        await sqlClient`
          INSERT INTO cars (slug, data) VALUES (${car.slug}, ${sqlClient.json(
            car as unknown as import("postgres").JSONValue
          )})
          ON CONFLICT (slug) DO NOTHING
        `;
      }
    }
    schemaReady = true;
  }
  return sqlClient;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export async function getStock(): Promise<Car[]> {
  if (useSupabase) {
    try {
      const client = await sb();
      const { data, error } = await client
        .from("cars")
        .select("data")
        .order("created_at", { ascending: false });
      if (error) {
        if (isMissingTable(error)) return [...seedStock];
        console.error("Supabase getStock error:", error.message);
        return [...seedStock];
      }
      if (!data || data.length === 0) {
        await supabaseSeedIfEmpty();
        return [...seedStock];
      }
      return data.map((r) => (r as { data: Car }).data);
    } catch (e) {
      console.error("Supabase getStock exception:", e);
      return [...seedStock];
    }
  }
  if (usePg) {
    const db = await sql();
    const rows = await db`SELECT data FROM cars ORDER BY created_at DESC`;
    return rows.map((r) => (r as unknown as { data: Car }).data);
  }
  return fileReadAll();
}

export async function getCar(slug: string): Promise<Car | undefined> {
  if (useSupabase) {
    const client = await sb();
    const { data, error } = await client
      .from("cars")
      .select("data")
      .eq("slug", slug)
      .maybeSingle();
    if (error) {
      if (isMissingTable(error)) return seedStock.find((c) => c.slug === slug);
      throw new Error(error.message);
    }
    return (data as { data: Car } | null)?.data;
  }
  if (usePg) {
    const db = await sql();
    const rows = await db`SELECT data FROM cars WHERE slug = ${slug} LIMIT 1`;
    return (rows[0] as unknown as { data: Car } | undefined)?.data;
  }
  const all = await fileReadAll();
  return all.find((c) => c.slug === slug);
}

export async function createCar(car: Car): Promise<void> {
  if (useSupabase) {
    const client = await sb();
    const { error } = await client.from("cars").insert({ slug: car.slug, data: car });
    if (error) throw new Error(isMissingTable(error) ? NO_TABLE_HINT : error.message);
    return;
  }
  if (usePg) {
    const db = await sql();
    await db`
      INSERT INTO cars (slug, data)
      VALUES (${car.slug}, ${db.json(car as unknown as import("postgres").JSONValue)})
    `;
    return;
  }
  const all = await fileReadAll();
  await fileMutate([car, ...all]);
}

export async function updateCar(slug: string, car: Car): Promise<void> {
  if (useSupabase) {
    const client = await sb();
    const { error } = await client
      .from("cars")
      .update({ slug: car.slug, data: car })
      .eq("slug", slug);
    if (error) throw new Error(isMissingTable(error) ? NO_TABLE_HINT : error.message);
    return;
  }
  if (usePg) {
    const db = await sql();
    await db`
      UPDATE cars SET slug = ${car.slug}, data = ${db.json(
        car as unknown as import("postgres").JSONValue
      )}
      WHERE slug = ${slug}
    `;
    return;
  }
  const all = await fileReadAll();
  const next = all.map((c) => (c.slug === slug ? car : c));
  await fileMutate(next);
}

export async function deleteCar(slug: string): Promise<void> {
  if (useSupabase) {
    const client = await sb();
    const { error } = await client.from("cars").delete().eq("slug", slug);
    if (error) throw new Error(isMissingTable(error) ? NO_TABLE_HINT : error.message);
    return;
  }
  if (usePg) {
    const db = await sql();
    await db`DELETE FROM cars WHERE slug = ${slug}`;
    return;
  }
  const all = await fileReadAll();
  await fileMutate(all.filter((c) => c.slug !== slug));
}

export async function slugExists(slug: string, ignore?: string): Promise<boolean> {
  const all = await getStock();
  return all.some((c) => c.slug === slug && c.slug !== ignore);
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");

async function galleryFileRead(): Promise<GalleryItem[]> {
  try {
    return JSON.parse(await fs.readFile(GALLERY_FILE, "utf8")) as GalleryItem[];
  } catch {
    return [];
  }
}
async function galleryFileWrite(items: GalleryItem[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.writeFile(GALLERY_FILE, JSON.stringify(items, null, 2), "utf8");
  } catch {
    throw new Error(NO_DB_HINT);
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (useSupabase) {
    try {
      const client = await sb();
      const { data, error } = await client
        .from("gallery")
        .select("data")
        .order("created_at", { ascending: false });
      if (error) {
        if (!isMissingTable(error)) console.error("getGallery:", error.message);
        return [];
      }
      return (data ?? []).map((r) => (r as { data: GalleryItem }).data);
    } catch (e) {
      console.error("getGallery exception:", e);
      return [];
    }
  }
  if (usePg) {
    const db = await sql();
    await db`CREATE TABLE IF NOT EXISTS gallery (id TEXT PRIMARY KEY, data JSONB NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
    const rows = await db`SELECT data FROM gallery ORDER BY created_at DESC`;
    return rows.map((r) => (r as unknown as { data: GalleryItem }).data);
  }
  return galleryFileRead();
}

export async function addGalleryItems(items: GalleryItem[]): Promise<void> {
  if (items.length === 0) return;
  if (useSupabase) {
    const client = await sb();
    const { error } = await client
      .from("gallery")
      .insert(items.map((it) => ({ id: it.id, data: it })));
    if (error) throw new Error(isMissingTable(error) ? GALLERY_TABLE_HINT : error.message);
    return;
  }
  if (usePg) {
    const db = await sql();
    await db`CREATE TABLE IF NOT EXISTS gallery (id TEXT PRIMARY KEY, data JSONB NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
    for (const it of items) {
      await db`INSERT INTO gallery (id, data) VALUES (${it.id}, ${db.json(
        it as unknown as import("postgres").JSONValue
      )}) ON CONFLICT (id) DO NOTHING`;
    }
    return;
  }
  const all = await galleryFileRead();
  await galleryFileWrite([...items, ...all]);
}

export async function updateGalleryItem(id: string, patch: Partial<GalleryItem>): Promise<void> {
  if (useSupabase) {
    const client = await sb();
    const { data, error } = await client.from("gallery").select("data").eq("id", id).maybeSingle();
    if (error) throw new Error(isMissingTable(error) ? GALLERY_TABLE_HINT : error.message);
    const current = (data as { data: GalleryItem } | null)?.data;
    if (!current) return;
    const next = { ...current, ...patch };
    const { error: upErr } = await client.from("gallery").update({ data: next }).eq("id", id);
    if (upErr) throw new Error(upErr.message);
    return;
  }
  if (usePg) {
    const db = await sql();
    const rows = await db`SELECT data FROM gallery WHERE id = ${id} LIMIT 1`;
    const current = (rows[0] as unknown as { data: GalleryItem } | undefined)?.data;
    if (!current) return;
    const next = { ...current, ...patch };
    await db`UPDATE gallery SET data = ${db.json(
      next as unknown as import("postgres").JSONValue
    )} WHERE id = ${id}`;
    return;
  }
  const all = await galleryFileRead();
  await galleryFileWrite(all.map((g) => (g.id === id ? { ...g, ...patch } : g)));
}

export async function deleteGalleryItem(id: string): Promise<void> {
  if (useSupabase) {
    const client = await sb();
    const { error } = await client.from("gallery").delete().eq("id", id);
    if (error) throw new Error(isMissingTable(error) ? GALLERY_TABLE_HINT : error.message);
    return;
  }
  if (usePg) {
    const db = await sql();
    await db`DELETE FROM gallery WHERE id = ${id}`;
    return;
  }
  const all = await galleryFileRead();
  await galleryFileWrite(all.filter((g) => g.id !== id));
}
