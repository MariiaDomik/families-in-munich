'use client'
import { UserForMap } from "@/types/User";
import { Marker, MarkerProps } from "react-leaflet";
import MapPopup from "./MapPopup";
import { useLocale } from "next-intl";
import { CustomIcon } from "./CustomIcon";

interface MapMarkerProps extends MarkerProps {
    user: UserForMap;
}

export default function MapMarker({ user, position, ...props }: MapMarkerProps) {
    const locale = useLocale();
    return (
        <Marker 
        key={user.id}
        icon={CustomIcon(user.avatar_url)}
        position={position || [user.latitude, user.longitude]} 
        {...props}
        >
            <MapPopup 
                user={user}
                locale={locale}
            />
        </Marker>
    )
}