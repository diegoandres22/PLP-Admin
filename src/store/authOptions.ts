// src/provider/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedEmails = ["diego.a.v3005@gmail.com", "diegoandresv22@gmail.com"];
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }
      return false;
    },
    async redirect() {
      return "/Inicio";
    },
  },
};
