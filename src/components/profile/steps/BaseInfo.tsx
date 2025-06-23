import Input from "@/components/common/Input";
import { StepsProps } from "./StepsProps";
import { ActionTypes } from "@/state/profile/reducerTypes";
import TagList from "@/components/common/TagList";
import { useTranslations } from "next-intl";

export default function BaseInfo({ state, dispatch }: StepsProps) {
  const language = "ENG";
  const translate = useTranslations('profile.baseinfo')
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {translate('title')}
        </h2>
        <p className="text-gray-600">
          Tell us a bit about yourself to help other families connect with you
        </p>
      </div>

      {/* Form */}
      <div className="space-y-8">
        {/* City Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <Input
            type="text"
            name="city"
            label={translate('city')}
            value={state.city}
            onChange={(e) =>
              dispatch({
                type: ActionTypes.updateField,
                key: "city", 
                value: e.target.value
              })
            }
            placeholder="Enter your city"
            required
            className="w-full"
          />
        </div>

        {/* Languages Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <TagList 
            items={state.languages} 
            title="Languages you speak"
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
      </div>
    </div>
  )
}