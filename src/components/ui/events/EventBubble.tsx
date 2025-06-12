import Link from "next/link";

interface EventBubbleProps {
    id: string;
    title: string;
    date: Date;
    time: Date;
    imgUrl?: string;
    ownerId: string;

}

export default function EventBubble({ id, title, date, time, imgUrl} : EventBubbleProps) {
    return (
        <div></div>
    )
}