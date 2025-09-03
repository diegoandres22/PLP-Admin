"use client";

import { signOut } from "next-auth/react";
import { useEffect, useRef } from "react";
import { addToast } from "@heroui/toast";

// Configuración de producción en segundos y milisegundos
const INACTIVITY_LIMIT = 60 * 60;         // 60 minutos
const TOAST_TIME = 50 * 60;               // 50 minutos
const TOAST_DURATION = 10 * 60 * 1000;    // 10 minutos en ms


export function InactivityWatcher() {
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const resetTimer = () => {
      // Limpiar timers anteriores
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);

      // Toast de advertencia a los 50 minutos
      toastTimerRef.current = setTimeout(() => {
        addToast({
          title: "Atención",
          description: "Tu sesión se cerrará en 10 minutos por inactividad",
          color: "warning",
          timeout: TOAST_DURATION,
          shouldShowTimeoutProgress: true,
        });
      }, TOAST_TIME * 1000);

      // Timeout para cerrar sesión a los 60 minutos
      logoutTimerRef.current = setTimeout(() => {
        console.log("Sesión cerrada por inactividad");
        signOut();
      }, INACTIVITY_LIMIT * 1000);
    };

    // Eventos que reinician los timers
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Inicializar timers al montar
    resetTimer();

    return () => {
      // Limpiar todo al desmontar
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return null;
}
