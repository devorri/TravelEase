-- ============================================
-- TravelEase Updates — Rooms and Vice Versa Flights
-- ============================================

-- 1. Create hotel_rooms table
CREATE TABLE IF NOT EXISTS hotel_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  room_number TEXT NOT NULL,
  building TEXT NOT NULL,
  status TEXT DEFAULT 'available',
  UNIQUE(hotel_id, room_number)
);

-- 2. Populate hotel_rooms (Example for all hotels)
DO $$ 
DECLARE 
    h_id UUID;
    b TEXT;
    r INTEGER;
BEGIN
    FOR h_id IN SELECT id FROM hotels LOOP
        FOR b IN SELECT unnest(ARRAY['Building A', 'Building B', 'Building C']) LOOP
            FOR r IN 1..10 LOOP
                INSERT INTO hotel_rooms (hotel_id, room_number, building)
                VALUES (h_id, 
                        CASE 
                            WHEN b = 'Building A' THEN '1' 
                            WHEN b = 'Building B' THEN '2' 
                            ELSE '3' 
                        END || LPAD(r::TEXT, 2, '0'), 
                        b)
                ON CONFLICT DO NOTHING;
            END LOOP;
        END LOOP;
    END LOOP;
END $$;

-- 3. Add room_id to bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS room_id UUID REFERENCES hotel_rooms(id);

-- 4. Add more flights (Return flights and more routes)
-- We need to ensure we have paths from PH major cities to Palawan (PPS, ENI, USU) and back.

-- Return flights to Manila
INSERT INTO flights (origin, destination, airline, departure_time, arrival_time, price, flight_number, aircraft_type, go_lite_price, go_basic_price, go_plus_price, duration_minutes)
VALUES 
('Puerto Princesa', 'Manila', 'TravelEase Air', '14:00', '15:15', 2500, 'TE-201', 'Airbus A320', 2000, 2500, 3500, 75),
('El Nido', 'Manila', 'TravelEase Air', '16:30', '17:45', 3800, 'TE-301', 'Airbus A320', 3000, 3800, 4800, 75),
('Coron', 'Manila', 'TravelEase Air', '10:00', '11:15', 3200, 'TE-401', 'Airbus A320', 2600, 3200, 4200, 75)
ON CONFLICT DO NOTHING;

-- Return flights to Cebu
INSERT INTO flights (origin, destination, airline, departure_time, arrival_time, price, flight_number, aircraft_type, go_lite_price, go_basic_price, go_plus_price, duration_minutes)
VALUES 
('Puerto Princesa', 'Cebu', 'TravelEase Air', '09:00', '10:10', 2200, 'TE-501', 'Airbus A320', 1800, 2200, 3200, 70),
('El Nido', 'Cebu', 'TravelEase Air', '11:00', '12:15', 3500, 'TE-502', 'Airbus A320', 2800, 3500, 4500, 75)
ON CONFLICT DO NOTHING;

-- More routes from PH to Palawan
INSERT INTO flights (origin, destination, airline, departure_time, arrival_time, price, flight_number, aircraft_type, go_lite_price, go_basic_price, go_plus_price, duration_minutes)
VALUES 
('Davao', 'Puerto Princesa', 'TravelEase Air', '08:00', '09:30', 3100, 'TE-601', 'Airbus A320', 2500, 3100, 4100, 90),
('Clark', 'El Nido', 'TravelEase Air', '13:00', '14:20', 3600, 'TE-701', 'Airbus A320', 2900, 3600, 4600, 80)
ON CONFLICT DO NOTHING;
