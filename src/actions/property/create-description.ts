'use server';

import { db } from '@/lib/db';
import { DescriptionSchemaType } from '@/schemas/new-home-schema';
import { redirect } from 'next/navigation';

export const createDescription= async (values: DescriptionSchemaType ) => {

    const { id, guests, bedrooms, bathrooms, photo, ...rest } = values;

    // Convert number fields to strings
    const stringifiedValues = {
        guests: guests.toString(),
        bedrooms: bedrooms.toString(),
        bathrooms: bathrooms.toString(),
    };

    try {
        await db.home.update({
            where: {
                id: id
            },
            data: {
            ...rest,
            ...stringifiedValues
            }
        });
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error al guardar la descripción'
        }
    }

    return redirect(`/create/${id}/address`)
}