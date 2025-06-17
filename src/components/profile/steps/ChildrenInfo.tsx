import Input from "@/components/common/Input";
import { StepsProps } from "./StepsProps";
import { ActionTypes } from "@/state/profile/reducerTypes";
import { ChangeEvent } from "react";
import Button from "@/components/common/Button/Button";
import { ButtonType } from "@/components/common/Button/button.types";
import { Child } from "@/types/Child";
import { useTranslations } from "next-intl";

export default function ChildrenInfo({ state, dispatch }: StepsProps) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string, index: number) => (dispatch({ type: ActionTypes.updateChild, index, key: key as keyof Child, value: e.target.value }))

  const translate = useTranslations('profile');
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Дети (по желанию)</h2>
      {state.children.map((child, index) => (
        <div key={index} className="space-y-2 border p-4 rounded-xl mb-4">
          <Input
            name=""
            label="Имя"
            value={child.name}
            onChange={(e) => handleChange(e, 'name', index)}
          />
          <Input
            label="Пол (м/ж)"
            value={child.gender}
            onChange={(e) => handleChange(e, 'gender', index)}
          />
          <Input
            label="Дата рождения (необязательно)"
            type="date"
            value={child.birthday?.toDateString()}
            onChange={(e) => handleChange(e, 'birthday', index)}
          />
          <Input
            label="Или возраст / год рождения"
            value={child.age || ''}
            onChange={(e) => handleChange(e, 'age', index)}
          />
          <Button
            type="button"
            buttonType={ButtonType.Secondary}
            onClick={() => dispatch({ type: ActionTypes.removeChild, index })}
          >
            Удалить
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => dispatch({ type: ActionTypes.addChild })} buttonType={ButtonType.Secondary}>
        Добавить ребенка
      </Button>
    </div>
  )
}