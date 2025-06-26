-- Скрипт для обновления базы данных
-- Выполняйте по порядку

-- 1. Создание таблицы районов (если не существует)
CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    plz VARCHAR(10) NOT NULL,
    center_lat DECIMAL(10, 8),
    center_lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Добавление поля district в таблицу profiles (если не существует)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'district') THEN
        ALTER TABLE profiles ADD COLUMN district VARCHAR(100) REFERENCES districts(name);
    END IF;
END $$;

-- 3. Создание индекса для district (если не существует)
CREATE INDEX IF NOT EXISTS idx_profiles_district ON profiles(district);

-- 4. Вставка районов Мюнхена
INSERT INTO districts (name, plz, center_lat, center_lng) VALUES 
    ('Alt-Aubing', '81249', 48.1589, 11.4289),
    ('Alt-Riem', '81829', 48.1234, 11.6890),
    ('Am Hart', '80939', 48.2000, 11.5667),
    ('Am Riesenfeld', '80809', 48.1833, 11.5667),
    ('Am Rüpprechtsplatz', '80331', 48.1351, 11.5820),
    ('Am Westbad', '80686', 48.1333, 11.5333),
    ('Amalienburgstraße', '80636', 48.1500, 11.5667),
    ('Ambachstraße', '81375', 48.1167, 11.5333),
    ('Ambergstraße', '81675', 48.1333, 11.6000),
    ('Amelie-Dietrich-Straße', '80939', 48.2000, 11.5667),
    ('Amiraplatz', '80331', 48.1351, 11.5820),
    ('Ammerthal', '81241', 48.1500, 11.4667),
    ('Amperhof', '80995', 48.1833, 11.4667),
    ('Ampertal', '80995', 48.1833, 11.4667),
    ('Amsterdamstraße', '80339', 48.1333, 11.5333),
    ('An der Hauptfeuerwache', '80331', 48.1351, 11.5820),
    ('An der Messe', '81829', 48.1234, 11.6890),
    ('An der Schäferwiese', '80939', 48.2000, 11.5667),
    ('An der Windmühle', '80331', 48.1351, 11.5820),
    ('Anzinger Straße', '81675', 48.1333, 11.6000)
ON CONFLICT (name) DO NOTHING;

-- 5. Обновление существующих профилей с районами (опционально)
-- Раскомментируйте, если хотите обновить существующие профили
/*
UPDATE profiles SET district = 'Alt-Aubing' WHERE userId = 'user-001';
UPDATE profiles SET district = 'Alt-Riem' WHERE userId = 'user-002';
UPDATE profiles SET district = 'Am Hart' WHERE userId = 'user-003';
UPDATE profiles SET district = 'Am Riesenfeld' WHERE userId = 'user-004';
UPDATE profiles SET district = 'Am Rüpprechtsplatz' WHERE userId = 'user-005';
UPDATE profiles SET district = 'Am Westbad' WHERE userId = 'user-006';
UPDATE profiles SET district = 'Amalienburgstraße' WHERE userId = 'user-007';
UPDATE profiles SET district = 'Ambergstraße' WHERE userId = 'user-008';
UPDATE profiles SET district = 'Amiraplatz' WHERE userId = 'user-009';
UPDATE profiles SET district = 'Ammerthal' WHERE userId = 'user-010';
*/ 