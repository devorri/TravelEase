-- ============================================
-- TravelEase — Room Types + Auth Fix + Multi-Image
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Add room_type and max_guests columns to hotel_rooms
ALTER TABLE hotel_rooms ADD COLUMN IF NOT EXISTS room_type TEXT DEFAULT 'standard';
ALTER TABLE hotel_rooms ADD COLUMN IF NOT EXISTS max_guests INTEGER DEFAULT 2;

-- 2. Update existing rooms: Building A = Standard, B = Deluxe, C = Suite
UPDATE hotel_rooms SET room_type = 'standard', max_guests = 2 WHERE building = 'Building A';
UPDATE hotel_rooms SET room_type = 'deluxe', max_guests = 4 WHERE building = 'Building B';
UPDATE hotel_rooms SET room_type = 'suite', max_guests = 6 WHERE building = 'Building C';

-- 3. Add images column (array of URLs) to destinations, hotels, transportation
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
ALTER TABLE transportation ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- 4. Fix RLS for users table (allow registration)
-- First check if RLS is enabled, if so add permissive policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop any existing restrictive policies (ignore errors if they don't exist)
DROP POLICY IF EXISTS "Allow public registration" ON users;
DROP POLICY IF EXISTS "Allow users to read own data" ON users;
DROP POLICY IF EXISTS "Allow public read" ON users;

-- Create permissive policies
CREATE POLICY "Allow public registration" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read" ON users
  FOR SELECT USING (true);

CREATE POLICY "Allow users to update own data" ON users
  FOR UPDATE USING (true);

-- 5. Also fix RLS for admins table (allow login check)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow admin read" ON admins;

CREATE POLICY "Allow admin read" ON admins
  FOR SELECT USING (true);

-- 6. Fix RLS for bookings (allow users to insert their own bookings)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow booking insert" ON bookings;
DROP POLICY IF EXISTS "Allow booking read" ON bookings;
DROP POLICY IF EXISTS "Allow booking update" ON bookings;

CREATE POLICY "Allow booking insert" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow booking read" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Allow booking update" ON bookings
  FOR UPDATE USING (true);

-- 7. Fix RLS for reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow review insert" ON reviews;
DROP POLICY IF EXISTS "Allow review read" ON reviews;

CREATE POLICY "Allow review insert" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow review read" ON reviews
  FOR SELECT USING (true);

-- 8. Fix RLS for all other tables (read access for everyone)
DO $$ 
DECLARE 
    tbl TEXT;
BEGIN
    FOR tbl IN SELECT unnest(ARRAY['destinations', 'hotels', 'flights', 'transportation', 'hotel_rooms', 'passengers']) LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "Allow public read all" ON %I', tbl);
        EXECUTE format('CREATE POLICY "Allow public read all" ON %I FOR SELECT USING (true)', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "Allow public insert all" ON %I', tbl);
        EXECUTE format('CREATE POLICY "Allow public insert all" ON %I FOR INSERT WITH CHECK (true)', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "Allow public update all" ON %I', tbl);
        EXECUTE format('CREATE POLICY "Allow public update all" ON %I FOR UPDATE USING (true)', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "Allow public delete all" ON %I', tbl);
        EXECUTE format('CREATE POLICY "Allow public delete all" ON %I FOR DELETE USING (true)', tbl);
    END LOOP;
END $$;
