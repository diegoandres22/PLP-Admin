
"use client"
import React, { useEffect } from 'react'
import { NewCtaBankSection } from '@/component/2-sections'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { CtasBanksSection } from '@/component/2-sections/newRaffle/ctasBanks.section';

export const NewCtaBank = () => {

    const { status } = useSession();
    
        useEffect(() => {
            if (status === "unauthenticated") {
                 redirect("/");
            }
        }, [status]);
        
    return (
        <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg p-10 gap-10 max-h-[87vh] overflow-auto">
            <h3 className=' text-2xl font-bold flex '>Cuentas de banco</h3>
            <div className="flex w-full justify-around gap-4 flex-wrap">
                <CtasBanksSection />
                <NewCtaBankSection />
            </div>
        </div>
    )
}
