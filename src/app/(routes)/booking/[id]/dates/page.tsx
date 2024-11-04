import { getHouseById } from '@/actions';
import { DatesForm } from './ui/DatesForm';
import { redirect } from 'next/navigation';

export default async function BookingPage({ params }: { params: { id: string } }) {
  const { ok, house } = await getHouseById(params.id)
  if (!ok || !house) {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-3xl font-bold mb-6">Reserva tu estancia</h1>
      < DatesForm  house={house} houseId={params.id} />
    </div>
  )
}