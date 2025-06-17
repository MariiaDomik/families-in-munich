import Input from "@/components/common/Input";
import staticData from "@/services/staticData";
import { StepsProps } from "./StepsProps";
import { ActionTypes } from "@/state/profile/reducerTypes";
import TagList from "@/components/common/TagList";
import { useTranslations } from "next-intl";

export default function BaseInfo({ state, dispatch }: StepsProps) {
  const language = "ENG";
  const translate = useTranslations('profile')
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{translate('title')}</h2>
      <Input
        type="text"
        name="city"
        label={translate('city')}
        value={state.city}
        onChange={(e) =>
          dispatch({
            type: ActionTypes.updateField,
            key: "city", value: e.target.value
          })}
        required
      />
      <TagList items={state.languages} title="Lanuages"
        inputName="languages"
        setItems={(items: string[]) =>
          dispatch({
            type: ActionTypes.updateField,
            key: 'languages',
            value: items
          })
        }
      />
    </div>
  )
}