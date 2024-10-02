'use server';

import { db } from '@/lib/db';
import { LocationSchemaType } from '@/schemas/new-home-schema';

export const createLocation = async (location: LocationSchemaType) => {

    const { homeId, lat, lng } = location;

    try {
       await db.home.update({
            where: {
                id: homeId
            },
            data: {
                location: {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                },
                addedLocation: true
            }
        });

        return {
            ok: true,
            message: 'La propiedad se registró con éxito!'
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Error al intentar agregar la ubicación'
        }
    }
}