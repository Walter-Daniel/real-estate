'use client';

import { Button } from '@/components/ui';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export const Counter = () => {
    const [amount, setAmount] = useState(0)
    const negative = amount < 1;
  return (
    <div className='flex items-center gap-x-2'>
        <Button 
            onClick={() => setAmount(amount - 1)}
            disabled={negative}
            type='button'
            variant="outline" size="icon">
            <Minus className='w-4 h-4 text-primary'/>
        </Button>
        <span className='w-10 h-8 flex justify-center rounded-sm items-center bg-slate-100'>{amount}</span>
        <Button 
        type='button'
            onClick={() => setAmount(amount + 1)}
            variant="outline" size="icon">
            <Plus className='w-4 h-4 text-primary'/>
        </Button>
    </div>
  )
}
