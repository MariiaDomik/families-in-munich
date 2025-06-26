import { StepsProps } from "./StepsProps";
import { ActionTypes } from '@/state/profile/reducerTypes';
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

export default function HobbiesInfo({ state, dispatch }: StepsProps) {
  const t = useTranslations('profile.hobbies');
  const [hobbies, setHobbies] = useState<{ id: number, name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('/api/hobbies')
      .then(res => res.json())
      .then(data => setHobbies(data))
      .finally(() => setLoading(false));
  }, []);

  const addHobby = (hobby: string) => {
    if (!state.hobbies.includes(hobby)) {
      dispatch({
        type: ActionTypes.updateField,
        key: 'hobbies',
        value: [...state.hobbies, hobby]
      });
    }
  };
  const removeHobby = (hobby: string) => {
    dispatch({
      type: ActionTypes.updateField,
      key: 'hobbies',
      value: state.hobbies.filter(h => h !== hobby)
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {t('title', { default: 'Хобби' })}
        </h2>
        <p className="text-gray-600">
          {t('desc', { default: 'Выберите ваши хобби, чтобы найти единомышленников!' })}
        </p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <label className="block font-semibold mb-2 text-gray-700">{t('title', { default: 'Хобби' })}</label>
        {loading ? (
          <LoadingSpinner textKey="loadingHobbies" namespace="common" />
        ) : (
          <>
            <div className="mb-2 flex flex-wrap gap-2">
              {hobbies.map(h => (
                <button
                  key={h.id}
                  type="button"
                  className={`px-3 py-1 rounded-full border text-xs font-medium shadow-sm transition ${state.hobbies.includes(h.name) ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-100'}`}
                  onClick={() => addHobby(h.name)}
                  disabled={loading}
                >
                  {h.name}
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {state.hobbies.map(hobby => (
                <span key={hobby} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  {hobby}
                  <button
                    type="button"
                    className="ml-1 text-blue-700 hover:text-red-500 focus:outline-none"
                    onClick={() => removeHobby(hobby)}
                    aria-label="Удалить хобби"
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
  )
}