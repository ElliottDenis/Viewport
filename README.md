# 🔐 Locker Starter (Next.js + Supabase)

A minimal starter to upload **image / video / document / text**, get a short **code**, and let others view via the code.

## Quickstart

1. **Create a Supabase project** → copy `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SERVICE_ROLE`  
2. **Create a Storage bucket** named `locker` (or change `SUPABASE_BUCKET`)  
3. **Create the DB table** (paste the SQL below in Supabase SQL Editor)  
4. Copy `.env.example` → `.env.local` and fill in values  
5. Install & run:

```bash
npm i
npm run dev
```

Open http://localhost:3000

## SQL (run in Supabase)

```sql
create extension if not exists pgcrypto;

create table if not exists public.objects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  kind text not null check (kind in ('image','video','doc','text')),
  title text,
  text_content text,
  storage_path text,
  mime_type text,
  bytes bigint,
  downloads_allowed boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists objects_code_idx on public.objects (code);
```

## Routes

- `POST /api/objects` → create object (and generate **code**)
- `POST /api/objects/:id/upload-url` → signed URL for direct file upload
- `POST /api/objects/:id/confirm` → save storage path + metadata
- `GET /api/code/:code` → resolve code → `{ id, ... }`
- `GET /api/objects/:id/meta` → metadata for viewer page
- `GET /api/objects/:id/access` → short-lived signed URL (or text)

## Notes

- Service Role key is **server-only** (used in API routes). Never expose it in client components.
- Signed URLs are short-lived (60s). Refresh page to re-generate.
- You can add rate-limiting (e.g. Upstash Redis) to throttle brute-force code lookups.
- To strip EXIF or scan files, use a background worker or Storage hooks later.
