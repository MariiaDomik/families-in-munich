"use server"
import sql from "@/lib/db/postgre";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";
import { UserRegistration, UserLogin, User, GoogleUserRegistration, UserProfileData } from "@/types/User";
import { ProfileData } from "@/types/ProfileData";
import { Child } from "@/types/Child";

export interface UserForMap {
  id: string;
  name?: string;
  latitude: number;
  longitude: number;
  city?: string;
  district?: string;
  children: Child[];
}

export async function registerUser(userData: UserRegistration) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const created_at = new Date(Date.now()).toISOString();
    const [user] = await sql`INSERT INTO users (email, password_hash, name, created_at, auth_provider) VALUES (${userData.email}, ${hashedPassword}, ${userData.name}, ${created_at}, 'local')`;
    redirect("/");
    return user;
}

export async function registerGoogleUser(userData: GoogleUserRegistration) {
    const created_at = new Date(Date.now()).toISOString();
    const [user] = await sql`INSERT INTO users (email, name, created_at, auth_provider) VALUES (${userData.email}, ${userData.name}, ${created_at}, 'google')`;
    redirect("/");
    return user;
}

export async function getFullUserProfile(userId: string): Promise<User | null> {
  try {
    const [profile] = await sql`
      SELECT
        u.id, u.name, u.email, p.city, p.district, u.avatar_url, p.plz, p.about_me, p.availability,
        COALESCE(json_agg(DISTINCT c.*) FILTER (WHERE c.id IS NOT NULL), '[]') AS children,
        COALESCE(array_agg(DISTINCT l.name) FILTER (WHERE l.id IS NOT NULL), '{}') AS languages,
        COALESCE(array_agg(DISTINCT h.name) FILTER (WHERE h.id IS NOT NULL), '{}') AS hobbies
      FROM users u
      LEFT JOIN profiles p ON p.user_id = u.id
      LEFT JOIN children c ON c.user_id = u.id
      LEFT JOIN user_languages ul ON ul.user_id = u.id
      LEFT JOIN languages l ON ul.languageId = l.id
      LEFT JOIN user_hobbies uh ON uh.user_id = u.id
      LEFT JOIN hobbies h ON uh.hobby_id = h.id
      WHERE u.id = ${userId}
      GROUP BY u.id, p.city, p.district, u.avatar_url, p.plz, p.about_me, p.availability
    `;
    if (!profile) return null;
    // Приводим к типу User, заполняя обязательные поля дефолтными значениями
    return {
      id: profile.id,
      email: profile.email,
      name: profile.name || '',
      city: profile.city || '',
      PLZ: profile.plz || undefined,
      district: profile.district || { id: '', name: '', plz: '' },
      age: undefined,
      gender: profile.gender || 'unknown',
      address: profile.address || '',
      children: profile.children || [],
      about_me: profile.about_me || '',
      avatar_url: profile.avatar_url || '',
      created_at: profile.created_at || undefined,
      updated_at: profile.updated_at || undefined,
      is_visible: profile.is_visible || undefined,
      languages: profile.languages || [],
      hobbies: profile.hobbies || [],
      favoritePlaces: profile.favoritePlaces || [],
      availability: profile.availability || '',
    };
  } catch (error) {
    console.error('Error loading profile data:', error);
    return null;
  }
}

export async function getUserByEmail(email: string) {
    console.log('getUserByEmail called with:', email);
    const [user] = await sql`
        SELECT id, email, name, password_hash, auth_provider 
        FROM users 
        WHERE email = ${email}
    `;
    console.log('getUserByEmail result:', user);
    return user || null;
}

