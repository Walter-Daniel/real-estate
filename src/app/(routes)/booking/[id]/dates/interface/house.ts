export interface House {
  title: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  HouseImage: HouseImage[];
  description: string;
  price: number;
  categoryName: string;
  Address: Address | null;
}

interface HouseImage {
  url: string;
}

interface Address {
  street: string;
  locality: string;
  latitude: number;
  longitude: number;
}
