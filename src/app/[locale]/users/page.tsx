'use client'
import UsersListView from '@/components/ui/users/ListView';
import { User } from '@/types/User';
import { Gender } from '@/types/Gender';
import { useLocale } from 'next-intl';

// Здесь можно заменить на реальный fetch пользователей
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Anna Müller',
    email: 'anna@example.com',
    city: 'München',
    PLZ: 80331,
    district: { id: 1, name: 'Altstadt-Lehel', plz: '80331', center_lat: 48.1371, center_lng: 11.5754 },
    gender: Gender.female,
    children: [],
    about_me: 'Люблю гулять в парке',
    avatar_url: '',
    languages: ['German', 'English'],
    hobbies: ['Hiking'],
    favoritePlaces: ['English Garden'],
    availability: 'Weekends',
  },
  // ... другие пользователи
];

export default function UsersPage() {
  const locale = useLocale();
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Пользователи</h1>
      <UsersListView locale={locale} />
    </main>
  );
} 