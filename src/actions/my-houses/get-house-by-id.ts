'use server';

import { db } from '@/lib/db';

export const getHouseById = async(houseId: string) => {
    console.log('[DESDE GET HOUSE]: ', houseId)
    try {
        const house = await db.house.findUnique({
            where:{
                id: houseId
            },
            select:{
                title: true,
                description: true,
                categoryName: true,
                price: true,
                guests: true,
                bedrooms: true,
                bathrooms: true,
                HouseImage:{
                    select: {
                        url: true,
                    }
                },
                Address: {
                    select: {
                        street: true,
                        latitude: true,
                        longitude: true,
                        locality: true
                    }
                }
            }
        });
        return {
            ok: true,
            message: 'Se obtuvo con éxito la casa',
            house
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error al obtener la casa'
        }
    }
}