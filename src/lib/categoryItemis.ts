interface iAppProps {
  name: string;
  title: string;
  imageUrl: string;
  description: string;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "trending",
    description: "Esta es una propiedad que está en tendencia.",
    title: "Tendencia",
    imageUrl:
      "https://img.icons8.com/ios-filled/50/fire-element.png",
  },
  {
    id: 1,
    name: 'family-house',
    title: 'Casa Familiar',
    description: 'Casa espaciosa ideal para familias, ofreciendo comodidad y privacidad.',
    imageUrl:
      "https://img.icons8.com/external-outline-design-circle/66/external-Family-House-city-elements-outline-design-circle.png",
  },
  {
    id: 2,
    name: 'cabin',
    title: 'Cabaña',
    description: 'Acogedora cabaña en el corazón de la naturaleza, ideal para relajarse.',
    imageUrl:
      "https://img.icons8.com/external-outline-satawat-anukul/64/external-travel-travel-outline-outline-satawat-anukul-15.png",
  },
  {
    id: 3,
    name: "eco-house",
    description: "Esta propiedad es considerada una casa ecológica.",
    title: "Casa Ecológica",
    imageUrl:
      "https://img.icons8.com/external-tulpahn-detailed-outline-tulpahn/64/external-eco-house-ecology-tulpahn-detailed-outline-tulpahn.png",
  },
  {
    id: 4,
    name: "amazing-view",
    description: "Esta propiedad tiene una vista impresionante.",
    title: "Vistas de ensueño",
    imageUrl:
      "https://img.icons8.com/external-others-pike-picture/50/external-business-office-and-workplace-others-pike-picture-8.png",
  },
  {
    id: 5,
    name: "design",
    description: "Esta propiedad se enfoca mucho en el diseño.",
    title: "Diseño",
    imageUrl:
      "https://img.icons8.com/external-goofy-line-kerismaker/96/external-Modern-House-real-estate-goofy-line-kerismaker.png",
  },
  {
    id: 6,
    name: "pool",
    description: "Esta propiedad tiene una piscina increíble.",
    title: "Piscina",
    imageUrl:
      "https://img.icons8.com/ios/50/swimming-pool.png",
  },
  {
    id: 7,
    name: 'mountain-refuge',
    title: 'Refugio en la Montaña',
    imageUrl: 'https://img.icons8.com/ios/50/000000/mountain.png',
    description: 'Refugio rústico ubicado en las montañas, perfecto para aventureros.',
  },
  {
    id: 8,
    name: 'hostel',
    title: 'Hostel',
    imageUrl: 'https://img.icons8.com/ios/50/000000/hostel.png',
    description: 'Alojamiento compartido asequible, perfecto para mochileros.',
  },
  {
    id: 9,
    name: 'glamping',
    title: 'Glamping',
    imageUrl: 'https://img.icons8.com/external-photo3ideastudio-lineal-photo3ideastudio/64/external-tent-military-photo3ideastudio-lineal-photo3ideastudio.png',
    description: 'Experiencia de camping de lujo con todas las comodidades del hogar en la naturaleza.',
  },
];