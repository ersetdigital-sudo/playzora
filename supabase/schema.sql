-- PLAYZORA Database Schema
-- Run this in Supabase SQL Editor to set up all required tables

-- 1. Games table
CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  game_id TEXT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
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
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies: allow authenticated users full access
CREATE POLICY "Allow authenticated users" ON games FOR ALL USING (true);
CREATE POLICY "Allow authenticated users" ON pricing FOR ALL USING (true);
CREATE POLICY "Allow authenticated users" ON settings FOR ALL USING (true);
CREATE POLICY "Allow authenticated users" ON admin_users FOR ALL USING (true);

-- Seed games data (from static GAMES array)
INSERT INTO games (id, slug, name, icon_url, icon_width, icon_height, range_label, user_id_label, user_id_placeholder, server_id_label, server_id_placeholder, server_id_required, hide_server_id, is_active, sort_order) VALUES
('g-ml', 'mobile-legends', 'Mobile Legends', 'https://assets.mobilelegends.com/assets/img/mlbb-hero/mLBB-logo.png', 120, 120, '5 – 5000+', 'ID Pengguna', '12345678', 'Server ID', '1000', true, false, true, 0),
('g-ff', 'free-fire', 'Free Fire', 'https://img.gamedaim.com/data/games/ff/logo.png', 120, 120, '5 – 7290', 'ID Pengguna', '12345678', '', '', false, true, true, 1),
('g-pubg', 'pubg-mobile', 'PUBG Mobile', 'https://img.gamedaim.com/data/games/pubg/logo.png', 120, 120, '60 – 8100', 'ID Pengguna', '12345678', '', '', false, true, true, 2),
('g-cod', 'call-of-duty-mobile', 'Call of Duty: Mobile', 'https://img.gamedaim.com/data/games/cod/logo.png', 120, 120, '10 – 5000', 'ID Pengguna', '12345678', '', '', false, true, true, 3),
('g-mcgg', 'magic-chess-go-go', 'Magic Chess: Go Go', 'https://img.gamedaim.com/data/games/mcgg/logo.png', 120, 120, '5 – 3000', 'ID Pengguna', '12345678', '', '', false, true, true, 4)
ON CONFLICT (slug) DO NOTHING;

-- Seed pricing for Mobile Legends
INSERT INTO pricing (game_id, nominal_label, price, sort_order) VALUES
('g-ml', '5 Diamond', 1500, 0),
('g-ml', '12 Diamond', 3500, 1),
('g-ml', '19 Diamond', 5000, 2),
('g-ml', '28 Diamond', 7500, 3),
('g-ml', '56 Diamond', 15000, 4),
('g-ml', '85 Diamond', 22000, 5),
('g-ml', '172 Diamond', 43000, 6),
('g-ml', '257 Diamond', 64000, 7),
('g-ml', '568 Diamond', 139000, 8),
('g-ml', '878 Diamond', 215000, 9)
ON CONFLICT DO NOTHING;

-- Seed pricing for Free Fire
INSERT INTO pricing (game_id, nominal_label, price, sort_order) VALUES
('g-ff', '5 Diamond', 1000, 0),
('g-ff', '12 Diamond', 2500, 1),
('g-ff', '50 Diamond', 8000, 2),
('g-ff', '70 Diamond', 11000, 3),
('g-ff', '100 Diamond', 16000, 4),
('g-ff', '140 Diamond', 21000, 5),
('g-ff', '210 Diamond', 32000, 6),
('g-ff', '280 Diamond', 42000, 7),
('g-ff', '420 Diamond', 63000, 8),
('g-ff', '720 Diamond', 109000, 9)
ON CONFLICT DO NOTHING;

-- Seed pricing for PUBG Mobile
INSERT INTO pricing (game_id, nominal_label, price, sort_order) VALUES
('g-pubg', '60 UC', 13000, 0),
('g-pubg', '120 UC', 25000, 1),
('g-pubg', '180 UC', 37000, 2),
('g-pubg', '300 UC', 60000, 3),
('g-pubg', '600 UC', 115000, 4),
('g-pubg', '1500 UC', 280000, 5),
('g-pubg', '3000 UC', 545000, 6),
('g-pubg', '6000 UC', 1070000, 7)
ON CONFLICT DO NOTHING;

-- Seed pricing for COD Mobile
INSERT INTO pricing (game_id, nominal_label, price, sort_order) VALUES
('g-cod', '10 CP', 2000, 0),
('g-cod', '56 CP', 10000, 1),
(' g-cod', '112 CP', 19000, 2),
('g-cod', '280 CP', 46000, 3),
('g-cod', '560 CP', 91000, 4),
('g-cod', '1120 CP', 179000, 5)
ON CONFLICT DO NOTHING;

-- Seed pricing for Magic Chess Go Go
INSERT INTO pricing (game_id, nominal_label, price, sort_order) VALUES
('g-mcgg', '5 Starlight', 1000, 0),
('g-mcgg', '12 Starlight', 2500, 1),
('g-mcgg', '50 Starlight', 8000, 2),
('g-mcgg', '100 Starlight', 15000, 3),
('g-mcgg', '200 Starlight', 29000, 4),
('g-mcgg', '500 Starlight', 69000, 5)
ON CONFLICT DO NOTHING;

-- Insert admin user (playzora@gmail.com) - run AFTER creating the user in Supabase Auth
-- First sign up the user via the app login, then run:
-- INSERT INTO admin_users (user_id, email) VALUES ('<USER_UUID>', 'playzora@gmail.com');
