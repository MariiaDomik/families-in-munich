'use client'
import { useEffect, useState } from 'react';
import ListView from '../ListView';
import EventCard from './EventCard';
import Link from 'next/link';
import type { Event } from '@/types/Event';
import LoadingListView from '../LoadingListView';

interface Props {
  locale:string;
}

export default function EventsListView({ locale }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingListView loadingText='Loading events...'/>;
  }
  return (
    <ListView
      items={events}
      renderItem={event => (
        <Link key={event.id} href={`/${locale}/events/${event.id}`}>
          <EventCard key={event.id} event={event} />
        </Link>
      )}
      emptyText="Нет событий."
    />
  );
}
