"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { addToast } from "@heroui/react";

/**
 * Aviso y cierre de sesión al expirar.
 *
 * El límite REAL lo impone NextAuth en el servidor (session.maxAge, ver
 * src/store/authOptions.ts). Este componente solo se encarga de la parte
 * visible: avisar antes de que caduque y sacar al usuario de la pantalla en
 * vez de dejarlo con una interfaz que ya no responde.
 *
 * Cambios respecto a la versión anterior:
 *  - El botón "Posponer" solo hacía console.log: prometía renovar la sesión y
 *    no renovaba nada. Se eliminó en vez de dejar un control que engaña.
 *  - Había un setInterval imprimiendo el tiempo restante en consola CADA
 *    SEGUNDO durante toda la sesión. Eliminado.
 *  - El temporizador arrancaba en cada cambio del objeto `session`, no en el
 *    inicio real de la sesión. Ahora se ancla a session.expires, que es la
 *    caducidad que dicta el servidor.
 */

const AVISO_PREVIO_MS = 5 * 60 * 1000; // avisar 5 minutos antes

export function InactivityWatcher() {
  const { data: session } = useSession();
  const yaCerroRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // session.expires es un ISO string; se usa como dependencia primitiva para
  // no reprogramar los timers en cada re-render.
  const expiraEn = session?.expires;

  useEffect(() => {
    if (!expiraEn) return;

    const msRestantes = new Date(expiraEn).getTime() - Date.now();
    if (msRestantes <= 0) {
      signOut();
      return;
    }

    const cerrarSesion = () => {
      if (yaCerroRef.current) return;
      yaCerroRef.current = true;
      signOut({ callbackUrl: "/" });
    };

    const avisar = () =>
      addToast({
        title: "Tu sesión está por vencer",
        description: "Vuelve a iniciar sesión para seguir trabajando.",
        color: "warning",
        timeout: Math.min(AVISO_PREVIO_MS, msRestantes),
        shouldShowTimeoutProgress: true,
      });

    timers.current.push(setTimeout(cerrarSesion, msRestantes));

    if (msRestantes > AVISO_PREVIO_MS) {
      timers.current.push(setTimeout(avisar, msRestantes - AVISO_PREVIO_MS));
    }

    const pendientes = timers.current;
    return () => {
      pendientes.forEach(clearTimeout);
      timers.current = [];
    };
  }, [expiraEn]);

  return null;
}
