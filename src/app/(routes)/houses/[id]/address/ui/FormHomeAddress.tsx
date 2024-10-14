'use client'

import Map from './Map';
import { useEffect, useRef, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Library } from '@googlemaps/js-api-loader'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { BottomBar } from './BottomBar';
import { LocateFixedIcon } from 'lucide-react';
import { createLocation } from '@/actions';
import { useForm } from 'react-hook-form';
import { HouseAddressSchema, HouseAddressSchemaType } from '@/schemas/new-home-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { SelectLocality } from './SelectLocality';
import { Button } from '@/components/ui';


const libs: Library[] = ["core", "maps", "places", "marker"];

export const FormHomeAddress = ({ houseId }: { houseId: string }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  //toast
  const { toast } = useToast();

  //route
  const route = useRouter();
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libs
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const placeAutoCompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace();
        setSelectedPlace(place.name as string);
        const position = place.geometry?.location;
        if (position) {
          setMarker(position, place.name!);
          setValue('lat', position.lat(), { shouldValidate: true });
          setValue('lng', position.lng(), { shouldValidate: true });
          setValue('street', place.name as string , { shouldValidate: true });
        }
      })
    }
  }, [autoComplete]);

  function setMarker(location: google.maps.LatLng, name: string) {
    if (!map) return;
    map.setCenter(location);

    // Remove all existing markers
    markers.forEach(marker => {
      marker.map = null;
    });
    setMarkers([]);

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: name
    });

    // Add the new marker to the array
    setMarkers([marker]);
  }

  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: {
          lat: -26.8241,
          lng: -65.2226
        },
        zoom: 17,
        mapId: 'MY-MAP-12345'
      }

      const gmap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions);

      const tucumanBounds = new google.maps.LatLngBounds(
        { lat: -27.4765, lng: -66.2826 },
        { lat: -25.5177, lng: -64.4905 }
      );

      const gAutoComplete = new google.maps.places.Autocomplete(placeAutoCompleteRef.current as HTMLInputElement, {
        bounds: tucumanBounds,
        fields: ['formatted_address', 'geometry', 'name'],
        componentRestrictions: {
          country: ['ar']
        }
      });

      setAutoComplete(gAutoComplete);
      setMap(gmap);
    }
  }, [isLoaded]);


  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    setValue,
    register
  } = useForm<HouseAddressSchemaType>({
    resolver: zodResolver(HouseAddressSchema),
    defaultValues: {
      houseId: houseId,
      locality: '',
      lat: 0,
      lng: 0,
      street: '',
      zipCode: ''
    }
  })

  const onSubmit = async (values: HouseAddressSchemaType) => {
    const { ok, message } = await createLocation(values);
    if (!ok) {
      toast({
        variant: 'destructive',
        description: message
      });
    } else {
      toast({
        variant: 'success',
        description: message
      });
      route.push('/');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name='houseId' value={houseId} />
      <div>
        <div className='mb-5'>
          <SelectLocality setValue={setValue} />
          <Input ref={placeAutoCompleteRef} placeholder='Ingresa una dirección' />
          <Label className={`flex mt-4 ${selectedPlace && 'text-primary '}`}>
            <LocateFixedIcon className='w-4 h-4 mr-2' />
            {selectedPlace ? `Ubicación seleccionada: ${selectedPlace}` : 'Aquí aparecera la dirección seleccionada'}
          </Label>
        </div>
        <Map mapRef={mapRef} isLoaded={isLoaded} />
      </div>
      {/* <BottomBar isSubmitting={isSubmitting} isValid={isValid} /> */}
      <div className='flex justify-end w-full mt-4'>
      <Button type='submit'>Guardar</Button>
      </div>
    </form>
  )
}
