'use client'
import UserProfileData from "@/components/profile/UserProfileData";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
    const params = useParams<{id: string}>();

    return(
        <UserProfileData  id={params?.id || ''}/>
    )
}