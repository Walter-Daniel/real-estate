'use server';

import { db } from '@/lib/db';

interface Booking {
    houseId: string,
    startDate: Date,
    endDate: Date,
    userId: string,
    totalPrice: number
}

export const createBooking = async({ houseId, startDate, endDate, userId, totalPrice }: Booking) => {
    console.log({ houseId, startDate, endDate, userId, totalPrice})
    try {
        const booking = await db.booking.create({
            data: {
                houseId,
                startDate,
                endDate,
                userId,
                totalPrice
            }
        })
    } catch (error) {
        console.log(error)
    }
} 