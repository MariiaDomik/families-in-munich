'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import { UserForMap } from '@/types/User';
import MapMarker from './MapMarker';
import { useEffect, useState } from 'react';

interface Props {
  filteredUsers: UserForMap[];
  currentUserLocation: [number, number];
}

export default function MapView({
  filteredUsers,
  currentUserLocation,
}: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Динамически загружаем стили Leaflet
    const loadLeafletStyles = async () => {
      if (typeof window !== 'undefined') {
        // Проверяем, не загружены ли уже стили
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }

        if (!document.querySelector('link[href*="MarkerCluster.css"]')) {
          const clusterLink = document.createElement('link');
          clusterLink.rel = 'stylesheet';
          clusterLink.href = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css';
          document.head.appendChild(clusterLink);

          const defaultLink = document.createElement('link');
          defaultLink.rel = 'stylesheet';
          defaultLink.href = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css';
          document.head.appendChild(defaultLink);
        }
      }
    };

    loadLeafletStyles();

    // Исправляем проблему с иконками Leaflet
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px]">
      <MapContainer
        center={currentUserLocation}
        zoom={13}
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        scrollWheelZoom={false}
        className="rounded-lg overflow-hidden"
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
