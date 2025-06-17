import { StepsProps } from "./StepsProps";
import { ActionTypes } from "@/state/profile/reducerTypes";
import TagList from "@/components/common/TagList";

export default function PlacesInfo({ state, dispatch }: StepsProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Хобби</h2>
            <TagList items={state.favoritePlaces} title="Favorite Places"
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

    )
}