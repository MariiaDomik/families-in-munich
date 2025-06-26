'use client'
import { getFullUserProfile } from "@/actions/user";
import { User } from "@/types/User";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProfileField } from "./ProfileField";
import { MdAutorenew } from "react-icons/md";
import { useTranslations } from 'next-intl';

interface UserProps {
    id: string;
}

export default function UserProfileData({ id }: UserProps) {
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const t = useTranslations('profile');

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
                    <div className="flex justify-center items-center py-8">
                        <MdAutorenew className="animate-spin h-8 w-8 text-blue-400" />
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center text-gray-500 py-12">
                {t('notFound')}
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8 border border-gray-100">
            <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 mb-3">
                    <Image
                        src={profile.avatar_url || '/default-avatar.png'}
                        alt={profile.name || 'User'}
                        fill
                        className="rounded-full object-cover border border-gray-200"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-500">{profile.email}</p>
                <div className="flex gap-3 mt-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded transition">{t('befriend')}</button>
                    <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded transition">{t('sendMessage')}</button>
                </div>
            </div>

            <div className="space-y-4">
                <ProfileField label={t('city')} value={profile.city} />
                <ProfileField label={t('languages')} value={profile.languages?.join(', ')} />
                <ProfileField label={t('hobbies')} value={profile.hobbies?.join(', ')} />
                <ProfileField label={t('favoritePlaces')} value={profile.favoritePlaces?.join(', ')} />
                <ProfileField label={t('availability')} value={profile.availability} />
                {profile.children && profile.children.length > 0 && (
                    <div>
                        <div className="text-sm text-gray-500 mb-1">{t('children')}:</div>
                        <ul className="pl-4 list-disc text-gray-700">
                            {profile.children.map((child, idx) => (
                                <li key={idx}>
                                    {t('childInfo', { name: child.name, age: child.age, gender: child.gender })}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}


