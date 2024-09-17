'use server';

import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { resetPasswordSchema } from '@/schemas/auth.schema';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const resetPassword = async (
    values: z.infer<typeof resetPasswordSchema>,
    token: string) => {
    const validatedFields = resetPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            ok: false,
            message: "Error validando credenciales"
        };
    }

    const { password } = validatedFields.data;
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
        return {
            ok: false,
            message: "Token no válido."
        };
    }

    const hastExpired = new Date(existingToken.expires) < new Date();
    if(hastExpired){
        return {
            ok: false,
            message: "El token ha expirado."
        }
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return {
            ok: false,
            message: "El correo no existe."
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: {id: existingUser.id},
        data: { password: hashedPassword }
    });

    await db.passwordResetToken.delete({
        where: {id: existingToken.id}
    });

    return {
        ok: true,
        message: "Contraseña reestablecida!"
    }
}
