'use client'
import EventsListView from '@/components/ui/events/ListView';
import { useLocale } from 'next-intl';
import type { Event } from '@/types/Event';

export default function EventsPage() {
  const locale = useLocale();
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">События</h1>
      <EventsListView locale={locale} />
    </main>
  );
} 