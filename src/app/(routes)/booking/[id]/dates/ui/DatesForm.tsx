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
import {
  addDays,
  differenceInDays,
  eachDayOfInterval,
  format,
  isWithinInterval,
  parseISO,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { House } from '../interface/house';
import { formatPriceARS } from '@/helpers/formatPriceArg';
import { useToast } from '@/hooks/use-toast';
import { getUnavailableDates } from '@/actions/booking/get-unavailables-dates';
import { createBooking } from '@/actions/booking/create-booking';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Locate, LocateFixed, LocateFixedIcon, LocateIcon, LocateOffIcon, LucideLocate } from 'lucide-react';

interface BookingFormProps {
  houseId: string;
  house: House;
}
interface Booking {
  startDate: string;
  endDate: string;
}

export const DatesForm = ({ house, houseId }: BookingFormProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [totalPrice, setTotalPrice] = useState(house.price);
  const [unavailableDates, setUnavailableDates] = useState<Booking[]>([]);
  const [totalNights, setTotalNights] = useState(0);


  const user = useCurrentUser();

  const { toast } = useToast();

  useEffect(() => {
    async function fetchUnavailableDates() {
      try {
        const dates = await getUnavailableDates(houseId);
        setUnavailableDates(dates);
      } catch (error) {
        console.error('Error al obtener fechas no disponibles:', error);
      }
    }
    fetchUnavailableDates();
  }, [houseId]);

  useEffect(() => {
    calculateTotalPrice();
  }, [dateRange, house.price, unavailableDates]);

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some((booking) =>
      isWithinInterval(date, {
        start: parseISO(booking.startDate),
        end: parseISO(booking.endDate),
      })
    );
  };

  const countAvailableNights = (start: Date, end: Date) => {
    const allDates = eachDayOfInterval({ start, end });
    return allDates.filter((date) => !isDateUnavailable(date)).length - 1; // Subtract 1 because we don't count the checkout day
  };

  const calculateTotalPrice = () => {
    if (dateRange?.from && dateRange?.to) {
      const availableNights = countAvailableNights(
        dateRange.from,
        dateRange.to
      );
      setTotalNights(availableNights);
      if (availableNights > 0) {
        setTotalPrice(house.price * availableNights);
      } else {
        toast({
          title: 'Error',
          description: 'No hay noches disponibles en el rango seleccionado.',
          variant: 'destructive',
        });
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(house.price);
      setTotalNights(0);
    }
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: 'Error',
        description: 'Por favor, selecciona las fechas de entrada y salida.',
        variant: 'destructive',
      });
      return;
    }

    if (totalPrice === 0) {
      toast({
        title: 'Error de fechas',
        description: 'No se puede realizar una reserva sin noches disponibles.',
        variant: 'destructive',
      });
    }

    const startDate = dateRange.from;
    const endDate = dateRange.to;
    const userId = user!.id!;
    try {
      await createBooking({ houseId, startDate, endDate, totalPrice, userId });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          'Hubo un error al enviar la reserva. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    }
  };

  console.log({ unavailableDates });
  return (
    <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{house.title}</CardTitle>
          <p className='text-lg font-semibold flex items-center'>
            <LocateFixed className='mr-2'/> 
            <span>{house.Address?.locality}, {house.Address?.street}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-x-4'>
            <div className=''>
              <Label htmlFor='date-range' className='text-md'>
                Seleccionar fechas:
              </Label>
              <p className='text-sm'>
                Haz click en el calendario para seleccionar el rango de fechas
                para la reservación.
              </p>
              <Calendar
                id='date-range'
                mode='range'
                defaultMonth={new Date()}
                selected={dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
                locale={es}
                className='rounded-md border w-full flex justify-center min-h-[330px]'
                disabled={[
                  { before: new Date() },
                  (date) => isDateUnavailable(date),
                ]}
              />
            </div>
            <div className='space-y-2 rounded-md border mt-11 p-4'>
              <div className='flex justify-between'>
                <span>Huéspedes:</span>
                <span>{house.guests}</span>
              </div>
              <div className='flex justify-between'>
                <span>Habitaciones:</span>
                <span>{house.bedrooms}</span>
              </div>
              <div className='flex justify-between'>
                <span>Baños:</span>
                <span>{house.bathrooms}</span>
              </div>
              <div className='flex justify-between'>
                <span>Precio por noche:</span>
                <span>{formatPriceARS(house.price)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Total de noches seleccionadas:</span>
                <span>{totalNights}</span>
              </div>
              <div className='flex justify-between font-semibold'>
                <span>Precio total:</span>
                <span>{formatPriceARS(totalPrice)}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='secondary'>Regresar a descripción</Button>
          <Button onClick={handleSubmit}>
            Confirmar selección
          </Button>
        </CardFooter>
      </Card>
  );
};
