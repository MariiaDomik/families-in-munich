'use client';

import { useEffect, useState } from 'react';
import { District } from '@/types/District';

interface Props {
  onSelect: (district: District, city: string) => void;
  selectedDistrict?: District | null;
}

export default function DistrictSelector({ onSelect, selectedDistrict }: Props) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/districts')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки районов');
        return res.json();
      })
      .then((data: District[]) => setDistricts(data))
      .catch(() => setError('Не удалось загрузить районы'))
      .finally(() => setLoading(false));
  }, []);

  // Синхронизируем выбранный район
  useEffect(() => {
    if (selectedDistrict) {
      setSelectedId(selectedDistrict.id);
    } else {
      setSelectedId(undefined);
    }
  }, [selectedDistrict]);

  const handleDistrictChange = (value: string) => {
    const id = Number(value);
    setSelectedId(id);
    const selected = districts.find(d => d.id === id);
    if (selected) onSelect(selected, 'Мюнхен');
  };

  if (loading) {
    return (
      <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm">
        Загрузка районов...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-3 border border-red-300 rounded-lg bg-red-50 text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <select
      value={selectedId || ''}
      onChange={(e) => handleDistrictChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
    >
      <option value="">Все районы</option>
      {districts.map(d => (
        <option key={d.id} value={d.id}>
          {d.name} ({d.plz})
        </option>
      ))}
    </select>
  );
}
