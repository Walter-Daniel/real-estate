"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DescriptionSchema } from "@/schemas/new-home-schema"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader } from "@/components/ui"
import { Counter } from "./Counter"

export const FormHomeDescription = () => {
  const form = useForm<z.infer<typeof DescriptionSchema>>({
    resolver: zodResolver(DescriptionSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      guests: 0,
      bedrooms: "",
      bathrooms: "",
      photo: "",
      price: 0,
      categoryName: "",
      country: "",
      location: ""
    }
  })

  function onSubmit(values: z.infer<typeof DescriptionSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" placeholder="Pequeña y simple" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Pequeña y simple" {...field} />
              </FormControl>
              <FormDescription>
                Añade un título descriptivo a tu propiedad.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuentanos un poco sobre tu propiedad"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Precio por noche en pesos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Image */}
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Card>
          <CardHeader className="flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="underline font-medium">Personas</h3>
                <p className="text-muted-foreground text-sm">Cantidad permitida de personas.</p>
              </div>
              <Counter />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="underline font-medium">Habitaciones</h3>
                <p className="text-muted-foreground text-sm">Cantidad de habitaciones</p>
              </div>
              <Counter />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="underline font-medium">Baños</h3>
                <p className="text-muted-foreground text-sm">Cantidad de baños.</p>
              </div>
              <Counter />
            </div>
          </CardHeader>
        </Card>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