export async function getAllUsers(): Promise<User[]> {
  const users = await sql`
    SELECT
      u.id, u.name, u.email, p.city, 
      CASE 
        WHEN p.district IS NOT NULL THEN 
          json_build_object('id', d.id, 'name', d.name, 'plz', d.plz)
        ELSE NULL 
      END AS district,
      u.avatar_url, p.plz, p.about_me,
      COALESCE(json_agg(DISTINCT c.*) FILTER (WHERE c.id IS NOT NULL), '[]') AS children,
      COALESCE(array_agg(DISTINCT l.name) FILTER (WHERE l.id IS NOT NULL), '{}') AS languages,
      COALESCE(array_agg(DISTINCT h.name) FILTER (WHERE h.id IS NOT NULL), '{}') AS hobbies
    FROM users u
    LEFT JOIN profiles p ON p.user_id = u.id
    LEFT JOIN districts d ON d.name = p.district
    LEFT JOIN children c ON c.user_id = u.id
    LEFT JOIN user_languages ul ON ul.user_id = u.id
    LEFT JOIN languages l ON ul.languageId = l.id
    LEFT JOIN user_hobbies uh ON uh.user_id = u.id
    LEFT JOIN hobbies h ON uh.hobby_id = h.id
    GROUP BY u.id, p.city, p.district, d.id, d.name, d.plz, u.avatar_url, p.plz, p.about_me
  ` as User[];
  return users;
}

// Новые методы для сохранения данных профиля
export async function saveProfileData(userId: string, profileData: ProfileData) {
    try {
        // Начинаем транзакцию
        await sql`BEGIN`;

        // 1. Сохраняем основную информацию профиля
        await saveBasicProfileInfo(userId, profileData);

        // 2. Сохраняем детей
        await saveChildren(userId, profileData.children);

        // 3. Сохраняем языки
        await saveLanguages(userId, profileData.languages);

        // 4. Сохраняем хобби
        await saveHobbies(userId, profileData.hobbies);

        // 5. Сохраняем любимые места
        await saveFavoritePlaces(userId, profileData.favoritePlaces);

        // 6. Сохраняем доступность
        await saveAvailability(userId, profileData.availability);

        // Завершаем транзакцию
        await sql`COMMIT`;

        return { success: true, message: 'Profile saved successfully' };
    } catch (error) {
        // Откатываем транзакцию в случае ошибки
        await sql`ROLLBACK`;
        console.error('Error saving profile:', error);
        return { success: false, message: 'Failed to save profile' };
    }
}

async function saveBasicProfileInfo(userId: string, profileData: ProfileData) {
    const updated_at = new Date().toISOString();
    
    // Проверяем, существует ли уже профиль
    const [existingProfile] = await sql`
        SELECT id FROM profiles WHERE user_id = ${userId}
    `;

    if (existingProfile) {
        // Обновляем существующий профиль
        await sql`
            UPDATE profiles 
            SET city = ${profileData.city}, updated_at = ${updated_at}
            WHERE user_id = ${userId}
        `;
    } else {
        // Создаем новый профиль
        await sql`
            INSERT INTO profiles (user_id, city, created_at, updated_at)
            VALUES (${userId}, ${profileData.city}, ${updated_at}, ${updated_at})
        `;
    }
}

async function saveChildren(userId: string, children: any[]) {
    // Удаляем существующих детей
    await sql`DELETE FROM children WHERE user_id = ${userId}`;

    // Добавляем новых детей
    for (const child of children) {
        if (child.name && child.age) {
            await sql`
                INSERT INTO children (user_id, name, age, gender, birthday)
                VALUES (
                    ${userId}, 
                    ${child.name}, 
                    ${child.age}, 
                    ${child.gender || 'unknown'}, 
                    ${child.birthday ? new Date(child.birthday).toISOString() : null}
                )
            `;
        }
    }
}

async function saveLanguages(userId: string, languages: string[]) {
    // Удаляем существующие языки
    await sql`DELETE FROM user_languages WHERE user_id = ${userId}`;

    // Добавляем новые языки
    for (const language of languages) {
        if (language.trim()) {
            // Сначала проверяем/создаем язык в таблице languages
            let [langRecord] = await sql`
                SELECT id FROM languages WHERE name = ${language.trim()}
            `;

            if (!langRecord) {
                [langRecord] = await sql`
                    INSERT INTO languages (name) VALUES (${language.trim()}) RETURNING id
                `;
            }

            // Связываем пользователя с языком
            await sql`
                INSERT INTO user_languages (user_id, languageId)
                VALUES (${userId}, ${langRecord.id})
            `;
        }
    }
}

