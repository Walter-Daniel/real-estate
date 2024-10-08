'use server';

import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export const getHouse = async(id: string) => {
    try {
        const house = db.house.findFirst({
            where: {
                id: id
            }
        })

        return house
    } catch (error) {
        console.log('[GETHOUSE]',error)
        redirect('/')
    }
}