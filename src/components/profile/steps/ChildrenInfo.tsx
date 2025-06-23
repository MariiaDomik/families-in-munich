import Input from "@/components/common/Input";
import { StepsProps } from "./StepsProps";
import { ActionTypes } from "@/state/profile/reducerTypes";
import { ChangeEvent } from "react";
import Button from "@/components/common/Button/Button";
import { ButtonType } from "@/components/common/Button/button.types";
import { Child } from "@/types/Child";
import { useTranslations } from "next-intl";

export default function ChildrenInfo({ state, dispatch }: StepsProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string, index: number) => (
    dispatch({ 
      type: ActionTypes.updateChild, 
      index, 
      key: key as keyof Child, 
      value: e.target.value 
    })
  );

  const translate = useTranslations('profile');
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Your Children
        </h2>
        <p className="text-gray-600">
          Tell us about your children to help find families with similar-aged kids
        </p>
      </div>

      {/* Children List */}
      <div className="space-y-6">
        {state.children.map((child, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* Child Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Child {index + 1}
              </h3>
              <button
                onClick={() => dispatch({ type: ActionTypes.removeChild, index })}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Child Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="name"
                label="Name"
                value={child.name || ''}
                onChange={(e) => handleChange(e, 'name', index)}
                placeholder="Child's name"
                className="w-full"
              />
              
              <Input
                label="Gender"
                value={child.gender || ''}
                onChange={(e) => handleChange(e, 'gender', index)}
                placeholder="Male/Female"
                className="w-full"
              />
              
              <Input
                label="Age"
                type="number"
                value={child.age || ''}
                onChange={(e) => handleChange(e, 'age', index)}
                placeholder="Age in years"
                className="w-full"
              />
              
              <Input
                label="Birthday"
                type="date"
                value={child.birthday ? new Date(child.birthday).toISOString().split('T')[0] : ''}
                onChange={(e) => handleChange(e, 'birthday', index)}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Child Button */}
      <div className="mt-8 text-center">
        <Button 
          type="button" 
          onClick={() => dispatch({ type: ActionTypes.addChild })} 
          buttonType={ButtonType.Secondary}
          className="px-8 py-3 rounded-xl"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Child
        </Button>
      </div>
    </div>
  )
}