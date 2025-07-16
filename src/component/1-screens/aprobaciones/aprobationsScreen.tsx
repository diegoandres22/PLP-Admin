"use client"
import React from 'react'
import { AprobationsSection } from '@/component/2-sections'
import { Badge } from '@heroui/react'

export const AprobationsScreen = () => {
    return (
        <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg p-10 gap-5">

            <div className="flex gap-2">
                <h3 className='text-2xl font-bold flex '>Aprobar compras</h3>
                <Badge color="danger" content={12} shape="circle" variant='faded'>
                    .
                </Badge>
            </div>

            <AprobationsSection />
        </div>
    )
}
