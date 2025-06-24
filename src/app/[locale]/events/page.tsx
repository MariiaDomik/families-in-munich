'use client'
import EventsListView from '@/components/ui/events/ListView';
import { useLocale } from 'next-intl';
import type { Event } from '@/types/Event';

// Здесь можно заменить на реальный fetch событий
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Family Picnic',
    description: 'Join us for a fun family picnic in the English Garden!',
    date: '2024-07-10',
    location: 'English Garden',
    image: '',
  },
  // ... другие события
];

export default function EventsPage() {
  const locale = useLocale();
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">События</h1>
      <EventsListView locale={locale} />
    </main>
  );
} 