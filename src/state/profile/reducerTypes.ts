import { Child } from "@/types/Child";
import { ProfileData } from "@/types/ProfileData";

export type Action = 
    { 
        type: ActionTypes.updateField;
        key: keyof ProfileData;
        value: any;
    }
    | { type: ActionTypes.addChild }
    | { type: ActionTypes.updateChild; index: number; key: keyof Child; value: any }
    | { type: ActionTypes.removeChild; index: number};

export enum ActionTypes {
    updateField, updateChild, removeChild, addChild
}