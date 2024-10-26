import React from 'react';
import { House } from '../interface/house';
import { formatPriceARS } from '../../../../../../helpers/formatPriceArg';
import { Card, CardHeader, DropdownMenuSeparator } from '@/components/ui';
import { Separator } from '@/components/ui/separator';

export const DescriptionHouse = ({ house }: { house: House }) => {
  return (
    <Card className='w-full max-w-2xl mx-auto px-6'>
      <CardHeader>
        <h3 className='text-2xl font-bold'>Detalle del alquiler</h3>
      </CardHeader>
      <div>
        <div className='grid grid-cols-2'>
          {/* KEYS */}
          <div>
            <p>Título de la propiedad</p>
            <p>Localidad o comuna</p>
            <p>Dirección</p>
            <p>Habitaciones</p>
            <p>Baños</p>
            <p>Cantidad máxima de huespedes</p>
            <p>Alquiler por Noche</p>
            <p>Cantidad de Noches</p>
            
          </div>
          {/* INFORMATION */}
          <div>
            <p>{house.title}</p>
            <p>{house.Address?.locality}</p>
            <p>{house.Address?.street}</p>
            <p>{house.bedrooms}</p>
            <p>{house.bathrooms}</p>
            <p>{house.guests}</p>
            <p>{formatPriceARS(house.price)}</p>
            <p>21</p>
          </div>
        </div>
          <Separator className='h-1'/>
        <div className='grid grid-cols-2 text-xl font-bold'>
        <p>Total</p>
        <p>{formatPriceARS(1212)}</p>

        </div>
      </div>
    </Card>
  );
};
