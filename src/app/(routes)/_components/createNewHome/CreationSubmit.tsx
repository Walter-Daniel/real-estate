'use client';

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { useCategoryStore } from '@/store';

export const CreationSubmit = () => {
    const { pending } = useFormStatus();
    const selectedCategory = useCategoryStore((state) => state.selectedCategory);
    return (
        <>
            {
                pending
                    ? <Button disabled>
                        <Loader2 className='h-4 w-4 mr-2 animate-spin'/>
                        Guardando
                      </Button>
                    : <Button type='submit' disabled={!selectedCategory} >Siguiente</Button>
            }
        </>
    )
}
