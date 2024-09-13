'use server';

import { registerSchema } from '@/schemas/auth.schema';
import { z } from 'zod';

export const register = async(values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);

    if(!validatedFields.success){
        return {
            ok: false,
            message: 'Invalid fields'
        }
    };

    return {
        ok: true,
        message: 'Usuario creado con éxito'
    }
   
}