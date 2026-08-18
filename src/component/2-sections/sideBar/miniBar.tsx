"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useSession } from "next-auth/react";

// NotificationBell se retiró: mostraba "Notificación 1..4" hardcodeadas, sin
// ninguna fuente de datos detrás. Una campana que nunca notifica nada real
// entrena al administrador a ignorarla. Volver a añadirla cuando exista el
// endpoint de notificaciones.

export const MiniBar = () => {
    const { data: session } = useSession();

    const pathname = usePathname();
    const segment = pathname.split('/')[1];
    const rateBcv = useSelector((state: RootState) => state.RateBcv.price)

    const titulo =
        pathname === "/newRaffle" ? "Nueva Rifa"
            : pathname === "/home" ? "Inicio"
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

                <div className="hidden sm:flex gap-2 ">
                    <p className='font-semibold text-sm p-1 flex items-center'>
                        Tasa: {rateBcv} <span className='text-xs ml-1 font-light'>bs</span>
                    </p>
                </div>
            </div>

            <div className="flex sm:hidden gap-2 bg-surface-raised w-full h-full rounded-xl p-4 justify-evenly items-center">
                <p className='font-semibold text-sm p-1 flex items-center'>
                    Tasa: {rateBcv} <span className='text-xs ml-1 font-light'>bs</span>
                </p>
            </div>
        </div>
    )
}
