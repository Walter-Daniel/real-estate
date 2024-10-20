"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DescriptionSchema,
  DescriptionSchemaType,
} from "@/schemas/new-home-schema";
import { Textarea } from "@/components/ui/textarea";
import { Button, Card, CardContent } from "@/components/ui";
import { createDescription } from "@/actions";
import { categoryItems } from "@/lib/categoryItemis";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { toast } from "@/hooks/use-toast";
import { ButtonSubmit } from "./ButtonSubmit";

export const CreateHomeForm = () => {
  const user = useCurrentUser();
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  const form = useForm<DescriptionSchemaType>({
    resolver: zodResolver(DescriptionSchema),
    defaultValues: {
      userId: user?.id || "",
      title: "",
      description: "",
      categoryName: "",
      guests: 0,
      bedrooms: 0,
      bathrooms: 0,
      price: "",
      images: undefined,
    },
  });

  const onSubmit = async (values: DescriptionSchemaType) => {
    const { images } = values;
    const formData = new FormData();
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
        formData.append("images", images[i] as File);
      }
    }

    const { ok, message, houseId } = await createDescription(formData);
    if (!ok) {
      toast({
        variant: "destructive",
        description: message,
      });
      return;
    }
    form.reset();
    router.push(`/houses/${houseId}/address`);
  };

  form.formState.isSubmitting
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryItems.map((categoryName) => (
                          <SelectItem
                            value={categoryName.name}
                            key={categoryName.id}
                          >
                            {categoryName.title}
                          </SelectItem>
                        ))}
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
                      <Input
                        type="text"
                        placeholder="Ej: 10.000,50"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Use puntos como separadores de miles y coma para
                      decimales.
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
                  <FormItem>
                    <FormLabel>Visitantes</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Ej: 4" {...field} />
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
                      <Input type="text" placeholder="Ej: 2" {...field} />
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
                      <Input type="text" {...field} placeholder="Ej: 2" />
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
                    <FormLabel>Fotos</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.webp, .avif"
                        onChange={(e) => {
                          const file = e.target.files;
                          onChange(file);
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Sube una foto de tu propiedad (máx. 5MB, formatos: jpg,
                      png, webp).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <ButtonSubmit onClick={onClick} isSubmitting={form.formState.isSubmitting}/>
      </form>
    </Form>
  );
};
