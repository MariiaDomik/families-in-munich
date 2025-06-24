-- SQL запрос для добавления 10 пользователей с расширенными профилями
-- Выполняйте запросы по порядку

-- 1. Добавление пользователей в таблицу users
INSERT INTO users (id, email, name, created_at, auth_provider, profileFilled) VALUES
('user-001', 'anna.mueller@example.com', 'Anna Müller', '2024-01-15 10:30:00', 'local', true),
('user-002', 'thomas.weber@example.com', 'Thomas Weber', '2024-01-16 14:20:00', 'local', true),
('user-003', 'maria.garcia@example.com', 'Maria Garcia', '2024-01-17 09:15:00', 'google', true),
('user-004', 'peter.schmidt@example.com', 'Peter Schmidt', '2024-01-18 16:45:00', 'local', true),
('user-005', 'lisa.wagner@example.com', 'Lisa Wagner', '2024-01-19 11:30:00', 'local', true),
('user-006', 'michael.bauer@example.com', 'Michael Bauer', '2024-01-20 13:20:00', 'google', true),
('user-007', 'sarah.fischer@example.com', 'Sarah Fischer', '2024-01-21 08:45:00', 'local', true),
('user-008', 'david.meyer@example.com', 'David Meyer', '2024-01-22 15:10:00', 'local', true),
('user-009', 'julia.koch@example.com', 'Julia Koch', '2024-01-23 12:00:00', 'google', true),
('user-010', 'christian.schulz@example.com', 'Christian Schulz', '2024-01-24 10:25:00', 'local', true);

-- 2. Добавление профилей пользователей
INSERT INTO profiles (userId, city, availability, created_at, updated_at) VALUES
('user-001', 'München', 'Weekends and evenings', '2024-01-15 10:30:00', '2024-01-15 10:30:00'),
('user-002', 'München', 'Weekdays after 6 PM', '2024-01-16 14:20:00', '2024-01-16 14:20:00'),
('user-003', 'München', 'Flexible schedule', '2024-01-17 09:15:00', '2024-01-17 09:15:00'),
('user-004', 'München', 'Weekends only', '2024-01-18 16:45:00', '2024-01-18 16:45:00'),
('user-005', 'München', 'Evenings and weekends', '2024-01-19 11:30:00', '2024-01-19 11:30:00'),
('user-006', 'München', 'Weekdays 9 AM - 5 PM', '2024-01-20 13:20:00', '2024-01-20 13:20:00'),
('user-007', 'München', 'Weekends and holidays', '2024-01-21 08:45:00', '2024-01-21 08:45:00'),
('user-008', 'München', 'Flexible, prefer mornings', '2024-01-22 15:10:00', '2024-01-22 15:10:00'),
('user-009', 'München', 'Afternoons and weekends', '2024-01-23 12:00:00', '2024-01-23 12:00:00'),
('user-010', 'München', 'Evenings after 7 PM', '2024-01-24 10:25:00', '2024-01-24 10:25:00');

-- 3. Добавление детей
INSERT INTO children (userId, name, age, gender, birthday, created_at) VALUES
-- Anna Müller's children
('user-001', 'Emma', 5, 'girl', '2019-03-15', '2024-01-15 10:30:00'),
('user-001', 'Lucas', 3, 'boy', '2021-07-22', '2024-01-15 10:30:00'),

-- Thomas Weber's children
('user-002', 'Sophia', 7, 'girl', '2017-11-08', '2024-01-16 14:20:00'),
('user-002', 'Max', 4, 'boy', '2020-05-12', '2024-01-16 14:20:00'),

-- Maria Garcia's children
('user-003', 'Isabella', 6, 'girl', '2018-09-30', '2024-01-17 09:15:00'),

-- Peter Schmidt's children
('user-004', 'Alexander', 8, 'boy', '2016-02-14', '2024-01-18 16:45:00'),
('user-004', 'Mia', 2, 'girl', '2022-12-03', '2024-01-18 16:45:00'),

-- Lisa Wagner's children
('user-005', 'Noah', 5, 'boy', '2019-06-18', '2024-01-19 11:30:00'),
('user-005', 'Ava', 1, 'girl', '2023-01-25', '2024-01-19 11:30:00'),

-- Michael Bauer's children
('user-006', 'Ethan', 9, 'boy', '2015-08-07', '2024-01-20 13:20:00'),

-- Sarah Fischer's children
('user-007', 'Olivia', 4, 'girl', '2020-04-11', '2024-01-21 08:45:00'),
('user-007', 'William', 6, 'boy', '2018-10-29', '2024-01-21 08:45:00'),

