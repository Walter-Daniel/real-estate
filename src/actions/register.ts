'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { registerSchema } from '@/schemas/auth.schema';
import { getUserByEmail } from '@/data/user';

export const register = async(values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);

    if(!validatedFields.success){
        return {
            ok: false,
            message: 'Invalid fields'
        }
    };

    const { email, password, name } = validatedFields.data;
    const hashPassword = await bcrypt.hash(password, 10);
    const emailExist = await getUserByEmail(email);

    if(emailExist){
        return {
            ok: false,
            message: 'El correo ya se encuentra en uso!'
        }
    };

    await db.user.create({
        data:{
            name,
            email,
            password: hashPassword
        }
    });

    //Todo: enviar mensaje de verificación

    return {
        ok: true,
        message: 'Usuario creado con éxito.'
    }
   
}