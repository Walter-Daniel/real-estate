import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const DescriptionSchema = z.object({
  userId: z.string(),
  title: z.string()
    .min(5, { message: 'El título debe tener como mínimo 5 caracteres.' })
    .max(30, { message: 'El título debe tener como máximo 30 caracteres.' }),
  description: z.string()
    .min(5, { message: 'La descripción debe tener como mínimo 5 caracteres.' }),
  categoryName: z.string(),
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
    images: z
    .any()
    .refine((files) => files?.length === 3, {
      message: 'Debes subir exactamente 3 imágenes.',
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Cada archivo debe ser menor o igual a 5MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: 'Solo se aceptan archivos .jpg, .jpeg, .png y .webp.',
    })
    .transform(files => Array.from(files)),
});

export const HouseAddressSchema = z.object({
  houseId: z.string(),
  locality: z.string().min(1, { message: "Latitude is required" }),
  lat: z.number(),
  lng: z.number(),
  street: z.string().min(1),
  zipCode: z.string().min(1)
});

export type DescriptionSchemaType = z.infer<typeof DescriptionSchema>;
export type HouseAddressSchemaType = z.infer<typeof HouseAddressSchema>;