"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { addToast, Button } from "@heroui/react";

// Configuración para 30 minutos de sesión
const TOTAL_SESSION_MS = 30 * 60 * 1000; // 30 minutos
const TOAST_BEFORE_MS = 5 * 60 * 1000;   // 5 minutos antes del cierre
const TOAST_DURATION_MS = 5 * 60 * 1000; // Duración del toast 5 minutos

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function InactivityWatcher() {
  const { data: session } = useSession();
  const loggedOutRef = useRef(false);
  const loginTimestampRef = useRef<number>(0);
  const fixedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!session) return;

    // Guardamos timestamp de inicio
    loginTimestampRef.current = Date.now();
    console.log("Sesión iniciada a las:", new Date(loginTimestampRef.current).toLocaleTimeString());

    const logout = () => {
      if (loggedOutRef.current) return;
      loggedOutRef.current = true;
      console.log("Sesión cerrada: límite total");
      signOut();
    };

    const showToast = () => {
      addToast({
        title: "Atención",
        description: "Tu sesión se cerrará pronto",
        color: "warning",
        timeout: TOAST_DURATION_MS,
        shouldShowTimeoutProgress: true,
        endContent: (
          <Button
            size="sm"
            variant="flat"
            onPress={() => {
              console.log("Usuario pospuso la sesión +5 minutos");
            }}
          >
            Posponer
          </Button>
        ),
      });
    };

    // Timer total de sesión: cierra a los 30 minutos
    fixedTimerRef.current = setTimeout(logout, TOTAL_SESSION_MS);

    // Mostrar toast 5 minutos antes
    toastTimerRef.current = setTimeout(showToast, TOTAL_SESSION_MS - TOAST_BEFORE_MS);

    // Intervalo para mostrar contador en consola cada segundo
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - loginTimestampRef.current;
      const remaining = Math.max(0, TOTAL_SESSION_MS - elapsed);
      console.log("Tiempo restante sesión:", formatTime(remaining));
    }, 1000);

    return () => {
      console.log("Limpiando timers");
      if (fixedTimerRef.current) clearTimeout(fixedTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [session]);

  return null;
}
