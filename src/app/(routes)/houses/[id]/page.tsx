import { getHouseById } from "@/actions";
import { redirect } from "next/navigation";
import { CarouselImages } from "./ui/Carousel";
import { formatPriceARS } from "@/helpers/formatPriceArg";
import { ButtonRent } from "./ui/ButtonRent";
import { DetailItems } from "./ui/DetailItems";
import LocationMap from "./ui/LocationMap";

interface HousePageProps {
  params: {
    id: string;
  };
}
export default async function HousePage({ params }: HousePageProps) {
  const { ok, house } = await getHouseById(params.id);
  if (!ok || !house) {
    redirect("/");
  }
  console.log({ house });
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 w-full">
        <section className="col-span-7">
          <CarouselImages images={house.HouseImage} />
        </section>
        <section className="col-span-5 px-2">
          <h2 className="text-2xl font-semibold tracking-tight transition-colors">
            {house?.title}
          </h2>
          <p className="text-xl">{formatPriceARS(house.price)} x noche</p>
          <DetailItems
            bathrooms={house.bathrooms}
            bedrooms={house.bedrooms}
            guest={house.guests}
          />
          <p>
            <span className="font-semibold ">Descripción: </span>
            {house.description}
          </p>
          <LocationMap  
            description={house.Address?.street!}
            latitude={house.Address?.latitude!}
            longitude={house.Address?.longitude!}
          />
          <ButtonRent houseId={params.id} />
        </section>
      </div>
    </div>
  );
}
