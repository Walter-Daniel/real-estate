'use server';

import { getUserByEmail } from "@/data/user";
import { maskEmail } from "@/helpers/maskEmail";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { resetFormSchema } from "@/schemas/auth.schema";
import { z } from "zod";

export const resetFormAction = async(values: z.infer<typeof resetFormSchema>) => {
   const validatedFields = resetFormSchema.safeParse(values);
   if(!validatedFields.success){
    return {
        ok: false,
        message: "Error validando credenciales"
    };
   }

   const { email } = validatedFields.data;
   const existingUser = await getUserByEmail(email);
   if(!existingUser){
    return {
        ok: false,
        message: "El email ingresado no existe"
    }
   }

   const passwordResetToken = await generatePasswordResetToken(email);
   await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
   )

   const emailToSend = maskEmail(email)
   return {
    ok: true,
    message: `Hemos enviado un correo electrónico a ${emailToSend} con un enlace para que reestablescas tu contraseña.`
   }
}