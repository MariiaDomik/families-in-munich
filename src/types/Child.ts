import { Gender } from "./Gender";

export interface Child {
    id?: string;
    name?: string;
    age: number;
    birthday?: Date;
    gender: Gender;
    hobbies?: string[]; 
}