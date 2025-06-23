// components/Map.tsx
'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { User } from '@/types/User';
import MapMarker from './MapMarker';
import { useEffect } from 'react';

interface Props {
  users: (User & {
    latitude: number;
    longitude: number;
    avatar_url?: string;
  })[];
  currentUserLocation: [number, number];
  filterAge?: number;
  filterDistrict?: string;
  filterHobby?: string;
}

export default function Map({
  users,
  currentUserLocation,
  filterAge,
  filterDistrict
}: Props) {
  const currentYear = new Date().getFullYear();

  const filteredUsers = users.filter(user => {
    const matchesAge = filterAge
      ? user.children?.some(child => child.age === filterAge)
      : true;

    const matchesDistrict = filterDistrict
      ? user.district?.name?.toLowerCase() === filterDistrict.toLowerCase()
      : true;


    return matchesAge && matchesDistrict ;
  });

  // Исправляем проблему с иконками Leaflet
  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer 
        center={currentUserLocation} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup chunkedLoading>
          {filteredUsers.map(user => (
            <MapMarker 
              key={user.id} 
              user={user} 
              position={[user.latitude, user.longitude]}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
