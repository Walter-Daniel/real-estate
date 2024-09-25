'use client'

import React from 'react'
import Link from 'next/link'

import { createCategoryPage } from '@/actions'

import { SelectCategory } from './SelectCategory'
import { CreationSubmit } from './CreationSubmit'
import { Button } from '@/components/ui'

export const FormCategory= ({homeId}: {homeId: string}) => {

  return (
    <form action={createCategoryPage}>
        <input type="hidden" name='homeId' value={homeId} />
        <SelectCategory />
        <div className='fixed w-full bottom-0 z-10 bg-white border-t h-24'>
            <div className='flex items-center justify-between mx-auto px-5 lg:px-10 h-full'>
                <Button variant="secondary" asChild>
                    <Link href="/">Cancelar</Link>
                </Button>
                <CreationSubmit />
            </div>
        </div>
    </form>
  )
}
