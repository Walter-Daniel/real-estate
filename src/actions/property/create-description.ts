"use server";

import { db } from "@/lib/db";
import { DescriptionSchema } from "@/schemas/new-home-schema";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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

const uploadImages = async(images: File[]) => {

  try {
    const uploadPromises = images.map(async(image) => {

      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
  
        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`).then( r => r.secure_url );
      } catch (error) {
        return null;
      }
    });
    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;

  } catch (error) {
    return null;
  }

}
