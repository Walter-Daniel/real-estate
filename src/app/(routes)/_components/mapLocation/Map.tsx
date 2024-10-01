'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { LegacyRef } from 'react';

interface MapProps {
  mapRef: LegacyRef<HTMLDivElement> | undefined;
  isLoaded: boolean;
}

const Map = ({ mapRef, isLoaded }: MapProps) => (
  <div className='flex flex-col space-y-4'>
    {isLoaded ? <div style={{ height: '50vh' }} ref={mapRef} /> : <Skeleton className='h-50vh w-full'/>}
  </div>
);

export default Map;