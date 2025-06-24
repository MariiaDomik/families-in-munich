'use client'
import FilterPanel from "@/components/common/filter/FilterPanel";
import MapView from "@/components/map/MapView";
import { UserForMap } from "@/types/User";
import { District } from "@/types/District";
import { Gender } from "@/types/Gender";
import { useMemo, useState } from "react";

interface FilterData {
  age: number;
  district: District | null;
}

export default function MapPage() {
  const [filters, setFilters] = useState<FilterData>({ age: 0, district: null });
  const [users, setUsers] = useState<UserForMap[]>([]);
  
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesAge = filters.age
        ? user.children?.some(child => child.age === filters.age)
        : true;

      const matchesDistrict = filters.district
        ? user.district?.name?.toLowerCase() === filters.district.name.toLowerCase()
        : true;

      return matchesAge && matchesDistrict;
    });
  }, [users, filters]);

  // Координаты центра Мюнхена
  const munichCenter: [number, number] = [48.1351, 11.5820];

  return (
    <div className="grid md:grid-cols-4">
      <div className="col-span-1">
        <FilterPanel onFilter={setFilters} />
      </div>
      <div className="col-span-3 h-[80vh]">
        <MapView
          filteredUsers={filteredUsers}
          currentUserLocation={munichCenter}
        />
      </div>
    </div>
  )
}