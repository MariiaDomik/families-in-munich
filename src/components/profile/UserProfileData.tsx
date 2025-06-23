'use client'
import { getFullUserProfile } from "@/actions/user";
import { UserProfile } from "@/types/User";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProfileField } from "./ProfileField";

interface UserProps {
    id: string;
}

export default function UserProfileData({ id }: UserProps) {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            const data = await getFullUserProfile(id);
            setProfile(data);
            setLoading(false);
        }
        fetchProfile();
    }, [id]);

    if (loading) {
        // Минималистичная анимация загрузки (скелетон + спиннер)
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] animate-pulse">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                <div className="h-6 w-40 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                <div className="h-4 w-24 bg-gray-100 rounded mb-2" />
                <div className="mt-6">
                    <svg className="animate-spin h-8 w-8 text-blue-400" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center text-gray-500 py-12">
                Пользователь не найден
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8 border border-gray-100">
            <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 mb-3">
                    <Image
                        src={profile.avatar_url || '/default-avatar.png'}
                        alt={profile.name}
                        fill
                        className="rounded-full object-cover border border-gray-200"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-500">{profile.email}</p>
            </div>

            <div className="space-y-4">
                <ProfileField label="Город" value={profile.city} />
                <ProfileField label="Языки" value={profile.languages?.join(', ')} />
                <ProfileField label="Хобби" value={profile.hobbies?.join(', ')} />
                <ProfileField label="Любимые места" value={profile.favoritePlaces?.join(', ')} />
                <ProfileField label="Доступность" value={profile.availability} />
                {profile.children && profile.children.length > 0 && (
                    <div>
                        <div className="text-sm text-gray-500 mb-1">Дети:</div>
                        <ul className="pl-4 list-disc text-gray-700">
                            {profile.children.map((child: any, idx: number) => (
                                <li key={idx}>
                                    {child.name} — {child.age} лет, {child.gender}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}


