'use server';

import { db } from '@/lib/db';
import { HouseAddressSchemaType} from '@/schemas/new-home-schema';
import { revalidatePath } from 'next/cache';

export const createLocation = async (location: HouseAddressSchemaType) => {

    const { homeId,lat, lng, ...rest} = location;

    try {
       await db.houseAddress.create({
            data: {
                latitude: parseFloat(lat.toString()),
                longitude: parseFloat(lng.toString()),
                homeId,
                ...rest
            }
        });

        const findHouse = await db.house.update({
            where: {
                id: homeId
            },
            data:{
                addedLocation: true
            }
        });

        if(!findHouse){
            return {
                ok: false,
                message: 'No se encontró casa con el ID proporcionado'
            }
        }
        
        revalidatePath('/');
        return {
            ok: true,
            message: 'La propiedad se registró con éxito!'
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error al intentar agregar la ubicación'
        }
    }

}