"use client"
import React, { useEffect } from 'react'
import { NewRaffleSection } from '@/component/2-sections'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const NewRaffleScreen = () => {

    const { status } = useSession();
    
        useEffect(() => {
            if (status === "unauthenticated") {
                 redirect("/");
            }
        }, [status]);
        
    return (
        <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg p-10 gap-10 max-h-[87vh] overflow-auto">
            <h3 className=' text-2xl font-bold flex '>Nueva Rifa</h3>
            <div className="flex w-full justify-center">
                <NewRaffleSection />
            </div>
        </div>
    )
}
