import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

export const SkeletonCard = () => {
  return (
    <Card className='rounded-lg overflow-hidden'>
      <div className="relative h-72 w-full">
        <Skeleton className="h-full w-full" />
        <Badge variant="secondary" className='absolute right-1 top-2'>
          <Skeleton className="h-4 w-16" />
        </Badge>
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPin size={14} />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
      <CardFooter className="px-4 py-2 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-16 ml-1" />
        </div>
        <Skeleton className="h-9 w-20" /> {/* Button skeleton */}
      </CardFooter>
    </Card>
  )
}
