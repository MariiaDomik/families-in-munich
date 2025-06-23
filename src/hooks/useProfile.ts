'use client';

import { useReducer, useEffect, useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ProfileData, initialProfileState } from '@/types/ProfileData';
import { reducer } from '@/state/profile/profileReducer';
import { ActionTypes } from '@/state/profile/reducerTypes';
import { saveProfileData, getProfileDataForReducer } from '@/actions/user';

export function useProfile() {
    const { data: session } = useSession();
    const [state, dispatch] = useReducer(reducer, initialProfileState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Загружаем данные профиля при инициализации
    useEffect(() => {
        if (session?.user?.id) {
            loadProfileData();
        }
    }, [session?.user?.id]);

    const loadProfileData = useCallback(async () => {
        if (!session?.user?.id) return;

        setIsLoading(true);
        setError(null);

        try {
            const profileData = await getProfileDataForReducer(session.user.id);
            
            // Инициализируем состояние с загруженными данными
            Object.entries(profileData).forEach(([key, value]) => {
                dispatch({
                    type: ActionTypes.updateField,
                    key: key as keyof ProfileData,
                    value
                });
            });
        } catch (err) {
            setError('Failed to load profile data');
            console.error('Error loading profile:', err);
        } finally {
            setIsLoading(false);
        }
    }, [session?.user?.id]);

    const saveProfile = useCallback(async () => {
        if (!session?.user?.id) {
            setError('User not authenticated');
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            const result = await saveProfileData(session.user.id, state);
            
            if (result.success) {
                // Можно добавить уведомление об успешном сохранении
                console.log('Profile saved successfully');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to save profile');
            console.error('Error saving profile:', err);
        } finally {
            setIsSaving(false);
        }
    }, [session?.user?.id, state]);

    const updateField = useCallback((key: keyof ProfileData, value: any) => {
        dispatch({
            type: ActionTypes.updateField,
            key,
            value
        });
    }, []);

    const addChild = useCallback(() => {
        dispatch({ type: ActionTypes.addChild });
    }, []);

    const updateChild = useCallback((index: number, key: string, value: any) => {
        dispatch({
            type: ActionTypes.updateChild,
            index,
            key: key as any,
            value
        });
    }, []);

    const removeChild = useCallback((index: number) => {
        dispatch({ type: ActionTypes.removeChild, index });
    }, []);

    return {
        // Состояние
        profile: state,
        isLoading,
        isSaving,
        error,
        
        // Методы
        saveProfile,
        updateField,
        addChild,
        updateChild,
        removeChild,
        loadProfileData,
        
        // Утилиты
        hasChanges: true, // Можно добавить логику для отслеживания изменений
        resetError: () => setError(null)
    };
} 