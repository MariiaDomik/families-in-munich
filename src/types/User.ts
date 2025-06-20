import { Child } from "./Child";
import { Gender } from "./Gender";

export interface User {
    id: string;
    name: string;
    city: string;
    PLZ: number;
    age?: number;
    gender: Gender;
    adress?: string;
    children: Child[];
}

export type UserProfile = User;

export interface UserRegistration {
  email: string;
  password: string;
  name?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}


