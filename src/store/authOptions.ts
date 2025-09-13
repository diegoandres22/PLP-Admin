import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === "prueba" &&
          credentials?.password === "prueba1234$"
        ) {
          return {
            id: "manual-user",
            name: "Usuario de Prueba",
            email: "prueba@local.test",
            image: null,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];
        if (user.email && allowedEmails.includes(user.email)) {
          return true;
        }
        return false;
      }
      // Si es login con credenciales, dejar pasar
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    async redirect() {
      return "/Inicio";
    },
  },
};

// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user }) {
//       const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];
//       if (user.email && allowedEmails.includes(user.email)) {
//         return true;
//       }
//       return false;
//     },
//     async redirect() {
//       return "/Inicio";
//     },
//   },
// };
