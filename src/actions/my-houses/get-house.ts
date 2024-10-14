'use server';

import { db } from '@/lib/db';

export const getHouse = async(houseId: string) => {
    console.log('[DESDE GET HOUSE]: ', houseId)
    const house = await db.house.findUnique({
        where:{
            id: houseId
        }
    });
    console.log({house})
    return house;
}