-- David Meyer's children
('user-008', 'Charlotte', 3, 'girl', '2021-12-16', '2024-01-22 15:10:00'),

-- Julia Koch's children
('user-009', 'James', 7, 'boy', '2017-05-20', '2024-01-23 12:00:00'),
('user-009', 'Amelia', 5, 'girl', '2019-11-02', '2024-01-23 12:00:00'),

-- Christian Schulz's children
('user-010', 'Benjamin', 4, 'boy', '2020-03-09', '2024-01-24 10:25:00'),
('user-010', 'Harper', 2, 'girl', '2022-08-14', '2024-01-24 10:25:00');

-- 4. Добавление языков пользователей
INSERT INTO user_languages (userId, languageId, created_at) VALUES
-- Anna Müller: German, English, Russian
('user-001', (SELECT id FROM languages WHERE name = 'German'), '2024-01-15 10:30:00'),
('user-001', (SELECT id FROM languages WHERE name = 'English'), '2024-01-15 10:30:00'),
('user-001', (SELECT id FROM languages WHERE name = 'Russian'), '2024-01-15 10:30:00'),

-- Thomas Weber: German, English
('user-002', (SELECT id FROM languages WHERE name = 'German'), '2024-01-16 14:20:00'),
('user-002', (SELECT id FROM languages WHERE name = 'English'), '2024-01-16 14:20:00'),

-- Maria Garcia: German, English, Spanish
('user-003', (SELECT id FROM languages WHERE name = 'German'), '2024-01-17 09:15:00'),
('user-003', (SELECT id FROM languages WHERE name = 'English'), '2024-01-17 09:15:00'),
('user-003', (SELECT id FROM languages WHERE name = 'Spanish'), '2024-01-17 09:15:00'),

-- Peter Schmidt: German, English, French
('user-004', (SELECT id FROM languages WHERE name = 'German'), '2024-01-18 16:45:00'),
('user-004', (SELECT id FROM languages WHERE name = 'English'), '2024-01-18 16:45:00'),
('user-004', (SELECT id FROM languages WHERE name = 'French'), '2024-01-18 16:45:00'),

-- Lisa Wagner: German, English, Italian
('user-005', (SELECT id FROM languages WHERE name = 'German'), '2024-01-19 11:30:00'),
('user-005', (SELECT id FROM languages WHERE name = 'English'), '2024-01-19 11:30:00'),
('user-005', (SELECT id FROM languages WHERE name = 'Italian'), '2024-01-19 11:30:00'),

-- Michael Bauer: German, English, Turkish
('user-006', (SELECT id FROM languages WHERE name = 'German'), '2024-01-20 13:20:00'),
('user-006', (SELECT id FROM languages WHERE name = 'English'), '2024-01-20 13:20:00'),
('user-006', (SELECT id FROM languages WHERE name = 'Turkish'), '2024-01-20 13:20:00'),

-- Sarah Fischer: German, English, Polish
('user-007', (SELECT id FROM languages WHERE name = 'German'), '2024-01-21 08:45:00'),
('user-007', (SELECT id FROM languages WHERE name = 'English'), '2024-01-21 08:45:00'),
('user-007', (SELECT id FROM languages WHERE name = 'Polish'), '2024-01-21 08:45:00'),

-- David Meyer: German, English, Arabic
('user-008', (SELECT id FROM languages WHERE name = 'German'), '2024-01-22 15:10:00'),
('user-008', (SELECT id FROM languages WHERE name = 'English'), '2024-01-22 15:10:00'),
('user-008', (SELECT id FROM languages WHERE name = 'Arabic'), '2024-01-22 15:10:00'),

-- Julia Koch: German, English, Ukrainian
('user-009', (SELECT id FROM languages WHERE name = 'German'), '2024-01-23 12:00:00'),
('user-009', (SELECT id FROM languages WHERE name = 'English'), '2024-01-23 12:00:00'),
('user-009', (SELECT id FROM languages WHERE name = 'Ukrainian'), '2024-01-23 12:00:00'),

-- Christian Schulz: German, English, French
('user-010', (SELECT id FROM languages WHERE name = 'German'), '2024-01-24 10:25:00'),
('user-010', (SELECT id FROM languages WHERE name = 'English'), '2024-01-24 10:25:00'),
('user-010', (SELECT id FROM languages WHERE name = 'French'), '2024-01-24 10:25:00');

-- 5. Добавление хобби пользователей
INSERT INTO user_hobbies (userId, hobbyId, created_at) VALUES
-- Anna Müller: Hiking, Reading, Cooking
('user-001', (SELECT id FROM hobbies WHERE name = 'Hiking'), '2024-01-15 10:30:00'),
('user-001', (SELECT id FROM hobbies WHERE name = 'Reading'), '2024-01-15 10:30:00'),
('user-001', (SELECT id FROM hobbies WHERE name = 'Cooking'), '2024-01-15 10:30:00'),

