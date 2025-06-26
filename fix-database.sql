-- Скрипт для исправления структуры базы данных
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

-- 2. Создание таблицы пользователей (если не существует)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password_hash VARCHAR(255),
    auth_provider VARCHAR(50) DEFAULT 'local',
    profileFilled BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Создание таблицы профилей (если не существует)
CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    city VARCHAR(100),
    district VARCHAR(100) REFERENCES districts(name),
    availability TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Создание таблицы детей (если не существует)
CREATE TABLE IF NOT EXISTS children (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    age INTEGER,
    gender VARCHAR(20),
    birthday DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Создание таблицы языков (если не существует)
CREATE TABLE IF NOT EXISTS languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Создание таблицы связи пользователей с языками (если не существует)
CREATE TABLE IF NOT EXISTS user_languages (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    languageId INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(userId, languageId)
);

-- 7. Создание таблицы хобби (если не существует)
CREATE TABLE IF NOT EXISTS hobbies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Создание таблицы связи пользователей с хобби (если не существует)
CREATE TABLE IF NOT EXISTS user_hobbies (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hobbyId INTEGER NOT NULL REFERENCES hobbies(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(userId, hobbyId)
);

-- 9. Создание таблицы мест (если не существует)
CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Создание таблицы связи пользователей с любимыми местами (если не существует)
CREATE TABLE IF NOT EXISTS user_favorite_places (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    placeId INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(userId, placeId)
);

-- 11. Создание индексов (если не существуют)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_profiles_userid ON profiles(userId);
CREATE INDEX IF NOT EXISTS idx_profiles_district ON profiles(district);
CREATE INDEX IF NOT EXISTS idx_children_userid ON children(userId);
CREATE INDEX IF NOT EXISTS idx_user_languages_userid ON user_languages(userId);
CREATE INDEX IF NOT EXISTS idx_user_hobbies_userid ON user_hobbies(userId);
CREATE INDEX IF NOT EXISTS idx_user_favorite_places_userid ON user_favorite_places(userId);

-- 12. Добавление поля district в таблицу profiles (если не существует)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'district') THEN
        ALTER TABLE profiles ADD COLUMN district VARCHAR(100) REFERENCES districts(name);
    END IF;
END $$;

-- 13. Вставка базовых данных (если не существуют)

-- Районы Мюнхена
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

-- Популярные языки
INSERT INTO languages (name) VALUES 
    ('English'),
    ('German'),
    ('Russian'),
    ('Turkish'),
    ('Arabic'),
    ('French'),
    ('Spanish'),
    ('Italian'),
    ('Polish'),
    ('Ukrainian')
ON CONFLICT (name) DO NOTHING;

-- Популярные хобби
INSERT INTO hobbies (name) VALUES 
    ('Hiking'),
    ('Cycling'),
    ('Swimming'),
    ('Reading'),
    ('Cooking'),
    ('Photography'),
    ('Music'),
    ('Sports'),
    ('Traveling'),
    ('Gardening'),
    ('Painting'),
    ('Dancing'),
    ('Yoga'),
    ('Running'),
    ('Skiing')
ON CONFLICT (name) DO NOTHING;

-- Популярные места в Мюнхене
INSERT INTO places (name) VALUES 
    ('English Garden'),
    ('Olympic Park'),
    ('Nymphenburg Palace'),
    ('Isar River'),
    ('Deutsches Museum'),
    ('Zoo Munich'),
    ('BMW Welt'),
    ('Viktualienmarkt'),
    ('Marienplatz'),
    ('Hofbräuhaus'),
    ('Allianz Arena'),
    ('Pinakothek'),
    ('Residenz'),
    ('Frauenkirche'),
    ('Karlsplatz')
ON CONFLICT (name) DO NOTHING;

-- 14. Проверка и вывод информации о созданных таблицах
SELECT 'Database structure updated successfully!' as status; 