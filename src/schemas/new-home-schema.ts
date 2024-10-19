import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const DescriptionSchema = z.object({
  userId: z.string(),
  title: z
    .string()
    .min(5, { message: "El título debe tener como mínimo 5 caracteres." })
    .max(30, { message: "El título debe tener como máximo 30 caracteres." }),
  description: z
    .string()
    .min(5, { message: "La descripción debe tener como mínimo 5 caracteres." }),
  categoryName: z.string().min(1, "Seleccione una categoría"),
  bathrooms: z
    .string({
      invalid_type_error: 'Por favor, ingrese un numero entero. Ej: 3'
    })
    .min(1, "Este campo es requerido")
    .refine((value) => /^\d+$/.test(value), "Debe ser un número entero")
    .transform((value) => parseInt(value, 10))
    .refine(
      (value) => value > 0 && value <= 30,
      "Debe ser un número entre 1 y 30"
    ),
  bedrooms: z
    .string({
      invalid_type_error: 'Por favor, ingrese un numero entero. Ej: 2'
    })
    .min(1, "Este campo es requerido")
    .refine((value) => /^\d+$/.test(value), "Debe ser un número entero")
    .transform((value) => parseInt(value, 10))
    .refine(
      (value) => value > 0 && value <= 30,
      "Debe ser un número entre 1 y 30"
    ),
  guests: z
    .string({
      invalid_type_error: 'Por favor, ingrese un numero entero. Ej: 5'
    })
    .min(1, "Este campo es requerido")
    .refine((value) => /^\d+$/.test(value), "Debe ser un número entero")
    .transform((value) => parseInt(value, 10))
    .refine(
      (value) => value > 0 && value <= 30,
      "Debe ser un número entre 1 y 30"
    ),
  price: z
    .string({
      invalid_type_error: 'Por favor, ingrese el precio. Ej: 5.000,90'
    })
    .regex(
      /^\d{1,3}(\.\d{3})*(\,\d{1,2})?$/,
      "Formato inválido. Use puntos como separadores de miles y coma para decimales. Ej: 10.500,60"
    ),
    // .transform((val) => {
    //   // Remove thousands separators and replace comma with dot for decimal
    //   const numericValue = parseFloat(val.replace(/\./g, "").replace(",", "."));
    //   return isNaN(numericValue) ? 0 : numericValue;
    // }),
  images: z
    .any()
    .refine((files) => files?.length === 3, {
      message: "Debes subir exactamente 3 imágenes.",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Cada archivo debe ser menor o igual a 5MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: "Solo se aceptan archivos .jpg, .jpeg, .png y .webp.",
    })
    .transform((files) => Array.from(files)),
});

export const HouseAddressSchema = z.object({
  houseId: z.string(),
  locality: z.string().min(1, { message: "Latitude is required" }),
  lat: z.number(),
  lng: z.number(),
  street: z.string().min(1),
  zipCode: z.string().min(1),
});

export type DescriptionSchemaType = z.infer<typeof DescriptionSchema>;
export type HouseAddressSchemaType = z.infer<typeof HouseAddressSchema>;
