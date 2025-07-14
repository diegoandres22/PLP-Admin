"use client"
import React, { useEffect } from 'react'
import { CardRaffles } from '@/component/3-elements'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export const CarrouselCards = () => {

    const raffles = useSelector((state: RootState) => state.Raffles.raffles)

    useEffect(() => {
        // Puedes realizar alguna acción al recibir los datos de raffles, si es necesario.
    }, [raffles]);

    return (
        <div className="flex w-full h-auto py-6 gap-4 flex-wrap">
            {raffles.map((raffle, index) => (
                <CardRaffles
                    key={index} countdownTime={raffle.countdownTime} image={raffle.image}
                    title={raffle.title} raffleDetails={raffle.raffleDetails} id={raffle.id} ticketPrice={raffle.ticketPrice}
                    minPurchase={raffle.minPurchase} raffleStatus={raffle.raffleStatus} description={raffle.description}
                    progressPercentage={raffle.progressPercentage} ticketsAcountPremium={raffle.ticketsAcountPremium} />
            ))}
        </div>
    )
}
