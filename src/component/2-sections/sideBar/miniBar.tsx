"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";

// NotificationBell se retiró: mostraba "Notificación 1..4" hardcodeadas, sin
// ninguna fuente de datos detrás. Una campana que nunca notifica nada real
// entrena al administrador a ignorarla. Volver a añadirla cuando exista el
// endpoint de notificaciones.
//
// El widget "Tasa BCV" también se retiró: mostraba un valor fijo (200) que
// nunca se actualizaba (el reducer que debía hacerlo era un no-op) y nadie
// lo despachaba. Volver a añadirlo si se conecta a una fuente real.

export const MiniBar = () => {
    const { data: session } = useSession();

    const pathname = usePathname();
    const segment = pathname.split('/')[1];

    // Antes comparaba contra "/newRaffle" y "/home", rutas que no existen en
    // esta app (las reales son "/Rifar" e "/Inicio"): esas ramas nunca se
    // cumplían y el título siempre caía en el segmento genérico.
    const titulo =
        pathname === "/Rifar" ? "Nueva Rifa"
            : pathname === "/Inicio" ? "Inicio"
                : segment;

    return (
        <div className='flex w-full h-auto sm:h-24 pl-4 sm:pl-52 sm:py-4 pr-4 flex-col gap-2'>
            <div className="flex bg-surface-raised w-full h-full rounded-xl p-4 justify-evenly sm:justify-between items-center">
                <h4 className='text-lg'>
                    👋 {session?.user?.name}
                </h4>
                <h3 className='text-2xl font-semibold uppercase'>
                    {titulo}
                </h3>
            </div>
        </div>
    )
}
