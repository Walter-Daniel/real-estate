'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FavoriteSchema = z.object({
    favoriteId: z.string(),
}) 

export const deleteFavorite = async(formData: FormData) => {
    const data = Object.fromEntries(formData);
    const dataParsed = FavoriteSchema.safeParse(data);

    if(!dataParsed.success){
        return{
            ok: false,
            message: 'No se pudo seleccionar como favorito'
        }
    }

    const { favoriteId  } = dataParsed.data;

    try {
        await db.favorite.delete({
            where: {
                id: favoriteId
            }
        })

        revalidatePath('/')
    
        return {
            ok: true,
            message: 'Se eliminó favorito con éxito'
        }
    } catch (error) {
        console.log(error)
        return{
            ok: false,
            message: 'No se pudo seleccionar como favorito'
        }
    }
}