import Image from 'next/image';
import { User } from '@/types/User';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export default function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div
      className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14">
          <Image
            src={user.avatar_url || '/default-avatar.png'}
            alt={user.name || 'User'}
            fill
            className="rounded-full object-cover border border-gray-200"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-lg text-gray-900 truncate">{user.name}</div>
          <div className="text-sm text-gray-500 truncate">{user.city}</div>
          <div className="text-xs text-gray-400 mt-1">{user.about_me}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
            {user.children?.length || 0} 👶
          </span>
          <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
            {user.hobbies?.[0] || ''}
          </span>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 rounded transition">Подружиться</button>
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1 rounded transition">Отправить сообщение</button>
      </div>
    </div>
  );
}
