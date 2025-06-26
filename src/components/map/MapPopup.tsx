'use client'
import React from "react";
import { joinClassnames } from "@/lib/utils";
import { Popup } from "react-leaflet";
import { UserForMap } from "@/types/User";
import Link from "next/link";
import { useTranslations } from 'next-intl';

interface MapBubbleProps {
    user: UserForMap;
    locale: string;
    children?: React.ReactNode;
    className?: string;
}

const baseStyle = "bg-white shadow-xl rounded-2xl p-4 w-72 cursor-default transition hover:shadow-2xl"

export default function MapPopup({ user, locale, children, className, ...props } : MapBubbleProps) {
    const t = useTranslations('map');
    return (
        <Popup className="map-popup">
            <div className={joinClassnames(baseStyle, className)} {...props}>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">{user.name || t('unknownUser')}</h3>
                        <p className="text-sm text-gray-600">
                            {user.district?.name || user.city || 'Мюнхен'}
                        </p>
                    </div>
                </div>
                {user.children && user.children.length > 0 && (
                    <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">{t('children')}:</p>
                        <div className="flex flex-wrap gap-1">
                            {user.children.map((child, index) => (
                                <span 
                                    key={index}
                                    className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                >
                                    {child.name} ({child.age} {t('years')})
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-between items-center mt-4">
                    <Link
                        href={`/${locale}/users/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-2 transition"
                    >
                        {t('viewProfile')}
                    </Link>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
            </div>
        </Popup>
    )
}