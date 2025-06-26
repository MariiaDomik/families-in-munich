import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input";
import { munichDistricts } from "@/data/districts";
import Dropdown from "../common/Dropdown";
import { District } from "@/types/District";
import { StartPageState } from "./StartPageState";
import { useTranslations } from 'next-intl';
import { ButtonType } from "../common/Button/button.types";

interface FirstStepProps {
    state: StartPageState;
    setState: (state: StartPageState) => void;
    onNextClick: () => void;
}

export default function FirstStep({ state, setState, onNextClick }: FirstStepProps) {
    const t = useTranslations();
    
    const handleDistrictSelect = (district: District) => {
        setState({ ...state, district });
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">📍</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {t('startPage.firstStep.title')}
                </h1>
                <p className="text-gray-600 text-sm">
                    {t('startPage.firstStep.subtitle')}
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('startPage.firstStep.label')}
                    </label>
                    <Dropdown
                        label={t('startPage.firstStep.label')}
                        options={munichDistricts.map((d, index: number) => ({ 
                            label: `${d.plz} - ${d.name}`, 
                            value: index 
                        }))}
                        onChange={(value) => handleDistrictSelect(munichDistricts[parseInt(value)])}
                    />
                </div>

                {state.district && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-800">
                                    {t('startPage.firstStep.selected')}
                                </p>
                                <p className="text-sm text-blue-600">
                                    {state.district.plz} - {state.district.name}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end pt-4">
                    <Button 
                        onClick={onNextClick}
                        buttonType={ButtonType.Primary}
                        className="rounded-full px-8 py-3 shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 flex items-center gap-2"
                        disabled={!state.district}
                    >
                        <span>{t('profile.progress.next')}</span>
                        <Icon imgUrl="/public/icons/iconNext.png" className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}