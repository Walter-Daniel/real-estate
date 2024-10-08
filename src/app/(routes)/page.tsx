
import { MapFilterItems } from './_components';
import { ListingCard } from './_components/listingCard';
import { getHouses } from '@/actions/property/get-houses';

export default async function Home() {
  const data = await getHouses();
  return (
    <div className='container mx-auto px-5 lg:px-10'>
      <MapFilterItems />
      <section className='flex flex-wrap gap-4 mt-10'>
        {
          data?.map((property) => (
            <ListingCard 
              key={property.id}
              photo={property.photo }
              price={property.price}
              title={property.title}
              locality={property.locality}
              street={property.street}
              houseId={property.id}
            />
          ))
        }
      </section>
    </div>
  )
}
