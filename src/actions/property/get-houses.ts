'use server';

import { db } from '@/lib/db';

export const getHouses = async({
    searchParams,
    userId
  }: {
    userId: string | undefined;
    searchParams?: {
      filter?: string;
    }
  }) => {

    try {
        const properties = await db.house.findMany({
            where: {
                isComplete: true,
                categoryName: searchParams?.filter ?? undefined
            },
            
            include:{
                HouseImage: true,
                Address: true,
                Favorite: {
                  where: { 
                    userId: userId
                  }
                }
            }
        });

        if(!properties) return [];

        const transformedProperties = properties.map((property) => ({
            id: property.id,
            title: property.title!.toString(),
            price: property.price,

            //House images
            image: property.HouseImage[0].url,
      
            // Address properties
            street: property.Address?.street ,
            locality: property.Address?.locality,

            //Favorite
            favorite: property.Favorite
          }));
      
          return transformedProperties;

    } catch (error) {
        console.log('[GET-PROPERTIES]: ', error)
        return []
    }
}