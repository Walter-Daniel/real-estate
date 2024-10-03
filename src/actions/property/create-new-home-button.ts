'use server';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export const createNewHomeButton = async ({ userId }: { userId: string }) => {
    const data = await db.house.findFirst({
        where: {
            userId
        },
        orderBy: {
            createdAT: 'desc'
        }
    });

    if (data === null) {
        const data = await db.house.create({
            data: {
                userId
            }
        });
        return redirect(`/create/${data.id}/structure`);
    } else if (
        !data.addedCategory &&
        !data.addedDescription &&
        !data.addedLocation
    ) {
        return redirect(`/create/${data.id}/structure`);
    } else if (data.addedCategory && !data.addedDescription) {
        return redirect(`/create/${data.id}/description`);
    } else if (
        data.addedCategory &&
        data.addedDescription &&
        !data.addedLocation
    ) {
        return redirect(`/create/${data.id}/address`);
    }else if (
        data.addedCategory &&
        data.addedDescription &&
        data.addedLocation
    ){
        const data = await db.house.create({
            data: {
              userId: userId,
            },
          });
      
          return redirect(`/create/${data.id}/structure`);
    }
}