import { StepsProps } from "./StepsProps";
import { ActionTypes } from "@/state/profile/reducerTypes";
import TagList from "@/components/common/TagList";
import { useTranslations } from "next-intl";

const placeExamples = [
  "Englischer Garten",
  "Olympiapark",
  "Tierpark Hellabrunn",
  "Deutsches Museum",
  "Westpark",
  "Zoo",
  "Isar",
  "Viktualienmarkt",
  "Botanischer Garten",
  "Schloss Nymphenburg",
  "Hirschgarten",
  "Schwabing",
  "Gärtnerplatz",
  "Theresienwiese",
  "Marienplatz"
];

export default function PlacesInfo({ state, dispatch }: StepsProps) {
  const t = useTranslations('profile');
  const addPlace = (place: string) => {
    if (!state.favoritePlaces.includes(place)) {
      dispatch({
        type: ActionTypes.updateField,
        key: 'favoritePlaces',
        value: [...state.favoritePlaces, place]
      });
    }
  };
  const removePlace = (place: string) => {
    dispatch({
      type: ActionTypes.updateField,
      key: 'favoritePlaces',
      value: state.favoritePlaces.filter((p) => p !== place),
    });
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">{t('favoritePlaces')}</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <label className="block font-semibold mb-2 text-gray-700">
          {t('favoritePlaces')}
        </label>
        <div className="mb-2 flex flex-wrap gap-2">
          {placeExamples.map((place) => (
            <button
              key={place}
              type="button"
              className={`px-3 py-1 rounded-full border text-xs font-medium shadow-sm transition ${state.favoritePlaces.includes(place) ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-100'}`}
              onClick={() => addPlace(place)}
            >
              {place}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {state.favoritePlaces.map((place) => (
            <span key={place} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              {place}
              <button
                type="button"
                className="ml-1 text-blue-700 hover:text-red-500 focus:outline-none"
                onClick={() => removePlace(place)}
                aria-label={t('deletePlace')}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <TagList
        items={state.favoritePlaces}
        title={t('favoritePlaces')}
        inputName="place"
        setItems={(items: string[]) =>
          dispatch({
            type: ActionTypes.updateField,
            key: 'favoritePlaces',
            value: items
          })
        }
      />
    </div>
  );
}