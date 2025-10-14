-- Enable pgcrypto
create extension if not exists pgcrypto;

create table if not exists public.objects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  uploader_user_id uuid,
  kind text not null check (kind in ('image','video','doc','text')),
  title text,
  text_content text,
  storage_path text,
  mime_type text,
  bytes bigint,
  visibility text not null default 'unlisted' check (visibility in ('unlisted','public','private','channel')),
  downloads_allowed boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists objects_code_idx on public.objects (code);

create table if not exists public.access_codes (
  id uuid primary key default gen_random_uuid(),
  object_id uuid references public.objects(id) on delete cascade,
  code text not null unique,
  max_uses int default 1,
  uses int default 0,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
