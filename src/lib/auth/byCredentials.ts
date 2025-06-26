import bcrypt from 'bcrypt'
import { getUserByEmail } from '@/actions/user';

export async function authorizeUser(email: string, password: string) {
    
    const user = await getUserByEmail(email);
    
    if (!user || !user.password_hash) {
        return null;
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    
    if (!valid) {
        return null;
    }
    
    const result = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    
    return result;
}
