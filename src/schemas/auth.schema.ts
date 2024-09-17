import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Campo requerido'
  }),
  password: z.string().min(1, {
    message: 'Campo requerido'
  })
});

export const registerSchema = z.object({
  email: z.string().email({
    message: 'El correo no es válido'
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener por lo menos 6 caracteres.'
  }),
  name: z.string().min(6, {
    message: 'El nombre debe tener por lo menos 6 caracteres.'
  })
});

export const resetFormSchema = z.object({
  email: z.string().email({
    message: 'Campo requerido'
  })
});