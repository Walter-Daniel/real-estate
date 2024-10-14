"use server";

import { db } from "@/lib/db";
import { DescriptionSchema } from "@/schemas/new-home-schema";
import { revalidatePath } from "next/cache";




export const createDescription = async (formData: FormData) => {
  const files = formData.getAll("images"); // Obtenemos todas las imágenes
  const data = {
    userId: formData.get("userId") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    categoryName: formData.get("categoryName") as string,
    guests: formData.get("guests") as string,
    bedrooms: formData.get("bedrooms") as string,
    bathrooms: formData.get("bathrooms") as string,
    price: formData.get("price") as string,
    images: files, // Pasamos los archivos al esquema
  };
  const descriptionParsed = DescriptionSchema.safeParse(data);

  if (!descriptionParsed.success) {
    console.log(descriptionParsed.error);
    return {
      ok: false,
      message: "Error de parseo",
    };
  }

  const { images, userId, ...rest } = descriptionParsed.data;

 try {
    const house =  await db.house.create({
        data: {
            ...rest,
            userId: userId
        }
      })
    
      const imagesToUpload = await uploadImages(images as File[]);
      if (!imagesToUpload) {
        throw new Error("Failed to load the images");
      }
    
      await db.houseImage.createMany({
        data: imagesToUpload.map((image) => ({
            url: image!,
            houseId: house.id
        }))
      })

      revalidatePath('/')
      revalidatePath('/my-properties')

      return {
        ok: true,
        message: 'Exitoso',
        houseId: house.id
      }
    
 } catch (error) {
    console.log(error)
    return {
        ok: false,
        message: 'No'
    }
 }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      const formData = new FormData();
      formData.append('file', image);

      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.url;
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
};
