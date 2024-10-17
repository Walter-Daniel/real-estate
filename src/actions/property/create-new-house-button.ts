'use server';

import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export const createNewHouseButton = async({userId}:{userId: string}) => {
    const house = await db.house.findFirst({
        where: {
          userId: userId,
          isComplete: false
        },
        orderBy: {
          createdAT: "desc",
        },
      });

      if(!house){
        redirect('/houses/create');
      }
      redirect(`/houses/${house.id}/address`);
}
