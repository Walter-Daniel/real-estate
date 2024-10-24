import { Suspense } from "react"
import { getHouseById } from "@/actions"
import { redirect } from "next/navigation"
import dynamic from "next/dynamic"
import { SkeletonLoader } from "./ui/SkeleteonLoader"

const CarouselImages = dynamic(() => import("./ui/Carousel").then(mod => mod.CarouselImages), { ssr: false })
const ButtonRent = dynamic(() => import("./ui/ButtonRent").then(mod => mod.ButtonRent))
const DetailItems = dynamic(() => import("./ui/DetailItems").then(mod => mod.DetailItems))
const LocationMap = dynamic(() => import("./ui/LocationMap"), { ssr: false })
const DescriptionHouse = dynamic(() => import("./ui/DescriptionHouse").then(mod => mod.DescriptionHouse))

interface HousePageProps {
  params: {
    id: string
  }
}

async function HouseDetails({ id }: { id: string }) {
  const { ok, house } = await getHouseById(id)
  if (!ok || !house) {
    redirect("/")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      <section className="sm:col-span-1 lg:col-span-7">
        <Suspense fallback={<div className="h-[50vh] md:h-[70vh] lg:h-[95vh] bg-gray-200 animate-pulse" />}>
          <CarouselImages images={house.HouseImage} />
        </Suspense>
      </section>
      <section className="sm:col-span-1 lg:col-span-5 px-2">
        <h2 className="text-2xl font-semibold tracking-tight transition-colors">
          {house?.title}
        </h2>
        <p className="text-xl">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(house.price)} x noche</p>
        <Suspense fallback={<div className="h-10 bg-gray-200 animate-pulse" />}>
          <DetailItems
            bathrooms={house.bathrooms}
            bedrooms={house.bedrooms}
            guest={house.guests}
          />
        </Suspense>
        <Suspense fallback={<div className="h-40 bg-gray-200 animate-pulse" />}>
          <DescriptionHouse description={house.description} />
        </Suspense>
        <Suspense fallback={<div className="h-[300px] bg-gray-200 animate-pulse" />}>
          <LocationMap  
            description={house.Address?.street!}
            latitude={house.Address?.latitude!}
            longitude={house.Address?.longitude!}
          />
        </Suspense>
        <Suspense fallback={<div className="h-10 bg-gray-200 animate-pulse" />}>
          <ButtonRent houseId={id} />
        </Suspense>
      </section>
    </div>
  )
}

export default function HousePage({ params }: HousePageProps) {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <HouseDetails id={params.id} />
    </Suspense>
  )
}