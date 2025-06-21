import prisma from "@/prisma/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],

    session : {
        strategy : "jwt"
    },

    callbacks: {
        async signIn({user}){
            if(!user.email){
                console.error("user signin attempt without email" , user)
                return false;
            }

            // allow singin here 
            return true;
        },
        async jwt({token , user}){
            if(user){
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image || "";
            }

            return token;
        },

        async session({token , session}){
            if(session.user){
                session.user.id = token.id as string;
                session.user.email = token.email;
                session.user.image = token.image;
                session.user.name = token.name;

            }
            return session;
        }
    }

}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      image : string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    image: string;
  } 
}

