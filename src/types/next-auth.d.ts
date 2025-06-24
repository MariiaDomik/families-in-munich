import NextAuth from "next-auth";
import { BaseUser } from "./User";

declare module "next-auth" {
    interface User extends BaseUser {}

    interface Session {
        user: BaseUser
    }
}

declare module "next-auth/jwt" {
    interface JWT extends BaseUser {}
}