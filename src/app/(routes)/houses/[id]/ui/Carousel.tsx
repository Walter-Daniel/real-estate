
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

interface HouseImage {
    url: string
}

interface Props {
  images: HouseImage[]
}

export function CarouselImages({ images }: Props) {
  return (
    <Carousel className=" mx-10">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.url}>
            <div className="p-1 w-full">
              <Image 
                src={image.url}
                alt="Imagenes de la casa"
                width={1200}
                height={800}
                className="h-[100vh] object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
