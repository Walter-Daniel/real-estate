'use client';

import { useFormStatus } from 'react-dom'
import { usePathname } from 'next/navigation';
import { useCategoryStore } from '@/store';
import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';

interface CreationSubmitProps {
    isValid?: boolean;
    isSubmitting?: boolean
}

export const CreationSubmit = ({ isValid, isSubmitting }: CreationSubmitProps) => {
    const { pending } = useFormStatus();
    const isStructure = usePathname().includes('structure');
    const isDisabled = !isValid;          // Disabled if not in structure path and not valid
    return (
        <>
            {/* {
                pending || isSubmitting
                    ? <Button disabled>
                        <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                        Guardando
                    </Button>
                    : <Button
                        type='submit'
                        // disabled={isDisabled}
                    >
                        Siguiente
                    </Button>
            } */}
            <Button
                        type='submit'
                        // disabled={isDisabled}
                    ></Button>
        </>
    )
}
