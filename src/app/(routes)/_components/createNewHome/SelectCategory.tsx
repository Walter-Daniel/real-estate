'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader } from '@/components/ui';
import { categoryItems } from '@/lib/categoryItemis';

export const SelectCategory = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>()
  return (
    <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36'>
        {categoryItems.map((item) => (
            <div className='cursor-pointer' key={item.id}>
                <Card 
                    className={selectedCategory === item.name ? 'border-primary border-2' : ''}
                    onClick={() => setSelectedCategory(item.name)}
                >
                    <CardHeader>
                        <Image 
                            src={item.imageUrl}
                            alt={item.name}
                            height={32}
                            width={32}
                            className='w-8 h-8'
                        />
                        <h4 className='font-medium'>{item.title}</h4>
                    </CardHeader>
                </Card>
            </div>
        ))}
    </div>
  )
}
