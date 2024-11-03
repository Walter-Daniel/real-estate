'use server';

import { db } from '@/lib/db';

export const getUnavailableDates = async (houseId: string) => {
    try {
        const bookings = await db.booking.findMany({
            where: {
                houseId,
                endDate: {
                    gte: new Date()
                }
            },
            select: {
                startDate: true,
                endDate: true
            }
        }) 
        return bookings.map(booking => ({
            startDate: booking.startDate.toISOString(),
            endDate: booking.endDate.toISOString(),
          }))
    } catch (error) {
        console.error('Error al obtener las fechas no disponibles:', error)
        throw new Error('No se pudieron obtener las fechas no disponibles')
    }
}