
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { loginSchema } from "./schemas/auth.schema"
import { getUserByEmail } from "./data/user";

 


export default { 
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        Credentials({
            async authorize(credentials){
                const validatedFields = loginSchema.safeParse(credentials);
                if(validatedFields.success){
                    const { email, password } = validatedFields.data;

                    const user  = await getUserByEmail(email);
                    if(!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    
                    if(passwordsMatch) return user;
                }
                return null;
            }
        })
    ] 
} satisfies NextAuthConfig