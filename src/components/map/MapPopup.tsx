'use client'
import React from "react";
import { joinClassnames } from "@/lib/utils";
import { Popup } from "react-leaflet";
import { UserForMap } from "@/types/User";

interface MapBubbleProps {
    user: UserForMap;
    children?: React.ReactNode;
    className?: string;
    onClick: () => void;
}

const baseStyle = "bg-white shadow-xl rounded-2xl p-3 w-64 cursor-pointer transition hover:shadow-2xl"

export default function MapPopup({ user, children, className, onClick, ...props } : MapBubbleProps) {
    return (
        <div className={joinClassnames(baseStyle, className)} onClick={onClick} {...props}>
            <Popup>
            <div className="flex flex-col gap-2">
                <strong>{user.name}</strong>
            </div>
            {children}
            </Popup>
        </div>
    )
}