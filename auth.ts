import Github from 'next-auth/providers/github';
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from './src/generated/prisma'

const prisma = new PrismaClient()
export const {handlers, auth} = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async jwt({token, user}) {
               if(user){
                token.id = user.id
                token.name = user.name
               }
               return token
        },
        async session({session, token}) {
             if(session.user && session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
             }

             return session
        }
    }
})