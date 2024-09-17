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

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    // .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula" })
    // .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula" })
    // .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" })
    // .regex(/[\W_]/, { message: "La contraseña debe contener al menos un carácter especial" }),

  confirmPassword: z
    .string()
    .min(6, { message: "La confirmación de la contraseña debe tener al menos 6 caracteres" }),
})
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Las contraseñas no coinciden",
  });