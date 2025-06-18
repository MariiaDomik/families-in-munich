'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../common/Button/Button";

export default function GoogleAuthButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <p>Hallo {session.user?.name}</p>
                <Button onClick={() => signOut()}>Sign Out</Button>
            </div>
        )
    }

    return <Button onClick={() => signIn('google')}>Sign In per Google Account</Button>
}