import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizeUser } from "@/lib/auth/byCredentials";
import { getUserByEmail, registerGoogleUser } from "@/actions/user";

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        return await authorizeUser(credentials.email, credentials.password);
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = user.email;
        token.name = user.name;
        token.profileFilled = (user as any).profileFilled ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.profileFilled = token.profileFilled as boolean;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const googleUser = await getUserByEmail(user.email);
        if (!googleUser) {
          await registerGoogleUser({ email: user.email, name: user.name as string });
        }
      }
      if (account?.provider === "credentials") {
        const userCredentials = await getUserByEmail(user.email);
        if (!userCredentials) {
            return false;
        }
      }
      return true;
    }
  },
});
