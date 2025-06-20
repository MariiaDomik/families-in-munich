import bcrypt from 'bcrypt'
import { getUserByEmail } from '@/actions/user';
import { redirect } from 'next/navigation';

export async function authorizeUser(email: string, password: string) {
    const user = await getUserByEmail(email);
    if (!user || !user.password_hash) {
        redirect('/login');
        return null;
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) {
        redirect('/login');
        return null;
    }
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        profileFilled: user.profileFilled,
    }
    
}
