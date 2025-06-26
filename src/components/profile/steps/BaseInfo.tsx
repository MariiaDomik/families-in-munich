import Input from "@/components/common/Input";
import { StepsProps } from "./StepsProps";
import { ActionTypes } from "@/state/profile/reducerTypes";
import TagList from "@/components/common/TagList";
import { useTranslations } from "next-intl";
import DistrictSelector from "@/components/common/filter/DistrictSelector";
import { useEffect, useState } from "react";
import { District } from '@/types/District';
import { ProfileData } from '@/types/ProfileData';
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

export default function BaseInfo({ state, dispatch }: StepsProps) {
  const t = useTranslations('profile.baseinfo');
  const tProgress = useTranslations('profile.progress');

  // District async
  const handleDistrictSelect = (district: District, city: string) => {
    dispatch({
      type: ActionTypes.updateField,
      key: "district" as keyof ProfileData,
      value: district
    });
    dispatch({
      type: ActionTypes.updateField,
      key: "city" as keyof ProfileData,
      value: city
    });
  };

  // Languages async
  const [languages, setLanguages] = useState<{ id: number, name: string }[]>([]);
  const [loadingLang, setLoadingLang] = useState(false);
  useEffect(() => {
    setLoadingLang(true);
    fetch('/api/languages')
      .then(res => res.json())
      .then(data => setLanguages(data))
      .finally(() => setLoadingLang(false));
  }, []);

  const addLanguage = (lang: string) => {
    if (!state.languages.includes(lang)) {
      dispatch({
        type: ActionTypes.updateField,
        key: 'languages',
        value: [...state.languages, lang]
      });
    }
  };
  const removeLanguage = (lang: string) => {
    dispatch({
      type: ActionTypes.updateField,
      key: 'languages',
      value: state.languages.filter(l => l !== lang)
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {t('title')}
        </h2>
        <p className="text-gray-600">
          {tProgress('steps.0')}
        </p>
      </div>

      <div className="space-y-8">
        {/* District Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <DistrictSelector onSelect={handleDistrictSelect} />
        </div>

        {/* Languages Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <label className="block font-semibold mb-2 text-gray-700">{t('languages')}</label>
          {loadingLang ? (
            <LoadingSpinner textKey="loadingLanguages" namespace="common" />
          ) : (
            <>
              <div className="mb-2 flex flex-wrap gap-2">
                {languages.map(l => (
                  <button
                    key={l.id}
                    type="button"
                    className={`px-3 py-1 rounded-full border text-xs font-medium shadow-sm transition ${state.languages.includes(l.name) ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-100'}`}
                    onClick={() => addLanguage(l.name)}
                    disabled={loadingLang}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {state.languages.map(lang => (
                  <span key={lang} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    {lang}
                    <button
                      type="button"
                      className="ml-1 text-blue-700 hover:text-red-500 focus:outline-none"
                      onClick={() => removeLanguage(lang)}
                      aria-label="Удалить язык"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}