async function saveHobbies(userId: string, hobbies: string[]) {
    // Удаляем существующие хобби
    await sql`DELETE FROM user_hobbies WHERE user_id = ${userId}`;

    // Добавляем новые хобби
    for (const hobby of hobbies) {
        if (hobby.trim()) {
            // Сначала проверяем/создаем хобби в таблице hobbies
            let [hobbyRecord] = await sql`
                SELECT id FROM hobbies WHERE name = ${hobby.trim()}
            `;

            if (!hobbyRecord) {
                [hobbyRecord] = await sql`
                    INSERT INTO hobbies (name) VALUES (${hobby.trim()}) RETURNING id
                `;
            }

            // Связываем пользователя с хобби
            await sql`
                INSERT INTO user_hobbies (user_id, hobby_id)
                VALUES (${userId}, ${hobbyRecord.id})
            `;
        }
    }
}

async function saveFavoritePlaces(userId: string, places: string[]) {
    // Пока пропускаем сохранение любимых мест, пока не создадим таблицу
    console.log('Saving favorite places:', places);
    // TODO: Реализовать после создания таблицы user_favorite_places
}

async function saveAvailability(userId: string, availability: string) {
    const updated_at = new Date().toISOString();
    
    // Обновляем доступность в профиле
    await sql`
        UPDATE profiles 
        SET availability = ${availability}, updated_at = ${updated_at}
        WHERE user_id = ${userId}
    `;
}

// Метод для получения данных профиля для useReducer
export async function getProfileDataForReducer(userId: string): Promise<ProfileData> {
    try {
        // Получаем основную информацию профиля
        const [profile] = await sql`
            SELECT city, availability FROM profiles WHERE user_id = ${userId}
        `;

        // Получаем детей
        const children = await sql`
            SELECT name, age, gender, birthday FROM children WHERE user_id = ${userId}
        `;

        // Получаем языки
        const languages = await sql`
            SELECT l.name 
            FROM user_languages ul 
            JOIN languages l ON ul.languageId = l.id 
            WHERE ul.user_id = ${userId}
        `;

        // Получаем хобби
        const hobbies = await sql`
            SELECT h.name 
            FROM user_hobbies uh 
            JOIN hobbies h ON uh.hobbyId = h.id 
            WHERE uh.user_id = ${userId}
        `;

        // Пока возвращаем пустой массив для любимых мест
        const favoritePlaces: any[] = [];

        return {
            city: profile?.city || '',
            children: children.map(child => ({
                id: child.id,
                name: child.name || '',
                age: child.age || 0,
                gender: child.gender || 'unknown',
                birthday: child.birthday ? new Date(child.birthday) : undefined,
                hobbies: []
            })),
            languages: languages.map(lang => lang.name),
            hobbies: hobbies.map(hobby => hobby.name),
            favoritePlaces: favoritePlaces.map(place => place.name),
            availability: profile?.availability || ''
        };
    } catch (error) {
        console.error('Error loading profile data:', error);
        return {
            city: '',
            children: [],
            languages: [],
            hobbies: [],
            favoritePlaces: [],
            availability: ''
        };
    }
}

export async function getUsersByChildAge(age: number) {
    const currentYear = new Date().getFullYear();
    const targetYear = currentYear - age;
  
    const result = await sql`
      SELECT u.id, u.name, json_agg(c.*) AS children
      FROM users u
      JOIN children c ON u.id = c.user_id
      WHERE c.birth_year = ${targetYear}
      GROUP BY u.id
    `;
    return result;
  }
