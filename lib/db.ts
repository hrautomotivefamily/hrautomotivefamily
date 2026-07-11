import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { seedStock, type Car } from "./stock";

/**
 * Storage adapter for car listings.
 *
 * - Production (Vercel / Render): set DATABASE_URL to a Postgres connection
 *   string (e.g. a free Neon database). Data persists there.
 * - Development / local: no DATABASE_URL needed — listings are stored in a
 *   local JSON file at .data/stock.json (created from the seed on first run).
 *
 * Both backends expose the same async API below.
 */

const usePg = !!process.env.DATABASE_URL;

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
    await fileWriteAll(seedStock);
    return [...seedStock];
  }
}

async function fileWriteAll(cars: Car[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(cars, null, 2), "utf8");
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
      // Works with Supabase's transaction pooler (pgbouncer) as well as the
      // direct/session connection, so any connection string they copy is fine.
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
  if (usePg) {
    const db = await sql();
    const rows = await db`SELECT data FROM cars ORDER BY created_at DESC`;
    return rows.map((r) => (r as unknown as { data: Car }).data);
  }
  return fileReadAll();
}

export async function getCar(slug: string): Promise<Car | undefined> {
  if (usePg) {
    const db = await sql();
    const rows = await db`SELECT data FROM cars WHERE slug = ${slug} LIMIT 1`;
    return (rows[0] as unknown as { data: Car } | undefined)?.data;
  }
  const all = await fileReadAll();
  return all.find((c) => c.slug === slug);
}

export async function createCar(car: Car): Promise<void> {
  if (usePg) {
    const db = await sql();
    await db`
      INSERT INTO cars (slug, data)
      VALUES (${car.slug}, ${db.json(car as unknown as import("postgres").JSONValue)})
    `;
    return;
  }
  const all = await fileReadAll();
  await fileWriteAll([car, ...all]);
}

export async function updateCar(slug: string, car: Car): Promise<void> {
  if (usePg) {
    const db = await sql();
    // handle slug rename + data update
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
  await fileWriteAll(next);
}

export async function deleteCar(slug: string): Promise<void> {
  if (usePg) {
    const db = await sql();
    await db`DELETE FROM cars WHERE slug = ${slug}`;
    return;
  }
  const all = await fileReadAll();
  await fileWriteAll(all.filter((c) => c.slug !== slug));
}

export async function slugExists(slug: string, ignore?: string): Promise<boolean> {
  const all = await getStock();
  return all.some((c) => c.slug === slug && c.slug !== ignore);
}
