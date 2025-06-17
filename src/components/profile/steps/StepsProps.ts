import { Action } from "@/state/profile/reducerTypes";
import { ProfileData } from "@/types/ProfileData";
import { ActionDispatch } from "react";

export interface StepsProps {
    state: ProfileData;
    dispatch: ActionDispatch<[action: Action]>
}