import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizeUser } from "@/lib/auth/byCredentials";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Email and Password',
            credentials: { 
                email: { label: 'Email', type: 'email'},
                password: { label: 'Password', type: 'password' },
            },
        
        async authorize(credentials) {
            if (!credentials?.email) return null;
            return authorizeUser(credentials?.email, credentials?.password);
        }
    }
    )
    ],
    callbacks: {
        async session({session, token}) {
            if (session.user)
                session.user.email = token.email;
            return session;
        },
    },
})

