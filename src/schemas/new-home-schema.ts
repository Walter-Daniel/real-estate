import { z } from 'zod';

export const DescriptionSchema = z.object({
    id: z.string().uuid({message: 'id'}),
    title: z.string()
            .min(5, {message: 'El título debe tener como mínimo 5 caracteres.'})
            .max(30, {message: 'El título debe tener como máximo 30 caracteres.'}),  
    description: z.string()
            .min(5, {message: 'La descripción debe tener como mínimo 5 caracteres.'}),
    guests: z.coerce.number()
    .min(0)
    .transform( val => Number(val.toFixed(2))) ,
    // bedrooms     String?
    // bathrooms    String?
    // country      String?
    // photo        String?
    // price        Int?
    // categoryName String?
    // location     Json?
});