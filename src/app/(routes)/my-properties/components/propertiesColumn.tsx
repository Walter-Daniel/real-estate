

import Image from "next/image"
import Link from "next/link"
import { formatPriceARS } from "@/helpers/formatPriceArg"
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui";
import { House } from "@prisma/client";


export const columns: ColumnDef<House>[] = [
    // {
    //   accessorKey: 'photo',
    //   id: "photo",
    //   header: "Imagen",
    //   cell: ({ row }) => {
    //     const photoUrl = row.original.photo[0];
    //     return photoUrl ? (
    //       <Image src={photoUrl} alt="House" width={200} height={200} className="w-36 h-20 object-cover bg-center" />
    //     ) : (
    //       <div>Sin foto</div>
    //     );
    //   },
    // },
    {
      accessorKey: 'title',
      id: "title",
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
      cell: ({ row }) => <div>{row.original.title || "N/A"}</div>,
    },
    {
      accessorKey:'description',
      id: "description",
      header: () => <div className="text-right">Descripción</div>,
      cell: ({ row }) => <div className="text-right font-medium">{row.original.description}</div>,
    },
    {
      accessorKey: 'bedrooms',
      id: "House.Address.locality",
      header: () => <div className="text-right">Habitaciones</div>,
      cell: ({ row }) => <div className="text-right">{row.original.bedrooms || "N/A"}</div>,
    },
    {
      accessorKey: 'bathrooms',
      id: "House.Address.locality",
      header: () => <div className="text-right">Baños</div>,
      cell: ({ row }) => <div className="text-right">{row.original.bathrooms || "N/A"}</div>,
    },
    {
      accessorKey: 'guests',
      id: "House.Address.locality",
      header: () => <div className="text-right">Visitantes</div>,
      cell: ({ row }) => <div className="text-right">{row.original.guests || "N/A"}</div>,
    },
    {
      accessorKey: 'price',
      id: "House.Address.locality",
      header: () => <div className="text-right">Precio</div>,
      cell: ({ row }) => <div className="text-right">{formatPriceARS(row.original.price)}</div>,
    },
    {
      accessorFn: (row) => row.id,
      id: "House.id",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => <div className="flex justify-center gap-2">
        <Button size='sm' asChild variant={"outline"}><Link href={`/house/${row.original.id}`}>Ver propiedad</Link></Button>
        <Button size='sm' asChild>
            <Link href={`/house/${row.original.id}`}>
                <Pencil className="w-4 h-4"/>
            </Link>
        </Button>
        <Button size='sm' variant={"destructive"} asChild>
            <Link href={`/house/${row.original.id}`}>
                <Trash className="w-4 h-4"/>
            </Link>
        </Button>
      </div>
    }
  ]