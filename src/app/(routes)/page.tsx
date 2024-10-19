import { MapFilterItems } from './_components';
import { ListingCard } from './_components/listingCard';
import { getHouses } from '@/actions/property/get-houses';
import { SkeletonCard } from './_components/skeletonCard';
import { auth } from '@/auth';

export default function Home(
  {
    searchParams
  }: {
    searchParams?: {
      filter?: string;
    }
  }
) {
  return (
    <div className='container mx-auto px-5 lg:px-10'>
      <MapFilterItems />
      {/* <Suspense fallback={<SkeletonLoading />} key={searchParams?.filter}>
        <ShowItems searchParams={searchParams} />
      </Suspense> */}
    </div>
  )
}

async function ShowItems({
  searchParams
}: {
  searchParams?: {
    filter?: string;
  }
}) {
  const session = await auth();
  const userId = session?.user?.id;
  const data = await getHouses({ searchParams: searchParams, userId });
  return (
    <section className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
    </section>
  )
}