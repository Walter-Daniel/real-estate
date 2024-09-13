'use server';

import { loginSchema } from '@/schemas/auth.schema';
import { z } from 'zod';

export const login = async(values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values);

    if(!validatedFields.success){
        return {
            ok: false,
            message: 'Invalid fields'
        }
    };

    return {
        ok: true,
        message: 'Login'
    }
   
}