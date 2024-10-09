import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { formatPriceARS } from '@/helpers/formatPriceArg';
import { AddFavoriteButton, DeleteFavoriteButton } from '../addFavoriteButton';
import { addToFavorite, deleteFavorite } from '@/actions/favorite';

interface ListingCardProps {
  houseId: string;
  title: string;
  photo: string;
  price: number;
  street: string;
  locality: string;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
}

export const ListingCard = ({ title, photo, price, street, locality, houseId, userId, isInFavoriteList, favoriteId }: ListingCardProps) => {

  return (
    <Card className='rounded-lg overflow-hidden transition-opacity transform duration-700 ease-in-out opacity-0 animate-fadeIn'>
      <div className="relative h-72 w-full">
        <Image
          src={photo}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {
          userId && (
            <div className='absolute right-1 top-2'>
              {
                isInFavoriteList ? (
                  <form action={deleteFavorite}>
                    <input type='hidden' name='favoriteId' value={favoriteId}/>
                    <DeleteFavoriteButton />
                  </form>
                ) : (
                  <form action={addToFavorite}>
                    <input type='hidden' name='houseId' value={houseId}/>
                    <input type='hidden' name='userId' value={userId}/>
                    <AddFavoriteButton />
                  </form>
                )
              }
            </div>
          )
        }
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
          <span className="font-semibold text-lg">{formatPriceARS(price)}</span>
          <span className="text-sm text-gray-500 ml-1">/ Noche</span>
        </div>
        <Button asChild size='sm' >
          <Link href={`/house/${houseId}`} >Ver más</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
