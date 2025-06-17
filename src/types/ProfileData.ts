import { Child } from "./Child";

export interface ProfileData {
    city: string;
    children: Child[];
    languages: string[];
    hobbies: string[];
    favoritePlaces: string[];
    availability: string;
}

export const initialProfileState: ProfileData = {
  city: '',
  languages: [],
  children: [],
  hobbies: [],
  favoritePlaces: [],
  availability: '',
};