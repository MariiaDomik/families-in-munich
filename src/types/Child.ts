import { Gender } from "./Gender";

export interface Child {
    id?: string;
    name?: string;
    age: number;
    birthday?: Date;
    gender: Gender;
    hobbies?: string[]; 
}

export interface ChildSimple {
    gender: Gender;
    age: number;
  }