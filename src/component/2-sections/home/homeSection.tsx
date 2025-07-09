import React from 'react'
import { StatusRaffles } from '@/component/3-elements'

export const HomeSection = () => {
    return (
        <div className='flex w-full py-4 justify-center sm:justify-between gap-2 flex-wrap'>
            <StatusRaffles
                color="text-green-500/90"
                word="Activas"
                number={1}
            />
            <StatusRaffles
                color="text-orange-500/80"
                word="Agotadas"
                number={2}
            />
            <StatusRaffles
                color="text-black/60"
                word="Terminadas"
                number={4}
            />
            <StatusRaffles
                color="text-red-700"
                word="Suspendidas"
                number={0}
            />
        </div>
    )
}
