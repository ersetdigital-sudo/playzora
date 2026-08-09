-- Playzora initial schema
-- Run this migration in Supabase SQL Editor

create extension if not exists "uuid-ossp";

create table if not exists public.games (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  icon_url text default '',
  icon_width int default 120,
  icon_height int default 120,
  range_label text default '',
  user_id_label text default 'ID Pengguna',
  user_id_placeholder text default '12345678',
  server_id_label text default 'Server ID',
  server_id_placeholder text default '1000',
  server_id_required boolean default false,
  hide_server_id boolean default false,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.pricing (
  id uuid primary key default uuid_generate_v4(),
  game_id uuid references public.games(id) on delete cascade,
  nominal_label text not null,
  price int not null,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.settings (
  key text primary key,
  value jsonb default null,
  updated_at timestamptz default now()
);

create table if not exists public.admin_users (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.games enable row level security;
alter table public.pricing enable row level security;
alter table public.settings enable row level security;
alter table public.admin_users enable row level security;

-- Public read policies for games and pricing
create policy "Public can read active games" on public.games for select using (is_active = true);
create policy "Public can read pricing" on public.pricing for select using (true);

-- Admin policies (authenticated users with admin_users entry)
create policy "Admins can manage games" on public.games for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);
create policy "Admins can manage pricing" on public.pricing for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);
create policy "Admins can manage settings" on public.settings for all using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);
create policy "Admins can view admin_users" on public.admin_users for select using (
  exists (select 1 from public.admin_users where user_id = auth.uid())
);

-- Seed default settings
insert into public.settings (key, value) values
  ('qris_image_url', '""'),
  ('social_links', '{"instagram":"","tiktok":"","whatsapp":"","telegram":""}')
on conflict (key) do nothing;
