'use client';

import { useEffect, useState } from 'react';
import { District } from '@/types/District';
import Dropdown from '../Dropdown';

interface Props {
  onSelect: (district: District, city: string) => void;
}

export default function DistrictSelector({ onSelect }: Props) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [city, setCity] = useState<string>('Мюнхен');
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

  const handleDistrictChange = (value: string) => {
    const id = Number(value);
    setSelectedId(id);
    const selected = districts.find(d => d.id === id);
    if (selected) onSelect(selected, city);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    // Можно сбрасывать выбранный район при смене города, если нужно
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow border border-gray-100">
      <div>
        <label htmlFor="city" className="block font-semibold mb-1 text-gray-700">Город</label>
        <input
          id="city"
          type="text"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
          value={city}
          onChange={handleCityChange}
          placeholder="Введите город"
        />
      </div>
      <div>
        <Dropdown
          label="Район или индекс"
          options={districts.map(d => ({ label: `${d.name} (${d.plz})`, value: d.id }))}
          onChange={handleDistrictChange}
          value={selectedId}
          name="district"
        />
        {loading && <div className="text-xs text-gray-400 mt-2">Загрузка районов...</div>}
        {error && <div className="text-xs text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
}
