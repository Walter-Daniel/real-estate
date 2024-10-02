// schemas/new-home-schema.ts
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const DescriptionSchema = z.object({
  id: z.string(),
  title: z.string()
    .min(5, { message: 'El título debe tener como mínimo 5 caracteres.' })
    .max(30, { message: 'El título debe tener como máximo 30 caracteres.' }),
  description: z.string()
    .min(5, { message: 'La descripción debe tener como mínimo 5 caracteres.' }),
  guests: z.coerce
    .number()
    .int()
    .positive({ message: 'El número de invitados debe ser un entero positivo.' }),

  bedrooms: z.coerce
    .number()
    .int()
    .positive({ message: 'El número de habitaciones debe ser un entero positivo.' }),

  bathrooms: z.coerce
    .number()
    .int()
    .positive({ message: 'El número de baños debe ser un entero positivo.' }),

  price: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(2))),
    photo: z.instanceof(File).optional(),
});

export const LocationSchema = z.object({
  homeId: z.string(),
  lat: z.string().min(1, { message: "Latitude is required" }),
  lng: z.string().min(1, { message: "Longitude is required" }),
});

export type DescriptionSchemaType = z.infer<typeof DescriptionSchema>;
export type LocationSchemaType = z.infer<typeof LocationSchema>;