import Image from 'next/image';
import type { Event } from '@/types/Event';
import Link from 'next/link';

interface EventCardProps {
  event: Event;
  locale: string;
}

export default function EventCard({ event, locale }: EventCardProps) {
  console.log(event.img_url);
  return (
    <div
      className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-100"
    >
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={event.img_url || '/default-event.jpg'}
            alt={event.title}
            fill
            className="rounded-lg object-cover border border-gray-200"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-lg text-gray-900 truncate">{event.title}</div>
          <div className="text-sm text-gray-500 truncate">{event.location}</div>
          <div className="text-xs text-gray-400 mt-1 line-clamp-2">{event.description}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
            {new Date(event.date).toLocaleDateString()}
          </span>
        </div>
      </div>
      {/* Creator info */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-gray-500">Организатор:</span>
        <Link href={`/users/${event.creator.id}`} className="flex items-center gap-1 hover:underline">
          <div className="relative w-6 h-6">
            <Image src={event.creator.avatar_url || '/default-avatar.png'} alt={event.creator.name || 'User'} fill className="rounded-full object-cover border border-gray-200" />
          </div>
          <span className="text-xs text-blue-700 font-medium">{event.creator.name}</span>
        </Link>
      </div>
      {/* Participants list */}
      <div className="flex items-center gap-2 flex-wrap mt-1">
        <span className="text-xs text-gray-500">Участники:</span>
        {event.participants && event.participants.length > 0 ? (
          event.participants.map((p) => (
            <Link key={p.id} href={`/users/${p.id}`} className="flex items-center gap-1 hover:underline mr-2 mb-1">
              <div className="relative w-6 h-6">
                <Image src={p.avatar_url || '/default-avatar.png'} alt={p.name || 'User'} fill className="rounded-full object-cover border border-gray-200" />
              </div>
              <span className="text-xs text-gray-700">{p.name}</span>
            </Link>
          ))
        ) : (
          <span className="text-xs text-gray-400 ml-1">Нет участников</span>
        )}
      </div>
      <div className="flex gap-2 mt-2">
        <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs py-1 rounded transition">Хочу пойти</button>
        <Link href={`/${locale}/events/${event.id}`} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs py-1 rounded text-center transition">Подробнее...</Link>
      </div>
    </div>
  );
}
