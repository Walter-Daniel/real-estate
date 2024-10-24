import { User, Bed, Bath } from "lucide-react";
import React from "react";

interface DetailProps {
  guest: number;
  bedrooms: number;
  bathrooms: number;
}

export const DetailItems = ({ bathrooms, bedrooms, guest }: DetailProps) => {
  return (
    <section className="w-full py-4 flex gap-4 flex-wrap">
      <div className="flex items-center border rounded-md px-4 py-2 bg-black text-white text-sm font-semibold">
        <User className="w-5 h-5 mr-2"/>
        Personas: {guest}
      </div>
      <div className="flex items-center border rounded-md px-4 py-2 bg-black text-white text-sm font-semibold">
        <Bed className="w-5 h-5 mr-2"/>
        Habitaciones: {bedrooms}
      </div>
      <div className="flex items-center border rounded-md px-4 py-2 bg-black text-white text-sm font-semibold">
        <Bath className="w-5 h-5 mr-2"/>
        Baños: {bathrooms}
      </div>
    </section>
  );
};
