'use server';

import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const categoryNames: string[] = [
    "trending",
    "family-house",
    "cabin",
    "eco-house",
    "amazing-view",
    "design",
    "pool",
    "mountain-refuge",
    "hostel",
    "glamping"
];

const categorySchema = z.object({
    homeId: z.string().uuid({message: "Id no válido"}),
    categoryName: z.enum(categoryNames as [string, ...string[]], {
      errorMap: () => ({ message: "Categoría no válida." }),
    })
  });


export const createCategoryPage = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const categoryParsed = categorySchema.safeParse(data);

    if ( !categoryParsed.success) {
        return {
          ok: false,
          message: 'Error al guardar categoría'
         }
    }

    const home = categoryParsed.data;
    const result = await db.home.update({
        where: {
            id: home.homeId
        },
        data: {
            categoryName: home.categoryName,
            addedCategory: true
        }
    })

    return redirect(`/create/${home.homeId}/description`)
}