-- Создание таблиц для профилей пользователей

-- Таблица профилей
CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    city VARCHAR(100),
    availability TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица детей
CREATE TABLE IF NOT EXISTS children (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    age INTEGER,
    gender VARCHAR(20),
    birthday DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица языков
CREATE TABLE IF NOT EXISTS languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица связи пользователей с языками
CREATE TABLE IF NOT EXISTS user_languages (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    languageId INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(userId, languageId)
);

-- Таблица хобби
CREATE TABLE IF NOT EXISTS hobbies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица связи пользователей с хобби
CREATE TABLE IF NOT EXISTS user_hobbies (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hobbyId INTEGER NOT NULL REFERENCES hobbies(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(userId, hobbyId)
);

-- Таблица мест
CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица связи пользователей с любимыми местами
CREATE TABLE IF NOT EXISTS user_favorite_places (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    placeId INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(userId, placeId)
);

-- Индексы для улучшения производительности
CREATE INDEX IF NOT EXISTS idx_profiles_userid ON profiles(userId);
CREATE INDEX IF NOT EXISTS idx_children_userid ON children(userId);
CREATE INDEX IF NOT EXISTS idx_user_languages_userid ON user_languages(userId);
CREATE INDEX IF NOT EXISTS idx_user_hobbies_userid ON user_hobbies(userId);
CREATE INDEX IF NOT EXISTS idx_user_favorite_places_userid ON user_favorite_places(userId);

-- Вставка популярных языков
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

-- Вставка популярных хобби
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

-- Вставка популярных мест в Мюнхене
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