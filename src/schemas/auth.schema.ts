import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Campo requerido'
  }),
  password: z.string().min(1, {
    message: 'Campo requerido'
  })
});