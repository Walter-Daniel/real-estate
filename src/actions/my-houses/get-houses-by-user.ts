'use server';

import { db } from '@/lib/db';

export const getHousesByUser = async(userId: string) => {
    try {
        const properties = await db.house.findMany({
            where: {
                userId: userId
            },
            select: {
                title: true,
                description: true,
                price: true,
                bathrooms: true,
                bedrooms: true,
                guests: true,
                id: true,
                HouseImage: {
                    take: 1,
                    select: {
                        url: true
                    }
                },
                Address: {
                    select:{
                        locality: true
                    }
                }
            }
        });

        return properties;
    } catch (error) {
        console.log(error);
        return [];
    }
}