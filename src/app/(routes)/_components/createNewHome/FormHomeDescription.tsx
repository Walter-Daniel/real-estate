"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { DescriptionSchema, DescriptionSchemaType } from "@/schemas/new-home-schema"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui"
import { BottomBar } from "./BottomBar"
import { createDescription } from "@/actions"

export const FormHomeDescription = ({homeId}:{homeId: string}) => {
  const form = useForm<DescriptionSchemaType>({
    resolver: zodResolver(DescriptionSchema),
    defaultValues: {
      id: homeId,
      title: "",
      description: "",
      guests: 0,
      bedrooms: 0,
      bathrooms: 0,
      price: 0
    }
  })

  const onSubmit = async(values: DescriptionSchemaType) => {
     await createDescription(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-2/5 mx-auto  mb-36">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Card className=" mt-10">
            <CardContent className="w-full space-y-2">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mt-5">
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
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value) || 0)} />
                    </FormControl>
                    <FormDescription>
                      Precio por noche en pesos.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
             {/* GUEST */}
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Visitantes</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormDescription>
                      Cantidad de personas permitidas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Habitaciones</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormDescription>
                      Cantidad de habitaciones de la propiedad.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Baños</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormDescription>
                      Cantidad de baños de la propiedad.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {/* Image */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Foto</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Sube una foto de tu propiedad (máx. 5MB, formatos: jpg, png, webp).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <BottomBar isValid={form.formState.isValid} isSubmitting={form.formState.isSubmitting}/>
      </form>
    </Form>
  )
}