-- Thomas Weber: Cycling, Sports, Music
('user-002', (SELECT id FROM hobbies WHERE name = 'Cycling'), '2024-01-16 14:20:00'),
('user-002', (SELECT id FROM hobbies WHERE name = 'Sports'), '2024-01-16 14:20:00'),
('user-002', (SELECT id FROM hobbies WHERE name = 'Music'), '2024-01-16 14:20:00'),

-- Maria Garcia: Swimming, Photography, Traveling
('user-003', (SELECT id FROM hobbies WHERE name = 'Swimming'), '2024-01-17 09:15:00'),
('user-003', (SELECT id FROM hobbies WHERE name = 'Photography'), '2024-01-17 09:15:00'),
('user-003', (SELECT id FROM hobbies WHERE name = 'Traveling'), '2024-01-17 09:15:00'),

-- Peter Schmidt: Gardening, Painting, Yoga
('user-004', (SELECT id FROM hobbies WHERE name = 'Gardening'), '2024-01-18 16:45:00'),
('user-004', (SELECT id FROM hobbies WHERE name = 'Painting'), '2024-01-18 16:45:00'),
('user-004', (SELECT id FROM hobbies WHERE name = 'Yoga'), '2024-01-18 16:45:00'),

-- Lisa Wagner: Dancing, Running, Skiing
('user-005', (SELECT id FROM hobbies WHERE name = 'Dancing'), '2024-01-19 11:30:00'),
('user-005', (SELECT id FROM hobbies WHERE name = 'Running'), '2024-01-19 11:30:00'),
('user-005', (SELECT id FROM hobbies WHERE name = 'Skiing'), '2024-01-19 11:30:00'),

-- Michael Bauer: Hiking, Cycling, Reading
('user-006', (SELECT id FROM hobbies WHERE name = 'Hiking'), '2024-01-20 13:20:00'),
('user-006', (SELECT id FROM hobbies WHERE name = 'Cycling'), '2024-01-20 13:20:00'),
('user-006', (SELECT id FROM hobbies WHERE name = 'Reading'), '2024-01-20 13:20:00'),

-- Sarah Fischer: Swimming, Cooking, Music
('user-007', (SELECT id FROM hobbies WHERE name = 'Swimming'), '2024-01-21 08:45:00'),
('user-007', (SELECT id FROM hobbies WHERE name = 'Cooking'), '2024-01-21 08:45:00'),
('user-007', (SELECT id FROM hobbies WHERE name = 'Music'), '2024-01-21 08:45:00'),

-- David Meyer: Photography, Traveling, Gardening
('user-008', (SELECT id FROM hobbies WHERE name = 'Photography'), '2024-01-22 15:10:00'),
('user-008', (SELECT id FROM hobbies WHERE name = 'Traveling'), '2024-01-22 15:10:00'),
('user-008', (SELECT id FROM hobbies WHERE name = 'Gardening'), '2024-01-22 15:10:00'),

-- Julia Koch: Painting, Dancing, Yoga
('user-009', (SELECT id FROM hobbies WHERE name = 'Painting'), '2024-01-23 12:00:00'),
('user-009', (SELECT id FROM hobbies WHERE name = 'Dancing'), '2024-01-23 12:00:00'),
('user-009', (SELECT id FROM hobbies WHERE name = 'Yoga'), '2024-01-23 12:00:00'),

-- Christian Schulz: Running, Skiing, Sports
('user-010', (SELECT id FROM hobbies WHERE name = 'Running'), '2024-01-24 10:25:00'),
('user-010', (SELECT id FROM hobbies WHERE name = 'Skiing'), '2024-01-24 10:25:00'),
('user-010', (SELECT id FROM hobbies WHERE name = 'Sports'), '2024-01-24 10:25:00');

-- 6. Добавление любимых мест пользователей
INSERT INTO user_favorite_places (userId, placeId, created_at) VALUES
-- Anna Müller: English Garden, Zoo Munich, Marienplatz
('user-001', (SELECT id FROM places WHERE name = 'English Garden'), '2024-01-15 10:30:00'),
('user-001', (SELECT id FROM places WHERE name = 'Zoo Munich'), '2024-01-15 10:30:00'),
('user-001', (SELECT id FROM places WHERE name = 'Marienplatz'), '2024-01-15 10:30:00'),

