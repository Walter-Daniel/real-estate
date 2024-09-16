"use client"

import React from 'react'
import { Button } from '../ui'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const Social = () => {

    const onClick = (provider: "facebook" | "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

  return (
    <div className='flex items-center w-full gap-x-2'>
        <Button
         size='lg'
         className='w-full'
         variant='outline'
        //  onClick={() => {}}
        >
            <Image 
                src='/google.png'
                alt='google'
                width={20}
                height={20}
                className='h-auto'
            />
        </Button>
        <Button
         size='lg'
         className='w-full'
         variant='outline'
         onClick={() => onClick("facebook")}
        >
            <Image 
                src='/facebook.png'
                alt='google'
                width={20}
                height={20}
                className='h-auto'
            />
        </Button>
    </div>
  )
}
