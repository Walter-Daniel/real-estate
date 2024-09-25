import { z } from 'zod';

export const DescriptionSchema = z.object({
        id: z.string().uuid({ message: 'id' }),
        title: z.string()
                .min(5, { message: 'El título debe tener como mínimo 5 caracteres.' })
                .max(30, { message: 'El título debe tener como máximo 30 caracteres.' }),
        description: z.string()
                .min(5, { message: 'La descripción debe tener como mínimo 5 caracteres.' }),
        guests: z.coerce.number()
                .min(0)
                .transform(val => Number(val.toFixed(2))),
        bedrooms: z.string(),
        bathrooms: z.string(),
        country: z.string(),
        photo: z.string(),
        price: z.number().int(),
        categoryName: z.string(),
        location: z.string().refine((val) => {
                try {
                        const parsed = JSON.parse(val); // Intenta parsear el string como JSON
                        DescriptionSchema.parse(parsed); // Valida el JSON con el esquema de Zod
                        return true;
                } catch (e) {
                        return false;
                }
        }, { message: "Invalid JSON format or schema" }),
});