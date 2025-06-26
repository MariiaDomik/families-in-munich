'use client'
import FilterPanel from "@/components/common/filter/FilterPanel";
import MapView from "@/components/map/MapView";
import { UserForMap } from "@/types/User";
import { District } from "@/types/District";
import { Gender } from "@/types/Gender";
import { useMemo, useState, useEffect } from "react";
import { useTranslations } from 'next-intl';

interface FilterData {
  age: number;
  district: District | null;
}

export default function MapPage() {
  const t = useTranslations('map');
  const tCommon = useTranslations('common');
  const [filters, setFilters] = useState<FilterData>({ age: 0, district: null });
  const [users, setUsers] = useState<UserForMap[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Загружаем пользователей при монтировании компонента
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        if (response.ok) {
          const usersData = await response.json();
          console.log('Loaded users data:', usersData); // Отладка
          
          // Преобразуем данные в формат UserForMap
          const mapUsers: UserForMap[] = usersData.map((user: any) => ({
            ...user,
            latitude: 48.1351 + (Math.random() - 0.5) * 0.1, // Временные координаты для демо
            longitude: 11.5820 + (Math.random() - 0.5) * 0.1,
            children: user.children || [],
            languages: user.languages || [],
            hobbies: user.hobbies || [],
            favoritePlaces: user.favoritePlaces || []
          }));
          console.log('Processed users for map:', mapUsers); // Отладка
          setUsers(mapUsers);
        }
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    console.log('Applying filters:', filters); // Отладка
    console.log('Total users before filtering:', users.length); // Отладка
    
    const filtered = users.filter(user => {
      // Фильтр по возрасту детей
      const matchesAge = filters.age > 0
        ? user.children?.some(child => child.age === filters.age)
        : true;

      // Фильтр по району
      const matchesDistrict = filters.district
        ? user.district?.name?.toLowerCase() === filters.district.name.toLowerCase()
        : true;

      console.log(`User ${user.name}: age=${matchesAge}, district=${matchesDistrict}`); // Отладка
      
      return matchesAge && matchesDistrict;
    });
    
    console.log('Filtered users count:', filtered.length); // Отладка
    return filtered;
  }, [users, filters]);

  // Обработчик изменения фильтров
  const handleFilterChange = (newFilters: FilterData) => {
    console.log('Filter changed:', newFilters); // Отладка
    setFilters(newFilters);
  };

  // Координаты центра Мюнхена
  const munichCenter: [number, number] = [48.1351, 11.5820];

  // Проверяем, есть ли активные фильтры
  const hasActiveFilters = filters.age > 0 || filters.district !== null;

  if (loading) {
    return (
      <div className="flex flex-col justify-start items-center gap-2 min-h-screen py-4 bg-gradient-to-br from-sky-100 to-indigo-200 px-4">
        <div className="w-full max-w-6xl">
          <div className="text-center py-12 text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            {t('loadingMap')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center gap-2 min-h-screen py-4 bg-gradient-to-br from-sky-100 to-indigo-200 px-4">
      <div className="w-full max-w-6xl">
        {/* Заголовок */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🗺️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>

        {/* Активные фильтры */}
        {hasActiveFilters && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">{t('activeFilters')}</h3>
            <div className="flex flex-wrap gap-2">
              {filters.age > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {t('ageFilter', { age: filters.age })}
                  <button 
                    onClick={() => handleFilterChange({ ...filters, age: 0 })}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.district && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {t('districtFilter', { district: filters.district.name })}
                  <button 
                    onClick={() => handleFilterChange({ ...filters, district: null })}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
              <button 
                onClick={() => handleFilterChange({ age: 0, district: null })}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                {t('resetAll')}
              </button>
            </div>
          </div>
        )}

        {/* Основной контент */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('filters')}</h2>
              <FilterPanel onFilter={handleFilterChange} currentFilters={filters} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4 h-[70vh]">
              <MapView
                filteredUsers={filteredUsers}
                currentUserLocation={munichCenter}
              />
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-gray-600">{t('totalFamilies')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{filteredUsers.length}</div>
            <div className="text-gray-600">{t('shownOnMap')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {users.reduce((total, user) => total + (user.children?.length || 0), 0)}
            </div>
            <div className="text-gray-600">{t('totalChildren')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}