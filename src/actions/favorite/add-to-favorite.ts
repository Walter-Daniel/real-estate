'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FavoriteSchema = z.object({
    houseId: z.string(),
    userId: z.string()
}) 

export const addToFavorite = async(formData: FormData) => {
    const data = Object.fromEntries(formData);
    const dataParsed = FavoriteSchema.safeParse(data);

    if(!dataParsed.success){
        return{
            ok: false,
            message: 'No se pudo seleccionar como favorito'
        }
    }

    const { houseId , userId } = dataParsed.data;

    try {
        await db.favorite.create({
            data: {
                homeId: houseId,
                userId: userId
            }
        })

        revalidatePath('/')
    
        return {
            ok: true,
            message: 'Se agregó un nuevo favorito'
        }
    } catch (error) {
        console.log(error)
        return{
            ok: false,
            message: 'No se pudo seleccionar como favorito'
        }
    }
}