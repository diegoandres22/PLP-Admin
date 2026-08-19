import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const enProduccion = process.env.NODE_ENV === "production";

/**
 * Duración de la sesión del panel: 30 minutos.
 *
 * InactivityWatcher cerraba la sesión a los 30 minutos en el CLIENTE, pero
 * NextAuth no declaraba `maxAge`, así que aplicaba su valor por defecto de
 * 30 DÍAS: el JWT seguía siendo válido un mes en el servidor. Bastaba con
 * conservar la cookie para saltarse el cierre de sesión "automático".
 * Ahora el límite es real y lo impone el servidor.
 */
const SESSION_MAX_AGE_SEGUNDOS = 30 * 60;

/** Normaliza la lista blanca: recorta espacios e ignora mayúsculas. */
function correosPermitidos(): string[] {
  return (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE_SEGUNDOS,
  },
  jwt: {
    maxAge: SESSION_MAX_AGE_SEGUNDOS,
  },

  // Flags explícitos en vez de confiar en los valores por defecto:
  //  - httpOnly: el JavaScript de la página no puede leer la cookie de sesión.
  //  - sameSite lax: no se envía en peticiones cross-site (mitiga CSRF).
  //  - secure en producción: solo viaja por HTTPS.
  //  - El prefijo __Secure- impide que un subdominio sin HTTPS la sobrescriba.
  useSecureCookies: enProduccion,
  cookies: {
    sessionToken: {
      name: enProduccion ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: enProduccion,
      },
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;

      const permitidos = correosPermitidos();
      if (permitidos.length === 0) {
        // Sin lista blanca configurada NO se abre la puerta a cualquiera.
        console.error("ALLOWED_EMAILS no está configurado: se rechaza el acceso.");
        return false;
      }

      const email = user.email?.toLowerCase();
      return Boolean(email && permitidos.includes(email));
    },
    async redirect() {
      return "/Inicio";
    },
  },
};
