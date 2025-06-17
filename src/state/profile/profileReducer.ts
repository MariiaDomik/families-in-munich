import { ProfileData } from "@/types/ProfileData";
import { Action, ActionTypes } from "./reducerTypes";
import { Gender } from "@/types/Gender";
import { Child } from "@/types/Child";

export function reducer(state: ProfileData, action: Action): ProfileData {
    switch (action.type) {
        case ActionTypes.updateField :
            return { ...state, [action.key]: action.value };
        case ActionTypes.addChild:
            return {
                ...state,
                children: [...state.children, { name: '', gender: Gender.male, age: 0 }],
            };
        case ActionTypes.removeChild: 
            return {
                ...state,
                children: state.children.filter((c, i) => i!== action.index)
            }
        case ActionTypes.updateChild: {
            const updated = [...state.children];
            const key = action.key as keyof Child;
            updated[action.index] = {
                ...updated[action.index],
                [key]: action.value,
             };
            return { ...state, children: updated };
            }
        default:
            return state;
    }
}