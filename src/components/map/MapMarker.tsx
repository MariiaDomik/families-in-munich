'use client'
import { UserForMap } from "@/types/User";
import { Marker, MarkerProps } from "react-leaflet";
import MapPopup from "./MapPopup";
import { useRouter } from "next/navigation";
import { CustomIcon } from "./CustomIcon";

interface MapMarkerProps extends MarkerProps {
    user: UserForMap;
}

export default function MapMarker({ user, position, ...props }: MapMarkerProps) {
    const router = useRouter();
    return (
        <Marker 
        key={user.id}
        icon={CustomIcon(user.avatar_url)}
        position={position || [user.latitude, user.longitude]} 
        {...props}
        eventHandlers={{
            click: () => router.push(`users/${user.id}`)
        }} >
            <MapPopup 
                user={user} 
                onClick={() => router.push(`users/${user.id}`)}
            />
        </Marker>
    )
}