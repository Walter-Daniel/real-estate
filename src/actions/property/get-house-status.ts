'use server'

import { db } from '@/lib/db'

export async function getHouseStatus(id: string) {
  const house = await db.house.findUnique({
    where: { id },
    select: { isComplete: true }
  })
  return house?.isComplete
}