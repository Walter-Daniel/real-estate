'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DateRange } from 'react-day-picker';
import { addDays, differenceInDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { House } from '../interface/house';
import { formatPriceARS } from '@/helpers/formatPriceArg';
import { DescriptionHouse } from './DescriptionHouse';

interface BookingFormProps {
  house: House;
}

export const BookingForm = ({ house }: BookingFormProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [totalPrice, setTotalPrice] = useState(house.price);
  const [guestCount, setGuestCount] = useState(1);

  useEffect(() => {
    calculateTotalPrice();
  }, [dateRange, guestCount]);

  const calculateTotalPrice = () => {
    if (dateRange?.from && dateRange?.to) {
      const nights = differenceInDays(dateRange.to, dateRange.from) + 1;
      setTotalPrice(house.price * nights * guestCount);
    } else {
      setTotalPrice(house.price * guestCount);
    }
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleGuestCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = parseInt(event.target.value, 10);
    setGuestCount(count > 0 ? count : 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar la reserva al backend
    console.log('Reserva enviada:', { ...dateRange, guestCount, totalPrice });
  };

  return (
    <div className='grid grid-cols-2'>
      <Card className='w-full max-w-md mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{house.title}</CardTitle>
          <p className='text-xl font-semibold'>${house.price} / noche</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='date-range'>Fechas</Label>
              <Calendar
                id='date-range'
                mode='range'
                defaultMonth={new Date()}
                selected={dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={1}
                locale={es}
                className='rounded-md border w-full'
                disabled={{ before: new Date() }}
              />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <Label htmlFor='guests'>Huéspedes</Label>
                <Input
                  id='guests'
                  type='number'
                  value={guestCount}
                  onChange={handleGuestCountChange}
                  min={1}
                  max={house.guests}
                />
              </div>
              <div>
                <Label htmlFor='bedrooms'>Habitaciones</Label>
                <Input id='bedrooms' value={house.bedrooms} disabled />
              </div>
              <div>
                <Label htmlFor='bathrooms'>Baños</Label>
                <Input id='bathrooms' value={house.bathrooms} disabled />
              </div>
            </div>
            <div className='flex justify-between items-center font-semibold'>
              <span>Total</span>
              <span>{formatPriceARS(totalPrice)}</span>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type='submit' className='w-full'>
            Reservar
          </Button>
        </CardFooter>
      </Card>
      <DescriptionHouse house={house} />
    </div>
  );
};
