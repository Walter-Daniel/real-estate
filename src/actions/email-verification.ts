'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

export const emailVerification = async(token:string) => {
    const existingToken = await getVerificationTokenByToken(token);
    if(!existingToken){
        return {
            ok: false,
            message: "No existe el token."
        }
    }

    const hasExpires = new Date(existingToken.expires) < new Date();
    if(!hasExpires){
        return {
            ok: false,
            message: "El token ha expirado."
        }
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return {
            ok: false,
            message: 'El correo no existe.'
        }
    }

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return {
        ok: true,
        message: 'El correo ha sido validado.'
    }
}