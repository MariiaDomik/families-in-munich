import { StepsProps } from "./StepsProps";
import { ActionTypes } from "@/state/profile/reducerTypes";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface TimeSlot {
  day: string;
  timeRange: string;
}

const weekDays = [
  { id: 'monday', name: 'Понедельник' },
  { id: 'tuesday', name: 'Вторник' },
  { id: 'wednesday', name: 'Среда' },
  { id: 'thursday', name: 'Четверг' },
  { id: 'friday', name: 'Пятница' },
  { id: 'saturday', name: 'Суббота' },
  { id: 'sunday', name: 'Воскресенье' }
];

const timeRanges = [
  { id: 'morning', name: 'Утро (9:00-12:00)' },
  { id: 'afternoon', name: 'День (12:00-17:00)' },
  { id: 'evening', name: 'Вечер (17:00-21:00)' },
  { id: 'night', name: 'Ночь (21:00-00:00)' }
];

export default function AvailabilityInfo({ state, dispatch }: StepsProps) {
  const t = useTranslations('profile.availability');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(null);

  // Парсим существующую доступность
  const parseAvailability = (): TimeSlot[] => {
    if (!state.availability) return [];
    try {
      return JSON.parse(state.availability);
    } catch {
      return [];
    }
  };

  const availability = parseAvailability();

  const addTimeSlot = () => {
    if (selectedDay && selectedTimeRange) {
      const newSlot: TimeSlot = {
        day: selectedDay,
        timeRange: selectedTimeRange
      };
      
      const updatedAvailability = [...availability, newSlot];
      dispatch({
        type: ActionTypes.updateField,
        key: 'availability',
        value: JSON.stringify(updatedAvailability)
      });
      
      setSelectedDay(null);
      setSelectedTimeRange(null);
    }
  };

  const removeTimeSlot = (index: number) => {
    const updatedAvailability = availability.filter((_, i) => i !== index);
    dispatch({
      type: ActionTypes.updateField,
      key: 'availability',
      value: JSON.stringify(updatedAvailability)
    });
  };

  const getDayName = (dayId: string) => {
    const day = weekDays.find(d => d.id === dayId);
    return day?.name || dayId;
  };

  const getTimeRangeName = (timeId: string) => {
    const time = timeRanges.find(t => t.id === timeId);
    return time?.name || timeId;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {t('title')}
        </h2>
        <p className="text-gray-600">
          Выберите дни недели и время, когда вы доступны для встреч
        </p>
      </div>

      <div className="space-y-8">
        {/* Days Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <label className="block font-semibold mb-2 text-gray-700">Дни недели</label>
          <div className="mb-2 flex flex-wrap gap-2">
            {weekDays.map(day => (
              <button
                key={day.id}
                type="button"
                className={`px-3 py-1 rounded-full border text-xs font-medium shadow-sm transition ${
                  selectedDay === day.id 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-100'
                }`}
                onClick={() => setSelectedDay(day.id)}
              >
                {day.name}
              </button>
            ))}
          </div>
        </div>

        {/* Time Ranges Selection */}
        {selectedDay && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <label className="block font-semibold mb-2 text-gray-700">
              Время для {getDayName(selectedDay)}
            </label>
            <div className="mb-4 flex flex-wrap gap-2">
              {timeRanges.map(time => (
                <button
                  key={time.id}
                  type="button"
                  className={`px-3 py-1 rounded-full border text-xs font-medium shadow-sm transition ${
                    selectedTimeRange === time.id 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-green-100'
                  }`}
                  onClick={() => setSelectedTimeRange(time.id)}
                >
                  {time.name}
                </button>
              ))}
            </div>
            {selectedTimeRange && (
              <button
                type="button"
                onClick={addTimeSlot}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Добавить время
              </button>
            )}
          </div>
        )}

        {/* Selected Time Slots */}
        {availability.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <label className="block font-semibold mb-2 text-gray-700">Выбранное время</label>
            <div className="flex flex-wrap gap-2">
              {availability.map((slot, index) => (
                <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  {getDayName(slot.day)} - {getTimeRangeName(slot.timeRange)}
                  <button
                    type="button"
                    className="ml-1 text-blue-700 hover:text-red-500 focus:outline-none"
                    onClick={() => removeTimeSlot(index)}
                    aria-label="Удалить время"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}