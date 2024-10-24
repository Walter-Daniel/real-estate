'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader'

interface LocationMapProps {
  description: string
  latitude: number
  longitude: number
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '300px'
}

const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string
const libs: Library[] = ["core", "maps", "places", "marker"];

const LocationMap = ({ 
  description,
  latitude,
  longitude
}: LocationMapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libs,
    mapIds: [mapId],
  })

  const center: google.maps.LatLngLiteral = {
    lat: latitude,
    lng: longitude
  }

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [center])

  useEffect(() => {
    if (map && window.google && window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
      const { AdvancedMarkerElement } = window.google.maps.marker;
      
      const marker = new AdvancedMarkerElement({
        map,
        position: center,
        title: description,
      })

      const infoWindow = new google.maps.InfoWindow({
        content: `<div class="p-2"><strong>${description}</strong></div>`
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      return () => {
        marker.map = null
        infoWindow.close()
      }
    }
  }, [map, center, description])
  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Ubicación</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      {isLoaded ? (
        <div className="rounded-lg overflow-hidden shadow-lg">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
            }}
          />
        
        </div>
      ) : (
        <div className="bg-gray-200 h-96 flex items-center justify-center rounded-lg" role="alert" aria-busy="true">
          <p>Cargando mapa...</p>
        </div>
      )}
    </div>
  )
}

export default LocationMap