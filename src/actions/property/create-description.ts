'use server';

import { db } from '@/lib/db';
import { DescriptionSchema } from '@/schemas/new-home-schema';
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL ?? '' );

export const createDescription = async (formData:FormData) => {
   
    const data = Object.fromEntries(formData);
    const descriptionParsed = DescriptionSchema.safeParse(data);

    if(!descriptionParsed.success){
        return {
            ok: false,
            message: 'Error de parseo'
        }
    }

    const {id, photo, ...rest} = descriptionParsed.data;
    let imageUrl: string | null = null;
    if (photo) {
        imageUrl = await uploadImage(photo);
        if (!imageUrl) {
            return {
                ok: false,
                message: 'Error al subir imagen'
            };
        }
    }

    try {
        await db.house.update({
            where: {
                id: id
            },
            data: {
                ...rest,
                photo: imageUrl, // Include the image URL in the update
                addedDescription: true
            }
        });
    } catch (error) {
        console.error('Error al guardar la descripción:', error);
        return {
            ok: false,
            message: 'Error al guardar la descripción'
        };
    }

    return redirect(`/create/${id}/address`);
};

const uploadImage = async (image: File): Promise<string | null> => {
    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`);
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return null;
    }
};