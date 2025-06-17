"use client"
import { useReducer, useState } from "react";
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

export default function ProfileInfo() {
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

    const handleSubmit = async (formData: FormData) => { }

    return (
        <FormWrapper hadleSubmit={handleSubmit} >
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