// 'use server';

// import { LatLngExpression } from "leaflet";

// const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY


// export const searchAddress = async (address: string): Promise<LatLngExpression> => {
//     console.log(encodeURIComponent(address))
//     const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPENCAGE_API_KEY}&language=es`

//     try {
//         const response = await fetch(url);

//         console.log(response)

//         if (!response.ok) {
//             throw new Error('Error al buscar la dirección')
//         }

//         const data = await response.json()

//         if (data.results.length > 0) {
//             const { lat, lng } = data.results[0].geometry;
//             console.log({lat, lng})
//             // return [-26.816667, -65.216667]
//             return [lat, lng]
//         } else {
//             throw new Error('No se encontraron resultados para la dirección especificada.')
//         }
//     } catch (error) {
//         console.error('Error al buscar la dirección:', error)
//         throw error
//     }
// }