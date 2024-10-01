'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { CreationSubmit } from './CreationSubmit'

interface BottomBarProps {
    isValid?: boolean;
    isSubmitting?: boolean
}

export const BottomBar = ({isValid , isSubmitting}: BottomBarProps) => {
    return (
        <div className='fixed w-full bottom-0 z-10 bg-white border-t h-24'>
            <div className='flex items-center justify-between mx-auto px-5 lg:px-10 h-full'>
                <Button variant="secondary" asChild>
                    <Link href="/">Cancelar</Link>
                </Button>
                <CreationSubmit isValid={isValid} isSubmitting={isSubmitting}/>
            </div>
        </div>
    )
}
