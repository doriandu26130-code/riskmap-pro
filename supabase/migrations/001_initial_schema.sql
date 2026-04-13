-- Schéma initial pour les courtiers, clients et audits.

create table if not exists public.brokers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  subscription_status text not null default 'inactive',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  broker_id uuid not null references public.brokers(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  broker_id uuid not null references public.brokers(id) on delete cascade,
  answers_json jsonb not null default '{}'::jsonb,
  score numeric not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

-- Activation de la sécurité au niveau des lignes (RLS).
alter table public.brokers enable row level security;
alter table public.clients enable row level security;
alter table public.audits enable row level security;
