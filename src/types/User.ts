import { Child } from "./Child";
import { District } from "./District";
import { Gender } from "./Gender";

// Базовый тип пользователя для аутентификации
export interface BaseUser {
  id: string;
  email: string;
  name?: string;
  profileFilled?: boolean;
}

// Полный профиль пользователя
export interface User extends BaseUser {
  city: string;
  PLZ: number;
  district: District;
  age?: number;
  gender: Gender;
  address?: string;
  children: Child[];
  about_me?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
  is_visible?: boolean;
  languages?: string[];
  hobbies?: string[];
  favoritePlaces?: string[];
  availability?: string;
}

// Пользователь с координатами для карты
export interface UserWithLocation extends User {
  latitude: number;
  longitude: number;
}

// Типы для регистрации и аутентификации
export interface UserRegistration {
  email: string;
  password: string;
  name?: string;
}

export interface EventParticipant {
  id: string;
  avatar_url: string;
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

// Тип для создания/обновления профиля
export interface UserProfileData {
  city: string;
  children: Child[];
  languages: string[];
  hobbies: string[];
  favoritePlaces: string[];
  availability: string;
}

// Утилитарные типы
export type UserProfile = User;
export type UserForMap = UserWithLocation;


