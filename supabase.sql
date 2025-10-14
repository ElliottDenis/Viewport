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
