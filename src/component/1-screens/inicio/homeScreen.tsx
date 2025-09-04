"use client"
import React, { useEffect } from 'react'
import { CarrouselCards, HomeSection } from '@/component/2-sections'
import { IconAntennaBars1 } from '@tabler/icons-react'
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { fetchRaffles } from '@/store/slices/rafflesSlice';

export const HomeScreen = () => {
    const dispatch = useDispatch<AppDispatch>();


    const { status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/");
        }
        dispatch(fetchRaffles())
    }, [status, dispatch]);


    return (
        <div className="w-full h-auto sm:h-full flex flex-col bg-gray-800 rounded-lg p-10 sm:overflow-y-auto">
            <h3 className='text-2xl font-bold flex items-center'>En resumen <IconAntennaBars1 stroke={2} /></h3>

            <HomeSection />
            <h3 className='text-2xl font-bold flex items-center'>Rifas activas</h3>

            <CarrouselCards />
        </div>
    )
}
