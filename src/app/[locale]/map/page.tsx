'use client'
import FilterPanel from "@/components/common/filter/FilterPanel";
import MapView from "@/components/map/MapView";
import { User } from "@/types/User";
import { District } from "@/types/District";
import { Gender } from "@/types/Gender";
import { useState } from "react";

interface FilterData {
  age: number;
  district: District | null;
}

type UserWithLocation = User & {
  latitude: number;
  longitude: number;
  avatar_url?: string;
};

export default function MapPage() {
    const [filters, setFilters] = useState<FilterData>({age: 0, district: null});
    
    // Тестовые пользователи для демонстрации
    const [users, setUsers] = useState<UserWithLocation[]>([
      {
        id: "1",
        name: "Anna Schmidt",
        city: "Munich",
        PLZ: 80331,
        district: {
          id: 1,
          name: "Altstadt",
          plz: "80331",
          center_lat: 48.1351,
          center_lng: 11.5820
        },
        gender: Gender.female,
        children: [
          {
            id: "1",
            name: "Lukas",
            age: 5,
            gender: Gender.male,
            hobbies: ["football", "swimming"]
          }
        ],
        latitude: 48.1351,
        longitude: 11.5820,
        avatar_url: "https://via.placeholder.com/50"
      },
      {
        id: "2",
        name: "Maria Weber",
        city: "Munich",
        PLZ: 80686,
        district: {
          id: 2,
          name: "Schwabing",
          plz: "80686",
          center_lat: 48.1589,
          center_lng: 11.5667
        },
        gender: Gender.female,
        children: [
          {
            id: "2",
            name: "Emma",
            age: 7,
            gender: Gender.female,
            hobbies: ["dancing", "painting"]
          }
        ],
        latitude: 48.1589,
        longitude: 11.5667,
        avatar_url: "https://via.placeholder.com/50"
      }
    ]);
    
    // Координаты центра Мюнхена
    const munichCenter: [number, number] = [48.1351, 11.5820];

    return(
        <div className="grid md:grid-cols-4">
            <div className="col-span-1">
                <FilterPanel onFilter={setFilters} />
            </div>
            <div className="col-span-3 h-[80vh]">
                <MapView 
                    users={users}
                    currentUserLocation={munichCenter}
                    filterAge={filters.age || undefined}
                    filterDistrict={filters.district?.name}
                    filterHobby={undefined}
                />
            </div>
        </div>
    )
}