-- Thomas Weber: Olympic Park, BMW Welt, Allianz Arena
('user-002', (SELECT id FROM places WHERE name = 'Olympic Park'), '2024-01-16 14:20:00'),
('user-002', (SELECT id FROM places WHERE name = 'BMW Welt'), '2024-01-16 14:20:00'),
('user-002', (SELECT id FROM places WHERE name = 'Allianz Arena'), '2024-01-16 14:20:00'),

-- Maria Garcia: Nymphenburg Palace, Isar River, Viktualienmarkt
('user-003', (SELECT id FROM places WHERE name = 'Nymphenburg Palace'), '2024-01-17 09:15:00'),
('user-003', (SELECT id FROM places WHERE name = 'Isar River'), '2024-01-17 09:15:00'),
('user-003', (SELECT id FROM places WHERE name = 'Viktualienmarkt'), '2024-01-17 09:15:00'),

-- Peter Schmidt: Deutsches Museum, Pinakothek, Residenz
('user-004', (SELECT id FROM places WHERE name = 'Deutsches Museum'), '2024-01-18 16:45:00'),
('user-004', (SELECT id FROM places WHERE name = 'Pinakothek'), '2024-01-18 16:45:00'),
('user-004', (SELECT id FROM places WHERE name = 'Residenz'), '2024-01-18 16:45:00'),

-- Lisa Wagner: Hofbräuhaus, Frauenkirche, Karlsplatz
('user-005', (SELECT id FROM places WHERE name = 'Hofbräuhaus'), '2024-01-19 11:30:00'),
('user-005', (SELECT id FROM places WHERE name = 'Frauenkirche'), '2024-01-19 11:30:00'),
('user-005', (SELECT id FROM places WHERE name = 'Karlsplatz'), '2024-01-19 11:30:00'),

-- Michael Bauer: English Garden, Olympic Park, Marienplatz
('user-006', (SELECT id FROM places WHERE name = 'English Garden'), '2024-01-20 13:20:00'),
('user-006', (SELECT id FROM places WHERE name = 'Olympic Park'), '2024-01-20 13:20:00'),
('user-006', (SELECT id FROM places WHERE name = 'Marienplatz'), '2024-01-20 13:20:00'),

-- Sarah Fischer: Zoo Munich, BMW Welt, Viktualienmarkt
('user-007', (SELECT id FROM places WHERE name = 'Zoo Munich'), '2024-01-21 08:45:00'),
('user-007', (SELECT id FROM places WHERE name = 'BMW Welt'), '2024-01-21 08:45:00'),
('user-007', (SELECT id FROM places WHERE name = 'Viktualienmarkt'), '2024-01-21 08:45:00'),

-- David Meyer: Nymphenburg Palace, Isar River, Pinakothek
('user-008', (SELECT id FROM places WHERE name = 'Nymphenburg Palace'), '2024-01-22 15:10:00'),
('user-008', (SELECT id FROM places WHERE name = 'Isar River'), '2024-01-22 15:10:00'),
('user-008', (SELECT id FROM places WHERE name = 'Pinakothek'), '2024-01-22 15:10:00'),

-- Julia Koch: Deutsches Museum, Residenz, Frauenkirche
('user-009', (SELECT id FROM places WHERE name = 'Deutsches Museum'), '2024-01-23 12:00:00'),
('user-009', (SELECT id FROM places WHERE name = 'Residenz'), '2024-01-23 12:00:00'),
('user-009', (SELECT id FROM places WHERE name = 'Frauenkirche'), '2024-01-23 12:00:00'),

-- Christian Schulz: Hofbräuhaus, Allianz Arena, Karlsplatz
('user-010', (SELECT id FROM places WHERE name = 'Hofbräuhaus'), '2024-01-24 10:25:00'),
('user-010', (SELECT id FROM places WHERE name = 'Allianz Arena'), '2024-01-24 10:25:00'),
('user-010', (SELECT id FROM places WHERE name = 'Karlsplatz'), '2024-01-24 10:25:00');

-- Проверка результатов
SELECT 
    u.id,
    u.name,
    u.email,
    p.city,
    p.availability,
    COUNT(DISTINCT c.id) as children_count,
    COUNT(DISTINCT ul.languageId) as languages_count,
    COUNT(DISTINCT uh.hobbyId) as hobbies_count,
    COUNT(DISTINCT ufp.placeId) as places_count
FROM users u
LEFT JOIN profiles p ON u.id = p.userId
LEFT JOIN children c ON u.id = c.userId
LEFT JOIN user_languages ul ON u.id = ul.userId
LEFT JOIN user_hobbies uh ON u.id = uh.userId
LEFT JOIN user_favorite_places ufp ON u.id = ufp.userId
WHERE u.id LIKE 'user-%'
GROUP BY u.id, u.name, u.email, p.city, p.availability
ORDER BY u.id; 