'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { useState, useCallback } from "react"

interface HouseImage {
    url: string
}

interface Props {
  images: HouseImage[]
}

export function CarouselImages({ images }: Props) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    images.reduce((acc, img) => ({ ...acc, [img.url]: true }), {})
  )

  const handleImageLoad = useCallback((url: string) => {
    setLoadingStates(prev => ({ ...prev, [url]: false }))
  }, [])

  const handleImageError = useCallback((url: string) => {
    console.error(`Error loading image: ${url}`)
    setLoadingStates(prev => ({ ...prev, [url]: false }))
  }, [])

  return (
    <Carousel className="mx-12 lg:mx-10">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image.url}>
            <div className="p-1 w-full relative">
              {loadingStates[image.url] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <Image 
                src={image.url}
                alt={`Imagen de la casa ${index + 1}`}
                width={1200}
                height={800}
                className="h-[50vh] md:h-[70vh] lg:h-[95vh] object-cover"
                onLoad={() => handleImageLoad(image.url)}
                onError={() => handleImageError(image.url)}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
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