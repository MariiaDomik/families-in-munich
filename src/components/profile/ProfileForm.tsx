"use client"
import { useCallback, useEffect, useReducer, useState } from "react";
import { initialProfileState, ProfileData } from "@/types/ProfileData";
import FormWrapper from "@/components/common/FormWrapper";
import BaseInfo from "./steps/BaseInfo";
import ChildrenInfo from "./steps/ChildrenInfo";
import HobbiesInfo from "./steps/HobbiesInfo";
import AvailabilityInfo from "./steps/AvailabilityInfo";
import { reducer } from "@/state/profile/profileReducer";
import PlacesInfo from "./steps/PlacesInfo";
import Button from "../common/Button/Button";
import { ButtonType } from "../common/Button/button.types";
import MotionContainer from "../common/MotionContainer";
import { useSession } from "next-auth/react";
import { getProfileDataForReducer, saveProfileData } from "@/actions/user";
import { ActionTypes } from "@/state/profile/reducerTypes";

export default function ProfileForm() {
    const { data: session } = useSession();
    const [step, setStep] = useState<number>(1);
    const [state, dispatch] = useReducer(reducer, initialProfileState);

    const nextStep = () => setStep((prev) => ++prev);
    const prevStep = () => setStep((prev) => --prev);

    const steps = [
        <BaseInfo state={state} dispatch={dispatch} />,
        <ChildrenInfo state={state} dispatch={dispatch} />,
        <HobbiesInfo state={state} dispatch={dispatch} />,
        <AvailabilityInfo state={state} dispatch={dispatch} />,
        <PlacesInfo state={state} dispatch={dispatch} />
    ]

    useEffect(() => {
            if (session?.user?.id) {
                loadProfileData();
            }
        }, [session?.user?.id]);
    
        const loadProfileData = useCallback(async () => {
            if (!session?.user?.id) return;
    
            try {
                const profileData = await getProfileDataForReducer(session.user.id);
                
                // Инициализируем состояние с загруженными данными
                Object.entries(profileData).forEach(([key, value]) => {
                    dispatch({
                        type: ActionTypes.updateField,
                        key: key as keyof ProfileData,
                        value
                    });
                });
            } catch (err) {
                console.error('Error loading profile:', err);
            } 
        }, [session?.user?.id]);
    
        const saveProfile = useCallback(async () => {
            if (!session?.user?.id) {
                console.log('User not authenticated');
                return;
            }
    
            try {
                const result = await saveProfileData(session.user.id, state);
                
                if (result.success) {
                    // Можно добавить уведомление об успешном сохранении
                    console.log('Profile saved successfully');
                } else {
                    console.log(result.message);
                }
            } catch (err) {
                console.error('Error saving profile:', err);
            }
        }, [session?.user?.id, state]);

    const handleSubmit = async (formData: FormData) => { 
        saveProfile();
    }

    return (
        <FormWrapper action={handleSubmit} >
            <MotionContainer key={step.toString()}>
                {steps[step - 1]}
            </MotionContainer>
            <div className="flex justify-between">
                {step > 1 && (
                    <Button type="button" onClick={prevStep} buttonType={ButtonType.Secondary}
                        className="transition-transform duration-200 hover:scale-105 hover:bg-blue-600">
                        Назад
                    </Button>
                )}
                {step < 5 ? (
                    <Button type="button" onClick={nextStep} className="transition-transform duration-200 hover:scale-105 hover:bg-blue-600"
                    >
                        Далее
                    </Button>
                ) : (
                    <Button type="submit">Сохранить профиль</Button>
                )}
            </div>
        </FormWrapper>
    )
}