'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Button from '@/components/common/Button/Button';
import { ButtonType } from '@/components/common/Button/button.types';

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations('auth');
  const locale = useLocale();

  if (!session?.user) {
    router.push(`/${locale}/login`);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* User authentication message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('loggedInAs', { name: session.user.name || session.user.email })}
          </h1>
          <p className="text-gray-600 mb-6">
            Добро пожаловать в ваш профиль
          </p>
          
          <div className="space-y-4">
            <Button
              onClick={() => router.push(`/${locale}/profile/completeProfile`)}
              buttonType={ButtonType.Primary}
              className="w-full"
            >
              Редактировать профиль
            </Button>
            
            <Button
              onClick={() => router.push(`/${locale}/`)}
              buttonType={ButtonType.Secondary}
              className="w-full"
            >
              Вернуться на главную
            </Button>
          </div>
        </div>

        {/* User info card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Информация о пользователе</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-900">{session.user.email}</span>
            </div>
            
            {session.user.name && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Имя:</span>
                <span className="font-medium text-gray-900">{session.user.name}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Статус:</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Авторизован
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 