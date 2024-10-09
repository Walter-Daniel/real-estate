'use server';

import { db } from '@/lib/db';

export const getFavoritesByUser = async(userId: string) => {

    try {
        const favorites = await db.favorite.findMany({
            where:{
                userId: userId
            },
            select: {
                House: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                        photo: true,
                        Address: {
                            select: {
                                locality: true,
                                street: true
                            }
                        },
                        User: {
                            select: {
                                name: true
                            }
                        }
                    },
                    
                },
                User: {
                    select:{
                        name: true
                    }
                }
            }
        })
        return favorites;
    } catch (error) {
        return {
            ok: false,
            message: 'Error al obtener lista de favoritos'
        }
    }
    

}