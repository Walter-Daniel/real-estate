import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
 
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    //si el usuario se registra con google o facebook, no tendra que verificar su correo.
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data:{emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async signIn({ user, account }){
      //Si el usuario intenta iniciar sesión con gmail o facebook.
      if(account?.provider !== "credentials") return true;
      
      //Previene el inicio de sesión si el email no está verificado.
      const existingUser = await getUserById(user.id!);
      if(!existingUser?.emailVerified) return false;

      //Todo: add 2FA check

      return true;
    },
    async session({token, session}){
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      return session;
    },
    async jwt({token}) {
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})