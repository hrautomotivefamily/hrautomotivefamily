-- ---------------------------------------------------------------------------
-- HR Automotive — one-time database setup for Supabase.
--
-- Run this ONCE:  Supabase → SQL Editor → New query → paste this → Run.
-- After this, the admin can create/edit/sell listings and they save to Supabase.
--
-- The app talks to Supabase over HTTPS using SUPABASE_URL and the secret
-- SUPABASE_SERVICE_ROLE_KEY (which bypasses row-level security), so no extra
-- policies are required.
-- ---------------------------------------------------------------------------

create table if not exists public.cars (
  slug        text primary key,
  data        jsonb not null,
  created_at  timestamptz not null default now()
);

-- Helps the "newest first" ordering.
create index if not exists cars_created_at_idx on public.cars (created_at desc);
