"use client"
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationBell } from '@/component/3-elements';
import { fetchRateBcvData } from '@/store/services/rateBcvService';
import { useSession } from "next-auth/react";


export const MiniBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession();


    const pathname = usePathname();
    const segment = pathname.split('/')[1];
    const rateBcv = useSelector((state: RootState) => state.RateBcv.price)

    useEffect(() => {
        dispatch(fetchRateBcvData());

    }, [dispatch, rateBcv]);


    return (
        <div className='flex w-full h-auto sm:h-24 pl-4 sm:pl-52 sm:py-4 pr-4 flex-col gap-2'>
            <div className="flex bg-gray-800 w-full h-full rounded-xl p-4 justify-evenly sm:justify-between items-center">
                <h4 className='text-lg'>
                    👋 {session?.user?.name}
                </h4>
                <h3 className='text-2xl font-semibold uppercase'>
                    {pathname === "/newRaffle"
                        ? "Nueva Rifa"
                        : pathname === "/home"
                            ? "Inicio"
                            : segment}
                </h3>

                <div className="hidden sm:flex gap-2 ">

                    <NotificationBell></NotificationBell>

                    <p className='font-semibold text-sm p-1 flex items-center'>Tasa: {rateBcv} <p className='text-xs ml-1 font-light'>bs</p></p>
                </div>
            </div>
            <div className="flex sm:hidden gap-2 bg-gray-800 w-full h-full rounded-xl p-4 justify-evenly items-center">

                <NotificationBell></NotificationBell>
                <p className='font-semibold text-sm p-1 flex items-center'>Tasa: {rateBcv} <p className='text-xs ml-1 font-light'>bs</p></p>
            </div>
        </div>
    )
}
