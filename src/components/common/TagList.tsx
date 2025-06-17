import { useState } from "react";
import Input from "./Input";
import TagBox from "./TagBox";

interface TagListProps {
    items: string[];
    title: string;
    inputName: string;
    setItems: (array: string[]) => void;
}

export default function TagList({ items, title, inputName, setItems }: TagListProps) {
    const [newItem, setNewItem] = useState<string>('');

    const handleDelete = (index: number) => {
        setItems([...items].filter((item, i) => i != index));
    }

    const handleAdd = () => {
        if (newItem.length > 1)
            setItems([...items, newItem])
    }

    return (
        <div className="transition-all duration-300 ease-in-out opacity-100 hover:shadow-md">
            <Input label={title} defaultValue={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                name={inputName} type="text" containerStyle="flex items-center flex-wrap">
                <button className="border-none bg-transparent" onClick={handleAdd}>➕</button>
            </Input>
            <div className="flex flex-col gap-2">
                {items.map((item, index) => (
                    <TagBox tagValue={item} key={index} onDelete={() => handleDelete(index)} />
                ))}
            </div>
        </div>
    )
}