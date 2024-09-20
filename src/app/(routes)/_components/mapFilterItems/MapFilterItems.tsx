'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categoryItems } from '@/lib/categoryItemis';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';

export const MapFilterItems = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('filter');
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value:string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  console.log({search})
  return (
    <div className='flex gap-x-10 lg:justify-center w-full overflow-x-scroll no-scrollbar'>
      {
        categoryItems.map((item) => (
          <Link 
            key={item.id} 
            href={pathname + "?" + createQueryString('filter', item.name)}
            className={cn(
              search === item.name ? 'border-b-2 border-black pb-2 flex-shrink-0': 'opacity-70 flex-shrink-0', 'flex flex-col gap-y-3 items-center'
            )}
          >
            
            <div className='relative w-6 h-6'>
              <Image 
                src={item.imageUrl} 
                alt={item.title}
                className='w-8 h-8'
                width={28}
                height={28}
                />
            </div>
              <p className='text-xs font-medium scroll-item'>{item.title}</p>
          </Link>
        ))
      }
    </div>
  )
}
