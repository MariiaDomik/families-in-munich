'use client';
import { useState } from 'react';
import { District } from '@/types/District';
import { munichDistricts } from '@/data/districts';
import DistrictSelector from './DistrictSelector';

interface FilterData {
  age: number;
  district: District | null;
}

interface FilterPanelProps {
  onFilter: (filters: FilterData) => void;
}

export default function FilterPanel({ onFilter }: FilterPanelProps) {
  const [age, setAge] = useState('');
  const [district, setDistrict] = useState<District | null>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onFilter({ age: Number(age), district });
      }}
      className="space-y-2 p-4"
    >
      <div>
        <label>Возраст ребёнка:</label>
        <select
          onChange={(e) =>
            setAge(e.target.value || '')
          }
        >
          <option value="">Все</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((age) => (
            <option key={age} value={age}>{age} лет</option>
          ))}
        </select>
        </div>
        <DistrictSelector onSelect={setDistrict} />
      <button type="submit" className="btn">Фильтровать</button>
    </form>
  );
}