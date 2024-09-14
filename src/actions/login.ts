'use server';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { loginSchema } from '@/schemas/auth.schema';
import { AuthError } from 'next-auth';
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

    try {
        await signIn("credentials", {
          email,
          password,
          redirectTo: DEFAULT_LOGIN_REDIRECT  
        })
    } catch (error) {
       if(error instanceof AuthError) {
        switch(error.type){
            case "CredentialsSignin":
                return {
                    ok: false,
                    message: "Credenciales invalidas!"
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