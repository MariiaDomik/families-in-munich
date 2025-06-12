import React from "react";
import { joinClassnames } from "@/lib/utils";

interface MapBubbleProps {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
}

const baseStyle = "bg-white shadow-xl rounded-2xl p-3 w-64 cursor-pointer transition hover:shadow-2xl"

export default function MapBubble({ children, className, onClick, ...props } : MapBubbleProps) {
    return (
        <div className={joinClassnames(baseStyle, className)} onClick={onClick} {...props}>
            {children}
        </div>
    )
}