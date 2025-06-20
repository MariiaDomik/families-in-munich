"use server"
import sql from "@/lib/db/postgre";
import bcrypt from "bcrypt"
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRegistration, UserLogin } from "@/types/User";

export async function registerUser(userData: UserRegistration) {
    const hashedPassword = bcrypt.hash(userData.password, 10);
    const created_at = new Date(Date.now()).toISOString();
    const [user] = await sql`INSERT INTO users (email, password_hash, name, created_at) VALUES (${userData.email}, ${hashedPassword}, ${data.name}, ${created_at})`;
    redirect("/profile/completeRegistration");
}

export async function loginUser(userData: UserLogin): Promise<{ success: boolean, token: string | null}> {
    const [user] = await sql`SELECT * FROM users WHERE email = ${userData.email}`;
    if(!user)
        return {success: false, token: null };

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    await sql`DELETE FROM token WHERE userId = ${user.id}`
    await sql`INSERT INTO token (userId, token, expires) VALUES (${user.id}, ${token}, ${expires.toDateString()})`;
    const cookieStore = await cookies();
    cookieStore.set({
        name: "token",
        value: token,
        httpOnly: false,
        path: "/",
    })
    redirect("/");
    return { success: true, token: token }
}

export async function  getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const [user] = await sql`SELECT * FROM users
    INNER JOIN token ON tokem.userId = users.id WHERE token = ${token}`
    return user;
}

export async function getFullUserProfile(userId: string) {
    
}