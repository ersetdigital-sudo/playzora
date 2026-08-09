-- PLAYZORA Database Schema
-- Run this in Supabase SQL Editor to set up all required tables
-- IMPORTANT: Drop existing tables first if they have wrong types:
-- DROP TABLE IF EXISTS pricing CASCADE;
-- DROP TABLE IF EXISTS games CASCADE;
-- DROP TABLE IF EXISTS settings CASCADE;
-- DROP TABLE IF EXISTS admin_users CASCADE;

-- 1. Games table
CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  icon_url TEXT DEFAULT '',
  icon_width INTEGER DEFAULT 120,
  icon_height INTEGER DEFAULT 120,
  range_label TEXT DEFAULT '',
  user_id_label TEXT DEFAULT 'ID Pengguna',
  user_id_placeholder TEXT DEFAULT '12345678',
  server_id_label TEXT DEFAULT 'Server ID',
  server_id_placeholder TEXT DEFAULT '1000',
  server_id_required BOOLEAN DEFAULT false,
  hide_server_id BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Pricing table
CREATE TABLE IF NOT EXISTS pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  nominal_label TEXT NOT NULL,
  price INTEGER NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB DEFAULT '""'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies: allow all access (simple setup)
DROP POLICY IF EXISTS "Allow all" ON games;
DROP POLICY IF EXISTS "Allow all" ON pricing;
DROP POLICY IF EXISTS "Allow all" ON settings;
DROP POLICY IF EXISTS "Allow all" ON admin_users;

CREATE POLICY "Allow all" ON games FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON pricing FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON admin_users FOR ALL USING (true) WITH CHECK (true);

-- Seed: insert games using variables for UUIDs
DO $$
DECLARE
  ml_id UUID := gen_random_uuid();
  ff_id UUID := gen_random_uuid();
  pubg_id UUID := gen_random_uuid();
  cod_id UUID := gen_random_uuid();
  mcgg_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO games (id, slug, name, icon_url, icon_width, icon_height, range_label, user_id_label, user_id_placeholder, server_id_label, server_id_placeholder, server_id_required, hide_server_id, is_active, sort_order) VALUES
  (ml_id, 'mobile-legends', 'Mobile Legends', 'https://assets.mobilelegends.com/assets/img/mlbb-hero/mLBB-logo.png', 120, 120, '5 – 5000+', 'ID Pengguna', '12345678', 'Server ID', '1000', true, false, true, 0),
  (ff_id, 'free-fire', 'Free Fire', 'https://img.gamedaim.com/data/games/ff/logo.png', 120, 120, '5 – 7290', 'ID Pengguna', '12345678', '', '', false, true, true, 1),
  (pubg_id, 'pubg-mobile', 'PUBG Mobile', 'https://img.gamedaim.com/data/games/pubg/logo.png', 120, 120, '60 – 8100', 'ID Pengguna', '12345678', '', '', false, true, true, 2),
  (cod_id, 'call-of-duty-mobile', 'Call of Duty: Mobile', 'https://img.gamedaim.com/data/games/cod/logo.png', 120, 120, '10 – 5000', 'ID Pengguna', '12345678', '', '', false, true, true, 3),
  (mcgg_id, 'magic-chess-go-go', 'Magic Chess: Go Go', 'https://img.gamedaim.com/data/games/mcgg/logo.png', 120, 120, '5 – 3000', 'ID Pengguna', '12345678', '', '', false, true, true, 4)
  ON CONFLICT (slug) DO NOTHING;

  -- Mobile Legends pricing
  INSERT INTO pricing (game_id, nominal_label, price, sort_order) VALUES
  (ml_id, '5 Diamond', 1500, 0), (ml_id, '12 Diamond', 3500, 1), (ml_id, '19 Diamond', 5000, 2),
  (ml_id, '28 Diamond', 7500, 3), (ml_id, '56 Diamond', 15000, 4), (ml_id, '85 Diamond', 22000, 5),
  (ml_id, '172 Diamond', 43000, 6), (ml_id, '257 Diamond', 64000, 7),
  (ml_id, '568 Diamond', 139000, 8), (ml_id, '878 Diamond', 215000, 9);

  -- Free Fire pricing
  INSERT INTO pricing (game_id, nominal_label, price, sort_order) VALUES
  (ff_id, '5 Diamond', 1000, 0), (ff_id, '12 Diamond', 2500, 1), (ff_id, '50 Diamond', 8000, 2),
  (ff_id, '70 Diamond', 11000, 3), (ff_id, '100 Diamond', 16000, 4), (ff_id, '140 Diamond', 21000, 5),
  (ff_id, '210 Diamond', 32000, 6), (ff_id, '280 Diamond', 42000, 7),
  (ff_id, '420 Diamond', 63000, 8), (ff_id, '720 Diamond', 109000, 9);

  -- PUBG Mobile pricing
  INSERT INTO pricing (game_id, nominal_label, price, sort_order) VALUES
  (pubg_id, '60 UC', 13000, 0), (pubg_id, '120 UC', 25000, 1), (pubg_id, '180 UC', 37000, 2),
  (pubg_id, '300 UC', 60000, 3), (pubg_id, '600 UC', 115000, 4), (pubg_id, '1500 UC', 280000, 5),
  (pubg_id, '3000 UC', 545000, 6), (pubg_id, '6000 UC', 1070000, 7);

  -- COD Mobile pricing
  INSERT INTO pricing (game_id, nominal_label, price, sort_order) VALUES
  (cod_id, '10 CP', 2000, 0), (cod_id, '56 CP', 10000, 1), (cod_id, '112 CP', 19000, 2),
  (cod_id, '280 CP', 46000, 3), (cod_id, '560 CP', 91000, 4), (cod_id, '1120 CP', 179000, 5);

  -- Magic Chess Go Go pricing
  INSERT INTO pricing (game_id, nominal_label, price, sort_order) VALUES
  (mcgg_id, '5 Starlight', 1000, 0), (mcgg_id, '12 Starlight', 2500, 1), (mcgg_id, '50 Starlight', 8000, 2),
  (mcgg_id, '100 Starlight', 15000, 3), (mcgg_id, '200 Starlight', 29000, 4), (mcgg_id, '500 Starlight', 69000, 5);
END $$;

-- After creating user in Supabase Auth, run this to make them admin:
-- INSERT INTO admin_users (user_id, email) VALUES ('<USER_UUID>', 'playzora@gmail.com');
