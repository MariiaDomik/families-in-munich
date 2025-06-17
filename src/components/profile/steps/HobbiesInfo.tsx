import Input from '@/components/common/Input';
import { StepsProps } from "./StepsProps";
import { ActionTypes } from '@/state/profile/reducerTypes';
import TagList from '@/components/common/TagList';

export default function HobbiesInfo({ state, dispatch }: StepsProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Хобби</h2>
            <TagList items={state.hobbies} title="Hobbies"
                inputName="hobby"
                setItems={(items: string[]) =>
                    dispatch({
                        type: ActionTypes.updateField,
                        key: 'hobbies',
                        value: items
                    })
                }
            />
        </div>
    )
}