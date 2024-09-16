'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { registerSchema } from '@/schemas/auth.schema';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

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

    const verificationToken =  await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return {
        ok: true,
        message: 'Hemos enviado un correo de confirmación.'
    }
   
}