import L from "leaflet";

export const CustomIcon = (avatarUrl?: string) =>
    L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 40px; 
          height: 40px; 
          border-radius: 50%; 
          overflow: hidden; 
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          border: 3px solid white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        ">
          ${avatarUrl ? `
            <img 
              src="${avatarUrl}" 
              alt="Avatar" 
              style="
                width: 100%; 
                height: 100%; 
                object-fit: cover;
                border-radius: 50%;
              " 
            />
          ` : `
            <div style="
              width: 100%; 
              height: 100%; 
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 16px;
            ">
              👨‍👩‍👧‍👦
            </div>
          `}
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });