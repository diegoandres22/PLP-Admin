"use client"
import React, { useEffect } from 'react'
import { AprobationsSection } from '@/component/2-sections'
import { Badge } from '@heroui/react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { IconLoader } from '@tabler/icons-react'

export const AprobationsScreen = () => {
    const { status } = useSession();
    const { purchasesList, error, loading } = useSelector((state: RootState) => state.Purchases)


    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/");
        }
    }, [status]);

    return (
        <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg p-10 gap-5">

            <div className="flex gap-2 items-start">
                <h3 className="text-2xl font-bold">Aprobar compras</h3>

                {loading && !error && (
                    <Badge
                        color="danger"
                        content={<IconLoader stroke={2} className=" animate-[spin_2s_linear_infinite]" />}
                        shape="rectangle"
                        variant="faded"
                    >
                        <></>
                    </Badge>

                )}

                {!loading && !error && (
                    <Badge
                        color="danger"
                        content={purchasesList.length}
                        shape="rectangle"
                        variant="faded"
                    >
                        <></>
                    </Badge>
                )}
            </div>

            <AprobationsSection />
        </div>
    )
}
