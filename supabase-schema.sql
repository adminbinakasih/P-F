-- ============================================================
-- SCHEMA untuk Undangan Pieter & Febriyanti
-- Jalankan di Supabase SQL Editor
-- ============================================================

-- Tabel RSVP
CREATE TABLE IF NOT EXISTS rsvp (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  phone         TEXT,
  attendance    TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir', 'mungkin')),
  guest_count   INTEGER NOT NULL DEFAULT 1,
  message       TEXT,
  invitation_slug TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Ucapan / Wishes
CREATE TABLE IF NOT EXISTS wishes (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  message       TEXT NOT NULL,
  invitation_slug TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_rsvp_slug ON rsvp (invitation_slug);
CREATE INDEX IF NOT EXISTS idx_rsvp_created ON rsvp (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wishes_slug ON wishes (invitation_slug);
CREATE INDEX IF NOT EXISTS idx_wishes_created ON wishes (created_at DESC);

-- Row Level Security (RLS) — izinkan akses publik untuk insert & select
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Policy: siapa saja bisa insert (tamu submit RSVP/ucapan)
CREATE POLICY "Allow public insert rsvp"  ON rsvp  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert wishes" ON wishes FOR INSERT WITH CHECK (true);

-- Policy: siapa saja bisa select (admin dashboard & tampilan ucapan)
CREATE POLICY "Allow public select rsvp"  ON rsvp  FOR SELECT USING (true);
CREATE POLICY "Allow public select wishes" ON wishes FOR SELECT USING (true);
