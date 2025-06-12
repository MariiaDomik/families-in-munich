export interface User {
    id: string;
    name: string;
    city: string;
    PLZ: number;
    age?: number;
    sex: Sex;
    adress?: string;
    children: Child[];
}

export interface Child {
    id: string;
    name?: string;
    age: number;
    birthday?: Date;
    sex: Sex;
    hobbies?: string[]; 
}

export enum Sex {
    female = "f",
    male = "m"
}