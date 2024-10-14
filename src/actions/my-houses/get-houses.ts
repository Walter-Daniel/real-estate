'use server';

import { db } from '@/lib/db';

export const getHouses = async(userId: string) => {
    console.log({userId})
    try {
        const properties = await db.house.findMany({
            where: {
                userId: userId
            }
        })

        return properties;
    } catch (error) {
        console.log(error);
        return [];
    }
}