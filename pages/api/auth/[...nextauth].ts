import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizeUser } from "@/lib/auth/byCredentials";
import { getUserByEmail, registerGoogleUser } from "@/actions/user";

console.log("GOOGLE ID:", process.env.GOOGLE_CLIENT_ID);

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
        console.log('CredentialsProvider authorize called with:', { email: credentials?.email });
        if (!credentials?.email || !credentials?.password) {
          console.log('CredentialsProvider: missing credentials');
          return null;
        }
        const result = await authorizeUser(credentials.email, credentials.password);
        console.log('CredentialsProvider authorize result:', result);
        return result;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, 
    updateAge: 24 * 60 * 60,   // обновлять токен раз в сутки
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback:', { token: { ...token, email: token.email }, user });
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      console.log('JWT callback returning token:', { ...token, email: token.email });
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token: { ...token, email: token.email } });
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      console.log('Session callback returning session:', session);
      return session;
    },
    async signIn({ user, account }) {
      console.log("SIGNIN CALLBACK", { user, account });
      if (!user.email) {
        console.log('SignIn: no user email');
        return false;
      }
      if (account?.provider === "google") {
        try {
          console.log('SignIn: processing Google user');
          const googleUser = await getUserByEmail(user.email);
          if (!googleUser) {
            console.log('SignIn: registering new Google user');
            await registerGoogleUser({ email: user.email, name: user.name as string });
          } else {
            console.log('SignIn: Google user already exists');
          }
        } catch (e) {
          console.error('Google SignIn error', e);
          return false; // прервать логин
        }
      }
      if (account?.provider === "credentials") {
        console.log('SignIn: processing credentials user');
        const userCredentials = await getUserByEmail(user.email);
        if (!userCredentials) {
          console.log('SignIn: credentials user not found');
          return false;
        }
        console.log('SignIn: credentials user found');
      }
      console.log('SignIn: returning true');
      return true;
    }
  },
  debug: process.env.NODE_ENV === 'development',
});


