"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import Link from "next/link"
import { formatPriceARS } from "@/helpers/formatPriceArg"

interface Favorite {
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

const columns: ColumnDef<Favorite>[] = [
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

export const FavoriteTable = ({ favorites }: { favorites: Favorite[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: favorites,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por localidad o comuna..."
          value={(table.getColumn("House.Address.locality")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("House.Address.locality")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}