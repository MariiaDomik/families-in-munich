"use client"

import MotionContainer from "@/components/common/MotionContainer";
import FirstStep from "@/components/startpage/FirstStep";
import SecondStep from "@/components/startpage/SecondStep";
import MapView from "@/components/map/MapView";
import { useState, useEffect } from "react";
import { UserForMap } from "@/types/User";
import { StartPageState } from "@/components/startpage/StartPageState";
import Button from "@/components/common/Button/Button";
import { ButtonType } from "@/components/common/Button/button.types";
import { useTranslations } from 'next-intl';

const initialState: StartPageState = {
    district: null,
    children: [],
  };

const stepLabels = ['startPage.firstStep.title', 'startPage.secondStep.title', 'startPage.mapStep.title'];

export default function StartPage() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [state, setState] = useState<StartPageState>(initialState);
  const [users, setUsers] = useState<UserForMap[]>([]);
  const [loading, setLoading] = useState(false);
  const t = useTranslations();

  // Загружаем пользователей для карты
  useEffect(() => {
    if (step === 2) {
      loadUsers();
    }
  }, [step]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users?forMap=true');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      component: <FirstStep
        state={state}
        setState={setState}
        onNextClick={() => setStep(1)}
      />, 
      color: "from-sky-100 to-indigo-200"
    },
    {
      component: <SecondStep
        state={state}
        setState={setState}
        onNextClick={() => setStep(2)}
      />, 
      color: "from-pink-100 to-rose-200"
    },
    {
      component: loading ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            {t('startPage.mapStep.title')}
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {t('startPage.mapStep.description')}
          </p>
          <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
            <MapView
              filteredUsers={users}
              currentUserLocation={[48.1351, 11.5820]}
            />
          </div>
        </div>
      ), 
      color: "from-lime-70 to-green-200"
    },
  ];

  // Прогресс-бар
  const progress = (step / (steps.length - 1)) * 100;

  // Кнопки навигации
  const handlePrev = () => setStep((prev) => (prev === 0 ? 0 : (prev === 2 ? 1 : 0)));
  const handleNext = () => setStep((prev) => (prev === 2 ? 2 : (prev === 0 ? 1 : 2)));

  return (
    <main>
      <div className={`flex flex-col justify-start items-center gap-2 min-h-screen py-4 bg-gradient-to-br ${steps[step].color} px-4`}>
        <div className="w-full max-w-md">
          {/* Приветственное сообщение */}
          <div className="mb-6 bg-white rounded-lg shadow-md p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg text-white">🏠</span>
            </div>
            <h1 className="text-lg font-bold text-gray-800 mb-2">
              {t('startPage.welcome.title')}
            </h1>
            <p className="text-sm text-gray-600">
              {t('startPage.welcome.description')}
            </p>
          </div>

          {/* Прогресс-бар */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              {stepLabels.map((label, idx) => (
                <div key={label} className={`text-xs font-medium ${step === idx ? 'text-blue-700' : 'text-gray-400'}`}>
                  {t(label)}
                </div>
              ))}
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Кнопки навигации сверху */}
          <div className={`flex mb-6 ${step === 0 ? 'justify-end' : 'justify-between'} items-center gap-2`}>
            {step > 0 && (
              <Button
                type="button"
                onClick={handlePrev}
                buttonType={ButtonType.Secondary}
                className="rounded-full px-6 py-2 shadow-md bg-white border border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
              >
                {t('profile.progress.back')}
              </Button>
            )}
            {step < steps.length - 1 && (
              <Button
                type="button"
                onClick={handleNext}
                buttonType={ButtonType.Primary}
                className="rounded-full px-6 py-2 shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
              >
                {t('profile.progress.next')}
              </Button>
            )}
          </div>

          <MotionContainer key={step.toString()}>
            {steps[step].component}
          </MotionContainer>
        </div>
      </div>
    </main>
  );
}
