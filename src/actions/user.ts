"use server"
import sql from "@/lib/db/postgre";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";
import { UserRegistration, UserLogin, UserProfile, GoogleUserRegistration } from "@/types/User";

export async function registerUser(userData: UserRegistration) {
    const hashedPassword = bcrypt.hash(userData.password, 10);
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

export async function getFullUserProfile(userId: string): Promise<UserProfile | null> {
    const [profile] = await sql`
        SELECT 
            u.id, u.name, u.email, u.avatar_url,
            p.about_me, p.district, p.city, p.latitude, p.longitude,
            p.plz, p.created_at, p.updated_at, p.is_visible,
            COALESCE(json_agg(DISTINCT c.*) FILTER (WHERE c.id IS NOT NULL), '[]') AS children,
            COALESCE(json_agg(DISTINCT h.name) FILTER (WHERE h.id IS NOT NULL), '[]') AS hobbies
        FROM users u
        LEFT JOIN profiles p ON p.userId = u.id
        LEFT JOIN children c ON c.userId = u.id
        LEFT JOIN user_hobbies uh ON uh.userId = u.id
        LEFT JOIN hobbies h ON h.userId = u.id
        WHERE u.id = ${userId}
        GROUP BY u.id` as [UserProfile];
    return profile || null;
}

export async function getUserByEmail(email: string) {
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
    return user || null;
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