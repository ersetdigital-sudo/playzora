-- Toplixa migration: Add form validation columns
-- Run this ONLY if you already ran 001_initial.sql before
-- This adds new columns for dynamic form labels and placeholders

-- Add new columns to games table
ALTER TABLE games ADD COLUMN IF NOT EXISTS user_id_placeholder text NOT NULL DEFAULT '123456789';
ALTER TABLE games ADD COLUMN IF NOT EXISTS server_id_placeholder text NOT NULL DEFAULT '1234';
ALTER TABLE games ADD COLUMN IF NOT EXISTS hide_server_id boolean NOT NULL DEFAULT false;

-- Update existing games with correct labels and placeholders
UPDATE games SET
  user_id_label = 'User ID',
  user_id_placeholder = '123456789',
  server_id_label = 'Server ID',
  server_id_placeholder = '1234',
  server_id_required = false,
  hide_server_id = true
WHERE slug = 'pubg-mobile';

UPDATE games SET
  user_id_label = 'User ID',
  user_id_placeholder = '123456789',
  server_id_label = 'Zone ID',
  server_id_placeholder = '1234',
  server_id_required = true,
  hide_server_id = false
WHERE slug = 'mobile-legends';

UPDATE games SET
  user_id_label = 'Player ID',
  user_id_placeholder = '123456789',
  server_id_label = 'Server ID',
  server_id_placeholder = '1234',
  server_id_required = false,
  hide_server_id = true
WHERE slug = 'free-fire';

UPDATE games SET
  user_id_label = 'User ID',
  user_id_placeholder = '123456789',
  server_id_label = 'Zone ID',
  server_id_placeholder = '1234',
  server_id_required = true,
  hide_server_id = false
WHERE slug = 'magic-chess-go-go';

UPDATE games SET
  user_id_label = 'UID',
  user_id_placeholder = '1234567890',
  server_id_label = 'Server ID',
  server_id_placeholder = '1234',
  server_id_required = false,
  hide_server_id = true
WHERE slug = 'call-of-duty-mobile';
