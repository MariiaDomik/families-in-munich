interface TagBoxProps {
    tagValue: string;
    onDelete: () => void;
}

export default function TagBox({ tagValue, onDelete }: TagBoxProps) {
    return (
        <div className="rounded-2xl px-4 py-2 bg-gray-200">
            <p>{tagValue}</p>
            <button className="bg-transparent border-none" onClick={onDelete}>✖</button>
        </div>
    )
}