'use server';

import { db } from '@/lib/db';
import { LocationSchemaType } from '@/schemas/new-home-schema';
import { redirect } from 'next/navigation';


export const createLocation = async (location: LocationSchemaType) => {

  const { homeId, lat, lng } = location;

  const result = await db.home.update({
      where: {
          id: homeId
      },
      data: {
          location: {
              lat: parseFloat(lat),
              lng: parseFloat(lng)
          },
          addedLoaction: true
      }
  });

   if(!result){
    return {
        ok: false,
        message: 'Error al intentar agregar la ubicación'
    }
   }
    return redirect('/');
}