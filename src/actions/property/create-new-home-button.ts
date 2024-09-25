'use server';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export const createNewHomeButton = async({userId}: {userId: string}) => {
    const data = await db.home.findFirst({
        where: {
            userId
        },
        orderBy: {
            createdAT: 'desc'
        }
    });

    if(data === null){
        const data = await db.home.create({
            data: {
                userId
            }
        });
        return redirect(`/create/${data.id}/structure`);
    }else if(
        !data.addedCategory &&
        !data.addedDescription &&
        !data.addedLoaction
    ){
        return redirect(`/create/${data.id}/structure`);
    }else if(data.addedCategory && !data.addedDescription){
        return redirect(`/create/${data.id}/description`);
    }
}