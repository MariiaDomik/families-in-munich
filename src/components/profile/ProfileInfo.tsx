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
import { getFullUserProfile, saveProfileData } from "@/actions/user";
import { ActionTypes } from "@/state/profile/reducerTypes";
import { useTranslations } from "next-intl";

export default function ProfileInfo() {
    const { data: session } = useSession();
    const [step, setStep] = useState<number>(1);
    const [state, dispatch] = useReducer(reducer, initialProfileState);
    const t = useTranslations('auth');
    const tProgress = useTranslations('profile.progress');
    const [loading, setLoading] = useState(false);

    const nextStep = () => setStep((prev) => ++prev);
    const prevStep = () => setStep((prev) => --prev);

    const steps = [
        {component: <BaseInfo state={state} dispatch={dispatch} />, color: "from-sky-100 to-indigo-200"},
        {component: <ChildrenInfo state={state} dispatch={dispatch} />, color: "from-pink-100 to-rose-200"},
        {component: <HobbiesInfo state={state} dispatch={dispatch} />, color: "from-lime-70 to-green-200"},
        {component: <AvailabilityInfo state={state} dispatch={dispatch} />, color: "from-amber-50 to-orange-100"},
        {component: <PlacesInfo state={state} dispatch={dispatch} />, color: "from-cyan-50 to-indigo-100"}
    ]

    useEffect(() => {
        if (session?.user?.id) {
            loadProfileData();
        }
    }, [session?.user?.id]);

    const loadProfileData = useCallback(async () => {
        if (!session?.user?.id) return;
        setLoading(true);
        try {
            const profileData = await getFullUserProfile(session.user.id);
            if (profileData) {
                Object.entries(profileData).forEach(([key, value]) => {
                    dispatch({
                        type: ActionTypes.updateField,
                        key: key as keyof ProfileData,
                        value
                    });
                });
            }
        } catch (err) {
            console.error('Error loading profile:', err);
        } finally {
            setLoading(false);
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

    // Прогресс-бар
    const progress = ((step - 1) / (steps.length - 1)) * 100;
    const stepLabels = [
      tProgress('steps.0'),
      tProgress('steps.1'), 
      tProgress('steps.2'),
      tProgress('steps.3'),
      tProgress('steps.4')
    ];

    if (loading) {
      return <div className="text-center py-12 text-gray-500">Загрузка профиля...</div>;
    }

    return (
        <div className={`flex flex-col justify-start items-center gap-2 min-h-screen py-4  bg-gradient-to-br ${steps[step - 1].color} px-4`}>
            <div className="w-full max-w-md">
                {/* User authentication message */}
                {session?.user && (
                    <div className="mb-6 bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-lg text-white">✓</span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                            {t('loggedInAs', { name: session.user.name || session.user.email })}
                        </p>
                    </div>
                )}

                {/* Прогресс-бар */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    {stepLabels.map((label, idx) => (
                      <div key={label} className={`text-xs font-medium ${step === idx+1 ? 'text-blue-700' : 'text-gray-400'}`}>{label}</div>
                    ))}
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <FormWrapper action={handleSubmit} >
                  {/* Кнопки навигации сверху */}
                  <div className={`flex mb-6 ${step === 1 ? 'justify-end' : 'justify-between'} items-center gap-2`}>
                    {step > 1 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        buttonType={ButtonType.Secondary}
                        className="rounded-full px-6 py-2 shadow-md bg-white border border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                      >
                        {tProgress('back')}
                      </Button>
                    )}
                    {step < 5 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        buttonType={ButtonType.Primary}
                        className="rounded-full px-6 py-2 shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
                      >
                        {tProgress('next')}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="rounded-full px-6 py-2 shadow-md bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                      >
                        {tProgress('save')}
                      </Button>
                    )}
                  </div>

                  <MotionContainer key={step.toString()}>
                    {steps[step - 1].component}
                  </MotionContainer>
                </FormWrapper>
            </div>
        </div>
    )
}