import Input from '@/components/common/Input';
import { StepsProps } from "./StepsProps";
import { ActionTypes } from '@/state/profile/reducerTypes';
import TagList from '@/components/common/TagList';

export default function HobbiesInfo({ state, dispatch }: StepsProps) {
    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Your Hobbies & Interests
                </h2>
                <p className="text-gray-600">
                    Share your hobbies to connect with families who have similar interests
                </p>
            </div>

            {/* Hobbies Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <TagList 
                    items={state.hobbies} 
                    title="What are your hobbies?"
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

            {/* Suggestions */}
            <div className="mt-6 bg-blue-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                    Popular hobbies in Munich:
                </h3>
                <div className="flex flex-wrap gap-2">
                    {['Hiking', 'Cycling', 'Swimming', 'Reading', 'Cooking', 'Photography', 'Music', 'Sports'].map((hobby) => (
                        <span 
                            key={hobby}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                        >
                            {hobby}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}