import React from 'react'
import { HomeSection } from '@/component/2-sections'
import { IconAntennaBars1 } from '@tabler/icons-react'

export const HomeScreen = () => {
    return (
        <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg p-10">
            <h3 className='text-2xl font-bold flex items-center'>En resumen <IconAntennaBars1 stroke={2} /></h3>

            <HomeSection />
        </div>
    )
}
