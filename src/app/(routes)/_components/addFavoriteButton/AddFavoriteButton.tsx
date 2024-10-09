'use client'

import { Button } from '@/components/ui';
import { Heart } from 'lucide-react';
import React from 'react'
import { useFormStatus } from 'react-dom'

export const AddFavoriteButton = () => {
    const { pending } = useFormStatus();
  return (
    <>
        {
            pending 
            ? (
                <div></div>
            ) : (
                <Button variant='outline' size='icon' className='bg-primary-foreground' type='submit'>
                    <Heart className='w-3 h-3'/>
                </Button>
            )
        }
    </>
  )
}
