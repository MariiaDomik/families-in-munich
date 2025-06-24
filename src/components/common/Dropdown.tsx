'use client';

import { ChangeEvent } from 'react';

interface Option {
  label: string;
  value: number;
}

interface DropdownProps {
  label?: string;
  options: Option[];
  onChange: (value: string) => void;
  value?: number;
  name?: string;
}

export default function Dropdown({ label, options, onChange, value, name }: DropdownProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>Выберите...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}