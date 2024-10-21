import Image from "next/image";
import Link from "next/link";
import { formatPriceARS } from "@/helpers/formatPriceArg";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui";

export interface Favorite {
  houseId: string | undefined;
  title: string | undefined;
  price: number | undefined;
  locality: string | undefined;
  street: string | undefined;
  owner: string | null | undefined;
  imageUrl: string | undefined;
}

export const columns: ColumnDef<Favorite>[] = [
  {
    accessorFn: (row) => row.imageUrl,
    id: "House.photo",
    header: "Imagen",
    cell: ({ row }) => {
      const photoUrl = row.original.imageUrl;
      return photoUrl ? (
        <Image
          src={photoUrl}
          alt="House"
          width={200}
          height={200}
          className="w-36 h-20 object-cover bg-center"
        />
      ) : (
        <div>Sin foto</div>
      );
    },
  },
  {
    accessorFn: (row) => row.title,
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
      );
    },
    cell: ({ row }) => <div>{row.original.title || "N/A"}</div>,
  },
  {
    accessorFn: (row) => row.price,
    id: "House.price",
    header: () => <div className="text-right">Precio por noche</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatPriceARS(row.original.price)}
      </div>
    ),
  },
  {
    accessorFn: (row) => row.locality,
    id: "House.Address.locality",
    header: () => <div className="text-right">Localidad o comuna</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.locality || "N/A"}
      </div>
    ),
  },
  {
    accessorFn: (row) => row.houseId,
    id: "House.id",
    header: () => <div className="text-center">Acción</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button size="sm" asChild>
          <Link href={`/house/${row.original.houseId}`}>Ver propiedad</Link>
        </Button>
      </div>
    ),
  },
];
