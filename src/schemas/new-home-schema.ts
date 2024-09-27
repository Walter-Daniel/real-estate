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
  guests: z.number().int().positive(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  price: z.number().positive(),
  photo: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `El tamaño máximo del archivo es 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Solo se aceptan archivos .jpg, .jpeg, .png y .webp."
    )
    .optional(),
});

export type DescriptionSchemaType = z.infer<typeof DescriptionSchema>;