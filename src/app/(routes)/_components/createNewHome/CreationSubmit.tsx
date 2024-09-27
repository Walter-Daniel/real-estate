'use client';

import { useFormStatus } from 'react-dom'
import { usePathname } from 'next/navigation';
import { useCategoryStore } from '@/store';
import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';



export const CreationSubmit = ({isValid}: {isValid?: boolean}) => {
    const { pending } = useFormStatus();
    const selectedCategory = !!useCategoryStore((state) => state.selectedCategory);
    const isStructure = usePathname().includes('structure');

    console.log({isStructure, selectedCategory, isValid, pending})

    return (
        <>
            {
                pending
                    ? <Button disabled>
                        <Loader2 className='h-4 w-4 mr-2 animate-spin'/>
                        Guardando
                      </Button>
                    : <Button 
                        type='submit' 
                        disabled={(isStructure) ? selectedCategory : !isValid}
                        >
                        Siguiente
                     </Button>
            }
        </>
    )
}
