-- Toplixa schema (exact copy) adapted for Playzora
-- Run this in Supabase SQL Editor

-- ===================== TABLES =====================

create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  icon_url text not null default '',
  icon_width int not null default 120,
  icon_height int not null default 120,
  range_label text not null default '',
  user_id_label text not null default 'User ID',
  user_id_placeholder text not null default '123456789',
  server_id_label text not null default 'Server ID',
  server_id_placeholder text not null default '1234',
  server_id_required boolean not null default false,
  hide_server_id boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists pricing (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references games(id) on delete cascade,
  nominal_label text not null,
  price int not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_pricing_game_id on pricing(game_id);
create index if not exists idx_pricing_sort on pricing(game_id, sort_order);
create index if not exists idx_games_slug on games(slug);
create index if not exists idx_games_active on games(is_active) where is_active = true;

-- ===================== ROW LEVEL SECURITY =====================

alter table games enable row level security;
alter table pricing enable row level security;
alter table settings enable row level security;
alter table admin_users enable row level security;

-- PUBLIC READ for games, pricing, settings
create policy "Public read games"
  on games for select
  using (true);

create policy "Public read pricing"
  on pricing for select
  using (true);

create policy "Public read settings"
  on settings for select
  using (true);

-- WRITE only for authenticated admin users
create policy "Admin insert games"
  on games for insert
  to authenticated
  with check (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

create policy "Admin update games"
  on games for update
  to authenticated
  using (
    exists (select 1 from admin_users where user_id = auth.uid())
  )
  with check (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

create policy "Admin delete games"
  on games for delete
  to authenticated
  using (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

create policy "Admin insert pricing"
  on pricing for insert
  to authenticated
  with check (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

create policy "Admin update pricing"
  on pricing for update
  to authenticated
  using (
    exists (select 1 from admin_users where user_id = auth.uid())
  )
  with check (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

create policy "Admin delete pricing"
  on pricing for delete
  to authenticated
  using (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

create policy "Admin update settings"
  on settings for update
  to authenticated
  using (
    exists (select 1 from admin_users where user_id = auth.uid())
  )
  with check (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

create policy "Admin insert settings"
  on settings for insert
  to authenticated
  with check (
    exists (select 1 from admin_users where user_id = auth.uid())
  );

-- admin_users: only admins can read their own row
create policy "Admin read own"
  on admin_users for select
  to authenticated
  using (user_id = auth.uid());

-- ===================== FUNCTIONS =====================

-- Auto-update updated_at on games
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger games_updated_at
  before update on games
  for each row execute function update_updated_at();

create trigger pricing_updated_at
  before update on pricing
  for each row execute function update_updated_at();

create trigger settings_updated_at
  before update on settings
  for each row execute function update_updated_at();

-- ===================== SEED DATA =====================

-- Insert Playzora games
insert into games (slug, name, icon_url, icon_width, icon_height, range_label, user_id_label, user_id_placeholder, server_id_label, server_id_placeholder, server_id_required, hide_server_id, sort_order) values
  ('mobile-legends', 'Mobile Legends', '/images/mobile-legends.svg', 120, 120, 'Diamond 5 – 5000', 'User ID', '123456789', 'Zone ID', '1234', true, false, 1),
  ('free-fire', 'Free Fire', '/images/free-fire.png', 616, 90, 'Diamond 5 – 7290', 'Player ID', '123456789', '', '', false, true, 2),
  ('pubg-mobile', 'PUBG Mobile', '/images/pubg-mobile.jpg', 512, 380, 'UC 60 – 8100', 'User ID', '123456789', '', '', false, true, 3),
  ('call-of-duty-mobile', 'Call of Duty: Mobile', '/images/call-of-duty-mobile.svg', 445, 227, 'CP 80 – 10800', 'UID', '1234567890', '', '', false, true, 4),
  ('magic-chess-go-go', 'Magic Chess: Go Go', '/images/magic-chess-go-go.png', 154, 62, 'Diamond & Pass', 'User ID', '123456789', 'Zone ID', '1234', true, false, 5)
on conflict (slug) do nothing;

-- Mobile Legends pricing
insert into pricing (game_id, nominal_label, price, sort_order)
select g.id, v.nominal_label, v.price, v.sort_order
from games g, (values
  ('5 Diamond', 1500, 1), ('12 Diamond', 3300, 2), ('28 Diamond', 7500, 3),
  ('86 Diamond', 21000, 4), ('172 Diamond', 41000, 5), ('257 Diamond', 62000, 6),
  ('706 Diamond', 168000, 7), ('1412 Diamond', 332000, 8), ('5000 Diamond', 1150000, 9)
) as v(nominal_label, price, sort_order)
where g.slug = 'mobile-legends'
on conflict do nothing;

-- Free Fire pricing
insert into pricing (game_id, nominal_label, price, sort_order)
select g.id, v.nominal_label, v.price, v.sort_order
from games g, (values
  ('5 Diamond', 1600, 1), ('12 Diamond', 3400, 2), ('50 Diamond', 7300, 3),
  ('70 Diamond', 10000, 4), ('140 Diamond', 19500, 5), ('355 Diamond', 48000, 6),
  ('720 Diamond', 95000, 7), ('1450 Diamond', 188000, 8), ('7290 Diamond', 920000, 9)
) as v(nominal_label, price, sort_order)
where g.slug = 'free-fire'
on conflict do nothing;

-- PUBG Mobile pricing
insert into pricing (game_id, nominal_label, price, sort_order)
select g.id, v.nominal_label, v.price, v.sort_order
from games g, (values
  ('60 UC', 15000, 1), ('120 UC', 28000, 2), ('180 UC', 42000, 3),
  ('325 UC', 75000, 4), ('660 UC', 149000, 5), ('985 UC', 219000, 6),
  ('1800 UC', 389000, 7), ('3850 UC', 799000, 8), ('8100 UC', 1599000, 9)
) as v(nominal_label, price, sort_order)
where g.slug = 'pubg-mobile'
on conflict do nothing;

-- Call of Duty Mobile pricing
insert into pricing (game_id, nominal_label, price, sort_order)
select g.id, v.nominal_label, v.price, v.sort_order
from games g, (values
  ('80 CP', 15000, 1), ('160 CP', 29000, 2), ('420 CP', 72000, 3),
  ('880 CP', 149000, 4), ('1760 CP', 289000, 5), ('2400 CP', 389000, 6),
  ('5000 CP', 789000, 7), ('8000 CP', 1249000, 8), ('10800 CP', 1649000, 9)
) as v(nominal_label, price, sort_order)
where g.slug = 'call-of-duty-mobile'
on conflict do nothing;

-- Magic Chess Go Go pricing
insert into pricing (game_id, nominal_label, price, sort_order)
select g.id, v.nominal_label, v.price, v.sort_order
from games g, (values
  ('5 Diamond', 1500, 1), ('12 Diamond', 3300, 2), ('28 Diamond', 7500, 3),
  ('86 Diamond', 21000, 4), ('172 Diamond', 41000, 5), ('257 Diamond', 62000, 6),
  ('706 Diamond', 168000, 7), ('1412 Diamond', 332000, 8), ('Magic Pass', 49000, 9)
) as v(nominal_label, price, sort_order)
where g.slug = 'magic-chess-go-go'
on conflict do nothing;

-- Default settings
insert into settings (key, value) values
  ('qris_image_url', '"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=playzora"')
on conflict (key) do nothing;
