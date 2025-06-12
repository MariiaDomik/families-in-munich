import Link from "next/link";

interface UserBubbleProps {
    id: string;
    name: string;
    imgUrl?: string;
}

export default function UserBubble({ id, name, imgUrl} : UserBubbleProps) {
    return (
        <div></div>
    )
}