
import { getProperties } from '@/actions';
import { MapFilterItems } from './_components';
import { ListingCard } from './_components/listingCard';

export default async function Home() {
  const data = await getProperties();
  
  return (
    <div className='container mx-auto px-5 lg:px-10'>
      <MapFilterItems />
      <section className='flex flex-wrap gap-4 mt-10'>
        {
          data.map((property) => (
            <ListingCard 
              key={property.id}
              photo={property.photo || ''}
              price={property.price!.toString() || ''}
              title={property.title as string}
            />
          ))
        }
      </section>
    </div>
  )
}
