'use server';

import { db } from '@/lib/db';

export const getHouses = async() => {
    try {
        const properties = await db.house.findMany({
            where: {
                addedLocation: true,
                addedCategory: true,
                addedDescription: true
            },
            
            include:{
                Address: true
            }
        });

        if(!properties) return [];

        const transformedProperties = properties.map((property) => ({
            id: property.id,
            title: property.title!.toString(),
            description: property.description,
            category: property.categoryName,
            price: property.price!.toString(),
            userId: property.userId || '',
            photo: property.photo!.toString(),
      
            // Address properties
            street: property.Address?.street || '',
            locality: property.Address?.locality || '',
            zipCode: property.Address?.zipCode || '',
            latitude: property.Address ? property.Address.latitude.toString() : '',
            longitude: property.Address ? property.Address.longitude.toString() : '',
          }));
      
          return transformedProperties;

    } catch (error) {
        console.log('[GET-PROPERTIES]: ', error)
        return
    }
}