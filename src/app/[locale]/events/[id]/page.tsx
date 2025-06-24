import { getEventById } from '@/actions/events';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EventDetailsPage({ params }: { params: { id: string, locale: string } }) {
  const event = await getEventById(params.id);
  if (!event) return notFound();

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Event image */}
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={event.img_url || '/default-event.jpg'}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Main info */}
        <div className="p-8 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
          <div className="flex flex-wrap gap-4 items-center text-gray-500 text-sm mb-4">
            <span className="inline-flex items-center gap-1"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M8 7V3M16 7V3M3 11H21M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>{new Date(event.date).toLocaleDateString()} {event.time && <span className="ml-2">{event.time}</span>}</span>
            <span className="inline-flex items-center gap-1"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>{event.location}</span>
          </div>
          <p className="text-gray-700 text-base mb-6 whitespace-pre-line">{event.description}</p>
          {/* Creator */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-gray-500">Организатор:</span>
            <Link href={`/${params.locale}/users/${event.creator.id}`} className="flex items-center gap-2 hover:underline">
              <div className="relative w-8 h-8">
                <Image src={event.creator.avatar_url || '/default-avatar.png'} alt={event.creator.name || 'User'} fill className="rounded-full object-cover border border-gray-200" />
              </div>
              <span className="text-base text-blue-700 font-medium">{event.creator.name}</span>
            </Link>
            <button className="ml-4 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded transition">Написать организатору</button>
          </div>
          {/* Participants */}
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-1">Участники:</div>
            <div className="flex flex-wrap gap-3">
              {event.participants && event.participants.length > 0 ? (
                event.participants.map((p) => (
                  <Link key={p.id} href={`/${params.locale}/users/${p.id}`} className="flex items-center gap-2 hover:underline">
                    <div className="relative w-7 h-7">
                      <Image src={p.avatar_url || '/default-avatar.png'} alt={p.name || 'User'} fill className="rounded-full object-cover border border-gray-200" />
                    </div>
                    <span className="text-xs text-gray-700">{p.name}</span>
                  </Link>
                ))
              ) : (
                <span className="text-xs text-gray-400 ml-1">Нет участников</span>
              )}
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-base py-2 rounded transition">Хочу пойти</button>
            <Link href={`/${params.locale}/events`} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-base py-2 rounded text-center transition">К списку событий</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
