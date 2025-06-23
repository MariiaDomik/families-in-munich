import { Child } from "./Child";
import { District } from "./District";
import { Gender } from "./Gender";

export interface User {
    id: string;
    name: string;
    city: string;
    PLZ: number;
    district: District;
    age?: number;
    gender: Gender;
    adress?: string;
    children: Child[];
    about_me: string;
    avatar_url: string;
}

export type UserProfile = User;

export interface UserRegistration {
  email: string;
  password: string;
  name?: string;
}

export interface GoogleUserRegistration {
  email: string;
  name?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}


