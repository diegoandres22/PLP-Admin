import { NewRaffleSection } from '@/component/2-sections'
import React from 'react'

export const NewRaffleScreen = () => {
    return (
        <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg p-10 gap-10 max-h-[87vh] overflow-auto">
            <h3 className=' text-2xl font-bold flex '>Nueva Rifa</h3>
            <div className="flex w-full justify-center">
                <NewRaffleSection />
            </div>
        </div>
    )
}
