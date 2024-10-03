'use server';

import { db } from '@/lib/db';

export const getProperties = async() => {
    try {
        const properties = await db.house.findMany({
            where: {
                addedLocation: true,
                addedCategory: true,
                addedDescription: true
            },
            select: {
                photo: true,
                id: true,
                price: true,
                title: true
            }
        });

        return properties || [];
    } catch (error) {
        console.log('[GET-PROPERTIES]: ', error)
        return []
    }
}