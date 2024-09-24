'use client'

import React from 'react'
import { SelectCategory } from './SelectCategory'
import { Button } from '@/components/ui'
import Link from 'next/link'

export const FormCategory= () => {
  return (
    <form action="">
        <SelectCategory />
        <div className='fixed w-full bottom-0 z-10 bg-white border-t h-24'>
            <div className='flex items-center justify-between mx-auto px-5 lg:px-10 h-full'>
                <Button variant="secondary" asChild>
                    <Link href="/">Cancelar</Link>
                </Button>
                <Button>Guardar</Button>
            </div>
        </div>
    </form>
  )
}
