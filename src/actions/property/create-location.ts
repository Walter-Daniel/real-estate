'use server';

import { db } from '@/lib/db';
import { HouseAddressSchemaType} from '@/schemas/new-home-schema';

export const createLocation = async (location: HouseAddressSchemaType) => {

    const { lat, lng, ...rest} = location;

    try {
       await db.houseAddress.create({
            data: {
                latitude: parseFloat(lat.toString()),
                longitude: parseFloat(lng.toString()),
                ...rest
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