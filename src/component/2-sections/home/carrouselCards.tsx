import { CardRaffles } from '@/component/3-elements'
import React from 'react'

export const CarrouselCards = () => {
    return (
        <div className="flex w-full h-auto py-6 gap-4 flex-wrap">

            <CardRaffles/>
            <CardRaffles/>
            <CardRaffles/>
        </div>
    )
}
