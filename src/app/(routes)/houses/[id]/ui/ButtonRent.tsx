'use client';

import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

export const ButtonRent = ({houseId}: {houseId: string}) => {
    const router = useRouter();
    const onClick = () => {
        router.push(`/houses/${houseId}/rent`)
    }
  return (
    <Button type='button' className='w-full' onClick={onClick}>
        Alquilar
    </Button>
  )
}
