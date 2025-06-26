import { useTranslations } from 'next-intl';
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button/Button";
import { ButtonType } from "@/components/common/Button/button.types";
import { useState } from "react";
import { ChildSimple } from "@/types/Child";
import { StartPageState } from '@/components/startpage/StartPageState';
import { Gender } from "@/types/Gender";

interface SecondStepProps {
  state: StartPageState;
  setState: (state: StartPageState) => void;
  onNextClick: () => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 17 }, (_, i) => currentYear - i); // 2008-2024

export default function SecondStep({ state, setState, onNextClick }: SecondStepProps) {
  const t = useTranslations();
  const [showYearSelect, setShowYearSelect] = useState<Gender | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleAddChild = (gender: Gender) => {
    setShowYearSelect(gender);
  };

  const handleYearSelect = (year: number) => {
    if (showYearSelect) {
      setState({
        ...state,
        children: [...state.children, { gender: showYearSelect, age: currentYear - year }]
      });
      setShowYearSelect(null);
      setSelectedYear(null);
    }
  };

  const removeChild = (index: number) => {
    setState({
      ...state,
      children: state.children.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">👶</span>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">{t('startPage.secondStep.title')}</h1>
        <p className="text-gray-600 text-sm">
          {t('startPage.secondStep.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        {/* Кнопки добавления детей */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => handleAddChild(Gender.female)}
            className="flex items-center gap-3 bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-pink-700 rounded-full px-6 py-3 shadow-md transition-all duration-200 border border-pink-200"
          >
            <Icon imgUrl="/public/icons/iconGirl.png" className="w-6 h-6" />
            <span className="font-medium">{t('profile.children.child')}</span>
            <span className="ml-1 text-lg font-bold">+</span>
          </Button>
          <Button
            onClick={() => handleAddChild(Gender.male)}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-blue-700 rounded-full px-6 py-3 shadow-md transition-all duration-200 border border-blue-200"
          >
            <Icon imgUrl="/public/icons/iconBoy.png" className="w-6 h-6" />
            <span className="font-medium">{t('profile.children.child')}</span>
            <span className="ml-1 text-lg font-bold">+</span>
          </Button>
        </div>

        {/* Выбор года рождения */}
        {showYearSelect && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="text-center mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.children.bday')}
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white shadow-sm"
                value={selectedYear ?? ''}
                onChange={e => setSelectedYear(Number(e.target.value))}
              >
                <option value="">{t('profile.children.selectYear')}</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => {
                  setShowYearSelect(null);
                  setSelectedYear(null);
                }}
                buttonType={ButtonType.Secondary}
                className="rounded-full px-4 py-2"
              >
                {t('common.cancel')}
              </Button>
              <Button
                onClick={() => selectedYear && handleYearSelect(selectedYear)}
                buttonType={ButtonType.Primary}
                className="rounded-full px-4 py-2"
                disabled={!selectedYear}
              >
                {t('common.add')}
              </Button>
            </div>
          </div>
        )}

        {/* Список добавленных детей */}
        {state.children.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {t('startPage.secondStep.childrenList')}
            </h3>
            <div className="space-y-2">
              {state.children.map((child, index) => (
                <div key={index} className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      child.gender === Gender.female 
                        ? 'bg-pink-500' 
                        : 'bg-blue-500'
                    }`}>
                      <span className="text-white text-sm">
                        {child.gender === Gender.female ? '👧' : '👦'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        {child.gender === Gender.female 
                          ? t('profile.children.girl') 
                          : t('profile.children.boy')
                        }
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {t('profile.children.age')}: {child.age}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeChild(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Кнопка продолжения */}
        <div className="flex justify-end pt-4">
          <Button 
            onClick={onNextClick} 
            buttonType={ButtonType.Primary} 
            className="rounded-full px-8 py-3 shadow-md bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-200 flex items-center gap-2"
          >
            <span>{t('profile.progress.next')}</span>
            <Icon imgUrl="/public/icons/iconNext.png" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}