export async function getUsersWithChildrenSimilarAge(age: number) {
    const currentYear = new Date().getFullYear();
    const targetYear = currentYear - age;
  
    const result = await sql`
      SELECT u.id, u.name, json_agg(c.*) AS children
      FROM users u
      JOIN children c ON u.id = c.user_id
      WHERE c.birth_year BETWEEN ${targetYear - 1} AND ${targetYear + 1}
      GROUP BY u.id
    `;
    return result;
  }
  
  export async function getUsersByHobby(hobbyName: string) {
    const result = await sql`
      SELECT u.id, u.name, json_agg(h.name) AS hobbies
      FROM users u
      JOIN user_hobbies uh ON u.id = uh.user_id
      JOIN hobbies h ON uh.hobby_id = h.id
      WHERE h.name ILIKE ${hobbyName}
      GROUP BY u.id
    `;
    return result;
  }
  
  export async function getUsersByDistrict(district: string) {
    const result = await sql`
      SELECT u.id, u.name, p.district
      FROM users u
      JOIN profiles p ON u.id = p.user_id
      WHERE p.district = ${district}
    `;
    return result;
  }
  
  export async function getNearbyUsers(lat: number, lng: number, radiusKm: number = 5) {
    const result = await sql`
      SELECT u.id, u.name, p.latitude, p.longitude
      FROM users u
      JOIN profiles p ON u.id = p.user_id
      WHERE earth_distance(ll_to_earth(${lat}, ${lng}), ll_to_earth(p.latitude, p.longitude)) < ${radiusKm * 1000}
    `;
    return result;
  }
  
  export async function matchUsersBySharedHobbies(userId: string) {
    const result = await sql`
      SELECT u.id, u.name, COUNT(*) as shared_hobbies
      FROM users u
      JOIN user_hobbies uh ON u.id = uh.user_id
      WHERE uh.hobby_id IN (
        SELECT hobby_id FROM user_hobbies WHERE user_id = ${userId}
      ) AND u.id != ${userId}
      GROUP BY u.id
      ORDER BY shared_hobbies DESC
    `;
    return result;
  }
  
  export async function getChatHistory(userId: string, friendId: string) {
    const result = await sql`
      SELECT m.*
      FROM messages m
      JOIN conversation_members cm1 ON m.conversation_id = cm1.conversation_id AND cm1.user_id = ${userId}
      JOIN conversation_members cm2 ON m.conversation_id = cm2.conversation_id AND cm2.user_id = ${friendId}
      ORDER BY m.created_at ASC
    `;
    return result;
  }
  
  export async function getUpcomingEventsNearby(lat: number, lng: number, daysAhead: number = 7) {
    const result = await sql`
      SELECT * FROM events
      WHERE earth_distance(ll_to_earth(${lat}, ${lng}), ll_to_earth(latitude, longitude)) < 5000
      AND date <= now() + interval '${daysAhead} days'
      ORDER BY date ASC
    `;
    return result;
  }

export async function createTestUser() {
  try {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    
    const [user] = await sql`
      INSERT INTO users (email, name, password_hash, auth_provider, profileFilled)
      VALUES (${testEmail}, 'Test User', ${hashedPassword}, 'local', false)
      ON CONFLICT (email) DO UPDATE SET 
        name = EXCLUDED.name,
        password_hash = EXCLUDED.password_hash
      RETURNING id, email, name, profileFilled
    `;
    
    console.log('Test user created/updated:', user);
    return user;
  } catch (error) {
    console.error('Error creating test user:', error);
    return null;
  }
}

export async function getLanguages() {
  const languages = await sql`SELECT * FROM languages ORDER BY name`;
  return languages;
}

export async function getHobbies() {
  const hobbies = await sql`SELECT * FROM hobbies ORDER BY name`;
  return hobbies;
}

export async function getUsersForMap(): Promise<UserForMap[]> {
  try {
    const users = await sql`
      SELECT
        u.id, 
        u.name, 
        u.email,
        COALESCE(p.latitude, 48.1351) as latitude,
        COALESCE(p.longitude, 11.5820) as longitude,
        p.city,
        CASE 
          WHEN p.district IS NOT NULL THEN 
            json_build_object('id', d.id, 'name', d.name, 'plz', d.plz)
          ELSE NULL 
        END AS district,
        COALESCE(json_agg(DISTINCT c.*) FILTER (WHERE c.id IS NOT NULL), '[]') AS children
      FROM users u
      LEFT JOIN profiles p ON p.user_id = u.id
      LEFT JOIN districts d ON d.name = p.district
      LEFT JOIN children c ON c.user_id = u.id
      WHERE p.latitude IS NOT NULL AND p.longitude IS NOT NULL
      GROUP BY u.id, u.name, u.email, p.latitude, p.longitude, p.city, p.district, d.id, d.name, d.plz
    ` as UserForMap[];
    
    return users.map(user => ({
      ...user,
      children: user.children || []
    }));
  } catch (error) {
    console.error('Error fetching users for map:', error);
    return [];
  }
}