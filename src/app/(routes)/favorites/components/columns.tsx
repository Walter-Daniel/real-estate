import Image from "next/image"
import Link from "next/link"
import { formatPriceARS } from "@/helpers/formatPriceArg"
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui";


export interface Favorite {
  User: {
    name: string | null;
  } | null;
  House: {
    User: {
      name: string | null;
    } | null;
    id: string;
    title: string | null;
    photo: string | null;
    price: number | null;
    Address: {
      street: string;
      locality: string;
    } | null;
  } | null;
}


export const columns: ColumnDef<Favorite>[] = [
    {
      accessorFn: (row) => row.House?.photo,
      id: "House.photo",
      header: "Imagen",
      cell: ({ row }) => {
        const photoUrl = row.original.House?.photo;
        return photoUrl ? (
          <Image src={photoUrl} alt="House" width={200} height={200} className="w-36 h-20 object-cover bg-center" />
        ) : (
          <div>Sin foto</div>
        );
      },
    },
    {
      accessorFn: (row) => row.House?.title,
      id: "House.title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Título
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.original.House?.title || "N/A"}</div>,
    },
    {
      accessorFn: (row) => row.House?.price,
      id: "House.price",
      header: () => <div className="text-right">Precio por noche</div>,
      cell: ({ row }) => <div className="text-right font-medium">{formatPriceARS(row.original.House?.price)}</div>,
    },
    {
      accessorFn: (row) => row.House?.Address?.locality,
      id: "House.Address.locality",
      header: () => <div className="text-right">Localidad o comuna</div>,
      cell: ({ row }) => <div className="text-right">{row.original.House?.Address?.locality || "N/A"}</div>,
    },
    {
      accessorFn: (row) => row.House?.id,
      id: "House.id",
      header: () => <div className="text-center">Acción</div>,
      cell: ({ row }) => <div className="flex justify-center">
        <Button size='sm' asChild><Link href={`/house/${row.original.House?.id}`}>Ver propiedad</Link></Button>
      </div>
    }
  ]