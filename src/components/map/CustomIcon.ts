import L from "leaflet";

export const CustomIcon = (avatarUrl?: string) =>
    L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="border: 2px solid #3182ce; border-radius: 50%; overflow: hidden; width: 40px; height: 40px; background: white;">
          <img 
            src="${avatarUrl || '/default-avatar.png'}" 
            alt="Avatar" 
            style="width: 100%; height: 100%; object-fit: cover;" 
          />
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });