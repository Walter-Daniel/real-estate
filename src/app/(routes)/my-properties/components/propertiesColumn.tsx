import Image from "next/image";
import Link from "next/link";
import { formatPriceARS } from "@/helpers/formatPriceArg";
import { ColumnDef } from "@tanstack/react-table";

import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui";
import { House } from "@prisma/client";

export interface HouseProperties {
  HouseImage: {
      url: string;
  }[];
  id: string;
  title: string;
  description: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  Address: {
      locality: string;
  } | null;
}

export const columns: ColumnDef<HouseProperties>[] = [
  {
    accessorKey: 'houseImage',
    id: "HouseImage",
    header: "Imagen",
    cell: ({ row }) => {
      const photoUrl = row.original.HouseImage[0].url
      return photoUrl ? (
        <Image src={photoUrl} alt="House" width={200} height={200} className="w-36 h-20 object-cover bg-center" />
      ) : (
        <div>Sin foto</div>
      );
    },
  },
  {
    accessorKey: "title",
    id: "title",
    header: () => <div className="text-center">Título</div>,
    cell: ({ row }) => <div>{row.original.title || "N/A"}</div>,
  },
  {
    accessorKey: "description",
    id: "description",
    header: () => <div className="text-center">Descripción</div>,
    cell: ({ row }) => (
      <div className=" font-medium line-clamp-2 overflow-hidden max-w-xs">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "bedrooms",
    id: "bedrooms",
    header: () => <div className="text-right">Habitaciones</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.original.bedrooms || "N/A"}</div>
    ),
  },
  {
    accessorKey: "bathrooms",
    id: "bathrooms",
    header: () => <div className="text-right">Baños</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.original.bathrooms || "N/A"}</div>
    ),
  },
  {
    accessorKey: "guests",
    id: "guest",
    header: () => <div className="text-right">Visitantes</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.original.guests || "N/A"}</div>
    ),
  },
  {
    accessorKey: "price",
    id: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">{formatPriceARS(row.original.price)}</div>
    ),
  },
  {
    accessorKey: "locality",
    id: "House.Address.locality",
    header: () => <div className="text-right">Localidad</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.original.Address?.locality}</div>
    ),
  },
  {
    accessorFn: (row) => row.id,
    id: "House.id",
    header: () => <div className="text-center">Acciones</div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <Button size="sm" asChild variant={"outline"}>
          <Link href={`/houses/${row.original.id}`}>Ver propiedad</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/houses/${row.original.id}`}>
            <Pencil className="w-4 h-4" />
          </Link>
        </Button>
        <Button size="sm" variant={"destructive"} asChild>
          <Link href={`/houses/${row.original.id}`}>
            <Trash className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    ),
  },
];
