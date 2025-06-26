'use client';
import { useState, useEffect } from 'react';
import { District } from '@/types/District';
import { munichDistricts } from '@/data/districts';
import DistrictSelector from './DistrictSelector';

interface FilterData {
  age: number;
  district: District | null;
}

interface FilterPanelProps {
  onFilter: (filters: FilterData) => void;
  currentFilters?: FilterData;
}

export default function FilterPanel({ onFilter, currentFilters }: FilterPanelProps) {
  const [age, setAge] = useState('');
  const [district, setDistrict] = useState<District | null>(null);

  // Синхронизируем состояние с текущими фильтрами
  useEffect(() => {
    if (currentFilters) {
      setAge(currentFilters.age > 0 ? currentFilters.age.toString() : '');
      setDistrict(currentFilters.district);
    }
  }, [currentFilters]);

  const handleDistrictSelect = (selectedDistrict: District, city: string) => {
    setDistrict(selectedDistrict);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters: FilterData = {
      age: Number(age),
      district: district
    };
    console.log('Submitting filters:', newFilters); // Отладка
    onFilter(newFilters);
  };

  const handleReset = () => {
    setAge('');
    setDistrict(null);
    onFilter({ age: 0, district: null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Возраст ребёнка
        </label>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
        >
          <option value="">Все возрасты</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((age) => (
            <option key={age} value={age}>{age} лет</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Район
        </label>
        <DistrictSelector 
          onSelect={handleDistrictSelect} 
          selectedDistrict={district}
        />
      </div>

      <div className="flex gap-2">
        <button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md"
        >
          Применить фильтры
        </button>
        <button 
          type="button"
          onClick={handleReset}
          className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Сброс
        </button>
      </div>
    </form>
  );
}