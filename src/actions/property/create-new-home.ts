'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export const createNewHome = async() => {

    const session = await auth();
    if(!session?.user){
        return {
            ok: false,
            message: 'No se encontró usuario'
        };
    }

    const { user } = session;
    await db.user.findUnique({
        where:{
            id: user.id
        }
    });

    
    
    
}