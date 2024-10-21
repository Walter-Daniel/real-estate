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
                        },
                        HouseImage: {
                            take: 1,
                            select: {
                                url: true
                            }
                        }
                    },
                    
                }
            }
        });

        const transformedFavorites = favorites.map((favorite) => ({
            houseId: favorite.House?.id,
            title: favorite.House?.title,
            price: favorite.House?.price,
            locality: favorite.House?.Address?.locality,
            street: favorite.House?.Address?.street,
            owner: favorite.House?.User?.name,
            imageUrl: favorite.House?.HouseImage[0].url

        }))
        return transformedFavorites;
    } catch (error) {
        return []
    }
    

}