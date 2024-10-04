import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Decimal } from '@prisma/client/runtime/library';
import { DollarSign, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ListingCardProps {
  houseId: string;
  title: string;
  photo: string;
  price: string;
  street: string;
  locality: string;
}

export const ListingCard = ({title, photo, price, street, locality, houseId}: ListingCardProps) => {
  return (
    <Link href={`/house/${houseId}`}>
        <Card className='w-[200px] rounded-lg overflow-hidden'>
          <div className="relative h-48 w-full">
            <Image
              src={photo}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardContent className="p-4">
            <h2 className=" font-semibold mb-2 line-clamp-1">{title}</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin size={14} />
              <span className="line-clamp-1">{street}</span>
            </div>
          </CardContent>
          <CardFooter className="px-4 py-2 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center">
              <DollarSign size={16} className="text-green-600" />
              <span className="font-semibold text-lg">{price.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-1">/ Noche</span>
            </div>
            <Badge variant="secondary">{locality}</Badge>
          </CardFooter>
        </Card>
    
    </Link>
  )
}
