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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DescriptionSchema, DescriptionSchemaType } from "@/schemas/new-home-schema"
import { Textarea } from "@/components/ui/textarea"
import { Button, Card, CardContent } from "@/components/ui"
import { createDescription } from "@/actions"
import { categoryItems } from "@/lib/categoryItemis"
import { redirect, useRouter } from "next/navigation"
import { useCurrentUser } from "@/hooks/useCurrentUser"

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  categoryName: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  price:number;
  images?: FileList;
}


export const CreateHomeForm = () => {
  const user = useCurrentUser();
  const router = useRouter();
 
  const form = useForm<FormInputs>({
    resolver: zodResolver(DescriptionSchema.omit({ userId: true })),
    defaultValues: {
      title: "",
      description: "",
      categoryName: "",
      guests: 0,
      bedrooms: 0,
      bathrooms: 0,
      price: 0,
      images: undefined
    }
  })

  const onSubmit = async(values: FormInputs) => {
    console.log({values})
    const formData = new FormData();
    const { images } = values;
    formData.append("userId", user!.id!);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("categoryName", values.categoryName);
    formData.append("price", values.price.toString());
    formData.append("guests", values.guests.toString());
    formData.append("bedrooms", values.bedrooms.toString());
    formData.append("bathrooms", values.bathrooms.toString());

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }
    const resp = await createDescription(formData);
    if(resp.ok){
      form.reset();
      router.push(`/houses/${resp.houseId}/address`)
      // redirect(`houses/${resp.houseId}/address`);
    }
  }

  const onClick = () => {
    router.push('/')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          {/* <input defaultValue={homeId} name="homeId" hidden/> */}
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
              {/* Category */}
              
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        categoryItems.map(categoryName => (
                          <SelectItem value={categoryName.name} key={categoryName.id}>{categoryName.title}</SelectItem>
                        ))
                      }
                      
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Elige la categoría que mejor describe tu propiedad.
                  </FormDescription>
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
                name="images"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Foto</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => {
                          const file = e.target.files;
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
        {/* <BottomBar isValid={form.formState.isValid} isSubmitting={form.formState.isSubmitting}/> */}
        <div className="flex justify-between">
        <Button variant='secondary' type="button" onClick={onClick}>Salir</Button>
        <Button type="submit" disabled={!form.formState.isValid}>Siguiente</Button>
        </div>
      </form>
    </Form>
  )
}
