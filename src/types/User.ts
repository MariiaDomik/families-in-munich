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


