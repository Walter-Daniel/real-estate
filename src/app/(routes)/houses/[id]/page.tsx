import { getHouseById } from "@/actions";
import { redirect } from "next/navigation";
import { CarouselImages } from "./ui/Carousel";
import { formatPriceARS } from "@/helpers/formatPriceArg";

interface HousePageProps {
  params: {
    id: string;
  };
}
export default async function HousePage({ params }: HousePageProps) {
  const {ok, house} = await getHouseById(params.id);
  if(!ok || !house){
    redirect('/');
  }
  console.log({ house });
  return (
    <div>
    
      <div className="grid grid-cols-12 gap-4 w-full">
        <section className="col-span-7">
          <CarouselImages images={house.HouseImage}/>
          <p>habitaciones, visitantes, baños</p>
        </section>
        <section className="col-span-5 px-2">
        <h2 className="text-2xl font-semibold tracking-tight transition-colors">
        {house?.title}
      </h2>
          <p className="text-xl mb-2">{formatPriceARS(house.price)} x noche</p>
          <p>
            <span className="font-semibold ">Descripción: </span>
            {house.description}</p>
          <p>mapa</p>
          <p>Alquilar</p>
        </section>
      </div>
    </div>
  );
}
