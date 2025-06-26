'use client'
import Link from 'next/link';
import ListView from '../ListView';
import UserCard from './UserCard';
import { User } from '@/types/User';
import { useEffect, useState } from 'react';
import LoadingListView from '../../loaders/LoadingListView';

interface Props {
  locale: string;
}

export default function UsersListView({ locale }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return (
      <LoadingListView loadingText='Loading users...' />
  );
  }
  return (
    <ListView
      items={users}
      renderItem={user => (
        <Link key={user.id} href={`/${locale}/users/${user.id}`}>
          <UserCard key={user.id} user={user} />
        </Link>
      )}
      emptyText="Нет пользователей."
    />
  );
}
