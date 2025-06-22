'use client';

import { District } from '@/types/District';
import { useState } from 'react';

interface Props {
  districts: District[];
  onSelect: (district: District) => void;
}

export default function DistrictSelector({ districts, onSelect }: Props) {
  const [selectedId, setSelectedId] = useState<number>();

  return (
    <div className="space-y-2">
      <label htmlFor="district" className="block font-semibold">Выберите район или индекс:</label>
      <select
        id="district"
        className="w-full p-2 border rounded"
        value={selectedId}
        onChange={(e) => {
          const id = Number(e.target.value);
          setSelectedId(id);
          const selected = districts.find(d => d.id === id);
          if (selected) onSelect(selected);
        }}
      >
        <option value="">-- Выберите --</option>
        {districts.map(d => (
          <option key={d.id} value={d.id}>
            {d.name} ({d.plz})
          </option>
        ))}
      </select>
    </div>
  );
}
