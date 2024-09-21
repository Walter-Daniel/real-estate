'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { loginSchema } from '@/schemas/auth.schema';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const login = async(values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values);

    if(!validatedFields.success){
        return {
            ok: false,
            message: 'Invalid fields'
        }
    };

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {
            ok: false,
            message: "Credenciales incorrectas!"
        }
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);

        return {
            ok: true,
            message: "Correo de confirmación enviado."
        }
    }

    try {
        await signIn("credentials", {
          email,
          password,
          redirectTo: DEFAULT_LOGIN_REDIRECT  
        })
        return {
            ok: true,
            message: "Inicio de sesión exitoso!"
        }
    } catch (error) {
       if(error instanceof AuthError) {
        switch(error.type){
            case "CredentialsSignin":
                return {
                    ok: false,
                    message: "Credenciales incorrectas!"
                }
            default:
                return {
                    ok: false,
                    message: "Algo salió mal."
                }
        }
       }
       throw error;
    }
}